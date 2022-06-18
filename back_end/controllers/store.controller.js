const Store = require('../models/store');
const ServiceInfo = require('../models/serviceInfo');
const Joi = require('joi')


/** 
 * @swagger
 *   components:
 *      schemas:
 *          store:
 *              type: Object
 *              required:
 *                  - name
 *              properties:
 *                  name:  
 *                      type: string
 *                  _id:
 *                      type: objectId
 *                      description: auto generated unique identifier
 *                  owner:
 *                      type: objectId
 *                      description: user who own this store
 *                  tel:
 *                      type: string
 *                  location:
 *                      type: Object
 *                      properties:
 *                          state: 
 *                              type: string
 *                          city:
 *                              type: string
 *                          suburb:
 *                              type: string
 *                          street:
 *                              type: string
 *                          number:
 *                              type: string
 *                          postcode:
 *                              type: string
 *                  description:
 *                      type: string
 *                      description: store details
 *                  rootCategories:
 *                      type: Array
 *                      description: business category
 *              example:
 *                  name: Best Massage t1
 *                  owner: "62971082feab058de9b66def"
 *                  tel: "0452345111"
 *                  location: 
 *                      state: "NT"
 *                      city: "Hobart"
 *                      suburb: "Parkville"
 *                      street: "Captain Matthew Flinders"
 *                      number: "50"
 *                      postcode: "7005"
 *                  description: 'an ordinary massage parlour'
 *                  rootCategories: ["629f0bc95abd87303b5dcb17"]
 *          storeUpdate:
 *              type: Object
 *              required:
 *                  - name
 *              properties:
 *                  name:  
 *                      type: string
 *                  _id:
 *                      type: objectId
 *                      description: auto generated unique identifier
 *                  owner:
 *                      type: objectId
 *                      description: user who own this store
 *                  tel:
 *                      type: string
 *                  location:
 *                      type: Object
 *                      properties:
 *                          state: 
 *                              type: string
 *                          city:
 *                              type: string
 *                          suburb:
 *                              type: string
 *                          street:
 *                              type: string
 *                          number:
 *                              type: string
 *                          postcode:
 *                              type: string
 *                  description:
 *                      type: string
 *                      description: store details
 *                  rootCategories:
 *                      type: Array
 *                      description: business category
 *                  serviceInfos:
 *                      type: Array
 *                      description: in-store service information list
 *                  orders:
 *                      type: Array
 *                      description: all orders in store
 *              example:
 *                  name: Best Massage t1
 *                  owner: "62971082feab058de9b66def"
 *                  tel: "0452345111"
 *                  location: 
 *                      state: "NT"
 *                      city: "Hobart"
 *                      suburb: "Parkville"
 *                      street: "Captain Matthew Flinders"
 *                      number: "50"
 *                      postcode: "7005"
 *                  description: 'an ordinary massage parlour'
 *                  rootCategories: ["629f0bc95abd87303b5dcb17"]
 *                  serviceInfos: ["62aafdb10b339b2e4c917e95"]
 *                  orders: []     
*/
/** 
 * @swagger
 *   /v1/store:
 *    get:
 *      summary: return all store information (except discarded)
 *      tags: [Store]
 *      requestBody:
 *          description: The request body is used for conditional query, retrieval, and sorting. if body is empty, all stores in database will be returned.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties: 
 *                          category:
 *                              type: objectId
 *                          sortMethod:
 *                              type: string
 *                          state:
 *                              type: string
 *                          city:
 *                              type: string
 *                          resultQuantity:
 *                              type: number
 *                      example:
 *                          category: "629f0bc95abd87303b5dcb17"
 *                          sortMethod: 'orderSize'
 *                          state: "NT"
 *                          city: "Hobart"
 *                          resultQuantity: 4
 *      responses:
 *          200:
 *              description: array of stores
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/store'
 *          400:
 *              description: Invalid request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object 
 *                          properties: 
 *                              message:
 *                                  type: string                          
*/
async function getAllStores(req, res) {
    let { category, sortMethod = 'orderSize', state, city, resultQuantity = 999999 } = req.body;

    let searchQuery = { isDiscard: false };
    if (category !== undefined) { searchQuery.rootCategories = category };
    if (state !== undefined) { searchQuery['location.state'] = state };
    if (city !== undefined) { searchQuery['location.city'] = city };

    const stores = await Store.find(searchQuery).sort({ [sortMethod]: -1 }).limit(resultQuantity).exec();
    res.json(stores);
}


/** 
 * @swagger
 *   /v1/store/{storeId}:
 *    get:
 *      summary: return a store information by ID
 *      tags: [Store]
 *      parameters:
 *          - in: path
 *            name: storeId
 *            required: true
 *            schema: 
 *                type: string
 *            description: Unique ID automatically generated by mongodb
 *            example: '62aab1f2232059fed51512b9'
 *      responses:
 *          200:
 *              description: Successfully returned a store
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/store'     
 *          400:
 *              description: Invalid request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object 
 *                          properties: 
 *                              message:
 *                                  type: string                                          
*/
async function getStoreById(req, res) {
    const { id } = req.params;
    const store = await Store.findById(id).populate('owner', 'name').populate('rootCategories', 'name')
        .populate({ path: 'serviceInfos', match: { isDiscard: false }, select: 'name' }).exec();
    if (!store) {
        return res.status(404).json({
            error: 'Store not found',
        });
    }
    res.json(store);
}


/** 
 * @swagger
 *  /v1/store:
 *   post:
 *      summary: create a new store info to database 
 *      tags: [Store]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/store'
 *      responses:
 *          201:
 *              description: Successfully create a store
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/store'     
 *          400:
 *              description: Invalid request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object 
 *                          properties: 
 *                              message:
 *                                  type: string     
 *                      
*/
async function addStore(req, res) {
    const validatedData = await checkStore(req.body);
    if (validatedData.error !== undefined) { return res.status(404).json(validatedData.error) };

    const { name, owner, tel, location, description, rootCategories } = validatedData;  //= req.body;
    const store = new Store({ name, owner, tel, location, description, rootCategories });
    await store.save();
    res.status(201).json(store);
}


/** 
 * @swagger
 *  /v1/store/{storeId}:
 *   put:
 *      summary: modify a store information in database 
 *      tags: [Store]
 *      parameters:
 *          - in: path
 *            name: storeId
 *            required: true
 *            schema: 
 *                type: string
 *            description: Unique ID automatically generated by mongodb
 *            example: '62aab1f2232059fed51512b9'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/storeUpdate'
 *      responses:
 *          200:
 *              description: Successfully update a store information
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/storeUpdate'     
 *          400:
 *              description: Invalid request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object 
 *                          properties: 
 *                              message:
 *                                  type: string     
 *                      
*/
async function updateStoreById(req, res) {
    const validatedData = await checkStore(req.body);
    if (validatedData.error !== undefined) { return res.status(404).json(validatedData.error) };

    const { id } = req.params;
    const { name, owner, tel, location, description, rootCategories, serviceInfos, orders } = validatedData;  //= req.body;
    const store = await Store.findByIdAndUpdate(id, {
        name, owner, tel, location, description, rootCategories, serviceInfos, orders
    }, { new: true }).exec();
    if (!store) {
        return res.status(404).json({
            error: 'Store not found',
        });
    }
    res.json(store);
}


/** 
 * @swagger
 *   /v1/store/{storeId}:
 *    delete:
 *      summary: pseudo-delete a store by ID, if it doesn't associate with other collections
 *      tags: [Store]
 *      parameters:
 *          - in: path
 *            name: storeId
 *            required: true
 *            schema: 
 *                type: string
 *            description: Unique ID automatically generated by mongodb
 *            example: '62aa97cb755d284370e59f15'
 *      responses:
 *          204:
 *              description: Successfully discard a store   
 *          400:
 *              description: Invalid request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object 
 *                          properties: 
 *                              message:
 *                                  type: string 
 *          403:
 *              description: Server refused to delete because the data has an associated item.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              associatedItem:
 *                                  type: object or array                                            
*/
async function discardStoreById(req, res) {
    const { id } = req.params;
    const refServiceInfo = await ServiceInfo.find({ store: id, isDiscard: false }).exec();

    if (refServiceInfo.length !== 0) {
        return res.status(403).json({
            error: 'Deletion failed, this store has associated items',
            refServiceInfo
        });
    } else {
        const store = await Store.findByIdAndUpdate(id, { isDiscard: true }, { new: true }).exec();
        if (!store) {
            return res.status(404).json({
                error: 'store not found',
            });
        }
        res.sendStatus(204);
    }
}


async function getDiscardedStores(req, res) {
    const stores = await Store.find({ isDiscard: true }).exec();
    res.json(stores);
}


async function checkStore(data) {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(30),
        owner: Joi.required(),
        tel: Joi.string().regex(/^\d{2}\d{4}\d{4}$/).required(),
        location: {
            state: Joi.string().required(),
            city: Joi.string().required(),
            suburb: Joi.string().required(),
            street: Joi.string().required(),
            number: Joi.string().required(),
            postcode: Joi.string().regex(/^(?:(?:[2-8]\d|9[0-7]|0?[28]|0?9(?=09))(?:\d{2}))$/).required(),
        },
        description: Joi.string().max(300),
        rootCategories: Joi.array(),
        serviceInfos: Joi.array(),
        orders: Joi.array()
    });

    const validatedData = await schema.validateAsync(data, { allowUnknown: true, stripUnknown: true });
    return validatedData;
}


module.exports = {
    getAllStores,
    getStoreById,
    addStore,
    updateStoreById,
    discardStoreById,
    getDiscardedStores
}
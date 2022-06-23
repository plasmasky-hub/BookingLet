const Store = require('../models/store');
const ServiceInfo = require('../models/serviceInfo');
const Joi = require('joi');


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
    let { sortMethod = 'orderSize', person = 1, category, state, city, dateInWeek, query = '.', resultQuantity = 999 } = req.body;

    let qRegExp = new RegExp(`.*${query}.*`, 'i');
    let optionalMatchQuery = {};
    let startTimeDateQuery = {};

    //if (category !== undefined) { optionalMatchQuery.rootCategories = category };  //invalid here. The reason should be array != string.
    if (state !== undefined) { optionalMatchQuery['location.state'] = state };
    if (city !== undefined) { optionalMatchQuery['location.city'] = city };
    if (dateInWeek !== undefined) {
        optionalMatchQuery["serviceInfoDetails.startTime"] = { $ne: [] };
        startTimeDateQuery = { $eq: ['$$startTimeDay', dateInWeek] };
    }

    let aimedStores = await Store.aggregate([
        {
            $lookup: {
                from: "serviceinfos",
                let: { id: "$_id" },
                pipeline: [
                    {  //Filter the sub-table 1st time, and return main tables which contain the specified day in its sub-table.
                        $project:
                        {
                            store: 1, name: 1, maxPersonPerSection: 1,
                            "startTime": {
                                $filter: {
                                    input: "$startTime.dayOfWeek",
                                    as: "startTimeDay",
                                    cond: startTimeDateQuery  //If there is no 'dateInWeek' in filter, select *
                                }
                            }
                        }
                    },
                    {  //Filter the sub-table 2nd time, and return main tables which {$maxPersonPerSection > person} in its sub-table.
                        $match:
                        {
                            $expr:
                            {
                                $and:
                                    [
                                        { isDiscard: false },
                                        { $eq: ["$store", "$$id"] },
                                        { $gte: ["$maxPersonPerSection", person] }
                                    ]
                            }
                        }
                    }
                ],
                as: "serviceInfoDetails"
            }
        },
        {
            $match: {
                $and:
                    [
                        { isDiscard: false },
                        { "serviceInfoDetails": { $ne: [] } },
                        optionalMatchQuery,
                        // { "rootCategories": { $elemMatch: {$eq: "629f0bc95abd87303b5dcb17"} } }  //incorrect, but I don't know why
                        // { rootCategories: { $all: ["629f0bc95abd87303b5dcb17"] } }  //incorrect, but I don't know why
                    ],
                $or: [
                    { name: qRegExp },
                    { description: qRegExp }
                ]
            }
        },
        {
            $sort: { [sortMethod]: -1 }
        },
        {
            $limit: resultQuantity
        }


    ]).then((result) => {
        res.json(result)
    }).catch((error) => {
        res.json(error)
    })
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
*/
async function discardStoreById(req, res) {
    const { id } = req.params;

    await ServiceInfo.updateMany({ store: id }, {
        $set: { 'isDiscard': true }
    }).exec();

    const store = await Store.findByIdAndUpdate(id, { isDiscard: true }, { new: true }).exec();
    if (!store) {
        return res.status(404).json({
            error: 'store not found',
        });
    }

    res.sendStatus(204);

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
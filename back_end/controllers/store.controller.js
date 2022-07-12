const Store = require('../models/store');
const ServiceInfo = require('../models/serviceInfo');
const { getDayOfWeek } = require('./calendar.controller');
const Joi = require('joi');


/** 
 * @swagger
 *   components:
 *      schemas:
 *          fullStore:
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
 *                      description: save serviceInfos id array
 *                  orders:
 *                      type: Array
 *                      description: save orders id array
 *                  favoriteUsers:
 *                      type: Array
 *                      description: save users id array who follow this store
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
 *                  serviceInfos: []
 *                  orders: []
 *                  favoriteUsers: []
 *          store:
 *              type: Object
 *              required:
 *                  - name
 *                  - owner
 *                  - tel
 *                  - location
 *                  - rootCategories
 *              properties:
 *                  name:  
 *                      type: string
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
 *              properties:
 *                  name:  
 *                      type: string
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
*/
/** 
 * @swagger
 *   /v1/store:
 *    get:
 *      summary: return all store information when the request body does not contain parameters(except discarded); returns filtered and sorted stores when the request body contains filter and sorting parameters. swagger does not support carrying parameters in the request body of GET. therefore. If you need to test this functionality, you must use postman.
 *      tags: [Store]
 *      requestBody:
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      description: All parameters are optional. And, in practice, so many filters are not used at the same time. Because this request integrates the search function of multiple pages.
 *                      properties:
 *                          sortMethod:  
 *                              type: string
 *                          person:
 *                              type: number
 *                          category: 
 *                              type: objectId
 *                          state:
 *                              type: string
 *                          city:
 *                              type: string
 *                          dateInWeek:
 *                              type: string
 *                          query:
 *                              type: string
 *                          resultQuantity:
 *                              type: number
 *                      example:
 *                          sortMethod: 'orderSize'
 *                          person: 2
 *                          category: "62a612b87645da1c405c0daa"
 *                          state: "TAS"
 *                          city: "Hobart"
 *                          dateInWeek: "Tuesday"
 *                          query: "traditional food"
 *                          resultQuantity: 4
 *      responses:
 *          200:
 *              description: array of stores
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/fullStore'
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

    if (state !== undefined) { optionalMatchQuery['location.state'] = state };
    if (city !== undefined) { optionalMatchQuery['location.city'] = city };
    if (dateInWeek !== undefined) {
        optionalMatchQuery["serviceInfoDetails.startTime"] = { $ne: [] };
        startTimeDateQuery = { $eq: ['$$startTimeDay', dateInWeek] };
    }

    await Store.aggregate([
        {
            $lookup: {
                from: "serviceinfos",
                let: { id: "$_id" },
                pipeline:
                    [
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
            },
        },
        {
            $lookup:
            {
                from: "rootcategories",
                localField: "rootCategories",
                foreignField: "_id",
                as: "rootCategoryDetails"
            }
        },
        {
            $match: {
                $and:
                    [
                        { isDiscard: false },
                        { "serviceInfoDetails": { $ne: [] } },
                        optionalMatchQuery,
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
        const today = new Date();
        const dayOfWeekToday = getDayOfWeek(today);

        if (category !== undefined) {
            result = result.filter((element) => {
                let matched = false;
                for (let i = 0; i < element.rootCategoryDetails.length; i++) {
                    if ({ ...element.rootCategoryDetails[0] }._id == category) { matched = true; }
                }
                return matched;
            })
        }


        result.map((element) => {
            let maxPersonPerSectionArr = [];
            element.serviceInfoDetails.map((element) => { maxPersonPerSectionArr.push(element.maxPersonPerSection); })
            element.maxPersonPerSectionForStore = Math.max(...maxPersonPerSectionArr);

            if (element.businessHours) {
                element.isAvailableToday = element.businessHours[dayOfWeekToday].length > 0 ? true : false;
            } else { element.isAvailableToday = false; }
        })

        res.json(result)
    }).catch((error) => {
        res.json(error)
    })
}

/*
async function getAllStores(req, res) {
    const stores = await Store.find().exec();
    res.json(stores);
}
*/


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
 *                          $ref: '#/components/schemas/fullStore'     
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
 *                          $ref: '#/components/schemas/fullStore'     
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
 *                          $ref: '#/components/schemas/fullStore'     
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
    const validatedData = await checkStoreUpdate(req.body);
    if (validatedData.error !== undefined) { return res.status(404).json(validatedData.error) };

    const { id } = req.params;
    const { name, tel, location, description, rootCategories } = validatedData;  //= req.body;
    const store = await Store.findByIdAndUpdate(id, {
        name, tel, location, description, rootCategories
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
        rootCategories: Joi.array()
    });

    const validatedData = await schema.validateAsync(data, { allowUnknown: true, stripUnknown: true });
    return validatedData;
}

async function checkStoreUpdate(data) {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(30),
        tel: Joi.string().regex(/^\d{4}\d{3}\d{3}$/).required(),
        location: {
            state: Joi.string().required(),
            city: Joi.string().required(),
            suburb: Joi.string().required(),
            street: Joi.string().required(),
            number: Joi.string().required(),
            postcode: Joi.string().regex(/^(?:(?:[2-8]\d|9[0-7]|0?[28]|0?9(?=09))(?:\d{2}))$/).required(),
        },
        description: Joi.string().max(300),
        rootCategories: Joi.array()
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
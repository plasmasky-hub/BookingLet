const Store = require('../models/store');
const ServiceInfo = require('../models/serviceInfo');
const SubCategory = require('../models/subCategory');
const User = require('../models/user');
const { getDayOfWeek, checkDateFormat } = require('./calendar.controller');
const Joi = require('joi');
const { array } = require('joi');


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
    let { sortMethod = 'orderSize',
        person = 1,
        category = undefined,
        state = undefined,
        city = undefined,
        date = undefined,
        query = '.',
        includeNoServiceStore = false,
        resultQuantity = 999
    } = req.query;

    if (['orderSize', 'favoriteUsersSize', 'distance'].indexOf(sortMethod) === -1) {
        return res.status(400).json({
            error: 'SortMethod must be one of [orderSize, favoriteUsersSize, distance].'
        });
    }

    if (date !== undefined) {
        const dateFormatCheckResult = checkDateFormat(date);
        if (!dateFormatCheckResult.permission) {
            return res.json(dateFormatCheckResult.message)
        };
    }

    person = parseInt(person);
    resultQuantity = parseInt(resultQuantity);
    includeNoServiceStore = includeNoServiceStore === "true" ? true : false;
    let dateInWeek = date !== undefined ? getDayOfWeek(new Date(date)) : undefined;
    let qRegExp = new RegExp(`.*${query}.*`, 'i');
    let optionalMatchQuery = {};
    let noServiceStoreQuery = { "serviceInfoDetails": { $ne: [] } };

    if (state !== undefined) { optionalMatchQuery['location.state'] = state };
    if (city !== undefined) { optionalMatchQuery['location.city'] = city };
    if (dateInWeek !== undefined) {
        optionalMatchQuery[`businessHours.${dateInWeek}`] = { $ne: [] };
    }
    if (includeNoServiceStore) { noServiceStoreQuery = {}; }

    await Store.aggregate([
        {
            $lookup: {
                from: "serviceinfos",
                let: { id: "$_id" },
                pipeline:
                    [
                        {
                            $project: { store: 1, name: 1, maxPersonPerSection: 1 }
                        },
                        {
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
                        optionalMatchQuery,
                        noServiceStoreQuery
                    ],
                $or:
                    [
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
                    if ({ ...element.rootCategoryDetails[i] }._id == category) { matched = true; }
                }
                return matched;
            })
        }

        if (!includeNoServiceStore) {
            result.map((element) => {
                let maxPersonPerSectionArr = [];
                element.serviceInfoDetails.map((element) => { maxPersonPerSectionArr.push(element.maxPersonPerSection); })
                element.maxPersonPerSectionForStore = Math.max(...maxPersonPerSectionArr);
                element.isAvailableToday = element.businessHours[dayOfWeekToday].length > 0 ? true : false;

            })
        }

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
        .populate({ path: 'serviceInfos', match: { isDiscard: false }, select: 'name maxPersonPerSection maxServicePerSection duration calendarTemplate' }).exec();
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
    console.log(req.body);
    const validatedData = await checkStore(req.body);
    if (validatedData.error !== undefined) { return res.status(404).json(validatedData.error) };

    const { name, owner, tel, location, description, rootCategories } = validatedData;  //= req.body;
    const photo = ['https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/default.jpg'];
    const store = new Store({ name, owner, tel, location, description, rootCategories, photo });
    await store.save();

    const user = await User.findById(owner).exec();
    user.stores.addToSet(store._id);
    await user.save();

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
    let refServiceInfo = await ServiceInfo.find({ store: id, isDiscard: false }).exec();
    if (refServiceInfo.length > 0) {
        return res.status(400).json({
            error: 'store cannot be deleted, because it has one or more reference services.',
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
            postcode: Joi.number().min(200).max(9999).required(),
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
            postcode: Joi.number().min(200).max(9999).required(),
        },
        description: Joi.string().max(300),
        rootCategories: Joi.array()
    });

    const validatedData = await schema.validateAsync(data, { allowUnknown: true, stripUnknown: true });
    return validatedData;
}


let backgroundGroup = [
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/yoga.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/weeding.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/tattoo3.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/tattoo2.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/tattoo1.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/tabletennis.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/roomescape2.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/roomescape1.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/pool2.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/pool1.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/pool.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/pet3.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/pet2.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/movinghouse.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/massage3.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/massage2.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/massage1.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/manicure4.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/manicure3.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/pet1.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/manicure2.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/manicure1.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/karaoke3.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/karaoke2.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/karaoke1.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/housekeepingmaintenance3.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/housekeepingmaintenance2.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/gym3.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/gym2.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/gym1.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/gokart.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/gaming2.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/gaming1.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/housekeepingmaintenance1.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/dancing.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/boxing2.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/boxing1.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/basketball.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/alternativemedicine3.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/alternativemedicine2.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/alternativemedicine1.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/pizza3.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/pizza2.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/westernfood4.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/westernfood3.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/westernfood2.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/westernfood1.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/snacks2.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/snacks1.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/pizza1.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/localfood3.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/localfood2.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/localfood1.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/hamburger3.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/hamburger1.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/frenchfood3.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/frenchfood2.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/frenchfood1.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/fastfood3.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/fastfood2.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/fastfood1.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/chinesefood3.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/chinesefood1.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/bread2.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/bread1.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/asianfood3.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/asianfood2.jpg',
    'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/asianfood1.jpg'
];
let defaultPic = 'https://raw.githubusercontent.com/RedRe4per/MyPicture/main/JR-P3/default.jpg'

async function addPhotoToStore(req, res) {
    await Store.aggregate([
        {
            $lookup:
            {
                from: "serviceinfos",
                localField: "serviceInfos",
                foreignField: "_id",
                as: "serviceInfoDetails"
            }
        },
        {
            $match: {
                $and:
                    [
                        { isDiscard: false },
                        { serviceInfos: { $ne: [] } }
                    ]
            }
        },
    ]).then((stores) => {
        stores.forEach(async (store) => {
            const foodArr = ['westernfood', 'frenchfood', 'asianfood', 'bread', 'fastfood', 'snacks', 'pizza', 'localfood', 'hamburger'];
            const subCategoryId = store.serviceInfoDetails[0].subCategories[0];
            const subCategory = await SubCategory.findById(subCategoryId).exec();
            const storeInstance = await Store.findById(store._id).exec();

            if (subCategory) {
                storeInstance.backgroundPhoto = 'no picture found';                               //error store id: 62d58f14f0cb496848ef9da0 Moving Speedy
                const storeSubCateName0 = subCategory.name;
                let storeSubCateName = storeSubCateName0.toLowerCase().split(' ').join('');

                if (storeSubCateName === 'petgrooming' || storeSubCateName === 'petmedical') { storeSubCateName = 'pet' };
                if (storeSubCateName === 'chinesefood') { storeSubCateName = foodArr[Math.floor((Math.random() * foodArr.length))] };

                console.log(storeSubCateName)
                picIndex = backgroundGroup.findIndex(element => element.search(storeSubCateName) !== -1)

                while (picIndex === -1) {
                    storeSubCateName = foodArr[Math.floor((Math.random() * foodArr.length))];
                    picIndex = backgroundGroup.findIndex(element => element.search(storeSubCateName) !== -1);
                }

                if (picIndex === -1) {
                    console.log('no picture');
                } else {
                    console.log(backgroundGroup[picIndex]);
                    storeInstance.backgroundPhoto = backgroundGroup[picIndex];
                    backgroundGroup.splice(picIndex, 1);
                }
                await storeInstance.save();
            }
        })
        res.json(stores)
    }).catch((error) => {
        res.json(error)
    })



}



module.exports = {
    getAllStores,
    getStoreById,
    addStore,
    updateStoreById,
    discardStoreById,
    getDiscardedStores,
    addPhotoToStore
}

const ServiceInfo = require('../models/serviceInfo');
const Store = require('../models/store');
const Order = require('../models/order');
const Joi = require('joi');


/** 
 * @swagger
 *   components:
 *      schemas:
 *          fullServiceInfo:
 *              type: Object
 *              properties:
 *                  name:
 *                      type: string
 *                  _id:
 *                      type: objectId
 *                  rootCategory:
 *                      type: objectId
 *                      description: type of service
 *                  subCategories:
 *                      type: Array
 *                      description: subtype of service
 *                  store:
 *                      type: objectId
 *                      description: Store to which the service belongs
 *                  duration:
 *                      type: Number
 *                      description: service duration, 0.5-5 hours
 *                  maxPersonPerSection:
 *                      type: Number
 *                      description: Maximum number of people for this service, 1-1000 people
 *                  maxServicePerSection:
 *                      type: Number
 *                      description: The maximum number of services that can be booked at the same time
 *                  price:
 *                      type: Number
 *                      description: Service price in AUD. 0-9999 AUD
 *                  description:
 *                      type: String
 *                      description: Service details
 *                  startTime:
 *                      type: Array
 *                      description: elements are object. There objects includes 2 attributes, "dayOfWeek" has a value of string, and "openHours" has a value of time array, like [0800, 0900, ...]
 * 
 *              example:
 *                  name: Standard service 1
 *                  _id: "62a6ca699095c03945813d90"
 *                  rootCategory: "629f0bc95abd87303b5dcb17"
 *                  subCategories:  ["629f715cf1598f79a02aef99", "62a5f852767e8fc45aad5a23"]
 *                  store: "62a1aa0a2c9f493974ea830e"
 *                  duration: 1
 *                  maxPersonPerSection: 5
 *                  maxServicePerSection: 10 
 *                  price: 80          
 *                  description: 'Standard service in this store'
 *                  startTime: []
 *          serviceInfo:
 *              type: Object
 *              required: 
 *                  - name
 *                  - rootCategory
 *                  - store
 *                  - duration
 *                  - maxPersonPerSection
 *                  - maxServicePerSection
 *              properties: 
 *                  name:
 *                      type: string
 *                  rootCategory:
 *                      type: objectId
 *                      description: type of service
 *                  subCategories:
 *                      type: Array
 *                      description: subtype of service
 *                  store:
 *                      type: objectId
 *                      description: Store to which the service belongs
 *                  duration:
 *                      type: Number
 *                      description: service duration, 0.5-5 hours
 *                  maxPersonPerSection:
 *                      type: Number
 *                      description: Maximum number of people for this service, 1-1000 people
 *                  maxServicePerSection:
 *                      type: Number
 *                      description: The maximum number of services that can be booked at the same time
 *                  price:
 *                      type: Number
 *                      description: Service price in AUD. 0-9999 AUD
 *                  description:
 *                      type: String
 *                      description: Service details
 *              example:
 *                  name: Standard service 1
 *                  rootCategory: "629f0bc95abd87303b5dcb17"
 *                  subCategories:  ["629f715cf1598f79a02aef99", "62a5f852767e8fc45aad5a23"]
 *                  store: "62a1aa0a2c9f493974ea830e"
 *                  duration: 1
 *                  maxPersonPerSection: 5
 *                  maxServicePerSection: 10   
 *                  price: 50        
 *                  description: 'Standard service in this store'
 *          fullServiceInfoUpdate:
 *              type: Object
 *              properties:
 *                  name:
 *                      type: string
 *                  _id:
 *                      type: objectId
 *                  rootCategory:
 *                      type: objectId
 *                      description: type of service
 *                  subCategories:
 *                      type: Array
 *                      description: subtype of service
 *                  store:
 *                      type: objectId
 *                      description: Store to which the service belongs
 *                  duration:
 *                      type: Number
 *                      description: service duration, 0.5-5 hours
 *                  maxPersonPerSection:
 *                      type: Number
 *                      description: Maximum number of people for this service, 1-1000 people
 *                  maxServicePerSection:
 *                      type: Number
 *                      description: The maximum number of services that can be booked at the same time
 *                  price:
 *                      type: Number
 *                      description: Service price in AUD. 0-9999 AUD
 *                  description:
 *                      type: String
 *                      description: Service details
 *                  startTime:
 *                      type: Array
 *                      description: elements are object. There objects includes 2 attributes, "dayOfWeek" has a value of string, and "openHours" has a value of time array, like [0800, 0900, ...]
 * 
 *              example:
 *                  name: Standard service 1
 *                  _id: "62a6ca699095c03945813d90"
 *                  rootCategory: "629f0bc95abd87303b5dcb17"
 *                  subCategories:  ["629f715cf1598f79a02aef99", "62a5f852767e8fc45aad5a23"]
 *                  store: "62a1aa0a2c9f493974ea830e"
 *                  duration: 1
 *                  maxPersonPerSection: 5
 *                  maxServicePerSection: 10 
 *                  price: 80          
 *                  description: 'Standard service in this store'
 *                  startTime: [{dayOfWeek: "Tuesday", openHours: [0800, 1000, 1430]}, {dayOfWeek: "Friday", openHours: [0920, 1100, 1530, 1640]}] 
 *          serviceInfoUpdate:
 *              type: Object
 *              properties:
 *                  name:
 *                      type: string
 *                  rootCategory:
 *                      type: objectId
 *                      description: type of service
 *                  subCategories:
 *                      type: Array
 *                      description: subtype of service
 *                  duration:
 *                      type: Number
 *                      description: service duration, 0.5-5 hours
 *                  maxPersonPerSection:
 *                      type: Number
 *                      description: Maximum number of people for this service, 1-1000 people
 *                  maxServicePerSection:
 *                      type: Number
 *                      description: The maximum number of services that can be booked at the same time
 *                  price:
 *                      type: Number
 *                      description: Service price in AUD. 0-9999 AUD
 *                  description:
 *                      type: String
 *                      description: Service details
 *                  startTime:
 *                      type: Array
 *                      description: elements are object. There objects includes 2 attributes, "dayOfWeek" has a value of string, and "openHours" has a value of time array, like [0800, 0900, ...]
 *              example:
 *                  name: Standard service 1
 *                  rootCategory: "629f0bc95abd87303b5dcb17"
 *                  subCategories:  ["629f715cf1598f79a02aef99", "62a5f852767e8fc45aad5a23"]
 *                  duration: 2
 *                  maxPersonPerSection: 4
 *                  maxServicePerSection: 8     
 *                  price: 80      
 *                  description: 'Standard service update in this store'
 *                  startTime: [{dayOfWeek: "Tuesday", openHours: [0800, 1000, 1430]}, {dayOfWeek: "Friday", openHours: [0920, 1100, 1530, 1640]}] 
*/
/** 
 * @swagger
 *   /v1/serviceInfo:
 *    get:
 *      summary: return all service infos (except discarded). It you declaim a store Id in req.body, it will return service infos which belongs to this store. swagger does not support carrying parameters in the request body of GET. therefore. If you need to test this functionality, you must use postman.
 *      tags: [ServiceInfo]
 *      requestBody:
 *          required: false
 *          content:
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      description: All parameters are optional. And, in practice, so many filters are not used at the same time. Because this request integrates the search function of multiple pages.
 *                      properties:
 *                          storeId:  
 *                              type: objectId
 *                      example:
 *                          storeId: "62a6149f7645da1c405c0dca"
 *      responses:
 *          200:
 *              description: array of serviceInfos
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/serviceInfo'
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
async function getAllInfos(req, res) {
    let { storeId } = req.query;
    let searchQuery = { isDiscard: false };
    if (storeId !== undefined) { searchQuery.store = storeId };

    const infos = await ServiceInfo.find(searchQuery).exec();
    res.json(infos);

}


/** 
 * @swagger
 *   /v1/serviceInfo/{serviceInfoId}:
 *    get:
 *      summary: return a service info by ID
 *      tags: [ServiceInfo]
 *      parameters:
 *          - in: path
 *            name: serviceInfoId
 *            required: true
 *            schema: 
 *                type: string
 *            description: Unique ID automatically generated by mongodb
 *            example: '62a6ca699095c03945813d90'
 *      responses:
 *          200:
 *              description: Successfully returned an serviceInfo
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/fullServiceInfoUpdate'     
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
async function getInfoById(req, res) {
    const { id } = req.params;
    const serviceInfo = await ServiceInfo.findById(id)
        .populate('store', 'name').populate('rootCategory', 'name').populate('subCategories', 'name').exec();
    if (!serviceInfo) {
        return res.status(404).json({
            error: 'service info not found',
        });
    }
    res.json(serviceInfo);
}


/** 
 * @swagger
 *  /v1/serviceInfo:
 *   post:
 *      summary: add a new service info to database 
 *      tags: [ServiceInfo]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/serviceInfo'
 *      responses:
 *          201:
 *              description: Successfully create a serviceInfo
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/serviceInfo'     
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
async function addInfo(req, res) {
    const { checkResult, decision } = checkDurationFormat(req, res);
    if (!checkResult) { return res.json(decision); };

    const validatedData = await checkServiceInfo(req.body);  //Without await, promise status will be <pending>. 
    if (validatedData.error !== undefined) { return res.status(404).json(validatedData.error) };

    const {
        name,
        rootCategory,
        subCategories,
        store,
        duration,
        maxPersonPerSection,
        maxServicePerSection,
        price,
        description
        //} = req.body;
    } = validatedData;

    const serviceInfo = new ServiceInfo({
        name,
        rootCategory,
        subCategories,
        store,
        duration,
        maxPersonPerSection,
        maxServicePerSection,
        price,
        description
    });

    await serviceInfo.save();
    Store.findByIdAndUpdate(store, { $addToSet: { serviceInfos: serviceInfo._id } }).exec();

    res.status(201).json({
        "serviceInfo": serviceInfo
    });
}


/** 
 * @swagger
 *  /v1/serviceInfo/{serviceInfoId}:
 *   put:
 *      summary: modify a service info in database 
 *      tags: [ServiceInfo]
 *      parameters:
 *          - in: path
 *            name: serviceInfoId
 *            required: true
 *            schema: 
 *                type: string
 *            description: Unique ID automatically generated by mongodb
 *            example: '62a6ca699095c03945813d90'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/serviceInfoUpdate'
 *      responses:
 *          200:
 *              description: Successfully update a serviceInfo
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/fullServiceInfoUpdate'     
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
async function updateInfoById(req, res) {
    const { id } = req.params;
    const serviceDurationCheck = await ServiceInfo.findById(id).exec();
    if (!serviceDurationCheck) {
        return res.status(404).json({
            error: 'service info not found',
        });
    };
    if (serviceDurationCheck.duration.durationType !== req.body.duration.durationType) {
        return res.json('Error: Duration type cannot change!');
    };

    const { checkResult, decision } = checkDurationFormat(req, res);
    if (!checkResult) { return res.json(decision); };

    const validatedData = await checkServiceInfoUpdate(req.body);
    if (validatedData.error !== undefined) { return res.status(404).json(validatedData.error) };

    const {
        name,
        subCategories,
        duration,
        maxPersonPerSection,
        price,
        description
        //} = req.body;
    } = validatedData;

    const serviceInfo = await ServiceInfo.findByIdAndUpdate(id, {
        name,
        subCategories,
        duration,
        maxPersonPerSection,
        price,
        description
    }, { new: true }).exec();

    res.json(serviceInfo);
}


/** 
 * @swagger
 *   /v1/serviceInfo/{serviceInfoId}:
 *    delete:
 *      summary: pseudo-delete a service info by ID, if it doesn't associate with other collections
 *      tags: [ServiceInfo]
 *      parameters:
 *          - in: path
 *            name: serviceInfoId
 *            required: true
 *            schema: 
 *                type: string
 *            description: Unique ID automatically generated by mongodb
 *            example: '62aa9cd1a97477014bf74b8f'
 *      responses:
 *          204:
 *              description: Successfully discard a serviceInfo
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
async function discardInfoById(req, res) {
    const { id } = req.params;
    const serviceInfo = await ServiceInfo.findByIdAndUpdate(id, { isDiscard: true }, { new: true }).exec();
    if (!serviceInfo) {
        return res.status(404).json({
            error: 'service info not found',
        });
    }
    //await Store.updateMany({ serviceInfo: serviceInfo._id }, { $pull: { serviceInfo: serviceInfo._id } }).exec();
    res.sendStatus(204);

}


async function getDiscardedInfos(req, res) {
    const Infos = await ServiceInfo.find({ isDiscard: true }).exec();
    res.json(Infos);
}


function checkDurationFormat(req, res) {
    const { durationType, fixedDuration, changeableDuration } = req.body.duration;
    let checkResult = true;
    let decision = 'Duration check pass.';

    if (durationType === 'changeable' && (fixedDuration !== undefined || changeableDuration === undefined)) {
        checkResult = false;
        decision = 'Error: Changeable type duration can only and must match a Changeable value.';
    } else if (durationType === 'changeable' && (changeableDuration.minimum === undefined || changeableDuration.maximum === undefined)) {
        checkResult = false;
        decision = 'Error: Changeable type duration must have a minimum and a maximum duration.';
    } else if (durationType === 'changeable' && !(changeableDuration.minimum < changeableDuration.maximum)) {
        checkResult = false;
        decision = 'Error: Maximum duration must greater than minimum duration.';
    };

    if (durationType === 'fixed' && (changeableDuration !== undefined || fixedDuration === undefined)) {
        checkResult = false;
        decision = 'Error: Fixed type duration can only and must match a fixed value.';
    };

    if (durationType === 'unlimited' && (changeableDuration !== undefined || fixedDuration !== undefined)) {
        checkResult = false;
        decision = 'Error: Unlimited type duration cannot match fixed or changeable value.';
    };

    return { checkResult, decision };
}


async function checkServiceInfo(data) {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(30),
        rootCategory: Joi.required(),
        subCategories: Joi.array(),
        store: Joi.required(),
        duration: Joi.object().required(),
        maxPersonPerSection: Joi.number().required().min(1).max(200),
        maxServicePerSection: Joi.number().required().min(1),
        price: Joi.string().max(30),
        description: Joi.string().max(300)
    });

    const validatedData = await schema.validateAsync(data, { allowUnknown: true, stripUnknown: true });
    return validatedData;
}

async function checkServiceInfoUpdate(data) {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(30),
        subCategories: Joi.array(),
        duration: Joi.object().required(),
        maxPersonPerSection: Joi.number().required().min(1).max(200),
        price: Joi.string().max(30),
        description: Joi.string().max(300),
    });

    const validatedData = await schema.validateAsync(data, { allowUnknown: true, stripUnknown: true });
    return validatedData;
}


module.exports = {
    getAllInfos,
    getInfoById,
    addInfo,
    updateInfoById,
    discardInfoById,
    getDiscardedInfos
}
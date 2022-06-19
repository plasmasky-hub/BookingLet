const ServiceInfo = require('../models/serviceInfo');
const Store = require('../models/store');
const Order = require('../models/order');
const Joi = require('joi');


/** 
 * @swagger
 *   components:
 *      schemas:
 *          serviceInfo:
 *              type: Object
 *              required:
 *                  - name
 *              properties:
 *                  name:
 *                      type: string
 *                  _id:
 *                      type: objectId
 *                      description: auto generated unique identifier
 *                  rootCategory:
 *                      type: objectId
 *                      description: type of service
 *                  subCategories:
 *                      type: objectId
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
 *                  description: 'Standard service in this store'
*/
/** 
 * @swagger
 *   /v1/serviceInfo:
 *    get:
 *      summary: return all service infos (except discarded)
 *      tags: [ServiceInfo]
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
    const Infos = await ServiceInfo.find({ isDiscard: false }).exec();
    res.json(Infos);
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
 *                      $ref: '#/components/schemas/serviceInfo'
 *      responses:
 *          200:
 *              description: Successfully update a serviceInfo
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
*/
async function updateInfoById(req, res) {
    const validatedData = await checkServiceInfo(req.body);
    if (validatedData.error !== undefined) { return res.status(404).json(validatedData.error) };

    const { id } = req.params;
    const {
        name,
        rootCategory,
        subCategories,
        store,
        duration,
        maxPersonPerSection,
        maxServicePerSection,
        description,
        startTime
        //} = req.body;
    } = validatedData;
    const serviceInfo = await ServiceInfo.findByIdAndUpdate(id, {
        name,
        rootCategory,
        subCategories,
        store,
        duration,
        maxPersonPerSection,
        maxServicePerSection,
        description,
        startTime
    }, { new: true }).exec();

    if (!serviceInfo) {
        return res.status(404).json({
            error: 'service info not found',
        });
    }
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
    const refOrder = await Order.find({ serviceInfoId: id, cancelStatus: false }).exec();

    //I don't test order existence verification logic, because mongodb has no data in order collection
    const serviceInfo = await ServiceInfo.findByIdAndUpdate(id, { isDiscard: true }, { new: true }).exec();
    if (!serviceInfo) {
        return res.status(404).json({
            error: 'service info not found',
        });
    }
    await Store.updateMany({ serviceInfo: serviceInfo._id }, { $pull: { serviceInfo: serviceInfo._id } }).exec();
    res.sendStatus(204);

}


async function getDiscardedInfos(req, res) {
    const Infos = await ServiceInfo.find({ isDiscard: true }).exec();
    res.json(Infos);
}


async function checkServiceInfo(data) {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(30),
        rootCategory: Joi.required(),
        subCategories: Joi.array(),
        store: Joi.required(),
        duration: Joi.number().required().min(0.5).max(5),
        maxPersonPerSection: Joi.number().required().min(1).max(200),
        maxServicePerSection: Joi.number().required().min(1),
        description: Joi.string().max(300),
        startTime: [{
            dayOfWeek: Joi.string(),
            openHours: [Joi.string()]
        }],
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
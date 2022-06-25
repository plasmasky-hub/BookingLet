//order swagger

/** 
 * @swagger
 *   components:
 *      schemas:
 *          fullOrder:
 *              type: Object
 *              required:
 *                  - userId
 *                  - storeId
 *                  - serviceInfoId
 *                  - tel
 *              properties:
 *                  peopleNumber:  
 *                      type: Number
 *                      description: disclose how many people in this service order. 1-100, default 1
 *                  orderTime:
 *                      type: Object
 *                      description: includes 2 attributes
 *                      properties: 
 *                          date: 
 *                              type: Date
 *                          time:
 *                              type: String
 *                  bookingStatus:
 *                      type: Boolean
 *                      description: shows if the order has been accepted by store. default false
 *                  cancelStatus:
 *                      type: Boolean
 *                  userId: 
 *                      type: objectId
 *                  storeId:
 *                      type: objectId
 *                  serviceInfoId:
 *                      type: objectId
 *                  tel:
 *                      type: String
 *                      description: phone
 *                  optionInfo:
 *                      type: String
 *                      description: personal requirements of client
 *                  bookingTime:
 *                      type: Date
 *                      description: when the order was booking
 *                  _id:
 *                      type: objectId    
 *              example:
 *                  peopleNumber: 2
 *                  orderTime: {"date": "2022-06-18", "time": "1500"}
 *                  bookingStatus: false
 *                  cancelStatus: false
 *                  userId: "62971082feab058de9b66def"
 *                  storeId: "62b0804e6a846f06c1c52c63"
 *                  serviceInfoId: "62b080e16a846f06c1c52c65"
 *                  tel: "0401234567"
 *                  optionInfo: "more spicy"
 *                  bookingTime: "2022-06-18T12:11:04.855Z"
 *                  _id: 
 *          order:
 *              type: Object
 *              required:
 *                  - userId
 *                  - storeId
 *                  - serviceInfoId
 *                  - tel
 *              properties:
 *                  peopleNumber:  
 *                      type: Number
 *                      description: disclose how many people in this service order. 1-100, default 1
 *                  orderTime:
 *                      type: Object
 *                      description: includes 2 attributes
 *                      properties: 
 *                          date: 
 *                              type: Date
 *                          time:
 *                              type: String
 *                  bookingStatus:
 *                      type: Boolean
 *                      description: shows if the order has been accepted by store. default false
 *                  cancelStatus:
 *                      type: Boolean
 *                  userId: 
 *                      type: objectId
 *                  storeId:
 *                      type: objectId
 *                  serviceInfoId:
 *                      type: objectId
 *                  tel:
 *                      type: String
 *                      description: phone
 *                  optionInfo:
 *                      type: String
 *                      description: personal requirements of client
 *                  bookingTime:
 *                      type: Date
 *                      description: when the order was booking
 *                      
 *              example:
 *                  peopleNumber: 2
 *                  orderTime: {"date": "2022-06-18", "time": "1500"}
 *                  bookingStatus: false
 *                  cancelStatus: false
 *                  userId: "62971082feab058de9b66def"
 *                  storeId: "62b0804e6a846f06c1c52c63"
 *                  serviceInfoId: "62b080e16a846f06c1c52c65"
 *                  tel: "0401234567"
 *                  optionInfo: "more spicy"
 *                  bookingTime: "2022-06-18T12:11:04.855Z"
 *          
*/

/** 
 * @swagger
 *   /v1/order:
 *    get:
 *      summary: return all orders (except discarded)
 *      tags: [Order]
 *      responses:
 *          200:
 *              description: array of orders
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/order'
 *          400:
 *              description: Invalid request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object 
 *                          properties: 
 *                              message:
 *                                  type: string     
 *          404:
 *              description: Order data is empty in database 
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object 
 *                          properties: 
 *                              message:
 *                                  type: string                       
*/

/** 
 * @swagger
 *   /v1/order/{orderId}:
 *    get:
 *      summary: return an order by ID
 *      tags: [Order]
 *      parameters:
 *          - in: path
 *            name: orderId
 *            required: true
 *            schema: 
 *                type: string
 *            description: Unique ID automatically generated by mongodb
 *            example: '62a6ca699095c03945813d90'
 *      responses:
 *          200:
 *              description: Successfully returned an order
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/fullOrder'     
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

/** 
 * @swagger
 *  /v1/order:
 *   post:
 *      summary: add a new order to database 
 *      tags: [Order]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/order'
 *      responses:
 *          200:
 *              description: selected time is full, cannot book new order.
 *              content:
 *                  application/json:
 *                      example: {message: 'order full!'}
 *          201:
 *              description: Successfully create an order
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/fullOrder'     
 *          400:
 *              description: user has booked an order in same store same serviceInfo and same time. It cannot book twice.
 *              content:
 *                  application/json:
 *                      example: {error: 'Order already exists'}     
 *                      
*/

/** 
 * @swagger
 *  /v1/order/{orderId}:
 *   put:
 *      summary: modify an order in database 
 *      tags: [Order]
 *      parameters:
 *          - in: path
 *            name: orderId
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
 *                      $ref: '#/components/schemas/order'
 *      responses:
 *          200:
 *              description: Successfully update an order
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/fullOrder'     
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

/** 
 * @swagger
 *   /v1/order/{orderId}:
 *    delete:
 *      summary: delete an order by ID
 *      tags: [Order]
 *      parameters:
 *          - in: path
 *            name: orderId
 *            required: true
 *            schema: 
 *                type: string
 *            description: Unique ID automatically generated by mongodb
 *            example: '62aa9cd1a97477014bf74b8f'
 *      responses:
 *          204:
 *              description: Successfully discard an order
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

/** 
 * @swagger
 *  /v1/order/{orderId}/store:
 *   put:
 *      summary: confirm an order (usually by store) 
 *      tags: [Order]
 *      parameters:
 *          - in: path
 *            name: orderId
 *            required: true
 *            schema: 
 *                type: string
 *            description: Unique ID automatically generated by mongodb
 *            example: '62a6ca699095c03945813d90'
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      bookingStatus:
 *                          type: Boolean
 *                  example:
 *                      bookingStatus: false 
 *      responses:
 *          200:
 *              description: Successfully confirm an order
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/fullOrder'     
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

/** 
 * @swagger
 *  /v1/order/{orderId}/user:
 *   put:
 *      summary: cancel an order (by client user) 
 *      tags: [Order]
 *      parameters:
 *          - in: path
 *            name: orderId
 *            required: true
 *            schema: 
 *                type: string
 *            description: Unique ID automatically generated by mongodb
 *            example: '62a6ca699095c03945813d90'
 *      responses:
 *          200:
 *              description: Successfully cancel an order
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/fullOrder'     
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

/** 
 * @swagger
 *  /v1/repeatVerification:
 *   get:
 *      summary: View a list of order times and availability for the specified service at the specified store on the specified date.
 *      tags: [Order]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: Object
 *                      properties:
 *                          orderTime:
 *                              type: date
 *                          serviceInfoId:
 *                              type: objectId
 *                  example:
 *                      orderTime: "2022-06-18"
 *                      serviceInfoId: "62b087efcfa4b204b6fc0d56"
 *      responses:
 *          200:
 *              description: Successfully get an available time and availability object array
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: Array
 *                          properties:
 *                              orderTime: 
 *                                  type: String
 *                              availability:
 *                                  type: Boolean
 *                      example:
 *                          [{orderTime: "0800", availability: true}, {orderTime: "0900", availability: true}, {orderTime: "1230", availability: false}]
 *                                  
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












//user

/** 
 * @swagger
 *   components:
 *      schemas:
 *          fullUser:
 *              type: Object
 *              required:
 *                  - name
 *                  - tel
 *                  - email
 *              properties:
 *                  name:  
 *                      type: String
 *                      description: user name
 *                  tel:
 *                      type: String
 *                  email:
 *                      type: String
 *                  password: 
 *                      type: String
 *                      description: at least 6 chars
 *                  orders: 
 *                      type: Array
 *                      description: an array of objectId
 *                  role:
 *                      type: String
 *                      description: user is a customer or business owner.
 *                  stores:
 *                      type: Array
 *                      description: an array of objectId
 *                  favouriteStores:  
 *                      type: Array
 *                      description: an array of objectId
 *              example:
 *                  name: "Tony"
 *                  tel: "0451238275"
 *                  email: "s1234556@gmail.com"
 *                  password: "123456"
 *                  orders: ["62b07fc86a846f06c1c52c61"]
 *                  role: "Customer"
 *                  stores: ["62b0804e6a846f06c1c52c63"]
 *                  favouriteStores: ["62b08820cfa4b204b6fc0d5c", "62b088a0cfa4b204b6fc0d67"]
 *          user:
 *              type: Object
 *              required:
 *                  - name
 *                  - tel
 *                  - email
 *              properties:
 *                  name:  
 *                      type: String
 *                      description: user name
 *                  tel:
 *                      type: String
 *                  email:
 *                      type: String
 *                  password: 
 *                      type: String
 *                      description: at least 6 chars
 *                  orders: 
 *                      type: Array
 *                      description: an array of objectId
 *                  role:
 *                      type: String
 *                      description: user is a customer or business owner.
 *                  stores:
 *                      type: Array
 *                      description: an array of objectId
 *                  favouriteStores:  
 *                      type: Array
 *                      description: an array of objectId
 *                  _id: 
 *                      type: objectId
 *              example:
 *                  name: "Tony"
 *                  tel: "0451238275"
 *                  email: "s1234556@gmail.com"
 *                  password: "123456"
 *                  orders: ["62b07fc86a846f06c1c52c61"]
 *                  role: "Customer"
 *                  stores: ["62b0804e6a846f06c1c52c63"]
 *                  favouriteStores: ["62b08820cfa4b204b6fc0d5c", "62b088a0cfa4b204b6fc0d67"]
 *                  _id: "62971082feab058de9b66def"
 *          
*/
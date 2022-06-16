const Store = require('../models/store');

async function store(req, res){
    const {date,rootCategories, location,query} = req.body;

    const qRegExp = new RegExp(`.*${query}.*`,'i');

    const condition = {
        $or:[
            {name : qRegExp},
            {description: qRegExp}
        ],
        $and:[
            {rootCategories : rootCategories},
            {isDiscard:false}
        ]
    }

    const stores = await Store.find(condition).exec();

    res.json(stores);
}

async function order(req,res){

}
module.exports ={
    order,
    store,
};
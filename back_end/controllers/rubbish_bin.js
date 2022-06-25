async function getAllStores(req, res) {
    let { sortMethod = 'orderSize', person = 1, category, state, city, resultQuantity = 999999 } = req.body;

    let optionalMatchQuery = {};
    //if (category !== undefined) { optionalMatchQuery.rootCategories = category };  //这里无效，应该是数组问题。
    if (state !== undefined) { optionalMatchQuery['location.state'] = state };
    if (city !== undefined) { optionalMatchQuery['location.city'] = city };

    let a = await Store.aggregate([
        {
            $lookup: {
                from: "serviceinfos",
                let: { id: "$_id" },
                pipeline: [
                    {
                        $project:
                        {
                            store: 1, name: 1, maxPersonPerSection: 1, 
                            "startTime": {
                                $filter: {
                                    input: "$startTime.dayOfWeek",
                                    as: "startTimeDay",
                                    cond: { 
                                        $eq: [ '$$startTimeDay', 'Monday' ]
                                    }
                                }
                            }
                        }
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
                                        { $gte: ["$maxPersonPerSection", person] },
                                        //{ "$startTime.dayOfWeek": {$all: "Monday"}}
                                        //{ '$startTime': {$all: {"dayOfWeek":"Monday"}}}
                                        //{ $eq: ["$startTime.dayOfWeek", "Monday"]}
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
                        { "serviceInfoDetails": { $ne: [] } },  //问题：如果加入DATE搜索，此处就不会为空，要改逻辑
                        { "serviceInfoDetails.startTime": { $ne: [] } },
                        optionalMatchQuery,
                        // { "rootCategories": { $elemMatch: {$eq: "629f0bc95abd87303b5dcb17"} } }
                        // { rootCategories: { $all: ["629f0bc95abd87303b5dcb17"] } }  //可能是应该把objId转为字符串？
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
        console.log(result)
        res.json(result)
    }).catch((error) => {
        console.log(error)
        res.json(error)
    })
}

///////////////////////////////////////////////////filter with date. It just works....

async function getAllStores(req, res) {
    let { sortMethod = 'orderSize', person = 1, category, state, city, resultQuantity = 999999 } = req.body;

    let optionalMatchQuery = {};
    //if (category !== undefined) { optionalMatchQuery.rootCategories = category };  //这里无效，应该是数组问题。
    if (state !== undefined) { optionalMatchQuery['location.state'] = state };
    if (city !== undefined) { optionalMatchQuery['location.city'] = city };

    let a = await Store.aggregate([
        {
            $lookup: {
                from: "serviceinfos",
                let: { id: "$_id" },
                pipeline: [
                    {
                        $project:
                        {
                            store: 1, name: 1, maxPersonPerSection: 1
                        }
                    },
                    {
                        $match:
                        {
                            $expr:
                            {
                                $and:
                                    [
                                        //{ isDiscard: false },
                                        { $eq: ["$store", "$$id"] },
                                        { $gte: ["$maxPersonPerSection", person] },
                                    ]
                            }
                        }
                    }
                ],
                as: "serviceMaxPersonDetails"
            }
        },
        {
            $match: {
                $and:
                    [
                        { isDiscard: false },
                        { "serviceMaxPersonDetails": { $ne: [] } },  //问题：如果加入DATE搜索，此处就不会为空，要改逻辑
                        //optionalMatchQuery,
                        { rootCategories: { $all: ["629f0bc95abd87303b5dcb17"] } }
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
        console.log(result)
        res.json(result)
    }).catch((error) => {
        console.log(error)
        res.json(error)
    })
}
//////////////////////////////////current

async function getAllStores(req, res) {
    let { category, sortMethod = 'orderSize', state, city, resultQuantity = 999999 } = req.body;

    let searchQuery = { isDiscard: false };
    if (category !== undefined) { searchQuery.rootCategories = category };
    if (state !== undefined) { searchQuery['location.state'] = state };
    if (city !== undefined) { searchQuery['location.city'] = city };

    const stores = await Store.find(searchQuery).sort({ [sortMethod]: -1 }).limit(resultQuantity).exec();
    res.json(stores);
}
////////////////////////////////////////////////////////////////////////////original function, without aggregation

async function getAllStores(req, res) {
    let { sortMethod = 'orderSize', category, state, city, resultQuantity = 999999 } = req.body;

    let matchQuery = {
        //name: "basic massage 1"
    }

    let a = await Store.aggregate([   
        { 
            $lookup: { 
                from: "serviceinfos", 
                localField: "_id",  
                foreignField: "store", 
                as: "service_detail"
            } 
        },
        {
            $match: {
                isDiscard: true
            }
        },
        
    ]).then((result) => {
        console.log(result)
        res.json(result)
    }).catch((error) => {
        console.log(error)
        res.json(error)
    })
}


//////////////////////////////////////////////////////////////////////////////tested and succeeded, but it's not I need
async function getAllStores(req, res) {
    let { sortMethod = 'orderSize', person = 1, category, state, city, resultQuantity = 999999 } = req.body;

    let matchQuery = {
        //name: "basic massage 1"
    }

    let a = await Store.aggregate([
        {
            $lookup: {
                from: "serviceinfos",
                let: { id: "$_id" },
                pipeline: [
                    {
                        $project:
                        {
                            store: 1, name: 1, maxPersonPerSection: 1
                        }
                    },
                    {
                        $match:
                        {
                            $expr:
                            {
                                $and:
                                    [
                                        { $eq: ["$store", "$$id"] },
                                        { $gte: ["$maxPersonPerSection", person] },
                                    ]
                            }
                        }
                    }
                ],
                as: "serviceMaxPersonDetails"
            }
        },
        {
            $match: {
                $and:
                    [
                        { isDiscard: false },
                        { "serviceMaxPersonDetails": { $ne: [] } }
                    ]
            }
        },
        {
            $limit: resultQuantity
        }


    ]).then((result) => {
        console.log(result)
        res.json(result)
    }).catch((error) => {
        console.log(error)
        res.json(error)
    })
}

///////////////////////////////////////////////////////////////////////////////it just works!!!
async function getAllStores(req, res) {
    let { sortMethod = 'orderSize', person = 1, category, state, city, resultQuantity = 999999 } = req.body;

    let optionalMatchQuery = {};
    if (category !== undefined) { optionalMatchQuery.rootCategories = category };
    if (state !== undefined) { optionalMatchQuery['location.state'] = state };
    if (city !== undefined) { optionalMatchQuery['location.city'] = city };

    let a = await Store.aggregate([
        {
            $lookup: {
                from: "serviceinfos",
                let: { id: "$_id" },
                pipeline: [
                    {
                        $project:
                        {
                            store: 1, name: 1, maxPersonPerSection: 1
                        }
                    },
                    {
                        $match:
                        {
                            $expr:
                            {
                                $and:
                                    [
                                        { $eq: ["$store", "$$id"] },
                                        { $gte: ["$maxPersonPerSection", person] },
                                    ]
                            }
                        }
                    }
                ],
                as: "serviceMaxPersonDetails"
            }
        },
        {
            $match: {
                $and:
                    [
                        { isDiscard: false },
                        { "serviceMaxPersonDetails": { $ne: [] } },
                        optionalMatchQuery
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
        console.log(result)
        res.json(result)
    }).catch((error) => {
        console.log(error)
        res.json(error)
    })
}

///////////////////////////////////////////////////good version. without input words query and search by date


let maxPersonPerSection = await Store.aggregate([{
    $lookup: {
        from: 'serviceInfo',
        localField: '_id',
        foreignField: 'store',
        as: 'maxPersonArray'
    }
}, {
    $project: {
        name: 1,
        serviceInfos: {
            name: 1,
            maxPersonPerSection: 1
        }

    }
}])



async function getAllStores(req, res) {
    let { sortMethod = 'orderSize', category, state, city, resultQuantity = 999999 } = req.body;

    let a = await Store.aggregate([ 
        { 
            $lookup: { 
                from: "serviceInfo", 
                localField: "_id", 
                foreignField: "store", 
                as: "items"  
            } 
        },
        {
            $match: {
                
            }
        } 
    ])
    res.json(a)

    let searchQuery = {
        isDiscard: false,
    };
    if (category !== undefined) { searchQuery.rootCategories = category };
    if (state !== undefined) { searchQuery['location.state'] = state };
    if (city !== undefined) { searchQuery['location.city'] = city };

    const stores = await Store.find(searchQuery).sort({ [sortMethod]: -1 }).limit(resultQuantity).exec();
    //res.json(stores);
}




async function getAllStores(req, res) {
    let { sortMethod = 'orderSize', category, state, city, resultQuantity = 999999 } = req.body;

    let matchQuery = {
        name: "basic massage 1"
    }

    let a = await Store.aggregate([ 
        { 
            $lookup: { 
                from: "serviceInfo", 
                let: {'_id': '$_id'},
                pipeline: [{
                    $match: {
                        "$and": [
                            {"$expr": {"$eq": ['$serviceInfos', '$$_id'] }},
                            { "maxPersonPerSection": 10 }
                        ]
                    }
                }]
            } 
        },
        {
            $match: matchQuery
        } 
    ])
    res.json(a)

    let searchQuery = {
        isDiscard: false,
    };
    if (category !== undefined) { searchQuery.rootCategories = category };
    if (state !== undefined) { searchQuery['location.state'] = state };
    if (city !== undefined) { searchQuery['location.city'] = city };

    const stores = await Store.find(searchQuery, {name: 1, owner: 0}).sort({ [sortMethod]: -1 }).limit(resultQuantity).exec();
    //res.json(stores);
}
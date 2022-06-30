//req.body: {dayOfWeek: String, openHour: String, closingHour: String}
async function addStoreBusinessTimeById(req, res) {
    //1. 以storeId找到store
    //2. 遍历req.body的数组
    //3. 将req.body数组中的每一项拆分成微分时间
    //4. 把拆分后的微分时间，按照dayOfWeek插入store的businessHours中（合并）。
    //5. 如果是更新（删除原有的openHour，前端应该可以点击后删除）
    /*businessHours: [{
        dayOfWeek: String,
        openInterval: [Number]
    }],*/

    const { id } = req.params;
    let { dayOfWeek, openHour, closingHour } = req.body;
    const store = await Store.findById(id).exec();

    openHour = parseInt(openHour);         //string转换为number。为了方便计算
    closingHour = parseInt(closingHour);

    let businessHours = store.businessHours;     //取数组，查重，如果数组中没有前端发来的day则添加。
    let businessDayArr = businessHours.map((element)=>{
        return element.dayOfWeek;
    })
    if(businessDayArr.indexOf(dayOfWeek) === -1) {  //查重，因为数组中每周的每一天只有一个元素。
        businessHours.push({
            dayOfWeek,
            openInterval: []
        })
        await store.save();
    }

    let openInterval = [];
    for (let i = openHour; i < closingHour; i += 5) {   //将微分时间注入选定dayOfWeek中
        if (i % 100 < 60) {
            openInterval.push(i)
        };
    };
    res.json(store)
}
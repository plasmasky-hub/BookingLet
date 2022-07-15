### customer booking page-2 中 booking your experience

1. **choose your booking time**

   1. Start time

      由后端返回。

      API是 getBusinessTimeByDateAndServiceInfo()。后端会返回一个obj数组: `dbBusinessTimeObjArr`，格式为 [{ timeSlice: Number, reservation: Number, availability: Boolean}] 。例如 [{ timeSlice: 800, reservation: 2, availability: true}] 。

      其中，start time中要显示的时间必须满足以下条件：

      1. timeSlice 的 availablility === true

      2. 此条件又分为三种情况，根据 duration 类型不同来决定。

         1. typeof (duration) === unlimited。此时不做任何判断。

         2. typeof (duration) === fixed。

            首先把起始时间+duration的这个时间区间拆分成 timeSlice 数组：
         
            ```javascript
            let businessTimeArr = [];
                for (let i = startHour; i < endHour; i += 5) {
                    if (i % 100 < 60) { businessTimeArr.push(i); };
                }
            ```

            然后要验证duration时间区间内的 timeSlice 是否全部是营业时间的问题。验证方法为：
         
            先把 API 返回的Obj数组改装为 Number 数组：
         
            ```javascript
            let dbBusinessTimeArr = dbBusinessTimeObjArr.map((element) => {  
                   return element.timeSlice;
                }); 
            ```
         
            改装后，要验证 businessTimeArr 数组中的每一项是否在 dbBusinessTimeArr 中。如果有任何项不在，则说明此起始时间+duration 不是可选营业时间，即不满足显示该起始时间的条件。
         
            ```javascript
            let displayPermission = true;
            businessTimeArr.map((element)=>{
                if(dbBusinessTimeArr.indexOf(element) === -1){
                    displayPermission = false;
                }
            })
            ```
         
            
         
            如果所有项都在 dbBusinessTimeArr 数组中，则说明 此起始时间+duration 是营业时间，然后判定此营业时间区间内是否预约已满。此时应判定 businessTimeArr 数组中的所有 timeSlice，在其对应的 dbBusinessTimeObjArr 元素中，availability 是否全 === true。如果有任何 timeSlice 的 availability 不为 true，则预约时间已满，即不满足显示该起始时间的条件。
         
            ```javascript
            businessTimeArr.map((element)=>{
                let dbIndex = dbBusinessTimeObjArr.findIndex((ele)=>{ele.timeSlice === element});
                if (dbBusinessTimeObjArr[dbIndex].availability === false){
                    displayPermission = false;
                } 
            })
            ```
         
            
         
         3. typeof (duration) === changeablie，例如 1-1.5 h。此情况下，先取到 duration 范围中的最小值 （例如 1h），然后按照上一种情况处理。
         
            <font color='lightgrey'>*此处需要日后讨论的问题是，在确定了 library 之后，用户选择 duration 时，是否需要验证每个 duration 选项的可用性？</font>

      

   2. Duration

      Duration 分为三种情况，第一种是 fixed，例如固定 1h 不可变；第二种是 changeable，例如 1 - 2 h，范围由后端返回，具体 duration 由 user 选择。第三种是 unlimited。

      

   3. End time

      End time 是 start time + Duration 计算得到，并非用户可选，而是系统自动算出。根据 duration 类型：

      1. typeof (duration) === unlimited。此时 End time 显示无固定。
      2. typeof (duration) === fixed。此时 End time = start time + Duration。
      3. typeof (duration) === changeablie。此时 End time = start time + 用户选择的Duration。

   

2. Daily order calendar

   由后端返回。

   API是 getBusinessTimeByDateAndServiceInfo()。后端会返回一个obj数组: `dbBusinessTimeObjArr`，格式为 [{ timeSlice: Number, reservation: Number, availability: Boolean}] 。例如 [{ timeSlice: 800, reservation: 2, availability: true}] 。

   

   找一个自动生成柱状图的包，并且确定包中函数所需参数的格式。把 dbBusinessTimeObjArr 格式改装成所需格式并且传入。其中 x 轴为 timeSlice，y 轴为 reservation。

   注意： availability: false 的项为红色。休息时间（即 dbBusinessTimeObjArr 中缺失的时间节点）为灰色。x 轴的起始时间为 dbBusinessTimeObjArr 中第一项的 timeSlice，x 轴结束时间为 dbBusinessTimeObjArr 中最后一项的 timeSlice。可能前后留一点空白。

   注意：dbBusinessTimeObjArr 是无序的。如果 自动生成柱状图的包 所需数据必须有序，则需要自己排序。
import Axios from "axios";


export const FullHours = (setHours) =>{
    var mintemp =[]
    var temp = []
    var from
    var to;
    Axios.post('http://localhost:3001/getWorkTimeWCID', {CID:localStorage.getItem('CID')})
        .then((response) =>{
            mintemp.push(response.data[0].sunday_start,response.data[0].monday_start,response.data[0].tuesday_start,
            response.data[0].wednesday_start,response.data[0].thursday_start,response.data[0].friday_start,response.data[0].saturday_start)
            to = Math.max(response.data[0].sunday_end,response.data[0].monday_end,response.data[0].tuesday_end,
                response.data[0].wednesday_end,response.data[0].thursday_end,response.data[0].friday_end,response.data[0].saturday_end)
            from = Math.min(response.data[0].sunday_start,response.data[0].monday_start,response.data[0].tuesday_start,
                response.data[0].wednesday_start,response.data[0].thursday_start,response.data[0].friday_start,response.data[0].saturday_start)
            if(from === -1){
                var min = 100, secondMin = 100;
                for (let i= 0; i< 7; i++) {
                    if (mintemp[i]< min) {
                        secondMin = min;
                        min = mintemp[i]; 
                    }else if(mintemp[i] === min){

                    }else if (mintemp[i]< secondMin) {
                        secondMin = mintemp[i]; 
                    }
                }
                from = secondMin
            }
               
                
                for(from; from < to+1; from++){
                  temp.push(from + 1)
                }
                setHours(temp)
                
            })
        
}
export const dailyHours = (hour, setArray) =>{
    var start 
    var end
    var activeHours 
    var array= []
    var counter;
    Axios.post('http://localhost:3001/getWorkTimeWCID', {CID:localStorage.getItem('CID')})
    .then((response) =>{
        //sunday
        start = response.data[0].sunday_start
        end = response.data[0].sunday_end
        counter = 0
        activeHours = []
        for(start; start < end+1; start++){
            activeHours.push(start + 1)
          }

        if(response.data[0].sunday_active){
            for(let i = 0; i< hour.length;i++){
                if(hour[i]===activeHours[counter]){
                    counter++;
                    array.push({day: 1, hour: hour[i], checked:false, active:true})
                }else{
                    array.push({day: 1, hour: hour[i], checked:false, active:false})
                }
            }
        }else{
            for(let i = 0; i< hour.length;i++){
                array.push({day: 1, hour: hour[i], checked:false, active:false})
            }
        }
        ///////////////////////////////////////////////////////////////////////


        //monday
        start = response.data[0].monday_start
        end = response.data[0].monday_end
        counter = 0
        activeHours = []
        for(start; start < end+1; start++){
            activeHours.push(start + 1)
          }

        if(response.data[0].monday_active){
            for(let i = 0; i< hour.length;i++){
                if(hour[i]===activeHours[counter]){
                    counter++;
                    array.push({day: 2, hour: hour[i], checked:false, active:true})
                }else{
                    array.push({day: 2, hour: hour[i], checked:false, active:false})
                }
            }
        }else{
            for(let i = 0; i< hour.length;i++){
                array.push({day: 2, hour: hour[i], checked:false, active:false})
            }
        }
        ///////////////////////////////////////////////////////////////////////
        


        //tuesday
        start = response.data[0].tuesday_start
        end = response.data[0].tuesday_end
        counter = 0
        activeHours = []
        for(start; start < end+1; start++){
            activeHours.push(start + 1)
          }

        if(response.data[0].tuesday_active){
            for(let i = 0; i< hour.length;i++){
                if(hour[i]===activeHours[counter]){
                    counter++;
                    array.push({day: 3, hour: hour[i], checked:false, active:true})
                }else{
                    array.push({day: 3, hour: hour[i], checked:false, active:false})
                }
            }
        }else{
            for(let i = 0; i< hour.length;i++){
                array.push({day: 3, hour: hour[i], checked:false, active:false})
            }
        }
        ///////////////////////////////////////////////////////////////////////

        //wednesday
        start = response.data[0].wednesday_start
        end = response.data[0].wednesday_end
        counter = 0
        activeHours = []
        for(start; start < end+1; start++){
            activeHours.push(start + 1)
          }

        if(response.data[0].wednesday_active){
            for(let i = 0; i< hour.length;i++){
                if(hour[i]===activeHours[counter]){
                    counter++;
                    array.push({day: 4, hour: hour[i], checked:false, active:true})
                }else{
                    array.push({day: 4, hour: hour[i], checked:false, active:false})
                }
            }
        }else{
            for(let i = 0; i< hour.length;i++){
                array.push({day: 4, hour: hour[i], checked:false, active:false})
            }
        }
        ///////////////////////////////////////////////////////////////////////

        //thursday
        start = response.data[0].thursday_start
        end = response.data[0].thursday_end
        counter = 0
        activeHours = []
        for(start; start < end+1; start++){
            activeHours.push(start + 1)
          }

        if(response.data[0].thursday_active){
            for(let i = 0; i< hour.length;i++){
                if(hour[i]===activeHours[counter]){
                    counter++;
                    array.push({day: 5, hour: hour[i], checked:false, active:true})
                }else{
                    array.push({day: 5, hour: hour[i], checked:false, active:false})
                }
            }
        }else{
            for(let i = 0; i< hour.length;i++){
                array.push({day: 5, hour: hour[i], checked:false, active:false})
            }
        }
        ///////////////////////////////////////////////////////////////////////

        //friday
        start = response.data[0].friday_start
        end = response.data[0].friday_end
        counter = 0
        activeHours = []
        for(start; start < end+1; start++){
            activeHours.push(start + 1)
          }

        if(response.data[0].friday_active){
            for(let i = 0; i< hour.length;i++){
                if(hour[i]===activeHours[counter]){
                    counter++;
                    array.push({day: 6, hour: hour[i], checked:false, active:true})
                }else{
                    array.push({day: 6, hour: hour[i], checked:false, active:false})
                }
            }
        }else{
            for(let i = 0; i< hour.length;i++){
                array.push({day: 6, hour: hour[i], checked:false, active:false})
            }
        }
        ///////////////////////////////////////////////////////////////////////

        //saturday
        start = response.data[0].saturday_start
        end = response.data[0].saturday_end
        counter = 0
        activeHours = []
        for(start; start < end+1; start++){
            activeHours.push(start + 1)
          }

        if(response.data[0].saturday_active){
            for(let i = 0; i< hour.length;i++){
                if(hour[i]===activeHours[counter]){
                    counter++;
                    array.push({day: 7, hour: hour[i], checked:false, active:true})
                }else{
                    array.push({day: 7, hour: hour[i], checked:false, active:false})
                }
            }
        }else{
            for(let i = 0; i< hour.length;i++){
                array.push({day: 7, hour: hour[i], checked:false, active:false})
            }
        }
        ///////////////////////////////////////////////////////////////////////
        setArray(array)
    })
}

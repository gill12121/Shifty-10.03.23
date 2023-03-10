import Axios from "axios";

export const Sunday = (start, end, active) => {
    if(active){
        Axios.post('http://localhost:3001/setFirstWorkTimeSun', {S: start, E: end,A:'1' , CID:localStorage.getItem('CID')})

    }else{
        Axios.post('http://localhost:3001/setFirstWorkTimeSun', {S: '-1', E: '-1',A:'0' , CID:localStorage.getItem('CID')})

    }
}
export const Monday = (start, end, active) => {
    if(active){
        Axios.post('http://localhost:3001/setFirstWorkTimeMon', {S: start, E: end,A:'1' , CID:localStorage.getItem('CID')})

    }else{
        Axios.post('http://localhost:3001/setFirstWorkTimeMon', {S: '-1', E: '-1',A:'0' , CID:localStorage.getItem('CID')})

    }
}
export const Tuesday = (start, end, active) => {
    if(active){
        Axios.post('http://localhost:3001/setFirstWorkTimeTue', {S: start, E: end,A:'1' , CID:localStorage.getItem('CID')})

    }else{
        Axios.post('http://localhost:3001/setFirstWorkTimeTue', {S: '-1', E: '-1',A:'0' , CID:localStorage.getItem('CID')})

    }
}
export const Wednesday = (start, end, active) => {
    if(active){
        Axios.post('http://localhost:3001/setFirstWorkTimeWed', {S: start, E: end,A:'1' , CID:localStorage.getItem('CID')})

    }else{
        Axios.post('http://localhost:3001/setFirstWorkTimeWed', {S: '-1', E: '-1',A:'0' , CID:localStorage.getItem('CID')})

    }
}
export const Thursday = (start, end, active) => {
    if(active){
        Axios.post('http://localhost:3001/setFirstWorkTimeThu', {S: start, E: end,A:'1' , CID:localStorage.getItem('CID')})

    }else{
        Axios.post('http://localhost:3001/setFirstWorkTimeThu', {S: '-1', E: '-1',A:'0' , CID:localStorage.getItem('CID')})

    }
}
export const Friday = (start, end, active) => {
    if(active){
        Axios.post('http://localhost:3001/setFirstWorkTimeFri', {S: start, E: end,A:'1' , CID:localStorage.getItem('CID')})

    }else{
        Axios.post('http://localhost:3001/setFirstWorkTimeFri', {S: '-1', E: '-1',A:'0' , CID:localStorage.getItem('CID')})

    }
}
export const Saturday = (start, end, active) => {
    if(active){
        Axios.post('http://localhost:3001/setFirstWorkTimeSat', {S: start, E: end,A:'1' , CID:localStorage.getItem('CID')})

    }else{
        Axios.post('http://localhost:3001/setFirstWorkTimeSat', {S: '-1', E: '-1',A:'0' , CID:localStorage.getItem('CID')})

    }
}

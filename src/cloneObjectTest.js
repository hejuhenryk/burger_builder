const myState = {
    user: {
        name: {
            first: 'Martin',
            last: 'Sawczuk-Szymkiewicz',
            middle: null
        }, 
        dateOfBirth: new Date('Juni 7, 1983 12:24:00'),
        children: [
            { firstName: 'Markus', dateOfBirth: new Date('Juni 19, 2015 11:45:00')},
            { firstName: 'Marika', dateOfBirth: new Date('Januar 29, 2012 22:50:00')}
        ],
        id: `ID${Math.random()}`
    }
}
/////////////////////////////////////////////////
// it is ok but only for JSON safe ojects, dates will not be dates after that metod 
/////////////////////////////////////////////////
let clone1 = obj => {
    return JSON.parse(JSON.stringify(obj))
}
/////////////////////////////////////////////////
// it is working on first level but not on the secund and third ... ;(  
/////////////////////////////////////////////////
let clone2 = obj => {
    return Object.assign({}, obj)
}
/////////////////////////////////////////////////
// maybe i fucked something up but this recurtion method shoud work but it does not with dates neighter 
/////////////////////////////////////////////////
const isObject = obj => {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}
let clone3 = obj => {
    let target = {};
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (isObject(obj[prop])) {
                target[prop] = clone3(obj[prop]);
            } else {
                target[prop] = obj[prop];
            }
        }
    }
    return target;
}
/////////////////////////////////////////////////
// as in name. good for flat objects 
/////////////////////////////////////////////////
let shalowCopy = obj => {
    return {...obj}
}
/////////////////////////////////////////////////
// there is some ready libralis for deep copying but... you know sell 

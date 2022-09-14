interface Meeting {
    startTime:{
        hours: number ,
        minutes:number
    },
    endTime:{
        hours:number,
        minutes:number
    },
    _id? : string,
    name:string,
    description:string,
    date:string,
    attendees:[{email : string}]
} 

export {Meeting}
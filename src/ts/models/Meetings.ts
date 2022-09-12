interface Meeting {
    startTime:{
        hours: number ,
        minutes:number
    },
    endTime:{
        hours:number,
        minutes:number
    },

    name:string,
    description:string,
    date:string,
    attendees:[{email : string}]
} 

export {Meeting}
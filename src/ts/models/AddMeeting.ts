interface AddMeeting{
    name : string,
    description : string ,
    date : string,
    startTime : {
        hours : number,
        minutes : number
    },
    endTime : {
        hours : number,
        minutes : number
    },
    attendees : string[]
}

export {AddMeeting}
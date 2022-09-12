interface Team{
    name : string ,
    shortName : string ,
    description : string ,
    members : [
        {
            userId : number,
            email : string
        }
    ]
}

export {Team};
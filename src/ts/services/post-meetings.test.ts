import {addMeeting} from './post-meetings'
import meetings from '../data/meetings';


test( 'add-meeting will forward the added meeting',( done )=>{
    addMeeting( {
        name: "Google marketing campaign",
        description: "Increasing brand awareness and spreading information about new products",
        date: "2020-10-28",
        startTime: {
            hours: 9,
            minutes: 0
        },
        endTime: {
            hours: 10,
            minutes: 30
        },
        attendees: [
            "aaron.fernandes@gmail.com",
            "rehan.pathan@publicisgroupe.com"
        ]
    } )
        .then( ( response )=>{
            expect( response ).toEqual(
                {
                    name: "Google marketing campaign",
                    description: "Increasing brand awareness and spreading information about new products",
                    date: "2020-10-28",
                    startTime: {
                        hours: 9,
                        minutes: 0
                    },
                    endTime: {
                        hours: 10,
                        minutes: 30
                    },
                    attendees: [
                        "aaron.fernandes@gmail.com",
                        "rehan.pathan@publicisgroupe.com"
                    ]
                }
            );
            //   expect(response).toEqual(meetings);

            done();
        } )
} )
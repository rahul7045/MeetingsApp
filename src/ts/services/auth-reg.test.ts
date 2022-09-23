import { register } from "./auth-reg";
test( 'register service return success on registering ',( done )=>{
    register( {
        name: "Rahul Pujari",
        email: "rahulpujari525@sapient.com",
        password: "Rahul@2000"
    } )
        .then( ( response )=>{
        //?
            done();
        } )
} )
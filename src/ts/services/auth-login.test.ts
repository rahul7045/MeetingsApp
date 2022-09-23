import { loginUser } from './auth-login'
test( 'login service will forward the token recieved from backend',( done )=>{
    loginUser( {
        "email": "rahulpujari@example.com",
        "password": "Rahul@123"
    } )
        .then( ( response )=>{
            // expect(response instanceof Array).toBe(true);
            expect( response ).toEqual( {
                "message": "Signed in sucessfully",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhaHVscHVqYXJpQGV4YW1wbGUuY29tIiwidXNlcklkIjoiNjJmMGNhOTdhZDcxNTAwMDE1YzhiZTMyIiwiaWF0IjoxNjYzMjEzNDI5LCJleHAiOjE2NjMyOTk4Mjl9.ZHYosrR1r7dTn9IDoirsbfVxZNI2G1oVlrlpmIWtsSk",
                "email": "rahulpujari@example.com",
                "name": "Rahul Pujari"
            } );
            done();
        } )
} )
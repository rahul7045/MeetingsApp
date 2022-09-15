import { rest } from 'msw';

import meetings from '../data/meetings';
import teams from '../data/team';
import users from '../data/users';

const handlers = [
    rest.get( `https://mymeetingsapp.herokuapp.com/api/calendar`, ( req, res, ctx ) => {
        return res(
            ctx.json( meetings )
        );
    } ),
    rest.get( `https://mymeetingsapp.herokuapp.com/api/users`, ( req, res, ctx ) => {
        return res(
            ctx.json( users )
        );
    } ),
    rest.get( `https://mymeetingsapp.herokuapp.com/api/teams`, ( req, res, ctx ) => {
        return res(
            ctx.json( teams )
        );
    } ),
    rest.get( `https://mymeetingsapp.herokuapp.com/api/meetings`, ( req, res, ctx ) => {
        return res(
            ctx.json( meetings )
        );
    } ),
    rest.post( 'https://mymeetingsapp.herokuapp.com/api/auth/login',( res,req,ctx ) => {
        return res(
            ctx.status( 200 ),
            ctx.json( {
                "message": "Signed in sucessfully",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhaHVscHVqYXJpQGV4YW1wbGUuY29tIiwidXNlcklkIjoiNjJmMGNhOTdhZDcxNTAwMDE1YzhiZTMyIiwiaWF0IjoxNjYzMjEzNDI5LCJleHAiOjE2NjMyOTk4Mjl9.ZHYosrR1r7dTn9IDoirsbfVxZNI2G1oVlrlpmIWtsSk",
                "email": "rahulpujari@example.com",
                "name": "Rahul Pujari"
            } )
        );
    } ),
    rest.post( 'https://mymeetingsapp.herokuapp.com/api/auth/register',( res,req,ctx ) => {
        return res(
            ctx.status( 200 )
            // ctx.json({
            //     message: "Signed in sucessfully",
            //     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlByYXZlZW5rdW1hcjRAZXhhbXBsZS5jb20iLCJ1c2VySWQiOiI2MmYwZDI3N2FkNzE1MDAwMTVjOGJlNTIiLCJpYXQiOjE2NjMwODg1MDMsImV4cCI6MTY2MzE3NDkwM30.ZNqF9drwt7lbuocdX2XlEP7Xr2_7ueWUq1IhNoX0okI",
            //     email: "Praveenkumar4@example.com",
            //     name: "Praveen Kumar"
            // })
        );
    } ),
    rest.post( 'https://mymeetingsapp.herokuapp.com/api/meetings',( res,req,ctx ) => {
        console.log(req);
        return res(
            ctx.status( 201 ),
            ctx.json(
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
            )
        );
    } ),
    rest.post( 'https://mymeetingsapp.herokuapp.com/api/teams',( req,res,ctx ) => {
        return res(
            ctx.status( 200 ),
            ctx.json(
                {
                    name: "Agile team",
                    shortName: "agile-emperor",
                    description: "Team spreading awareness about Agile practices at Zwiggy",
                    members: [
                        {
                            userId: "62cac5263bc6d2001598c5ac",
                            email: "jane.doe@example.com"
                        },
                        {
                            userId: "62f50e9b8c5a13001599dd3d",
                            email: "john.doe@example.com"
                        },
                        {
                            userId: "62f0d277ad71500015c8be52",
                            email: "Praveenkumar4@example.com"
                        }
                    ]
                }
            )
        )
    } ),

    rest.patch( `https://mymeetingsapp.herokuapp.com/api/teams/62fc71f99176720015231e9a`, ( req, res, ctx ) =>{
        return res(
            ctx.json( teams )
        );
    } )
]

export default handlers;

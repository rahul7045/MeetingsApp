import '../../scss/pages/LoginRegister.scss';
import { LoginValidation } from '../services/login-validation';
import { loginUser } from '../services/auth-login';
import {loadPage } from '../index'
class Login {
    LogDetails : HTMLElement | null = null;

    addEventListener =() => {
        ( this.LogDetails as HTMLFormElement ).addEventListener( 'submit', function( event ) {
            event.preventDefault();

            const creds = {

                email: ( document.getElementById( "login-email" ) as HTMLInputElement ).value.trim(),

                password: ( document.getElementById( "login-password" ) as HTMLInputElement ).value.trim()

            };
            loginUser( creds )
                .then( function ( loginResponse ) {
                    console.log( loginResponse );
                    history.pushState( "" , "" , "/calendar.html" );
                    loadPage( location.pathname );
                    //window.location.assign("./calendar.html");
                    //location.reload();
                } )
        
                .catch( function ( error ) {
                    alert( error.response );
                } );
        } );
    }


    load = () => {
        this.LogDetails = document.getElementById( 'login-form' ) as HTMLFormElement;
        const loginValidation = new LoginValidation();
        loginValidation.load();
        this.addEventListener();
    }
} 

export {Login}
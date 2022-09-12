import { HtmlTagObject } from "html-webpack-plugin";
import {logout} from "./services/auth"
const menuToggler:HTMLElement = document.querySelector( '.menu-toggler' ) as HTMLElement;
const nav :HTMLElement = document.querySelector( '.navbar' ) as HTMLElement;
const logoutBtn:HTMLElement = document.querySelector('#logout') as HTMLElement;
let displayUsername  ;

displayUsername  = document.getElementById('display-uname') as HTMLElement ;
displayUsername.innerHTML = localStorage.getItem('email')

menuToggler.onclick = function() {
nav.classList.toggle( 'd-sm-none' );
};

logoutBtn.addEventListener( 'click', function() {
    logout();

    window.location.href = './login-and-registration-page/login.html';
});

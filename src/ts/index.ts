import {Login} from './pages/login';
import {Register} from './pages/register';
import {Calender} from './pages/calendar';
import {displayFilter} from './pages/display-filter-meetings';
import {Meeting} from './pages/meeting';
import {Teams} from './pages/show-teams';
import {isAuthenticated}  from './services/auth-login'
//import {RegisterValidation} from './services/validation';
//import {LoginValidation} from './services/login-validation';

//import {addTeam} from './pages/add-team';
//import {Meeting} from './pages/meeting';





interface Constructable<T> {
    new( ...args: any ) : T;
}

interface Routes<T> {
    [key: string]: {
        template: string,
        Controller: Constructable<T> | null,
        auth: boolean

    }
}

/**
 * Setup routes
 */
const routes : Routes<any>  = {
    '/': {
        template: 'login',
        Controller: Login,
        auth: false

    },
    '/login.html': {
        template: 'login',
        Controller: Login,
        auth: false

    },
    '/register.html': {
        template: 'register',
        Controller: Register,
        auth: false

    },
    '/calendar.html': {
        template: 'home',
        Controller: Calender,
        auth: false

    },
    '/meetings.html': {
        template: 'meeting',
        Controller: Meeting,
        auth: true

    },
    '/teams.html': {
        template: 'teams',
        Controller: Teams,
        auth: true

    },
    '*': {
        template: 'page-not-found',
        Controller: null,
        auth: false
    }
};


const setupLinks = () => {
    // 1. Prevent loading of new page when a link is clicked
    const links = document.querySelectorAll( 'a' );

    links.forEach(
        link => {
            link.addEventListener( 'click', function( event ) {
                event.preventDefault();

                // 2. Change the URL in the address bar (using history.pushState( '', '', newUrl ))
                const nextPageUrl = link.getAttribute( 'href' );

                history.pushState( '', '', nextPageUrl );

                // 3. Change the content of the page according to the new URL (read the right template and set it within the #root). Execute the JS required page JS.
                loadPage( location.pathname );
            } );
        }
    );
};

const loadPage = ( pathname : string ) => {
    let route;

    if( pathname in routes ) {
        route = routes[pathname];
    }else{
        route = routes['*'];

    }

    
    if( route?.auth === true ) {
        if( isAuthenticated() === false ) {
            loadPage( '/login.html' );
            return;
        }
    }

    if( route?.template ) {
        // load the page content inside <div id="root"></div>
        const root = document.getElementById( 'root' ) as HTMLElement;
        const tpl = ( document.getElementById( route.template ) as HTMLTemplateElement ).innerHTML;
        root.innerHTML = tpl;
    }



    // initialize the page
    if( route?.Controller ) {
        ( new route.Controller() ).load();
        setupLinks();
    }
}
loadPage( location.pathname );

// handle popstate event (fired when back/forward button is clicked)
window.addEventListener( 'popstate', function() {
    // load the new page based on the new url
    loadPage( location.pathname );
} );

loadPage( location.pathname );

export {loadPage};
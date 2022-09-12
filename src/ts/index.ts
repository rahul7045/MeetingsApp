import Login from './pages/login';
import Home from './pages/home';
import WorkshopsList from './pages/workshops-list';
import AddWorkshop from './pages/add-workshop';

// interface for a function that can be called with new
interface Constructable<T> {
    new( ...args: any ) : T;
}

interface Routes<T> {
    [key: string]: {
        template: string,
        Controller: Constructable<any> | null
    }
}

/**
 * Setup routes
 */
const routes : Routes = {
    '/login.html': {
        template: 'login',
        Controller: Login
    },
    '/index.html': {
        template: 'home',
        Controller: Home
    },
    '/workshops-list.html': {
        template: 'workshops-list',
        Controller: WorkshopsList
    },
    '/add-workshop.html': {
        template: 'add-workshop',
        Controller: AddWorkshop
    },
    '*': {
        template: 'page-not-found',
        Controller: null
    }
};

/**
 * 1. Prevent loading of new page when a link is clicked
 * 2. Change the URL in the address bar (using history.pushState( '', '', newUrl ))
 * 3. Change the content of the page according to the new URL (read the right template and set it within the #root). Execute the JS required page JS.
 */
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

// handle popstate event (fired when back/forward button is clicked)
window.addEventListener( 'popstate', function() {
    // load the new page based on the new url
    loadPage( location.pathname );
} );

loadPage( location.pathname );
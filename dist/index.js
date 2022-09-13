import { Login } from './pages/login';
import { Calender } from './pages/calendar';
import { Meeting } from './pages/meeting';
/**
 * Setup routes
 */
const routes = {
    '/login.html': {
        template: 'login',
        Controller: Login
    },
    '/index.html': {
        template: 'home',
        Controller: Calender
    },
    '/add-meeting.html': {
        template: 'meeting',
        Controller: Meeting
    },
    '*': {
        template: 'page-not-found',
        Controller: null
    }
};
const setupLinks = () => {
    // 1. Prevent loading of new page when a link is clicked
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            // 2. Change the URL in the address bar (using history.pushState( '', '', newUrl ))
            const nextPageUrl = link.getAttribute('href');
            history.pushState('', '', nextPageUrl);
            // 3. Change the content of the page according to the new URL (read the right template and set it within the #root). Execute the JS required page JS.
            loadPage(location.pathname);
        });
    });
};
const loadPage = (pathname) => {
    let route;
    if (pathname in routes) {
        route = routes[pathname];
    }
    if (route === null || route === void 0 ? void 0 : route.template) {
        // load the page content inside <div id="root"></div>
        const root = document.getElementById('root');
        const tpl = document.getElementById(route.template).innerHTML;
        root.innerHTML = tpl;
    }
    // initialize the page
    if (route === null || route === void 0 ? void 0 : route.Controller) {
        (new route.Controller()).load();
        setupLinks();
    }
};
// handle popstate event (fired when back/forward button is clicked)
window.addEventListener('popstate', function () {
    // load the new page based on the new url
    loadPage(location.pathname);
});
loadPage(location.pathname);
//# sourceMappingURL=index.js.map
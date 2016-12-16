/**
 * Created by chan on 12/6/16.
 *
 * Heavily borrowed from https://github.com/ModusCreateOrg/react-dynamic-route-loading-es6
 */
const onErrorLoading = (err) => {
    console.error('loading failed', err);
}

const loadRoute = (cb) => (module) => cb(null, module.default);

export const routes = {
    childRoutes: [
        {
            path: '/',
            getComponent(nextState, cb) {
                System.import('../pages/TodoApp').then(loadRoute(cb)).catch(onErrorLoading);
            }
        },
        {
            path: '/about',
            getComponent(nextState, cb) {
                System.import('../pages/About').then(loadRoute(cb)).catch(onErrorLoading);
            }
        },
        {
            path: '/settings',
            getComponent(nextState, cb) {
                System.import('../pages/Settings').then(loadRoute(cb)).catch(onErrorLoading);
            }
        },
        {
            path: '*',
            getComponent(nextState, cb) {
                System.import('../pages/NotFound').then(loadRoute(cb)).catch(onErrorLoading);
            }
        }
    ]
}
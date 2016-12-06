/**
 * Created by chan on 12/6/16.
 */
const onErrorLoading = (err) => {
    console.error('Dynamic page loading failed', err);
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
/**
 * Created by weaker on 12/12/2016.
 */
const Router = require('koa-router');
const router = new Router();
import todo from './koa_todos';

todo(router);

export default router;

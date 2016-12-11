/**
 * Created by weaker on 12/12/2016.
 */
const api = require('../middleware/api');

export default function (router) {
    router.get('/koa_todos',async function(ctx, next) {
        ctx.body = await api.getTodos();
    });
    router.put('/koa_todos',async function(ctx, next) {
        console.log(ctx.body);
        ctx.body = await api.saveTodos(ctx.body);
    });
};
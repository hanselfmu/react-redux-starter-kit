/**
 * Created by weaker on 10/12/2016.
 */
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
import router from './routes/koa_index';

const port = process.env.PORT || 3000;


/**
 * use koa-static to serve static files
 */
// static serve package.json
app.use(serve('../.'));
// static serve assets
app.use(serve('../client/style'),'/assets/*');
// static serve build resources
app.use(serve('../client/build'),'/build/*');
// static serve app.html
app.use(serve('../client'),'app.html');

//parse body
app.use(bodyParser());

//log request
app.use(async (ctx,next) =>{
    var start = new Date;
    await next();
    var ms = new Date - start;
    console.log('%s %s - %s', ctx.method, ctx.url, ms);
});

// err response
app.use(async (ctx, next) => {
    try {
        await next(); // next is now a function
    } catch (err) {
        ctx.body = { message: err.message };
        ctx.status = err.status || 500;
    }
});

//route unmapped url to app.html
router.redirect('/*','/app.html');

//load routes
app.use(router.routes());

//start server
app.listen(port,function () {
    console.log(`server listening on port ${port}`);
});
/**
 * Created by chan on 11/22/16.
 */
const Koa = require('koa')
const route = require('koa-route')
const app = new Koa()

app.use(async function (ctx, next) {
    const start = new Date()
    await next()
    const ms = new Date() - start
    ctx.set('X-Response-Time', `${ms}ms`)
})

// logger

app.use(async function (ctx, next) {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

// response
app.use(route.get('/app', serve('../frontend/app.html')))

app.listen(3000)
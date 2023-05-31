import Router from "koa-router";

// creating router instance to define /hello endpoints
const router = new Router({ prefix: '/hello' });

// define hello route
router.get('/', async (ctx) => {
	console.info('hello word called', { url: ctx.req.url, method: ctx.req.method });
	ctx.ok(200, null, 'Hello World!');
});

export default () => router.routes();
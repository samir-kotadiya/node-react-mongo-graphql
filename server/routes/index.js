import Router from 'koa-router';
// import hello routes
import helloRoutes from './hello.routes';
import usersRoutes from './users.routes';

// create koa router instance and attach all routes
const router = new Router({ prefix: '/api/v1' });

// attach hello routes and other as needed
router.use(helloRoutes());
router.use(usersRoutes());

export default router;


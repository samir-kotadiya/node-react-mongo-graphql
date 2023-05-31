import Router from "koa-router";
import User from '../models/user.model'

// creating router instance to define /users endpoints
const router = new Router({ prefix: '/users' });

/**
 * route to fetch users with email domain "example.com"
 */
router.get('/domain', async (ctx) => {
	try {
		// fetch users users with the email domain "example.com".
		const users = await User.find({ email: { $regex: /@example\.com$/ } }).select('_id name email').lean();
		// set response status code and body
		ctx.ok(200, users, 'Users fetch succesfully');
	} catch (error) {
		ctx.internalServerError(error);
	}
});

/**
 * route to fetch all users
 */
router.get('/', async (ctx) => {
	try {
		// fetch all users
		const users = await User.find();
		// set response status code and body
		ctx.ok(200, users, 'Users fetch succesfully');
	} catch (error) {
		ctx.internalServerError(error);
	}
});

/**
 * route to create new user
 * Note: password and token will be generated in mongoose pre hook
 */
router.post('/', async (ctx) => {
	try {
		const { name, email, password } = JSON.parse(ctx.request.body);
		const user = await User.findOne({ email }).select('_id name email').lean();
		if (user) {
			return ctx.badRequest(400, `${email} already exists`);
		}
		const createdUser = await User.create({ name, email, password, token: 'token' });
		ctx.ok(200, createdUser, 'User added succesfully');
	} catch (error) {
		ctx.internalServerError(error);
	}
});

/**
 * route to update user by id
 * Note: password will be re generated in mongoose hook
 */
router.put('/:id', async (ctx) => {
	try {
		const { name, email, password } = JSON.parse(ctx.request.body);		
		const user = await User.findOneAndUpdate({ _id: ctx.request.params.id }, { name, email, password }, { new: true }).select('_id name email').lean();
		if (!user) {
			return ctx.badRequest(400, `${email} not exists`);
		}
		ctx.ok(200, user, 'User updated succesfully');
	} catch (error) {
		ctx.internalServerError(error);
	}
});


export default () => router.routes();
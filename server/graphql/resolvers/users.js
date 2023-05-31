import User from '../../models/user.model';

// Define GraphQL resolvers
export default {
	Query: {
		/**
		 * Resolver for get all users
		 * @returns 
		 */
		getUsers: async () => { return User.find().select('_id name email').lean(); },
		/**
		 * Resolver for get user by id
		 * @param {*} parent 
		 * @param {*} param1 
		 * @returns 
		 */
		getUserById: async (parent, { id }) => User.findOne({ _id: id }).lean(),
	},
	Mutation: {
		/**
		 * Resolver to create new user
		 * Note: password and token will be generated in mongoose hook
		 * @param {*} parent 
		 * @param {*} payload 
		 * @returns 
		 */
		createUser: async (parent, { name, email, password }) => {
			if (!name || !email || !password) throw new Error('mising required data');
			const user = await User.findOne({ email }).select('_id').lean();
			if (user) {
				return ctx.badRequest(400, `${email} already exists`);
			}
			return User.create({ name, email, password });
		},
		/**
		 * Resolver to update given user by id
		 * Note: password will be re generated in mongoose hook
		 * @param {*} parent 
		 * @param {*} payload 
		 * @returns 
		 */
		updateUser: async (parent, { id, name, email, password }) => {
			if (!id || !name || !email || !password) throw new Error('mising required data');
			const user = await User.findOneAndUpdate({ _id: id }, { name, email, password }, { new: true }).select('_id name email').lean();
			if (!user) {
				throw new Error('user not found');
			}
			return user;
		},
		/**
		 * Resolver for delete user by id
		 * @param {*} parent 
		 * @param {*} payload 
		 * @returns 
		 */
		deleteUser: async (parent, { id }) => {
			const user = await User.findById(id).lean();
			if (user) {
				await User.deleteOne({ _id: user._id });
				return user._id;
			}
			throw new Error('invalid id provided');
		},
	},
};
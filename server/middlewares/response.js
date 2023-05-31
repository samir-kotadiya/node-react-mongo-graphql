// middlewatre for attaching common response functions
export default async (ctx, next) => {
	ctx.ok = (code = 200, data = null, message = '') => {
		ctx.status = code;
		ctx.body = { statusCode: 200, message, data };
	}
	ctx.badRequest = (code = 400, message = '') => {
		ctx.status = code;
		ctx.body = { statusCode: 400, message };		
	}
	ctx.internalServerError = (err) => {
		console.log('err' ,err.message)
		ctx.status = 500;
		ctx.body = { statusCode: 500, message: 'Internal Server Error!' };
	}
	
	await next();
}
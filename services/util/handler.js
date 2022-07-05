export default function handler(lambda) {
	return async function (event, context) {
		let body, statusCode;
		try {
			// run the lambda
			body = await lambda(event, context);
			statusCode = 200;
		} catch (err) {
			console.error(err);
			body = { error: err.message };
			statusCode = 500;
		}

		// return http response status code
		return {
			statusCode,
			body: JSON.stringify(body),
		};
	};
}

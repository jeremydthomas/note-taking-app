import { Api, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }) {
	const { table } = use(StorageStack);

	// Create the API
	const api = new Api(stack, "Api", {
		defaults: {
			function: {
				permissions: [table],
				environment: { TABLE_NAME: table.tableName },
			},
		},
		routes: {
			"POST /notes": "functions/create.main",
		},
	});

	// Show the Api endpoint in the output
	stack.addOutputs({
		ApiEndpoint: api.url,
	});

	// return the api resource
	return {
		api,
	};
}

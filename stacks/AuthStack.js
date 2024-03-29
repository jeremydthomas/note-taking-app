import * as iam from "aws-cdk-lib/aws-iam";
import {Cognito, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";
import { ApiStack } from "./ApiStack";

export function AuthStack({ stack, app }) {
	const { bucket } = use(StorageStack);
	const { api } = use(ApiStack);

	// crete a cognito user pool and identity pool
	const auth = new Cognito(stack, "Auth", {
		login: ["email"],
	});

	auth.attachPermissionsForAuthUsers(stack,[
		// allow access to the api
		api,
		// policy granting access to a specific folder in the bucket
		new iam.PolicyStatement({
			actions: ["s3:*"],
			effect: iam.Effect.ALLOW,
			resources: [
				bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
			],
		}),
	]);

	// Show the auth resources in the output
	stack.addOutputs({
		Region: app.region,
		UserPoolId: auth.userPoolId,
		IdentityPoolId: auth.cognitoIdentityPoolId,
		UserPoolClientId: auth.userPoolClientId,
	});

	// Return the auth resource
	return {
		auth,
	};
}

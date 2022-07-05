import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = handler(async (event) => {
	const data = JSON.parse(event.body);
	const params = {
		TableName: process.env.TABLE_NAME,
		Key: {
			userId: "123", // the id of the author
			noteId: event.pathParameters.id, // the id of the note from the path
		},
		// 'UpdateExpression' defines the attributes to be updated
		// 'ExpressionAttributeValues' defines the value used in the update expression
		UpdateExpression: "SET content = :content, attatchment = :attachment",
		ExpressionAttributeValues: {
			":attachment": data.attachment || null,
			":content": data.content || null,
		},
		// 'ReturnValues' specifies if and how to return the item's attributes,
		// where ALL_NEW returns all attributes of the item after the update; you
		// can inspect 'result' below to see how it works with different settings
		ReturnValues: "UPDATED_NEW",
	};
	await dynamoDb.update(params);
	return { status: true };
});

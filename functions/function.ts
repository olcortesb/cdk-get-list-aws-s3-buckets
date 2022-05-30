import { Handler } from 'aws-lambda';
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";


const REGION = "us-west-2";
const client = new S3Client({ region: "us-west-2" });

export const handler: Handler = async (event, context) => {

  const method = event.requestContext?.http?.method;
  const data = await client.send(new ListBucketsCommand({}));

  if(method == 'GET'){
    return {
      statusCode: 200,
      body: JSON.stringify(data.Buckets),
    };
  }

  return {
    statusCode: 400,
    body:'invalid call',
  };

};
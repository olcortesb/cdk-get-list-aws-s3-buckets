import { Handler } from 'aws-lambda';
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";


const REGION = "us-west-2";
const client = new S3Client({ region: "us-west-2" });

export const handler: Handler = async (event, context) => {

  const data = await client.send(new ListBucketsCommand({}));
  
  console.log(data.Buckets);

  return {
    statusCode: 200,
    body: JSON.stringify(data.Buckets),
  };

};
// import { S3Client } from "@aws-sdk/client-s3";
// const REGION = "us-west-2";

// AWS.config.update({region: REGION});

// const s3Client = new S3Client({ region: REGION });

// exports.handler = async function (event) {
//     console.log("request:", JSON.stringify(event));
  
//     s3Client.listBuckets(function(err, data) {
//       if (err) {
//         console.log(err, err.stack);
//           return sendRes(400, err);
//         } else{      
//         console.log(data); 
//           return sendRes(200, data);
//         }
//     });

//     // return response back to upstream caller
//   };
  
// const sendRes = (status, body) => {
//   var response = {
//     statusCode: status,
//     headers: {
//       "Content-Type": "text/html",
//       },
//     body: body,
//     };
//     return response;
//   };
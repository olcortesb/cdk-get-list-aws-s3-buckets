import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import { Runtime, FunctionUrlAuthType } from "aws-cdk-lib/aws-lambda";

import * as iam from 'aws-cdk-lib/aws-iam';
import * as path from 'path';

export class CdkGetListAwsS3BucketsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // create nodejsfuncttion
    const getListAwsS3Buckets = new NodejsFunction(this, "LambdaGetStatus", {
      runtime: Runtime.NODEJS_14_X,
      entry: path.join(__dirname, `/../functions/function.ts`),
      handler: "handler"
    });

    //create a policy statement
    const s3ListBucketsPolicy = new iam.PolicyStatement({
      actions: ['s3:ListAllMyBuckets'],
      resources: ['arn:aws:s3:::*'],
    });

    //add the policy to the Function's role
    getListAwsS3Buckets.role?.attachInlinePolicy(
      new iam.Policy(this, 'list-buckets-policy', {
        statements: [s3ListBucketsPolicy],
      }),
    );

    // add function url to lambda base
    const urlgetListAwsS3Buckets = getListAwsS3Buckets.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'],
      }
    });

    // get url 
    new CfnOutput(this, 'FunctionUrl', {
      value: urlgetListAwsS3Buckets.url,
    });
  }
}

# Demo: Get list of s3 bucket 

Summary: 

This demo deploy a AWS lambda whit [CDK](https://aws.amazon.com/es/cdk/).
The lambda return a list of all s3 buckets in the deploy account.

# Prerequisites

```
node --version
v14.17.0

aws --version
aws-cli/2.4.2 Python/3.8.8 Darwin/21.3.0 exe/x86_64 prompt/off

cdk --version
2.25.0 (build ae1cb4b)

```

# Setup
Configure project

```
git clone ...
npm install
npm run build
```

[Bootstrapping](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html) cdk in aws acount 
```
cdk bootstrap xxxxxxxxxxxx/xx-xxxx-x
```

# Usage 

Build CloudFormations and deploy
```
cdk synth
cdk deploy
```

Test: 

Take the ouput URL 

```
 ✅  CdkGetListAwsS3BucketsStack

✨  Deployment time: 51.4s

Outputs:
CdkGetListAwsS3BucketsStack.FunctionUrl = https://xxxxxxxxx.lambda-url.us-west-2.on.aws/

✨  Total time: 65.73s
```
Call the url
```
curl https://xxxxxxxxxxxxx.lambda-url.us-west-2.on.aws/                                  2.3.0
[{"Name":"gidiuiidrxqu","CreationDate":"202X-1X-05T11:00:24.000Z"},
{"Name":"cdk-hnb659fds-assets-536395113578-us-east-1","CreationDate":"202X-0X-18T13:15:56.000Z"},{"Name":"cdk-hnb659fds-assets-536395113578-us-west-2","CreationDate":"202X-0X-18T13:37:00.000Z"},{"Name":"elasticbeanstalk-us-west-2-536395113578","CreationDate":"202X-1X-29T19:01:35.000Z"},{"Name":"0d81a78",
"CreationDate":"202X-0X-17T23:12:35.000Z"},{"Name":"serverless-edge-f0748d5","CreationDate":"202X-1X-22T09:31:29.000Z"},{"Name":"serverless-iot-1","CreationDate":"202X-0X-13T22:41:06.000Z"}]%
```

Delete the stack

```
cdk destroy 
```

# Disclaimer ⚠️ 🚩
- Some services may have a cost 
- The lambda has no secure Auth, change this configurations acord you need
```
const urlgetListAwsS3Buckets = getListAwsS3Buckets.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE,
  cors: {
    allowedOrigins: ['*'],
    }
});
```

## Useful commands (default in CDK template)

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

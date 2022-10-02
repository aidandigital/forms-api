const REGION = process.env.REGION;
const RECEIVING_EMAIL = process.env.RECEIVING_EMAIL;
const SOURCE_NAME = process.env.SOURCE_NAME;
const SOURCE_EMAIL = process.env.SOURCE_EMAIL;

const aws = require("aws-sdk");
const ses = new aws.SES({ region: REGION });
const {cleanText, cleanFormType} = require("./sanitizers");

module.exports = async function (data, serverMetadata) {
  const params = {
    Destination: {
      ToAddresses: [RECEIVING_EMAIL], // Can only have one receiver, unless sending using bulk method
    },
    Source: "Aidan Digital <" + SOURCE_EMAIL + ">",
    Template: "form-submission",
    TemplateData: `{
      \"form\": \"${cleanFormType(data.form)}\",
      \"name\": \"${cleanText(data.name)}\",
      \"url\": \"${cleanText(data.url)}\",
      \"email\": \"${cleanText(data.email)}\",
      \"body\": \"${cleanText(data.body, true)}\",
      \"metadata\": {
        \"timestamp\": \"${serverMetadata.timestamp}\",
        \"request_id\": \"${serverMetadata.request_id}\",
        \"user_id\": \"${cleanText(data.user_id)}\",
        \"ref\": \"${cleanText(data.ref)}\"
      }
    }`,
  };
 
  return ses.sendTemplatedEmail(params).promise();
};

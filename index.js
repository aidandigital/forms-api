const sendEmail = require("./sendEmail");
const response = require("./response");
const { checkStringFields, checkEmail } = require("./validators");

exports.handler = async function (event) {
  const data = JSON.parse(event.body);
  
  // Create an object of server-side metadata:
  const utcTime = new Date();
  const estTime = utcTime.toLocaleString("en-US", {timeZone: "America/New_York"});
  
  const serverMetadata = {
    timestamp: estTime,
    request_id: event.requestContext.requestId,
  };
  
  // Basic validation:
  if ((data.form === "contact" && !checkStringFields([data.body, data.email, data.name])) // check that required fields are completed
  || (data.form === "report-bug" && !checkStringFields([data.body]))
  || (data.form === "copyright-infringement" && (!checkStringFields([data.body, data.email, data.name, data.url]) || data.agreement !== true))
  ) {
    return response(200, false, "validation", "Please fill out all required fields.");
  } else if ((checkStringFields([data.email]) || data.wantsEmailBack) && !checkEmail(data.email)) { // if there's an email, make sure it's valid (even if it's not required)
    return response(200, false, "validation", "Please enter a valid email.");
  } else { // if all checks pass, send the email
    await sendEmail(data, serverMetadata);
    
    return response(200);
  }
};

const response = (statusCode, success = true, errType = null, message = null) => ({
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST"
    },
    body: JSON.stringify({
      success: success,
      errType: errType,
      message: message
    })
});

module.exports = response;

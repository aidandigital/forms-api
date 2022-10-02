module.exports = {
  checkStringFields: (fieldsArray) => {
      let complete = true;
      fieldsArray.forEach(field => {
        if (typeof field === "string") { // Check if field is a string
          if (field.trim().length === 0) { // Check if field has been completed
            complete = false;
          }
        } else {
            complete = false;
        }
      });
      return complete;
  },
  
  checkEmail: (email) => {
    email = email.trim();
    
    const emailRegex = /^(([^<>()\[\]\\.,;:@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (typeof email !== "string") { // make sure it's a string before doing anything else to avoid breaking code
      return false;
    }
    if (email.length > 254) { // emails cannot exceed 254 characters, do this before checking with regex to prevent regex security failure
      return false;
    }
    if (!email.match(emailRegex)) { // finally use regex to ensure it's a valid email
      return false;
    }
    return true;
  }
};

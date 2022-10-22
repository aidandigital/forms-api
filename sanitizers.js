function encodeText(text) {
    if (typeof text === "string") { // if string, encode to prevent XSS
          const encodedText = text.replace(/[\u00A0-\u9999<>\&]/g, (i) => (
            '&#'+i.charCodeAt(0)+';'
          ));
          return encodedText.trim().replace(/\n|\r|\t/g, ""); // remove newlines, carriage returns, and tabs because they mess up the template
        }
    // If not string, it doesn't need to be encoded, return it:
    return text;
}

module.exports = {
  cleanText: (text, isBody = false) => { // Clean text sanitizer function
    if (typeof text === "undefined") {
      return "N/A";
    } else if (!["string", "number"].includes(typeof text)) {
      return `NOTICE: Incorrect data type was submitted for this field. Required a string or number, received: ${typeof text}`;
    } else if ((!isBody && text.length > 400) || (isBody && text.length > 2000)) {
      return "NOTICE: This string was omitted because it was too long.";
    } else if (text.length === 0) {
      return "USER LEFT THIS BLANK";
    } else {
      return encodeText(text);
    }
  },
  
  cleanFormType: (formType) => {
      if (!["contact", "report-bug", "copyright-infringement"].includes(formType)) {
          const encodedFormType = encodeText(formType);
          return `NOTICE: Invalid form type was submitted. Received: ${encodedFormType}`;
      }
      return formType;
  }
};

import noInputInTemplateLiteralCreate from "./noInputInTemplateLiteral";
import noOuputInTemplateLiteralCreate from "./noOuputInTemplateLiteral";
import noOuputInstanceInTemplateLiteralCreate from "./noOuputInstanceInTemplateLiteral";

module.exports = {
  rules: {
    "no-input-in-template-literal": noInputInTemplateLiteralCreate,
    "no-output-in-template-literal": noOuputInTemplateLiteralCreate,
    "no-output-instance-in-template-literal":
      noOuputInstanceInTemplateLiteralCreate,
  },
};

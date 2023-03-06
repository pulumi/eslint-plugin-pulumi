import noOuputInTemplateLiteralCreate from "./noOuputInTemplateLiteral";
import noOuputInstanceInTemplateLiteralCreate from "./noOuputInstanceInTemplateLiteral";

module.exports = {
  rules: {
    "no-output-in-template-literal": noOuputInTemplateLiteralCreate,
    "no-output-instance-in-template-literal":
      noOuputInstanceInTemplateLiteralCreate,
  },
};

import noOuputInTemplateLiteralsCreate from "./noOuputInTemplateLiterals";
import noOuputInstanceInTemplateLiteralsCreate from "./noOuputInstanceInTemplateLiterals";

module.exports = {
  rules: {
    "no-output-in-template-literal": noOuputInTemplateLiteralsCreate,
    "no-output-instance-in-template-literal":
      noOuputInstanceInTemplateLiteralsCreate,
  },
};

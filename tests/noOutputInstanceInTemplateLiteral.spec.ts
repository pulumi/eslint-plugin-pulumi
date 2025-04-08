import typescriptEslintParser from "@typescript-eslint/parser";
import { RuleTester } from "@typescript-eslint/rule-tester";
import rule from "../src/noOuputInstanceInTemplateLiteral";
import { getFixturesRootDir } from "./utils";

const rootDir = getFixturesRootDir();

const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescriptEslintParser,
    parserOptions: {
      project: true,
      tsconfigRootDir: rootDir,
    },
  },
});

ruleTester.run("no-output-instance-in-template-literal", rule, {
  valid: [
    {
      code: "const myOutput: pulumi.OutputInstance<number> = pulumi.output([1, 2, 3])[0];\nconst myGoodTemplate = pulumi.interpolate`${myOutput}`",
    },
  ],
  invalid: [
    {
      code: "const myOutput: pulumi.OutputInstance<number> = pulumi.output([1, 2, 3])[0];\nconst myBadTemplate = `${myOutput}`",
      output:
        "const myOutput: pulumi.OutputInstance<number> = pulumi.output([1, 2, 3])[0];\nconst myBadTemplate = pulumi.interpolate`${myOutput}`",
      errors: [
        {
          messageId: "outputInstanceInTemplateLiteral",
          line: 2,
          column: 23,
        },
      ],
    },
  ],
});

import { ESLintUtils } from "@typescript-eslint/utils";
import rule from "../src/noOuputInstanceInTemplateLiterals";
import { getFixturesRootDir } from "./utils";

const rootDir = getFixturesRootDir();

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    tsconfigRootDir: rootDir,
    project: "./tsconfig.json",
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

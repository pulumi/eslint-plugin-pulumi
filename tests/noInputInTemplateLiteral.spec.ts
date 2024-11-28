import { ESLintUtils } from "@typescript-eslint/utils";
import rule from "../src/noInputInTemplateLiteral";
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

ruleTester.run("no-input-in-template-literal", rule, {
  valid: [
    {
      code: "import * as pulumi from '@pulumi/pulumi'; const myOutput = pulumi.output(\"foo\"); const myInput: pulumi.Input<string> = myOutput; const myTemplate = pulumi.interpolate`${myInput}`;",
    },
  ],
  invalid: [
    {
      code: "import * as pulumi from '@pulumi/pulumi'; const myOutput = pulumi.output(\"foo\"); const myInput: pulumi.Input<string> = myOutput; const myTemplate = `${myInput}`;",
      output:
        "import * as pulumi from '@pulumi/pulumi'; const myOutput = pulumi.output(\"foo\"); const myInput: pulumi.Input<string> = myOutput; const myTemplate = pulumi.interpolate`${myInput}`;",
      errors: [
        {
          messageId: "inputInTemplateLiteral",
          line: 1,
          column: 149,
        },
      ],
    },
  ],
});

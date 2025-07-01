import typescriptEslintParser from "@typescript-eslint/parser";
import { RuleTester } from "@typescript-eslint/rule-tester";
import rule from "../src/noInputInTemplateLiteral";
import { getFixturesRootDir } from "./utils";


const rootDir = getFixturesRootDir();

const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescriptEslintParser,
    parserOptions: {
      tsconfigRootDir: rootDir,
      project: true,
    },
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

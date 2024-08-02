import typescriptEslintParser from "@typescript-eslint/parser";
import { RuleTester } from "@typescript-eslint/rule-tester";
import rule from "../src/noOuputInTemplateLiteral";
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

ruleTester.run("no-output-in-template-literal", rule, {
  valid: [
    {
      code:
        "const someFoo: string = 'foo';\n" + "const myString = `${someFoo}`;",
    },
    {
      code: "import * as pulumi from '@pulumi/pulumi';\nconst myInput = \"foo\" as pulumi.Input;\nconst myOutput = pulumi.output<string>(myInput);const myBadTemplate = pulumi.interpolate`${myOutput}`;\n",
    },
    {
      code: "const myOutput: pulumi.Output<string> = pulumi.output<string>(myInput);const myBadTemplate = pulumi.interpolate`${myOutput}`;\n",
    },
  ],
  invalid: [
    {
      code: 'const myOutput: pulumi.Output<string> = pulumi.output<string>("foo");\nconst myBadTemplate = `${myOutput}`;\n',
      output:
        'const myOutput: pulumi.Output<string> = pulumi.output<string>("foo");\nconst myBadTemplate = pulumi.interpolate`${myOutput}`;\n',
      errors: [
        {
          messageId: "outputInTemplateLiteral",
          line: 2,
          column: 23,
        },
      ],
    },
  ],
});

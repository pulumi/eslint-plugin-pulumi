import {
  ESLintUtils,
  ParserServices,
  TSESLint,
  TSESTree,
} from "@typescript-eslint/utils";
import { TypeChecker } from "typescript";

export type Options = [];

export type MessageIds =
  | "outputInstanceInTemplateLiteral"
  | "tagTemplateString";

export default ESLintUtils.RuleCreator((name) => name)<Options, MessageIds>({
  name: "no-output-instance-in-template-literal",
  meta: {
    type: "problem",
    fixable: "code",
    docs: {
      description: "",
    },
    messages: {
      outputInstanceInTemplateLiteral:
        "pulumi.OutputInstance<T> not permitted in template literals.",
      tagTemplateString: "Please tag this template with `pulumi.interpolate`",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const typeChecker = parserServices.program.getTypeChecker();
    const submitIssueReport = (
      contextInput: typeof context,
      node: TSESTree.Node,
    ) => {
      contextInput.report({
        node,
        messageId: "outputInstanceInTemplateLiteral",
        fix(fixer): TSESLint.RuleFix {
          return fixer.replaceText(
            node,
            `pulumi.interpolate${context.sourceCode.getText(node)}`,
          );
        },
      });
    };

    return {
      TemplateLiteral(node) {
        if (
          node?.expressions &&
          node?.parent?.type !== "TaggedTemplateExpression"
        ) {
          const hasOutputInstanceExpressions = node.expressions
            .map(
              (expression) =>
                getNodeType(typeChecker, parserServices, expression).aliasSymbol
                  ?.escapedName,
            )
            .some((type) => type === "OutputInstance");
          if (hasOutputInstanceExpressions) {
            submitIssueReport(context, node);
          }
        }
      },
    };
  },
});

const getNodeType = (
  checker: TypeChecker,
  services: ParserServices,
  node: TSESTree.Node,
) => checker.getTypeAtLocation(services.esTreeNodeToTSNodeMap.get(node));

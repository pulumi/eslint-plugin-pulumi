import {
  TSESTree,
  ESLintUtils,
  TSESLint,
  ParserServices,
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
    hasSuggestions: true,
    fixable: "code",
    docs: {
      recommended: "error",
      description: "",
    },
    messages: {
      outputInstanceInTemplateLiteral:
        "pulumi.OutputInstance<T> not permitted in template literals.",
      tagTemplateString: "Please tag this template with `pulumi.interpolate`",
    },
    schema: {},
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const typeChecker = parserServices.program.getTypeChecker();
    const submitIssueReport = (
      contextInput: typeof context,
      node: TSESTree.Node
    ) => {
      contextInput.report({
        node,
        messageId: "outputInstanceInTemplateLiteral",
        suggest: [
          {
            messageId: "tagTemplateString",
            fix(fixer): TSESLint.RuleFix {
              return fixer.replaceText(
                node,
                `pulumi.interpolate${context.getSourceCode().getText(node)}`
              );
            },
          },
        ],
        fix(fixer): TSESLint.RuleFix {
          return fixer.replaceText(
            node,
            `pulumi.interpolate${context.getSourceCode().getText(node)}`
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
          const outputInstanceExpressions = node.expressions
            .map(
              (expression) =>
                getNodeType(typeChecker, parserServices, expression).aliasSymbol
                  ?.escapedName
            )
            .filter((type) => type === "OutputInstance");
          if (outputInstanceExpressions.length !== 0) {
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
  node: TSESTree.Node
) => checker.getTypeAtLocation(services.esTreeNodeToTSNodeMap.get(node));

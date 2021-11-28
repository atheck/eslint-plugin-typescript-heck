import { ESLintUtils, TSESTree } from "@typescript-eslint/experimental-utils";
import { RuleContext, RuleListener } from "@typescript-eslint/experimental-utils/dist/ts-eslint";

export const ruleName = "array-type-spacing";

// eslint-disable-next-line new-cap
const createRule = ESLintUtils.RuleCreator(name => `https://github.com/atheck/eslint-plugin-typescript-heck#${name}`);

const arrayTypeSpacing = createRule({
    name: ruleName,
    meta: {
        type: "layout",
        fixable: "whitespace",
        docs: {
            recommended: "warn",
            description: "Between type name and brackets should be exactly one space.",
        },
        messages: {
            missingSpace: "Put one space between type name and brackets.",
        },
        schema: [],
    },
    create (context: Readonly<RuleContext<"missingSpace", readonly unknown[]>>): RuleListener {
        return {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            TSArrayType (node: TSESTree.TSArrayType): void {
                const code = context.getSourceCode().getText(node);

                if (!(/[^\s] \[\]$/u).test(code)) {
                    context.report({
                        messageId: "missingSpace",
                        node,
                    });
                }
            },
        };
    },
    defaultOptions: [],
});

export { arrayTypeSpacing };
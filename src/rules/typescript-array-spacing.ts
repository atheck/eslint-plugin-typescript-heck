import { ESLintUtils, TSESTree } from "@typescript-eslint/experimental-utils";
import { RuleContext, RuleListener } from "@typescript-eslint/experimental-utils/dist/ts-eslint";

// eslint-disable-next-line new-cap
const createRule = ESLintUtils.RuleCreator(name => `https://github.com/atheck/eslint-plugin-typescript-heck#${name}`);

const typescriptArraySpacing = createRule({
    name: "typescript-array-spacing",
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
                if (node.range[1] - node.elementType.range[1] < 3) {
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

export { typescriptArraySpacing };
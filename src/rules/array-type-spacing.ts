import { ESLintUtils, TSESTree } from "@typescript-eslint/experimental-utils";
import { RuleContext, RuleListener } from "@typescript-eslint/experimental-utils/dist/ts-eslint";
import { JSONSchema4 } from "json-schema";

export const ruleName = "array-type-spacing";

type Config = "never" | "always";
export type Options = [Config];

const configOptionSchema: JSONSchema4 = {
    enum: ["never", "always"],
};
const schema: JSONSchema4 [] = [configOptionSchema];

const defaultOptions: Options = ["never"];

// eslint-disable-next-line new-cap
const createRule = ESLintUtils.RuleCreator(name => `https://github.com/atheck/eslint-plugin-typescript-heck#${name}`);

export type MessageIds = "removeSpace" | "addSpace";

const arrayTypeSpacing = createRule<Options, MessageIds>({
    name: ruleName,
    meta: {
        type: "layout",
        fixable: "whitespace",
        docs: {
            recommended: "warn",
            description: "Enforces correct spacing between type and square brackets of array types.",
        },
        messages: {
            removeSpace: "Remove whitespace between type name and square brackets.",
            addSpace: "Put one space between type name and square brackets.",
        },
        schema,
    },
    defaultOptions,

    create (context: Readonly<RuleContext<MessageIds, Options>>, [config]: readonly [Config]): RuleListener {
        return {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            TSArrayType (node: TSESTree.TSArrayType): void {
                const code = context.getSourceCode().getText(node);

                switch (config) {
                    case "always":
                        if (!(/[^\s] \[\]$/u).test(code)) {
                            context.report({
                                messageId: "addSpace",
                                node,
                            });
                        }
                        break;

                    case "never":
                        if (!(/[^\s]\[\]$/u).test(code)) {
                            context.report({
                                messageId: "removeSpace",
                                node,
                            });
                        }
                        break;
                }
            },
        };
    },
});

export { arrayTypeSpacing };
import { ESLintUtils, TSESTree } from "@typescript-eslint/experimental-utils";
import { ReportFixFunction, RuleContext, RuleFix, RuleFixer, RuleListener } from "@typescript-eslint/experimental-utils/dist/ts-eslint";
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

export type MessageIds = "noSpace" | "oneSpace" | "noSpaceBetween";

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
            noSpace: "There should be no whitespace between type name and square brackets.",
            oneSpace: "There should exactly be one space between type name and square brackets.",
            noSpaceBetween: "There should be no spaces between the square brackets.",
        },
        schema,
    },
    defaultOptions,

    create (context: Readonly<RuleContext<MessageIds, Options>>, [config]: readonly [Config]): RuleListener {
        return {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            TSArrayType (node: TSESTree.TSArrayType): void {
                const code = context.getSourceCode().getText(node);

                const regex = /(?<before>\s*)\[(?<between>\s*)\]$/u;
                const match = regex.exec(code);

                if (match) {
                    const typeName = code.slice(0, Math.max(0, match.index));
                    const spacesBefore = match.groups?.before ?? "";
                    const spacesBetween = match.groups?.between;

                    switch (config) {
                        case "always":
                            if (spacesBefore !== " ") {
                                context.report({
                                    messageId: "oneSpace",
                                    node,
                                    fix: fixForAlways(node, typeName),
                                });
                            }
                            break;

                        case "never":
                            if (spacesBefore !== "") {
                                context.report({
                                    messageId: "noSpace",
                                    node,
                                    fix: fixForNever(node, typeName),
                                });
                            }
                            break;
                    }

                    if (spacesBetween !== "") {
                        context.report({
                            messageId: "noSpaceBetween",
                            node,
                            fix: fixSpaceBetween(node, typeName, spacesBefore),
                        });
                    }
                }
            },
        };
    },
});

function fixSpaceBetween (node: TSESTree.Node, typeName: string, spacesBefore: string): ReportFixFunction {
    return (fixer: RuleFixer): RuleFix => fixer.replaceText(node, `${typeName}${spacesBefore}[]`);
}

function fixForNever (node: TSESTree.Node, typeName: string): ReportFixFunction {
    return (fixer: RuleFixer): RuleFix => fixer.replaceText(node, `${typeName}[]`);
}

function fixForAlways (node: TSESTree.Node, typeName: string): ReportFixFunction {
    return (fixer: RuleFixer): RuleFix => fixer.replaceText(node, `${typeName} []`);
}

export { arrayTypeSpacing };
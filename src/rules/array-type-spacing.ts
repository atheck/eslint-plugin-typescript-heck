import { ESLintUtils, TSESTree } from "@typescript-eslint/experimental-utils";
import { ReportFixFunction, RuleContext, RuleFix, RuleFixer, RuleListener } from "@typescript-eslint/experimental-utils/dist/ts-eslint";
import { JSONSchema4 } from "json-schema";

export const ruleName = "array-type-spacing";

type Config = "never" | "always";
interface AdvancedConfig {
    betweenDimensions: Config,
}
export type Options = [Config, Partial<AdvancedConfig>?];

const configOptionSchema: JSONSchema4 = {
    enum: ["never", "always"],
};
const advancedConfigSchema: JSONSchema4 = {
    type: "object",
    properties: {
        betweenDimensions: {
            type: "string",
        },
    },
    additionalProperties: false,
};
const schema: JSONSchema4 [] = [configOptionSchema, advancedConfigSchema];

const defaultOptions: Options = [
    "never",
    {
        betweenDimensions: "never",
    },
];

// eslint-disable-next-line new-cap
const createRule = ESLintUtils.RuleCreator(name => `https://github.com/atheck/eslint-plugin-typescript-heck#${name}`);

export type MessageIds = "noSpace" | "oneSpace" | "noSpaceBetweenDimensions" | "oneSpaceBetweenDimensions" | "noSpaceBetweenBrackets";

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
            oneSpace: "There should be exactly one space between type name and square brackets.",
            noSpaceBetweenDimensions: "There should be no whitespace between consecutive square brackets.",
            oneSpaceBetweenDimensions: "There should be exactly one space between consecutive square brackets.",
            noSpaceBetweenBrackets: "There should be no spaces between the square brackets.",
        },
        schema,
    },
    defaultOptions,

    create (context: Readonly<RuleContext<MessageIds, Options>>, [mode, advancedConfig]: readonly [...Options]): RuleListener {
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

                    if (isMultidimensionalArray(node)) {
                        const dimensionsMode = advancedConfig?.betweenDimensions ?? "never";

                        switch (dimensionsMode) {
                            case "always":
                                if (spacesBefore !== " ") {
                                    context.report({
                                        messageId: "oneSpaceBetweenDimensions",
                                        node,
                                        fix: fixForAlways(node, typeName),
                                    });
                                }
                                break;

                            case "never":
                                if (spacesBefore !== "") {
                                    context.report({
                                        messageId: "noSpaceBetweenDimensions",
                                        node,
                                        fix: fixForNever(node, typeName),
                                    });
                                }
                                break;
                        }
                    } else {
                        switch (mode) {
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
                    }

                    if (spacesBetween !== "") {
                        context.report({
                            messageId: "noSpaceBetweenBrackets",
                            node,
                            fix: fixSpaceBetween(node, typeName, spacesBefore),
                        });
                    }
                }
            },
        };
    },
});

function isMultidimensionalArray (node: TSESTree.TSArrayType): boolean {
    return node.elementType.type === TSESTree.AST_NODE_TYPES.TSArrayType;
}

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
import { ESLintUtils, TSESTree } from "@typescript-eslint/experimental-utils";
import { ReportFixFunction, RuleContext, RuleFix, RuleFixer, RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import { JSONSchema4 } from "json-schema";

const ruleName = "array-type-spacing";

type Config = "never" | "always";
interface AdvancedConfig {
    betweenDimensions: Config,
}
type Options = [Config, Partial<AdvancedConfig>?];

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

const arrayTypeSpacingRegex = /(?<before>\s*)\[(?<between>\s*)\]$/u;

// eslint-disable-next-line new-cap
const createRule = ESLintUtils.RuleCreator(name => `https://github.com/atheck/eslint-plugin-typescript-heck#${name}`);

type MessageIds = "noSpace" | "oneSpace" | "noSpaceBetweenDimensions" | "oneSpaceBetweenDimensions" | "noSpaceBetweenBrackets";

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
                const match = arrayTypeSpacingRegex.exec(code);

                if (!match) {
                    return;
                }

                const typeName = code.slice(0, Math.max(0, match.index));
                const spacesBetween = match.groups?.between;

                if (isMultidimensionalArray(node)) {
                    handleMultidimensionalArray(advancedConfig, { match, context, node, typeName });
                } else {
                    handleArray(mode, { match, context, node, typeName });
                }

                if (spacesBetween !== "") {
                    context.report({
                        messageId: "noSpaceBetweenBrackets",
                        node,
                        fix: fixSpaceBetween({ match, node, typeName }),
                    });
                }
            },
        };
    },
});

function handleArray (mode: string, { match, context, node, typeName }: { match: RegExpExecArray, context: Readonly<RuleContext<MessageIds, Options>>, node: TSESTree.TSArrayType, typeName: string }): void {
    const spacesBefore = match.groups?.before ?? "";

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

function handleMultidimensionalArray (advancedConfig: Partial<AdvancedConfig> | undefined, { match, context, node, typeName }: { match: RegExpExecArray, context: Readonly<RuleContext<MessageIds, Options>>, node: TSESTree.TSArrayType, typeName: string }): void {
    const spacesBefore = match.groups?.before ?? "";
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
}

function isMultidimensionalArray (node: TSESTree.TSArrayType): boolean {
    return node.elementType.type === TSESTree.AST_NODE_TYPES.TSArrayType;
}

function fixSpaceBetween ({ match, node, typeName }: { match: RegExpExecArray, node: TSESTree.Node, typeName: string }): ReportFixFunction {
    const spacesBefore = match.groups?.before ?? "";

    return (fixer: RuleFixer): RuleFix => fixer.replaceText(node, `${typeName}${spacesBefore}[]`);
}

function fixForNever (node: TSESTree.Node, typeName: string): ReportFixFunction {
    return (fixer: RuleFixer): RuleFix => fixer.replaceText(node, `${typeName}[]`);
}

function fixForAlways (node: TSESTree.Node, typeName: string): ReportFixFunction {
    return (fixer: RuleFixer): RuleFix => fixer.replaceText(node, `${typeName} []`);
}

export type {
    Options,
    MessageIds,
};

export {
    ruleName,
    arrayTypeSpacing,
};
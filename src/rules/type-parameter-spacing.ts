import { ESLintUtils, TSESTree } from "@typescript-eslint/experimental-utils";
import { ReportFixFunction, RuleContext, RuleFix, RuleFixer, RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import { JSONSchema4 } from "json-schema";

const ruleName = "type-parameter-spacing";

type Config = "never" | "always";
type Options = [Config];

const configOptionSchema: JSONSchema4 = {
    enum: ["never", "always"],
};
const advancedConfigSchema: JSONSchema4 = {
    type: "object",
    additionalProperties: false,
};
const schema: JSONSchema4 [] = [configOptionSchema, advancedConfigSchema];

const defaultOptions: Options = ["never"];

// eslint-disable-next-line new-cap
const createRule = ESLintUtils.RuleCreator(name => `https://github.com/atheck/eslint-plugin-typescript-heck#${name}`);

type MessageIds = "noSpace" | "oneSpace";

const typeParameterSpacing = createRule<Options, MessageIds>({
    name: ruleName,
    meta: {
        type: "layout",
        fixable: "whitespace",
        docs: {
            recommended: "warn",
            description: "Enforces correct spacing between identifier and type parameters.",
        },
        messages: {
            noSpace: "There should be no whitespace between identifier and type parameters.",
            oneSpace: "There should be exactly one space between identifier and type parameters.",
        },
        schema,
    },
    defaultOptions,

    create (context: Readonly<RuleContext<MessageIds, Options>>, [mode]: readonly [...Options]): RuleListener {
        return {
            /* eslint-disable @typescript-eslint/naming-convention */
            FunctionDeclaration (node: TSESTree.FunctionDeclaration) {
                handleNode(node, context, mode);
            },
            TSDeclareFunction (node: TSESTree.TSDeclareFunction) {
                handleNode(node, context, mode);
            },
            TSInterfaceDeclaration (node: TSESTree.TSInterfaceDeclaration) {
                handleNode(node, context, mode);
            },
            TSTypeAliasDeclaration (node: TSESTree.TSTypeAliasDeclaration) {
                handleNode(node, context, mode);
            },
            ClassDeclaration (node: TSESTree.ClassDeclaration) {
                handleNode(node, context, mode);
            },
            /* eslint-enable @typescript-eslint/naming-convention */
        };
    },
});

function handleNode<TNode extends TSESTree.Node> (node: TNode & { id: TSESTree.Identifier | null, typeParameters?: TSESTree.TSTypeParameterDeclaration }, context: Readonly<RuleContext<MessageIds, Options>>, mode: Config): void {
    if (!node.id || !node.typeParameters) {
        return;
    }

    const identifierEndIndex = node.id.range[1];
    const typeParametersStartIndex = node.typeParameters.range[0];

    switch (mode) {
        case "always":
            if (identifierEndIndex === typeParametersStartIndex) {
                context.report({
                    messageId: "oneSpace",
                    node,
                    fix: fixForAlways(node.id),
                });
            }
            break;

        case "never":
            if (identifierEndIndex < typeParametersStartIndex) {
                context.report({
                    messageId: "noSpace",
                    node,
                    fix: fixForNever(node.id, node.typeParameters),
                });
            }
            break;
    }
}

function fixForNever (identifier: TSESTree.Identifier, typeParameters: TSESTree.TSTypeParameterDeclaration): ReportFixFunction {
    return (fixer: RuleFixer): RuleFix => fixer.removeRange([identifier.range[1], typeParameters.range[0]]);
}

function fixForAlways (node: TSESTree.Identifier): ReportFixFunction {
    return (fixer: RuleFixer): RuleFix => fixer.insertTextAfter(node, " ");
}

export type {
    Options,
    MessageIds,
};

export {
    ruleName,
    typeParameterSpacing,
};
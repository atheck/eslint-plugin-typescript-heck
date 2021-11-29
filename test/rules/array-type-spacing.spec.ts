import { arrayTypeSpacing, Options, ruleName } from "../../src/rules/array-type-spacing";
import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/experimental-utils";

const ruleTester = new ESLintUtils.RuleTester({
    parser: "@typescript-eslint/parser",
});

const correctForNever = "const array: string[];";
const correctForAlways = "const array: string [];";

ruleTester.run(`${ruleName} with 'never'`, arrayTypeSpacing, {
    valid: [
        {
            options: ["never"],
            code: "const array: string[];",
        },
    ],
    invalid: [
        {
            options: ["never"],
            code: "const array: string [];",
            errors: [
                {
                    messageId: "noSpace",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
            output: correctForNever,
        },
        {
            options: ["never"],
            code: "const array: string[ ];",
            errors: [
                {
                    messageId: "noSpaceBetweenBrackets",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
            output: correctForNever,
        },
        {
            options: ["never"],
            code: "const array: string [ ];",
            errors: [
                {
                    messageId: "noSpace",
                    type: AST_NODE_TYPES.TSArrayType,
                },
                {
                    messageId: "noSpaceBetweenBrackets",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
            output: correctForNever,
        },
    ],
});

ruleTester.run(`${ruleName} with 'always'`, arrayTypeSpacing, {
    valid: [
        {
            options: ["always"],
            code: "const array: string [];",
        },
    ],
    invalid: [
        {
            options: ["always"],
            code: "const array: string[];",
            errors: [
                {
                    messageId: "oneSpace",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
            output: correctForAlways,
        },
        {
            options: ["always"],
            code: "const array: string[ ];",
            errors: [
                {
                    messageId: "oneSpace",
                    type: AST_NODE_TYPES.TSArrayType,
                },
                {
                    messageId: "noSpaceBetweenBrackets",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
            output: correctForAlways,
        },
        {
            options: ["always"],
            code: "const array: string [ ];",
            errors: [
                {
                    messageId: "noSpaceBetweenBrackets",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
            output: correctForAlways,
        },
        {
            options: ["always"],
            code: "const array: string  [];",
            errors: [
                {
                    messageId: "oneSpace",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
            output: correctForAlways,
        },
    ],
});

const neverMultiNeverOptions: Options = ["never", { betweenDimensions: "never" }];
const correctNeverMultiNever = "const array: string[][];";

ruleTester.run(`${ruleName} with multidimensional array, options: ${JSON.stringify(neverMultiNeverOptions)}`, arrayTypeSpacing, {
    valid: [
        {
            options: neverMultiNeverOptions,
            code: "const array: string[][];",
        },
    ],
    invalid: [
        {
            options: neverMultiNeverOptions,
            code: "const array: string [] [];",
            errors: [
                {
                    messageId: "noSpaceBetweenDimensions",
                    type: AST_NODE_TYPES.TSArrayType,
                },
                {
                    messageId: "noSpace",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
            output: "const array: string[] [];",
        },
        {
            options: neverMultiNeverOptions,
            code: "const array: string[ ][ ];",
            errors: [
                {
                    messageId: "noSpaceBetweenBrackets",
                    type: AST_NODE_TYPES.TSArrayType,
                },
                {
                    messageId: "noSpaceBetweenBrackets",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
            output: "const array: string[][ ];",
        },
        {
            options: neverMultiNeverOptions,
            code: "const array: string [ ][];",
            errors: [
                {
                    messageId: "noSpace",
                    type: AST_NODE_TYPES.TSArrayType,
                },
                {
                    messageId: "noSpaceBetweenBrackets",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
            output: correctNeverMultiNever,
        },
    ],
});

const neverMultiAlwaysOptions: Options = ["never", { betweenDimensions: "always" }];

ruleTester.run(`${ruleName} with multidimensional array, options: ${JSON.stringify(neverMultiAlwaysOptions)}`, arrayTypeSpacing, {
    valid: [
        {
            options: neverMultiAlwaysOptions,
            code: "const array: string[] [];",
        },
    ],
    invalid: [
        {
            options: neverMultiAlwaysOptions,
            code: "const array: string [] [];",
            errors: [
                {
                    messageId: "noSpace",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
            output: "const array: string[] [];",
        },
        {
            options: neverMultiAlwaysOptions,
            code: "const array: string[ ][ ];",
            errors: [
                {
                    messageId: "oneSpaceBetweenDimensions",
                    type: AST_NODE_TYPES.TSArrayType,
                },
                {
                    messageId: "noSpaceBetweenBrackets",
                    type: AST_NODE_TYPES.TSArrayType,
                },
                {
                    messageId: "noSpaceBetweenBrackets",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
            output: "const array: string[][ ];",
        },
        {
            options: neverMultiAlwaysOptions,
            code: "const array: string [ ][];",
            errors: [
                {
                    messageId: "oneSpaceBetweenDimensions",
                    type: AST_NODE_TYPES.TSArrayType,
                },
                {
                    messageId: "noSpace",
                    type: AST_NODE_TYPES.TSArrayType,
                },
                {
                    messageId: "noSpaceBetweenBrackets",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
            output: "const array: string[][];",
        },
    ],
});

const alwaysMultiNeverOptions: Options = ["always", { betweenDimensions: "never" }];

ruleTester.run(`${ruleName} with multidimensional array, options: ${JSON.stringify(alwaysMultiNeverOptions)}`, arrayTypeSpacing, {
    valid: [
        {
            options: alwaysMultiNeverOptions,
            code: "const array: string [][];",
        },
    ],
    invalid: [
        {
            options: alwaysMultiNeverOptions,
            code: "const array: string [] [];",
            errors: [
                {
                    messageId: "noSpaceBetweenDimensions",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
            output: "const array: string [][];",
        },
        {
            options: alwaysMultiNeverOptions,
            code: "const array: string[ ][ ];",
            errors: [
                {
                    messageId: "noSpaceBetweenBrackets",
                    type: AST_NODE_TYPES.TSArrayType,
                },
                {
                    messageId: "oneSpace",
                    type: AST_NODE_TYPES.TSArrayType,
                },
                {
                    messageId: "noSpaceBetweenBrackets",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
            output: "const array: string [][ ];",
        },
        {
            options: alwaysMultiNeverOptions,
            code: "const array: string [ ][];",
            errors: [
                {
                    messageId: "noSpaceBetweenBrackets",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
            output: "const array: string [][];",
        },
    ],
});

const alwaysMultiAlwaysOptions: Options = ["always", { betweenDimensions: "always" }];

ruleTester.run(`${ruleName} with multidimensional array, options: ${JSON.stringify(alwaysMultiAlwaysOptions)}`, arrayTypeSpacing, {
    valid: [
        {
            options: alwaysMultiAlwaysOptions,
            code: "const array: string [] [];",
        },
    ],
    invalid: [
        {
            options: alwaysMultiAlwaysOptions,
            code: "const array: string[][];",
            errors: [
                {
                    messageId: "oneSpaceBetweenDimensions",
                    type: AST_NODE_TYPES.TSArrayType,
                },
                {
                    messageId: "oneSpace",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
            output: "const array: string [][];",
        },
        {
            options: alwaysMultiAlwaysOptions,
            code: "const array: string[ ][ ];",
            errors: [
                {
                    messageId: "oneSpaceBetweenDimensions",
                    type: AST_NODE_TYPES.TSArrayType,
                },
                {
                    messageId: "noSpaceBetweenBrackets",
                    type: AST_NODE_TYPES.TSArrayType,
                },
                {
                    messageId: "oneSpace",
                    type: AST_NODE_TYPES.TSArrayType,
                },
                {
                    messageId: "noSpaceBetweenBrackets",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
            output: "const array: string [][ ];",
        },
        {
            options: alwaysMultiAlwaysOptions,
            code: "const array: string [ ][];",
            errors: [
                {
                    messageId: "oneSpaceBetweenDimensions",
                    type: AST_NODE_TYPES.TSArrayType,
                },
                {
                    messageId: "noSpaceBetweenBrackets",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
            output: "const array: string [][];",
        },
    ],
});
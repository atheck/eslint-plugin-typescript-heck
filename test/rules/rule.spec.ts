import { arrayTypeSpacing, ruleName } from "../../src/rules/array-type-spacing";
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
                    messageId: "noSpaceBetween",
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
                    messageId: "noSpaceBetween",
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
                    messageId: "noSpaceBetween",
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
                    messageId: "noSpaceBetween",
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
import { arrayTypeSpacing, ruleName } from "../../src/rules/array-type-spacing";
import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/experimental-utils";

const ruleTester = new ESLintUtils.RuleTester({
    parser: "@typescript-eslint/parser",
});

ruleTester.run(ruleName, arrayTypeSpacing, {
    valid: [
        "const array: string [];",
        "function test (array: string []) {}",
        "type SomeType<T extends string []> = {};",
    ],
    invalid: [
        {
            code: "const array: string[];",
            errors: [
                {
                    messageId: "missingSpace",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
        },
        {
            code: "function test (array: string[]) {}",
            errors: [
                {
                    messageId: "missingSpace",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
        },
        {
            code: "type SomeType<T extends string[]> = {};",
            errors: [
                {
                    messageId: "missingSpace",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
        },
    ],
});
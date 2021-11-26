import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/experimental-utils";
import { typescriptArraySpacing } from "../../src/rules/typescript-array-spacing";

const ruleTester = new ESLintUtils.RuleTester({
    parser: "@typescript-eslint/parser",
});

ruleTester.run("my-rule", typescriptArraySpacing, {
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
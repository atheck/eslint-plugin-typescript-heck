import { arrayTypeSpacing, MessageIds, Options, ruleName } from "../../src/rules/array-type-spacing";
import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/experimental-utils";
import { InvalidTestCase, ValidTestCase } from "@typescript-eslint/experimental-utils/dist/ts-eslint";

const ruleTester = new ESLintUtils.RuleTester({
    parser: "@typescript-eslint/parser",
});

const codes: [string, Options] [] = [
    ["const array: string [];", ["always"]],
    ["const array: { prop: string } [];", ["always"]],
    ["function test (array: string []) {}", ["always"]],
    ["type SomeType<T extends string []> = {};", ["always"]],
    ["const array: string[];", ["never"]],
    ["const array: { prop: string }[];", ["never"]],
    ["function test (array: string[]) {}", ["never"]],
    ["type SomeType<T extends boolean[]> = {};", ["never"]],
];
const alwaysInvalid = [
    "const array: number[ ];",
    "const array: number  [];",
    "const array: Date [ ];",
];

const validCases = codes.map(([code, options]): ValidTestCase<Options> => ({
    options,
    code,
}));
const invalidCases = codes.map(([code, options]): InvalidTestCase<MessageIds, Options> => {
    if (options[0] === "always") {
        return {
            options: ["never"],
            code,
            errors: [
                {
                    messageId: "removeSpace",
                    type: AST_NODE_TYPES.TSArrayType,
                },
            ],
        };
    }

    return {
        options: ["always"],
        code,
        errors: [
            {
                messageId: "addSpace",
                type: AST_NODE_TYPES.TSArrayType,
            },
        ],
    };
});
const alwaysInvalidCases = alwaysInvalid.flatMap((code): InvalidTestCase<MessageIds, Options> [] => [
    {
        code,
        options: ["always"],
        errors: [
            {
                messageId: "addSpace",
                type: AST_NODE_TYPES.TSArrayType,
            },
        ],
    },
    {
        code,
        options: ["never"],
        errors: [
            {
                messageId: "removeSpace",
                type: AST_NODE_TYPES.TSArrayType,
            },
        ],
    },
]);

ruleTester.run(ruleName, arrayTypeSpacing, {
    valid: validCases,
    invalid: [...invalidCases, ...alwaysInvalidCases],
});
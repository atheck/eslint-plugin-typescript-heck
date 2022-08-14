import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/experimental-utils";
import { ruleName, typeParameterSpacing } from "../../src/rules/type-parameter-spacing";

const ruleTester = new ESLintUtils.RuleTester({
    parser: "@typescript-eslint/parser",
});

ruleTester.run(`${ruleName} for function declaration with mode 'never'`, typeParameterSpacing, {
    valid: [
        {
            options: ["never"],
            code: "function generic<TType> () {}",
        },
    ],
    invalid: [
        {
            options: ["never"],
            code: "function generic <TType> () {}",
            errors: [
                {
                    messageId: "noSpace",
                    type: AST_NODE_TYPES.TSTypeParameterDeclaration,
                },
            ],
            output: "function generic<TType> () {}",
        },
    ],
});

ruleTester.run(`${ruleName} for function declaration with mode 'always'`, typeParameterSpacing, {
    valid: [
        {
            options: ["always"],
            code: "function generic <TType> () {}",
        },
    ],
    invalid: [
        {
            options: ["always"],
            code: "function generic<TType> () {}",
            errors: [
                {
                    messageId: "oneSpace",
                    type: AST_NODE_TYPES.TSTypeParameterDeclaration,
                },
            ],
            output: "function generic <TType> () {}",
        },
    ],
});

ruleTester.run(`${ruleName} for declare function with mode 'never'`, typeParameterSpacing, {
    valid: [
        {
            options: ["never"],
            code: "declare function generic<TType> (): void;",
        },
    ],
    invalid: [
        {
            options: ["never"],
            code: "declare function generic <TType> (): void;",
            errors: [
                {
                    messageId: "noSpace",
                    type: AST_NODE_TYPES.TSTypeParameterDeclaration,
                },
            ],
            output: "declare function generic<TType> (): void;",
        },
    ],
});

ruleTester.run(`${ruleName} for declare function with mode 'always'`, typeParameterSpacing, {
    valid: [
        {
            options: ["always"],
            code: "declare function generic <TType> (): void;",
        },
    ],
    invalid: [
        {
            options: ["always"],
            code: "declare function generic<TType> (): void;",
            errors: [
                {
                    messageId: "oneSpace",
                    type: AST_NODE_TYPES.TSTypeParameterDeclaration,
                },
            ],
            output: "declare function generic <TType> (): void;",
        },
    ],
});

ruleTester.run(`${ruleName} for interface with mode 'never'`, typeParameterSpacing, {
    valid: [
        {
            options: ["never"],
            code: "interface Generic<TType> {}",
        },
    ],
    invalid: [
        {
            options: ["never"],
            code: "interface Generic <TType> {}",
            errors: [
                {
                    messageId: "noSpace",
                    type: AST_NODE_TYPES.TSTypeParameterDeclaration,
                },
            ],
            output: "interface Generic<TType> {}",
        },
    ],
});

ruleTester.run(`${ruleName} for interface with mode 'always'`, typeParameterSpacing, {
    valid: [
        {
            options: ["always"],
            code: "interface Generic <TType> {}",
        },
    ],
    invalid: [
        {
            options: ["always"],
            code: "interface Generic<TType> {}",
            errors: [
                {
                    messageId: "oneSpace",
                    type: AST_NODE_TYPES.TSTypeParameterDeclaration,
                },
            ],
            output: "interface Generic <TType> {}",
        },
    ],
});

ruleTester.run(`${ruleName} for type with mode 'never'`, typeParameterSpacing, {
    valid: [
        {
            options: ["never"],
            code: "type Generic<TType> = {};",
        },
    ],
    invalid: [
        {
            options: ["never"],
            code: "type Generic <TType> = {};",
            errors: [
                {
                    messageId: "noSpace",
                    type: AST_NODE_TYPES.TSTypeParameterDeclaration,
                },
            ],
            output: "type Generic<TType> = {};",
        },
    ],
});

ruleTester.run(`${ruleName} for type with mode 'always'`, typeParameterSpacing, {
    valid: [
        {
            options: ["always"],
            code: "type Generic <TType> = {};",
        },
    ],
    invalid: [
        {
            options: ["always"],
            code: "type Generic<TType> = {};",
            errors: [
                {
                    messageId: "oneSpace",
                    type: AST_NODE_TYPES.TSTypeParameterDeclaration,
                },
            ],
            output: "type Generic <TType> = {};",
        },
    ],
});

ruleTester.run(`${ruleName} for class with mode 'never'`, typeParameterSpacing, {
    valid: [
        {
            options: ["never"],
            code: "class Generic<TType> {};",
        },
    ],
    invalid: [
        {
            options: ["never"],
            code: "class Generic <TType> {};",
            errors: [
                {
                    messageId: "noSpace",
                    type: AST_NODE_TYPES.TSTypeParameterDeclaration,
                },
            ],
            output: "class Generic<TType> {};",
        },
    ],
});

ruleTester.run(`${ruleName} for class with mode 'always'`, typeParameterSpacing, {
    valid: [
        {
            options: ["always"],
            code: "class Generic <TType> {};",
        },
    ],
    invalid: [
        {
            options: ["always"],
            code: "class Generic<TType> {};",
            errors: [
                {
                    messageId: "oneSpace",
                    type: AST_NODE_TYPES.TSTypeParameterDeclaration,
                },
            ],
            output: "class Generic <TType> {};",
        },
    ],
});

ruleTester.run(`${ruleName} for type references with mode 'never'`, typeParameterSpacing, {
    valid: [
        {
            options: ["never"],
            code: "function test (): GenericType<number> {}",
        },
        {
            options: ["never"],
            code: "type Alias = GenericType<number>;",
        },
        {
            options: ["never"],
            code: "const value: GenericType<number>;",
        },
    ],
    invalid: [
        {
            options: ["never"],
            code: "function test (): GenericType <number> {}",
            errors: [
                {
                    messageId: "noSpace",
                    type: AST_NODE_TYPES.TSTypeParameterInstantiation,
                },
            ],
            output: "function test (): GenericType<number> {}",
        },
        {
            options: ["never"],
            code: "type Alias = GenericType <number>;",
            errors: [
                {
                    messageId: "noSpace",
                    type: AST_NODE_TYPES.TSTypeParameterInstantiation,
                },
            ],
            output: "type Alias = GenericType<number>;",
        },
        {
            options: ["never"],
            code: "const value: GenericType <number>;",
            errors: [
                {
                    messageId: "noSpace",
                    type: AST_NODE_TYPES.TSTypeParameterInstantiation,
                },
            ],
            output: "const value: GenericType<number>;",
        },
    ],
});

ruleTester.run(`${ruleName} for type references with mode 'always'`, typeParameterSpacing, {
    valid: [
        {
            options: ["always"],
            code: "function test (): GenericType <number> {}",
        },
        {
            options: ["always"],
            code: "type Alias = GenericType <number>;",
        },
        {
            options: ["always"],
            code: "const value: GenericType <number>;",
        },
    ],
    invalid: [
        {
            options: ["always"],
            code: "function test (): GenericType<number> {}",
            errors: [
                {
                    messageId: "oneSpace",
                    type: AST_NODE_TYPES.TSTypeParameterInstantiation,
                },
            ],
            output: "function test (): GenericType <number> {}",
        },
        {
            options: ["always"],
            code: "type Alias = GenericType<number>;",
            errors: [
                {
                    messageId: "oneSpace",
                    type: AST_NODE_TYPES.TSTypeParameterInstantiation,
                },
            ],
            output: "type Alias = GenericType <number>;",
        },
        {
            options: ["always"],
            code: "const value: GenericType<number>;",
            errors: [
                {
                    messageId: "oneSpace",
                    type: AST_NODE_TYPES.TSTypeParameterInstantiation,
                },
            ],
            output: "const value: GenericType <number>;",
        },
    ],
});

ruleTester.run(`${ruleName} for super class with mode 'never'`, typeParameterSpacing, {
    valid: [
        {
            options: ["never"],
            code: "class Extends extends SuperClass<number> {};",
        },
    ],
    invalid: [
        {
            options: ["never"],
            code: "class Extends extends SuperClass <number> {};",
            errors: [
                {
                    messageId: "noSpace",
                    type: AST_NODE_TYPES.TSTypeParameterInstantiation,
                },
            ],
            output: "class Extends extends SuperClass<number> {};",
        },
    ],
});

ruleTester.run(`${ruleName} for super class with mode 'always'`, typeParameterSpacing, {
    valid: [
        {
            options: ["always"],
            code: "class Extends extends SuperClass <number> {};",
        },
    ],
    invalid: [
        {
            options: ["always"],
            code: "class Extends extends SuperClass<number> {};",
            errors: [
                {
                    messageId: "oneSpace",
                    type: AST_NODE_TYPES.TSTypeParameterInstantiation,
                },
            ],
            output: "class Extends extends SuperClass <number> {};",
        },
    ],
});
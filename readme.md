# eslint-plugin-typescript-heck

This package includes extended eslint rules for usage with Typescript.

## Rules

| Name | Description |
| ---  | ---         |
| [array-type-spacing](#array-type-spacing) | Enforces correct spacing between type name and square brackets of array types. |

### array-type-spacing

This rule enforces correct spacing between type name and square brackets of array types.

#### Options

This rule takes one option:

* "never" (default) enforces no space between type name and square brackets.
* "always" enforces exactly one space between type name and square brackets.

~~~json
"array-type-spacing": ["warn", "never"]
~~~

**never:**

Examples of **incorrect** code for this rule:

~~~ts
const myVar: string [] = [];
function myFunc (parameter: number []) {
    // ...
}
~~~

Examples of **correct** code for this rule:

~~~ts
const myVar: string[] = [];
function myFunc (parameter: number[]) {
    // ...
}
~~~

**always:**

Examples of **incorrect** code for this rule:

~~~ts
const myVar: string[] = [];
function myFunc (parameter: number[]) {
    // ...
}
~~~

Examples of **correct** code for this rule:

~~~ts
const myVar: string [] = [];
function myFunc (parameter: number []) {
    // ...
}
~~~

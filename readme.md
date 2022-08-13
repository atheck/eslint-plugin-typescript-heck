# eslint-plugin-typescript-heck

This package includes extended eslint rules for usage with Typescript.

## Rules

| Name | Description |
| ---  | ---         |
| [array-type-spacing](#array-type-spacing) | Enforces correct spacing between type name and square brackets of array types. |
| [type-parameter-spacing](#type-parameter-spacing) | Enforces correct spacing between an identifier and type parameters. |

### array-type-spacing

This rule enforces correct spacing between type name and square brackets of array types. It also enforces no spaces between the square brackets.

🔧 The `--fix` option on the command line can automatically fix the problems reported by this rule.

#### Options

This rule takes one option:

* "never" (default) enforces no space between type name and square brackets.
* "always" enforces exactly one space between type name and square brackets.

~~~json
"array-type-spacing": ["warn", "never"]
~~~

**never:**

👎 Examples of **incorrect** code for this rule:

~~~ts
const myVar: string [] = [];
function myFunc (parameter: number []) {
    // ...
}
~~~

👍 Examples of **correct** code for this rule:

~~~ts
const myVar: string[] = [];
function myFunc (parameter: number[]) {
    // ...
}
~~~

**always:**

👎 Examples of **incorrect** code for this rule:

~~~ts
const myVar: string[] = [];
function myFunc (parameter: number[]) {
    // ...
}
~~~

👍 Examples of **correct** code for this rule:

~~~ts
const myVar: string [] = [];
function myFunc (parameter: number []) {
    // ...
}
~~~

There is an optional configuration object:

**betweenDimensions**:

* "never" (default) enforces no space between consecutive square brackets.
* "always" enforces exactly one space between consecutive square brackets.

~~~json
{
    "betweenDimensions": "never"
}
~~~

**betweenDimensions: "never":**

👎 Examples of **incorrect** code for this rule:

~~~ts
const myVar: string[] [] = [];
function myFunc (parameter: number[] []) {
    // ...
}
~~~

👍 Examples of **correct** code for this rule:

~~~ts
const myVar: string [][] = [];
function myFunc (parameter: number [][]) {
    // ...
}
~~~

**betweenDimensions: "always":**

👎 Examples of **incorrect** code for this rule:

~~~ts
const myVar: string[][] = [];
function myFunc (parameter: number[][]) {
    // ...
}
~~~

👍 Examples of **correct** code for this rule:

~~~ts
const myVar: string [] [] = [];
function myFunc (parameter: number [] []) {
    // ...
}
~~~

### type-parameter-spacing

This rule enforces correct spacing between an identifier and type parameters. This works for functions, function declarations, interfaces, type aliases, and classes.

🔧 The `--fix` option on the command line can automatically fix the problems reported by this rule.

#### Options

This rule takes one option:

* "never" (default) enforces no space between identifier and type parameters.
* "always" enforces exactly one space between identifier and type parameters.

~~~json
"type-parameter-spacing": ["warn", "never"]
~~~

**never:**

👎 Examples of **incorrect** code for this rule:

~~~ts
function generic <TType> (parameter: TType) {
    // ...
}

interface Generic <TType> {
    value: TType,
}
~~~

👍 Examples of **correct** code for this rule:

~~~ts
function generic<TType> (parameter: TType) {
    // ...
}

interface Generic<TType> {
    value: TType,
}
~~~

**always:**

👎 Examples of **incorrect** code for this rule:

~~~ts
function generic<TType> (parameter: TType) {
    // ...
}

interface Generic<TType> {
    value: TType,
}
~~~

👍 Examples of **correct** code for this rule:

~~~ts
function generic <TType> (parameter: TType) {
    // ...
}

interface Generic <TType> {
    value: TType,
}
~~~

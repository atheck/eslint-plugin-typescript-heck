# eslint-plugin-typescript-heck

This package includes extended eslint rules for usage with Typescript.

## Rules

| Name | Description |
| ---  | ---         |
| `typescript-array-spacing` | Enforces one space between type name and square brackets. |

### typescript-array-spacing

This rule enforces one space between type name and square brackets.

**Examples for invalid code:**

~~~ts
const myVar: string[] = [];
function myFunc (parameter: number[]) {
    // ...
}
~~~

**Examples for valid code:**

~~~ts
const myVar: string [] = [];
function myFunc (parameter: number []) {
    // ...
}
~~~

import { ruleName as arraySpacingName, arrayTypeSpacing } from "./array-type-spacing";
import { typeParameterSpacing, ruleName as typeParameterSpacingName } from "./type-parameter-spacing";

const rules = {
    [arraySpacingName]: arrayTypeSpacing,
    [typeParameterSpacingName]: typeParameterSpacing,
};

export {
    rules,
};
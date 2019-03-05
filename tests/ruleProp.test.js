import { RuleProp } from "../scripts/ruleProp";

test("Attempting to instantiate ruleProp should error", () => {
    expect(() => {const test = new RuleProp();}).toThrow(TypeError); // eslint-disable-line no-unused-vars
});

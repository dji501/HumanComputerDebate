import { Rule } from "../scripts/rule";
import { Proposition } from "../scripts/proposition";
//TODO: Add booleanRuleBase
test("Instantiating Rule gives correct values", () => {
    let lhsProp = new Proposition("LHS", true);
    let rhsProp = new Proposition("RHS", true);
    let warrentProp = new Proposition("Warrent", true);
    const rule = new Rule(lhsProp, rhsProp, warrentProp, null, "Name");

    expect(rule.antecedent).toBe(lhsProp);
    expect(rule.antecedent.position).toBe("ANTECEDENT");
    expect(rule.consequent).toBe(rhsProp);
    expect(rule.consequent.position).toBe("CONSEQUENT");
    expect(rule.warrent).toBe(warrentProp);
    expect(rule.warrent.position).toBe("WARRENT");
    expect(rule.truth).toBe(true);
    expect(rule.fired).toBe(false);
});

test("Instantiating Rule without Warrent, BooleanRuleBase and Name gives correct values", () => {
    let lhsProp = new Proposition("LHS", true);
    let rhsProp = new Proposition("RHS", true);
    const rule = new Rule(lhsProp, rhsProp);

    expect(rule.antecedent).toBe(lhsProp);
    expect(rule.antecedent.position).toBe("ANTECEDENT");
    expect(rule.consequent).toBe(rhsProp);
    expect(rule.consequent.position).toBe("CONSEQUENT");
    expect(rule.truth).toBe(true);
    expect(rule.fired).toBe(false);
});

test("Equal method identifies equivalent Rule", () => {
    let lhsProp1 = new Proposition("LHS", true);
    let rhsProp2 = new Proposition("RHS", true);
    const rule1 = new Rule(lhsProp1, rhsProp2);
    expect(rule1.equals(rule1)).toBe(true);

    let lhsProp3 = new Proposition("LHS", true);
    let rhsProp4 = new Proposition("RHS", true);
    const rule2 = new Rule(lhsProp3, rhsProp4);
    expect(rule1.equals(rule2)).toBe(true);
});

test("Equal method identifies unequivalent Rule", () => {
    let lhsProp1 = new Proposition("LHS", true);
    let rhsProp2 = new Proposition("RHS", true);
    const rule1 = new Rule(lhsProp1, rhsProp2);

    let lhsProp3 = new Proposition("LHS", false);
    let rhsProp4 = new Proposition("RHS", false);
    const rule2 = new Rule(lhsProp3, rhsProp4);
    expect(rule1.equals(rule2)).toBe(false);
});

test("Check clone method works correctly", () => {
    let lhsProp1 = new Proposition("LHS", true);
    let rhsProp2 = new Proposition("RHS", true);
    const rule1 = new Rule(lhsProp1, rhsProp2);
    const rule2 = rule1.clone();

    expect(rule1).toEqual(rule2);
});

test("Negate method should negate truth value correctly", () => {
    let lhsProp1 = new Proposition("LHS", true);
    let rhsProp2 = new Proposition("RHS", true);
    const rule1 = new Rule(lhsProp1, rhsProp2);
    rule1.negate();

    expect(rule1.truth).toBe(false);

    rule1.negate();

    expect(rule1.truth).toBe(true);
});

test("Denial method should return denial or current Rule", () => {
    let lhsProp1 = new Proposition("LHS", true);
    let rhsProp2 = new Proposition("RHS", true);
    const rule1 = new Rule(lhsProp1, rhsProp2);

    const rule2 = new Rule(lhsProp1, rhsProp2);
    rule2.truth = false;

    const rule3 = rule1.denial();

    expect(rule3).toEqual(rule2);
    expect(rule3.truth).toEqual(false);

    let lhsProp3 = new Proposition("LHS", true);
    let rhsProp4 = new Proposition("RHS", true);
    const rule4 = new Rule(lhsProp3, rhsProp4);
    rule4.negate();
    expect(rule4.truth).toEqual(false);
    expect(rule4.denial().truth).toEqual(true);
});

test("getContentAsString should return appropriate value", () => {
    let lhsProp1 = new Proposition("LHS", true);
    let rhsProp2 = new Proposition("RHS", true);
    const rule1 = new Rule(lhsProp1, rhsProp2);
    expect(rule1.getContentAsString()).toBe("'LHS' implies 'RHS'");

    const rule2 = rule1.denial();
    expect(rule2.getContentAsString()).toBe("It is not the case that 'LHS' implies 'RHS'");
});

test("check getClassName returns correct name", () => {
    let lhsProp1 = new Proposition("LHS", true);
    let rhsProp2 = new Proposition("RHS", true);
    const rule1 = new Rule(lhsProp1, rhsProp2);

    expect(rule1.getClassName()).toBe("Rule");
});

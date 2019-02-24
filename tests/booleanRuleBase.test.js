import { BooleanRuleBase } from "../scripts/booleanRuleBase";
import { Proposition } from "../scripts/proposition";
import { Rule } from "../scripts/rule";



test("instantiate the BRB correctly", () => {
    let BRB = new BooleanRuleBase("Player"); // es-lint

    expect(BRB._name).toBe("Player");
});

test("addProposition to the BRB correctly", () => {
    let BRB = new BooleanRuleBase("Player"); // es-lint
    const prop1 = new Proposition("CP is a good deterrent", true);

    BRB.addProposition(prop1);
    expect(BRB._propositionList).toEqual([prop1]);
});

test("remove Proposition from the BRB correctly", () => {
    let BRB = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);

    BRB.addProposition(prop1);
    expect(BRB._propositionList).toEqual([prop1]);

    BRB.removeProposition(prop1);
    expect(BRB._propositionList).toEqual([]);
});

test("Add rule to the BRB correctly", () => {
    let BRB = new BooleanRuleBase("Player"); // es-lint
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const prop3 = new Proposition("Warrent", true);
    const rule = new Rule(prop1, prop2, prop3);

    BRB.addRule(rule);
    expect(BRB._ruleList).toEqual([rule]);
    expect(BRB._rulePropList).toEqual([prop1,prop2, prop3]);
});

test("remove rule from the BRB correctly", () => {
    let BRB = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const prop3 = new Proposition("Warrent", true);
    const rule = new Rule(prop1, prop2, prop3);

    BRB.addRule(rule);

    BRB.removeRule(rule);
    expect(BRB._ruleList).toEqual([]);
    expect(BRB._rulePropList).toEqual([]);
});

test("matchRuleProposition method gets correct ruleProp", () => {
    let BRB = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const prop3 = new Proposition("Warrent", true);
    const rule = new Rule(prop1, prop2, prop3);

    BRB.addRule(rule);
    expect(BRB.matchRuleProposition(prop1)).toEqual(prop1);

    const prop4 = new Proposition("CP is a good deterrent", true);
    expect(BRB.matchRuleProposition(prop4)).toEqual(prop1);
});

test("matchPropositionmethod gets correct Prop", () => {
    let BRB = new BooleanRuleBase("Player"); // es-lint
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is not a good deterrent", true);

    BRB.addProposition(prop1);
    BRB.addProposition(prop2);
    expect(BRB.matchProposition(prop1)).toEqual(prop1);

    const prop3 = new Proposition("CP is a good deterrent", true);
    expect(BRB.matchProposition(prop3)).toEqual(prop1);
});

test("matchRule method gets correct rule", () => {
    let BRB = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const prop3 = new Proposition("Warrent", true);
    const rule = new Rule(prop1, prop2, prop3);

    BRB.addRule(rule);
    expect(BRB.matchRule(rule)).toEqual(rule);

    const rule2 = new Rule(prop1, prop2, prop3);
    expect(BRB.matchRule(rule2)).toEqual(rule);
});

test("checkProp method identies proposition correctly", () => {
    let BRB = new BooleanRuleBase("Player"); // es-lint
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is not a good deterrent", true);

    BRB.addProposition(prop1);
    BRB.addProposition(prop2);
    expect(BRB.checkProp(prop1)).toEqual(true);

    const prop3 = new Proposition("CP is a good deterrent", true);
    expect(BRB.checkProp(prop3)).toEqual(true);
});

test("findGroundPropositions method finds correct propositions", () => {
    let BRB = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    BRB.addRule(rule);
    BRB.addProposition(prop1);
    BRB.addProposition(prop2);


    expect(BRB.findGroundPropositions(prop2)).toEqual([prop1]);
});

//TODO: NEED CONFLICT SET.
test("findAcceptableGroundPropositions method finds correct propositions", () => {
    let BRB = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    BRB.addRule(rule);
    BRB.addProposition(prop1);
    BRB.addProposition(prop2);

});

test("propIsSupported identifies support proposition", () => {
    let BRB = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    BRB.addRule(rule);
    BRB.addProposition(prop1);
    BRB.addProposition(prop2);

    expect(BRB.propIsSupported(prop2)).toBe(true);
    expect(BRB.propIsSupported(prop1)).toBe(false);
});

test("propSupportsOthers identifies supporting proposition", () => {
    let BRB = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    BRB.addRule(rule);
    BRB.addProposition(prop1);
    BRB.addProposition(prop2);

    expect(BRB.propSupportsOthers(prop2)).toBe(false);
    expect(BRB.propSupportsOthers(prop1)).toBe(true);
});

test("propSupportsOthers identifies supporting proposition", () => {
    let BRB = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    BRB.addRule(rule);
    BRB.addProposition(prop1);
    BRB.addProposition(prop2);

    expect(BRB.getDirectSupportedProp(prop2)).toBe(null);
    expect(BRB.getDirectSupportedProp(prop1)).toEqual(prop2);
});

//TODO: NEED PLAN + PLANSET
test("getPlanFromProposition method returns correct plan", () => {

});

test("supports method returns correct value when first value supports second", () => {

});

test("supports method returns correct value when first value doesn't supports second", () => {

});

test("getPlanSet method returns correct planSet", () => {

});

test("againstSupport method returns correct value when first value supports second", () => {

});

test("againstSupport method returns correct value when first value doesn't supports second", () => {

});

//TODO: NEED CommitmentStore
test("challengeable method returns correct value when challengeable", () => {

});

test("challengeable method returns correct value when not challengeable", () => {

});

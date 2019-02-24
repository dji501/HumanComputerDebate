import { BooleanRuleBase } from "../scripts/booleanRuleBase";
import { Proposition } from "../scripts/proposition";
import { Rule } from "../scripts/rule";
import { CommitmentStore } from "../scripts/commitmentStore"


test("instantiate the brb correctly", () => {
    let brb = new BooleanRuleBase("Player");

    expect(brb._name).toBe("Player");
});

test("addProposition to the brb correctly", () => {
    let brb = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);

    brb.addProposition(prop1);
    expect(brb._propositionList).toEqual([prop1]);
});

test("remove Proposition from the brb correctly", () => {
    let brb = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);

    brb.addProposition(prop1);
    expect(brb._propositionList).toEqual([prop1]);

    brb.removeProposition(prop1);
    expect(brb._propositionList).toEqual([]);
});

test("Add rule to the brb correctly", () => {
    let brb = new BooleanRuleBase("Player"); // es-lint
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const prop3 = new Proposition("Warrent", true);
    const rule = new Rule(prop1, prop2, prop3);

    brb.addRule(rule);
    expect(brb._ruleList).toEqual([rule]);
    expect(brb._rulePropList).toEqual([prop1,prop2, prop3]);
});

test("remove rule from the brb correctly", () => {
    let brb = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const prop3 = new Proposition("Warrent", true);
    const rule = new Rule(prop1, prop2, prop3);

    brb.addRule(rule);

    brb.removeRule(rule);
    expect(brb._ruleList).toEqual([]);
    expect(brb._rulePropList).toEqual([]);
});

test("matchRuleProposition method gets correct ruleProp", () => {
    let brb = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const prop3 = new Proposition("Warrent", true);
    const rule = new Rule(prop1, prop2, prop3);

    brb.addRule(rule);
    expect(brb.matchRuleProposition(prop1)).toEqual(prop1);

    const prop4 = new Proposition("CP is a good deterrent", true);
    expect(brb.matchRuleProposition(prop4)).toEqual(prop1);
});

test("matchPropositionmethod gets correct Prop", () => {
    let brb = new BooleanRuleBase("Player"); // es-lint
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is not a good deterrent", true);

    brb.addProposition(prop1);
    brb.addProposition(prop2);
    expect(brb.matchProposition(prop1)).toEqual(prop1);

    const prop3 = new Proposition("CP is a good deterrent", true);
    expect(brb.matchProposition(prop3)).toEqual(prop1);
});

test("matchRule method gets correct rule", () => {
    let brb = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const prop3 = new Proposition("Warrent", true);
    const rule = new Rule(prop1, prop2, prop3);

    brb.addRule(rule);
    expect(brb.matchRule(rule)).toEqual(rule);

    const rule2 = new Rule(prop1, prop2, prop3);
    expect(brb.matchRule(rule2)).toEqual(rule);
});

test("checkProp method identies proposition correctly", () => {
    let brb = new BooleanRuleBase("Player"); // es-lint
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is not a good deterrent", true);

    brb.addProposition(prop1);
    brb.addProposition(prop2);
    expect(brb.checkProp(prop1)).toEqual(true);

    const prop3 = new Proposition("CP is a good deterrent", true);
    expect(brb.checkProp(prop3)).toEqual(true);
});

test("findGroundPropositions method finds correct propositions", () => {
    let brb = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    brb.addRule(rule);
    brb.addProposition(prop1);
    brb.addProposition(prop2);


    expect(brb.findGroundPropositions(prop2)).toEqual([prop1]);
});

test("findGroundPropositions method finds no propositions when not in proposition list", () => {
    let brb = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    brb.addRule(rule);
    brb.addProposition(prop1);


    expect(brb.findGroundPropositions(prop2)).toEqual([]);
});

//TODO: NEED CONFLICT SET.
test("findAcceptableGroundPropositions method finds correct propositions", () => {
    let brb = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    brb.addRule(rule);
    brb.addProposition(prop1);
    brb.addProposition(prop2);

});

test("propIsSupported identifies support proposition", () => {
    let brb = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    brb.addRule(rule);
    brb.addProposition(prop1);
    brb.addProposition(prop2);

    expect(brb.propIsSupported(prop2)).toBe(true);
    expect(brb.propIsSupported(prop1)).toBe(false);
});

test("propSupportsOthers identifies supporting proposition", () => {
    let brb = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    brb.addRule(rule);
    brb.addProposition(prop1);
    brb.addProposition(prop2);

    expect(brb.propSupportsOthers(prop2)).toBe(false);
    expect(brb.propSupportsOthers(prop1)).toBe(true);
});

test("propSupportsOthers identifies supporting proposition", () => {
    let brb = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    brb.addRule(rule);
    brb.addProposition(prop1);
    brb.addProposition(prop2);

    expect(brb.getDirectSupportedProp(prop2)).toBe(null);
    expect(brb.getDirectSupportedProp(prop1)).toEqual(prop2);
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
    let brb = new BooleanRuleBase("Player");
    let cs1 = new CommitmentStore("Partner");
    let cs2 = new CommitmentStore("Self");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2); // eslint-disable-line no-unused-vars

    brb.addProposition(prop1);
    brb.addProposition(prop2);
    cs1.addAssertion(prop2);

    expect(brb.challengeable(prop2, cs1,cs2)).toEqual(true);
});

test("challengeable method returns false when not challengeable", () => {
    let brb = new BooleanRuleBase("Player");
    let cs1 = new CommitmentStore("Partner");
    let cs2 = new CommitmentStore("Self");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    expect(brb.challengeable(rule, cs1, cs2)).toEqual(false);

    brb.addProposition(prop2);
    cs1.addAssertion(prop2);

    expect(brb.challengeable(prop2, cs1, cs2)).toEqual(false);

    const prop3 = new Proposition("Nobody wants to die", true);
    const rule2 = new Rule(prop3, prop1);
    cs2.addAssertion(rule2);
    cs2.addAssertion(rule);
    cs2.addAssertion(prop3);
    brb.addProposition(prop1);

    expect(brb.challengeable(prop2, cs1, cs2)).toEqual(false);
});

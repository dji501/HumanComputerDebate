import { BooleanRuleBase } from "../scripts/booleanRuleBase";
import { Proposition } from "../scripts/proposition";
import { Rule } from "../scripts/rule";
import { CommitmentStore } from "../scripts/commitmentStore";
import { Plan } from "../scripts/plan";
import { PlanSet } from "../scripts/planSet";

test("instantiate the brb correctly", () => {
    const brb = new BooleanRuleBase("Player");

    expect(brb._name).toBe("Player");
});

test("addProposition to the brb correctly", () => {
    const brb = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);

    brb.addProposition(prop1);
    expect(brb._propositionList).toEqual([prop1]);
});

test("remove Proposition from the brb correctly", () => {
    const brb = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);

    brb.addProposition(prop1);
    expect(brb._propositionList).toEqual([prop1]);

    brb.removeProposition(prop1);
    expect(brb._propositionList).toEqual([]);
});

test("Add rule to the brb correctly", () => {
    const brb = new BooleanRuleBase("Player"); // es-lint
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const prop3 = new Proposition("Warrent", true);
    const rule = new Rule(prop1, prop2, prop3);

    brb.addRule(rule);
    expect(brb._ruleList).toEqual([rule]);
    expect(brb._rulePropList).toEqual([prop1,prop2, prop3]);
});

test("remove rule from the brb correctly", () => {
    const brb = new BooleanRuleBase("Player");
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
    const brb = new BooleanRuleBase("Player");
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
    const brb = new BooleanRuleBase("Player"); // es-lint
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is not a good deterrent", true);

    brb.addProposition(prop1);
    brb.addProposition(prop2);
    expect(brb.matchProposition(prop1)).toEqual(prop1);

    const prop3 = new Proposition("CP is a good deterrent", true);
    expect(brb.matchProposition(prop3)).toEqual(prop1);
});

test("matchRule method gets correct rule", () => {
    const brb = new BooleanRuleBase("Player");
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
    const brb = new BooleanRuleBase("Player"); // es-lint
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is not a good deterrent", true);

    brb.addProposition(prop1);
    brb.addProposition(prop2);
    expect(brb.checkProp(prop1)).toEqual(true);

    const prop3 = new Proposition("CP is a good deterrent", true);
    expect(brb.checkProp(prop3)).toEqual(true);
});

test("findGroundPropositions method finds correct propositions", () => {
    const brb = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    brb.addRule(rule);
    brb.addProposition(prop1);
    brb.addProposition(prop2);


    expect(brb.findGroundPropositions(prop2)).toEqual([prop1]);
});

test("findGroundPropositions method finds no propositions when not in proposition list", () => {
    const brb = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    brb.addRule(rule);
    brb.addProposition(prop1);


    expect(brb.findGroundPropositions(prop2)).toEqual([]);
});

//TODO: IMPROVE COVERAGE
test("findAcceptableGroundPropositions method finds correct propositions", () => {
    const brb = new BooleanRuleBase("Player");
    const cs = new CommitmentStore("Partner");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);
    const prop1Clone = prop1.clone();
    brb.addRule(rule);
    brb.addProposition(prop1);
    brb.addProposition(prop2);

    expect(brb.findAcceptableGroundPropositions(prop2, cs)).toEqual([prop1Clone]);
});

test("propIsSupported identifies support proposition", () => {
    const brb = new BooleanRuleBase("Player");
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
    const brb = new BooleanRuleBase("Player");
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
    const brb = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    brb.addRule(rule);
    brb.addProposition(prop1);
    brb.addProposition(prop2);

    expect(brb.getDirectSupportedProp(prop2)).toBe(null);
    expect(brb.getDirectSupportedProp(prop1)).toEqual(prop2);
});

test("getPlanFromProposition method returns correct plan", () => {
    const brb = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);
    const plan = new Plan();

    brb.addRule(rule);
    brb.addProposition(prop1);
    brb.addProposition(prop2);
    plan.add(prop2);

    expect(brb.getPlanFromProposition(prop1)).toEqual(plan);
});

test("supports method returns correct value when first value supports second", () => {
    const brb = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const prop3 = new Proposition("CP is poo poo", true);
    const rule = new Rule(prop1, prop2);

    brb.addRule(rule);
    brb.addProposition(prop1);
    brb.addProposition(prop2);

    expect(brb.supports(rule, prop2)).toEqual(true);
    expect(brb.supports(prop1, prop2)).toEqual(true);
    expect(brb.supports(prop2, prop1)).toEqual(false);
    expect(brb.supports(prop3, prop2)).toEqual(false);
});

test("supports method returns correct value when first value supports a negative second", () => {
    const brb = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);

    const prop3 = new Proposition("CP having countries have a higher murder rate than others", true);
    const prop4 = new Proposition("CP is a good deterrent", false);
    const rule = new Rule(prop1, prop2);
    const rule2 = new Rule(prop3, prop4);

    brb.addRule(rule);
    brb.addRule(rule2);
    brb.addProposition(prop1);
    brb.addProposition(prop2);
    brb.addProposition(prop3);
    brb.addProposition(prop4);

    expect(brb.supports(prop3, prop4)).toEqual(true);
    expect(brb.supports(prop3, prop1.denial())).toEqual(true);
});

test("getPlanSet method returns correct planSet", () => {
    const brb = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);

    const rule = new Rule(prop1, prop2);
    const expectedPlanSet = new PlanSet();
    const plan = new Plan();
    plan.add(prop1);
    plan.add(prop2);
    expectedPlanSet.add(plan);

    brb.addRule(rule);
    brb.addProposition(prop1);
    brb.addProposition(prop2);

    expect(brb.getPlanSet(prop2)).toEqual(expectedPlanSet);
});

test("againstSupport method returns correct value when first param is against second", () => {
    const brb = new BooleanRuleBase("Player");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);

    const prop3 = new Proposition("CP having countries have a higher murder rate than others", true);
    const prop4 = new Proposition("CP is a good deterrent", false);
    const rule = new Rule(prop1, prop2);
    const rule2 = new Rule(prop3, prop4);

    brb.addRule(rule);
    brb.addRule(rule2);
    brb.addProposition(prop1);
    brb.addProposition(prop2);
    brb.addProposition(prop3);
    brb.addProposition(prop4);

    expect(brb.againstSupport(rule2, prop2)).toEqual(true);
    expect(brb.againstSupport(prop3, prop2)).toEqual(true);
    expect(brb.againstSupport(prop2, prop1)).toEqual(false);
    expect(brb.againstSupport(prop3, prop4)).toEqual(false);
    expect(brb.againstSupport(prop3, prop3)).toEqual(false);
});

test("challengeable method returns correct value when challengeable", () => {
    const brb = new BooleanRuleBase("Player");
    const cs1 = new CommitmentStore("Partner");
    const cs2 = new CommitmentStore("Self");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2); // eslint-disable-line no-unused-vars

    brb.addProposition(prop1);
    brb.addProposition(prop2);
    cs1.addAssertion(prop2);

    expect(brb.challengeable(prop2, cs1,cs2)).toEqual(true);
});

test("challengeable method returns false when not challengeable", () => {
    const brb = new BooleanRuleBase("Player");
    const cs1 = new CommitmentStore("Partner");
    const cs2 = new CommitmentStore("Self");
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

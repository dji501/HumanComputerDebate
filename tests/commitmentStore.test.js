import { BooleanRuleBase } from "../scripts/booleanRuleBase";
import { Proposition } from "../scripts/proposition";
import { Rule } from "../scripts/rule";
import { CommitmentStore } from "../scripts/commitmentStore";

test("initialisation works correctly", () => {
    const cs = new CommitmentStore();

    expect(cs._claimStack).toEqual([]);
    expect(cs._assertionList).toEqual([]);
    expect(cs._concessionList).toEqual([]);
    expect(cs._totalList).toEqual([]);
    expect(cs._record).toEqual([]);
});

test("remove element from array should remove element successfully", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("1", true);
    const prop2 = new Proposition("2", true);
    const prop3 = new Proposition("3", true);
    const rule = new Rule(prop1,prop2);

    let arr = [prop1, prop2, prop3];
    cs.removeRulePropFromArray(prop3,arr);
    expect(arr).toEqual([prop1,prop2]);

    let arr2 = [rule];
    cs.removeRulePropFromArray(rule,arr2);
    expect(arr2).toEqual([]);

});

test("add assertion adds proposition assertion correctly", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is acceptable", true);
    const prop1Denial = prop1.denial();
    cs._concessionList = [prop1Denial];

    cs.addAssertion(prop1);

    expect(cs._claimStack).toEqual([prop1]);
    expect(cs._assertionList).toEqual([prop1]);
    expect(cs._concessionList).toEqual([]);
    expect(cs._totalList).toEqual([prop1]);
    expect(cs._record).toEqual([prop1]);
    expect(cs._propositionList).toEqual([prop1]);
});

test("add assertion adds rule assertion correctly", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1,prop2);

    cs.addAssertion(rule);

    expect(cs._claimStack).toEqual([rule]);
    expect(cs._assertionList).toEqual([rule]);
    expect(cs._concessionList).toEqual([]);
    expect(cs._totalList).toEqual([rule]);
    expect(cs._record).toEqual([rule]);
    expect(cs._ruleList).toEqual([rule]);
    expect(cs._rulePropList).toEqual([prop1,prop2]);
});

test("add concession adds a concession correctly", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is acceptable", true);

    cs.addConcession(prop1);

    expect(cs._concessionList).toEqual([prop1]);
    expect(cs._totalList).toEqual([prop1]);
    expect(cs._record).toEqual([prop1]);
    expect(cs._propositionList).toEqual([prop1]);
});

test("add concession adds rule assertion correctly", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1,prop2);

    cs.addConcession(rule);

    expect(cs._concessionList).toEqual([rule]);
    expect(cs._totalList).toEqual([rule]);
    expect(cs._record).toEqual([rule]);
    expect(cs._ruleList).toEqual([rule]);
    expect(cs._rulePropList).toEqual([prop1,prop2]);
});

test("withdraw concession withdraws proposition correctly", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is acceptable", true);
    cs.addConcession(prop1);

    cs.withdrawConcession(prop1);

    expect(cs._concessionList).toEqual([]);
    expect(cs._totalList).toEqual([]);
    expect(cs._record).toEqual([prop1]);
    expect(cs._propositionList).toEqual([]);
});

test("withdraw concession withdraws rule correctly", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1,prop2);
    cs.addConcession(rule);

    cs.withdrawConcession(rule);

    expect(cs._concessionList).toEqual([]);
    expect(cs._totalList).toEqual([]);
    expect(cs._record).toEqual([rule]);
    expect(cs._ruleList).toEqual([]);
    expect(cs._rulePropList).toEqual([]);
});

test("withdraw withdraws proposition correctly", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is acceptable", true);
    cs.addAssertion(prop1);

    cs.withdraw(prop1);

    expect(cs._assertionList).toEqual([]);
    expect(cs._concessionList).toEqual([]);
    expect(cs._totalList).toEqual([]);
    expect(cs._record).toEqual([prop1]);
    expect(cs._propositionList).toEqual([]);
});

test("withdraw withdraws rule correctly", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1,prop2);
    cs.addAssertion(rule);

    cs.withdraw(rule);

    expect(cs._assertionList).toEqual([]);
    expect(cs._concessionList).toEqual([]);
    expect(cs._totalList).toEqual([]);
    expect(cs._record).toEqual([rule]);
    expect(cs._ruleList).toEqual([]);
    expect(cs._rulePropList).toEqual([]);
});

test("OnAssertion can tell that prop is on assertionList", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is acceptable", true);

    expect(cs.onAssertion(prop1)).toEqual(false);

    cs.addAssertion(prop1);

    expect(cs.onAssertion(prop1)).toEqual(true);
});

test("OnAssertion can tell that rule is on assertionList", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1,prop2);

    expect(cs.onAssertion(rule)).toEqual(false);

    cs.addAssertion(rule);

    expect(cs.onAssertion(rule)).toEqual(true);
});

test("onClaimStack can tell that prop is on ClaimStack", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is acceptable", true);

    expect(cs.onClaimStack(prop1)).toEqual(false);

    cs.addAssertion(prop1);

    expect(cs.onClaimStack(prop1)).toEqual(true);
});

test("onClaimStack can tell that rule is on ClaimStack", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1,prop2);

    expect(cs.onClaimStack(rule)).toEqual(false);

    cs.addAssertion(rule);

    expect(cs.onClaimStack(rule)).toEqual(true);
});

test("onConcession can tell that prop is on Concession list", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is acceptable", true);

    expect(cs.onConcession(prop1)).toEqual(false);

    cs.addConcession(prop1);

    expect(cs.onConcession(prop1)).toEqual(true);
});

test("onConcession can tell that rule is on Concession list", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1,prop2);

    expect(cs.onConcession(rule)).toEqual(false);

    cs.addConcession(rule);

    expect(cs.onConcession(rule)).toEqual(true);
});

test("onTotal can tell that prop is on Total list", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is acceptable", true);

    expect(cs.onTotal(prop1)).toEqual(false);

    cs.addConcession(prop1);

    expect(cs.onTotal(prop1)).toEqual(true);
});

test("onTotal can tell that rule is on Total list", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1,prop2);

    expect(cs.onTotal(rule)).toEqual(false);

    cs.addAssertion(rule);

    expect(cs.onTotal(rule)).toEqual(true);
});

test("onRecord can tell that prop is on Record list", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is acceptable", true);

    expect(cs.onRecord(prop1)).toEqual(false);

    cs.addConcession(prop1);

    expect(cs.onRecord(prop1)).toEqual(true);
});

test("onRecord can tell that rule is on Record list", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1,prop2);

    expect(cs.onRecord(rule)).toEqual(false);

    cs.addAssertion(rule);

    expect(cs.onRecord(rule)).toEqual(true);
});

test("derive from total gets correct value if on total list", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    cs.addAssertion(rule);
    expect(cs.deriveFromTotal(rule)).toEqual(true);
});

test("derive from total gets correct value if not on total list", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);
    cs.addAssertion(rule);
    cs.addAssertion(prop1);
    cs.addAssertion(prop2);
    cs._totalList = [];

    expect(cs.deriveFromTotal(prop2)).toEqual(true);
});

test("getRealConflictSet should return the correct conflict set", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const prop3 = prop2.denial();
    cs.addAssertion(prop1);

    expect(cs.getRealConflictSet().set).toEqual([]);

    cs.addAssertion(prop2);
    cs.addAssertion(prop3);

    expect(cs.getRealConflictSet().set).toEqual([prop2,prop3]);
});

test("getRealPremises should return the correct conflict set", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    cs.addAssertion(prop1);
    cs.addAssertion(rule);

    expect(cs.getRealPremises(prop2).set).toEqual([prop1,rule]);
});

//TODO:
test("get Input does something correctly", () => {

});

test("getSupportProp returns right value when passed a rule", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    expect(cs.getSupportProp(rule)).toEqual(prop2);
});

test("getSupportProp returns right value when passed a proposition", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);
    const prop2Clone = prop2.clone();

    cs.addAssertion(rule);
    cs.addAssertion(prop2);

    expect(cs.getSupportProp(prop1)).toEqual(prop2Clone);
});

test("derivable returns right value if ruleProp is in total list", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    cs.addAssertion(rule);

    expect(cs.derivable(rule)).toEqual(true);
});

test("isConsequence returns the correct value when Rule passed", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    cs.addAssertion(rule);

    expect(cs.isConsequence(rule)).toEqual(false);
});

test("isConsequence returns the correct value when prop passed with no rules", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is a good deterrent", true);

    cs.addAssertion(prop1);

    expect(cs.isConsequence(prop1)).toEqual(false);
});

test("isConsequence returns the correct value when prop passed with consequence", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);
    const prop3 = new Proposition("Nobody wants to die", true);
    const rule2 = new Rule(prop3, prop1);
    cs.addAssertion(rule2);
    cs.addAssertion(rule);
    cs.addAssertion(prop3);

    expect(cs.isConsequence(prop2)).toEqual(true);
});

test("isConsequence returns the correct value when prop passed without consequence", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);
    const prop3 = new Proposition("Nobody wants to die", true);
    const rule2 = new Rule(prop3, prop1);
    cs.addAssertion(rule2);
    cs.addAssertion(rule);


    expect(cs.isConsequence(prop2)).toEqual(false);
});

test("get rules gets the correct rule from a proposition", () => {
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);
    const prop3 = new Proposition("Nobody wants to die", true);
    const rule2 = new Rule(prop3, prop1);
    cs.addAssertion(rule2);
    cs.addAssertion(rule);

    expect(cs.getRules(prop1)).toEqual([rule2]);
    expect(cs.getRules(prop2)).toEqual([rule]);
    expect(cs.getRules(prop3)).toEqual([]);
});

test("isSupported returns true value when supporting prop is in cs", () => {
    const brb = new BooleanRuleBase("Computer");
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);
    brb.addProposition(prop1);
    brb.addProposition(prop2);
    brb.addRule(rule);

    cs.addAssertion(prop1);
    expect(cs.isSupported(prop2, brb)).toEqual(true);
});

test("isSupported returns false value when supporting prop is not in cs", () => {
    const brb = new BooleanRuleBase("Computer");
    const cs = new CommitmentStore();
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);
    brb.addProposition(prop1);
    brb.addProposition(prop2);
    brb.addRule(rule);

    expect(cs.isSupported(prop2, brb)).toEqual(false);
});

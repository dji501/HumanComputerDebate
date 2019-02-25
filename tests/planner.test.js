import { Planner } from "../scripts/planner";
import { Proposition } from "../scripts/proposition";
import { Rule } from "../scripts/rule";
import { CommitmentStore } from "../scripts/commitmentStore";
import { BooleanRuleBase } from "../scripts/booleanRuleBase";
import { Move } from "../scripts/move";
import { ConflictSet } from "../scripts/conflictSet";

test("initialises as expected", ()=> {
    let planner = new Planner("C");

    expect(planner.turn).toEqual("C");
    expect(planner.currentPlan).toEqual(null);
});

// TODO: requires all the strategists
test("produceRelevantMove should produce relevant moves when", () => {

});

test("produceRelevantMove should produce relevant moves when", () => {

});

test("produceRelevantMove should produce relevant moves when", () => {

});

test("produceRelevantMove should produce relevant moves when", () => {

});

test("produceRelevantMove should produce relevant moves when", () => {

});

test("produceRelevantMove should produce relevant moves when", () => {

});

test("planResolution should return appropriate set of moves when P, R, R -> -P", () => {
    const planner = new Planner("C");
    const prevContent = new Proposition("'nobody is willing to die'  and  'suicide bombers want to die'  and  ''suicide bombers want to die' implies 'some people are willing to die''", true);
    const prop1 = new Proposition("nobody is willing to die", true);
    const prop2 = new Proposition("suicide bombers want to die", true);
    const rule = new Rule(prop2, prop1.denial());

    const conflictSet = new ConflictSet();
    conflictSet.add(prop1);
    conflictSet.add(prop2);
    conflictSet.add(rule);

    const previousMove = new Move("S", "Resolve", prevContent, conflictSet);

    const expectedMove1 = [new Move("C", "Withdraw", prop1),new Move("C", "Withdraw", prop2),new Move("C", "Withdraw", rule)];

    expect(planner.planResolution(previousMove, "C", [], [])).toEqual(expectedMove1);

});

test("planResolution should return appropriate set of moves when P, -P and no acceptable grounds found", () => {
    const planner = new Planner("C");
    const compThesis = new Proposition("CP is acceptable", true);
    planner._computerThesis = compThesis;

    const prevContent = new Proposition("'nobody is willing to die'  and  'suicide bombers want to die'  and  ''suicide bombers want to die' implies 'some people are willing to die''", true);
    const prop1 = new Proposition("nobody is willing to die", true);
    const prop2 = new Proposition("nobody is willing to die", false);

    const brb = new BooleanRuleBase("Comp");
    brb.addProposition(compThesis);
    brb.addProposition(prop1);
    brb.addProposition(prop2);

    const partnerCS = new CommitmentStore("Partner");

    const conflictSet = new ConflictSet();
    conflictSet.add(prop1);
    conflictSet.add(prop2);

    const previousMove = new Move("S", "Resolve", prevContent, conflictSet);

    const expectedMove1 = [new Move("C", "Withdraw", prop2)];

    expect(planner.planResolution(previousMove, "C", partnerCS, brb)).toEqual(expectedMove1);
});

test("planResolution should return appropriate set of moves when P, -P and acceptable grounds found", () => {
    const planner = new Planner("C");
    const compThesis = new Proposition("CP is acceptable", true);
    planner._computerThesis = compThesis;

    const prevContent = new Proposition("'nobody is willing to die'  and  'suicide bombers want to die'  and  ''suicide bombers want to die' implies 'some people are willing to die''", true);
    const prop1 = new Proposition("nobody is willing to die", true);
    const prop2 = new Proposition("nobody is willing to die", false);
    const prop3 = new Proposition("I defend my friend", true);
    const rule = new Rule(prop3, prop2);

    const brb = new BooleanRuleBase("Comp");
    brb.addProposition(compThesis);
    brb.addProposition(prop1);
    brb.addProposition(prop2);
    brb.addProposition(prop3);
    brb.addProposition(rule);

    const partnerCS = new CommitmentStore("Partner");
    partnerCS.addAssertion(prop3);

    const conflictSet = new ConflictSet();
    conflictSet.add(prop1);
    conflictSet.add(prop2);

    const previousMove = new Move("S", "Resolve", prevContent, conflictSet);

    const expectedMove1 = [new Move("C", "Withdraw", prop1)];

    expect(planner.planResolution(previousMove, "C", partnerCS, brb)).toEqual(expectedMove1);
});

test("planResolution should return appropriate set of moves when R, R->P", () => {
    const planner = new Planner("C");
    const compThesis = new Proposition("CP is acceptable", true);
    planner._computerThesis = compThesis;

    const prevContent = new Proposition("'nobody is willing to die'  and  'suicide bombers want to die'  and  ''suicide bombers want to die' implies 'some people are willing to die''", true);
    const prop1 = new Proposition("nobody is willing to die", true);
    const prop2 = new Proposition("nobody is willing to die", false);
    const prop3 = new Proposition("suicide bombers want to die", true);
    const rule = new Rule(prop3, prop2);

    const brb = new BooleanRuleBase("Comp");
    brb.addProposition(compThesis);
    brb.addProposition(prop1);
    brb.addProposition(prop2);
    brb.addProposition(prop3);
    brb.addProposition(rule);

    const partnerCS = new CommitmentStore("Partner");
    partnerCS.addAssertion(prop3);

    const conflictSet = new ConflictSet();
    conflictSet.add(rule);
    conflictSet.add(prop1);

    const previousMove = new Move("S", "Resolve", prevContent, conflictSet);

    const expectedMove1 = [new Move("C", "Assertion", conflictSet.getConsequent().clone()), new Move("C", "Withdraw", rule), new Move("C", "Withdraw", prop1)];

    expect(planner.planResolution(previousMove, "C", partnerCS, brb)).toEqual(expectedMove1);
});

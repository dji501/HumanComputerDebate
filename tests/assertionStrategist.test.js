import { AssertionStrategist } from "../scripts/assertionStrategist";
import { Plan } from "../scripts/plan";
import { Proposition } from "../scripts/proposition";
import { Move } from "../scripts/move";
import { Rule } from "../scripts/rule";
import { DialogueHistory } from "../scripts/dialogueHistory";
import { Planner } from "../scripts/planner";
import { CommitmentStore } from "../scripts/commitmentStore";
import { BooleanRuleBase } from "../scripts/BooleanRuleBase";


test("start of game stategy should perform correct actions if user accepts", () => {
    const selfCS = new CommitmentStore("self");
    const partnerCS = new CommitmentStore("partner");

    const brb = new BooleanRuleBase("selfKBS");

    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is acceptable", false);

    const move1 = new Move("C", "Question", prop1);
    const move2 = new Move("S", "Concession", prop2);

    const dh = new DialogueHistory();
    dh.add(move1);
    dh.add(move2);

    const planner = new Planner();

    expect(AssertionStrategist.planAssertion(dh, selfCS, partnerCS, brb, planner)).toEqual([new Move("C","Assertion",prop1)]);
    expect(planner.computerThesis).toEqual(prop1);
});

test("start of game stategy should perform correct actions if user rejects", () => {
    const selfCS = new CommitmentStore("self");
    const partnerCS = new CommitmentStore("partner");

    const brb = new BooleanRuleBase("selfKBS");

    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is acceptable", false);

    const move1 = new Move("C", "Question", prop1);
    const move2 = new Move("S", "Concession", prop1);

    const dh = new DialogueHistory();
    dh.add(move1);
    dh.add(move2);

    const planner = new Planner();

    expect(AssertionStrategist.planAssertion(dh, selfCS, partnerCS, brb, planner)).toEqual([new Move("C","Assertion",prop2)]);
    expect(planner.computerThesis).toEqual(prop2);
});

// TODO Finish this set of tests:
test("", () => {
    const dh = new DialogueHistory();
    const planner = new Planner();
    const plan1 = new Plan();
    const plan2 = new Plan();
    const proposition1 = new Proposition("political and racial bias often cause prejudices", true);
    const proposition2 = new Proposition("there are mistakes during the judicial process", true);
    const proposition3 = new Proposition("innocent people may get killed", true);

    const proposition4 = new Proposition("suicide bombers want to die", true);
    const proposition5 = new Proposition("some people want to die", true);
    const proposition6 = new Proposition("CP is not a good deterrant", true);

    plan1.add(proposition1);
    plan1.add(proposition2);
    plan1.add(proposition3);

    plan2.add(proposition4);
    plan2.add(proposition5);
    plan2.add(proposition6);
});

test("", () => {

});

test("", () => {

});

test("", () => {

});

test("", () => {

});

test("", () => {

});

test("", () => {

});

import { FocusShiftManager } from "../scripts/focusShiftManager";
import { Plan } from "../scripts/plan";
import { Proposition } from "../scripts/proposition";
import { Move } from "../scripts/move";
import { Rule } from "../scripts/rule";
import { DialogueHistory } from "../scripts/dialogueHistory";
import { Planner } from "../scripts/planner";
import { CommitmentStore } from "../scripts/commitmentStore";
import { BooleanRuleBase } from "../scripts/BooleanRuleBase";
import { PlanSet } from "../scripts/planSet";

test("execute focus shift manager should return nothing to say when there is nothing to say", () => {
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

    selfCS.addAssertion(prop1);
    partnerCS.addAssertion(prop2);

    const planner = new Planner();
    planner.computerThesis = prop1;

    expect(FocusShiftManager.execute(dh, selfCS, partnerCS, brb, planner)).toEqual(new Move("C","Assertion", new Proposition("if you have anything more to say, you can go on", true)));
});

test("execute focus shift manager should return what planSetQuestionMove would return", () => {
    const selfCS = new CommitmentStore("self");
    const partnerCS = new CommitmentStore("partner");

    const brb = new BooleanRuleBase("selfKBS");
    const plan1 = new Plan();

    const planSet = new PlanSet();
    const planner = new Planner();
    const dh = new DialogueHistory();
    const prop1 = new Proposition("political and racial bias often cause prejudices", true);
    const prop2 = new Proposition("there are mistakes during the judicial process", true);
    const prop3 = new Proposition("CP is not acceptable", true);

    const rule2 = new Rule(prop2, prop3);

    plan1.add(prop2);
    plan1.add(prop3);
    planSet.add(plan1);

    brb.addRule(rule2);
    brb.addProposition(prop1);
    brb.addProposition(prop2);
    brb.addProposition(prop3);

    planner.computerThesis = prop3;

    expect(FocusShiftManager.execute(dh, selfCS, partnerCS, brb, planner)).toEqual(planSet.getQuestionMove(dh,planner));
});

test("execute focus shift manager should return what startBuildPlan would return", () => {
    const selfCS = new CommitmentStore("self");
    const partnerCS = new CommitmentStore("partner");

    const brb = new BooleanRuleBase("selfKBS");
    const plan1 = new Plan();
    const plan2 = new Plan();

    const planSet = new PlanSet();
    const planner = new Planner();
    const dh = new DialogueHistory();

    const proposition1 = new Proposition("political and racial bias often cause prejudices", true);
    const proposition2 = new Proposition("there are mistakes during the judicial process", true);
    const proposition3 = new Proposition("innocent people may get killed", true);

    const proposition4 = new Proposition("suicide bombers want to die", true);
    const proposition5 = new Proposition("some people want to die", true);
    const proposition6 = new Proposition("CP is not a good deterrant", true);

    const rule2 = new Rule(proposition1, proposition2);
    const rule3 = new Rule(proposition2, proposition3);

    const rule4 = new Rule(proposition4, proposition5);
    const rule5 = new Rule(proposition5, proposition6);

    plan1.add(proposition1);
    plan1.add(proposition2);
    plan1.add(proposition3);

    plan2.add(proposition4);
    plan2.add(proposition5);
    plan2.add(proposition6);

    planSet.add(plan1);
    planSet.add(plan2);

    brb.addRule(rule2);
    brb.addRule(rule3);
    brb.addRule(rule4);
    brb.addRule(rule5);
    brb.addProposition(proposition1);
    brb.addProposition(proposition2);
    brb.addProposition(proposition3);
    brb.addProposition(proposition4);
    brb.addProposition(proposition5);
    brb.addProposition(proposition6);

    planner.computerThesis = proposition6;

    const mockMath2 = Object.create(global.Math);
    mockMath2.random = () => 1;
    global.Math = mockMath2;

    expect(FocusShiftManager.execute(dh, selfCS, partnerCS, brb, planner)).toEqual(planSet.startBuildPlan(dh,planner));
});

test("execute focus shift manager should return what startSubtopic would return", () => {
    const selfCS = new CommitmentStore("self");
    const partnerCS = new CommitmentStore("partner");

    const brb = new BooleanRuleBase("selfKBS");
    const plan1 = new Plan();
    const plan2 = new Plan();

    const planSet = new PlanSet();
    const planner = new Planner();
    const dh = new DialogueHistory();

    const proposition1 = new Proposition("political and racial bias often cause prejudices", true);
    const proposition2 = new Proposition("there are mistakes during the judicial process", true);
    const proposition3 = new Proposition("innocent people may get killed", true);

    const proposition4 = new Proposition("suicide bombers want to die", true);
    const proposition5 = new Proposition("some people want to die", true);
    const proposition6 = new Proposition("CP is not a good deterrant", true);

    const rule2 = new Rule(proposition1, proposition2);
    const rule3 = new Rule(proposition2, proposition3);

    const rule4 = new Rule(proposition4, proposition5);
    const rule5 = new Rule(proposition5, proposition6);

    plan1.add(proposition1);
    plan1.add(proposition2);
    plan1.add(proposition3);

    plan2.add(proposition4);
    plan2.add(proposition5);
    plan2.add(proposition6);

    planSet.add(plan1);
    planSet.add(plan2);

    brb.addRule(rule2);
    brb.addRule(rule3);
    brb.addRule(rule4);
    brb.addRule(rule5);
    brb.addProposition(proposition1);
    brb.addProposition(proposition2);
    brb.addProposition(proposition3);
    brb.addProposition(proposition4);
    brb.addProposition(proposition5);
    brb.addProposition(proposition6);

    planner.computerThesis = proposition3;

    const mockMath2 = Object.create(global.Math);
    mockMath2.random = () => 0;
    global.Math = mockMath2;

    expect(FocusShiftManager.execute(dh, selfCS, partnerCS, brb, planner)).toEqual(planSet.startSubtopic(selfCS,partnerCS));
});

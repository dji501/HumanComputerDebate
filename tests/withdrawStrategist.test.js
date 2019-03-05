import { WithdrawStrategist } from "../scripts/withdrawStrategist";
import { Plan } from "../scripts/plan";
import { Proposition } from "../scripts/proposition";
import { Move } from "../scripts/move";
import { Rule } from "../scripts/rule";
import { DialogueHistory } from "../scripts/dialogueHistory";
import { Planner } from "../scripts/planner";
import { CommitmentStore } from "../scripts/commitmentStore";
import { BooleanRuleBase } from "../scripts/BooleanRuleBase";
import { PlanSet } from "../scripts/planSet";
import { FocusShiftManager } from "../scripts/focusShiftManager";

test("plan withdraw should get value for executing current plan when plan is under execution", () => {
    const selfCS = new CommitmentStore("self");
    const partnerCS = new CommitmentStore("partner");

    const brb = new BooleanRuleBase("selfKBS");

    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is acceptable", false);

    const plan1 = new Plan();
    const plan2 = new Plan();

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


    plan1.add(proposition2);
    plan1.add(proposition3);

    plan2.add(proposition2);
    plan2.add(proposition3);

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

    const move1 = new Move("C", "Question", prop1);
    const move2 = new Move("S", "Concession", prop2);
    const move3 = new Move("C", "Question", proposition1);
    const move4 = new Move("S", "Concession", proposition1);

    const dh = new DialogueHistory();
    dh.add(move1);
    dh.add(move2);
    dh.add(move3);
    dh.add(move4);

    const planner = new Planner();
    planner.computerThesis = prop2;
    planner.currentPlan = plan1;

    const planner2 = new Planner();
    planner2.computerThesis = prop2;
    planner2.currentPlan = plan2;

    expect(WithdrawStrategist.planWithdraw(dh,selfCS, partnerCS, brb, planner)).toEqual([planner2.currentPlan.execute(dh,planner2,partnerCS,selfCS,brb)]);
});

test("plan withdraw should get value from focus shift manager when plan is abandoned", () => {
    const selfCS = new CommitmentStore("self");
    const partnerCS = new CommitmentStore("partner");

    const brb = new BooleanRuleBase("selfKBS");

    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is acceptable", false);

    const plan1 = new Plan();
    const plan2 = new Plan();

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


    plan1.add(proposition2);
    plan1.add(proposition3);

    plan2.add(proposition2);
    plan2.add(proposition3);

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

    const move1 = new Move("C", "Question", prop1);
    const move2 = new Move("S", "Concession", prop2);
    const move3 = new Move("C", "Question", proposition1);
    const move4 = new Move("S", "Withdraw", proposition1);

    const dh = new DialogueHistory();
    dh.add(move1);
    dh.add(move2);
    dh.add(move3);
    dh.add(move4);

    const planner = new Planner();
    planner.computerThesis = prop2;
    planner.currentPlan = plan1;

    const planner2 = new Planner();
    planner2.computerThesis = prop2;
    planner2.currentPlan = plan2;

    expect(WithdrawStrategist.planWithdraw(dh,selfCS, partnerCS, brb, planner)).toEqual([FocusShiftManager.execute(dh, planner, partnerCS,selfCS,brb)]);
});

test("plan withdraw should get value from supportedProposition when there is no plan", () => {
    //TODO: Increase coverage expect(WithdrawStrategist.planWithdraw()).toEqual([]);
});

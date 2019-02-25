import { Move } from "../scripts/move";
import { PlanSet } from "../scripts/planSet";
import { Plan } from "../scripts/plan";
import { Proposition } from "../scripts/proposition";
import { Rule } from "../scripts/rule";
import { CommitmentStore } from "../scripts/commitmentStore"
import { DialogueHistory } from "../scripts/dialogueHistory";
import { Planner } from "../scripts/planner";

test("initialisation works correctly", () => {
    const planSet = new PlanSet();

    expect(planSet.set).toEqual([]);
});

test("add method works correctly", () => {
    const plan1 = new Plan();
    const plan2 = new Plan();
    const planSet = new PlanSet();
    const proposition1 = new Proposition("political and racial bias often cause prejudices", true);
    const proposition2 = new Proposition("there are mistakes during the judicial process", true);

    plan1.add(proposition1);
    plan2.add(proposition2);

    expect(planSet.set).toEqual([]);

    planSet.add(plan1);

    expect(planSet.set).toEqual([plan1]);

    planSet.add(plan2);

    expect(planSet.set).toEqual([plan1, plan2]);
});


test("getHardEvidentialMove returns a hard evidential move when one exists", () => {
    const plan1 = new Plan();
    const plan2 = new Plan();
    const planSet = new PlanSet();
    const proposition1 = new Proposition("political and racial bias often cause prejudices", true);
    const proposition2 = new Proposition("there are mistakes during the judicial process", true);
    const proposition3 = new Proposition("records show an increase of murders in CP countries", true, "evidence");
    const selfCS = new CommitmentStore();
    const expectedMove = new Move("C","Assertion", proposition3);

    plan1.add(proposition1);
    plan2.add(proposition3);
    plan2.add(proposition2);
    planSet.add(plan1);
    planSet.add(plan2);

    expect(planSet.getHardEvidentialMove(selfCS)).toEqual(expectedMove);
});

test("getHardEvidentialMove does not return a hard evidential move when one doesn't exist", () => {
    const plan1 = new Plan();
    const plan2 = new Plan();
    const planSet = new PlanSet();
    const proposition1 = new Proposition("political and racial bias often cause prejudices", true);
    const proposition2 = new Proposition("there are mistakes during the judicial process", true);
    const proposition3 = new Proposition("records show an increase of murders in CP countries", true, "evidence");
    const selfCS = new CommitmentStore();
    const expectedMove = null;
    plan1.add(proposition1);
    plan2.add(proposition3);
    plan2.add(proposition2);
    planSet.add(plan1);
    planSet.add(plan2);
    selfCS.addAssertion(proposition3);

    expect(planSet.getHardEvidentialMove(selfCS)).toEqual(expectedMove);
});

test("get Question move returns a question move when it exists", () => {
    const plan1 = new Plan();
    const plan2 = new Plan();
    const planSet = new PlanSet();
    const planner = new Planner();
    const dh = new DialogueHistory();
    const proposition1 = new Proposition("political and racial bias often cause prejudices", true);
    const proposition2 = new Proposition("there are mistakes during the judicial process", true);
    const proposition3 = new Proposition("records show an increase of murders in CP countries", true, "evidence");

    plan1.add(proposition1);
    plan2.add(proposition3);
    plan2.add(proposition2);
    planSet.add(plan1);
    planSet.add(plan2);

    expect(planSet.getQuestionMove(dh,planner)).toEqual(new Move("C", "Question", proposition3));
});

test("get Question move returns no question move when it doesnt exist", () => {
    const plan1 = new Plan();
    const plan2 = new Plan();
    const planSet = new PlanSet();
    const planner = new Planner();
    const dh = new DialogueHistory();
    const proposition1 = new Proposition("political and racial bias often cause prejudices", true);
    const proposition2 = new Proposition("there are mistakes during the judicial process", true);
    const proposition3 = new Proposition("records show an increase of murders in CP countries", true, "evidence");
    const move1 = new Move("C","Question",proposition3);
    const move2 = new Move("C","Question",proposition2);
    plan1.add(proposition1);
    plan2.add(proposition3);
    plan2.add(proposition2);
    planSet.add(plan1);
    planSet.add(plan2);
    dh.add(move1);
    dh.add(move2);

    expect(planSet.getQuestionMove(dh,planner)).toEqual(null);
});

test("get rebuttal move returns a rebuttal move when it exists", () => {
    const plan1 = new Plan();
    const planSet = new PlanSet();
    const proposition1 = new Proposition("political and racial bias often cause prejudices", true);
    const proposition2 = new Proposition("there are mistakes during the judicial process", true);
    const proposition3 = new Proposition("innocent people may get killed", true);
    const selfCS = new CommitmentStore();
    const partnerCS = new CommitmentStore();
    const expectedMove1 = new Move("C","Assertion", proposition3);
    const expectedMove2 = new Move("C","Assertion", proposition2);
    plan1.add(proposition1);
    plan1.add(proposition2);
    plan1.add(proposition3);
    planSet.add(plan1);

    expect(planSet.getRebuttalMove(selfCS, partnerCS)).toEqual(expectedMove1);

    selfCS.addAssertion(proposition3);

    expect(planSet.getRebuttalMove(selfCS, partnerCS)).toEqual(expectedMove2);
});

test("get rebuttal move returns null when there isnt one", () => {
    const plan1 = new Plan();
    const plan2 = new Plan();
    const planSet = new PlanSet();
    const proposition1 = new Proposition("political and racial bias often cause prejudices", true);
    const proposition2 = new Proposition("there are mistakes during the judicial process", true);
    const proposition3 = new Proposition("innocent people may get killed", true);

    const proposition4 = new Proposition("suicide bombers want to die", true);
    const proposition5 = new Proposition("some people want to die", true);

    const selfCS = new CommitmentStore();
    const partnerCS = new CommitmentStore();

    const expectedMove1 = null;

    plan1.add(proposition1);
    plan1.add(proposition2);
    plan1.add(proposition3);
    planSet.add(plan1);

    selfCS.addAssertion(proposition3);
    selfCS.addAssertion(proposition2);

    expect(planSet.getRebuttalMove(selfCS, partnerCS)).toEqual(expectedMove1);

    plan2.add(proposition4);
    plan2.add(proposition5);
    planSet.add(plan2);

    expect(planSet.getRebuttalMove(selfCS, partnerCS)).toEqual(expectedMove1);
});

test("startSubtopic starts a succesful subtopic when one exists", () => {
    const plan1 = new Plan();
    const plan2 = new Plan();
    const planSet = new PlanSet();
    const proposition1 = new Proposition("political and racial bias often cause prejudices", true);
    const proposition2 = new Proposition("there are mistakes during the judicial process", true);
    const proposition3 = new Proposition("innocent people may get killed", true);

    const proposition4 = new Proposition("suicide bombers want to die", true);
    const proposition5 = new Proposition("some people want to die", true);
    const proposition6 = new Proposition("CP is not a good deterrant", true);

    const selfCS = new CommitmentStore();
    const partnerCS = new CommitmentStore();

    const expectedMove1 = new Move("C","Assertion",proposition2);
    const expectedMove2 = new Move("C","Assertion",proposition5);

    plan1.add(proposition1);
    plan1.add(proposition2);
    plan1.add(proposition3);
    planSet.add(plan1);

    expect(planSet.startSubtopic(selfCS,partnerCS)).toEqual(expectedMove1);

    plan2.add(proposition4);
    plan2.add(proposition5);
    plan2.add(proposition6);
    planSet.add(plan2);

    const mockMath1 = Object.create(global.Math);
    mockMath1.random = () => 0;
    global.Math = mockMath1;

    expect(planSet.startSubtopic(selfCS,partnerCS)).toEqual(expectedMove1);

    const mockMath2 = Object.create(global.Math);
    mockMath2.random = () => 1;
    global.Math = mockMath2;

    expect(planSet.startSubtopic(selfCS,partnerCS)).toEqual(expectedMove2);
});

test("startSubtopic return null when a succesful subtopic does not exist", () => {
    const plan1 = new Plan();
    const planSet = new PlanSet();
    const proposition1 = new Proposition("political and racial bias often cause prejudices", true);
    const proposition2 = new Proposition("there are mistakes during the judicial process", true);
    const proposition3 = new Proposition("innocent people may get killed", true);

    const selfCS = new CommitmentStore();
    const partnerCS = new CommitmentStore();

    const expectedMove1 = null;

    plan1.add(proposition1);
    plan1.add(proposition2);
    plan1.add(proposition3);
    planSet.add(plan1);

    selfCS.addAssertion(proposition2);

    expect(planSet.startSubtopic(selfCS,partnerCS)).toEqual(expectedMove1);
});

test("startBuildPlan builds a plan succesfully and gives the first move back", () => {
    const dh = new DialogueHistory();
    const planner = new Planner();
    const plan1 = new Plan();
    const plan2 = new Plan();
    const planSet = new PlanSet();
    const proposition1 = new Proposition("political and racial bias often cause prejudices", true);
    const proposition2 = new Proposition("there are mistakes during the judicial process", true);
    const proposition3 = new Proposition("innocent people may get killed", true);

    const proposition4 = new Proposition("suicide bombers want to die", true);
    const proposition5 = new Proposition("some people want to die", true);
    const proposition6 = new Proposition("CP is not a good deterrant", true);

    plan1.add(proposition1);
    plan1.add(proposition2);
    plan1.add(proposition3);
    planSet.add(plan1);

    plan2.add(proposition4);
    plan2.add(proposition5);
    plan2.add(proposition6);
    planSet.add(plan2);

    const mockMath1 = Object.create(global.Math);
    mockMath1.random = () => 0;
    global.Math = mockMath1;

    expect(planSet.startBuildPlan(dh,planner)).toEqual(new Move("C","Question",proposition1));

    const mockMath2 = Object.create(global.Math);
    mockMath2.random = () => 1;
    global.Math = mockMath2;

    expect(planSet.startBuildPlan(dh,planner)).toEqual(new Move("C","Question",proposition4));
});

test("startBuildPlan does not build a plan succesfully and gives null back", () => {
    const dh = new DialogueHistory();
    const planner = new Planner();
    const plan1 = new Plan();
    const planSet = new PlanSet();
    const proposition1 = new Proposition("political and racial bias often cause prejudices", true);
    const proposition2 = new Proposition("there are mistakes during the judicial process", true);
    const proposition3 = new Proposition("innocent people may get killed", true);

    const move1 = new Move("C","Question",proposition1);

    plan1.add(proposition1);
    plan1.add(proposition2);
    plan1.add(proposition3);
    planSet.add(plan1);

    dh.add(move1);

    expect(planSet.startBuildPlan(dh,planner)).toEqual(null);
});

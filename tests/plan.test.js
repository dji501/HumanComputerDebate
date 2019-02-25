import { Plan } from "../scripts/plan";
import { Proposition } from "../scripts/proposition";
import { Move } from "../scripts/move";
import { Rule } from "../scripts/rule";
import { DialogueHistory } from "../scripts/dialogueHistory";
import { Planner } from "../scripts/planner";
import { CommitmentStore } from "../scripts/commitmentStore";
import { BooleanRuleBase } from "../scripts/BooleanRuleBase";

test("instantiate the Plan correctly", () => {
    let plan = new Plan();

    expect(plan.set).toEqual([]);
});

test("adding a value should work correctly", () => {
    let plan = new Plan();
    let proposition = new Proposition("CP is acceptable", true);
    let proposition2 = new Proposition("CP is acceptable", true);

    plan.add(proposition);

    expect(plan.set).toEqual([proposition]);

    plan.add(proposition2);

    expect(plan.set).toEqual([proposition, proposition2]);
});

test("containsProposition should identify when it contains an equal proposition", () => {
    let plan = new Plan();
    let proposition = new Proposition("CP is acceptable", true);
    let proposition2 = new Proposition("CP is acceptable", true);
    plan.add(proposition2);

    expect(plan.containsProposition(proposition)).toEqual(true);
});

test("containsProposition should identify when it doesn't contain the proposition", () => {
    let plan = new Plan();
    let proposition = new Proposition("CP is acceptable", true);

    expect(plan.containsProposition(proposition)).toEqual(false);
});

test("indexOfProposition should return the correct value for an equal proposition", () => {
    let plan = new Plan();
    let proposition = new Proposition("CP is not acceptable", true);
    let proposition2 = new Proposition("CP is acceptable", true);
    let proposition3 = new Proposition("CP is acceptable", false);

    plan.add(proposition);
    plan.add(proposition3);
    plan.add(proposition2);

    expect(plan.indexOfProposition(proposition2)).toEqual(2);
});

test("indexOfProposition should return -1 when proposition not in set", () => {
    let plan = new Plan();
    let proposition = new Proposition("CP is not acceptable", true);
    let proposition2 = new Proposition("CP is acceptable", true);
    let proposition3 = new Proposition("CP is acceptable", false);

    plan.add(proposition);
    plan.add(proposition3);

    expect(plan.indexOfProposition(proposition2)).toEqual(-1);
});

test("startImediatePlan shoul return a move using the first element in the set", () => {
    let plan = new Plan();
    let proposition = new Proposition("CP is not acceptable", true);

    plan.add(proposition);

    expect(plan.startImediatePlan()).toEqual(new Move("C", "Question", proposition));
});

test("start should reform plan then return move using first element in set", () => {
    let plan = new Plan();
    let proposition1 = new Proposition("political and racial bias often cause prejudices", true);
    let proposition2 = new Proposition("there are mistakes during the judicial process", true);
    let proposition3 = new Proposition("innocent people may get killed", true);
    let proposition4 = new Proposition("CP is acceptable", false);


    plan.add(proposition1);
    plan.add(proposition2);
    plan.add(proposition3);
    plan.add(proposition4);

    expect(plan.start()).toEqual(new Move("C", "Question", proposition1));
});

//TODO: needs dialogue history
test("execute should return correct move when user has conceeded point after a question and given desired value", () => {
    //History
    const dh = new DialogueHistory();
    const prop = new Proposition("CP is a good deterrent", true);
    const previousMove = new Move("S","Concession", prop);
    const secondToLastMove = new Move("S", "Assertion", prop);
    dh.add(secondToLastMove);
    dh.add(previousMove);

    //Plan
    let plan = new Plan();
    let proposition = new Proposition("CP is acceptable", true);
    plan.add(prop);
    plan.add(proposition);

    //Planner
    const planner = new Planner("C");
    planner.currentPlan = plan;

    expect(plan.execute(dh,planner,[],[],[])).toEqual(new Move("C","Question",proposition));
    expect(planner.currentPlan).toEqual(null);
});

test("execute should return correct move when user has withdrawn point after a question", () => {
    //History
    const dh = new DialogueHistory();
    const prop = new Proposition("CP is a good deterrent", true);
    const previousMove = new Move("S","Withdraw", prop);
    const secondToLastMove = new Move("S", "Question", prop);
    dh.add(secondToLastMove);
    dh.add(previousMove);

    //Plan
    let plan = new Plan();
    let proposition = new Proposition("CP is acceptable", true);
    plan.add(prop);
    plan.add(proposition);

    //Planner
    const planner = new Planner("C");
    planner.currentPlan = plan;

    expect(plan.execute(dh,planner,[],[],[])).toEqual(null);
    expect(planner.currentPlan).toEqual(null);
});

test("execute should return correct move when user has conceeded after a question but given unwanted value and there is a conflict", () => {
    //History
    const dh = new DialogueHistory();
    const prop = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is a good deterrent", false);
    const previousMove = new Move("S","Concession", prop2);
    const secondToLastMove = new Move("S", "Question", prop);
    dh.add(secondToLastMove);
    dh.add(previousMove);

    // Player commitment store setup
    const partnerCS = new CommitmentStore("Player");
    partnerCS.addAssertion(prop);
    partnerCS.addAssertion(prop2);
    //Plan
    const plan = new Plan();
    const proposition = new Proposition("CP is acceptable", true);
    plan.add(prop);
    plan.add(proposition);

    //ConflictSet
    const cs = partnerCS.getRealConflictSet();
    //Planner
    const planner = new Planner("C");
    planner.currentPlan = plan;

    expect(plan.execute(dh,planner,partnerCS,[],[])).toEqual(new Move("C","Resolve",cs.mergeIntoProposition(),cs));
    expect(planner.currentPlan).toEqual(plan);
});

test("execute should return correct move when user has conceeded after a question but given unwanted value and it is challengable", () => {
    //History
    const dh = new DialogueHistory();
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2); // eslint-disable-line no-unused-vars
    const previousMove = new Move("S","Concession", prop2);
    const secondToLastMove = new Move("S", "Question", prop1);
    dh.add(secondToLastMove);
    dh.add(previousMove);

    // Player commitment store setup
    const partnerCS = new CommitmentStore("Player");
    const selfCS = new CommitmentStore("Self");
    partnerCS.addAssertion(prop2);
    //Plan
    const plan = new Plan();
    const proposition = new Proposition("CP is acceptable", true);
    plan.add(prop1);
    plan.add(proposition);


    const brb = new BooleanRuleBase("Player");
    brb.addProposition(prop1);
    brb.addProposition(prop2);

    //Planner
    const planner = new Planner("C");
    planner.currentPlan = plan;

    expect(plan.execute(dh,planner,partnerCS,selfCS,brb)).toEqual(new Move("C","Challenge",prop2));
    expect(planner.currentPlan).toEqual(plan);
});

test("execute should return correct move when user has conceeded after a question but given unwanted value so we should stop", () => {
    //History
    const dh = new DialogueHistory();
    const prop = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const previousMove = new Move("S","Concession", prop);
    const secondToLastMove = new Move("S", "Question", prop2);
    dh.add(secondToLastMove);
    dh.add(previousMove);

    //Plan
    let plan = new Plan();
    let proposition = new Proposition("CP is acceptable", true);
    plan.add(prop);
    plan.add(proposition);

    // Player commitment store setup
    const partnerCS = new CommitmentStore("Player");
    const selfCS = new CommitmentStore("Self");
    const brb = new BooleanRuleBase("Player");

    //Planner
    const planner = new Planner("C");
    planner.currentPlan = plan;

    expect(plan.execute(dh,planner, partnerCS,selfCS,brb)).toEqual(null);
    expect(planner.currentPlan).toEqual(null);
});

test("execute should return correct move when user has withdrawn point after a resolution", () => {
    //History
    const dh = new DialogueHistory();
    const prop = new Proposition("CP is acceptable", false);
    const prop2 = new Proposition("CP is acceptable", true);
    const previousMove = new Move("S","Withdraw", prop);
    const secondToLastMove = new Move("S", "Resolve", prop2);
    dh.add(secondToLastMove);
    dh.add(previousMove);

    //Plan
    let plan = new Plan();
    const proposition = new Proposition("CP is acceptable", true);
    plan.add(proposition);

    // Player commitment store setup
    const partnerCS = new CommitmentStore("Player");
    const selfCS = new CommitmentStore("Self");
    const brb = new BooleanRuleBase("Player");

    //Planner
    const planner = new Planner("C");
    planner.currentPlan = plan;

    expect(plan.execute(dh,planner, partnerCS,selfCS,brb)).toEqual( new Move("C", "Question", proposition));
});

test("execute should return correct rule move when user has withdrawn point after a resolution", () => {
    //History
    const dh = new DialogueHistory();

    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    const prop3 = new Proposition("CP is acceptable", true);
    const prop4 = new Proposition("CP is acceptable", true);
    const rule2 = new Rule(prop3, prop4);

    rule2.negate();

    const previousMove = new Move("S","Withdraw", rule);
    const secondToLastMove = new Move("S", "Resolve", rule2);

    dh.add(secondToLastMove);
    dh.add(previousMove);

    let plan = new Plan();
    plan.add(rule2);
    //ruleprop = rule2 previousRuleProp=rule1

    //Planner
    const planner = new Planner("C");
    planner.currentPlan = plan;

    expect(plan.execute(dh,planner, [],[],[])).toEqual(new Move("C", "Question", rule2));
});

test("execute should return correct move when user has withdrawn point after a challenge", () => {
    //History
    const dh = new DialogueHistory();
    const prop = new Proposition("CP is a good deterrent", true);
    const previousMove = new Move("S","Withdraw", prop);
    const secondToLastMove = new Move("S", "Challenge", prop);
    dh.add(secondToLastMove);
    dh.add(previousMove);

    //Plan
    let plan = new Plan();
    let proposition = new Proposition("CP is acceptable", true);
    plan.add(prop);
    plan.add(proposition);

    //Planner
    const planner = new Planner("C");
    planner.currentPlan = plan;

    expect(plan.execute(dh,planner,[],[],[])).toEqual(new Move("C", "Question", prop));
});

test("execute should return correct move when user has grounded a point after a challenge", () => {
    //History
    const dh = new DialogueHistory();
    const prop = new Proposition("CP is a good deterrent", true);
    const previousMove = new Move("S","Ground", prop);
    const secondToLastMove = new Move("S", "Challenge", prop);
    dh.add(secondToLastMove);
    dh.add(previousMove);

    //Plan
    let plan = new Plan();
    let proposition = new Proposition("CP is acceptable", true);
    plan.add(prop);
    plan.add(proposition);

    //Planner
    const planner = new Planner("C");
    planner.currentPlan = plan;

    expect(plan.execute(dh,planner,[],[],[])).toEqual(null);
    expect(planner.currentPlan).toEqual(null);
});

test("reform shoudl reform a plan successfully", () => {
    let plan = new Plan();
    let proposition1 = new Proposition("political and racial bias often cause prejudices", true);
    let proposition2 = new Proposition("there are mistakes during the judicial process", true);
    let proposition3 = new Proposition("innocent people may get killed", true);
    let proposition4 = new Proposition("CP is acceptable", false);
    let rule1 = new Rule(proposition1, proposition2);
    let rule2 = new Rule(proposition2, proposition3);
    let rule3 = new Rule(proposition3, proposition4);

    plan.add(proposition1);
    plan.add(proposition2);
    plan.add(proposition3);
    plan.add(proposition4);
    plan.reform();

    expect(plan.set).toEqual([proposition1, rule1, rule2, rule3, proposition4]);
});

test("clone should clone plan correctly", () => {
    let plan = new Plan();
    let proposition1 = new Proposition("political and racial bias often cause prejudices", true);
    let proposition2 = new Proposition("there are mistakes during the judicial process", true);
    let proposition3 = new Proposition("innocent people may get killed", true);
    let proposition4 = new Proposition("CP is acceptable", false);

    plan.add(proposition1);
    plan.add(proposition2);
    plan.add(proposition3);
    plan.add(proposition4);

    expect(plan.clone().set).toEqual([proposition1, proposition2, proposition3, proposition4]);
});

import { TacticManager } from "../scripts/tacticManager";
import { Plan } from "../scripts/plan";
import { Proposition } from "../scripts/proposition";
import { Move } from "../scripts/move";
import { Rule } from "../scripts/rule";
import { DialogueHistory } from "../scripts/dialogueHistory";
import { Planner } from "../scripts/planner";
import { CommitmentStore } from "../scripts/commitmentStore";
import { BooleanRuleBase } from "../scripts/BooleanRuleBase";
import { PlanSet } from "../scripts/planSet";
import { ConflictSet } from "../scripts/conflictSet";

test("getAction should return null when focus denies computer thesis ", () => {
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

    expect(TacticManager.getAction(prop2, dh, selfCS, partnerCS, brb, planner)).toEqual(null);
});


test("getAction should return resolve when conflict in partner CS ", () => {
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

    selfCS.addAssertion(prop2);
    partnerCS.addAssertion(prop2);
    partnerCS.addAssertion(prop1);

    const planner = new Planner();
    planner.computerThesis = prop2;

    const cs = new ConflictSet();
    cs.add(prop2);
    cs.add(prop1);

    expect(TacticManager.getAction(prop2, dh, selfCS, partnerCS, brb, planner)).toEqual(new Move("C","Resolve", cs.mergeIntoProposition(),cs));
});

//TODO: finish these tests
test("getAction should return hard evidence when evidence is conflicted ", () => {
    const brb = new BooleanRuleBase("Player");
    const dh = new DialogueHistory();
    const partnerCS = new CommitmentStore("partner");
    const plan2 = new Plan();
    const planSet = new PlanSet();
    const proposition2 = new Proposition("there are mistakes during the judicial process", true);
    const proposition3 = new Proposition("records show an increase of murders in CP countries", true, "evidence");
    const selfCS = new CommitmentStore();
    const expectedMove = new Move("C","Assertion", proposition3);
    const rule = new Rule(proposition3, proposition2);

    plan2.add(proposition3);
    plan2.add(proposition2);
    planSet.add(plan2);

    const planner = new Planner();
    planner.computerThesis = proposition3;

    brb.addRule(rule);
    brb.addProposition(proposition3);
    brb.addProposition(proposition2);
});

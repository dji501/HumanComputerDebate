import { QuestionStrategist } from "../scripts/questionStrategist";
import { Plan } from "../scripts/plan";
import { Proposition } from "../scripts/proposition";
import { Move } from "../scripts/move";
import { Rule } from "../scripts/rule";
import { DialogueHistory } from "../scripts/dialogueHistory";
import { Planner } from "../scripts/planner";
import { CommitmentStore } from "../scripts/commitmentStore";
import { BooleanRuleBase } from "../scripts/BooleanRuleBase";

//TODO: improve coverage
test("plan question start of game question should return correct move", () => {
    const selfCS = new CommitmentStore("self");
    const partnerCS = new CommitmentStore("partner");

    const brb = new BooleanRuleBase("selfKBS");

    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is acceptable", false);

    const move1 = new Move("C", "Question", prop1);
    const move2 = new Move("S", "Concession", prop2);

    const dh = new DialogueHistory();
    dh.add(move1);

    const planner = new Planner();
    planner.computerThesis = prop1;

    expect(QuestionStrategist.planQuestion(dh, selfCS, partnerCS, brb, planner)).toEqual([new Move("C","Concession",prop1)]);
    expect(planner.computerThesis).toEqual(prop1);
});

test("plan question should return correct move when proposition has changed and P & -P not in KBS", () => {
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
    planner.computerThesis = prop1;

    expect(QuestionStrategist.planQuestion(dh, selfCS, partnerCS, brb, planner)).toEqual([new Move("C","Withdraw",prop2)]);
});

test("plan question should return correct move when proposition has changed and P in KBS", () => {
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
    planner.computerThesis = prop1;

    brb.addProposition(prop2);

    expect(QuestionStrategist.planQuestion(dh, selfCS, partnerCS, brb, planner)).toEqual([new Move("C","Concession",prop2)]);
});

test("plan question should return correct move when proposition has changed and -P in KBS", () => {
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
    planner.computerThesis = prop1;

    brb.addProposition(prop1);

    expect(QuestionStrategist.planQuestion(dh, selfCS, partnerCS, brb, planner)).toEqual([new Move("C","Concession",prop1)]);
});

test("plan question should return correct move when proposition has changed and P & -P in KBS", () => {
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
    planner.computerThesis = prop1;

    brb.addProposition(prop1);
    brb.addProposition(prop2);

    expect(QuestionStrategist.planQuestion(dh, selfCS, partnerCS, brb, planner)).toEqual([new Move("C","Withdraw",prop2)]);
});

test("plan question should return correct move when proposition has changed and P & -P in KBS", () => {
    const selfCS = new CommitmentStore("self");
    const partnerCS = new CommitmentStore("partner");

    const brb = new BooleanRuleBase("selfKBS");

    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is acceptable", false);

    const rule = new Rule(prop1, prop2);

    const move1 = new Move("C", "Question", prop1);
    const move2 = new Move("S", "Concession", prop2);
    const move3 = new Move("C", "Assertion", rule);

    const dh = new DialogueHistory();
    dh.add(move1);
    dh.add(move2);
    dh.add(move3);

    const planner = new Planner();
    planner.computerThesis = prop1;

    brb.addProposition(prop1);
    brb.addProposition(prop2);

    expect(QuestionStrategist.planQuestion(dh, selfCS, partnerCS, brb, planner)).toEqual([new Move("C","Withdraw",rule)]);

    brb.addRule(rule);

    expect(QuestionStrategist.planQuestion(dh, selfCS, partnerCS, brb, planner)).toEqual([new Move("C","Concession",rule)]);
});

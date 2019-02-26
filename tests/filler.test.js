import { Filler } from "../scripts/filler";
import { Plan } from "../scripts/plan";
import { Proposition } from "../scripts/proposition";
import { Move } from "../scripts/move";
import { Rule } from "../scripts/rule";
import { DialogueHistory } from "../scripts/dialogueHistory";
import { Planner } from "../scripts/planner";
import { CommitmentStore } from "../scripts/commitmentStore";
import { BooleanRuleBase } from "../scripts/BooleanRuleBase";

test("Filler getMessage should return correct message when illegal challenge", () => {
    const prop1 = new Proposition("CP is acceptable", true);
    const move1 = new Move("S","Challenge",prop1);

    const compCS = new CommitmentStore("C");
    const studCS = new CommitmentStore("S");

    const dh = new DialogueHistory();
    dh.add(move1);
    dh.add(move1);

    expect(Filler.getMessage(move1,dh,compCS,studCS)).toEqual("The statement '" + prop1.getContentAsString() + "' is stated by you and agreed by the computer, you can only challenge the statements that the computer has explicitly asserted (without a '*'), please try again!");
});

test("Filler getMessage should return correct message when begging question ", () => {
    const prop1 = new Proposition("CP is acceptable", true);
    const move1 = new Move("S","Ground",prop1);

    const compCS = new CommitmentStore("C");
    const studCS = new CommitmentStore("S");

    const dh = new DialogueHistory();
    dh.add(move1);
    dh.add(move1);

    studCS.addAssertion(prop1);

    expect(Filler.getMessage(move1,dh,compCS,studCS)).toEqual("You are begging the question '" + prop1.getContentAsString() + "' which is under dispute, please try again!");

    studCS.withdraw(prop1);

    expect(Filler.getMessage(move1,dh,compCS,studCS)).toEqual("You are begging the question '" + prop1.getContentAsString() + "' which you have failed to prove, please try again!");

});

test("Filler getMessage should return correct message when repeat statement", () => {
    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is a good deterrent", false);

    const rule1 = new Rule(prop1, prop2);

    const move1 = new Move("S","Assertion",prop1);
    const move2 = new Move("S","Assertion",prop2);
    const move3 = new Move("S","Assertion",rule1);

    const compCS = new CommitmentStore("C");
    const studCS = new CommitmentStore("S");

    const dh = new DialogueHistory();
    dh.add(move1);
    dh.add(move2); // studentthesis = prop2 / compthesis  = prop2.denial()

    studCS.addAssertion(prop2);
    compCS.addAssertion(prop2);
    studCS.addAssertion(rule1);
    compCS.addAssertion(rule1);

    let message = "The statement '" + prop2.getContentAsString() + "', already exists in both positions so it is not necessary to say it, please try other options.";
    let message2 = "The statement '" + rule1.getContentAsString() + "', already exists in both positions so it is not necessary to say it, please try other options.";
    expect(Filler.getMessage(move2,dh,compCS,studCS)).toEqual(message);
    expect(Filler.getMessage(move3,dh,compCS,studCS)).toEqual(message2);

});

test("Filler getMessage should return correct message when not well formed exception", () => {
    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is acceptable", false);

    const rule1 = new Rule(prop1, prop2);
    const rule2 = new Rule(prop1,prop1);

    const move1 = new Move("S","Assertion",prop1);
    const move2 = new Move("S","Assertion",prop2);
    const move3 = new Move("S","Assertion",rule1);
    const move4 = new Move("S","Assertion",rule2);

    const compCS = new CommitmentStore("C");
    const studCS = new CommitmentStore("S");

    const dh = new DialogueHistory();
    dh.add(move1);
    dh.add(move2); // studentthesis = prop2 / compthesis  = prop2.denial()

    let message = "This is not a valid conditional, a proposition cannot imply the opposite of itself, please try again!";
    let message2 = "This is not a sound conditional, the head and the tail should be different (e.g. R implies P), please try again!.";
    expect(Filler.getMessage(move3,dh,compCS,studCS)).toEqual(message);
    expect(Filler.getMessage(move4,dh,compCS,studCS)).toEqual(message2);
});

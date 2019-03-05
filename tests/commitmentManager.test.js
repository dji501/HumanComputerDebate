import { CommitmentManager } from "../scripts/commitmentManager";
import { Plan } from "../scripts/plan";
import { Proposition } from "../scripts/proposition";
import { Move } from "../scripts/move";
import { Rule } from "../scripts/rule";
import { DialogueHistory } from "../scripts/dialogueHistory";
import { Planner } from "../scripts/planner";
import { CommitmentStore } from "../scripts/commitmentStore";
import { BooleanRuleBase } from "../scripts/BooleanRuleBase";

test("commit method should behave as expected when current move is assertion", () => {
    const prop1 = new Proposition("CP is acceptable", true);
    const move1 = new Move("C","Assertion",prop1);
    const selfCS = new CommitmentStore("C");
    const partnerCS = new CommitmentStore("S");

    CommitmentManager.commit(move1,move1,selfCS,partnerCS,[],[]);

    expect(selfCS._assertionList).toEqual([prop1]);
    expect(partnerCS._concessionList).toEqual([prop1]);
});

test("commit method should behave as expected when current move is ground and previous move was a rule", () => {
    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is a good deterrent", true);
    const rule1 = new Rule(prop2, prop1);

    const move1 = new Move("C","Ground",prop1);
    const move2 = new Move("C","Assertion",rule1);


    const selfCS = new CommitmentStore("C");
    const partnerCS = new CommitmentStore("S");

    selfCS.addRule(rule1);
    CommitmentManager.commit(move1,move2,selfCS,partnerCS,[],[]);

    expect(selfCS._ruleList).toEqual([rule1]);
    expect(selfCS._assertionList).toEqual([prop1]);
    expect(partnerCS._concessionList).toEqual([prop1]);
});

test("commit method should behave as expected when current move is ground and previous move was a prop", () => {
    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is a good deterrent", true);
    const prop3 = new Proposition("CP prevents crime", true);

    const move1 = new Move("C","Ground",prop3);
    const move2 = new Move("C","Assertion",prop2);


    const selfCS = new CommitmentStore("C");
    const partnerCS = new CommitmentStore("S");

    CommitmentManager.commit(move1,move2,selfCS,partnerCS,[],[]);

    expect(selfCS._assertionList[0].equals(new Rule(prop3,prop2))).toEqual(true);
    expect(selfCS._assertionList[1].equals(prop3)).toEqual(true);
    expect(partnerCS._concessionList[0].equals(new Rule(prop3,prop2))).toEqual(true);
    expect(partnerCS._concessionList[1].equals(prop3)).toEqual(true);
});

test("commit method should behave as expected when current move is withdraw", () => {
    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is a good deterrent", true);
    const prop3 = new Proposition("CP prevents crime", true);

    const move1 = new Move("C","Withdraw",prop3);
    const move2 = new Move("C","Assertion",prop2);


    const selfCS = new CommitmentStore("C");
    const partnerCS = new CommitmentStore("S");

    selfCS.addAssertion(prop3);

    CommitmentManager.commit(move1,move2,selfCS,partnerCS,[],[]);

    expect(selfCS._assertionList).toEqual([]);
});

test("commit method should behave as expected when current move is concession", () => {
    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("CP is a good deterrent", true);
    const prop3 = new Proposition("CP prevents crime", true);

    const move1 = new Move("C","Concession",prop3);
    const move2 = new Move("C","Assertion",prop2);


    const selfCS = new CommitmentStore("C");
    const partnerCS = new CommitmentStore("S");

    selfCS.addAssertion(prop3);

    CommitmentManager.commit(move1,move2,selfCS,partnerCS,[],[]);

    expect(selfCS._assertionList).toEqual([prop3]);
    expect(partnerCS._concessionList).toEqual([prop3]);
});

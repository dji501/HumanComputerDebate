import { ChallengeStrategist } from "../scripts/challengeStrategist";
import { Proposition } from "../scripts/proposition";
import { Move } from "../scripts/move";
import { Rule } from "../scripts/rule";
import { CommitmentStore } from "../scripts/commitmentStore";
import { BooleanRuleBase } from "../scripts/BooleanRuleBase";
import { ConflictSet } from "../scripts/conflictSet";

//TODO: Create tests case
test("planChallProp returns correct move when conflict set is greater than 0", () => {
    const partnerCS = new CommitmentStore("partner");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    partnerCS.addAssertion(prop1);
    partnerCS.addAssertion(rule);

    const brb = new BooleanRuleBase("Player");
    const prop1Clone = prop1.clone();
    brb.addRule(rule);
    brb.addProposition(prop1);
    brb.addProposition(prop2);

    const expectedProp = new Proposition("'CP is a good deterrent' and ''CP is a good deterrent' implies 'CP is acceptable''", true);
    const conflictSet = new ConflictSet();
    conflictSet.add(prop1);
    conflictSet.add(rule);
    //expect(brb.findAcceptableGroundPropositions(prop2, cs)).toEqual([prop1Clone]);
    //expect(cs.getRealPremises(prop2).set).toEqual([prop1,rule]);
    expect(ChallengeStrategist.planChallProp(prop2, "C", partnerCS,brb)).toEqual([new Move("C","Resolve",expectedProp, conflictSet)]);
});

test("planChallProp returns correct move when acceptableGrounds set is greater than 0", () => {
    const partnerCS = new CommitmentStore("partner");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    const brb = new BooleanRuleBase("Player");
    const prop1Clone = prop1.clone();
    brb.addRule(rule);
    brb.addProposition(prop1);
    brb.addProposition(prop2);

    //expect(brb.findAcceptableGroundPropositions(prop2, cs)).toEqual([prop1Clone]);
    //expect(cs.getRealPremises(prop2).set).toEqual([prop1,rule]);
    expect(ChallengeStrategist.planChallProp(prop2, "C", partnerCS,brb)).toEqual([new Move("C","Resolve", prop1Clone)]);
});

test("planChallProp returns correct move when ConflictSet and acceptableGrounds set are 0", () => {
    const partnerCS = new CommitmentStore("partner");
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);

    const brb = new BooleanRuleBase("Player");
    const prop1Clone = prop1.clone();
    brb.addRule(rule);

    //expect(brb.findAcceptableGroundPropositions(prop2, cs)).toEqual([prop1Clone]);
    //expect(cs.getRealPremises(prop2).set).toEqual([prop1,rule]);
    expect(ChallengeStrategist.planChallProp(prop2, "C", partnerCS,brb)).toEqual([new Move("C","Withdraw", prop2)]);
});

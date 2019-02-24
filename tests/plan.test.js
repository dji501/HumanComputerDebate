import { Plan } from "../scripts/plan";
import { Proposition } from "../scripts/proposition";
import { Move } from "../scripts/move";
import { Rule } from "../scripts/rule";

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

});

//TODO: needs dialogue history
test("execute should return correct move when user has conceeded point after a question and given desired value", () => {

});

test("execute should return correct move when user has withdrawn point after a question", () => {

});

test("execute should return correct move when user has conceeded after a question but given unwanted value and there is a oconflict", () => {

});

test("execute should return correct move when user has conceeded after a question but given unwanted value and it is challengable", () => {

});

test("execute should return correct move when user has conceeded after a question but given unwanted value so we should stop", () => {

});

test("execute should return correct move when user has withdrawn point after a resolution", () => {

});

test("execute should return correct move when user has withdrawn point after a challenge", () => {

});

test("execute should return correct move when user has grounded a point after a challenge", () => {

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

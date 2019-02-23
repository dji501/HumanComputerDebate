import { Move } from "../scripts/move";
import { Proposition } from "../scripts/proposition";
import { Rule } from "../scripts/rule";

//TODO: Add conflictSet
test("Instantiating gives correct values", () => {
    const prop = new Proposition("CP is acceptable", true);
    const move = new Move("Turn", "Type", prop, "Conflict");

    expect(move.turn).toBe("Turn");
    expect(move.moveType).toBe("Type");
    expect(move.moveContent).toBe(prop);
    expect(move.conflictSet).toBe("Conflict");
});

test("Instantiating without Conflict gives correct values", () => {
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);
    const move = new Move("Turn", "Type", rule);

    expect(move.turn).toBe("Turn");
    expect(move.moveType).toBe("Type");
    expect(move.moveContent).toBe(rule);
    expect(move.conflictSet).toBe(undefined);
});

test("Check get moveContentProposition behaves as it should", () => {
    const prop1 = new Proposition("CP is a good deterrent", true);
    const move = new Move("Turn", "Type", prop1);

    expect(move.moveContentProposition).toBe(prop1);
});

test("Check get moveContentRule behaves as it should", () => {
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);
    const move = new Move("Turn", "Type", rule);

    expect(move.moveContentRule).toBe(rule);
});

test("Check get moveContentName returns right value", () => {
    const prop1 = new Proposition("CP is a good deterrent", true);
    const move1 = new Move("Turn", "Type", prop1);

    expect(move1.getMoveContentName()).toBe("Proposition");

    const prop2 = new Proposition("CP is acceptable", true);
    const rule = new Rule(prop1, prop2);
    const move2 = new Move("Turn", "Type", rule);

    expect(move2.getMoveContentName()).toBe("Rule");
});

//TODO: Add conflictSet
test("Move clone method clones correctly", () => {
    const prop1 = new Proposition("CP is a good deterrent", true);
    const move1 = new Move("Turn", "Type", prop1);
    const move2 = move1.clone();

    expect(move1).toEqual(move2);
});

test("Equals method correctly identifies equal moves", () => {
    const prop1 = new Proposition("CP is a good deterrent", true);
    const move1 = new Move("Turn", "Type", prop1);

    expect(move1.equals(move1)).toBe(true);

    const prop2 = new Proposition("CP is a good deterrent", true);
    const move2 = new Move("Turn", "Type", prop2);

    expect(move1.equals(move2)).toBe(true);

    const prop3 = new Proposition("CP is a good deterrent", true);
    const prop4 = new Proposition("CP is acceptable", true);
    const rule1 = new Rule(prop3, prop4);
    const move3 = new Move("Turn", "Type", rule1);

    expect(move3.equals(move3)).toBe(true);

    const prop5 = new Proposition("CP is a good deterrent", true);
    const prop6 = new Proposition("CP is acceptable", true);
    const rule2 = new Rule(prop5, prop6);
    const move4 = new Move("Turn", "Type", rule2);

    expect(move3.equals(move4)).toBe(true);
});

test("Equals method correctly identifies unequal moves", () => {
    const prop1 = new Proposition("CP is a good deterrent", true);
    const move1 = new Move("Turn", "Type", prop1);

    const prop2 = new Proposition("CP is not a good deterrent", true);
    const move2 = new Move("Turn", "Type", prop2);

    expect(move1.equals(move2)).toBe(false);
});

test("Negate method works correctly", () => {
    const prop1 = new Proposition("CP is a good deterrent", true);
    const move1 = new Move("Turn", "Type", prop1);
    move1.negate();

    expect(move1.moveContent.truth).toBe(false);
});

test("getMoveAsString method returns correct string when question type", () => {
    const prop1 = new Proposition("CP is a good deterrent", true);
    const move1 = new Move("S", "Concession", prop1);

    let moveString1 = move1.getMoveAsString("Question", "CP is a good deterrent");
    expect(moveString1).toBe("Yes, I think that CP is a good deterrent.");

    const prop2 = new Proposition("CP is not a good deterrent", true);
    const move2 = new Move("S", "Concession", prop2);

    let moveString2 = move2.getMoveAsString("Question", "CP is a good deterrent");
    expect(moveString2).toBe("No, I think that CP is not a good deterrent.");
});

test("getMoveAsString method returns correct string when assertion type", () => {
    const prop1 = new Proposition("CP is a good deterrent", true);
    const move1 = new Move("S", "Assertion", prop1);

    let moveString1 = move1.getMoveAsString("Concession", "CP is a not acceptable");
    expect(moveString1).toBe("I think that CP is a good deterrent.");

    const prop2 = new Proposition("CP is not a good deterrent", true, "evidence");
    const move2 = new Move("S", "Assertion", prop2);

    let moveString2 = move2.getMoveAsString("Question", "CP is a good deterrent");
    expect(moveString2).toBe("But CP is not a good deterrent.");
});

test("getMoveAsString method returns correct string when ground type", () => {
    const prop1 = new Proposition("CP is a good deterrent", true);
    const move1 = new Move("S", "Ground", prop1);

    let moveString1 = move1.getMoveAsString("Challenge", "CP is a not acceptable");
    expect(moveString1).toBe("Because CP is a good deterrent.");
});

test("getMoveAsString method returns correct string when challenge type", () => {
    const prop1 = new Proposition("CP is a good deterrent", true);
    const move1 = new Move("S", "Challenge", prop1);

    let moveString1 = move1.getMoveAsString("Assertion", "CP is a good deterrent");
    expect(moveString1).toBe("Why is it the case that CP is a good deterrent?");
});

test("getMoveAsString method returns correct string when question type", () => {
    const prop1 = new Proposition("CP is a good deterrent", true);
    const move1 = new Move("S", "Question", prop1);

    let moveString1 = move1.getMoveAsString("Assertion", "CP is not acceptable");
    expect(moveString1).toBe("Is it the case that CP is a good deterrent?");
});

test("getMoveAsString method returns correct string when resolve type", () => {
    //TODO: THIS NEEDS COFLICT SETS IMPLEMENTED
});

test("getMoveAsString method returns correct string when withdraw type", () => {
    const prop1 = new Proposition("CP is a good deterrent", true);
    const move1 = new Move("S", "Withdraw", prop1);

    let moveString1 = move1.getMoveAsString("Question", "CP is a good deterrent");
    expect(moveString1).toBe("I am not sure about it.");

    moveString1 = move1.getMoveAsString("Challenge", "CP is a good deterrent");
    expect(moveString1).toBe("I don't know why CP is a good deterrent.");

    moveString1 = move1.getMoveAsString("Assertion", "CP is a good deterrent");
    expect(moveString1).toBe("I don't think CP is a good deterrent.");
});

test("getMoveAsString method returns correct string when no move type", () => {
    const prop1 = new Proposition("CP is acceptable", true);
    const move1 = new Move("C", "Initial", prop1);

    let moveString1 = move1.getMoveAsString(null, null);
    expect(moveString1).toBe("CP is acceptable");
});

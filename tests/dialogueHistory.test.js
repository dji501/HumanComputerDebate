import { DialogueHistory } from "../scripts/dialogueHistory";
import { Move } from "../scripts/move";
import { Proposition } from "../scripts/proposition";

test("initialisation works as expected", ()=> {
    const dialogueHistory = new DialogueHistory();

    expect(dialogueHistory.set).toEqual([]);
});

test("add method works correctly", () => {
    const dialogueHistory = new DialogueHistory();
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("political and racial bias often cause prejudices", true);
    const move = new Move("C", "Assertion", prop1);
    const move2 = new Move("C", "Assertion", prop2);

    expect(dialogueHistory.set).toEqual([]);

    dialogueHistory.add(move);

    expect(dialogueHistory.set).toEqual([move]);

    dialogueHistory.add(move2);

    expect(dialogueHistory.set).toEqual([move, move2]);

    dialogueHistory.add(move2);

    expect(dialogueHistory.set).toEqual([move, move2]);
});

test("length returns expected values", ()=> {
    const dialogueHistory = new DialogueHistory();
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("political and racial bias often cause prejudices", true);
    const move = new Move("C", "Assertion", prop1);
    const move2 = new Move("C", "Assertion", prop2);

    dialogueHistory.add(move);

    expect(dialogueHistory.length).toEqual(1);

    dialogueHistory.add(move2);

    expect(dialogueHistory.length).toEqual(2);
});

test("contains returns true when history contains move", ()=> {
    const dialogueHistory = new DialogueHistory();
    const prop1 = new Proposition("CP is a good deterrent", true);
    const prop2 = new Proposition("political and racial bias often cause prejudices", true);
    const move = new Move("C", "Assertion", prop1);
    const move2 = new Move("C", "Assertion", prop2);

    dialogueHistory.add(move);

    expect(dialogueHistory.contains(move)).toEqual(true);

    dialogueHistory.add(move2);

    expect(dialogueHistory.contains(move)).toEqual(true);
    expect(dialogueHistory.contains(move2)).toEqual(true);
});

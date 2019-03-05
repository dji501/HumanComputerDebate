import { ConflictSet } from "../scripts/conflictSet";
import { Proposition } from "../scripts/proposition";
import { Rule } from "../scripts/rule";

test("Initialisation works correctly", () => {
    const cs = new ConflictSet();
    expect(cs._set).toEqual([]);
});

test("add method works correctly", () => {
    const cs = new ConflictSet();
    const prop1 = new Proposition("CP is acceptable", true);
    const prop2 = new Proposition("Human life is scarce", true);

    cs.add(prop1);
    expect(cs._set.length).toBe(1);

    cs.add(prop1);
    expect(cs._set.length).toBe(1);

    cs.add(prop2);
    expect(cs._set.length).toBe(2);
});

test("includes method works correctly", () => {
    const cs = new ConflictSet();
    const prop1 = new Proposition("CP is not acceptable", true);
    const prop2 = new Proposition("Human life is scarce", true);
    const prop3 = new Proposition("CP is acceptable", true);
    const rule1 = new Rule(prop2, prop1);
    const rule2 = new Rule(prop2, prop1);
    cs.add(prop1);
    cs.add(prop2);
    cs.add(rule1);

    expect(cs.includes(prop1)).toBe(true);
    expect(cs.includes(prop2)).toBe(true);
    expect(cs.includes(rule1)).toBe(true);
    expect(cs.includes(prop3)).toBe(false);
    expect(cs.includes(rule2)).toBe(true);
});

test("mergeIntoProposition method works correctly", () => {
    const cs = new ConflictSet();
    const prop1 = new Proposition("CP is not acceptable", true);
    const prop2 = new Proposition("Human life is scarce", true);
    const rule1 = new Rule(prop2, prop1);

    cs.add(prop1);
    cs.add(prop2);
    cs.add(rule1);

    expect(cs.mergeIntoProposition().message).toBe("'CP is not acceptable' and 'Human life is scarce' and ''Human life is scarce' implies 'CP is not acceptable''");
});

test("isPNP method identifies PNP correctly", () => {
    const cs = new ConflictSet();
    const prop1 = new Proposition("Human life is not scarce", true);
    const prop2 = new Proposition("Human life is not scarce", false);

    cs.add(prop1);
    cs.add(prop2);

    expect(cs.isPNP()).toBe(true);
});

test("isPNP method identifies not PNP correctly", () => {
    const cs = new ConflictSet();
    const prop1 = new Proposition("Human life is not scarce", true);
    const prop2 = new Proposition("Human life is not scarce", true);

    cs.add(prop1);
    cs.add(prop2);

    expect(cs.isPNP()).toBe(false);
});

test("isPRNP method identifies PRNP correctly", () => {
    const cs = new ConflictSet();
    const prop1 = new Proposition("Human life is scarce", true);
    const prop2 = new Proposition("CP is not acceptable", true);
    const prop3 = new Proposition("CP is not acceptable", false);
    const rule1 = new Rule(prop1,prop2);

    cs.add(prop3);
    cs.add(prop1);
    cs.add(rule1);

    expect(cs.isPRNP()).toBe(true);
});

test("isPRNP method identifies not PRNP correctly", () => {
    const cs = new ConflictSet();
    const prop1 = new Proposition("Human life is scarce", true);
    const prop2 = new Proposition("CP is not acceptable", true);
    const prop3 = new Proposition("CP is not acceptable", true);
    const rule1 = new Rule(prop1,prop2);

    cs.add(prop3);
    cs.add(prop1);
    cs.add(rule1);

    expect(cs.isPRNP()).toBe(false);
});

test("getConsequent method returns the consequent of the set when not size 2", () => {
    const cs = new ConflictSet();
    const prop1 = new Proposition("Human life is scarce", true);
    const prop2 = new Proposition("CP is not acceptable", true);
    const prop3 = new Proposition("CP is not acceptable", false);
    const rule1 = new Rule(prop1,prop2);

    cs.add(prop3);
    cs.add(prop1);
    cs.add(rule1);

    expect(cs.getConsequent().equals(prop3)).toBe(true);
});

test("getConsequent method returns the consequent of the set when size 2", () => {
    const cs = new ConflictSet();
    const prop1 = new Proposition("Human life is scarce", true);
    const prop2 = new Proposition("CP is not acceptable", true);
    const rule1 = new Rule(prop1,prop2);

    cs.add(prop2);
    cs.add(rule1);

    expect(cs.getConsequent().equals(prop2)).toBe(true);
});

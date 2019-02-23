import { Proposition } from "../scripts/proposition";
//TODO: Add booleanRuleBase
test("Instantiating gives correct values", () => {
    const proposition = new Proposition("Name", true, "Qualification");

    expect(proposition.name).toBe("Name");
    expect(proposition.truth).toBe(true);
    expect(proposition.qualification).toBe("Qualification");
    expect(proposition.ruleReferences).toEqual([]);
});

test("Instantiating without Qualification and BooleanRuleBase gives correct values", () => {
    const proposition = new Proposition("Name", true);

    expect(proposition.name).toBe("Name");
    expect(proposition.truth).toBe(true);
    expect(proposition.qualification).toBe(null);
    expect(proposition.ruleReferences).toEqual([]);
});

test("Setting position works for valid values", () => {
    const proposition = new Proposition("Name", true);
    proposition.position = "ANTECEDENT";
    expect(proposition.position).toBe("ANTECEDENT");
    proposition.position = "CONSEQUENT";
    expect(proposition.position).toBe("CONSEQUENT");
    proposition.position = "WARRENT";
    expect(proposition.position).toBe("WARRENT");
});

test("Setting position throws error for invalid values", () => {
    const proposition = new Proposition("Name", true);
    expect(() => {proposition.position = "NOTVALID";}).toThrow(SyntaxError);
});

test("Adding rule reference works successfully", () => {
    const proposition = new Proposition("Name", true);
    expect(proposition.ruleReferences).toEqual([]);

    proposition.addRuleRef("X");
    expect(proposition.ruleReferences).toEqual(["X"]);

    proposition.addRuleRef("Y");
    expect(proposition.ruleReferences).toEqual(["X", "Y"]);
});

test("IsEvidence method identifies evidence", () => {
    const proposition1 = new Proposition("Name", true, "evidence");
    expect(proposition1.isEvidence()).toBe(true);

    const proposition2 = new Proposition("Name", true, "fact");
    expect(proposition2.isEvidence()).toBe(false);
});


test("IsFact method identifies fact", () => {
    const proposition1 = new Proposition("Name", true, "fact");
    expect(proposition1.isFact()).toBe(true);

    const proposition2 = new Proposition("Name", true, "evidence");
    expect(proposition2.isFact()).toBe(false);
});

test("Equal method identifies equivalent proposition", () => {
    const proposition1 = new Proposition("Name", true, "fact");
    expect(proposition1.equals(proposition1)).toBe(true);

    const proposition2 = new Proposition("Name", true, "fact");
    expect(proposition1.equals(proposition2)).toBe(true);
});

test("Equal method identifies unequivalent proposition", () => {
    const proposition1 = new Proposition("Name", true, "fact");
    const proposition2 = new Proposition("DifferentName", false, "fact");
    expect(proposition1.equals(proposition2)).toBe(false);
});

test("CheckNegation should indentify negative proposition", () => {
    const proposition1 = new Proposition("Name", true, "fact");
    const proposition2 = new Proposition("Name", false, "fact");
    expect(proposition1.checkNegation(proposition1)).toBe(false);
    expect(proposition1.checkNegation(proposition2)).toBe(true);
});

test("Check clone method works correctly", () => {
    const proposition1 = new Proposition("Name", true, "fact");
    const proposition2 = proposition1.clone();

    expect(proposition1).toEqual(proposition2);
});

test("Negate method should negate truth value correctly", () => {
    const proposition = new Proposition("Name", true, "fact");
    proposition.negate();

    expect(proposition.truth).toBe(false);
});

test("Denial method should return denial or current proposition", () => {
    const proposition1 = new Proposition("Name", true);
    const proposition2 = new Proposition("Name", false);

    const proposition3 = proposition1.denial();

    expect(proposition3).toEqual(proposition2);
});

test("getContentAsString should return appropriate value", () => {
    const proposition1 = new Proposition("CP is acceptable", true);
    expect(proposition1.getContentAsString()).toBe("CP is acceptable");

    const proposition2 = new Proposition("CP is acceptable", false);
    expect(proposition2.getContentAsString()).toBe("CP is not acceptable");

    const proposition3 = new Proposition("Unspecified", false);
    expect(proposition3.getContentAsString()).toBe("denial of this is not specified");
});

test("check getClassName returns correct name", () => {
    const proposition1 = new Proposition("CP is acceptable", true);

    expect(proposition1.getClassName()).toBe("Proposition");
});

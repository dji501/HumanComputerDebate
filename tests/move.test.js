import { Move } from "../scripts/move";

test("Instantiating gives correct values", () => {
    const move = new Move("Turn", "Type", "Content", "Conflict");

    expect(move.turn).toBe("Turn");
    expect(move.moveType).toBe("Type");
    expect(move.moveContent).toBe("Content");
    expect(move.conflictSet).toBe("Conflict");
});

test("Instantiating without Conflict gives correct values", () => {
    const move = new Move("Turn", "Type", "Content");

    expect(move.turn).toBe("Turn");
    expect(move.moveType).toBe("Type");
    expect(move.moveContent).toBe("Content");
    expect(move.conflictSet).toBe(undefined);
});

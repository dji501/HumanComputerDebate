import { Rule } from "./rule";

export class CommitmentManager {
    static commit(currentMove, previousMove, currentSelfCS, currentOppCS, dsiSelfCS, dsiOppCS) {

        let currentRuleProp = currentMove.moveContent;
        if (currentMove.moveType === "Assertion" || currentMove.moveType === "Ground") {

            if (currentMove.moveType === "Ground") {
                let previousRuleProp = previousMove.clone().moveContent;

                if (previousRuleProp.getClassName() === "Rule") {
                    let ruleMatch = currentSelfCS.matchRule(previousRuleProp);
                    ruleMatch.warrent = currentRuleProp;
                } else {
                    let previousProp = previousRuleProp.clone();
                    currentSelfCS.addAssertion(new Rule(currentRuleProp, previousProp));
                    currentOppCS.addConcession(new Rule(currentRuleProp, previousProp));
                }
            }

            currentSelfCS.addAssertion(currentRuleProp);
            currentOppCS.addConcession(currentRuleProp);
        } else if (currentMove.moveType === "Withdraw" || currentMove.moveType === "Challenge") {
            currentSelfCS.withdraw(currentRuleProp);
        } else if (currentMove.moveType === "Concession") {
            currentSelfCS.addAssertion(currentRuleProp);
            currentOppCS.addConcession(currentRuleProp);
        }

        // TODO:
        currentSelfCS.repaint(dsiSelfCS);
        currentSelfCS.repaint(dsiOppCS);
    }
}

import { Move } from "./move";
import { FocusShiftManager } from "./focusShiftManager";

export class WithdrawStrategist {

    static planWithdraw(dialogueHistory, selfCS, partnerCS, selfKBS, planner) {
        let relevantMove = [];
        let previousMove = dialogueHistory.set[dialogueHistory.length-1];
        let prevMoveContent = previousMove.moveContent;
        let supportedProposition;
        let previousProposition;

        // Get support proposition
        if (prevMoveContent.getClassName() === "Proposition") {
            previousProposition = prevMoveContent;
            supportedProposition = partnerCS.getSupportProp(prevMoveContent);
        }

        // Check if plan is under execution if it is then carry on
        if (planner.currentPlan !== null && planner.currentPlan !== undefined) {
            let nextMove = planner.currentPlan.execute(dialogueHistory, planner, partnerCS,selfCS,selfKBS);
            if (nextMove !== null && nextMove !== undefined) {
                // 2.1 Try execute the plan
                relevantMove.push(nextMove);
            } else {
                // 2.2 Else plan is abandoned, switch focus
                nextMove = FocusShiftManager.execute(dialogueHistory, partnerCS, selfCS, selfKBS, planner);
                if (nextMove !== null && nextMove !== undefined) {
                    relevantMove.push(nextMove);
                }
            }
        } else if (planner.currentPlan === null) {
            // if there is no plan
            if (supportedProposition !== null && supportedProposition !== undefined && selfKBS.challengeable(supportedProposition, partnerCS, selfCS) && supportedProposition.equals(planner.computerThesis.denial()) === false) {
                relevantMove.push(new Move("C","Challenge",supportedProposition));
            } else if (previousProposition !== null && previousProposition !== undefined && planner.computerThesis.denial().equals(previousProposition) === false && (selfKBS.supports(prevMoveContent, planner.computerThesis.denial()) || selfKBS.againstSupport(prevMoveContent,planner.computerThesis))) {
                relevantMove.push(new Move("C","Question",planner.computerThesis.denial()));
            } else if (previousProposition !== null && previousProposition !== undefined && planner.computerThesis.denial().equals(previousProposition)) {
                relevantMove.push(new Move("C","Question",planner.computerThesis));
            } else {
                let nextMove = FocusShiftManager.execute(dialogueHistory, partnerCS, selfCS, selfKBS, planner);
                if (nextMove !== null && nextMove !== undefined) {
                    relevantMove.push(nextMove);
                }
            }
        }

        return relevantMove;
    }
}

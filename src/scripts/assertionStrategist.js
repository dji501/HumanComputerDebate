import { Proposition } from "./proposition";
import { Move } from "./move";
import { FocusShiftManager } from "./focusShiftManager";
import { TacticManager } from "./tacticManager";

export class AssertionStrategist {

    /** TODO
     * @static planAssertion - plans the appropriate assertion action to take
     *
     * @param  {DialogueHistory} dialogueHistory The dialogue history
     * @param  {CommitmentStore} selfCS          the computer commitmentStore
     * @param  {CommitmentStore} partnerCS       the player commitmentStore
     * @param  {BooleanRuleBase} selfKBS         the computer knowledge base
     * @param  {Planner} planner         description
     * @return {array}    array containing the relevantMove to take
     */
    static planAssertion(dialogueHistory, selfCS, partnerCS, selfKBS, planner) {
        let relevantMove = [];
        let previousMove = dialogueHistory.set[dialogueHistory.length-1];
        let prevMoveProp = previousMove.moveContentProposition;


		if(dialogueHistory.length === 2) {
            /*
             1. Start of the game, Computer would automatically adopt the negative view.
                Computer would assert the opposite thesis.
            */
            let firstMove = dialogueHistory.set[0];
            let compThesis;

            if (previousMove.moveType === "Concession" && previousMove.getMoveContentAsString() === firstMove.getMoveContentAsString()) {
                //User said Yes
                compThesis = new Proposition("CP is acceptable", false);
            } else {
                //User said no
                compThesis = new Proposition("CP is acceptable", true);
            }

            relevantMove.push(new Move("C","Assertion",compThesis));
            planner.computerThesis = compThesis;

        } else if (planner.currentPlan !== null && planner.currentPlan !== undefined) {
            /*
            2. There is a plan under execution, then try to execute the plan
            */
            let nextMove = planner.currentPlan.execute(dialogueHistory, planner, partnerCS, selfCS, selfKBS);

            if (nextMove !== null && nextMove !== undefined) {
                /*
                 2.1 Try to execute the plan
                     If the plan can be continuously executed, then execute it
                */
                relevantMove.push(nextMove);
            } else {
                /*
                 2.2 Else, plan is abandoned, Computer needs to check whether there are level
                     3 methods available to either build or demolish strategy given the current
                     dialogue state. If there are level 3 available, then retain the current focus
                     Otherwise, call the focus shift manager
                */
                nextMove = FocusShiftManager.execute(dialogueHistory, selfCS, partnerCS,selfKBS, planner);
                if (nextMove !== null && nextMove !== undefined) {
                    relevantMove.push(nextMove);
                }
            }

        } else if (planner.currentPlan === null && (prevMoveProp !== null && prevMoveProp !== undefined)) {
            /*
            3. If there is no plan under execution and previous is a proposition
            */
            /*
             Check the previous statement supports S's view or against computer's,
             Check whether the current focus is retained
            */
            if (prevMoveProp.equals(planner.computerThesis.denial()) || selfKBS.support(prevMoveProp, planner.computerThesis.denial()) || selfKBS.againstSupport(prevMoveProp, planner.computerThesis)) {
                let nextMove;
                if (selfCS.onAssertion(prevMoveProp) === false) {
                    nextMove = TacticManager.getAction(prevMoveProp, dialogueHistory, selfCS, partnerCS, selfKBS, planner);
                }
                if (nextMove !== null && nextMove !== undefined) {
                    relevantMove.push(nextMove);
                }
                if (relevantMove.length === 0) {
                    nextMove = FocusShiftManager.execute(dialogueHistory, selfCS, partnerCS,selfKBS, planner);
                }
            } else if (selfKBS.supports(prevMoveProp, planner.computerThesis)) {
                // If statement supports Computers thesis
                planner.currentPlan = selfKBS.getPlan(prevMoveProp);
                planner.currentPlan.set.unshift(prevMoveProp);
                planner.currentPlan.reform();
                planner.currentPlan.set.splice(0,1);
                let nextMove = planner.currentPlan.startImediatePlan();

                if (nextMove !== null && nextMove !== undefined) {
                    relevantMove.push(nextMove);
                }
            } else {
                // Otherwise, C assesses if it wants to stick with its thesis
                relevantMove.push(new Move("C","Question",planner.computerThesis.denial()));
            }
        } else {
            // No plan under execution and Student gives a conditional
            let nextMove = FocusShiftManager.execute(dialogueHistory, selfCS, partnerCS,selfKBS, planner);
            if (nextMove !== null && nextMove !== undefined) {
                relevantMove.push(nextMove);
            }
        }
        return relevantMove;
    }
}

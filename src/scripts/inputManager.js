import { Move } from "./move";
import { Rule } from "./rule";

export class InputManager {

    static getMoveTypes(dialogueHistory, computerCS) {
        let moveTypes = [];
        let previousMove = dialogueHistory.set[dialogueHistory.length - 1];
        let previousMoveType = previousMove.moveType;
        let previousRuleProp = previousMove.moveContent;

        /*
        Previous move was question, then options are: Yes, No, No comment
        */
        if (previousMoveType === "Question") {
            moveTypes.push("Yes");
            moveTypes.push("No");
            moveTypes.push("I am not sure about it");

            //TODO: Original would remove the content dropdown in this case:
            return InputManager.getDynamicMoveType(dialogueHistory, moveTypes);
        } else if (previousMoveType === "Challenge") {
            moveTypes.push("Assertion");
            moveTypes.push("I don't know why " + previousMove.getMoveContentAsString() + ".");

            if (computerCS.getRealPremises(previousRuleProp) > 0) {
                moveTypes.push("Resolve");
            }

            // Original would add "" here to "make interface nice"

            //TODO: Original would re-add content dropdown in this case
            return InputManager.getDynamicMoveType(dialogueHistory, moveTypes);
        } else if (previousMoveType === "Resolve") {
            let conflictSet = previousMove.conflictSet;
            for (let i = 0; i < conflictSet.set.length; i++) {
                moveTypes.push("I don't think " + conflictSet.set[i].getContentAsString() + ".");
            }

            if (conflictSet.set.length === 2 && conflictSet.isPNP() === false) {
                moveTypes.push("I think " + conflictSet.getConsequent().getContentAsString() + ".");
            }

            // Original would add "" here to "make interface nice"

            //TODO: Original would re-add content dropdown in this case
            return InputManager.getDynamicMoveType(dialogueHistory, moveTypes);
        } else if (previousMoveType === "Assertion" || previousMoveType === "Question" || previousMoveType === "Ground") {
            moveTypes.push("Assertion");
            moveTypes.push("Question");
            moveTypes.push("Challenge");
            moveTypes.push("Withdraw");

            // When there is a conflict
            if (computerCS.getRealConflictSet().set.length > 0) {
                moveTypes.push("Resolve");
            }

            //TODO: Original would re-add content dropdown in this case
            return InputManager.getDynamicMoveType(dialogueHistory, moveTypes);
        } else {
            moveTypes.push("Assertion");
            moveTypes.push("Question");
            moveTypes.push("Challenge");
            moveTypes.push("Withdraw");

            if (previousRuleProp.getClassName() === "Proposition") {
                if (computerCS.getRealPremises(previousRuleProp).set.length > 0 && computerCS.getRealConflictSet().set.length > 0) {
                    moveTypes.push("Resolve");
                }
            }

            //TODO: Original would re-add content dropdown in this case
             return InputManager.getDynamicMoveType(dialogueHistory, moveTypes);
        }

        //TODO: Set focus to move type select element
    }

    static getDynamicMoveType(dialogueHistory, moveTypes) {
        let moveTypesText = [];
        for (let i = 0; i < moveTypes.length; i++) {
            let moveType = moveTypes[i];
            if (moveType === "Assertion") {
                if (dialogueHistory.set[dialogueHistory.length -1].moveType === "Challenge") {
                    moveTypesText.push("Because...");
                } else {
                    moveTypesText.push("I think...");
                }
            } else if (moveType === "Challenge") {
                moveTypesText.push("Why is it the case that..?");
            } else if (moveType === "Question") {
                moveTypesText.push("Is it the case that..?");
            } else if (moveType === "Withdraw") {
                moveTypesText.push("I don't think...");
            } else if (moveType === "Resolve") {
                moveTypesText.push("Please resolve...");
            } else {
                moveTypesText.push(moveType);
            }
        }
        return moveTypesText;
    }

    static getGeneralMoveType(moveType) {
        if (moveType === "Because..." || moveType === "I think...") {
            return "Assertion";
        } else if (moveType === "Why is it the case that..?") {
            return "Challenge";
        } else if (moveType === "Is it the case that..?") {
            return "Question";
        } else if (moveType === "I don't think...") {
            return "Withdraw";
        } else if (moveType === "Please resolve...") {
            return "Resolve";
        } else {
            return moveType;
        }
    }

    static getInput(debatingSystemInterface, dialogueHistory) {
        let fullMove;
        let previousMove = dialogueHistory.set[dialogueHistory.length -1];
        let previousMoveType = previousMove.moveType;
        let previousRuleProp = previousMove.moveContent;
        let moveType = InputManager.getGeneralMoveType(debatingSystemInterface.state.selectedType);

        if (debatingSystemInterface.state.implies === false) {

            if (moveType === "Yes" || moveType === "No" || moveType === "I am not sure about it") {
                if (moveType === "Yes") {
                    fullMove = new Move("S","Concession",previousRuleProp);
                } else if (moveType === "No") {
                    fullMove = new Move("S","Concession",previousRuleProp.denial());
                } else {
                    fullMove = new Move("S","Withdraw",previousRuleProp);
                }
            } else if (moveType === "Resolve") {
                let conflictSet = debatingSystemInterface.state.selectedComputerCommitments;
                if (conflictSet.set.length < 2) {
                    let message = "If you ask the computer to resolve conflicts, you need"
                                 +"to select two (P, not P) or three (P, R, R implies not P)"
                                 +"conflict statements from computer's positions to resolve.";
                    alert(message); //TODO Make this something else;
                } else if (conflictSet.set.length > 3) {
                    let message = "Sorry, this advanced feature--over 3 conflit elements is "
                                 +"not currently available in this version, try to select "
                                 +"two (P, not P) or three (P, R, R implies not P) options "
                                 +"from computer's positions to resolve.";
                    alert(message); //TODO Make this something else;
                } else if ((conflictSet.set.length === 2 && conflictSet.isPNP() === false) || (conflictSet.set.length === 3 && conflictSet.isPRNP() === false)) {
                    let message = "If you ask the computer to resolve conflicts, you need "
                                 +"to select two (P, not P) or three (P, R, R implies not P)"
                                 +"conflict statements from computer's positions to resolve.";
                    alert(message); //TODO Make this something else;
                } else {
                    fullMove = new Move("S","Resolve", conflictSet.mergeIntoProposition(), conflictSet);
                }
            } else if (moveType === "Challenge") {
                let challengedElements =  debatingSystemInterface.state.selectedComputerCommitments;
                if (challengedElements.length === 0) {
                    let message = "If you want to make a challenge, you needs to select one \n"
                                 +"statement from computer's positions, which are indeed \n"
                                 +"advanced by the computer.";
                    alert(message); //TODO Make this something else;
                } else if (challengedElements.length > 1) {
                    let message = "To challenge several positions together is not currently \n"
                                 +"available, please select one statement from computer's \n"
                                 +"positions which are indeed stated by the computer.";
                    alert(message); //TODO Make this something else;
                } else {
                    if (challengedElements[0].getClassName === "Rule") {
                        let message = "To challenge a conditional (e.g. P-->Q) is not currently \n"
                                     +"available, if you have problem with this conditional, you \n"
                                     +"can withdraw it or try other options.";
                        alert(message); //TODO Make this something else;
                    } else {
                        fullMove = new Move("S", moveType, challengedElements[0]);
                    }
                }
            } else if (moveType === "Withdraw") {
                let withdrawnElements =  debatingSystemInterface.state.selectedStudentCommitments;

                if (withdrawnElements.length === 0) {
                    let message = "If you want to make a withdrawal, you needs to select one \n"
                                 +"statement from your own positions. \n";
                    alert(message); //TODO Make this something else;
                } else if (withdrawnElements.length > 1) {
                    let message = "You can withdraw only one option at once, please select one\n"
                                 +"statement from your own positions.";
                    alert(message); //TODO Make this something else;
                } else {
                    fullMove = new Move("S", moveType, withdrawnElements[0]);
                }
            } else if (moveType === "Assertion") {
                let chosenContent = debatingSystemInterface.state.selectedAntecedent;

                if (previousMoveType === "Challenge") {
                    if (debatingSystemInterface.state.implies === true) {
                        let message = "You can only use a proposition as a ground, please select one\n"
                                     +"statement from the move content choice.";
                        alert(message); //TODO Make this something else;
                    } else {
                        fullMove = new Move("S","Ground",chosenContent);
                    }
                } else {
                    fullMove = new Move("S", moveType, chosenContent);
                }
            } else if (moveType === "Question") {
                let chosenContent = debatingSystemInterface.state.selectedAntecedent;
                fullMove = new Move("S", "Question", chosenContent);
            } else {
                if (previousMoveType === "Challenge" && moveType === ("I don't know why " + previousRuleProp.getContentAsString())) {//TODO TEST THIS
                    fullMove = new Move("S", "Withdraw", previousRuleProp);
                }

                if (previousMoveType === "Resolve") {
                    let conflictSet = previousMove.conflictSet;

                    // Try get rid of this i rubbish
                    let i = debatingSystemInterface.state.moveTypes.indexOf(moveType);

                    if ((conflictSet.set.length === 2 && conflictSet.isPNP() && i === 2 ) || i === 3) {
                        let message = "You need to select a move choice.\n";
                        alert(message); //TODO Make this something else;
                    }

                    if (conflictSet.set.length === 2 && conflictSet.isPNP() === false && i === 2) {
                        fullMove = new Move("S", "Assertion", conflictSet.getConsequent());
                    } else {
                        fullMove = new Move("S", "Assertion", conflictSet.set[i]);
                    }
                }
            }

        } else {
            //TODO TEST THIS BECAUSE
            if (moveType === "Because...") {
                fullMove = new Move("S","Ground", new Rule(debatingSystemInterface.state.selectedAntecedent,debatingSystemInterface.state.selectedConsequent));
            } else {
                fullMove = new Move("S", moveType, new Rule(debatingSystemInterface.state.selectedAntecedent,debatingSystemInterface.state.selectedConsequent));
            }
        }

        // Untick implies checkbox

        return fullMove;
    }
}

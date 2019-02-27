import { Move } from "./move";

export class InputManager {

    constructor() {
        this._moveTypes = [];
        this._moveTypesText = [];
        this._moveContent = [];
        this._tempMove;
    }

    get moveTypesText() {
        return this._moveTypesText;
    }

    prefixInputChoice(debatingSystemInterface, dialogueHistory, computerCS) {
        this._moveTypes = [];
        this.setMoveType(debatingSystemInterface, dialogueHistory, computerCS);
    }

    setMoveType(debatingSystemInterface, dialogueHistory, computerCS) {
        let previousMove = dialogueHistory.set[dialogueHistory.length - 1];
        let previousMoveType = previousMove.moveType;
        let previousRuleProp = previousMove.moveContent;

        /*
        Previous move was question, then options are: Yes, No, No comment
        */
        if (previousMoveType === "Question") {
            this._moveTypes.push("Yes");
            this._moveTypes.push("No");
            this._moveTypes.push("I am not sure about it");

            //TODO: Original would remove the content dropdown in this case:
            this.showDynamicMoveType(debatingSystemInterface, dialogueHistory);
        } else if (previousMoveType === "Challenge") {
            this._moveTypes.push("Assertion");
            this._moveTypes.push("I don't know why " + previousMove.getMoveContentAsString() + ".");

            if (computerCS.getRealPremises(previousRuleProp) > 0) {
                this._moveTypes.push("Resolve");
            }

            // Original would add "" here to "make interface nice"

            //TODO: Original would re-add content dropdown in this case
            this.showDynamicMoveType(debatingSystemInterface, dialogueHistory);
        } else if (previousMoveType === "Resolve") {
            let conflictSet = previousMove.conflictSet;
            for (let i = 0; i < conflictSet.set.length; i++) {
                this._moveTypes.push("I don't think " + conflictSet.set[i].getContentAsString() + ".");
            }

            if (conflictSet.set.length === 2 && conflictSet.isPNP() === false) {
                this._moveTypes.push("I think " + conflictSet.getConsequent().getContentAsString() + ".");
            }

            // Original would add "" here to "make interface nice"

            //TODO: Original would re-add content dropdown in this case
            this.showDynamicMoveType(debatingSystemInterface, dialogueHistory);
        } else if (previousMoveType === "Assertion" || previousMoveType === "Question" || previousMoveType === "Ground") {
            this._moveTypes.push("Assertion");
            this._moveTypes.push("Question");
            this._moveTypes.push("Challenge");
            this._moveTypes.push("Withdraw");

            // When there is a conflict
            if (computerCS.getRealConflictSet().set.length > 0) {
                this._moveTypes.push("Resolve");
            }

            //TODO: Original would re-add content dropdown in this case
            this.showDynamicMoveType(debatingSystemInterface, dialogueHistory);
        } else {
            this._moveTypes.push("Assertion");
            this._moveTypes.push("Question");
            this._moveTypes.push("Challenge");
            this._moveTypes.push("Withdraw");

            if (previousRuleProp.getClassName() === "Proposition") {
                if (computerCS.getRealPremises(previousRuleProp).set.length > 0 && computerCS.getRealConflictSet().set.length > 0) {
                    this._moveTypes.push("Resolve");
                }
            }

            //TODO: Original would re-add content dropdown in this case
            this.showDynamicMoveType(debatingSystemInterface, dialogueHistory);
        }

        //TODO: Set focus to move type select element
    }

    showDynamicMoveType(debatingSystemInterface, dialogueHistory) {
        this._moveTypesText = [];
        for (let i = 0; i < this._moveTypes.length; i++) {
            let moveType = this._moveTypes[i];
            if (moveType === "Assertion") {
                if (dialogueHistory.set[dialogueHistory.length -1].moveType === "Challenge") {
                    this._moveTypesText.push("Because...");
                } else {
                    this._moveTypesText.push("I think...");
                }
            } else if (moveType === "Challenge") {
                this._moveTypesText.push("Why is it the case that..?");
            } else if (moveType === "Question") {
                this._moveTypesText.push("Is it the case that..?");
            } else if (moveType === "Withdraw") {
                this._moveTypesText.push("I don't think...");
            } else if (moveType === "Resolve") {
                this._moveTypesText.push("Please resolve...");
            } else {
                this._moveTypesText.push(moveType);
            }
        }

        debatingSystemInterface.update();
    }

    getInput(debatingSystemInterface, dialogueHistory, computerCS, studentCS) {
        //I WANNA CRY WAAAH
        let fullMove;
        let previousMove = dialogueHistory.set[dialogueHistory.length -1];
        let previousMoveType = previousMove.moveType;
        let previousRuleProp = previousMove.moveContent;

        if (this._tempMove === null) {
            let moveType = debatingSystemInterface.getMoveType(); // TODO

            if (moveType === "Yes", moveType === "No", moveType === "I am not sure about it") {
                if (moveType === "Yes") {
                    fullMove = new Move("S","Concession",previousRuleProp);
                } else if (moveType === "No") {
                    fullMove = new Move("S","Concession",previousRuleProp.denial());
                } else {
                    fullMove = new Move("S","Withdraw",previousRuleProp);
                }
            } else if (moveType === "Resolve") {
                //TODO Get conflict from computer commitment commitmentStore
                let conflictSet = {set: []};// = computerCS.getInput();
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
                //TODO: Get challanged element from computer commitment store
                let challengedElements = [];
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
                let withdrawnElements = [];

                if (withdrawnElements.length === 0) {
                    let message = "If you want to make a withdrawal, you needs to select one \n"
                                 +"statement from your own positions. \n";
                    alert(message); //TODO Make this something else;
                } else if (withdrawnElements.length > 1) {
                    let message = "You can withdraw only one options once, please select one\n"
                                 +"statement from your own positions.";
                    alert(message); //TODO Make this something else;
                } else {
                    fullMove = new Move("S", moveType, withdrawnElements[0]);
                }
            } else if (moveType === "Assertion") {
                let chosenContent = null; // TODO

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
                let chosenContent = null; //TODO
                fullMove = new Move("S", "Question", chosenContent);
            } else {
                if (previousMoveType === "Challenge") {//TODO && i == 2
                    fullMove = new Move("S", "Withdraw", previousRuleProp);
                }

                if (previousMoveType === "Resolve") {
                    let conflictSet = previousMove.conflictSet;

                    if (conflictSet.set.length === 2 && conflictSet.isPNP()) { //TODO i === 2 )|| i === 3) {
                        let message = "You need to select a move choice.\n";
                        alert(message); //TODO Make this something else;
                    }

                    if (conflictSet.set.length === 2 && conflictSet.isPNP() === false) {//TODO && i === 2) {
                        fullMove = new Move("S", "Assertion", conflictSet.getConsequent());
                    } else {
                        //TODO: fullMove = new Move("S", "Assertion", conflictSet.set[i]);
                    }
                }
            }

        } else {
            //TODO Handle implies here as that makes a rule.
            //Think I will have two dropdowns in a column
        }

        tempMove = null;
        // Untick implies checkbox

        return fullMove;
    }
}

import { KBSManager } from "./kbsManager";
import { DialogueHistory } from "./dialogueHistory";
import { Planner } from "./planner";
import { CommitmentStore } from "./commitmentStore";
import { Move } from "./move";
import { Proposition } from "./proposition";
import { InputManager } from "./inputManager";
import { CommitmentManager } from "./commitmentManager";
import { Filler } from "./filler";
import { MoveChoiceInitialiser } from "./moveChoiceInitialiser";

export class DialogueManager {
    constructor(dsi) {
        this._debateSystemInterface = dsi;
        this._computerKBS = KBSManager.getCompKBS();
        this._computerPlanner;
        this._comuterRelevantMove = [];
        this._gameEnd = false;
        this._line = 2;

        this._computerCS;
        this._studentCS;
        this._dialogueHistory;
        this._moveTypes;
        this._moveContents;
    }

    get computerKBS() {
        return this._computerKBS;
    }

    get computerCS() {
        return this._computerCS;
    }

    get studentCS() {
        return this._studentCS;
    }

    get dialogueHistory() {
        return this._dialogueHistory;
    }

    get moveTypes() {
        return this._moveTypes;
    }

    get moveContents() {
        return this._moveContents;
    }

    actionPerformed() {
        if (this._gameEnd === false) {
            this.studentMove();
            let message = this.getEndingMessage();
            if (message !== null && message !== undefined) {
                this.endDebate();
            }
        }
        this._debateSystemInterface.update();

        if (this._gameEnd === false) {
            this.computerMove();
        }
        this._debateSystemInterface.update();
    }

    /**
     * start - Start the game
     *
     * @return {type}  description
     */
    start(){
        //TODO: Clear everything
        this._end = false;
        this._line = 1;

        this._computerPlanner = new Planner("C");
        this._dialogueHistory = new DialogueHistory();

        this._studentCS = new CommitmentStore("Student");
        this._computerCS = new CommitmentStore("Computer");

        this._dialogueHistory.add(new Move("C","Question",new Proposition("CP is acceptable", true)));

        //TODO: This is where message would come up saying it was users go.

        this._moveTypes = MoveChoiceInitialiser.initialMoveType();
        this._moveContents = MoveChoiceInitialiser.initialMoveContent();
        this._moveTypes = InputManager.getMoveTypes(this._dialogueHistory, this._computerCS);
        this._debateSystemInterface.update();
    }

    studentMove() {
        let previousMove = this._dialogueHistory.set[this._dialogueHistory.length -1];

        // Make sure its student's turn
        if (previousMove.turn === "C" && this._end === false) {
            let studentMove = InputManager.getInput(this._debateSystemInterface, this._dialogueHistory, this._computerCS, this._studentCS);

            if (studentMove !== undefined) {
                this._line += 1;

                // Check if the move is legal
                let warningMessage = Filler.getMessage(studentMove, this._dialogueHistory, this._computerCS, this._studentCS);
                if (warningMessage === null || warningMessage === undefined) {
                    // Move is legal
                    CommitmentManager.commit(studentMove, previousMove, this._studentCS, this._computerCS, this._debateSystemInterface.studentCommitmentStore, this._debateSystemInterface.computerCommitmentStore, this._dialogueHistory);

                    //TODO: this is where the original would remove the green border hints
                    this._dialogueHistory.add(studentMove);
                } else {
                    //let refereeMove = new Move("R","Message", new Proposition(warningMessage, true));
                    //TODO: Original would create new thread here to add line and update display
                    alert(warningMessage);
                }
            }
        }
    }

    computerMove() {
        const previousMove = this._dialogueHistory.set[this._dialogueHistory.length -1];

        // Make sure its computer's turn
        if (previousMove.turn === "S") {
            //TODO here the original starts a thread for the computers turn.
            // Start of thread
            if (this._end === false) {
                // Sleep thread for a second
                let relevantMoves = this._computerPlanner.produceRelevantMove(this._dialogueHistory, this._computerCS, this._studentCS, this._computerKBS);
                let i = Math.round(Math.random() * (relevantMoves.length - 1));

                let chosenMove = relevantMoves[i];

                this._line += 1;
                //TODO: Update display with current move;

                CommitmentManager.commit(chosenMove, previousMove, this._computerCS, this._studentCS, this._debateSystemInterface.computerCommitmentStore, this._debateSystemInterface.studentCommitmentStore, this._dialogueHistory);

                this._dialogueHistory.add(chosenMove);

                //TODO: This is where original would notify users it was their turn
                //This method limits user inputs so they cant break the rules:
                this._moveTypes = InputManager.getMoveTypes(this._dialogueHistory, this._computerCS);
                if (chosenMove.moveType === "Question") {
                    this._debateSystemInterface.updateDisableUneededInputs(true);
                } else {
                    this._debateSystemInterface.updateDisableUneededInputs(false);
                }
                if (this.getEndingMessage() !== null) {
                    this.endDebate();
                }
            }
            //End of thread.
        }
    }

    getEndingMessage() {
        let message = null;
        const currentMove = this._dialogueHistory.set[this._dialogueHistory.length -1];

        let studentThesis = this._dialogueHistory.set[1].moveContentProposition.clone();
        let computerThesis = studentThesis.denial();

        if (currentMove.turn === "S") {
            if (this._studentCS.onAssertion(studentThesis) === false) {
                message = "You seem to have given up your view.";
            } else if (this._studentCS.onAssertion(computerThesis)) {
                message = "You seem to have changed your view.";
            }
        }

        if (currentMove.turn === "C") {
            if (this._computerCS.onAssertion(computerThesis) === false) {
                message = "The computer has given up it's view. Well done!";
            } else if (this._computerCS.onAssertion(studentThesis)) {
                message = "Congratulations! You win!";
            }
        }

        if (currentMove.type === "Withdraw" && this._dialogueHistory.length === 2) {
            message = "You seem to have no view on this topic, so we can't debate. Try again later if you take a view or try debating as if you did hold a view.";
        }

        return message;
    }

    endDebate() {
        const message = this.getEndingMessage();
        alert(message);
        //TODO: original would start a thread here
        if (this._end === false) {
            this._end = true;
            //let refereeMove = new Move("R","Message",new Proposition(message,true));

            this._line += 1;
            //TODO: Update display with move here.
            //TODO: Clear commitment boxes here.
            //TODO: Set label saying to start a new game do something.
        }
        //End of thread.
    }
}

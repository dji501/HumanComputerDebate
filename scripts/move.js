export class Move {

    /**
     * constructor - instantiates a move
     *
     * @param  {String} turn     String representing current player either "S" or "C for student/computer"
     * @param  {String} moveType    String representing the type of move
     * @param  {RuleProp} moveContent Content of the mode either a Rule or a Proposition
     * @param  {ConflictSet} conflictSet TODO: (Optional)
     */
    constructor(turn, moveType, moveContent, conflictSet) {
        this._turn = turn;
        this._moveType = moveType;
        this._moveContent = moveContent;
        this._conflictSet = conflictSet;
    }

    set turn(turn) {
        this._turn = turn;
    }

    get turn() {
        return this._turn;
    }

    set moveType(moveType) {
        this._moveType = moveType;
    }

    get moveType() {
        return this._moveType;
    }

    // Original: getObject
    get moveContent() {
        return this._moveContent;
    }

    get conflictSet() {
        return this._conflictSet;
    }

    // Original: getMoveProp
    get moveContentProposition() {
        if ( this._moveContent.getClassName()==="Proposition" )
            return this._moveContent;
        else {
            return null;
        }
    }

    // Original: getMoveRule
    get moveContentRule() {
        if ( this._moveContent.getClassName()==="Rule" )
            return this._moveContent;
        else {
            return null;
        }
    }

    // Original: getName()
    getMoveContentName() {
        //TODO: THIS MAY NOT BEHAVE IN SAME WAY!!!
        return this._moveContent.getClassName();
    }

    // Original: getContent()
    getMoveContentAsString() {
        //TODO:
        return this._moveContent.getContentAsString(); // romv.getContent();
    }

    // Return a copy of the move
    clone() {
        return new Move(this._turn, this._moveType, this._moveContent, this._conflictSet);
    }

    equals(move) {
        if (this._turn === move.turn && this._moveType === move.moveType && this._moveContent.equals(move.moveContent)) {
            return true;
        } else {
            return false;
        }
    }

    negate() {
        /*TODO: THIS CHANGE MAY HAVE CAUSED BUGS!!*/
        if (this._moveContent)
        {
            this._moveContent.negate();
        }
    }

    // Original: getWholeMove()
    getMoveAsString(prevMoveType, prevMoveContent) {
        let moveString = null;

        //Move type is Concession
        if ( this._moveType === "Concession" ) {

            //If previous move was yes/no/Idk question
            if ( prevMoveType === "Question" ) {
                if (this.getMoveContentAsString() === prevMoveContent) {
                    moveString = "Yes, I think that " + this.getMoveContentAsString() + ".";
                } else {
                    moveString = "No, I think that " + this.getMoveContentAsString() + ".";
                }
            }

        } else if (this._moveType === "Assertion") {

            if ( this.getMoveContentName() === "Proposition" && this._moveContent.isEvidence() ) {
				moveString = "But " + this.getMoveContentAsString() + ".";
			} else {
                moveString= "I think that " + this.getMoveContentAsString() + ".";
            }

        } else if ( this._moveType === "Ground" ) {

            moveString = "Because " + this.getMoveContentAsString() + ".";

        } else if (this._moveType === "Challenge") {

            moveString = "Why is it the case that " + this.getMoveContentAsString() + "?";

        } else if (this._moveType === "Question") {

            moveString = "Is it the case that " + this.getMoveContentAsString() + "?";

        } else if (this._moveType === "Resolve") {

            if (this._conflictSet.set.length === 2 && this._conflictSet.isPNP() == false && this._turn === "C") {
                moveString = "You already know this, please resolve " + this.getMoveContentAsString() + " in your positions.";
            } else {
                moveString = "Please resolve " + this.getMoveContentAsString() + " in your positions.";
            }

        } else if (this._moveType === "Withdraw") {

            if (prevMoveType === "Question") {
                moveString = "I am not sure about it.";
            } else if (prevMoveType === "Challenge") {
                moveString = "I don't know why " + this.getMoveContentAsString() + ".";
            } else {
                moveString = "I don't think " + this.getMoveContentAsString() + ".";
            }

        } else {
            moveString = this.getMoveContentAsString();
        }

        return moveString;
    }

    // TODO:
    display(line, textArea, prevMoveType, prevMoveContent) {
        let content = this.getMoveAsString(prevMoveType, prevMoveContent);

        if (line < 10) {
            //textArea.append("0"+line+": "+this_turn+">"+content+"\n");
        } else {
            //textArea.append(line+": "+this._turn+">"+content+"\n");
        }
        console.warn(content);
    }
}

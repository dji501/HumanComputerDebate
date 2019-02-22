export class Move {
    constructor(turn, moveType, moveContent, conflictSet) {
        this._turn = turn; //Char
        this._moveType = moveType; //String
        this._moveContent = moveContent; //RuleProposition
        this._conflictSet = conflictSet; //ConflictSet
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

    get moveContent() {
        return this._moveContent;
    }

    get conflictSet() {
        return this._conflictSet;
    }

    // TODO:
    get moveContentProposition() {
        /*TODO:
        if(rpmc.getClass().getName()=="Proposition")
            return (Proposition)rpmc;
        else return null;
        */
        return null;
    }

    get movecontentRule() {
        /*TODO:
        if(rpmc.getClass().getName()=="Rule")
            return (Rule)rpmc;
        else return null;
        */
        return null;
    }

    getMoveContentName() {
        //TODO:
        return this._moveContent; // rpmc.getClass().getName();
    }

    getMoveContentAsString() {
        //TODO:
        return this._moveContent; // romv.getContent();
    }
    // -------------------------------------------------------

    // Return a copy of the move
    clone() {
        return new Move(this._turn, this._moveType, this._moveContent, this._conflictSet);
    }

    equals(move) {
        if (this._turn == move.turn() && this._moveType == move.moveType() && this._moveContent == move.moveContent()){
            return true;
        }
        return false;
    }

    negate() {
        /*TODO:
        if(getMoveRule()==null){getMoveProp().negate();}
        else{getMoveRule().negate();}
        */
    }

    getMoveAsString(prevMoveType, prevMoveContent) {
        let moveString = null;

        //Move type is Concession
        if (this._moveType === "Concession") {

            //If previous move was yes/no/Idk question
            if (prevMoveType === "Question") {
                if (/* getMoveContentAsString.equals(prevMoveContent)*/prevMoveContent === null) {
                    moveString = "Yes, I think " + /* getMoveContentAsString */ + ".";
                } else {
                    moveString = "No, I think " + /* getMoveContentAsString */ + ".";
                }
            }

        } else if (this._moveType === "Assertion") {
            /*
            if(getName()=="Proposition" && getMoveProp().isEvidence())
			{
				wholeMove="But "+getContent()+".";
			}
			else wholeMove="I think "+getContent()+".";
            */
        } else if (this.moveType === "Ground") {
            moveString = "Because " + /* getMoveContentAsString */ + ".";
        } else if (this.moveType === "Challenge") {
            moveString = "Why is it the case that " + /* getMoveContentAsString */ + "?";
        } else if (this.moveType === "Question") {
            moveString = "Is it the case that " + /* getMoveContentAsString */ + "?";
        } else if (this.moveType === "Resolve") {
            if (this._conflictSet.size === 2 && this._conflict.isPNP() == false && this._turn === "C") {
                moveString = "You already know this, please resolve " + /* getMoveContentAsString */ + " in your positions.";
            } else {
                moveString = "Please resolve " + /* getMoveContentAsString */ + " in your positions.";
            }
        } else if (this.moveType === "Withdraw") {
            if (prevMoveType === "Question") {
                moveString = "I am not sure about it.";
            } else if (prevMoveType === "Challenge") {
                moveString = "I don't know why " + /* getMoveContentAsString */ + ".";
            } else {
                moveString = "I don't think " + /* getMoveContentAsString */ + ".";
            }
        } else {
            moveString = /* getMoveContentAsString */"";
        }

        return moveString;
    }

    display(line, textArea, prevMoveType, prevMoveContent) {
        let content = this.getWholeMove(prevMoveType, prevMoveContent);

        if (line < 10) {
            //textArea.append("0"+line+": "+this_turn+">"+content+"\n");
        } else {
            //textArea.append(line+": "+this._turn+">"+content+"\n");
        }
        console.warn(content);
    }
}

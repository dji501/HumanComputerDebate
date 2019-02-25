//import { AssertionStrategist } from "./assertionStrategist";
import { Move } from "./move";

export class Planner {
    constructor(turn) {
        this._turn = turn;
        this._currentPlan = null;
        this._computerThesis = null;
    }

    get turn() {
        return this._turn;
    }

    get currentPlan() {
        return this._currentPlan;
    }

    set currentPlan(value) {
        this._currentPlan = value;
    }

    set computerThesis(value) {
        this._computerThesis = value;
    }

    produceRelevantMove(dialogueHistory, selfCS, partnerCS, selfKBS) {
        let relevantMove = [];
        let previousMove = dialogueHistory[dialogueHistory.length-1];
        let prevMoveType = previousMove.moveType;
        if (prevMoveType === "Assertion" || prevMoveType === "Ground" || prevMoveType === "Concession") {
            /*
            I	When facing the situation of ASSERTION, CONCESSION or GROUND
            */
            //relevantMove = AssertionStrategist.planAssertion(dialogueHistory, selfCS, partnerCS, selfKBS, this);
        } else if (prevMoveType === "Withdraw") {
            /*
            II When facing WITHDRAW a proposition or rule
            */
            //relevantMove = WithdrawStrategist.planWithdraw(dialogueHistory, selfCS, partnerCS, selfKBS, this);
        } else if (prevMoveType === "Challenge") {
            /*
            III	When facing the CHALLENGE, challenge a rule is not currently available
            */
            if (previousMove.getMoveContentName() === "Proposition") {
                //let previousProposition = previousMove.getmoveContentProposition().clone();

                //relevantMove = ChallengeStrategist.planChallProp(previousProposition, this._turn, selfCS, partnerCS, selfKBS;)
            } else {
                //Feature not available
            }
        } else if (prevMoveType === "Question") {
            /*
            IV	Facing the QUESTION
            */
            //relevantMove = QuestionStrategist.planQuestion(dialogueHistory, selfCS, partnerCS, selfKBS, this);
        } else if (prevMoveType === "Resolve") {
            /*
            V	Facing a legal RESOLUTION demand
            */
            relevantMove = this.planResolution(previousMove, this._turn, partnerCS, selfKBS);
        }
        return relevantMove;
    }

    planResolution(previousMove, currentTurn, partnerCS, selfKBS) {
        let resolutionMove = [];
        let selfConflictSet = previousMove.conflictSet;

        if (selfConflictSet.set.length === 2) {
            // Deal with P, -P and R, R->P first.
            if (selfConflictSet.isPNP()) {
                let prop1 = selfConflictSet.set[0];
                let prop2 = selfConflictSet.set[1];

                let inFavour = null;
                let against = null;

                if (selfKBS.supports(prop1, this._computerThesis) || selfKBS.againstSupport(prop1, this._computerThesis.denial())) {
                    inFavour = prop1;
                    against = prop2;
                } else {
                    inFavour = prop2;
                    against = prop1;
                }

                if (selfKBS.findAcceptableGroundPropositions(inFavour, partnerCS).length > 0) {
                    resolutionMove.push(new Move(currentTurn, "Withdraw", against));
                } else {
                    resolutionMove.push(new Move(currentTurn, "Withdraw", inFavour));
                }
            } else {
                // Conflict is R, R-->P meaning comp's previous move was challenge or withdraw
                let prevPropClone = selfConflictSet.getConsequent().clone();
                let ruleProp1 = selfConflictSet.set[0];
                let ruleProp2 = selfConflictSet.set[1];

                resolutionMove.push(new Move(currentTurn, "Assertion", prevPropClone));
                resolutionMove.push(new Move(currentTurn, "Withdraw", ruleProp1));
                resolutionMove.push(new Move(currentTurn, "Withdraw", ruleProp2));
            }
        } else {
            // Conflict is in form P, R, R->-P
            let ruleProp1 = selfConflictSet.set[0];
            let ruleProp2 = selfConflictSet.set[1];
            let ruleProp3 = selfConflictSet.set[2];

            resolutionMove.push(new Move(currentTurn, "Withdraw", ruleProp1));
            resolutionMove.push(new Move(currentTurn, "Withdraw", ruleProp2));
            resolutionMove.push(new Move(currentTurn, "Withdraw", ruleProp3));
        }
        return resolutionMove;
    }
}

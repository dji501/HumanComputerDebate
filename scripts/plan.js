import { Move } from "./move";
import { Rule } from "./Rule";

export class Plan {
    constructor() {
        this._set = [];
    }

    get set() {
        return this._set;
    }

    add(value) {
        if (!(this._set.includes(value))) {
            this._set.push(value);
        }
    }

    containsProposition(proposition) {
        for (let i = 0; i < this._set.length; i++) {
            if (this._set[i].equals(proposition)) {
                return true;
            }
        }
        return false;
    }

    indexOfProposition(proposition) {
        for (let i = 0; i < this._set.length; i++) {
            if (this._set[i].equals(proposition)) {
                return i;
            }
        }
        return -1;
    }

    start() {
        this.reform();
        return this.startImediatePlan();
    }

    startImediatePlan() {
        let ruleProp = this._set[0];
        return new Move("C", "Question", ruleProp);
    }

    execute(dialogueHistory, planner, partnerCS, selfCS, selfKBS) {
        let previousMove = dialogueHistory.set[dialogueHistory.length-1];
        let secondToLastMove = dialogueHistory.set[dialogueHistory.length-2];
        let previousRuleProp = previousMove.moveContent;

        if (previousMove.moveType === "Concession" && previousMove.getMoveContentAsString() === secondToLastMove.getMoveContentAsString()) {
            /*
             * 1. If the user said yes, proceed to execute plan, the plan executed ok.
        		  If there is only one item remaining, then state the item and set the plan to null
        		  If the plan does not reach the end, then continuously pose the question
        	*/
            this._set.splice(0,1);

            if (this._set.length > 1){
                return new Move("C", "Question", this._set[0]);
            } else if (this._set.length === 1) {
                planner.currentPlan = null;
                return new Move("C", "Question", this._set[0]);
            }
        } else if (previousMove.moveType === "Withdraw" && secondToLastMove.moveType === "Question") {
            /*
    		 2. The user say withdrawal after a question, temporarily dropped according to Moore(1993 chapter 9 pp26)
    		    current plan is set to null. The line has been dropped. However, before the dropping,
    		    C may challenge the negation of the statement being build, if it is challengable
    		*/
            /*
			 C may needs to challenge it if the current focus is not current being built
			*/
			planner.currentPlan=null;
        } else if (previousMove.moveType === "Concession" && previousMove.getMoveContentAsString() !== secondToLastMove.getMoveContentAsString()) {
            /*
             3. The user gives an unwanted statement,
                and If there is a direct conflct, then pose a resolution demand
                Or challenge the unwanted proposition
            */
            let conflictSet = partnerCS.getRealConflictSet();

            if (conflictSet.set.length > 0 && conflictSet.includes(previousRuleProp)) {

                /*
                 3.1 If there is a direct conflict, then pose the resolution demand
                */
                let proposition = conflictSet.mergeIntoProposition();
                return new Move("C", "Resolve", proposition, conflictSet);
            } else if (selfKBS.challengeable(previousRuleProp, partnerCS, selfCS)) {
                /*
                 3.2 If there is no direct conflict, then check whether the unwanted statement is challengable
                     If it is, then challenge it
                */
                return new Move("C", "Challenge", previousRuleProp);
            } else {
                /*
                 3.3 If there was no direct conflict, and the statement isn't challengable
                     then abandon the current line of question.
                */
                planner.currentPlan = null;
            }
        } else if (previousMove.moveType === "Withdraw" && secondToLastMove.moveType === "Resolve") {
            /*
             4. The user says a withdrawal after a resolution, need to check whether
                the appropriate answer is withdrawn
            */
            let ruleProp = this._set[0];

            if (ruleProp.getClassName() === "Proposition" && previousRuleProp.getClassName() === "Proposition" && ruleProp.checkNegation(previousRuleProp)) {
                return new Move("C", "Question", ruleProp);
            } else if (ruleProp.getClassName() === "Rule" && previousRuleProp.getClassName() === "Rule" && ruleProp.denial().equals(previousRuleProp)) {
                return new Move("C", "Question", ruleProp);
            } else {
                planner.currentPlan = null;
            }
        } else if (previousMove.moveType === "Withdraw" && secondToLastMove.moveType === "Challenge") {
            /*
             5. The user says a withdrawal after a challenge so continue with the plan
            */
            return new Move("C", "Question", this._set[0]);
        } else if (previousMove.moveType === "Ground" && secondToLastMove.moveType === "Challenge") {
            /*
             5. The user says a Ground after a challenge then give up that line of questioning
            */
            planner.currentPlan=null;
        }
        return null;
    }


    /**
     * reform - For a bottom up plan, reformation may be needed to be ready for questioning.
     */
    reform() {
        let planClone = this.clone();
        this._set = [];

        this.add(planClone.set[0]);

        for (let i = 0; i < planClone.set.length - 1; i++) {
            let antecedentProp = null;
            let consequentProp = null;

            antecedentProp = planClone.set[i];
            consequentProp = planClone.set[i+1];

            if (antecedentProp !== null && antecedentProp !== undefined && consequentProp !== null && consequentProp !== undefined) {
                let newRule = new Rule(antecedentProp, consequentProp);
                this.add(newRule);
            }
        }

        this.add(planClone.set[planClone.set.length - 1]);
    }

    clone() {
        let planClone = new Plan();
        for (let i = 0; i < this._set.length; i++) {
            planClone.add(this._set[i]);
        }
        return planClone;
    }
}

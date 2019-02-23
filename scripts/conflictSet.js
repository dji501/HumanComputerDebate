import { Proposition } from "./proposition";

/**
 * ConflictSet represents a set of Rules and Propositions that may be in conflict in some way
 */
export class ConflictSet {
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

    includes(ruleProp) {
        for (let i = 0; i < this._set.length; i++) {
            if (ruleProp.getClassName() === this._set[i].getClassName() && ruleProp.equals(this._set[i])) {
                return true;
            }
        }
        return false;
    }

    /**
     * mergeIntoProposition - Merge a set of rules and propositions into a proposition
     *
     * @return {Proposition}  The resulting merged proposition
     */
    mergeIntoProposition() {
        let message = null;
        let size = this._set.length;

        if (size > 0) {
            message = "'" + this._set[0].getContentAsString() + "'";

            for (let i = 1; i < size; i++) {
                message = message + " and '" + this._set[i].getContentAsString() + "'";
            }
        }

        return new Proposition(message, true);
    }

    /**
     * isPNP - Check if the conflictSet is size 2 and in P, -P style
     * i.e. it contains 2 propositions that negate each other.
     * e.g. "CP is a good deterrent", "CP is not a good deterrent"
     *
     * @return {boolean}  true if in PNP style, false otherwise
     */
    isPNP(){
        if (this._set.length === 2) {
            let ruleProp1 = this._set[0];
            let ruleProp2 = this._set[1];

            if (ruleProp1.getClassName() === "Proposition" && ruleProp2.getClassName() === "Proposition") {
                if (ruleProp1.checkNegation(ruleProp2)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * isPRNP - Check if the conflictSet is size 3 and in R, R->P, -P style
     * i.e. it contains a rule that implies a P while also having -P
     * e.g. R: "Human life is scarce" implies "CP is not acceptable"
     *      P: "CP is not acceptable (false)"
     *      P: "Human life is scarce"
     *
     * @return {type}  description
     */
    isPRNP(){
        if (this._set.length === 3) {
            for (let i = 0; i < 3; i++) {
                if (this._set[i].getClassName() === "Rule") {
                    let rule = this._set[i];
                    let antecedent = rule.antecedent;
                    let consequent = rule.consequent;
                    let denial = consequent.denial();

                    if (this.includes(denial) && this.includes(antecedent) && rule.truth) {
                        return true;
                    }

                }
            }
        }
        return false;
    }

    /**
     * getConsequent - Get the consequent from the 3 set size P,R, R->-P or the 2 size R,R->-P
     * i.e.
     *
     * @return {Proposition}  Consequent of the conflict set
     */
    getConsequent() {
        let consequent = null;

        for (let i = 0; i < this._set.length; i++) {

            if (this._set[i].getClassName() === "Rule") {
                let rule = this._set[i];
                if (rule.truth === true){
                    consequent = rule.consequent.clone();
                }
            }
        }

        if (this._set.length === 2){
            return consequent;
        } else {
            return consequent.denial();
        }
    }

    // Original: I think it does the same thing as includes
    onConflict() {
        return;
    }
}

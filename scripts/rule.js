import { RuleProp } from "./RuleProp";
/**
 *  The Rule class implements the antecedent (lHS), warrent and consequent (RHS) parts
 *  of a rule.
 */

export class Rule extends RuleProp {

    /**
     * constructor - creat rule with passed in parameters only LHS and RHS of rule
     * are requied.
     *
     * @param  {Proposition} leftHandSide    LHS of the rule.
     * @param  {Proposition} rightHandSide   RHS of the rule.
     * @param  {Proposition} warrent         Warrent of the rule (Optional)
     * @param  {BooleanRuleBase} booleanRuleBase booleanRuleBase (Optional)
     * @param  {String} name  name of the rule (Optional)
     */
    constructor(leftHandSide, rightHandSide, warrent, booleanRuleBase, name) {
        super();

        this._booleanRuleBase = booleanRuleBase; //BooleanRuleBase
        this._name = name; //String
        this._fired = false;
        this._truth = true;

        this._antecedent = leftHandSide; //Proposition
        this._antecedent.position = "ANTECEDENT";
        this._antecedent.addRuleRef(this);

        this._consequent = rightHandSide;
        this._consequent.position = "CONSEQUENT";
        this._consequent.addRuleRef(this);

        if (booleanRuleBase !== null && booleanRuleBase !== undefined) {
            booleanRuleBase.rulePropList.push(this._antecedent);
            booleanRuleBase.rulePropList.push(this._consequent);
            booleanRuleBase.ruleList.push(this);
        }

        if (warrent !== null && warrent !== undefined) {
            this._warrent = warrent;
            this._warrent.position = "WARRENT";
            this._warrent.addRuleRef(this);

            if (booleanRuleBase !== null && booleanRuleBase !== undefined) {
                booleanRuleBase.rulePropList.push(this._warrent);
            }
        }
    }

    get antecedent() {
        return this._antecedent;
    }

    get consequent() {
        return this._consequent;
    }

    get warrent() {
        return this._warrent;
    }

    set warrent(proposition) {
        this._warrent = proposition;
    }

    get truth() {
        return this._truth;
    }

    set truth(boolean) {
        this._truth = boolean;
    }

    get fired() {
        return this._fired;
    }

    fire() {
        this._fired = true;
    }

    equals(rule) {
        if (this._antecedent.equals(rule.antecedent) && this._consequent.equals(rule.consequent) && this._truth === rule.truth) {
            return true;
        } else {
            return false;
        }
    }

    clone() {
        return new Rule(this._antecedent, this._consequent);
    }

    /**
     * negate - negate the truth value of the calling proposition
     *
     */
    negate() {
        this._truth = !this._truth;
    }

    /**
     * denial - Creates a rule that denys the calling rule
     *
     * @return {Rule}  Rule that denies the calling rule.
     */
    denial() {
        let denial = new Rule(this._antecedent, this._consequent);
        denial.negate();
        return denial;
    }

    /**
     * getContentAsString - Get the content of the rule as a string for display
     *
     * @return {String}  String representing the content of the rule.
     */
    getContentAsString() {
        let contentString = null;

        if (this._truth === true) {
            contentString = "'" + this._antecedent.getContentAsString() + "' implies '" + this._consequent.getContentAsString() + "'";
        } else {
            contentString = "It is not the case that '" + this._antecedent.getContentAsString() + "' implies '" + this._consequent.getContentAsString() + "'";
        }
        return contentString;
    }

    display(textArea) {
        //TODO:
        /*textArea.append(name + ": ");
    	textArea.append(antecedent.getContent());
    	textArea.append("\n      implies\n ");
    	textArea.append("    "+consequent.getContent() + "\n");*/
        textArea;
    }

}

import { BooleanRuleBase } from "./booleanRuleBase";
import { ConflictSet } from "./conflictSet";

export class CommitmentStore extends BooleanRuleBase {
    constructor(name) {
        super(name);
        this._claimStack = []; // non-cumulative stack
        this._assertionList = []; // assertion list
        this._concessionList = []; // silent concession list
        this._totalList = []; // total commitment list
        this._record = []; // to ban question begging
    }

    get assertionList() {
        return this._assertionList;
    }

    get totalList(){
        return this._totalList;
    }

    /**
     * removeRulePropFromArray - Remove the passed in RuleProp from the passed in array if it exists within it.
     *
     * @param  {RuleProp} ruleProp RuleProp to be removed
     * @param  {Array} arr     array to remove element from
     */
    removeRulePropFromArray(ruleProp, arr) {
        let index = arr.indexOf(ruleProp);
        if (index > -1) {
            arr.splice(index,1);
        } else {
            for (let i = 0; i < arr.length; i ++) {
                if (ruleProp.equals(arr[i]) === true) {
                    arr.splice(i,1);
                }
            }
        }
    }

    /**
     * addAssertion - Adds assertion proposition or rule to a commitment store
     * will also be added to concession set and claim stack
     * @param  {RuleProp} ruleProp The RuleProp to be added
     */
    addAssertion(ruleProp) {
        this._record.push(ruleProp);

        // Add to record
        if (this.onClaimStack(ruleProp) === false) {
            this._claimStack.push(ruleProp);
        }

        //adding the object to the assertionList and totallist if it is not there
        if (this.onAssertion(ruleProp) === false) {
            this._assertionList.push(ruleProp);
        }

        //For an assertion, the negation should be removed from the concession set
        if (ruleProp.getClassName() === "Proposition") {
            let rulePropDenial = ruleProp.denial();
            if (this.onConcession(rulePropDenial) === true) {
                this.withdrawConcession(rulePropDenial);
            }
        }

        if (this.onTotal(ruleProp) === false) {
            this._totalList.push(ruleProp);

            if (ruleProp.getClassName() === "Proposition") {
                super.addProposition(ruleProp);
            } else {
                super.addRule(ruleProp);
            }
        }
    }

    /**
     * addConcession - Adds a concession proposition or rule to a commitment store
     *
     * @param  {RuleProp} ruleProp The RuleProp to be added
     */
    addConcession(ruleProp) {
        this._record.push(ruleProp);

        if (this.onConcession(ruleProp) === false) {
            this._concessionList.push(ruleProp);
        }

        if (this.onTotal(ruleProp) === false) {
            this._totalList.push(ruleProp);

            if (ruleProp.getClassName() === "Proposition") {
                super.addProposition(ruleProp);
            } else {
                super.addRule(ruleProp);
            }
        }
    }

    withdrawConcession(ruleProp) {
        // Remove object from concession lift and the claim stack

        this.removeRulePropFromArray(ruleProp, this._concessionList);

        if (this.onAssertion(ruleProp) === false) {
            this.removeRulePropFromArray(ruleProp, this._totalList);
        }

        if (ruleProp.getClassName() === "Proposition") {

            if (super.checkProp(ruleProp) === true) {
                let propositionMatch = super.matchProposition(ruleProp);
                super.removeProposition(propositionMatch);

                this.removeRulePropFromArray(propositionMatch, this._concessionList);

                if (this.onAssertion(propositionMatch) === false) {
                    this.removeRulePropFromArray(propositionMatch, this._totalList);
                }

            }
        } else {
            let ruleMatch = super.matchRule(ruleProp);

            if (ruleMatch !== null) {
                super.removeRule(ruleMatch);

                this.removeRulePropFromArray(ruleMatch, this._concessionList);

                if (this.onAssertion(ruleMatch) === false) {
                    this.removeRulePropFromArray(ruleMatch, this._totalList);
                }
            }
        }
    }

    /**
     * withdraw - Withdraw a commitment proposition or rule from a commitment CommitmentStore
     * the object will be removed from the concession set and claim stack as well.
     *
     * @param  {RuleProp} ruleProp description
     */
    withdraw(ruleProp) {
        this.removeRulePropFromArray(ruleProp, this._assertionList);
        this.removeRulePropFromArray(ruleProp, this._concessionList);
        this.removeRulePropFromArray(ruleProp, this._totalList);

        //Remove a proposition
        if (ruleProp.getClassName() === "Proposition") {
            if (super.checkProp(ruleProp) === true) {
                let propositionMatch = super.matchProposition(ruleProp);

                // Remove from proposition list
                super.removeProposition(propositionMatch);

                this.removeRulePropFromArray(propositionMatch, this._assertionList);
                this.removeRulePropFromArray(propositionMatch, this._concessionList);
                this.removeRulePropFromArray(propositionMatch, this._totalList);
            }
        } else {
            let ruleMatch = super.matchRule(ruleProp);

            if (ruleMatch !== null) {
                super.removeRule(ruleMatch);
                this.removeRulePropFromArray(ruleMatch, this._assertionList);
                this.removeRulePropFromArray(ruleMatch, this._concessionList);
                this.removeRulePropFromArray(ruleMatch, this._totalList);
            }
        }
    }

    /**
     * onAssertion - Check if given proposition or rule is on assertionList.
     *
     * @param  {RuleProp} ruleProp RuleProp to check if on list
     * @return {boolean}   true if on list false if not
     */
    onAssertion(ruleProp) {
        if (ruleProp.getClassName() === "Proposition"){
            for (let i = 0; i < this._assertionList.length; i++) {
                if (this._assertionList[i].getClassName() === "Proposition" && this._assertionList[i].equals(ruleProp)) {
                    return true;
                }
            }
        } else {
            for (let i = 0; i < this._assertionList.length; i++) {
                if (this._assertionList[i].getClassName() === "Rule" && this._assertionList[i].equals(ruleProp)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * onClaimStack - Check if given proposition or rule is on ClaimStack.
     *
     * @param  {RuleProp} ruleProp RuleProp to check if on list
     * @return {boolean}   true if on list false if not
     */
    onClaimStack(ruleProp) {
        if (ruleProp.getClassName() === "Proposition"){
            for (let i = 0; i < this._claimStack.length; i++) {
                if (this._claimStack[i].getClassName() === "Proposition" && this._claimStack[i].equals(ruleProp)) {
                    return true;
                }
            }
        } else {
            for (let i = 0; i < this._assertionList.length; i++) {
                if (this._claimStack[i].getClassName() === "Rule" && this._claimStack[i].equals(ruleProp)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * onConcession - Check if given proposition or rule is on concession list.
     *
     * @param  {RuleProp} ruleProp RuleProp to check if on list
     * @return {boolean}   true if on list false if not
     */
    onConcession(ruleProp) {
        if (ruleProp.getClassName() === "Proposition"){
            for (let i = 0; i < this._concessionList.length; i++) {
                if (this._concessionList[i].getClassName() === "Proposition" && this._concessionList[i].equals(ruleProp)) {
                    return true;
                }
            }
        } else {
            for (let i = 0; i < this._concessionList.length; i++) {
                if (this._concessionList[i].getClassName() === "Rule" && this._concessionList[i].equals(ruleProp)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * onTotal - Check if given proposition or rule is on total List.
     *
     * @param  {RuleProp} ruleProp RuleProp to check if on list
     * @return {boolean}   true if on list false if not
     */
    onTotal(ruleProp) {
        if (ruleProp.getClassName() === "Proposition"){
            for (let i = 0; i < this._totalList.length; i++) {
                if (this._totalList[i].getClassName() === "Proposition" && this._totalList[i].equals(ruleProp)) {
                    return true;
                }
            }
        } else {
            for (let i = 0; i < this._totalList.length; i++) {
                if (this._totalList[i].getClassName() === "Rule" && this._totalList[i].equals(ruleProp)) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * onRecord - Check if given proposition or rule is on record List.
     *
     * @param  {RuleProp} ruleProp RuleProp to check if on list
     * @return {boolean}   true if on list false if not
     */
    onRecord(ruleProp) {
        if (ruleProp.getClassName() === "Proposition"){
            for (let i = 0; i < this._record.length; i++) {
                if (this._record[i].getClassName() === "Proposition" && this._record[i].equals(ruleProp)) {
                    return true;
                }
            }
        } else {
            for (let i = 0; i < this._record.length; i++) {
                if (this._record[i].getClassName() === "Rule" && this._record[i].equals(ruleProp)) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * deriveFromTotal - To block circular argument, check if the proposition can be derived TODO: check this
     *
     * @param  {RuleProp} ruleProp ruleProp to check derviation of.
     * @return {boolean}          TODO
     */
    deriveFromTotal(ruleProp) {
        if (this.onTotal(ruleProp) === true) {
            return true;
        } else if (ruleProp.getClassName() === "Proposition") {
            let groundedProps = this.findGroundPropositions(ruleProp);

            if (groundedProps.length > 0) {
                return true;
            } else {
                //Orginal comment: Check if there is match rule.
            }
        }
        return false;
    }


    /**
     * getRealConflictSet - GEt the conflict set if the player has explicitly commited to P & -P
     *
     * @return {ConflictSet}  The set containing the conflict
     */
    getRealConflictSet() {
        let conflictSet = new ConflictSet();

        for (let i = 0; i < this._assertionList.length; i++) {
            let ruleProp = this._assertionList[i];

            if (ruleProp.getClassName() === "Proposition" && this.onAssertion(ruleProp)) {
                let denial = ruleProp.denial();
                if (this.onAssertion(denial)) {
                    conflictSet.add(ruleProp);
                    conflictSet.add(denial);
                    break;
                }
            }
        }
        return conflictSet;


    /*Comment copied from prototype
    WE TEMPARARILY NOT CONSIDER THIS KIND OF CONFLICT
    If there is no P AND -P conflict, check P and R-->-P  conflict
    if (conflict.isEmpty()==true) {
        for(int i=0; i<=n-1; i++) {
            RuleProp rp=(RuleProp)assertionList.elementAt(i);//(RuleProp)totalList.elementAt(i);
            if(rp.getClass().getName()=="Rule") {
                Rule r=(Rule)rp;
                Proposition ante=r.getAntecedent();
                Proposition cons=r.getConsequent();

                Proposition denial=((Proposition)cons).denial();
                if(onTotal(denial)&&onTotal(ante)&&r.check().booleanValue()) {
                    conflict.addElement(ante);
                    conflict.addElement(r);
                    conflict.addElement(denial);
                    break;
                }
            }
        }
    }*/
    }

    /**
     * getRealPremises - TODO
     *
     * @param  {RuleProp} prop description
     * @return {ConflictSet}      description
     */
    getRealPremises(prop) {
        let premises = new ConflictSet();

        for (let i = 0; i < this._assertionList.length; i++) {
            let ruleProp = this._assertionList[i];
            if (ruleProp.getClassName() === "Rule") {
                let antecedent = ruleProp.antecedent;
                let consequent = ruleProp.consequent;

                if (this.onTotal(antecedent) && consequent.equals(prop) && ruleProp.truth) {
                    premises.add(antecedent);
                    premises.add(ruleProp);
                    break;
                }
            }
        }
        return premises;
    }

    /**:
     * getInput - Method of getting student input for resolution demand from assertion list.
     *
     * @param  {array} assertList TODO
     * @return {ConflictSet}   Conflict set representing
     */
    getInput(assertList) {
        let input = new ConflictSet();

        for (let i = 0; i < assertList; i++) {
            input.add(this._assertionList[assertList[i]]);
        }

        return input;
    }

    /**
     * getSupportProp - Get supported statement for a further challenge TODO
     *
     * @param  {RuleProp} ruleProp the ruleProp to look for the supported statement of
     * @return {RuleProp} the support statement
     */
    getSupportProp(ruleProp) {
        if (ruleProp.getClassName() === "Rule"){
            return ruleProp.consequent;
        } else {
            for (let i = 0; i < this._assertionList.length; i++) {
                let assertionListRp = this._assertionList[i];

                if (assertionListRp.getClassName() === "Rule") {
                    let antecedent = assertionListRp.antecedent;
                    let consequent = assertionListRp.consequent;

                    if (this.onTotal(consequent) && antecedent.equals(ruleProp) && assertionListRp.truth) {
                        return consequent.clone();
                    }
                }
            }
        }
    }

    /**
     * derivable - For question begging. For a statement try to get the backward chain in order to attack,
     * if there is no such chain then return false
     *
     * @param  {RuleProp} ruleProp the statement to look backward upon
     * @return {boolean}  true if dervied, false if not.
     */
    derivable(ruleProp) {
        if (this.onTotal(ruleProp)) {
            return true;
        } else {
            return this.isConsequence(ruleProp);
        }
    }

    /**
     * isConsequence - TODO
     *
     * @param  {RuleProp} ruleProp description
     * @return {boolean}          description
     */
    isConsequence(ruleProp) {
        if (ruleProp.getClassName() === "Proposition") {
            let rules = this.getRules(ruleProp);
            if (rules.length <= 0) {
                return false;
            } else {
                while (rules.length > 0) {
                    let lowLevelRules = [];

                    for (let i = 0; i< rules.length; i++) {
                        let rule = rules[i];

                        if (this.onTotal(rule.antecedent) && rule.truth) {
                            return true;
                        } else {
                            let element = this.getRules(rule.antecedent);

                            for (let j = 0; j < element.length; j++) {
                                lowLevelRules.push(element[j]);
                            }
                        }
                    }
                    rules = lowLevelRules;
                }
            }
        }
        return false;
    }

    /**
     * getRules - Get the rules for which the given proposition is a consequent
     *
     * @param  {Proposition} proposition proposition from which to look for rules
     * @return {array}  array of rules
     */
    getRules(proposition) {
        let rules = [];

        for (let i = 0; i < this._totalList.length; i++) {
            let ruleProp = this._totalList[i];

            if (ruleProp.getClassName() === "Rule" && ruleProp.consequent.equals(proposition) && ruleProp.truth) {
                rules.push(ruleProp);
            }
        }

        return rules;
    }

    /**
     * isSupported - TODO
     *
     * @param  {type} proposition                 description
     * @param  {type} selfBooleanRuleBase description
     * @return {type}                             description
     */
    isSupported(proposition, selfBooleanRuleBase /*KBS*/) {
        let groundedProps = selfBooleanRuleBase.findGroundPropositions(proposition);

        if (groundedProps.length > 0) {
            for (let i = 0; i < groundedProps.length; i++) {
                if (this.onAssertion(groundedProps[i])) {
                    return true;
                }
            }
        }
        return false;
    }
}

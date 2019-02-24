export class BooleanRuleBase {

    constructor(name) {
        this._name = name;
        this._propositionList = [];
        this._rulePropList = [];
        this._ruleList = [];
    }

    // Original had methods to view rules and propositions of computer.
    // Unneeded for a production version but could be worth doing. TODO.

    addProposition(prop) {
        if (this._propositionList === null || this._propositionList === undefined) {
            this._propositionList = [];
        }
        this._propositionList.push(prop);
    }

    addRule(rule) {
        if (this._ruleList === null || this._ruleList === undefined) {
            this._ruleList = [];
        }
        this._ruleList.push(rule);
        this._rulePropList.push(rule.antecedent);
        this._rulePropList.push(rule.consequent);

        if (rule.warrent !== null && rule.warrent !== undefined) {
            this._rulePropList.push(rule.warrent);
        }
    }

    removeRule(rule) {
        let index = this._ruleList.indexOf(rule);
        if (index > -1) {
            this._ruleList.splice(index, 1);

            this._rulePropList.splice(this._rulePropList.indexOf(rule.antecedent),1);
            this._rulePropList.splice(this._rulePropList.indexOf(rule.consequent),1);

            if (rule.warrent !== null && rule.warrent !== undefined) {
                this._rulePropList.splice(this._rulePropList.indexOf(rule.warrent),1);
            }
        }
        return;
    }

    matchRuleProposition(ruleProp) {
        for (let i = 0; i < this._rulePropList.length; i++) {
            if (this._rulePropList[i].equals(ruleProp)) {
                return this._rulePropList[i];
            }
        }
        return null;
    }

    matchProposition(prop) {
        for (let i = 0; i < this._propositionList.length; i++) {
            if (this._propositionList[i].equals(prop)) {
                return this._propositionList[i];
            }
        }
        return null;
    }

    matchRule(rule) {
        for (let i = 0; i < this._ruleList.length; i++) {
            if (this._ruleList[i].equals(rule)) {
                return this._ruleList[i];
            }
        }
        return null;
    }

    /**
     * checkProp - Check if proposition is in KBS propositionList
     *
     * @param  {Proposition} prop Porposition to be checked
     * @return {boolean}  true is in propositionList false otherwise
     */
    checkProp(prop) {
        for (let i = 0; i < this._propositionList.length; i++) {
            if (this._propositionList[i].equals(prop)) {
                return true;
            }
        }
        return false;
    }

    /** Original: groundProps
     * findGroundPropositions - Find the grounded proposition of a given proposition in the KBS
     * i.e. for all the rules that reference the proposition get their antecedent if they are gounded
     *
     * @param  {Proposition} prop Proposition to find grounded propositions of
     * @return {array}      array representing the grounded propositions.
     */
    findGroundPropositions(prop) {
        const matchedProp = this.matchProposition(prop);
        let groundedSet = [];
        let matchedPropRuleReferences = matchedProp.ruleReferences;

        if (matchedPropRuleReferences.length > 0) {
            for (let i = 0; i < matchedPropRuleReferences.length; i++) {
                let rule = matchedPropRuleReferences[i];
                if (rule.truth === true && matchedProp.equals(rule.consequent) && this.checkProp(rule.antecedent)) {
                    groundedSet.push(rule.antecedent);
                }
            }
        }
        return groundedSet;

    }

    /** Original: acceptableGroundProps
     * findAcceptableGroundPropositions - From the grounded propositions of the proposition passed in
     * find the acceptable ones.
     *
     * @param  {Proposition} prop  Proposition to find the acceptable grounded propositions of.
     * @param  {CommitmentStore} partnerCS commitmentStore of the opponent
     * @return {array}    containing accepted grounded proposition
     */    //TODO:
    findAcceptableGroundPropositions(prop, partnerCS) {
        let groundedPropositions = this.findGroundPropositions(prop);
        let acceptableGPs = [];

        if (groundedPropositions.length > 0) {
            for (let i = 0; i < groundedPropositions.length; i++) {
                let gp = groundedPropositions[i].clone();

                /*
                Avoid begging the question. Acceptable would be
                (i) a new commitment,
                (ii)commitment,
                (iii)or de facto commitment
                with respect to partner's store
                */
                if (partnerCS.onRecord(gp) === false || (partnerCS.onTotal(gp) || partnerCS.deriveFromTotal(gp))) {
                        acceptableGPs.push(gp);
                    }
            }
        }
        return acceptableGPs;
    }

    // Original: issupported
    /**
     * isSupported - Checks to see if any rule supports the proposition
     *
     * @param  {Proposition} prop The proposition to check support for
     * @return {boolean}   true is supported false if not.
     */
    propIsSupported(prop) {
        for (let i = 0; i < this._ruleList.length; i++) {
            let rule = this._ruleList[i];
            if (rule.consequent.equals(prop) && this.checkProp(rule.consequent)) {
                return true;
            }
        }
        return false;
    }

    // original: supportOthers
    /**
     * propSupportsOthers - Check for a rule where the prop is a antecedent and that the consequent is in the
     * proposition list.
     *
     * @param  {Proposition} prop the proposition to check
     * @return {boolean}      true if supports false if not.
     */
    propSupportsOthers(prop) {
        for (let i = 0; i < this._ruleList.length; i++) {
            let rule = this._ruleList[i];
            if (rule.antecedent.equals(prop) && this.checkProp(rule.consequent)) {
                return true;
            }
        }
        return false;
    }

    /**
     * getDirectSupportedProp - Given a proposition, if it supports others return the statement it supports
     *
     * @param  {type} prop description
     * @return {type}      description
     */
    getDirectSupportedProp(prop) {
        for (let i = 0; i < this._ruleList.length; i++) {
            let rule = this._ruleList[i];
            if (rule.antecedent.equals(prop) && this.checkProp(rule.consequent)) {
                return rule.consequent;
            }
        }
        return null;
    }

    /**
     * getPlanFromProposition - TODO
     *
     * @param  {Proposition} prop given proposition
     * @return {Plan}  TODO
     */
    getPlanFromProposition(prop) {
        //let plan = new Plan();
        while(this.propSupportsOthers(prop)) {
            let supportedProp = this.getDirectSupportedProp(prop);
            //plan.add(supportedProp);
            prop = supportedProp;
        }
        //return plan;
    }

    /**
     * supports - Check wether the first parameter supports the second
     *
     * @param  {RuleProp} ruleProp Could be a rule or a proposition to check if supports prop
     * @param  {Proposition} prop     Proposition to check if supported
     * @return {boolean}  true if ruleProp supports prop, false otherwise
     */
    supports(ruleProp, prop) {
        let proposition;

        if (ruleProp.getClassName() === "Rule") {
            proposition = ruleProp.consequent;
        } else {
            proposition = ruleProp;
        }

        let planSet = this.getPlanSet(prop);
        for (let i = 0; i < planSet.length; i++) {

            let plan = planSet[i];
            for (let j = 0; j < plan.length; j++) {
                let planProposition = plan[j];
                if (planProposition.equals(proposition)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * getPlanSet - TODO
     *
     * @param  {Proposition} prop TODO
     * @return {PlanSet}      TODO
     */
    getPlanSet(prop) {
        // let planset = new PlanSet();
        for (let i = 0; i < this._propositionList; i++) {
            let p = this._propositionList[i];

            if (this.propIsSupported(p) === false) {
                let tempPlan = this.getPlanFromProposition(prop);

                if (tempPlan.length === false && tempPlan.includes(prop)) {
                    //let plan = New Plan();
                    let j = tempPlan.indexOf(prop);

                    //plan.push(p);

                    for (let k = 0; k <= j; k++) {
                        //plan.push(tempPlan.elementAt(k));
                    }
                    //planSet.push(plan);
                }
            }
        }
        //return planSet;
    }

    /**
     * againstSupport - Check whether a proposition is against proponent's support
     *      TODO
     * @param  {RuleProp} ruleProp proposition to check
     * @param  {Proposition} prop   proposition to check against
     * @return {boolean}   true if ruleProp against prop false otherwise
     */
    againstSupport(ruleProp, prop) {
        let proposition;

        if (ruleProp.getClassName() === "Rule") {
            proposition = ruleProp.consequent;
        } else {
            proposition = ruleProp;
        }

        let planSet = this.getPlanSet(prop);
        for (let i = 0; i < planSet.length; i++) {

            let plan = planSet[i];
            for (let j = 0; j < plan.length; j++) {
                let planProposition = plan[j];
                if (proposition.equals(planProposition.denial()) || this.supports(proposition, planProposition.denial())) {
                    return true;
                }
            }
        }
        return false;
    }

    challengeable(ruleProp, partnerCS, selfCS) {
        if (ruleProp.getClassName() === "Proposition" && partnerCS.onAssertion(ruleProp)) {
            let groundedProps = this.findGroundPropositions(ruleProp);
            let prop = ruleProp;

            if (groundedProps.length === 0) {
                return false;
            } else {
                if (selfCS.isConsequence(prop)) {
                    return false;
                }
            }
        } else {
            /* Current not able to challenge a rule */
            return false;
        }
        return true;
    }
}

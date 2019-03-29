import { RuleProp } from "./ruleProp";

export class Proposition extends RuleProp {

    static getClassName() {
        return "Proposition";
    }
    /**
     * constructor - instantiate proposition
     *
     * @param  {string} message                 description
     * @param  {boolean} truth                description
     * @param  {String} qualification = null description
     * @param  {BooleanRuleBase} booleanRuleBase      description
     */
    constructor(message, truth, qualification = null, booleanRuleBase = null) {
        super();
        this._message = message;
        this._truth = truth;
        this._booleanRuleBase = booleanRuleBase;
        this._qualification = qualification;
        this._position = null; //String
        this._ruleReferences = []; //Vector (RuleRefs)

        // TODO: MAKE SURE THIS WORKS AS EXPECTED. LIKELY WILL NOT
        if (booleanRuleBase !== null && booleanRuleBase !== undefined) {
            booleanRuleBase.addProposition(this);
        }
    }

    get qualification() {
        return this._qualification;
    }

    get message() {
        return this._message;
    }

    get ruleReferences() {
        return this._ruleReferences;
    }

    /**
     * truth - Check if the proposition is true.
     *
     * @return {boolean}  returns the truth value of the proposition
     */
    get truth() {
        return this._truth;
    }

    /**
     * Assign a truth value to the proposition
     * @param {boolean} boolean
     */
    set truth(boolean){
        this._truth = boolean;
    }

    get position() {
        return this._position;
    }

    /**
     * set position - set the proposition position
     *
     * @param  {string} position Accepted values: "ANTECEDENT", "CONSEQUENT" and "WARRENT"
     */
    set position(position) {
        // Original: if (position === "PREMISE" || position === "CONCLUSION" || position === "WARRENT") {
        if (position === "ANTECEDENT" || position === "CONSEQUENT" || position === "WARRENT") {
            this._position = position;
        } else {
            throw SyntaxError("Position must have value 'ANTECEDENT', 'CONSEQUENT' or 'WARRENT'");
        }
    }

    getClassName() {
        return Proposition.getClassName();
    }

    /**
     * Add a rule reference to the list of rule references
     * @param {Rule} rule
     */
    addRuleRef(rule) {
        this._ruleReferences.push(rule);
    }

    /**
     * isEvidence - Check whether the qualification of the proposition is evidence
     *
     * @return {boolean}  true if evidence, false if not
     */
    isEvidence() {
        return (this._qualification === "evidence") ? true : false;
    }

    /**
     * isFact - Check whether the qualification of the proposition is fact
     *
     * @return {boolean}  true if fact, false if not
     */
    isFact() {
        return (this._qualification === "fact") ? true : false;
    }

    /**
     * equals - Compares the message and truth of the calling proposition and passed in proposition
     * to test equality.
     *
     * @param  {Proposition} proposition The proposition to be compared against
     * @return {boolean} true if equal false if not
     */
    equals(proposition) {
        if (proposition.getClassName() === "Proposition") {
            if (this._message === proposition.message && this._truth === proposition.truth){
                return true;
            }
        }
        return false;
    }

    /** Original: negate(prop)
     * checkNegation - check if proposition is the negative of the other
     *
     * @param  {Proposition} proposition the proposition to be compared against
     * @return {boolean} true if they are the negatives of each other, false otherwise
     */
    checkNegation(proposition) {
        if (this._message == proposition.message) {
            if (this._truth === true && proposition.truth === false) {
                return true;
            } else if (this._truth === false && proposition.truth === true) {
                return true;
            }
        }
        return false;
    }

    /**
     * clone - Create a copy of the proposition
     *
     * @return {Proposition}  A copy of the proposition that called clone
     */
    clone() {
        return new Proposition(this._message, this._truth, this._qualification);
    }

    /**
     * negate - negate the truth value of the calling proposition
     *
     */
    negate() {
        this._truth = !this._truth;
    }

    /**
     * denial - Create a Proposition which denies the calling proposition
     *
     * @return {Proposition}  Proposition with same message but opposite truth value as calling proposition
     */
    denial() {
        return new Proposition(this._message, !this._truth);
    }

    getContentAsString() {
        let contentString = null;
        if (this._truth === false) {
            switch (this._message) {
                case "a state has the right to deliberately execute the wrong people":
                    contentString = "a state does not have the right to deliberately execute the wrong people";
                    break;

                case "chances should be given to murderers for rehabilitation":
                    contentString = "chances should not be given to murderers for rehabilitation";
                    break;

                case "CP is acceptable":
                    contentString = "CP is not acceptable";
                    break;

                case "CP is a good deterrent":
                    contentString = "CP is not a good deterrent";
                    break;

                case "CP makes people less likely commit serious crimes":
                    contentString = "CP does not make people less likely commit serious crimes";
                    break;

                // Opinion
                case "CP stops murderers commit further crimes":
                    contentString = "CP does not stop murderers commit further crimes";
                    break;

                case "execution of murderers is fair for the people being murdered":
                    contentString = "execution of murderers is not fair for the people being murdered";
                    break;

                case "human lives are scarce":
                    contentString = "human lives are not scarce";
                    break;

                case "innocent people may get killed":
                    contentString = "it is unlikely innocent people get killed";
                    break;

                case "it is wrong to take a human life":
                    contentString = "it is not always wrong to take a human life";
                    break;

                case "most people want CP back":
                    contentString = "most people don't want CP back";
                    break;

                case "murderers should receive capital punishment":
                    contentString = "murderers should not receive capital punishment";
                    break;

                case "nobody is willing to die":
                    contentString = "some people are willing to die";
                    break;

                case "political and racial bias often causes prejudices":
                    contentString = "political and racial bias will not cause prejudices";
                    break;

                case "scientific techniques will increase the success of justice":
                    contentString = "scientific techniques will not increase the success of justice";
                    break;

                case "there are mistakes during judicial process":
                    contentString = "mistakes rarely happen during judicial process";
                    break;

                case "suicide bombers want to die":
                    contentString = "suicide bombers don't want to die";
                    break;

                case "CP does not give murderers opportunities for rehabilitation":
                    contentString = "CP gives murderers opportunities for rehabilitation";
                    break;

                case "CP having countries like the USA have higher murder rates than the UK":
                    contentString = "it is not the case that CP having countries like USA have higher murder rates than the UK";
                    break;

                case "statistics shows an increase in murder rate since the abolition of CP":
                    contentString = "it is not the case that statistics shows an increase in murder rate since the abolition of CP";
                    break;

                case "the recent survey shows that 60% British people support CP":
                    contentString = "it is not the case that the recent survey shows that 60% British people support CP";
                    break;

                case "statistics shows that repeat offences of murders are extremely low":
                    contentString = "it is not the case that statistics shows that repeat offences of murders are extremely low";
                    break;

                case "everyone has a human right to live":
                    contentString = "not everyone has a human right to live";
                    break;

                case "humans can forfeit their right to live though their actions":
                    contentString = "humans cannot forfeit their right to live through their actions";
                    break;

                default:
                 contentString = "denial of this is not specified";

            }
        } else {
            contentString = this._message;
        }
        return contentString;
    }

    display(textArea) {
        textArea;
    }

}

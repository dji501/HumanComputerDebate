import React from "react";

export class HintButton extends React.Component {
    constructor(props) {
        super(props);
        this.usedRules = [];
        this.usage = 0;
    }

    // Create a hint from current state of debate.
    generateHint() {
        let computerCommitments = this.props.computerCS.totalList;
        let attackableCommitments = [];
        let usableAntecedents = [];
        this.usage++;
        // Specific attack methods
        for (let i=0; i<computerCommitments.length; i++) {
            if (this.props.computerCS.onAssertion(computerCommitments[i]) === true) {
                let antiprop = computerCommitments[i].denial();
                let rule = this.checkIfCommitmentIsAttackable(antiprop);
                if (rule !== null) {
                    attackableCommitments.push(computerCommitments[i].getContentAsString());
                    usableAntecedents.push(rule.antecedent.getContentAsString());
                }
            }
        }
        let hintDecider = Math.round((Math.random() * (9 - 0 + 1) + 0));
        if (hintDecider > 0 && (attackableCommitments.length > 0 || usableAntecedents.length > 0)) {
            // Specific advice
            let i = Math.round(Math.random());
            if (i === 1) {
                alert("Try attacking '" + this.getRandomParameter(attackableCommitments) + "' somehow");
            } else {
                alert("Try using '" + this.getRandomParameter(usableAntecedents) + "' to attack the computer in some way");
            }

        } else {
            // Generic advice
            let i = Math.round((Math.random() * (2 - 0 + 1)) + 0);
            switch(i){
                case 0:
                    alert("Try get your opponent to agree to a point before linking it with your main argument");
                    break;
                case 1:
                    alert("Try bring up a point that supports arguments you have already made");
                    break;
                case 2:
                    alert("Try not to bring up topics which will ultimately weaken your position, even if at first they seem to help it");
                    break;
            }
        }

        return;
    }

    checkIfCommitmentIsAttackable(proposition) {
        let computerKnowledgeBase = this.props.computerKBS;
        for (let i = 0; i < computerKnowledgeBase._ruleList.length; i++) {
            let rule = computerKnowledgeBase._ruleList[i];
            if (rule.consequent.equals(proposition) && this.props.computerCS.onAssertion(rule) === false) {
                this.usedRules.push(rule);
                return rule;
            }
        }
        return null;

        //PROBLEMS:
        // IT will return same hint over and over.
        // IT cannot tell when something is implied.
    }

    getRandomParameter(array) {
        let i = Math.floor((Math.random() * ((array.length-1) - 0 + 1)) + 0);
        return array[i];
    }

    render() {
        return (
            <button className={"unselectable userinput__hintbutton"}
                    onClick={() => {this.generateHint(); console.warn(this.usage);}}>
                    {"?"}
            </button>
        );
    }
}

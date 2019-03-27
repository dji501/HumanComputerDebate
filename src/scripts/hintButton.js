import { DialogueManager } from "./dialogueManager";
import { GuidanceBar } from "./guidancebar";

import React from "react";

export class HintButton extends React.Component {
    constructor(props) {
        super(props);
        this.usedRules = [];
    }

    // Create a hint from current state of debate.
    generateHint() {
        let computerCommitments = this.props.computerCS.totalList;

        // Specific attack methods
        for (let i=0; i<computerCommitments.length; i++) {
            if (this.props.computerCS.onAssertion(computerCommitments[i]) === true) {
                let antiprop = computerCommitments[i].denial();
                let rule = this.checkIfCommitmentIsAttackable(antiprop);
                if (rule !== null) {
                    alert("'" + rule.antecedent.getContentAsString() + "' can be used to attack '" + computerCommitments[i].getContentAsString() + "'");
                    return;
                }
            }
        }

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
                alert("Try not to bring up topics which will ultimately weaken your position");
                break;
        }

        return;
    }

    checkIfCommitmentIsAttackable(proposition) {
        let computerKnowledgeBase = this.props.computerKBS;
        for (let i = 0; i < computerKnowledgeBase._ruleList.length; i++) {
            let rule = computerKnowledgeBase._ruleList[i];
            if (rule.consequent.equals(proposition) && this.usedRules.includes(rule) === false) {
                this.usedRules.push(rule);
                return rule;
            }
        }
        return null;



        //PROBLEMS:
        // IT will return same hint over and over.
        // IT cannot tell when something is implied.
    }

    render() {
        return (
            <button className={"unselectable userinput__hintbutton"}
                    onClick={() => {this.generateHint();}}>
                    {"?"}
            </button>
        );
    }
}

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

        for (let i=0; i<computerCommitments.length; i++) {
            if (this.props.computerCS.onAssertion(computerCommitments[i]) === true) {
                let antiprop = computerCommitments[i].denial();
                let rule = this.checkIfCommitmentIsAttackable(antiprop);
                if (rule !== null) {
                    alert("'" + rule.antecedent.getContentAsString() + "' can attack '" + computerCommitments[i].getContentAsString() + "'");
                    return;
                }
            }
        }
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

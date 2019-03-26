import { DialogueManager } from "./dialogueManager";

import React from "react";

export class DebatingSystemInterface extends React.Component{
    constructor(props) {
        super(props);
        this._dialogueManager = new DialogueManager(this);
        this.state = {
            debateLog: null,
            moveTypes: [],
            moveContents: [],
            implies: false,
            disableUneededInputs: true,

            selectedType: "Yes",
            selectedAntecedent: null,
            selectedConsequent: null,
            selectedAntecedentString: null,
            selectedConsequentString: null,
            moveContentsStrings: [],

            studentCS: null,
            computerCS: null,
            studentCSStrings:  null,
            computerCSStrings: null,
            selectedStudentCommitments: [],
            selectedComputerCommitments: [],
        };
        this.handleMoveTypeChange= this.handleMoveTypeChange.bind(this);
        this.handleMoveAntecedentChange = this.handleMoveAntecedentChange.bind(this);
        this.handleMoveConsequentChange = this.handleMoveConsequentChange.bind(this);
        this.handleStudentCommitmentClick = this.handleStudentCommitmentClick.bind(this);
        this.handleComputerCommitmentClick = this.handleComputerCommitmentClick.bind(this);
        this.handleImpliesChange = this.handleImpliesChange.bind(this);
        this.inputIsValid = this.inputIsValid.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        this._dialogueManager.start();
    }

    componentDidUpdate() {
        this.scrollToBottom("dialogue-history-boundary");
    }

    update() {
        this.setState({
            debateLog: this._dialogueManager.dialogueHistory.moveStrings,
            studentCS: this._dialogueManager.studentCS,
            computerCS: this._dialogueManager.computerCS,
            studentCSStrings: this.getCommitments(this._dialogueManager.studentCS),
            computerCSStrings: this.getCommitments(this._dialogueManager.computerCS),

            moveTypes: this._dialogueManager.moveTypes,
            moveContents: this._dialogueManager.moveContents,
            moveContentsStrings: this.getContents(this._dialogueManager.moveContents),

            selectedType: this._dialogueManager.moveTypes[0],
            selectedAntecedent: this._dialogueManager.moveContents[0],
            selectedConsequent: this._dialogueManager.moveContents[0],
            selectedAntecedentString: this.state.moveContentsStrings[0],
            selectedConsequentString: this.state.moveContentsStrings[0],
        });
    }

    updateDisableUneededInputs(boolean) {
        this.setState({
            disableUneededInputs: boolean,
        });
    }

    inputIsValid() {
        if (this.state.moveTypes.includes(this.state.selectedType)) {
            if (this.state.moveContents.includes(this.state.selectedAntecedent)) {
                if (this.state.implies === false) {
                    return true;
                } else {
                    if (this.state.moveContents.includes(this.state.selectedConsequent)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    getCommitments(commitmentStore) {
        if (commitmentStore !== null && commitmentStore !== undefined) {
            return commitmentStore.totalList.map((commitment) => {
                if (commitmentStore.onAssertion(commitment) === false) {
                    return "* " + commitment.getContentAsString();
                } else {
                    return "  " + commitment.getContentAsString();
                }
            });
        } else {
            return [];
        }
    }

    getContents(moveContents) {
        if (moveContents !== null && moveContents !== undefined) {
            return moveContents.map((content) => content.getContentAsString());
        }
        return [];
    }

    getRulePropFromString(string, stringArray, rulePropArray) {
        let index= stringArray.indexOf(string);
        return rulePropArray[index];
    }

    handleMoveTypeChange(event) {
        this.setState({selectedType: event.target.value});
    }

    handleMoveAntecedentChange(event) {
        let ruleProp = this.getRulePropFromString(event.target.value, this.state.moveContentsStrings, this.state.moveContents);
        this.setState({selectedAntecedent: ruleProp});
        this.setState({selectedAntecedentString: event.target.value});
    }

    handleMoveConsequentChange(event) {
        let ruleProp = this.getRulePropFromString(event.target.value, this.state.moveContentsStrings, this.state.moveContents);
        this.setState({selectedConsequent: ruleProp});
        this.setState({selectedConsequentString: event.target.value});
    }

    handleImpliesChange(event) {
        if (event.target.value === "implies...") {
            this.setState({implies: true});
        } else {
            this.setState({implies: false});
        }
    }

    handleStudentCommitmentClick(event) {
        // Update ClassName to apply new style
        if (event.target.className === "commitmentstore__listelement") {
            event.target.className = "commitmentstore__listelement__clicked";
        } else {
            event.target.className = "commitmentstore__listelement";
        }

        let ruleProp = this.getRulePropFromString(event.target.textContent, this.state.studentCSStrings, this.state.studentCS.totalList);

        // If the element is clicked then we want to add it, if not then we want to remove it
        if (event.target.className === "commitmentstore__listelement__clicked") {
            let newState = this.state.selectedStudentCommitments;
            newState.push(ruleProp);
            this.setState({selectedStudentCommitments: newState});
        } else {
            let newState = this.state.selectedStudentCommitments;
            newState.splice(this.state.selectedStudentCommitments.indexOf(ruleProp),1);
            this.setState({selectedStudentCommitments: newState});
        }
    }

    handleComputerCommitmentClick(event) {
        if (event.target.className === "commitmentstore__listelement") {
            event.target.className = "commitmentstore__listelement__clicked";
        } else {
            event.target.className = "commitmentstore__listelement";
        }

        //Event.target.value is the position in the html list element starting at 0
        let ruleProp = this.getRulePropFromString(event.target.textContent, this.state.computerCSStrings, this.state.computerCS.totalList);

        // If the element is clicked then we want to add it, if not then we want to remove it
        if (event.target.className === "commitmentstore__listelement__clicked") {
            let newState = this.state.selectedComputerCommitments;
            newState.push(ruleProp);
            this.setState({selectedComputerCommitments: newState});
        } else {
            let newState = this.state.selectedComputerCommitments;
            newState.splice(this.state.selectedComputerCommitments.indexOf(ruleProp),1);
            this.setState({selectedComputerCommitments: newState});
        }
    }

    handleTabClick(event) {
        if (event.target.classList.contains("commitmenttabs__tabbutton") || event.target.classList.contains("commitmenttabs__tabedge")) {
            event.target = event.target.parentElement;

            if (event.target.classList.contains("commitmenttabs__tabbuttonarea__clicked")) {
                event.target.classList.remove("commitmenttabs__tabbuttonarea__clicked");
                event.target.parentElement.classList.remove("commitmenttabs__tab__open");

                event.target.nextSibling.classList.add("commitmenttabs__store__hidden");
            } else {
                event.target.classList.add("commitmenttabs__tabbuttonarea__clicked");
                event.target.parentElement.classList.add("commitmenttabs__tab__open");
                event.target.nextSibling.classList.remove("commitmenttabs__store__hidden");
            }
        }
    }

    handleBackButtonClick() {
        this.props.homePage.setState({active: true, debateActive: false});
    }

    clearInput(event) {
        if (event.target.value !== null && event.target.value !== undefined) {
            event.target.value = "";
        }
    }

    clearAllFields() {
        document.getElementById("movechoice-input").value = "";
        document.getElementById("antecedent-input").value = "";
        document.getElementById("consequent-input").value = "";
        document.getElementById("impliesbox-input").value = "";
        this.setState({implies: false});
    }

    scrollToBottom(divId) {
        var objDiv = document.getElementById(divId);
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    render() {
        return (
            <div id="debate-system" className={this.props.active ? "debatesystem" : "hidden"}>
                <div className="uppersection">
                    <div className="debatehistory">
                        <div className="debatehistorydialogue">
                            <div id="dialogue-history-boundary" className="debatehistorydialogue__boundary">
                                <DialogueHistory dialogueHistory={this.state.debateLog}/>
                            </div>
                        </div>
                        <div className="commitmenttabs">
                            <div className="commitmenttabs__tabcontainer">
                                <CommitmentStoreTab owner="Student" className={"commitmenttabs__studentcs"} onTabClick={this.handleTabClick} onCommitmentClick={this.handleStudentCommitmentClick} commitmentStore={this.state.studentCSStrings}/>
                            </div>
                            <div className="commitmenttabs__tabcontainer">
                                <CommitmentStoreTab owner="Computer" className={"commitmenttabs__computercs"}  onTabClick={this.handleTabClick} onCommitmentClick={this.handleComputerCommitmentClick} commitmentStore={this.state.computerCSStrings}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lowersection">
                    <div className="userinput">
                        <div className="userinput__backbuttonarea">
                            <div className="userinput__backbuttoncontainer">
                                <button className={"unselectable userinput__backbutton"}
                                        onClick={this.handleBackButtonClick}>
                                        {"<"}
                                </button>
                            </div>
                        </div>
                        <div className="userinput__inset">
                            <div className="userinput__inputarea">
                                <div className="userinput__inputarea__inputs">
                                    <div className="userinput__movetype">
                                        <MoveChoiceInput onChange={this.handleMoveTypeChange} onFocus={this.clearInput} moveTypes={this.state.moveTypes}/>
                                    </div>
                                    <div className="userinput__movecontent">
                                        <MoveContentInput selected={this.state.selectedAntecedentString} propositionType="antecedent" onChange={this.handleMoveAntecedentChange} onFocus={this.clearInput} moveContents={this.state.moveContentsStrings} disabled={this.state.disableUneededInputs}/>
                                    </div>
                                    <div className="userinput__implytextbox">
                                        <ImpliesInput onChange={this.handleImpliesChange} onFocus={this.clearInput} disabled={this.state.disableUneededInputs}/>
                                    </div>
                                    <div className="userinput__movecontent">
                                        <MoveContentInput selected={this.state.selectedConsequentString} propositionType="consequent" onChange={this.handleMoveConsequentChange} onFocus={this.clearInput} moveContents={this.state.moveContentsStrings} disabled={this.state.disableUneededInputs || !this.state.implies}/>
                                    </div>
                                </div>
                            </div>
                            <div className="userinput__buttonsection">
                                <div className="userinput__inputbutton">
                                    <button className={"unselectable userinput__button " + (!this.inputIsValid() ? "userinput__button__disabled" : "")}
                                            onClick={() => { this._dialogueManager.actionPerformed(); this.clearAllFields();}}
                                            disabled={!this.inputIsValid()}>
                                            {">>"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
/* eslint-disable no-unused-vars */

function MoveChoiceInput(props) {
    let moveChoices;
    if (props.moveTypes !== null && props.moveTypes !== undefined) {
        moveChoices = props.moveTypes.map((moveChoice) => <option value={moveChoice}/>);
    }
    return (
        <div id="movechoice-datalist">
            <input id="movechoice-input" type="text" list="types" onChange={props.onChange} onFocus={props.onFocus} placeholder={props.moveTypes[0]}/>
            <datalist id="types">
                {moveChoices}
            </datalist>
        </div>
    );
}

function MoveContentInput(props) {
    let moveContents;
    if (props.moveContents !== null && props.moveContents !== undefined) {
        moveContents = props.moveContents.map((moveContent) => <option value={moveContent}/>);
    }
    return (
        <div id={props.propositionType + "-datalist"}>
            <input id={props.propositionType + "-input"} type="text" list={props.propositionType + "-contents"} onChange={props.onChange} onFocus={props.onFocus} placeholder={props.moveContents[0]} disabled={props.disabled}/>
            <datalist id={props.propositionType + "-contents"}>
                {moveContents}
            </datalist>
        </div>
    );

}

function ImpliesInput(props) {
    return (
        <div id="impliesbox">
            <input id="impliesbox-input" type="text" list="implies" onChange={props.onChange} onFocus={props.onFocus} placeholder="implies..." disabled={props.disabled}/>
            <datalist id="implies">
                <option value=""/>
                <option value="implies..."/>
            </datalist>
        </div>
    );
}

function CommitmentStore(props) {
    let commitments;
    if (props.commitmentStore !== null && props.commitmentStore !== undefined) {
        commitments = props.commitmentStore.map((commitment) => <li className="commitmentstore__listelement" onClick={props.onClick}>{commitment}</li>);
    }
    return (
        <div id={props.owner}>
            <ul className="commitmentstore__list">{commitments}</ul>
        </div>
    );
}

function CommitmentStoreTab(props) {
    return (
        <div className="commitmenttabs__tab">
            <div className="commitmenttabs__tabbuttonarea" onClick={props.onTabClick}>
                <div className="commitmenttabs__tabbutton unselectable">
                    {props.owner + " Commitments"}
                </div>
                <div className="commitmenttabs__tabedge"></div>
            </div>
            <div className={"commitmenttabs__store commitmenttabs__store__hidden " + props.className + "__store"}>
                <CommitmentStore owner={props.owner} onClick={props.onCommitmentClick} commitmentStore={props.commitmentStore}/>
            </div>
        </div>
    );
}

function DialogueHistory(props) {
    let dialogue;
    if (props.dialogueHistory !== null && props.dialogueHistory !== undefined) {
        dialogue = props.dialogueHistory.map((move) => {
            return (
                <div className="debatehistorydialogue__logitem">
                    <div className="debatehistorydialogue__turncolumn debatehistorydialogue__logitemturn">
                        <li className="debatehistory__listitem">{move.split(">")[0]+ ">"}</li>
                    </div>
                    <div className="debatehistorydialogue__logitemcontent">
                        <li className="debatehistory__listitem">{move.split(">")[1]}</li>
                    </div>
                </div>
            );
        });
    }
    return (
        <div id="debate-history" className="debatehistorydialogue__log">
            <ul className="debatehistorydialogue__list">{dialogue}</ul>
            <div className="debatehistorydialogue__turncolumn debatehistorydialogue__turncolumnholder"/>
        </div>
    );
}

import { DialogueManager } from "./dialogueManager";
import { Proposition } from "./proposition";
import { Move } from "./move";
//import { InterfaceManager } from "./interfaceManager";
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
            hideUneededInputs: true,

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
    }

    componentDidMount() {
        this._dialogueManager.start();
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

    updateMoveVisibility(boolean) {
        this.setState({
            hideUneededInputs: boolean,
        });
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

    render() {
        return (
            <div id="debate-system">
                <div id="commitment-store" className="commitmentstore">
                    <div className="commitmentstore__box">
                        <div className="commitmentstore__title">My Commitments:</div>
                        <div className="commitmentstore__boundary">
                            <div id="student-store" className="commitmentstore__studentstore">
                                <CommitmentStore owner={"Student"} onClick={this.handleStudentCommitmentClick} commitmentStore={this.state.studentCSStrings}/>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="commitmentstore__box">
                        <div className="commitmentstore__title">Computer Commitments:</div>
                        <div className="commitmentstore__boundary">
                            <div id="computer-store" className="commitmentstore__computerstore">
                                <CommitmentStore owner={"Computer"} onClick={this.handleComputerCommitmentClick} commitmentStore={this.state.computerCSStrings}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="debatehistory">
                    <div className="debatehistory__boundary">
                        <DialogueHistory dialogueHistory={this.state.debateLog}/>
                    </div>
                </div>
                <div className="userinput">
                    <div className="userinput__inset">
                        <div className="userinput__typesection">
                            <div className="userinput__label">Move Type:</div>
                            <div className="userinput__movetype">
                                <MoveChoiceDropdown selected={this.state.selectedType} onChange={this.handleMoveTypeChange} moveTypes={this.state.moveTypes}/>
                            </div>
                            <div className={this.state.hideUneededInputs ? "userinput__label__HIDDEN" :"userinput__label"}>Implies</div>
                            <div className={this.state.hideUneededInputs ? "userinput__implycheckbox__HIDDEN" :"userinput__implycheckbox"}>
                                <ImplyCheckbox onClick={() => this.setState( {implies: !this.state.implies,})} />
                            </div>
                        </div>
                        <div className={this.state.hideUneededInputs ? "userinput__contentsection__HIDDEN" :"userinput__contentsection"}>
                            <div className="userinput__label">Antecedent:</div>
                            <div className="userinput__movecontent">
                                <MoveContentDropdown selected={this.state.selectedAntecedentString} propositionType="antecedent" onChange={this.handleMoveAntecedentChange} moveContents={this.state.moveContentsStrings}/>
                            </div>
                            <div className="userinput__label">Consequent:</div>
                            <div className="userinput__movecontent">
                                <MoveContentDropdown selected={this.state.selectedConsequentString} propositionType="consequent" onChange={this.handleMoveConsequentChange} moveContents={this.state.moveContentsStrings}/>
                            </div>
                        </div>
                        <div className="userinput__buttonsection">
                            <div className="userinput__inputbutton">
                                <InputButton onClick={() => { this._dialogueManager.actionPerformed(); }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
//_dialogueManager.dialogueHistory.add(new Move("S","Concession", new Proposition("CP is acceptable", true)));}}/>

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

function MoveChoiceDropdown(props) {
    let moveChoice;
    if (props.moveTypes !== null && props.moveTypes !== undefined) {
        moveChoice= props.moveTypes.map((moveChoice) => <option value={moveChoice}>{moveChoice}</option>);
    }

    return (
        <div id="movechoice-dropdown">
            <select className="userinput__movetypeselect" value={props.selected} onChange={props.onChange}>{moveChoice}</select>
        </div>
    );
}

function MoveContentDropdown(props) {
    let moveContents;
    if (props.moveContents !== null && props.moveContents !== undefined) {
        moveContents = props.moveContents.map((moveContent) => <option value={moveContent}>{moveContent}</option>);


    }
    return (
        <div id={props.propositionType}>
            <select className="userinput__movecontentselect" value={props.selected} onChange={props.onChange}>{moveContents}</select>
        </div>
    );

}

function InputButton(props) {
    return (
        <div id="moveinput-button">
            <button className="userinput__button"
                    onClick={props.onClick}>
                    Enter
            </button>
        </div>
    );
}

function DialogueHistory(props) {
    let dialogue;
    if (props.dialogueHistory !== null && props.dialogueHistory !== undefined) {
        dialogue = props.dialogueHistory.map((move) => <li className="debatehistory__listitem">{move}</li>);
    }
    return (
        <div id="debate-history">
            <ul className="debatehistory__list">{dialogue}</ul>
        </div>
    );
}

function ImplyCheckbox(props) {
    return (
            <div id="imply-checkbox" cla>
                <input type="checkbox" name="implies" onClick={props.onClick}/>
            </div>
    );
}

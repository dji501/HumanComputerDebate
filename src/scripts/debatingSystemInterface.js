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
            studentCS: null,
            computerCS: null,
            moveTypes: [],
            moveContents: [],
            implies: false,

            selectedType: "Yes",
            selectedAntecedent: null,
            selectedConsequent: null,
            selectedAntecedentString: null,
            selectedConsequentString: null,
            moveContentsStrings: [],
        };
        this.handleMoveTypeChange= this.handleMoveTypeChange.bind(this);
        this.handleMoveAntecedentChange = this.handleMoveAntecedentChange.bind(this);
        this.handleMoveConsequentChange = this.handleMoveConsequentChange.bind(this);
    }

    componentDidMount() {
        this._dialogueManager.start();
    }

    update() {
        this.setState({
            debateLog: this._dialogueManager.dialogueHistory.moveStrings,
            studentCS: this.getCommitments(this._dialogueManager.studentCS.totalList),
            computerCS: this.getCommitments(this._dialogueManager.computerCS.totalList),
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

    getCommitments(commitmentStore) {
        if (commitmentStore !== null && commitmentStore !== undefined) {
            return commitmentStore.map((commitment) => commitment.getContentAsString());
        }
        return [];
    }

    getContents(moveContents) {
        if (moveContents !== null && moveContents !== undefined) {
            return moveContents.map((content) => content.getContentAsString());
        }
        return [];
    }

    getSelectedRuleProp(text) {
        let index = this.state.moveContentsStrings.indexOf(text);
        return this.state.moveContents[index];
    }

    handleMoveTypeChange(event) {
        this.setState({selectedType: event.target.value});
    }

    handleMoveAntecedentChange(event) {
        let ruleProp = this.getSelectedRuleProp(event.target.value);
        this.setState({selectedAntecedent: ruleProp});
    }

    handleMoveConsequentChange(event) {
        let ruleProp = this.getSelectedRuleProp(event.target.value);
        this.setState({selectedConsequent: ruleProp});
    }

    render() {
        return (
            <div id="debate-system">
                <div id="commitment-store" className="commitmentstore">
                    <div className="commitmentstore__box">
                        <div className="commitmentstore__title">My Commitments:</div>
                        <div className="commitmentstore__boundary">
                            <div id="student-store" className="commitmentstore__studentstore">
                                <CommitmentStore owner={"Student"} commitmentStore={this.state.studentCS}/>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="commitmentstore__box">
                        <div className="commitmentstore__title">Computer Commitments:</div>
                        <div className="commitmentstore__boundary">
                            <div id="computer-store" className="commitmentstore__computerstore">
                                <CommitmentStore owner={"Computer"} commitmentStore={this.state.computerCS}/>
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
                            <div className="userinput__label">Implies</div>
                            <div className="userinput__implycheckbox">
                                <ImplyCheckbox onClick={() => this.setState( {implies: !this.state.implies,})} />
                            </div>
                        </div>
                        <div className="userinput__contentsection">
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
        commitments= props.commitmentStore.map((commitment) => <li>{commitment}</li>);
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
            <select className="userinput_movetypeselect" value={props.selected} onChange={props.onChange}>{moveChoice}</select>
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
            <select className="userinput_movecontentselect" value={props.selected} onChange={props.onChange}>{moveContents}</select>
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
            <div id="imply-checkbox">
                <input type="checkbox" name="implies" onClick={props.onClick}/>
            </div>
    );
}

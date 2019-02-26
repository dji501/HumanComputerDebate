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
            moveTypes: null,
            moveContents: null
        };

        //this._interfaceManager = new InterfaceManager(this);
        this._dialogueManager.start();
    }

    update() {
        this.setState({
            debateLog: this._dialogueManager.dialogueHistory.moveStrings,
            studentCS: this.getCommitments(this._dialogueManager.studentCS.totalList),
            computerCS: this.getCommitments(this._dialogueManager.computerCS.totalList),
            moveTypes: null,
            moveContents: null
        });
    }

    getCommitments(commitmentStore) {
        if (commitmentStore !== null && commitmentStore !== undefined) {
            return commitmentStore.map((commitment) => commitment.getContentAsString());
        }
        return [];
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
                        <div className="userinput__movetype">
                            <MoveChoiceDropdown/>
                        </div>
                        <div className="userinput__movecontent">
                            <MoveContentDropdown/>
                        </div>
                        <div className="userinput__inputbutton">
                            <InputButton onClick={() => {this.update();}}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
//_dialogueManager.dialogueHistory.add(new Move("S","Concession", new Proposition("CP is acceptable", true)));}}/>
/*    const commitments = props.commitmentStore.map((commitment) => {
        <li>{commitment.getContentAsString()}</li>;
    });*/
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
    return (
        <div id="movechoice-dropdown">
            <select className="userinput_movetypeselect"></select>
        </div>
    );
}


function MoveContentDropdown(props) {
    return (
        <div id="moveccontent-dropdown">
            <select className="userinput_movecontentselect"></select>
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

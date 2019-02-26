import { DialogueManager } from "./dialogueManager";
import { Proposition } from "./proposition";

//import { InterfaceManager } from "./interfaceManager";
import React from "react";

export class DebatingSystemInterface extends React.Component{
    constructor(props) {
        super(props);

        this._dialogueManager = new DialogueManager(this);
        this._dialogueManager.start();
        //this._interfaceManager = new InterfaceManager(this);
    }

    render() {
        return (
            <div id="debate-system">
                <div id="commitment-store" className="commitmentstore">
                    <div className="commitmentstore__box">
                        <div className="commitmentstore__title">My Commitments:</div>
                        <div className="commitmentstore__boundary">
                            <div id="student-store" className="commitmentstore__studentstore">
                                <CommitmentStore owner={"Student"} commitmentStore={this._dialogueManager.studentCS.totalList}/>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="commitmentstore__box">
                        <div className="commitmentstore__title">Computer Commitments:</div>
                        <div className="commitmentstore__boundary">
                            <div id="computer-store" className="commitmentstore__computerstore">
                                <CommitmentStore owner={"Computer"} commitmentStore={this._dialogueManager.computerCS.totalList}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="debatehistory">
                    <div className="debatehistory__boundary">
                        <DialogueHistory dialogueHistory={this._dialogueManager.dialogueHistory.moveStrings}/>
                    </div>
                </div>
                <div className="userinput">
                    <div className="userinput__inset">
                        <div className="userinput__movetype">

                        </div>
                        <div className="userinput__movecontent">

                        </div>
                        <div className="userinput__inputbutton">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
/*    const commitments = props.commitmentStore.map((commitment) => {
        <li>{commitment.getContentAsString()}</li>;
    });*/
function CommitmentStore(props) {
    let commitments;
    if (props.commitmentStore !== null && props.commitmentStore !== undefined) {
        commitments = props.commitmentStore.map((commitment) => <li className="commitmentStore__listElement">{commitment.getContentAsString()}</li>);
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

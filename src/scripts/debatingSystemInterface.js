import { DialogueManager } from "./dialogueManager";
import { Proposition } from "./proposition";

//import { InterfaceManager } from "./interfaceManager";
import React from "react";

export class DebatingSystemInterface extends React.Component{
    constructor(props) {
        super(props);

        this._dialogueManager = new DialogueManager(this);
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
                <div className="debatehistory"></div>
                <div className="userinput">
                    <div>

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
    const commitments = props.commitmentStore.map((commitment) => <li className="commitmentStore_listElement">{commitment.getContentAsString()}</li>);
    return (
        <div id={props.owner}>
            <ul className="commitmentstore__list">{commitments}</ul>
        </div>
    );
}

function GoButton(props) {
    return (
        <button className="userinput__button"
                onClick={props.onClick}>
                Go!
        </button>
    );
}

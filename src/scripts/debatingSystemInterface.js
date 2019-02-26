import { DialogueManager } from "./dialogueManager";
//import { InterfaceManager } from "./interfaceManager";
import React from "react";

export class DebatingSystemInterface extends React.Component{
    constructor(props) {
        super(props);

        this._northPanel;
        this._panel1;
        this._panel2;
        this._nLeft;
        this._nRight;
        this._middlePanel;
        this._southPanel;
        this._sRight;
        this._sLeft = {
            onClick: () => {
                alert("A");
            }
        };

        this._dialogueManager = new DialogueManager(this);
        //this._interfaceManager = new InterfaceManager(this);
    }

    render() {
        return (
            <div id="debate-system">
                <div id="commitment-store" class="commitmentstore">
                    <div id="student-store" class="commitmentstore__studentstore"></div>
                    <hr></hr>
                    <div id="computer-store" class="commitmentstore__computerstore"></div>
                </div>
                <div class="debatehistory"></div>
                <div class="userinput">
                    <div>
                        {this.goButton(this._sLeft)}
                    </div>
                </div>
            </div>
        );
    }

    goButton(props) {
        return (
            <button className="userinput__button"
                    onClick={props.onClick}>
                    Go!
            </button>
        );
    }
}

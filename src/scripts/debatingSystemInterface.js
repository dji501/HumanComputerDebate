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
        this._sLeft;

        this._dialogueManager = new DialogueManager(this);
        this._interfaceManager = new InterfaceManager(this);
    }

    render() {
        return (
            <div>
                {this.goButton()}
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

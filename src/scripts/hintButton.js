import { DialogueManager } from "./dialogueManager";
import { GuidanceBar } from "./guidancebar";

import React from "react";

export class HintButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className={"unselectable userinput__hintbutton"}
                    onClick={"A"}>
                    {"?"}
            </button>
        );
    }
}

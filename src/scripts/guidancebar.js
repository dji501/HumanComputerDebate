import React from "react";

export class GuidanceBar extends React.Component {
    constructor(props) {
        super(props);
    }

    getTextFromState() {
        switch(this.props.state) {
            case 0:
                return "Welcome to the debate screen! Please choose a response to the computer's question!";
            case 1:
                return "Please choose a response to the computer's question";
            case 2:
                return "Choose how you want to start your move";
            case 3:
                return "Next, select the content you want your move to contain and press the enter button";
            case 4:
                return "Next, choose the statement you want to question the computer on";
            case 5:
                return "Next, select a commitment from the computer's commitment tab that you wish to question";
            case 6:
                return "Select a commitment from your commitment store that you wish to remove";
            case 7:
                return "Select two or three conflicting commitments from the computer's commitment tab that you want it to resolve";
            case 99:
                return "The debate is over as somebody has changed or given up their view";
        }
    }

    render() {
        return (
            <div className="userinput__guidancearea">
                {this.getTextFromState()}
            </div>
        );
    }
}

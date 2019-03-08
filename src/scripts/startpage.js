import React from "react";
import { DebatingSystemInterface } from "./debatingSystemInterface.js";

export class StartPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: true,
            debateActive: false,
            selectedDebate: "Capital Punishment",
        };

        this.startDebate = this.startDebate.bind(this);
    }

    startDebate() {
        this.setState({ active: false,
                        debateActive: true,
                      });

    }

    render() {
        return (
            <div id="webapplication">
                <div id="start-page" className={this.state.active ? "startpage" : "hidden"}>
                    <div className="startpage__titlearea">
                        <div className="startpage__titleareatitle"><h1>Human Computer Debate</h1></div>
                        <div className="startpage__titleareadescription"><p>This is a program to enable debate between a human and a computer</p></div>
                    </div>
                    <div className="startpage__startarea">
                        <div className="startpage__startareadropdown">
                            <TopicDropdown />
                        </div>
                        <div className="startpage__startareabutton">
                            <GoButton onClick={() => {this.startDebate();}} />
                        </div>
                    </div>
                    <div className="startpage__menuarea">

                    </div>
                </div>
            <DebatingSystemInterface active={this.state.debateActive} key={this.state.debateActive} startPage={this}/>
            </div>
        );
    }
}

function TopicDropdown(props) {
    return (
        <div className="startpage__topicdropdown">
            <select id="topic-dropdown">
                <option value="Capital Punishment">Capital Punishment</option>
            </select>
        </div>
    );
}

function GoButton(props) {
    return (
        <div className="startpage__gobuttoncontainer">
            <button id="go-button" type="button" className="startpage__gobutton" onClick={props.onClick}>
            Start!
            </button>
        </div>
    );
}

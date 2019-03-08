import React from "react";
import { DebatingSystemInterface } from "./debatingSystemInterface.js";

export class HomePage extends React.Component {

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
                <div id="home-page" className={this.state.active ? "homepage" : "hidden"}>
                    <div className="homepage__titlearea">
                        <div className="homepage__titleareatitle"><h1>Human Computer Debate</h1></div>
                        <div className="homepage__titleareadescription"><p>This is a program to enable debate between a human and a computer</p></div>
                    </div>
                    <div className="homepage__startarea">
                        <div className="homepage__startareadropdown">
                            <TopicDropdown />
                        </div>
                        <div className="homepage__startareabutton">
                            <GoButton onClick={() => {this.startDebate();}} />
                        </div>
                    </div>
                    <div className="homepage__menuarea">

                    </div>
                </div>
            <DebatingSystemInterface active={this.state.debateActive} key={this.state.debateActive} homePage={this}/>
            </div>
        );
    }
}

function TopicDropdown(props) {
    return (
        <div className="homepage__topicdropdown">
            <select id="topic-dropdown">
                <option value="Capital Punishment">Capital Punishment</option>
            </select>
        </div>
    );
}

function GoButton(props) {
    return (
        <div className="homepage__gobuttoncontainer">
            <button id="go-button" type="button" className="homepage__gobutton" onClick={props.onClick}>
            Start!
            </button>
        </div>
    );
}

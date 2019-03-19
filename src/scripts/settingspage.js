import React from "react";

export class SettingsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            hidePastDialogueSettings: false,
        };
    }

    render() {
        return (
            <div id="settings-page" className={this.state.active ? "settingspage" : "hidden"}>
                <div className="settingspage__titlearea">
                    <div className="settingspage__titleareatitle"><h1>Settings:</h1></div>
                </div>
                <div className="settingspage__settingsarea">
                    <div className="settingspage__settingsareaoption">

                    </div>
                </div>
                <div className="settingspage__backbuttonarea">
                    <div className="userinput__backbuttoncontainer">
                        <button className={"userinput__backbutton"}
                                onClick={this.handleBackButtonClick}>
                                {"<"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

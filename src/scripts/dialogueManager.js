import { KBSManager } from "./kbsManager";
import { DialogueHistory } from "./dialogueHistory";



export class DialogueManager {
    constructor(dsi) {
        this._debateSystemInterface = dsi;
        this._computerKBS = KBSManager.getCompKBS();
        this._planner;
        this._computerCS;
        this._studentCS;
        this._comuterRelevantMove = [];
        this._dialogueHistory = new DialogueHistory();
        this._gameEnd = false;
        this._line = 2;
    }
}

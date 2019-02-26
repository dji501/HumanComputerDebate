export class DialogueHistory {
    constructor() {
        this._set = [];
        this._moveStrings = [];
    }

    get set() {
        return this._set;
    }

    get moveStrings() {
        return this._moveStrings;
    }

    get length() {
        return this._set.length;
    }

    add(value) {
        if (!(this._set.includes(value))) {
            this._set.push(value);
            this.addToMoveStrings(value);
        }
    }

    addToMoveStrings(value) {
        let previousMove = this.length > 1 ? this._set[this._set.length -2] : null;
        if (previousMove !== null && previousMove !== undefined) {
            this._moveStrings.push(value.getMoveStringForDisplay(this.length, previousMove.moveType,previousMove.moveContent));
        } else {
            this._moveStrings.push(value.getMoveStringForDisplay(this.length, null,null));
        }

    }
    /**
     * contains - Find if a question has already been asked
     *
     * @param  {Move} move move to check against
     * @return {boolean} true if exists in history false if not.
     */
    contains(move) {
        for (let i = 0; i < this._set.length; i++) {
            let listMove  = this._set[i];
            if (listMove.equals(move)) {
                return true;
            }
        }
        return false;
    }
}

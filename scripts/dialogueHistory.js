export class DialogueHistory {
    constructor() {
        this._set = [];
    }

    get set() {
        return this._set;
    }

    get length() {
        return this._set.length;
    }

    add(value) {
        if (!(this._set.includes(value))) {
            this._set.push(value);
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

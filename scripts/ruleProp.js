export class RuleProp {
    constructor() {
        if (new.target === RuleProp) {
            throw new TypeError("Cannot construct RuleProp instances directly");
        }
        if (this.getContentAsString === undefined) {
            throw new TypeError("Must override getContentAsString method");
        }
    }
}

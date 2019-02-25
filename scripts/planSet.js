import { Move } from "./move";

export class PlanSet {
    constructor() {
        this._set = [];
    }

    get set() {
        return this._set;
    }

    add(value) {
        if (!(this._set.includes(value))) {
            this._set.push(value);
        }
    }

    /**
     * getHardEvidentialMove - get a hard evidential move from the planset
     *
     * @param  {CommitmentStore} selfCS The caller's own CommitmentStore
     * @return {Move}  the hard evidential move to be returned
     */
    getHardEvidentialMove(selfCS) {
        for (let i = 0; i < this._set.length; i++) {
            let plan = this._set[i];

            if (plan.set.length === 2) {
                let proposition = plan.set[0];

                if (proposition.isEvidence() && selfCS.onClaimStack(proposition) === false) {
                    return new Move("C", "Assertion", proposition);
                }
            }
        }
        return null;
    }


    /**
     * getQuestionMove - If the current support cannot be support get a question plan for 2 elements only
     *
     * @param  {DialogueHistory} dialogueHistory history of the current dialogue
     * @param  {Planner} planner  the computer player planner
     * @return {Move}    the question move to be returned.
     */
    getQuestionMove(dialogueHistory, planner) {
        for (let i = 0; i < this._set.length; i++) {
            let plan = this._set[i];
            let proposition = plan.set[0];

            if (plan.set.length === 2) {
                if (dialogueHistory.contains(new Move("C","Question",proposition)) === false) {
                    planner.currentPlan = plan;
                    return planner.currentPlan.start();
                }
            }
        }
        return null;
    }

    /**
     * getRebuttalMove - This method will produce a rebuttal move that can be further supported
     *
     * @param  {CommitmentStore} selfCS    the callers CommitmentStore
     * @param  {CommitmentStore} partnerCS the parteners CommitmentStore
     * @return {Move} the rebuttal move to be returned
     */
    getRebuttalMove(selfCS, partnerCS) {
        for (let i = 0; i < this._set.length; i++) {
            let plan = this._set[i];

            if (plan.set.length > 2) {
                let lastProp = plan.set[plan.set.length-1];
                let secondToLastProp = plan.set[plan.set.length-2];

                if (selfCS.onClaimStack(lastProp) === false && (selfCS.onTotal(lastProp) && partnerCS.onTotal(lastProp)) === false) {
                    return new Move("C", "Assertion", lastProp);
                } else if (selfCS.onClaimStack(secondToLastProp) === false && (selfCS.onTotal(secondToLastProp) && partnerCS.onTotal(secondToLastProp)) === false) {
                    return new Move("C", "Assertion", secondToLastProp);
                }
            }
        }
        return null;
    }

    /**
     * startSubtopic  Method used by computer to start a subtopic if a support proposition can be further supported.
     *
     * @param  {CommitmentStore} selfCS    the callers CommitmentStore
     * @param  {CommitmentStore} partnerCS the parteners CommitmentStore
     * @return {Move} the supprting move to be returned
     */
    startSubtopic(selfCS, partnerCS) {
        let subtopic = [];
        for (let i = 0; i < this._set.length; i++) {
            let plan = this._set[i];

            if (plan.set.length > 2) {
                let secondToLastProp = plan.set[plan.set.length-2];

                if (selfCS.onClaimStack(secondToLastProp) === false && (selfCS.onTotal(secondToLastProp) && partnerCS.onTotal(secondToLastProp)) === false) {
                    subtopic.push(secondToLastProp);
                }
            }
        }

        /*
            Random Basis
        */
        if (subtopic.length > 0) {
            let i = Math.round(Math.random() * (subtopic.length - 1));
            return new Move("C", "Assertion", subtopic[i]);
        } else {
            return null;
        }
    }

    startBuildPlan(dialogueHistory, planner) {
        let questionPlan = [];

        for (let i = 0; i < this._set.length; i++) {
            let plan = this._set[i];
            let proposition = plan.set[0];

            if (plan.set.length > 2) {
                if (dialogueHistory.contains(new Move("C","Question",proposition)) === false) {
                    questionPlan.push(plan);
                }
            }
        }
        /*
            Randomly choose a plan
        */
        if (questionPlan.length > 0) {
            let i = Math.round(Math.random() * questionPlan.length);
            planner.currentPlan = questionPlan[i];
            return planner.currentPlan.start();
        } else {
            return null;
        }
    }
}

import { Move } from "./move";

export class TacticManager {

    static getAction(propositionFocus, dialogueHistory, selfCS, partnerCS, selfKBS, planner) {
        let response = null;

        if (propositionFocus.equals(planner.computerThesis.denial())) {
            // If previous move is Students thesis then switch to the thesis level discussion
            response = null;
        } else {
            // fire the heuristic agent against the previous move

            // 1. If there is a conflict and the demolish target is an element then issue resolution demand
            let conflictSet = partnerCS.getRealConflictSet();
            if (conflictSet.set.length > 0 && conflictSet.includes(propositionFocus)) {
                let proposition = conflictSet.mergeIntoProposition();
                response = new Move("C","Resolve",proposition,conflictSet);
            }

            // 2. If there is a contradicted hard evidence and hard evidence has not been asserted
            //  then assert it.
            let planSet = selfKBS.getPlanSet(propositionFocus.denial());
            if (response === null || response === undefined) {
                response = planSet.getHardEvidentialMove(selfCS);
            }

            // 3. If there is a support which can be further supported or
            // If the demolish target is not on the assertion set, then assert the negation of the
            // demolish target, else assert the support
            let i = Math.round(Math.random() * 2);
            i=0;
            switch (i) {
                case 0:
                    if (response === null || response === undefined) {
                        response = planSet.startSubtopic(selfCS, partnerCS);
                    }
                    if (response === null || response === undefined) {
                        response = planSet.startBuildPlan(dialogueHistory, planner);
                    }
                break;

                case 1:
                    if (response === null || response === undefined) {
                        response = planSet.startBuildPlan(selfCS, partnerCS);
                    }
                    if (response === null || response === undefined) {
                        response = planSet.getRebuttalMove(dialogueHistory, planner);
                    }
                    break;
            }
            // 4. If there is a support which cannot be further supported then form a plan.
            if (response === null || response === undefined) {
                response = planSet.getQuestionMove(dialogueHistory, planner);
            }

            // 5. If the demolish target is challengeable, then challenge it.
            if ((response === null || response === undefined) && selfKBS.challengeable(propositionFocus, partnerCS, selfCS)) {
                response = new Move("C","Challenge", propositionFocus);
            }
        }

        return response;
    }
}

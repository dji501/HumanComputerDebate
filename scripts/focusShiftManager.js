import { Move } from "./move";
import { Proposition } from "./proposition";

export class FocusShiftManager {

    static execute(dialogueHistory, selfCS, partnerCS, selfKBS, planner) {
        let response = null;
        let planSet = selfKBS.getPlanSet(planner.computerThesis);

        let i = Math.round((Math.random() * 1));

        switch(i) {
            case 0:
                // Give priority to subtopic
                if (response === null || response === undefined) {
                    response = planSet.startSubtopic(selfCS, partnerCS);
                }

                if (response === null || response === undefined) {
                    response = planSet.startBuildPlan(dialogueHistory, planner);
                }
                break;
            case 1:
                // Give priority to building a plan
                if (response === null || response === undefined) {
                    response = planSet.startBuildPlan(dialogueHistory, planner);
                }
                if (response === null || response === undefined) {
                    response = planSet.startSubtopic(selfCS, partnerCS);
                }
                break;
        }

        // If neither of those got a response then try build a new plan
        if (response === null || response === undefined) {
            response = planSet.getQuestionMove(dialogueHistory,planner);
        }

        /* Original Comment
        3) Need to consider the demolish strategy
        */
        /*if(response==null&&selfKBS.challengable(planner.computerThesis.denial(), partnerStore, selfStore)) {
        response=new Move('C', "Challenge", planner.computerThesis.denial());
        }*/

        // Otherwise Computer may have nothing to say
        if (response === null || response === undefined) {
            response = new Move("C","Assertion", new Proposition("if you have anything more to say, you can go on", true));
        }

        return response;
    }
}

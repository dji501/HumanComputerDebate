import { Move } from "./move";

export class ChallengeStrategist {

    static planChallProp(previousProposition, currentTurn, partnerCS, selfKBS) {
        let relevantMove = [];

        /* if grounds are already in opponents commitment store*/
        let partnerConflictSet = partnerCS.getRealPremises(previousProposition);
        let acceptableGrounds = selfKBS.findAcceptableGroundPropositions(previousProposition, partnerCS);

        if (partnerConflictSet.set.length > 0) {
            let prop = partnerConflictSet.mergeIntoProposition();
            relevantMove.push(new Move(currentTurn, "Resolve", prop, partnerConflictSet));
        } else if (acceptableGrounds.length > 0) {
            let i = Math.round((Math.random() * (acceptableGrounds.length - 1)));
            relevantMove.push(new Move(currentTurn, "Ground", acceptableGrounds[i]));
        }

        if (relevantMove.length === 0) {
            relevantMove.push(new Move("C","Withdraw",previousProposition));
        }

        return relevantMove;
    }
}

import { Move } from "./move";

export class QuestionStrategist {

    static planQuestion(dialogueHistory, selfCS, partnerCS, selfKBS, planner) {
        let relevantMove = [];
        let previousMove = dialogueHistory.set[dialogueHistory.length-1];
        let prevMoveContent = previousMove.moveContent;

        /*
        When a proposition is questioned
        */
        if (dialogueHistory.length === 1) {
            relevantMove.push(new Move("C","Concession",planner.computerThesis));
        } else if (prevMoveContent.getClassName() === "Proposition") {

            /*
             1 If both (P, -P) cannot be found in KBS, then say No Commitment
            */
            if (selfKBS.checkProp(prevMoveContent) === false && selfKBS.checkProp(prevMoveContent.denial()) === false) {
                relevantMove.push(new Move("C", "Withdraw", prevMoveContent));
            } else if (selfKBS.checkProp(prevMoveContent) === true && selfKBS.checkProp(prevMoveContent.denial()) === false) {
                // If P or -P is in the KBS
                // Check if C has uttered no commitment to the found statement, then no commitmentStore
                // else C would assert the found statement
                if (dialogueHistory.contains((new Move("C","Withdraw",prevMoveContent)))) {
                    relevantMove.push(new Move("C","Withdraw",prevMoveContent));
                } else {
                    relevantMove.push(new Move("C","Concession",prevMoveContent));
                }
            } else if (selfKBS.checkProp(prevMoveContent) === false && selfKBS.checkProp(prevMoveContent.denial()) === true) {
                if (dialogueHistory.contains((new Move("C","Withdraw",prevMoveContent.denial())))) {
                    relevantMove.push(new Move("C","Withdraw",prevMoveContent.denial()));
                } else {
                    relevantMove.push(new Move("C","Concession",prevMoveContent.denial()));
                }
            } else {
                // Both P and -P in the selfKBS
                let inFavour;
                let against;

                if (selfKBS.supports(prevMoveContent, planner.computerThesis) || selfKBS.againstSupport(prevMoveContent,planner.computerThesis.denial())) {
                    inFavour = prevMoveContent;
                    against = prevMoveContent.denial();
                } else {
                    inFavour = prevMoveContent.denial();
                    against = prevMoveContent;
                }

                /*
                 3.1 If C has acceptable support for C's favor statement, then state its favorable one
                */
                if(selfKBS.findAcceptableGroundPropositions(inFavour, partnerCS).length > 0) {
                    relevantMove.push(new Move("C","Concession",inFavour));
                } else if (selfCS.isSupported(against,selfKBS) || selfCS.isConsequence(against)) {
                    /*
                     3.2 If C has no acceptable support for C's favor statement,
                     and C has got reasonable support in his assertion to support "against"
                     C would surrender and state "against" OR against is a consequence of its store
                    */
                    relevantMove.push(new Move("C","Concession",against));
                } else {
                    relevantMove.push(new Move("C","Withdraw",prevMoveContent));
                }
            }
        } else {
            // A rule has changed
            /*
             Since in the current ssystem, a conditional is not challengable,
             C would assert a conditional if it can be found in KBS
             Otherwise, C would say no commitment to it.
            */
            if (selfKBS.matchRule(prevMoveContent) !== null && selfKBS.matchRule(prevMoveContent) !== undefined) {
                relevantMove.push(new Move("C","Concession",prevMoveContent));
            } else {
                relevantMove.push(new Move("C","Withdraw",prevMoveContent));
            }
        }

        return relevantMove;
    }
}

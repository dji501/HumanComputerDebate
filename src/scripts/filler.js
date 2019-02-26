export class Filler {
    static getMessage(studentMove, dialogueHistory, computerCS, studentCS) {
        let message = null;
        let ruleProp = studentMove.moveContent;

        let studentThesis = null;
        let computerThesis = null;

        if (dialogueHistory.length > 1) {
            studentThesis = dialogueHistory.set[1].moveContentProposition.clone();
            computerThesis = studentThesis.denial();
        }

        /*
        1. Illegal Challenge
        */
        if (studentMove.moveType === "Challenge" && computerCS.onAssertion(ruleProp) === false) {
            message = "The statement '" + ruleProp.getContentAsString() + "' is stated by you and agreed by the computer, you can only challenge the statements that the computer has explicitly asserted (without a '*'), please try again!";
        }

        /*
        2. Begging the question
        */
        if (studentMove.moveType === "Ground") {
            if ((computerCS.derivable(ruleProp) === false) && studentCS.onClaimStack(ruleProp)) {
                if (studentCS.onAssertion(ruleProp) === false) {
                    message = "You are begging the question '" + ruleProp.getContentAsString() + "' which you have failed to prove, please try again!";
                } else {
                    message = "You are begging the question '" + ruleProp.getContentAsString() + "' which is under dispute, please try again!";
                }
            }
        }

        /*
        5. Repeat statement
        */
        if (studentMove.moveType === "Assertion" && computerCS.onAssertion(ruleProp) && studentCS.onAssertion(ruleProp)) {
            if (ruleProp.getClassName() === "Proposition") {
                if (ruleProp.equals(computerThesis) === false) {
                    message="The statement '" + ruleProp.getContentAsString() + "', already exists in both positions so it is not necessary to say it, please try other options.";
                }
            } else {
                message="The statement '" + ruleProp.getContentAsString() + "', already exists in both positions so it is not necessary to say it, please try other options.";
            }
        }

        /*
        6	Rule is not well formed exception
        */
        if(ruleProp.getClassName() === "Rule") {

            if(ruleProp.antecedent.equals(ruleProp.consequent)) {
                message = "This is not a sound conditional, the head and the tail should be different (e.g. R implies P), please try again!.";
            }
            else if (ruleProp.antecedent.checkNegation(ruleProp.consequent))
            {
                message = "This is not a valid conditional, a proposition cannot imply the opposite of itself, please try again!";
            }
        }

        return message;
    }
}

import { Proposition } from "./proposition";

export class MoveChoiceInitialiser {

    /**
     * Returns array of game start move type strings
     */
    static initialMoveType()
    {
		let moveTypes = [];
		moveTypes.push("I think..");
		moveTypes.push("Why..? ");
		moveTypes.push("Is it the case that..? ");
		moveTypes.push("I don't know whether.. ");
		moveTypes.push("Please resolve..");
		return moveTypes;
	}


	/**
	 * Returns array of game start move content strings
	 */
	static initialMoveContent()
	{
        let moveContents = [];
		moveContents.push(new Proposition("chances should be given to murderers for rehabilitation",true));
		moveContents.push(new Proposition("chances should be given to murderers for rehabilitation",false));

		moveContents.push(new Proposition("CP is acceptable",true));
		moveContents.push(new Proposition("CP is acceptable",false));

		moveContents.push(new Proposition("CP is a good deterrent",true));
		moveContents.push(new Proposition("CP is a good deterrent",false));

		moveContents.push(new Proposition("execution of murderers is fair for the people being murdered",true));
		moveContents.push(new Proposition("execution of murderers is fair for the people being murdered",false));

		moveContents.push(new Proposition("innocent people may get killed",true));
		moveContents.push(new Proposition("innocent people may get killed",false));

		moveContents.push(new Proposition("it is wrong to take a human life",true));
		moveContents.push(new Proposition("it is wrong to take a human life",false));

		moveContents.push(new Proposition("human lives are scarce",true));
		moveContents.push(new Proposition("human lives are scarce",false));


		moveContents.push(new Proposition("most people want CP back",true));
		moveContents.push(new Proposition("most people want CP back",false));


		moveContents.push(new Proposition("murderers should receive capital punishment",true));
		moveContents.push(new Proposition("murderers should receive capital punishment",false));


		moveContents.push(new Proposition("a state has the right to deliberately execute the wrong people",true));
		moveContents.push(new Proposition("a state has the right to deliberately execute the wrong people",false));

		moveContents.push(new Proposition("nobody is willing to die",true));
		moveContents.push(new Proposition("nobody is willing to die",false));


		moveContents.push(new Proposition("scientific techniques will increase the success of justice",true));
		moveContents.push(new Proposition("scientific techniques will increase the success of justice",false));

		moveContents.push(new Proposition("CP makes people less likely to commit serious crimes",true));
		moveContents.push(new Proposition("CP makes people less likely to commit serious crimes",false));

		moveContents.push(new Proposition("political and racial bias often causes prejudices",true));
		moveContents.push(new Proposition("political and racial bias often causes prejudices",false));


		moveContents.push(new Proposition("there are mistakes during judicial process",true));
		moveContents.push(new Proposition("there are mistakes during judicial process",false));

        moveContents.push(new Proposition("humans can forfeit their right to live though their actions", true));
        moveContents.push(new Proposition("humans can forfeit their right to live though their actions", false));

        moveContents.push(new Proposition("everyone has a human right to live", true));
        moveContents.push(new Proposition("everyone has a human right to live", false));

        moveContents.push(new Proposition("CP is too expensive to maintain", true));
        moveContents.push(new Proposition("CP is too expensive to maintain", false));

        moveContents.push(new Proposition("CP is cheaper than housing criminals for life", true));
        moveContents.push(new Proposition("CP is cheaper than housing criminals for life", false));

        moveContents.push(new Proposition("finances are not important when aiming for justice against criminals", true));
        moveContents.push(new Proposition("finances are not important when aiming for justice against criminals", false));

        moveContents.push(new Proposition("methods of execution are cruel and inhumane", true));
        moveContents.push(new Proposition("methods of execution are cruel and inhumane", false));

        moveContents.push(new Proposition("it is more punishing to be locked up for life than to be executed", true));
        moveContents.push(new Proposition("it is more punishing to be locked up for life than to be executed", false));

		//Fact
		moveContents.push(new Proposition("CP does not give murderers opportunities for rehabilitation",true));
		moveContents.push(new Proposition("CP definitely stops murderers commit further crimes",true));
		moveContents.push(new Proposition("suicide bombers want to die",true));
        moveContents.push(new Proposition("hanging, firing squad, gas chamber, and electrocution are all violent methods used for execution", true));
        moveContents.push(new Proposition("many countries primarily use a lethal injection with anaesthetic to perform capital punishment", true));

		//Evidence
        moveContents.push(new Proposition("CP having countries like the USA have higher murder rates than the UK",true));
		moveContents.push(new Proposition("statistics shows that repeat offences of murders are extremely low",true));
		moveContents.push(new Proposition("statistics shows an increase in murder rate since the abolition of CP",true));
		moveContents.push(new Proposition("the recent survey shows that 60% British people support CP",true));
        moveContents.push(new Proposition("records show that, since 1973, within the US more than 160 people have been released from death row with evidence of their innocence", true));
        moveContents.push(new Proposition("studies show jurors in some states are 3 times more likely to recommend capital punishment for black people in comparison to white people", true));
        moveContents.push(new Proposition("court cases that aim for capital punishment are more expensive than those that do not", true));
        return moveContents;
	}
}

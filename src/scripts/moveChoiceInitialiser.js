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
		moveContents.push(new Proposition("chances should be given to murderers for rehabilitation",true).getContentAsString());
		moveContents.push(new Proposition("chances should be given to murderers for rehabilitation",false).getContentAsString());

		moveContents.push(new Proposition("CP is acceptable",true).getContentAsString());
		moveContents.push(new Proposition("CP is acceptable",false).getContentAsString());

		moveContents.push(new Proposition("CP is a good deterrent",true).getContentAsString());
		moveContents.push(new Proposition("CP is a good deterrent",false).getContentAsString());

		moveContents.push(new Proposition("execution of murderers is fair for the people being murdered",true).getContentAsString());
		moveContents.push(new Proposition("execution of murderers is fair for the people being murdered",false).getContentAsString());

		moveContents.push(new Proposition("innocent people may get killed",true).getContentAsString());
		moveContents.push(new Proposition("innocent people may get killed",false).getContentAsString());

		moveContents.push(new Proposition("it is wrong to take a human life",true).getContentAsString());
		moveContents.push(new Proposition("it is wrong to take a human life",false).getContentAsString());

		moveContents.push(new Proposition("human lives are scarce",true).getContentAsString());
		moveContents.push(new Proposition("human lives are scarce",false).getContentAsString());


		moveContents.push(new Proposition("most people want CP back",true).getContentAsString());
		moveContents.push(new Proposition("most people want CP back",false).getContentAsString());


		moveContents.push(new Proposition("murderers should receive capital punishment",true).getContentAsString());
		moveContents.push(new Proposition("murderers should receive capital punishment",false).getContentAsString());


		moveContents.push(new Proposition("a state has the right to deliberately execute the wrong people",true).getContentAsString());
		moveContents.push(new Proposition("a state has the right to deliberately execute the wrong people",false).getContentAsString());

		moveContents.push(new Proposition("nobody is willing to die",true).getContentAsString());
		moveContents.push(new Proposition("nobody is willing to die",false).getContentAsString());


		moveContents.push(new Proposition("scientific techniques will increase the success of justice",true).getContentAsString());
		moveContents.push(new Proposition("scientific techniques will increase the success of justice",false).getContentAsString());

		moveContents.push(new Proposition("CP makes people less likely commit serious crimes",true).getContentAsString());
		moveContents.push(new Proposition("CP makes people less likely commit serious crimes",false).getContentAsString());

		moveContents.push(new Proposition("political and racial bias often causes prejudices",true).getContentAsString());
		moveContents.push(new Proposition("political and racial bias often causes prejudices",false).getContentAsString());


		moveContents.push(new Proposition("there are mistakes during judicial process",true).getContentAsString());
		moveContents.push(new Proposition("there are mistakes during judicial process",false).getContentAsString());


		//Fact
		moveContents.push(new Proposition("CP having countries like USA has higher murder rate than UK",true).getContentAsString());
		moveContents.push(new Proposition("CP does not give murderers opportunities for rehabilitation",true).getContentAsString());
		moveContents.push(new Proposition("CP definitely stops murderers commit further crimes",true).getContentAsString());
		moveContents.push(new Proposition("suicide bombers want to die",true).getContentAsString());

		//Evidence
		moveContents.push(new Proposition("statistics shows that repeat offences of murders are extremely low",true).getContentAsString());
		moveContents.push(new Proposition("statistics shows an increase in murder rate since the abolition of CP",true).getContentAsString());
		moveContents.push(new Proposition("the recent survey shows that 60% British people support CP",true).getContentAsString());
        return moveContents;
	}
}

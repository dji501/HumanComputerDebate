/* eslint-disable no-unused-vars*/
import { BooleanRuleBase } from "./booleanRuleBase";
import { Proposition } from "./proposition";
import { Rule } from "./rule";

export class KBSManager {

    static getCompKBS() {
        let computerKBS = new BooleanRuleBase("Computer");
        KBSManager.initKBS(computerKBS);
        return computerKBS;
    }

    static initKBS(booleanRuleBase) {
        // Base CP set is from Moore's study on DC
        //Opinions
        let p1=new Proposition("CP is acceptable",true,"opinion",booleanRuleBase);
        let p2=new Proposition("CP is acceptable",false,"opinion",booleanRuleBase);
        let p3=new Proposition("CP is a good deterrent",true,"opinion",booleanRuleBase);
        let p4=new Proposition("CP is a good deterrent",false,"opinion",booleanRuleBase);

        //1 Fact
        let p5=new Proposition("CP having countries like the USA have higher murder rates than the UK",true,"evidence",booleanRuleBase);

        //2 Evidence
        let p6=new Proposition("statistics shows an increase in murder rate since the abolition of CP",true,"evidence",booleanRuleBase);

        //Opinions
        let p7=new Proposition("CP makes people less likely to commit serious crimes", true, "opinion",booleanRuleBase);
        //let p8=new Proposition("CP makes people less likely to commit serious crimes", false, "opinion", booleanRuleBase);
        let p8=new Proposition("nobody is willing to die",true,"opinion",booleanRuleBase);
        let p9=new Proposition("nobody is willing to die",false,"opinion",booleanRuleBase);

        //3 fact
        let p10=new Proposition("suicide bombers want to die",true,"fact",booleanRuleBase);

        //Opinions
        let p11=new Proposition("innocent people may get killed",true,"opinion",booleanRuleBase);
        let p12=new Proposition("innocent people may get killed",false,"opinion",booleanRuleBase);
        let p13=new Proposition("there are mistakes during judicial process",true,"opinion",booleanRuleBase);
        let p14=new Proposition("political and racial bias often causes prejudices",true,"opinion",booleanRuleBase);
        let p15=new Proposition("scientific techniques will increase the success of justice",true,"opinion",booleanRuleBase);
        let p16=new Proposition("most people want CP back",true,"opinion",booleanRuleBase);

        //4 Evidence
        let p17=new Proposition("the recent survey shows that 60% British people support CP",true,"evidence",booleanRuleBase);

        //Opinions
        let p18=new Proposition("it is wrong to take a human life",true,"opinion",booleanRuleBase);
        let p19=new Proposition("it is wrong to take a human life",false,"opinion",booleanRuleBase);
        let p20=new Proposition("a state has the right to deliberately execute the wrong people",true,"opinion",booleanRuleBase);
        let p21=new Proposition("human lives are scarce",true,"opinion",booleanRuleBase);

        //Opinions
        let p22=new Proposition("murderers should receive capital punishment",true,"opinion",booleanRuleBase);
        let p23=new Proposition("execution of murderers is fair for the people being murdered",true,"opinion",booleanRuleBase);

        //fact
        let p24=new Proposition("CP does not give murderers opportunities for rehabilitation",true,"fact",booleanRuleBase);

        //5 Evidence
        let p25=new Proposition("statistics shows that repeat offences of murders are extremely low",true,"evidence",booleanRuleBase);

        //Opinions
        let p26=new Proposition("there are mistakes during judicial process",false,"opinion",booleanRuleBase);

        //Fact
        let p27=new Proposition("CP definitely stops murderers commit further crimes",true,"fact",booleanRuleBase);

        //Opinions
        let p29=new Proposition("murderers should receive capital punishment",false,"opinion",booleanRuleBase);
        let p30=new Proposition("chances should be given to murderers for rehabilitation",true,"opinion",booleanRuleBase);
        
        //Opinions
        let p31=new Proposition("everyone has a human right to live", true, "opinion", booleanRuleBase);
        let p32=new Proposition("everyone has a human right to live", false,"opinion", booleanRuleBase);
        let p33=new Proposition("humans can forfeit their right to live though their actions", true, "opinion", booleanRuleBase);

        //6 Evidence
        let p34=new Proposition("since 1973, within the US more than 160 people have been released from death row with evidence of their innocence", true, "evidence", booleanRuleBase);

        //Opinions
        let p35=new Proposition("CP is too expensive to maintain", true, "opinion", booleanRuleBase);
        let p36=new Proposition("CP is too expensive to maintian", false, "opinion", booleanRuleBase);
        let p37=new Proposition("CP is cheaper than housing criminals for life", true, "opinion", booleanRuleBase);
        let p38=new Proposition("CP is cheaper than housing criminals for life", false, "opinion", booleanRuleBase);
        let p39=new Proposition("finances are not important when aiming for justice against criminals", true, "opinion", booleanRuleBase);
        let p40=new Proposition("finances are not important when aiming for justice against criminals", false, "opinion", booleanRuleBase);

        //Evidence
        let p41=new Proposition("court cases that aim for capital punishment are more expensive than those that do not", true, "evidence", booleanRuleBase);

        //Fact
        let p42=new Proposition("since 1976, within the US 1493 people have received capital punishment", true, "fact", booleanRuleBase);

        //Opinion
        let p43=new Proposition("methods of execution are cruel and inhumane", true, "opinion", booleanRuleBase);
        let p44=new Proposition("methods of execution are cruel and inhumane", false, "opinion", booleanRuleBase);

        //Fact
        let p45=new Proposition("hanging, firing squad, gas chamber, and electrocution are all violent methods used for execution", true, "fact", booleanRuleBase);
        let p46=new Proposition("many countries primarily use a lethal injection with anaesthetic to perform capital punishment", true, "fact", booleanRuleBase);


        //If you edit this section please ensure to update the comments
        // Define Consequence links
        let r1 =  new Rule(p3,  p1,  null, booleanRuleBase, "R1"); // "CP is a good deterrent" implies "CP is acceptable"
        let r2 =  new Rule(p5,  p4,  null, booleanRuleBase, "R2"); // "CP having countries like USA has higher murder rate than UK" implies "CP is not a good deterrent"
        let r3 =  new Rule(p6,  p3,  null, booleanRuleBase, "R3"); // "statistics shows an increase in murder rate since the abolition of CP" implies "CP is a good deterrent"
        let r4 =  new Rule(p7,  p3,  null, booleanRuleBase, "R4"); // "CP makes people less likely commit serious crimes" implies "CP is a good deterrent"
        let r5 =  new Rule(p8,  p7,  null, booleanRuleBase, "R5"); // "nobody is willing to die" implies "CP makes people less likely commit serious crimes"
        let r6 =  new Rule(p10, p9,  null, booleanRuleBase, "R6"); // "suicide bombers want to die" implies "some people are willing to die"
        let r7 =  new Rule(p11, p2,  null, booleanRuleBase, "R7"); // "innocent people may get killed" implies "CP is not acceptable"
        let r8 =  new Rule(p26, p12, null, booleanRuleBase, "R8"); // "mistakes rarely happen during judicial process" implies "it is unlikely innocent people get killed"
        let r9 =  new Rule(p15, p26, null, booleanRuleBase, "R9"); // "scientific techniques will increase the success of justice" implies "mistakes rarely happen during judicial process"

        let r10 = new Rule(p13, p11, null, booleanRuleBase, "R10"); // "there are mistakes during judicial process" implies "innocent people may get killed"
        let r11 = new Rule(p14, p13, null, booleanRuleBase, "R11"); // "political and racial bias often causes prejudices" implies "there are mistakes during judicial process"
        let r12 = new Rule(p16, p1,  null, booleanRuleBase, "R12"); // "most people want CP back" implies "CP is acceptable"
        let r13 = new Rule(p17, p16, null, booleanRuleBase, "R13"); // "the recent survey shows that 60% British people support CP" implies "most people want CP back"
        let r14 = new Rule(p18, p2,  null, booleanRuleBase, "R14"); // "it is wrong to take a human life" implies "CP is not acceptable"
        let r15 = new Rule(p21, p18, null, booleanRuleBase, "R15"); // "human lives are scarce" implies "it is wrong to take a human life"
        let r16 = new Rule(p20, p19, null, booleanRuleBase, "R16"); // "a state has the right to deliberately execute the wrong people" implies "it is not always wrong to take a human life"
        let r17 = new Rule(p22, p1,  null, booleanRuleBase, "R17"); // "murderers should receive capital punishment" implies "CP is acceptable"
        let r18 = new Rule(p23, p22, null, booleanRuleBase, "R18"); // "execution of murderers is fair for the people being murdered" implies "murderers should receive capital punishment"
        let r19 = new Rule(p24, p2,  null, booleanRuleBase, "R19"); // "CP does not give murderers opportunities for rehabilitation" implies "CP is not acceptable"

        let r20 = new Rule(p27, p1,  null, booleanRuleBase, "R20"); // "CP definitely stops murderers commit further crimes" implies "CP is acceptable"

        let r22 = new Rule(p30, p29, null, booleanRuleBase, "R22"); // "chances should be given to murderers for rehabilitation" implies "murderers should not receive capital punishment"
        let r23 = new Rule(p25, p30, null, booleanRuleBase, "R23"); // "statistics shows that repeat offences of murders are extremely low" implies "chances should be given to murderers for rehabilitation"

        let r24 = new Rule(p33, p32, null, booleanRuleBase, "R24"); // "humans can forfeit their right to live though their actions"
        let r25 = new Rule(p32, p1,  null, booleanRuleBase, "R25"); // "not everyone has a human right to live" implies "CP is acceptable"
        let r26 = new Rule(p31, p2,  null, booleanRuleBase, "R26"); // "everyone has a human right to live" implies "CP is not acceptable"

        let r27 = new Rule(p34, p11, null, booleanRuleBase, "R27"); // "since 1973, within the US more than 160 people have been released from death row with evidence of their innocence" implies "innocent people may get killed"

        let r28 = new Rule(p35, p2,  null, booleanRuleBase, "R28"); // "CP is too expensive to maintain" implies "CP is not acceptable"
        let r29 = new Rule(p36, p1,  null, booleanRuleBase, "R29"); // "CP is not too expensive to maintain" implies "CP is acceptable"
        let r30 = new Rule(p37, p36, null, booleanRuleBase, "R30"); // "CP is cheaper than housing criminals for life" implies "CP is not too expensive to maintain"
        let r31 = new Rule(p38, p35, null, booleanRuleBase, "R31"); // "CP is not cheaper than housing criminals for life" implies "CP is too expensive to maintain"
        let r32 = new Rule(p41, p38, null, booleanRuleBase, "R32"); // "court cases that aim for capital punishment are more expensive than those that do not" implies "CP is not cheaper than housing criminals for life"
        let r33 = new Rule(p39, p36, null, booleanRuleBase, "R33"); // "finances are not important when aiming for justice against criminals" implies "CP is not too expensive to maintain"
        let r34 = new Rule(p40, p35, null, booleanRuleBase, "R34"); // "finances should be considered when aiming for justice against criminals" implies "CP is too expensive to maintain"

        // If the number murdered is far greater than the number of innocents found then mistakes rarely happen
        // If there is evidence of racism then that proves that there is political and racial bias
        //
        }
}

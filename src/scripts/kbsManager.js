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
        let p8=new Proposition("CP makes people less likely to commit serious crimes", false, "opinion", booleanRuleBase);
        let p9=new Proposition("nobody is willing to die",true,"opinion",booleanRuleBase);
        let p10=new Proposition("nobody is willing to die",false,"opinion",booleanRuleBase);

        //3 fact
        let p11=new Proposition("suicide bombers want to die",true,"fact",booleanRuleBase);

        //Opinions
        let p12=new Proposition("innocent people may get killed",true,"opinion",booleanRuleBase);
        let p13=new Proposition("innocent people may get killed",false,"opinion",booleanRuleBase);
        let p14=new Proposition("there are mistakes during judicial process",true,"opinion",booleanRuleBase);
        let p15=new Proposition("there are mistakes during judicial process",false,"opinion",booleanRuleBase);
        let p16=new Proposition("political and racial bias often causes prejudices",true,"opinion",booleanRuleBase);
        let p17=new Proposition("political and racial bias often causes prejudices",false,"opinion",booleanRuleBase);
        let p18=new Proposition("scientific techniques will increase the success of justice",true,"opinion",booleanRuleBase);
        let p19=new Proposition("scientific techniques will increase the success of justice",false,"opinion",booleanRuleBase);
        let p20=new Proposition("most people want CP back",  true, "opinion", booleanRuleBase);
        let p21=new Proposition("most people want CP back", false, "opinion", booleanRuleBase);

        //4 Evidence
        let p22=new Proposition("studies show jurors in some states are 3 times more likely to recommend capital punishment for black people in comparison to white people", true, "evidence", booleanRuleBase);
        let p23=new Proposition("the recent survey shows that 60% British people support CP",true,"evidence",booleanRuleBase);

        //Opinions
        let p24=new Proposition("it is wrong to take a human life",true,"opinion",booleanRuleBase);
        let p25=new Proposition("it is wrong to take a human life",false,"opinion",booleanRuleBase);
        let p26=new Proposition("a state has the right to deliberately execute the wrong people",true,"opinion",booleanRuleBase);
        let p27=new Proposition("a state has the right to deliberately execute the wrong people",false,"opinion",booleanRuleBase);
        let p28=new Proposition("human lives are scarce", true, "opinion", booleanRuleBase);
        let p29=new Proposition("human lives are scarce", false, "opinion", booleanRuleBase);

        //Opinions
        let p30=new Proposition("murderers should receive capital punishment",true,"opinion",booleanRuleBase);
        let p31=new Proposition("murderers should receive capital punishment",false,"opinion",booleanRuleBase);
        let p32=new Proposition("execution of murderers is fair for the people being murdered",true,"opinion",booleanRuleBase);
        let p33=new Proposition("execution of murderers is fair for the people being murdered",false,"opinion",booleanRuleBase);

        //fact
        let p34=new Proposition("CP does not give murderers opportunities for rehabilitation",true,"fact",booleanRuleBase);

        //5 Evidence
        let p35=new Proposition("statistics shows that repeat offences of murders are extremely low",true,"evidence",booleanRuleBase);

        //Fact
        let p36=new Proposition("CP definitely stops murderers commit further crimes",true,"fact",booleanRuleBase);

        //Opinions
        let p37=new Proposition("murderers should receive capital punishment",false,"opinion",booleanRuleBase);
        let p38=new Proposition("murderers should receive capital punishment",true,"opinion",booleanRuleBase);
        let p39=new Proposition("chances should be given to murderers for rehabilitation",true,"opinion",booleanRuleBase);
        let p40=new Proposition("chances should be given to murderers for rehabilitation",false,"opinion",booleanRuleBase);

        //Opinions
        let p41=new Proposition("everyone has a human right to live", true, "opinion", booleanRuleBase);
        let p42=new Proposition("everyone has a human right to live", false,"opinion", booleanRuleBase);
        let p43=new Proposition("humans can forfeit their right to live though their actions", true, "opinion", booleanRuleBase);
        let p44=new Proposition("humans can forfeit their right to live though their actions", false, "opinion", booleanRuleBase);

        //6 Evidence
        let p45=new Proposition("records show that, since 1973, within the US more than 160 people have been released from death row with evidence of their innocence", true, "evidence", booleanRuleBase);

        //Opinions
        let p46=new Proposition("CP is too expensive to maintain", true, "opinion", booleanRuleBase);
        let p47=new Proposition("CP is too expensive to maintain", false, "opinion", booleanRuleBase);
        let p48=new Proposition("CP is cheaper than housing criminals for life", true, "opinion", booleanRuleBase);
        let p49=new Proposition("CP is cheaper than housing criminals for life", false, "opinion", booleanRuleBase);
        let p50=new Proposition("finances are not important when aiming for justice against criminals", true, "opinion", booleanRuleBase);
        let p51=new Proposition("finances are not important when aiming for justice against criminals", false, "opinion", booleanRuleBase);

        //Evidence
        let p52=new Proposition("court cases that aim for capital punishment are more expensive than those that do not", true, "evidence", booleanRuleBase);

        //Opinion
        let p54=new Proposition("methods of execution are cruel and inhumane", true, "opinion", booleanRuleBase);
        let p55=new Proposition("methods of execution are cruel and inhumane", false, "opinion", booleanRuleBase);

        //Fact
        let p56=new Proposition("hanging, firing squad, gas chamber, and electrocution are all violent methods used for execution", true, "fact", booleanRuleBase);
        let p57=new Proposition("many countries primarily use a lethal injection with anaesthetic to perform capital punishment", true, "fact", booleanRuleBase);

        //Opinion
        let p58=new Proposition("it is more punishing to be locked up for life than to be executed", true, "opinion", booleanRuleBase);
        let p59=new Proposition("it is more punishing to be locked up for life than to be executed", false, "opinion", booleanRuleBase);

        //If you edit this section please ensure to update the comments
        // Define Consequence links
        let r1 =  new Rule(p3,  p1,  null, booleanRuleBase, "R1"); // "CP is a good deterrent" implies "CP is acceptable"
        let r2 =  new Rule(p5,  p4,  null, booleanRuleBase, "R2"); // "CP having countries like the USA have higher murder rates than the UK" implies "CP is not a good deterrent"
        let r3 =  new Rule(p6,  p3,  null, booleanRuleBase, "R3"); // "statistics shows an increase in murder rate since the abolition of CP" implies "CP is a good deterrent"
        let r4 =  new Rule(p7,  p3,  null, booleanRuleBase, "R4"); // "CP makes people less likely commit serious crimes" implies "CP is a good deterrent"
        let r5 =  new Rule(p9,  p7,  null, booleanRuleBase, "R5"); // "nobody is willing to die" implies "CP makes people less likely commit serious crimes"
        let r6 =  new Rule(p11, p10, null, booleanRuleBase, "R6"); // "suicide bombers want to die" implies "some people are willing to die"
        let r7 =  new Rule(p12, p2,  null, booleanRuleBase, "R7"); // "innocent people may get killed" implies "CP is not acceptable"
        let r8 =  new Rule(p15, p13, null, booleanRuleBase, "R8"); // "mistakes rarely happen during judicial process" implies "it is unlikely innocent people get killed"
        let r9 =  new Rule(p18, p15, null, booleanRuleBase, "R9"); // "scientific techniques will increase the success of justice" implies "mistakes rarely happen during judicial process"

        let r10 = new Rule(p14, p12, null, booleanRuleBase, "R10"); // "there are mistakes during judicial process" implies "innocent people may get killed"
        let r11 = new Rule(p16, p14, null, booleanRuleBase, "R11"); // "political and racial bias often causes prejudices" implies "there are mistakes during judicial process"
        let r12 = new Rule(p20, p1,  null, booleanRuleBase, "R12"); // "most people want CP back" implies "CP is acceptable"
        let r13 = new Rule(p23, p20, null, booleanRuleBase, "R13"); // "the recent survey shows that 60% British people support CP" implies "most people want CP back"
        let r14 = new Rule(p24, p2,  null, booleanRuleBase, "R14"); // "it is wrong to take a human life" implies "CP is not acceptable"
        let r15 = new Rule(p28, p24, null, booleanRuleBase, "R15"); // "human lives are scarce" implies "it is wrong to take a human life"
        let r16 = new Rule(p26, p25, null, booleanRuleBase, "R16"); // "a state has the right to deliberately execute the wrong people" implies "it is not always wrong to take a human life"
        let r17 = new Rule(p30, p1,  null, booleanRuleBase, "R17"); // "murderers should receive capital punishment" implies "CP is acceptable"
        let r18 = new Rule(p32, p30, null, booleanRuleBase, "R18"); // "execution of murderers is fair for the people being murdered" implies "murderers should receive capital punishment"
        let r19 = new Rule(p34, p2,  null, booleanRuleBase, "R19"); // "CP does not give murderers opportunities for rehabilitation" implies "CP is not acceptable"

        let r20 = new Rule(p36, p1,  null, booleanRuleBase, "R20"); // "CP definitely stops murderers commit further crimes" implies "CP is acceptable"

        let r22 = new Rule(p39, p31, null, booleanRuleBase, "R22"); // "chances should be given to murderers for rehabilitation" implies "murderers should not receive capital punishment"
        let r23 = new Rule(p35, p39, null, booleanRuleBase, "R23"); // "statistics shows that repeat offences of murders are extremely low" implies "chances should be given to murderers for rehabilitation"

        let r24 = new Rule(p43, p42, null, booleanRuleBase, "R24"); // "humans can forfeit their right to live though their actions" implies "not everyone has a human right to live"
        let r25 = new Rule(p42, p1,  null, booleanRuleBase, "R25"); // "not everyone has a human right to live" implies "CP is acceptable"
        let r26 = new Rule(p41, p2,  null, booleanRuleBase, "R26"); // "everyone has a human right to live" implies "CP is not acceptable"

        let r27 = new Rule(p45, p12, null, booleanRuleBase, "R27"); // "records show since 1973, within the US more than 160 people have been released from death row with evidence of their innocence" implies "innocent people may get killed"

        let r28 = new Rule(p46, p2,  null, booleanRuleBase, "R28"); // "CP is too expensive to maintain" implies "CP is not acceptable"
        let r29 = new Rule(p47, p1,  null, booleanRuleBase, "R29"); // "CP is not too expensive to maintain" implies "CP is acceptable"
        let r30 = new Rule(p48, p47, null, booleanRuleBase, "R30"); // "CP is cheaper than housing criminals for life" implies "CP is not too expensive to maintain"
        let r31 = new Rule(p49, p46, null, booleanRuleBase, "R31"); // "CP is not cheaper than housing criminals for life" implies "CP is too expensive to maintain"
        let r32 = new Rule(p52, p49, null, booleanRuleBase, "R32"); // "court cases that aim for capital punishment are more expensive than those that do not" implies "CP is not cheaper than housing criminals for life"
        let r33 = new Rule(p50, p47, null, booleanRuleBase, "R33"); // "finances are not important when aiming for justice against criminals" implies "CP is not too expensive to maintain"
        let r34 = new Rule(p51, p46, null, booleanRuleBase, "R34"); // "finances should be considered when aiming for justice against criminals" implies "CP is too expensive to maintain"

        let r35 = new Rule(p22, p16, null, booleanRuleBase, "R35"); // "studies show jurors in some states are 3 times more likely to recommend capital punishment for black people in comparison to white people" implies "political and racial bias often causes prejudices"
        let r36 = new Rule(p33, p31, null, booleanRuleBase, "R36"); // "execution of murderers is not fair for the people being murdered" implies "murderers should not receive capital punishment"
        let r37 = new Rule(p31, p2,  null, booleanRuleBase, "R37"); // "murderers should not receive capital punishment" implies "CP is not acceptable"
        let r38 = new Rule(p58, p33, null, booleanRuleBase, "R38"); // "it is more punishing to be locked up for life than to be executed" implies  "execution of murderers is not fair for the people being murdered"

        let r39 = new Rule(p4,  p2,  null, booleanRuleBase, "R39"); // "CP is not a good deterrent" implies "CP is not acceptable"
        let r40 = new Rule(p8,  p4,  null, booleanRuleBase, "R40"); // "CP does not make people less likely commit serious crimes" implies "CP is not a good deterrent"


        let r41 = new Rule(p17, p15, null, booleanRuleBase, "R41"); // "political and racial bias will not cause prejudices" implies "mistakes rarely happen during judicial process"
        let r42 = new Rule(p19, p14, null, booleanRuleBase, "R42"); // "scientific techniques will not increase the success of justice" implies "there are mistakes during judicial process"

        let r43 = new Rule(p21, p2,  null, booleanRuleBase, "R43"); // "most people don't want CP back" implies "CP is not acceptable"

        let r44 = new Rule(p27, p2,  null, booleanRuleBase, "R44"); // "a state does not have the right to deliberately execute the wrong people" implies "CP is not acceptable"
        let r45 = new Rule(p29, p25, null, booleanRuleBase, "R45"); // "human lives are not scarce" implies  "it is not always wrong to take a human life"

        let r46 = new Rule(p54, p2,  null, booleanRuleBase, "R46"); // "methods of execution are cruel and inhumane" implies "CP is not acceptable"
        let r47 = new Rule(p55, p1,  null, booleanRuleBase, "R47"); // "methods used to enact capital punishment are humane" implies "CP is acceptable"
        let r48 = new Rule(p56, p54, null, booleanRuleBase, "R48"); // "hanging, firing squad, gas chamber, and electrocution are all violent methods used for execution" implies "methods of execution are cruel and inhumane"
        let r49 = new Rule(p57, p55, null, booleanRuleBase, "R49"); // "many countries primarily use a lethal injection with anaesthetic to perform capital punishment" implies "methods used to enact capital punishment are humane"
        let r50 = new Rule(p59, p18, null, booleanRuleBase, "R50"); // "it is more punishing to be executed than to be locked up for life"; implies "execution of murderers is fair for the people being murdered"
        }
}

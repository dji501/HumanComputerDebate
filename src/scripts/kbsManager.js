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
        //Opinions
        let p1=new Proposition("CP is acceptable",true,"opinion",booleanRuleBase);
        let p2=new Proposition("CP is acceptable",false,"opinion",booleanRuleBase);
        let p3=new Proposition("CP is a good deterrent",true,"opinion",booleanRuleBase);
        let p4=new Proposition("CP is a good deterrent",false,"opinion",booleanRuleBase);

        //1 Fact
        let p5=new Proposition("CP having countries like USA has higher murder rate than UK",true,"evidence",booleanRuleBase);

        //2 Evidence
        let p6=new Proposition("statistics shows an increase in murder rate since the abolition of CP",true,"evidence",booleanRuleBase);

        //Opinions
        let p7=new Proposition("CP makes people less likely commit serious crimes",true,"opinion",booleanRuleBase);
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

        //opinions
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

        // Define Consequence links
        let r1 = new Rule(p3,  p1, booleanRuleBase,"R1");
        let r2 = new Rule(p5,  p4, booleanRuleBase,"R2");
        let r3 = new Rule(p6,  p3, booleanRuleBase,"R3");
        let r4 = new Rule(p7,  p3, booleanRuleBase,"R4");
        let r5 = new Rule(p8,  p7, booleanRuleBase,"R5");
        let r6 = new Rule(p10, p9, booleanRuleBase,"R6");
        let r7 = new Rule(p11, p2, booleanRuleBase,"R7");
        let r8 = new Rule(p26, p1, booleanRuleBase,"R8");
        let r9 = new Rule(p15, p2, booleanRuleBase,"R9");

        let r10 = new Rule(p13, p11, booleanRuleBase, "R10");
        let r11 = new Rule(p14, p13, booleanRuleBase, "R11");
        let r12 = new Rule(p16, p1,  booleanRuleBase, "R12");
        let r13 = new Rule(p17, p16, booleanRuleBase, "R13");
        let r14 = new Rule(p18, p2,  booleanRuleBase, "R14");
        let r15 = new Rule(p21, p18, booleanRuleBase, "R15");
        let r16 = new Rule(p20, p19, booleanRuleBase, "R16");
        let r17 = new Rule(p22, p1,  booleanRuleBase, "R17");
        let r18 = new Rule(p23, p22, booleanRuleBase, "R18");
        let r19 = new Rule(p24, p2,  booleanRuleBase, "R19");

        let r20 = new Rule(p27, p1,  booleanRuleBase, "R20");

        let r22 = new Rule(p30, p29, booleanRuleBase, "R22");
        let r23 = new Rule(p25, p30, booleanRuleBase, "R23");
        }
}

import startTest4, {testOf, testRange, testGenerate, testGenerate2, testRepeat, testRepeat2} from "./chapters/chapter-04";
import log from "../util/index";
function startTest(){
    log(`startTest :: enter.`); 
    // 以下注释的内容其实都是已经测试通过的，便于看日志，将相关方法注释了。
    /*
    testOf();

    testRange();

    testGenerate();

    testGenerate2();
    
    testRepeat2();
    testRepeat();
    */
    startTest4();
    
}

startTest();
import startTest4, {testOf, testRange, testGenerate, testGenerate2, testRepeat, testRepeat2} from "./chapters/chapter-04";
import startTestC5 from "./chapters/chapter-05";
import startTestC6 from "./chapters/chapter-06";
import startTestC7 from "./chapters/chapter-07";
import startTestC8 from "./chapters/chapter-08";
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
    // startTest4(); //第4章已练习完
    // startTestC5(); // 2020.09.13 第5章已经完整的练习完毕。
    // startTestC6(); // 第6章练习

    // startTestC7(); // 第7章练习 , 2020.10.02 第7章，过滤类操作符已完全练习完。

    startTestC8();
    
}

startTest();
import {testOf, testRange, testGenerate, testGenerate2, testRepeat, testRepeat2} from "./chapters/chapter-04";
import log from "../util/index";
function startTest(){
    log(`startTest :: enter.`); 
    testOf();

    testRange();

    testGenerate();

    testGenerate2();
    
    testRepeat2();
    testRepeat();
    
}

startTest();
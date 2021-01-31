import log from "../../../util/index";
import testTap from "./tap-test";
import startCount from "./counter";
import {startSearch} from "./search";
export default function startTestC12() {
    log(`startTestC12 :: enter.`);    
    testTap();
    startCount();
    startSearch();

    
}

import log from "../../../util/index";
import testTap from "./tap-test";
import startCount from "./counter";
export default function startTestC12() {
    log(`startTestC12 :: enter.`);    
    testTap();
    startCount();
}

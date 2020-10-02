/**
 * 练习和测试第7章，过滤类操作符。
 */
import {of} from "rxjs";
import {zip} from "rxjs/operators";
import log from "../../../util";
import testFilter from "./filter-test";
import testFirstAndLast from "./first-and-last-test";
import testTake from "./takes-test";
import testSkip from "./skip-test";
import testThrottleAndDebounce from "./throttle-debounce-audit-test";
import testDistinct from "./distinct-test";
export default function startTestC7() {
    log(`startTestC7 :: enter.`);
    // testFilter();
    // testFirstAndLast();
    // testTake();
    // testSkip();
    // testThrottleAndDebounce(); // 已经练完、测完
    testDistinct();

}

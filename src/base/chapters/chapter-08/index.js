/**
 * 练习第8章，转换类操作符~~
 * 
 */
import log from "../../../util";
import testMapAndMapTo from "./map-mapTo-pluck-test";
import testWindowAndBufferTime from "./windowTime-bufferTime-test";
import testWindowAndBufferCount from "./windowCount-bufferCount-test";
import testWindowAndBufferToggle from "./windowToggle-bufferToggle-test";
import testWindowAndBuffer from "./window-buffer-test"
export default function startTestC8() {
    log(`startTestC8 :: enter.`);
    // testMapAndMapTo();
    // testWindowAndBufferTime();
    // testWindowAndBufferCount();
    // testWindowAndBufferToggle();
    testWindowAndBuffer();
}
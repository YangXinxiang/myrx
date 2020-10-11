/**
 * 练习第8章，转换类操作符~~
 * 
 */
import log from "../../../util";
import testMapAndMapTo from "./map-mapTo-pluck-test";
import testWindowAndBufferTime from "./windowTime-bufferTime-test";
import testWindowAndBufferCount from "./windowCount-bufferCount-test";
import testWindowAndBufferToggle from "./windowToggle-bufferToggle-test";
import testWindowAndBuffer from "./window-buffer-test";
import testConcatMap from "./concatMap-test";
import testDragWithRxjs from "./drag-box-test";
import testDragBox2 from "./drag-box2-test";
import testDragBox3 from "./drag-box-test3";
import testHo from "./high-order-observable-test";
export default function startTestC8() {
    log(`startTestC8 :: enter.`);
    // testMapAndMapTo();
    // testWindowAndBufferTime();
    // testWindowAndBufferCount();
    // testWindowAndBufferToggle();
    // testWindowAndBuffer();

     // testConcatMap();
     // testDragWithRxjs();

    // testDragBox2();
    //testHo();
    testDragBox3();
}
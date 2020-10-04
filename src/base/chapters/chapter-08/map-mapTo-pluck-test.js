import {of , fromEvent} from "rxjs";
import {map, mapTo, pluck} from "rxjs/operators";
import log from "../../../util";
export default function testMapAndMapTo(){
    log(`testMapAndMapTo :: enter.`);
    // testMap();
    // testMap2();
    // testMap3();
    // testMapTo();
    testPluck();
    testPluck2();
    mockPluckBaseMap();
}

function testMap(){
    log(`testMap :: enter.`);
    const source$ = of(2,9,10,20,55);
    const newData$ = source$.pipe(
        map(x=>x*2)
    );
    newData$.subscribe(
        value => log(`testMap :: in next, value = ${value}`),
        error => log(`testMap :: in error, error = ${error}`),
        () => log(`testMap :: in complete~~`),
    )
}

// map支持第二个参数，作为map运行时的this
function testMap2(){
    log(`testMap2 :: enter.`);
    const source$ = of(2,9,10,20,55);
    const context = {seprator : " : "}
    // map支持第二个参数，作为map运行时的this，因此这里用普通函数，而不是用箭头函数
    // 这个方式只是了解map的一个特点，但是不建议这样用。依赖this会使得结果不可控
    const project = function(value, index){
        return `${value}${this.seprator}${index}`
    }
    const newData$ = source$.pipe(
        map(project, context)
    );
    newData$.subscribe(
        value => log(`testMap2 :: in next, value = ${value}`),
        error => log(`testMap2 :: in error, error = ${error}`),
        () => log(`testMap2:: in complete~~`),
    )
}

// 基于上上面的实现改写
function testMap3(){
    log(`testMap3 :: enter.`);
    const source$ = of(2,9,10,20,55);
    const context = {seprator : " : "}

    // 将project包装成一个高阶函数： 返回真正project加工函数的函数，利用闭包传入依赖。
    // 这里只是演示哈。如果这个例子的话，完全吧需要这样，完全可以直接访问 context
    const project = (function (seprator){
        return function(value, index){
            return `${value}${seprator}${index}`
        }
    })(context.seprator)

    const newData$ = source$.pipe(
        map(project, context)
    );
    newData$.subscribe(
        value => log(`testMap3 :: in next, value = ${value}`),
        error => log(`testMap3 :: in error, error = ${error}`),
        () => log(`testMap3:: in complete~~`),
    )
}

// mapTo, 将每一个数据都映射成同一个数据。有嘛用呢？？？
function testMapTo(){
    log(`testMapTo :: enter.`);
    const source$ = of(2,9,10,20,55);
    const newData$ = source$.pipe(
        mapTo("AA")
    );
    newData$.subscribe(
        value => log(`testMapTo :: in next, value = ${value}`),
        error => log(`testMapTo :: in error, error = ${error}`),
        () => log(`testMapTo:: in complete~~`),
    )
}

// pulck，从上游数据中拔出其属性。
function testPluck(){
    log(`testPluck :: enter.`);
    const source$ = of( 
        {name:"Yang Chaoyue", age :18, email:"xxx@126.com"},
        {name:"Yang Mi", age :21, email:"xxx@126.com"},
        {name:"Di li re ba", age :18, email:"xxx@126.com"},
        {name:"Yinjingliya", age :22, email:"yjly@hott.com"}
    );
    const newData$ = source$.pipe(
        pluck("name")
    );
    newData$.subscribe(
        value => log(`testPluck :: in next, value = ${value}`),
        error => log(`testPluck :: in error, error = ${error}`),
        () => log(`testPluck:: in complete~~`),
    )
}

// pluck的属性支持嵌套。
function testPluck2() {
    log(`testPluck2 :: enter.`);
    const source$ = fromEvent(document, "click");
    const newData$ = source$.pipe(
        pluck("target", "tagName") // 支持拔出嵌套属性，相当于 event.target.tagName
    );
    newData$.subscribe(
        value => log(`testPluck2 :: in next, value = ${value}`),
        error => log(`testPluck2 :: in error, error = ${error}`),
        () => log(`testPluck2 :: in complete~~`),
    )
}
// 试试基于map来模拟实现pluck
function mockPluckBaseMap(){
    log(`mockPluckBaseMap :: enter.`);
    const source$ = of( 
        {name:"Yang Chaoyue", age :18, email:"xxx@126.com"},
        {name:"Yang Mi", age :21, email:"xxx@126.com"},
        {name:"Di li re ba", age :18, email:"xxx@126.com"},
        {name:"Yinjingliya", age :22, email:"yjly@hott.com"}
    );
    // 哈哈，也用一个麻烦绕的方式来做， 鄙视这种过度设计，但是要明白用法。
    const pluckFun = (function(property){
        return function(value, index){
            return value[property] || undefined;
        }
    })("name");
    const newData$ = source$.pipe(
        map(pluckFun)
    );
    newData$.subscribe(
        value => log(`mockPluckBaseMap :: in next, value = ${value}`),
        error => log(`mockPluckBaseMap :: in error, error = ${error}`),
        () => log(`mockPluckBaseMap:: in complete~~`),
    )
}
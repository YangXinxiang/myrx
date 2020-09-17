/**
 * 练习一些数学辅助类操作符: count、max、min、reduce
 */
import {from, of, timer, interval, pipe} from "rxjs";
import {count, max, min, reduce, concat, map, take} from "rxjs/operators";
import log from "../../../util/";
export default function testMathAssist(){
    log(`testMathAssist :: enter.`);
    // testCount1();
    // testCount2();
    // testMax();
    // testMin();
    // testMini2();

    testReduce1()
}
/**
 * 练习count， 统计吐出数据数量，二不是总和
 */
function testCount1(){
    log(`testCount1 :: enter.`);
    const source1$ = of(1,2,5);
    const source2$ = of(6,8,10);
    const fullSource$ = source1$.pipe(concat(source2$));
    const count$ = fullSource$.pipe(count());
    
    count$.subscribe(
        value => log(`testCount1 :: in next, value = ${value}`),
        null,
        ()=>log(`testCount1 :: in complete~~`)
    )
}

function testCount2(){
    log(`testCount2 ::  enter.`);
    const source1$ = timer(500);
    const source2$ = timer(1500);
    const fullSource$ = source1$.pipe(concat(source2$),count());
    //const counted$ = fullSource$.pipe(count());
    fullSource$.subscribe(
        value => log(`testCount2 ::  in next, value = ${value}`),
        null,
        ()=> log(`testCount2 ::  in complete~~`)
    )
}

/**
 * 练习 max
 */
function testMax(){
    log(`testMax ::  enter.`);
    const source1$ = interval(500).pipe(
        take(2),
        map(x=>"b"+x)
    );
    const source2$ = interval(500).pipe(
        take(3),
        map(x=>"a"+(x-5))
    );
    // max、min的一个辅助函数
    const compare = (a,b)=>{
        return parseInt(a.substr(1)) - parseInt(b.substr(1));
    };
    const fullSource$ = source1$.pipe(concat(source2$),max(compare));
    //const counted$ = fullSource$.pipe(count());
    fullSource$.subscribe(
        value => log(`testMax ::  in next, value = ${value}`),
        null,
        ()=> log(`testMax ::  in complete~~`)
    )
}

function testMin(){
    log(`testMin :: enter.`);
    const source1$ = interval(600).pipe(
        take(2),
        map(x => {
            return {index:x, offest:6};
            return {index:x+6, offest:6}
        })
    );
    const source2$ = interval(600).pipe(
        take(3),
        map(x => {
            return {index:x+1, offest:1}
        })
    );
    const compare = (a, b) =>{
        log(`testMin :: compare enter, a.index = ${a.index}, b.index = ${b.index}`);
        return a.index > b.index;
    }
    const newData$ = source1$.pipe(concat(source2$));
    /*
    const min$ = source1$.pipe(
        concat(source2$),
        min(compare)
    );*/
    
    const min$ = newData$.pipe(min(compare))
    min$.subscribe(
        value => log(`testMin :: in next, value = ${JSON.stringify(value)}`),
        null,
        () => log(`testMin :: in complete~~`)
    )

}

function testMini2(){
    log(`testMini2 :: enter.`);
    const source1$ = of({index: 5},{index: 11},{index: 8});
    const source2$ = of({index: 6},{index: 1},{index: 7});
    // const source1$ = of(5,11,8);
    // const source2$ = of(6,1,7);
    const compare = (a,b)=>{
        log(`testMini2 :: compare enter, a.index = ${a.index}, b.index = ${b.index}`);
       
       return a.index-b.index;
    }
    const min$ = source1$.pipe(
        concat(source2$),
        min(compare)
    );

    min$.subscribe(
        value => log(`testMini2 :: in next, value = ${JSON.stringify(value)}`),
        null,
        () => log(`testMini2 :: in complete~~`)
    )
}


function testReduce1(){
    log(`testReduce1 :: enter.`);
    const source1$ = of(1,2,3,4,5);
    const source2$ = source1$.pipe(
        concat( of(10,20,30) )      
    );
    const rst$ = source2$.pipe(reduce((acc, current, index)=>{
        log(`testReduce1 :: acc = ${acc}, current = ${current}`);
        return acc+current;
    },0));
    rst$.subscribe(
        value => log(`testReduce1 :: in next, value = ${value}`),
        error => log(`testReduce1 :: in error, error = ${error}`),
        () => log(`testReduce1 :: in complete~~~`),
    )
}
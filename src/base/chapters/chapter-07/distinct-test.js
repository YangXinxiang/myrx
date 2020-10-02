import {of, interval,timer} from "rxjs";
import {map, distinct,distinctUntilChanged,distinctUntilKeyChanged, elementAt, single} from "rxjs/operators";
import log from "../../../util";
export  default function testDistinct(){
    log(`testDistinct :: enter.`);
    // testDistinct1();
    // testDistinctUntilChanged();
    // testElementAt();
    testSingle();
}

/**
 * 测试distinct，
 * 注意，第二个参数flush，跟书上说的完全不一样了。，书上是P170
 */
function testDistinct1(){
    log(`testDistinct1 :: enter.`);
    const dataArr = [1,5,1,5,6,1,3,8,10];
    let index=0;
    const source$ = of(...dataArr);
    const source2$ = interval(300)/*.pipe(
        map(x => {
            if(index>=dataArr.length){
                index=0;
            }
            return dataArr[index++]
        })
    );*/
    const flush = ()=> interval(5000)
    const newData$ = source2$.pipe(distinct(),flush);
    newData$.subscribe(
        value => {
            log(`testDistinct1 :: in next~~~, value = ${value}`)
        },
        error =>log(`testDistinct1 :: in error, error = ${error}~~~`),
        ()=>log(`testDistinct1 :: in complete~~~`)
    );

}
// distinctUntilChanged， 跟上一个数据比较，只要不一样就吐出给下游。
function testDistinctUntilChanged(){
    log(`testDistinctUntilChanged :: enter..`)
    const source$ = of(1,1,5,3,6,6,8,1,7,5,5,9);
    const newData$ = source$.pipe(
        distinctUntilChanged()
    )

    newData$.subscribe(
        value => {
            log(`testDistinctUntilChanged :: in next~~~, value = ${value}`)
        },
        error =>log(`testDistinctUntilChanged :: in error, error = ${error}~~~`),
        ()=>log(`testDistinctUntilChanged :: in complete~~~`)
    );

    const source2$ = of(
        {name:"Yang Chaoyue", age :18, email:"xxx@126.com"},
        {name:"Yang Mi", age :21, email:"xxx@126.com"},
        {name:"Di li re ba", age :18, email:"xxx@126.com"},
        {name:"Yinjingliya", age :22, email:"yjly@hott.com"}
    );
    const compare = (a, b)=>{
        return a.age == b.age;
    }
    const newData2$ = source2$.pipe(
        distinctUntilChanged(compare)
    )

    newData2$.subscribe(
        value => {
            log(`testDistinctUntilChanged2 :: in next~~~, value = ${JSON.stringify(value)}`)
        },
        error =>log(`testDistinctUntilChanged2 :: in error, error = ${error}~~~`),
        ()=>log(`testDistinctUntilChanged2 :: in complete~~~`)
    );
}

function testElementAt(){
    log(`testElementAt :: enter.`);
    const source$ = of(12,8,20,9);
    const newData$ = source$.pipe(elementAt(12, "hah"));
    newData$.subscribe(
        value => {
            log(`testElementAt :: in next~~~, value = ${JSON.stringify(value)}`)
        },
        error =>log(`testElementAt :: in error, error = ${error}~~~`),
        ()=>log(`testElementAt :: in complete~~~`)
    );
}
/**
 * 在上游数据中找一个满足条件的唯一数据。
 * 如果找到一个满足条件，且唯一的数据，向下游转发
 * 如果找到多个满足条件的数据，会向下游抛出一个错误。
 * 如果没找到任何数据，会向下游传递undefined.
 */
function testSingle(){
    log(`testSingle :: enter.`);
    const source$ = of(12,8,18,9);
    const newData$ = source$.pipe(single(x => x>15 ));
    newData$.subscribe(
        value => {
            log(`testSingle :: in next~~~, value = ${JSON.stringify(value)}`)
        },
        error =>log(`testSingle :: in error, error = ${error}~~~`),
        ()=>log(`testSingle :: in complete~~~`)
    );
}
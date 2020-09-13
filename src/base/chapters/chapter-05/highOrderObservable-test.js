import {interval} from "rxjs";
import {take, map} from "rxjs/operators";
import log from "../../../util";
export default function testHighOrderObservable(){
    log(`testHighOrderObservable :: enter.`);

    const ho$ = interval(1000).pipe(
        take(2), // 只抽取前两个数据
        map(x => {
            // map将上游生成的数据x映射成另外一个observale对象
            log(`testHighOrderObservable :: main observable enter, x = ${x}`);
            return interval(1500).pipe(
                map(y => x+ " : "+y),
                take(2)
            )
        })
    );   
    // 订阅高阶ho$， 拿到的value是一个observable对象。
    ho$.subscribe(
        value => {
            log(`testHighOrderObservable :: (high order) in next, value =${JSON.stringify(value)}`);
            value.subscribe(
                innerValue => log(`testHighOrderObservable :: (high order inner:: ) in next, innerValue = ${innerValue}`),
                null,
                () => log(`testHighOrderObservable :: (high order inner:: ) in complete~~~`)
            )
        },
        error => log(`testHighOrderObservable :: (high order) in error, error =${error}`),
        () => log(`testHighOrderObservable :: (high order) in complete~~`),
    )
    // 为了对比，写一个普通的做比较
    const normal$ = interval(1000).pipe(
        take(2), // 只抽取前两个数据
        map(x => {
            return x+"xx";
        })
    );
    normal$.subscribe(
        value => log(`testHighOrderObservable :: (normal) in next, value =${JSON.stringify(value)}`),
        error => log(`testHighOrderObservable :: (normal) in error, error =${error}`),
        () => log(`testHighOrderObservable :: (normal) in complete~~`),
    )
}
import {timer} from "rxjs";
import {reduce} from "rxjs/operators";
import log from "../../../util/index";
export function sum2(source$){
    log(`sum2 :: enter.`);
    return source$.pipe(
        reduce((pre, cur)=>{
            return pre+cur;
        },0)
    )
}

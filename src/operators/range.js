import {range} from "rxjs";
export default function range_study(){
    const source$ = range(50,20);
    source$.subscribe(console.log);
}


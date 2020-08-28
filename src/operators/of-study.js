import {of} from "rxjs";

export default function of_Test(){
    console.log(`of_Test :: enter.`);
    const source$ = of(1,2,3,4,5,6,7,8,9,10);
    source$.subscribe(console.log)
    
}

import {generate} from "rxjs";
export default function generate_study(){
    console.log(`generate_study :: enter.`);

    for (let i=2;i<10;i++){
        console.log(i*i);
    }
    
    const source$ = generate(
        2, // 初始值，相当于for循环中的 let i=2
        value => value <10, //运行的条件，相当于for循环中的 i<10
        value => ++value, // 每次值的递增，这个很重要，如果写成 value++ 会导致死循环
        value => value*value
        );
    source$.subscribe(console.log);

    
    const test = p => p++;
    const v = test(5);
    console.log(`generate_study :: test, v = ${v}`); //  generate_study :: test, v = 5
}
export default function log(...args){
    let prefix = "[myrxjs] ";
    console.log(prefix, ...args);
}
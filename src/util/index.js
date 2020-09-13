function log(...args){
    let prefix = "[myrxjs] ";
    console.log(prefix, ...args);
}

export default log;
export {log};
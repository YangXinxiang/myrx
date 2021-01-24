/**
 * 随便写个 一起学习的抽签分享小程序哈~~
 * 
 */

let studentNameList = ["杨新象", "李晓鹏","魏凯", "旷涛"]; // 每一个轮次分享的伙伴
let sharedList = ["旷涛"]; // 该轮次已经分享过的伙伴，抽签时排除掉
/**
 * 随机抽签（确实不会写英文~~），抽取下一个分享的伙伴哈~~
 */
function chouqian(){
    console.log(`chouqian :: enter.`)
    let willShareList = studentNameList.filter((studentName)=>{
        return !sharedList.includes(studentName)
    });
    let nextShareStudentName = getRandomItem(willShareList);
    console.log(`chouqian :: end, nextShareStudentName = ${nextShareStudentName}`)
}

/**
 * 随机获取数组中的一个元素
 * @param {array} arr 
 */
function getRandomItem(arr){
    console.log(`getRandomItem :: enter, arr = ${JSON.stringify(arr)}`);
    let len = arr.length;
    let randomIndx = Math.floor((Math.random()*len));
    return arr[randomIndx];
}
// 抽签
chouqian();

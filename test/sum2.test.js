import {range, of, timer, interval} from "rxjs";
import {take} from "rxjs/operators";
import { sum2 } from '../src/base/chapters/chapter-12/sum2';

describe('index', () => {
  describe('sum2', () => {
    it('通过range测试sum2', (done) => {
      // expect(sum()).toEqual(0)
      // 步骤1，准备测试的环境
      const source$ = range(1,6);
      // 步骤2，执行被测试的函数
      const result$ = source$.pipe(sum2);
      // 步骤3，验证结果
      result$.subscribe(
        value=>{
          console.log(`sum2 test, in next, value = ${value}`);
          expect(value).toBe(21);
          done();
        },
        err => {
          console.log(`sum2 test,  in error, err = ${JSON.stringify(err)}`);
        },
        ()=>{
          console.log(`sum2 test, in complete~~`);
        }
      )
    });
    
    it("测试字符串相加的结果", (done)=>{
      // 步骤1，准备数据
      const source$ = of("1", "2", "3");
      
      // 步骤2：执行函数
      const result$ = source$.pipe(sum2);

      // 步骤3： 检查结果
      result$.subscribe(
        value=>{
          console.log(`sum2 test2, in next, value = ${value}`);
          expect(value).toBe("0123");
          done();
        },
        err => {
          console.log(`sum2 test2,  in error, err = ${JSON.stringify(err)}`);
        },
        ()=>{
          console.log(`sum2 test2, in complete~~`);
        }
      )
    });  


    it("测试异步结果，测试设置超时时间， 7秒", (done)=>{
      // 步骤1，准备数据
      // const source$ = of("1", "2", "3");
      const source$ = timer(1000); // 7秒后才返回数据，但是框架在5秒没返回就会认为失败。
      // jest.setTimeout(8000); // 设置本条用例的超时时间，如果不设置会自动失败

      // 步骤2：执行函数
      const result$ = source$.pipe(sum2);

      // 步骤3： 检查结果
      result$.subscribe(
        value=>{
          console.log(`sum2 test2, in next, value = ${value}`);
          expect(value).toBe(0);
          done();
        },
        err => {
          console.log(`sum2 test2,  in error, err = ${JSON.stringify(err)}`);
        },
        ()=>{
          console.log(`sum2 test2, in complete~~`);
        }
      )
    });   
  })



  // 测试异步返回多个数据
  describe("测试异步返回多个数据", ()=>{
    it("测试interval返回多个数据的加和数据", (done)=>{
      // 1, 准备数据
      const source$ = interval(500).pipe(take(4));

      // 2，执行函数
      // const result$ = source$.pipe(sum2);
      const rstArr = [];

      source$.subscribe(
        value => rstArr.push(value),
        error => console.log(`sum3 test3,  in error, err = ${JSON.stringify(error)}`),
        ()=>{
          console.log(`sum3 test3, in complete~~rstArr = ${JSON.stringify(rstArr)}`);
          // console.log(rstArr===[0,1,2,3]);
          expect(rstArr).toEqual([0,1,2,3]);
          done();
        }
      )
    })
  })

})


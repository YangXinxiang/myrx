import {range} from "rxjs"
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
          expect(value).toEqual(21);
          done();
        },
        err => {
          console.log(`sum2 test,  in error, err = ${JSON.stringify(err)}`);
        },
        ()=>{
          console.log(`sum2 test, in complete~~`);
        }
      )
    })

    
  })
})


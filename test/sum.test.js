import { sum } from '../src/util/sum';

describe('测试求和模块', () => {
  describe('sum', () => {
    it('无参数时返回 0', () => {
      expect(0).toBe(0)
    })
    /* */
    it('无参数时返回 0', () => {
      expect(sum()).toBe(0)
    })
    
    it('一个数时返回它本身', () => {
      expect(sum(1)).toBe(1)
      expect(sum(2)).toBe(2)
    })
    
    it('多个数时返回它们的和', () => {
      expect(sum(1, 2, 3)).toBe(6)
    })
    
  })
})



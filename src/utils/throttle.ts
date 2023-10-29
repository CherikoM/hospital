export default (fn: Function, delay: number) => {
  let timer: null | number = null
  let starttime = Date.now()
  return function (this:any, ...args: any[]) {
      let curTime = Date.now() // 当前时间
      let remaining = delay - (curTime - starttime)  // 从上一次到现在，还剩下多少多余时间
      let context = this
      clearTimeout(timer as number)
      if (remaining <= 0) {
          fn.apply(context, args)
          starttime = Date.now()
      } else {
          timer = setTimeout(fn, remaining);
      }
  }
}
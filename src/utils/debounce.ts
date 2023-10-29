export default (fn: Function, delay = 1000)=> {
  let timer: null | ReturnType<typeof setTimeout> = null
  return function (this:any, ...args: any[]) {
      if (timer) {
          clearTimeout(timer)
          timer = null
      }

      timer = setTimeout(() => {
          fn.apply(this, args)
      }, delay)
  }
}
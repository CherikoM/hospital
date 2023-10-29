// 校验证件类型
export const certificatesTypeValidator = (require: boolean = true)=> {
  return (_:any, value:string, callback:Function)=> {
    if(!require && (value!="10"&&value!="20")) {
      callback()
    } else if((value=="10"||value=="20")) {
      callback()
    } else {
      callback(new Error("请选择证件类型"))
    }
  }
}

// 校验证件号码
export const certificatesNoValidator = (type: any, word: string, require: boolean = true)=> {
  return (_:any, value:string, callback:Function)=> {
    const idnum = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    const hknum = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if(!require && value == "") {
      callback()
    } else if(value == "") {
      callback(new Error("请输入证件号码"))
    } else if(
      (type[word]==="10"&&idnum.test(value))
      || (type[word]==="20"&&hknum.test(value))
    ) {
      callback()
    } else {
      callback("请输入正确的证件号码")
    }
  }
}

// 校验证件图片
export const ingUrlValidator = (_:any, value:string, callback:Function)=> {
  value===""? callback(new Error("请上传证件图片")): callback()
}
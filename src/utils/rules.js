// 验证正整数
export function validateNumber(rule, val, callback) {
    if (!Number(val)) {
        callback(new Error('请输入正整数'))
    } else {
        const reg = /^[0-9]*[1-9][0-9]*$/
        const rsCheck = reg.test(val)
    if (!rsCheck) {
        callback(new Error('请输入正整数'))
    } else {
        callback();
    }
    }
}
// 验证数字
export function validateFigure(rule, val, callback) {
    const reg = /[\d.]/g
    const isFigure = reg.test(val)
    if (!isFigure) {
        callback(new Error('请输入数字'))
    } else {
        callback()
    }
}
// 只是汉字
export function validateChina(rule, val, callback) {
    const reg = /^[\u4e00-\u9fa5]+$/
    const isChina = reg.test(val)
    if (!isChina) {
        callback(new Error('请输入汉字'))
    } else {
        callback()
    }
}
// 是否手机号码或者固定电话
export function validateTwoPhone(rule, val, callback) {
    const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/
    const isTwoPhone = reg.test(val)
    if (!isTwoPhone) {
        callback(new Error('请输入正确的电话号码或者固话号码'))
    } else {
        callback()
    }
}
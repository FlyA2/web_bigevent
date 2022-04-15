// 注意：每次调用  $.get()  $.post()  $.ajax() 的时候，都会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到 我们给 Ajax 提供的配置对象

$.ajaxPrefilter(function (options) {
    // console.log(options.url);
    //http://www.liulongbin.top:3007/api/login

    // 在 发起 真正的 Ajax请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url);


    // 统一为 有权限的接口，设置 headers 请求头
    if (options.url.indexOf('/my/') !== -1) {  // 发起有权限的请求
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    // 全局挂载 complete 回调函数
    options.complete = function (res) {
        // console.log('执行了 complete 函数');
            // console.log(res);
            // 在 complate 回调函数中， 可以使用 res.responseJSON 拿到服务器响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1. 强制清空 token
                localStorage.removeItem('token')
                // 2. 强制跳转到登录页面
                location.href = './login.html'
            }
    }
})


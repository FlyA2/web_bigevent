// 注意：每次调用  $.get()  $.post()  $.ajax() 的时候，都会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到 我们给 Ajax 提供的配置对象

$.ajaxPrefilter(function (options) {
    console.log(options.url);
    //http://www.liulongbin.top:3007/api/login
  
    // 在 发起 真正的 Ajax请求之前，统一拼接请求的根路径
    // options.url = 'http://www.liulongbin.top:3007' + options.url
    // console.log(options.url);
})
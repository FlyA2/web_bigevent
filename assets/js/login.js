$(function () {
    // 点击 去注册账号 的链接
    $('#link_reg').on('click', function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    // 点击 去登录的 链接
    $("#link_login").on('click', function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })

    // 从 layui 中 获取 form 对象
    var form = layui.form
    var layer = layui.layer
    // 通过 form.verify()  函数自定义校验规则
    form.verify({
        // 自定义了一个叫 pwd 的 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是 确认密码框中的内容
            // 还需要拿到 密码框中的内容
            // 然后进行一次 等于 的判断
            // 如果判断失败，则 return 一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (value !== pwd) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的 提交事件
    $("#form_reg").on('submit', function (e) {
        // 1.阻止默认的提交行为
        e.preventDefault()
        // 2.发起 Ajax 的 POST 请求
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=username]').val() }

        $.post('http://www.liulongbin.top:3007/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);; // 注册失败
            }
            layer.msg('注册成功，请登录！');
            // 模拟人的点击效果
            $("#link_login").click()
        })
    })

    // 监听登录表单的 提交事件
    $("#form_login").submit(function (e) {
        // 1.阻止默认的提交行为
        e.preventDefault()
        // 2.发起 Ajax 的 POST 请求
        $.ajax({
            url: 'http://www.liulongbin.top:3007/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                console.log(res.status);  // 怎么老是 1

                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                console.log(res.token);
                // 将登陆成功得到的 token 字符串，保存到localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})


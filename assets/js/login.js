$(function() {

    $('#goRegLink').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    $('#goLoginLink').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //登录功能
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                //登录成功
                layui.layer.msg(res.message);
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })

    //注册提交
    $('#regForm').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: { username: $('.reg-box [name="username"]').val(), password: $('.reg-box [name="password"]').val() },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('注册成功，去登录');
                $('#goLoginLink').click();
            }
        })
    })
})

// 自定义密码校验规则
layui.form.verify({
    pass: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    repass: function(value, item) { //value：表单的值、item：表单的DOM对象
        var pass = $('.reg-box [name="password"]').val();
        if (pass !== value) {
            return '两次密码输入不一致'
        }
    }
});
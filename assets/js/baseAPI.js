$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    if (options.url.indexOf('/my/') >= 0) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html';
        }
    }
});

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
    },
    repwd: function(value) {
        if ($('.newpwd').val() !== value) {
            return '两次新密码输入不一致'
        }
    },
    nickname: function(value) {
        if (value.length > 6) {
            return '昵称长度必须在1-6个字符之间！'
        }
    }
});
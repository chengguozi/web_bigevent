$(function() {
    getUserInfo();

    $('#resetBtn').on('click', function(e) {
        e.preventDefault();
        getUserInfo();
    })

    $('#userInfoForm').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                window.parent.getUserInfo();
            }
        })
    })

})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layui.form.val("userinfo", res.data);
        }
    })
}
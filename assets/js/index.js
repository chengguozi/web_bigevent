$(function() {
    getUserInfo();

    $('#logoutBtn').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
        });

    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data);
        }
    })
}

function renderAvatar(data) {
    var showname = data.nickname || data.username
    $('#welcome').html('欢迎&nbsp;' + showname)
    if (data.user_pic && data.user_pic != '') {
        //渲染图片头像
        $('.img-avatar').attr('src', data.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //渲染文字头像
        $('.img-avatar').hide();
        $('.text-avatar').html(showname[0].toUpperCase()).show();
    }
}
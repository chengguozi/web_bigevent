$(function() {

    // 初始化富文本编辑器
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 选择图片按钮
    $('.chooseBtn').on('click', function() {
        $('#iptFile').click()
    })

    $('#iptFile').on('change', function(e) {
        var files = e.target.files
        if (files.length > 0) {
            var newImgURL = URL.createObjectURL(files[0])

            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域


        }
    })

    getCates()

    function getCates() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                $('select').html(template('tpl-cates', res))
                layui.form.render()
            }
        })
    }

    var state = '已发布'
    $('.saveBtn').on('click', function() {
        state = '草稿'
    })

    $('#frm').on('submit', function(e) {
        e.preventDefault();
        var fd = new FormData($(this)[0])
        fd.append('state', state)

        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                pubArt(fd)

            })



    })

    function pubArt(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            // 注意：如果向服务器提交的是 FormData 格式的数据，
            // 必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('文章发布成功');
                // location.href = '/article/art_list.html'
            }
        })
    }
})
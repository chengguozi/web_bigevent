$(function() {
    initTable()

    var addIndex = null;
    $('#addCateBtn').on('click', function() {
        addIndex = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#frm-add').html()
        });
    })

    var editIndex = null;
    $('tbody').on('click', '.editBtn', function() {
        editIndex = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#frm-add').html()
        });

        $('#confirmBtn').html('确认修改')
        $('#resetBtn').hide();

        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + $(this).attr('data-id'),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layui.form.val('formEdit', res.data)
            }
        })
    })

    $('tbody').on('click', '.deleteBtn', function() {
        var id = $(this).attr('data-id');
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg(res.message);
                    layer.close(index);
                    initTable()
                }
            })


        });


    })

    $('body').on('submit', '#addForm', function(e) {
        e.preventDefault();

        if ($('#iptId').val()) {
            //修改
            $.ajax({
                method: 'POST',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg(res.message);
                    layer.close(editIndex);
                    initTable()

                }
            })
        } else {
            //添加
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: { name: $('[name=name]').val(), alias: $('[name=alias]').val() },
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg(res.message);
                    layer.close(addIndex);
                    initTable()

                }
            })
        }

    })



    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }

                $('tbody').html(template('tmp-table', res))
            }
        })
    }
})
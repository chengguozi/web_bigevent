$(function() {
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    initTable();
    getCates();

    $('#filterForm').on('submit', function(e) {
        e.preventDefault();
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        q.pagenum = 1
        initTable()
    })

    $('tbody').on('click', '.deleteBtn', function() {
        var len = $('.deleteBtn').length;
        var id = $(this).attr('data-id');

        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    if (len === 1) {
                        q.pagenum = q.pagenum == 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                    layer.msg(res.message);
                    layer.close(index);
                }
            })

        });
    })

    function renderPage(total) {
        layui.laypage.render({
            elem: 'page',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            limits: [2, 3, 5, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function(obj, first) {

                q.pagesize = obj.limit
                q.pagenum = obj.curr

                //首次不执行
                if (!first) {
                    initTable()
                }
            }
        });
    }

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }

                $('tbody').html(template('tmp-table', res))
                renderPage(res.total)
            }
        })
    }

    function getCates() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                $('[name=cate_id]').html(template('tmp-cate', res))
                layui.form.render('select')
            }
        })
    }

    // 定义时间过滤器
    template.defaults.imports.dateFormat = function(date) {
        var dt = new Date(date);
        var year = dt.getFullYear()
        var MM = addZero(dt.getMonth() + 1)
        var dd = addZero(dt.getDate())

        var hh = addZero(dt.getHours())
        var mm = addZero(dt.getMinutes())
        var ss = addZero(dt.getSeconds())

        return `${year}-${MM}-${dd} ${hh}:${mm}:${ss}`
    }

    //补零函数
    function addZero(n) {
        return n < 10 ? ('0' + n) : n
    }
})
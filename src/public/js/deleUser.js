$(function () {
    $('#lists table tbody').on('click', '.dele', function (e) {
        // 获取该id
        let li_del = $(e.target).parent();
        let dropmenu = li_del.parent();
        let dropopen = dropmenu.parent();
        let tr = dropopen.parent();
        let id = Number(tr.find('.id').html());

        // console.log(id);
        let state = confirm("你确定要删除这只id为" + id + "的用户猫吗?");
        if (!state) {
            return;
        } else if (state) {
            $.ajax({
                data: {
                    action: 'delete',
                    id: id
                },
                type: 'post',
                url: '/api/admin/users',
                success: function (data) {
                    console.log(data);
                    //这里刷新一次页面
                    window.location.reload();

                    return;
                },
                error: function (err) {
                    console.log(err);
                    return;
                }

            });
        }
    })

});
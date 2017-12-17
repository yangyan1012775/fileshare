$(function () {
    $('#lists table tbody').on('click', '.dele', function (e) {
        // 获取该id

        let id = Number($(e.target).attr('data-id'));

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
<<<<<<< HEAD
                    if(data==='ok') {
                        alert('删除成功');
                        window.location.reload();
                    }  
=======
                    if (data === 'ok') {
                        //这里刷新一次页面
                        window.location.reload();

                        return;
                    }
>>>>>>> 5acc6ee1796b00fe105d9c0e06a3e408070b0e50

                },
                error: function (err) {
<<<<<<< HEAD
=======

>>>>>>> 5acc6ee1796b00fe105d9c0e06a3e408070b0e50
                    return;
                }

            });
        }
    })

});
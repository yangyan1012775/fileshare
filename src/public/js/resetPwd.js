$(function () {
    $('.table tbody').on('click', '.edit', function (e) {
        let id = Number($(e.target).attr('data-id'));

        let state = confirm('您确定要将这只id为' + id + '的用户猫的密码重置为000000吗?');
        if (!state) {
            return;
        } else if (state) {
            $.ajax({
                type: 'post',
                data: {
                    action: 'reset',
                    id: id
                },
                url: '/api/admin/users',
                success: function (data) {
                    if(data==='ok') {
                        alert('重置完成');
                    }
                    return;
                },
                error: function (err) {

                    return;
                }
            });
        }


    });
});
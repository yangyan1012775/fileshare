$(function () {
    // 统一操作
    $.ajax({
        url: '/api/admins/users?page=0',
        data: {

        },
        type: 'get',
        success: function (data) {
            console.log(data);
            // 获取数据
            console.log(data.Res);
            newTr(data.Res, '#lists table tbody');
            // 创建页码
            newPagination(data.Pages, '#lists');
            return;
        },
        error: function (err) {
            return;
        }
    });
});
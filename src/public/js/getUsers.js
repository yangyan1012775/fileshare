$(function(){
    $.ajax({
        url:'/api/admin/users',
        type:'get',
        data:{

        },
        success:function(data){
            for(let i = 0; i<data.length; i++) {
                //创建元素
                var newTr = $('<tr></tr>');
                var newID = $('<td>' + data[i].id + '</td>');
                var newName = $('<td>' + data[i].username + '</td>');
                var newEmail = $('<td>' + data[i].email + '</td>');
                var newDate = $('<td>' + data[i].created_at + '</td>');
                //定义操作
                var newEditor = $('<td class="dropdown"><button class="btn btn-default dropdown-toggle" data-toggle="dropdown">操作<span class="caret"></span></button><ul class="dropdown-menu" role="menu"><li class="dele"><a href="###">删除</a></li><li class="edit"><a href="###">重置密码</a></li></ul></td>');
              
                newTr.append(newID);
                newTr.append(newName);
                newTr.append(newEmail);
                newTr.append(newDate);
                newTr.append(newEditor);
                $('#lists table tbody').append(newTr);
            }
        },
        error:function(err){

        }

    });
});
$(function(){
    $.ajax({
        url:'/api/admin/users',
        type:'get',
        data:{

        },
        success:function(data){
            newTr(data, '#lists table tbody');
        },
        error:function(err){

        }

    });
});
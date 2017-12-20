$(function(){
    $.ajax({
        url:'/api/admins/users',
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
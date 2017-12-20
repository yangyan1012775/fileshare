$(function(){
    $.ajax({
        url:'/api/users/:id/allFiles',
        type:'get',
        success:function(data){
            console.log(data);
            newList(data,'.all');
        },
        error:function(err){
            alert('数据库查询失败');
        }

    });
    
    $('.getPictures').on('click',function(){
        $.ajax({
            url:'/api/users/:id/image',
            type:'get',
            success:function(data){
                console.log(data);
                newList(data,'.photo');
            },
            error:function(err){
                alert('数据库查询失败');
            }
    
        });
    });

    $('.getText').on('click',function(){
        $.ajax({
            url:'/api/users/:id/text',
            type:'get',
            success:function(data){
                console.log(data);
                newList(data,'.doc');
            },
            error:function(err){
                alert('数据库查询失败');
            }
    
        });
    });

    $('.getVideos').on('click',function(){
        $.ajax({
            url:'/api/users/:id/video',
            type:'get',
            success:function(data){
                console.log(data);
                newList(data,'.video');
            },
            error:function(err){
                alert('数据库查询失败');
            }
    
        });
    });

    $('.getZip').on('click',function(){
        $.ajax({
            url:'/api/users/:id/zip',
            type:'get',
            success:function(data){
                console.log(data);
                newList(data,'.zip');
            },
            error:function(err){
                alert('数据库查询失败');
            }
    
        });
    });

    $('.getOthers').on('click',function(){
        $.ajax({
            url:'/api/users/:id/other',
            type:'get',
            success:function(data){
                console.log(data);
                newList(data,'.other');
            },
            error:function(err){
                alert('数据库查询失败');
            }
    
        });
    });

    $('.getUnchecked').on('click',function(){
        $.ajax({
            url:'/api/users/:id/unchecked',
            type:'get',
            success:function(data){
                console.log(data);
                newList(data,'.unchecked');
            },
            error:function(err){
                alert('数据库查询失败');
            }
    
        });
    });
});
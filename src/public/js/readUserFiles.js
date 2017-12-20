function getMessage(filetype) {
    $.ajax({
        type: 'get',
        url: '/api/files?type=doc',
        success: function (data) {
                console.log(data);
        },
        error: function (err) {
            alert('获取数据失败！');
            return;
        }
    });
    for(var i=0;i<5;i++){
        $(filetype).children().eq(i).on('click',function(){
            var type=$(this).children().attr("data-type");
            var url='/api/files?'+type;
            console.log(url);
            $.ajax({
                type: 'get',
                url: '/api/files?type='+type,
                success: function (data) {
                        console.log(data);
                },
                error: function (err) {
                    alert('获取数据失败！');
                    return;
                }
            });
        })
    }
}   

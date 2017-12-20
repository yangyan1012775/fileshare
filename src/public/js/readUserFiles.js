function getMessage(filetype) {
    var perpage = 10;    // 每页显示的条数
    var page = 1;       // 当前页
    var pages = 0;      // 总页数
    
    $.ajax({
        type: 'get',
        url: '/api/files?type=doc',
        success: function (data) {
            Render(data);
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
                    page = 1;
                    Render(data);
                },
                error: function (err) {
                    alert('获取数据失败！');
                    return;
                }
            });
        })
    }

    function Pages(data) {
        $('.pagination.p-c > li').children('a').click(function () {
            if ($(this).parent().hasClass('previous')) {
                page--;
                console.log(page);
            } else if ($(this).parent().hasClass('next')) {
                page++;
                console.log(page);
            }
            Render(data);
        });
    }

    function Render(data) {
        var p = '';
        var html = '';

        var start = Math.max(0, (page - 1) * perpage);
        var end = Math.min(start + perpage, data.length);
        pages = Math.max(Math.ceil(data.length / perpage), 1);

        for (var i = start; i < end; i++) {
            html += '<tr><td>' + data[i].id + '</td><td><a href="#">' + data[i].filename + '</a></td><td>' + data[i].type + '</td><td>' + data[i].size + '</td><td>' + data[i].downloads + '</td><td><a class="deleteF" href="#">删除</a></td></tr>';
        }
        $('.table').children('tbody').html(html);
        $('.pagination.p-c').html('');
        p += '<li class="previous"><a href="#">&laquo;</a></li>';
        for (var j = 0; j < pages; j++) {
            p += '<li><a href="#">' + (j + 1) + '</a></li>';
        }
        p += '<li class="next"><a href="#">&raquo;</a></li>';
        $('.pagination.p-c').html($('.pagination.p-c').html() + p);

        if (page <= 1) {
            page = 1;
            $('.pagination.p-c').children('li:first-child').css('opacity', '0');
        } else {
            $('.pagination.p-c').children('li:first-child').css('opacity', '1');
        }
        if (page >= pages) {
            page = pages;
            $('.pagination.p-c').children('li:last-child').css('opacity', '0');
        } else {
            $('.pagination.p-c').children('li:last-child').css('opacity', '1');
        }

        Pages(data);
    }
}   

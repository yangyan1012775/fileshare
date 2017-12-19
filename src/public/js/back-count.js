//用户注册量
var userCount = 150;
var userCount_year = 100;
var userCount_mouth = 30;
var userCount_day = 10;
//动态产生
function Prorun(){
	$('.progress').eq(0).find('div').css({
		width:(userCount_day/userCount_mouth)*100+'%'
	}).find('span').html(userCount_day);
	$('.progress').eq(1).find('div').css({
		width:(userCount_mouth/userCount_year)*100+'%'
	}).find('span').html(userCount_mouth);
	$('.progress').eq(2).find('div').css({
		width:(userCount_year/userCount)*100+'%'
	}).find('span').html(userCount_year);
}
Prorun();

$(document).ready(function () {
	//网站下载分量统计
    $('#updownloadChart').jqChart({
        title: { text: '上传下载分类量统计' },
        animation: { duration: 1 },
        shadows: {
            enabled: true
        },
        series: [
            {
                type: 'column',
                title: '上传量',
                fillStyle: '#418CF0',
                data: [['图片', 330], ['文档', 570], ['视频', 50],
                       ['音乐', 222], ['压缩包', 150], ['其他', 70]]
            },
            {
                type: 'column',
                title: '下载量',
                fillStyle: '#FCB441',
                data: [['图片', 520], ['文档', 720], ['视频', 120],
                       ['音乐', 555], ['压缩包',253], ['其他', 122]]
            }
        ]
    });
    
    //文件总量饼图
    var background = {
        type: 'linearGradient',
        x0: 0,
        y0: 0,
        x1: 0,
        y1: 1,
        colorStops: [{ offset: 0, color: '#d2e6c9' },
                     { offset: 1, color: 'white' }]
    };
     $('#fileChart').jqChart({
        title: { text: '文件总量' },
        legend: { title: '文件分类' },
        border: { strokeStyle: '#6ba851' },
        background: background,
        animation: { duration: 1 },
        shadows: {
            enabled: true
        },
        series: [
            {
                type: 'pie',
                fillStyles: ['#418CF0', '#FCB441', '#E0400A', '#056492', '#BFBFBF', '#1A3B69', '#FFE382'],
                labels: {
                    stringFormat: '%.1f%%',
                    valueType: 'percentage',
                    font: '15px sans-serif',
                    fillStyle: 'white'
                },
                explodedRadius: 10,
                explodedSlices: [5],
                data: [['图片', 330], ['文档', 570], ['视频', 50],
                       ['音乐', 222], ['压缩包', 253], ['其他', 122]]
            }
        ]
    });

    $('#fileChart').bind('tooltipFormat', function (e, data) {
        var percentage = data.series.getPercentage(data.value);
        percentage = data.chart.stringFormat(percentage, '%.2f%%');

        return '<b>' + data.dataItem[0] + '</b><br />' +
               data.value + ' (' + percentage + ')';
    });
    //访问人数统计
    $('#weekbtn').on('click',function(){
    	$('#weekshow').css({
    		display:'block'
    	});
    	$('#monthshow').css({
    		display:'none'
    	});
    	$('#yearshow').css({
    		display:'none'
    	});
    });
    $('#monthbtn').on('click',function(){
    	$('#weekshow').css({
    		display:'none'
    	});
    	$('#monthshow').css({
    		display:'block'
    	});
    	$('#yearshow').css({
    		display:'none'
    	});
    });
    $('#yearbtn').on('click',function(){
    	$('#weekshow').css({
    		display:'none'
    	});
    	$('#monthshow').css({
    		display:'none'
    	});
    	$('#yearshow').css({
    		display:'block'
    	});
    });
    $('#weekChart').jqChart({
        title: { text: '最近7天访问情况' },
        animation: { duration: 1 },
        axes: [
            {
                type: 'category',
                location: 'bottom',
                categories: ['11.04', '11.05', '11.06', '11.07', '11.08', '11.09', '11.10']
            }
        ],
        series: [
            {
                type: 'line',
                title: '访问人数',
                strokeStyle: '#418CF0',
                lineWidth : 2,
                data: [62, 70, 68, 58, 52, 60, 48],
                labels: {
                    stringFormat: '%d',
                    font: '12px sans-serif'
                }
            }
        ]
    });
    $('#monthChart').jqChart({
        title: { text: '本月访问情况' },
        animation: { duration: 1 },
        axes: [
            {
                type: 'category',
                location: 'bottom',
                categories: ['11.01', '11.02', '11.03', '11.04', '11.05', '11.06', '11.07', '11.08', '11.09', '11.10']
            }
        ],
        series: [
            {
                type: 'line',
                title: '访问人数',
                strokeStyle: '#418CF0',
                lineWidth : 2,
                data: [66,42,51,62, 70, 68, 58, 52, 60, 48],
                labels: {
                    stringFormat: '%d',
                    font: '12px sans-serif'
                }
            }
        ]
    });
    $('#yearChart').jqChart({
        title: { text: '年度访问情况' },
        animation: { duration: 1 },
        axes: [
            {
                type: 'category',
                location: 'bottom',
                categories: ['12月','1月','2月','3月','4月','5月','6月','7月','8月','9月', '10月', '11月']
            }
        ],
        series: [
            {
                type: 'line',
                title: '访问人数',
                strokeStyle: '#418CF0',
                lineWidth : 2,
                data: [821,1212,1401,1752,1425,1321,1766,1952,1654,1248,1200,577],
                labels: {
                    stringFormat: '%d',
                    font: '12px sans-serif'
                }
            }
        ]
    });
});

//跳转效果
$('#userTab').click(function(){
	$('#userAside').addClass('active');
	$('#visitAside').removeClass('active');
	$('#fileAside').removeClass('active');
	$('#updownloadAside').removeClass('active');
	Prorun();
});
$('#visitTab').click(function(){
	$('#userAside').removeClass('active');
	$('#visitAside').addClass('active');
	$('#fileAside').removeClass('active');
	$('#updownloadAside').removeClass('active');
});
$('#fileTab').click(function(){
	$('#userAside').removeClass('active');
	$('#visitAside').removeClass('active');
	$('#fileAside').addClass('active');
	$('#updownloadAside').removeClass('active');
});
$('#updownloadTab').click(function(){
	$('#userAside').removeClass('active');
	$('#visitAside').removeClass('active');
	$('#fileAside').removeClass('active');
	$('#updownloadAside').addClass('active');
});
//另一组
$('#userAside').click(function () {
     //左边导航栏变化
     $('#userAside').addClass("active");
     $('#visitAside').removeClass("active");
     $('#fileAside').removeClass("active");
     $('#updownloadAside').removeClass("active");

     //导航头部变化
     $('#userTab').addClass("active");
     $('#visitTab').removeClass("active");
     $('#fileTab').removeClass("active");
     $('#updownloadTab').removeClass("active");

     //内容变化
     $('#userShow').addClass("active");
     $('#visitShow').removeClass("active");
     $('#fileShow').removeClass("active");
     $('#updownloadShow').removeClass("active");
	
	//进度条刷新
})

$('#visitAside').click(function () {
     //左边导航栏变化
     $('#userAside').removeClass("active");
     $('#visitAside').addClass("active");
     $('#fileAside').removeClass("active");
     $('#updownloadAside').removeClass("active");

     //导航头部变化
     $('#userTab').removeClass("active");
     $('#visitTab').addClass("active");
     $('#fileTab').removeClass("active");
     $('#updownloadTab').removeClass("active");

     //内容变化
     $('#userShow').removeClass("active");
     $('#visitShow').addClass("active");
     $('#fileShow').removeClass("active");
     $('#updownloadShow').removeClass("active");
	
})

$('#fileAside').click(function () {
     //左边导航栏变化
     $('#userAside').removeClass("active");
     $('#visitAside').removeClass("active");
     $('#fileAside').addClass("active");
     $('#updownloadAside').removeClass("active");

     //导航头部变化
     $('#userTab').removeClass("active");
     $('#visitTab').removeClass("active");
     $('#fileTab').addClass("active");
     $('#updownloadTab').removeClass("active");

     //内容变化
     $('#userShow').removeClass("active");
     $('#visitShow').removeClass("active");
     $('#fileShow').addClass("active");
     $('#updownloadShow').removeClass("active");
	
})

$('#updownloadAside').click(function () {
     //左边导航栏变化
     $('#userAside').removeClass("active");
     $('#visitAside').removeClass("active");
     $('#fileAside').removeClass("active");
     $('#updownloadAside').addClass("active");

     //导航头部变化
     $('#userTab').removeClass("active");
     $('#visitTab').removeClass("active");
     $('#fileTab').removeClass("active");
     $('#updownloadTab').addClass("active");

     //内容变化
     $('#userShow').removeClass("active");
     $('#visitShow').removeClass("active");
     $('#fileShow').removeClass("active");
     $('#updownloadShow').addClass("active");
	
})
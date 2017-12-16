 //---设置对应的点击事件
 $(function () {
    var act;
    $('.all').css('display', 'block');
    $(".list-group li").click(function () {
        $(".list-group li").removeClass('active');
        $(this).addClass('active');
        act = $(this).index();
        $('.dl').css('display', 'none');
        switch (act) {
            case 0:
                $('.all').css('display', 'block');
                break;
            case 1:
                $('.photo').css('display', 'block');
                break;
            case 2:
                $('.doc').css('display', 'block');
                break;
            case 3:
                $('.video').css('display', 'block');
                break;
            case 4:
                $('.music').css('display', 'block');
                break;
            case 5:
                $('.zip').css('display', 'block');
                break;
            case 6:
                $('.other').css('display', 'block');
                break;
        }
    })
});
//获取登录的用户名
$(function () {
    console.log(localStorage.getItem("username"));
    $('#user').html("<i class=\"fa fa-user-o\" aria-hidden=\"true\"></i>\n" + localStorage.getItem("username"));
})
//---设置高度
$(function () {
    //---设置左边高度为可见窗口高度
    $('.left').css('height', window.innerHeight);

    //---设置右边内容高度=可见窗口高度-头部总高度
    $('.dl').css('height', window.innerHeight - $('.right-header').outerHeight(true));

});

//---监听页面改变时的高度
$(window).resize(function () {
    //---设置左边高度为可见窗口高度
    $('.left').css('height', window.innerHeight);

    //---设置右边内容高度=可见窗口高度-头部总高度
    $('.dl').css('height', window.innerHeight - $('.right-header').outerHeight(true));

});
//------------全部文件------------
$(function () {
    // =======删除=======
    $(".delete").on("click", function () {
        $(".all-container .checkbox").each(function (index, ele) {
//                alert(1);
            if ($(this).attr("checked") == "checked") {
                $(this).parents('.all-container').remove();
            }
        })
    });
    $(".delete").on("click", function () {
        $(".aaa .checkbox").each(function (index, ele) {
            if ($(this).attr("checked") == "checked") {
                $(this).parents('.aaa').remove();
            }
        })
    });
    // ==========下载===========
    $('.down').on('click', function () {
        $(".all-container .checkbox").each(function (index, ele) {
            if ($(this).attr("checked") == "checked") {
                var name = $(this).parents('.all-container').children('tr').children('th').children('a').text();
                alert('恭喜你！下载' + name + '成功！');
            }
        })
    });
    $('.down').on('click', function () {
        $(".aaa .checkbox").each(function (index, ele) {
            if ($(this).attr("checked") == "checked") {
                var name = $(this).parents('.aaa').children().eq(1).text();
                alert('恭喜你！下载' + name + '成功！');
            }
        })
    });
})
//--------------图片
$(function () {
    var preIndex;
    $('#smImg').on('click', '.imgAct', function () {
        var path = $(this).find('img')[0].src;
        $('.show').css('display', 'block');
        $('.bigimg').attr('src', path);
        preIndex = $(this).index();
        console.log(preIndex);
    })

    $('.pre').on('click', function () {
        if (preIndex <= 0) {
            alert('抱歉，已经没有更多了！')
        } else {
            preIndex = --preIndex;
//				console.log(preIndex);
            var Src = $(".imgAct:eq(" + preIndex + ")").find('img')[0].src;
            $('.bigimg').attr('src', Src);
        }
    });

    $('.next').on('click', function () {
        var imgLength = $('#smImg .imgAct').length;
        if (preIndex >= imgLength - 1) {
            alert('抱歉，已经是最后一张了！')
        } else {
            preIndex = ++preIndex;
            console.log(preIndex);
            var Src = $(".imgAct:eq(" + preIndex + ")").find('img')[0].src;
            $('.bigimg').attr('src', Src);
        }
    });

    $('.show .close').on('click', function () {
        $('.show').css('display', 'none');
    });

    //图片选中删除
    $('#smImg').on('mouseenter', '.imgAct', function () {
        $(this).find('a').css('display', 'block');
    });
    $('#smImg').on('mouseleave', '.imgAct', function () {
        $(this).find('a').css('display', 'none');
    });
    //这个绑定事件在动态添加的节点中不起作用？？？？？？？？
    //必须用动态添加之前的已存在的父节点来绑定事件
    $('#smImg').on('click', '.check', function (event) {
        //阻止事件冒泡
        event.stopPropagation()
        if ($(this).attr('checked') == 'checked') {
//				event.preventDefault();
            $(this).parents('.imgAct').css('border', '3px solid #3b8cff');
//				$(this).parent('.imgAct').off('mouseleave');
//				$('#smImg').off('mouseleave',$(this).parent('.imgAct'));
//				console.log($(this));
//				console.log($(this).parent('.imgAct'));

        } else {
            $(this).parents('.imgAct').css('border', '3px solid lightgrey');
        }
    });
    $('.delete').on('click', function () {
        $('.imgAct input').each(function (index, ele) {
            if ($(this).attr('checked') == 'checked') {
                $(this).parents('.imgAct').remove();
            }
        });
    });
    $('.down').on('click', function () {
        $('.imgAct input').each(function (index, ele) {
            if ($(this).attr('checked') == 'checked') {
//					var name=$(this).parents('.imgAct').find('img')[0].src;
                var name = $(this).parents('.imgAct').find('img').attr('src');
                alert('恭喜你！下载' + name + '成功！');
//                  return false;
            }
        });
    });

});

//---视频-----------
$(function () {
    $('.video').on('click', '.vdname', function (e) {
//            var act = $(this).children('.video-container').children('label').children('a').text();
//            var act =  $(e.target).text();//第二种获取当前对象的方法
        var act = $(this).text();
//          alert(act);
        var Src = 'data/video/' + act;
        $('.vd').attr('src', Src);
        $('.video .show').css('display', 'block');
        $('.vd').css('display', 'block');
        $('.vdname').css('display', 'none');
    });

    $('.close').on('click', function () {
        $('.video .show').css('display', 'none');
        $('.vd').css('display', 'none');
        $('.vdname').css('display', 'block');
        $('.vd').trigger('pause');
    })
    // =======删除=======
    $(".delete").on("click", function () {
        $(".video-container .checkbox").each(function (index, ele) {
            if ($(this).attr("checked") == "checked") {
                alert(1);
                $(this).parents('.video-container').remove();
            }
        })
    })
    // ==========下载===========
    $('.down').on('click', function () {
        $(".video-container .checkbox").each(function (index, ele) {
            if ($(this).attr("checked") == "checked") {
                var name = $(this).parents('.video-container').children('label').children('a').text();
                alert('恭喜你！下载' + name + '成功！');
                return false;
            }
        })
    })
});

//---音频
$(function () {
    var flag = true;
    $(".play .playImg").each(function (index, ele) {
        $(this).on("click", function () {
            if (flag == true) {
                this.src = "assets/img/pause.png";
                $(this).parent().prev().children()[2].play();
//                    $(".audios")[0].play();
                flag = false;
                return;
            }
            if (flag == false) {
                this.src = "assets/img/play.png";
                $(this).parent().prev().children()[2].pause();
                flag = true;
                return;
            }
        })
    })
    $(".play .stopImg").each(function () {
        $(this).on("click", function (index, ele) {
            $(this).parent().prev().children()[2].pause();
            $(this).parent().prev().children()[2].currentTime = 0;
            console.log($(this).prev().attr("src"));
            $(this).prev().attr("src", "assets/img/play.png");
            flag = true;
        })
    })
    //=======删除===========
    $(".delete").on("click", function () {
        $(".audio-container .checkbox").each(function (index, ele) {
            if ($(this).attr("checked") == "checked") {
                $(this).parents('.audio-container').remove();
            }
        })
    })
    // ==========下载===========
    $('.down').on('click', function () {
        $(".audio-container .checkbox").each(function (index, ele) {
            if ($(this).attr("checked") == "checked") {
                var name = $(this).parents('.audio-container').children().children('span').text();
                alert('恭喜你！下载' + name + '成功！');
            }
        })
    })
});

//--------------压缩包-------------
$(function () {
    $(".delete").on("click", function () {
        $(".zip-container .checkbox").each(function (index, ele) {
            if ($(this).attr("checked") == "checked") {
                $(this).parents('.zip-container').remove();
            }
        })
    })
    // ==========下载===========
    $('.down').on('click', function () {
        $(".zip-container .checkbox").each(function (index, ele) {
            if ($(this).attr("checked") == "checked") {
                var name = $(this).parents('.zip-container').children('label').children('a').text();
                alert('恭喜你！下载' + name + '成功！');
                return false;
            }
        })
    })
})
//----------其他--------------------
$(function () {
    $(".delete").on("click", function () {
        $(".other-container .checkbox").each(function (index, ele) {
            if ($(this).attr("checked") == "checked") {
                $(this).parents('.other-container').remove();
            }
        })
    })
    // ==========下载===========
    $('.down').on('click', function () {
        $(".other-container .checkbox").each(function (index, ele) {
            if ($(this).attr("checked") == "checked") {
                var name = $(this).parents('.other-container').children('label').children('a').text();
                alert('恭喜你！下载' + name + '成功！');
                return false;
            }
        })
    })
})
//-------------文档------------
$(function () {
    $(".delete").on("click", function () {
        $(".doc-container .checkbox").each(function (index, ele) {
            if ($(this).attr("checked") == "checked") {
                $(this).parents('.doc-container').remove();
            }
        })
    });
    // ==========下载===========
    $('.down').on('click', function () {
        $(".doc-container .checkbox").each(function (index, ele) {
            if ($(this).attr("checked") == "checked") {
                var name = $(this).parents('.doc-container').children('label').children('a').text();
                alert('恭喜你！下载' + name + '成功！');
                return false;
            }
        })
    })
})
//===========单选框，复选框======
//  $('input').iCheck({
//      checkboxClass: 'icheckbox_square-blue',
//      radioClass: 'iradio_square-blue',
//      increaseArea: '20%' // optional
//  });
//-------获取文件信息-----------
var nameArray = [];
var sizeArray = [];
var typeArray = [];
var timeArray = [];

$(function () {
    $('#files').change(function () {
        var f = document.getElementById('files').files[0];
        for (var key in f) {
//                console.log(key + ":" + f[key]);
            if (key == 'name') {
                var name = f[key];
                console.log("name:" + f[key]);
                nameArray.push(f[key]);
            }
            if (key == 'size') {
                var size = f[key];
//                    console.log("size:" + f[key]);
                sizeArray.push(f[key]);
            }
            if (key == 'type') {
                var type = f[key];
//                    console.log("type:" + f[key]);
                typeArray.push(f[key]);
            }
        }


        for (var i = 0; i < nameArray.length; i++) {
            console.log("nameArray为：" + nameArray[i]);
        }

        function p(s) {
            return s < 10 ? '0' + s : s;
        }

        var myDate = new Date();
        //获取当前年
        var year = myDate.getFullYear();
        //获取当前月
        var month = myDate.getMonth() + 1;
        //获取当前日
        var date = myDate.getDate();
        var h = myDate.getHours();       //获取当前小时数(0-23)
        var m = myDate.getMinutes();     //获取当前分钟数(0-59)
        var s = myDate.getSeconds();

        var now = year + '-' + p(month) + "-" + p(date) + " " + p(h) + ':' + p(m) + ":" + p(s);
//            console.log("uptime:" + now);
        timeArray.push(now);

        //---将数据存入localstroage
        var localstroage = window.localStorage;
//            console.log(nameArray);
        localstroage.setItem('name', nameArray);
//            console.log(sizeArray);
        localstroage.setItem('size', sizeArray);
//            console.log(typeArray);
        localstroage.setItem('type', typeArray);
//            console.log(timeArray);
        localstroage.setItem('uptime', timeArray);

        //---清空tbody后进行添加
        $('tbody').remove();
        for (var i = 0; i < nameArray.length; i++) {
            var tablerow = '<tbody class="col-12">\n' +
                '                    <tr class="row mx-0 aaa">\n' +
                '                        <td class="col-1 col-xl-1 col-sm-1 text-center"><input type="checkbox" class="checkbox"></td>\n' +
                '                        <td class="col-4 col-xl-5 col-sm-4 ">' + nameArray[i] + '</td>\n' +
                '                        <td class="col-3 col-xl-3 col-sm-3 ">' + (sizeArray[i] / 1024).toFixed(1) + ' kB' + '</td>\n' +
                '                        <td class="col-4 col-xl-3 col-sm-4 ">' + timeArray[i] + '</td>\n' +
                '                    </tr>\n' +
                '                    </tbody>';
//                console.log(tablerow);
            $('#table').append(tablerow);
        }


        var nameArr = [];
        var typeArr = [];
        nameArr = localStorage.name.split(',');
        typeArr = localStorage.type.split(',');
        var typeLength = typeArr.length;
//			alert(localStorage.name);
//			alert(localStorage.type);
        //上传图片
        $('#smImg').children('i').nextAll().remove();
        for (var i = 0; i < typeLength; i++) {
            if (typeArr[i] == 'image/jpeg') {
//          		alert(nameArr[i]);
                var addImg = '<div class="imgAct">\n' +
                    '	<a href="#"><input class="check" type="checkbox" name="" id="" value="" /></a>\n' +
                    '	<img src="assets/img/' + nameArr[i] + '"/>\n' +
                    '</div>';
                $('#smImg').append(addImg);
            }
        }
        //上传视频
        $('.video').children('.show').nextAll().remove();
        for (var i = 0; i < typeLength; i++) {
            if (typeArr[i] == 'video/mp4') {
                var addVideo = '<div class="video-container">' +
                    '	<input type="checkbox" class="checkbox"/>' +
                    '	<label class="clearfix  vdparent">' +
                    '	<i class="fa fa-file-video-o video-tag"></i>' +
                    '	<a href="#" class="vdname">' + nameArr[i] + '</a>' +
                    '	</label>' +
                    '</div>';
                $('.video').append(addVideo);
            }
        }
        //上传音频
        $('.music').children('i').nextAll().remove();
        for (var i = 0; i < typeLength; i++) {
            if (typeArr[i] == 'audio/mp3') {
//          		alert(nameArr[i]);
                var addAud = '<div class="row audio-container">' +
                    '<div class="col-lg-5 col-md-5 col-sm-5 col-xl-5  col-5">' +
                    '    <input type="checkbox" class="checkbox">' +
                    '    <i class="fa fa-music music-tag"></i>' +
                    '    <audio src="data/audio/' + nameArr[i] + '" class="audios"></audio>' +
                    '    <span class="audio-name">' + nameArr[i] + '</span>' +
                    '</div>' +
                    '<div class="col-lg-5 col-md-5 col-sm-5 col-xl-5  col-5 play">' +
                    '    <img src="assets/img/play.png" alt="" class="playImg">' +
                    '    <img src="assets/img/stop.png" alt="" class="stopImg">' +
                    '</div>' +
                    '</div>';
                $('.music').append(addAud);
            }
        }
        //压缩包
        $('.zip').children('i').nextAll().remove();
        for(var i=0;i<typeLength;i++){
            if(typeArr[i]=='application/zip'){
//          		alert(nameArr[i]);
                var addTar='<div class="zip-container">'+
                    '    <input type="checkbox" class="checkbox"/>'+
                    '    <label class="clearfix">'+
                    '        <i class="fa fa-file-archive-o zip-tag"></i>'+
                    '        <a href="#" class="zipname">'+nameArr[i]+'</a>'+
                    '    </label>'+
                    '</div>';

                $('.zip').append(addTar);
            }
        }
        //上传文档
        for (var i = 0; i < nameArray.length; i++) {
//                console.log(nameArray[i]);
            if (nameArray[i].indexOf('txt') > 0) {
//                    console.log(nameArray[i]+":"+i);
                var tablerow = '<tbody class="col-12">\n' +
                    '                    <tr class="row mx-0">\n' +
                    '                        <td class="col-1 col-xl-1 col-sm-1 text-center"><input type="checkbox" ></td>\n' +
                    '                        <td class="col-4 col-xl-5 col-sm-4 ">' + nameArray[i] + '</td>\n' +
                    '                        <td class="col-3 col-xl-3 col-sm-3 ">' + (sizeArray[i] / 1024).toFixed(1) + ' kB' + '</td>\n' +
                    '                        <td class="col-4 col-xl-3 col-sm-4 ">' + timeArray[i] + '</td>\n' +
                    '                    </tr>\n' +
                    '                    </tbody>';
//                    console.log(tablerow);
                $('#table-txt').append(tablerow);
            }
        }

        //---点击相应栏获取文件名，再获取txt内容并弹出
        $("#table-txt tr td").on('click', function () {
            var td = $(this).find("td");
//                console.log(td);
            var name=td.prevObject[0].innerText;
//                console.log(name);
            var url='data/file/'+name;
            $.ajax({
                url: url,
                dateType: 'text',
                success: function (data) {
                    alert(name + "的内容为： \n  \n" + data);
                }
            });
        });

    })
});


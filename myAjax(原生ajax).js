const $myAjax = {
    ajax: (args) => {
        args.url = args.url || '';
        // 默认get方法
        args.type = args.type || 'get';
        // 转为大写
        args.type = args.type.toLocaleUpperCase();
        args.data = args.data || {};
        args.success = args.success || null;
        args.error = args.error || null;
        //创建对象
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                var rtn;
                if (xhr.status >= 200 && xhr.status <= 206 || xhr.status == 304) {
                    rtn = JSON.parse(xhr.responseText);
                    typeof (args.success) == 'function' && args.success(rtn);
                } else {
                    rtn = JSON.parse(xhr.responseText);
                    typeof (args.error) == 'function' && args.error(xhr.status, 'error', rtn);
                }
            }
        }
        //定义中转的函数
        let transform = {
            // 转成源格式  xxx=xxx&xxx=xxx
            toSource: (obj, toEncode = false) => {
                var res = '';
                for (const item in obj) {
                    res += item + '=' + (toEncode ? encodeURI(obj[item]) : obj[item]) + '&';
                }
                return res.slice(0, res.length - 1);
            },
            // 设置请求头
            setHeaders: (obj) => {
                //设置标志变量, 若有设置contentType即取反
                var flag = 0,
                    // contentType 属性值
                    CT = args.contentType;
                //能否设置contentType
                var canCT = CT == false ? false : true;
                if (obj != undefined) {
                    // 若有设置属性值 则在headers里加上属性值
                    if (typeof (CT) == 'string') {
                        obj["Content-type"] = CT;
                    }
                    for (const item in obj) {
                        if (item == "Content-type" && canCT) {
                            // 已设置contentType
                            flag = 1;
                        }
                        xhr.setRequestHeader(item, obj[item])
                    }
                }
                // post方法默认的contentType
                if (flag == 0 && args.type == "POST" && canCT) {
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
                }
            },
            //是否为JSON字符串
            isJSON: (str) => {
                if (typeof str == 'string') {
                    try {
                        JSON.parse(str);
                        return true;
                    } catch (e) {
                        console.log('error：' + str + '!!!' + e);
                        return false;
                    }
                }
            }
        }
        // 根据请求类型的不同进行处理
        if (args.type == "GET") {
            if (args.url != '') {
                let data = transform.toSource(args.data, true)
                // data不为空就加一个 '?'
                args.url += (data == '' ? '' : '?') + data;
            } else {
                throw "url can not be empty"
            }
        } else if (args.type == "POST") {
            if (args.processData == false ? false : true) {
                // 如果不是JSON字符串则转换成  xxx=xxx&xxx=xxx的格式
                if (!transform.isJSON(args.data)) {
                    args.data = transform.toSource(args.data, true);
                }
            }
        }
        xhr.open(args.type, args.url, (args.async == false ? false : true));
        transform.setHeaders(args.headers);
        xhr.send(args.type == "GET" ? null : args.data);
    }
}
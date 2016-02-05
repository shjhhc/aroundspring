/**
 * Array 护展 contains 方法
 * 
 * @param obj
 * @returns {Boolean}
 */
Array.prototype.contains = function(obj) {
	var i = this.length;
	while (i--) {
		if (this[i] === obj) {
			return true;
		}
	}
	return false;
}

/**
 * Array 扩展 remove 方法
 * 
 * @param obj
 * @returns {Boolean}
 */
Array.prototype.remove = function(b) {
	var a = this.indexOf(b);
	if (a >= 0) {
		this.splice(a, 1);
		return true;
	}
	return false;
};


/**
 * jQuery 扩展 serializeObject 方法
 * 
 * @param obj
 * @returns {Boolean}
 */
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

/**
 * jQuery 扩展 stringify 方法
 * 
 * @param obj
 * @returns {Boolean}
 */
jQuery.stringify = typeof JSON != 'undefined' ? JSON.stringify : function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string") obj = '"'+obj+'"';
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n]; t = typeof(v);
            if (obj.hasOwnProperty(n)) {
                if (t == "string") 
                {
                    v = '"' + v + '"';
                } 
                else if (t == "object" && v !== null)
                {
                    v = jQuery.stringify(v);
                }

                json.push((arr ? "" : '"' + n + '":') + String(v));
            }
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};


/**
 * 成功提示
 * @param fn
 */
function alertSuccess(fn) {
	var _fn = fn || function(){};
	$.messager.alert('提示信息','操作成功','info', _fn);
}

/**
 * 成功提示
 * @param fn
 */
function alertInfo(msg,fn) {
	var _fn = fn || function(){};
	$.messager.alert('提示信息',msg||'操作成功','info', _fn);
}

/**
 * 操作失败提示
 * @param failedMsg
 */
function alertFailed(failedMsg,fn) {
	var _fn = fn || function(){};
	$.messager.alert('错误信息',failedMsg || '操作失败',"error",_fn);
}

/**
 * 警告提示
 * @param msg
 * @param fn
 */
function alertWarning(msg, fn) {
	
	$.messager.alert('提示信息',msg ,'warning',fn||function(){} );
}


/**
 * 确认提示
 * @param {} msg
 * @param {} fn
 */
function alertComfirm(msg,fn)
{
	$.messager.confirm("确认信息",msg, function (btn) {
        if (btn) {
             fn.call(this)
        }
    });
}

/**
 * 删除确定
 * @param {} fn
 */
function deleteComfirm(fn)
{
	$.messager.confirm('确认信息', '确定要删除吗?', function (btn) {
        if (btn) {
             fn.call(this)
        }
    });
}
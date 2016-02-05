/**
 * GiifiCalc 公共JS方法
 * @help:需要jQuery库，jQuery-UI 库的支持
 * @author：xhc
 * */
$.GiifiCalc = {};
(function() {
	var _this = $.GiifiCalc;
	$
			.extend(
					$.GiifiCalc,
					{
						IFarmId:'',
						/**
						 * 设置缓存区域,用于在客户端保存较大的静态数据
						 * */
						body : jQuery("body"),
						/**
						 * 信息提示框,包含如下参数
						 * @title:提示框标题
						 * @msg:提示框输出内容
						 * @callback:点击提示框中关闭按钮后触发的方法，比如刷新页面的方法等,没有传NULL
						 * */
						SuccessMessageTips : function(title, msg, callback) {
							/// <summary>信息提示框,包含如下参数,Jquery-ui</summary>
							/// <param name="title" type="string">提示框标题</param>
							/// <param name="msg" type="string">提示框输出内容</param>
							/// <param name="callback" type="function">点击提示框中关闭按钮后触发的方法，比如刷新页面的方法等,没有传NULL</param>
							/// <returns type="JSON">无</returns>
							$("#dialog")
									.html(
											'<div style="height:auto;max-height:41px; width:307px;line-height:41px; text-align:center;">'
													+ msg + '</div>');
							$("#dialog").dialog({
								autoOpen : true,
								resizable : false,
								modal : true,
								maxheight : "180", // 高度
								width : "350", // 宽度
								title : title,
								buttons : {
									"关闭" : function() {
										// 关闭对话框
										$(this).dialog("close");
										if (callback)
											callback();
									}
								}
							});
						},
						SuccessMessageTipsForEasyUi : function(title, msg, callback) {
							/// <summary>信息提示框,包含如下参数,EasyUi</summary>
							/// <param name="title" type="string">提示框标题</param>
							/// <param name="msg" type="string">提示框输出内容</param>
							/// <param name="callback" type="function">点击提示框中关闭按钮后触发的方法，比如刷新页面的方法等,没有传NULL</param>
							/// <returns type="JSON">无</returns>
							$("#dialog")
									.html(
											'<div style="height:auto;max-height:41px; width:307px;line-height:41px; text-align:center;">'
													+ msg + '</div>');
							$("#dialog").dialog({
								autoOpen : true,
								resizable : false,
								modal : true,
								maxheight : "180", // 高度
								width : "350", // 宽度
								close:false,
								title : title,
								buttons : [{
										text:'关闭',
										handler:function(){
											$("#dialog").dialog('close');
											if (callback)
												callback();
										}
								}]
							});
						},
						confirmMessageTips : function(title, msg, callback1,
								callback2) {
							/// <summary>执行询问提示框,包含如下参数</summary>
							/// <param name="title" type="string">提示框标题</param>
							/// <param name="msg" type="string">提示框输出内容</param>
							/// <param name="callback1" type="function">点击提示框中确定按钮后触发的方法，比如刷新页面的方法等,没有传NULL</param>
							/// <param name="callback2" type="function">点击提示框中取消按钮后触发的方法，比如刷新页面的方法等,没有传NULL</param>
							/// <returns type="JSON">无</returns>
							$("#dialog")
									.html(
											'<div style="height:auto;max-height:41px; width:307px;line-height:41px; text-align:center;">'
													+ msg + '</div>');
							$("#dialog").dialog({
								autoOpen : true,
								resizable : false,
								modal : true,
								maxheight : "180", // 高度
								width : "350", // 宽度
								title : "[" + title + "]",
								buttons : {
									"确定" : function() {
										// 关闭对话框
										$(this).dialog("close");
										if (callback1)
											callback1();
									},
									"取消" : function() {
										// 关闭对话框
										$(this).dialog("close");
										if (callback2)
											callback2();
									}
								}
							});
						},
						confirmMessageTipsForEasyUi : function(title, msg, callback1,
								callback2) {
							/// <summary>执行询问提示框,包含如下参数,EasyUi</summary>
							/// <param name="title" type="string">提示框标题</param>
							/// <param name="msg" type="string">提示框输出内容</param>
							/// <param name="callback1" type="function">点击提示框中确定按钮后触发的方法，比如刷新页面的方法等,没有传NULL</param>
							/// <param name="callback2" type="function">点击提示框中取消按钮后触发的方法，比如刷新页面的方法等,没有传NULL</param>
							/// <returns type="JSON">无</returns>
							$("#dialog")
									.html(
											'<div style="height:auto;max-height:41px; width:307px;line-height:41px; text-align:center;">'
													+ msg + '</div>');
							$("#dialog").dialog({
								autoOpen : true,
								resizable : false,
								modal : true,
								close:false,
								maxheight : "180", // 高度
								width : "350", // 宽度
								title : "[" + title + "]",
								buttons : [{
									text:'确定',
									handler:function(){
										$("#dialog").dialog('close');
										if (callback1)
											callback1();
									}
								},{
										text:'关闭',
										handler:function(){
											$("#dialog").dialog('close');
											if (callback2)
												callback2();
										}
								}]
							});
						},
						OpenWidow : function(url,title,width,height,isbuttons,callback1,callback2) {
							/// <summary>弹出一个内嵌页面提示框,包含如下参数</summary>
							/// <param name="url" type="string">内嵌页面的地址</param>
							/// <param name="title" type="string">提示框标题</param>
							/// <param name="width" type="int">提示框宽度</param>
							/// <param name="height" type="int">提示框高度</param>
							/// <param name="isbuttons" type="bool">是否提供原生态按钮</param>
							/// <param name="callback1" type="function">点击提示框中确定按钮后触发的方法，比如刷新页面的方法等,没有传NULL,isbuttons为true时有效</param>
							/// <param name="callback2" type="function">点击提示框中取消按钮后触发的方法，比如刷新页面的方法等,没有传NULL,isbuttons为true时有效</param>
							/// <returns type="JSON">无</returns>
							var divId = "dialog" + Math.round(Math.random() * 100);
							_this.IFarmId = divId;
							var settings;
							if(isbuttons)
							{
								settings = {
										id : divId,
										width : width,
										height : height,
										modal : true,
										buttons : [ {
											text : "确定",
											click : function() {
												$(this).dialog("close");
												$('#' + _this.IFarmId).empty();
												_this.IFarmId = "";
												if (callback1)
													callback1();
											}
										},
										{
												text : "取消",
												click : function() {
													$(this).dialog("close");
													$('#' + _this.IFarmId).empty();
													_this.IFarmId = "";
													if (callback2)
														callback2();
												}
										} ],
										show : "explode",
										hide : "highlight",
										title : "["+title+"]",
										url : url,
										close : function() {
											if (callback2)
												callback2();
											$("#" + this.id).remove();
											$('#' + _this.IFarmId).empty();
											_this.IFarmId = "";
											//debugger; 
											if (document.getElementById(this.id))
												document.body.removeChild(document
														.getElementById(this.id));
										}
									};
							}
							else
							{
								settings = {
										id : divId,
										width : width,
										height : height,
										modal : true,
										show : "explode",
										hide : "highlight",
										title : "["+title+"]",
										url : url,
										close : function() {
											if (callback2)
												callback2();
											$("#" + this.id).remove();
											//debugger 
											if (document.getElementById(this.id))
												document.body.removeChild(document
														.getElementById(this.id));
										}
									};
							}
							$("body")
									.append(
											'<div id="' + settings.id + '" title="Dialog Title"></div>');
							// Dialog 
							$("#" + settings.id).html('<iframe src="'+ settings.url
									+ '" frameborder="0" height="100%" width="100%" id="dialogFrame" scrolling="auto"></iframe>');
							$('#' + settings.id)
									.dialog(
											{
												autoOpen : false,
												title : settings.title,
												width : settings.width,
												height : settings.height,
												modal : true,
												bgiframe : true,
												show : settings.show,
												hide : settings.hide,
												buttons : settings.buttons,
												close : function(){alert(2);},
												open : function(e) {alert(2);},
												resizeStop : function() {
													$("#dialogFrame").css("width",parseInt($(this).css("width")) - 5);
													$("#dialogFrame").css("height",parseInt($(this).css("height")) - 5);
												}
											});	
							//$("#" + settings.id).dialog("open");
							return this;
						},
						OpenWidowForEasyUi : function(url,title,width,height,isbuttons,callback1,callback2) {
							/// <summary>弹出一个内嵌页面提示框,包含如下参数</summary>
							/// <param name="url" type="string">内嵌页面的地址</param>
							/// <param name="title" type="string">提示框标题</param>
							/// <param name="width" type="int">提示框宽度</param>
							/// <param name="height" type="int">提示框高度</param>
							/// <param name="isbuttons" type="bool">是否提供原生态按钮</param>
							/// <param name="callback1" type="function">点击提示框中确定按钮后触发的方法，比如刷新页面的方法等,没有传NULL,isbuttons为true时有效</param>
							/// <param name="callback2" type="function">点击提示框中取消按钮后触发的方法，比如刷新页面的方法等,没有传NULL,isbuttons为true时有效</param>
							/// <returns type="JSON">无</returns>
							var divId = "dialog" + Math.round(Math.random() * 100);
							_this.IFarmId = divId;
							var settings;
							if(isbuttons)
							{
								settings = {
										id : divId,
										width : width,
										height : height,
										modal : true,
										buttons : [ {
											text : "确定",
											handler : function() {
												$("#"+_this.IFarmId).dialog("close");
												$('#' + _this.IFarmId).empty();
												_this.IFarmId = "";
												if (callback1)
													callback1();
											}
										},
										{
												text : "取消",
												handler : function() {
													$("#"+_this.IFarmId).dialog("close");
													$('#' + _this.IFarmId).empty();
													_this.IFarmId = "";
													if (callback2)
														callback2();
												}
										} ],
										show : "explode",
										hide : "highlight",
										title : "["+title+"]",
										url : url
									};
							}
							else
							{
								settings = {
										id : divId,
										width : width,
										height : height,
										modal : true,
										show : "explode",
										hide : "highlight",
										title : "["+title+"]",
										url : url
									};
							}
							$("body")
									.append(
											'<div id="' + settings.id + '" title="Dialog Title"></div>');
							// Dialog 
							$("#" + settings.id).html('<iframe src="'+ settings.url
									+ '" frameborder="0" height="100%" width="100%" id="dialogFrame" scrolling="auto"></iframe>');
							$('#' + settings.id)
									.dialog(
											{
												autoOpen : false,
												title : settings.title,
												width : settings.width,
												height : settings.height,
												modal : true,
												bgiframe : true,
												show : settings.show,
												hide : settings.hide,
												closed:false,
												buttons : settings.buttons,
										        onClose: function () {
													if (callback2)
														callback2();
										        },
												onOpen:function(){
													$("#dialogFrame").css("width",parseInt($("#" + settings.id).css("width")) - 105);
													$("#dialogFrame").css("height",parseInt($("#" + settings.id).css("height")) - 105);}
											});	
							//$("#" + settings.id).dialog("open");
							return this;
						},
						IFarmClose:function(){
							$('#' + _this.IFarmId).dialog("close");
							$('#' + _this.IFarmId).empty();
							_this.IFarmId='';
							return false;
						},
						// 比较两个数组的值是否一样
						ComparisonArray : function(arr1, arr2) {
							if (arr1.length == arr2.length) {
								for (var i = 0; i < arr1.length; i++) {
									for (var k = 0; k < arr2.length; k++) {
										if (arr1[i] == arr2[k]) {

										}
									}
								}
							}
							return false;
						},
						//绑定下拉控件
						//isDefault : true 自动添加【请选择】  false
						SelectBind : function(controlId, value, selected,isDefault) {
							$("#" + controlId + "").empty(); // 清空下拉列表
							if(isDefault)
							{
								$("#" + controlId + "").prepend("<option value=''>请选择...</option>"); // 为Select插入一个
							}
							
							for (var i = 0; i < value.length; i++) {
								if (selected == value[i].id) {
									$("#" + controlId + "").append(
											"<option selected='selected' value='" + value[i].id
													+ "'>" + value[i].name + "</option>"); // 为Select追加一个Option(下拉项)
								} else {
									$("#" + controlId + "").append(
											"<option value='" + value[i].id + "'>"
													+ value[i].name + "</option>"); // 为Select追加一个Option(下拉项)
								}
							}
						},
						
						SelectBindCode : function(controlId, value, selected,isDefault) {
							$("#" + controlId + "").empty(); // 清空下拉列表
							if(isDefault)
							{
								$("#" + controlId + "").prepend("<option value=''>请选择...</option>"); // 为Select插入一个
							}
							
							for (var i = 0; i < value.length; i++) {
								if (selected == value[i].code) {
									$("#" + controlId + "").append(
											"<option selected='selected' value='" + value[i].code+"' forSys ="+value[i].forSys
													+ ">" + value[i].name + "</option>"); // 为Select追加一个Option(下拉项)
								} else {
									$("#" + controlId + "").append(
											"<option value='" + value[i].code +"' forSys ="+value[i].forSys+ ">"
													+ value[i].name + "</option>"); // 为Select追加一个Option(下拉项)
								}
							}
						},
						// 判断是否是邮箱格式
						IsEmail : function(str) {
							var result = str
									.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/);
							if (result == null)
								return false;
							return true;
						},
						// 判断是否是手机号码
						IsPhone : function(str) {
							if (str == '')
								return true;
							var reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
							return reg.test(str);
						},
						//字母数字汉字
						IsNumOrAbcOrChina:function(str){
							if (str == '')
								return true;
							var reg = /^([A-Za-z0-9]|[\u4e00-\u9fa5])+$/;
							return reg.test(str);
						},
						//字母数字
						IsNumOrAbc:function(str){
							if (str == '')
								return true;
							var reg = /^([A-Za-z0-9])+$/;
							return reg.test(str);
						},
						//验证正整数或小数
						IsDouble:function(str)
						{
							if (str == '')
								return false;
							var reg = /^[0-9]+\.{0,1}[0-9]{0,2}$/;
							return reg.test(str);
						},
						//比较两个字符串格式的日期大小，date1 大于 date2 返回 true
						DateCompare:function(date1,date2){
							var dateCom1 = date1.replace("-","/");//替换字符，变成标准格式    
							var dateCom2 = date2.replace("-","/");//替换字符，变成标准格式    
							var d1 = new Date(Date.parse(dateCom1)); 
							var d2 = new Date(Date.parse(dateCom2)); 
							if(d1>d2)
							{
								return true;
							}
							return false;
						},
						// 函数名称： setCookie
						SetCookie : function(objName, objValue, objMin) {

							var str = objName + "=" + escape(objValue);
							if (objMin > 0) { // 为0时不设定过期时间，浏览器关闭时cookie自动消失
								var date = new Date();
								var ms = objMin * 60 * 1000;
								date.setTime(date.getTime() + ms);
								str += "; expires=" + date.toGMTString();
							}
							str += ";path=/"; // 所有路径使用
							document.cookie = str;
						},
						// 函数名称： getCookie 函数功能： 读取cookie函数
						GetCookie : function(Name) {
							var search = Name + "="
							if (document.cookie.length > 0) {
								offset = document.cookie.indexOf(search)
								if (offset != -1) {
									offset += search.length
									end = document.cookie.indexOf(";", offset)
									if (end == -1)
										end = document.cookie.length
									return unescape(document.cookie.substring(
											offset, end))
								} else
									return ""
							}
						},
						// 函数名称： deleteCookie 函数功能： 删除cookie函数 入口参数：
						DeleteCookie : function(name) {
							var expdate = new Date();
							expdate.setTime(expdate.getTime()
									- (86400 * 1000 * 1));
							_this.SetCookie(name, "", expdate);
						},
						//更换class操作
						/*
						obj:目标元素
						oldclass：旧样式
						newclass：新样式
						*/
						Class_Replace:function (obj,oldclass,newclass) {
						    if ($(obj).hasClass(oldclass)) {
						        $(obj).removeClass(oldclass);
						    }
						    $(obj).addClass(newclass);
						},
						//格式化字符串
						//str ： {0} --- {1}
						//arguments ： ["表示0","表示1"]
						//return : 表示0 --- 表示1
						StringFormat:function(str,arguments)
						{
							var result=str;
						    if (arguments.length == 0)
						        return result;
						    for ( var i = 0; i < arguments.length; i++) {
						        var re = new RegExp('\\{' + (i) + '\\}', 'gm');
						        result = result.replace(re, arguments[i]);
						    }
						    return result;
						},
						//IE6-9
						// 字符串截取
						GetSubstring : function(value, begin, end) {
							return value.substring(begin, end);
						},
						/*获取URL地址栏参数值*/
						GetQueryString:function (name) {
							var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
							var r = window.location.search.substr(1).match(reg);
							if (r != null)
								return unescape(r[2]);
							return null;
						}
					})
})(jQuery);

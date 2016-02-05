$.GiifiCalc.FieldUpLoad = {};

//页面入口
(function() {
	var _this = $.GiifiCalc.FieldUpLoad;
	$.extend($.GiifiCalc.FieldUpLoad, {
		// Index页面初始化操作发布页面
		PageInit : function(baseUrl,obj,docno) {
			_this.url = baseUrl;
			_this.fieldUploadInit(obj,docno);
		}
	})
})(jQuery);

(function() {
	var _this = $.GiifiCalc.FieldUpLoad;
	$.extend($.GiifiCalc.FieldUpLoad, {
		/**
		 * 公共路径
		 * */
		url:'',
		/**
		 * 上传控件初始化
		 * @obj:上传选择控件
		 * 
		 * */
		fieldUploadInit:function(obj,docno){
			$(obj).uploadify({
	            'swf': _this.url+'jsLib/uploadify/uploadify.swf',
	            'uploader':_this.url+'common/fieldUpLoad.do?docNo='+docno,
	            'cancelImg': _this.url+'jsLib/uploadify/uploadify-cancel.png',
	            'queueID': 'fileQueue',
	            'auto': true,
	            'buttonText': '选择文件',
	            'simUploadLimit': 5,
	            'queueSizeLimit': 10,
	            'removeCompleted':false,
	            'multi': true,  
	            'auto': false, 
	            'checkExisting':true,
	            //'buttonImage':"${jsPath}uploadify/uploadify-cancel.png",
	            'fileExt': '*.*',
	            'onUploadSuccess' : function(response) {
	            	//$.GiifiCalc.IFarmClose();
	            },
	            'cancel' : function(file) {              
	            	alert('The file ' + file.name + ' was cancelled.');       
	            },
	            'onUploadError' : function(event, queueID, fileObj) {
	                //alert('The file ' + file.name + ' could not be uploaded: ' + errorString);
	                $.GiifiCalc.SuccessMessageTips("提示","文件:" + fileObj.name + "上传失败 !");
	            },
	               'onFallback' : function() {//检测FLASH失败调用   
	                   $.GiifiCalc.SuccessMessageTips("您未安装FLASH控件，无法上传文件！请安装FLASH控件后再试。");
	            }
	        });
		}
	})
})(jQuery);

(function() {
	var _this = $.GiifiCalc.FieldUpLoad;
	$.extend($.GiifiCalc.FieldUpLoad, {
	})
})(jQuery);

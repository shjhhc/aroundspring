$.GiifiCalc.CalcOperationDtl = {};

// 页面入口
(function() {
	var _this = $.GiifiCalc.CalcOperationDtl;
		
	$.extend($.GiifiCalc.CalcOperationDtl, {
		// Index页面初始化操作发布页面
		PreCalcDetailInit : function(baseUrl, obj) {
			/**
			 * 初始化最下部-结算证明与附件
			 * */
			
			jQuery(".main_nav_zm").slide({ titCell : ".hd li", mainCell : ".bd", delayTime : 0 });
			_this.url = baseUrl;
			_this.findAttachments();
		}
	})
})(jQuery);

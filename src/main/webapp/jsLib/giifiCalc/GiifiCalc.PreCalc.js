$.GiifiCalc.PreCalc = {};

// 页面入口
(function() {
	var _this = $.GiifiCalc.PreCalc;
	$.extend($.GiifiCalc.PreCalc, {
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

(function() {
	var _this = $.GiifiCalc.PreCalc;
	$.extend($.GiifiCalc.PreCalc, {
		/**
		 * 公共路径
		 */
		url : '',
		/**
		 * 获取附件列表
		 * */
		findAttachments:function(){
			var param = {
					filter:'123456789'
				}
			$.L
			.ajaxHandle({
				url : _this.url+"common/findAttchments.json?"+ Math.round(Math.random()*1000),
				type : "GET",
				data : param,
				dataType : "json",
				success : function(response) {
					if(response==null)
					{
						return;
					}
					if (response.length >0) {
						$(".order_list_1").L_bindingDataList(response);
					} else {
						$(".order_list_1").html('<div class="n_title" style="text-align:center">暂无数据</div>');
					}
				},
				error : function() {
					alert("ajax调用错误！");
				}
			});
		},
		deleteAttachments:function(){
			
			var arr=[];
			$(".attr").each(function(){
				if(!this.checked)return;
				var attachments={};
				attachments.id= $(this).attr("id");
				arr.push(attachments)
			  });
			var params = "data="+ JSON.stringify(arr);
			
			$.ajax({
				type : "POST",
				url : _this.url+"common/deleteAttachments.json",
				data : params,
				dataType : "json",
				success : function(
						result) {
					if (result) {
						if (result.succeed) {
							alert("删除成功");
							loadAttr();
						} else {
							alert(result.message);
						}
					} else {
						alert("删除异常!")
					}
				}
			});
		}
	})
})(jQuery);

(function() {
	var _this = $.GiifiCalc.PreCalc;
	$.extend($.GiifiCalc.PreCalc, {
		/**
		 * 打开附件界面
		 * @docNo:结算单号
		 * */
		openAttachmentsDialog:function(_docNo){
			$.GiifiCalc.OpenWidowForEasyUi(_this.url+'common/openFieldUpLoad.do?docNo='+_docNo,'上传附件',600,400,false,null,loadAttr);
		},
		/**
		 * 附件全选,反选
		 * */
		chkAllAttachments:function(){
			if($("#chkAllAttachments").prop("checked"))
			{
				$(".lh_zm_c .order_list input").each(function(){
				    $(this).prop("checked",true);
				  });
			}
			else
			{
				$(".lh_zm_c .order_list input").each(function(){
				    $(this).prop("checked",false);
				  });
			}
		},
		/**
		 * 附件列表选择控制
		 * */
		chkChildAttachments:function(){
			$(".lh_zm_c .order_list input").each(function(){
			     if(!$(this).prop("checked"))
			     {
			    	 $("#chkAllAttachments").prop("checked",false);
			    	 return false;
			     }
			     $("#chkAllAttachments").prop("checked",true);
			  });
		},
		bindingHandle_check: function(value, data, obj) {
			var _value = value;
			return '<input type="checkbox" onclick="$.GiifiCalc.PreCalc.chkChildAttachments();" id="chk_'+_value+'"/>';
		},
		bindingHandle_content : function(value, data, obj) {
			var _value = value;
			// 字段长度长于41，截取
			if (value.length > 41) {
				_value = $.GiifiCalc.GetSubstring(_value, 0, 41) + "...";

			}
			return _value;
		},
		bindingHandle_date : function(value, data, obj) {
			var _value = value;
			if (value.length > 10) {
				_value = $.GiifiCalc.GetSubstring(_value, 0, 10);
			}
			return _value;
		}
	})
})(jQuery);

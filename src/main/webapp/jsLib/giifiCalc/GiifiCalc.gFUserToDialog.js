$.GiifiCalc.gFUserToDialog = {};

//页面入口
(function() {
	var _this = $.GiifiCalc.gFUserToDialog;
	$.extend($.GiifiCalc.gFUserToDialog, {
		// Index页面初始化操作
		PageInit : function(url,internationalization) {
			_this.intel=internationalization;
			_this.url = url;
			_this.OpenType = $.GiifiCalc.GetQueryString("ot");
			_this.gFUserToDialogIsFirst = 0;
			_this.bindgFUserToDialog_List(0, "", true);
		},
		/**查询路径*/
		SearchInit : function() {
			_this.gFUserToDialogIsFirst = 0;
			_this.bindgFUserToDialog_List(0, "", true);
		}
	})
})(jQuery);

(function() {
	var _this = $.GiifiCalc.gFUserToDialog;
	$.extend($.GiifiCalc.gFUserToDialog, {
		url:'',
		/** 定义每页数据条数*/
		PageSize : 8,
		/** 是否是首次进入*/
		gFUserToDialogIsFirst : 0,
		/**国际化*/
		intel:{},
		/**
		 * 绑定数据列表
		 * @_page:页码数
		 * @_invalid:
		 * @isfist:是否第一次进入
		 * */
		/**
		 * 父页面通过地址栏传递过来的参数值
		 * */
		OpenType:0,
		/**
		 * 绑定数据列表
		 * @_page:页码数
		 * @_invalid:
		 * @isfist:是否第一次进入
		 * */
		bindgFUserToDialog_List:function(_page, _invalid, isfist) {
			var filter = encodeURI($("#txtRouteWaySearch").val()) ;
			var customerType = window.parent.$("#customerType").val();
			var param = {
					filter:filter,
					customerType:customerType,
					p : _page+1,
					s : _this.PageSize
				}
			$.L
			.ajaxHandle({
				url : _this.url+"common/findGFUserToDialog.json?"+ Math.round(Math.random()*1000),
				type : "GET",
				data : param,
				dataType : "json",
				success : function(response) {
					if(response==null)
					{
						$("#Pagination").empty();
						return;
					}
					if (response.result.length >0) {
						$(".n_List_1").L_bindingDataList(response.result);

						if (isfist) {// 首次进入
							_this.Paging(response.totalCount, _this.PageSize);
						}
					} else {
						$("#Pagination").empty();
						$(".n_List_1").html('<div class="n_title" style="text-align:center">'+_this.intel.undata+'</div>');
					}
				},
				error : function() {
					$("#Pagination").empty();
					alert("ajax调用错误！");
				}
			});
		},
		// 分页
		// _total总个数
		// _psize每页多少条
		Paging : function(_total, _psize, keyword) {

			var pnum = Math.ceil(_total / _psize);
			if (pnum <= 1) {
				$("#Pagination").hide();
			} else
				$("#Pagination").show();
			$("#Pagination").pagination(pnum, {
				num_edge_entries : 1, // 边缘页数
				num_display_entries : 4, // 主体页数
				callback : haskey,
				items_per_page : 1, // 每页显示1项
				prev_text : _this.intel.up,
				next_text : _this.intel.next
			});
			function haskey(p, obj) {
				if (_this.gFUserToDialogIsFirst == 1) {
					_this.bindgFUserToDialog_List(p, obj, false);
				}
				_this.gFUserToDialogIsFirst = 1;
			}
		}
	})
})(jQuery);

(function() {
	var _this = $.GiifiCalc.gFUserToDialog;
	$.extend($.GiifiCalc.gFUserToDialog, {
		/**
		 * 路径名称格式化
		 * */
		bindingHandle_n_title : function(value, data, obj) {
			var _value = value;
			// 字段长度长于41，截取
			if (value.length > 21) {
				_value = $.GiifiCalc.GetSubstring(_value, 0, 21) + "...";
			}
			return '<a href="#" onclick="window.parent.$.GiifiCalc.Product.closeOpenDialog(\'' + data.cUST_NAME + '\',\'' + data.aCCT_CODE + '\',\''+_this.OpenType+'\')">'
					+ _value + "</a>";
		}
	})
})(jQuery);

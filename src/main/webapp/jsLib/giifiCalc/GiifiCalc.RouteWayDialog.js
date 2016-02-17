$.GiifiCalc.RouteWayDialog = {};

//页面入口
(function() {
	var _this = $.GiifiCalc.RouteWayDialog;
	$.extend($.GiifiCalc.RouteWayDialog, {
		// Index页面初始化操作
		PageInit : function(url,internationalization) {	
			_this.intel=internationalization;
			_this.url = url;
			_this.OpenType = $.GiifiCalc.GetQueryString("ot");
			_this.RouteCode = $.GiifiCalc.GetQueryString("routecode");
			_this.RouteWayDialogIsFirst = 0;
			_this.bindRouteWayDialog_List(0, "", true);
		},
		/**查询路径*/
		SearchInit : function() {
			_this.RouteWayDialogIsFirst = 0;
			_this.bindRouteWayDialog_List(0, "", true);
		}
	})
})(jQuery);

(function() {
	var _this = $.GiifiCalc.RouteWayDialog;
	$.extend($.GiifiCalc.RouteWayDialog, {
		url:'',
		/** 定义每页数据条数*/
		PageSize : 8,
		/** 是否是首次进入*/
		RouteWayDialogIsFirst : 0,
		/**国际化*/
		intel:{},
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
		bindRouteWayDialog_List:function(_page, _invalid, isfist) {
			var filter = encodeURI($("#txtRouteWaySearch").val()) ;
			var param = {
					routeWay:_this.RouteCode,
					filter:filter,
					p : _page+1,
					s : _this.PageSize
				}
			$.L
			.ajaxHandle({
				url : _this.url+"common/findRouteWayDialog.json?"+ Math.round(Math.random()*1000),
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
				if (_this.RouteWayDialogIsFirst == 1) {
					_this.bindRouteWayDialog_List(p, obj, false);
				}
				_this.RouteWayDialogIsFirst = 1;
			}
		}
	})
})(jQuery);

(function() {
	var _this = $.GiifiCalc.RouteWayDialog;
	$.extend($.GiifiCalc.RouteWayDialog, {
		/**
		 * 路径名称格式化
		 * */
		bindingHandle_n_title : function(value, data, obj) {
			var _value = value;
			// 字段长度长于41，截取
			if (value.length > 21) {
				_value = $.GiifiCalc.GetSubstring(_value, 0, 21) + "...";
			}
			return '<a href="#" onclick="window.parent.$.GiifiCalc.Product.closeOpenDialog(\'' + data.cUST_NAME + '\',\'' + data.cUST_TTL + '\',\''+_this.OpenType+'\')">'
					+ _value + "</a>";
		}
	})
})(jQuery);

$.GiifiCalc.Product = {};

//页面入口
(function() {
	var _this = $.GiifiCalc.Product;
	$.extend($.GiifiCalc.Product, {
		// Index页面初始化操作发布页面
		PageInit : function(baseUrl,internationalization) {
			_this.intel=internationalization;
			_this.url = baseUrl;
			_this.bindingHandle_control();
		},
		// Index页面初始化操作查询页面
		PageSearchInit:function(baseUrl)
		{
			_this.url = baseUrl;
		}
	})
})(jQuery);

(function() {
	var _this = $.GiifiCalc.Product;
	$.extend($.GiifiCalc.Product, {
		/**
		 * 公共路径
		 * */
		url:'',
		/**国际化*/
		intel:{},
		/**
		* 清除下拉列表中的option
		* target 目标 select 
		* type   选项 all 清除所有 first 排除第一个
		*/
		clearSelectOption:function(target,type)
		{
			var selector = '#'+target  +(type =='all' ? ' option' :' option:gt(0)') ;
			$(selector).remove();
		},
		/**
		* 添加下拉列表中的option
		* target 目录 select 
		* data   数据
		* label  label数据键
		* value  option value 数据键
		*/
		addSelectOption:function(target,data,label,value)
		{
			var _selector = $("#"+target);
			var $tpl = '<option value="{'+value+'}"> {'+label+'} </option>'
		    $.each(data,function(i,item){
		    	_selector.append($.nano($tpl,this));
		    })
		},
		openRouteWayDialog:function(_openType,routecode){
			switch (_openType) {
				case 1:
					$.GiifiCalc.OpenWidow(_this.url+'common/routeWayDialog.do?ot='+_openType+"&routecode="+routecode,_this.intel.place,600,400,false);
					break;
				case 2:
					$.GiifiCalc.OpenWidow(_this.url+'common/routeWayDialog.do?ot='+_openType+"&routecode="+routecode,_this.intel.startroute,600,400,false);
					break;
				case 3:
					$.GiifiCalc.OpenWidow(_this.url+'common/routeWayDialog.do?ot='+_openType+"&routecode="+routecode,_this.intel.endroute,600,400,false);
					break;
				case 4:
					$.GiifiCalc.OpenWidow(_this.url+'common/gFUserToDialog.do?ot='+_openType+"&routecode="+routecode,_this.intel.customer,600,400,false);
					break;
			}
		},
		closeOpenDialog:function(_name,_value,_openType)
		{
			/// <summary>选择路径关闭弹出页面,返回选择的项目，绑定到指定控件名称上</summary>
			/// <param name="_name" type="string">显式名称</param>
			/// <param name="_value" type="string">隐式值</param>
			/// <param name="_openType" type="int">表示弹窗口选择数据类型.1:地点,2:起始路径,3:结束路径,4:客户</param>
			/// <returns type="JSON">无</returns>
			switch (_openType) {
			case "1":
				$("#stationCode").val(_value);
				$("#stationName").val(_name);
				break;
			case "2":
				$("#stationFromCode").val(_value);
				$("#stationFromName").val(_name);
				break;
			case "3":
				$("#stationToCode").val(_value);
				$("#stationToName").val(_name);
				break;
			case "4":
				$("#gFUserToCode").val(_value);
				$("#gFUserToName").val(_name);
				break;
			default:
				break;
			}
			$.GiifiCalc.IFarmClose();
		}
	})
})(jQuery);

(function() {
	var _this = $.GiifiCalc.Product;
	$.extend($.GiifiCalc.Product, {
		/**绑定相关控件的事件*/
		bindingHandle_control:function(){
			$("#stationName").mousedown(function() {
				_this.openRouteWayDialog(1,"");
			});
			$("#stationFromName").mousedown(function() {
				_this.openRouteWayDialog(2, jQuery.trim($("#routeWayFromName_sel").val()));
			});
			$("#stationToName").mousedown(function() {
				_this.openRouteWayDialog(3, jQuery.trim($("#routeWayToName_sel").val()));
			});
			$("#gFUserToName").mousedown(function() {
				_this.openRouteWayDialog(4,'');
			});
			
			var nowDate = new Date();
			var year = nowDate.getFullYear();
			var month = nowDate.getMonth()+1;
			var day = nowDate.getDate();
			if(month<10)
			{
				month = "0"+month;
			}
			if(day<10)
			{
				day = "0"+day;
			}
			if($("#dateFrom").val().replace(" ","")=='')
			{
				$("#dateFrom").val(year+"-"+month+"-"+day);
			}
			if($("#dateTo").val().replace(" ","")=='')
			{
				$("#dateTo").val(year+"-"+month+"-"+day);
			}
		},
		/**
		*  客户类型选择事件 
		*  客户类型为 平台经营者 IAR 加载 IAR产品
		*  客户类型为 平台消费者 OAR 加载  OAR产品
		*/
		customerTypeListChange:function (src,type){
			var customerType = $(src).val();
		     
	    	$.ajax({
	               type: "POST",
	               url: _this.url+"product/getProductCategory.json",
	               data: {customerType:customerType},
	               success: function(_data){	            	  
	            	 $.GiifiCalc.SelectBindCode('prodcutCategoryCode',_data,0,true);
	               }
	            });
	    	
	    	if(type=="searchIndex")
	    	{}
	    	else
	    	{
	    		//IAR产品 才有运输方法
	    		var customerType = $("#customerType").val();
	    		var forsys = $('#prodcutCategoryCode option:selected').attr("forSys");
				
					var index=0;
					$(".main_right_nav ul li").each(function(){
						index++;
						if(index>2)
							{
							$(this).css("display","none");
							}
					});
					
		    	$("#gFUserToName").val('');
		    	$("#gFUserToCode").val('');
	    	}
		},
		
		/**
		*  客户类型选择事件 
		*  客户类型为 平台经营者 IAR 加载 IAR产品
		*  客户类型为 平台消费者 OAR 加载  OAR产品
		*/
		prodcutCategoryCodeChange:function (op){
			
			var customerType = $("#customerType").val();
			var forsys = $('#prodcutCategoryCode option:selected').attr("forSys");
			
			if(customerType==''||forsys==undefined)
			{
				var index=0;
				$(".main_right_nav ul li").each(function(){
					index++;
					if(index>2)
						{
						$(this).css("display","none");
						}
				});
				return;
			}
		    
			$(".main_right_nav ul li").css("display","");
			if(customerType=='1')
	    	{
				$("[name='routeWayLi']").css("display","");
	    		$("[name='stationLi']").css("display","");
	    		$("#iarstationDiv").css("display","");
	    		$("#transportModelDiv").css("display","none");
	    		
	    		switch(forsys)
				{
				case "-2":
					$("[name='routeWayLi']").css("display","");
				case "1":
				case "4":
					$("[name='routeWayLi']").css("display","");
		    		$("[name='stationLi']").css("display","none");
		    		break;
				default:
					$("[name='stationLi']").css("display","");
	    		    $("[name='routeWayLi']").css("display","none");
	    		    break;
				}
	    		
	    	}
	    	else
	        {
	    		$("#transportModelDiv").css("display","");	    		
	    		$("#iarstationDiv").css("display","none");
	        }
			
		},
		
		/**
		 * 清空指定控件内容
		 * */
		clearControl:function(id1,id2,id3,id4)
		{
			if(id1!=null)
			{
				$("#"+id1).val('');
			}
			if(id2!=null)
			{
				$("#"+id2).val('');
			}
			if(id3!=null)
			{
				$("#"+id3).val('');
			}
			if(id4!=null)
			{
				$("#"+id4).val('');
			}
		}
	})
})(jQuery);

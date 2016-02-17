/**
 * Copyright (c) 2015 Gistandard (wangjuneng@gmail.com)
 * 
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *  
 */
(function($){
	
	
	
	var SearchField = function(options,target)
	{
		this.defaults = {
			title:'速查',
			baseTpl:['<div id="{expando}" class="selectItemhidden selectItem"> ',
			     	 	'<div id="selectItemAd" class="selectItemtit bgc_ccc"> ',
			     	 		'<h2 id="selectItemTitle" class="selectItemleft">{title}</h2> ',
			     	 		'<div id="selectItemClose" class="selectItemright">关闭</div>',
				     	'</div> ',
				     	'<div id="selectItemCount" class="selectItemcont">',
				     		'<div class="select_nav">',
				     			'<input id="searchTextInput" class="write_input_s" value="" /><input type="button" id="searchBtn" value="搜索" class="submit_s">',
				     		'</div>',
				     		'<div id="selectSub" class="selectSub_s"></div> ',
				     		'<div class="kong"></div>',
				     	'</div> ',
				     '</div> '
				    ],
			 header:[],
			 tpl:[], //显示部分模板
			 data:[],//数据
			 url:'', //ajax 请求数据
			 root:'' //数据根结节
		};
		this.init(options,target);
		return this;
	}
	
	SearchField.prototype = {
		_initSource:function(){
			var me = this;
			var array ,url ;
			//判断是数据是否为静态数据
			if($.isArray(this.settings.data) && this.settings.data.length>0)
		    {
				array = this.settings.data;
				return  function(param)
				{
					this.response(this.filter(array,param));
				}
			}
			else //ajax 数据请求
			{
				url = this.settings.url;
				return function( param ) {
					if ( this.xhr ) {
						this.xhr.abort();
					}
					this.xhr = $.ajax({
						url: url,
						data: {param:param},
						dataType: "json",
						success: function( data ) {
							var _data = data;
							if(me.settings.root != '')
							{
								var keys = me.settings.root.split('.');
								for(i=0,len = keys.length;i<len;i++)
								{
									var value = _data[keys[i]];
									if(value != undefined)
									{
										_data = value;
									}
									else
									{
										_data = [];
										break;
									}
								}
							}
							me.response(_data );
						},
						error: function() {
							me.response([]);
						}
					});
				};
			}
		},
		/**
		 * searchField html初始化
		 */
		searchFieldRender : function(){
			var _searchField = $.template(this.settings.baseTpl.join(""),this.settings).appendTo(document.body);
			
			//查询输入框
			this.searchTextInput = _searchField.find('#searchTextInput');
			
			//查询按钮
			this.searchBtn = _searchField.find('#searchBtn');
			
			//增加hearder
			_searchField.find('#selectSub').append(this.settings.header.join(''));
			return _searchField;
		},
		
		
		/**
		 * 数据渲染
		 */
		response :function(_data){
			 var me = this
			 var content = me._searchField.find('#selectSub');
			 //数据模板
			 var tpl = me.settings.tpl;
			 //清除数据
			 content.children(':gt(0)').remove();
			 
			 $.each(_data,function(idx,value){
				 content.append($.nano(tpl.join(''),value));
			 })
		},
		
		/**
		 * 数据过滤
		 */
		filter : function( array, term ) {
			
			if(term == undefined || term == '')
			{
				return array;
			}
			
			var matcher = new RegExp( this.escapeRegex( term ), "i" );
			return $.grep( array, function( value ) {
				var flag = false;
				
				$.each(value,function(key,value){
					if(matcher.test( key) || matcher.test( value))
					{
						flag = true;
						return false;
					}
				});
				
				return flag;
			});
		},
		
		escapeRegex : function( value ) {
			return value.replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" );
		},
		/**
		 * 绑定事件
		 */
		binding:function()
		{
			var me = this;
			var _searchField = this._searchField;
			_searchField.on('click',function(e){
				e.stopPropagation(); 
			})
			
			//close
			_searchField.find('#selectItemClose').on('click',function(){
				_searchField.hide();
			})
			
			//search
			_searchField.find('#searchBtn').on('click',function(){
				
				me.doSearch();
			})
			
			//查询输入框输入事件 
			this.searchTextInput.on('keyup',function(){
				me.doSearch();
			})
		},
		
		/**
		 * 查询
		 */
		doSearch:function(){
			var me = this;
			var param = me.searchTextInput.val();
			me.source(param);
		},
		
		init : function(options,target)
		{
			var me = this;
			me.target = $(target);
			
			if(this.inited == true)
			{
				return;
			}
			else
			{
				me.inited = true;
			}
			
			
			me.settings  = $.extend({},this.defaults,options);
			
			//生成searchField id 
			me.settings.expando = "searchField_"+$.guid ;
			
			me.source = me._initSource();
			
			me._searchField = me.searchFieldRender();
			 
			me.target.data('_searchField',me._searchField);
			me.target.data('settings',me.settings);
			 
			/**
			 * 绑定事件
			 */
			me.binding();
			
			//添加事件
			me.target.on('focus', function(){
				me.showSearch(this);
			}).on('keydown',function(){
				return false;
			});
			
			
			$(document).click(function(event){
				if(event.target.id != me.target.attr('id'))
				{
					me._searchField.hide();
				}
					
			});
		},
		
		showSearch:function(obj){
			var target = $(obj);
			var top = target.offset().top + target.outerHeight(true); 
			var left =  target.offset().left;
			
			this.doSearch();
			
			this._searchField.show().css({"position":"absolute","top":top+"px" ,"left":left+"px"});
			
			this.searchTextInput.focus();
		}
		
	}
	
	
	/** 
	*  查询文本框
	*/
	$.fn.searchField = function(options)
	{
		$(this).each(function(){
			new SearchField(options,this);
		});
		return this;
	}
	
	$.fn.searchFieldValue = function()
	{
		
	}
	
})(jQuery);
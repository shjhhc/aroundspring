/********************************************************************
		Desc  : 实现displayTag Ajax分页功能
		Author: J.Wang
		Date  : 2015-09-06


********************************************************************/
(function($,window,undefined){
	
	$["fn"]["paging"] = function(){
		
		var me = this;
  
		//找到当前容器分分页链接
		me.find('div.pages').find('a').click(function(ev){
			 ev["preventDefault"]();
             var obj = $(this);
             
             if(obj.attr('href')!='javascript:;')
             {
            	 me.load(obj.attr('href'));
             }
		});
		
		//绑定转到多少页input
		me.find('div.pages').find('input.pnum').on('keyup',function(event){
			 $(this).val($(this).val().replace(/[^\d]/g,''));
			 
			 if($(this).val()=='')
			 {
				 $(this).val('1')
			 }
			 
			 if(event.which == 13)  
			 {
				 var href = $(this).attr('href');
				
				 href = href.replace('d-16544-p=2','d-16544-p='+$(this).val());
				 
				 me.load(href);    
			 }
             
       }).on('focus',function(){
    	   this.style.imeMode='disabled';   // 禁用输入法,禁止输入中文字符
       }).on('blur',function(){
    	   var href = $(this).attr('href');
			
		   href = href.replace('d-16544-p=2','d-16544-p='+$(this).val());
			 
		   me.load(href); 
       });
		
		
		return this;
	}    
	
}(jQuery, this))

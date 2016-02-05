// JavaScript Document



var get = {
	byId: function(id) {
		return typeof id === "string" ? document.getElementById(id) : id
	},
	byClass: function(sClass, oParent) {
		var aClass = [];
		var reClass = new RegExp("(^| )" + sClass + "( |$)");
		var aElem = this.byTagName("*", oParent);
		for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
		return aClass
	},
	byTagName: function(elem, obj) {
		return (obj || document).getElementsByTagName(elem)
	}
};
var dragMinWidth = 595;
var dragMinHeight = 463;
var dragLeft=0;
var dragTop=0;
/*-------------------------- +
  拖拽函数
 +-------------------------- */
function drag(oDrag, handle)
{
	var disX = dixY = 0;
	var oMin = get.byClass("min", oDrag)[0];
	var oMax = get.byClass("max", oDrag)[0];
	var oRevert = get.byClass("revert", oDrag)[0];
	var oClose = get.byClass("close", oDrag)[0];
	handle = handle || oDrag;
	handle.style.cursor = "move";
	handle.onmousedown = function (event)
	{
		var event = event || window.event;
		disX = event.clientX - oDrag.offsetLeft;
		disY = event.clientY - oDrag.offsetTop;
		
		document.onmousemove = function (event)
		{
			var event = event || window.event;
			var iL = event.clientX - disX;
			var iT = event.clientY - disY;
			var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
			var maxT = document.documentElement.clientHeight - oDrag.offsetHeight;
			
			iL <= 0 && (iL = 0);
			iT <= 0 && (iT = 0);
			iL >= maxL && (iL = maxL);
			iT >= maxT && (iT = maxT);
			
			oDrag.style.left = iL + "px";
			oDrag.style.top = iT + "px";
			
			return false
		};
		
		document.onmouseup = function ()
		{
			document.onmousemove = null;
			document.onmouseup = null;
			this.releaseCapture && this.releaseCapture()
		};
		this.setCapture && this.setCapture();
		return false
	};	
	//最大化按钮
	oMax.onclick = function ()
	{
		var browser=navigator.appName 
        var b_version=navigator.appVersion 
        var version=b_version.split(";"); 
        var trim_Version=version[1].replace(/[ ]/g,""); 
		if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0") 
        { 
		   oDrag.style.top = -258+"px";
		   oDrag.style.left = -13+"px";
		   var dw = document.documentElement.clientWidth - 2 ;
		   var dh = document.documentElement.clientHeight - 2 ;
		//if(document.getElementById("dragss")){
			document.getElementById("dragss").style.width = dw+"px";
			document.getElementById("dragss").style.height = dh+"px";
		//}
		//if(document.getElementById("dragt")){
			document.getElementById("dragt").style.width = dw+"px";
		//}
		//if(document.getElementById("dragw")){
			document.getElementById("dragw").style.width = dw+"px";
		//}
		//if(document.getElementById("dragb")){
			document.getElementById("dragb").style.width = dw-165+"px";
		//}
		//if(document.getElementById("dragr")){
			document.getElementById("dragr").style.width = dw+"px";
			document.getElementById("dragr").style.height = dh-200+"px";
		//}
		oDrag.style.width = dw + "px";
		oDrag.style.height = dh+ "px";
		this.style.display = "none";
		oRevert.style.display = "block";
		}
		else
		{
		oDrag.style.left = -13+"px";
		oDrag.style.top = 0;
		var dw = document.documentElement.clientWidth - 2 ;
		var dh = document.documentElement.clientHeight - 2 ;
		//if(document.getElementById("dragss")){
			document.getElementById("dragss").style.width = dw+"px";
			document.getElementById("dragss").style.height = dh+"px";
		//}
		//if(document.getElementById("dragt")){
			document.getElementById("dragt").style.width = dw+"px";
		//}
		//if(document.getElementById("dragw")){
			document.getElementById("dragw").style.width = dw+"px";
		//}
		//if(document.getElementById("dragb")){
			document.getElementById("dragb").style.width = dw-165+"px";
		//}
		//if(document.getElementById("dragr")){
			document.getElementById("dragr").style.width = dw+"px";
			document.getElementById("dragr").style.height = dh-200+"px";
		//}
		oDrag.style.width = dw + "px";
		oDrag.style.height = dh+ "px";
		this.style.display = "none";
		oRevert.style.display = "block";
		}
	};
	//还原按钮
	oRevert.onclick = function ()
	{		
	    
		oDrag.style.width = dragMinWidth + "px";
		oDrag.style.height = dragMinHeight + "px";
		
		//if(document.getElementById("dragss")){
			document.getElementById("dragss").style.width = dragMinWidth+"px";
			
		//}
		//if(document.getElementById("dragt")){
			document.getElementById("dragt").style.width = dragMinWidth+"px";
		//}
		//if(document.getElementById("dragw")){
			document.getElementById("dragw").style.width = dragMinWidth+"px";
		//}
		//if(document.getElementById("dragb")){
			document.getElementById("dragb").style.width = dragMinWidth-165+"px";
		//}
		//if(document.getElementById("dragr")){
			document.getElementById("dragr").style.width = dragMinWidth-5+"px";
			document.getElementById("dragr").style.height = dragMinHeight-171+"px";
		//}

	    oDrag.style.left = dragLeft + "px";
	    oDrag.style.top = dragTop + "px";
		
		this.style.display = "none";
		oMax.style.display = "block";
	};
	
	//阻止冒泡
	oMin.onmousedown = oMax.onmousedown = oClose.onmousedown = function (event)
	{
		this.onfocus = function () {this.blur()};
		(event || window.event).cancelBubble = true	
	};
}
/*-------------------------- +
  改变大小函数
 +-------------------------- */
function resize(oParent, handle, isLeft, isTop, lockX, lockY)
{
	handle.onmousedown = function (event)
	{
		var event = event || window.event;
		var disX = event.clientX - handle.offsetLeft;
		var disY = event.clientY - handle.offsetTop;	
		var iParentTop = oParent.offsetTop;
		var iParentLeft = oParent.offsetLeft;
		var iParentWidth = oParent.offsetWidth;
		var iParentHeight = oParent.offsetHeight;
		
		document.onmousemove = function (event)
		{
			var event = event || window.event;
			
			var iL = event.clientX - disX;
			var iT = event.clientY - disY;
			var maxW = document.documentElement.clientWidth - oParent.offsetLeft - 2;
			var maxH = document.documentElement.clientHeight - oParent.offsetTop - 2;			
			var iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
			var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;
			
			isLeft && (oParent.style.left = iParentLeft + iL + "px");
			isTop && (oParent.style.top = iParentTop + iT + "px");
			
			iW < dragMinWidth && (iW = dragMinWidth);
			iW > maxW && (iW = maxW);
			lockX || (oParent.style.width = iW + "px");
			
			iH < dragMinHeight && (iH = dragMinHeight);
			iH > maxH && (iH = maxH);
			lockY || (oParent.style.height = iH + "px");
			
			if((isLeft && iW == dragMinWidth) || (isTop && iH == dragMinHeight)) document.onmousemove = null;
			
			return false;	
		};
		document.onmouseup = function ()
		{
			document.onmousemove = null;
			document.onmouseup = null;
		};
		return false;
	}
};
window.onload = window.onresize =elementDrag;
	
function elementDrag(){
	var oDrag = document.getElementById("drag");
	var oTitle = get.byClass("title", oDrag)[0];
	var oL = get.byClass("resizeL", oDrag)[0];
	var oT = get.byClass("resizeT", oDrag)[0];
	var oR = get.byClass("resizeR", oDrag)[0];
	var oB = get.byClass("resizeB", oDrag)[0];
	var oLT = get.byClass("resizeLT", oDrag)[0];
	var oTR = get.byClass("resizeTR", oDrag)[0];
	var oBR = get.byClass("resizeBR", oDrag)[0];
	var oLB = get.byClass("resizeLB", oDrag)[0];
	
	drag(oDrag, oTitle);
	//四角
	resize(oDrag, oLT, true, true, false, false);
	resize(oDrag, oTR, false, true, false, false);
	resize(oDrag, oBR, false, false, false, false);
	resize(oDrag, oLB, true, false, false, false);
	//四边
	resize(oDrag, oL, true, false, false, true);
	resize(oDrag, oT, false, true, true, false);
	resize(oDrag, oR, false, false, false, true);
	resize(oDrag, oB, false, false, true, false);
	
	var ddw = document.getElementById("ddinfo").offsetWidth-15;
	var ddt = document.getElementById("ddinfo").offsetTop;
	dragLeft = (document.documentElement.clientWidth - oDrag.offsetWidth + ddw) / 2;
	dragTop = ddt;
	oDrag.style.left = dragLeft + "px";
	oDrag.style.top = dragTop + "px";
}
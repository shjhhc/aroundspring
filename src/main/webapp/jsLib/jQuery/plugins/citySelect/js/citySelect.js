var allProvinces = null;
var allCities = null;
var allAreas = null;
var allProId = null;
var cityIdAll = null;
var allCountys = null;
var provinceAllTotalPage = null;
var pa_pageSize = 12;
function createCitySelect(inputId) {
    init(inputId);
    generateSelect(inputId)
    function init(inputId) {
        var citySelectDivHtml = "<input type='hidden' id='"+inputId+"_sel'>"+
            "<div class=\"provinceCityAll\" id='provinceCityAll_" + inputId + "'>" +
            "    <div class=\"tabs clearfix\">" +
            "        <ul class=\"\">" +
            "            <li><a href=\"javascript:\" class=\"current\" tb=\"hotCityAll\">热门城市</a></li>" +
            "            <li><a href=\"javascript:\" tb=\"provinceAll\">省份</a></li>" +
            "            <li><a href=\"javascript:\" tb=\"cityAll\" name=\"cityAll\">城市</a></li>" +
            "            <li><a href=\"javascript:\" tb=\"countyAll\" name=\"countyAll\">区县</a></li>" +
            "        </ul>" +
            "    </div>" +
            "    <div class=\"con\">" +
            "        <div class=\"hotCityAll invis\" id='hotCityAll_" + inputId + "'>" +
            "            <div class=\"pre\"><a></a></div>" +
            "            <div class=\"list\">" +
            "                <ul>" +
            "                </ul>" +
            "            </div>" +
            "            <div class=\"next\"><a class=\"can\"></a></div>" +
            "        </div>" +
            "        <div class=\"provinceAll invis\" id='provinceAll_" + inputId + "'>" +
            "            <div class=\"pre\"><a></a></div>" +
            "            <div class=\"list\">" +
            "                <ul>" +
            "                </ul>" +
            "            </div>" +
            "            <div class=\"next\"><a class=\"can\"></a></div>" +
            "        </div>" +
            "        <div class=\"cityAll invis\" id='cityAll_" + inputId + "'>" +
            "            <div class=\"pre\"><a></a></div>" +
            "            <div class=\"list\">" +
            "                <ul>" +
            "                </ul>" +
            "            </div>" +
            "            <div class=\"next\"><a class=\"can\"></a></div>" +
            "        </div>" +
            "        <div class=\"countyAll invis\" id='countyAll_" + inputId + "'>" +
            "            <div class=\"pre\"><a></a></div>" +
            "            <div class=\"list\">" +
            "                <ul>" +
            "                </ul>" +
            "            </div>" +
            "            <div class=\"next\"><a class=\"can\"></a></div>" +
            "        </div>" +
            "    </div>" +
            "</div>";
        $(citySelectDivHtml).appendTo($("body"));
        $("#" + inputId).click(function (event) {
            sendAllCitiesAjax(inputId);
            $(this).select();
            $("#provinceCityAll_" + inputId).hide();
            var provinceCityAllDiv = $(".provinceCityAll");
            if(provinceCityAllDiv.length > 1){
                for(var i = 0; i < provinceCityAllDiv.length; i++){
                    if($(provinceCityAllDiv[i]).attr("id") != ("provinceCityAll_" + inputId)){
                       $( provinceCityAllDiv[i]).hide();
                    }
                }
            }
            $("#dimCityQuery_" + inputId).hide();
            var o2 = $(this).offset();
            var l2 = o2.left;
            var t2 = o2.top;
            var h2 = $(this).height();
            $("#provinceCityAll_" + inputId).css("top", t2 + h2 - 1 + 22).css("left", l2).toggle();
            $("#provinceCityAll_" + inputId).click(function (event) {
                event.stopPropagation();
            });
            event.stopPropagation();
            $("html").click(function () {
                $("#provinceCityAll_" + inputId).hide();
            });
            $("input.proCitySelAll").removeClass("current2_"+inputId);
            $(this).addClass("current2_"+inputId);
            $("#provinceCityAll_" + inputId).find(".tabs").find("a").removeClass("current");
            $("#provinceCityAll_" + inputId).find(".tabs").find("a[tb=hotCityAll]").addClass("current");
            $("#provinceCityAll_" + inputId).find(".con").children().hide();
            $("#provinceCityAll_" + inputId).find(".con").find(".hotCityAll").show();
            sendAllProvinceAjax(inputId);
            sendAllCountiesAjax(inputId);
            $("#provinceCityAll_" + inputId).find(".tabs").find("a").click(function () {
                if ($(this).attr("tb") == "cityAll" && $("#provinceCityAll_" + inputId + ".provinceAll .list .current").val() == null) {
                    return;
                }
                if ($(this).attr("tb") == "countyAll" && $("#provinceCityAll_" + inputId + ".cityAll .list .current").val() == null
                    && $("#provinceCityAll_" + inputId + ".hotCityAll .list .current").val() == null) {
                    return;
                }
                $("#provinceCityAll_" + inputId).find(".tabs").find("a").removeClass("current");
                $(this).addClass("current");
                var tb = $(this).attr("tb");
                $("#provinceCityAll_" + inputId).find(".con").children().hide();
                $("#provinceCityAll_" + inputId).find(".con").find("." + tb).show();
            });
        });
    };
    function generateSelect(inputId) {
        var clkIndex;
        var currentClass;
        var thisObj;
        var dimCityDiv = "<div class='dimCityQuery' id='dimCityQuery_" + inputId + "'><ul></ul></div>";
        $("body").append(dimCityDiv);
        $("body").delegate("#" + inputId, ($.support.opera ? "keypress" : "keyup"),
            function (event) {
                if ($("#dimCityQuery_" + inputId + ":visible").size() == 0) {
                }
                $("#provinceCityAll_" + inputId).hide();
                if ($(this).hasClass("proCityQueryAll")) {
                    sendAllProvinceAjax(inputId);
                    sendAllCitiesAjax(inputId);
                    sendAllCountiesAjax(inputId);
                    currentClass = "proCityQueryAll";
                    clkIndex = $("body").find("#proCityQueryAll_" + inputId).index(this);
                    allCitys = $("body").data("CitysAll");
                    allProvinces = $("body").data("allProvinces");
                    allCountys = $("body").data("allCountys");
                    thisObj = $(this);
                }
                lastKeyPressCode = event.keyCode;
                switch (lastKeyPressCode) {
                    case 40:
                        $("#dimCityQuery_" + inputId).trigger("selNext");
                        return false;
                        break;
                    case 38:
                        $("#dimCityQuery_" + inputId).trigger("selPrev");
                        return false;
                        break;
                    case 13:
                        $("#dimCityQuery_" + inputId).trigger("enter");
                        return false;
                        break;
                }
                v = $.trim($(this).val());
                if (v == "" || v == null) {
                    return false;
                }
                var o = $(this).offset();
                var l = o.left;
                var t = o.top;
                var w = $(this).width();
                var h = $(this).height();
                var htmlArr = [];
                var autoWidth;
                for (i = 0; i < allCountys.length; i++) {
                    if (v.toUpperCase() === allCountys[i].pinYinChar.substring(0, v.length)) {
                        htmlArr[htmlArr.length] = "<li><a class='allcityClass' href='javascript:' provinceId=" + allCountys[i].provinceId + " cityId=" + allCountys[i].cityId + " countyId=" + allCountys[i].id + ">" + allCountys[i].cityName + "-" + allCountys[i].areaName + " (<span style='color:red'>" + v.toUpperCase() + "</span>" + allCountys[i].pinYinChar.substring(v.length, allCountys[i].pinYinChar.length) + ")</a></li>";
                        if (htmlArr.length > 9) {
                            break;
                            return false;
                        }
                        autoWidth = autoWidth < (allCountys[i].cityName + allCountys[i].areaName + allCountys[i].pinYinChar).length ? (allCountys[i].cityName + allCountys[i].areaName + allCountys[i].pinYinChar).length : autoWidth;
                        continue;
                    }
                    if (v === allCountys[i].areaName.substring(0, v.length)) {
                        htmlArr[htmlArr.length] = "<li><a class='allcityClass' href='javascript:' provinceId=" + allCountys[i].provinceId + " cityId=" + allCountys[i].cityId + " countyId=" + allCountys[i].id + ">" + allCountys[i].cityName + "-" + "<span style='color:red'>" + v + "</span>" + allCountys[i].areaName.substring(v.length, allCountys[i].areaName.length) + " (" + allCountys[i].pinYinChar + ")</a></li>";
                        if (htmlArr.length > 9) {
                            break;
                            return false;
                        }
                        autoWidth = autoWidth < (allCountys[i].cityName + allCountys[i].areaName + allCountys[i].pinYinChar).length ? (allCountys[i].cityName + allCountys[i].areaName + allCountys[i].pinYinChar).length : autoWidth;
                        continue;
                    }
                    if (v.toLowerCase() === allCountys[i].pinYin.substring(0, v.length)) {
                        htmlArr[htmlArr.length] = "<li><a class='allcityClass' href='javascript:' provinceId=" + allCountys[i].provinceId + " cityId=" + allCountys[i].cityId + " countyId=" + allCountys[i].id + ">" + allCountys[i].cityName + "-" + allCountys[i].areaName + " (<span style='color:red'>" + v.toLowerCase() + "</span>" + allCountys[i].pinYin.substring(v.length, allCountys[i].pinYin.length) + ")</a></li>"
                        if (htmlArr.length > 9) {
                            break;
                            return false;
                        }
                        autoWidth = autoWidth < (allCountys[i].cityName + allCountys[i].areaName + allCountys[i].pinYin).length ? (allCountys[i].cityName + allCountys[i].areaName + allCountys[i].pinYin).length : autoWidth;
                        continue;
                    }
                }
                for (i = 0; i < allCitys.cities.length; i++) {
                    if (v.toUpperCase() === allCitys.cities[i].cityShortPY.substring(0, v.length)) {
                        htmlArr[htmlArr.length] = "<li><a class='allcityClass' href='javascript:' provinceId=" + allCitys.cities[i].provinceId + " cityId=" + allCitys.cities[i].id + ">" + allCitys.cities[i].name + " (<span style='color:red'>" + v.toUpperCase() + "</span>" + allCitys.cities[i].cityShortPY.substring(v.length, allCitys.cities[i].cityShortPY.length) + ")</a></li>";
                        if (htmlArr.length > 9) {
                            break;
                            return false;
                        }
                        autoWidth = autoWidth < (allCitys.cities[i].name + allCitys.cities[i].cityShortPY).length ? (allCitys.cities[i].name + allCitys.cities[i].cityShortPY).length : autoWidth;
                        continue;
                    }
                    if (v === allCitys.cities[i].name.substring(0, v.length)) {
                        htmlArr[htmlArr.length] = "<li><a class='allcityClass' href='javascript:' provinceId=" + allCitys.cities[i].provinceId + " cityId=" + allCitys.cities[i].id + "><span style='color:red'>" + v + "</span>" + allCitys.cities[i].name.substring(v.length, allCitys.cities[i].name.length) + " (" + allCitys.cities[i].cityShortPY + ")</a></li>";
                        if (htmlArr.length > 9) {
                            break;
                            return false;
                        }
                        autoWidth = autoWidth < (allCitys.cities[i].name + allCitys.cities[i].cityShortPY).length ? (allCitys.cities[i].name + allCitys.cities[i].cityShortPY).length : autoWidth;
                        continue;
                    }
                    if (v.toLowerCase() === allCitys.cities[i].cityPinyin.substring(0, v.length)) {
                        htmlArr[htmlArr.length] = "<li><a class='allcityClass' href='javascript:' provinceId=" + allCitys.cities[i].provinceId + " cityId=" + allCitys.cities[i].id + ">" + allCitys.cities[i].name + " (<span style='color:red'>" + v.toLowerCase() + "</span>" + allCitys.cities[i].cityPinyin.substring(v.length, allCitys.cities[i].cityPinyin.length) + ")</a></li>"
                        if (htmlArr.length > 9) {
                            break;
                            return false;
                        }
                        autoWidth = autoWidth < (allCitys.cities[i].name + allCitys.cities[i].cityPinyin).length ? (allCitys.cities[i].name + allCitys.cities[i].cityPinyin).length : autoWidth;
                        continue;
                    }
                }
                if (htmlArr == "" || htmlArr == null) {
                    $("#dimCityQuery_" + inputId + " ul").html("<li class='none'>对不起,没有找到该城市</li>");
                    return false;
                } else {
                    $("#dimCityQuery_" + inputId + " ul").html(htmlArr.join("")).find("li:first").addClass("current");
                }
                if (autoWidth < 200) {
                    autoWidth = 200;
                }
                $("#dimCityQuery_" + inputId).css("width", autoWidth).css("top", t + h - 1 + 10).css("left", l).show();
                $("html").click(function () {
                    $("#dimCityQuery_" + inputId).hide();
                });
            });
        $("body").delegate("#dimCityQuery_" + inputId + " li", "hover",
            function () {
                $(this).addClass("current").siblings().removeClass("current");
            },
            function () {
                $(this).removeClass("current");
            });
        $("#dimCityQuery_" + inputId).delegate("", "selNext",
            function () {
                var next = $(this).find("li.current").next();
                if (next.size() > 0) {
                    next.addClass("current").siblings().removeClass("current");
                }
                else {
                    $("#dimCityQuery_" + inputId + " li").removeClass("current").first().addClass("current");
                }
            });
        $("#dimCityQuery_" + inputId).delegate("", "selPrev",
            function () {
                var prev = $(this).find("li.current").prev();
                if (prev.size() > 0) {
                    prev.addClass("current").siblings().removeClass("current");
                }
                else {
                    $("#dimCityQuery_" + inputId + " li").removeClass("current").last().addClass("current");
                }
            });
        $("#dimCityQuery_" + inputId).delegate("", "enter",
            function (event) {
                var cur = $(this).find("li.current");
                if (cur.size() > 0) {
                    cur.find("a").trigger("click");
                }
            });
        $("body").delegate("#dimCityQuery_" + inputId + " li a.allcityClass", "click", function () {
            var vm = $(this).text();
            var provinceId = $(this).attr("provinceId");
            var cityId = $(this).attr("cityId");
            var countyId = $(this).attr("countyId");
            if(countyId != null){
                $("#"+inputId+"_sel").val(countyId);
            }
            else if(cityId != null){
                $("#"+inputId+"_sel").val(cityId);
            }
            else if(provinceId != null){
                $("#"+inputId+"_sel").val(provinceId);
            }
            var provinceName;
            var cityName;
            var rtn;
            for (i = 0; i < allProvinces.length; i++) {
                if (allProvinces[i].id == provinceId) {
                    provinceName = allProvinces[i].provinceName;
                    break;
                }
            }
            for (i = 0; i < allCitys.cities.length; i++) {
                if (allCitys.cities[i].id == cityId) {
                    cityName = allCitys.cities[i].name;
                    break;
                }
            }
            if (currentClass == "proCityQueryAll") {
                $("body").data("pAllId", provinceId);
                $("body").data("cAllId", cityId);
                $("body").data("aAllId", countyId);
                $("body").data("pAllName", provinceName);
                $("body").data("nameOfCityAll", cityName);
            }
            vm = vm.split("(");
            countyName = $.trim(vm[0]);
            if (countyId == null || countyName == cityName) {
                if (currentClass == "proCityQueryAll") {
                    thisObj.trigger("click");
                    countiesAll = [];
                    var j = 0;
                    $.each(allCountys,
                        function (i, county) {
                            if (county.cityId == cityId && county.areaName != cityName) {
                                countiesAll[j++] = county;
                            }
                        });
                    countyTotalPageAll = Math.ceil(countiesAll.length / pa_pageSize);
                    $("#provinceCityAll_" + inputId).find(".tabs").find("a").removeClass("current");
                    $("#provinceCityAll_" + inputId + " .tabs").find("#countyAll_" + inputId).addClass("current");
                    $(".con .cityAll .list a").removeClass("current");
                    $("#provinceCityAll_" + inputId).find(".con").children().hide();
                    $("#provinceCityAll_" + inputId).find(".con").find(".countyAll").show();
                    $(".con .provinceAll .list a").removeClass("current");
                    allCountyPage(1, inputId);
                }
            }
            else {
                rtn = provinceName + "-" + countyName;
                if (currentClass == "proCityQueryAll") {
                    $("#proCityQueryAll_" + inputId).val(rtn);
                    $("#proCityQueryAll_" + inputId).trigger("change");
                    $("#provinceCityAll_" + inputId).find(".tabs").find("a").removeClass("current");
                    $("#provinceCityAll_" + inputId).find(".tabs").find("a[tb=hotCityAll]").addClass("current");
                    $("#provinceCityAll_" + inputId + " .con .list a").removeClass("current");
                    $("#provinceCityAll_" + inputId + " .con .list a input").removeClass("current");
                }
            }
            $("#dimCityQuery_" + inputId).hide();
            return false;
        });
        $("#provinceAll_" + inputId + " .pre a").bind('click',
            function () {
                var provincePage1 = parseInt($('#provincePage1_' + inputId).html());
                if (provincePage1 == 1) {
                    return;
                }
                viewAllProvince(provincePage1 - 1, inputId);
            });
        $("#cityAll_" + inputId + " .pre a").bind('click',
            function () {
                var cityPages1 = parseInt($('#cityPage1_' + inputId).html());
                if (cityPages1 == 1) {
                    return;
                }
                allCityPage(cityPages1 - 1, inputId);
            });
        $("#countyAll_" + inputId + " .pre a").bind('click',
            function () {
                var countyPages = parseInt($('#countyPage1_' + inputId).html());
                if (countyPages == 1) {
                    return;
                }
                allCountyPage(countyPages - 1, inputId);
            });
        $("#provinceAll_" + inputId + " .next a").bind('click',
            function () {
                var provincePage1 = parseInt($('#provincePage1_' + inputId).html());
                provinceAllTotalPage = countAllProvincePages();
                if (provincePage1 >= provinceAllTotalPage) {
                    return;
                }
                viewAllProvince(provincePage1 + 1, inputId);
            });
        $("#cityAll_" + inputId + " .next a").bind('click',
            function () {
                if ($(this).hasClass("can")) {
                    var cityPages1 = parseInt($('#cityPage1_' + inputId).html());
                    allCityPage(cityPages1 + 1, inputId);
                }
            });
        $("#countyAll_" + inputId + " .next a").bind('click',
            function () {
                if ($(this).hasClass("can")) {
                    var countyPages = parseInt($('#countyPage1_' + inputId).html());
                    allCountyPage(countyPages + 1, inputId);
                }
            });
    }
}
function sendAllProvinceAjax(inputId) {
    allProvinces = globalProvinceData.provinces;
    $("body").data("allProvinces", allProvinces);
    viewAllProvince(1, inputId);
}

function sendAllCitiesAjax(inputId) {
    allCities = globalCityData.cities;
    $("body").data("CitysAll", globalCityData);
    viewAllHotCities(inputId);
}

function sendAllCountiesAjax(inputId) {
    allAreas = globalAreaData.areas;
    $("body").data("allCountys", allAreas);
}

function viewAllHotCities(inputId) {
    if($("#hotCityAll_" + inputId + " .list ul li").length == 0){
        $.each(allCities,
            function (i, city) {
                if (city.hotCity) {
                    $("#hotCityAll_" + inputId + " .list ul").append("<li><a><input type='button' style='background:none;border:0px;cursor: pointer;' onclick=hotCityAddrInputAll(\'" + city.provinceId + "," + city.id + "," + city.name + "\',\'" + inputId + "\') id='" + city.id + "' value='" + city.name + "'></a></li>");
                }
            });
    }
}

function countAllProvincePages() {
    provinceAllTotalPage = Math.ceil(allProvinces.length / pa_pageSize);
    return provinceAllTotalPage;
}

function viewAllProvince(page, inputId) {
    $("#provinceAll_" + inputId + " .list ul li").remove();
    if (page == 1) {
        $("#provinceAll_" + inputId + " .pre a").removeClass("can");
        $("#provinceAll_" + inputId + " .next a").addClass("can");
    } else {
        $("#provinceAll_" + inputId + " .pre a").addClass("can");
        $("#provinceAll_" + inputId + " .next a").addClass("can");
    }
    var end;
    var start;
    if (page == provinceAllTotalPage) {
        start = (page - 1) * pa_pageSize;
        end = allProvinces.length;
        $("#provinceAll_" + inputId + " .next a").removeClass("can");
    } else {
        start = (page - 1) * pa_pageSize;
        end = start + pa_pageSize;
    }
    for (var i = start; i < end; i++) {
        var p_id = allProvinces[i].id;
        var p_name = allProvinces[i].provinceName;
        if (allProvinces[i].provinceName == '内蒙古自治区') {
            p_name = '内蒙古';
        } else if (allProvinces[i].provinceName == '黑龙江省') {
            p_name = '黑龙江';
        } else {
            p_name = allProvinces[i].provinceName.substr(0, 2);
        }
        var li = $('<li><a style="background: none repeat scroll 0% 0% transparent; border: 0px none;" href="javascript:onclick=viewAllCities(' + i + ',\'' + inputId + '\');" id="' + p_id + '">' + p_name + '</a></li>');
        $("#provinceAll_" + inputId + " .list ul").append(li);
    }
    $("#provincePage1_" + inputId).remove();
    $("#provinceAll_" + inputId + " .list").append("<label id='provincePage1_" + inputId + "' style='display:none;'>" + page + "</label>");
}

function viewAllCities(i, inputId) {
    allProId = allProvinces[i].id;
    $("body").data("pAllName", allProvinces[i].provinceName);
    $("body").data("pAllId", allProId);
    allCitys = [];
    var j = 0;
    $.each(allCities,
        function (i, city) {
            if (city.provinceId == allProId) {
                allCitys[j++] = city;
            }
        });
    allCityTotalPage = Math.ceil(allCitys.length / pa_pageSize);
    $("#provinceCityAll_" + inputId).find(".tabs").find("a").removeClass("current");
    $("#provinceCityAll_" + inputId+" .tabs").find("a[name='cityAll']").addClass("current");
    $("#provinceCityAll_" + inputId).find(".con .provinceAll .list a").removeClass("current");
    $("#provinceCityAll_" + inputId).find(".con .provinceAll .list a[id='" + allProId + "']").addClass("current");
    $("#provinceCityAll_" + inputId).find(".con").children().hide();
    $("#provinceCityAll_" + inputId).find(".con").find(".cityAll").show();
    allCityPage(1, inputId);
}

function allCityPage(page, inputId) {
    $("#cityAll_" + inputId + " .list ul li").empty();
    $("#cityAll_" + inputId + " .list ul li").remove();
    if (page == 1) {
        $("#cityAll_" + inputId + " .pre a").removeClass("can");
    } else {
        $("#cityAll_" + inputId + " .pre a").addClass("can");
    }
    var start;
    var end;
    if (page <= 1) {
        page = 1;
        $("#cityAll_" + inputId + " .pre a").removeClass("can");
        $("#cityAll_" + inputId + " .next a").addClass("can");
    }
    if (allCityTotalPage == 1) {
        $("#cityAll_" + inputId + " .next a").removeClass("can");
        $("#cityAll_" + inputId + " .pre a").removeClass("can");
    }
    if (page >= allCityTotalPage) {
        page = allCityTotalPage;
        $("#cityAll_" + inputId + " .next a").removeClass("can");
        start = (page - 1) * pa_pageSize;
        end = allCitys.length;
    } else if (page == 1) {
        start = (page - 1) * pa_pageSize;
        end = start + pa_pageSize;
        $("#cityAll_" + inputId + " .pre a").removeClass("can");
        $("#cityAll_" + inputId + " .next a").addClass("can");
    } else {
        start = (page - 1) * pa_pageSize;
        end = start + pa_pageSize;
        $("#cityAll_" + inputId + " .next a").addClass("can");
        $("#cityAll_" + inputId + " .pre a").addClass("can");
    }
    for (var i = start; i < end; i++) {
        var c_id = allCitys[i].id;
        var cityName = allCitys[i].name.substr(0, 4);
        var li = $('<li><a href="javascript:onclick=viewAllCounties(' + i + ',\'' + inputId + '\')" id="' + c_id + '">' + cityName + '</a></li>');
        $("#cityAll_" + inputId + " .list ul").append(li);
    }
    $("#cityAll_" + inputId + " .list #cityPage1_" + inputId).remove();
    $("#cityAll_" + inputId + " .list").append("<label id='cityPage1_" + inputId + "' style='display:none;'>" + page + "</label>");
}

function viewAllCounties(i, inputId) {
    cityIdAll = allCitys[i].id;
    $("body").data("cAllId", cityIdAll);
    var cityname = $.trim(allCitys[i].name);
    $("body").data("nameOfCityAll", cityname);
    countiesAll = [];
    var j = 0;
    $.each(allAreas,
        function (i, countys) {
            if (countys.cityId == cityIdAll) {
                countiesAll[j++] = countys;
            }
        });
    countyTotalPageAll = Math.ceil(countiesAll.length / pa_pageSize);
    $("#provinceCityAll_" + inputId).find(".tabs").find("a").removeClass("current");
    $("#provinceCityAll_" + inputId + " .tabs").find("a[name=countyAll]").addClass("current");
    $(".con #cityAll_" + inputId + " .list a").removeClass("current");
    $(".con #cityAll_" + inputId + " .list a[id='" + cityIdAll + "']").addClass("current");
    $("#provinceCityAll_" + inputId).find(".con").children().hide();
    $("#provinceCityAll_" + inputId).find(".con").find(".countyAll").show();
    $("#"+inputId+"_sel").val(cityIdAll);
    allCountyPage(1, inputId);
}

function allCountyPage(page, inputId) {
    var nameOfProvince = $("body").data("pAllName");
    var cityCurrentName = $("body").data("nameOfCityAll");
    $("input.current2_"+inputId).removeClass("iGrays");
    $("input.current2_"+inputId).val(nameOfProvince + "-" + cityCurrentName);
    $("#countyAll_" + inputId + " .list ul li").remove();
    if (page == 1) {
        $("#countyAll_" + inputId + " .pre a").removeClass("can");
    } else {
        $("#countyAll_" + inputId + " .pre a").addClass("can");
    }
    var start;
    var end;
    if (page <= 1) {
        page = 1;
        $("#countyAll_" + inputId + " .pre a").removeClass("can");
        $("#countyAll_" + inputId + " .next a").addClass("can");
    }
    if (countyTotalPageAll == 1) {
        $("#countyAll_" + inputId + " .next a").removeClass("can");
        $("#countyAll_" + inputId + " .pre a").removeClass("can");
    }
    if (page >= countyTotalPageAll) {
        page = countyTotalPageAll;
        $("#countyAll_" + inputId + " .next a").removeClass("can");
        start = (page - 1) * pa_pageSize;
        end = countiesAll.length;
    } else if (page == 1) {
        start = (page - 1) * pa_pageSize;
        end = start + pa_pageSize;
        $("#countyAll_" + inputId + " .pre a").removeClass("can");
        $("#countyAll_" + inputId + " .next a").addClass("can");
    } else {
        start = (page - 1) * pa_pageSize;
        end = start + pa_pageSize;
        $("#countyAll_" + inputId + " .next a").addClass("can");
        $("#countyAll_" + inputId + " .pre a").addClass("can");
    }
    for (var i = start; i < end && countiesAll && countiesAll.length > 0; i++) {
        var c_id = countiesAll[i].id;
        var countyName = countiesAll[i].areaName.substr(0, 4);
        var li = $('<li><a href="javascript:onclick=addrInputAll(' + i + ',\'' + inputId + '\')" id="' + c_id + '">' + countyName + '</a></li>');
        $("#countyAll_" + inputId + " .list ul").append(li);
    }
    $("#countyAll_" + inputId + " .list #countyPage1_" + inputId).remove();
    $("#countyAll_" + inputId + " .list").append("<label id='countyPage1_" + inputId + "' style='display:none;'>" + page + "</label>");
}

function addrInputAll(i, inputId) {
    var countyId = $.trim(countiesAll[i].id);
    $(".con #hotCityAll_"+inputId+" .list a input").removeClass("current");
    $(".con #hotCityAll_"+inputId+" .list a input[id='" + cityIdAll + "']").addClass("current");
    $(".con .countyAll .list a").removeClass("current");
    $(".con .countyAll .list a[id='" + countyId + "']").addClass("current");
    allProId = $("body").data("pAllId");
    cityIdAll = $("body").data("cAllId");
    var p = null;
    $.each(allProvinces,
        function (i, province) {
            if (province.id == allProId) {
                p = province.provinceName;
                return false;
            }
        });
    var c = null;
    $.each(allCities,
        function (i, city) {
            if (city.id == cityIdAll) {
                c = city.name;
                return false;
            }
        });
    var a = null;
    $.each(countiesAll,
        function (i, county) {
            if (county.id == countyId) {
                a = county.areaName;
                return false;
            }
        });
    var nameValue = $("input.current2_"+inputId);
    nameValue.removeClass("iGrays");
    $("#provinceCityAll_" + inputId).hide();
    var rtn = p + "-" + c + "-" + a;
    $("input.current2_"+inputId).val(rtn);
    $("#"+inputId+"_sel").val(countyId);
}
function hotCityAddrInputAll(proCityId, inputId) {
    allProId = proCityId.split(",")[0];
    cityIdAll = proCityId.split(",")[1];
    var cityCurName = proCityId.split(",")[2];
    $("body").data("nameOfCityAll", cityCurName);
    $("body").data("pAllId", allProId);
    $("body").data("cAllId", cityIdAll);
    $.each(allProvinces,
        function (i, pro) {
            if (pro.id == allProId) {
                $("body").data("pAllName", pro.provinceName);
            }
        });
    countiesAll = [];
    var j = 0;
    $.each(allAreas,
        function (i, county) {
            if (county.cityId == cityIdAll) {
                countiesAll[j++] = county;
            }
        });
    countyTotalPageAll = Math.ceil(countiesAll.length / pa_pageSize);
    $("#provinceCityAll_" + inputId).find(".tabs").find("a").removeClass("current");
    $("#provinceCityAll_" + inputId).find(".tabs").find("a[name='countyAll']").addClass("current");
    $(".con .cityAll .list a").removeClass("current");
    $(".con #cityAll_"+inputId+" .list a[id='" + cityIdAll + "']").addClass("current");
    $("#provinceCityAll_" + inputId).find(".con").children().hide();
    $("#provinceCityAll_" + inputId).find(".con").find(".countyAll").show();
    $(".con #provinceAll_" + inputId + " .list a").removeClass("current");
    allCountyPage(1, inputId);
    $("#"+inputId+"_sel").val(cityIdAll);
}

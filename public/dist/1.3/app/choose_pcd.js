define(function(require,exports,module){function e(e){var t={container:"body",trigger:$(".js-district"),className:"right",confirmed:function(e){console.info("[PCD info] ",JSON.stringify(e))}};this.options=$.extend({},t,e)}e.prototype.init=function(){var e=this,t=$(e.options.trigger),a={proID:t.data("pro-id"),cityID:t.data("city-id"),areaID:t.data("area-id"),proName:t.data("pro-name"),cityName:t.data("city-name"),areaName:t.data("area-name")};return e.modal=$(".u-area"),e.modal[0]||(e.modal=$(e.setLayout()),e.bindEvents()),e.selects={pro:e.modal.find("#list-pro"),city:e.modal.find("#list-city"),area:e.modal.find("#list-area")},t.on("click",function(){e.open()}),$.when(function(){var t=$.Deferred();return e.queryItem({type:1,callback:function(){var i=a.proID,o=a.proName;if(i||o){var n=$.grep(e.selects.pro.find("option"),function(e){return $(e).val()==i||$(e).text()===o});$(n[0]).attr("selected",!0),t.resolve($(n[0]).val())}else t.reject()}}),t.promise()}()).then(function(t){var i=$.Deferred();return e.queryItem({type:2,id:t,callback:function(){var t=a.cityID,o=a.cityName,n=$.grep(e.selects.city.find("option"),function(e){return $(e).val()==t||$(e).text()===o});$(n[0]).attr("selected",!0),i.resolve($(n[0]).val())}}),i.promise()}).then(function(t){e.queryItem({type:3,id:t,callback:function(){var t=a.areaID,i=a.areaName,o=$.grep(e.selects.area.find("option"),function(e){return $(e).val()==t||$(e).text()===i});$(o[0]).attr("selected",!0)}})}),e},e.prototype.queryItem=function(e){var t,a=this,i=[],o=a.selects;switch(console.log(e),e.type){case 1:i.push('<option value="-1">请选择省份</option>'),t=o.pro,o.city.attr("disabled",!0).addClass("ban"),o.area.attr("disabled",!0).addClass("ban"),o.city.empty().append('<option value="-1">请选择城市</option>'),o.area.empty().append('<option value="-1">请选择区域</option>');break;case 2:i.push('<option value="-1">请选择城市</option>'),t=o.city,o.city.attr("disabled",!0).addClass("ban"),o.area.attr("disabled",!0).addClass("ban"),o.area.empty().append('<option value="-1">请选择区域</option>');break;case 3:i.push('<option value="-1">请选择区域</option>'),t=o.area,o.area.attr("disabled",!0).addClass("ban")}t.empty().append(i),/-1/.test(e.id)||M.ajax({showLoading:!1,url:"/api/address/queryArea",data:{data:JSON.stringify(e||{})},success:function(a){var o=a.data;$.each(o,function(e,t){i.push('<option value="'+t.id+'">'+t.name+"</option>")}),t.empty().append(i),t.removeAttr("disabled").removeClass("ban"),e.callback&&e.callback()}})},e.prototype.open=function(){var e=this;e.modal.addClass("show")},e.prototype.close=function(){var e=this;e.modal.removeClass("show")},e.prototype.setLayout=function(){var e=this,t=['<section class="u-fixed u-area '+e.options.className+'">','<div class="mask"></div>','<div class="content">','<ul class="u-form gap fm-addr-pcd">','<li><em>省 份</em><div class="field"><select id="list-pro"></select></div></li>','<li><em>城 市</em><div class="field"><select id="list-city" disabled></select></div></li>','<li><em>区 域</em><div class="field"><select id="list-area" disabled></select></div></li>',"</ul>",'<div class="u-submit"><button class="u-btn max success alone js-confirm">确定</button></div>',"</div></section>"];return $(t.join("")).appendTo(e.options.container)},e.prototype.bindEvents=function(){var e=this,t=e.modal;t.on("click",".mask",function(){e.close()}),t.on("change",".fm-addr-pcd select",function(){var t={id:$(this).val()};switch(this.id){case"list-pro":t.type=2,e.queryItem(t);break;case"list-city":t.type=3,e.queryItem(t);break;case"list-area":}}),t.on("click",".js-confirm",function(){var t=e.selects;for(var a in t){var i=t[a];if(/-1/.test(i.val()))return M.tips(i.find("option:eq(0)").text())}var o={proID:+t.pro.val(),proName:t.pro.find("option:selected").text(),cityID:+t.city.val(),cityName:t.city.find("option:selected").text(),areaID:+t.area.val(),areaName:t.area.find("option:selected").text()};$(e.options.trigger).data({"pro-id":o.proID,"city-id":o.cityID,"area-id":o.areaID}),e.options.confirmed.call(this,o),e.close()})},module.exports=e});
define(function(require,exports,module){var t={config:{params:M.url.params(),hashParams:function(){return M.url.getParams((location.hash.match(/(\w+=)([^\&]*)/gi)||[]).join("&"))},api:{}},init:function(t){var a=this,e=a.config;e.params;e.$container=$("#app"),a.bindEvents(),require.async("swipe",function(){M.swipe.init()})},bindEvents:function(){var a=t.config,e=a.params,s=a.$container;s.on("click",".mask, .js-close",function(){$(this).closest(".u-fixed").removeClass("show")}),s.on("click",".js-sku-confirm",function(){var t=$(this),a=$(".js-sku.current").closest(".goods"),s=(a.closest(".item"),localStorage.getItem(CONST.local_cartId));require.async("app/sku",function(i){var n=i.selected();if(!n.itemId){var c=$.map($(".sku dl dt"),function(t){if(!$(t).closest("dl").find(".sku-key.active")[0])return $(t).text()})[0];return M.tips("请选择"+c)}a.attr("data-item-id",n.itemId).attr("data-price",n.detail.price).attr("data-oprice",n.detail.oprice).find(".spec").addClass("selected").text("已选"+n.desc.join(",")),t.closest(".u-sku").find(".js-close").trigger("click");var d={cartId:s,jsonTerm:JSON.stringify([{itemId:n.itemId,templateId:e.templateId,count:+$(".u-sku .u-quantity .number").text()}]),pmtType:0};M.ajax({location:!0,url:"/api/addToCart",data:{data:JSON.stringify(d)},success:function(t){return 200!=t.success_code?M.tips(t.msg):(localStorage.setItem(CONST.local_cartId,t.cartId),M.tips({body:"加入购物车成功",class:"true"}),$(".u-sku .js-close").trigger("click"),t.deliveLeavePrice>0?$(".u-go-cart dl").html("<dt>合计：<strong>￥"+t.totalPrice+"</strong></dt><dd>还差￥"+t.deliveLeavePrice+"享免运费服务</dd>"):$(".u-go-cart dl").html("<dt>合计：<strong>￥"+t.totalPrice+"</strong></dt><dd>已享免运费服务</dd>"),void 0)}})})}),s.on("click",".js-add-cart",function(){var a=t.config,e=$(this).closest("li").data("templateId");if(a.params.templateId=e,e===$(".js-sku-confirm").data("template-id"))return $(".u-sku").addClass("show"),!1;var s={inlet:6,templateId:e};M.ajax({location:!0,url:"/api/goods_sku",data:{data:JSON.stringify(s)},success:function(t){$(".u-sku").find(".content").empty().append(t.template).end().addClass("show"),require.async("app/sku",function(t){t.init($(".sku")),$(".u-quantity .number").spinner(),$(".js-sku-confirm").data("template-id",e)})}})})}};t.init()});
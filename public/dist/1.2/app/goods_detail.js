define(function(require,exports,module){var a={config:{params:M.url.params(),hashParams:function(){return M.url.getParams((location.hash.match(/(\w+=)([^\&]*)/gi)||[]).join("&"))},api:{extra:"/api/goods_detail_extra"}},init:function(){var t=this,s=t.config,e=s.params;s.$container=$(".spa"),setTimeout(function(){M.lazyLoad.init()},250),require.async("swipe",function(){M.swipe.init()}),localStorage.getItem(CONST.local_cart_newGoods)&&$(".js-goods-cart").addClass("new"),$(".m-goods-detail").prepend('<div class="history-back"><a href="http://'+location.host+'/">商城首页</a><div'),require.async("weixin",function(a){M.wx.share(a,{title:$(".js-share-title").text(),url:location.href,image:$("#swipe-banner img:first").data("share"),desc:$(".js-share-desc").text()})}),a.bindEvents(),M.ajax({showLoading:!0,url:s.api.extra,data:e?{data:JSON.stringify(e)}:{},success:function(a){var t=a.template;s.$container.append(t)}})},bindEvents:function(){var t=a.config,s=t.params,e=t.$container,i=s.templateId,n=JSON.parse(localStorage.getItem(CONST.local_qualityPic))||{};n[i]=$(".quality").data("pic"),localStorage.setItem(CONST.local_qualityPic,JSON.stringify(n));var o=$(".u-tab"),c=$("#swipe-detail .ui-swipe-item"),d=$(".m-goods-detail"),r=d.height()-o.height();c.height(r),e.on("click",".guide .ellipsis",function(){$(this).toggleClass("collapse")}),e.on("click",".js-nav-list",function(){var a=$(this).next(),t=$("."+a.data("pop"));t.addClass("show"),t.find(".list").text()||t.find(".list").html(a.html())}),e.on("click",".js-voucher",function(){var a=$(this),t=a.closest("li").data("id");return!a.hasClass("ban")&&void M.ajax({url:"/api/coupons_receive",data:{tid:t},success:function(t){return 200!=t.success_code?M.tips(t.msg):(a.addClass("ban").text("已领取"),void M.tips({class:"true",body:"领取成功"}))},error:function(a){var t=a.msg;/^(-1)$/.test(a.error_code)&&(t="您还未登录，请登录后再试！"),M.tips(t)}})}),e.on("click",".js-address",function(){$(".m-select-address").addClass("show")}),e.on("click",".js-goods-tag",function(){$(".m-goods-tag").addClass("show")}),e.on("click",".m-select-address .list li",function(){var a=$(this),t=a.data("json");$.cookie(CONST.local_cookie_location,(new M.Base64).encode(JSON.stringify(t)),{expires:365,path:"/"}),M.reload()}),e.on("click",".m-select-address .gps",function(){$.removeCookie(CONST.local_cookie_location,{path:"/"}),M.reload()}),e.on("click",".mask, .js-close",function(){$(this).closest(".u-fixed").removeClass("show")}),e.on("click",".js-addToCart, .js-buy",function(){if($(this).hasClass("ban")||!e.find(".sku").data("sku-map"))return!1;var a=$(this).is(".js-buy")?"buy":"addToCart";require.async("app/sku",function(t){t.init(e.find(".sku")),e.find(".u-quantity .number").spinner(),e.find(".js-sku-confirm").data("action",a),e.find(".u-sku").addClass("show")})}),e.on("click",".js-sku-confirm",function(){var t=$(this).data("action");switch(t){case"buy":a.buyNow();break;case"addToCart":a.addToCart()}}),e.on("click",".js-comment-pic li img",function(){var a=$(this),t=a.parents(".js-comment-pic");require.async("weixin",function(s){s.previewImage({urls:t.data("json"),current:a.data("pic")})})});var l=$(".js-bean-time");if(l.length){var u=l,m=Number(u.data("start")),p=Number(u.data("end")),f=Number(u.data("current"));console.log(m,p,f),m>f?($(".js-buy").addClass("ban"),u.timeCountDown({startDate:f,endDate:m,callback:function(){$(".js-buy").removeClass("ban"),u.timeCountDown({startDate:m,endDate:p,callback:function(){$(".js-buy").addClass("ban"),M.reload()}})}})):m<=f&&f<=p?($(".js-buy").removeClass("ban"),u.timeCountDown({startDate:f,endDate:p,callback:function(){$(".js-buy").addClass("ban"),M.reload()}})):($(".js-buy").addClass("ban"),u.html("已结束"))}},addToCart:function(){var t=a.config,s=t.params;require.async("app/sku",function(a){var t=a.selected();if(!t.itemId){var e=$.map($(".sku dl dt"),function(a){if(!$(a).closest("dl").find(".sku-key.active")[0])return $(a).text()})[0];return M.tips("请选择"+e)}var i=localStorage.getItem(CONST.local_cartId),n={cartId:i,jsonTerm:JSON.stringify([{isBindShop:!!s.shopId,itemId:t.itemId,shopId:s.shopId,templateId:s.templateId,companyId:s.companyId,count:+$(".u-sku .u-quantity .number").text()}]),pmtType:0};M.ajax({location:!0,url:"/api/addToCart",data:{data:JSON.stringify(n)},success:function(a){return 200!=a.success_code?M.tips(a.msg):(localStorage.setItem(CONST.local_cartId,a.cartId),M.tips("商品已成功添加到购物车"),$(".u-sku .js-close").trigger("click"),localStorage.setItem(CONST.local_cart_newGoods,1),$(".js-goods-cart").addClass("new"),void 0)}})})},buyNow:function(){var t=a.config,s=t.params;require.async("app/sku",function(a){var t=a.selected();if(!t.itemId){var e=$.map($(".sku dl dt"),function(a){if(!$(a).closest("dl").find(".sku-key.active")[0])return $(a).text()})[0];return M.tips("请选择"+e)}var i={inlet:2==s.inlet?4:2,jsonTerm:JSON.stringify({itemId:t.itemId,templateId:s.templateId,count:+$(".u-sku .u-quantity .number").text(),shopId:s.shopId,companyId:s.companyId,isBindShop:s.shopId?1:0})};location.href="/cart#/settlement/"+$.param(i)})}};a.init()});
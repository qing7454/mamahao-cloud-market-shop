define(function(require,exports,module){var e={config:{params:M.url.params(),api:{index:"/api/cart/",settlement:"/api/settlement"}},init:function(){require.async("router",e.setRouter),e.bindEvents()},bindEvents:function(){},setRouter:function(){var t=new Router({container:"#app",enter:"enter",leave:"leave",enterTimeout:250,leaveTimeout:250}),a={url:"/",className:"m-cart-all",eles:{},render:function(t){a.params={cartId:localStorage.getItem(CONST.local_cartId)},t.loadingDelay=10,e.renderModule("index",t,a.params)},renderFooter:function(){if(!$(".cart-goods-module .js-item").length)return $(".m-cart-footer").remove(),void $(".m-cart-tools").remove();var e={allSelected:$('input[name="allSelected"]').val(),totalPrice:$('input[name="totalPrice"]').val(),disPrice:$('input[name="disPrice"]').val(),goodsCount:+$('input[name="goodsCount"]').val()},t=[];t.push('<ul class="field">'),e.allSelected?t.push('<li class="li-1"><label class="js-select-all"><input class="u-checkbox" type="checkbox" checked="checked"><em>全选</em></label></li>'):t.push('<li class="li-1"><label class="js-select-all"><input class="u-checkbox" type="checkbox"><em>全选</em></label></li>'),t.push('<li class="li-2"><dl><dt>合计：<strong>￥ '+e.totalPrice+"</strong></dt><dd>为您节省 ￥ <span>"+e.disPrice+"</span></dd></dl></li>"),0===e.goodsCount?t.push('<li class="li-3"><a class="u-btn ban" href="javascript:;">结算<span>('+e.goodsCount+")</span></a></li>"):t.push('<li class="li-3"><a class="u-btn success" href="#/settlement">结算<span>('+e.goodsCount+")</span></a></li>"),t.push("</ul>"),$(".m-cart-footer .info").html(t.join(""))},bind:function(){var e=($(this),a.params),t=a.eles,s=$(".spa"),i=$(".cart-goods-module");t.editBtn=".js-edit",t.saveBtn=".js-save",t.checkAll=".js-select-all",t.checkbox=".js-checkbox",t.editCheckAll=".js-edit-checkAll",t.editDeleteBtn=".js-edit-del.success",t.deleteIcon=".js-del",t.clearBtn=".js-clear",t.updateCountBtn=".js-update",t.editSKUBtn=".sku-edit",t.addToCartBtn=".js-add-cart",$(".cart-goods-module").children().length,a.renderFooter(),s.on("click",".mask, .js-close",function(e){$(this).closest(".u-fixed").removeClass("show")}),s.on("click",t.editBtn,function(){$(this).removeClass("edit js-edit").addClass("save js-save").html("完成"),$(".cart-recommend-module").hide(),$(".valid-list").addClass("edit"),$(".delete").show(),$(".m-cart-footer .info").hide()}),s.on("click",t.saveBtn,function(){$(this).removeClass("save js-save").addClass("edit js-edit").html("编辑"),$(".cart-recommend-module").show(),$(".valid-list").removeClass("edit"),$(".delete").hide(),$(".m-cart-footer .info").show()}),s.on("click",t.checkAll,function(e){if(!$(this).closest(".edit").length){var t=$(this).find(".u-checkbox:visible").is(":checked")?2:3,s=$.extend(!0,a.params,{isSelected:t});M.ajax({location:!0,url:"/api/cart/opt/selectedCart",data:{data:JSON.stringify(s)},success:function(e){i.html(e.template),a.renderFooter()}})}}),s.on("click",t.editCheckAll,function(e){$(this).is(":checked")?($(".u-edit-checkbox").prop("checked",!0),$(".js-edit-del").addClass("success").removeClass("ban"),$(".js-edit-checkAll").prop("checked",!0).next().html("全选(已选"+$(".js-item .u-checkbox:visible:checked").length+")")):($(".u-edit-checkbox").prop("checked",!1),$(".js-edit-del").addClass("ban").removeClass("success"),$(".js-edit-checkAll").prop("checked",!1).next().html("全选"))}),s.on("click",t.checkbox,function(e){if(e.stopPropagation(),$(this).closest(".edit").length)$(".u-edit-checkbox:checked").length?($(".js-edit-del").addClass("success").removeClass("ban"),$(".js-edit-checkAll").next().html("全选(已选"+$(".js-item .u-checkbox:visible:checked").length+")"),$(".u-checkbox:visible:checked").length==$(".u-checkbox:visible").length||$(".js-item .u-checkbox:visible").length==$(".js-item .u-checkbox:visible:checked").length?$(".js-edit-checkAll").prop("checked",!0):$(".js-edit-checkAll").prop("checked",!1)):($(".js-edit-del").addClass("ban").removeClass("success"),$(".js-edit-checkAll").next().html("全选"));else{var t=$(this).closest(".js-item"),s=$(this).find(".u-checkbox:visible").is(":checked")?0:1,c=JSON.stringify($.extend(!0,a.params,{isSelected:s,compoentId:"undefined"!=typeof $(this).closest("li").data("compoentId")?$(this).closest("li").data("compoentId"):t.data("compoentId")}));M.ajax({location:!0,url:"/api/cart/opt/selectedCart",data:{data:c},success:function(e){i.html(e.template),a.renderFooter()}})}}),s.on("click",t.editDeleteBtn,function(e){e.stopPropagation();var t=($(this).closest(".item"),[]),s=[];$(".u-edit-checkbox:checked").each(function(e,a){var i=$(a).closest(".js-item");i.length&&(s.push(i[0]),t.push({compoentType:i.data("compoentType"),compoentId:i.data("compoentId")}))});var i=$.extend(!0,a.params,{jsonTerm:JSON.stringify(t)}),c="确定要将这"+t.length+"个宝贝删除?";confirm(c,function(){this.hide(),M.ajax({location:!0,url:"/api/cart/opt/removeCartItem",data:{data:JSON.stringify(i)},success:function(e){$(s).remove()}})})}),s.on("click",t.deleteIcon,function(e){e.stopPropagation();var t=$(this).closest(".item"),s=$.extend(!0,a.params,{jsonTerm:JSON.stringify([{compoentType:$(this).closest("li").data("compoentType")||t.data("compoentType"),compoentId:"undefined"!=typeof $(this).closest("li").data("compoentId")?$(this).closest("li").data("compoentId"):t.data("compoentId")}])}),c=$(this).data("tips");confirm(c,function(){this.hide(),M.ajax({location:!0,url:"/api/cart/opt/removeCartItem",data:{data:JSON.stringify(s)},success:function(e){i.html(e.template),a.renderFooter()}})})}),s.on("click",t.clearBtn,function(e){e.stopPropagation();var t=$(this).data("tips"),s=JSON.stringify($.extend(!0,a.params,{removeType:2}));confirm(t,function(){this.hide(),M.ajax({location:!0,url:"/api/cart/opt/cleanCart",data:{data:s},success:function(e){i.html(e.template),a.renderFooter()}})})}),s.on("click",t.updateCountBtn,function(e){e.stopPropagation();var t=$(this),s=$(this).closest(".js-item"),c=+$(this).data("count");if(c<=0||$(this).is(".disabled")){if($(this).data("tips"))return alert($(this).data("tips"))}else{var o=JSON.stringify($.extend(!0,a.params,{newCount:c,compoentId:"undefined"!=typeof $(this).closest("li").data("compoentId")?$(this).closest("li").data("compoentId"):s.data("compoentId"),isEdit:$(".valid-list.edit").length}));M.ajax({location:!0,url:"/api/cart/opt/updateCartItemCount",data:{data:o},success:function(e){$(".valid-list.edit").length?t.is(".decrement")?(t.data("count",c-1),t.next().html(c),t.next().next().data("count",c+1)):(t.data("count",c+1),t.prev().html(c),t.prev().prev().data("count",c-1)):(i.html(e.template),a.renderFooter())}})}}),s.on("click",".js-sku-confirm",function(t){var s=$(this),i=$(".js-sku.current").closest(".goods"),c=(i.closest(".item"),a.curItem),o=localStorage.getItem(CONST.local_cartId);require.async("app/sku",function(t){var a=t.selected();if(!a.itemId){var n=$.map($(".sku dl dt"),function(e){if(!$(e).closest("dl").find(".sku-key.active")[0])return $(e).text()})[0];return M.tips("请选择"+n)}if(i.attr("data-item-id",a.itemId).attr("data-price",a.detail.price).attr("data-oprice",a.detail.oprice).find(".spec").addClass("selected").text("已选"+a.desc.join(",")),s.closest(".u-sku").find(".js-close").trigger("click"),$(".valid-list.edit").length){var l={cartId:o,jsonTerm:JSON.stringify([{itemId:e.itemId,compoentId:e.compoentId,newItemId:a.itemId}])};M.ajax({location:!0,url:"/api/cart/changeSKU",data:{data:JSON.stringify(l)},success:function(e){return e._id?(localStorage.setItem(CONST.local_cartId,e._id),$(".u-sku .js-close").trigger("click"),c.find(".pic img").attr("src",a.detail.itemPic+"@1e_200w_200h_0c_0i_0o_100q_1x.jpg"),c.find(".sku-ok").html(a.desc.join()),c.find(".sku-edit").html(a.desc.join()),c.find(".price").html("<strong>￥"+a.detail.price+"</strong><del>￥"+a.detail.oprice+"</del>"),void 0):M.tips(e.msg)}})}else{var l={cartId:o,jsonTerm:JSON.stringify([{itemId:a.itemId,templateId:e.templateId,count:+$(".u-sku .u-quantity .number").text()}]),pmtType:0};M.ajax({location:!0,url:"/api/addToCart",data:{data:JSON.stringify(l)},success:function(e){return 200!=e.success_code?M.tips(e.msg):(localStorage.setItem(CONST.local_cartId,e.cartId),M.tips({body:"加入购物车成功",class:"true"}),$(".u-sku .js-close").trigger("click"),window.location.reload(),void 0)}})}})}),s.on("click",t.editSKUBtn,function(){var t=$(this).closest(".item");a.curItem=t;var s=t.data("templateId"),i=t.data("itemId"),c=t.data("compoentId");if(e.templateId=s,e.itemId=i,e.compoentId=c,s===$(".js-sku-confirm").data("template-id"))return $(".u-sku").addClass("show"),!1;var o={inlet:6,templateId:s};M.ajax({location:!0,url:"/api/goods_sku",data:{data:JSON.stringify(o)},success:function(e){$(".u-sku").find(".content").empty().append(e.template).end().addClass("show"),require.async("app/sku",function(e){e.init($(".sku")),$(".u-quantity .number").spinner(),$(".js-sku-confirm").data("template-id",s)})}})}),s.on("click",".box",function(){$(this).closest(".edit").length||(location.href="/goods/detail/?inlet=6&templateId="+$(this).closest(".item").data("templateId")+"&itemId="+$(this).closest(".item").data("itemId"))}),s.on("click",t.addToCartBtn,function(){var e=$(this).closest("li").data("templateId");if(a.params.templateId=e,e===$(".js-sku-confirm").data("template-id"))return $(".u-sku").addClass("show"),!1;var t={inlet:6,templateId:e};M.ajax({location:!0,url:"/api/goods_sku",data:{data:JSON.stringify(t)},success:function(t){$(".u-sku").find(".content").empty().append(t.template).end().addClass("show"),require.async("app/sku",function(t){t.init($(".sku")),$(".u-quantity .number").spinner(),$(".js-sku-confirm").data("template-id",e)})}})}),localStorage.removeItem(CONST.local_cart_newGoods)}},s={url:"/settlement/:params?",render:function(t){var a={},s=M.url.getParams(this.params.params);if(!$.isEmptyObject(s)){var i=JSON.parse(s.jsonTerm);a.inlet=s.inlet,a.jsonTerm=i}var c=localStorage.getItem(CONST.local_settlement_addr);c&&(c=JSON.parse(c),a.deliveryAddr=c),console.log(a),e.renderModule("settlement",t,a)},bind:function(){var t=$(this);require.async("app/settlement",function(a){new a(e,t).render()})}};t.push(a).push(s).setDefault("/").init()},renderModule:function(module,t,a){var s=require("app/renderSPA");s(e.config.api[module],t,a)}};e.init()});
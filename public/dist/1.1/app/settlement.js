define(function(require,exports,module){function t(t,e){this.page=t,this.container=e}module.exports=t,t.prototype.render=function(){var t=this;t.page;t.bind()},t.prototype.stockOut=function(t){var e=localStorage.getItem(CONST.local_settlement_addr);if(e&&(e=JSON.parse(e),localStorage.removeItem(CONST.local_settlement_addr)),t&&t.length>0){var a=['<div class="goods-list"><ul>'];for(i=0;i<t.length;i++){var s=t[i],n="";$.each(s.spec,function(t){t>0&&(n+=","),n+=this.value}),a.push("<li>"),a.push('<div class="pic"><img src="'+s.itemPic+'@1e_200w_200h_0c_0i_0o_100q_1x.jpg"><em>暂时缺货</em></div>'),a.push("<dl><dt>"+s.itemTitle+"</dt><dd><span>"+n+"</span>"),s.isGift?a.push("<em>赠品</em>"):a.push("<strong>￥"+s.showPrice+"</strong>"),a.push("</dd></dl></li>")}a.push("</ul></div>"),M.dialog({className:"m-cart-lack",title:"您选购的以下商品缺货",body:a.join(""),buttons:[{text:"找相似商品",class:"",onClick:function(){location.href="/"}},{text:"继续结算",class:"success",onClick:function(){this.hide(),location.reload()}}]})}else e?M.dialog({body:"商品在该区域暂时缺货",buttons:[{text:"修改地址",class:"",onClick:function(){location.href="/center#/address/f=1&id="+e.deliveryAddrId}},{text:"我知道了",class:"success",onClick:function(){this.hide(),history.length?history.go(-1):location.href="/cart"}}]}):M.dialog({body:"商品在该区域暂时缺货",buttons:[{text:"找其他商品",class:"",onClick:function(){location.href="/"}},{text:"我知道了",class:"success",onClick:function(){this.hide(),history.length?history.go(-1):location.href="/cart"}}]})},t.prototype.fillData=function(t){var e=this,i=e.container;console.log(t);var a=[];a.push('<a class="u-arrow right" href="/center#/address/f=1&amp;id='+t.deliveryAddrId+'">'),t.isDefult?a.push('<dl class="default"><dt><strong>'):a.push("<dl><dt><strong>"),a.push(t.consignee+"</strong><em>"+t.phone+"</em></dt><dd>"+t.addr),a.push("</dd></dl></a>"),$(".js-address").html(a.join("")),i.find('[name="deliveryAddrId"]').val(t.deliveryAddrId)},t.prototype.getFormData=function(){var t=this,e=t.container,i=e.find(".js-delivery").data("delivery"),a=e.find('[name="deliveryAddrId"]'),s=e.find(".js-vouchers"),n=$('.open input[name="mbean"]'),l=$('.open input[name="gbCount"]'),o=$('.open input[name="mcCount"]');$("#mbean").find(".u-switch:checked").length&&(n=$('input[name="mbean"]'));var d={orderBatchNo:e.find('[name="orderNo"]').val(),dealingType:1,madouCount:n.length?+n.val():0,gbCount:l.length?+l.val():0,mothercareCount:o.length?+o.val():0,deliveryAddrId:a.length?a.val():"",deliveryWays:JSON.stringify(i)};return s.length&&s.data("ids")&&(d.voucherIds=""+s.data("ids")),d},t.prototype.calcu=function(){var t=+$('[name="payPrice"]').val(),e=+$('[name="mailPrice"]').val(),i=($(".js-point").data("totalDiscount"),$(".js-vouchers").length?$(".js-vouchers").data("discount"):0),a=$('.open input[name="mbean"]'),s=$('.open input[name="gbCount"]'),n=$('.open input[name="mcCount"]'),l=a.length?M.calc.divide(a.val(),a.data("ratio")):0,o=s.length?M.calc.divide(s.val(),s.data("ratio")):0,d=n.length?M.calc.divide(n.val(),n.data("ratio")):0,c=i+l+o+d,r=M.calc.subtract(t,c);$("#deliveryFee:visible").length?$(".js-finalPrice").html("￥"+(r+e)):$(".js-finalPrice").html("￥"+r),$.each($(".js-point li").not(".open"),function(){if($(this).find(".u-switch").is(".disabled"))return!1;var e=$(this).find('input[type="tel"]'),i=e.data("ratio"),a=e.data("max"),s=M.calc.subtract(t,c),n=a;n="mcCount"==e.attr("name")?M.calc.multiply(~~(s/300),300)*i:M.calc.multiply(s,i);var l=a<n?a:n;e.data("useable",l),e.val(l),e.next().html("￥"+M.calc.divide(l,i)),e.prev().html(l),$(this).find(".u-switch").is(".disabled")||(0==l?$(this).find(".u-switch").addClass("diabled").attr("disabled",!0):$(this).find(".u-switch").removeClass("diabled").attr("disabled",!1))})},t.prototype.bind=function(){var t=this,e=t.container,i=($(".spa"),$("#settlement")),a=i.data("stockout");if(a&&0!=a)return void t.stockOut(a==-10001?[]:i.data("stockoutGoods"));var s=localStorage.getItem(CONST.local_settlement_addr);s&&(s=JSON.parse(s),t.fillData(s),localStorage.removeItem(CONST.local_settlement_addr)),t.calcu(),e.on("click",".mask",function(){$(this).closest(".u-fixed").removeClass("show")}),e.on("click",".js-cancel",function(){$(this).closest(".u-fixed").removeClass("show")});var n=$("#delivery-ways");e.on("click",".js-delivery",function(){n.addClass("show")}),e.on("click",".js-btn-delivery",function(){if(!$(this).is(".checked")){var e=$(this).closest(".js-delivery-item"),i=$(this).data("type");e.find("button[data-type="+i+"]").addClass("checked").siblings().removeClass("checked"),e.find(".js-tips[for="+i+"]").slideDown().siblings(".js-tips").slideUp();var a=[];$(".js-btn-delivery.checked").each(function(){a.push($(this).data("type"))}),a.getIndex(1)==-1&&a.getIndex(3)==-1?$("#deliveryFee").hide():$("#deliveryFee").show(),t.calcu()}}),e.on("click",".js-ok",function(){var t=[],i="";e.find(".js-delivery-item").each(function(){var e=$(this);t.push({type:e.data("type"),sid:e.data("id"),deliveryWay:e.find("button.checked").data("type")}),e.index()>0&&(i+=" + "),i+=e.find("button.checked").text()}),$(".js-delivery").data("delivery",t).find("em").html(i),n.removeClass("show")}),e.on("click",".js-coupon",function(){$("#coupon").addClass("show")}),e.on("click",".js-coupon-item",function(){$(".open").each(function(){$(this).find(".u-switch").trigger("click")}),$(".u-radio:checked").prop("checked",!1);var e=$(this).data("id"),i=$(this).data("discount");e?$(".js-vouchers").data({ids:e,discount:i}).html("省"+i+"元"):$(".js-vouchers").data({ids:null,discount:0}).html("不使用优惠券"),$(this).find(".u-radio").prop("checked",!0),$("#coupon").removeClass("show"),t.calcu()}),e.on("click",".u-switch",function(){if(!$(this).is(".disabled")){if($(this).is(":checked")){$(this).closest("li").addClass("open");var e=$(this).closest("li").find('input[type="tel"]');e.val(e.data("useable"))}else{$(this).closest("li").removeClass("open");var i=$(this).closest("li").find(".js-point-discount-display");i.html("￥"+i.data("max"))}t.calcu()}}),e.on("input",'.js-point input[type="tel"]',function(){var e=$(this),i=e.data("useable");""==e.val()||(e.val()>i||!/^[1-9]+\d*$/.test(e.val()))&&e.val(i),e.next().html("￥"+e.val()/e.data("ratio")),t.calcu()}),e.on("change",'.js-point input[type="tel"]',function(){var e=$(this),i=e.data("useable");""==e.val()?e.closest("li").find(".u-switch").trigger("click"):e.val()>i&&e.val(i),"mcCount"==e.attr("name")&&(0==~~(e.val()/300)?e.val(300):e.val(300*~~(e.val()/300))),e.next().html("￥"+e.val()/e.data("ratio")),t.calcu()}),e.on("click",".js-pay",function(){var e=t.getFormData();return e.paysType=5,e.deliveryAddrId?(console.log("支付提交数据--------",e),void M.ajax({url:"/api/pay",data:{data:e},success:function(t){200==t.success_code&&M.pay.order(t.orderBatchNo)}})):alert("请填写收货地址")})}});
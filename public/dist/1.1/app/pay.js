define(function(require,exports,module){function o(a){M.ajax({showLoading:!1,url:"/api/queryOrderState",data:{batchNo:a},success:function(e){200!=e.success?setTimeout(function(){o(a)},1e3):window.location.href="/pay/result?orderPayType=2&batchNo="+a},error:function(o){console.log("error---->",o)}})}var a=require("weixin");$("#error").length&&M.dialog({body:"订单已经支付,请勿重复发起支付",buttons:[{text:"确定",class:"success",onClick:function(){location.href="/center#/orders"}}]}),function(o){var a=navigator.userAgent.toLowerCase(),e=a.indexOf("micromessenger")!=-1;e||($(".js-codepay").hide(),$(".js-weixin").hide(),$(".code").hide())}(a);var e=function(o,a){M.ajax({url:"/api/checkPay",data:o,success:function(o){o.error_code&&5e3==o.error_code?M.dialog({body:"订单已经支付,请勿重复发起支付",buttons:[{text:"确定",class:"success",onClick:function(){location.href="/center#/orders"}}]}):a()}})};$(".js-alipay").on("click",function(){var o=$(this),a={batchNo:o.data("no"),resource:2};e({orderNo:o.data("no")},function(){M.pay.alipay({data:a})})}),$(".js-weixin").on("click",function(){var o=$(this),a={orderNo:o.data("no"),openId:o.data("openid")};e({orderNo:o.data("no")},function(){M.pay.weixin({data:a,callback:"/pay/result?orderPayType=2&batchNo="+o.data("no")})})}),$(".js-codepay").on("click",function(){var a=$(this),n=$(".code");n.data("show")||(n.show().data("show",!0),e({orderNo:a.data("no")},function(){var e=a.data("no"),n=a.data("openid"),c=new Image,t=M.config.api+"pay/weixin/makeWeixinScanCode.htm?batchNo="+e+"&openId="+n+"&size=240";c.src=t,c.onload=function(){$(".code").find(".js-code-pay-img").html(c)},o(e)}))})});
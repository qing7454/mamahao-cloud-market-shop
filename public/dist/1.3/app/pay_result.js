define(function(require,exports,module){var t={config:{params:M.url.params(),api:{guessYouLike:"/api/goods_guessYouLike",getRecommendList:"/api/cart/getRecommendList",getCommentList:"/api/getTobeCommentList",commentGoodsTemplate:"/api/commentGoodsTemplate"}},init:function(){t.bindEvents($("#app"))},bindEvents:function(t){var e=this;M.lazyLoad.init({container:$(".u-goods-list")}),t.on("click",".js-review-submit",e.submitComment),t.on("click",".js-star li",function(){var t=$(this).text();$(this).closest("ol").prev().attr("class","star star-"+t).data("star",t)}),t.on("change",".js-oss-file",function(t){var e=t.target.files[0];$file=$(this);var a=new FormData;a.append("file",e),M.ajax({type:"post",url:"/oss/uploadImage",cache:!1,data:a,processData:!1,contentType:!1,success:function(t){t.success&&($file.closest("li").before('<li><div class="item"><img src="'+t.url+'" alt="" data-filename="'+t.name+'"><del></del></div></li>'),$file.val(""),$(".file li .item").length>=5&&$file.closest("li").hide())}})})},submitComment:function(){var e=t,a=$("#app"),i=e.config.api,s={serveStar:+$("#serveStar").data("star"),deliverySpeedStar:+$("#deliverySpeedStar").data("star")};if(0==s.serveStar)return alert("服务态度评价不能为空");if(0==s.deliverySpeedStar)return alert("配送速度评价不能为空");var n=[];a.find(".js-item").each(function(t,e){var a=$(this),i=[],s=a.data();return s.star=+a.find(".star").data("star"),s.content=a.find(".js-review-ctn").val(),""===s.content?(alert("商品评价内容为空"),!1):s.content.length>140?(alert("字数超出最大限制"),!1):(a.find(".file li .item").each(function(){i.push($(this).find("img").data("filename"))}),i.length&&(s.pics=i.toString()),void n.push(s))}),0!==n.length&&(s.jsonArrays=JSON.stringify(n),M.ajax({url:i.commentGoodsTemplate,data:{data:JSON.stringify(s)},success:function(t){a.html(t.template)}}))}};t.init()});
define(function(require,exports,module){M.ajax({url:"/test/request",data:{},success:function(s){console.log("res---->",JSON.stringify(s));var t='<script>function show(m){console.log(m)}</script><script>show("'+s.id+'");</script>';$("body").append(t)}}),$(".js-ali-oss").on("click",function(){M.ajax({url:"/test/ali-oss",data:{},success:function(s){var t=["<dt>Buckets List:("+s.buckets.length+")</dt>"],e=$.map(s.buckets,function(s){return"<dd>"+s.name+"</dd>"}).join("");$(".ali-oss .buckets").empty().append(t+e);var n=["<dt>File List:("+s.fileList.objects.length+")</dt>"];if(s.fileList.objects)var a=$.map(s.fileList.objects,function(s){return"<dd>"+s.name+"</dd>"}).join("");$(".ali-oss .files").empty().append(n+(a||""))}})}),$(".js-upload").on("change",function(s){for(var t=s.target.files,e=new FormData,n=0;n<t.length;n++){var a=t[n];if(!a)return;e.append("file",a)}M.ajax({type:"post",url:"/test/ossUpload",cache:!1,data:e,processData:!1,contentType:!1,success:function(s){console.log("res---->",JSON.stringify(s)),$(".ali-oss .images").empty().append('<img src="'+s.url+'"/>'),alert(s.msg)}})})});
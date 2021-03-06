/*
* 门店
* */
var HttpClient = require("../utils/http_client"),
    bigPipe = require("../utils/bigPipe"),
    bigPipeTask = require('../config/bigPipeTask'),
    API = require('../config/api');

var store = {
    // 门店列表
    index: function (req, res, next) {
        res.render('store/index', req.query);
    },
    //门店列表
    storeList: function (req, res, next) {
        var defaults = {
            count: 10,
            page: 1
        };
        var data = req.body.data && JSON.parse(req.body.data) || {}; // 请求参数值;
        //log.info(JSON.stringify(data));
        var params = $.extend({}, defaults, data);
        // 本地缓存的城市与当前定位的城市是否相同;
        var location = req.cookies && req.cookies['mmh_app_location'];
        if(location){
            location = JSON.parse(new Buffer(location, "base64").toString());
            if(location.nolocal){
                params.isLocal = 0; // 非当前定位地址;
            }else{
                params.isLocal = 1; // 当前定位地址;
            }
        }else{
            location = {};
        }
        log.info("mmh_location--------------->", JSON.stringify(location));

        // 校验门店类型参数;
        if(!(params.shopType && Number(params.shopType))){
            delete params.shopType;
        }
        //来源为ajax翻页请求
        if (data.ajax) {
            params = $.extend({}, params, data);
            HttpClient.request(arguments, {
                url: API.queryMemberShopIndex,
                data: params,
                success: function (data) {
                    data.rows = data.nearShopList;
                    res.render("lists/store", data, function (err, html) {
                        console.log(err);
                        res.json({template: html});
                    });
                }
            });
        }else if(params.shopType){
            // mothercare门店列表
            //log.info("shopType------>", data.shopType);
            HttpClient.request(arguments, {
                url: API.queryMemberShopIndex,
                data: params,
                success: function (data) {
                    res.render('store/components/mothercare', data, function (err, html) {
                        res.json({template: html});
                    });
                }
            });
        }else {
            // 门店列表;
            HttpClient.request(arguments, {
                url: API.queryMemberShopIndex,
                data: params,
                success: function (data) {
                    //log.info('store/components/home------------->', JSON.stringify(data));
                    res.render('store/components/home', data, function (err, html) {
                        log.info(err);
                        res.json({template: html});
                    });
                }
            });
        }

    },
    // 门店详情;
    storeDetail: function (req, res, next) {
        var data = req.body.data && JSON.parse(req.body.data) || {}; // 请求参数值;
        // 本地缓存的城市与当前定位的城市是否相同;
        var location = req.cookies && req.cookies['mmh_app_location'];
        if(location){
            location = JSON.parse(new Buffer(location, "base64").toString());
            if(location.nolocal){
                data.isLocal = 0; // 非当前定位地址;
            }else{
                data.isLocal = 1; // 当前定位地址;
            }
        }
        //console.info(data)
        if (data.ajax) {
            var params = $.extend({}, data);
            HttpClient.request(arguments, {
                url: API.shopGoodsList,
                data: params,
                success: function (data) {
                    //console.info(data)
                    res.render("lists/goods.pug", {rows: data.goodsList}, function (err, html) {
                        console.log(err);
                        res.json({template: html});
                    });
                }
            });
        }else{
            /*bigPipe方案加载第一页数据*/
            var task = $.extend(true, {}, bigPipeTask.storeDetail);
            //console.info(bigPipeTask.storeDetail)
            // 门店基本信息参数;
            task.module[0].data = {
                shopId: data.shopId,
                isLocal: data.isLocal
            };
            // 用户没有切换当前区域是，获取该区域商品信息;
            if(data.isLocal == 1){
                task.module.push({
                    selector: ".node-stores-detail-goods",
                    api: API.shopGoodsList,
                    pug: '/store/components/detailGoods.pug'
                });
                // 门店商品参数;
                task.module[1].data = {
                    nextPageStart: 0,
                    showTab: 1,
                    tabId: -1,
                    shopId: data.shopId,
                    pageSize: 10
                };
            }
            new bigPipe(task, arguments, {
                succeed: function () {
                    var me = this;
                    res.render('store/components/detail', {}, function (err, html) {
                        var template = html + me.scripts.join('');
                        res.json({template: template});
                    });
                }
            });
        }
    },
    // 我的服务店
    myServerStore: function (req, res, next) {
        var defaults = {
            count: 50,
            page: 1
        };
        var data = req.body.data && JSON.parse(req.body.data) || {}; // 请求参数值;
        var params = $.extend({}, defaults, data);
        HttpClient.request(arguments, {
            url: API.queryMemberServerShop,
            data: params,
            success: function (data) {
                $.extend(data, {type: 1});
                res.render("store/components/list", data, function (err, html) {
                    //err && alert()
                    res.json({template: html});
                });
            }
        });
    },
    // 删除我的服务店;
    delServiceShop: function (req, res, next) {
        var data = req.body.data && JSON.parse(req.body.data) || {}; // 请求参数值;
        HttpClient.request(arguments, {
            url: API.deletememberServiceShop,
            data: data,
            success: function (data) {
                res.json(data);
            }
        });
    },
    // 我的关注店
    myShowStore: function (req, res, next) {
        var defaults = {
            count: 100,
            page: 1
        };
        var data = req.body.data && JSON.parse(req.body.data) || {}; // 请求参数值;
        var params = $.extend({}, defaults, data);
        HttpClient.request(arguments, {
            url: API.getMemberShopList,
            data: params,
            success: function (data) {
                $.extend(data, {type: 1});
                res.render("store/components/list", data, function (err, html) {
                    res.json({template: html});
                });
            }
        });
    },
    // 门店评价
    storeAssess: function (req, res, next) {
        var defaults = {
            count: 10,
            page: 1
        };
        var params = req.body.data && JSON.parse(req.body.data) || {}; // 请求参数值;
        params = $.extend({}, defaults, req.params, params);
        HttpClient.request(arguments, {
            url: API.getShopEvaluationInfo,
            data: params,
            success: function (data) {
                if(params.ajax){
                    res.render("lists/store_assess_list", {rows: data.evaluationDetail}, function (err, html) {
                        console.log(err);
                        res.json({template: html});
                    });
                }else{
                    res.render('store/assess', data);
                }
            }
        });
    },
    // 我的收货地址;
    myAddress: function (req, res, next) {
        var params = req.body.data && JSON.parse(req.body.data) || {}; // 请求参数值;
        HttpClient.request(arguments, {
            url: API.getDeliveryAddr,
            data: params,
            success: function (data) {
                res.render("lists/address", data, function (err, html) {
                    res.json({template: html});
                });
            }
        });
    },
    // 收藏门店
    addCollect: function (req, res, next) {
        var params = req.body.data && JSON.parse(req.body.data) || {}; // 请求参数值;.
        //console.log(params);
        HttpClient.request(arguments, {
            url: API.addMemberCollect,
            data: params,
            success: function (data) {
                res.json(data);
            }
        });
    },
    // 取消收藏门店
    delCollect: function (req, res, next) {
        var params = req.body.data && JSON.parse(req.body.data) || {}; // 请求参数值;.
        //console.log(params);
        HttpClient.request(arguments, {
            url: API.deleteMemberCollect,
            data: params,
            success: function (data) {
                res.json(data);
            }
        });
    }

};

module.exports = store;
/*
 * 商品详情
 * by xqs
 * */
define(function (require, exports, module) {
    var page = {
        config: {
            params: M.url.params,
            hashParams: function () {
                return M.url.getParams(location.hash.match(/(\w+=)([^\&]*)/gi).join('&'));  //json params
            },
            // ajax向node请求的url;
            api: {
                "extra": "/api/goods_detail_extra"
            }
        },
        init: function (params) {
            var c = page.config;
            M.ajax({
                location: true,  //获取地理位置作为参数
                showLoading: false,
                url: c.api.extra,
                data: params ? {data: JSON.stringify(params)} : {},
                success: function (res) {
                    //console.log('success--->', res);
                    var template = res.template;
                    $('.spa').append(template);
                }
            });


            //加载swipe
            require.async('swipe', function () {
                M.swipe.init(); //初始化Swipe
            });

            M.lazyLoad.init();

            $(function () {
                page.bindEvents();
            });
        },
        bindEvents: function () {
            var c = page.config, hashParams = c.hashParams();
            var $app = $('#app');

            /*质检报告，数据缓存到本地*/
            var templateId = hashParams.templateId,
                qualityPic = JSON.parse(localStorage.getItem(CONST.local_qualityPic)) || {};
            qualityPic[templateId] = $('.quality').data('pic');
            localStorage.setItem(CONST.local_qualityPic, JSON.stringify(qualityPic));

            //固定tab，此处有待优化
            var $tab = $('.u-tab'), $items = $('#swipe-detail .ui-swipe-item'), offsetTop = $tab[0].offsetTop;
            $app.on('touchmove scroll', '.m-goods-detail', function () {
                var $this = $(this), flexH = $this.height() - $tab.height();
                $items.height(flexH);
                if (!$tab.hasClass('top')) offsetTop = $tab[0].offsetTop;
                if ($this.scrollTop() >= offsetTop) {
                    $tab.addClass('top');
                } else {
                    $tab.removeClass('top');
                }
            });

            //点击好妈妈说
            $app.on('click', '.guide .ellipsis', function () {
                $(this).toggleClass('collapse');
            });

            //点击优惠券或促销列表
            $app.on('click', '.js-nav-list', function () {
                $(this).siblings('.u-fixed').addClass('show');
            });

            //点击领券优惠券
            $app.on('click', '.js-voucher', function () {
                var $this = $(this), id = $this.closest('li').data('id');
                M.ajax({
                    url: '/api/obtainCoupons',
                    data: {tid: id},
                    success: function (res) {
                        if (res.success_code == 200) {
                            $this.addClass('ban').text('已领取');
                            M.tips('领取成功');
                        } else {
                            return M.tips(res.msg);
                        }
                    }
                });
            });

            //点击门店地址
            $app.on('click', '.js-address', function () {
                $('.m-select-address').addClass('show');
            });

            $app.on('click', '.m-select-address .list li', function () {
                var $this = $(this), info = $this.data('json');
                localStorage.setItem(CONST.local_detail_location, JSON.stringify(info));
                location.reload();
            });

            $app.on('click', '.m-select-address .gps', function () {
                localStorage.removeItem(CONST.local_detail_location);
                location.reload();
            });


            //点击遮罩或关闭按钮
            $app.on('click', '.mask, .js-close', function () {
                $(this).closest('.u-fixed').removeClass('show');
            });

            //加入购物车、立即购买
            $app.on('click', '.js-addToCart, .js-buy', function () {
                var action = $(this).is('.js-buy') ? 'buy' : 'addToCart';
                $('.js-sku-confirm').data('action', action);

                $('.u-sku').addClass('show');
                require.async('app/sku', function (sku) {
                    sku.init($('.sku'));
                    $('.u-quantity .number').spinner();  //改变数量控制
                });
            });

            //选完sku，点击确定
            $app.on('click', '.js-sku-confirm', function () {
                var action = $(this).data('action');
                switch (action) {
                    case 'buy':
                        page.buyNow();
                        break;
                    case 'addToCart':
                        page.addToCart();
                        break;
                }
            });


        },
        //添加商品到购物车
        addToCart: function () {
            //获取当前选中的sku信息
            require.async('app/sku', function (sku) {
                var skuInfo = sku.selected();

                if (!skuInfo.itemId) {
                    return M.tips('请选择SKU');
                }

                var c = page.config, urlParams = c.params;
                var local_cartId = localStorage.getItem(CONST.local_cartId);   //本地购物车ID
                var local_location = localStorage.getItem(CONST.local_location); //本地存储的位置信息
                var params = {
                    areaId: local_location.areaId,
                    cartId: local_cartId,
                    jsonTerm: JSON.stringify([{
                        "isBindShop": false,
                        "itemId": skuInfo.itemId,
                        "shopId": urlParams.shopId,
                        "templateId": urlParams.templateId,
                        "companyId": urlParams.companyId,
                        "count": +$('.u-sku .u-quantity .number').text()
                    }]),
                    pmtType: 0
                };
                M.ajax({
                    url: '/api/addToCart',
                    data: {data: JSON.stringify(params)},
                    success: function (res) {
                        if (res.success_code == 200) {
                            localStorage.setItem(CONST.local_cartId, res.cartId);  //更新本地购物车ID
                            M.tips('商品已成功添加到购物车');
                            $('.u-sku .js-close').trigger('click');
                        } else {
                            return M.tips(res.msg);
                        }
                    }
                });
            });
        },
        //立即购买
        buyNow: function () {
            //获取当前选中的sku信息
            require.async('app/sku', function (sku) {
                var skuInfo = sku.selected();

                if (!skuInfo.itemId) {
                    return M.tips('请选择SKU');
                }

                var c = page.config, urlParams = c.params;

                var params = {
                    inlet: 2,  //1 购物车  2 商品详情 4 麻豆尊享
                    jsonTerm: JSON.stringify({
                        "itemId": skuInfo.itemId,
                        "templateId": urlParams.templateId,
                        "count": +$('.u-sku .u-quantity .number').text(),
                        "shopId": urlParams.shopId,
                        "companyId": urlParams.companyId,
                        "isBindShop": 0
                    })
                };
                location.href = '/cart#/settlement/' + $.param(params);

            });
        }
    };

    module.exports = page;
});
!function (e, t)
{
    var n = t.jshop.module.Lottery = {};
    e.extend(n, 
    {
        base : function (t)
        {
            function n()
            {
                s.serieId && (i(), a())
            }
            function i()
            {
                var t = INTERFACE.lottery.getWinnerList + "?";
                e.ajax(
                {
                    url : t, type : "GET", cache :!1, data : {
                        lotteryCode : s.serieId, count : 30
                    },
                    dataType : "jsonp",
                    success : function (e)
                    {
                        "0000" == e.responseCode ? (d = e.data, o()) : alert(e.responseMessage);
                    }
                })
            }
            function a()
            {
                if (navigator && navigator.userAgent.indexOf("iPad") > -1)
                {
                    var t = INTERFACE.lottery.getLotteryInfo;
                    e.ajax(
                    {
                        url : t, data : {
                            lotteryCode : s.serieId
                        },
                        dataType : "jsonp",
                        success : function (e)
                        {
                            "0000" == e.responseCode && (r.find(".lucky-panel").prepend('<img style="height:100%;width:100%;"src="' + e.data.promptImg + '" />'), 
                            r.find("embed").hide())
                        }
                    })
                }
            }
            function o()
            {
                d && (d.each(function (e, t)
                {
                    if (0 == e) {
                        r.find(".name").html(t.userPin), r.find(".time").html(t.prizeName);
                    }
                    else
                    {
                        var n = r.find("li:first").clone(!0);
                        n.find(".name").html(t.userPin), n.find(".time").html(t.prizeName), r.find("ul").append(n)
                    }
                }), r.find(".scroll-con").cntScroll())
            }
            var r = e(this), s = e.extend({
                serieId : "", nameRecord : ".name", timeRecord : ".time"
            },
            t || {}), d = null;
            n()
        },
        bindLottery : function (t)
        {
            function n(e, t)
            {
                e || t && t({
                    result :!1, msg : "缺少必要参数"
                });
                var n = INTERFACE.lottery.lottery_start;
                jQuery.ajax(
                {
                    url : n, type : "post", dataType : "jsonp", data : {
                        lotteryCode : e
                    },
                    success : function (e)
                    {
                        "0000" === e.responseCode ? (e.data.result = !0, t && t(e.data)) : t && t({
                            result :!1, msg : a[e.responseCode], code : e.responseCode
                        })
                    }
                })
            }
            var i = e(this), a = 
            {
                "0000" : "请求成功", "0001" : "用户未验证", "0002" : "签名验证失败", "0003" : "活动ID验证失败", "0004" : "非法参数", 
                "0005" : "活动已停用", "0006" : "活动已结束", "0007" : "活动未开始", "0008" : "活动已删除", "0009" : "活动未启用", 
                "0010" : "活动不支持京豆兑换抽奖次数", "0011" : "京豆兑换抽奖次数已达最高限制次数", "0012" : "可以使用京豆抽奖", "0013" : "京豆数量不足", 
                "0014" : "未开启支付密码", "0015" : "抽奖频率过快", "0016" : "抽奖前需先启用邮箱验证", "0017" : "抽奖前需先启用手机验证", 
                1000 : "系统错误", 2001 : "营销通用令牌绑定失败", 2002 : "活动不支持根据营销通用令牌兑换抽奖次数"
            },
            o = i.find(".J_TipForLost"), r = i.find(".J_TipForGet"), s = i.find(".J_TipForNoTimes"), d = i.find(".J_StartDraw").attr("data-code"), 
            l = INTERFACE.lottery.getWinnerList;
            jQuery.ajax(
            {
                url : l, type : "post", dataType : "jsonp", data : {
                    lotteryCode : d, count : 10
                },
                success : function (e)
                {
                    if ("0000" !== e.responseCode) {
                        throw a[e.responseCode];
                    }
                    var t = "";
                    jQuery.each(e.data, function (e, n)
                    {
                        t += '<li class="ui-marquee-item">' + n.userPin + "  " + n.prizeName + "</li>"
                    }), i.find(".ui-marquee-main").html(t);
                    var n = new SeamlessScroll(
                    {
                        box : i.find(".marquee"), el : ".ui-marquee-main", itemClass : ".ui-marquee-item", 
                        interval : 80, step : 2
                    });
                    n.init()
                }
            }), i.find(".J_StartDraw").click(function (t)
            {
                t.preventDefault(), thick_login(function ()
                {
                    var a = e(t.currentTarget), s = encodeURIComponent(a.attr("data-code"));
                    i.find("a.draw-btn").hasClass("slot-sign") || jQuery.ajax(
                    {
                        url : INTERFACE.lottery.lottery_chance, type : "get", dataType : "jsonp", data : {
                            lotteryCode : s
                        },
                        success : function (e)
                        {
                            return e.data && "0000" === e.responseCode ? "0000" === e.responseCode && e.data.chances <= 0 ? (o.find("p").html(e.data.promptMsg), 
                            o.show(), i.find("a.draw-btn").removeClass("slot-sign"), void i.find(".handle").removeClass("handled")) : void n(s, 
                            function (e)
                            {
                                var t = e.result && e.winner, n = [], a = "123", s = 2;
                                i.find("a.draw-btn").addClass("slot-sign"), i.find(".handle").addClass("handled"), 
                                t ? (s =+ a.split("")[Math.floor(3 * Math.random())], n = [s, s, s]) : (n[0] =+ a.split("")[Math.floor(3 * Math.random())], 
                                a = a.replace(n[0] + "", ""), n[1] =+ a.split("")[Math.floor(2 * Math.random())], 
                                n[2] =+ a.split("")[Math.floor(2 * Math.random())]);
                                var d = new Slot;
                                d.el = i.find(".solt-item-0"), d.options.duration = 230, d.options.step = 2, 
                                d.options.result = n[0], d.init();
                                var l = new Slot;
                                l.el = i.find(".solt-item-1"), l.options.duration = 250, l.options.step = 2, 
                                l.options.result = n[1], l.init();
                                var c = new Slot;
                                c.el = i.find(".solt-item-2"), c.options.duration = 300, c.options.step = 2, 
                                c.options.result = n[2], c.options.complete = function ()
                                {
                                    t ? r.show() : (o.find("p").html(e.promptMsg), o.show()), i.find("a.draw-btn").removeClass("slot-sign"), 
                                    i.find(".handle").removeClass("handled")
                                },
                                c.init()
                            }) : (o.find("p").html(e.data ? e.data.promptMsg : ""), o.show(), i.find("a.draw-btn").removeClass("slot-sign"), 
                            void i.find(".handle").removeClass("handled"))
                        }
                    })
                })
            }), r.click(function ()
            {
                e(this).hide()
            }), o.click(function ()
            {
                e(this).hide()
            }), s.click(function ()
            {
                e(this).hide()
            }), i.find("a.draw-btn").mousedown(function ()
            {
                i.find("a.draw-btn").hasClass("slot-sign") || (e(this).addClass("drawed-btn"), i.find(".handle").addClass("handled"))
            }), i.find("a.draw-btn").mouseup(function ()
            {
                e(this).removeClass("drawed-btn")
            })
        }
    }), e.extend(t.jshop.module.Lottery, 
    {
        defineRoulette : function (t, n)
        {
            function i(e)
            {
                if (e && e.length > 0)
                {
                    for (var n = "", i = 0; i < e.length; i++)
                    {
                        n += '<div class="winner-item' + (0 === i ? " no-border" : "") + '"><span class="w-name">' + e[i].userPin + '</span><span class="w-prize">' + e[i].prizeName + "</span></div>";
                    }
                    var o = t.find(".j-list-wrap");
                    o.parent().removeClass("hidden"), o.html(n).fadeIn(400, function ()
                    {
                        a()
                    })
                }
                else {
                    t.find(".j-no-winner").removeClass("hidden");
                }
            }
            function a()
            {
                function e()
                {
                    n.animate({
                        top :- o
                    },
                    {
                        duration : 100 * (0 === l ? r : d), easing : "linear",
                        complete : function ()
                        {
                            n.css("top", a), e()
                        }
                    }), l++
                }
                var n = t.find(f.listWrapSelector), i = n.parent(), a = i.height(), o = n.height(), r = o / 2, 
                s = o < a ? a : o, d = s / 2, l = 0;
                i.hover(function ()
                {
                    n.stop(!0)
                },
                function ()
                {
                    l = 0, r = (1 + parseFloat(n.css("top")) / s) * d, e();
                }), e()
            }
            function o()
            {
                if (l = t.find(".pan-list li"), c = t.find(".j-pan-chrome li"), t.find(h ? f.runChromeSelector : f.runIeSelector).bind("click", 
                function ()
                {
                    if (j)
                    {
                        if (y) {
                            return;
                        }
                        y = !0, w.drawing(function (t)
                        {
                            var t = t.data;
                            if (t.pass && t.winner === !0)
                            {
                                10 === t.prizeType && w.getUserAddress(function (e)
                                {
                                    var t = e.provinceId + "-" + e.cityId + "-" + e.countyId + "-" + e.townId;
                                    seajs.use(["jdf/1.0.0/ui/switchable/1.0.0/switchable", "jdf/1.0.0/ui/area/1.0.0/area"], 
                                    function ()
                                    {
                                        C.jDiaInput.find("#userArea").area(
                                        {
                                            scopeLevel : 3, initArea : t, className : 
                                            {
                                                text : "ui-area-text-wrap", text_text : "ui-area-text", 
                                                content : "ui-area-content-wrap", content_tab : "ui-area-tab", 
                                                content_content : "ui-area-content", close : "ui-area-close"
                                            }
                                        })
                                    }), C.jDiaInput.find("#prize-user-name").val(e.name), C.jDiaInput.find("#prize-user-phone").val(e.mobile || e.phone), 
                                    C.jDiaInput.find("#prize-user-address").val(e.addressDetail)
                                }), u = t.prizeId;
                                var n = e(".j-prizeId-" + u).index();
                                n = h ? n : n / 3, r(~~n, "hit", t.promptMsg, t.prizeType)
                            }
                            else
                            {
                                t.pass && t.winner === !1 ? r(g - 1, "miss", t.promptMsg) : (C.show("nochance", //抽奖次数-1
                                t.promptMsg), y = !1);
                            }
                        })
                    }
                    else
                    {
                        thick_login(function () 
                        {
                            w.getLeftCount(function (e) 
                            {
                                e.data && void 0 !== e.data.chances && w.initPageList(t.find(".j-page-list"), //剩余次数
                                e.data.chances) 
                            }), j = !0 
                        });
                    }
                }), h && !v)
                {
                    var n = 20, i = 800, a = Math.PI / 2 / i, o = 0, s = 0, d = w.css3Prefix.TRANSFORM, 
                    p = t.find(".j-bg-widget");
                    t.bind("mouseenter", function (e)
                    {
                        o = e.clientX, s = e.clientY;
                    }).bind("mousemove", function (e)
                    {
                        var t = e.clientX, r = e.clientY, l = t - o, c = r - s;
                        Math.abs(l) > i && (l = l > 0 ? i :- i), Math.abs(c) > i && (c = c > 0 ? i :- i);
                        var f = n * Math.sin(l * a), u = n * Math.sin(c * a);
                        p.css(d, "translate3d(" + f.toFixed(2) + "px," + u.toFixed(2) + "px,0)")
                    }).bind("mouseout", function (t)
                    {
                        e(t.relatedTarget).closest(".j-module").length || (p.addClass("animation"), p.css(d, 
                        "translate3d(0,0,0)"), setTimeout(function ()
                        {
                            p.removeClass("animation")
                        }, 500), o = 0, s = 0);
                    })
                }
            }
            function r(e, n, i, a)
            {
                var o = w.css3Prefix.TRANSFORM, r = t.find(h ? f.runChromeSelector : f.runIeSelector), 
                s = t.find(h ? f.arrowChromeSelector : f.arrowIeSelector), d = 360 / g, p = h ? parseFloat(s.attr("deg") || 0) : parseFloat(rouletteArrow.style.rotation), 
                u = p % 360, m = p - (d * e + u) - 5400;
                if (r.addClass("going"), h)
                {
                    if (h)
                    {
                        t.find(".j-pan-light").removeClass("animation");
                        var s = t.find(h ? f.arrowChromeSelector : f.arrowIeSelector), j = (24 + Math.floor(~~s.attr("deg") % 360 / 15)) % 24;
                        l.eq(j).addClass("light")
                    }
                    jQuery.browser.msie && 9 === parseFloat(jQuery.browser.version) ? v = !0 : (s.attr("deg", 
                    m).css(o, "rotate(" + m + "deg)"), setTimeout(function ()
                    {
                        y = !1, C.show(n, i, 10 === a), r.removeClass("going")
                    }, 8e3)), s.attr("deg", m), t.find(".j-animate-assist").animate({
                        textIndent : m
                    },

                    {
                        duration : 8e3, easing : "easeInOutQuad",
                        complete : function ()
                        {
                            y = !1, C.show(n, i, 10 === a), r.removeClass("going"), t.find(".j-pan-light").addClass("animation")
                        },
                        step : function (e)
                        {
                            v && s.css(o, "rotate(" + e + "deg)");
                            var t = Math.abs(Math.floor(e % 360 / (360 / g))), n = 24 + Math.floor(e % 360 / 15);
                            t %= g, n %= 24, c.eq(t).addClass("current").siblings().removeClass("current"), 
                            l.eq(n).addClass("light").siblings().removeClass("light")
                        }
                    })
                }
                else
                {
                    s.animate({
                        rotation : m 
                    },

                    {
                        duration : 8e3, easing : "swing",
                        complete : function () 
                        {
                            y = !1, C.show(n, i, 10 === a), r.removeClass("going") 
                        },
                        step : function () 
                        {
                            var e =- parseFloat(s[0].style.rotation), n = (e % 360 + 180  / g) % 360, 
                            i = ~~(n  / d), a = t.find("#rouletteShape" + i)[0], o = 0 === i ? g - 1 : i - 1, 
                            r = t.find("#rouletteShape" + o)[0];
                            a.fillcolor = "#fff", a.stroked = "true", r.fillcolor = r.getAttribute("data-bg"), 
                            r.stroked = "false";
                        }
                    });
                }
            }
            function s()
            {
                function e(e, n)
                {
                    var i = "<v:group>", a = "", o = "</v:group>", r = '<v:image id="rouletteArrow" class="rvml arrow-ie" src="http://img10.360buyimg.com/cms/jfs/t2467/54/1190320861/2060/7f0b49cf/564ac3faN6cf8eddc.png" style="rotation: 0;" ></v:image>', 
                    s = 65536, d = 360 / e, l = ~~(d * s), c = "";
                    c = e < 7 ? " img4" : " img7";
                    for (var p = 0; p < e; p++)
                    {
                        var u = ~~(p * l + (90 - 360 / e / 2) * s);
                        a += '<v:shape id="rouletteShape' + p + '" class="rvml" style="width: 846px; height: 846px; position: absolute; left: 0px; top: 0px;" data-bg="' + w.getItemBgColor(e, 
                        p) + '" fillcolor = "' + w.getItemBgColor(e, p) + '" strokeWeight="2pt" strokecolor="#f3e5e5" stroked="false" path = "m200,200 ae200,200,200,200,' + u + "," + l + ' xe" ></v:shape>';
                        var h = 2 * Math.PI / 360 * (p * d), m = w.getTextPosition(e, p, h);
                        h =- h;
                        var g = f.textWidth, v = f.textHeight, j =- g / 2 * Math.cos(h) + v / 2 * Math.sin(h) + g / 2, 
                        y =- g / 2 * Math.sin(h) - v / 2 * Math.cos(h) + v / 2;
                        a += '<div class="prize-name j-prizeId-' + (n[p] ? n[p].prizeId : "no") + '" style="filter:progid:DXImageTransform.Microsoft.Matrix(dx=' + j + ",dy=" + y + ",M11=" + Math.cos(h) + ",M12=" +- Math.sin(h) + ",M21=" + Math.sin(h) + ",M22=" + Math.cos(h) + ");left:" + m.left + "px; top:" + m.top + 'px;">' + (n[p] ? n[p].prizeName : f.missTest) + "</div>";
                        var C = n[p] ? '<img src="' + n[p].prizeImg.replace(/https?:/, "") + '"/>' : "";
                        a += '<div class="prize-pic' + c + '" style="filter:progid:DXImageTransform.Microsoft.Matrix(dx=' + j + ",dy=" + y + ",M11=" + Math.cos(h) + ",M12=" +- Math.sin(h) + ",M21=" + Math.sin(h) + ",M22=" + Math.cos(h) + ");left:" + m.left + "px; top:" + m.top + 'px;">' + C + "</div>"
                    }
                    t.find(f.panIeSelector).append(i + a + o + r);
                    var x = t.find("#rouletteShape0")[0];
                    x.fillcolor = "#fff", x.stroked = "true"
                }
                !!function ()
                {
                    w.getLotteryInfo(function (t)
                    {
                        var n = t.data.lotteryPrize;
                        if (n && n.length) {
                            var i = n.length;
                            g = i + 1, e(g, n), o(g);
                        }
                    },
                    function ()
                    {
                        console && console.log && console.log("获取抽奖信息失败")
                    })
                }
                ()
            }
            function d()
            {
                function e(e, n)
                {
                    for (var i = "", a = 360 / e, o = 90 - a, r = w.css3Prefix.CSS_TRANSFORM, s = e < 3, 
                    d = 0;
                    d < e;
                    d++)
                    {
                        var l = n[d] ? '<img src="' + n[d].prizeImg.replace(/https?:/, "") + '"/>' : "", 
                        c = n[d] ? n[d].prizeName : f.missTest, p = 90 - 360 / e / 2, u =- d * a + p, 
                        h = s ? "" : r + ": rotate(" + u + "deg) skew(" + o + "deg);", m = s ? "" : r + ": skew(" +- o + "deg) rotate(" +- p + "deg);";
                        i += '<li class="j-prizeId-' + (n[d] ? n[d].prizeId : "no") + '" style="' + h + '" title="' + c + '"><div style="' + m + '"><span>' + c + "</span>" + l + "</div></li>"
                    }
                    var g = "item-wrap" + e;
                    s && (g = "r-double"), e % 2 !== 0 && (g += " bg3"), t.find(f.panChromeSelector).addClass(g).append(i)
                }
                !!function ()
                {
                    w.getLotteryInfo(function (t)
                    {
                        var n = t.data.lotteryPrize;
                        if (n && n.length) {
                            var i = n.length;
                            g = i + 1, e(g, n), o(g);
                        }
                    },
                    function ()
                    {
                        console && console.log && console.log("获取抽奖信息失败")
                    })
                }
                ()
            }
            var l, c, f = e.extend(
            {
                panIeSelector : ".j-pan-ie", runIeSelector : ".j-run", arrowIeSelector : "#rouletteArrow", 
                panChromeSelector : ".j-pan-chrome", runChromeSelector : ".j-chrome-run", arrowChromeSelector : ".j-arrow", 
                listWrapSelector : ".j-list-wrap", bgColors : ["#fff1de", "#fff5f5", "#fcfeee"], dialogTip : {
                    miss : "没中奖", fail : "操作失败", nochance : "没抽奖次数了", hit : "中奖啦"
                },
                missTest : "没中奖", diameter : 339, textWidth : 110, textHeight : 110, picWidth : 80, picHeight : 80
            }, n), p = f.lotterycode, u =- 1, h = !0, m = null, g = 1, v = !1, j = !1, y = !1, C = function ()
            {
                var n = t.find(".j-roulette-dialog"), i = t.find(".j-roulette-input-dialog"), a = n[0], 
                o = i[0];
                return document.getElementsByTagName("body")[0].appendChild(a), document.getElementsByTagName("body")[0].appendChild(o), 
                n = e(a), i = e(o), n.find(".j-r-icon-closed,.j-r-btn-closed").bind("click", function ()
                {
                    C.hide()
                }), i.find(".j-r-icon-closed,.j-r-btn-closed").bind("click", function ()
                {
                    C.hide()
                }), 
                {
                    jDiaInput : i,
                    show : function (t, a, o)
                    {
                        var r = e(window).scrollTop() + e(window).height() / 2, s = a.split("#@@#");
                        if (m || (m = e('<div class="ie67mask" style="display: none; z-index: 100; position: absolute; left: 0; top: 0; width: 100%; height: ' + e(document).height() + 'px; background-color: #000; opacity: .6; filter: alpha(opacity=60);"></div>'), 
                        e("body").append(m)), m.show(), "hit" === t) if (o) i.find(".j-prize-name").text(s[1] || "");
                        else
                        {
                            n.find(".j-r-btn-closed").hide();
                            var d = s[0], l = s[1] || "", c = s[2] || "";
                            n.find(".j-prize-tip").text(d), n.find(".j-prize-name").text(l), n.find(".j-dialog-remarks").text(c), 
                            n.find(".j-dialog-content").removeClass("other").addClass("hit")
                        }
                        else
                        {
                            n.find(".j-r-btn-closed").show(), n.find(".j-dialog-text").text(s[0]), n.find(".j-dialog-content").removeClass("hit").addClass("other");
                        }
                        o ? i.css({
                            top : r
                        }).show().find("input").eq(0).focus() : (n.find(".j-head-text").text(f.dialogTip[t]), 
                        n.css({
                            top : r
                        }).show())
                    },
                    hide : function ()
                    {
                        var t = i.is(":hidden") ? n : i;
                        if (t.hasClass("j-roulette-input-dialog"))
                        {
                            for (var a = t.find(".j-require").removeClass("error"), o = !0, r = 0; r < a.length; r++)
                            {
                                var s = e(a[r]).find("input,textarea"), d = s.parent(), l = d.find(".error-tip");
                                "" === jQuery.trim(s.val()) && (l.text(l.attr("title")), d.addClass("error"), 
                                o = !1)
                            }
                            if (o === !1) {
                                return;
                            }
                            var c = t.find("#prize-user-phone");
                            if (!/^1\d{10}$|^0\d{2}-\d{8}$|^0\d{3}-\d{7}$/.test(c.val())) return void c.focus().parent().addClass("error").find(".error-tip").text("联系方式格式输入不正确");
                            w.submitUserInfo()
                        }
                        else {
                            t.hide(), m.hide();
                        }
                    }
                }
            }(),
            w = 
            {
                css3Prefix : function ()
                {
                    for (var e = document.createElement("div"), t = ["", "webkit", "moz", "ms"], n = {
                        TRANSFORM : "", TRANSITION : ""
                    },
                    i = 0;
                    i < t.length;
                    i++) {
                        var a = t[i] ? t[i] + "Transform" : "transform";
                        if (a in e.style) {
                            n.TRANSFORM = a;
                            break
                        }
                    }
                    return n.CSS_TRANSFORM = n.TRANSFORM.replace(/webkitT/, "-webkit-t").replace(/mozT/, 
                    "-moz-t").replace(/msT/, "-ms-t"), n
                }(),
                initPageList : function (e, t)
                {
                    for (var n = "", i = t; i >= 0; i--) {
                        n += "<div>" + i + "</div>";
                    }
                    e.html(n).removeClass("hidden")
                },
                jumpPage : function (e)
                {
                    var n = t.find(".j-page-list"), i = n.find("div").length - 1, a = n.parent().height(), 
                    o = a * (i - e);
                    h && !v ? n.css(w.css3Prefix.TRANSFORM, "translateY(" +- o + "px)") : n.css("top", 
                     - o + "px")
                },
                getTextPosition : function (e, t, n)
                {
                    var i = f.diameter / 2, a = f.textWidth / 2, o = f.textHeight / 2, r = i - a, s = i - r * Math.sin(n) - a, 
                    d = i - r * Math.cos(n) - o;
                    return {
                        left : s, top : d
                    }
                },
                getItemBgColor : function (e, t)
                {
                    var n = f.bgColors;
                    return e % 3 === 0 ? n[t % 3] : e % 2 === 0 ? n[t % 2] : t < 3 ? n[t % 3] : n[(t - 3) % 2];
                },
                getUserAddress : function (e)
                {
                    jQuery.ajax(
                    {
                        url : INTERFACE.actJshop.getUserAddress, data : {
                            originId : 1, type : 1
                        },
                        dataType : "jsonp",
                        success : function (t)
                        {
                            t.name && "function" == typeof e && e(t)
                        }
                    })
                },
                submitUserInfo : function ()
                {
                    var e = C.jDiaInput.find("#prize-user-name").val(), t = C.jDiaInput.find("#prize-user-phone").val(), 
                    n = C.jDiaInput.find(".j-ui-area-text").text() + C.jDiaInput.find("#prize-user-address").val(), 
                    i = C.jDiaInput.find("#prize-user-mark").val();
                    jQuery.ajax(
                    {
                        url : INTERFACE.lottery.lottery_address, dataType : "jsonp", type : "post", data : {
                            lotteryCode : p, address : n, mobile : t, name : e, openAnswer : i, prizeId : u
                        },
                        success : function (e)
                        {
                            if (e && "0000" === e.responseCode)
                            {
                                var t = C.jDiaInput;
                                t.find(".j-form-wrap").addClass("hidden").siblings().removeClass("hidden");
                                var n = 3, i = t.find(".j-close-time"), a = setInterval(function ()
                                {
                                    0 === n && (clearInterval(a), t.hide(), t.find(".j-submited-tip").addClass("hidden").siblings().removeClass("hidden"), 
                                    m.hide()), i.text(--n)
                                }, 1e3);
                                i.text(3)
                            }
                            else {
                                alert("提交中奖信息失败:", e);
                            }
                        },
                        error : function (e)
                        {
                            alert("您当前网络不稳定，请稍后再尝试提交中奖信息")
                        }
                    })
                },
                getLotteryInfo : function (t, n)
                {
                    e.ajax(
                    {
                        url : INTERFACE.lottery.getLotteryInfo, data : {
                            lotteryCode : p
                        },
                        dataType : "jsonp",
                        success : function (e)
                        {
                            e && "0000" === e.responseCode ? "function" == typeof t && t(e) : "function" == typeof n && n(e)
                        },
                        error : function (e)
                        {
                            "function" == typeof n && n(e)
                        }
                    })
                },
                getLeftCount : function (e, t)
                {
                    jQuery.ajax(
                    {
                        url : INTERFACE.lottery.lottery_chance, data : {
                            lotteryCode : p
                        },
                        dataType : "jsonp",
                        success : function (t)
                        {
                            "function" == typeof e && e(t)
                        },
                        error : function (e)
                        {
                            "function" == typeof t && t(e)
                        }
                    })
                },
                drawing : function (e, t)
                {
                    jQuery.ajax(
                    {
                        url : INTERFACE.lottery.lottery_start, data : {
                            lotteryCode : p
                        },
                        dataType : "jsonp",
                        success : function (t)
                        {
                            "0000" === t.responseCode ? (w.getLeftCount(function (e)
                            {
                                e.data && void 0 !== e.data.chances && w.jumpPage(e.data.chances)
                            }), "function" == typeof e && e(t)) : (y = !1, C.show("fail", t.data.promptMsg))
                        },
                        error : function (e)
                        {
                            "function" == typeof t && t(e) || C.show("fail", "很抱歉，发送抽奖请求遇到错误，请稍后再试")
                        }
                    })
                },
                getWinnerList : function (e, t)
                {
                    jQuery.ajax(
                    {
                        url : INTERFACE.lottery.getWinnerList, data : {
                            lotteryCode : p
                        },
                        dataType : "jsonp",
                        success : function (t)
                        {
                            "function" == typeof e && e(t)
                        },
                        error : function (e)
                        {
                            "function" == typeof t && t(e)
                        }
                    })
                }
            };
            !!function ()
            {
                t && 0 !== t.length && (jQuery.extend(jQuery.easing, 
                {
                    easeInOutQuad : function (e, t, n, i, a)
                    {
                        return (t /= a / 2) < 1 ? i / 2 * t * t + n :- i / 2 * (--t * (t - 2) - 1) + n;
                    }
                }), jQuery.browser.msie && parseFloat(jQuery.browser.version) < 9 ? (e("body").append('<?xml:namespace prefix = "v" ns = "urn:schemas-microsoft-com:vml" />'), 
                h = !1, e(".roulette-ie").removeClass("hidden"), s()) : (e(".roulette-chrome").removeClass("hidden"), 
                d()), seajs.use("//misc.360buyimg.com/jdf/1.0.0/unit/login/1.0.0/login.js", function (e)
                {
                    e.isLogin(function (e)
                    {
                        e && (j = e, w.getLeftCount(function (e)
                        {
                            e.data && void 0 !== e.data.chances && w.initPageList(t.find(".j-page-list"), 
                            e.data.chances)
                        }))
                    })
                }), w.getWinnerList(function (e)
                {
                    i(e.data)
                }))
            }
            ()
        },
        roulette : function (t)
        {
            new n.defineRoulette(e(this), t)
        }
    }), e.extend(t.jshop.module.Lottery, 
    {
        definePrizeClaw : function (t, n)
        {
            function i(e)
            {
                for (var n = '<li title="{prizeName}"><div class="p-pic"><img class="j-prize-img" prizeid="{prizeId}" src="{prizeImg}" alt=""/></div><div class="p-name">{prizeName}</div></li>', 
                i = "", a = 0;
                a < e.length;
                a++) i += n.replace("{prizeId}", e[a].prizeId).replace("{prizeImg}", e[a].prizeImg.replace(/https?:/, 
                "")).replace(/\{prizeName\}/g, e[a].prizeName);
                t.find(".j-prize-list").html(i)
            }
            function a(e)
            {
                var n = t.find(".j-list-wrap"), i = n.parent().parent(), a = i.closest(".j-lay-right");
                if (e && e.length > 0)
                {
                    for (var r = "", s = 0; s < e.length; s++)
                    {
                        r += '<li><span class="w-name">' + e[s].userPin + '</span><span class="w-prize">获得' + e[s].prizeName + "</span></li>";
                    }
                    i.removeClass("hidden"), n.html(r).fadeIn(400, function ()
                    {
                        o()
                    }), t.find(".winner-list").removeClass("hidden")
                }
                else {
                    t.find(".j-no-winner").removeClass("hidden");
                }
                t.find(".j-adjust-height").css("height", a.height() - (i.offset().top - a.offset().top))
            }
            function o()
            {
                function e()
                {
                    n.animate({
                        top :- o
                    },
                    {
                        duration : 100 * (0 === l ? r : d), easing : "linear",
                        complete : function ()
                        {
                            n.css("top", a), e()
                        }
                    }), l++
                }
                var n = t.find(m.listWrapSelector), i = n.parent(), a = i.height(), o = n.height(), r = o / 2, 
                s = o < a ? a : o, d = s / 2, l = 0;
                i.hover(function ()
                {
                    n.stop(!0)
                },
                function ()
                {
                    l = 0, r = (1 + parseFloat(n.css("top")) / s) * d, e();
                }), e()
            }
            function r()
            {
                x && !b && T.loginAndGo(function ()
                {
                    b = !0, T.drawing(function (e)
                    {
                        var e = e.data;
                        e.pass && e.winner === !0 ? (v = e.prizeId, 10 === e.prizeType ? (h("hit", !0, 
                        e.promptMsg), T.getUserAddress(function (e)
                        {
                            var n = e.provinceId + "-" + e.cityId + "-" + e.countyId + "-" + e.townId;
                            seajs.use(["jdf/1.0.0/ui/switchable/1.0.0/switchable", "jdf/1.0.0/ui/area/1.0.0/area"], 
                            function ()
                            {
                                t.find("#userArea").area(
                                {
                                    scopeLevel : 3, initArea : n, className : 
                                    {
                                        text : "ui-area-text-wrap", text_text : "ui-area-text", content : "ui-area-content-wrap", 
                                        content_tab : "ui-area-tab", content_content : "ui-area-content", 
                                        close : "ui-area-close"
                                    }
                                })
                            }), t.find("#prize-user-name").val(e.name), t.find("#prize-user-phone").val(e.mobile || e.phone), 
                            t.find("#prize-user-address").val(e.addressDetail)
                        })) : h("hit", !1, e.promptMsg)) : e.pass && e.winner === !1 ? h("miss", !1) : h("nochance", 
                        !1)
                    })
                })
            }
            function s()
            {
                var t = e(".j-paw"), n = (C - parseFloat(t.css("left"))) / C * w;
                t.addClass("right-moving").animate({
                    left : C + "px"
                },

                {
                    duration : n,
                    complete : function ()
                    {
                        d()
                    },
                    step : function (t)
                    {
                        t > 373 && e(this).hasClass("right-moving") && e(this).removeClass("right-moving")
                    }
                })
            }
            function d()
            {
                var t = e(".j-paw");
                t.addClass("left-moving").animate({
                    left : "0"
                },

                {
                    duration : w,
                    complete : function ()
                    {
                        s()
                    },
                    step : function (t)
                    {
                        t < 7 && e(this).hasClass("left-moving") && e(this).removeClass("left-moving")
                    }
                })
            }
            function l()
            {
                for (var e = '<polygon class="polygon" points="{path}" style="fill:url(#light-column); -webkit-transform: rotate({deg}deg) scale({scale}); -moz-transform: rotate({deg}deg) scale({scale}); transform: rotate({deg}deg) scale({scale});"/>', 
                n = "", i = 417, a = 430, o = 16, r = ["7,0", "17,0", "24,120", "0,120"], s = 0;
                s < r.length;
                s++) {
                    var d = r[s].split(",");
                    r[s] = ~~d[0] + i + "," + (~~d[1] + a)
                }
                for (var s = 0; s < o; s++)
                {
                    n += e.replace("{path}", r.join(" ")).replace(/\{deg\}/g, 360 * s  / o + 10 - 15 * Math.random()).replace(/\{scale\}/g, 
                    .8 - Math.random() * (s % 2 === 0 ? .4 :- .4));
                }
                var l = '<defs><linearGradient id="light-column" x1="0%" y1="0%" x2="0%" y2="100%">          <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1;"/>          <stop offset="45%" style="stop-color:rgb(255,255,255);stop-opacity:1;"/>          <stop offset="70%" style="stop-color:rgb(255,241,89);stop-opacity:.8;"/>          <stop offset="100%" style="stop-color:rgb(255,234,0);stop-opacity:0;"/>      </linearGradient></defs>';
                t.find("#lightSvg").html(l + n)
            }
            function c(e)
            {
                t.find(".polygon").each(function ()
                {
                    var t = T.css3Prefix.TRANSFORM;
                    arrTransform = this.style[t].match(/\d+/g), rotate = arrTransform[0] + "." + arrTransform[1] + "deg", 
                    scale = parseFloat(arrTransform[2] + "." + arrTransform[3]), scaleY = scale * e, this.style[t] = "rotate(" + rotate + ") scale(" + scale + "," + scaleY + ")";
                })
            }
            function f()
            {
                e(".j-paw").removeClass("winning").css("left", 0), ~~t.find(".j-grab-chance").attr("chance") > 0 && t.find(".j-game-start").addClass("btn-jump-up")
            }
            function p()
            {
                T.getLotteryInfo(function (e)
                {
                    var n = e.data.lotteryPrize, a = e.data.beginTime.match(/\d+/g), o = e.data.endTime.match(/\d+/g);
                    a.length > 2 && a.length > 2 && t.find(".j-raffle-time").text(a[0] + "年" + a[1] + "月" + a[2] + "日-" + o[0] + "年" + o[1] + "月" + o[2] + "日"), 
                    n && n.length && i(n)
                },
                function ()
                {
                    console && console.error && console.error("获取抽奖信息失败")
                }), T.getWinnerList(function (e)
                {
                    a(e.data)
                }), l()
            }
            function u()
            {
                t.find(".j-game-start").bind("click", function ()
                {
                    T.loginAndGo(function ()
                    {
                        x || (~~t.find(".j-grab-chance").attr("chance") > 0 ? (f(), x = !0, t.find(".j-game-start").removeClass("btn-jump-up"), 
                        t.find(".j-paw-wawa").addClass("btn-jump-up"), s()) : I.show("nochance"))
                    })
                }), t.find(".j-paw-wawa").bind("click", function ()
                {
                    t.find(".j-paw-wawa").removeClass("btn-jump-up"), r()
                }), t.find(".j-grab-chance").bind("click", function ()
                {
                    T.loginAndGo()
                })
            }
            function h(t, n, i)
            {
                var a = e(".j-paw");
                a.stop().removeClass("left-moving right-moving").find(".j-paw-middle").animate({
                    height : "252px"
                },
                2e3, function ()
                {
                    "hit" === t && (a.addClass("winning"), c(1.3));
                    var o = e(this);
                    setTimeout(function ()
                    {
                        o.animate({
                            height : "45px"
                        },
                        2e3, function ()
                        {
                            "hit" === t ? setTimeout(function ()
                            {
                                n ? I.show(t, i, !0) : I.show(t, i, !1)
                            }, 800) : I.show(t, i)
                        })
                    }, 1e3)
                })
            }
            var m = e.extend({
                listWrapSelector : ".j-list-wrap"
            }, n), g = m.lotterycode, v =- 1, j = null, y = !1, C = 380, w = 4e3, x = !1, b = !1, I = function ()
            {
                var n = t.find(".j-roulette-dialog"), i = t.find(".j-roulette-input-dialog");
                return t.find(".j-p-btn-know,.j-r-btn-closed,.j-pop-close").bind("click", function ()
                {
                    f(), e(this).closest(".j-roulette-dialog").removeClass("hit cannot nochance miss error"), 
                    I.hide(), x = b = !1;
                }), 
                {
                    show : function (a, o, r)
                    {
                        if (j || (j = e('<div class="ie67mask" style="display: none; z-index: 100; position: absolute; left: 0; top: 0; width: 100%; height: ' + e(document).height() + 'px; background-color: #000; opacity: .6; filter: alpha(opacity=60);"></div>'), 
                        e("body").append(j)), j.show(), o)
                        {
                            var s = e(window).scrollTop() - t.offset().top + e(window).height() / 2, d = o.split("#@@#");
                            if (r)
                            {
                                i.find(".j-prize-name").text(d[1] || ""), i.css({
                                    top : s 
                                }).show().find("input").eq(0).focus();
                            }
                            else
                            {
                                n.find(".j-r-btn-closed").hide();
                                var l = d[0], c = d[1] || "", f = d[2] || "";
                                n.find(".j-prize-tip").text(l), n.find(".j-prize-name").text(c), n.find(".j-dialog-remarks").text(f), 
                                n.find(".j-p-pic").html(t.find(".j-prize-img[prizeid=" + v + "]")[0].outerHTML), 
                                n.addClass(a).fadeIn(600)
                            }
                        }
                        else {
                            n.addClass(a).fadeIn(600);
                        }
                    },
                    hide : function ()
                    {
                        var n = t.find(".j-roulette-dialog:visible,.j-roulette-input-dialog:visible");
                        if (n.hasClass("j-roulette-input-dialog"))
                        {
                            for (var i = n.find(".j-require").removeClass("error"), a = !0, o = 0; o < i.length; o++)
                            {
                                var r = e(i[o]).find("input,textarea"), s = r.parent(), d = s.find(".error-tip");
                                "" === jQuery.trim(r.val()) && (d.text(d.attr("title")), s.addClass("error"), 
                                a = !1)
                            }
                            if (a === !1) {
                                return;
                            }
                            var l = t.find("#prize-user-phone");
                            if (!/^1\d{10}$|^0\d{2}-\d{8}$|^0\d{3}-\d{7}$/.test(l.val())) return void l.focus().parent().addClass("error").find(".error-tip").text("联系方式格式输入不正确");
                            T.submitUserInfo()
                        }
                        else {
                            n.hide(), j.hide();
                        }
                    }
                }
            }(),
            T = 
            {
                css3Prefix : function ()
                {
                    for (var e = document.createElement("div"), t = ["", "webkit", "moz", "ms"], n = {
                        TRANSFORM : "", TRANSITION : ""
                    },
                    i = 0;
                    i < t.length;
                    i++) {
                        var a = t[i] ? t[i] + "Transform" : "transform";
                        if (a in e.style) {
                            n.TRANSFORM = a;
                            break
                        }
                    }
                    return n.CSS_TRANSFORM = n.TRANSFORM.replace(/webkitT/, "-webkit-t").replace(/mozT/, 
                    "-moz-t").replace(/msT/, "-ms-t"), n
                }(),
                updateChance : function (e)
                {
                    t.find(".j-grab-chance").html("您还有" + e + "次抓取娃娃的机会").attr("chance", e)
                },
                getUserAddress : function (e)
                {
                    jQuery.ajax(
                    {
                        url : INTERFACE.actJshop.getUserAddress, data : {
                            originId : 1, type : 1
                        },
                        dataType : "jsonp",
                        success : function (t)
                        {
                            t.name && "function" == typeof e && e(t)
                        }
                    })
                },
                submitUserInfo : function ()
                {
                    var e = t.find("#prize-user-name").val(), n = t.find("#prize-user-phone").val(), i = t.find(".j-ui-area-text").text() + t.find("#prize-user-address").val(), 
                    a = t.find("#prize-user-mark").val();
                    jQuery.ajax(
                    {
                        url : INTERFACE.lottery.lottery_address, dataType : "jsonp", type : "post", data : {
                            lotteryCode : g, address : i, mobile : n, name : e, openAnswer : a, prizeId : v
                        },
                        success : function (e)
                        {
                            if (e && "0000" === e.responseCode)
                            {
                                t.find(".j-form-wrap").addClass("hidden").siblings().removeClass("hidden");
                                var n = 3, i = t.find(".j-close-time"), a = setInterval(function ()
                                {
                                    0 === n && (clearInterval(a), t.find(".j-roulette-input-dialog").hide(), 
                                    t.find(".j-submited-tip").addClass("hidden").siblings().removeClass("hidden"), 
                                    j.hide()), i.text(--n)
                                }, 1e3);
                                i.text(3)
                            }
                            else {
                                alert("提交中奖信息失败:", e);
                            }
                        },
                        error : function (e)
                        {
                            alert("您当前网络不稳定，请稍后再尝试提交中奖信息")
                        }
                    })
                },
                getLotteryInfo : function (t, n)
                {
                    e.ajax(
                    {
                        url : INTERFACE.lottery.getLotteryInfo, data : {
                            lotteryCode : g
                        },
                        dataType : "jsonp",
                        success : function (e)
                        {
                            e && "0000" === e.responseCode ? "function" == typeof t && t(e) : "function" == typeof n && n(e)
                        },
                        error : function (e)
                        {
                            "function" == typeof n && n(e)
                        }
                    })
                },
                getLeftCount : function (e, t)
                {
                    jQuery.ajax(
                    {
                        url : INTERFACE.lottery.lottery_chance, data : {
                            lotteryCode : g
                        },
                        dataType : "jsonp",
                        success : function (t)
                        {
                            "function" == typeof e && e(t)
                        },
                        error : function (e)
                        {
                            "function" == typeof t && t(e)
                        }
                    })
                },
                drawing : function (e, t)
                {
                    jQuery.ajax(
                    {
                        url : INTERFACE.lottery.lottery_start, data : {
                            lotteryCode : g
                        },
                        dataType : "jsonp",
                        success : function (t)
                        {
                            "0000" === t.responseCode ? (T.getLeftCount(function (e)
                            {
                                e.data && void 0 !== e.data.chances && T.updateChance(e.data.chances)
                            }), "function" == typeof e && e(t)) : I.show("fail", t.data.promptMsg)
                        },
                        error : function (e)
                        {
                            "function" == typeof t && t(e) || I.show("fail", "很抱歉，发送抽奖请求遇到错误，请稍后再试")
                        }
                    })
                },
                getWinnerList : function (e, t)
                {
                    jQuery.ajax(
                    {
                        url : INTERFACE.lottery.getWinnerList, data : {
                            lotteryCode : g
                        },
                        dataType : "jsonp",
                        success : function (t)
                        {
                            "function" == typeof e && e(t)
                        },
                        error : function (e)
                        {
                            "function" == typeof t && t(e)
                        }
                    })
                },
                loginAndGo : function (e)
                {
                    y ? "function" == typeof e && e() : thick_login(function ()
                    {
                        T.getLeftCount(function (e)
                        {
                            e.data && void 0 !== e.data.chances && T.updateChance(e.data.chances)
                        }), y = !0
                    })
                }
            };
            !!function ()
            {
                t && 0 !== t.length && (p(), u(), seajs.use("//misc.360buyimg.com/jdf/1.0.0/unit/login/1.0.0/login.js", 
                function (e)
                {
                    e.isLogin(function (e)
                    {
                        e && (y = e, T.getLeftCount(function (e)
                        {
                            e.data && void 0 !== e.data.chances && (T.updateChance(e.data.chances), e.data.chances > 0 && t.find(".j-game-start").addClass("btn-jump-up"))
                        }))
                    })
                }))
            }
            ()
        },
        prizeClaw : function (t)
        {
            new n.definePrizeClaw(e(this), t)
        }
    })
}
(jQuery, window), $.fn.extend(
{
    cntScroll : function (e)
    {
        function t()
        {
            !n.children().length || n.children().eq(0).outerHeight(!0) <= i || (n.data("scrollTimer") && (clearInterval(n.data("scrollTimer")), 
            n.data("scrollTimer", null)), o = n.children().eq(0).outerHeight(!0), n.children().eq(0).clone(!0).appendTo(n), 
            n.data("scrollTimer", setInterval(function ()
            {
                var e = n.scrollTop();
                e < o ? n.scrollTop(e + a) : n.scrollTop(a)
            }, 50)))
        }
        var n = $(this), i = n.height(), a = 1, o = 0;
        t()
    }
});

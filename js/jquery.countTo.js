(function($) {
    var CountTo = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, CountTo.DEFAULTS, this.dataOptions(), options);
        this.init();
    };
    CountTo.DEFAULTS = {
        from: 0,
        to: 0,
        speed: 1000,
        refreshInterval: 100,
        decimals: 0,
        formatter: formatter,
        onUpdate: null,
        onComplete: null
    };
    CountTo.prototype.init = function() {
        this.value = this.options.from;
        this.loops = Math.ceil(this.options.speed / this.options.refreshInterval);
        this.loopCount = 0;
        this.increment = (this.options.to - this.options.from) / this.loops;
    };
    CountTo.prototype.dataOptions = function() {
        var options = {
            from: this.$element.data('from'),
            to: this.$element.data('to'),
            speed: this.$element.data('speed'),
            refreshInterval: this.$element.data('refresh-interval'),
            decimals: this.$element.data('decimals')
        };
        var keys = Object.keys(options);
        for (var i in keys) {
            var key = keys[i];
            if (typeof(options[key]) === 'undefined') {
                delete options[key];
            }
        }
        return options;
    };
    CountTo.prototype.update = function() {
        this.value += this.increment;
        this.loopCount++;
        this.render();
        if (typeof(this.options.onUpdate) == 'function') {
            this.options.onUpdate.call(this.$element, this.value);
        }
        if (this.loopCount >= this.loops) {
            clearInterval(this.interval);
            this.value = this.options.to;
            if (typeof(this.options.onComplete) == 'function') {
                this.options.onComplete.call(this.$element, this.value);
            }
        }
    };
    CountTo.prototype.render = function() {
        var formattedValue = this.options.formatter.call(this.$element, this.value, this.options);
        this.$element.text(formattedValue);
    };
    CountTo.prototype.restart = function() {
        this.stop();
        this.init();
        this.start();
    };
    CountTo.prototype.start = function() {
        this.stop();
        this.render();
        this.interval = setInterval(this.update.bind(this), this.options.refreshInterval);
    };
    CountTo.prototype.stop = function() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    };
    CountTo.prototype.toggle = function() {
        if (this.interval) {
            this.stop();
        } else {
            this.start();
        }
    };

    function formatter(value, options) {
        return value.toFixed(options.decimals);
    }
    $.fn.countTo = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('countTo');
            var init = !data || typeof(option) === 'object';
            var options = typeof(option) === 'object' ? option : {};
            var method = typeof(option) === 'string' ? option : 'start';
            if (init) {
                if (data) data.stop();
                $this.data('countTo', data = new CountTo(this, options));
            }
            data[method].call(data);
        });
    };
}(jQuery));
(function() {
    var t = [].indexOf || function(t) {
            for (var e = 0, n = this.length; e < n; e++) {
                if (e in this && this[e] === t) return e
            }
            return -1
        },
        e = [].slice;
    (function(t, e) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", ["jquery"], function(n) {
                return e(n, t)
            })
        } else {
            return e(t.jQuery, t)
        }
    })(this, function(n, r) {
        var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
        i = n(r);
        c = t.call(r, "ontouchstart") >= 0;
        s = {
            horizontal: {},
            vertical: {}
        };
        f = 1;
        a = {};
        u = "waypoints-context-id";
        p = "resize.waypoints";
        y = "scroll.waypoints";
        v = 1;
        w = "waypoints-waypoint-ids";
        g = "waypoint";
        m = "waypoints";
        o = function() {
            function t(t) {
                var e = this;
                this.$element = t;
                this.element = t[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = "context" + f++;
                this.oldScroll = {
                    x: t.scrollLeft(),
                    y: t.scrollTop()
                };
                this.waypoints = {
                    horizontal: {},
                    vertical: {}
                };
                t.data(u, this.id);
                a[this.id] = this;
                t.bind(y, function() {
                    var t;
                    if (!(e.didScroll || c)) {
                        e.didScroll = true;
                        t = function() {
                            e.doScroll();
                            return e.didScroll = false
                        };
                        return r.setTimeout(t, n[m].settings.scrollThrottle)
                    }
                });
                t.bind(p, function() {
                    var t;
                    if (!e.didResize) {
                        e.didResize = true;
                        t = function() {
                            n[m]("refresh");
                            return e.didResize = false
                        };
                        return r.setTimeout(t, n[m].settings.resizeThrottle)
                    }
                })
            }
            t.prototype.doScroll = function() {
                var t, e = this;
                t = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
                if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
                    n[m]("refresh")
                }
                n.each(t, function(t, r) {
                    var i, o, l;
                    l = [];
                    o = r.newScroll > r.oldScroll;
                    i = o ? r.forward : r.backward;
                    n.each(e.waypoints[t], function(t, e) {
                        var n, i;
                        if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
                            return l.push(e)
                        } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
                            return l.push(e)
                        }
                    });
                    l.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    if (!o) {
                        l.reverse()
                    }
                    return n.each(l, function(t, e) {
                        if (e.options.continuous || t === l.length - 1) {
                            return e.trigger([i])
                        }
                    })
                });
                return this.oldScroll = {
                    x: t.horizontal.newScroll,
                    y: t.vertical.newScroll
                }
            };
            t.prototype.refresh = function() {
                var t, e, r, i = this;
                r = n.isWindow(this.element);
                e = this.$element.offset();
                this.doScroll();
                t = {
                    horizontal: {
                        contextOffset: r ? 0 : e.left,
                        contextScroll: r ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: r ? 0 : e.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r ? n[m]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                };
                return n.each(t, function(t, e) {
                    return n.each(i.waypoints[t], function(t, r) {
                        var i, o, l, s, f;
                        i = r.options.offset;
                        l = r.offset;
                        o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
                        if (n.isFunction(i)) {
                            i = i.apply(r.element)
                        } else if (typeof i === "string") {
                            i = parseFloat(i);
                            if (r.options.offset.indexOf("%") > -1) {
                                i = Math.ceil(e.contextDimension * i / 100)
                            }
                        }
                        r.offset = o - e.contextOffset + e.contextScroll - i;
                        if (r.options.onlyOnScroll && l != null || !r.enabled) {
                            return
                        }
                        if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
                            return r.trigger([e.backward])
                        } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
                            return r.trigger([e.forward])
                        } else if (l === null && e.oldScroll >= r.offset) {
                            return r.trigger([e.forward])
                        }
                    })
                })
            };
            t.prototype.checkEmpty = function() {
                if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
                    this.$element.unbind([p, y].join(" "));
                    return delete a[this.id]
                }
            };
            return t
        }();
        l = function() {
            function t(t, e, r) {
                var i, o;
                r = n.extend({}, n.fn[g].defaults, r);
                if (r.offset === "bottom-in-view") {
                    r.offset = function() {
                        var t;
                        t = n[m]("viewportHeight");
                        if (!n.isWindow(e.element)) {
                            t = e.$element.height()
                        }
                        return t - n(this).outerHeight()
                    }
                }
                this.$element = t;
                this.element = t[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = e;
                this.enabled = r.enabled;
                this.id = "waypoints" + v++;
                this.offset = null;
                this.options = r;
                e.waypoints[this.axis][this.id] = this;
                s[this.axis][this.id] = this;
                i = (o = t.data(w)) != null ? o : [];
                i.push(this.id);
                t.data(w, i)
            }
            t.prototype.trigger = function(t) {
                if (!this.enabled) {
                    return
                }
                if (this.callback != null) {
                    this.callback.apply(this.element, t)
                }
                if (this.options.triggerOnce) {
                    return this.destroy()
                }
            };
            t.prototype.disable = function() {
                return this.enabled = false
            };
            t.prototype.enable = function() {
                this.context.refresh();
                return this.enabled = true
            };
            t.prototype.destroy = function() {
                delete s[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty()
            };
            t.getWaypointsByElement = function(t) {
                var e, r;
                r = n(t).data(w);
                if (!r) {
                    return []
                }
                e = n.extend({}, s.horizontal, s.vertical);
                return n.map(r, function(t) {
                    return e[t]
                })
            };
            return t
        }();
        d = {
            init: function(t, e) {
                var r;
                if (e == null) {
                    e = {}
                }
                if ((r = e.handler) == null) {
                    e.handler = t
                }
                this.each(function() {
                    var t, r, i, s;
                    t = n(this);
                    i = (s = e.context) != null ? s : n.fn[g].defaults.context;
                    if (!n.isWindow(i)) {
                        i = t.closest(i)
                    }
                    i = n(i);
                    r = a[i.data(u)];
                    if (!r) {
                        r = new o(i)
                    }
                    return new l(t, r, e)
                });
                n[m]("refresh");
                return this
            },
            disable: function() {
                return d._invoke(this, "disable")
            },
            enable: function() {
                return d._invoke(this, "enable")
            },
            destroy: function() {
                return d._invoke(this, "destroy")
            },
            prev: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e > 0) {
                        return t.push(n[e - 1])
                    }
                })
            },
            next: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e < n.length - 1) {
                        return t.push(n[e + 1])
                    }
                })
            },
            _traverse: function(t, e, i) {
                var o, l;
                if (t == null) {
                    t = "vertical"
                }
                if (e == null) {
                    e = r
                }
                l = h.aggregate(e);
                o = [];
                this.each(function() {
                    var e;
                    e = n.inArray(this, l[t]);
                    return i(o, e, l[t])
                });
                return this.pushStack(o)
            },
            _invoke: function(t, e) {
                t.each(function() {
                    var t;
                    t = l.getWaypointsByElement(this);
                    return n.each(t, function(t, n) {
                        n[e]();
                        return true
                    })
                });
                return this
            }
        };
        n.fn[g] = function() {
            var t, r;
            r = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (d[r]) {
                return d[r].apply(this, t)
            } else if (n.isFunction(r)) {
                return d.init.apply(this, arguments)
            } else if (n.isPlainObject(r)) {
                return d.init.apply(this, [null, r])
            } else if (!r) {
                return n.error("jQuery Waypoints needs a callback function or handler option.")
            } else {
                return n.error("The " + r + " method does not exist in jQuery Waypoints.")
            }
        };
        n.fn[g].defaults = {
            context: r,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false
        };
        h = {
            refresh: function() {
                return n.each(a, function(t, e) {
                    return e.refresh()
                })
            },
            viewportHeight: function() {
                var t;
                return (t = r.innerHeight) != null ? t : i.height()
            },
            aggregate: function(t) {
                var e, r, i;
                e = s;
                if (t) {
                    e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0
                }
                if (!e) {
                    return []
                }
                r = {
                    horizontal: [],
                    vertical: []
                };
                n.each(r, function(t, i) {
                    n.each(e[t], function(t, e) {
                        return i.push(e)
                    });
                    i.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    r[t] = n.map(i, function(t) {
                        return t.element
                    });
                    return r[t] = n.unique(r[t])
                });
                return r
            },
            above: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset <= t.oldScroll.y
                })
            },
            below: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset > t.oldScroll.y
                })
            },
            left: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset <= t.oldScroll.x
                })
            },
            right: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset > t.oldScroll.x
                })
            },
            enable: function() {
                return h._invoke("enable")
            },
            disable: function() {
                return h._invoke("disable")
            },
            destroy: function() {
                return h._invoke("destroy")
            },
            extendFn: function(t, e) {
                return d[t] = e
            },
            _invoke: function(t) {
                var e;
                e = n.extend({}, s.vertical, s.horizontal);
                return n.each(e, function(e, n) {
                    n[t]();
                    return true
                })
            },
            _filter: function(t, e, r) {
                var i, o;
                i = a[n(t).data(u)];
                if (!i) {
                    return []
                }
                o = [];
                n.each(i.waypoints[e], function(t, e) {
                    if (r(i, e)) {
                        return o.push(e)
                    }
                });
                o.sort(function(t, e) {
                    return t.offset - e.offset
                });
                return n.map(o, function(t) {
                    return t.element
                })
            }
        };
        n[m] = function() {
            var t, n;
            n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (h[n]) {
                return h[n].apply(null, t)
            } else {
                return h.aggregate.call(null, n)
            }
        };
        n[m].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        };
        return i.load(function() {
            return n[m]("refresh")
        })
    })
}).call(this);
! function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(this, function() {
    ! function(a) {
        "use strict";

        function b(b) {
            var c = [{
                re: /[\xC0-\xC6]/g,
                ch: "A"
            }, {
                re: /[\xE0-\xE6]/g,
                ch: "a"
            }, {
                re: /[\xC8-\xCB]/g,
                ch: "E"
            }, {
                re: /[\xE8-\xEB]/g,
                ch: "e"
            }, {
                re: /[\xCC-\xCF]/g,
                ch: "I"
            }, {
                re: /[\xEC-\xEF]/g,
                ch: "i"
            }, {
                re: /[\xD2-\xD6]/g,
                ch: "O"
            }, {
                re: /[\xF2-\xF6]/g,
                ch: "o"
            }, {
                re: /[\xD9-\xDC]/g,
                ch: "U"
            }, {
                re: /[\xF9-\xFC]/g,
                ch: "u"
            }, {
                re: /[\xC7-\xE7]/g,
                ch: "c"
            }, {
                re: /[\xD1]/g,
                ch: "N"
            }, {
                re: /[\xF1]/g,
                ch: "n"
            }];
            return a.each(c, function() {
                b = b.replace(this.re, this.ch)
            }), b
        }

        function c(a) {
            var b = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;",
                    "`": "&#x60;"
                },
                c = "(?:" + Object.keys(b).join("|") + ")",
                d = new RegExp(c),
                e = new RegExp(c, "g"),
                f = null == a ? "" : "" + a;
            return d.test(f) ? f.replace(e, function(a) {
                return b[a]
            }) : f
        }

        function d(b, c) {
            var d = arguments,
                f = b,
                g = c;
            [].shift.apply(d);
            var h, i = this.each(function() {
                var b = a(this);
                if (b.is("select")) {
                    var c = b.data("selectpicker"),
                        i = "object" == typeof f && f;
                    if (c) {
                        if (i)
                            for (var j in i) i.hasOwnProperty(j) && (c.options[j] = i[j])
                    } else {
                        var k = a.extend({}, e.DEFAULTS, a.fn.selectpicker.defaults || {}, b.data(), i);
                        b.data("selectpicker", c = new e(this, k, g))
                    }
                    "string" == typeof f && (h = c[f] instanceof Function ? c[f].apply(c, d) : c.options[f])
                }
            });
            return "undefined" != typeof h ? h : i
        }
        String.prototype.includes || ! function() {
            var a = {}.toString,
                b = function() {
                    try {
                        var a = {},
                            b = Object.defineProperty,
                            c = b(a, a, a) && b
                    } catch (d) {}
                    return c
                }(),
                c = "".indexOf,
                d = function(b) {
                    if (null == this) throw TypeError();
                    var d = String(this);
                    if (b && "[object RegExp]" == a.call(b)) throw TypeError();
                    var e = d.length,
                        f = String(b),
                        g = f.length,
                        h = arguments.length > 1 ? arguments[1] : void 0,
                        i = h ? Number(h) : 0;
                    i != i && (i = 0);
                    var j = Math.min(Math.max(i, 0), e);
                    return g + j > e ? !1 : -1 != c.call(d, f, i)
                };
            b ? b(String.prototype, "includes", {
                value: d,
                configurable: !0,
                writable: !0
            }) : String.prototype.includes = d
        }(), String.prototype.startsWith || ! function() {
            var a = function() {
                    try {
                        var a = {},
                            b = Object.defineProperty,
                            c = b(a, a, a) && b
                    } catch (d) {}
                    return c
                }(),
                b = {}.toString,
                c = function(a) {
                    if (null == this) throw TypeError();
                    var c = String(this);
                    if (a && "[object RegExp]" == b.call(a)) throw TypeError();
                    var d = c.length,
                        e = String(a),
                        f = e.length,
                        g = arguments.length > 1 ? arguments[1] : void 0,
                        h = g ? Number(g) : 0;
                    h != h && (h = 0);
                    var i = Math.min(Math.max(h, 0), d);
                    if (f + i > d) return !1;
                    for (var j = -1; ++j < f;)
                        if (c.charCodeAt(i + j) != e.charCodeAt(j)) return !1;
                    return !0
                };
            a ? a(String.prototype, "startsWith", {
                value: c,
                configurable: !0,
                writable: !0
            }) : String.prototype.startsWith = c
        }(), Object.keys || (Object.keys = function(a, b, c) {
            c = [];
            for (b in a) c.hasOwnProperty.call(a, b) && c.push(b);
            return c
        }), a.expr[":"].icontains = function(b, c, d) {
            var e = a(b),
                f = (e.data("tokens") || e.text()).toUpperCase();
            return f.includes(d[3].toUpperCase())
        }, a.expr[":"].ibegins = function(b, c, d) {
            var e = a(b),
                f = (e.data("tokens") || e.text()).toUpperCase();
            return f.startsWith(d[3].toUpperCase())
        }, a.expr[":"].aicontains = function(b, c, d) {
            var e = a(b),
                f = (e.data("tokens") || e.data("normalizedText") || e.text()).toUpperCase();
            return f.includes(d[3].toUpperCase())
        }, a.expr[":"].aibegins = function(b, c, d) {
            var e = a(b),
                f = (e.data("tokens") || e.data("normalizedText") || e.text()).toUpperCase();
            return f.startsWith(d[3].toUpperCase())
        };
        var e = function(b, c, d) {
            d && (d.stopPropagation(), d.preventDefault()), this.$element = a(b), this.$newElement = null, this.$button = null, this.$menu = null, this.$lis = null, this.options = c, null === this.options.title && (this.options.title = this.$element.attr("title")), this.val = e.prototype.val, this.render = e.prototype.render, this.refresh = e.prototype.refresh, this.setStyle = e.prototype.setStyle, this.selectAll = e.prototype.selectAll, this.deselectAll = e.prototype.deselectAll, this.destroy = e.prototype.remove, this.remove = e.prototype.remove, this.show = e.prototype.show, this.hide = e.prototype.hide, this.init()
        };
        e.VERSION = "1.7.2", e.DEFAULTS = {
            noneSelectedText: "Nothing selected",
            noneResultsText: "No results matched {0}",
            countSelectedText: function(a, b) {
                return 1 == a ? "{0} item selected" : "{0} items selected"
            },
            maxOptionsText: function(a, b) {
                return [1 == a ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", 1 == b ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)"]
            },
            selectAllText: "Select All",
            deselectAllText: "Deselect All",
            doneButton: !1,
            doneButtonText: "Close",
            multipleSeparator: ", ",
            styleBase: "btn",
            style: "btn-default",
            size: "auto",
            title: null,
            selectedTextFormat: "values",
            width: !1,
            container: !1,
            hideDisabled: !1,
            showSubtext: !1,
            showIcon: !0,
            showContent: !0,
            dropupAuto: !0,
            header: !1,
            liveSearch: !1,
            liveSearchPlaceholder: null,
            liveSearchNormalize: !1,
            liveSearchStyle: "contains",
            actionsBox: !1,
            iconBase: "glyphicon",
            tickIcon: "glyphicon-ok",
            maxOptions: !1,
            mobile: !1,
            selectOnTab: !1,
            dropdownAlignRight: !1
        }, e.prototype = {
            constructor: e,
            init: function() {
                var b = this,
                    c = this.$element.attr("id");
                this.$element.addClass("bs-select-hidden"), this.liObj = {}, this.multiple = this.$element.prop("multiple"), this.autofocus = this.$element.prop("autofocus"), this.$newElement = this.createView(), this.$element.after(this.$newElement), this.$button = this.$newElement.children("button"), this.$menu = this.$newElement.children(".dropdown-menu"), this.$menuInner = this.$menu.children(".inner"), this.$searchbox = this.$menu.find("input"), this.options.dropdownAlignRight && this.$menu.addClass("dropdown-menu-right"), "undefined" != typeof c && (this.$button.attr("data-id", c), a('label[for="' + c + '"]').click(function(a) {
                    a.preventDefault(), b.$button.focus()
                })), this.checkDisabled(), this.clickListener(), this.options.liveSearch && this.liveSearchListener(), this.render(), this.setStyle(), this.setWidth(), this.options.container && this.selectPosition(), this.$menu.data("this", this), this.$newElement.data("this", this), this.options.mobile && this.mobile(), this.$newElement.on("hide.bs.dropdown", function(a) {
                    b.$element.trigger("hide.bs.select", a)
                }), this.$newElement.on("hidden.bs.dropdown", function(a) {
                    b.$element.trigger("hidden.bs.select", a)
                }), this.$newElement.on("show.bs.dropdown", function(a) {
                    b.$element.trigger("show.bs.select", a)
                }), this.$newElement.on("shown.bs.dropdown", function(a) {
                    b.$element.trigger("shown.bs.select", a)
                }), setTimeout(function() {
                    b.$element.trigger("loaded.bs.select")
                })
            },
            createDropdown: function() {
                var b = this.multiple ? " show-tick" : "",
                    d = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "",
                    e = this.autofocus ? " autofocus" : "",
                    f = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "",
                    g = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + c(this.options.liveSearchPlaceholder) + '"') + "></div>" : "",
                    h = this.multiple && this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">' + this.options.selectAllText + '</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">' + this.options.deselectAllText + "</button></div></div>" : "",
                    i = this.multiple && this.options.doneButton ? '<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm btn-default">' + this.options.doneButtonText + "</button></div></div>" : "",
                    j = '<div class="btn-group bootstrap-select' + b + d + '"><button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + e + '><span class="filter-option pull-left"></span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open">' + f + g + h + '<ul class="dropdown-menu inner" role="menu"></ul>' + i + "</div></div>";
                return a(j)
            },
            createView: function() {
                var a = this.createDropdown(),
                    b = this.createLi();
                return a.find("ul")[0].innerHTML = b, a
            },
            reloadLi: function() {
                this.destroyLi();
                var a = this.createLi();
                this.$menuInner[0].innerHTML = a
            },
            destroyLi: function() {
                this.$menu.find("li").remove()
            },
            createLi: function() {
                var d = this,
                    e = [],
                    f = 0,
                    g = document.createElement("option"),
                    h = -1,
                    i = function(a, b, c, d) {
                        return "<li" + ("undefined" != typeof c & "" !== c ? ' class="' + c + '"' : "") + ("undefined" != typeof b & null !== b ? ' data-original-index="' + b + '"' : "") + ("undefined" != typeof d & null !== d ? 'data-optgroup="' + d + '"' : "") + ">" + a + "</li>"
                    },
                    j = function(a, e, f, g) {
                        return '<a tabindex="0"' + ("undefined" != typeof e ? ' class="' + e + '"' : "") + ("undefined" != typeof f ? ' style="' + f + '"' : "") + (d.options.liveSearchNormalize ? ' data-normalized-text="' + b(c(a)) + '"' : "") + ("undefined" != typeof g || null !== g ? ' data-tokens="' + g + '"' : "") + ">" + a + '<span class="' + d.options.iconBase + " " + d.options.tickIcon + ' check-mark"></span></a>'
                    };
                if (this.options.title && !this.multiple && (h--, !this.$element.find(".bs-title-option").length)) {
                    var k = this.$element[0];
                    g.className = "bs-title-option", g.appendChild(document.createTextNode(this.options.title)), g.value = "", k.insertBefore(g, k.firstChild), null === k.options[k.selectedIndex].getAttribute("selected") && (g.selected = !0)
                }
                return this.$element.find("option").each(function(b) {
                    var c = a(this);
                    if (h++, !c.hasClass("bs-title-option")) {
                        var g = this.className || "",
                            k = this.style.cssText,
                            l = c.data("content") ? c.data("content") : c.html(),
                            m = c.data("tokens") ? c.data("tokens") : null,
                            n = "undefined" != typeof c.data("subtext") ? '<small class="text-muted">' + c.data("subtext") + "</small>" : "",
                            o = "undefined" != typeof c.data("icon") ? '<span class="' + d.options.iconBase + " " + c.data("icon") + '"></span> ' : "",
                            p = this.disabled || "OPTGROUP" === this.parentElement.tagName && this.parentElement.disabled;
                        if ("" !== o && p && (o = "<span>" + o + "</span>"), d.options.hideDisabled && p) return void h--;
                        if (c.data("content") || (l = o + '<span class="text">' + l + n + "</span>"), "OPTGROUP" === this.parentElement.tagName && c.data("divider") !== !0) {
                            if (0 === c.index()) {
                                f += 1;
                                var q = this.parentElement.label,
                                    r = "undefined" != typeof c.parent().data("subtext") ? '<small class="text-muted">' + c.parent().data("subtext") + "</small>" : "",
                                    s = c.parent().data("icon") ? '<span class="' + d.options.iconBase + " " + c.parent().data("icon") + '"></span> ' : "",
                                    t = " " + this.parentElement.className || "";
                                q = s + '<span class="text">' + q + r + "</span>", 0 !== b && e.length > 0 && (h++, e.push(i("", null, "divider", f + "div"))), h++, e.push(i(q, null, "dropdown-header" + t, f))
                            }
                            e.push(i(j(l, "opt " + g + t, k, m), b, "", f))
                        } else c.data("divider") === !0 ? e.push(i("", b, "divider")) : c.data("hidden") === !0 ? e.push(i(j(l, g, k, m), b, "hidden is-hidden")) : (this.previousElementSibling && "OPTGROUP" === this.previousElementSibling.tagName && (h++, e.push(i("", null, "divider", f + "div"))), e.push(i(j(l, g, k, m), b)));
                        d.liObj[b] = h
                    }
                }), this.multiple || 0 !== this.$element.find("option:selected").length || this.options.title || this.$element.find("option").eq(0).prop("selected", !0).attr("selected", "selected"), e.join("")
            },
            findLis: function() {
                return null == this.$lis && (this.$lis = this.$menu.find("li")), this.$lis
            },
            render: function(b) {
                var c, d = this;
                b !== !1 && this.$element.find("option").each(function(a) {
                    var b = d.findLis().eq(d.liObj[a]);
                    d.setDisabled(a, this.disabled || "OPTGROUP" === this.parentElement.tagName && this.parentElement.disabled, b), d.setSelected(a, this.selected, b)
                }), this.tabIndex();
                var e = this.$element.find("option").map(function() {
                        if (this.selected) {
                            if (d.options.hideDisabled && (this.disabled || "OPTGROUP" === this.parentElement.tagName && this.parentElement.disabled)) return !1;
                            var b, c = a(this),
                                e = c.data("icon") && d.options.showIcon ? '<i class="' + d.options.iconBase + " " + c.data("icon") + '"></i> ' : "";
                            return b = d.options.showSubtext && c.data("subtext") && !d.multiple ? ' <small class="text-muted">' + c.data("subtext") + "</small>" : "", "undefined" != typeof c.attr("title") ? c.attr("title") : c.data("content") && d.options.showContent ? c.data("content") : e + c.html() + b
                        }
                    }).toArray(),
                    f = this.multiple ? e.join(this.options.multipleSeparator) : e[0];
                if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
                    var g = this.options.selectedTextFormat.split(">");
                    if (g.length > 1 && e.length > g[1] || 1 == g.length && e.length >= 2) {
                        c = this.options.hideDisabled ? ", [disabled]" : "";
                        var h = this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]' + c).length,
                            i = "function" == typeof this.options.countSelectedText ? this.options.countSelectedText(e.length, h) : this.options.countSelectedText;
                        f = i.replace("{0}", e.length.toString()).replace("{1}", h.toString())
                    }
                }
                void 0 == this.options.title && (this.options.title = this.$element.attr("title")), "static" == this.options.selectedTextFormat && (f = this.options.title), f || (f = "undefined" != typeof this.options.title ? this.options.title : this.options.noneSelectedText), this.$button.attr("title", a.trim(f.replace(/<[^>]*>?/g, ""))), this.$button.children(".filter-option").html(f), this.$element.trigger("rendered.bs.select")
            },
            setStyle: function(a, b) {
                this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ""));
                var c = a ? a : this.options.style;
                "add" == b ? this.$button.addClass(c) : "remove" == b ? this.$button.removeClass(c) : (this.$button.removeClass(this.options.style), this.$button.addClass(c))
            },
            liHeight: function(b) {
                if (b || this.options.size !== !1 && !this.sizeInfo) {
                    var c = document.createElement("div"),
                        d = document.createElement("div"),
                        e = document.createElement("ul"),
                        f = document.createElement("li"),
                        g = document.createElement("li"),
                        h = document.createElement("a"),
                        i = document.createElement("span"),
                        j = this.options.header ? this.$menu.find(".popover-title")[0].cloneNode(!0) : null,
                        k = this.options.liveSearch ? document.createElement("div") : null,
                        l = this.options.actionsBox && this.multiple ? this.$menu.find(".bs-actionsbox")[0].cloneNode(!0) : null,
                        m = this.options.doneButton && this.multiple ? this.$menu.find(".bs-donebutton")[0].cloneNode(!0) : null;
                    if (i.className = "text", c.className = this.$menu[0].parentNode.className + " open", d.className = "dropdown-menu open", e.className = "dropdown-menu inner", f.className = "divider", i.appendChild(document.createTextNode("Inner text")), h.appendChild(i), g.appendChild(h), e.appendChild(g), e.appendChild(f), j && d.appendChild(j), k) {
                        var n = document.createElement("span");
                        k.className = "bs-searchbox", n.className = "form-control", k.appendChild(n), d.appendChild(k)
                    }
                    l && d.appendChild(l), d.appendChild(e), m && d.appendChild(m), c.appendChild(d), document.body.appendChild(c);
                    var o = h.offsetHeight,
                        p = j ? j.offsetHeight : 0,
                        q = k ? k.offsetHeight : 0,
                        r = l ? l.offsetHeight : 0,
                        s = m ? m.offsetHeight : 0,
                        t = a(f).outerHeight(!0),
                        u = getComputedStyle ? getComputedStyle(d) : !1,
                        v = u ? a(d) : null,
                        w = parseInt(u ? u.paddingTop : v.css("paddingTop")) + parseInt(u ? u.paddingBottom : v.css("paddingBottom")) + parseInt(u ? u.borderTopWidth : v.css("borderTopWidth")) + parseInt(u ? u.borderBottomWidth : v.css("borderBottomWidth")),
                        x = w + parseInt(u ? u.marginTop : v.css("marginTop")) + parseInt(u ? u.marginBottom : v.css("marginBottom")) + 2;
                    document.body.removeChild(c), this.sizeInfo = {
                        liHeight: o,
                        headerHeight: p,
                        searchHeight: q,
                        actionsHeight: r,
                        doneButtonHeight: s,
                        dividerHeight: t,
                        menuPadding: w,
                        menuExtras: x
                    }
                }
            },
            setSize: function() {
                this.findLis(), this.liHeight();
                var b, c, d, e, f = this,
                    g = this.$menu,
                    h = this.$menuInner,
                    i = a(window),
                    j = this.$newElement[0].offsetHeight,
                    k = this.sizeInfo.liHeight,
                    l = this.sizeInfo.headerHeight,
                    m = this.sizeInfo.searchHeight,
                    n = this.sizeInfo.actionsHeight,
                    o = this.sizeInfo.doneButtonHeight,
                    p = this.sizeInfo.dividerHeight,
                    q = this.sizeInfo.menuPadding,
                    r = this.sizeInfo.menuExtras,
                    s = this.options.hideDisabled ? ".disabled" : "",
                    t = function() {
                        d = f.$newElement.offset().top - i.scrollTop(), e = i.height() - d - j
                    };
                if (t(), this.options.header && g.css("padding-top", 0), "auto" === this.options.size) {
                    var u = function() {
                        var i, j = function(b, c) {
                                return function(d) {
                                    return c ? d.classList ? d.classList.contains(b) : a(d).hasClass(b) : !(d.classList ? d.classList.contains(b) : a(d).hasClass(b))
                                }
                            },
                            p = f.$menuInner[0].getElementsByTagName("li"),
                            s = Array.prototype.filter ? Array.prototype.filter.call(p, j("hidden", !1)) : f.$lis.not(".hidden"),
                            u = Array.prototype.filter ? Array.prototype.filter.call(s, j("dropdown-header", !0)) : s.filter(".dropdown-header");
                        t(), b = e - r, f.options.container ? (g.data("height") || g.data("height", g.height()), c = g.data("height")) : c = g.height(), f.options.dropupAuto && f.$newElement.toggleClass("dropup", d > e && c > b - r), f.$newElement.hasClass("dropup") && (b = d - r), i = s.length + u.length > 3 ? 3 * k + r - 2 : 0, g.css({
                            "max-height": b + "px",
                            overflow: "hidden",
                            "min-height": i + l + m + n + o + "px"
                        }), h.css({
                            "max-height": b - l - m - n - o - q + "px",
                            "overflow-y": "auto",
                            "min-height": Math.max(i - q, 0) + "px"
                        })
                    };
                    u(), this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", u), i.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize", u)
                } else if (this.options.size && "auto" != this.options.size && this.$lis.not(s).length > this.options.size) {
                    var v = this.$lis.not(".divider").not(s).children().slice(0, this.options.size).last().parent().index(),
                        w = this.$lis.slice(0, v + 1).filter(".divider").length;
                    b = k * this.options.size + w * p + q, f.options.container ? (g.data("height") || g.data("height", g.height()), c = g.data("height")) : c = g.height(), f.options.dropupAuto && this.$newElement.toggleClass("dropup", d > e && c > b - r), g.css({
                        "max-height": b + l + m + n + o + "px",
                        overflow: "hidden",
                        "min-height": ""
                    }), h.css({
                        "max-height": b - q + "px",
                        "overflow-y": "auto",
                        "min-height": ""
                    })
                }
            },
            setWidth: function() {
                if ("auto" === this.options.width) {
                    this.$menu.css("min-width", "0");
                    var a = this.$menu.parent().clone().appendTo("body"),
                        b = this.options.container ? this.$newElement.clone().appendTo("body") : a,
                        c = a.children(".dropdown-menu").outerWidth(),
                        d = b.css("width", "auto").children("button").outerWidth();
                    a.remove(), b.remove(), this.$newElement.css("width", Math.max(c, d) + "px")
                } else "fit" === this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""), this.$newElement.css("width", ""));
                this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width")
            },
            selectPosition: function() {
                var b, c, d = this,
                    e = "<div />",
                    f = a(e),
                    g = function(a) {
                        f.addClass(a.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass("dropup", a.hasClass("dropup")), b = a.offset(), c = a.hasClass("dropup") ? 0 : a[0].offsetHeight, f.css({
                            top: b.top + c,
                            left: b.left,
                            width: a[0].offsetWidth,
                            position: "absolute"
                        })
                    };
                this.$newElement.on("click", function() {
                    d.isDisabled() || (g(a(this)), f.appendTo(d.options.container), f.toggleClass("open", !a(this).hasClass("open")), f.append(d.$menu))
                }), a(window).on("resize scroll", function() {
                    g(d.$newElement)
                }), this.$element.on("hide.bs.select", function() {
                    d.$menu.data("height", d.$menu.height()), f.detach()
                })
            },
            setSelected: function(a, b, c) {
                if (!c) var c = this.findLis().eq(this.liObj[a]);
                c.toggleClass("selected", b)
            },
            setDisabled: function(a, b, c) {
                if (!c) var c = this.findLis().eq(this.liObj[a]);
                b ? c.addClass("disabled").children("a").attr("href", "#").attr("tabindex", -1) : c.removeClass("disabled").children("a").removeAttr("href").attr("tabindex", 0)
            },
            isDisabled: function() {
                return this.$element[0].disabled
            },
            checkDisabled: function() {
                var a = this;
                this.isDisabled() ? (this.$newElement.addClass("disabled"), this.$button.addClass("disabled").attr("tabindex", -1)) : (this.$button.hasClass("disabled") && (this.$newElement.removeClass("disabled"), this.$button.removeClass("disabled")), -1 != this.$button.attr("tabindex") || this.$element.data("tabindex") || this.$button.removeAttr("tabindex")), this.$button.click(function() {
                    return !a.isDisabled()
                })
            },
            tabIndex: function() {
                this.$element.is("[tabindex]") && (this.$element.data("tabindex", this.$element.attr("tabindex")), this.$button.attr("tabindex", this.$element.data("tabindex")))
            },
            clickListener: function() {
                var b = this,
                    c = a(document);
                this.$newElement.on("touchstart.dropdown", ".dropdown-menu", function(a) {
                    a.stopPropagation()
                }), c.data("spaceSelect", !1), this.$button.on("keyup", function(a) {
                    /(32)/.test(a.keyCode.toString(10)) && c.data("spaceSelect") && (a.preventDefault(), c.data("spaceSelect", !1))
                }), this.$newElement.on("click", function() {
                    b.setSize(), b.$element.on("shown.bs.select", function() {
                        if (b.options.liveSearch || b.multiple) {
                            if (!b.multiple) {
                                var a = b.liObj[b.$element[0].selectedIndex];
                                if ("number" != typeof a) return;
                                var c = b.$lis.eq(a)[0].offsetTop - b.$menuInner[0].offsetTop;
                                c = c - b.$menuInner[0].offsetHeight / 2 + b.sizeInfo.liHeight / 2, b.$menuInner[0].scrollTop = c
                            }
                        } else b.$menu.find(".selected a").focus()
                    })
                }), this.$menu.on("click", "li a", function(c) {
                    var d = a(this),
                        e = d.parent().data("originalIndex"),
                        f = b.$element.val(),
                        g = b.$element.prop("selectedIndex");
                    if (b.multiple && c.stopPropagation(), c.preventDefault(), !b.isDisabled() && !d.parent().hasClass("disabled")) {
                        var h = b.$element.find("option"),
                            i = h.eq(e),
                            j = i.prop("selected"),
                            k = i.parent("optgroup"),
                            l = b.options.maxOptions,
                            m = k.data("maxOptions") || !1;
                        if (b.multiple) {
                            if (i.prop("selected", !j), b.setSelected(e, !j), d.blur(), l !== !1 || m !== !1) {
                                var n = l < h.filter(":selected").length,
                                    o = m < k.find("option:selected").length;
                                if (l && n || m && o)
                                    if (l && 1 == l) h.prop("selected", !1), i.prop("selected", !0), b.$menu.find(".selected").removeClass("selected"), b.setSelected(e, !0);
                                    else if (m && 1 == m) {
                                    k.find("option:selected").prop("selected", !1), i.prop("selected", !0);
                                    var p = d.parent().data("optgroup");
                                    b.$menu.find('[data-optgroup="' + p + '"]').removeClass("selected"), b.setSelected(e, !0)
                                } else {
                                    var q = "function" == typeof b.options.maxOptionsText ? b.options.maxOptionsText(l, m) : b.options.maxOptionsText,
                                        r = q[0].replace("{n}", l),
                                        s = q[1].replace("{n}", m),
                                        t = a('<div class="notify"></div>');
                                    q[2] && (r = r.replace("{var}", q[2][l > 1 ? 0 : 1]), s = s.replace("{var}", q[2][m > 1 ? 0 : 1])), i.prop("selected", !1), b.$menu.append(t), l && n && (t.append(a("<div>" + r + "</div>")), b.$element.trigger("maxReached.bs.select")), m && o && (t.append(a("<div>" + s + "</div>")), b.$element.trigger("maxReachedGrp.bs.select")), setTimeout(function() {
                                        b.setSelected(e, !1)
                                    }, 10), t.delay(750).fadeOut(300, function() {
                                        a(this).remove()
                                    })
                                }
                            }
                        } else h.prop("selected", !1), i.prop("selected", !0), b.$menu.find(".selected").removeClass("selected"), b.setSelected(e, !0);
                        b.multiple ? b.options.liveSearch && b.$searchbox.focus() : b.$button.focus(), (f != b.$element.val() && b.multiple || g != b.$element.prop("selectedIndex") && !b.multiple) && (b.$element.change(), b.$element.trigger("changed.bs.select", [e, i.prop("selected"), j]))
                    }
                }), this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function(c) {
                    c.currentTarget == this && (c.preventDefault(), c.stopPropagation(), b.options.liveSearch && !a(c.target).hasClass("close") ? b.$searchbox.focus() : b.$button.focus())
                }), this.$menu.on("click", "li.divider, li.dropdown-header", function(a) {
                    a.preventDefault(), a.stopPropagation(), b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus()
                }), this.$menu.on("click", ".popover-title .close", function() {
                    b.$button.click()
                }), this.$searchbox.on("click", function(a) {
                    a.stopPropagation()
                }), this.$menu.on("click", ".actions-btn", function(c) {
                    b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus(), c.preventDefault(), c.stopPropagation(), a(this).hasClass("bs-select-all") ? b.selectAll() : b.deselectAll(), b.$element.change()
                }), this.$element.change(function() {
                    b.render(!1)
                })
            },
            liveSearchListener: function() {
                var d = this,
                    e = a('<li class="no-results"></li>');
                this.$newElement.on("click.dropdown.data-api touchstart.dropdown.data-api", function() {
                    d.$menuInner.find(".active").removeClass("active"), d.$searchbox.val() && (d.$searchbox.val(""), d.$lis.not(".is-hidden").removeClass("hidden"), e.parent().length && e.remove()), d.multiple || d.$menuInner.find(".selected").addClass("active"), setTimeout(function() {
                        d.$searchbox.focus()
                    }, 10)
                }), this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", function(a) {
                    a.stopPropagation()
                }), this.$searchbox.on("input propertychange", function() {
                    if (d.$searchbox.val()) {
                        var f = d.$lis.not(".is-hidden").removeClass("hidden").children("a");
                        f = d.options.liveSearchNormalize ? f.not(":a" + d._searchStyle() + "(" + b(d.$searchbox.val()) + ")") : f.not(":" + d._searchStyle() + "(" + d.$searchbox.val() + ")"), f.parent().addClass("hidden"), d.$lis.filter(".dropdown-header").each(function() {
                            var b = a(this),
                                c = b.data("optgroup");
                            0 === d.$lis.filter("[data-optgroup=" + c + "]").not(b).not(".hidden").length && (b.addClass("hidden"), d.$lis.filter("[data-optgroup=" + c + "div]").addClass("hidden"))
                        });
                        var g = d.$lis.not(".hidden");
                        g.each(function(b) {
                            var c = a(this);
                            c.hasClass("divider") && (c.index() === g.eq(0).index() || c.index() === g.last().index() || g.eq(b + 1).hasClass("divider")) && c.addClass("hidden")
                        }), d.$lis.not(".hidden, .no-results").length ? e.parent().length && e.remove() : (e.parent().length && e.remove(), e.html(d.options.noneResultsText.replace("{0}", '"' + c(d.$searchbox.val()) + '"')).show(), d.$menuInner.append(e))
                    } else d.$lis.not(".is-hidden").removeClass("hidden"), e.parent().length && e.remove();
                    d.$lis.filter(".active").removeClass("active"), d.$lis.not(".hidden, .divider, .dropdown-header").eq(0).addClass("active").children("a").focus(), a(this).focus()
                })
            },
            _searchStyle: function() {
                var a = "icontains";
                switch (this.options.liveSearchStyle) {
                    case "begins":
                    case "startsWith":
                        a = "ibegins";
                        break;
                    case "contains":
                }
                return a
            },
            val: function(a) {
                return "undefined" != typeof a ? (this.$element.val(a), this.render(), this.$element) : this.$element.val()
            },
            selectAll: function() {
                this.findLis(), this.$element.find("option:enabled").not("[data-divider], [data-hidden]").prop("selected", !0), this.$lis.not(".divider, .dropdown-header, .disabled, .hidden").addClass("selected"), this.render(!1)
            },
            deselectAll: function() {
                this.findLis(), this.$element.find("option:enabled").not("[data-divider], [data-hidden]").prop("selected", !1), this.$lis.not(".divider, .dropdown-header, .disabled, .hidden").removeClass("selected"), this.render(!1)
            },
            keydown: function(c) {
                var d, e, f, g, h, i, j, k, l, m = a(this),
                    n = m.is("input") ? m.parent().parent() : m.parent(),
                    o = n.data("this"),
                    p = ":not(.disabled, .hidden, .dropdown-header, .divider)",
                    q = {
                        32: " ",
                        48: "0",
                        49: "1",
                        50: "2",
                        51: "3",
                        52: "4",
                        53: "5",
                        54: "6",
                        55: "7",
                        56: "8",
                        57: "9",
                        59: ";",
                        65: "a",
                        66: "b",
                        67: "c",
                        68: "d",
                        69: "e",
                        70: "f",
                        71: "g",
                        72: "h",
                        73: "i",
                        74: "j",
                        75: "k",
                        76: "l",
                        77: "m",
                        78: "n",
                        79: "o",
                        80: "p",
                        81: "q",
                        82: "r",
                        83: "s",
                        84: "t",
                        85: "u",
                        86: "v",
                        87: "w",
                        88: "x",
                        89: "y",
                        90: "z",
                        96: "0",
                        97: "1",
                        98: "2",
                        99: "3",
                        100: "4",
                        101: "5",
                        102: "6",
                        103: "7",
                        104: "8",
                        105: "9"
                    };
                if (o.options.liveSearch && (n = m.parent().parent()), o.options.container && (n = o.$menu), d = a("[role=menu] li a", n), l = o.$menu.parent().hasClass("open"), !l && (c.keyCode >= 48 && c.keyCode <= 57 || event.keyCode >= 65 && event.keyCode <= 90) && (o.options.container ? o.$newElement.trigger("click") : (o.setSize(), o.$menu.parent().addClass("open"), l = !0), o.$searchbox.focus()), o.options.liveSearch && (/(^9$|27)/.test(c.keyCode.toString(10)) && l && 0 === o.$menu.find(".active").length && (c.preventDefault(), o.$menu.parent().removeClass("open"), o.options.container && o.$newElement.removeClass("open"), o.$button.focus()), d = a("[role=menu] li:not(.disabled, .hidden, .dropdown-header, .divider)", n), m.val() || /(38|40)/.test(c.keyCode.toString(10)) || 0 === d.filter(".active").length && (d = o.$newElement.find("li"), d = o.options.liveSearchNormalize ? d.filter(":a" + o._searchStyle() + "(" + b(q[c.keyCode]) + ")") : d.filter(":" + o._searchStyle() + "(" + q[c.keyCode] + ")"))), d.length) {
                    if (/(38|40)/.test(c.keyCode.toString(10))) e = d.index(d.filter(":focus")), g = d.parent(p).first().data("originalIndex"), h = d.parent(p).last().data("originalIndex"), f = d.eq(e).parent().nextAll(p).eq(0).data("originalIndex"), i = d.eq(e).parent().prevAll(p).eq(0).data("originalIndex"), j = d.eq(f).parent().prevAll(p).eq(0).data("originalIndex"), o.options.liveSearch && (d.each(function(b) {
                        a(this).hasClass("disabled") || a(this).data("index", b)
                    }), e = d.index(d.filter(".active")), g = d.first().data("index"), h = d.last().data("index"), f = d.eq(e).nextAll().eq(0).data("index"), i = d.eq(e).prevAll().eq(0).data("index"), j = d.eq(f).prevAll().eq(0).data("index")), k = m.data("prevIndex"), 38 == c.keyCode ? (o.options.liveSearch && (e -= 1), e != j && e > i && (e = i), g > e && (e = g), e == k && (e = h)) : 40 == c.keyCode && (o.options.liveSearch && (e += 1), -1 == e && (e = 0), e != j && f > e && (e = f), e > h && (e = h), e == k && (e = g)), m.data("prevIndex", e), o.options.liveSearch ? (c.preventDefault(), m.hasClass("dropdown-toggle") || (d.removeClass("active").eq(e).addClass("active").children("a").focus(), m.focus())) : d.eq(e).focus();
                    else if (!m.is("input")) {
                        var r, s, t = [];
                        d.each(function() {
                            a(this).parent().hasClass("disabled") || a.trim(a(this).text().toLowerCase()).substring(0, 1) == q[c.keyCode] && t.push(a(this).parent().index())
                        }), r = a(document).data("keycount"), r++, a(document).data("keycount", r), s = a.trim(a(":focus").text().toLowerCase()).substring(0, 1), s != q[c.keyCode] ? (r = 1, a(document).data("keycount", r)) : r >= t.length && (a(document).data("keycount", 0), r > t.length && (r = 1)), d.eq(t[r - 1]).focus()
                    }
                    if ((/(13|32)/.test(c.keyCode.toString(10)) || /(^9$)/.test(c.keyCode.toString(10)) && o.options.selectOnTab) && l) {
                        if (/(32)/.test(c.keyCode.toString(10)) || c.preventDefault(), o.options.liveSearch) /(32)/.test(c.keyCode.toString(10)) || (o.$menu.find(".active a").click(), m.focus());
                        else {
                            var u = a(":focus");
                            u.click(), u.focus(), c.preventDefault(), a(document).data("spaceSelect", !0)
                        }
                        a(document).data("keycount", 0)
                    }(/(^9$|27)/.test(c.keyCode.toString(10)) && l && (o.multiple || o.options.liveSearch) || /(27)/.test(c.keyCode.toString(10)) && !l) && (o.$menu.parent().removeClass("open"), o.options.container && o.$newElement.removeClass("open"), o.$button.focus())
                }
            },
            mobile: function() {
                this.$element.addClass("mobile-device").appendTo(this.$newElement), this.options.container && this.$menu.hide()
            },
            refresh: function() {
                this.$lis = null, this.reloadLi(), this.render(), this.checkDisabled(), this.liHeight(!0), this.setStyle(), this.setWidth(), this.$lis && this.$searchbox.trigger("propertychange"), this.$element.trigger("refreshed.bs.select")
            },
            hide: function() {
                this.$newElement.hide()
            },
            show: function() {
                this.$newElement.show()
            },
            remove: function() {
                this.$newElement.remove(), this.$element.remove()
            }
        };
        var f = a.fn.selectpicker;
        a.fn.selectpicker = d, a.fn.selectpicker.Constructor = e, a.fn.selectpicker.noConflict = function() {
            return a.fn.selectpicker = f, this
        }, a(document).data("keycount", 0).on("keydown", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', e.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', function(a) {
            a.stopPropagation()
        }), a(window).on("load.bs.select.data-api", function() {
            a(".selectpicker").each(function() {
                var b = a(this);
                d.call(b, b.data())
            })
        })
    }(jQuery)
});
(function(c) {
    function m(a, c, d) {
        if ((a[c] || a[d]) && a[c] === a[d]) throw Error("(Link) '" + c + "' can't match '" + d + "'.'");
    }

    function r(a) {
        void 0 === a && (a = {});
        if ("object" !== typeof a) throw Error("(Format) 'format' option must be an object.");
        var h = {};
        c(u).each(function(c, n) {
            if (void 0 === a[n]) h[n] = A[c];
            else if (typeof a[n] === typeof A[c]) {
                if ("decimals" === n && (0 > a[n] || 7 < a[n])) throw Error("(Format) 'format.decimals' option must be between 0 and 7.");
                h[n] = a[n]
            } else throw Error("(Format) 'format." + n + "' must be a " + typeof A[c] + ".");
        });
        m(h, "mark", "thousand");
        m(h, "prefix", "negative");
        m(h, "prefix", "negativeBefore");
        this.r = h
    }

    function k(a, h) {
        "object" !== typeof a && c.error("(Link) Initialize with an object.");
        return new k.prototype.p(a.target || function() {}, a.method, a.format || {}, h)
    }
    var u = "decimals mark thousand prefix postfix encoder decoder negative negativeBefore to from".split(" "),
        A = [2, ".", "", "", "", function(a) {
            return a
        }, function(a) {
            return a
        }, "-", "", function(a) {
            return a
        }, function(a) {
            return a
        }];
    r.prototype.a = function(a) {
        return this.r[a]
    };
    r.prototype.L = function(a) {
        function c(a) {
            return a.split("").reverse().join("")
        }
        a = this.a("encoder")(a);
        var d = this.a("decimals"),
            n = "",
            k = "",
            m = "",
            r = "";
        0 === parseFloat(a.toFixed(d)) && (a = "0");
        0 > a && (n = this.a("negative"), k = this.a("negativeBefore"));
        a = Math.abs(a).toFixed(d).toString();
        a = a.split(".");
        this.a("thousand") ? (m = c(a[0]).match(/.{1,3}/g), m = c(m.join(c(this.a("thousand"))))) : m = a[0];
        this.a("mark") && 1 < a.length && (r = this.a("mark") + a[1]);
        return this.a("to")(k + this.a("prefix") + n + m + r + this.a("postfix"))
    };
    r.prototype.w = function(a) {
        function c(a) {
            return a.replace(/[\-\/\\\^$*+?.()|\[\]{}]/g, "\\$&")
        }
        var d;
        if (null === a || void 0 === a) return !1;
        a = this.a("from")(a);
        a = a.toString();
        d = a.replace(RegExp("^" + c(this.a("negativeBefore"))), "");
        a !== d ? (a = d, d = "-") : d = "";
        a = a.replace(RegExp("^" + c(this.a("prefix"))), "");
        this.a("negative") && (d = "", a = a.replace(RegExp("^" + c(this.a("negative"))), "-"));
        a = a.replace(RegExp(c(this.a("postfix")) + "$"), "").replace(RegExp(c(this.a("thousand")), "g"), "").replace(this.a("mark"), ".");
        a = this.a("decoder")(parseFloat(d + a));
        return isNaN(a) ? !1 : a
    };
    k.prototype.K = function(a, h) {
        this.method = h || "html";
        this.j = c(a.replace("-tooltip-", "") || "<div/>")[0]
    };
    k.prototype.H = function(a) {
        this.method = "val";
        this.j = document.createElement("input");
        this.j.name = a;
        this.j.type = "hidden"
    };
    k.prototype.G = function(a) {
        function h(a, c) {
            return [c ? null : a, c ? a : null]
        }
        var d = this;
        this.method = "val";
        this.target = a.on("change", function(a) {
            d.B.val(h(c(a.target).val(), d.t), {
                link: d,
                set: !0
            })
        })
    };
    k.prototype.p = function(a, h, d, k) {
        this.g = d;
        this.update = !k;
        if ("string" === typeof a && 0 === a.indexOf("-tooltip-")) this.K(a, h);
        else if ("string" === typeof a && 0 !== a.indexOf("-")) this.H(a);
        else if ("function" === typeof a) this.target = !1, this.method = a;
        else {
            if (a instanceof c || c.zepto && c.zepto.isZ(a)) {
                if (!h) {
                    if (a.is("input, select, textarea")) {
                        this.G(a);
                        return
                    }
                    h = "html"
                }
                if ("function" === typeof h || "string" === typeof h && a[h]) {
                    this.method = h;
                    this.target = a;
                    return
                }
            }
            throw new RangeError("(Link) Invalid Link.");
        }
    };
    k.prototype.write = function(a, c, d, k) {
        if (!this.update || !1 !== k)
            if (this.u = a, this.F = a = this.format(a), "function" === typeof this.method) this.method.call(this.target[0] || d[0], a, c, d);
            else this.target[this.method](a, c, d)
    };
    k.prototype.q = function(a) {
        this.g = new r(c.extend({}, a, this.g instanceof r ? this.g.r : this.g))
    };
    k.prototype.J = function(a) {
        this.B = a
    };
    k.prototype.I = function(a) {
        this.t = a
    };
    k.prototype.format = function(a) {
        return this.g.L(a)
    };
    k.prototype.A = function(a) {
        return this.g.w(a)
    };
    k.prototype.p.prototype = k.prototype;
    c.Link = k
})(window.jQuery || window.Zepto);
(function(c) {
    function m(e) {
        return "number" === typeof e && !isNaN(e) && isFinite(e)
    }

    function r(e) {
        return c.isArray(e) ? e : [e]
    }

    function k(e, b) {
        e.addClass(b);
        setTimeout(function() {
            e.removeClass(b)
        }, 300)
    }

    function u(e, b) {
        return 100 * b / (e[1] - e[0])
    }

    function A(e, b) {
        if (b >= e.d.slice(-1)[0]) return 100;
        for (var a = 1, c, f, d; b >= e.d[a];) a++;
        c = e.d[a - 1];
        f = e.d[a];
        d = e.c[a - 1];
        c = [c, f];
        return d + u(c, 0 > c[0] ? b + Math.abs(c[0]) : b - c[0]) / (100 / (e.c[a] - d))
    }

    function a(e, b) {
        if (100 <= b) return e.d.slice(-1)[0];
        for (var a = 1, c, f, d; b >= e.c[a];) a++;
        c = e.d[a - 1];
        f = e.d[a];
        d = e.c[a - 1];
        c = [c, f];
        return 100 / (e.c[a] - d) * (b - d) * (c[1] - c[0]) / 100 + c[0]
    }

    function h(a, b) {
        for (var c = 1, g;
            (a.dir ? 100 - b : b) >= a.c[c];) c++;
        if (a.m) return g = a.c[c - 1], c = a.c[c], b - g > (c - g) / 2 ? c : g;
        a.h[c - 1] ? (g = a.h[c - 1], c = a.c[c - 1] + Math.round((b - a.c[c - 1]) / g) * g) : c = b;
        return c
    }

    function d(a, b) {
        if (!m(b)) throw Error("noUiSlider: 'step' is not numeric.");
        a.h[0] = b
    }

    function n(a, b) {
        if ("object" !== typeof b || c.isArray(b)) throw Error("noUiSlider: 'range' is not an object.");
        if (void 0 === b.min || void 0 === b.max) throw Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
        c.each(b, function(b, g) {
            var d;
            "number" === typeof g && (g = [g]);
            if (!c.isArray(g)) throw Error("noUiSlider: 'range' contains invalid value.");
            d = "min" === b ? 0 : "max" === b ? 100 : parseFloat(b);
            if (!m(d) || !m(g[0])) throw Error("noUiSlider: 'range' value isn't numeric.");
            a.c.push(d);
            a.d.push(g[0]);
            d ? a.h.push(isNaN(g[1]) ? !1 : g[1]) : isNaN(g[1]) || (a.h[0] = g[1])
        });
        c.each(a.h, function(b, c) {
            if (!c) return !0;
            a.h[b] = u([a.d[b], a.d[b + 1]], c) / (100 / (a.c[b + 1] - a.c[b]))
        })
    }

    function E(a, b) {
        "number" === typeof b && (b = [b]);
        if (!c.isArray(b) || !b.length || 2 < b.length) throw Error("noUiSlider: 'start' option is incorrect.");
        a.b = b.length;
        a.start = b
    }

    function I(a, b) {
        a.m = b;
        if ("boolean" !== typeof b) throw Error("noUiSlider: 'snap' option must be a boolean.");
    }

    function J(a, b) {
        if ("lower" === b && 1 === a.b) a.i = 1;
        else if ("upper" === b && 1 === a.b) a.i = 2;
        else if (!0 === b && 2 === a.b) a.i = 3;
        else if (!1 === b) a.i = 0;
        else throw Error("noUiSlider: 'connect' option doesn't match handle count.");
    }

    function D(a, b) {
        switch (b) {
            case "horizontal":
                a.k = 0;
                break;
            case "vertical":
                a.k = 1;
                break;
            default:
                throw Error("noUiSlider: 'orientation' option is invalid.");
        }
    }

    function K(a, b) {
        if (2 < a.c.length) throw Error("noUiSlider: 'margin' option is only supported on linear sliders.");
        a.margin = u(a.d, b);
        if (!m(b)) throw Error("noUiSlider: 'margin' option must be numeric.");
    }

    function L(a, b) {
        switch (b) {
            case "ltr":
                a.dir = 0;
                break;
            case "rtl":
                a.dir = 1;
                a.i = [0, 2, 1, 3][a.i];
                break;
            default:
                throw Error("noUiSlider: 'direction' option was not recognized.");
        }
    }

    function M(a, b) {
        if ("string" !== typeof b) throw Error("noUiSlider: 'behaviour' must be a string containing options.");
        var c = 0 <= b.indexOf("snap");
        a.n = {
            s: 0 <= b.indexOf("tap") || c,
            extend: 0 <= b.indexOf("extend"),
            v: 0 <= b.indexOf("drag"),
            fixed: 0 <= b.indexOf("fixed"),
            m: c
        }
    }

    function N(a, b, d) {
        a.o = [b.lower, b.upper];
        a.g = b.format;
        c.each(a.o, function(a, e) {
            if (!c.isArray(e)) throw Error("noUiSlider: 'serialization." + (a ? "upper" : "lower") + "' must be an array.");
            c.each(e, function() {
                if (!(this instanceof c.Link)) throw Error("noUiSlider: 'serialization." + (a ? "upper" : "lower") + "' can only contain Link instances.");
                this.I(a);
                this.J(d);
                this.q(b.format)
            })
        });
        a.dir && 1 < a.b && a.o.reverse()
    }

    function O(a, b) {
        var f = {
                c: [],
                d: [],
                h: [!1],
                margin: 0
            },
            g;
        g = {
            step: {
                e: !1,
                f: d
            },
            start: {
                e: !0,
                f: E
            },
            connect: {
                e: !0,
                f: J
            },
            direction: {
                e: !0,
                f: L
            },
            range: {
                e: !0,
                f: n
            },
            snap: {
                e: !1,
                f: I
            },
            orientation: {
                e: !1,
                f: D
            },
            margin: {
                e: !1,
                f: K
            },
            behaviour: {
                e: !0,
                f: M
            },
            serialization: {
                e: !0,
                f: N
            }
        };
        a = c.extend({
            connect: !1,
            direction: "ltr",
            behaviour: "tap",
            orientation: "horizontal"
        }, a);
        a.serialization = c.extend({
            lower: [],
            upper: [],
            format: {}
        }, a.serialization);
        c.each(g, function(c, d) {
            if (void 0 === a[c]) {
                if (d.e) throw Error("noUiSlider: '" + c + "' is required.");
                return !0
            }
            d.f(f, a[c], b)
        });
        f.style = f.k ? "top" : "left";
        return f
    }

    function P(a, b) {
        var d = c("<div><div/></div>").addClass(f[2]),
            g = ["-lower", "-upper"];
        a.dir && g.reverse();
        d.children().addClass(f[3] + " " + f[3] + g[b]);
        return d
    }

    function Q(a, b) {
        b.j && (b = new c.Link({
            target: c(b.j).clone().appendTo(a),
            method: b.method,
            format: b.g
        }, !0));
        return b
    }

    function R(a, b) {
        var d, f = [];
        for (d = 0; d < a.b; d++) {
            var k = f,
                h = d,
                m = a.o[d],
                n = b[d].children(),
                r = a.g,
                s = void 0,
                v = [],
                s = new c.Link({}, !0);
            s.q(r);
            v.push(s);
            for (s = 0; s < m.length; s++) v.push(Q(n, m[s]));
            k[h] = v
        }
        return f
    }

    function S(a, b, c) {
        switch (a) {
            case 1:
                b.addClass(f[7]);
                c[0].addClass(f[6]);
                break;
            case 3:
                c[1].addClass(f[6]);
            case 2:
                c[0].addClass(f[7]);
            case 0:
                b.addClass(f[6])
        }
    }

    function T(a, b) {
        var c, d = [];
        for (c = 0; c < a.b; c++) d.push(P(a, c).appendTo(b));
        return d
    }

    function U(a, b) {
        b.addClass([f[0], f[8 + a.dir], f[4 + a.k]].join(" "));
        return c("<div/>").appendTo(b).addClass(f[1])
    }

    function V(d, b, m) {
        function g() {
            return t[["width", "height"][b.k]]()
        }

        function n(a) {
            var b, c = [q.val()];
            for (b = 0; b < a.length; b++) q.trigger(a[b], c)
        }

        function u(d, p, e) {
            var g = d[0] !== l[0][0] ? 1 : 0,
                H = x[0] + b.margin,
                k = x[1] - b.margin;
            e && 1 < l.length && (p = g ? Math.max(p, H) : Math.min(p, k));
            100 > p && (p = h(b, p));
            p = Math.max(Math.min(parseFloat(p.toFixed(7)), 100), 0);
            if (p === x[g]) return 1 === l.length ? !1 : p === H || p === k ? 0 : !1;
            d.css(b.style, p + "%");
            d.is(":first-child") && d.toggleClass(f[17], 50 < p);
            x[g] = p;
            b.dir && (p = 100 - p);
            c(y[g]).each(function() {
                this.write(a(b, p), d.children(), q)
            });
            return !0
        }

        function B(a, b, c) {
            c || k(q, f[14]);
            u(a, b, !1);
            n(["slide", "set", "change"])
        }

        function w(a, c, d, e) {
            a = a.replace(/\s/g, ".nui ") + ".nui";
            c.on(a, function(a) {
                var c = q.attr("disabled");
                if (q.hasClass(f[14]) || void 0 !== c && null !== c) return !1;
                a.preventDefault();
                var c = 0 === a.type.indexOf("touch"),
                    p = 0 === a.type.indexOf("mouse"),
                    F = 0 === a.type.indexOf("pointer"),
                    g, k, l = a;
                0 === a.type.indexOf("MSPointer") && (F = !0);
                a.originalEvent && (a = a.originalEvent);
                c && (g = a.changedTouches[0].pageX, k = a.changedTouches[0].pageY);
                if (p || F) F || void 0 !== window.pageXOffset || (window.pageXOffset = document.documentElement.scrollLeft, window.pageYOffset = document.documentElement.scrollTop), g = a.clientX + window.pageXOffset, k = a.clientY + window.pageYOffset;
                l.C = [g, k];
                l.cursor = p;
                a = l;
                a.l = a.C[b.k];
                d(a, e)
            })
        }

        function C(a, c) {
            var b = c.b || l,
                d, e = !1,
                e = 100 * (a.l - c.start) / g(),
                f = b[0][0] !== l[0][0] ? 1 : 0;
            var k = c.D;
            d = e + k[0];
            e += k[1];
            1 < b.length ? (0 > d && (e += Math.abs(d)), 100 < e && (d -= e - 100), d = [Math.max(Math.min(d, 100), 0), Math.max(Math.min(e, 100), 0)]) : d = [d, e];
            e = u(b[0], d[f], 1 === b.length);
            1 < b.length && (e = u(b[1], d[f ? 0 : 1], !1) || e);
            e && n(["slide"])
        }

        function s(a) {
            c("." + f[15]).removeClass(f[15]);
            a.cursor && c("body").css("cursor", "").off(".nui");
            G.off(".nui");
            q.removeClass(f[12]);
            n(["set", "change"])
        }

        function v(a, b) {
            1 === b.b.length && b.b[0].children().addClass(f[15]);
            a.stopPropagation();
            w(z.move, G, C, {
                start: a.l,
                b: b.b,
                D: [x[0], x[l.length - 1]]
            });
            w(z.end, G, s, null);
            a.cursor && (c("body").css("cursor", c(a.target).css("cursor")), 1 < l.length && q.addClass(f[12]), c("body").on("selectstart.nui", !1))
        }

        function D(a) {
            var d = a.l,
                e = 0;
            a.stopPropagation();
            c.each(l, function() {
                e += this.offset()[b.style]
            });
            e = d < e / 2 || 1 === l.length ? 0 : 1;
            d -= t.offset()[b.style];
            d = 100 * d / g();
            B(l[e], d, b.n.m);
            b.n.m && v(a, {
                b: [l[e]]
            })
        }

        function E(a) {
            var c = (a = a.l < t.offset()[b.style]) ? 0 : 100;
            a = a ? 0 : l.length - 1;
            B(l[a], c, !1)
        }
        var q = c(d),
            x = [-1, -1],
            t, y, l;
        if (q.hasClass(f[0])) throw Error("Slider was already initialized.");
        t = U(b, q);
        l = T(b, t);
        y = R(b, l);
        S(b.i, q, l);
        (function(a) {
            var b;
            if (!a.fixed)
                for (b = 0; b < l.length; b++) w(z.start, l[b].children(), v, {
                    b: [l[b]]
                });
            a.s && w(z.start, t, D, {
                b: l
            });
            a.extend && (q.addClass(f[16]), a.s && w(z.start, q, E, {
                b: l
            }));
            a.v && (b = t.find("." + f[7]).addClass(f[10]), a.fixed && (b = b.add(t.children().not(b).children())), w(z.start, b, v, {
                b: l
            }))
        })(b.n);
        d.vSet = function() {
            var a = Array.prototype.slice.call(arguments, 0),
                d, e, g, h, m, s, t = r(a[0]);
            "object" === typeof a[1] ? (d = a[1].set, e = a[1].link, g = a[1].update, h = a[1].animate) : !0 === a[1] && (d = !0);
            b.dir && 1 < b.b && t.reverse();
            h && k(q, f[14]);
            a = 1 < l.length ? 3 : 1;
            1 === t.length && (a = 1);
            for (m = 0; m < a; m++) h = e || y[m % 2][0], h = h.A(t[m % 2]), !1 !== h && (h = A(b, h), b.dir && (h = 100 - h), !0 !== u(l[m % 2], h, !0) && c(y[m % 2]).each(function(a) {
                if (!a) return s = this.u, !0;
                this.write(s, l[m % 2].children(), q, g)
            }));
            !0 === d && n(["set"]);
            return this
        };
        d.vGet = function() {
            var a, c = [];
            for (a = 0; a < b.b; a++) c[a] = y[a][0].F;
            return 1 === c.length ? c[0] : b.dir ? c.reverse() : c
        };
        d.destroy = function() {
            c.each(y, function() {
                c.each(this, function() {
                    this.target && this.target.off(".nui")
                })
            });
            c(this).off(".nui").removeClass(f.join(" ")).empty();
            return m
        };
        q.val(b.start)
    }

    function W(a) {
        if (!this.length) throw Error("noUiSlider: Can't initialize slider on empty selection.");
        var b = O(a, this);
        return this.each(function() {
            V(this, b, a)
        })
    }

    function X(a) {
        return this.each(function() {
            var b = c(this).val(),
                d = this.destroy(),
                f = c.extend({}, d, a);
            c(this).noUiSlider(f);
            d.start === f.start && c(this).val(b)
        })
    }

    function B() {
        return this[0][arguments.length ? "vSet" : "vGet"].apply(this[0], arguments)
    }
    var G = c(document),
        C = c.fn.val,
        z = window.navigator.pointerEnabled ? {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup"
        } : window.navigator.msPointerEnabled ? {
            start: "MSPointerDown",
            move: "MSPointerMove",
            end: "MSPointerUp"
        } : {
            start: "mousedown touchstart",
            move: "mousemove touchmove",
            end: "mouseup touchend"
        },
        f = "noUi-target noUi-base noUi-origin noUi-handle noUi-horizontal noUi-vertical noUi-background noUi-connect noUi-ltr noUi-rtl noUi-dragable  noUi-state-drag  noUi-state-tap noUi-active noUi-extended noUi-stacking".split(" ");
    c.fn.val = function() {
        var a = arguments,
            b = c(this[0]);
        return arguments.length ? this.each(function() {
            (c(this).hasClass(f[0]) ? B : C).apply(c(this), a)
        }) : (b.hasClass(f[0]) ? B : C).call(b)
    };
    c.noUiSlider = {
        Link: c.Link
    };
    c.fn.noUiSlider = function(a, b) {
        return (b ? X : W).call(this, a)
    }
})(window.jQuery || window.Zepto);
(function(window, $) {
    var Superslides, plugin = 'superslides';
    Superslides = function(el, options) {
        this.options = $.extend({
            play: false,
            animation_speed: 600,
            animation_easing: 'swing',
            animation: 'slide',
            inherit_width_from: window,
            inherit_height_from: window,
            pagination: true,
            hashchange: false,
            scrollable: true,
            elements: {
                preserve: '.preserve',
                nav: '.slides-navigation',
                container: '.slides-container',
                pagination: '.slides-pagination'
            }
        }, options);
        var that = this,
            $control = $('<div>', {
                "class": 'slides-control'
            }),
            multiplier = 1;
        this.$el = $(el);
        this.$container = this.$el.find(this.options.elements.container);
        var initialize = function() {
            multiplier = that._findMultiplier();
            that.$el.on('click', that.options.elements.nav + " a", function(e) {
                e.preventDefault();
                that.stop();
                if ($(this).hasClass('next')) {
                    that.animate('next', function() {
                        that.start();
                    });
                } else {
                    that.animate('prev', function() {
                        that.start();
                    });
                }
            });
            $(document).on('keyup', function(e) {
                if (e.keyCode === 37) {
                    that.animate('prev');
                }
                if (e.keyCode === 39) {
                    that.animate('next');
                }
            });
            $(window).on('resize', function() {
                setTimeout(function() {
                    var $children = that.$container.children();
                    that.width = that._findWidth();
                    that.height = that._findHeight();
                    $children.css({
                        width: that.width,
                        left: that.width
                    });
                    that.css.containers();
                    that.css.images();
                }, 10);
            });
            $(window).on('hashchange', function() {
                var hash = that._parseHash(),
                    index;
                if (hash && !isNaN(hash)) {
                    index = that._upcomingSlide(hash - 1);
                } else {
                    index = that._upcomingSlide(hash);
                }
                if (index >= 0 && index !== that.current) {
                    that.animate(index);
                }
            });
            that.pagination._events();
            that.start();
            return that;
        };
        var css = {
            containers: function() {
                if (that.init) {
                    that.$el.css({
                        height: that.height
                    });
                    that.$control.css({
                        width: that.width * multiplier,
                        left: -that.width
                    });
                    that.$container.css({});
                } else {
                    $('body').css({
                        margin: 0
                    });
                    that.$el.css({
                        position: 'relative',
                        overflow: 'hidden',
                        width: '100%',
                        height: that.height
                    });
                    that.$control.css({
                        position: 'relative',
                        transform: 'translate3d(0)',
                        height: '100%',
                        width: that.width * multiplier,
                        left: -that.width
                    });
                    that.$container.css({
                        display: 'none',
                        margin: '0',
                        padding: '0',
                        listStyle: 'none',
                        position: 'relative',
                        height: '100%'
                    });
                }
                if (that.size() === 1) {
                    that.$el.find(that.options.elements.nav).hide();
                }
            },
            images: function() {
                var $images = that.$container.find('img').not(that.options.elements.preserve)
                $images.removeAttr('width').removeAttr('height').css({
                    "-webkit-backface-visibility": 'hidden',
                    "-ms-interpolation-mode": 'bicubic',
                    "position": 'absolute',
                    "left": '0',
                    "top": '0',
                    "z-index": '-1',
                    "max-width": 'none'
                });
                $images.each(function() {
                    var image_aspect_ratio = that.image._aspectRatio(this),
                        image = this;
                    if (!$.data(this, 'processed')) {
                        var img = new Image();
                        img.onload = function() {
                            that.image._scale(image, image_aspect_ratio);
                            that.image._center(image, image_aspect_ratio);
                            $.data(image, 'processed', true);
                        };
                        img.src = this.src;
                    } else {
                        that.image._scale(image, image_aspect_ratio);
                        that.image._center(image, image_aspect_ratio);
                    }
                });
            },
            children: function() {
                var $children = that.$container.children();
                if ($children.is('img')) {
                    $children.each(function() {
                        if ($(this).is('img')) {
                            $(this).wrap('<div>');
                            var id = $(this).attr('id');
                            $(this).removeAttr('id');
                            $(this).parent().attr('id', id);
                        }
                    });
                    $children = that.$container.children();
                }
                if (!that.init) {
                    $children.css({
                        display: 'none',
                        left: that.width * 2
                    });
                }
                $children.css({
                    position: 'absolute',
                    overflow: 'hidden',
                    height: '100%',
                    width: that.width,
                    top: 0,
                    zIndex: 0
                });
            }
        }
        var fx = {
            slide: function(orientation, complete) {
                var $children = that.$container.children(),
                    $target = $children.eq(orientation.upcoming_slide);
                $target.css({
                    left: orientation.upcoming_position,
                    display: 'block'
                });
                that.$control.animate({
                    left: orientation.offset
                }, that.options.animation_speed, that.options.animation_easing, function() {
                    if (that.size() > 1) {
                        that.$control.css({
                            left: -that.width
                        });
                        $children.eq(orientation.upcoming_slide).css({
                            left: that.width,
                            zIndex: 2
                        });
                        if (orientation.outgoing_slide >= 0) {
                            $children.eq(orientation.outgoing_slide).css({
                                left: that.width,
                                display: 'none',
                                zIndex: 0
                            });
                        }
                    }
                    complete();
                });
            },
            fade: function(orientation, complete) {
                var that = this,
                    $children = that.$container.children(),
                    $outgoing = $children.eq(orientation.outgoing_slide),
                    $target = $children.eq(orientation.upcoming_slide);
                $target.css({
                    left: this.width,
                    opacity: 1,
                    display: 'block'
                });
                if (orientation.outgoing_slide >= 0) {
                    $outgoing.animate({
                        opacity: 0
                    }, that.options.animation_speed, that.options.animation_easing, function() {
                        if (that.size() > 1) {
                            $children.eq(orientation.upcoming_slide).css({
                                zIndex: 2
                            });
                            if (orientation.outgoing_slide >= 0) {
                                $children.eq(orientation.outgoing_slide).css({
                                    opacity: 1,
                                    display: 'none',
                                    zIndex: 0
                                });
                            }
                        }
                        complete();
                    });
                } else {
                    $target.css({
                        zIndex: 2
                    });
                    complete();
                }
            }
        };
        fx = $.extend(fx, $.fn.superslides.fx);
        var image = {
            _centerY: function(image) {
                var $img = $(image);
                $img.css({
                    top: (that.height - $img.height()) / 2
                });
            },
            _centerX: function(image) {
                var $img = $(image);
                $img.css({
                    left: (that.width - $img.width()) / 2
                });
            },
            _center: function(image) {
                that.image._centerX(image);
                that.image._centerY(image);
            },
            _aspectRatio: function(image) {
                if (!image.naturalHeight && !image.naturalWidth) {
                    var img = new Image();
                    img.src = image.src;
                    image.naturalHeight = img.height;
                    image.naturalWidth = img.width;
                }
                return image.naturalHeight / image.naturalWidth;
            },
            _scale: function(image, image_aspect_ratio) {
                image_aspect_ratio = image_aspect_ratio || that.image._aspectRatio(image);
                var container_aspect_ratio = that.height / that.width,
                    $img = $(image);
                if (container_aspect_ratio > image_aspect_ratio) {
                    $img.css({
                        height: that.height,
                        width: that.height / image_aspect_ratio
                    });
                } else {
                    $img.css({
                        height: that.width * image_aspect_ratio,
                        width: that.width
                    });
                }
            }
        };
        var pagination = {
            _setCurrent: function(i) {
                if (!that.$pagination) {
                    return;
                }
                var $pagination_children = that.$pagination.children();
                $pagination_children.removeClass('current');
                $pagination_children.eq(i).addClass('current');
            },
            _addItem: function(i) {
                var slide_number = i + 1,
                    href = slide_number,
                    $slide = that.$container.children().eq(i),
                    slide_id = $slide.attr('id');
                if (slide_id) {
                    href = slide_id;
                }
                var $item = $("<a>", {
                    'href': "#" + href,
                    'text': href
                });
                $item.appendTo(that.$pagination);
            },
            _setup: function() {
                if (!that.options.pagination || that.size() === 1) {
                    return;
                }
                var $pagination = $("<nav>", {
                    'class': that.options.elements.pagination.replace(/^\./, '')
                });
                that.$pagination = $pagination.appendTo(that.$el);
                for (var i = 0; i < that.size(); i++) {
                    that.pagination._addItem(i);
                }
            },
            _events: function() {
                that.$el.on('click', that.options.elements.pagination + ' a', function(e) {
                    e.preventDefault();
                    var hash = that._parseHash(this.hash),
                        index = that._upcomingSlide(hash - 1);
                    if (index !== that.current) {
                        that.animate(index, function() {
                            that.start();
                        });
                    }
                });
            }
        };
        this.css = css;
        this.image = image;
        this.pagination = pagination;
        this.fx = fx;
        this.animation = this.fx[this.options.animation];
        this.$control = this.$container.wrap($control).parent('.slides-control');
        that._findPositions();
        that.width = that._findWidth();
        that.height = that._findHeight();
        this.css.children();
        this.css.containers();
        this.css.images();
        this.pagination._setup();
        return initialize();
    };
    Superslides.prototype = {
        _findWidth: function() {
            return $(this.options.inherit_width_from).width();
        },
        _findHeight: function() {
            return $(this.options.inherit_height_from).height();
        },
        _findMultiplier: function() {
            return this.size() === 1 ? 1 : 3;
        },
        _upcomingSlide: function(direction) {
            if ((/next/).test(direction)) {
                return this._nextInDom();
            } else if ((/prev/).test(direction)) {
                return this._prevInDom();
            } else if ((/\d/).test(direction)) {
                return +direction;
            } else if (direction && (/\w/).test(direction)) {
                var index = this._findSlideById(direction);
                if (index >= 0) {
                    return index;
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        },
        _findSlideById: function(id) {
            return this.$container.find('#' + id).index();
        },
        _findPositions: function(current, thisRef) {
            thisRef = thisRef || this;
            if (current === undefined) {
                current = -1;
            }
            thisRef.current = current;
            thisRef.next = thisRef._nextInDom();
            thisRef.prev = thisRef._prevInDom();
        },
        _nextInDom: function() {
            var index = this.current + 1;
            if (index === this.size()) {
                index = 0;
            }
            return index;
        },
        _prevInDom: function() {
            var index = this.current - 1;
            if (index < 0) {
                index = this.size() - 1;
            }
            return index;
        },
        _parseHash: function(hash) {
            hash = hash || window.location.hash;
            hash = hash.replace(/^#/, '');
            if (hash && !isNaN(+hash)) {
                hash = +hash;
            }
            return hash;
        },
        size: function() {
            return this.$container.children().length;
        },
        destroy: function() {
            return this.$el.removeData();
        },
        update: function() {
            this.css.children();
            this.css.containers();
            this.css.images();
            this.pagination._addItem(this.size())
            this._findPositions(this.current);
            this.$el.trigger('updated.slides');
        },
        stop: function() {
            clearInterval(this.play_id);
            delete this.play_id;
            this.$el.trigger('stopped.slides');
        },
        start: function() {
            var that = this;
            if (that.options.hashchange) {
                $(window).trigger('hashchange');
            } else {
                this.animate();
            }
            if (this.options.play) {
                if (this.play_id) {
                    this.stop();
                }
                this.play_id = setInterval(function() {
                    that.animate();
                }, this.options.play);
            }
            this.$el.trigger('started.slides');
        },
        animate: function(direction, userCallback) {
            var that = this,
                orientation = {};
            if (this.animating) {
                return;
            }
            this.animating = true;
            if (direction === undefined) {
                direction = 'next';
            }
            orientation.upcoming_slide = this._upcomingSlide(direction);
            if (orientation.upcoming_slide >= this.size()) {
                return;
            }
            orientation.outgoing_slide = this.current;
            orientation.upcoming_position = this.width * 2;
            orientation.offset = -orientation.upcoming_position;
            if (direction === 'prev' || direction < orientation.outgoing_slide) {
                orientation.upcoming_position = 0;
                orientation.offset = 0;
            }
            if (that.size() > 1) {
                that.pagination._setCurrent(orientation.upcoming_slide);
            }
            if (that.options.hashchange) {
                var hash = orientation.upcoming_slide + 1,
                    id = that.$container.children(':eq(' + orientation.upcoming_slide + ')').attr('id');
                if (id) {
                    window.location.hash = id;
                } else {
                    window.location.hash = hash;
                }
            }
            that.$el.trigger('animating.slides', [orientation]);
            that.animation(orientation, function() {
                that._findPositions(orientation.upcoming_slide, that);
                if (typeof userCallback === 'function') {
                    userCallback();
                }
                that.animating = false;
                that.$el.trigger('animated.slides');
                if (!that.init) {
                    that.$el.trigger('init.slides');
                    that.init = true;
                    that.$container.fadeIn('fast');
                }
            });
        }
    };
    $.fn[plugin] = function(option, args) {
        var result = [];
        this.each(function() {
            var $this, data, options;
            $this = $(this);
            data = $this.data(plugin);
            options = typeof option === 'object' && option;
            if (!data) {
                result = $this.data(plugin, (data = new Superslides(this, options)));
            }
            if (typeof option === "string") {
                result = data[option];
                if (typeof result === 'function') {
                    return result = result.call(data, args);
                }
            }
        });
        return result;
    };
    $.fn[plugin].fx = {};
})(this, jQuery);
(function(e) {
    e.fn.downCount = function(t, n) {
        function o() {
            var e = new Date(r.date),
                t = s();
            var o = e - t;
            if (o < 0) {
                clearInterval(u);
                if (n && typeof n === "function") n();
                return
            }
            var a = 1e3,
                f = a * 60,
                l = f * 60,
                c = l * 24;
            var h = Math.floor(o / c),
                p = Math.floor(o % c / l),
                d = Math.floor(o % l / f),
                v = Math.floor(o % f / a);
            h = String(h).length >= 2 ? h : "0" + h;
            p = String(p).length >= 2 ? p : "0" + p;
            d = String(d).length >= 2 ? d : "0" + d;
            v = String(v).length >= 2 ? v : "0" + v;
            var m = h === 1 ? "day" : "days",
                g = p === 1 ? "hour" : "hours",
                y = d === 1 ? "minute" : "minutes",
                b = v === 1 ? "second" : "seconds";
            i.find(".days").text(h);
            i.find(".hours").text(p);
            i.find(".minutes").text(d);
            i.find(".seconds").text(v);
            i.find(".days_ref").text(m);
            i.find(".hours_ref").text(g);
            i.find(".minutes_ref").text(y);
            i.find(".seconds_ref").text(b)
        }
        var r = e.extend({
            date: null,
            offset: null
        }, t);
        if (!r.date) {
            e.error("Date is not defined.")
        }
        if (!Date.parse(r.date)) {
            e.error("Incorrect date format, it should look like this, 12/24/2012 12:00:00.")
        }
        var i = this;
        var s = function() {
            var e = new Date;
            var t = e.getTime() + e.getTimezoneOffset() * 6e4;
            var n = new Date(t + 36e5 * r.offset);
            return n
        };
        var u = setInterval(o, 1e3)
    }
})(jQuery)
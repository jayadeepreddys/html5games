/*
 Platform.js <https://mths.be/platform>
 Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 Copyright 2011-2013 John-David Dalton
 Available under MIT license <https://mths.be/mit>
*/
$( document ).ready(function() {
    console.log( "ready!" );
    currentUser();
    onGameStart();
});
let searchParams = new URLSearchParams(window.location.search);
let gameId = searchParams.get('gameId');
let timeStamp = new Date();
var lastscore = 0;
//currentUser();
//console.log(scoreId);
(function () {

    var b = "undefined" !== typeof window && "undefined" !== typeof window.document ? window.document : {},
        d = "undefined" !== typeof module && module.exports,
        a = "undefined" !== typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
        e = (function () {
            for (
                var a,
                    c = [
                        "requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "),
                        "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "),
                        "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "),
                        "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "),
                        "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" "),
                    ],
                    e = 0,
                    g = c.length,
                    d = {};
                e < g;
                e++
            )
                if ((a = c[e]) && a[1] in b) {
                    for (e = 0; e < a.length; e++) d[c[0][e]] = a[e];
                    return d;
                }
            return !1;
        })(),
        c = { change: e.fullscreenchange, error: e.fullscreenerror },
        g = {
            request: function (f) {
                var c = e.requestFullscreen;
                f = f || b.documentElement;
                if (/5\.1[.\d]* Safari/.test(navigator.userAgent)) f[c]();
                else f[c](a && Element.ALLOW_KEYBOARD_INPUT);
            },
            exit: function () {
                b[e.exitFullscreen]();
            },
            toggle: function (a) {
                this.isFullscreen ? this.exit() : this.request(a);
            },
            onchange: function (a) {
                this.on("change", a);
            },
            onerror: function (a) {
                this.on("error", a);
            },
            on: function (a, e) {
                var f = c[a];
                f && b.addEventListener(f, e, !1);
            },
            off: function (a, e) {
                var f = c[a];
                f && b.removeEventListener(f, e, !1);
            },
            raw: e,
        };
    e
        ? (Object.defineProperties(g, {
              isFullscreen: {
                  get: function () {
                      return !!b[e.fullscreenElement];
                  },
              },
              element: {
                  enumerable: !0,
                  get: function () {
                      return b[e.fullscreenElement];
                  },
              },
              enabled: {
                  enumerable: !0,
                  get: function () {
                      return !!b[e.fullscreenEnabled];
                  },
              },
          }),
          d ? (module.exports = g) : (window.screenfull = g))
        : d
        ? (module.exports = !1)
        : (window.screenfull = !1);
})();
(function () {
    function b(a) {
        a = String(a);
        return a.charAt(0).toUpperCase() + a.slice(1);
    }
    function d(a, b) {
        var f = -1,
            c = a ? a.length : 0;
        if ("number" == typeof c && -1 < c && c <= v) for (; ++f < c; ) b(a[f], f, a);
        else e(a, b);
    }
    function a(a) {
        a = String(a).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(a) ? a : b(a);
    }
    function e(a, b) {
        for (var f in a) y.call(a, f) && b(a[f], f, a);
    }
    function c(a) {
        return null == a ? b(a) : C.call(a).slice(8, -1);
    }
    function g(a, b) {
        var f = null != a ? typeof a[b] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(f) && ("object" == f ? !!a[b] : !0);
    }
    function f(a) {
        return String(a).replace(/([ -])(?!$)/g, "$1?");
    }
    function h(a, b) {
        var f = null;
        d(a, function (c, e) {
            f = b(f, c, e, a);
        });
        return f;
    }
    function m(b) {
        function d(c) {
            return h(c, function (c, e) {
                var d = e.pattern || f(e);
                !c &&
                    (c = RegExp("\\b" + d + " *\\d+[.\\w_]*", "i").exec(b) || RegExp("\\b" + d + " *\\w+-[\\w]*", "i").exec(b) || RegExp("\\b" + d + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(b)) &&
                    ((c = String(e.label && !RegExp(d, "i").test(e.label) ? e.label : c).split("/"))[1] && !/[\d.]+/.test(c[0]) && (c[0] += " " + c[1]),
                    (e = e.label || e),
                    (c = a(
                        c[0]
                            .replace(RegExp(d, "i"), e)
                            .replace(RegExp("; *(?:" + e + "[_-])?", "i"), " ")
                            .replace(RegExp("(" + e + ")[-_.]?(\\w)", "i"), "$1 $2")
                    )));
                return c;
            });
        }
        function n(a) {
            return h(a, function (a, c) {
                return a || (RegExp(c + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(b) || 0)[1] || null;
            });
        }
        var l = r,
            p = b && "object" == typeof b && "String" != c(b);
        p && ((l = b), (b = null));
        var v = l.navigator || {},
            q = v.userAgent || "";
        b || (b = q);
        var y = p ? !!v.likeChrome : /\bChrome\b/.test(b) && !/internal|\n/i.test(C.toString()),
            x = p ? "Object" : "ScriptBridgingProxyObject",
            E = p ? "Object" : "Environment",
            L = p && l.java ? "JavaPackage" : c(l.java),
            G = p ? "Object" : "RuntimeObject";
        E = (L = /\bJava/.test(L) && l.java) && c(l.environment) == E;
        var W = L ? "a" : "\u03b1",
            X = L ? "b" : "\u03b2",
            T = l.document || {},
            O = l.operamini || l.opera,
            Q = w.test((Q = p && O ? O["[[Class]]"] : c(O))) ? Q : (O = null),
            k,
            R = b;
        p = [];
        var S = null,
            P = b == q;
        q = P && O && "function" == typeof O.version && O.version();
        var z = (function (a) {
                return h(a, function (a, c) {
                    return a || (RegExp("\\b" + (c.pattern || f(c)) + "\\b", "i").exec(b) && (c.label || c));
                });
            })([{ label: "EdgeHTML", pattern: "Edge" }, "Trident", { label: "WebKit", pattern: "AppleWebKit" }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"]),
            t = (function (a) {
                return h(a, function (a, c) {
                    return a || (RegExp("\\b" + (c.pattern || f(c)) + "\\b", "i").exec(b) && (c.label || c));
                });
            })([
                "Adobe AIR",
                "Arora",
                "Avant Browser",
                "Breach",
                "Camino",
                "Electron",
                "Epiphany",
                "Fennec",
                "Flock",
                "Galeon",
                "GreenBrowser",
                "iCab",
                "Iceweasel",
                "K-Meleon",
                "Konqueror",
                "Lunascape",
                "Maxthon",
                { label: "Microsoft Edge", pattern: "Edge" },
                "Midori",
                "Nook Browser",
                "PaleMoon",
                "PhantomJS",
                "Raven",
                "Rekonq",
                "RockMelt",
                { label: "Samsung Internet", pattern: "SamsungBrowser" },
                "SeaMonkey",
                { label: "Silk", pattern: "(?:Cloud9|Silk-Accelerated)" },
                "Sleipnir",
                "SlimBrowser",
                { label: "SRWare Iron", pattern: "Iron" },
                "Sunrise",
                "Swiftfox",
                "Waterfox",
                "WebPositive",
                "Opera Mini",
                { label: "Opera Mini", pattern: "OPiOS" },
                "Opera",
                { label: "Opera", pattern: "OPR" },
                "Chrome",
                { label: "Chrome Mobile", pattern: "(?:CriOS|CrMo)" },
                { label: "Firefox", pattern: "(?:Firefox|Minefield)" },
                { label: "Firefox for iOS", pattern: "FxiOS" },
                { label: "IE", pattern: "IEMobile" },
                { label: "IE", pattern: "MSIE" },
                "Safari",
            ]),
            A = d([
                { label: "BlackBerry", pattern: "BB10" },
                "BlackBerry",
                { label: "Galaxy S", pattern: "GT-I9000" },
                { label: "Galaxy S2", pattern: "GT-I9100" },
                { label: "Galaxy S3", pattern: "GT-I9300" },
                { label: "Galaxy S4", pattern: "GT-I9500" },
                { label: "Galaxy S5", pattern: "SM-G900" },
                { label: "Galaxy S6", pattern: "SM-G920" },
                { label: "Galaxy S6 Edge", pattern: "SM-G925" },
                { label: "Galaxy S7", pattern: "SM-G930" },
                { label: "Galaxy S7 Edge", pattern: "SM-G935" },
                "Google TV",
                "Lumia",
                "iPad",
                "iPod",
                "iPhone",
                "Kindle",
                { label: "Kindle Fire", pattern: "(?:Cloud9|Silk-Accelerated)" },
                "Nexus",
                "Nook",
                "PlayBook",
                "PlayStation Vita",
                "PlayStation",
                "TouchPad",
                "Transformer",
                { label: "Wii U", pattern: "WiiU" },
                "Wii",
                "Xbox One",
                { label: "Xbox 360", pattern: "Xbox" },
                "Xoom",
            ]),
            M = (function (a) {
                return h(a, function (a, c, e) {
                    return a || ((c[A] || c[/^[a-z]+(?: +[a-z]+\b)*/i.exec(A)] || RegExp("\\b" + f(e) + "(?:\\b|\\w*\\d)", "i").exec(b)) && e);
                });
            })({
                Apple: { iPad: 1, iPhone: 1, iPod: 1 },
                Archos: {},
                Amazon: { Kindle: 1, "Kindle Fire": 1 },
                Asus: { Transformer: 1 },
                "Barnes & Noble": { Nook: 1 },
                BlackBerry: { PlayBook: 1 },
                Google: { "Google TV": 1, Nexus: 1 },
                HP: { TouchPad: 1 },
                HTC: {},
                LG: {},
                Microsoft: { Xbox: 1, "Xbox One": 1 },
                Motorola: { Xoom: 1 },
                Nintendo: { "Wii U": 1, Wii: 1 },
                Nokia: { Lumia: 1 },
                Samsung: { "Galaxy S": 1, "Galaxy S2": 1, "Galaxy S3": 1, "Galaxy S4": 1 },
                Sony: { PlayStation: 1, "PlayStation Vita": 1 },
            }),
            u = (function (c) {
                return h(c, function (c, e) {
                    var d = e.pattern || f(e);
                    if (!c && (c = RegExp("\\b" + d + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(b))) {
                        var g = c,
                            h = e.label || e,
                            l = {
                                "10.0": "10",
                                "6.4": "10 Technical Preview",
                                "6.3": "8.1",
                                "6.2": "8",
                                "6.1": "Server 2008 R2 / 7",
                                "6.0": "Server 2008 / Vista",
                                "5.2": "Server 2003 / XP 64-bit",
                                "5.1": "XP",
                                "5.01": "2000 SP1",
                                "5.0": "2000",
                                "4.0": "NT",
                                "4.90": "ME",
                            };
                        d && h && /^Win/i.test(g) && !/^Windows Phone /i.test(g) && (l = l[/[\d.]+$/.exec(g)]) && (g = "Windows " + l);
                        g = String(g);
                        d && h && (g = g.replace(RegExp(d, "i"), h));
                        c = g = a(
                            g
                                .replace(/ ce$/i, " CE")
                                .replace(/\bhpw/i, "web")
                                .replace(/\bMacintosh\b/, "Mac OS")
                                .replace(/_PowerPC\b/i, " OS")
                                .replace(/\b(OS X) [^ \d]+/i, "$1")
                                .replace(/\bMac (OS X)\b/, "$1")
                                .replace(/\/(\d)/, " $1")
                                .replace(/_/g, ".")
                                .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "")
                                .replace(/\bx86\.64\b/gi, "x86_64")
                                .replace(/\b(Windows Phone) OS\b/, "$1")
                                .replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1")
                                .split(" on ")[0]
                        );
                    }
                    return c;
                });
            })([
                "Windows Phone",
                "Android",
                "CentOS",
                { label: "Chrome OS", pattern: "CrOS" },
                "Debian",
                "Fedora",
                "FreeBSD",
                "Gentoo",
                "Haiku",
                "Kubuntu",
                "Linux Mint",
                "OpenBSD",
                "Red Hat",
                "SuSE",
                "Ubuntu",
                "Xubuntu",
                "Cygwin",
                "Symbian OS",
                "hpwOS",
                "webOS ",
                "webOS",
                "Tablet OS",
                "Tizen",
                "Linux",
                "Mac OS X",
                "Macintosh",
                "Mac",
                "Windows 98;",
                "Windows ",
            ]);
        z && (z = [z]);
        M && !A && (A = d([M]));
        if ((k = /\bGoogle TV\b/.exec(A))) A = k[0];
        /\bSimulator\b/i.test(b) && (A = (A ? A + " " : "") + "Simulator");
        "Opera Mini" == t && /\bOPiOS\b/.test(b) && p.push("running in Turbo/Uncompressed mode");
        "IE" == t && /\blike iPhone OS\b/.test(b)
            ? ((k = m(b.replace(/like iPhone OS/, ""))), (M = k.manufacturer), (A = k.product))
            : /^iP/.test(A)
            ? (t || (t = "Safari"), (u = "iOS" + ((k = / OS ([\d_]+)/i.exec(b)) ? " " + k[1].replace(/_/g, ".") : "")))
            : "Konqueror" != t || /buntu/i.test(u)
            ? (M && "Google" != M && ((/Chrome/.test(t) && !/\bMobile Safari\b/i.test(b)) || /\bVita\b/.test(A))) || (/\bAndroid\b/.test(u) && /^Chrome/.test(t) && /\bVersion\//i.test(b))
                ? ((t = "Android Browser"), (u = /\bAndroid\b/.test(u) ? u : "Android"))
                : "Silk" == t
                ? (/\bMobi/i.test(b) || ((u = "Android"), p.unshift("desktop mode")), /Accelerated *= *true/i.test(b) && p.unshift("accelerated"))
                : "PaleMoon" == t && (k = /\bFirefox\/([\d.]+)\b/.exec(b))
                ? p.push("identifying as Firefox " + k[1])
                : "Firefox" == t && (k = /\b(Mobile|Tablet|TV)\b/i.exec(b))
                ? (u || (u = "Firefox OS"), A || (A = k[1]))
                : !t || (k = !/\bMinefield\b/i.test(b) && /\b(?:Firefox|Safari)\b/.exec(t))
                ? (t && !A && /[\/,]|^[^(]+?\)/.test(b.slice(b.indexOf(k + "/") + 8)) && (t = null),
                  (k = A || M || u) && (A || M || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(u)) && (t = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(u) ? u : k) + " Browser"))
                : "Electron" == t && (k = (/\bChrome\/([\d.]+)\b/.exec(b) || 0)[1]) && p.push("Chromium " + k)
            : (u = "Kubuntu");
        q || (q = n(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", f(t), "(?:Firefox|Minefield|NetFront)"]));
        if (
            (k =
                ("iCab" == z && 3 < parseFloat(q) && "WebKit") ||
                (/\bOpera\b/.test(t) && (/\bOPR\b/.test(b) ? "Blink" : "Presto")) ||
                (/\b(?:Midori|Nook|Safari)\b/i.test(b) && !/^(?:Trident|EdgeHTML)$/.test(z) && "WebKit") ||
                (!z && /\bMSIE\b/i.test(b) && ("Mac OS" == u ? "Tasman" : "Trident")) ||
                ("WebKit" == z && /\bPlayStation\b(?! Vita\b)/i.test(t) && "NetFront"))
        )
            z = [k];
        "IE" == t && (k = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(b) || 0)[1])
            ? ((t += " Mobile"), (u = "Windows Phone " + (/\+$/.test(k) ? k : k + ".x")), p.unshift("desktop mode"))
            : /\bWPDesktop\b/i.test(b)
            ? ((t = "IE Mobile"), (u = "Windows Phone 8.x"), p.unshift("desktop mode"), q || (q = (/\brv:([\d.]+)/.exec(b) || 0)[1]))
            : "IE" != t && "Trident" == z && (k = /\brv:([\d.]+)/.exec(b)) && (t && p.push("identifying as " + t + (q ? " " + q : "")), (t = "IE"), (q = k[1]));
        if (P) {
            if (g(l, "global"))
                if ((L && ((k = L.lang.System), (R = k.getProperty("os.arch")), (u = u || k.getProperty("os.name") + " " + k.getProperty("os.version"))), E)) {
                    try {
                        (q = l.require("ringo/engine").version.join(".")), (t = "RingoJS");
                    } catch (V) {
                        (k = l.system) && k.global.system == l.system && ((t = "Narwhal"), u || (u = k[0].os || null));
                    }
                    t || (t = "Rhino");
                } else
                    "object" == typeof l.process &&
                        !l.process.browser &&
                        (k = l.process) &&
                        ("object" == typeof k.versions &&
                            ("string" == typeof k.versions.electron
                                ? (p.push("Node " + k.versions.node), (t = "Electron"), (q = k.versions.electron))
                                : "string" == typeof k.versions.nw && (p.push("Chromium " + q, "Node " + k.versions.node), (t = "NW.js"), (q = k.versions.nw))),
                        t || ((t = "Node.js"), (R = k.arch), (u = k.platform), (q = (q = /[\d.]+/.exec(k.version)) ? q[0] : null)));
            else
                c((k = l.runtime)) == x
                    ? ((t = "Adobe AIR"), (u = k.flash.system.Capabilities.os))
                    : c((k = l.phantom)) == G
                    ? ((t = "PhantomJS"), (q = (k = k.version || null) && k.major + "." + k.minor + "." + k.patch))
                    : "number" == typeof T.documentMode && (k = /\bTrident\/(\d+)/i.exec(b))
                    ? ((q = [q, T.documentMode]), (k = +k[1] + 4) != q[1] && (p.push("IE " + q[1] + " mode"), z && (z[1] = ""), (q[1] = k)), (q = "IE" == t ? String(q[1].toFixed(1)) : q[0]))
                    : "number" == typeof T.documentMode && /^(?:Chrome|Firefox)\b/.test(t) && (p.push("masking as " + t + " " + q), (t = "IE"), (q = "11.0"), (z = ["Trident"]), (u = "Windows"));
            u = u && a(u);
        }
        q &&
            (k = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(q) || /(?:alpha|beta)(?: ?\d)?/i.exec(b + ";" + (P && v.appMinorVersion)) || (/\bMinefield\b/i.test(b) && "a")) &&
            ((S = /b/i.test(k) ? "beta" : "alpha"), (q = q.replace(RegExp(k + "\\+?$"), "") + ("beta" == S ? X : W) + (/\d+\+?/.exec(k) || "")));
        if ("Fennec" == t || ("Firefox" == t && /\b(?:Android|Firefox OS)\b/.test(u))) t = "Firefox Mobile";
        else if ("Maxthon" == t && q) q = q.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(A)) "Xbox 360" == A && (u = null), "Xbox 360" == A && /\bIEMobile\b/.test(b) && p.unshift("mobile mode");
        else if ((!/^(?:Chrome|IE|Opera)$/.test(t) && (!t || A || /Browser|Mobi/.test(t))) || ("Windows CE" != u && !/Mobi/i.test(b)))
            if ("IE" == t && P)
                try {
                    null === l.external && p.unshift("platform preview");
                } catch (V) {
                    p.unshift("embedded");
                }
            else
                (/\bBlackBerry\b/.test(A) || /\bBB10\b/.test(b)) && (k = (RegExp(A.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(b) || 0)[1] || q)
                    ? ((k = [k, /BB10/.test(b)]), (u = (k[1] ? ((A = null), (M = "BlackBerry")) : "Device Software") + " " + k[0]), (q = null))
                    : this != e &&
                      "Wii" != A &&
                      ((P && O) ||
                          (/Opera/.test(t) && /\b(?:MSIE|Firefox)\b/i.test(b)) ||
                          ("Firefox" == t && /\bOS X (?:\d+\.){2,}/.test(u)) ||
                          ("IE" == t && ((u && !/^Win/.test(u) && 5.5 < q) || (/\bWindows XP\b/.test(u) && 8 < q) || (8 == q && !/\bTrident\b/.test(b))))) &&
                      !w.test((k = m.call(e, b.replace(w, "") + ";"))) &&
                      k.name &&
                      ((k = "ing as " + k.name + ((k = k.version) ? " " + k : "")),
                      w.test(t) ? (/\bIE\b/.test(k) && "Mac OS" == u && (u = null), (k = "identify" + k)) : ((k = "mask" + k), (t = Q ? a(Q.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera"), /\bIE\b/.test(k) && (u = null), P || (q = null)),
                      (z = ["Presto"]),
                      p.push(k));
        else t += " Mobile";
        if ((k = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(b) || 0)[1])) {
            k = [parseFloat(k.replace(/\.(\d)$/, ".0$1")), k];
            if ("Safari" == t && "+" == k[1].slice(-1)) (t = "WebKit Nightly"), (S = "alpha"), (q = k[1].slice(0, -1));
            else if (q == k[1] || q == (k[2] = (/\bSafari\/([\d.]+\+?)/i.exec(b) || 0)[1])) q = null;
            k[1] = (/\bChrome\/([\d.]+)/i.exec(b) || 0)[1];
            537.36 == k[0] && 537.36 == k[2] && 28 <= parseFloat(k[1]) && "WebKit" == z && (z = ["Blink"]);
            P && (y || k[1])
                ? (z && (z[1] = "like Chrome"),
                  (k =
                      k[1] ||
                      ((k = k[0]),
                      530 > k
                          ? 1
                          : 532 > k
                          ? 2
                          : 532.05 > k
                          ? 3
                          : 533 > k
                          ? 4
                          : 534.03 > k
                          ? 5
                          : 534.07 > k
                          ? 6
                          : 534.1 > k
                          ? 7
                          : 534.13 > k
                          ? 8
                          : 534.16 > k
                          ? 9
                          : 534.24 > k
                          ? 10
                          : 534.3 > k
                          ? 11
                          : 535.01 > k
                          ? 12
                          : 535.02 > k
                          ? "13+"
                          : 535.07 > k
                          ? 15
                          : 535.11 > k
                          ? 16
                          : 535.19 > k
                          ? 17
                          : 536.05 > k
                          ? 18
                          : 536.1 > k
                          ? 19
                          : 537.01 > k
                          ? 20
                          : 537.11 > k
                          ? "21+"
                          : 537.13 > k
                          ? 23
                          : 537.18 > k
                          ? 24
                          : 537.24 > k
                          ? 25
                          : 537.36 > k
                          ? 26
                          : "Blink" != z
                          ? "27"
                          : "28")))
                : (z && (z[1] = "like Safari"), (k = ((k = k[0]), 400 > k ? 1 : 500 > k ? 2 : 526 > k ? 3 : 533 > k ? 4 : 534 > k ? "4+" : 535 > k ? 5 : 537 > k ? 6 : 538 > k ? 7 : 601 > k ? 8 : "8")));
            z && (z[1] += " " + (k += "number" == typeof k ? ".x" : /[.+]/.test(k) ? "" : "+"));
            "Safari" == t && (!q || 45 < parseInt(q)) && (q = k);
        }
        "Opera" == t && (k = /\bzbov|zvav$/.exec(u))
            ? ((t += " "), p.unshift("desktop mode"), "zvav" == k ? ((t += "Mini"), (q = null)) : (t += "Mobile"), (u = u.replace(RegExp(" *" + k + "$"), "")))
            : "Safari" == t && /\bChrome\b/.exec(z && z[1]) && (p.unshift("desktop mode"), (t = "Chrome Mobile"), (q = null), /\bOS X\b/.test(u) ? ((M = "Apple"), (u = "iOS 4.3+")) : (u = null));
        q && 0 == q.indexOf((k = /[\d.]+$/.exec(u))) && -1 < b.indexOf("/" + k + "-") && (u = String(u.replace(k, "")).replace(/^ +| +$/g, ""));
        z &&
            !/\b(?:Avant|Nook)\b/.test(t) &&
            (/Browser|Lunascape|Maxthon/.test(t) || ("Safari" != t && /^iOS/.test(u) && /\bSafari\b/.test(z[1])) || (/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(t) && z[1])) &&
            (k = z[z.length - 1]) &&
            p.push(k);
        p.length && (p = ["(" + p.join("; ") + ")"]);
        M && A && 0 > A.indexOf(M) && p.push("on " + M);
        A && p.push((/^on /.test(p[p.length - 1]) ? "" : "on ") + A);
        if (u) {
            var U = (k = / ([\d.+]+)$/.exec(u)) && "/" == u.charAt(u.length - k[0].length - 1);
            u = {
                architecture: 32,
                family: k && !U ? u.replace(k[0], "") : u,
                version: k ? k[1] : null,
                toString: function () {
                    var a = this.version;
                    return this.family + (a && !U ? " " + a : "") + (64 == this.architecture ? " 64-bit" : "");
                },
            };
        }
        (k = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(R)) && !/\bi686\b/i.test(R)
            ? (u && ((u.architecture = 64), (u.family = u.family.replace(RegExp(" *" + k), ""))), t && (/\bWOW64\b/i.test(b) || (P && /\w(?:86|32)$/.test(v.cpuClass || v.platform) && !/\bWin64; x64\b/i.test(b))) && p.unshift("32-bit"))
            : u && /^OS X/.test(u.family) && "Chrome" == t && 39 <= parseFloat(q) && (u.architecture = 64);
        b || (b = null);
        l = {};
        l.description = b;
        l.layout = z && z[0];
        l.manufacturer = M;
        l.name = t;
        l.prerelease = S;
        l.product = A;
        l.ua = b;
        l.version = t && q;
        l.os = u || {
            architecture: null,
            family: null,
            version: null,
            toString: function () {
                return "null";
            },
        };
        l.parse = m;
        l.toString = function () {
            return this.description || "";
        };
        l.version && p.unshift(q);
        l.name && p.unshift(t);
        u && t && (u != String(u).split(" ")[0] || (u != t.split(" ")[0] && !A)) && p.push(A ? "(" + u + ")" : "on " + u);
        p.length && (l.description = p.join(" "));
        return l;
    }
    var n = { function: !0, object: !0 },
        r = (n[typeof window] && window) || this,
        l = n[typeof exports] && exports;
    n = n[typeof module] && module && !module.nodeType && module;
    var p = l && n && "object" == typeof global && global;
    !p || (p.global !== p && p.window !== p && p.self !== p) || (r = p);
    var v = Math.pow(2, 53) - 1,
        w = /\bOpera/;
    p = Object.prototype;
    var y = p.hasOwnProperty,
        C = p.toString,
        x = m();
    "function" == typeof define && "object" == typeof define.amd && define.amd
        ? ((r.platform = x),
          define(function () {
              return x;
          }))
        : l && n
        ? e(x, function (a, b) {
              l[b] = a;
          })
        : (r.platform = x);
}.call(this));
function currentUser(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("You are logged in");
        } else {
            window.location.href = "http://localhost:7000/signup.html";
        }
      });
}
function onGameStart(){
    var docRef = db.collection("TournamentUser").doc(gameId);

            docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                lastscore = doc.data().Score;
                console.log(lastscore);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
}


function buildIOSMeta() {
    for (
        var b = [
                { name: "viewport", content: "width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" },
                { name: "apple-mobile-web-app-capable", content: "yes" },
                { name: "apple-mobile-web-app-status-bar-style", content: "black" },
            ],
            d = 0;
        d < b.length;
        d++
    ) {
        var a = document.createElement("meta");
        a.name = b[d].name;
        a.content = b[d].content;
        var e = window.document.head.querySelector('meta[name="' + a.name + '"]');
        e && e.parentNode.removeChild(e);
        window.document.head.appendChild(a);
    }
}
function hideIOSFullscreenPanel() {
    jQuery(".xxx-ios-fullscreen-message").css("display", "none");
    jQuery(".xxx-ios-fullscreen-scroll").css("display", "none");
    jQuery(".xxx-game-iframe-full").removeClass("xxx-game-iframe-iphone-se");
}
function buildIOSFullscreenPanel() {
    jQuery("body").append('<div class="xxx-ios-fullscreen-message"><div class="xxx-ios-fullscreen-swipe"></div></div><div class="xxx-ios-fullscreen-scroll"></div>');
}
function showIOSFullscreenPanel() {
    jQuery(".xxx-ios-fullscreen-message").css("display", "block");
    jQuery(".xxx-ios-fullscreen-scroll").css("display", "block");
}
function __iosResize() {
    window.scrollTo(0, 0);
    if ("iPhone" === platform.product)
        switch (window.devicePixelRatio) {
            case 2:
                switch (window.innerWidth) {
                    case 568:
                        320 !== window.innerHeight && jQuery(".xxx-game-iframe-full").addClass("xxx-game-iframe-iphone-se");
                        break;
                    case 667:
                        375 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                        break;
                    default:
                        hideIOSFullscreenPanel();
                }
                break;
            case 3:
                switch (window.innerWidth) {
                    case 736:
                        414 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                        break;
                    case 724:
                        375 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                        break;
                    default:
                        hideIOSFullscreenPanel();
                }
                break;
            default:
                hideIOSFullscreenPanel();
        }
}
function iosResize() {
    __iosResize();
    setTimeout(function () {
        __iosResize();
    }, 500);
}
function iosInIframe() {
    try {
        return window.self !== window.top;
    } catch (b) {
        return !0;
    }
}
$(document).ready(function () {
    platform && "iPhone" === platform.product && !iosInIframe() && (buildIOSFullscreenPanel(), buildIOSMeta());
});
jQuery(window).resize(function () {
    platform && "iPhone" === platform.product && !iosInIframe() && iosResize();
});
var s_iOffsetX = 0,
    s_iOffsetY = 0;
(function (b) {
    (jQuery.browser = jQuery.browser || {}).mobile =
        /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(
            b
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(
            b.substr(0, 4)
        );
})(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function () {
    sizeHandler();
});
function trace(b) {
    console.log(b);
}
function isIOS() {
    for (var b = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";"); b.length; ) if (navigator.platform === b.pop()) return (s_bIsIphone = !0);
    return (s_bIsIphone = !1);
}
window.addEventListener("orientationchange", onOrientationChange);
function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler();
}
function getSize(b) {
    var d = b.toLowerCase(),
        a = window.document,
        e = a.documentElement;
    if (void 0 === window["inner" + b]) b = e["client" + b];
    else if (window["inner" + b] != e["client" + b]) {
        var c = a.createElement("body");
        c.id = "vpw-test-b";
        c.style.cssText = "overflow:scroll";
        var g = a.createElement("div");
        g.id = "vpw-test-d";
        g.style.cssText = "position:absolute;top:-1000px";
        g.innerHTML = "<style>@media(" + d + ":" + e["client" + b] + "px){body#vpw-test-b div#vpw-test-d{" + d + ":7px!important}}</style>";
        c.appendChild(g);
        e.insertBefore(c, a.head);
        b = 7 == g["offset" + b] ? e["client" + b] : window["inner" + b];
        e.removeChild(c);
    } else b = window["inner" + b];
    return b;
}
function getIOSWindowHeight() {
    return (document.documentElement.clientWidth / window.innerWidth) * window.innerHeight;
}
function getHeightOfIOSToolbars() {
    var b = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < b ? b : 0;
}
function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
        var b = "safari" === platform.name.toLowerCase() ? getIOSWindowHeight() : getSize("Height");
        var d = getSize("Width");
        _checkOrientation(d, b);
        s_iScaleFactor = Math.min(b / CANVAS_HEIGHT, d / CANVAS_WIDTH);
        var a = CANVAS_WIDTH * s_iScaleFactor,
            e = CANVAS_HEIGHT * s_iScaleFactor;
        if (e < b) {
            var c = b - e;
            e += c;
            a += (CANVAS_WIDTH / CANVAS_HEIGHT) * c;
        } else a < d && ((c = d - a), (a += c), (e += (CANVAS_HEIGHT / CANVAS_WIDTH) * c));
        c = b / 2 - e / 2;
        var g = d / 2 - a / 2,
            f = CANVAS_WIDTH / a;
        if (g * f < -EDGEBOARD_X || c * f < -EDGEBOARD_Y)
            (s_iScaleFactor = Math.min(b / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), d / (CANVAS_WIDTH - 2 * EDGEBOARD_X))),
                (a = CANVAS_WIDTH * s_iScaleFactor),
                (e = CANVAS_HEIGHT * s_iScaleFactor),
                (c = (b - e) / 2),
                (g = (d - a) / 2),
                (f = CANVAS_WIDTH / a);
        s_iOffsetX = -1 * g * f;
        s_iOffsetY = -1 * c * f;
        0 <= c && (s_iOffsetY = 0);
        0 <= g && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        $("#canvas").css("width", a + "px");
        $("#canvas").css("height", e + "px");
        0 > c || (c = (b - e) / 2);
        $("#canvas").css("top", c + "px");
        $("#canvas").css("left", g + "px");
        fullscreenHandler();
    }
}
function _checkOrientation(b, d) {
    s_bMobile &&
        ENABLE_CHECK_ORIENTATION &&
        (b > d
            ? "landscape" === $(".orientation-msg-container").attr("data-orientation")
                ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate())
                : ($(".orientation-msg-container").css("display", "block"), s_oMain.stopUpdate())
            : "portrait" === $(".orientation-msg-container").attr("data-orientation")
            ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate())
            : ($(".orientation-msg-container").css("display", "block"), s_oMain.stopUpdate()));
}
function createBitmap(b, d, a) {
    var e = new createjs.Bitmap(b),
        c = new createjs.Shape();
    d && a ? c.graphics.beginFill("#fff").drawRect(0, 0, d, a) : c.graphics.beginFill("#ff0").drawRect(0, 0, b.width, b.height);
    e.hitArea = c;
    return e;
}
function createSprite(b, d, a, e, c, g) {
    b = null !== d ? new createjs.Sprite(b, d) : new createjs.Sprite(b);
    d = new createjs.Shape();
    d.graphics.beginFill("#000000").drawRect(-a, -e, c, g);
    b.hitArea = d;
    return b;
}
function randomFloatBetween(b, d, a) {
    "undefined" === typeof a && (a = 2);
    return parseFloat(Math.min(b + Math.random() * (d - b), d).toFixed(a));
}
function shuffle(b) {
    for (var d = b.length, a, e; 0 !== d; ) (e = Math.floor(Math.random() * d)), --d, (a = b[d]), (b[d] = b[e]), (b[e] = a);
    return b;
}
function formatTime(b) {
    b /= 1e3;
    var d = Math.floor(b / 60);
    b = parseFloat(b - 60 * d).toFixed(1);
    var a = "";
    a = 10 > d ? a + ("0" + d + ":") : a + (d + ":");
    return 10 > b ? a + ("0" + b) : a + b;
}
function degreesToRadians(b) {
    return (b * Math.PI) / 180;
}
function checkRectCollision(b, d) {
    var a = getBounds(b, 0.9);
    var e = getBounds(d, 0.98);
    return calculateIntersection(a, e);
}
function calculateIntersection(b, d) {
    var a, e, c, g;
    var f = b.x + (a = b.width / 2);
    var h = b.y + (e = b.height / 2);
    var m = d.x + (c = d.width / 2);
    var n = d.y + (g = d.height / 2);
    f = Math.abs(f - m) - (a + c);
    h = Math.abs(h - n) - (e + g);
    return 0 > f && 0 > h ? ((f = Math.min(Math.min(b.width, d.width), -f)), (h = Math.min(Math.min(b.height, d.height), -h)), { x: Math.max(b.x, d.x), y: Math.max(b.y, d.y), width: f, height: h, rect1: b, rect2: d }) : null;
}
function getBounds(b, d) {
    var a = { x: Infinity, y: Infinity, width: 0, height: 0 };
    if (b instanceof createjs.Container) {
        a.x2 = -Infinity;
        a.y2 = -Infinity;
        var e = b.children,
            c = e.length,
            g;
        for (g = 0; g < c; g++) {
            var f = getBounds(e[g], 1);
            f.x < a.x && (a.x = f.x);
            f.y < a.y && (a.y = f.y);
            f.x + f.width > a.x2 && (a.x2 = f.x + f.width);
            f.y + f.height > a.y2 && (a.y2 = f.y + f.height);
        }
        Infinity == a.x && (a.x = 0);
        Infinity == a.y && (a.y = 0);
        Infinity == a.x2 && (a.x2 = 0);
        Infinity == a.y2 && (a.y2 = 0);
        a.width = a.x2 - a.x;
        a.height = a.y2 - a.y;
        delete a.x2;
        delete a.y2;
    } else {
        if (b instanceof createjs.Bitmap) {
            c = b.sourceRect || b.image;
            g = c.width * d;
            var h = c.height * d;
        } else if (b instanceof createjs.Sprite)
            if (b.spriteSheet._frames && b.spriteSheet._frames[b.currentFrame] && b.spriteSheet._frames[b.currentFrame].image) {
                c = b.spriteSheet.getFrame(b.currentFrame);
                g = c.rect.width;
                h = c.rect.height;
                e = c.regX;
                var m = c.regY;
            } else (a.x = b.x || 0), (a.y = b.y || 0);
        else (a.x = b.x || 0), (a.y = b.y || 0);
        e = e || 0;
        g = g || 0;
        m = m || 0;
        h = h || 0;
        a.regX = e;
        a.regY = m;
        c = b.localToGlobal(0 - e, 0 - m);
        f = b.localToGlobal(g - e, h - m);
        g = b.localToGlobal(g - e, 0 - m);
        e = b.localToGlobal(0 - e, h - m);
        a.x = Math.min(Math.min(Math.min(c.x, f.x), g.x), e.x);
        a.y = Math.min(Math.min(Math.min(c.y, f.y), g.y), e.y);
        a.width = Math.max(Math.max(Math.max(c.x, f.x), g.x), e.x) - a.x;
        a.height = Math.max(Math.max(Math.max(c.y, f.y), g.y), e.y) - a.y;
    }
    return a;
}
function NoClickDelay(b) {
    this.element = b;
    window.Touch && this.element.addEventListener("touchstart", this, !1);
}
NoClickDelay.prototype = {
    handleEvent: function (b) {
        switch (b.type) {
            case "touchstart":
                this.onTouchStart(b);
                break;
            case "touchmove":
                this.onTouchMove(b);
                break;
            case "touchend":
                this.onTouchEnd(b);
        }
    },
    onTouchStart: function (b) {
        b.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1);
    },
    onTouchMove: function (b) {
        this.moved = !0;
    },
    onTouchEnd: function (b) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend", this, !1);
        if (!this.moved) {
            b = document.elementFromPoint(b.changedTouches[0].clientX, b.changedTouches[0].clientY);
            3 == b.nodeType && (b = b.parentNode);
            var d = document.createEvent("MouseEvents");
            d.initEvent("click", !0, !0);
            b.dispatchEvent(d);
        }
    },
};
(function () {
    function b(a) {
        var b = { focus: "visible", focusin: "visible", pageshow: "visible", blur: "hidden", focusout: "hidden", pagehide: "hidden" };
        a = a || window.event;
        a.type in b ? (document.body.className = b[a.type]) : ((document.body.className = this[d] ? "hidden" : "visible"), "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate());
    }
    var d = "hidden";
    d in document
        ? document.addEventListener("visibilitychange", b)
        : (d = "mozHidden") in document
        ? document.addEventListener("mozvisibilitychange", b)
        : (d = "webkitHidden") in document
        ? document.addEventListener("webkitvisibilitychange", b)
        : (d = "msHidden") in document
        ? document.addEventListener("msvisibilitychange", b)
        : "onfocusin" in document
        ? (document.onfocusin = document.onfocusout = b)
        : (window.onpageshow = window.onpagehide = window.onfocus = window.onblur = b);
})();
function playSound(b, d, a) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[b].play(), s_aSounds[b].volume(d), s_aSounds[b].loop(a), s_aSounds[b]) : null;
}
function stopSound(b) {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[b].stop();
}
function setVolume(b, d) {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[b].volume(d);
}
function setMute(b, d) {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[b].mute(d);
}
function playExistingSound(b) {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[b].play();
}
function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate();
}
function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate();
}
function getParamValue(b) {
    for (var d = window.location.search.substring(1).split("&"), a = 0; a < d.length; a++) {
        var e = d[a].split("=");
        if (e[0] == b) return e[1];
    }
}
function getRandomColor() {
    return "rgba(" + (Math.floor(127 * Math.random() + 255) - 127) + "," + (Math.floor(127 * Math.random() + 255) - 127) + "," + (Math.floor(127 * Math.random() + 255) - 127) + ",1)";
}
function distance(b, d) {
    return Math.sqrt((d.x - b.x) * (d.x - b.x) + (d.y - b.y) * (d.y - b.y));
}
function distanceWithoutSQRT(b, d) {
    return (d.x - b.x) * (d.x - b.x) + (d.y - b.y) * (d.y - b.y);
}
function dotProductV2(b, d) {
    return b.getX() * d.getX() + b.getY() * d.getY();
}
function reflectVectorV2(b, d) {
    var a = dotProductV2(b, d);
    b.set(b.getX() - 2 * a * d.getX(), b.getY() - 2 * a * d.getY());
    return b;
}
function fullscreenHandler() {
    ENABLE_FULLSCREEN && screenfull.enabled && ((s_bFullscreen = screenfull.isFullscreen), null !== s_oInterface && s_oInterface.resetFullscreenBut(), null !== s_oMenu && s_oMenu.resetFullscreenBut());
}
if (screenfull.enabled)
    screenfull.on("change", function () {
        s_bFullscreen = screenfull.isFullscreen;
        null !== s_oInterface && s_oInterface.resetFullscreenBut();
        null !== s_oMenu && s_oMenu.resetFullscreenBut();
    });
function CSpriteLibrary() {
    var b = {},
        d,
        a,
        e,
        c,
        g,
        f;
    this.init = function (b, m, n) {
        d = {};
        e = a = 0;
        c = b;
        g = m;
        f = n;
    };
    this.addSprite = function (c, e) {
        if (!b.hasOwnProperty(c)) {
            var f = new Image();
            b[c] = d[c] = { szPath: e, oSprite: f, bLoaded: !1 };
            a++;
        }
    };
    this.getSprite = function (a) {
        return b.hasOwnProperty(a) ? b[a].oSprite : null;
    };
    this._onSpritesLoaded = function () {
        a = 0;
        g.call(f);
    };
    this._onSpriteLoaded = function () {
        c.call(f);
        ++e === a && this._onSpritesLoaded();
    };
    this.loadSprites = function () {
        for (var a in d)
            (d[a].oSprite.oSpriteLibrary = this),
                (d[a].oSprite.szKey = a),
                (d[a].oSprite.onload = function () {
                    this.oSpriteLibrary.setLoaded(this.szKey);
                    this.oSpriteLibrary._onSpriteLoaded(this.szKey);
                }),
                (d[a].oSprite.onerror = function (a) {
                    var b = a.currentTarget;
                    setTimeout(function () {
                        d[b.szKey].oSprite.src = d[b.szKey].szPath;
                    }, 500);
                }),
                (d[a].oSprite.src = d[a].szPath);
    };
    this.setLoaded = function (a) {
        b[a].bLoaded = !0;
    };
    this.isLoaded = function (a) {
        return b[a].bLoaded;
    };
    this.getNumSprites = function () {
        return a;
    };
}
var CANVAS_WIDTH = 1360,
    CANVAS_HEIGHT = 768,
    CANVAS_WIDTH_HALF = 0.5 * CANVAS_WIDTH,
    CANVAS_HEIGHT_HALF = 0.5 * CANVAS_HEIGHT,
    EDGEBOARD_X = 175,
    EDGEBOARD_Y = 90,
    DISABLE_SOUND_MOBILE = !1,
    FONT_GAME = "palamecia_titlingregular",
    FPS = 30,
    FPS_TIME = 1 / FPS,
    SNAKE_TYPES = 5,
    FRAMES_NUM_HELP = [null, 16, 17, 22],
    BUFFER_ANIM_MONITOR = [null, 80, 80, 80],
    PLAYER = 4,
    ENEMY_SNAKES = [0, 1, 2, 3],
    AI_PLAYER = 0,
    AI_FOODS = 1,
    COLLISION_OFFSET_FOOD = [{ x: -20, y: -10 }],
    REG_FOOD_OFFSET = [{ x: -12, y: 0 }],
    OPEN_MOUNTH_DISTANCE_RATE = 2,
    MOUNTH_OFFSET_DETECT = -50,
    EATEN_OFFSET_DETECT = -30,
    SNAKES_TOKEN_RADIUS_FOOD_DETECT = 10,
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_HELP = 1,
    STATE_GAME = 3,
    STATE_INIT = 0,
    STATE_PLAY = 1,
    STATE_FINISH = 2,
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    ON_DRAG_START = 4,
    ON_DRAG_END = 5,
    MENU_SNAKES_VELOCITY = 20,
    MENU_SNAKE_GOOD_ROTATION = 9,
    MENU_SNAKE_BAD_ROTATION = 5,
    MENU_SNAKE_GOOD_TIME_ROTATION = 150,
    MENU_SNAKE_BAD_TIME_ROTATION = 150,
    MENU_BAD_SNAKE_DELAY = 1500,
    WIDTH_OF_HORIZONTAL_RECT = 130,
    HEIGHT_OF_HORIZONTAL_RECT = 50,
    WIDTH_OF_VERTICAL_RECT = 60,
    HEIGHT_OF_VERTICAL_RECT = 320,
    MAX_AI_FOLLOW_PLAYER = 1,
    EATEN_FOOD_SNAKE_INTERVAL = 100,
    EDGES_PROPERTIES = { x: 0, y: 0, h: 2, w: 3, xMax: 0, yMax: 0 },
    SCROLL_LIMIT = { xMin: -1712, yMin: -1330, xMax: 0, yMax: 0 },
    PLAYER_CAMERA_OFFSET = { x: 680, y: 384 },
    SPAWN_FOODS_RANGE = { xMin: EDGES_PROPERTIES.x + EDGEBOARD_X, yMin: EDGES_PROPERTIES.y + EDGEBOARD_Y, xMax: 2048, yMax: 1024 },
    FIELD_SECTION_SUBDIVISION = { w: 5, h: 2, tot: 10 },
    FOODS_OCCURRENCE = [100],
    MAX_FOODS_INSTANCE = 100,
    FOOD_STATE = [4],
    AI_SNAKES = [
        { type: ENEMY_SNAKES[0], x: 250, y: 250, time_follow: 2e3 },
        { type: ENEMY_SNAKES[1], x: 2762, y: 250, time_follow: 3e3 },
        { type: ENEMY_SNAKES[2], x: 250, y: 1798, time_follow: 2500 },
        { type: ENEMY_SNAKES[3], x: 2762, y: 1798, time_follow: 3e3 },
    ],
    MS_TIME_SHOW_WIN_PANEL = 1e3,
    WAIT_TIME_UPDATE_POS_QUEUE = 30,
    START_QUEUE_SNAKES = [50, 40, 65, 80, 6],
    MS_DECREASE_TIME_EATEN_QUEUE = 250,
    LERP_RATE = 0.03,
    DISTANCE_SINGLE_QUEUE = 4,
    REG_Y_OFFSET_QUEUE = -36,
    INTERVAL_SPAWN_FOOD = 500,
    MS_FADE_TIME = 250,
    TIME_FOOD_SPAWN_ANIM = 1e3,
    WAIT_TIME_SPAWN_QUEUE = 250,
    TIME_SPAWN_QUEUE = 1e3,
    TIME_EATEN_EFFECT = 250,
    MAXT_TIME_WAIT_FOOD_SPAWN_ANIM = 250,
    MAX_AI_QUEUE_LENGTH = 100,
    SINGLE_QUEUE_RADIUS = 14,
    VERTICAL_RECT_STYLE_BLOCK,
    HORIZONTAL_RECT_STYLE_BLOCK,
    MAX_SECOND_FOR_ANIM_VERTICAL_RECT = 10,
    DISPLAY_SHOCK_X = 30,
    DISPLAY_SHOCK_Y = 50,
    DISTANCE_AI_DETECT_FOOD = 500,
    AI_ANGLE_DETECT_FOODS = (Math.PI / 180) * 30,
    COLLISION_DISTANCE_AI_PLAYER_FACTOR = 100,
    AI_TIME_CHANGE_DIR = { min: 2e3, max: 5e3 },
    AI_TIME_IGNORE_PLAYER = 1e3,
    AI_WAIT_TIME_FOR_CHANGE_DIR = { min: 250, max: 1e3 },
    CAN_PLAYER_EATEN_ENEMY = !1,
    SHOW_COLLISION_SHAPE = !1,
    SHOW_FIELD_OF_VIEW = !1,
    SHOW_FOODS_ID = !1,
    SHOW_SECTION_SHAPE = !1,
    ALLOW_SPEED_UP = !1,
    HERO_START_X = 1511,
    HERO_START_Y = 1024,
    HERO_ACCELLERATION,
    MAX_HERO_SPEED,
    ENABLE_FULLSCREEN,
    ENABLE_CHECK_ORIENTATION,
    TEXT_PRELOADER_CONTINUE = "START",
    TEXT_GAMEOVER = "GAME OVER",
    TEXT_SCORE = "SCORE",
    TEXT_BEST_SCORE = "BEST SCORE",
    TEXT_HELP1_PC = "Use arrow keys to drive your starship. Cross the screen from side to side to avoid blocks",
    TEXT_HELP1_MOBILE = "TOUCH THE LEFT OR RIGHT SIDE TO MOVE THE STARSHIP. Cross the screen from side to side to avoid blocks",
    TEXT_PAUSE = "PAUSE",
    TEXT_ARE_SURE = "ARE YOU SURE?",
    TEXT_DEVELOPED = "DEVELOPED BY",
    TEXT_MOVE = "MOVE",
    TEXT_EAT = "EAT",
    TEXT_AVOID = "AVOID",
    TEXT_SHARE_IMAGE = "200x200.jpg",
    TEXT_SHARE_TITLE = "Congratulations!",
    TEXT_SHARE_MSG1 = "You collected <strong>",
    TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!",
    TEXT_SHARE_SHARE1 = "My score is ",
    TEXT_SHARE_SHARE2 = " points! Can you do better?";
function CPreloader() {
    var b, d, a, e, c, g, f, h, m, n;
    this._init = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
        s_oSpriteLibrary.addSprite("but_start", "./sprites/but_start.png");
        s_oSpriteLibrary.loadSprites();
        n = new createjs.Container();
        s_oStage.addChild(n);
    };
    this.unload = function () {
        n.removeAllChildren();
        m.unload();
    };
    this._onImagesLoaded = function () {};
    this._onAllImagesLoaded = function () {
        this.attachSprites();
        s_oMain.preloaderReady();
    };
    this.attachSprites = function () {
        var r = new createjs.Shape();
        r.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        n.addChild(r);
        r = s_oSpriteLibrary.getSprite("200x200");
        f = createBitmap(r);
        f.regX = 0.5 * r.width;
        f.regY = 0.5 * r.height;
        f.x = CANVAS_WIDTH / 2;
        f.y = CANVAS_HEIGHT / 2 - 180;
        n.addChild(f);
        h = new createjs.Shape();
        h.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(f.x - 100, f.y - 100, 200, 200, 10);
        n.addChild(h);
        f.mask = h;
        r = s_oSpriteLibrary.getSprite("progress_bar");
        e = createBitmap(r);
        e.x = CANVAS_WIDTH / 2 - r.width / 2;
        e.y = CANVAS_HEIGHT / 2 + 50;
        n.addChild(e);
        b = r.width;
        d = r.height;
        c = new createjs.Shape();
        c.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(e.x, e.y, 1, d);
        n.addChild(c);
        e.mask = c;
        a = new createjs.Text("", "30px " + FONT_GAME, "#fff");
        a.x = CANVAS_WIDTH / 2;
        a.y = CANVAS_HEIGHT / 2 + 100;
        a.textBaseline = "alphabetic";
        a.textAlign = "center";
        n.addChild(a);
        r = s_oSpriteLibrary.getSprite("but_start");
        m = new CTextButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, r, TEXT_PRELOADER_CONTINUE, "Arial", "#000", 40, n);
        m.addEventListener(ON_MOUSE_UP, this._onButStartRelease, this);
        m.setVisible(!1);
        g = new createjs.Shape();
        g.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        n.addChild(g);
        createjs.Tween.get(g)
            .to({ alpha: 0 }, 500)
            .call(function () {
                createjs.Tween.removeTweens(g);
                n.removeChild(g);
            });
    };
    this._onButStartRelease = function () {
        s_oMain._onRemovePreloader();
    };
    this.refreshLoader = function (f) {
        a.text = f + "%";
        100 === f && (s_oMain._onRemovePreloader(), m.setVisible(!1), (a.visible = !1), (e.visible = !1));
        c.graphics.clear();
        f = Math.floor((f * b) / 100);
        c.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(e.x, e.y, f, d);
    };
    this._init();
}
function CMain(b) {
    var d,
        a = 0,
        e = 0,
        c = STATE_LOADING,
        g,
        f,
        h;
    this.initContainer = function () {
        var a = document.getElementById("canvas");
        s_oStage = new createjs.Stage(a);
        createjs.Touch.enable(s_oStage);
        s_oStage.preventSelection = !1;
        s_bMobile = jQuery.browser.mobile;
        !1 === s_bMobile &&
            (s_oStage.enableMouseOver(20),
            $("body").on("contextmenu", "#canvas", function (a) {
                return !1;
            }));
        s_iPrevTime = new Date().getTime();
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = FPS;
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary();
        seekAndDestroy() ? (g = new CPreloader()) : (window.location.href = "https://www.moneygames.app");
        d = !0;
    };
    this.soundLoaded = function () {
        a++;
        g.refreshLoader(Math.floor((a / e) * 100));
    };
    this._initSounds = function () {
        Howler.mute(!s_bAudioActive);
        s_aSoundsInfo = [];
        s_aSoundsInfo.push({ path: "./sounds/", filename: "snake_eating", loop: !1, volume: 1, ingamename: "snake_eating" });
        s_aSoundsInfo.push({ path: "./sounds/", filename: "click", loop: !1, volume: 1, ingamename: "click" });
        s_aSoundsInfo.push({ path: "./sounds/", filename: "game_over", loop: !1, volume: 1, ingamename: "game_over" });
        s_aSoundsInfo.push({ path: "./sounds/", filename: "snake_follow", loop: !1, volume: 1, ingamename: "snake_follow" });
        s_aSoundsInfo.push({ path: "./sounds/", filename: "scream", loop: !1, volume: 1, ingamename: "scream" });
        s_aSoundsInfo.push({ path: "./sounds/", filename: "soundtrack", loop: !0, volume: 1, ingamename: "soundtrack" });
        e += s_aSoundsInfo.length;
        s_aSounds = [];
        for (var a = 0; a < s_aSoundsInfo.length; a++) this.tryToLoadSound(s_aSoundsInfo[a], !1);
    };
    this.tryToLoadSound = function (a, b) {
        setTimeout(
            function () {
                s_aSounds[a.ingamename] = new Howl({
                    src: [a.path + a.filename + ".mp3"],
                    autoplay: !1,
                    preload: !0,
                    loop: a.loop,
                    volume: a.volume,
                    onload: s_oMain.soundLoaded,
                    onloaderror: function (a, b) {
                        for (var c = 0; c < s_aSoundsInfo.length; c++)
                            if (a === s_aSounds[s_aSoundsInfo[c].ingamename]._sounds[0]._id) {
                                s_oMain.tryToLoadSound(s_aSoundsInfo[c], !0);
                                break;
                            }
                    },
                    onplayerror: function (a) {
                        for (var b = 0; b < s_aSoundsInfo.length; b++)
                            if (a === s_aSounds[s_aSoundsInfo[b].ingamename]._sounds[0]._id) {
                                s_aSounds[s_aSoundsInfo[b].ingamename].once("unlock", function () {
                                    s_aSounds[s_aSoundsInfo[b].ingamename].play();
                                });
                                break;
                            }
                    },
                });
            },
            b ? 200 : 0
        );
    };
    this._loadImages = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("bg_help", "./sprites/bg_help.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("arrow", "./sprites/arrow.png");
        s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("food_0", "./sprites/food_0.png");
        s_oSpriteLibrary.addSprite("but_pause", "./sprites/but_pause.png");
        s_oSpriteLibrary.addSprite("but_continue", "./sprites/but_continue.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_not", "./sprites/but_not.png");
        s_oSpriteLibrary.addSprite("but_info", "./sprites/but_info.png");
        s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");
        s_oSpriteLibrary.addSprite("arrow_key", "./sprites/arrow_key.png");
        s_oSpriteLibrary.addSprite("edge_side_lr", "./sprites/edge_side_lr.png");
        s_oSpriteLibrary.addSprite("edge_side_ud", "./sprites/edge_side_ud.png");
        s_oSpriteLibrary.addSprite("logo", "./sprites/logo.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        for (var a = 1; 4 > a; a++) for (var b = 0; b < FRAMES_NUM_HELP[a]; b++) s_oSpriteLibrary.addSprite("help_" + a + "_" + b, "./sprites/help_" + a + "/help_" + a + "_" + b + ".jpg");
        for (b = 0; b < SNAKE_TYPES; b++) s_oSpriteLibrary.addSprite("snake_head_" + b, "./sprites/snake_head_" + b + ".png"), s_oSpriteLibrary.addSprite("snake_parts_" + b, "./sprites/snake_parts_" + b + ".png");
        e += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    this._onImagesLoaded = function () {
        a++;
        g.refreshLoader(Math.floor((a / e) * 100));
    };
    this._onAllImagesLoaded = function () {};
    this.preloaderReady = function () {
        this._loadImages();
        (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || this._initSounds();
        d = !0;
    };
    this._onRemovePreloader = function () {
        g.unload();
        s_oSoundTrack = playSound("soundtrack", 1, !0);
        this.gotoMenu();
    };
    this.gotoMenu = function () {
        f = new CMenu();
        c = STATE_MENU;
    };
    this.gotoGame = function () {
        h = new CGame(m);
        c = STATE_GAME;
    };
    this.gotoHelp = function () {
        new CHelp();
        c = STATE_HELP;
    };
    this.stopUpdate = function () {
        d = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || Howler.mute(!0);
    };
    this.startUpdate = function () {
        s_iPrevTime = new Date().getTime();
        d = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) && s_bAudioActive && Howler.mute(!1);
    };
    this._update = function (a) {
        if (!1 !== d) {
            var b = new Date().getTime();
            s_iTimeElaps = b - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = b;
            1e3 <= s_iCntTime && ((s_iCurFps = s_iCntFps), (s_iCntTime -= 1e3), (s_iCntFps = 0));
            c === STATE_GAME ? h.update() : c === STATE_MENU && f.update();
            s_oStage.update(a);
        }
    };
    s_oMain = this;
    var m = b;
    ENABLE_CHECK_ORIENTATION = b.check_orientation;
    ENABLE_FULLSCREEN = b.fullscreen;
    this.initContainer();
}
var s_bMobile,
    s_bAudioActive = !1,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_iSpeedBlock,
    s_oDrawLayer,
    s_oStage,
    s_oScrollStage,
    s_oMain,
    s_oSpriteLibrary,
    s_oSoundTrack = null,
    s_bFullscreen = !1,
    s_aSounds,
    s_aSoundsInfo;
function CTextButton(b, d, a, e, c, g, f, h) {
    var m, n, r, l, p;
    this._init = function (a, b, c, f, e, d, g, h) {
        m = [];
        n = [];
        var l = createBitmap(c),
            p = Math.ceil(g / 20),
            v = new createjs.Text(f, "bold " + g + "px " + e, "#000000");
        v.textAlign = "center";
        v.textBaseline = "alphabetic";
        var q = v.getBounds();
        v.x = c.width / 2 + p;
        v.y = Math.floor(c.height / 2) + q.height / 3 + p;
        f = new createjs.Text(f, "bold " + g + "px " + e, d);
        f.textAlign = "center";
        f.textBaseline = "alphabetic";
        q = f.getBounds();
        f.x = c.width / 2;
        f.y = Math.floor(c.height / 2) + q.height / 3;
        r = new createjs.Container();
        r.x = a;
        r.y = b;
        r.regX = c.width / 2;
        r.regY = c.height / 2;
        r.addChild(l, f);
        s_bMobile || (r.cursor = "pointer");
        h.addChild(r);
        this._initListener();
    };
    this.unload = function () {
        r.off("mousedown", l);
        r.off("pressup", p);
        h.removeChild(r);
    };
    this.setVisible = function (a) {
        r.visible = a;
    };
    this._initListener = function () {
        oParent = this;
        l = r.on("mousedown", this.buttonDown);
        p = r.on("pressup", this.buttonRelease);
    };
    this.addEventListener = function (a, b, c) {
        m[a] = b;
        n[a] = c;
    };
    this.buttonRelease = function () {
        r.scaleX = 1;
        r.scaleY = 1;
        playSound("click", 1, !1);
        m[ON_MOUSE_UP] && m[ON_MOUSE_UP].call(n[ON_MOUSE_UP]);
    };
    this.buttonDown = function () {
        r.scaleX = 0.9;
        r.scaleY = 0.9;
        m[ON_MOUSE_DOWN] && m[ON_MOUSE_DOWN].call(n[ON_MOUSE_DOWN]);
    };
    this.setPosition = function (a, b) {
        r.x = a;
        r.y = b;
    };
    this.setX = function (a) {
        r.x = a;
    };
    this.setY = function (a) {
        r.y = a;
    };
    this.getButtonImage = function () {
        return r;
    };
    this.getX = function () {
        return r.x;
    };
    this.getY = function () {
        return r.y;
    };
    this._init(b, d, a, e, c, g, f, h);
    return this;
}
function CToggle(b, d, a, e, c) {
    var g, f, h, m, n, r, l;
    this._init = function (a, b, c, e, d) {
        n = void 0 !== d ? d : s_oStage;
        f = [];
        h = [];
        d = new createjs.SpriteSheet({ images: [c], frames: { width: c.width / 2, height: c.height, regX: c.width / 2 / 2, regY: c.height / 2 }, animations: { state_true: [0], state_false: [1] } });
        g = e;
        m = createSprite(d, "state_" + g, c.width / 2 / 2, c.height / 2, c.width / 2, c.height);
        m.x = a;
        m.y = b;
        m.stop();
        s_bMobile || (m.cursor = "pointer");
        n.addChild(m);
        this._initListener();
    };
    this.unload = function () {
        m.off("mousedown", r);
        m.off("pressup", l);
        n.removeChild(m);
    };
    this._initListener = function () {
        r = m.on("mousedown", this.buttonDown);
        l = m.on("pressup", this.buttonRelease);
    };
    this.addEventListener = function (a, b, c) {
        f[a] = b;
        h[a] = c;
    };
    this.setCursorType = function (a) {
        m.cursor = a;
    };
    this.setActive = function (a) {
        g = a;
        m.gotoAndStop("state_" + g);
    };
    this.buttonRelease = function () {
        m.scaleX = 1;
        m.scaleY = 1;
        playSound("click", 1, !1);
        g = !g;
        m.gotoAndStop("state_" + g);
        f[ON_MOUSE_UP] && f[ON_MOUSE_UP].call(h[ON_MOUSE_UP], g);
    };
    this.buttonDown = function () {
        m.scaleX = 0.9;
        m.scaleY = 0.9;
        f[ON_MOUSE_DOWN] && f[ON_MOUSE_DOWN].call(h[ON_MOUSE_DOWN]);
    };
    this.setPosition = function (a, b) {
        m.x = a;
        m.y = b;
    };
    this._init(b, d, a, e, c);
}
function CGfxButton(b, d, a, e) {
    var c,
        g,
        f,
        h,
        m,
        n,
        r,
        l,
        p = !1;
    this._init = function (a, b, e) {
        c = [];
        g = [];
        h = [];
        f = createBitmap(e);
        f.x = a;
        f.y = b;
        n = m = 1;
        f.regX = e.width / 2;
        f.regY = e.height / 2;
        s_bMobile || (f.cursor = "pointer");
        v.addChild(f);
        this._initListener();
    };
    this.unload = function () {
        f.off("mousedown", r);
        f.off("pressup", l);
        v.removeChild(f);
    };
    this.setVisible = function (a) {
        f.visible = a;
    };
    this.setCursorType = function (a) {
        f.cursor = a;
    };
    this._initListener = function () {
        r = f.on("mousedown", this.buttonDown);
        l = f.on("pressup", this.buttonRelease);
    };
    this.addEventListener = function (a, b, f) {
        c[a] = b;
        g[a] = f;
    };
    this.addEventListenerWithParams = function (a, b, f, e) {
        c[a] = b;
        g[a] = f;
        h[a] = e;
    };
    this.buttonRelease = function () {
        p || ((f.scaleX = 0 < m ? 1 : -1), (f.scaleY = 1), playSound("click", 1, !1), c[ON_MOUSE_UP] && c[ON_MOUSE_UP].call(g[ON_MOUSE_UP], h[ON_MOUSE_UP]));
    };
    this.buttonDown = function () {
        p || ((f.scaleX = 0 < m ? 0.9 : -0.9), (f.scaleY = 0.9), c[ON_MOUSE_DOWN] && c[ON_MOUSE_DOWN].call(g[ON_MOUSE_DOWN], h[ON_MOUSE_DOWN]));
    };
    this.rotation = function (a) {
        f.rotation = a;
    };
    this.getButton = function () {
        return f;
    };
    this.setPosition = function (a, b) {
        f.x = a;
        f.y = b;
    };
    this.setX = function (a) {
        f.x = a;
    };
    this.setY = function (a) {
        f.y = a;
    };
    this.getButtonImage = function () {
        return f;
    };
    this.block = function (a) {
        p = a;
        f.scaleX = m;
        f.scaleY = n;
    };
    this.setScaleX = function (a) {
        m = f.scaleX = a;
    };
    this.getX = function () {
        return f.x;
    };
    this.getY = function () {
        return f.y;
    };
    this.pulseAnimation = function () {
        createjs.Tween.get(f)
            .to({ scaleX: 0.9 * m, scaleY: 0.9 * n }, 850, createjs.Ease.quadOut)
            .to({ scaleX: m, scaleY: n }, 650, createjs.Ease.quadIn)
            .call(function () {
                w.pulseAnimation();
            });
    };
    this.trebleAnimation = function () {
        createjs.Tween.get(f)
            .to({ rotation: 5 }, 75, createjs.Ease.quadOut)
            .to({ rotation: -5 }, 140, createjs.Ease.quadIn)
            .to({ rotation: 0 }, 75, createjs.Ease.quadIn)
            .wait(750)
            .call(function () {
                w.trebleAnimation();
            });
    };
    this.removeAllTweens = function () {
        createjs.Tween.removeTweens(f);
    };
    var v = void 0 !== e ? e : s_oStage;
    this._init(b, d, a);
    var w = this;
    return this;
}
function CCreditsPanel() {
    var b, d, a, e, c, g;
    this._init = function () {
        b = new createjs.Shape();
        b.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        b.alpha = 0;
        s_oStage.addChild(b);
        createjs.Tween.get(b).to({ alpha: 0.7 }, 500);
        c = new createjs.Shape();
        c.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        c.alpha = 0.01;
        g = c.on("click", this._onLogoButRelease);
        s_oStage.addChild(c);
        d = new createjs.Container();
        s_oStage.addChild(d);
        var f = s_oSpriteLibrary.getSprite("msg_box"),
            h = createBitmap(f);
        h.regX = f.width / 2;
        h.regY = f.height / 2;
        d.addChild(h);
        d.x = CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT / 2;
        d.alpha = 0;
        createjs.Tween.get(d).to({ alpha: 1 }, 500);
        h = new createjs.Text(TEXT_DEVELOPED, " 40px " + FONT_GAME, "#000");
        h.y = -f.height / 2 + 130;
        h.textAlign = "center";
        h.textBaseline = "middle";
        h.lineWidth = 500;
        h.outline = 4;
        d.addChild(h);
        h = new createjs.Text(TEXT_DEVELOPED, " 40px " + FONT_GAME, "#ff6c00");
        h.y = -f.height / 2 + 130;
        h.textAlign = "center";
        h.textBaseline = "middle";
        h.lineWidth = 500;
        d.addChild(h);
        f = new createjs.Text("WWW.CODETHISLAB.COM", " 40px " + FONT_GAME, "#000");
        f.y = 100;
        f.textAlign = "center";
        f.textBaseline = "middle";
        f.lineWidth = 500;
        f.outline = 4;
        d.addChild(f);
        f = new createjs.Text("WWW.CODETHISLAB.COM", " 40px " + FONT_GAME, "#ff6c00");
        f.y = 100;
        f.textAlign = "center";
        f.textBaseline = "middle";
        f.lineWidth = 500;
        d.addChild(f);
        f = s_oSpriteLibrary.getSprite("logo_ctl");
        e = createBitmap(f);
        e.regX = f.width / 2;
        e.regY = f.height / 2;
        d.addChild(e);
        f = s_oSpriteLibrary.getSprite("but_exit");
        a = new CGfxButton(315, -155, f, d);
        a.addEventListener(ON_MOUSE_UP, this.unload, this);
    };
    this.unload = function () {
        s_oStage.removeChild(c);
        c.off("click", g);
        a.block(!0);
        createjs.Tween.get(b).to({ alpha: 0 }, 500);
        createjs.Tween.get(d)
            .to({ alpha: 0 }, 500)
            .call(function () {
                s_oStage.removeChild(b);
                s_oStage.removeChild(d);
                a.unload();
            });
    };
    this._onLogoButRelease = function () {
        window.open("http://www.codethislab.com/index.php?&l=en");
    };
    this._onMoreGamesReleased = function () {
        window.open("http://codecanyon.net/collections/5409142-games");
    };
    this._init();
}
function CMenu() {
    var b,
        d,
        a,
        e,
        c,
        g,
        f,
        h,
        m,
        n,
        r,
        l,
        p,
        v,
        w,
        y = null,
        C = null;
    this._init = function () {
        CBackground(s_oStage);
        v = new createjs.Container();
        v.alpha = 0;
        s_oStage.addChild(v);
        var x = s_oSpriteLibrary.getSprite("but_play");
        c = CANVAS_WIDTH / 2;
        g = CANVAS_HEIGHT - 200;
        m = new CGfxButton(c, g, x, v);
        m.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        m.pulseAnimation();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            (x = s_oSpriteLibrary.getSprite("audio_icon")), (f = CANVAS_WIDTH - x.height / 2 - 10), (h = x.height / 2 + 10), (l = new CToggle(f, h, x, s_bAudioActive, v)), l.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        x = s_oSpriteLibrary.getSprite("but_info");
        a = x.height / 2 + 10;
        e = x.height / 2 + 10;
        n = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 240, x, v);
        n.addEventListener(ON_MOUSE_UP, this._onCreditsBut, this);
        p = new CAnimMenu(s_oStage);
        s_oStage.addChild(v);
        x = window.document;
        var E = x.documentElement;
        y = E.requestFullscreen || E.mozRequestFullScreen || E.webkitRequestFullScreen || E.msRequestFullscreen;
        C = x.exitFullscreen || x.mozCancelFullScreen || x.webkitExitFullscreen || x.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (y = !1);
        y &&
            screenfull.enabled &&
            ((x = s_oSpriteLibrary.getSprite("but_fullscreen")), (b = a + x.width / 2 + 10), (d = x.height / 2 + 10), (w = new CToggle(b, d, x, s_bFullscreen, v)), w.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        r = new createjs.Shape();
        r.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(r);
        createjs.Tween.get(r)
            .to({ alpha: 0 }, MS_FADE_TIME, createjs.Ease.cubicOut)
            .call(function () {
                r.visible = !1;
            });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };
    this.animContainerGUI = function () {
        createjs.Tween.get(v).to({ alpha: 1 }, 500, createjs.Ease.cubicOut);
    };
    this.refreshButtonPos = function (c, g) {
        n.setPosition(a + c, g + e);
        (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || l.setPosition(f - c, g + h);
        y && screenfull.enabled && w.setPosition(b + c, d + g);
    };
    this.unload = function () {
        m.unload();
        m = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) l.unload(), (l = null);
        y && screenfull.enabled && w.unload();
        s_oStage.removeAllChildren();
        s_oMenu = null;
    };
    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    this._onCreditsBut = function () {
        new CCreditsPanel();
    };
    this._onButPlayRelease = function () {
        r.visible = !0;
        createjs.Tween.get(r)
            .to({ alpha: 1 }, MS_FADE_TIME, createjs.Ease.cubicOut)
            .call(function () {
                s_oMenu.unload();
                s_oMain.gotoGame();
                $(s_oMain).trigger("start_session");
            });
    };
    this.resetFullscreenBut = function () {
        y && screenfull.enabled && w.setActive(s_bFullscreen);
    };
    this._onFullscreenRelease = function () {
        s_bFullscreen ? C.call(window.document) : y.call(window.document.documentElement);
        sizeHandler();
    };
    this.update = function () {
        p.update();
    };
    s_oMenu = this;
    this._init();
}
var s_oMenu = null;
function CGame(b) {
    var d, a, e, c;
    function g(a) {
        if (!1 !== y)
            switch (a.keyCode) {
                case 38:
                    s_oGame.onKeyUpUp();
                    break;
                case 37:
                case 39:
                    C = !1;
            }
    }
    function f(a) {
        if (!1 === y || C) return a.preventDefault(), !1;
        a || (a = window.event);
        switch (a.keyCode) {
            case 37:
                s_oGame.onLeft();
                break;
            case 39:
                s_oGame.onRight();
                break;
            case 38:
                s_oGame.onKeyDownUp();
        }
        a.preventDefault();
        return !1;
    }
    var h,
        m,
        n,
        r,
        l,
        p,
        v,
        w,
        y = !1,
        C = !1,
        x,
        E = STATE_INIT,
        D,
        J,
        H,
        B,
        F,
        q = LERP_RATE,
        I,
        N,
        K;
    this._init = function () {
        w = new createjs.Container();
        s_oScrollStage = new createjs.Container();
        s_oStage.addChild(s_oScrollStage);
        new CBackground(s_oScrollStage);
        x = 0;
        B = [];
        H = [];
        setVolume("soundtrack", 0.4);
        F = 0;
        l = new CEdges(w);
        v = new CManageSections();
        r = new CManageFoods(s_oScrollStage);
        p = new CControlAiSnakes();
        D = HERO_SPEED;
        this.createPlayerSnake();
        x = J = START_QUEUE_SNAKES[PLAYER];
        this.resetCameraOnPlayer();
        d = SCROLL_LIMIT.xMax;
        a = SCROLL_LIMIT.xMin;
        e = SCROLL_LIMIT.yMax;
        c = SCROLL_LIMIT.yMin;
        this.addEnemySnakes();
        s_oScrollStage.addChild(w);
        !1 === s_bMobile ? ((document.onkeydown = f), (document.onkeyup = g)) : this.createControl();
        m = new CInterface();
        m.refreshScore(x);
        m.refreshBestScore(J, !1);
        n = new createjs.Shape();
        n.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(n);
        createjs.Tween.get(n)
            .to({ alpha: 0 }, MS_FADE_TIME, createjs.Ease.cubicOut)
            .call(function () {
                n.visible = !1;
            });
    };
    this.resetCameraOnPlayer = function () {
        s_oScrollStage.x += h.getDir().getX() * HERO_SPEED + (PLAYER_CAMERA_OFFSET.x - h.getLocalPos().x);
        s_oScrollStage.y += h.getDir().getY() * HERO_SPEED + (PLAYER_CAMERA_OFFSET.y - h.getLocalPos().y);
    };
    this.unload = function () {
        y = !1;
        stopSound("soundtrack");
        s_bMobile && (I.off("mousedown", N), I.off("pressup", K));
        s_oStage.removeAllChildren();
        createjs.Tween.removeAllTweens();
        s_oGame = null;
        m.unload();
    };
    this.createPlayerSnake = function () {
        var a = PLAYER,
            b = s_oSpriteLibrary.getSprite("snake_head_" + a);
        h = new CSnake(HERO_START_X, HERO_START_Y, b, a, START_QUEUE_SNAKES[a], null, s_oScrollStage);
        B.push(h);
    };
    this.addEnemySnakes = function () {
        for (var a = 0, b = 0; b < AI_SNAKES.length; b++) {
            var c = AI_SNAKES[b].type,
                f = s_oSpriteLibrary.getSprite("snake_head_" + c);
            c = new CSnake(AI_SNAKES[b].x, AI_SNAKES[b].y, f, c, START_QUEUE_SNAKES[c], a, s_oScrollStage);
            H.push(c);
            B.push(c);
            p.addSnakeToAI(c);
            a++;
        }
    };
    this.createControl = function () {
        I = new createjs.Shape();
        I.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(I);
        N = I.on("mousedown", this.onPressStart);
        K = I.on("pressup", this.onPressRelease);
    };
    this.onPressStart = function (a) {
        if (a.stageX < 0.5 * CANVAS_WIDTH) s_oGame.onLeft();
        else if (a.stageX > 0.5 * CANVAS_WIDTH) s_oGame.onRight();
    };
    this.onPressRelease = function () {
        s_oGame.onKeyReleased();
    };
    this.onRestart = function () {
        F = 0;
        this.unloadASnake(h);
        for (var a = 0; a < H.length; a++) this.unloadASnake(H[a]), p.removeSnakeByID(a);
        B = [];
        H = [];
        p.reset();
        C = !1;
        this.createPlayerSnake();
        this.scrollStage(h, D);
        q = 0.1;
        createjs.Tween.get(this)
            .wait(750)
            .call(function () {
                q = LERP_RATE;
            });
        this.addEnemySnakes();
        x = h.getLengthQueue();
        m.refreshScore(x);
        playExistingSound("soundtrack");
        s_oScrollStage.setChildIndex(w, s_oScrollStage.numChildren - 1);
        r.restoresAllEatenFood();
        E = STATE_PLAY;
        s_oGame.unpause(!0);
    };
    this.unloadASnake = function (a) {
        a.unloadQueue();
        a.unload();
    };
    this.onKeyDownUp = function () {
        ALLOW_SPEED_UP && (D = HERO_SPEED_UP);
    };
    this.onKeyUpUp = function () {
        D = HERO_SPEED;
    };
    this.getPlayerSnake = function () {
        return h;
    };
    this.getSnakesArray = function () {
        return B;
    };
    this.onLeft = function () {
        h.getEaten() || ((C = !0), (F = -HERO_ROT_SPEED));
    };
    this.onRight = function () {
        h.getEaten() || ((C = !0), (F = HERO_ROT_SPEED));
    };
    this.onKeyReleased = function () {
        C = !1;
    };
    this.onExit = function () {
        n.visible = !0;
        createjs.Tween.get(n, { ignoreGlobalPause: !0 })
            .to({ alpha: 1 }, MS_FADE_TIME, createjs.Ease.cubicOut)
            .call(function () {
                s_oGame.unpause(!0);
                s_oGame.unload();
                $(s_oMain).trigger("end_session");
                playExistingSound("soundtrack");
                setVolume("soundtrack", 1);
                s_oMain.gotoMenu();
            });
    };
    this._onExitHelp = function () {
        m.onExitFromHelp();
        y = !0;
        E = STATE_PLAY;
        $(s_oMain).trigger("start_level", 1);
    };
    this.updateScrollLimit = function (b, f) {
        d = SCROLL_LIMIT.xMax + b;
        a = SCROLL_LIMIT.xMin - b;
        e = SCROLL_LIMIT.yMax + f;
        c = SCROLL_LIMIT.yMin - f;
    };
    this.scrollStage = function (b) {
        s_oScrollStage.x += b.getDir().getX() * HERO_SPEED + (PLAYER_CAMERA_OFFSET.x - b.getLocalPos().x) * q;
        s_oScrollStage.y += b.getDir().getY() * HERO_SPEED + (PLAYER_CAMERA_OFFSET.y - b.getLocalPos().y) * q;
        s_oScrollStage.x < a ? (s_oScrollStage.x = a) : s_oScrollStage.x > d && (s_oScrollStage.x = d);
        s_oScrollStage.y < c ? (s_oScrollStage.y = c) : s_oScrollStage.y > e && (s_oScrollStage.y = e);
    };
    this.cutQueueAt = function (a, b) {
        a.cutQueueAtPoint(b);
    };
    this.unpause = function (a) {
        y = a;
        createjs.Ticker.paused = !a;
    };
    this.snakeCloseMounthAnim = function (a) {
        a.changeState("close");
        a.setIgnoreAnim(!0);
        a.onAnimationEnd();
    };
    this.manageCollision = function () {
        this.snakeSection();
        this.snakeFoodsCollision();
        this.snakeEdgesCollision();
        this.snakesCollisions();
    };
    this.snakesCollisions = function () {
        for (var a = 0; a < H.length; a++) this.snakesHeadHeadCollision(h, H[a]), this.snakesHeadQueueCollision(h, H[a]);
    };
    this.snakesHeadHeadCollision = function (a, b) {
        a.getEaten() ||
            (this.snakeOpenMounth(a, b), this.circleToCircleCollision(a.getPos(), b.getPos(), a.getDim().h, b.getDim().h) && ((C = !1), a.die(), createjs.Tween.get(this).wait(MS_TIME_SHOW_WIN_PANEL).call(this.onDiePlayerSnake)));
    };
    this.snakesHeadQueueCollision = function (a, b) {
        if (b.getTarget().target === AI_PLAYER && !a.getEaten())
            for (var c = a.getQueue(), f = c.length - 2; 0 < f; f--)
                if ((this.snakeOpenMounth(b, c[f]), this.circleToCircleCollision(c[f].getPos(), b.getPos(), c[f].getDim().h, b.getDim().w))) {
                    this.cutQueueAt(a, f);
                    "damage_open" !== a.getCurrentAnimation() && "remain_damage" !== a.getCurrentAnimation() && a.changeState("damage_open");
                    b.getSubAI().setFollowTime(b.getSubAI().getFollowTime() - MS_DECREASE_TIME_EATEN_QUEUE);
                    a.screamingSound();
                    this.snakeCloseMounthAnim(b);
                    x = a.getLengthQueue();
                    //console.log(x);
                    m.refreshScore(x);
                    break;
                }
    };
    this.snakeSection = function () {
        for (var a = v.getSections(), b = 0; b < B.length; b++)
            for (var c = 0; c < a.length; c++)
                if (a[c].getRect().intersects(B[b].getRectangle())) {
                    B[b].setSectionID(a[c].getID());
                    break;
                }
    };
    this.snakeEdgesCollision = function () {
        for (var a = l.getRectangles(), b = 0; b < B.length; b++) for (var c = 0; c < a.length; c++) a[c].rect.intersects(B[b].getRectangle()) && B[b].bounce(a[c].normal);
    };
    this.snakeEatenFood = function (a, b) {
        a.getType() === PLAYER && (this.updateScoreFood(), a.eatingSound());
        a.setTarget({ result: !1 });
        b.setEaten(!0);
        b.eatenAnim(a.getPos());
        a.eatenEffect();
        for (var c = 0; c < H.length && !(a.getType() === ENEMY_SNAKES[c] && a.getLengthQueue() >= MAX_AI_QUEUE_LENGTH); c++);
    };
    this.snakeFoodsCollision = function () {
        for (var a = 0; a < B.length; a++)
            for (var b = v.getSectionByID(B[a].getSectionID()).getFoodsSection(), c = 0; c < b.length; c++)
                if ((this.snakeOpenMounth(B[a], b[c]), !b[c].getEaten())) {
                    var f = B[a].getPos();
                    f.y += EATEN_OFFSET_DETECT * B[a].getDir().getY();
                    f.x += EATEN_OFFSET_DETECT * B[a].getDir().getX();
                    this.circleToCircleCollision(f, b[c].getPos(), SNAKES_TOKEN_RADIUS_FOOD_DETECT, b[c].getDim().w) && this.snakeEatenFood(B[a], b[c]);
                }
    };
    this.snakeOpenMounth = function (a, b) {
        var c = !1;
        if (!b.getEaten()) {
            var f = a.getPos();
            f.y += MOUNTH_OFFSET_DETECT * a.getDir().getY();
            f.x += MOUNTH_OFFSET_DETECT * a.getDir().getX();
            this.circleToCircleCollision(f, b.getPos(), a.getOpenMounthDim().h, b.getDim().w) && (c = !0);
        }
        this.actionOpenMounth(a, c);
    };
    this.actionOpenMounth = function (a, b) {
        b
            ? "open" !== a.getCurrentAnimation() &&
              "remain_open" !== a.getCurrentAnimation() &&
              "damage_close" !== a.getCurrentAnimation() &&
              ("remain_damage" === a.getCurrentAnimation() ? a.changeState("damage_close") : a.changeState("open"))
            : ("open" === a.getCurrentAnimation() || "remain_open" === a.getCurrentAnimation()) && a.changeState("close");
    };
    this.circleToCircleCollision = function (a, b, c, f) {
        a = distance(a, b);
        return c + f > a ? !0 : !1;
    };
    this.onDiePlayerSnake = function () {
        stopSound("soundtrack");
        m.createEndPanel(J);
        console.log(J);
        if(J > lastscore ){
            db.collection("TournamentUser").doc(gameId).update({
                Score: J,
                timeStamp: timeStamp
            })
            .then(function() {
                console.log("Game score updated");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        }
        else {
            console.log("Game score is not highest");
        }
    };
    this.onDieEnemySnake = function (a) {
        H.splice(a, 1);
        p.removeSnakeByID(a);
    };
    this.updateScoreFood = function () {
        x++;
        m.refreshScore(x);
       // console.log(J);
        x > J && ((J = x), m.refreshBestScore(J, !0));
    };
    this._updatePlay = function () {
        y && (C && h.rotation(F), h.update(D), this.scrollStage(h, D), r.update(), this.manageCollision(), p.update());
    };
    this.update = function () {
        switch (E) {
            case STATE_INIT:
                null !== s_oHelp && s_oHelp.update();
                break;
            case STATE_PLAY:
                this._updatePlay();
        }
    };
    s_oGame = this;
    HERO_ROT_SPEED = b.hero_rotation_speed;
    HERO_SPEED = b.hero_speed;
    HERO_SPEED_UP = b.hero_speed_up;
    FOOD_SCORE = b.food_score;
    SNAKES_AI_SPEED = b.snakes_AI_speed;
    this._init();
}
var s_oGame;
function CInterface() {
    var b,
        d,
        a,
        e,
        c,
        g,
        f,
        h,
        m,
        n,
        r,
        l,
        p,
        v,
        w,
        y,
        C,
        x,
        E,
        D,
        J,
        H,
        B,
        F,
        q,
        I,
        N,
        K = null,
        L = null;
    this._init = function () {
        p = CANVAS_WIDTH / 2 - 50;
        v = 55;
        E = new createjs.Text(TEXT_SCORE + ": 0", "32px " + FONT_GAME, "#ffffff");
        E.x = p;
        E.y = v;
        E.textAlign = "left";
        E.regY = 0.5 * E.getBounds().height;
        s_oStage.addChild(E);
        r = CANVAS_WIDTH / 2 - 550;
        l = 55;
        D = new createjs.Text(TEXT_BEST_SCORE + ": 0", "32px " + FONT_GAME, "#ffffff");
        D.x = r;
        D.y = l;
        D.textAlign = "left";
        D.regX = 0.5 * D.getBounds().width;
        D.regY = 0.5 * D.getBounds().height;
        s_oStage.addChild(D);
        var G = s_oSpriteLibrary.getSprite("but_exit");
        a = CANVAS_WIDTH - G.height / 2 - 20;
        e = G.height / 2 + 20;
        C = new CGfxButton(a, e, G, s_oStage);
        C.addEventListener(ON_MOUSE_UP, this._onExit, this);
        G = s_oSpriteLibrary.getSprite("but_pause");
        b = a - G.height - 20;
        d = e;
        x = new CGfxButton(b, d, G, s_oStage);
        x.addEventListener(ON_MOUSE_UP, this._onPause, this);
        !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile
            ? ((G = s_oSpriteLibrary.getSprite("audio_icon")),
              (w = b - G.height - 20),
              (y = e),
              (H = new CToggle(w, y, G, s_bAudioActive, s_oStage)),
              H.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
              (c = w - G.width / 2 - 20),
              (g = d))
            : ((c = b - G.height - 20), (g = e));
        G = window.document;
        var q = G.documentElement;
        K = q.requestFullscreen || q.mozRequestFullScreen || q.webkitRequestFullScreen || q.msRequestFullscreen;
        L = G.exitFullscreen || G.mozCancelFullScreen || G.webkitExitFullscreen || G.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (K = !1);
        K && screenfull.enabled && ((G = s_oSpriteLibrary.getSprite("but_fullscreen")), (N = new CToggle(c, g, G, s_bFullscreen, s_oStage)), N.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        s_bMobile &&
            ((m = 0.5 * CANVAS_WIDTH - 430 - EDGEBOARD_X),
            (n = 0.5 * CANVAS_HEIGHT + 220 + EDGEBOARD_Y),
            (G = s_oSpriteLibrary.getSprite("arrow")),
            (B = createBitmap(G)),
            (B.regX = 0.5 * G.width),
            (B.regY = 0.5 * G.height),
            (B.x = m),
            (B.y = n),
            (B.scaleX = -1),
            s_oStage.addChild(B),
            (f = 0.5 * CANVAS_WIDTH + 430 + EDGEBOARD_X),
            (h = 0.5 * CANVAS_HEIGHT + 220 + EDGEBOARD_Y),
            (F = createBitmap(G)),
            (F.regX = 0.5 * G.width),
            (F.regY = 0.5 * G.height),
            (F.x = f),
            (F.y = h),
            s_oStage.addChild(F));
        J = new CHelpPanel(0, 0, s_oSpriteLibrary.getSprite("bg_help"));
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };
    this.refreshButtonPos = function (p, q) {
        C.setPosition(a - p, q + e);
        x.setPosition(b - p, q + d);
        (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || H.setPosition(w - p, q + y);
        K && screenfull.enabled && N.setPosition(c - p, g + q);
        D.x = r + p;
        D.y = l + q;
        s_bMobile && ((B.x = m + p), (B.y = n - q), (F.x = f - p), (F.y = h - q));
        E.y = v + q;
        s_oGame.updateScrollLimit(p, q);
    };
    this.unload = function () {
        C.unload();
        C = null;
        J.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) H.unload(), (H = null);
        K && screenfull.enabled && N.unload();
        s_oInterface = null;
    };
    this.refreshScore = function (a) {
        E.text = TEXT_SCORE + ": " + a;
    };
    this.refreshBestScore = function (a, b) {
        D.text = TEXT_BEST_SCORE + ": " + a;
        b && ((D.color = "#ffff00"), createjs.Tween.get(D, { override: !0 }).to({ scaleX: 1.1, scaleY: 1.1 }, 500, createjs.Ease.cubicOut).to({ scaleX: 1, scaleY: 1 }, 500, createjs.Ease.cubicIn).set({ color: "#fff" }));
    };
    this._onPause = function () {
        s_oGame.unpause(!1);
        this.createPauseInterface();
    };
    this.createPauseInterface = function () {
        q = new CPause();
    };
    this.createEndPanel = function (a) {
        I = new CEndPanel(s_oSpriteLibrary.getSprite("msg_box"));
        I.show(a);
    };
    this.unloadPause = function () {
        q.unload();
        q = null;
    };
    this.onExitFromHelp = function () {
        J.unload();
    };
    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    this._onExit = function () {
        new CAreYouSurePanel(s_oStage).show();
    };
    this.resetFullscreenBut = function () {
        K && screenfull.enabled && N.setActive(s_bFullscreen);
    };
    this._onFullscreenRelease = function () {
        s_bFullscreen ? L.call(window.document) : K.call(window.document.documentElement);
        sizeHandler();
    };
    s_oInterface = this;
    this._init();
    return this;
}
var s_oInterface = null;
function CHelpPanel(b, d, a) {
    var e, c, g, f, h, m, n;
    this._init = function (a, b, d) {
        c = new createjs.Container();
        c.x = a;
        c.y = b;
        g = new createjs.Shape();
        g.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        g.alpha = 0.5;
        c.addChild(g);
        e = createBitmap(d);
        e.x = CANVAS_WIDTH_HALF;
        e.y = CANVAS_HEIGHT_HALF;
        e.regX = 0.5 * d.width;
        e.regY = 0.5 * d.height;
        c.addChild(e);
        a = new createjs.Text(TEXT_MOVE, "60px " + FONT_GAME, "#000000");
        a.textAlign = "center";
        a.lineWidth = 300;
        a.lineHeight = 44;
        a.textBaseline = "middle";
        a.x = 0.5 * CANVAS_WIDTH - 150;
        a.y = 0.5 * CANVAS_HEIGHT - 140;
        a.outline = 4;
        c.addChild(a);
        b = new createjs.Text(TEXT_MOVE, "60px " + FONT_GAME, "#ff6c00");
        b.textAlign = "center";
        b.textBaseline = "middle";
        b.lineWidth = 300;
        b.lineHeight = a.lineHeight;
        b.x = a.x;
        b.y = a.y;
        c.addChild(b);
        f = new CAnimHelp(1, CANVAS_WIDTH_HALF + 220, a.y + 50, c);
        b = "arrow_key";
        a = 0.5;
        s_bMobile && ((b = "arrow"), (a = 0.4));
        b = s_oSpriteLibrary.getSprite(b);
        d = createBitmap(b);
        d.x = CANVAS_WIDTH_HALF + 50;
        d.y = CANVAS_HEIGHT_HALF - 140;
        d.regX = 0.5 * b.width;
        d.regY = 0.5 * b.height;
        d.scaleX = -a;
        d.scaleY = a;
        c.addChild(d);
        var l = createBitmap(b);
        l.x = CANVAS_WIDTH_HALF + 190;
        l.y = d.y;
        l.regX = 0.5 * b.width;
        l.regY = 0.5 * b.height;
        l.scaleX = a;
        l.scaleY = a;
        c.addChild(l);
        a = new createjs.Text(TEXT_EAT, "60px " + FONT_GAME, "#000000");
        a.textAlign = "center";
        a.lineWidth = 300;
        a.lineHeight = 44;
        a.textBaseline = "middle";
        a.x = 0.5 * CANVAS_WIDTH - 150;
        a.y = 0.5 * CANVAS_HEIGHT - 20;
        a.outline = 4;
        c.addChild(a);
        b = new createjs.Text(TEXT_EAT, "60px " + FONT_GAME, "#ff6c00");
        b.textAlign = "center";
        b.textBaseline = "middle";
        b.lineWidth = 300;
        b.lineHeight = a.lineHeight;
        b.x = a.x;
        b.y = a.y;
        c.addChild(b);
        h = new CAnimHelp(2, CANVAS_WIDTH_HALF + 220, CANVAS_HEIGHT_HALF + 37, c);
        a = new createjs.Text(TEXT_AVOID, "60px " + FONT_GAME, "#000000");
        a.textAlign = "center";
        a.lineWidth = 300;
        a.lineHeight = 44;
        a.textBaseline = "middle";
        a.x = 0.5 * CANVAS_WIDTH - 150;
        a.y = 0.5 * CANVAS_HEIGHT + 115;
        a.outline = 4;
        c.addChild(a);
        b = new createjs.Text(TEXT_AVOID, "60px " + FONT_GAME, "#ff6c00");
        b.textAlign = "center";
        b.textBaseline = "middle";
        b.lineWidth = 300;
        b.lineHeight = a.lineHeight;
        b.x = a.x;
        b.y = a.y;
        c.addChild(b);
        m = new CAnimHelp(3, CANVAS_WIDTH_HALF + 220, a.y + 50, c);
        s_oStage.addChild(c);
        var p = this;
        n = c.on("pressup", function () {
            p._onExitHelp();
        });
    };
    this.unload = function () {
        s_oStage.removeChild(c);
        c.off("pressup", n);
    };
    this._onExitHelp = function () {
        this.unload();
        s_oGame._onExitHelp();
    };
    this.update = function () {
        f.animMonitor();
        h.animMonitor();
        m.animMonitor();
    };
    this._init(b, d, a);
    s_oHelp = this;
    return this;
}
var s_oHelp;
function CEndPanel(b) {
    var d, a, e, c, g, f, h, m, n;
    this._init = function (b) {
        n = new createjs.Shape();
        n.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        n.alpha = 0.5;
        n.on("click", function () {});
        d = createBitmap(b);
        d.x = CANVAS_WIDTH_HALF;
        d.y = CANVAS_HEIGHT_HALF;
        d.regX = 0.5 * b.width;
        d.regY = 0.5 * b.height;
        g = new createjs.Text("", "90px " + FONT_GAME, "#000");
        g.x = CANVAS_WIDTH / 2;
        g.y = CANVAS_HEIGHT / 2 - 160;
        g.textAlign = "center";
        g.outline = 4;
        c = new createjs.Text("", "90px " + FONT_GAME, "#ff6c00");
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2 - 160;
        c.textAlign = "center";
        a = new createjs.Text("", "60px " + FONT_GAME, "#000");
        a.x = CANVAS_WIDTH / 2;
        a.y = CANVAS_HEIGHT / 2 - 50;
        a.textAlign = "center";
        a.outline = 4;
        e = new createjs.Text("", "60px " + FONT_GAME, "#ff6c00");
        e.x = CANVAS_WIDTH / 2;
        e.y = CANVAS_HEIGHT / 2 - 50;
        e.textAlign = "center";
        f = new createjs.Container();
        f.alpha = 0;
        f.visible = !1;
        f.addChild(n, d, a, e, g, c);
        s_oStage.addChild(f);
    };
    this.show = function (b) {
        playSound("game_over", 1, !1);
        g.text = TEXT_GAMEOVER;
        c.text = TEXT_GAMEOVER;
        a.text = TEXT_SCORE + ": " + b;
        e.text = TEXT_SCORE + ": " + b;
        f.visible = !0;
        var d = s_oSpriteLibrary.getSprite("but_restart");
        h = new CGfxButton(0.5 * CANVAS_WIDTH + 260, 0.5 * CANVAS_HEIGHT + 100, d, f);
        h.addEventListener(ON_MOUSE_DOWN, this._onRestart, this);
        d = s_oSpriteLibrary.getSprite("but_home");
        m = new CGfxButton(0.5 * CANVAS_WIDTH - 260, 0.5 * CANVAS_HEIGHT + 100, d, f);
        m.addEventListener(ON_MOUSE_DOWN, this._onExit, this);
        createjs.Tween.get(f, { ignoreGlobalPause: !0 }).to({ alpha: 1 }, 1e3, createjs.Ease.cubicOut);
        $(s_oMain).trigger("save_score", b);
        $(s_oMain).trigger("share_event", b);
    };
    this._onExit = function () {
        s_oStage.removeChild(f);
        this.unload();
        $(s_oMain).trigger("show_interlevel_ad");
        s_oGame.onExit();
    };
    this.unload = function () {
        m.unload();
        m = null;
        h.unload();
        h = null;
        n.removeAllEventListeners();
    };
    this._onRestart = function () {
        createjs.Tween.get(f, { ignoreGlobalPause: !0 })
            .to({ alpha: 0 }, 300)
            .call(function () {
                s_oStage.removeChild(f);
            });
        s_oGame.onRestart();
        $(s_oMain).trigger("show_interlevel_ad");
    };
    this._init(b);
    return this;
}
function CSnake(b, d, a, e, c, g, f) {
    var h,
        m,
        n,
        r,
        l,
        p,
        v,
        w,
        y,
        C,
        x,
        E = null,
        D,
        J,
        H,
        B,
        F,
        q,
        I = !1,
        N = !1,
        K = !1,
        L = !1;
    this._init = function (a, b, c, e, d) {
        y = new createjs.Container();
        f.addChild(y);
        q = [];
        F = new CVector2(0, 1);
        H = c;
        if (4 === c) {
            c = d.width / 9;
            var g = d.height / 2;
            var h = {
                normal: 0,
                open: [1, 7, "remain_open"],
                remain_open: 7,
                close: [8, 12, "normal"],
                damage_open: [13, 16, "remain_damage"],
                remain_damage: [16, 16, "damage_close", 0.05],
                damage_close: { frames: [16, 15, 14, 13], next: "normal" },
                die: 17,
            };
        } else (c = d.width / 7), (g = d.height / 2), (h = { normal: 0, open: [1, 7, "remain_open"], remain_open: 7, close: [8, 12, "normal"] });
        d = new createjs.SpriteSheet({ images: [d], frames: { width: c, height: g, regX: c / 2, regY: g / 2 }, animations: h });
        l = createSprite(d, "normal", c / 2, g / 2, c, g);
        l.gotoAndPlay("close");
        l.x = a;
        l.y = b;
        y.addChild(l);
        C = { result: !1, target: null };
        D = 0.4 * c;
        J = D + D;
        p = { w: 0.5 * c, h: 0.5 * c };
        x = { w: p.w * OPEN_MOUNTH_DISTANCE_RATE, h: p.h * OPEN_MOUNTH_DISTANCE_RATE };
        for (a = 0; a < e; a++) this.createAQueque(l.x, l.y + DISTANCE_SINGLE_QUEUE * (q.length + 1), !1);
        this.createCollision();
    };
    this.getCurrentAnimation = function () {
        return l.currentAnimation;
    };
    this.setSubAI = function (a) {
        E = a;
    };
    this.getSubAI = function () {
        return E;
    };
    this.createCollision = function () {
        h = l.x - D;
        m = l.y - D;
        r = n = J;
        w = new createjs.Rectangle(h, m, n, r);
        SHOW_COLLISION_SHAPE && ((v = new createjs.Shape()), v.graphics.beginFill("#00ff00").drawRect(w.x, w.y, w.width, w.height), (v.alpha = 0.5), f.addChild(v));
    };
    this.bounce = function (a) {
        l.x += F.getX() * HERO_SPEED;
        l.y += F.getY() * HERO_SPEED;
        F.setV(reflectVectorV2(F, a));
        l.rotation = Math.atan2(F.getY(), F.getX()) * (180 / Math.PI) - 90;
    };
    this.changeState = function (a) {
        N || l.gotoAndPlay(a);
    };
    this.onAnimationEnd = function () {
        var a = this;
        l.on("animationend", function () {
            a.setIgnoreAnim(!1);
        });
    };
    this.setIgnoreAnim = function (a) {
        N = a;
    };
    this.stopState = function (a) {
        l.gotoAndStop(a);
    };
    this.createAQueque = function (a, b) {
        var c = new CSingleQueue(a, b, l.rotation, e, y);
        if (0 < q.length) {
            var f = q.length - 1;
            q[f].changeState("body");
            q[f].setRegY(q[f].getRegY() - REG_Y_OFFSET_QUEUE);
            y.swapChildren(l, c.getObj());
            y.setChildIndex(c.getObj(), 1);
        }
        c.stopTimeline(0);
        q.push(c);
    };
    this.eatingSound = function () {
        if (!K) {
            var a = playSound("snake_eating", 1, !1);
            if (null !== a)
                a.on("end", function () {
                    K = !1;
                });
            K = !0;
        }
    };
    this.screamingSound = function () {
        if (!L) {
            var a = playSound("scream", 1, !1);
            if (null !== a)
                a.on("end", function () {
                    L = !1;
                });
            L = !0;
        }
    };
    this.eatenEffect = function () {
        for (var a = EATEN_FOOD_SNAKE_INTERVAL, b = 4; b < q.length; b++) q[b].eatenEffect(a), (a += EATEN_FOOD_SNAKE_INTERVAL);
        createjs.Tween.get(this)
            .wait(a)
            .call(function () {
                this.createAQueque(-5e3, -5e3);
            });
    };
    this.queuePosition = function () {
        q[0].setPosition(l.x, l.y);
        q[0].setRotation(l.rotation);
        for (var a = q.length - 1; 0 < a; a--) q[a].setPosition(q[a - 1].getLastPos().x, q[a - 1].getLastPos().y), q[a].setRotation(q[a - 1].getRotation());
    };
    this.cutQueueAtPoint = function (a) {
        for (var b = 0, c = a; c < q.length - 1; c++) q[c].unload(), b++;
        q.splice(a, b);
    };
    this.die = function () {
        I || ((I = !0), F.set(0, 0), this.stopState("die"));
    };
    this.getOpenMounthDim = function () {
        return x;
    };
    this.unload = function () {
        createjs.Tween.removeTweens(l);
        createjs.Tween.removeTweens(this);
        f.removeChild(y);
    };
    this.unloadQueue = function () {
        for (var a = 0; a < q.length; a++) q[a].unload();
        q = null;
    };
    this.getLengthQueue = function () {
        return q.length;
    };
    this.getQueue = function () {
        return q;
    };
    this.getDim = function () {
        return p;
    };
    this.getEaten = function () {
        return I;
    };
    this.getSectionID = function () {
        return B;
    };
    this.setSectionID = function (a) {
        B = a;
    };
    this.setVisible = function (a) {
        l.visible = a;
    };
    this.getPos = function () {
        return { x: l.x, y: l.y };
    };
    this.getLocalPos = function () {
        return l.localToGlobal(0, 0);
    };
    this.getX = function () {
        return l.x;
    };
    this.getY = function () {
        return l.y;
    };
    this.getSprite = function () {
        return l;
    };
    this.setPosition = function (a, b) {
        l.x = a;
        l.y = b;
    };
    this.rotation = function (a) {
        l.rotation += a;
        F.set(Math.sin((Math.PI / 180) * -l.rotation), Math.cos((Math.PI / 180) * -l.rotation));
    };
    this.rotate = function (a) {
        l.rotation = a;
        F.set(Math.sin((Math.PI / 180) * -l.rotation), Math.cos((Math.PI / 180) * -l.rotation));
    };
    this.getType = function () {
        return H;
    };
    this.getDir = function () {
        return F;
    };
    this.getID = function () {
        return g;
    };
    this.move = function (a) {
        l.x -= F.getX() * a;
        l.y -= F.getY() * a;
        this.moveRect();
    };
    this.getTarget = function () {
        return C;
    };
    this.setTarget = function (a) {
        C.result = a.result;
        C.target = a.target;
    };
    this.moveRect = function () {
        h = l.x - D;
        m = l.y - D;
        r = n = J;
        w.setValues(h, m, n, r);
        SHOW_COLLISION_SHAPE && (v && (f.removeChild(v), (v = null)), (v = new createjs.Shape()), v.graphics.beginFill("#00ff00").drawRect(w.x, w.y, w.width, w.height), (v.alpha = 0.5), f.addChild(v));
    };
    this.getRectangle = function () {
        return w;
    };
    this.update = function (a) {
        I || (this.queuePosition(), this.move(a));
    };
    this._init(b, d, e, c, a);
}
function CSingleQueue(b, d, a, e, c) {
    var g, f, h, m;
    this._init = function (a, b, e, d) {
        e = s_oSpriteLibrary.getSprite("snake_parts_" + e);
        var l = new createjs.SpriteSheet({ images: [e], frames: { width: e.width / 2, height: e.height, regX: e.width / 2 / 2, regY: e.height / 2 }, animations: { body: 0, queue: 1 } });
        g = createSprite(l, "queue", e.width / 2 / 2, e.height / 2, e.width / 2, e.height);
        c.addChild(g);
        g.x = a;
        g.y = b;
        f = { x: a, y: b };
        h = { w: e.width / 2, h: e.height };
        g.regY += REG_Y_OFFSET_QUEUE;
        g.rotation = d;
        g.tickEnabled = !1;
        c.addChild(g);
        m = new createjs.Timeline();
        m.addTween(
            createjs.Tween.get(g)
                .to({ scaleX: 1.2 }, TIME_EATEN_EFFECT, createjs.Ease.cubicOut)
                .call(function () {
                    createjs.Tween.get(g).to({ scaleX: 1 }, TIME_EATEN_EFFECT, createjs.Ease.cubicIn);
                })
        );
    };
    this.changeState = function (a) {
        g.gotoAndStop(a);
    };
    this.getPos = function () {
        return { x: g.x, y: g.y };
    };
    this.setRegY = function (a) {
        g.regY = a;
    };
    this.getRegY = function () {
        return g.regY;
    };
    this.unload = function () {
        c.removeChild(g);
        g = null;
    };
    this.getLastPos = function () {
        return f;
    };
    this.setLastPos = function (a, b) {
        f.x = a;
        f.y = b;
    };
    this.setRotation = function (a) {
        g.rotation = a;
    };
    this.getRotation = function () {
        return g.rotation;
    };
    this.getObj = function () {
        return g;
    };
    this.getDim = function () {
        return h;
    };
    this.getEaten = function () {
        return !1;
    };
    this.unload = function () {
        createjs.Tween.removeTweens(g);
        createjs.Tween.get(g)
            .to({ scaleX: 0, scaleY: 0 }, 500, createjs.Ease.cubicOut)
            .call(function () {
                c.removeChild(g);
            });
    };
    this.spawnAnim = function (a) {
        g.scaleX = g.scaleY = 0;
        createjs.Tween.get(g).wait(a).to({ scaleX: 1, scaleY: 1 }, TIME_SPAWN_QUEUE, createjs.Ease.cubicOut);
    };
    this.eatenEffect = function (a) {
        createjs.Tween.get(this)
            .wait(a)
            .call(function () {
                m.gotoAndPlay(0);
            });
    };
    this.setScale = function (a) {
        g.scaleX = g.scaleY = a;
    };
    this.stopTimeline = function (a) {
        m.gotoAndStop(a);
    };
    this.setPosition = function (a, b) {
        g.x = a;
        g.y = b;
        f.x = a;
        f.y = b;
    };
    this._init(b, d, e, a);
    return this;
}
function CVector2(b, d) {
    var a, e;
    this._init = function (b, d) {
        a = b;
        e = d;
    };
    this.add = function (b, d) {
        a += b;
        e += d;
    };
    this.addV = function (b) {
        a += b.getX();
        e += b.getY();
    };
    this.scalarDivision = function (b) {
        a /= b;
        e /= b;
    };
    this.subtract = function (b) {
        a -= b.getX();
        e -= b.getY();
    };
    this.scalarProduct = function (b) {
        a *= b;
        e *= b;
    };
    this.invert = function () {
        a *= -1;
        e *= -1;
    };
    this.dotProduct = function (b) {
        return a * b.getX() + e * b.getY();
    };
    this.set = function (b, d) {
        a = b;
        e = d;
    };
    this.setV = function (b) {
        a = b.getX();
        e = b.getY();
    };
    this.length = function () {
        return Math.sqrt(a * a + e * e);
    };
    this.length2 = function () {
        return a * a + e * e;
    };
    this.normalize = function () {
        var b = this.length();
        0 < b && ((a /= b), (e /= b));
    };
    this.angleBetweenVectors = function (a) {
        a = Math.acos(this.dotProduct(a) / (this.length() * a.length()));
        return !0 === isNaN(a) ? 0 : a;
    };
    this.getNormalize = function (b) {
        this.length();
        b.set(a, e);
        b.normalize();
    };
    this.rot90CCW = function () {
        var b = a;
        a = -e;
        e = b;
    };
    this.rot90CW = function () {
        var b = a;
        a = e;
        e = -b;
    };
    this.getRotCCW = function (b) {
        b.set(a, e);
        b.rot90CCW();
    };
    this.getRotCW = function (b) {
        b.set(a, e);
        b.rot90CW();
    };
    this.ceil = function () {
        a = Math.ceil(a);
        e = Math.ceil(e);
    };
    this.round = function () {
        a = Math.round(a);
        e = Math.round(e);
    };
    this.toString = function () {
        return "Vector2: " + a + ", " + e;
    };
    this.print = function () {
        trace("Vector2: " + a + ", " + e);
    };
    this.getX = function () {
        return a;
    };
    this.getY = function () {
        return e;
    };
    this.rotate = function (b) {
        var c = a,
            f = e;
        a = c * Math.cos(b) - f * Math.sin(b);
        e = c * Math.sin(b) + f * Math.cos(b);
    };
    this._init(b, d);
}
function CEdges(b) {
    var d, a, e;
    this._init = function () {
        e = new createjs.Container();
        b.addChild(e);
        d = [];
        a = [];
        var c = s_oSpriteLibrary.getSprite("edge_side_lr"),
            g = s_oSpriteLibrary.getSprite("edge_side_ud"),
            f = EDGES_PROPERTIES.x,
            h = EDGES_PROPERTIES.y,
            m = f + c.height * EDGES_PROPERTIES.w - c.width;
        SPAWN_FOODS_RANGE.xMax = m - 0.5 * EDGEBOARD_X;
        EDGES_PROPERTIES.xMax = m;
        for (var n = 0; n < EDGES_PROPERTIES.h; n++) d.push(new CEdge(f, h, { lr: !0, val: 1 }, c, e)), d.push(new CEdge(m, h, { lr: !0, val: -1 }, c, e)), (h += c.height);
        SPAWN_FOODS_RANGE.yMax = h - 0.5 * EDGEBOARD_Y;
        EDGES_PROPERTIES.yMax = h;
        for (n = 0; n < EDGES_PROPERTIES.w; n++) d.push(new CEdge(f, EDGES_PROPERTIES.y, { lr: !1, val: -1 }, g, e)), d.push(new CEdge(f, h - 23, { lr: !1, val: 1 }, g, e)), (f += g.width);
        this.createEdgesCollision(m, h, c);
    };
    this.createEdgesCollision = function (b, d, f) {
        b = [
            { x: EDGES_PROPERTIES.x, y: EDGES_PROPERTIES.y, w: b + 0.5 * f.height, h: f.width - 17, normal: new CVector2(0, 1) },
            { x: EDGES_PROPERTIES.x, y: EDGES_PROPERTIES.y + f.width, w: f.width - 20, h: d + 0.5 * f.height, normal: new CVector2(1, 0) },
            { x: EDGES_PROPERTIES.x, y: d, w: b + 0.5 * f.height, h: f.width, normal: new CVector2(0, -1) },
            { x: b + 22, y: EDGES_PROPERTIES.y + f.width, w: f.width, h: d + 0.5 * f.height, normal: new CVector2(-1, 0) },
        ];
        for (d = 0; d < b.length; d++)
            a.push({ rect: new createjs.Rectangle(b[d].x, b[d].y, b[d].w, b[d].h), normal: b[d].normal }),
                SHOW_COLLISION_SHAPE && ((f = new createjs.Shape()), f.graphics.beginFill("#00ff00").drawRect(b[d].x, b[d].y, b[d].w, b[d].h), (f.alpha = 0.5), e.addChild(f));
    };
    this.getRectangles = function () {
        return a;
    };
    this.unload = function () {
        b.removeChild(e);
        e = null;
    };
    this.getObj = function () {
        return e;
    };
    this.setPosition = function (a, b) {
        e.x = a;
        e.y = b;
    };
    this._init();
    return this;
}
function CEdge(b, d, a, e, c) {
    var g;
    this._init = function (a, b, e, d) {
        g = createBitmap(e);
        g.x = a;
        g.y = b;
        !0 === d.lr ? ((g.scaleX = d.val), 0 > g.scaleX && (g.regX = e.width)) : ((g.scaleY = d.val), 0 > g.scaleY && (g.regY = e.height));
        g.tickEnabled = !1;
        c.addChild(g);
    };
    this.getPos = function () {
        return { x: g.x, y: g.y };
    };
    this.unload = function () {
        c.removeChild(g);
        g = null;
    };
    this.getObj = function () {
        return g;
    };
    this.setPosition = function (a, b) {
        g.x = a;
        g.y = b;
    };
    this._init(b, d, e, a);
    return this;
}
function CManageFoods(b) {
    var d,
        a,
        e,
        c = INTERVAL_SPAWN_FOOD;
    this._init = function () {
        e = new createjs.Container();
        e.tickChildren = !1;
        b.addChild(e);
        d = [];
        a = [];
        this.updateOccurrence();
        this.foodsInSections();
    };
    this.foodsInSections = function () {
        for (var a = Math.floor(MAX_FOODS_INSTANCE / FIELD_SECTION_SUBDIVISION.tot), b = s_oManageSections.getSections(), c = 0; c < b.length; c++) for (var e = 0; e < a; e++) this._spawnRandomFoods(b[c]);
    };
    this.updateOccurrence = function () {
        for (var b = 0; b < FOODS_OCCURRENCE.length; b++) for (var c = 0; c < FOODS_OCCURRENCE[b]; c++) a.push(b);
    };
    this.getFoods = function () {
        return d;
    };
    this._spawnRandomFoods = function (b) {
        for (var c = Math.floor(Math.random() * a.length), g, m, n = s_oSpriteLibrary.getSprite("food_" + a[c]), r = Math.floor(Math.random() * FOOD_STATE[a[c]]), l = n.width / 4, p = 2 * l, v = 2.2 * n.height, w = !0, y = 0; w; ) {
            g = Math.random() * (b.getRect().x + b.getRect().width - p - (b.getRect().x + p)) + b.getRect().x + p;
            m = Math.random() * (b.getRect().y + b.getRect().height - v - (b.getRect().y + v)) + b.getRect().y + v;
            for (var C = 0; C < d.length && !(w = this.checkCollisionFoodToObject(d[C], l, g, m)); C++);
            if (!w) for (var x = s_oGame.getSnakesArray(), E = 0; E < x.length && !(w = this.checkCollisionFoodToObject(x[C], x.getDim().h, g, m)); E++);
            if (y === MAX_FOODS_INSTANCE || !w) break;
            y++;
        }
        c = new CFood(g, m, 0, a[c], b.getID(), n, e);
        c.changeState(r);
        d.push(c);
        b.addFood(c);
        SHOW_FOODS_ID && c.createTextID(d.length);
    };
    this.checkCollisionFoodToObject = function (a, b, c, e) {
        return s_oGame.circleToCircleCollision({ x: c, y: e }, a.getPos(), b, a.getDim().w) ? !0 : !1;
    };
    this.unload = function () {
        b.removeChild(e);
        e = null;
    };
    this.restoresEatenFood = function () {
        for (var a = s_oManageSections.getSections(), b = s_oManageSections.getSectionIDShuffle(), c = 0; c < b.length; c++)
            for (var e = a[b[c]].getFoodsSection(), n = 0; n < e.length; n++)
                if (e[n].getEaten()) {
                    e[n].setEaten(!1);
                    var r = !0,
                        l = 0;
                    a = a[b[c]];
                    b = 2 * e[n].getDim().w;
                    for (c = 2.2 * e[n].getDim().h; r; ) {
                        var p = Math.random() * (a.getRect().x + a.getRect().width - b - (a.getRect().x + b)) + a.getRect().x + b;
                        var v = Math.random() * (a.getRect().y + a.getRect().height - c - (a.getRect().y + c)) + a.getRect().y + c;
                        for (var w = 0; w < d.length && !(r = this.checkCollisionFoodToObject(d[w], d[w].getDim().w, p, v)); w++);
                        if (!r) {
                            w = s_oGame.getSnakesArray();
                            for (var y = 0; y < w.length && !(r = this.checkCollisionFoodToObject(w[y], w[y].getDim().w, p, v)); y++);
                        }
                        if (l === MAX_FOODS_INSTANCE || !r) break;
                        l++;
                    }
                    r = Math.floor(Math.random() * FOOD_STATE[e[n].getType()]);
                    e[n].setPosition(p, v);
                    e[n].changeState(r);
                    e[n].spawnAnim(Math.floor(Math.random() * MAXT_TIME_WAIT_FOOD_SPAWN_ANIM));
                    e[n].setVisible(!0);
                    return;
                }
    };
    this.restoresAllEatenFood = function () {
        for (var a = 0; a < d.length; a++)
            if (d[a].getEaten()) {
                d[a].setEaten(!1);
                for (var b = !0, c = 0, e, n, r = s_oManageSections.getSectionByID(d[a].getSectionID()), l = 2 * d[a].getDim().w, p = 2.2 * d[a].getDim().h; b; ) {
                    e = Math.random() * (r.getRect().x + r.getRect().width - l - (r.getRect().x + l)) + r.getRect().x + l;
                    n = Math.random() * (r.getRect().y + r.getRect().height - p - (r.getRect().y + p)) + r.getRect().y + p;
                    for (var v = 0; v < d.length && !(b = this.checkCollisionFoodToObject(d[v], d[v].getDim().w, e, n)); v++);
                    if (!b) {
                        v = s_oGame.getSnakesArray();
                        for (var w = 0; w < v.length && !(b = this.checkCollisionFoodToObject(v[w], v[w].getDim().w, e, n)); w++);
                    }
                    if (c === MAX_FOODS_INSTANCE || !b) break;
                    c++;
                }
                d[a].setPosition(e, n);
                d[a].spawnAnim(Math.floor(Math.random() * MAXT_TIME_WAIT_FOOD_SPAWN_ANIM));
                d[a].setVisible(!0);
            }
    };
    this.getFood = function (a) {
        return d[a];
    };
    this.updateVisibility = function () {
        for (var a = 0; a < d.length; a++)
            if (!d[a].getEaten()) {
                var b = d[a].getLocalPos();
                b.x > -d[a].getDim().w + s_iOffsetX && b.x < CANVAS_WIDTH + d[a].getDim().w - s_iOffsetX && b.y > -d[a].getDim().h + s_iOffsetY && b.y < CANVAS_HEIGHT + d[a].getDim().h - s_iOffsetY
                    ? d[a].setVisible(!0)
                    : d[a].setVisible(!1);
            }
    };
    this.update = function () {
        this.updateVisibility();
        0 < c ? (c -= s_iTimeElaps) : ((c = INTERVAL_SPAWN_FOOD), this.restoresEatenFood());
    };
    this._init();
    s_oManageFoods = this;
    return this;
}
var s_oManageFoods = null;
function CFood(b, d, a, e, c, g, f) {
    var h,
        m,
        n,
        r,
        l = !1;
    this._init = function (a, b, c, e, d) {
        var g = new createjs.SpriteSheet({ images: [e], frames: { width: e.width / 4, height: e.height, regX: e.width / 4 / 2, regY: e.height / 2 }, animations: { apple: 0, orange: 1, cherry: 2, pear: 3 } });
        h = createSprite(g, 0, e.width / 4 / 2, e.height / 2, e.width / 4, e.height);
        h.stop();
        h.regX += REG_FOOD_OFFSET[c].x;
        h.regY += REG_FOOD_OFFSET[c].y;
        m = { w: e.width / 4 + COLLISION_OFFSET_FOOD[c].x, h: e.height + COLLISION_OFFSET_FOOD[c].y };
        r = c;
        h.x = a;
        h.y = b;
        h.rotation = d;
        h.tickEnabled = !1;
        f.addChild(h);
    };
    this.getPos = function () {
        return { x: h.x, y: h.y };
    };
    this.getY = function () {
        return h.y;
    };
    this.getX = function () {
        return h.x;
    };
    this.changeState = function (a) {
        h.gotoAndStop(a);
    };
    this.getType = function () {
        return r;
    };
    this.getLocalPos = function () {
        return h.localToGlobal(0, 0);
    };
    this.getDim = function () {
        return m;
    };
    this.getEaten = function () {
        return l;
    };
    this.createTextID = function (a) {
        n = new createjs.Text(a, "20px " + FONT_GAME, "#ffffff");
        n.textAlign = "center";
        n.textBaseline = "middle";
        n.x = h.x;
        n.y = h.y;
        f.addChild(n);
    };
    this.eatenAnim = function (a) {
        createjs.Tween.get(h).to({ x: a.x, y: a.y, scaleX: 1, scaleY: 1 }, 100, createjs.Ease.cubicIn).set({ visible: !1, scaleX: 1, scaleY: 1 });
    };
    this.getID = function () {
        return n.text;
    };
    this.getSectionID = function () {
        return c;
    };
    this.setEaten = function (a) {
        l = a;
    };
    this.setVisible = function (a) {
        h.visible = a;
    };
    this.isVisible = function () {
        return h.visible;
    };
    this.unload = function () {
        f.removeChild(h);
        h = null;
    };
    this.getObj = function () {
        return h;
    };
    this.spawnAnim = function (a) {
        h.scaleX = h.scaleY = 0;
        createjs.Tween.get(h).wait(a).to({ scaleX: 1, scaleY: 1 }, TIME_FOOD_SPAWN_ANIM, createjs.Ease.elasticOut);
    };
    this.setPosition = function (a, b) {
        h.x = a;
        h.y = b;
        SHOW_FOODS_ID && ((n.x = a), (n.y = b));
    };
    this._init(b, d, e, g, a);
    return this;
}
function CControlAiSnakes() {
    var b, d;
    this._init = function () {
        this.reset();
    };
    this.addSnakeToAI = function (a) {
        var e = new CSubAISnake(a, AI_SNAKES[a.getType()].time_follow);
        a.setSubAI(e);
        b.push({ snake: a, subAI: e });
        if (SHOW_FIELD_OF_VIEW) {
            a = new createjs.Shape();
            e = new createjs.Shape();
            var c = new createjs.Shape();
            d.push([]);
            d[d.length - 1].push(a);
            d[d.length - 1].push(e);
            d[d.length - 1].push(c);
            s_oScrollStage.addChild(a, e, c);
        }
    };
    this.manageAI = function (a, b) {
        var c = this.fieldOfViewFood(a.snake, a.subAI, b);
        if (c.result === AI_FOODS) {
            var e = this.getFoodCloser(a.snake, c.foods);
            a.subAI.setSoundFollow(!1);
            a.snake.getTarget().result || this.setDirectionSnake(a, c.foods[e], AI_FOODS);
        } else c.result !== AI_PLAYER || s_oGame.getPlayerSnake().getEaten() ? (a.subAI.setSoundFollow(!1), a.subAI.update()) : (this.setDirectionSnake(a, c, AI_PLAYER), a.subAI.followTime(), a.subAI.playSoundFollow());
        a.snake.update(SNAKES_AI_SPEED[a.snake.getType()]);
    };
    this.getFoodCloser = function (a, b) {
        for (var c = 0, e = distanceWithoutSQRT(a.getPos(), b[0].food.getPos()), d = 1; d < b.length; d++) {
            var h = distanceWithoutSQRT(a.getPos(), b[d].food.getPos());
            e > h && ((e = h), (c = d));
        }
        return c;
    };
    this.setDirectionSnake = function (a, b, c) {
        b = Math.atan2(b.vect.getY(), b.vect.getX()) * (180 / Math.PI) - 90;
        a.snake.rotate(b);
        a.snake.setTarget({ result: !0, target: c });
    };
    this.fieldOfViewFood = function (a, b, c) {
        var e = [],
            d = new CVector2(a.getDir().getX(), a.getDir().getY()),
            h = new CVector2(a.getDir().getX(), a.getDir().getY());
        d.rotate(AI_ANGLE_DETECT_FOODS);
        h.rotate(-AI_ANGLE_DETECT_FOODS);
        var m = new CVector2(a.getX() + DISTANCE_AI_DETECT_FOOD * d.getX() - a.getX(), a.getY() + DISTANCE_AI_DETECT_FOOD * d.getY() - a.getY()),
            n = new CVector2(a.getX() + (DISTANCE_AI_DETECT_FOOD * h.getX() - a.getX()), a.getY() + DISTANCE_AI_DETECT_FOOD * h.getY() - a.getY()),
            r = m.length2();
        SHOW_FIELD_OF_VIEW &&
            ((d = new CVector2(a.getX() - DISTANCE_AI_DETECT_FOOD * d.getX(), a.getY() - DISTANCE_AI_DETECT_FOOD * d.getY())),
            (h = new CVector2(a.getX() - DISTANCE_AI_DETECT_FOOD * h.getX(), a.getY() - DISTANCE_AI_DETECT_FOOD * h.getY())),
            this.castFieldOfViewLine(c[0], a, d, "red"),
            this.castFieldOfViewLine(c[1], a, h, "black"));
        c = m.angleBetweenVectors(n);
        h = new CVector2(0, 0);
        if (!(b.ignorePlayer() || (this.countFollowersAI() && a.getTarget().target !== AI_PLAYER))) {
            b = s_oGame.getPlayerSnake();
            h.set(a.getX() - b.getX(), a.getY() - b.getY());
            b = Math.abs(n.angleBetweenVectors(h));
            d = Math.abs(m.angleBetweenVectors(h));
            if (d < c && b < c && r > h.length2()) return { vect: h, result: AI_PLAYER };
            a.setTarget({ result: !1, target: null });
        }
        for (var l = s_oManageFoods.getFoods(), p = 0; p < l.length; p++)
            l[p].isVisible() &&
                (h.set(a.getX() - l[p].getX(), a.getY() - l[p].getY()),
                (b = Math.abs(n.angleBetweenVectors(h))),
                (d = Math.abs(m.angleBetweenVectors(h))),
                d < c && b < c && r > h.length2() && e.push({ id: p, vect: h, result: AI_FOODS, food: l[p] }));
        return { foods: e, result: null };
    };
    this.countFollowersAI = function () {
        for (var a = 0, e = 0; e < b.length; e++) b[e].snake.getTarget().target === AI_PLAYER && a++;
        return a > MAX_AI_FOLLOW_PLAYER ? !0 : !1;
    };
    this.castFieldOfViewLine = function (a, b, c, d) {
        a.graphics.clear();
        a.graphics.beginStroke(d);
        a.graphics.setStrokeStyle(5);
        a.graphics.moveTo(b.getX(), b.getY());
        a.graphics.lineTo(c.getX(), c.getY());
        a.graphics.closePath();
    };
    this.removeSnakeByID = function (a) {
        b.splice(a, 1);
        if (SHOW_FIELD_OF_VIEW) for (var e = 0; e < d[a].length; e++) s_oScrollStage.removeChild(d[a][e]);
    };
    this.reset = function () {
        b = [];
        d = [];
    };
    this.update = function () {
        for (var a = 0; a < b.length; a++) this.manageAI(b[a], d[a]);
    };
    this._init();
    return this;
}
function CSubAISnake(b, d) {
    var a = 0,
        e,
        c = d,
        g = AI_TIME_IGNORE_PLAYER,
        f = !1,
        h = !1;
    this._init = function () {
        e = Math.random() * (AI_WAIT_TIME_FOR_CHANGE_DIR.max - AI_WAIT_TIME_FOR_CHANGE_DIR.min) + AI_WAIT_TIME_FOR_CHANGE_DIR.min;
    };
    this.setRandomDirection = function () {
        0 > a
            ? 0 < e
                ? (b.rotation(HERO_ROT_SPEED), (e -= s_iTimeElaps))
                : ((e = Math.random() * (AI_WAIT_TIME_FOR_CHANGE_DIR.max - AI_WAIT_TIME_FOR_CHANGE_DIR.min) + AI_WAIT_TIME_FOR_CHANGE_DIR.min),
                  (a = Math.random() * (AI_TIME_CHANGE_DIR.max - AI_TIME_CHANGE_DIR.min) + AI_TIME_CHANGE_DIR.min))
            : (a -= s_iTimeElaps);
    };
    this.followTime = function () {
        0 > c ? ((f = !0), (a = -1)) : (c -= s_iTimeElaps);
    };
    this.setFollowTime = function (a) {
        c = a;
    };
    this.getFollowTime = function () {
        return c;
    };
    this.playSoundFollow = function () {
        h || ((h = !0), playSound("snake_follow", 1, !1));
    };
    this.setSoundFollow = function (a) {
        h = a;
    };
    this.ignorePlayerTime = function () {
        f && (0 < g ? (g -= s_iTimeElaps) : ((f = !1), (g = AI_TIME_IGNORE_PLAYER), (c = AI_SNAKES[b.getType()].time_follow)));
    };
    this.ignorePlayer = function () {
        return f;
    };
    this.update = function () {
        this.setRandomDirection();
        this.ignorePlayerTime();
    };
    this._init();
    return this;
}
function CManageSections() {
    var b, d;
    this._init = function () {
        b = [];
        d = [];
        this.createSection();
    };
    this.createSection = function () {
        for (var a = EDGES_PROPERTIES.x, e = EDGES_PROPERTIES.y, c = EDGES_PROPERTIES.xMax / FIELD_SECTION_SUBDIVISION.w, g = EDGES_PROPERTIES.yMax / FIELD_SECTION_SUBDIVISION.h, f = 0, h = 0; h < FIELD_SECTION_SUBDIVISION.h; h++) {
            for (var m = 0; m < FIELD_SECTION_SUBDIVISION.w; m++) b.push(new CSection(f, { x: a, y: e, w: c, h: g })), d.push(f), (a += c), f++;
            e += g;
            a = EDGES_PROPERTIES.x;
        }
    };
    this.getSections = function () {
        return b;
    };
    this.getSectionIDShuffle = function () {
        return shuffle(d);
    };
    this.getSectionByID = function (a) {
        return b[a];
    };
    this._init();
    s_oManageSections = this;
    return this;
}
var s_oManageSections = null;
function CSection(b, d) {
    var a, e;
    this._init = function (b) {
        e = [];
        a = new createjs.Rectangle(b.x, b.y, b.w, b.h);
        this.createDebugShape();
    };
    this.createDebugShape = function () {
        if (SHOW_SECTION_SHAPE) {
            var b = new createjs.Shape();
            b.graphics.beginFill(getRandomColor()).drawRect(a.x, a.y, a.width, a.height);
            b.alpha = 0.5;
            s_oScrollStage.addChild(b);
        }
    };
    this.addFood = function (a) {
        e.push(a);
    };
    this.getFoodsSection = function () {
        return e;
    };
    this.getRect = function () {
        return a;
    };
    this.getID = function () {
        return b;
    };
    this._init(d);
    return this;
}
function CPause() {
    var b, d;
    this._init = function () {
        var a = new createjs.Container();
        a.alpha = 0;
        b = new createjs.Shape();
        b.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        b.alpha = 0.5;
        var e = new createjs.Shape();
        e.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        b.hitArea = e;
        d = b.on("click", function () {});
        a.addChild(b);
        e = new createjs.Text(TEXT_PAUSE, "80px " + FONT_GAME, "#ff6c00");
        e.x = 0.5 * CANVAS_WIDTH;
        e.y = 0.5 * CANVAS_HEIGHT - 130;
        e.textAlign = "center";
        a.addChild(e);
        e = s_oSpriteLibrary.getSprite("but_continue");
        new CGfxButton(0.5 * CANVAS_WIDTH, 0.5 * CANVAS_HEIGHT + 70, e, a).addEventListenerWithParams(ON_MOUSE_UP, this._onLeavePause, this, a);
        s_oStage.addChild(a);
        createjs.Tween.get(a, { ignoreGlobalPause: !0 }).to({ alpha: 1 }, 300, createjs.quartOut);
    };
    this.unload = function () {
        b.off("click", d);
        s_oStage.removeChild(void 0);
    };
    this._onLeavePause = function (a) {
        createjs.Tween.get(a, { ignoreGlobalPause: !0 })
            .to({ alpha: 0 }, 300, createjs.quartIn)
            .call(function () {
                s_oInterface.unloadPause();
                s_oGame.unpause(!0);
            });
    };
    this._init();
    return this;
}
function CAreYouSurePanel(b) {
    var d, a, e, c, g, f, h;
    this._init = function () {
        f = new createjs.Container();
        f.alpha = 0;
        m.addChild(f);
        h = new createjs.Shape();
        h.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        h.alpha = 0.5;
        h.on("click", function () {});
        f.addChild(h);
        var b = s_oSpriteLibrary.getSprite("msg_box");
        d = createBitmap(b);
        d.x = CANVAS_WIDTH_HALF;
        d.y = CANVAS_HEIGHT_HALF;
        d.regX = 0.5 * b.width;
        d.regY = 0.5 * b.height;
        f.addChild(d);
        a = new createjs.Text(TEXT_ARE_SURE, "80px " + FONT_GAME, "#000");
        a.x = CANVAS_WIDTH / 2;
        a.y = CANVAS_HEIGHT_HALF - 65;
        a.textAlign = "center";
        a.textBaseline = "middle";
        a.outline = 5;
        f.addChild(a);
        e = new createjs.Text(TEXT_ARE_SURE, "80px " + FONT_GAME, "#ff6c00");
        e.x = CANVAS_WIDTH / 2;
        e.y = a.y;
        e.textAlign = "center";
        e.textBaseline = "middle";
        f.addChild(e);
        c = new CGfxButton(CANVAS_WIDTH / 2 + 260, 0.5 * CANVAS_HEIGHT + 100, s_oSpriteLibrary.getSprite("but_yes"), f);
        c.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        g = new CGfxButton(CANVAS_WIDTH / 2 - 260, 0.5 * CANVAS_HEIGHT + 100, s_oSpriteLibrary.getSprite("but_not"), f);
        g.addEventListener(ON_MOUSE_UP, this._onButNo, this);
    };
    this.show = function () {
        s_oGame.unpause(!1);
        createjs.Tween.get(f, { ignoreGlobalPause: !0 }).to({ alpha: 1 }, 150, createjs.quartOut);
    };
    this.unload = function () {
        createjs.Tween.get(f, { ignoreGlobalPause: !0 })
            .to({ alpha: 0 }, 150, createjs.quartOut)
            .call(function () {
                m.removeChild(f, h);
            });
    };
    this._onButYes = function () {
        this.unload();
        s_oGame.onExit();
        h.removeAllEventListeners();
    };
    this._onButNo = function () {
        s_oGame.unpause(!0);
        this.unload();
        f.visible = !1;
        h.removeAllEventListeners();
    };
    var m = b;
    this._init();
}
function CBackground(b) {
    var d, a;
    this._init = function () {
        d = new createjs.Container();
        d.tickChildren = !1;
        b.addChild(d);
        var e = new createjs.Matrix2D();
        e.a = e.d = 1;
        a = new createjs.Shape();
        a.graphics.beginBitmapFill(s_oSpriteLibrary.getSprite("bg_game"), "repeat", e).drawRect(0, 0, 3072, 2048);
        a.y = 0;
        a.alpha = 1;
        a.tickEnabled = !1;
        d.addChild(a);
    };
    this._init();
    return this;
}
function CAnimMenu(b) {
    var d,
        a = null,
        e,
        c,
        g = MENU_SNAKE_GOOD_ROTATION,
        f = MENU_SNAKE_BAD_ROTATION,
        h,
        m,
        n = !1,
        r = !1,
        l = 0.5 * MENU_SNAKE_GOOD_TIME_ROTATION,
        p = 0.5 * MENU_SNAKE_BAD_TIME_ROTATION,
        v = MENU_BAD_SNAKE_DELAY;
    this._init = function () {
        d = new createjs.Container();
        b.addChild(d);
        e = new CSnake(-100, CANVAS_HEIGHT_HALF, s_oSpriteLibrary.getSprite("snake_head_4"), 4, 15, 0, d);
        e.rotate(90);
        h = s_oSpriteLibrary.getSprite("snake_parts_4").height * (15 / (MENU_SNAKES_VELOCITY / 20)) + CANVAS_WIDTH - s_iOffsetX;
        var f = Math.floor(3 * Math.random());
        c = new CSnake(-100, CANVAS_HEIGHT_HALF, s_oSpriteLibrary.getSprite("snake_head_" + f), f, 25, 0, d);
        c.rotate(90);
        a = new CLogo(CANVAS_WIDTH_HALF, -0.5 * s_oSpriteLibrary.getSprite("logo").height, b);
        createjs.Tween.get(this)
            .wait(1500)
            .call(function () {
                a.animLogo();
                s_oMenu.animContainerGUI();
            });
        m = s_oSpriteLibrary.getSprite("snake_parts_" + f).height * (25 / (MENU_SNAKES_VELOCITY / 20)) + CANVAS_WIDTH - s_iOffsetX;
    };
    this.animSnakes = function () {
        n || (0 > l ? ((g *= -1), (l = MENU_SNAKE_GOOD_TIME_ROTATION)) : ((l -= s_iTimeElaps), e.rotation(g)), e.update(MENU_SNAKES_VELOCITY), e.getX() > h && ((n = !0), this.unloadSnake(e)));
        r || (0 > p ? ((f *= -1), (p = MENU_SNAKE_BAD_TIME_ROTATION)) : ((p -= s_iTimeElaps), c.rotation(f)), 0 > v ? (c.update(MENU_SNAKES_VELOCITY), c.getX() > m && ((r = !0), this.unloadSnake(c))) : (v -= s_iTimeElaps));
    };
    this.unloadSnake = function (a) {
        a.unload();
    };
    this.update = function () {
        this.animSnakes();
    };
    this._init();
    return this;
}
function CLogo(b, d, a) {
    var e;
    this._init = function (b, d) {
        var c = s_oSpriteLibrary.getSprite("logo");
        e = createBitmap(c);
        e.regX = 0.5 * c.width;
        e.regY = 0.5 * c.height;
        e.x = b;
        e.y = d;
        a.addChild(e);
    };
    this.animLogo = function () {
        createjs.Tween.get(e).to({ y: CANVAS_HEIGHT_HALF - 100 }, 1e3, createjs.Ease.bounceOut);
    };
    this._init(b, d);
    return this;
}
function CAnimHelp(b, d, a, e) {
    var c,
        g = [],
        f,
        h = 0,
        m,
        n = 0;
    this._init = function (a, b, d) {
        c = { x: b, y: d };
        f = new createjs.Container();
        f.x = c.x;
        f.y = c.y;
        e.addChild(f);
        for (b = 0; b < FRAMES_NUM_HELP[a]; b++) g.push(createBitmap(s_oSpriteLibrary.getSprite("help_" + a + "_" + b))), (g[b].visible = !1), f.addChild(g[b]);
        g[0].visible = !0;
        m = a;
        f.regX = s_oSpriteLibrary.getSprite("help_" + a + "_0").width;
        f.regY = s_oSpriteLibrary.getSprite("help_" + a + "_0").height;
    };
    this.setPosition = function (a, b) {
        f.x = a;
        f.y = b;
    };
    this.getStartPos = function () {
        return c;
    };
    this.setVisibleMonitor = function (a) {
        f.visible = a;
    };
    this.viewMonitor = function (a, b) {
        a[b].visible = !0;
    };
    this.hideMonitor = function (a, b) {
        a[b].visible = !1;
    };
    this.animMonitor = function () {
        n += s_iTimeElaps;
        n > BUFFER_ANIM_MONITOR[m] && (this.hideMonitor(g, h), h + 1 < FRAMES_NUM_HELP[m] ? (this.viewMonitor(g, h + 1), h++) : ((n = h = 0), this.viewMonitor(g, h)), (n = 0));
    };
    this._init(b, d, a);
    s_oAnimMonitor = this;
    return this;
}
var s_oAnimMonitor = null;
function extractHostname(b) {
    b = -1 < b.indexOf("://") ? b.split("/")[2] : b.split("/")[0];
    b = b.split(":")[0];
    return (b = b.split("?")[0]);
}
function extractRootDomain(b) {
    b = extractHostname(b);
    var d = b.split("."),
        a = d.length;
    2 < a && (b = d[a - 2] + "." + d[a - 1]);
    return b;
}
var getClosestTop = function () {
        var b = window,
            d = !1;
        try {
            for (; b.parent.document !== b.document; )
                if (b.parent.document) b = b.parent;
                else {
                    d = !0;
                    break;
                }
        } catch (a) {
            d = !0;
        }
        return { topFrame: b, err: d };
    },
    getBestPageUrl = function (b) {
        var d = b.topFrame,
            a = "";
        if (b.err)
            try {
                try {
                    a = window.top.location.href;
                } catch (c) {
                    var e = window.location.ancestorOrigins;
                    a = e[e.length - 1];
                }
            } catch (c) {
                a = d.document.referrer;
            }
        else a = d.location.href;
        return a;
    },
    TOPFRAMEOBJ = getClosestTop(),
    PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);
function seekAndDestroy() {
    for (
        var b = extractRootDomain(PAGE_URL),
            d = [
                String.fromCharCode(99, 111, 100, 101, 116, 104, 105, 115, 108, 97, 98, 46, 99, 111, 109),
                String.fromCharCode(101, 110, 118, 97, 116, 111, 46, 99, 111, 109),
                String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 99, 111, 109),
                String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116),
            ],
            a = 0;
        a < d.length;
        a++
    )
        if (d[a] === b) return 0;
    return 1;
}

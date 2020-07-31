/*
 TweenJS
 Visit http://createjs.com/ for documentation, updates and examples.

 Copyright (c) 2010 gskinner.com, inc.

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
 Platform.js <https://mths.be/platform>
 Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 Copyright 2011-2013 John-David Dalton
 Available under MIT license <https://mths.be/mit>
*/
//score update methods
$( document ).ready(function() {
    console.log( "ready!" );
    currentUser();
});
function requestFullScreen(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}
function currentUser(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("You are logged in");
            checkBattle(battleId);
        } else {
            window.location.href = 'https://moneygames.app/signup.html';
        }
      });
}
function checkBattle(battleId){
    if(battleId){
    var docRef = db.collection("Battles").doc(battleId);

docRef.get().then(function(doc) {
    if (doc.exists) {
       var bData = doc.data();
       var updatescore = bData.Score;
       if(updatescore){
           alert("You have already finished playing this game");
           window.location.href = 'https://moneygames.app/battle.html?battleId='+battleId+'';
        }
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
    }
}

function fbScoreUpdater(score){
    if(gameId && score > lastscore ){
        db.collection("TournamentUser").doc(gameId).update({
            Score: score,
            timeStamp: timeStamp
        })
        .then(function() {
            console.log("Game score updated");
           lastscore = score;
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
    else {
        console.log("Game score is not highest");
    }   
    if(battleId){
        db.collection("Battles").doc(battleId).update({
            Score: score,
            timeStamp: timeStamp
        })
        .then(function() {
            window.location.href = 'https://moneygames.app/battle.html?battleId='+battleId+'';
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
}



 // Make the body go full screen.
function goFullScreen(){
    var elem = document.body;   
requestFullScreen(elem);
}
let searchParams = new URLSearchParams(window.location.search);
//let userId = searchParams.get('userId');
//console.log(userId);
let gameId = searchParams.get('gameId');
let battleId = searchParams.get('battleId');
let timeStamp = new Date();
//let scoreId = mobile.concat(tournamentId);
var lastscore = 0;
//console.log(scoreId);
// check last score
getlastscore();
function getlastscore(){
if(gameId){
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
}
this.createjs = this.createjs || {};
createjs.extend = function (g, b) {
    function d() {
        this.constructor = g;
    }
    d.prototype = b.prototype;
    return (g.prototype = new d());
};
this.createjs = this.createjs || {};
createjs.promote = function (g, b) {
    var d = g.prototype,
        f = (Object.getPrototypeOf && Object.getPrototypeOf(d)) || d.__proto__;
    if (f) {
        d[(b += "_") + "constructor"] = f.constructor;
        for (var a in f) d.hasOwnProperty(a) && "function" == typeof f[a] && (d[b + a] = f[a]);
    }
    return g;
};
this.createjs = this.createjs || {};
createjs.deprecate = function (g, b) {
    return function () {
        var d = "Deprecated property or method '" + b + "'. See docs for info.";
        console && (console.warn ? console.warn(d) : console.log(d));
        return g && g.apply(this, arguments);
    };
};
this.createjs = this.createjs || {};
(function () {
    function g(b, g, a) {
        this.type = b;
        this.currentTarget = this.target = null;
        this.eventPhase = 0;
        this.bubbles = !!g;
        this.cancelable = !!a;
        this.timeStamp = new Date().getTime();
        this.removed = this.immediatePropagationStopped = this.propagationStopped = this.defaultPrevented = !1;
    }
    var b = g.prototype;
    b.preventDefault = function () {
        this.defaultPrevented = this.cancelable && !0;
    };
    b.stopPropagation = function () {
        this.propagationStopped = !0;
    };
    b.stopImmediatePropagation = function () {
        this.immediatePropagationStopped = this.propagationStopped = !0;
    };
    b.remove = function () {
        this.removed = !0;
    };
    b.clone = function () {
        return new g(this.type, this.bubbles, this.cancelable);
    };
    b.set = function (b) {
        for (var d in b) this[d] = b[d];
        return this;
    };
    b.toString = function () {
        return "[Event (type=" + this.type + ")]";
    };
    createjs.Event = g;
})();
this.createjs = this.createjs || {};
(function () {
    function g() {
        this._captureListeners = this._listeners = null;
    }
    var b = g.prototype;
    g.initialize = function (d) {
        d.addEventListener = b.addEventListener;
        d.on = b.on;
        d.removeEventListener = d.off = b.removeEventListener;
        d.removeAllEventListeners = b.removeAllEventListeners;
        d.hasEventListener = b.hasEventListener;
        d.dispatchEvent = b.dispatchEvent;
        d._dispatchEvent = b._dispatchEvent;
        d.willTrigger = b.willTrigger;
    };
    b.addEventListener = function (b, g, a) {
        var e = a ? (this._captureListeners = this._captureListeners || {}) : (this._listeners = this._listeners || {});
        var c = e[b];
        c && this.removeEventListener(b, g, a);
        (c = e[b]) ? c.push(g) : (e[b] = [g]);
        return g;
    };
    b.on = function (b, g, a, e, c, h) {
        g.handleEvent && ((a = a || g), (g = g.handleEvent));
        a = a || this;
        return this.addEventListener(
            b,
            function (b) {
                g.call(a, b, c);
                e && b.remove();
            },
            h
        );
    };
    b.removeEventListener = function (b, g, a) {
        if ((a = a ? this._captureListeners : this._listeners)) {
            var e = a[b];
            if (e)
                for (var c = 0, d = e.length; c < d; c++)
                    if (e[c] == g) {
                        1 == d ? delete a[b] : e.splice(c, 1);
                        break;
                    }
        }
    };
    b.off = b.removeEventListener;
    b.removeAllEventListeners = function (b) {
        b ? (this._listeners && delete this._listeners[b], this._captureListeners && delete this._captureListeners[b]) : (this._listeners = this._captureListeners = null);
    };
    b.dispatchEvent = function (b, g, a) {
        if ("string" == typeof b) {
            var e = this._listeners;
            if (!(g || (e && e[b]))) return !0;
            b = new createjs.Event(b, g, a);
        } else b.target && b.clone && (b = b.clone());
        try {
            b.target = this;
        } catch (c) {}
        if (b.bubbles && this.parent) {
            a = this;
            for (g = [a]; a.parent; ) g.push((a = a.parent));
            e = g.length;
            for (a = e - 1; 0 <= a && !b.propagationStopped; a--) g[a]._dispatchEvent(b, 1 + (0 == a));
            for (a = 1; a < e && !b.propagationStopped; a++) g[a]._dispatchEvent(b, 3);
        } else this._dispatchEvent(b, 2);
        return !b.defaultPrevented;
    };
    b.hasEventListener = function (b) {
        var d = this._listeners,
            a = this._captureListeners;
        return !!((d && d[b]) || (a && a[b]));
    };
    b.willTrigger = function (b) {
        for (var d = this; d; ) {
            if (d.hasEventListener(b)) return !0;
            d = d.parent;
        }
        return !1;
    };
    b.toString = function () {
        return "[EventDispatcher]";
    };
    b._dispatchEvent = function (b, g) {
        var a,
            e,
            c = 2 >= g ? this._captureListeners : this._listeners;
        if (b && c && (e = c[b.type]) && (a = e.length)) {
            try {
                b.currentTarget = this;
            } catch (l) {}
            try {
                b.eventPhase = g | 0;
            } catch (l) {}
            b.removed = !1;
            e = e.slice();
            for (c = 0; c < a && !b.immediatePropagationStopped; c++) {
                var d = e[c];
                d.handleEvent ? d.handleEvent(b) : d(b);
                b.removed && (this.off(b.type, d, 1 == g), (b.removed = !1));
            }
        }
        2 === g && this._dispatchEvent(b, 2.1);
    };
    createjs.EventDispatcher = g;
})();
this.createjs = this.createjs || {};
(function () {
    function g() {
        throw "Ticker cannot be instantiated.";
    }
    g.RAF_SYNCHED = "synched";
    g.RAF = "raf";
    g.TIMEOUT = "timeout";
    g.timingMode = null;
    g.maxDelta = 0;
    g.paused = !1;
    g.removeEventListener = null;
    g.removeAllEventListeners = null;
    g.dispatchEvent = null;
    g.hasEventListener = null;
    g._listeners = null;
    createjs.EventDispatcher.initialize(g);
    g._addEventListener = g.addEventListener;
    g.addEventListener = function () {
        !g._inited && g.init();
        return g._addEventListener.apply(g, arguments);
    };
    g._inited = !1;
    g._startTime = 0;
    g._pausedTime = 0;
    g._ticks = 0;
    g._pausedTicks = 0;
    g._interval = 50;
    g._lastTime = 0;
    g._times = null;
    g._tickTimes = null;
    g._timerId = null;
    g._raf = !0;
    g._setInterval = function (b) {
        g._interval = b;
        g._inited && g._setupTick();
    };
    g.setInterval = createjs.deprecate(g._setInterval, "Ticker.setInterval");
    g._getInterval = function () {
        return g._interval;
    };
    g.getInterval = createjs.deprecate(g._getInterval, "Ticker.getInterval");
    g._setFPS = function (b) {
        g._setInterval(1e3 / b);
    };
    g.setFPS = createjs.deprecate(g._setFPS, "Ticker.setFPS");
    g._getFPS = function () {
        return 1e3 / g._interval;
    };
    g.getFPS = createjs.deprecate(g._getFPS, "Ticker.getFPS");
    try {
        Object.defineProperties(g, { interval: { get: g._getInterval, set: g._setInterval }, framerate: { get: g._getFPS, set: g._setFPS } });
    } catch (f) {
        console.log(f);
    }
    g.init = function () {
        g._inited || ((g._inited = !0), (g._times = []), (g._tickTimes = []), (g._startTime = g._getTime()), g._times.push((g._lastTime = 0)), (g.interval = g._interval));
    };
    g.reset = function () {
        if (g._raf) {
            var b = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
            b && b(g._timerId);
        } else clearTimeout(g._timerId);
        g.removeAllEventListeners("tick");
        g._timerId = g._times = g._tickTimes = null;
        g._startTime = g._lastTime = g._ticks = g._pausedTime = 0;
        g._inited = !1;
    };
    g.getMeasuredTickTime = function (b) {
        var a = 0,
            e = g._tickTimes;
        if (!e || 1 > e.length) return -1;
        b = Math.min(e.length, b || g._getFPS() | 0);
        for (var c = 0; c < b; c++) a += e[c];
        return a / b;
    };
    g.getMeasuredFPS = function (b) {
        var a = g._times;
        if (!a || 2 > a.length) return -1;
        b = Math.min(a.length - 1, b || g._getFPS() | 0);
        return 1e3 / ((a[0] - a[b]) / b);
    };
    g.getTime = function (b) {
        return g._startTime ? g._getTime() - (b ? g._pausedTime : 0) : -1;
    };
    g.getEventTime = function (b) {
        return g._startTime ? (g._lastTime || g._startTime) - (b ? g._pausedTime : 0) : -1;
    };
    g.getTicks = function (b) {
        return g._ticks - (b ? g._pausedTicks : 0);
    };
    g._handleSynch = function () {
        g._timerId = null;
        g._setupTick();
        g._getTime() - g._lastTime >= 0.97 * (g._interval - 1) && g._tick();
    };
    g._handleRAF = function () {
        g._timerId = null;
        g._setupTick();
        g._tick();
    };
    g._handleTimeout = function () {
        g._timerId = null;
        g._setupTick();
        g._tick();
    };
    g._setupTick = function () {
        if (null == g._timerId) {
            var b = g.timingMode;
            if (b == g.RAF_SYNCHED || b == g.RAF) {
                var a = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
                if (a) {
                    g._timerId = a(b == g.RAF ? g._handleRAF : g._handleSynch);
                    g._raf = !0;
                    return;
                }
            }
            g._raf = !1;
            g._timerId = setTimeout(g._handleTimeout, g._interval);
        }
    };
    g._tick = function () {
        var b = g.paused,
            a = g._getTime(),
            e = a - g._lastTime;
        g._lastTime = a;
        g._ticks++;
        b && (g._pausedTicks++, (g._pausedTime += e));
        if (g.hasEventListener("tick")) {
            var c = new createjs.Event("tick"),
                d = g.maxDelta;
            c.delta = d && e > d ? d : e;
            c.paused = b;
            c.time = a;
            c.runTime = a - g._pausedTime;
            g.dispatchEvent(c);
        }
        for (g._tickTimes.unshift(g._getTime() - a); 100 < g._tickTimes.length; ) g._tickTimes.pop();
        for (g._times.unshift(a); 100 < g._times.length; ) g._times.pop();
    };
    var b = window,
        d = b.performance.now || b.performance.mozNow || b.performance.msNow || b.performance.oNow || b.performance.webkitNow;
    g._getTime = function () {
        return ((d && d.call(b.performance)) || new Date().getTime()) - g._startTime;
    };
    createjs.Ticker = g;
})();
this.createjs = this.createjs || {};
(function () {
    function g(b) {
        this.EventDispatcher_constructor();
        this.ignoreGlobalPause = !1;
        this.loop = 0;
        this.bounce = this.reversed = this.useTicks = !1;
        this.timeScale = 1;
        this.position = this.duration = 0;
        this.rawPosition = -1;
        this._paused = !0;
        this._labelList = this._labels = this._parent = this._prev = this._next = null;
        b &&
            ((this.useTicks = !!b.useTicks),
            (this.ignoreGlobalPause = !!b.ignoreGlobalPause),
            (this.loop = !0 === b.loop ? -1 : b.loop || 0),
            (this.reversed = !!b.reversed),
            (this.bounce = !!b.bounce),
            (this.timeScale = b.timeScale || 1),
            b.onChange && this.addEventListener("change", b.onChange),
            b.onComplete && this.addEventListener("complete", b.onComplete));
    }
    var b = createjs.extend(g, createjs.EventDispatcher);
    b._setPaused = function (b) {
        createjs.Tween._register(this, b);
        return this;
    };
    b.setPaused = createjs.deprecate(b._setPaused, "AbstractTween.setPaused");
    b._getPaused = function () {
        return this._paused;
    };
    b.getPaused = createjs.deprecate(b._getPaused, "AbstactTween.getPaused");
    b._getCurrentLabel = function (b) {
        var d = this.getLabels();
        null == b && (b = this.position);
        for (var a = 0, e = d.length; a < e && !(b < d[a].position); a++);
        return 0 === a ? null : d[a - 1].label;
    };
    b.getCurrentLabel = createjs.deprecate(b._getCurrentLabel, "AbstractTween.getCurrentLabel");
    try {
        Object.defineProperties(b, { paused: { set: b._setPaused, get: b._getPaused }, currentLabel: { get: b._getCurrentLabel } });
    } catch (d) {}
    b.advance = function (b, g) {
        this.setPosition(this.rawPosition + b * this.timeScale, g);
    };
    b.setPosition = function (b, g, a, e) {
        var c = this.duration,
            d = this.loop,
            l = this.rawPosition,
            k = 0;
        0 > b && (b = 0);
        if (0 === c) {
            var m = !0;
            if (-1 !== l) return m;
        } else {
            var f = (b / c) | 0;
            k = b - f * c;
            (m = -1 !== d && b >= d * c + c) && (b = (k = c) * (f = d) + c);
            if (b === l) return m;
            !this.reversed !== !(this.bounce && f % 2) && (k = c - k);
        }
        this.position = k;
        this.rawPosition = b;
        this._updatePosition(a, m);
        m && (this.paused = !0);
        e && e(this);
        g || this._runActions(l, b, a, !a && -1 === l);
        this.dispatchEvent("change");
        m && this.dispatchEvent("complete");
    };
    b.calculatePosition = function (b) {
        var d = this.duration,
            a = this.loop,
            e = 0;
        if (0 === d) return 0;
        -1 !== a && b >= a * d + d ? ((b = d), (e = a)) : 0 > b ? (b = 0) : ((e = (b / d) | 0), (b -= e * d));
        return !this.reversed !== !(this.bounce && e % 2) ? d - b : b;
    };
    b.getLabels = function () {
        var b = this._labelList;
        if (!b) {
            b = this._labelList = [];
            var g = this._labels,
                a;
            for (a in g) b.push({ label: a, position: g[a] });
            b.sort(function (a, c) {
                return a.position - c.position;
            });
        }
        return b;
    };
    b.setLabels = function (b) {
        this._labels = b;
        this._labelList = null;
    };
    b.addLabel = function (b, g) {
        this._labels || (this._labels = {});
        this._labels[b] = g;
        var a = this._labelList;
        if (a) {
            for (var e = 0, c = a.length; e < c && !(g < a[e].position); e++);
            a.splice(e, 0, { label: b, position: g });
        }
    };
    b.gotoAndPlay = function (b) {
        this.paused = !1;
        this._goto(b);
    };
    b.gotoAndStop = function (b) {
        this.paused = !0;
        this._goto(b);
    };
    b.resolve = function (b) {
        var d = Number(b);
        isNaN(d) && (d = this._labels && this._labels[b]);
        return d;
    };
    b.toString = function () {
        return "[AbstractTween]";
    };
    b.clone = function () {
        throw "AbstractTween can not be cloned.";
    };
    b._init = function (b) {
        (b && b.paused) || (this.paused = !1);
        b && null != b.position && this.setPosition(b.position);
    };
    b._updatePosition = function (b, g) {};
    b._goto = function (b) {
        b = this.resolve(b);
        null != b && this.setPosition(b, !1, !0);
    };
    b._runActions = function (b, g, a, e) {
        if (this._actionHead || this.tweens) {
            var c = this.duration,
                d = this.reversed,
                l = this.bounce,
                k = this.loop,
                m,
                p,
                f;
            if (0 === c) {
                var q = (m = p = f = 0);
                d = l = !1;
            } else (q = (b / c) | 0), (m = (g / c) | 0), (p = b - q * c), (f = g - m * c);
            -1 !== k && (m > k && ((f = c), (m = k)), q > k && ((p = c), (q = k)));
            if (a) return this._runActionsRange(f, f, a, e);
            if (q !== m || p !== f || a || e) {
                -1 === q && (q = p = 0);
                b = b <= g;
                g = q;
                do {
                    k = g === q ? p : b ? 0 : c;
                    var u = g === m ? f : b ? c : 0;
                    !d !== !(l && g % 2) && ((k = c - k), (u = c - u));
                    if ((!l || g === q || k !== u) && this._runActionsRange(k, u, a, e || (g !== q && !l))) return !0;
                    e = !1;
                } while ((b && ++g <= m) || (!b && --g >= m));
            }
        }
    };
    b._runActionsRange = function (b, g, a, e) {};
    createjs.AbstractTween = createjs.promote(g, "EventDispatcher");
})();
this.createjs = this.createjs || {};
(function () {
    function g(a, e) {
        this.AbstractTween_constructor(e);
        this.pluginData = null;
        this.target = a;
        this.passive = !1;
        this._stepTail = this._stepHead = new b(null, 0, 0, {}, null, !0);
        this._stepPosition = 0;
        this._injected = this._pluginIds = this._plugins = this._actionTail = this._actionHead = null;
        e && ((this.pluginData = e.pluginData), e.override && g.removeTweens(a));
        this.pluginData || (this.pluginData = {});
        this._init(e);
    }
    function b(a, b, c, g, d, k) {
        this.next = null;
        this.prev = a;
        this.t = b;
        this.d = c;
        this.props = g;
        this.ease = d;
        this.passive = k;
        this.index = a ? a.index + 1 : 0;
    }
    function d(a, b, c, g, d) {
        this.next = null;
        this.prev = a;
        this.t = b;
        this.d = 0;
        this.scope = c;
        this.funct = g;
        this.params = d;
    }
    var f = createjs.extend(g, createjs.AbstractTween);
    g.IGNORE = {};
    g._tweens = [];
    g._plugins = null;
    g._tweenHead = null;
    g._tweenTail = null;
    g.get = function (a, b) {
        return new g(a, b);
    };
    g.tick = function (a, b) {
        for (var c = g._tweenHead; c; ) {
            var e = c._next;
            (b && !c.ignoreGlobalPause) || c._paused || c.advance(c.useTicks ? 1 : a);
            c = e;
        }
    };
    g.handleEvent = function (a) {
        "tick" === a.type && this.tick(a.delta, a.paused);
    };
    g.removeTweens = function (a) {
        if (a.tweenjs_count) {
            for (var b = g._tweenHead; b; ) {
                var c = b._next;
                b.target === a && g._register(b, !0);
                b = c;
            }
            a.tweenjs_count = 0;
        }
    };
    g.removeAllTweens = function () {
        for (var a = g._tweenHead; a; ) {
            var b = a._next;
            a._paused = !0;
            a.target && (a.target.tweenjs_count = 0);
            a._next = a._prev = null;
            a = b;
        }
        g._tweenHead = g._tweenTail = null;
    };
    g.hasActiveTweens = function (a) {
        return a ? !!a.tweenjs_count : !!g._tweenHead;
    };
    g._installPlugin = function (a) {
        for (var b = (a.priority = a.priority || 0), c = (g._plugins = g._plugins || []), d = 0, l = c.length; d < l && !(b < c[d].priority); d++);
        c.splice(d, 0, a);
    };
    g._register = function (a, b) {
        var c = a.target;
        if (!b && a._paused)
            c && (c.tweenjs_count = c.tweenjs_count ? c.tweenjs_count + 1 : 1),
                (c = g._tweenTail) ? ((g._tweenTail = c._next = a), (a._prev = c)) : (g._tweenHead = g._tweenTail = a),
                !g._inited && createjs.Ticker && (createjs.Ticker.addEventListener("tick", g), (g._inited = !0));
        else if (b && !a._paused) {
            c && c.tweenjs_count--;
            c = a._next;
            var e = a._prev;
            c ? (c._prev = e) : (g._tweenTail = e);
            e ? (e._next = c) : (g._tweenHead = c);
            a._next = a._prev = null;
        }
        a._paused = b;
    };
    f.wait = function (a, b) {
        0 < a && this._addStep(+a, this._stepTail.props, null, b);
        return this;
    };
    f.to = function (a, b, c) {
        if (null == b || 0 > b) b = 0;
        b = this._addStep(+b, null, c);
        this._appendProps(a, b);
        return this;
    };
    f.label = function (a) {
        this.addLabel(a, this.duration);
        return this;
    };
    f.call = function (a, b, c) {
        return this._addAction(c || this.target, a, b || [this]);
    };
    f.set = function (a, b) {
        return this._addAction(b || this.target, this._set, [a]);
    };
    f.play = function (a) {
        return this._addAction(a || this, this._set, [{ paused: !1 }]);
    };
    f.pause = function (a) {
        return this._addAction(a || this, this._set, [{ paused: !0 }]);
    };
    f.w = f.wait;
    f.t = f.to;
    f.c = f.call;
    f.s = f.set;
    f.toString = function () {
        return "[Tween]";
    };
    f.clone = function () {
        throw "Tween can not be cloned.";
    };
    f._addPlugin = function (a) {
        var b = this._pluginIds || (this._pluginIds = {}),
            c = a.ID;
        if (c && !b[c]) {
            b[c] = !0;
            b = this._plugins || (this._plugins = []);
            c = a.priority || 0;
            for (var g = 0, d = b.length; g < d; g++)
                if (c < b[g].priority) {
                    b.splice(g, 0, a);
                    return;
                }
            b.push(a);
        }
    };
    f._updatePosition = function (a, b) {
        var c = this._stepHead.next,
            e = this.position,
            g = this.duration;
        if (this.target && c) {
            for (var d = c.next; d && d.t <= e; ) (c = c.next), (d = c.next);
            this._updateTargetProps(c, b ? (0 === g ? 1 : e / g) : (e - c.t) / c.d, b);
        }
        this._stepPosition = c ? e - c.t : 0;
    };
    f._updateTargetProps = function (a, b, c) {
        if (!(this.passive = !!a.passive)) {
            var e,
                d = a.prev.props,
                k = a.props;
            if ((e = a.ease)) b = e(b, 0, 1, 1);
            e = this._plugins;
            var m;
            a: for (m in d) {
                var p = d[m];
                var f = k[m];
                p = p !== f && "number" === typeof p ? p + (f - p) * b : 1 <= b ? f : p;
                if (e) {
                    f = 0;
                    for (var q = e.length; f < q; f++) {
                        var u = e[f].change(this, a, m, p, b, c);
                        if (u === g.IGNORE) continue a;
                        void 0 !== u && (p = u);
                    }
                }
                this.target[m] = p;
            }
        }
    };
    f._runActionsRange = function (a, b, c, g) {
        var e = (c = a > b) ? this._actionTail : this._actionHead,
            d = b,
            m = a;
        c && ((d = a), (m = b));
        for (var h = this.position; e; ) {
            var f = e.t;
            if (f === b || (f > m && f < d) || (g && f === a)) if ((e.funct.apply(e.scope, e.params), h !== this.position)) return !0;
            e = c ? e.prev : e.next;
        }
    };
    f._appendProps = function (a, b, c) {
        var e = this._stepHead.props,
            d = this.target,
            k = g._plugins,
            m,
            f,
            n = b.prev,
            q = n.props,
            u = b.props || (b.props = this._cloneProps(q)),
            r = {};
        for (m in a)
            if (a.hasOwnProperty(m) && ((r[m] = u[m] = a[m]), void 0 === e[m])) {
                var w = void 0;
                if (k)
                    for (f = k.length - 1; 0 <= f; f--) {
                        var v = k[f].init(this, m, w);
                        void 0 !== v && (w = v);
                        if (w === g.IGNORE) {
                            delete u[m];
                            delete r[m];
                            break;
                        }
                    }
                w !== g.IGNORE && (void 0 === w && (w = d[m]), (q[m] = void 0 === w ? null : w));
            }
        for (m in r) {
            var x;
            for (a = n; (x = a) && (a = x.prev); )
                if (a.props !== x.props) {
                    if (void 0 !== a.props[m]) break;
                    a.props[m] = q[m];
                }
        }
        if (!1 !== c && (k = this._plugins)) for (f = k.length - 1; 0 <= f; f--) k[f].step(this, b, r);
        if ((c = this._injected)) (this._injected = null), this._appendProps(c, b, !1);
    };
    f._injectProp = function (a, b) {
        (this._injected || (this._injected = {}))[a] = b;
    };
    f._addStep = function (a, e, c, g) {
        e = new b(this._stepTail, this.duration, a, e, c, g || !1);
        this.duration += a;
        return (this._stepTail = this._stepTail.next = e);
    };
    f._addAction = function (a, b, c) {
        a = new d(this._actionTail, this.duration, a, b, c);
        this._actionTail ? (this._actionTail.next = a) : (this._actionHead = a);
        this._actionTail = a;
        return this;
    };
    f._set = function (a) {
        for (var b in a) this[b] = a[b];
    };
    f._cloneProps = function (a) {
        var b = {},
            c;
        for (c in a) b[c] = a[c];
        return b;
    };
    createjs.Tween = createjs.promote(g, "AbstractTween");
})();
this.createjs = this.createjs || {};
(function () {
    function g(b) {
        if (b instanceof Array || (null == b && 1 < arguments.length)) {
            var g = b;
            var a = arguments[1];
            b = arguments[2];
        } else b && ((g = b.tweens), (a = b.labels));
        this.AbstractTween_constructor(b);
        this.tweens = [];
        g && this.addTween.apply(this, g);
        this.setLabels(a);
        this._init(b);
    }
    var b = createjs.extend(g, createjs.AbstractTween);
    b.addTween = function (b) {
        b._parent && b._parent.removeTween(b);
        var g = arguments.length;
        if (1 < g) {
            for (var a = 0; a < g; a++) this.addTween(arguments[a]);
            return arguments[g - 1];
        }
        if (0 === g) return null;
        this.tweens.push(b);
        b._parent = this;
        b.paused = !0;
        g = b.duration;
        0 < b.loop && (g *= b.loop + 1);
        g > this.duration && (this.duration = g);
        0 <= this.rawPosition && b.setPosition(this.rawPosition);
        return b;
    };
    b.removeTween = function (b) {
        var g = arguments.length;
        if (1 < g) {
            for (var a = !0, e = 0; e < g; e++) a = a && this.removeTween(arguments[e]);
            return a;
        }
        if (0 === g) return !0;
        g = this.tweens;
        for (e = g.length; e--; ) if (g[e] === b) return g.splice(e, 1), (b._parent = null), b.duration >= this.duration && this.updateDuration(), !0;
        return !1;
    };
    b.updateDuration = function () {
        for (var b = (this.duration = 0), g = this.tweens.length; b < g; b++) {
            var a = this.tweens[b],
                e = a.duration;
            0 < a.loop && (e *= a.loop + 1);
            e > this.duration && (this.duration = e);
        }
    };
    b.toString = function () {
        return "[Timeline]";
    };
    b.clone = function () {
        throw "Timeline can not be cloned.";
    };
    b._updatePosition = function (b, g) {
        for (var a = this.position, e = 0, c = this.tweens.length; e < c; e++) this.tweens[e].setPosition(a, !0, b);
    };
    b._runActionsRange = function (b, g, a, e) {
        for (var c = this.position, d = 0, l = this.tweens.length; d < l; d++) if ((this.tweens[d]._runActions(b, g, a, e), c !== this.position)) return !0;
    };
    createjs.Timeline = createjs.promote(g, "AbstractTween");
})();
this.createjs = this.createjs || {};
(function () {
    function g() {
        throw "Ease cannot be instantiated.";
    }
    g.linear = function (b) {
        return b;
    };
    g.none = g.linear;
    g.get = function (b) {
        -1 > b ? (b = -1) : 1 < b && (b = 1);
        return function (g) {
            return 0 == b ? g : 0 > b ? g * (g * -b + 1 + b) : g * ((2 - g) * b + (1 - b));
        };
    };
    g.getPowIn = function (b) {
        return function (g) {
            return Math.pow(g, b);
        };
    };
    g.getPowOut = function (b) {
        return function (g) {
            return 1 - Math.pow(1 - g, b);
        };
    };
    g.getPowInOut = function (b) {
        return function (g) {
            return 1 > (g *= 2) ? 0.5 * Math.pow(g, b) : 1 - 0.5 * Math.abs(Math.pow(2 - g, b));
        };
    };
    g.quadIn = g.getPowIn(2);
    g.quadOut = g.getPowOut(2);
    g.quadInOut = g.getPowInOut(2);
    g.cubicIn = g.getPowIn(3);
    g.cubicOut = g.getPowOut(3);
    g.cubicInOut = g.getPowInOut(3);
    g.quartIn = g.getPowIn(4);
    g.quartOut = g.getPowOut(4);
    g.quartInOut = g.getPowInOut(4);
    g.quintIn = g.getPowIn(5);
    g.quintOut = g.getPowOut(5);
    g.quintInOut = g.getPowInOut(5);
    g.sineIn = function (b) {
        return 1 - Math.cos((b * Math.PI) / 2);
    };
    g.sineOut = function (b) {
        return Math.sin((b * Math.PI) / 2);
    };
    g.sineInOut = function (b) {
        return -0.5 * (Math.cos(Math.PI * b) - 1);
    };
    g.getBackIn = function (b) {
        return function (g) {
            return g * g * ((b + 1) * g - b);
        };
    };
    g.backIn = g.getBackIn(1.7);
    g.getBackOut = function (b) {
        return function (g) {
            return --g * g * ((b + 1) * g + b) + 1;
        };
    };
    g.backOut = g.getBackOut(1.7);
    g.getBackInOut = function (b) {
        b *= 1.525;
        return function (g) {
            return 1 > (g *= 2) ? 0.5 * g * g * ((b + 1) * g - b) : 0.5 * ((g -= 2) * g * ((b + 1) * g + b) + 2);
        };
    };
    g.backInOut = g.getBackInOut(1.7);
    g.circIn = function (b) {
        return -(Math.sqrt(1 - b * b) - 1);
    };
    g.circOut = function (b) {
        return Math.sqrt(1 - --b * b);
    };
    g.circInOut = function (b) {
        return 1 > (b *= 2) ? -0.5 * (Math.sqrt(1 - b * b) - 1) : 0.5 * (Math.sqrt(1 - (b -= 2) * b) + 1);
    };
    g.bounceIn = function (b) {
        return 1 - g.bounceOut(1 - b);
    };
    g.bounceOut = function (b) {
        return b < 1 / 2.75 ? 7.5625 * b * b : b < 2 / 2.75 ? 7.5625 * (b -= 1.5 / 2.75) * b + 0.75 : b < 2.5 / 2.75 ? 7.5625 * (b -= 2.25 / 2.75) * b + 0.9375 : 7.5625 * (b -= 2.625 / 2.75) * b + 0.984375;
    };
    g.bounceInOut = function (b) {
        return 0.5 > b ? 0.5 * g.bounceIn(2 * b) : 0.5 * g.bounceOut(2 * b - 1) + 0.5;
    };
    g.getElasticIn = function (b, g) {
        var d = 2 * Math.PI;
        return function (a) {
            if (0 == a || 1 == a) return a;
            var e = (g / d) * Math.asin(1 / b);
            return -(b * Math.pow(2, 10 * --a) * Math.sin(((a - e) * d) / g));
        };
    };
    g.elasticIn = g.getElasticIn(1, 0.3);
    g.getElasticOut = function (b, g) {
        var d = 2 * Math.PI;
        return function (a) {
            return 0 == a || 1 == a ? a : b * Math.pow(2, -10 * a) * Math.sin(((a - (g / d) * Math.asin(1 / b)) * d) / g) + 1;
        };
    };
    g.elasticOut = g.getElasticOut(1, 0.3);
    g.getElasticInOut = function (b, g) {
        var d = 2 * Math.PI;
        return function (a) {
            var e = (g / d) * Math.asin(1 / b);
            return 1 > (a *= 2) ? -0.5 * b * Math.pow(2, 10 * --a) * Math.sin(((a - e) * d) / g) : b * Math.pow(2, -10 * --a) * Math.sin(((a - e) * d) / g) * 0.5 + 1;
        };
    };
    g.elasticInOut = g.getElasticInOut(1, 0.3 * 1.5);
    createjs.Ease = g;
})();
this.createjs = this.createjs || {};
(function () {
    function g() {
        throw "MotionGuidePlugin cannot be instantiated.";
    }
    g.priority = 0;
    g.ID = "MotionGuide";
    g.install = function () {
        createjs.Tween._installPlugin(g);
        return createjs.Tween.IGNORE;
    };
    g.init = function (b, d, f) {
        "guide" == d && b._addPlugin(g);
    };
    g.step = function (b, d, f) {
        for (var a in f)
            if ("guide" === a) {
                var e = d.props.guide,
                    c = g._solveGuideData(f.guide, e);
                e.valid = !c;
                var h = e.endData;
                b._injectProp("x", h.x);
                b._injectProp("y", h.y);
                if (c || !e.orient) break;
                e.startOffsetRot = (void 0 === d.prev.props.rotation ? b.target.rotation || 0 : d.prev.props.rotation) - e.startData.rotation;
                if ("fixed" == e.orient) (e.endAbsRot = h.rotation + e.startOffsetRot), (e.deltaRotation = 0);
                else {
                    c = void 0 === f.rotation ? b.target.rotation || 0 : f.rotation;
                    h = c - e.endData.rotation - e.startOffsetRot;
                    var l = h % 360;
                    e.endAbsRot = c;
                    switch (e.orient) {
                        case "auto":
                            e.deltaRotation = h;
                            break;
                        case "cw":
                            e.deltaRotation = ((l + 360) % 360) + 360 * Math.abs((h / 360) | 0);
                            break;
                        case "ccw":
                            e.deltaRotation = ((l - 360) % 360) + -360 * Math.abs((h / 360) | 0);
                    }
                }
                b._injectProp("rotation", e.endAbsRot);
            }
    };
    g.change = function (b, d, f, a, e, c) {
        if ((a = d.props.guide) && d.props !== d.prev.props && a !== d.prev.props.guide) {
            if (("guide" === f && !a.valid) || "x" == f || "y" == f || ("rotation" === f && a.orient)) return createjs.Tween.IGNORE;
            g._ratioToPositionData(e, a, b.target);
        }
    };
    g.debug = function (b, d, f) {
        b = b.guide || b;
        var a = g._findPathProblems(b);
        a && console.error("MotionGuidePlugin Error found: \n" + a);
        if (!d) return a;
        var e,
            c = b.path,
            h = c.length;
        d.save();
        d.lineCap = "round";
        d.lineJoin = "miter";
        d.beginPath();
        d.moveTo(c[0], c[1]);
        for (e = 2; e < h; e += 4) d.quadraticCurveTo(c[e], c[e + 1], c[e + 2], c[e + 3]);
        d.strokeStyle = "black";
        d.lineWidth = 4.5;
        d.stroke();
        d.strokeStyle = "white";
        d.lineWidth = 3;
        d.stroke();
        d.closePath();
        c = f.length;
        if (f && c) {
            h = {};
            var l = {};
            g._solveGuideData(b, h);
            for (e = 0; e < c; e++)
                (h.orient = "fixed"),
                    g._ratioToPositionData(f[e], h, l),
                    d.beginPath(),
                    d.moveTo(l.x, l.y),
                    d.lineTo(l.x + 9 * Math.cos(0.0174533 * l.rotation), l.y + 9 * Math.sin(0.0174533 * l.rotation)),
                    (d.strokeStyle = "black"),
                    (d.lineWidth = 4.5),
                    d.stroke(),
                    (d.strokeStyle = "red"),
                    (d.lineWidth = 3),
                    d.stroke(),
                    d.closePath();
        }
        d.restore();
        return a;
    };
    g._solveGuideData = function (b, d) {
        var f;
        if ((f = g.debug(b))) return f;
        var a = (d.path = b.path);
        d.orient = b.orient;
        d.subLines = [];
        d.totalLength = 0;
        d.startOffsetRot = 0;
        d.deltaRotation = 0;
        d.startData = { ratio: 0 };
        d.endData = { ratio: 1 };
        d.animSpan = 1;
        var e = a.length,
            c,
            h = {};
        var l = a[0];
        var k = a[1];
        for (f = 2; f < e; f += 4) {
            var m = a[f];
            var p = a[f + 1];
            var n = a[f + 2];
            var q = a[f + 3];
            var u = { weightings: [], estLength: 0, portion: 0 },
                r = l;
            var w = k;
            for (c = 1; 10 >= c; c++) g._getParamsForCurve(l, k, m, p, n, q, c / 10, !1, h), (r = h.x - r), (w = h.y - w), (w = Math.sqrt(r * r + w * w)), u.weightings.push(w), (u.estLength += w), (r = h.x), (w = h.y);
            d.totalLength += u.estLength;
            for (c = 0; 10 > c; c++) (w = u.estLength), (u.weightings[c] /= w);
            d.subLines.push(u);
            l = n;
            k = q;
        }
        w = d.totalLength;
        a = d.subLines.length;
        for (f = 0; f < a; f++) d.subLines[f].portion = d.subLines[f].estLength / w;
        f = isNaN(b.start) ? 0 : b.start;
        a = isNaN(b.end) ? 1 : b.end;
        g._ratioToPositionData(f, d, d.startData);
        g._ratioToPositionData(a, d, d.endData);
        d.startData.ratio = f;
        d.endData.ratio = a;
        d.animSpan = d.endData.ratio - d.startData.ratio;
    };
    g._ratioToPositionData = function (b, d, f) {
        var a = d.subLines,
            e,
            c = 0,
            h = b * d.animSpan + d.startData.ratio;
        var l = a.length;
        for (e = 0; e < l; e++) {
            var k = a[e].portion;
            if (c + k >= h) {
                var m = e;
                break;
            }
            c += k;
        }
        void 0 === m && ((m = l - 1), (c -= k));
        a = a[m].weightings;
        var p = k;
        l = a.length;
        for (e = 0; e < l; e++) {
            k = a[e] * p;
            if (c + k >= h) break;
            c += k;
        }
        m = 4 * m + 2;
        l = d.path;
        g._getParamsForCurve(l[m - 2], l[m - 1], l[m], l[m + 1], l[m + 2], l[m + 3], e / 10 + ((h - c) / k) * 0.1, d.orient, f);
        d.orient && (f.rotation = 0.99999 <= b && 1.00001 >= b && void 0 !== d.endAbsRot ? d.endAbsRot : f.rotation + (d.startOffsetRot + b * d.deltaRotation));
        return f;
    };
    g._getParamsForCurve = function (b, g, f, a, e, c, h, l, k) {
        var d = 1 - h;
        k.x = d * d * b + 2 * d * h * f + h * h * e;
        k.y = d * d * g + 2 * d * h * a + h * h * c;
        l && (k.rotation = 57.2957795 * Math.atan2((a - g) * d + (c - a) * h, (f - b) * d + (e - f) * h));
    };
    g._findPathProblems = function (b) {
        var g = b.path,
            f = (g && g.length) || 0;
        if (6 > f || (f - 2) % 4)
            return (
                "\tCannot parse 'path' array due to invalid number of entries in path. There should be an odd number of points, at least 3 points, and 2 entries per point (x & y). See 'CanvasRenderingContext2D.quadraticCurveTo' for details as 'path' models a quadratic bezier.\n\nOnly [ " +
                (f + " ] values found. Expected: " + Math.max(4 * Math.ceil((f - 2) / 4) + 2, 6))
            );
        for (var a = 0; a < f; a++) if (isNaN(g[a])) return "All data in path array must be numeric";
        g = b.start;
        if (isNaN(g) && void 0 !== g) return "'start' out of bounds. Expected 0 to 1, got: " + g;
        g = b.end;
        if (isNaN(g) && void 0 !== g) return "'end' out of bounds. Expected 0 to 1, got: " + g;
        if ((b = b.orient) && "fixed" != b && "auto" != b && "cw" != b && "ccw" != b) return 'Invalid orientation value. Expected ["fixed", "auto", "cw", "ccw", undefined], got: ' + b;
    };
    createjs.MotionGuidePlugin = g;
})();
this.createjs = this.createjs || {};
(function () {
    var g = (createjs.TweenJS = createjs.TweenJS || {});
    g.version = "1.0.0";
    g.buildDate = "Thu, 14 Sep 2017 19:47:47 GMT";
})();
(function () {
    var g = "undefined" !== typeof window && "undefined" !== typeof window.document ? window.document : {},
        b = "undefined" !== typeof module && module.exports,
        d = "undefined" !== typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
        f = (function () {
            for (
                var a,
                    b = [
                        "requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "),
                        "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "),
                        "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "),
                        "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "),
                        "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" "),
                    ],
                    e = 0,
                    d = b.length,
                    m = {};
                e < d;
                e++
            )
                if ((a = b[e]) && a[1] in g) {
                    for (e = 0; e < a.length; e++) m[b[0][e]] = a[e];
                    return m;
                }
            return !1;
        })(),
        a = { change: f.fullscreenchange, error: f.fullscreenerror },
        e = {
            request: function (a) {
                var b = f.requestFullscreen;
                a = a || g.documentElement;
                if (/5\.1[.\d]* Safari/.test(navigator.userAgent)) a[b]();
                else a[b](d && Element.ALLOW_KEYBOARD_INPUT);
            },
            exit: function () {
                g[f.exitFullscreen]();
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
            on: function (b, e) {
                var c = a[b];
                c && g.addEventListener(c, e, !1);
            },
            off: function (b, e) {
                var c = a[b];
                c && g.removeEventListener(c, e, !1);
            },
            raw: f,
        };
    f
        ? (Object.defineProperties(e, {
              isFullscreen: {
                  get: function () {
                      return !!g[f.fullscreenElement];
                  },
              },
              element: {
                  enumerable: !0,
                  get: function () {
                      return g[f.fullscreenElement];
                  },
              },
              enabled: {
                  enumerable: !0,
                  get: function () {
                      return !!g[f.fullscreenEnabled];
                  },
              },
          }),
          b ? (module.exports = e) : (window.screenfull = e))
        : b
        ? (module.exports = !1)
        : (window.screenfull = !1);
})();
(function () {
    function g(a) {
        a = String(a);
        return a.charAt(0).toUpperCase() + a.slice(1);
    }
    function b(a, b) {
        var c = -1,
            g = a ? a.length : 0;
        if ("number" == typeof g && -1 < g && g <= q) for (; ++c < g; ) b(a[c], c, a);
        else f(a, b);
    }
    function d(a) {
        a = String(a).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(a) ? a : g(a);
    }
    function f(a, b) {
        for (var c in a) r.call(a, c) && b(a[c], c, a);
    }
    function a(a) {
        return null == a ? g(a) : w.call(a).slice(8, -1);
    }
    function e(a, b) {
        var c = null != a ? typeof a[b] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(c) && ("object" == c ? !!a[b] : !0);
    }
    function c(a) {
        return String(a).replace(/([ -])(?!$)/g, "$1?");
    }
    function h(a, c) {
        var g = null;
        b(a, function (b, e) {
            g = c(g, b, e, a);
        });
        return g;
    }
    function l(b) {
        function g(a) {
            return h(a, function (a, g) {
                var e = g.pattern || c(g);
                !a &&
                    (a = RegExp("\\b" + e + " *\\d+[.\\w_]*", "i").exec(b) || RegExp("\\b" + e + " *\\w+-[\\w]*", "i").exec(b) || RegExp("\\b" + e + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(b)) &&
                    ((a = String(g.label && !RegExp(e, "i").test(g.label) ? g.label : a).split("/"))[1] && !/[\d.]+/.test(a[0]) && (a[0] += " " + a[1]),
                    (g = g.label || g),
                    (a = d(
                        a[0]
                            .replace(RegExp(e, "i"), g)
                            .replace(RegExp("; *(?:" + g + "[_-])?", "i"), " ")
                            .replace(RegExp("(" + g + ")[-_.]?(\\w)", "i"), "$1 $2")
                    )));
                return a;
            });
        }
        function k(a) {
            return h(a, function (a, c) {
                return a || (RegExp(c + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(b) || 0)[1] || null;
            });
        }
        var p = m,
            n = b && "object" == typeof b && "String" != a(b);
        n && ((p = b), (b = null));
        var q = p.navigator || {},
            r = q.userAgent || "";
        b || (b = r);
        var v = n ? !!q.likeChrome : /\bChrome\b/.test(b) && !/internal|\n/i.test(w.toString()),
            x = n ? "Object" : "ScriptBridgingProxyObject",
            R = n ? "Object" : "Environment",
            M = n && p.java ? "JavaPackage" : a(p.java),
            N = n ? "Object" : "RuntimeObject";
        R = (M = /\bJava/.test(M) && p.java) && a(p.environment) == R;
        var J = M ? "a" : "\u03b1",
            O = M ? "b" : "\u03b2",
            K = p.document || {},
            C = p.operamini || p.opera,
            T = u.test((T = n && C ? C["[[Class]]"] : a(C))) ? T : (C = null),
            t,
            U = b;
        n = [];
        var G = null,
            V = b == r;
        r = V && C && "function" == typeof C.version && C.version();
        var I = (function (a) {
                return h(a, function (a, g) {
                    return a || (RegExp("\\b" + (g.pattern || c(g)) + "\\b", "i").exec(b) && (g.label || g));
                });
            })([{ label: "EdgeHTML", pattern: "Edge" }, "Trident", { label: "WebKit", pattern: "AppleWebKit" }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"]),
            B = (function (a) {
                return h(a, function (a, g) {
                    return a || (RegExp("\\b" + (g.pattern || c(g)) + "\\b", "i").exec(b) && (g.label || g));
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
            Q = g([
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
            S = (function (a) {
                return h(a, function (a, g, e) {
                    return a || ((g[Q] || g[/^[a-z]+(?: +[a-z]+\b)*/i.exec(Q)] || RegExp("\\b" + c(e) + "(?:\\b|\\w*\\d)", "i").exec(b)) && e);
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
            D = (function (a) {
                return h(a, function (a, g) {
                    var e = g.pattern || c(g);
                    if (!a && (a = RegExp("\\b" + e + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(b))) {
                        var k = a,
                            m = g.label || g,
                            h = {
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
                        e && m && /^Win/i.test(k) && !/^Windows Phone /i.test(k) && (h = h[/[\d.]+$/.exec(k)]) && (k = "Windows " + h);
                        k = String(k);
                        e && m && (k = k.replace(RegExp(e, "i"), m));
                        a = k = d(
                            k
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
                    return a;
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
        I && (I = [I]);
        S && !Q && (Q = g([S]));
        if ((t = /\bGoogle TV\b/.exec(Q))) Q = t[0];
        /\bSimulator\b/i.test(b) && (Q = (Q ? Q + " " : "") + "Simulator");
        "Opera Mini" == B && /\bOPiOS\b/.test(b) && n.push("running in Turbo/Uncompressed mode");
        "IE" == B && /\blike iPhone OS\b/.test(b)
            ? ((t = l(b.replace(/like iPhone OS/, ""))), (S = t.manufacturer), (Q = t.product))
            : /^iP/.test(Q)
            ? (B || (B = "Safari"), (D = "iOS" + ((t = / OS ([\d_]+)/i.exec(b)) ? " " + t[1].replace(/_/g, ".") : "")))
            : "Konqueror" != B || /buntu/i.test(D)
            ? (S && "Google" != S && ((/Chrome/.test(B) && !/\bMobile Safari\b/i.test(b)) || /\bVita\b/.test(Q))) || (/\bAndroid\b/.test(D) && /^Chrome/.test(B) && /\bVersion\//i.test(b))
                ? ((B = "Android Browser"), (D = /\bAndroid\b/.test(D) ? D : "Android"))
                : "Silk" == B
                ? (/\bMobi/i.test(b) || ((D = "Android"), n.unshift("desktop mode")), /Accelerated *= *true/i.test(b) && n.unshift("accelerated"))
                : "PaleMoon" == B && (t = /\bFirefox\/([\d.]+)\b/.exec(b))
                ? n.push("identifying as Firefox " + t[1])
                : "Firefox" == B && (t = /\b(Mobile|Tablet|TV)\b/i.exec(b))
                ? (D || (D = "Firefox OS"), Q || (Q = t[1]))
                : !B || (t = !/\bMinefield\b/i.test(b) && /\b(?:Firefox|Safari)\b/.exec(B))
                ? (B && !Q && /[\/,]|^[^(]+?\)/.test(b.slice(b.indexOf(t + "/") + 8)) && (B = null),
                  (t = Q || S || D) && (Q || S || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(D)) && (B = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(D) ? D : t) + " Browser"))
                : "Electron" == B && (t = (/\bChrome\/([\d.]+)\b/.exec(b) || 0)[1]) && n.push("Chromium " + t)
            : (D = "Kubuntu");
        r || (r = k(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", c(B), "(?:Firefox|Minefield|NetFront)"]));
        if (
            (t =
                ("iCab" == I && 3 < parseFloat(r) && "WebKit") ||
                (/\bOpera\b/.test(B) && (/\bOPR\b/.test(b) ? "Blink" : "Presto")) ||
                (/\b(?:Midori|Nook|Safari)\b/i.test(b) && !/^(?:Trident|EdgeHTML)$/.test(I) && "WebKit") ||
                (!I && /\bMSIE\b/i.test(b) && ("Mac OS" == D ? "Tasman" : "Trident")) ||
                ("WebKit" == I && /\bPlayStation\b(?! Vita\b)/i.test(B) && "NetFront"))
        )
            I = [t];
        "IE" == B && (t = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(b) || 0)[1])
            ? ((B += " Mobile"), (D = "Windows Phone " + (/\+$/.test(t) ? t : t + ".x")), n.unshift("desktop mode"))
            : /\bWPDesktop\b/i.test(b)
            ? ((B = "IE Mobile"), (D = "Windows Phone 8.x"), n.unshift("desktop mode"), r || (r = (/\brv:([\d.]+)/.exec(b) || 0)[1]))
            : "IE" != B && "Trident" == I && (t = /\brv:([\d.]+)/.exec(b)) && (B && n.push("identifying as " + B + (r ? " " + r : "")), (B = "IE"), (r = t[1]));
        if (V) {
            if (e(p, "global"))
                if ((M && ((t = M.lang.System), (U = t.getProperty("os.arch")), (D = D || t.getProperty("os.name") + " " + t.getProperty("os.version"))), R)) {
                    try {
                        (r = p.require("ringo/engine").version.join(".")), (B = "RingoJS");
                    } catch (Y) {
                        (t = p.system) && t.global.system == p.system && ((B = "Narwhal"), D || (D = t[0].os || null));
                    }
                    B || (B = "Rhino");
                } else
                    "object" == typeof p.process &&
                        !p.process.browser &&
                        (t = p.process) &&
                        ("object" == typeof t.versions &&
                            ("string" == typeof t.versions.electron
                                ? (n.push("Node " + t.versions.node), (B = "Electron"), (r = t.versions.electron))
                                : "string" == typeof t.versions.nw && (n.push("Chromium " + r, "Node " + t.versions.node), (B = "NW.js"), (r = t.versions.nw))),
                        B || ((B = "Node.js"), (U = t.arch), (D = t.platform), (r = (r = /[\d.]+/.exec(t.version)) ? r[0] : null)));
            else
                a((t = p.runtime)) == x
                    ? ((B = "Adobe AIR"), (D = t.flash.system.Capabilities.os))
                    : a((t = p.phantom)) == N
                    ? ((B = "PhantomJS"), (r = (t = t.version || null) && t.major + "." + t.minor + "." + t.patch))
                    : "number" == typeof K.documentMode && (t = /\bTrident\/(\d+)/i.exec(b))
                    ? ((r = [r, K.documentMode]), (t = +t[1] + 4) != r[1] && (n.push("IE " + r[1] + " mode"), I && (I[1] = ""), (r[1] = t)), (r = "IE" == B ? String(r[1].toFixed(1)) : r[0]))
                    : "number" == typeof K.documentMode && /^(?:Chrome|Firefox)\b/.test(B) && (n.push("masking as " + B + " " + r), (B = "IE"), (r = "11.0"), (I = ["Trident"]), (D = "Windows"));
            D = D && d(D);
        }
        r &&
            (t = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(r) || /(?:alpha|beta)(?: ?\d)?/i.exec(b + ";" + (V && q.appMinorVersion)) || (/\bMinefield\b/i.test(b) && "a")) &&
            ((G = /b/i.test(t) ? "beta" : "alpha"), (r = r.replace(RegExp(t + "\\+?$"), "") + ("beta" == G ? O : J) + (/\d+\+?/.exec(t) || "")));
        if ("Fennec" == B || ("Firefox" == B && /\b(?:Android|Firefox OS)\b/.test(D))) B = "Firefox Mobile";
        else if ("Maxthon" == B && r) r = r.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(Q)) "Xbox 360" == Q && (D = null), "Xbox 360" == Q && /\bIEMobile\b/.test(b) && n.unshift("mobile mode");
        else if ((!/^(?:Chrome|IE|Opera)$/.test(B) && (!B || Q || /Browser|Mobi/.test(B))) || ("Windows CE" != D && !/Mobi/i.test(b)))
            if ("IE" == B && V)
                try {
                    null === p.external && n.unshift("platform preview");
                } catch (Y) {
                    n.unshift("embedded");
                }
            else
                (/\bBlackBerry\b/.test(Q) || /\bBB10\b/.test(b)) && (t = (RegExp(Q.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(b) || 0)[1] || r)
                    ? ((t = [t, /BB10/.test(b)]), (D = (t[1] ? ((Q = null), (S = "BlackBerry")) : "Device Software") + " " + t[0]), (r = null))
                    : this != f &&
                      "Wii" != Q &&
                      ((V && C) ||
                          (/Opera/.test(B) && /\b(?:MSIE|Firefox)\b/i.test(b)) ||
                          ("Firefox" == B && /\bOS X (?:\d+\.){2,}/.test(D)) ||
                          ("IE" == B && ((D && !/^Win/.test(D) && 5.5 < r) || (/\bWindows XP\b/.test(D) && 8 < r) || (8 == r && !/\bTrident\b/.test(b))))) &&
                      !u.test((t = l.call(f, b.replace(u, "") + ";"))) &&
                      t.name &&
                      ((t = "ing as " + t.name + ((t = t.version) ? " " + t : "")),
                      u.test(B) ? (/\bIE\b/.test(t) && "Mac OS" == D && (D = null), (t = "identify" + t)) : ((t = "mask" + t), (B = T ? d(T.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera"), /\bIE\b/.test(t) && (D = null), V || (r = null)),
                      (I = ["Presto"]),
                      n.push(t));
        else B += " Mobile";
        if ((t = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(b) || 0)[1])) {
            t = [parseFloat(t.replace(/\.(\d)$/, ".0$1")), t];
            if ("Safari" == B && "+" == t[1].slice(-1)) (B = "WebKit Nightly"), (G = "alpha"), (r = t[1].slice(0, -1));
            else if (r == t[1] || r == (t[2] = (/\bSafari\/([\d.]+\+?)/i.exec(b) || 0)[1])) r = null;
            t[1] = (/\bChrome\/([\d.]+)/i.exec(b) || 0)[1];
            537.36 == t[0] && 537.36 == t[2] && 28 <= parseFloat(t[1]) && "WebKit" == I && (I = ["Blink"]);
            V && (v || t[1])
                ? (I && (I[1] = "like Chrome"),
                  (t =
                      t[1] ||
                      ((t = t[0]),
                      530 > t
                          ? 1
                          : 532 > t
                          ? 2
                          : 532.05 > t
                          ? 3
                          : 533 > t
                          ? 4
                          : 534.03 > t
                          ? 5
                          : 534.07 > t
                          ? 6
                          : 534.1 > t
                          ? 7
                          : 534.13 > t
                          ? 8
                          : 534.16 > t
                          ? 9
                          : 534.24 > t
                          ? 10
                          : 534.3 > t
                          ? 11
                          : 535.01 > t
                          ? 12
                          : 535.02 > t
                          ? "13+"
                          : 535.07 > t
                          ? 15
                          : 535.11 > t
                          ? 16
                          : 535.19 > t
                          ? 17
                          : 536.05 > t
                          ? 18
                          : 536.1 > t
                          ? 19
                          : 537.01 > t
                          ? 20
                          : 537.11 > t
                          ? "21+"
                          : 537.13 > t
                          ? 23
                          : 537.18 > t
                          ? 24
                          : 537.24 > t
                          ? 25
                          : 537.36 > t
                          ? 26
                          : "Blink" != I
                          ? "27"
                          : "28")))
                : (I && (I[1] = "like Safari"), (t = ((t = t[0]), 400 > t ? 1 : 500 > t ? 2 : 526 > t ? 3 : 533 > t ? 4 : 534 > t ? "4+" : 535 > t ? 5 : 537 > t ? 6 : 538 > t ? 7 : 601 > t ? 8 : "8")));
            I && (I[1] += " " + (t += "number" == typeof t ? ".x" : /[.+]/.test(t) ? "" : "+"));
            "Safari" == B && (!r || 45 < parseInt(r)) && (r = t);
        }
        "Opera" == B && (t = /\bzbov|zvav$/.exec(D))
            ? ((B += " "), n.unshift("desktop mode"), "zvav" == t ? ((B += "Mini"), (r = null)) : (B += "Mobile"), (D = D.replace(RegExp(" *" + t + "$"), "")))
            : "Safari" == B && /\bChrome\b/.exec(I && I[1]) && (n.unshift("desktop mode"), (B = "Chrome Mobile"), (r = null), /\bOS X\b/.test(D) ? ((S = "Apple"), (D = "iOS 4.3+")) : (D = null));
        r && 0 == r.indexOf((t = /[\d.]+$/.exec(D))) && -1 < b.indexOf("/" + t + "-") && (D = String(D.replace(t, "")).replace(/^ +| +$/g, ""));
        I &&
            !/\b(?:Avant|Nook)\b/.test(B) &&
            (/Browser|Lunascape|Maxthon/.test(B) || ("Safari" != B && /^iOS/.test(D) && /\bSafari\b/.test(I[1])) || (/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(B) && I[1])) &&
            (t = I[I.length - 1]) &&
            n.push(t);
        n.length && (n = ["(" + n.join("; ") + ")"]);
        S && Q && 0 > Q.indexOf(S) && n.push("on " + S);
        Q && n.push((/^on /.test(n[n.length - 1]) ? "" : "on ") + Q);
        if (D) {
            var X = (t = / ([\d.+]+)$/.exec(D)) && "/" == D.charAt(D.length - t[0].length - 1);
            D = {
                architecture: 32,
                family: t && !X ? D.replace(t[0], "") : D,
                version: t ? t[1] : null,
                toString: function () {
                    var a = this.version;
                    return this.family + (a && !X ? " " + a : "") + (64 == this.architecture ? " 64-bit" : "");
                },
            };
        }
        (t = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(U)) && !/\bi686\b/i.test(U)
            ? (D && ((D.architecture = 64), (D.family = D.family.replace(RegExp(" *" + t), ""))), B && (/\bWOW64\b/i.test(b) || (V && /\w(?:86|32)$/.test(q.cpuClass || q.platform) && !/\bWin64; x64\b/i.test(b))) && n.unshift("32-bit"))
            : D && /^OS X/.test(D.family) && "Chrome" == B && 39 <= parseFloat(r) && (D.architecture = 64);
        b || (b = null);
        p = {};
        p.description = b;
        p.layout = I && I[0];
        p.manufacturer = S;
        p.name = B;
        p.prerelease = G;
        p.product = Q;
        p.ua = b;
        p.version = B && r;
        p.os = D || {
            architecture: null,
            family: null,
            version: null,
            toString: function () {
                return "null";
            },
        };
        p.parse = l;
        p.toString = function () {
            return this.description || "";
        };
        p.version && n.unshift(r);
        p.name && n.unshift(B);
        D && B && (D != String(D).split(" ")[0] || (D != B.split(" ")[0] && !Q)) && n.push(Q ? "(" + D + ")" : "on " + D);
        n.length && (p.description = n.join(" "));
        return p;
    }
    var k = { function: !0, object: !0 },
        m = (k[typeof window] && window) || this,
        p = k[typeof exports] && exports;
    k = k[typeof module] && module && !module.nodeType && module;
    var n = p && k && "object" == typeof global && global;
    !n || (n.global !== n && n.window !== n && n.self !== n) || (m = n);
    var q = Math.pow(2, 53) - 1,
        u = /\bOpera/;
    n = Object.prototype;
    var r = n.hasOwnProperty,
        w = n.toString,
        v = l();
    "function" == typeof define && "object" == typeof define.amd && define.amd
        ? ((m.platform = v),
          define(function () {
              return v;
          }))
        : p && k
        ? f(v, function (a, b) {
              p[b] = a;
          })
        : (m.platform = v);
}.call(this));
function buildIOSMeta() {
    for (
        var g = [
                { name: "viewport", content: "width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" },
                { name: "apple-mobile-web-app-capable", content: "yes" },
                { name: "apple-mobile-web-app-status-bar-style", content: "black" },
            ],
            b = 0;
        b < g.length;
        b++
    ) {
        var d = document.createElement("meta");
        d.name = g[b].name;
        d.content = g[b].content;
        var f = window.document.head.querySelector('meta[name="' + d.name + '"]');
        f && f.parentNode.removeChild(f);
        window.document.head.appendChild(d);
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
    console.log(window.devicePixelRatio);
    console.log(window.innerWidth);
    console.log(window.innerHeight);
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
                    case 808:
                        414 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
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
                    case 808:
                        414 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
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
    } catch (g) {
        return !0;
    }
}
$(document).ready(function () {
    platform && "iPhone" === platform.product && "safari" !== platform.name.toLowerCase() && (buildIOSFullscreenPanel(), buildIOSMeta());
});
jQuery(window).resize(function () {
    platform && "iPhone" === platform.product && "safari" !== platform.name.toLowerCase() && iosResize();
});
var s_iOffsetX = 0,
    s_iOffsetY = 0,
    s_fInverseScaling = 0;
(function (g) {
    (jQuery.browser = jQuery.browser || {}).mobile =
        /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(
            g
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(
            g.substr(0, 4)
        );
})(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function () {
    sizeHandler();
});
function trace(g) {
    console.log(g);
}
function isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
}
function isIOS() {
    var g = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";");
    for (-1 !== navigator.userAgent.toLowerCase().indexOf("iphone") && (s_bIsIphone = !0); g.length; ) if (navigator.platform === g.pop()) return !0;
    return (s_bIsIphone = !1);
}
window.addEventListener("orientationchange", onOrientationChange);
function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler();
}
function getSize(g) {
    var b = g.toLowerCase(),
        d = window.document,
        f = d.documentElement;
    if (void 0 === window["inner" + g]) g = f["client" + g];
    else if (window["inner" + g] != f["client" + g]) {
        var a = d.createElement("body");
        a.id = "vpw-test-b";
        a.style.cssText = "overflow:scroll";
        var e = d.createElement("div");
        e.id = "vpw-test-d";
        e.style.cssText = "position:absolute;top:-1000px";
        e.innerHTML = "<style>@media(" + b + ":" + f["client" + g] + "px){body#vpw-test-b div#vpw-test-d{" + b + ":7px!important}}</style>";
        a.appendChild(e);
        f.insertBefore(a, d.head);
        g = 7 == e["offset" + g] ? f["client" + g] : window["inner" + g];
        f.removeChild(a);
    } else g = window["inner" + g];
    return g;
}
function getIOSWindowHeight() {
    return (document.documentElement.clientWidth / window.innerWidth) * window.innerHeight;
}
function getHeightOfIOSToolbars() {
    var g = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < g ? g : 0;
}
function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var g = "safari" === platform.name.toLowerCase() ? getIOSWindowHeight() : getSize("Height");
        var b = getSize("Width");
        b > g ? ((EDGEBOARD_X = 0), (EDGEBOARD_Y = 330), (s_bLandscape = !0)) : ((EDGEBOARD_X = 280), (EDGEBOARD_Y = 0), (s_bLandscape = !1));
        s_iScaleFactor = Math.min(g / CANVAS_HEIGHT, b / CANVAS_WIDTH);
        var d = CANVAS_WIDTH * s_iScaleFactor,
            f = CANVAS_HEIGHT * s_iScaleFactor;
        if (f < g) {
            var a = g - f;
            f += a;
            d += (CANVAS_WIDTH / CANVAS_HEIGHT) * a;
        } else d < b && ((a = b - d), (d += a), (f += (CANVAS_HEIGHT / CANVAS_WIDTH) * a));
        a = g / 2 - f / 2;
        var e = b / 2 - d / 2,
            c = CANVAS_WIDTH / d;
        if (e * c < -EDGEBOARD_X || a * c < -EDGEBOARD_Y)
            (s_iScaleFactor = Math.min(g / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), b / (CANVAS_WIDTH - 2 * EDGEBOARD_X))),
                (d = CANVAS_WIDTH * s_iScaleFactor),
                (f = CANVAS_HEIGHT * s_iScaleFactor),
                (a = (g - f) / 2),
                (e = (b - d) / 2),
                (c = CANVAS_WIDTH / d);
        s_fInverseScaling = c;
        s_iOffsetX = -1 * e * c;
        s_iOffsetY = -1 * a * c;
        0 <= a && (s_iOffsetY = 0);
        0 <= e && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        s_bMobile || isChrome()
            ? ($("#canvas").css("width", d + "px"), $("#canvas").css("height", f + "px"))
            : ((s_oStage.canvas.width = d), (s_oStage.canvas.height = f), (s_iScaleFactor = Math.min(d / CANVAS_WIDTH, f / CANVAS_HEIGHT)), (s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor));
        s_iCanvasOffsetHeight = a;
        0 > a || (a = (g - f) / 2);
        $("#canvas").css("top", a + "px");
        $("#canvas").css("left", e + "px");
        resizeCanvas3D();
        s_iCanvasResizeWidth = d;
        s_iCanvasResizeHeight = f;
        s_iCanvasOffsetWidth = e;
        fullscreenHandler();
    }
}
function resizeCanvas3D() {
    $("canvas").each(function () {
        "#canvas" != $(this).attr("id") &&
            (s_bMobile || isChrome() ? ($(this).css("width", $("#canvas").css("width")), $(this).css("height", $("#canvas").css("height"))) : ($(this).css("width", s_oStage.canvas.width), $(this).css("height", s_oStage.canvas.height)),
            $(this).css("position", $("#canvas").css("position")),
            $(this).css("left", $("#canvas").css("left")),
            $(this).css("top", $("#canvas").css("top")));
    });
}
function createBitmap(g, b, d) {
    var f = new createjs.Bitmap(g),
        a = new createjs.Shape();
    b && d ? a.graphics.beginFill("#fff").drawRect(-b / 2, -d / 2, b, d) : a.graphics.beginFill("#ff0").drawRect(0, 0, g.width, g.height);
    f.hitArea = a;
    return f;
}
function createSprite(g, b, d, f, a, e) {
    g = null !== b ? new createjs.Sprite(g, b) : new createjs.Sprite(g);
    b = new createjs.Shape();
    b.graphics.beginFill("#000000").drawRect(-d, -f, a, e);
    g.hitArea = b;
    return g;
}
function randomFloatBetween(g, b, d) {
    "undefined" === typeof d && (d = 2);
    return parseFloat(Math.min(g + Math.random() * (b - g), b).toFixed(d));
}
function shuffle(g) {
    for (var b = g.length, d, f; 0 !== b; ) (f = Math.floor(Math.random() * b)), --b, (d = g[b]), (g[b] = g[f]), (g[f] = d);
    return g;
}
function formatTime(g) {
    g /= 1e3;
    var b = Math.floor(g / 60);
    g = parseFloat(g - 60 * b).toFixed(1);
    var d = "";
    d = 10 > b ? d + ("0" + b + ":") : d + (b + ":");
    return 10 > g ? d + ("0" + g) : d + g;
}
function degreesToRadians(g) {
    return (g * Math.PI) / 180;
}
function checkRectCollision(g, b) {
    var d = getBounds(g, 0.9);
    var f = getBounds(b, 0.98);
    return calculateIntersection(d, f);
}
function calculateIntersection(g, b) {
    var d, f, a, e;
    var c = g.x + (d = g.width / 2);
    var h = g.y + (f = g.height / 2);
    var l = b.x + (a = b.width / 2);
    var k = b.y + (e = b.height / 2);
    c = Math.abs(c - l) - (d + a);
    h = Math.abs(h - k) - (f + e);
    return 0 > c && 0 > h ? ((c = Math.min(Math.min(g.width, b.width), -c)), (h = Math.min(Math.min(g.height, b.height), -h)), { x: Math.max(g.x, b.x), y: Math.max(g.y, b.y), width: c, height: h, rect1: g, rect2: b }) : null;
}
function getBounds(g, b) {
    var d = { x: Infinity, y: Infinity, width: 0, height: 0 };
    if (g instanceof createjs.Container) {
        d.x2 = -Infinity;
        d.y2 = -Infinity;
        var f = g.children,
            a = f.length,
            e;
        for (e = 0; e < a; e++) {
            var c = getBounds(f[e], 1);
            c.x < d.x && (d.x = c.x);
            c.y < d.y && (d.y = c.y);
            c.x + c.width > d.x2 && (d.x2 = c.x + c.width);
            c.y + c.height > d.y2 && (d.y2 = c.y + c.height);
        }
        Infinity == d.x && (d.x = 0);
        Infinity == d.y && (d.y = 0);
        Infinity == d.x2 && (d.x2 = 0);
        Infinity == d.y2 && (d.y2 = 0);
        d.width = d.x2 - d.x;
        d.height = d.y2 - d.y;
        delete d.x2;
        delete d.y2;
    } else {
        if (g instanceof createjs.Bitmap) {
            a = g.sourceRect || g.image;
            e = a.width * b;
            var h = a.height * b;
        } else if (g instanceof createjs.Sprite)
            if (g.spriteSheet._frames && g.spriteSheet._frames[g.currentFrame] && g.spriteSheet._frames[g.currentFrame].image) {
                a = g.spriteSheet.getFrame(g.currentFrame);
                e = a.rect.width;
                h = a.rect.height;
                f = a.regX;
                var l = a.regY;
            } else (d.x = g.x || 0), (d.y = g.y || 0);
        else (d.x = g.x || 0), (d.y = g.y || 0);
        f = f || 0;
        e = e || 0;
        l = l || 0;
        h = h || 0;
        d.regX = f;
        d.regY = l;
        a = g.localToGlobal(0 - f, 0 - l);
        c = g.localToGlobal(e - f, h - l);
        e = g.localToGlobal(e - f, 0 - l);
        f = g.localToGlobal(0 - f, h - l);
        d.x = Math.min(Math.min(Math.min(a.x, c.x), e.x), f.x);
        d.y = Math.min(Math.min(Math.min(a.y, c.y), e.y), f.y);
        d.width = Math.max(Math.max(Math.max(a.x, c.x), e.x), f.x) - d.x;
        d.height = Math.max(Math.max(Math.max(a.y, c.y), e.y), f.y) - d.y;
    }
    return d;
}
function NoClickDelay(g) {
    this.element = g;
    window.Touch && this.element.addEventListener("touchstart", this, !1);
}
NoClickDelay.prototype = {
    handleEvent: function (g) {
        switch (g.type) {
            case "touchstart":
                this.onTouchStart(g);
                break;
            case "touchmove":
                this.onTouchMove(g);
                break;
            case "touchend":
                this.onTouchEnd(g);
        }
    },
    onTouchStart: function (g) {
        g.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1);
    },
    onTouchMove: function (g) {
        this.moved = !0;
    },
    onTouchEnd: function (g) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend", this, !1);
        if (!this.moved) {
            g = document.elementFromPoint(g.changedTouches[0].clientX, g.changedTouches[0].clientY);
            3 == g.nodeType && (g = g.parentNode);
            var b = document.createEvent("MouseEvents");
            b.initEvent("click", !0, !0);
            g.dispatchEvent(b);
        }
    },
};
(function () {
    function g(g) {
        var d = { focus: "visible", focusin: "visible", pageshow: "visible", blur: "hidden", focusout: "hidden", pagehide: "hidden" };
        g = g || window.event;
        g.type in d ? (document.body.className = d[g.type]) : ((document.body.className = this[b] ? "hidden" : "visible"), "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate());
    }
    var b = "hidden";
    b in document
        ? document.addEventListener("visibilitychange", g)
        : (b = "mozHidden") in document
        ? document.addEventListener("mozvisibilitychange", g)
        : (b = "webkitHidden") in document
        ? document.addEventListener("webkitvisibilitychange", g)
        : (b = "msHidden") in document
        ? document.addEventListener("msvisibilitychange", g)
        : "onfocusin" in document
        ? (document.onfocusin = document.onfocusout = g)
        : (window.onpageshow = window.onpagehide = window.onfocus = window.onblur = g);
})();
function playSound(g, b, d) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[g].play(), s_aSounds[g].volume(b), s_aSounds[g].loop(d), s_aSounds[g]) : null;
}
function stopSound(g) {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[g].stop();
}
function setVolume(g, b) {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[g].volume(b);
}
function setMute(g, b) {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[g].mute(b);
}
function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate();
}
function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate();
}
function getParamValue(g) {
    for (var b = window.location.search.substring(1).split("&"), d = 0; d < b.length; d++) {
        var f = b[d].split("=");
        if (f[0] == g) return f[1];
    }
}
function rotateVector2D(g, b) {
    return { x: b.x * Math.cos(g) + b.y * Math.sin(g), y: b.x * -Math.sin(g) + b.y * Math.cos(g) };
}
function normalize(g, b) {
    0 < b && ((g.x /= b), (g.y /= b));
    return g;
}
function length(g) {
    return Math.sqrt(g.x * g.x + g.y * g.y);
}
function findNearestIntersectingObject(g, b, d, f) {
    var a = CANVAS_RESIZE_WIDTH + 2 * OFFSET_WIDTH,
        e = CANVAS_RESIZE_HEIGHT + 2 * OFFSET_HEIGHT,
        c = new THREE.Raycaster(),
        h = new THREE.Vector3();
    h.x = (g / a) * 2 - 1;
    h.y = 2 * -(b / e) + 1;
    h.z = 0.5;
    c.setFromCamera(h, d);
    g = c.intersectObjects(f, !0);
    b = !1;
    0 < g.length && (b = g[0]);
    return b;
}
function distance(g, b, d, f) {
    g -= d;
    b -= f;
    return Math.sqrt(g * g + b * b);
}
function distance2(g, b, d, f) {
    g -= d;
    b -= f;
    return g * g + b * b;
}
function createOrthoGraphicCamera() {
    var g = new THREE.PerspectiveCamera(FOV, CANVAS_WIDTH / CANVAS_HEIGHT, NEAR, FAR);
    g.rotation.x = (Math.PI / 180) * 88.4;
    g.rotation.y = (Math.PI / 180) * 0.03;
    g.position.set(CAMERA_POSITION.x, CAMERA_POSITION.y, CAMERA_POSITION.z);
    g.updateProjectionMatrix();
    g.updateMatrixWorld();
    return g;
}
function rotateVector2D(g, b) {
    return { x: b.x * Math.cos(g) + b.y * Math.sin(g), y: b.x * -Math.sin(g) + b.y * Math.cos(g), z: 0 };
}
Math.radians = function (g) {
    return (g * Math.PI) / 180;
};
Math.degrees = function (g) {
    return (180 * g) / Math.PI;
};
function distanceV3(g, b, d, f, a, e) {
    g -= f;
    b -= a;
    d -= e;
    return Math.sqrt(g * g + b * b + d * d);
}
function distanceV2(g, b) {
    var d = g.x - b.x,
        f = g.y - b.y;
    return Math.sqrt(d * d + f * f);
}
function saveItem(g, b) {
    localStorage.setItem(g, b);
}
function getItem(g) {
    return localStorage.getItem(g);
}
function clearAllItem() {
    localStorage.clear();
}
function fullscreenHandler() {
    ENABLE_FULLSCREEN && !1 !== screenfull.enabled && ((s_bFullscreen = screenfull.isFullscreen), null !== s_oInterface && s_oInterface.resetFullscreenBut(), null !== s_oMenu && s_oMenu.resetFullscreenBut());
}
if (screenfull.enabled)
    screenfull.on("change", function () {
        s_bFullscreen = screenfull.isFullscreen;
        null !== s_oInterface && s_oInterface.resetFullscreenBut();
        null !== s_oMenu && s_oMenu.resetFullscreenBut();
    });
function CSpriteLibrary() {
    var g = {},
        b,
        d,
        f,
        a,
        e,
        c;
    this.init = function (g, l, k) {
        b = {};
        f = d = 0;
        a = g;
        e = l;
        c = k;
    };
    this.addSprite = function (a, c) {
        if (g.hasOwnProperty(a)) return !1;
        var e = new Image();
        g[a] = b[a] = { szPath: c, oSprite: e, bLoaded: !1 };
        d++;
        return !0;
    };
    this.getSprite = function (a) {
        return g.hasOwnProperty(a) ? g[a].oSprite : null;
    };
    this._onSpritesLoaded = function () {
        d = 0;
        e.call(c);
    };
    this._onSpriteLoaded = function () {
        a.call(c);
        ++f === d && this._onSpritesLoaded();
    };
    this.loadSprites = function () {
        for (var a in b)
            (b[a].oSprite.oSpriteLibrary = this),
                (b[a].oSprite.szKey = a),
                (b[a].oSprite.onload = function () {
                    this.oSpriteLibrary.setLoaded(this.szKey);
                    this.oSpriteLibrary._onSpriteLoaded(this.szKey);
                }),
                (b[a].oSprite.onerror = function (a) {
                    var c = a.currentTarget;
                    setTimeout(function () {
                        b[c.szKey].oSprite.src = b[c.szKey].szPath;
                    }, 500);
                }),
                (b[a].oSprite.src = b[a].szPath);
    };
    this.setLoaded = function (a) {
        g[a].bLoaded = !0;
    };
    this.isLoaded = function (a) {
        return g[a].bLoaded;
    };
    this.getNumSprites = function () {
        return d;
    };
}
var CANVAS_WIDTH = 1360,
    CANVAS_HEIGHT = 1360,
    CANVAS_WIDTH_HALF = 0.5 * CANVAS_WIDTH,
    CANVAS_HEIGHT_HALF = 0.5 * CANVAS_HEIGHT,
    EDGEBOARD_X = 0,
    EDGEBOARD_Y = 0,
    DISABLE_SOUND_MOBILE = !1,
    FONT_GAME = "blackplotanregular",
    SECONDARY_FONT = "blackplotanregular",
    FPS = 30,
    FPS_DESKTOP = 60,
    FPS_TIME = 1 / FPS,
    ROLL_BALL_RATE = 60 / FPS,
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_HELP = 1,
    STATE_GAME = 3,
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    ON_DRAG_START = 4,
    ON_DRAG_END = 5,
    ON_TWEEN_ENDED = 6,
    ON_BUT_NO_DOWN = 7,
    ON_BUT_YES_DOWN = 8,
    STEP_RATE = 1.5,
    LOCAL_BEST_SCORE = 0,
    START_HAND_SWIPE_POS = { x: CANVAS_WIDTH_HALF, y: CANVAS_HEIGHT_HALF + 200 },
    END_HAND_SWIPE_POS = [
        { x: CANVAS_WIDTH_HALF - 250, y: CANVAS_HEIGHT_HALF - 200 },
        { x: CANVAS_WIDTH_HALF, y: CANVAS_HEIGHT_HALF - 200 },
        { x: CANVAS_WIDTH_HALF + 250, y: CANVAS_HEIGHT_HALF - 200 },
    ],
    MS_TIME_SWIPE_END = 1e3,
    MS_TIME_SWIPE_START = 3e3,
    MS_TIME_FADE_HELP_TEXT = 500,
    LOCALSTORAGE_STRING = ["crossbar_challenge_best_score"],
    TEXT_EXCELLENT_COLOR = ["#fff", "#116ee0"],
    TEXT_COLOR = "#fff",
    TEXT_COLOR_1 = "#ff2222",
    TEXT_COLOR_STROKE = "#116ee0",
    OUTLINE_WIDTH = 1.5,
    PHYSICS_ACCURACY = 3,
    PHYSICS_STEP = 1 / (FPS * STEP_RATE),
    MS_WAIT_SHOW_GAME_OVER_PANEL = 250,
    STATE_INIT = 0,
    STATE_PLAY = 1,
    STATE_FINISH = 2,
    STATE_PAUSE = 3,
    IDLE = 0,
    RIGHT = 1,
    LEFT = 2,
    CENTER_DOWN = 3,
    CENTER_UP = 4,
    LEFT_DOWN = 5,
    RIGHT_DOWN = 6,
    NUM_SPRITE_PLAYER = 31,
    BALL_MASS = 0.5,
    BALL_RADIUS = 0.6,
    BALL_LINEAR_DAMPING = 0.2,
    MIN_BALL_VEL_ROTATION = 0.1,
    TIME_RESET_AFTER_GOAL = 1e3,
    SHOOT_FRAME = 7,
    TIME_POLE_COLLISION_RESET = 1e3,
    BACK_WALL_GOAL_SIZE = { width: 20.5, depth: 1, height: 7.5 },
    LEFT_RIGHT_WALL_GOAL_SIZE = { width: 0.1, depth: 25, height: 7.5 },
    UP_WALL_GOAL_SIZE = { width: 20.5, depth: 25, height: 0.1 },
    BACK_WALL_GOAL_POSITION = { x: 0, y: 155, z: -2.7 },
    GOAL_LINE_POS = { x: 0, y: BACK_WALL_GOAL_POSITION.y - UP_WALL_GOAL_SIZE.depth + 2, z: BACK_WALL_GOAL_POSITION.z },
    POSITION_BALL = { x: 0.05, y: 15.4, z: -9 + BALL_RADIUS },
    GOAL_SPRITE_SWAP_Y = GOAL_LINE_POS.y,
    GOAL_SPRITE_SWAP_Z = BACK_WALL_GOAL_POSITION.z + LEFT_RIGHT_WALL_GOAL_SIZE.height,
    BALL_OUT_Y = BACK_WALL_GOAL_POSITION.y + 3,
    BUFFER_ANIM_PLAYER = FPS,
    MS_EFFECT_ADD = 1500,
    MS_ROLLING_SCORE = 500,
    TIME_RESET_AFTER_BALL_OUT = 250,
    POLE_UP_SIZE = { radius_top: 0.5, radius_bottom: 0.5, height: 40.5, segments: 10 },
    POLE_RIGHT_LEFT_SIZE = { radius_top: 0.5, radius_bottom: 0.5, height: 15, segments: 10 },
    COLOR_AREA_GOAL = [16711680, 65280, 255, 16776960, 16711935, 65535, 15790320, 986895, 16759705, 16777215, 5675280, 10083618, 1056896, 8392736, 9017449],
    HIT_BALL_MAX_FORCE = 140,
    HIT_BALL_MIN_FORCE = 5,
    FORCE_RATE = 0.0014,
    FORCE_MULTIPLIER_AXIS = { x: 0.12, y: 0.4, z: 0.08 },
    FORCE_MAX = 0.5,
    MAX_FORCE_Y = 66,
    MIN_FORCE_Y = 50,
    SHOW_3D_RENDER = !1,
    CAMERA_TEST_TRACKBALL = !1,
    CAMERA_TEST_TRANSFORM = !1,
    CANVAS_3D_OPACITY = 0.5,
    CAMERA_TEST_LOOK_AT = { x: 0, y: -500, z: -100 },
    BALL_SCALE_FACTOR = 0.035,
    SHADOWN_FACTOR = 1.1,
    INTENSITY_DISPLAY_SHOCK = [
        { x: 10, y: 7.5, time: 50 },
        { x: 20, y: 9, time: 50 },
        { x: 30, y: 12, time: 50 },
        { x: 33, y: 15, time: 50 },
    ],
    FORCE_BALL_DISPLAY_SHOCK = [
        { max: 55, min: MIN_FORCE_Y - 1 },
        { max: 58, min: 55 },
        { max: 62, min: 58 },
        { max: MAX_FORCE_Y, min: 62 },
    ],
    CAMERA_POSITION = { x: 0, y: 0, z: -7 },
    FOV = 31.5,
    NEAR = 1,
    FAR = 2e3,
    ENABLE_FULLSCREEN,
    TIME_SWIPE,
    SOUNDTRACK_VOLUME_IN_GAME = 0.3,
    OFFSET_Y = 360,
    CROSSBAR_SCORE = [200, 400, 1e3, 800, 500],
    TEXT_GAMEOVER = "GAME OVER",
    TEXT_OF = "/",
    TEXT_SCORE = "SCORE",
    TEXT_BEST_SCORE = "BEST SCORE",
    TEXT_BEST = "BEST",
    TEXT_MULTIPLIER = "x",
    TEXT_ARE_SURE = "ARE YOU SURE?",
    TEXT_BALL_OUT = "CROSSBAR MISS!",
    TEXT_CONGRATULATION = ["GOOD!", "GREAT!", "EXCELLENT!!!", "EXCELLENT!!!", "EXCELLENT!!!"],
    TEXT_PAUSE = "PAUSE",
    TEXT_SAVED = "SAVED",
    TEXT_HELP_0 = "HIT THE CROSSBAR WITH THE BALL TO SCORE THE MOST POINTS",
    TEXT_HELP = "SWIPE TO KICK THE BALL",
    TEXT_DEVELOPED = "DEVELOPED BY",
    TEXT_PRELOADER_CONTINUE = "START",
    TEXT_SHARE_IMAGE = "200x200.jpg",
    TEXT_SHARE_TITLE = "Congratulations!",
    TEXT_SHARE_MSG1 = "You collected <strong>",
    TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!",
    TEXT_SHARE_SHARE1 = "My score is ",
    TEXT_SHARE_SHARE2 = " points! Can you do better?";
function CPreloader() {
    var g, b, d, f, a, e, c, h, l, k;
    this._init = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
        s_oSpriteLibrary.addSprite("but_start", "./sprites/but_start.png");
        s_oSpriteLibrary.loadSprites();
        k = new createjs.Container();
        s_oStage.addChild(k);
    };
    this.unload = function () {
        k.removeAllChildren();
        l.unload();
    };
    this._onImagesLoaded = function () {};
    this._onAllImagesLoaded = function () {
        this.attachSprites();
        s_oMain.preloaderReady();
    };
    this.attachSprites = function () {
        var m = new createjs.Shape();
        m.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        k.addChild(m);
        m = s_oSpriteLibrary.getSprite("200x200");
        c = createBitmap(m);
        c.regX = 0.5 * m.width;
        c.regY = 0.5 * m.height;
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2 - 180;
        k.addChild(c);
        h = new createjs.Shape();
        h.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(c.x - 100, c.y - 100, 200, 200, 10);
        k.addChild(h);
        c.mask = h;
        m = s_oSpriteLibrary.getSprite("progress_bar");
        f = createBitmap(m);
        f.x = CANVAS_WIDTH / 2 - m.width / 2;
        f.y = CANVAS_HEIGHT / 2 + 50;
        k.addChild(f);
        g = m.width;
        b = m.height;
        a = new createjs.Shape();
        a.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(f.x, f.y, 1, b);
        k.addChild(a);
        f.mask = a;
        d = new createjs.Text("", "40px " + FONT_GAME, "#fff");
        d.x = CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT / 2 + 110;
        d.textBaseline = "alphabetic";
        d.textAlign = "center";
        k.addChild(d);
        m = s_oSpriteLibrary.getSprite("but_start");
        l = new CTextButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10, m, TEXT_PRELOADER_CONTINUE, "Arial", "#000", "bold 50", k);
        l.addEventListener(ON_MOUSE_UP, this._onButStartRelease, this);
        l.setVisible(!1);
        e = new createjs.Shape();
        e.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        k.addChild(e);
        createjs.Tween.get(e)
            .to({ alpha: 0 }, 500)
            .call(function () {
                createjs.Tween.removeTweens(e);
                k.removeChild(e);
            });
    };
    this._onButStartRelease = function () {
        s_oMain._onRemovePreloader();
    };
    this.refreshLoader = function (c) {
        d.text = c + "%";
        100 === c && (s_oMain._onRemovePreloader(), (d.visible = !1), (f.visible = !1));
        a.graphics.clear();
        c = Math.floor((c * g) / 100);
        a.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(f.x, f.y, c, b);
    };
    this._init();
}
function CMain(g) {
    var b,
        d = 0,
        f = 0,
        a = STATE_LOADING,
        e,
        c;
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
            }),
            (FPS = FPS_DESKTOP),
            (FPS_TIME = 1 / FPS),
            (PHYSICS_STEP = 1 / (FPS * STEP_RATE)),
            (ROLL_BALL_RATE = 60 / FPS));
        s_iPrevTime = new Date().getTime();
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = FPS;
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary();
        seekAndDestroy() ? (e = new CPreloader()) : (window.location.href = "https://www.moneygames.app");
        b = !0;
    };
    this.soundLoaded = function () {
        d++;
        e.refreshLoader(Math.floor((d / f) * 100));
    };
    this._initSounds = function () {
        Howler.mute(!s_bAudioActive);
        s_aSoundsInfo = [];
        s_aSoundsInfo.push({ path: "./sounds/", filename: "drop_bounce_grass", loop: !1, volume: 1, ingamename: "drop_bounce_grass" });
        s_aSoundsInfo.push({ path: "./sounds/", filename: "click", loop: !1, volume: 1, ingamename: "click" });
        s_aSoundsInfo.push({ path: "./sounds/", filename: "goal", loop: !1, volume: 1, ingamename: "goal" });
        s_aSoundsInfo.push({ path: "./sounds/", filename: "ball_saved", loop: !1, volume: 1, ingamename: "ball_saved" });
        s_aSoundsInfo.push({ path: "./sounds/", filename: "kick", loop: !1, volume: 1, ingamename: "kick" });
        s_aSoundsInfo.push({ path: "./sounds/", filename: "pole", loop: !1, volume: 1, ingamename: "pole" });
        s_aSoundsInfo.push({ path: "./sounds/", filename: "soundtrack", loop: !0, volume: 1, ingamename: "soundtrack" });
        f += s_aSoundsInfo.length;
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
                                    "soundtrack" === s_aSoundsInfo[b].ingamename && null !== s_oGame && setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME);
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
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("ball", "./sprites/ball.png");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("but_continue", "./sprites/but_continue.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_no", "./sprites/but_no.png");
        s_oSpriteLibrary.addSprite("but_info", "./sprites/but_info.png");
        s_oSpriteLibrary.addSprite("but_pause", "./sprites/but_pause.png");
        s_oSpriteLibrary.addSprite("ball_shadow", "./sprites/ball_shadow.png");
        s_oSpriteLibrary.addSprite("start_ball", "./sprites/start_ball.png");
        s_oSpriteLibrary.addSprite("hand_touch", "./sprites/hand_touch.png");
        s_oSpriteLibrary.addSprite("cursor", "./sprites/cursor.png");
        s_oSpriteLibrary.addSprite("shot_left", "./sprites/shot_left.png");
        s_oSpriteLibrary.addSprite("goal", "./sprites/goal.png");
        s_oSpriteLibrary.addSprite("horizontal_angle", "./sprites/horizontal_angle.png");
        s_oSpriteLibrary.addSprite("horizontal_angle_right", "./sprites/horizontal_angle_right.png");
        s_oSpriteLibrary.addSprite("horizontal_orange", "./sprites/horizontal_orange.png");
        s_oSpriteLibrary.addSprite("horizontal_yellow", "./sprites/horizontal_yellow.png");
        s_oSpriteLibrary.addSprite("target_arrow", "./sprites/target_arrow.png");
        s_oSpriteLibrary.addSprite("ctl_logo", "./sprites/ctl_logo.png");
        for (var a = 0; a < NUM_SPRITE_PLAYER; a++) s_oSpriteLibrary.addSprite("player_" + a, "./sprites/player/player_" + a + ".png");
        f += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    this._onImagesLoaded = function () {
        d++;
        e.refreshLoader(Math.floor((d / f) * 100));
    };
    this._onAllImagesLoaded = function () {};
    this.preloaderReady = function () {
        this._loadImages();
        (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || this._initSounds();
        b = !0;
    };
    this._onRemovePreloader = function () {
        e.unload();
        s_oSoundTrack = playSound("soundtrack", 1, !0);
        this.gotoMenu();
    };
    this.gotoMenu = function () {
        new CMenu();
        a = STATE_MENU;
    };
    this.gotoGame = function () {
        c = new CGame(h);
        a = STATE_GAME;
    };
    this.gotoHelp = function () {
        new CHelp();
        a = STATE_HELP;
    };
    this.stopUpdate = function () {
        b = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || Howler.mute(!0);
    };
    this.startUpdate = function () {
        s_iPrevTime = new Date().getTime();
        b = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) && s_bAudioActive && Howler.mute(!1);
    };
    this._update = function (g) {
        if (!1 !== b) {
            var e = new Date().getTime();
            s_iTimeElaps = e - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = e;
            1e3 <= s_iCntTime && ((s_iCurFps = s_iCntFps), (s_iCntTime -= 1e3), (s_iCntFps = 0));
            a === STATE_GAME && c.update();
            s_oStage.update(g);
        }
    };
    s_oMain = this;
    var h = g;
    s_bAudioActive = g.audio_enable_on_startup;
    ENABLE_FULLSCREEN = g.fullscreen;
    this.initContainer();
}
var s_bMobile,
    s_bAudioActive = !0,
    s_bFullscreen = !1,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_oPhysicsController,
    s_iCanvasResizeHeight,
    s_iCanvasResizeWidth,
    s_iCanvasOffsetHeight,
    s_iCanvasOffsetWidth,
    s_iBestScore = 0,
    s_oDrawLayer,
    s_oStage,
    s_oMain,
    s_oSpriteLibrary,
    s_oSoundTrack = null,
    s_aSounds,
    s_aSoundsInfo;
function CTextButton(g, b, d, f, a, e, c, h) {
    var l, k, m, p, n, q, u, r, w, v, x, y;
    this._init = function (a, b, c, g, e, d, h, f) {
        l = !1;
        p = [];
        n = [];
        y = createBitmap(c);
        k = c.width;
        m = c.height;
        var q = Math.ceil(h / 20);
        v = new createjs.Text(g, h + "px " + e, "#000000");
        var r = v.getBounds();
        v.textAlign = "center";
        v.lineWidth = 0.9 * k;
        v.textBaseline = "alphabetic";
        v.x = c.width / 2 + q;
        v.y = Math.floor(c.height / 2) + r.height / 3 + q;
        x = new createjs.Text(g, h + "px " + e, d);
        x.textAlign = "center";
        x.textBaseline = "alphabetic";
        x.lineWidth = 0.9 * k;
        x.x = c.width / 2;
        x.y = Math.floor(c.height / 2) + r.height / 3;
        w = new createjs.Container();
        w.x = a;
        w.y = b;
        w.regX = c.width / 2;
        w.regY = c.height / 2;
        s_bMobile || (w.cursor = "pointer");
        w.addChild(y, v, x);
        !1 !== f && s_oStage.addChild(w);
        this._initListener();
    };
    this.unload = function () {
        w.off("mousedown", q);
        w.off("pressup", u);
        s_oStage.removeChild(w);
    };
    this.setVisible = function (a) {
        w.visible = a;
    };
    this.setAlign = function (a) {
        x.textAlign = a;
        v.textAlign = a;
    };
    this.enable = function () {
        l = !1;
        y.filters = [];
        y.cache(0, 0, k, m);
    };
    this.disable = function () {
        l = !0;
        var a = new createjs.ColorMatrix().adjustSaturation(-100).adjustBrightness(40);
        y.filters = [new createjs.ColorMatrixFilter(a)];
        y.cache(0, 0, k, m);
    };
    this._initListener = function () {
        q = w.on("mousedown", this.buttonDown);
        u = w.on("pressup", this.buttonRelease);
    };
    this.addEventListener = function (a, b, c) {
        p[a] = b;
        n[a] = c;
    };
    this.addEventListenerWithParams = function (a, b, c, g) {
        p[a] = b;
        n[a] = c;
        r = g;
    };
    this.buttonRelease = function () {
        l || (playSound("click", 1, !1), (w.scaleX = 1), (w.scaleY = 1), p[ON_MOUSE_UP] && p[ON_MOUSE_UP].call(n[ON_MOUSE_UP], r));
    };
    this.buttonDown = function () {
        l || ((w.scaleX = 0.9), (w.scaleY = 0.9), p[ON_MOUSE_DOWN] && p[ON_MOUSE_DOWN].call(n[ON_MOUSE_DOWN]));
    };
    this.setPosition = function (a, b) {
        w.x = a;
        w.y = b;
    };
    this.changeText = function (a) {
        x.text = a;
        v.text = a;
    };
    this.setX = function (a) {
        w.x = a;
    };
    this.setY = function (a) {
        w.y = a;
    };
    this.getButtonImage = function () {
        return w;
    };
    this.getX = function () {
        return w.x;
    };
    this.getY = function () {
        return w.y;
    };
    this.getSprite = function () {
        return w;
    };
    this._init(g, b, d, f, a, e, c, h);
    return this;
}
function CToggle(g, b, d, f, a) {
    var e, c, h, l, k, m, p;
    this._init = function (a, b, g, d, k) {
        p = void 0 !== k ? k : s_oStage;
        c = [];
        h = [];
        k = new createjs.SpriteSheet({ images: [g], frames: { width: g.width / 2, height: g.height, regX: g.width / 2 / 2, regY: g.height / 2 }, animations: { state_true: [0], state_false: [1] } });
        e = d;
        m = createSprite(k, "state_" + e, g.width / 2 / 2, g.height / 2, g.width / 2, g.height);
        m.x = a;
        m.y = b;
        m.stop();
        s_bMobile || (m.cursor = "pointer");
        p.addChild(m);
        this._initListener();
    };
    this.unload = function () {
        m.off("mousedown", l);
        m.off("pressup", k);
        p.removeChild(m);
    };
    this._initListener = function () {
        l = m.on("mousedown", this.buttonDown);
        k = m.on("pressup", this.buttonRelease);
    };
    this.addEventListener = function (a, b, g) {
        c[a] = b;
        h[a] = g;
    };
    this.setCursorType = function (a) {
        m.cursor = a;
    };
    this.setActive = function (a) {
        e = a;
        m.gotoAndStop("state_" + e);
    };
    this.buttonRelease = function () {
        m.scaleX = 1;
        m.scaleY = 1;
        playSound("click", 1, !1);
        e = !e;
        m.gotoAndStop("state_" + e);
        c[ON_MOUSE_UP] && c[ON_MOUSE_UP].call(h[ON_MOUSE_UP], e);
    };
    this.buttonDown = function () {
        m.scaleX = 0.9;
        m.scaleY = 0.9;
        c[ON_MOUSE_DOWN] && c[ON_MOUSE_DOWN].call(h[ON_MOUSE_DOWN]);
    };
    this.setPosition = function (a, b) {
        m.x = a;
        m.y = b;
    };
    this._init(g, b, d, f, a);
}
function CGfxButton(g, b, d, f) {
    var a,
        e,
        c,
        h,
        l,
        k,
        m,
        p,
        n = !1;
    this._init = function (b, g, d) {
        a = [];
        e = [];
        h = [];
        c = createBitmap(d);
        c.x = b;
        c.y = g;
        k = l = 1;
        c.regX = d.width / 2;
        c.regY = d.height / 2;
        s_bMobile || (c.cursor = "pointer");
        q.addChild(c);
        this._initListener();
    };
    this.unload = function () {
        c.off("mousedown", m);
        c.off("pressup", p);
        q.removeChild(c);
    };
    this.setVisible = function (a) {
        c.visible = a;
    };
    this.setCursorType = function (a) {
        c.cursor = a;
    };
    this._initListener = function () {
        m = c.on("mousedown", this.buttonDown);
        p = c.on("pressup", this.buttonRelease);
    };
    this.addEventListener = function (b, c, g) {
        a[b] = c;
        e[b] = g;
    };
    this.addEventListenerWithParams = function (b, c, g, d) {
        a[b] = c;
        e[b] = g;
        h[b] = d;
    };
    this.buttonRelease = function () {
        n || ((c.scaleX = 0 < l ? 1 : -1), (c.scaleY = 1), playSound("click", 1, !1), a[ON_MOUSE_UP] && a[ON_MOUSE_UP].call(e[ON_MOUSE_UP], h[ON_MOUSE_UP]));
    };
    this.buttonDown = function () {
        n || ((c.scaleX = 0 < l ? 0.9 : -0.9), (c.scaleY = 0.9), a[ON_MOUSE_DOWN] && a[ON_MOUSE_DOWN].call(e[ON_MOUSE_DOWN], h[ON_MOUSE_DOWN]));
    };
    this.rotation = function (a) {
        c.rotation = a;
    };
    this.getButton = function () {
        return c;
    };
    this.setPosition = function (a, b) {
        c.x = a;
        c.y = b;
    };
    this.setX = function (a) {
        c.x = a;
    };
    this.setY = function (a) {
        c.y = a;
    };
    this.getButtonImage = function () {
        return c;
    };
    this.block = function (a) {
        n = a;
        c.scaleX = l;
        c.scaleY = k;
    };
    this.setScaleX = function (a) {
        l = c.scaleX = a;
    };
    this.getX = function () {
        return c.x;
    };
    this.getY = function () {
        return c.y;
    };
    this.pulseAnimation = function () {
        createjs.Tween.get(c)
            .to({ scaleX: 0.9 * l, scaleY: 0.9 * k }, 850, createjs.Ease.quadOut)
            .to({ scaleX: l, scaleY: k }, 650, createjs.Ease.quadIn)
            .call(function () {
                u.pulseAnimation();
            });
    };
    this.trebleAnimation = function () {
        createjs.Tween.get(c)
            .to({ rotation: 5 }, 75, createjs.Ease.quadOut)
            .to({ rotation: -5 }, 140, createjs.Ease.quadIn)
            .to({ rotation: 0 }, 75, createjs.Ease.quadIn)
            .wait(750)
            .call(function () {
                u.trebleAnimation();
            });
    };
    this.removeAllTweens = function () {
        createjs.Tween.removeTweens(c);
    };
    var q = void 0 !== f ? f : s_oStage;
    this._init(g, b, d);
    var u = this;
    return this;
}
function CMenu() {
    var g,
        b,
        d,
        f,
        a,
        e,
        c,
        h,
        l,
        k,
        m,
        p,
        n = null,
        q = null;
    this._init = function () {
        c = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(c);
        var u = s_oSpriteLibrary.getSprite("but_play");
        h = new CGfxButton(0, 0, u);
        h.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        h.pulseAnimation();
        s_iBestScore = getItem(LOCALSTORAGE_STRING[LOCAL_BEST_SCORE]);
        null === s_iBestScore && (s_iBestScore = 0);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            (u = s_oSpriteLibrary.getSprite("audio_icon")), (a = CANVAS_WIDTH - u.height / 2 - 10), (e = u.height / 2 + 10), (m = new CToggle(a, e, u, s_bAudioActive)), m.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        u = window.document;
        var r = u.documentElement;
        n = r.requestFullscreen || r.mozRequestFullScreen || r.webkitRequestFullScreen || r.msRequestFullscreen;
        q = u.exitFullscreen || u.mozCancelFullScreen || u.webkitExitFullscreen || u.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (n = !1);
        u = s_oSpriteLibrary.getSprite("but_info");
        d = u.height / 2 + 10;
        f = u.height / 2 + 10;
        l = new CGfxButton(d, f, u, s_oStage);
        l.addEventListener(ON_MOUSE_UP, this._onButInfoRelease, this);
        n &&
            screenfull.enabled &&
            ((u = s_oSpriteLibrary.getSprite("but_fullscreen")), (g = d + u.width / 2 + 10), (b = u.height / 2 + 10), (p = new CToggle(g, b, u, s_bFullscreen, s_oStage)), p.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        k = new createjs.Shape();
        k.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(k);
        createjs.Tween.get(k)
            .to({ alpha: 0 }, 1e3)
            .call(function () {
                k.visible = !1;
            });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };
    this.refreshButtonPos = function (c, k) {
        (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || m.setPosition(a - c, k + e);
        n && screenfull.enabled && p.setPosition(g + c, b + k);
        l.setPosition(d + c, f + k);
        s_bLandscape ? (h.setX(CANVAS_WIDTH / 2 + 500), h.setY(CANVAS_HEIGHT / 2 + 200)) : (h.setX(CANVAS_WIDTH / 2), h.setY(CANVAS_HEIGHT / 2 + 360));
    };
    this.unload = function () {
        h.unload();
        h = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) m.unload(), (m = null);
        n && screenfull.enabled && p.unload();
        s_oStage.removeAllChildren();
        s_oMenu = null;
    };
    this._onButPlayRelease = function () {
        this.unload();
        s_oMain.gotoGame();
    };
    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    this._onButInfoRelease = function () {
        new CCreditsPanel();
    };
    this.resetFullscreenBut = function () {
        n && screenfull.enabled && p.setActive(s_bFullscreen);
    };
    this._onFullscreenRelease = function () {
        s_bFullscreen ? q.call(window.document) : n.call(window.document.documentElement);
        sizeHandler();
    };
    s_oMenu = this;
    this._init();
}
var s_oMenu = null;
function CGame(g) {
    var b,
        d,
        f,
        a,
        e,
        c,
        h,
        l,
        k,
        m,
        p = null,
        n,
        q,
        u = !1,
        r = !1,
        w = !1,
        v = !1,
        x = !1,
        y,
        z,
        E,
        A = !1,
        F = !1,
        L,
        H = 0,
        P = 0,
        R,
        M,
        N,
        J,
        O,
        K = STATE_INIT,
        C = null;
    this._init = function () {
        $(s_oMain).trigger("start_session");
        L = 0;
        J = [];
        c = new createjs.Container();
        s_oStage.addChild(c);
        d = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        d.cache(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        c.addChild(d);
        f = new CScenario(1);
        C = SHOW_3D_RENDER ? camera : createOrthoGraphicCamera();
        var g = s_oSpriteLibrary.getSprite("goal");
        q = new CGoal(291, 28 + OFFSET_Y, g, c);
        g = s_oSpriteLibrary.getSprite("ball");
        a = new CBall(0, 0, g, f.ballBody(), c);
        J.push(a);
        this.ballPosition();
        a.setVisible(!1);
        N = MS_TIME_SWIPE_START;
        e = new CStartBall(CANVAS_WIDTH_HALF + 55, CANVAS_HEIGHT_HALF + 168, c);
        m = new CPlayer(CANVAS_WIDTH_HALF - 150, -360, c);
        m.setVisible(!1);
        g = "cursor";
        s_bMobile ? ((g = "hand_touch"), (TIME_SWIPE = 650)) : (TIME_SWIPE = 500);
        n = new CHandSwipeAnim(START_HAND_SWIPE_POS, END_HAND_SWIPE_POS, s_oSpriteLibrary.getSprite(g), s_oStage);
        resizeCanvas3D();
        setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME);
        b = new CInterface();
        b.refreshTextScoreBoard(0, 0, 0, !1);
        b.refreshLaunchBoard(H, NUM_OF_PENALTY);
        O = new CANNON.Vec3(0, 0, 0);
    };
    this.createControl = function () {
        SHOW_3D_RENDER
            ? (window.addEventListener("mousedown", this.onMouseDown), window.addEventListener("mousemove", this.onPressMove), window.addEventListener("mouseup", this.onPressUp))
            : ((k = new createjs.Shape()),
              k.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT),
              c.addChild(k),
              (y = k.on("mousedown", this.onMouseDown)),
              (z = k.on("pressmove", this.onPressMove)),
              (E = k.on("pressup", this.onPressUp)));
    };
    this.showControlsHelp = function () {
        n.animAllSwipe();
        b.showHelpText();
    };
    this.sortDepth = function (a, b) {
        a.getDepthPos() > b.getDepthPos()
            ? c.getChildIndex(a.getObject()) > c.getChildIndex(b.getObject()) && c.swapChildren(a.getObject(), b.getObject())
            : a.getDepthPos() < b.getDepthPos() && c.getChildIndex(b.getObject()) > c.getChildIndex(a.getObject()) && c.swapChildren(b.getObject(), a.getObject());
    };
    this.onExitHelp = function () {
        this.createControl();
        this.pause(!1);
        this.showControlsHelp();
    };
    this.poleCollide = function (a) {
        F || u || ((F = !0), this.calculateScore(a), (M = TIME_POLE_COLLISION_RESET), playSound("pole", 0.4, !1));
    };
    this.calculateScore = function (a) {
        if (4.5 < a.z) {
            var c = Math.round(Math.abs(a.x) / (CROSSBAR_SCORE.length - 0.5));
            c >= CROSSBAR_SCORE.length && (c = CROSSBAR_SCORE.length - 1);
            var g = CROSSBAR_SCORE[c];
            q.highlightCrossbar(0 > a.x ? 4 - c : 4 + c);
            L += g;
            b.refreshTextScoreBoard(L, 1, 0, !1);
            b.createAnimText(TEXT_CONGRATULATION[c], 120, !1, TEXT_COLOR, "#116ee0");
        } else b.createAnimText(TEXT_BALL_OUT, 90, !1, TEXT_COLOR_1, "#fff");
    };
    this.fieldCollision = function () {
        if (null === p && r && ((p = playSound("drop_bounce_grass", 0.3, !1)), null !== p))
            p.on("end", function () {
                p = null;
            });
    };
    this.ballPosition = function () {
        var b = f.ballBody(),
            c = this.convert3dPosTo2dScreen(b.position, C),
            g = c.z * (BALL_SCALE_FACTOR - a.getStartScale()) + a.getStartScale();
        a.setPosition(c.x, c.y);
        a.scale(g);
        this.refreshShadowCast(a, b, g);
    };
    this.onMouseDown = function (a) {
        r || ((N = MS_TIME_SWIPE_START), n.removeTweens(), n.setVisible(!1), (h = { x: s_oStage.mouseX, y: s_oStage.mouseY }), (l = null));
    };
    this.onPressMove = function () {
        l = { x: s_oStage.mouseX, y: s_oStage.mouseY };
        P += s_iTimeElaps;
    };
    this.onPressUp = function () {
        if (!(r || null === l || h.y < l.y || (0 === l.x && 0 === l.y))) {
            var a = Math.ceil(distanceV2(h, l)) * FORCE_RATE;
            a > FORCE_MAX && (a = FORCE_MAX);
            if (P > TIME_SWIPE) P = 0;
            else {
                var b = new CVector2(h.x - l.x, h.y - l.y);
                b.scalarProduct(a);
                a = b.length();
                if (a > HIT_BALL_MIN_FORCE) {
                    a > HIT_BALL_MAX_FORCE && (b.normalize(), b.scalarProduct(HIT_BALL_MAX_FORCE));
                    x = !0;
                    m.setVisible(!0);
                    var c = P / 10;
                    c > MAX_FORCE_Y ? (c = MAX_FORCE_Y) : c < MIN_FORCE_Y && (c = MIN_FORCE_Y);
                    a = -b.getX() * FORCE_MULTIPLIER_AXIS.x;
                    12 > a && 9 < a ? (a = 9.8) : -12 < a && -9 > a && (a = s_bMobile ? -9.8 : -9.85);
                    b = b.getY() * FORCE_MULTIPLIER_AXIS.z + 0.2 * Math.abs(a);
                    11.6 > b && 8.7 < b ? (b = s_bMobile ? 9.3 : 9.35) : 3.5 > b && (b = 3.5);
                    O.set(a, c, b);
                }
                l.x = 0;
                l.y = 0;
            }
        }
    };
    this.refreshShadowCast = function (a, b, c) {
        var g = f.getFieldBody();
        if (b.position.z < g.position.z) a.scaleShadow(0);
        else {
            var e = this.convert3dPosTo2dScreen({ x: b.position.x, y: b.position.y, z: g.position.z }, C);
            b = (b.position.z - BALL_RADIUS) * (g.position.z - SHADOWN_FACTOR - g.position.z) + g.position.z;
            c *= b;
            a.scaleShadow(c);
            0 > c || (a.setAlphaByHeight(b), a.setPositionShadow(e.x, e.y));
        }
    };
    this.getLevel = function () {
        return 1;
    };
    this.unload = function () {
        s_oStage.removeAllChildren();
        b.unload();
        void 0 !== k && (k.off("mousedown", y), k.off("pressmove", z), k.off("pressup", E));
        f.destroyWorld();
        f = null;
    };
    this.resetValues = function () {
        L = 0;
        b.refreshTextScoreBoard(0, 0, 0, !1);
        H = 0;
        b.refreshLaunchBoard(H, NUM_OF_PENALTY);
    };
    this.wallSoundCollision = function () {
        playSound("ball_collision", 1, !1);
    };
    this.areaGoal = function () {
        u || A || ((u = !0), (R = TIME_RESET_AFTER_GOAL), b.createAnimText(TEXT_BALL_OUT, 90, !1, TEXT_COLOR_1, "#fff"));
    };
    this.addImpulseToBall = function (b) {
        if (!r && K === STATE_PLAY) {
            var c = f.ballBody();
            f.addImpulse(c, b);
            f.setElementAngularVelocity(c, { x: 0, y: 0, z: 0 });
            r = !0;
            a.setVisible(!0);
            e.setVisible(!1);
            playSound("kick", 1, !1);
        }
    };
    this.pause = function (a) {
        K = a ? STATE_PAUSE : STATE_PLAY;
        createjs.Ticker.paused = a;
    };
    this.onExit = function () {
        this.unload();
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("end_session");
        setVolume("soundtrack", 1);
        s_oMain.gotoMenu();
    };
    this.resetBallPosition = function () {
        var b = f.ballBody();
        b.position.set(POSITION_BALL.x, POSITION_BALL.y, POSITION_BALL.z);
        f.setElementVelocity(b, { x: 0, y: 0, z: 0 });
        f.setElementAngularVelocity(b, { x: 0, y: 0, z: 0 });
        a.fadeAnimation(1, 500, 0);
        a.setVisible(!1);
        e.setVisible(!0);
        e.setAlpha(0);
        e.fadeAnim(1, 500, 0);
    };
    this.ballFadeForReset = function () {
        A && u && w && !v && (a.fadeAnimation(0, 300, 10), (v = !0));
    };
    this._updateInit = function () {
        f.update();
        this._updateBall2DPosition();
        K = STATE_PLAY;
    };
    this.convert2dScreenPosTo3d = function (a) {
        a = new THREE.Vector3((a.x / s_iCanvasResizeWidth) * 2 - 1, 2 * -(a.y / s_iCanvasResizeHeight) + 1, -1);
        a.unproject(C);
        a.sub(C.position);
        a.normalize();
        a.multiply(new THREE.Vector3(0, 1, 0));
        return a;
    };
    this.convert3dPosTo2dScreen = function (a, b) {
        var c = new THREE.Vector3(a.x, a.y, a.z).project(b),
            g = 0.5 * Math.floor(s_iCanvasResizeWidth),
            e = 0.5 * Math.floor(s_iCanvasResizeHeight);
        c.x = (c.x * g + g) * s_fInverseScaling;
        c.y = (-(c.y * e) + e) * s_fInverseScaling;
        return c;
    };
    this.timeReset = function () {
        0 < R ? (R -= s_iTimeElaps) : this.endTurn();
    };
    this.restartGame = function () {
        this.resetValues();
        this.resetScene();
        K = STATE_PLAY;
        r = !1;
    };
    this.endTurn = function () {
        H++;
        b.refreshLaunchBoard(H, NUM_OF_PENALTY);
        H < NUM_OF_PENALTY
            ? (this.resetScene(), (r = !1), (N = MS_TIME_SWIPE_START))
            : ((K = STATE_FINISH), L > s_iBestScore && ((s_iBestScore = Math.floor(L)), saveItem(LOCALSTORAGE_STRING[LOCAL_BEST_SCORE], Math.floor(L)), b.refreshBestScore()), b.createWinPanel(Math.floor(L)));
    };
    this.goalAnimation = function (a) {
        a > FORCE_BALL_DISPLAY_SHOCK[0].min && a < FORCE_BALL_DISPLAY_SHOCK[0].max
            ? this.displayShock(INTENSITY_DISPLAY_SHOCK[0].time, INTENSITY_DISPLAY_SHOCK[0].x, INTENSITY_DISPLAY_SHOCK[0].y)
            : a > FORCE_BALL_DISPLAY_SHOCK[1].min && a < FORCE_BALL_DISPLAY_SHOCK[1].max
            ? this.displayShock(INTENSITY_DISPLAY_SHOCK[1].time, INTENSITY_DISPLAY_SHOCK[1].x, INTENSITY_DISPLAY_SHOCK[1].y)
            : a > FORCE_BALL_DISPLAY_SHOCK[2].min && a < FORCE_BALL_DISPLAY_SHOCK[2].max
            ? this.displayShock(INTENSITY_DISPLAY_SHOCK[2].time, INTENSITY_DISPLAY_SHOCK[2].x, INTENSITY_DISPLAY_SHOCK[2].y)
            : a > FORCE_BALL_DISPLAY_SHOCK[3].min && this.displayShock(INTENSITY_DISPLAY_SHOCK[3].time, INTENSITY_DISPLAY_SHOCK[3].x, INTENSITY_DISPLAY_SHOCK[3].y);
    };
    this.displayShock = function (a, b, g) {
        createjs.Tween.get(c)
            .to({ x: Math.round(Math.random() * b), y: Math.round(Math.random() * g) }, a)
            .call(function () {
                createjs.Tween.get(c)
                    .to({ x: Math.round(Math.random() * b * 0.8), y: -Math.round(Math.random() * g * 0.8) }, a)
                    .call(function () {
                        createjs.Tween.get(c)
                            .to({ x: Math.round(Math.random() * b * 0.6), y: Math.round(Math.random() * g * 0.6) }, a)
                            .call(function () {
                                createjs.Tween.get(c)
                                    .to({ x: Math.round(Math.random() * b * 0.4), y: -Math.round(Math.random() * g * 0.4) }, a)
                                    .call(function () {
                                        createjs.Tween.get(c)
                                            .to({ x: Math.round(Math.random() * b * 0.2), y: Math.round(Math.random() * g * 0.2) }, a)
                                            .call(function () {
                                                createjs.Tween.get(c)
                                                    .to({ y: 0, x: 0 }, a)
                                                    .call(function () {});
                                            });
                                    });
                            });
                    });
            });
    };
    this.resetScene = function () {
        v = F = A = w = u = !1;
        this.resetBallPosition();
        this.sortDepth(a, q);
    };
    this._onEnd = function () {
        this.onExit();
    };
    this.swapChildrenIndex = function () {
        for (var a = 0; a < J.length - 1; a++) for (var b = a + 1; b < J.length; b++) J[a].getObject().visible && J[b].getObject().visible && this.sortDepth(J[a], J[b]);
    };
    this.ballOut = function () {
        if (!w && !u && !A) {
            var c = a.getPhysics().position;
            if (c.y > BALL_OUT_Y || c.x > BACK_WALL_GOAL_SIZE.width || c.x < -BACK_WALL_GOAL_SIZE.width)
                (w = !0), (R = TIME_RESET_AFTER_BALL_OUT), !1 === F && (b.createAnimText(TEXT_BALL_OUT, 90, !1, TEXT_COLOR_1, "#fff"), playSound("ball_saved", 1, !1));
        }
    };
    this.animPlayer = function () {
        x ? ((x = m.animPlayer()), m.getFrame() === SHOOT_FRAME && (this.addImpulseToBall({ x: O.x, y: O.y, z: O.z }), (P = 0), this.goalAnimation(O.y), b.unloadHelpText())) : m.setVisible(!1);
    };
    this.resetPoleCollision = function () {
        0 < M ? (M -= s_iTimeElaps) : (u && A) || (this.endTurn(), (M = TIME_POLE_COLLISION_RESET));
    };
    this.handSwipeAnim = function () {
        n.isAnimate() || r || (0 < N ? (N -= s_iTimeElaps) : (n.animAllSwipe(), n.setVisible(!0), (N = MS_TIME_SWIPE_START)));
    };
    this.swapGoal = function () {
        a.getPhysics().position.z > GOAL_SPRITE_SWAP_Z && this.sortDepth(a, q);
    };
    this._updatePlay = function () {
        for (var a = 0; a < PHYSICS_ACCURACY; a++) f.update();
        this.ballOut();
        u || w || A ? this.timeReset() : F && this.resetPoleCollision();
        this.animPlayer();
        this._updateBall2DPosition();
        this.swapChildrenIndex();
        this.swapGoal();
    };
    this.update = function () {
        switch (K) {
            case STATE_INIT:
                this._updateInit();
                break;
            case STATE_PLAY:
                this._updatePlay();
        }
    };
    this._updateBall2DPosition = function () {
        this.ballPosition();
        a.rolls();
        C.updateProjectionMatrix();
        C.updateMatrixWorld();
    };
    s_oGame = this;
    NUM_OF_PENALTY = g.num_of_penalty;
    this._init();
}
var s_oGame;
function CInterface() {
    var g,
        b,
        d,
        f,
        a,
        e,
        c,
        h,
        l,
        k,
        m,
        p,
        n = null,
        q,
        u,
        r,
        w,
        v,
        x,
        y = null,
        z = null;
    this._init = function () {
        var n = s_oSpriteLibrary.getSprite("but_exit");
        d = CANVAS_WIDTH - n.height / 2 - 10;
        f = n.height / 2 + 10;
        l = new CGfxButton(d, f, n);
        l.addEventListener(ON_MOUSE_UP, this._onExit, this);
        n = s_oSpriteLibrary.getSprite("but_pause");
        g = d - n.height - 10;
        b = f;
        k = new CGfxButton(g, b, n);
        k.addEventListener(ON_MOUSE_UP, this.onButPauseRelease, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            (n = s_oSpriteLibrary.getSprite("audio_icon")), (c = g - n.height - 10), (h = f), (p = new CToggle(c, h, n, s_bAudioActive)), p.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        n = window.document;
        var q = n.documentElement;
        y = q.requestFullscreen || q.mozRequestFullScreen || q.webkitRequestFullScreen || q.msRequestFullscreen;
        z = n.exitFullscreen || n.mozCancelFullScreen || n.webkitExitFullscreen || n.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (y = !1);
        y &&
            screenfull.enabled &&
            ((n = s_oSpriteLibrary.getSprite("but_fullscreen")), (a = n.width / 4 + 10), (e = n.height / 2 + 10), (m = new CToggle(a, e, n, s_bFullscreen, s_oStage)), m.addEventListener(ON_MOUSE_UP, this._onFullscreen, this));
        u = new CScoreBoard(s_oStage);
        r = new CLaunchBoard(s_oStage);
        w = new CHelpPanel(s_oStage);
        w.show();
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };
    this.refreshButtonPos = function (n, q) {
        l.setPosition(d - n, q + f);
        k.setPosition(g - n, q + b);
        (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || p.setPosition(c - n, q + h);
        var w = u.getStartPosScore();
        u.setPosScore(w.x + n, w.y - q);
        w = r.getStartPos();
        r.setPos(w.x - n, w.y - q);
        y && screenfull.enabled && m.setPosition(a + n, e + q);
    };
    this.unloadHelpText = function () {
        null !== v && (v.fadeAnim(0, v.unload), (v = null));
    };
    this.unload = function () {
        l.unload();
        l = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) p.unload(), (p = null);
        y && screenfull.enabled && (m.unload(), (m = null));
        w.unload();
        s_oInterface = null;
    };
    this.showHelpText = function () {
        v = new CHelpText(s_oStage);
        v.fadeAnim(1, null);
    };
    this.createWinPanel = function (a) {
        n = new CWinPanel(s_oSpriteLibrary.getSprite("msg_box"));
        n.show(a);
    };
    this.refreshTextScoreBoard = function (a, b, c, g) {
        u.refreshTextScore(a);
        g && u.effectAddScore(c, b);
    };
    this.refreshBestScore = function () {
        u.refreshBestScore();
    };
    this.resetFullscreenBut = function () {
        y && screenfull.enabled && m.setActive(s_bFullscreen);
    };
    this._onFullscreen = function () {
        s_bFullscreen ? z.call(window.document) : y.call(window.document.documentElement);
        sizeHandler();
    };
    this.createAnimText = function (a, b, c, g, e) {
        var d = new createjs.Container(),
            k = new CCTLText(d, -300, 0, 600, b, b, "center", e, SECONDARY_FONT, 1, 0, 0, a, !0, !0, !0, !1);
        k.setOutline(4);
        var m = new CCTLText(d, -300, 0, 600, b, b, "center", g, SECONDARY_FONT, 1, 0, 0, a, !0, !0, !0, !1);
        d.x = CANVAS_WIDTH_HALF;
        d.y = -k.getBounds().height;
        c && s_oInterface.strobeText(m.getText());
        s_oStage.addChild(d);
        createjs.Tween.get(d)
            .to({ y: CANVAS_HEIGHT_HALF - 200 }, 500, createjs.Ease.cubicOut)
            .call(function () {
                createjs.Tween.get(d)
                    .wait(250)
                    .to({ y: CANVAS_HEIGHT + k.getBounds().height }, 500, createjs.Ease.cubicIn)
                    .call(function () {
                        c && createjs.Tween.removeTweens(m.getText());
                        s_oStage.removeChild(d);
                    });
            });
    };
    this.strobeText = function (a) {
        createjs.Tween.get(a)
            .wait(30)
            .call(function () {
                x < TEXT_EXCELLENT_COLOR.length - 1 ? x++ : (x = 0);
                a.color = TEXT_EXCELLENT_COLOR[x];
                s_oInterface.strobeText(a);
            });
    };
    this.refreshLaunchBoard = function (a, b) {
        r.refreshTextLaunch(a, b);
    };
    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    this._onExit = function () {
        new CAreYouSurePanel(s_oStage).show();
    };
    this.unloadPause = function () {
        q.unload();
        q = null;
    };
    this.onButPauseRelease = function () {
        playSound("click", 1, !1);
        q = new CPause();
    };
    s_oInterface = this;
    this._init();
    return this;
}
var s_oInterface = null;
!(function (g) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = g();
    else {
        var b;
        "undefined" != typeof window ? (b = window) : "undefined" != typeof global ? (b = global) : "undefined" != typeof self && (b = self);
        b.CANNON = g();
    }
})(function () {
    return (function a(b, d, f) {
        function e(h, k) {
            if (!d[h]) {
                if (!b[h]) {
                    var m = "function" == typeof require && require;
                    if (!k && m) return m(h, !0);
                    if (c) return c(h, !0);
                    throw Error("Cannot find module '" + h + "'");
                }
                m = d[h] = { exports: {} };
                b[h][0].call(
                    m.exports,
                    function (a) {
                        var c = b[h][1][a];
                        return e(c ? c : a);
                    },
                    m,
                    m.exports,
                    a,
                    b,
                    d,
                    f
                );
            }
            return d[h].exports;
        }
        for (var c = "function" == typeof require && require, h = 0; h < f.length; h++) e(f[h]);
        return e;
    })(
        {
            1: [
                function (b, d, f) {
                    d.exports = {
                        name: "cannon",
                        version: "0.6.2",
                        description: "A lightweight 3D physics engine written in JavaScript.",
                        homepage: "https://github.com/schteppe/cannon.js",
                        author: "Stefan Hedman <schteppe@gmail.com> (http://steffe.se)",
                        keywords: ["cannon.js", "cannon", "physics", "engine", "3d"],
                        main: "./build/cannon.js",
                        engines: { node: "*" },
                        repository: { type: "git", url: "https://github.com/schteppe/cannon.js.git" },
                        bugs: { url: "https://github.com/schteppe/cannon.js/issues" },
                        licenses: [{ type: "MIT" }],
                        devDependencies: {
                            jshint: "latest",
                            "uglify-js": "latest",
                            nodeunit: "^0.9.0",
                            grunt: "~0.4.0",
                            "grunt-contrib-jshint": "~0.1.1",
                            "grunt-contrib-nodeunit": "^0.4.1",
                            "grunt-contrib-concat": "~0.1.3",
                            "grunt-contrib-uglify": "^0.5.1",
                            "grunt-browserify": "^2.1.4",
                            "grunt-contrib-yuidoc": "^0.5.2",
                            browserify: "*",
                        },
                        dependencies: {},
                    };
                },
                {},
            ],
            2: [
                function (b, d, f) {
                    d.exports = {
                        version: b("../package.json").version,
                        AABB: b("./collision/AABB"),
                        ArrayCollisionMatrix: b("./collision/ArrayCollisionMatrix"),
                        Body: b("./objects/Body"),
                        Box: b("./shapes/Box"),
                        Broadphase: b("./collision/Broadphase"),
                        Constraint: b("./constraints/Constraint"),
                        ContactEquation: b("./equations/ContactEquation"),
                        Narrowphase: b("./world/Narrowphase"),
                        ConeTwistConstraint: b("./constraints/ConeTwistConstraint"),
                        ContactMaterial: b("./material/ContactMaterial"),
                        ConvexPolyhedron: b("./shapes/ConvexPolyhedron"),
                        Cylinder: b("./shapes/Cylinder"),
                        DistanceConstraint: b("./constraints/DistanceConstraint"),
                        Equation: b("./equations/Equation"),
                        EventTarget: b("./utils/EventTarget"),
                        FrictionEquation: b("./equations/FrictionEquation"),
                        GSSolver: b("./solver/GSSolver"),
                        GridBroadphase: b("./collision/GridBroadphase"),
                        Heightfield: b("./shapes/Heightfield"),
                        HingeConstraint: b("./constraints/HingeConstraint"),
                        LockConstraint: b("./constraints/LockConstraint"),
                        Mat3: b("./math/Mat3"),
                        Material: b("./material/Material"),
                        NaiveBroadphase: b("./collision/NaiveBroadphase"),
                        ObjectCollisionMatrix: b("./collision/ObjectCollisionMatrix"),
                        Pool: b("./utils/Pool"),
                        Particle: b("./shapes/Particle"),
                        Plane: b("./shapes/Plane"),
                        PointToPointConstraint: b("./constraints/PointToPointConstraint"),
                        Quaternion: b("./math/Quaternion"),
                        Ray: b("./collision/Ray"),
                        RaycastVehicle: b("./objects/RaycastVehicle"),
                        RaycastResult: b("./collision/RaycastResult"),
                        RigidVehicle: b("./objects/RigidVehicle"),
                        RotationalEquation: b("./equations/RotationalEquation"),
                        RotationalMotorEquation: b("./equations/RotationalMotorEquation"),
                        SAPBroadphase: b("./collision/SAPBroadphase"),
                        SPHSystem: b("./objects/SPHSystem"),
                        Shape: b("./shapes/Shape"),
                        Solver: b("./solver/Solver"),
                        Sphere: b("./shapes/Sphere"),
                        SplitSolver: b("./solver/SplitSolver"),
                        Spring: b("./objects/Spring"),
                        Trimesh: b("./shapes/Trimesh"),
                        Vec3: b("./math/Vec3"),
                        Vec3Pool: b("./utils/Vec3Pool"),
                        World: b("./world/World"),
                    };
                },
                {
                    "../package.json": 1,
                    "./collision/AABB": 3,
                    "./collision/ArrayCollisionMatrix": 4,
                    "./collision/Broadphase": 5,
                    "./collision/GridBroadphase": 6,
                    "./collision/NaiveBroadphase": 7,
                    "./collision/ObjectCollisionMatrix": 8,
                    "./collision/Ray": 9,
                    "./collision/RaycastResult": 10,
                    "./collision/SAPBroadphase": 11,
                    "./constraints/ConeTwistConstraint": 12,
                    "./constraints/Constraint": 13,
                    "./constraints/DistanceConstraint": 14,
                    "./constraints/HingeConstraint": 15,
                    "./constraints/LockConstraint": 16,
                    "./constraints/PointToPointConstraint": 17,
                    "./equations/ContactEquation": 19,
                    "./equations/Equation": 20,
                    "./equations/FrictionEquation": 21,
                    "./equations/RotationalEquation": 22,
                    "./equations/RotationalMotorEquation": 23,
                    "./material/ContactMaterial": 24,
                    "./material/Material": 25,
                    "./math/Mat3": 27,
                    "./math/Quaternion": 28,
                    "./math/Vec3": 30,
                    "./objects/Body": 31,
                    "./objects/RaycastVehicle": 32,
                    "./objects/RigidVehicle": 33,
                    "./objects/SPHSystem": 34,
                    "./objects/Spring": 35,
                    "./shapes/Box": 37,
                    "./shapes/ConvexPolyhedron": 38,
                    "./shapes/Cylinder": 39,
                    "./shapes/Heightfield": 40,
                    "./shapes/Particle": 41,
                    "./shapes/Plane": 42,
                    "./shapes/Shape": 43,
                    "./shapes/Sphere": 44,
                    "./shapes/Trimesh": 45,
                    "./solver/GSSolver": 46,
                    "./solver/Solver": 47,
                    "./solver/SplitSolver": 48,
                    "./utils/EventTarget": 49,
                    "./utils/Pool": 51,
                    "./utils/Vec3Pool": 54,
                    "./world/Narrowphase": 55,
                    "./world/World": 56,
                },
            ],
            3: [
                function (b, d, f) {
                    function a(a) {
                        a = a || {};
                        this.lowerBound = new e();
                        a.lowerBound && this.lowerBound.copy(a.lowerBound);
                        this.upperBound = new e();
                        a.upperBound && this.upperBound.copy(a.upperBound);
                    }
                    var e = b("../math/Vec3");
                    b("../utils/Utils");
                    d.exports = a;
                    var c = new e();
                    a.prototype.setFromPoints = function (a, b, e, d) {
                        var k = this.lowerBound,
                            m = this.upperBound;
                        k.copy(a[0]);
                        e && e.vmult(k, k);
                        m.copy(k);
                        for (var h = 1; h < a.length; h++) {
                            var l = a[h];
                            e && (e.vmult(l, c), (l = c));
                            l.x > m.x && (m.x = l.x);
                            l.x < k.x && (k.x = l.x);
                            l.y > m.y && (m.y = l.y);
                            l.y < k.y && (k.y = l.y);
                            l.z > m.z && (m.z = l.z);
                            l.z < k.z && (k.z = l.z);
                        }
                        b && (b.vadd(k, k), b.vadd(m, m));
                        d && ((k.x -= d), (k.y -= d), (k.z -= d), (m.x += d), (m.y += d), (m.z += d));
                        return this;
                    };
                    a.prototype.copy = function (a) {
                        this.lowerBound.copy(a.lowerBound);
                        this.upperBound.copy(a.upperBound);
                        return this;
                    };
                    a.prototype.clone = function () {
                        return new a().copy(this);
                    };
                    a.prototype.extend = function (a) {
                        var b = a.lowerBound.x;
                        this.lowerBound.x > b && (this.lowerBound.x = b);
                        b = a.upperBound.x;
                        this.upperBound.x < b && (this.upperBound.x = b);
                        b = a.lowerBound.y;
                        this.lowerBound.y > b && (this.lowerBound.y = b);
                        b = a.upperBound.y;
                        this.upperBound.y < b && (this.upperBound.y = b);
                        b = a.lowerBound.z;
                        this.lowerBound.z > b && (this.lowerBound.z = b);
                        b = a.upperBound.z;
                        this.upperBound.z < b && (this.upperBound.z = b);
                    };
                    a.prototype.overlaps = function (a) {
                        var b = this.lowerBound,
                            c = this.upperBound,
                            e = a.lowerBound;
                        a = a.upperBound;
                        return ((e.x <= c.x && c.x <= a.x) || (b.x <= a.x && a.x <= c.x)) && ((e.y <= c.y && c.y <= a.y) || (b.y <= a.y && a.y <= c.y)) && ((e.z <= c.z && c.z <= a.z) || (b.z <= a.z && a.z <= c.z));
                    };
                    a.prototype.contains = function (a) {
                        var b = this.lowerBound,
                            c = this.upperBound,
                            e = a.lowerBound;
                        a = a.upperBound;
                        return b.x <= e.x && c.x >= a.x && b.y <= e.y && c.y >= a.y && b.z <= e.z && c.z >= a.z;
                    };
                    a.prototype.getCorners = function (a, b, c, e, d, h, f, r) {
                        var k = this.lowerBound,
                            m = this.upperBound;
                        a.copy(k);
                        b.set(m.x, k.y, k.z);
                        c.set(m.x, m.y, k.z);
                        e.set(k.x, m.y, m.z);
                        d.set(m.x, k.y, k.z);
                        h.set(k.x, m.y, k.z);
                        f.set(k.x, k.y, m.z);
                        r.copy(m);
                    };
                    var h = [new e(), new e(), new e(), new e(), new e(), new e(), new e(), new e()];
                    a.prototype.toLocalFrame = function (a, b) {
                        this.getCorners(h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7]);
                        for (var c = 0; 8 !== c; c++) {
                            var e = h[c];
                            a.pointToLocal(e, e);
                        }
                        return b.setFromPoints(h);
                    };
                    a.prototype.toWorldFrame = function (a, b) {
                        this.getCorners(h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7]);
                        for (var c = 0; 8 !== c; c++) {
                            var e = h[c];
                            a.pointToWorld(e, e);
                        }
                        return b.setFromPoints(h);
                    };
                },
                { "../math/Vec3": 30, "../utils/Utils": 53 },
            ],
            4: [
                function (b, d, f) {
                    function a() {
                        this.matrix = [];
                    }
                    d.exports = a;
                    a.prototype.get = function (a, b) {
                        a = a.index;
                        b = b.index;
                        if (b > a) {
                            var c = b;
                            b = a;
                            a = c;
                        }
                        return this.matrix[((a * (a + 1)) >> 1) + b - 1];
                    };
                    a.prototype.set = function (a, b, d) {
                        a = a.index;
                        b = b.index;
                        if (b > a) {
                            var c = b;
                            b = a;
                            a = c;
                        }
                        this.matrix[((a * (a + 1)) >> 1) + b - 1] = d ? 1 : 0;
                    };
                    a.prototype.reset = function () {
                        for (var a = 0, b = this.matrix.length; a !== b; a++) this.matrix[a] = 0;
                    };
                    a.prototype.setNumObjects = function (a) {
                        this.matrix.length = (a * (a - 1)) >> 1;
                    };
                },
                {},
            ],
            5: [
                function (b, d, f) {
                    function a() {
                        this.world = null;
                        this.useBoundingBoxes = !1;
                        this.dirty = !0;
                    }
                    var e = b("../objects/Body");
                    f = b("../math/Vec3");
                    var c = b("../math/Quaternion");
                    b("../shapes/Shape");
                    b("../shapes/Plane");
                    d.exports = a;
                    a.prototype.collisionPairs = function (a, b, c) {
                        throw Error("collisionPairs not implemented for this BroadPhase class!");
                    };
                    var h = e.STATIC | e.KINEMATIC;
                    a.prototype.needBroadphaseCollision = function (a, b) {
                        return 0 !== (a.collisionFilterGroup & b.collisionFilterMask) &&
                            0 !== (b.collisionFilterGroup & a.collisionFilterMask) &&
                            ((0 === (a.type & h) && a.sleepState !== e.SLEEPING) || (0 === (b.type & h) && b.sleepState !== e.SLEEPING))
                            ? !0
                            : !1;
                    };
                    a.prototype.intersectionTest = function (a, b, c, e) {
                        this.useBoundingBoxes ? this.doBoundingBoxBroadphase(a, b, c, e) : this.doBoundingSphereBroadphase(a, b, c, e);
                    };
                    var l = new f();
                    new f();
                    new c();
                    new f();
                    a.prototype.doBoundingSphereBroadphase = function (a, b, c, e) {
                        b.position.vsub(a.position, l);
                        var d = Math.pow(a.boundingRadius + b.boundingRadius, 2);
                        l.norm2() < d && (c.push(a), e.push(b));
                    };
                    a.prototype.doBoundingBoxBroadphase = function (a, b, c, e) {
                        a.aabbNeedsUpdate && a.computeAABB();
                        b.aabbNeedsUpdate && b.computeAABB();
                        a.aabb.overlaps(b.aabb) && (c.push(a), e.push(b));
                    };
                    var k = { keys: [] },
                        m = [],
                        p = [];
                    a.prototype.makePairsUnique = function (a, b) {
                        for (var c = a.length, e = 0; e !== c; e++) (m[e] = a[e]), (p[e] = b[e]);
                        a.length = 0;
                        for (e = b.length = 0; e !== c; e++) {
                            var d = m[e].id,
                                h = p[e].id;
                            d = d < h ? d + "," + h : h + "," + d;
                            k[d] = e;
                            k.keys.push(d);
                        }
                        for (e = 0; e !== k.keys.length; e++) (d = k.keys.pop()), (c = k[d]), a.push(m[c]), b.push(p[c]), delete k[d];
                    };
                    a.prototype.setWorld = function (a) {};
                    var n = new f();
                    a.boundingSphereCheck = function (a, b) {
                        a.position.vsub(b.position, n);
                        return Math.pow(a.shape.boundingSphereRadius + b.shape.boundingSphereRadius, 2) > n.norm2();
                    };
                    a.prototype.aabbQuery = function (a, b, c) {
                        console.warn(".aabbQuery is not implemented in this Broadphase subclass.");
                        return [];
                    };
                },
                { "../math/Quaternion": 28, "../math/Vec3": 30, "../objects/Body": 31, "../shapes/Plane": 42, "../shapes/Shape": 43 },
            ],
            6: [
                function (b, d, f) {
                    function a(a, b, d, h, l) {
                        e.apply(this);
                        this.nx = d || 10;
                        this.ny = h || 10;
                        this.nz = l || 10;
                        this.aabbMin = a || new c(100, 100, 100);
                        this.aabbMax = b || new c(-100, -100, -100);
                        a = this.nx * this.ny * this.nz;
                        if (0 >= a) throw "GridBroadphase: Each dimension's n must be >0";
                        this.bins = [];
                        this.binLengths = [];
                        this.bins.length = a;
                        this.binLengths.length = a;
                        for (b = 0; b < a; b++) (this.bins[b] = []), (this.binLengths[b] = 0);
                    }
                    d.exports = a;
                    var e = b("./Broadphase"),
                        c = b("../math/Vec3"),
                        h = b("../shapes/Shape");
                    a.prototype = new e();
                    a.prototype.constructor = a;
                    var l = new c();
                    new c();
                    a.prototype.collisionPairs = function (a, b, c) {
                        function e(a, b, c, e, d, k, m) {
                            a = ((a - L) * R) | 0;
                            b = ((b - H) * M) | 0;
                            c = ((c - P) * N) | 0;
                            e = U((e - L) * R);
                            d = U((d - H) * M);
                            k = U((k - P) * N);
                            0 > a ? (a = 0) : a >= p && (a = p - 1);
                            0 > b ? (b = 0) : b >= f && (b = f - 1);
                            0 > c ? (c = 0) : c >= x && (c = x - 1);
                            0 > e ? (e = 0) : e >= p && (e = p - 1);
                            0 > d ? (d = 0) : d >= f && (d = f - 1);
                            0 > k ? (k = 0) : k >= x && (k = x - 1);
                            a *= y;
                            b *= z;
                            c *= 1;
                            e *= y;
                            d *= z;
                            for (k *= 1; a <= e; a += y)
                                for (var h = b; h <= d; h += z)
                                    for (var l = c; l <= k; l += 1) {
                                        var n = a + h + l;
                                        T[n][t[n]++] = m;
                                    }
                        }
                        var d = a.numObjects();
                        a = a.bodies;
                        var k = this.aabbMax,
                            m = this.aabbMin,
                            p = this.nx,
                            f = this.ny,
                            x = this.nz,
                            y = f * x,
                            z = x,
                            E = k.x,
                            A = k.y,
                            F = k.z,
                            L = m.x,
                            H = m.y,
                            P = m.z,
                            R = p / (E - L),
                            M = f / (A - H),
                            N = x / (F - P);
                        E = (E - L) / p;
                        var J = (A - H) / f;
                        F = (F - P) / x;
                        var O = 0.5 * Math.sqrt(E * E + J * J + F * F);
                        A = h.types;
                        var K = A.SPHERE,
                            C = A.PLANE,
                            T = this.bins,
                            t = this.binLengths;
                        A = this.bins.length;
                        for (m = 0; m !== A; m++) t[m] = 0;
                        var U = Math.ceil;
                        m = Math.min;
                        k = Math.max;
                        for (m = 0; m !== d; m++) {
                            k = a[m];
                            var G = k.shape;
                            switch (G.type) {
                                case K:
                                    var V = k.position.x,
                                        I = k.position.y,
                                        B = k.position.z;
                                    G = G.radius;
                                    e(V - G, I - G, B - G, V + G, I + G, B + G, k);
                                    break;
                                case C:
                                    G.worldNormalNeedsUpdate && G.computeWorldNormal(k.quaternion);
                                    B = G.worldNormal;
                                    G = H + 0.5 * J - k.position.y;
                                    var Q = P + 0.5 * F - k.position.z,
                                        S = l;
                                    S.set(L + 0.5 * E - k.position.x, G, Q);
                                    for (var D = (V = 0); V !== p; V++, D += y, S.y = G, S.x += E)
                                        for (var X = (I = 0); I !== f; I++, X += z, S.z = Q, S.y += J)
                                            for (var Y = 0, W = 0; Y !== x; Y++, W += 1, S.z += F)
                                                if (S.dot(B) < O) {
                                                    var aa = D + X + W;
                                                    T[aa][t[aa]++] = k;
                                                }
                                    break;
                                default:
                                    k.aabbNeedsUpdate && k.computeAABB(), e(k.aabb.lowerBound.x, k.aabb.lowerBound.y, k.aabb.lowerBound.z, k.aabb.upperBound.x, k.aabb.upperBound.y, k.aabb.upperBound.z, k);
                            }
                        }
                        for (m = 0; m !== A; m++) if (((d = t[m]), 1 < d)) for (a = T[m], V = 0; V !== d; V++) for (k = a[V], I = 0; I !== V; I++) (E = a[I]), this.needBroadphaseCollision(k, E) && this.intersectionTest(k, E, b, c);
                        this.makePairsUnique(b, c);
                    };
                },
                { "../math/Vec3": 30, "../shapes/Shape": 43, "./Broadphase": 5 },
            ],
            7: [
                function (b, d, f) {
                    function a() {
                        e.apply(this);
                    }
                    d.exports = a;
                    var e = b("./Broadphase");
                    b = b("./AABB");
                    a.prototype = new e();
                    a.prototype.constructor = a;
                    a.prototype.collisionPairs = function (a, b, e) {
                        a = a.bodies;
                        var c = a.length,
                            d,
                            h;
                        for (d = 0; d !== c; d++)
                            for (h = 0; h !== d; h++) {
                                var l = a[d];
                                var f = a[h];
                                this.needBroadphaseCollision(l, f) && this.intersectionTest(l, f, b, e);
                            }
                    };
                    new b();
                    a.prototype.aabbQuery = function (a, b, e) {
                        e = e || [];
                        for (var c = 0; c < a.bodies.length; c++) {
                            var d = a.bodies[c];
                            d.aabbNeedsUpdate && d.computeAABB();
                            d.aabb.overlaps(b) && e.push(d);
                        }
                        return e;
                    };
                },
                { "./AABB": 3, "./Broadphase": 5 },
            ],
            8: [
                function (b, d, f) {
                    function a() {
                        this.matrix = {};
                    }
                    d.exports = a;
                    a.prototype.get = function (a, b) {
                        a = a.id;
                        b = b.id;
                        if (b > a) {
                            var c = b;
                            b = a;
                            a = c;
                        }
                        return a + "-" + b in this.matrix;
                    };
                    a.prototype.set = function (a, b, d) {
                        a = a.id;
                        b = b.id;
                        if (b > a) {
                            var c = b;
                            b = a;
                            a = c;
                        }
                        d ? (this.matrix[a + "-" + b] = !0) : delete this.matrix[a + "-" + b];
                    };
                    a.prototype.reset = function () {
                        this.matrix = {};
                    };
                    a.prototype.setNumObjects = function (a) {};
                },
                {},
            ],
            9: [
                function (b, d, f) {
                    function a(b, e) {
                        this.from = b ? b.clone() : new c();
                        this.to = e ? e.clone() : new c();
                        this._direction = new c();
                        this.precision = 1e-4;
                        this.checkCollisionResponse = !0;
                        this.skipBackfaces = !1;
                        this.collisionFilterGroup = this.collisionFilterMask = -1;
                        this.mode = a.ANY;
                        this.result = new l();
                        this.hasHit = !1;
                        this.callback = function (a) {};
                    }
                    function e(a, b, c, e) {
                        e.vsub(b, K);
                        c.vsub(b, p);
                        a.vsub(b, n);
                        a = K.dot(K);
                        b = K.dot(p);
                        c = K.dot(n);
                        e = p.dot(p);
                        var d = p.dot(n),
                            k,
                            m;
                        return 0 <= (k = e * c - b * d) && 0 <= (m = a * d - b * c) && k + m < a * e - b * b;
                    }
                    d.exports = a;
                    var c = b("../math/Vec3");
                    d = b("../math/Quaternion");
                    var h = b("../math/Transform");
                    b("../shapes/ConvexPolyhedron");
                    b("../shapes/Box");
                    var l = b("../collision/RaycastResult");
                    f = b("../shapes/Shape");
                    b = b("../collision/AABB");
                    a.prototype.constructor = a;
                    a.CLOSEST = 1;
                    a.ANY = 2;
                    a.ALL = 4;
                    var k = new b(),
                        m = [];
                    a.prototype.intersectWorld = function (b, c) {
                        this.mode = c.mode || a.ANY;
                        this.result = c.result || new l();
                        this.skipBackfaces = !!c.skipBackfaces;
                        this.collisionFilterMask = "undefined" !== typeof c.collisionFilterMask ? c.collisionFilterMask : -1;
                        this.collisionFilterGroup = "undefined" !== typeof c.collisionFilterGroup ? c.collisionFilterGroup : -1;
                        c.from && this.from.copy(c.from);
                        c.to && this.to.copy(c.to);
                        this.callback = c.callback || function () {};
                        this.hasHit = !1;
                        this.result.reset();
                        this._updateDirection();
                        this.getAABB(k);
                        m.length = 0;
                        b.broadphase.aabbQuery(b, k, m);
                        this.intersectBodies(m);
                        return this.hasHit;
                    };
                    var p = new c(),
                        n = new c();
                    a.pointInTriangle = e;
                    var q = new c(),
                        u = new d();
                    a.prototype.intersectBody = function (a, b) {
                        b && ((this.result = b), this._updateDirection());
                        var c = this.checkCollisionResponse;
                        if ((!c || a.collisionResponse) && 0 !== (this.collisionFilterGroup & a.collisionFilterMask) && 0 !== (a.collisionFilterGroup & this.collisionFilterMask))
                            for (var e = 0, d = a.shapes.length; e < d; e++) {
                                var k = a.shapes[e];
                                if (!c || k.collisionResponse)
                                    if ((a.quaternion.mult(a.shapeOrientations[e], u), a.quaternion.vmult(a.shapeOffsets[e], q), q.vadd(a.position, q), this.intersectShape(k, u, q, a), this.result._shouldStop)) break;
                            }
                    };
                    a.prototype.intersectBodies = function (a, b) {
                        b && ((this.result = b), this._updateDirection());
                        for (var c = 0, e = a.length; !this.result._shouldStop && c < e; c++) this.intersectBody(a[c]);
                    };
                    a.prototype._updateDirection = function () {
                        this.to.vsub(this.from, this._direction);
                        this._direction.normalize();
                    };
                    a.prototype.intersectShape = function (a, b, c, e) {
                        var d = this.from,
                            k = this._direction;
                        c.vsub(d, K);
                        var m = K.dot(k);
                        k.mult(m, C);
                        C.vadd(d, C);
                        c.distanceTo(C) > a.boundingSphereRadius || ((d = this[a.type]) && d.call(this, a, b, c, e));
                    };
                    new c();
                    new c();
                    var r = new c(),
                        w = new c(),
                        v = new c(),
                        x = new c();
                    new c();
                    new l();
                    a.prototype.intersectBox = function (a, b, c, e) {
                        return this.intersectConvex(a.convexPolyhedronRepresentation, b, c, e);
                    };
                    a.prototype[f.types.BOX] = a.prototype.intersectBox;
                    a.prototype.intersectPlane = function (a, b, e, d) {
                        var k = this.from,
                            m = this.to,
                            h = this._direction,
                            f = new c(0, 0, 1);
                        b.vmult(f, f);
                        var l = new c();
                        k.vsub(e, l);
                        b = l.dot(f);
                        m.vsub(e, l);
                        l = l.dot(f);
                        if (!(0 < b * l || k.distanceTo(m) < b || ((l = f.dot(h)), Math.abs(l) < this.precision))) {
                            var p = new c();
                            m = new c();
                            b = new c();
                            k.vsub(e, p);
                            e = -f.dot(p) / l;
                            h.scale(e, m);
                            k.vadd(m, b);
                            this.reportIntersection(f, b, a, d, -1);
                        }
                    };
                    a.prototype[f.types.PLANE] = a.prototype.intersectPlane;
                    a.prototype.getAABB = function (a) {
                        var b = this.to,
                            c = this.from;
                        a.lowerBound.x = Math.min(b.x, c.x);
                        a.lowerBound.y = Math.min(b.y, c.y);
                        a.lowerBound.z = Math.min(b.z, c.z);
                        a.upperBound.x = Math.max(b.x, c.x);
                        a.upperBound.y = Math.max(b.y, c.y);
                        a.upperBound.z = Math.max(b.z, c.z);
                    };
                    var y = { faceList: [0] };
                    a.prototype.intersectHeightfield = function (b, e, d, k) {
                        var m = new c(),
                            l = new a(this.from, this.to);
                        h.pointToLocalFrame(d, e, l.from, l.from);
                        h.pointToLocalFrame(d, e, l.to, l.to);
                        var f = [],
                            p = null,
                            n = null,
                            q = null,
                            r = null,
                            u = b.getIndexOfPosition(l.from.x, l.from.y, f, !1);
                        u && ((p = f[0]), (n = f[1]), (q = f[0]), (r = f[1]));
                        if ((u = b.getIndexOfPosition(l.to.x, l.to.y, f, !1))) {
                            if (null === p || f[0] < p) p = f[0];
                            if (null === q || f[0] > q) q = f[0];
                            if (null === n || f[1] < n) n = f[1];
                            if (null === r || f[1] > r) r = f[1];
                        }
                        if (null !== p)
                            for (b.getRectMinMax(p, n, q, r, []), l = p; l <= q; l++)
                                for (f = n; f <= r; f++) {
                                    if (this.result._shouldStop) return;
                                    b.getConvexTrianglePillar(l, f, !1);
                                    h.pointToWorldFrame(d, e, b.pillarOffset, m);
                                    this.intersectConvex(b.pillarConvex, e, m, k, y);
                                    if (this.result._shouldStop) return;
                                    b.getConvexTrianglePillar(l, f, !0);
                                    h.pointToWorldFrame(d, e, b.pillarOffset, m);
                                    this.intersectConvex(b.pillarConvex, e, m, k, y);
                                }
                    };
                    a.prototype[f.types.HEIGHTFIELD] = a.prototype.intersectHeightfield;
                    var z = new c(),
                        E = new c();
                    a.prototype.intersectSphere = function (a, b, c, e) {
                        b = this.from;
                        var d = this.to,
                            k = Math.pow(d.x - b.x, 2) + Math.pow(d.y - b.y, 2) + Math.pow(d.z - b.z, 2),
                            m = 2 * ((d.x - b.x) * (b.x - c.x) + (d.y - b.y) * (b.y - c.y) + (d.z - b.z) * (b.z - c.z)),
                            h = Math.pow(m, 2) - 4 * k * (Math.pow(b.x - c.x, 2) + Math.pow(b.y - c.y, 2) + Math.pow(b.z - c.z, 2) - Math.pow(a.radius, 2));
                        if (!(0 > h))
                            if (0 === h) b.lerp(d, h, z), z.vsub(c, E), E.normalize(), this.reportIntersection(E, z, a, e, -1);
                            else {
                                var f = (-m - Math.sqrt(h)) / (2 * k);
                                k = (-m + Math.sqrt(h)) / (2 * k);
                                0 <= f && 1 >= f && (b.lerp(d, f, z), z.vsub(c, E), E.normalize(), this.reportIntersection(E, z, a, e, -1));
                                !this.result._shouldStop && 0 <= k && 1 >= k && (b.lerp(d, k, z), z.vsub(c, E), E.normalize(), this.reportIntersection(E, z, a, e, -1));
                            }
                    };
                    a.prototype[f.types.SPHERE] = a.prototype.intersectSphere;
                    var A = new c();
                    new c();
                    new c();
                    var F = new c();
                    a.prototype.intersectConvex = function (a, b, c, d, k) {
                        k = (k && k.faceList) || null;
                        for (var m = a.faces, h = a.vertices, f = a.faceNormals, l = this._direction, p = this.from, n = p.distanceTo(this.to), q = k ? k.length : m.length, u = this.result, t = 0; !u._shouldStop && t < q; t++) {
                            var C = k ? k[t] : t,
                                U = m[C],
                                G = f[C],
                                H = b,
                                T = c;
                            F.copy(h[U[0]]);
                            H.vmult(F, F);
                            F.vadd(T, F);
                            F.vsub(p, F);
                            H.vmult(G, A);
                            G = l.dot(A);
                            if (!(Math.abs(G) < this.precision || ((G = A.dot(F) / G), 0 > G)))
                                for (l.mult(G, r), r.vadd(p, r), w.copy(h[U[0]]), H.vmult(w, w), T.vadd(w, w), G = 1; !u._shouldStop && G < U.length - 1; G++) {
                                    v.copy(h[U[G]]);
                                    x.copy(h[U[G + 1]]);
                                    H.vmult(v, v);
                                    H.vmult(x, x);
                                    T.vadd(v, v);
                                    T.vadd(x, x);
                                    var P = r.distanceTo(p);
                                    (!e(r, w, v, x) && !e(r, v, w, x)) || P > n || this.reportIntersection(A, r, a, d, C);
                                }
                        }
                    };
                    a.prototype[f.types.CONVEXPOLYHEDRON] = a.prototype.intersectConvex;
                    var L = new c(),
                        H = new c(),
                        P = new c(),
                        R = new c(),
                        M = new c(),
                        N = new c();
                    new b();
                    var J = [],
                        O = new h();
                    a.prototype.intersectTrimesh = function (a, b, c, d, k) {
                        k = a.indices;
                        var m = this.from,
                            f = this.to,
                            l = this._direction;
                        O.position.copy(c);
                        O.quaternion.copy(b);
                        h.vectorToLocalFrame(c, b, l, H);
                        h.pointToLocalFrame(c, b, m, P);
                        h.pointToLocalFrame(c, b, f, R);
                        m = P.distanceSquared(R);
                        a.tree.rayQuery(this, O, J);
                        f = 0;
                        for (l = J.length; !this.result._shouldStop && f !== l; f++) {
                            var p = J[f];
                            a.getNormal(p, L);
                            a.getVertex(k[3 * p], w);
                            w.vsub(P, F);
                            var n = H.dot(L);
                            n = L.dot(F) / n;
                            0 > n ||
                                (H.scale(n, r),
                                r.vadd(P, r),
                                a.getVertex(k[3 * p + 1], v),
                                a.getVertex(k[3 * p + 2], x),
                                (n = r.distanceSquared(P)),
                                (!e(r, v, w, x) && !e(r, w, v, x)) || n > m || (h.vectorToWorldFrame(b, L, M), h.pointToWorldFrame(c, b, r, N), this.reportIntersection(M, N, a, d, p)));
                        }
                        J.length = 0;
                    };
                    a.prototype[f.types.TRIMESH] = a.prototype.intersectTrimesh;
                    a.prototype.reportIntersection = function (b, c, e, d, k) {
                        var m = this.from,
                            h = this.to,
                            f = m.distanceTo(c),
                            l = this.result;
                        if (!(this.skipBackfaces && 0 < b.dot(this._direction)))
                            switch (((l.hitFaceIndex = "undefined" !== typeof k ? k : -1), this.mode)) {
                                case a.ALL:
                                    this.hasHit = !0;
                                    l.set(m, h, b, c, e, d, f);
                                    l.hasHit = !0;
                                    this.callback(l);
                                    break;
                                case a.CLOSEST:
                                    if (f < l.distance || !l.hasHit) (this.hasHit = !0), (l.hasHit = !0), l.set(m, h, b, c, e, d, f);
                                    break;
                                case a.ANY:
                                    (this.hasHit = !0), (l.hasHit = !0), l.set(m, h, b, c, e, d, f), (l._shouldStop = !0);
                            }
                    };
                    var K = new c(),
                        C = new c();
                },
                { "../collision/AABB": 3, "../collision/RaycastResult": 10, "../math/Quaternion": 28, "../math/Transform": 29, "../math/Vec3": 30, "../shapes/Box": 37, "../shapes/ConvexPolyhedron": 38, "../shapes/Shape": 43 },
            ],
            10: [
                function (b, d, f) {
                    function a() {
                        this.rayFromWorld = new e();
                        this.rayToWorld = new e();
                        this.hitNormalWorld = new e();
                        this.hitPointWorld = new e();
                        this.hasHit = !1;
                        this.body = this.shape = null;
                        this.distance = this.hitFaceIndex = -1;
                        this._shouldStop = !1;
                    }
                    var e = b("../math/Vec3");
                    d.exports = a;
                    a.prototype.reset = function () {
                        this.rayFromWorld.setZero();
                        this.rayToWorld.setZero();
                        this.hitNormalWorld.setZero();
                        this.hitPointWorld.setZero();
                        this.hasHit = !1;
                        this.body = this.shape = null;
                        this.distance = this.hitFaceIndex = -1;
                        this._shouldStop = !1;
                    };
                    a.prototype.abort = function () {
                        this._shouldStop = !0;
                    };
                    a.prototype.set = function (a, b, e, d, m, f, n) {
                        this.rayFromWorld.copy(a);
                        this.rayToWorld.copy(b);
                        this.hitNormalWorld.copy(e);
                        this.hitPointWorld.copy(d);
                        this.shape = m;
                        this.body = f;
                        this.distance = n;
                    };
                },
                { "../math/Vec3": 30 },
            ],
            11: [
                function (b, d, f) {
                    function a(a) {
                        e.apply(this);
                        this.axisList = [];
                        this.world = null;
                        this.axisIndex = 0;
                        var b = this.axisList;
                        this._addBodyHandler = function (a) {
                            b.push(a.body);
                        };
                        this._removeBodyHandler = function (a) {
                            a = b.indexOf(a.body);
                            -1 !== a && b.splice(a, 1);
                        };
                        a && this.setWorld(a);
                    }
                    b("../shapes/Shape");
                    var e = b("../collision/Broadphase");
                    d.exports = a;
                    a.prototype = new e();
                    a.prototype.setWorld = function (a) {
                        for (var b = (this.axisList.length = 0); b < a.bodies.length; b++) this.axisList.push(a.bodies[b]);
                        a.removeEventListener("addBody", this._addBodyHandler);
                        a.removeEventListener("removeBody", this._removeBodyHandler);
                        a.addEventListener("addBody", this._addBodyHandler);
                        a.addEventListener("removeBody", this._removeBodyHandler);
                        this.world = a;
                        this.dirty = !0;
                    };
                    a.insertionSortX = function (a) {
                        for (var b = 1, c = a.length; b < c; b++) {
                            for (var e = a[b], d = b - 1; 0 <= d && !(a[d].aabb.lowerBound.x <= e.aabb.lowerBound.x); d--) a[d + 1] = a[d];
                            a[d + 1] = e;
                        }
                        return a;
                    };
                    a.insertionSortY = function (a) {
                        for (var b = 1, c = a.length; b < c; b++) {
                            for (var e = a[b], d = b - 1; 0 <= d && !(a[d].aabb.lowerBound.y <= e.aabb.lowerBound.y); d--) a[d + 1] = a[d];
                            a[d + 1] = e;
                        }
                        return a;
                    };
                    a.insertionSortZ = function (a) {
                        for (var b = 1, c = a.length; b < c; b++) {
                            for (var e = a[b], d = b - 1; 0 <= d && !(a[d].aabb.lowerBound.z <= e.aabb.lowerBound.z); d--) a[d + 1] = a[d];
                            a[d + 1] = e;
                        }
                        return a;
                    };
                    a.prototype.collisionPairs = function (b, e, d) {
                        b = this.axisList;
                        var c = b.length,
                            m = this.axisIndex,
                            h,
                            f;
                        this.dirty && (this.sortList(), (this.dirty = !1));
                        for (h = 0; h !== c; h++) {
                            var l = b[h];
                            for (f = h + 1; f < c; f++) {
                                var u = b[f];
                                if (this.needBroadphaseCollision(l, u)) {
                                    if (!a.checkBounds(l, u, m)) break;
                                    this.intersectionTest(l, u, e, d);
                                }
                            }
                        }
                    };
                    a.prototype.sortList = function () {
                        for (var b = this.axisList, e = this.axisIndex, d = b.length, k = 0; k !== d; k++) {
                            var m = b[k];
                            m.aabbNeedsUpdate && m.computeAABB();
                        }
                        0 === e ? a.insertionSortX(b) : 1 === e ? a.insertionSortY(b) : 2 === e && a.insertionSortZ(b);
                    };
                    a.checkBounds = function (a, b, e) {
                        if (0 === e) {
                            var c = a.position.x;
                            var d = b.position.x;
                        } else 1 === e ? ((c = a.position.y), (d = b.position.y)) : 2 === e && ((c = a.position.z), (d = b.position.z));
                        return d - b.boundingRadius < c + a.boundingRadius;
                    };
                    a.prototype.autoDetectAxis = function () {
                        for (var a = 0, b = 0, e = 0, d = 0, m = 0, f = 0, n = this.axisList, q = n.length, u = 1 / q, r = 0; r !== q; r++) {
                            var w = n[r],
                                v = w.position.x;
                            a += v;
                            b += v * v;
                            v = w.position.y;
                            e += v;
                            d += v * v;
                            w = w.position.z;
                            m += w;
                            f += w * w;
                        }
                        a = b - a * a * u;
                        e = d - e * e * u;
                        m = f - m * m * u;
                        this.axisIndex = a > e ? (a > m ? 0 : 2) : e > m ? 1 : 2;
                    };
                    a.prototype.aabbQuery = function (a, b, e) {
                        e = e || [];
                        this.dirty && (this.sortList(), (this.dirty = !1));
                        a = this.axisList;
                        for (var c = 0; c < a.length; c++) {
                            var d = a[c];
                            d.aabbNeedsUpdate && d.computeAABB();
                            d.aabb.overlaps(b) && e.push(d);
                        }
                        return e;
                    };
                },
                { "../collision/Broadphase": 5, "../shapes/Shape": 43 },
            ],
            12: [
                function (b, d, f) {
                    function a(a, b, d) {
                        d = d || {};
                        var k = "undefined" !== typeof d.maxForce ? d.maxForce : 1e6,
                            m = d.pivotA ? d.pivotA.clone() : new l(),
                            f = d.pivotB ? d.pivotB.clone() : new l();
                        this.axisA = d.axisA ? d.axisA.clone() : new l();
                        this.axisB = d.axisB ? d.axisB.clone() : new l();
                        e.call(this, a, m, b, f, k);
                        this.collideConnected = !!d.collideConnected;
                        this.angle = "undefined" !== typeof d.angle ? d.angle : 0;
                        m = this.coneEquation = new c(a, b, d);
                        a = this.twistEquation = new h(a, b, d);
                        this.twistAngle = "undefined" !== typeof d.twistAngle ? d.twistAngle : 0;
                        m.maxForce = 0;
                        m.minForce = -k;
                        a.maxForce = 0;
                        a.minForce = -k;
                        this.equations.push(m, a);
                    }
                    d.exports = a;
                    b("./Constraint");
                    var e = b("./PointToPointConstraint"),
                        c = b("../equations/ConeEquation"),
                        h = b("../equations/RotationalEquation");
                    b("../equations/ContactEquation");
                    var l = b("../math/Vec3");
                    a.prototype = new e();
                    a.constructor = a;
                    new l();
                    new l();
                    a.prototype.update = function () {
                        var a = this.bodyA,
                            b = this.bodyB,
                            c = this.coneEquation,
                            d = this.twistEquation;
                        e.prototype.update.call(this);
                        a.vectorToWorldFrame(this.axisA, c.axisA);
                        b.vectorToWorldFrame(this.axisB, c.axisB);
                        this.axisA.tangents(d.axisA, d.axisA);
                        a.vectorToWorldFrame(d.axisA, d.axisA);
                        this.axisB.tangents(d.axisB, d.axisB);
                        b.vectorToWorldFrame(d.axisB, d.axisB);
                        c.angle = this.angle;
                        d.maxAngle = this.twistAngle;
                    };
                },
                { "../equations/ConeEquation": 18, "../equations/ContactEquation": 19, "../equations/RotationalEquation": 22, "../math/Vec3": 30, "./Constraint": 13, "./PointToPointConstraint": 17 },
            ],
            13: [
                function (b, d, f) {
                    function a(b, d, f) {
                        f = e.defaults(f, { collideConnected: !0, wakeUpBodies: !0 });
                        this.equations = [];
                        this.bodyA = b;
                        this.bodyB = d;
                        this.id = a.idCounter++;
                        this.collideConnected = f.collideConnected;
                        f.wakeUpBodies && (b && b.wakeUp(), d && d.wakeUp());
                    }
                    d.exports = a;
                    var e = b("../utils/Utils");
                    a.prototype.update = function () {
                        throw Error("method update() not implmemented in this Constraint subclass!");
                    };
                    a.prototype.enable = function () {
                        for (var a = this.equations, b = 0; b < a.length; b++) a[b].enabled = !0;
                    };
                    a.prototype.disable = function () {
                        for (var a = this.equations, b = 0; b < a.length; b++) a[b].enabled = !1;
                    };
                    a.idCounter = 0;
                },
                { "../utils/Utils": 53 },
            ],
            14: [
                function (b, d, f) {
                    function a(a, b, d, m) {
                        e.call(this, a, b);
                        "undefined" === typeof d && (d = a.position.distanceTo(b.position));
                        "undefined" === typeof m && (m = 1e6);
                        this.distance = d;
                        a = this.distanceEquation = new c(a, b);
                        this.equations.push(a);
                        a.minForce = -m;
                        a.maxForce = m;
                    }
                    d.exports = a;
                    var e = b("./Constraint"),
                        c = b("../equations/ContactEquation");
                    a.prototype = new e();
                    a.prototype.update = function () {
                        var a = this.distanceEquation,
                            b = 0.5 * this.distance,
                            c = a.ni;
                        this.bodyB.position.vsub(this.bodyA.position, c);
                        c.normalize();
                        c.mult(b, a.ri);
                        c.mult(-b, a.rj);
                    };
                },
                { "../equations/ContactEquation": 19, "./Constraint": 13 },
            ],
            15: [
                function (b, d, f) {
                    function a(a, b, d) {
                        d = d || {};
                        var k = "undefined" !== typeof d.maxForce ? d.maxForce : 1e6,
                            m = d.pivotA ? d.pivotA.clone() : new l(),
                            f = d.pivotB ? d.pivotB.clone() : new l();
                        e.call(this, a, m, b, f, k);
                        (this.axisA = d.axisA ? d.axisA.clone() : new l(1, 0, 0)).normalize();
                        (this.axisB = d.axisB ? d.axisB.clone() : new l(1, 0, 0)).normalize();
                        m = this.rotationalEquation1 = new c(a, b, d);
                        d = this.rotationalEquation2 = new c(a, b, d);
                        a = this.motorEquation = new h(a, b, k);
                        a.enabled = !1;
                        this.equations.push(m, d, a);
                    }
                    d.exports = a;
                    b("./Constraint");
                    var e = b("./PointToPointConstraint"),
                        c = b("../equations/RotationalEquation"),
                        h = b("../equations/RotationalMotorEquation");
                    b("../equations/ContactEquation");
                    var l = b("../math/Vec3");
                    a.prototype = new e();
                    a.constructor = a;
                    a.prototype.enableMotor = function () {
                        this.motorEquation.enabled = !0;
                    };
                    a.prototype.disableMotor = function () {
                        this.motorEquation.enabled = !1;
                    };
                    a.prototype.setMotorSpeed = function (a) {
                        this.motorEquation.targetVelocity = a;
                    };
                    a.prototype.setMotorMaxForce = function (a) {
                        this.motorEquation.maxForce = a;
                        this.motorEquation.minForce = -a;
                    };
                    var k = new l(),
                        m = new l();
                    a.prototype.update = function () {
                        var a = this.bodyA,
                            b = this.bodyB,
                            c = this.motorEquation,
                            d = this.rotationalEquation1,
                            f = this.rotationalEquation2,
                            h = this.axisA,
                            l = this.axisB;
                        e.prototype.update.call(this);
                        a.quaternion.vmult(h, k);
                        b.quaternion.vmult(l, m);
                        k.tangents(d.axisA, f.axisA);
                        d.axisB.copy(m);
                        f.axisB.copy(m);
                        this.motorEquation.enabled && (a.quaternion.vmult(this.axisA, c.axisA), b.quaternion.vmult(this.axisB, c.axisB));
                    };
                },
                { "../equations/ContactEquation": 19, "../equations/RotationalEquation": 22, "../equations/RotationalMotorEquation": 23, "../math/Vec3": 30, "./Constraint": 13, "./PointToPointConstraint": 17 },
            ],
            16: [
                function (b, d, f) {
                    function a(a, b, d) {
                        d = d || {};
                        var k = "undefined" !== typeof d.maxForce ? d.maxForce : 1e6,
                            m = new h(),
                            f = new h(),
                            l = new h();
                        a.position.vadd(b.position, l);
                        l.scale(0.5, l);
                        b.pointToLocalFrame(l, f);
                        a.pointToLocalFrame(l, m);
                        e.call(this, a, m, b, f, k);
                        k = this.rotationalEquation1 = new c(a, b, d);
                        m = this.rotationalEquation2 = new c(a, b, d);
                        a = this.rotationalEquation3 = new c(a, b, d);
                        this.equations.push(k, m, a);
                    }
                    d.exports = a;
                    b("./Constraint");
                    var e = b("./PointToPointConstraint"),
                        c = b("../equations/RotationalEquation");
                    b("../equations/RotationalMotorEquation");
                    b("../equations/ContactEquation");
                    var h = b("../math/Vec3");
                    a.prototype = new e();
                    a.constructor = a;
                    new h();
                    new h();
                    a.prototype.update = function () {
                        var a = this.bodyA,
                            b = this.bodyB,
                            c = this.rotationalEquation1,
                            d = this.rotationalEquation2,
                            f = this.rotationalEquation3;
                        e.prototype.update.call(this);
                        a.vectorToWorldFrame(h.UNIT_X, c.axisA);
                        b.vectorToWorldFrame(h.UNIT_Y, c.axisB);
                        a.vectorToWorldFrame(h.UNIT_Y, d.axisA);
                        b.vectorToWorldFrame(h.UNIT_Z, d.axisB);
                        a.vectorToWorldFrame(h.UNIT_Z, f.axisA);
                        b.vectorToWorldFrame(h.UNIT_X, f.axisB);
                    };
                },
                { "../equations/ContactEquation": 19, "../equations/RotationalEquation": 22, "../equations/RotationalMotorEquation": 23, "../math/Vec3": 30, "./Constraint": 13, "./PointToPointConstraint": 17 },
            ],
            17: [
                function (b, d, f) {
                    function a(a, b, d, f, n) {
                        e.call(this, a, d);
                        n = "undefined" !== typeof n ? n : 1e6;
                        this.pivotA = b ? b.clone() : new h();
                        this.pivotB = f ? f.clone() : new h();
                        b = this.equationX = new c(a, d);
                        f = this.equationY = new c(a, d);
                        a = this.equationZ = new c(a, d);
                        this.equations.push(b, f, a);
                        b.minForce = f.minForce = a.minForce = -n;
                        b.maxForce = f.maxForce = a.maxForce = n;
                        b.ni.set(1, 0, 0);
                        f.ni.set(0, 1, 0);
                        a.ni.set(0, 0, 1);
                    }
                    d.exports = a;
                    var e = b("./Constraint"),
                        c = b("../equations/ContactEquation"),
                        h = b("../math/Vec3");
                    a.prototype = new e();
                    a.prototype.update = function () {
                        var a = this.bodyB,
                            b = this.equationX,
                            c = this.equationY,
                            e = this.equationZ;
                        this.bodyA.quaternion.vmult(this.pivotA, b.ri);
                        a.quaternion.vmult(this.pivotB, b.rj);
                        c.ri.copy(b.ri);
                        c.rj.copy(b.rj);
                        e.ri.copy(b.ri);
                        e.rj.copy(b.rj);
                    };
                },
                { "../equations/ContactEquation": 19, "../math/Vec3": 30, "./Constraint": 13 },
            ],
            18: [
                function (b, d, f) {
                    function a(a, b, d) {
                        d = d || {};
                        var k = "undefined" !== typeof d.maxForce ? d.maxForce : 1e6;
                        c.call(this, a, b, -k, k);
                        this.axisA = d.axisA ? d.axisA.clone() : new e(1, 0, 0);
                        this.axisB = d.axisB ? d.axisB.clone() : new e(0, 1, 0);
                        this.angle = "undefined" !== typeof d.angle ? d.angle : 0;
                    }
                    d.exports = a;
                    var e = b("../math/Vec3");
                    b("../math/Mat3");
                    var c = b("./Equation");
                    a.prototype = new c();
                    a.prototype.constructor = a;
                    var h = new e(),
                        l = new e();
                    a.prototype.computeB = function (a) {
                        var b = this.a,
                            c = this.b,
                            e = this.axisA,
                            d = this.axisB,
                            k = this.jacobianElementA,
                            f = this.jacobianElementB;
                        e.cross(d, h);
                        d.cross(e, l);
                        k.rotational.copy(l);
                        f.rotational.copy(h);
                        e = Math.cos(this.angle) - e.dot(d);
                        d = this.computeGW();
                        k = this.computeGiMf();
                        return -e * b - d * c - a * k;
                    };
                },
                { "../math/Mat3": 27, "../math/Vec3": 30, "./Equation": 20 },
            ],
            19: [
                function (b, d, f) {
                    function a(a, b, d) {
                        e.call(this, a, b, 0, "undefined" !== typeof d ? d : 1e6);
                        this.restitution = 0;
                        this.ri = new c();
                        this.rj = new c();
                        this.ni = new c();
                    }
                    d.exports = a;
                    var e = b("./Equation"),
                        c = b("../math/Vec3");
                    b("../math/Mat3");
                    a.prototype = new e();
                    a.prototype.constructor = a;
                    var h = new c(),
                        l = new c(),
                        k = new c();
                    a.prototype.computeB = function (a) {
                        var b = this.a,
                            c = this.b,
                            e = this.bi,
                            d = this.bj,
                            f = this.ri,
                            m = this.rj,
                            n = e.velocity,
                            p = e.angularVelocity,
                            q = d.velocity,
                            r = d.angularVelocity,
                            u = this.jacobianElementA,
                            R = this.jacobianElementB,
                            M = this.ni;
                        f.cross(M, h);
                        m.cross(M, l);
                        M.negate(u.spatial);
                        h.negate(u.rotational);
                        R.spatial.copy(M);
                        R.rotational.copy(l);
                        k.copy(d.position);
                        k.vadd(m, k);
                        k.vsub(e.position, k);
                        k.vsub(f, k);
                        e = M.dot(k);
                        d = this.restitution + 1;
                        n = d * q.dot(M) - d * n.dot(M) + r.dot(l) - p.dot(h);
                        p = this.computeGiMf();
                        return -e * b - n * c - a * p;
                    };
                    var m = new c(),
                        p = new c(),
                        n = new c(),
                        q = new c(),
                        u = new c();
                    a.prototype.getImpactVelocityAlongNormal = function () {
                        this.bi.position.vadd(this.ri, n);
                        this.bj.position.vadd(this.rj, q);
                        this.bi.getVelocityAtWorldPoint(n, m);
                        this.bj.getVelocityAtWorldPoint(q, p);
                        m.vsub(p, u);
                        return this.ni.dot(u);
                    };
                },
                { "../math/Mat3": 27, "../math/Vec3": 30, "./Equation": 20 },
            ],
            20: [
                function (b, d, f) {
                    function a(b, c, d, k) {
                        this.id = a.id++;
                        this.minForce = "undefined" === typeof d ? -1e6 : d;
                        this.maxForce = "undefined" === typeof k ? 1e6 : k;
                        this.bi = b;
                        this.bj = c;
                        this.eps = this.b = this.a = 0;
                        this.jacobianElementA = new e();
                        this.jacobianElementB = new e();
                        this.enabled = !0;
                        this.setSpookParams(1e7, 4, 1 / 60);
                    }
                    d.exports = a;
                    var e = b("../math/JacobianElement");
                    b = b("../math/Vec3");
                    a.prototype.constructor = a;
                    a.id = 0;
                    a.prototype.setSpookParams = function (a, b, c) {
                        this.a = 4 / (c * (1 + 4 * b));
                        this.b = (4 * b) / (1 + 4 * b);
                        this.eps = 4 / (c * c * a * (1 + 4 * b));
                    };
                    a.prototype.computeB = function (a, b, c) {
                        var e = this.computeGW(),
                            d = this.computeGq(),
                            k = this.computeGiMf();
                        return -d * a - e * b - k * c;
                    };
                    a.prototype.computeGq = function () {
                        var a = this.jacobianElementB,
                            b = this.bj.position;
                        return this.jacobianElementA.spatial.dot(this.bi.position) + a.spatial.dot(b);
                    };
                    var c = new b();
                    a.prototype.computeGW = function () {
                        var a = this.jacobianElementB,
                            b = this.bi,
                            e = this.bj,
                            d = e.velocity;
                        e = e.angularVelocity || c;
                        return this.jacobianElementA.multiplyVectors(b.velocity, b.angularVelocity || c) + a.multiplyVectors(d, e);
                    };
                    a.prototype.computeGWlambda = function () {
                        var a = this.jacobianElementB,
                            b = this.bi,
                            e = this.bj,
                            d = e.vlambda;
                        e = e.wlambda || c;
                        return this.jacobianElementA.multiplyVectors(b.vlambda, b.wlambda || c) + a.multiplyVectors(d, e);
                    };
                    var h = new b(),
                        l = new b(),
                        k = new b(),
                        m = new b();
                    a.prototype.computeGiMf = function () {
                        var a = this.jacobianElementA,
                            b = this.jacobianElementB,
                            c = this.bi,
                            e = this.bj,
                            d = c.force,
                            f = c.torque,
                            n = e.force,
                            p = e.torque,
                            E = c.invMassSolve,
                            A = e.invMassSolve;
                        c.invInertiaWorldSolve ? c.invInertiaWorldSolve.vmult(f, k) : k.set(0, 0, 0);
                        e.invInertiaWorldSolve ? e.invInertiaWorldSolve.vmult(p, m) : m.set(0, 0, 0);
                        d.mult(E, h);
                        n.mult(A, l);
                        return a.multiplyVectors(h, k) + b.multiplyVectors(l, m);
                    };
                    var p = new b();
                    a.prototype.computeGiMGt = function () {
                        var a = this.jacobianElementA,
                            b = this.jacobianElementB,
                            c = this.bi,
                            e = this.bj,
                            d = c.invInertiaWorldSolve,
                            k = e.invInertiaWorldSolve;
                        c = c.invMassSolve + e.invMassSolve;
                        d && (d.vmult(a.rotational, p), (c += p.dot(a.rotational)));
                        k && (k.vmult(b.rotational, p), (c += p.dot(b.rotational)));
                        return c;
                    };
                    var n = new b();
                    new b();
                    new b();
                    new b();
                    new b();
                    new b();
                    a.prototype.addToWlambda = function (a) {
                        var b = this.jacobianElementA,
                            c = this.jacobianElementB,
                            e = this.bi,
                            d = this.bj;
                        b.spatial.mult(e.invMassSolve * a, n);
                        e.vlambda.vadd(n, e.vlambda);
                        c.spatial.mult(d.invMassSolve * a, n);
                        d.vlambda.vadd(n, d.vlambda);
                        e.invInertiaWorldSolve && (e.invInertiaWorldSolve.vmult(b.rotational, n), n.mult(a, n), e.wlambda.vadd(n, e.wlambda));
                        d.invInertiaWorldSolve && (d.invInertiaWorldSolve.vmult(c.rotational, n), n.mult(a, n), d.wlambda.vadd(n, d.wlambda));
                    };
                    a.prototype.computeC = function () {
                        return this.computeGiMGt() + this.eps;
                    };
                },
                { "../math/JacobianElement": 26, "../math/Vec3": 30 },
            ],
            21: [
                function (b, d, f) {
                    function a(a, b, d) {
                        e.call(this, a, b, -d, d);
                        this.ri = new c();
                        this.rj = new c();
                        this.t = new c();
                    }
                    d.exports = a;
                    var e = b("./Equation"),
                        c = b("../math/Vec3");
                    b("../math/Mat3");
                    a.prototype = new e();
                    a.prototype.constructor = a;
                    var h = new c(),
                        l = new c();
                    a.prototype.computeB = function (a) {
                        var b = this.b,
                            c = this.rj,
                            e = this.t;
                        this.ri.cross(e, h);
                        c.cross(e, l);
                        c = this.jacobianElementA;
                        var d = this.jacobianElementB;
                        e.negate(c.spatial);
                        h.negate(c.rotational);
                        d.spatial.copy(e);
                        d.rotational.copy(l);
                        e = this.computeGW();
                        c = this.computeGiMf();
                        return -e * b - a * c;
                    };
                },
                { "../math/Mat3": 27, "../math/Vec3": 30, "./Equation": 20 },
            ],
            22: [
                function (b, d, f) {
                    function a(a, b, d) {
                        d = d || {};
                        var k = "undefined" !== typeof d.maxForce ? d.maxForce : 1e6;
                        c.call(this, a, b, -k, k);
                        this.axisA = d.axisA ? d.axisA.clone() : new e(1, 0, 0);
                        this.axisB = d.axisB ? d.axisB.clone() : new e(0, 1, 0);
                        this.maxAngle = Math.PI / 2;
                    }
                    d.exports = a;
                    var e = b("../math/Vec3");
                    b("../math/Mat3");
                    var c = b("./Equation");
                    a.prototype = new c();
                    a.prototype.constructor = a;
                    var h = new e(),
                        l = new e();
                    a.prototype.computeB = function (a) {
                        var b = this.a,
                            c = this.b,
                            e = this.axisA,
                            d = this.axisB,
                            k = this.jacobianElementA,
                            f = this.jacobianElementB;
                        e.cross(d, h);
                        d.cross(e, l);
                        k.rotational.copy(l);
                        f.rotational.copy(h);
                        e = Math.cos(this.maxAngle) - e.dot(d);
                        d = this.computeGW();
                        k = this.computeGiMf();
                        return -e * b - d * c - a * k;
                    };
                },
                { "../math/Mat3": 27, "../math/Vec3": 30, "./Equation": 20 },
            ],
            23: [
                function (b, d, f) {
                    function a(a, b, d) {
                        d = "undefined" !== typeof d ? d : 1e6;
                        c.call(this, a, b, -d, d);
                        this.axisA = new e();
                        this.axisB = new e();
                        this.targetVelocity = 0;
                    }
                    d.exports = a;
                    var e = b("../math/Vec3");
                    b("../math/Mat3");
                    var c = b("./Equation");
                    a.prototype = new c();
                    a.prototype.constructor = a;
                    a.prototype.computeB = function (a) {
                        var b = this.b,
                            c = this.axisB,
                            e = this.jacobianElementB;
                        this.jacobianElementA.rotational.copy(this.axisA);
                        c.negate(e.rotational);
                        c = this.computeGW() - this.targetVelocity;
                        e = this.computeGiMf();
                        return -c * b - a * e;
                    };
                },
                { "../math/Mat3": 27, "../math/Vec3": 30, "./Equation": 20 },
            ],
            24: [
                function (b, d, f) {
                    function a(b, d, f) {
                        f = e.defaults(f, { friction: 0.3, restitution: 0.3, contactEquationStiffness: 1e7, contactEquationRelaxation: 3, frictionEquationStiffness: 1e7, frictionEquationRelaxation: 3 });
                        this.id = a.idCounter++;
                        this.materials = [b, d];
                        this.friction = f.friction;
                        this.restitution = f.restitution;
                        this.contactEquationStiffness = f.contactEquationStiffness;
                        this.contactEquationRelaxation = f.contactEquationRelaxation;
                        this.frictionEquationStiffness = f.frictionEquationStiffness;
                        this.frictionEquationRelaxation = f.frictionEquationRelaxation;
                    }
                    var e = b("../utils/Utils");
                    d.exports = a;
                    a.idCounter = 0;
                },
                { "../utils/Utils": 53 },
            ],
            25: [
                function (b, d, f) {
                    function a(b) {
                        var c = "";
                        b = b || {};
                        "string" === typeof b ? ((c = b), (b = {})) : "object" === typeof b && (c = "");
                        this.name = c;
                        this.id = a.idCounter++;
                        this.friction = "undefined" !== typeof b.friction ? b.friction : -1;
                        this.restitution = "undefined" !== typeof b.restitution ? b.restitution : -1;
                    }
                    d.exports = a;
                    a.idCounter = 0;
                },
                {},
            ],
            26: [
                function (b, d, f) {
                    function a() {
                        this.spatial = new e();
                        this.rotational = new e();
                    }
                    d.exports = a;
                    var e = b("./Vec3");
                    a.prototype.multiplyElement = function (a) {
                        return a.spatial.dot(this.spatial) + a.rotational.dot(this.rotational);
                    };
                    a.prototype.multiplyVectors = function (a, b) {
                        return a.dot(this.spatial) + b.dot(this.rotational);
                    };
                },
                { "./Vec3": 30 },
            ],
            27: [
                function (b, d, f) {
                    function a(a) {
                        this.elements = a ? a : [0, 0, 0, 0, 0, 0, 0, 0, 0];
                    }
                    d.exports = a;
                    var e = b("./Vec3");
                    a.prototype.identity = function () {
                        var a = this.elements;
                        a[0] = 1;
                        a[1] = 0;
                        a[2] = 0;
                        a[3] = 0;
                        a[4] = 1;
                        a[5] = 0;
                        a[6] = 0;
                        a[7] = 0;
                        a[8] = 1;
                    };
                    a.prototype.setZero = function () {
                        var a = this.elements;
                        a[0] = 0;
                        a[1] = 0;
                        a[2] = 0;
                        a[3] = 0;
                        a[4] = 0;
                        a[5] = 0;
                        a[6] = 0;
                        a[7] = 0;
                        a[8] = 0;
                    };
                    a.prototype.setTrace = function (a) {
                        var b = this.elements;
                        b[0] = a.x;
                        b[4] = a.y;
                        b[8] = a.z;
                    };
                    a.prototype.getTrace = function (a) {
                        a = a || new e();
                        var b = this.elements;
                        a.x = b[0];
                        a.y = b[4];
                        a.z = b[8];
                    };
                    a.prototype.vmult = function (a, b) {
                        b = b || new e();
                        var c = this.elements,
                            d = a.x,
                            f = a.y,
                            h = a.z;
                        b.x = c[0] * d + c[1] * f + c[2] * h;
                        b.y = c[3] * d + c[4] * f + c[5] * h;
                        b.z = c[6] * d + c[7] * f + c[8] * h;
                        return b;
                    };
                    a.prototype.smult = function (a) {
                        for (var b = 0; b < this.elements.length; b++) this.elements[b] *= a;
                    };
                    a.prototype.mmult = function (b, e) {
                        for (var c = e || new a(), d = 0; 3 > d; d++)
                            for (var f = 0; 3 > f; f++) {
                                for (var h = 0, n = 0; 3 > n; n++) h += b.elements[d + 3 * n] * this.elements[n + 3 * f];
                                c.elements[d + 3 * f] = h;
                            }
                        return c;
                    };
                    a.prototype.scale = function (b, e) {
                        e = e || new a();
                        for (var c = this.elements, d = e.elements, f = 0; 3 !== f; f++) (d[3 * f] = b.x * c[3 * f]), (d[3 * f + 1] = b.y * c[3 * f + 1]), (d[3 * f + 2] = b.z * c[3 * f + 2]);
                        return e;
                    };
                    a.prototype.solve = function (a, b) {
                        b = b || new e();
                        for (var c = [], d = 0; 12 > d; d++) c.push(0);
                        var f;
                        for (d = 0; 3 > d; d++) for (f = 0; 3 > f; f++) c[d + 4 * f] = this.elements[d + 3 * f];
                        c[3] = a.x;
                        c[7] = a.y;
                        c[11] = a.z;
                        var h = 3,
                            n = h;
                        do {
                            d = n - h;
                            if (0 === c[d + 4 * d])
                                for (f = d + 1; f < n; f++)
                                    if (0 !== c[d + 4 * f]) {
                                        var q = 4;
                                        do {
                                            var u = 4 - q;
                                            c[u + 4 * d] += c[u + 4 * f];
                                        } while (--q);
                                        break;
                                    }
                            if (0 !== c[d + 4 * d])
                                for (f = d + 1; f < n; f++) {
                                    var r = c[d + 4 * f] / c[d + 4 * d];
                                    q = 4;
                                    do (u = 4 - q), (c[u + 4 * f] = u <= d ? 0 : c[u + 4 * f] - c[u + 4 * d] * r);
                                    while (--q);
                                }
                        } while (--h);
                        b.z = c[11] / c[10];
                        b.y = (c[7] - c[6] * b.z) / c[5];
                        b.x = (c[3] - c[2] * b.z - c[1] * b.y) / c[0];
                        if (isNaN(b.x) || isNaN(b.y) || isNaN(b.z) || Infinity === b.x || Infinity === b.y || Infinity === b.z)
                            throw "Could not solve equation! Got x=[" + b.toString() + "], b=[" + a.toString() + "], A=[" + this.toString() + "]";
                        return b;
                    };
                    a.prototype.e = function (a, b, d) {
                        if (void 0 === d) return this.elements[b + 3 * a];
                        this.elements[b + 3 * a] = d;
                    };
                    a.prototype.copy = function (a) {
                        for (var b = 0; b < a.elements.length; b++) this.elements[b] = a.elements[b];
                        return this;
                    };
                    a.prototype.toString = function () {
                        for (var a = "", b = 0; 9 > b; b++) a += this.elements[b] + ",";
                        return a;
                    };
                    a.prototype.reverse = function (b) {
                        b = b || new a();
                        for (var c = [], d = 0; 18 > d; d++) c.push(0);
                        var e;
                        for (d = 0; 3 > d; d++) for (e = 0; 3 > e; e++) c[d + 6 * e] = this.elements[d + 3 * e];
                        c[3] = 1;
                        c[9] = 0;
                        c[15] = 0;
                        c[4] = 0;
                        c[10] = 1;
                        c[16] = 0;
                        c[5] = 0;
                        c[11] = 0;
                        c[17] = 1;
                        var f = 3,
                            p = f;
                        do {
                            d = p - f;
                            if (0 === c[d + 6 * d])
                                for (e = d + 1; e < p; e++)
                                    if (0 !== c[d + 6 * e]) {
                                        var n = 6;
                                        do {
                                            var q = 6 - n;
                                            c[q + 6 * d] += c[q + 6 * e];
                                        } while (--n);
                                        break;
                                    }
                            if (0 !== c[d + 6 * d])
                                for (e = d + 1; e < p; e++) {
                                    var u = c[d + 6 * e] / c[d + 6 * d];
                                    n = 6;
                                    do (q = 6 - n), (c[q + 6 * e] = q <= d ? 0 : c[q + 6 * e] - c[q + 6 * d] * u);
                                    while (--n);
                                }
                        } while (--f);
                        d = 2;
                        do {
                            e = d - 1;
                            do {
                                u = c[d + 6 * e] / c[d + 6 * d];
                                n = 6;
                                do (q = 6 - n), (c[q + 6 * e] -= c[q + 6 * d] * u);
                                while (--n);
                            } while (e--);
                        } while (--d);
                        d = 2;
                        do {
                            u = 1 / c[d + 6 * d];
                            n = 6;
                            do (q = 6 - n), (c[q + 6 * d] *= u);
                            while (--n);
                        } while (d--);
                        d = 2;
                        do {
                            e = 2;
                            do {
                                q = c[3 + e + 6 * d];
                                if (isNaN(q) || Infinity === q) throw "Could not reverse! A=[" + this.toString() + "]";
                                b.e(d, e, q);
                            } while (e--);
                        } while (d--);
                        return b;
                    };
                    a.prototype.setRotationFromQuaternion = function (a) {
                        var b = a.x,
                            c = a.y,
                            d = a.z,
                            e = a.w,
                            f = b + b,
                            n = c + c,
                            q = d + d;
                        a = b * f;
                        var u = b * n;
                        b *= q;
                        var r = c * n;
                        c *= q;
                        d *= q;
                        f *= e;
                        n *= e;
                        e *= q;
                        q = this.elements;
                        q[0] = 1 - (r + d);
                        q[1] = u - e;
                        q[2] = b + n;
                        q[3] = u + e;
                        q[4] = 1 - (a + d);
                        q[5] = c - f;
                        q[6] = b - n;
                        q[7] = c + f;
                        q[8] = 1 - (a + r);
                        return this;
                    };
                    a.prototype.transpose = function (b) {
                        b = b || new a();
                        for (var c = b.elements, d = this.elements, e = 0; 3 !== e; e++) for (var f = 0; 3 !== f; f++) c[3 * e + f] = d[3 * f + e];
                        return b;
                    };
                },
                { "./Vec3": 30 },
            ],
            28: [
                function (b, d, f) {
                    function a(a, b, c, d) {
                        this.x = void 0 !== a ? a : 0;
                        this.y = void 0 !== b ? b : 0;
                        this.z = void 0 !== c ? c : 0;
                        this.w = void 0 !== d ? d : 1;
                    }
                    d.exports = a;
                    var e = b("./Vec3");
                    a.prototype.set = function (a, b, c, d) {
                        this.x = a;
                        this.y = b;
                        this.z = c;
                        this.w = d;
                    };
                    a.prototype.toString = function () {
                        return this.x + "," + this.y + "," + this.z + "," + this.w;
                    };
                    a.prototype.toArray = function () {
                        return [this.x, this.y, this.z, this.w];
                    };
                    a.prototype.setFromAxisAngle = function (a, b) {
                        var c = Math.sin(0.5 * b);
                        this.x = a.x * c;
                        this.y = a.y * c;
                        this.z = a.z * c;
                        this.w = Math.cos(0.5 * b);
                    };
                    a.prototype.toAxisAngle = function (a) {
                        a = a || new e();
                        this.normalize();
                        var b = 2 * Math.acos(this.w),
                            c = Math.sqrt(1 - this.w * this.w);
                        0.001 > c ? ((a.x = this.x), (a.y = this.y), (a.z = this.z)) : ((a.x = this.x / c), (a.y = this.y / c), (a.z = this.z / c));
                        return [a, b];
                    };
                    var c = new e(),
                        h = new e();
                    a.prototype.setFromVectors = function (a, b) {
                        if (a.isAntiparallelTo(b)) a.tangents(c, h), this.setFromAxisAngle(c, Math.PI);
                        else {
                            var d = a.cross(b);
                            this.x = d.x;
                            this.y = d.y;
                            this.z = d.z;
                            this.w = Math.sqrt(Math.pow(a.norm(), 2) * Math.pow(b.norm(), 2)) + a.dot(b);
                            this.normalize();
                        }
                    };
                    var l = new e(),
                        k = new e(),
                        m = new e();
                    a.prototype.mult = function (b, c) {
                        c = c || new a();
                        var d = this.w;
                        l.set(this.x, this.y, this.z);
                        k.set(b.x, b.y, b.z);
                        c.w = d * b.w - l.dot(k);
                        l.cross(k, m);
                        c.x = d * k.x + b.w * l.x + m.x;
                        c.y = d * k.y + b.w * l.y + m.y;
                        c.z = d * k.z + b.w * l.z + m.z;
                        return c;
                    };
                    a.prototype.inverse = function (b) {
                        var c = this.x,
                            d = this.y,
                            e = this.z,
                            f = this.w;
                        b = b || new a();
                        this.conjugate(b);
                        c = 1 / (c * c + d * d + e * e + f * f);
                        b.x *= c;
                        b.y *= c;
                        b.z *= c;
                        b.w *= c;
                        return b;
                    };
                    a.prototype.conjugate = function (b) {
                        b = b || new a();
                        b.x = -this.x;
                        b.y = -this.y;
                        b.z = -this.z;
                        b.w = this.w;
                        return b;
                    };
                    a.prototype.normalize = function () {
                        var a = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
                        0 === a ? (this.w = this.z = this.y = this.x = 0) : ((a = 1 / a), (this.x *= a), (this.y *= a), (this.z *= a), (this.w *= a));
                    };
                    a.prototype.normalizeFast = function () {
                        var a = (3 - (this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)) / 2;
                        0 === a ? (this.w = this.z = this.y = this.x = 0) : ((this.x *= a), (this.y *= a), (this.z *= a), (this.w *= a));
                    };
                    a.prototype.vmult = function (a, b) {
                        b = b || new e();
                        var c = a.x,
                            d = a.y,
                            f = a.z,
                            k = this.x,
                            m = this.y,
                            h = this.z,
                            n = this.w,
                            l = n * c + m * f - h * d,
                            p = n * d + h * c - k * f,
                            A = n * f + k * d - m * c;
                        c = -k * c - m * d - h * f;
                        b.x = l * n + c * -k + p * -h - A * -m;
                        b.y = p * n + c * -m + A * -k - l * -h;
                        b.z = A * n + c * -h + l * -m - p * -k;
                        return b;
                    };
                    a.prototype.copy = function (a) {
                        this.x = a.x;
                        this.y = a.y;
                        this.z = a.z;
                        this.w = a.w;
                        return this;
                    };
                    a.prototype.toEuler = function (a, b) {
                        b = b || "YZX";
                        var c = this.x,
                            d = this.y,
                            e = this.z,
                            f = this.w;
                        switch (b) {
                            case "YZX":
                                var k = c * d + e * f;
                                if (0.499 < k) {
                                    var m = 2 * Math.atan2(c, f);
                                    var h = Math.PI / 2;
                                    var n = 0;
                                }
                                -0.499 > k && ((m = -2 * Math.atan2(c, f)), (h = -Math.PI / 2), (n = 0));
                                isNaN(m) && ((n = e * e), (m = Math.atan2(2 * d * f - 2 * c * e, 1 - 2 * d * d - 2 * n)), (h = Math.asin(2 * k)), (n = Math.atan2(2 * c * f - 2 * d * e, 1 - 2 * c * c - 2 * n)));
                                break;
                            default:
                                throw Error("Euler order " + b + " not supported yet.");
                        }
                        a.y = m;
                        a.z = h;
                        a.x = n;
                    };
                    a.prototype.setFromEuler = function (a, b, c, d) {
                        d = d || "XYZ";
                        var e = Math.cos(a / 2),
                            f = Math.cos(b / 2),
                            k = Math.cos(c / 2);
                        a = Math.sin(a / 2);
                        b = Math.sin(b / 2);
                        c = Math.sin(c / 2);
                        "XYZ" === d
                            ? ((this.x = a * f * k + e * b * c), (this.y = e * b * k - a * f * c), (this.z = e * f * c + a * b * k), (this.w = e * f * k - a * b * c))
                            : "YXZ" === d
                            ? ((this.x = a * f * k + e * b * c), (this.y = e * b * k - a * f * c), (this.z = e * f * c - a * b * k), (this.w = e * f * k + a * b * c))
                            : "ZXY" === d
                            ? ((this.x = a * f * k - e * b * c), (this.y = e * b * k + a * f * c), (this.z = e * f * c + a * b * k), (this.w = e * f * k - a * b * c))
                            : "ZYX" === d
                            ? ((this.x = a * f * k - e * b * c), (this.y = e * b * k + a * f * c), (this.z = e * f * c - a * b * k), (this.w = e * f * k + a * b * c))
                            : "YZX" === d
                            ? ((this.x = a * f * k + e * b * c), (this.y = e * b * k + a * f * c), (this.z = e * f * c - a * b * k), (this.w = e * f * k - a * b * c))
                            : "XZY" === d && ((this.x = a * f * k - e * b * c), (this.y = e * b * k - a * f * c), (this.z = e * f * c + a * b * k), (this.w = e * f * k + a * b * c));
                        return this;
                    };
                    a.prototype.clone = function () {
                        return new a(this.x, this.y, this.z, this.w);
                    };
                },
                { "./Vec3": 30 },
            ],
            29: [
                function (b, d, f) {
                    function a(a) {
                        a = a || {};
                        this.position = new e();
                        a.position && this.position.copy(a.position);
                        this.quaternion = new c();
                        a.quaternion && this.quaternion.copy(a.quaternion);
                    }
                    var e = b("./Vec3"),
                        c = b("./Quaternion");
                    d.exports = a;
                    var h = new c();
                    a.pointToLocalFrame = function (a, b, c, d) {
                        d = d || new e();
                        c.vsub(a, d);
                        b.conjugate(h);
                        h.vmult(d, d);
                        return d;
                    };
                    a.prototype.pointToLocal = function (b, c) {
                        return a.pointToLocalFrame(this.position, this.quaternion, b, c);
                    };
                    a.pointToWorldFrame = function (a, b, c, d) {
                        d = d || new e();
                        b.vmult(c, d);
                        d.vadd(a, d);
                        return d;
                    };
                    a.prototype.pointToWorld = function (b, c) {
                        return a.pointToWorldFrame(this.position, this.quaternion, b, c);
                    };
                    a.prototype.vectorToWorldFrame = function (a, b) {
                        b = b || new e();
                        this.quaternion.vmult(a, b);
                        return b;
                    };
                    a.vectorToWorldFrame = function (a, b, c) {
                        a.vmult(b, c);
                        return c;
                    };
                    a.vectorToLocalFrame = function (a, b, c, d) {
                        d = d || new e();
                        b.w *= -1;
                        b.vmult(c, d);
                        b.w *= -1;
                        return d;
                    };
                },
                { "./Quaternion": 28, "./Vec3": 30 },
            ],
            30: [
                function (b, d, f) {
                    function a(a, b, c) {
                        this.x = a || 0;
                        this.y = b || 0;
                        this.z = c || 0;
                    }
                    d.exports = a;
                    var e = b("./Mat3");
                    a.ZERO = new a(0, 0, 0);
                    a.UNIT_X = new a(1, 0, 0);
                    a.UNIT_Y = new a(0, 1, 0);
                    a.UNIT_Z = new a(0, 0, 1);
                    a.prototype.cross = function (b, c) {
                        var d = b.x,
                            e = b.y,
                            f = b.z,
                            k = this.x,
                            m = this.y,
                            h = this.z;
                        c = c || new a();
                        c.x = m * f - h * e;
                        c.y = h * d - k * f;
                        c.z = k * e - m * d;
                        return c;
                    };
                    a.prototype.set = function (a, b, c) {
                        this.x = a;
                        this.y = b;
                        this.z = c;
                        return this;
                    };
                    a.prototype.setZero = function () {
                        this.x = this.y = this.z = 0;
                    };
                    a.prototype.vadd = function (b, c) {
                        if (c) (c.x = b.x + this.x), (c.y = b.y + this.y), (c.z = b.z + this.z);
                        else return new a(this.x + b.x, this.y + b.y, this.z + b.z);
                    };
                    a.prototype.vsub = function (b, c) {
                        if (c) (c.x = this.x - b.x), (c.y = this.y - b.y), (c.z = this.z - b.z);
                        else return new a(this.x - b.x, this.y - b.y, this.z - b.z);
                    };
                    a.prototype.crossmat = function () {
                        return new e([0, -this.z, this.y, this.z, 0, -this.x, -this.y, this.x, 0]);
                    };
                    a.prototype.normalize = function () {
                        var a = this.x,
                            b = this.y,
                            c = this.z;
                        a = Math.sqrt(a * a + b * b + c * c);
                        0 < a ? ((b = 1 / a), (this.x *= b), (this.y *= b), (this.z *= b)) : (this.z = this.y = this.x = 0);
                        return a;
                    };
                    a.prototype.unit = function (b) {
                        b = b || new a();
                        var c = this.x,
                            d = this.y,
                            e = this.z,
                            f = Math.sqrt(c * c + d * d + e * e);
                        0 < f ? ((f = 1 / f), (b.x = c * f), (b.y = d * f), (b.z = e * f)) : ((b.x = 1), (b.y = 0), (b.z = 0));
                        return b;
                    };
                    a.prototype.norm = function () {
                        var a = this.x,
                            b = this.y,
                            c = this.z;
                        return Math.sqrt(a * a + b * b + c * c);
                    };
                    a.prototype.length = a.prototype.norm;
                    a.prototype.norm2 = function () {
                        return this.dot(this);
                    };
                    a.prototype.lengthSquared = a.prototype.norm2;
                    a.prototype.distanceTo = function (a) {
                        var b = this.x,
                            c = this.y,
                            d = this.z,
                            e = a.x,
                            f = a.y;
                        a = a.z;
                        return Math.sqrt((e - b) * (e - b) + (f - c) * (f - c) + (a - d) * (a - d));
                    };
                    a.prototype.distanceSquared = function (a) {
                        var b = this.x,
                            c = this.y,
                            d = this.z,
                            e = a.x,
                            f = a.y;
                        a = a.z;
                        return (e - b) * (e - b) + (f - c) * (f - c) + (a - d) * (a - d);
                    };
                    a.prototype.mult = function (b, c) {
                        c = c || new a();
                        var d = this.y,
                            e = this.z;
                        c.x = b * this.x;
                        c.y = b * d;
                        c.z = b * e;
                        return c;
                    };
                    a.prototype.scale = a.prototype.mult;
                    a.prototype.dot = function (a) {
                        return this.x * a.x + this.y * a.y + this.z * a.z;
                    };
                    a.prototype.isZero = function () {
                        return 0 === this.x && 0 === this.y && 0 === this.z;
                    };
                    a.prototype.negate = function (b) {
                        b = b || new a();
                        b.x = -this.x;
                        b.y = -this.y;
                        b.z = -this.z;
                        return b;
                    };
                    var c = new a(),
                        h = new a();
                    a.prototype.tangents = function (a, b) {
                        var d = this.norm();
                        0 < d ? ((d = 1 / d), c.set(this.x * d, this.y * d, this.z * d), 0.9 > Math.abs(c.x) ? h.set(1, 0, 0) : h.set(0, 1, 0), c.cross(h, a), c.cross(a, b)) : (a.set(1, 0, 0), b.set(0, 1, 0));
                    };
                    a.prototype.toString = function () {
                        return this.x + "," + this.y + "," + this.z;
                    };
                    a.prototype.toArray = function () {
                        return [this.x, this.y, this.z];
                    };
                    a.prototype.copy = function (a) {
                        this.x = a.x;
                        this.y = a.y;
                        this.z = a.z;
                        return this;
                    };
                    a.prototype.lerp = function (a, b, c) {
                        var d = this.x,
                            e = this.y,
                            f = this.z;
                        c.x = d + (a.x - d) * b;
                        c.y = e + (a.y - e) * b;
                        c.z = f + (a.z - f) * b;
                    };
                    a.prototype.almostEquals = function (a, b) {
                        void 0 === b && (b = 1e-6);
                        return Math.abs(this.x - a.x) > b || Math.abs(this.y - a.y) > b || Math.abs(this.z - a.z) > b ? !1 : !0;
                    };
                    a.prototype.almostZero = function (a) {
                        void 0 === a && (a = 1e-6);
                        return Math.abs(this.x) > a || Math.abs(this.y) > a || Math.abs(this.z) > a ? !1 : !0;
                    };
                    var l = new a();
                    a.prototype.isAntiparallelTo = function (a, b) {
                        this.negate(l);
                        return l.almostEquals(a, b);
                    };
                    a.prototype.clone = function () {
                        return new a(this.x, this.y, this.z);
                    };
                },
                { "./Mat3": 27 },
            ],
            31: [
                function (b, d, f) {
                    function a(b) {
                        b = b || {};
                        e.apply(this);
                        this.id = a.idCounter++;
                        this.postStep = this.preStep = this.world = null;
                        this.vlambda = new c();
                        this.collisionFilterGroup = "number" === typeof b.collisionFilterGroup ? b.collisionFilterGroup : 1;
                        this.collisionFilterMask = "number" === typeof b.collisionFilterMask ? b.collisionFilterMask : 1;
                        this.collisionResponse = !0;
                        this.position = new c();
                        b.position && this.position.copy(b.position);
                        this.previousPosition = new c();
                        this.initPosition = new c();
                        this.velocity = new c();
                        b.velocity && this.velocity.copy(b.velocity);
                        this.initVelocity = new c();
                        this.force = new c();
                        var d = "number" === typeof b.mass ? b.mass : 0;
                        this.mass = d;
                        this.invMass = 0 < d ? 1 / d : 0;
                        this.material = b.material || null;
                        this.linearDamping = "number" === typeof b.linearDamping ? b.linearDamping : 0.01;
                        this.type = 0 >= d ? a.STATIC : a.DYNAMIC;
                        typeof b.type === typeof a.STATIC && (this.type = b.type);
                        this.allowSleep = "undefined" !== typeof b.allowSleep ? b.allowSleep : !0;
                        this.sleepState = 0;
                        this.sleepSpeedLimit = "undefined" !== typeof b.sleepSpeedLimit ? b.sleepSpeedLimit : 0.1;
                        this.sleepTimeLimit = "undefined" !== typeof b.sleepTimeLimit ? b.sleepTimeLimit : 1;
                        this.timeLastSleepy = 0;
                        this._wakeUpAfterNarrowphase = !1;
                        this.torque = new c();
                        this.quaternion = new l();
                        b.quaternion && this.quaternion.copy(b.quaternion);
                        this.initQuaternion = new l();
                        this.angularVelocity = new c();
                        b.angularVelocity && this.angularVelocity.copy(b.angularVelocity);
                        this.initAngularVelocity = new c();
                        this.interpolatedPosition = new c();
                        this.interpolatedQuaternion = new l();
                        this.shapes = [];
                        this.shapeOffsets = [];
                        this.shapeOrientations = [];
                        this.inertia = new c();
                        this.invInertia = new c();
                        this.invInertiaWorld = new h();
                        this.invMassSolve = 0;
                        this.invInertiaSolve = new c();
                        this.invInertiaWorldSolve = new h();
                        this.fixedRotation = "undefined" !== typeof b.fixedRotation ? b.fixedRotation : !1;
                        this.angularDamping = "undefined" !== typeof b.angularDamping ? b.angularDamping : 0.01;
                        this.userData = "undefined" !== typeof b.userData ? b.userData : null;
                        this.aabb = new k();
                        this.aabbNeedsUpdate = !0;
                        this.wlambda = new c();
                        b.shape && this.addShape(b.shape);
                        this.updateMassProperties();
                    }
                    d.exports = a;
                    var e = b("../utils/EventTarget");
                    b("../shapes/Shape");
                    var c = b("../math/Vec3"),
                        h = b("../math/Mat3"),
                        l = b("../math/Quaternion");
                    b("../material/Material");
                    var k = b("../collision/AABB"),
                        m = b("../shapes/Box");
                    a.prototype = new e();
                    a.prototype.constructor = a;
                    a.DYNAMIC = 1;
                    a.STATIC = 2;
                    a.KINEMATIC = 4;
                    a.AWAKE = 0;
                    a.SLEEPY = 1;
                    a.SLEEPING = 2;
                    a.idCounter = 0;
                    a.prototype.wakeUp = function () {
                        var b = this.sleepState;
                        this.sleepState = 0;
                        b === a.SLEEPING && this.dispatchEvent({ type: "wakeup" });
                    };
                    a.prototype.sleep = function () {
                        this.sleepState = a.SLEEPING;
                        this.velocity.set(0, 0, 0);
                        this.angularVelocity.set(0, 0, 0);
                    };
                    a.sleepyEvent = { type: "sleepy" };
                    a.sleepEvent = { type: "sleep" };
                    a.prototype.sleepTick = function (b) {
                        if (this.allowSleep) {
                            var c = this.sleepState,
                                d = this.velocity.norm2() + this.angularVelocity.norm2(),
                                e = Math.pow(this.sleepSpeedLimit, 2);
                            c === a.AWAKE && d < e
                                ? ((this.sleepState = a.SLEEPY), (this.timeLastSleepy = b), this.dispatchEvent(a.sleepyEvent))
                                : c === a.SLEEPY && d > e
                                ? this.wakeUp()
                                : c === a.SLEEPY && b - this.timeLastSleepy > this.sleepTimeLimit && (this.sleep(), this.dispatchEvent(a.sleepEvent));
                        }
                    };
                    a.prototype.updateSolveMassProperties = function () {
                        this.sleepState === a.SLEEPING || this.type === a.KINEMATIC
                            ? ((this.invMassSolve = 0), this.invInertiaSolve.setZero(), this.invInertiaWorldSolve.setZero())
                            : ((this.invMassSolve = this.invMass), this.invInertiaSolve.copy(this.invInertia), this.invInertiaWorldSolve.copy(this.invInertiaWorld));
                    };
                    a.prototype.pointToLocalFrame = function (a, b) {
                        b = b || new c();
                        a.vsub(this.position, b);
                        this.quaternion.conjugate().vmult(b, b);
                        return b;
                    };
                    a.prototype.vectorToLocalFrame = function (a, b) {
                        b = b || new c();
                        this.quaternion.conjugate().vmult(a, b);
                        return b;
                    };
                    a.prototype.pointToWorldFrame = function (a, b) {
                        b = b || new c();
                        this.quaternion.vmult(a, b);
                        b.vadd(this.position, b);
                        return b;
                    };
                    a.prototype.vectorToWorldFrame = function (a, b) {
                        b = b || new c();
                        this.quaternion.vmult(a, b);
                        return b;
                    };
                    var p = new c(),
                        n = new l();
                    a.prototype.addShape = function (a, b, d) {
                        var e = new c(),
                            f = new l();
                        b && e.copy(b);
                        d && f.copy(d);
                        this.shapes.push(a);
                        this.shapeOffsets.push(e);
                        this.shapeOrientations.push(f);
                        this.updateMassProperties();
                        this.updateBoundingRadius();
                        this.aabbNeedsUpdate = !0;
                        return this;
                    };
                    a.prototype.updateBoundingRadius = function () {
                        for (var a = this.shapes, b = this.shapeOffsets, c = a.length, d = 0, e = 0; e !== c; e++) {
                            var f = a[e];
                            f.updateBoundingSphereRadius();
                            var k = b[e].norm();
                            f = f.boundingSphereRadius;
                            k + f > d && (d = k + f);
                        }
                        this.boundingRadius = d;
                    };
                    var q = new k();
                    a.prototype.computeAABB = function () {
                        for (var a = this.shapes, b = this.shapeOffsets, c = this.shapeOrientations, d = a.length, e = this.quaternion, f = this.aabb, k = 0; k !== d; k++) {
                            var h = a[k];
                            c[k].mult(e, n);
                            n.vmult(b[k], p);
                            p.vadd(this.position, p);
                            h.calculateWorldAABB(p, n, q.lowerBound, q.upperBound);
                            0 === k ? f.copy(q) : f.extend(q);
                        }
                        this.aabbNeedsUpdate = !1;
                    };
                    var u = new h(),
                        r = new h();
                    new h();
                    a.prototype.updateInertiaWorld = function (a) {
                        var b = this.invInertia;
                        if (b.x !== b.y || b.y !== b.z || a) u.setRotationFromQuaternion(this.quaternion), u.transpose(r), u.scale(b, u), u.mmult(r, this.invInertiaWorld);
                    };
                    var w = new c(),
                        v = new c();
                    a.prototype.applyForce = function (b, c) {
                        this.type === a.DYNAMIC && (c.vsub(this.position, w), w.cross(b, v), this.force.vadd(b, this.force), this.torque.vadd(v, this.torque));
                    };
                    var x = new c(),
                        y = new c();
                    a.prototype.applyLocalForce = function (b, c) {
                        this.type === a.DYNAMIC && (this.vectorToWorldFrame(b, x), this.pointToWorldFrame(c, y), this.applyForce(x, y));
                    };
                    var z = new c(),
                        E = new c(),
                        A = new c();
                    a.prototype.applyImpulse = function (b, c) {
                        this.type === a.DYNAMIC &&
                            (c.vsub(this.position, z), E.copy(b), E.mult(this.invMass, E), this.velocity.vadd(E, this.velocity), z.cross(b, A), this.invInertiaWorld.vmult(A, A), this.angularVelocity.vadd(A, this.angularVelocity));
                    };
                    var F = new c(),
                        L = new c();
                    a.prototype.applyLocalImpulse = function (b, c) {
                        this.type === a.DYNAMIC && (this.vectorToWorldFrame(b, F), this.pointToWorldFrame(c, L), this.applyImpulse(F, L));
                    };
                    var H = new c();
                    a.prototype.updateMassProperties = function () {
                        this.invMass = 0 < this.mass ? 1 / this.mass : 0;
                        var a = this.inertia,
                            b = this.fixedRotation;
                        this.computeAABB();
                        H.set((this.aabb.upperBound.x - this.aabb.lowerBound.x) / 2, (this.aabb.upperBound.y - this.aabb.lowerBound.y) / 2, (this.aabb.upperBound.z - this.aabb.lowerBound.z) / 2);
                        m.calculateInertia(H, this.mass, a);
                        this.invInertia.set(0 < a.x && !b ? 1 / a.x : 0, 0 < a.y && !b ? 1 / a.y : 0, 0 < a.z && !b ? 1 / a.z : 0);
                        this.updateInertiaWorld(!0);
                    };
                    a.prototype.getVelocityAtWorldPoint = function (a, b) {
                        var d = new c();
                        a.vsub(this.position, d);
                        this.angularVelocity.cross(d, b);
                        this.velocity.vadd(b, b);
                        return b;
                    };
                },
                { "../collision/AABB": 3, "../material/Material": 25, "../math/Mat3": 27, "../math/Quaternion": 28, "../math/Vec3": 30, "../shapes/Box": 37, "../shapes/Shape": 43, "../utils/EventTarget": 49 },
            ],
            32: [
                function (b, d, f) {
                    function a(a) {
                        this.chassisBody = a.chassisBody;
                        this.wheelInfos = [];
                        this.sliding = !1;
                        this.world = null;
                        this.indexRightAxis = "undefined" !== typeof a.indexRightAxis ? a.indexRightAxis : 1;
                        this.indexForwardAxis = "undefined" !== typeof a.indexForwardAxis ? a.indexForwardAxis : 0;
                        this.indexUpAxis = "undefined" !== typeof a.indexUpAxis ? a.indexUpAxis : 2;
                    }
                    function e(a, b, c) {
                        var d = E,
                            e = A,
                            f = F,
                            k = L;
                        b.vsub(a.position, d);
                        d.cross(c, e);
                        a.invInertiaWorld.vmult(e, k);
                        k.cross(d, f);
                        return a.invMass + c.dot(f);
                    }
                    b("./Body");
                    var c = b("../math/Vec3"),
                        h = b("../math/Quaternion");
                    b("../collision/RaycastResult");
                    f = b("../collision/Ray");
                    var l = b("../objects/WheelInfo");
                    d.exports = a;
                    new c();
                    new c();
                    new c();
                    var k = new c(),
                        m = new c(),
                        p = new c();
                    new f();
                    a.prototype.addWheel = function (a) {
                        a = a || {};
                        a = new l(a);
                        var b = this.wheelInfos.length;
                        this.wheelInfos.push(a);
                        return b;
                    };
                    a.prototype.setSteeringValue = function (a, b) {
                        this.wheelInfos[b].steering = a;
                    };
                    new c();
                    a.prototype.applyEngineForce = function (a, b) {
                        this.wheelInfos[b].engineForce = a;
                    };
                    a.prototype.setBrake = function (a, b) {
                        this.wheelInfos[b].brake = a;
                    };
                    a.prototype.addToWorld = function (a) {
                        a.add(this.chassisBody);
                        var b = this;
                        this.preStepCallback = function () {
                            b.updateVehicle(a.dt);
                        };
                        a.addEventListener("preStep", this.preStepCallback);
                        this.world = a;
                    };
                    a.prototype.getVehicleAxisWorld = function (a, b) {
                        b.set(0 === a ? 1 : 0, 1 === a ? 1 : 0, 2 === a ? 1 : 0);
                        this.chassisBody.vectorToWorldFrame(b, b);
                    };
                    a.prototype.updateVehicle = function (a) {
                        for (var b = this.wheelInfos, d = b.length, e = this.chassisBody, f = 0; f < d; f++) this.updateWheelTransform(f);
                        this.currentVehicleSpeedKmHour = 3.6 * e.velocity.norm();
                        f = new c();
                        this.getVehicleAxisWorld(this.indexForwardAxis, f);
                        0 > f.dot(e.velocity) && (this.currentVehicleSpeedKmHour *= -1);
                        for (f = 0; f < d; f++) this.castRay(b[f]);
                        this.updateSuspension(a);
                        var k = new c(),
                            h = new c();
                        for (f = 0; f < d; f++) {
                            var m = b[f],
                                n = m.suspensionForce;
                            n > m.maxSuspensionForce && (n = m.maxSuspensionForce);
                            m.raycastResult.hitNormalWorld.scale(n * a, k);
                            m.raycastResult.hitPointWorld.vsub(e.position, h);
                            e.applyImpulse(k, m.raycastResult.hitPointWorld);
                        }
                        this.updateFriction(a);
                        k = new c();
                        h = new c();
                        n = new c();
                        for (f = 0; f < d; f++) {
                            m = b[f];
                            e.getVelocityAtWorldPoint(m.chassisConnectionPointWorld, n);
                            var l = 1;
                            switch (this.indexUpAxis) {
                                case 1:
                                    l = -1;
                            }
                            if (m.isInContact) {
                                this.getVehicleAxisWorld(this.indexForwardAxis, h);
                                var q = h.dot(m.raycastResult.hitNormalWorld);
                                m.raycastResult.hitNormalWorld.scale(q, k);
                                h.vsub(k, h);
                                q = h.dot(n);
                                m.deltaRotation = (l * q * a) / m.radius;
                            }
                            (!m.sliding && m.isInContact) || 0 === m.engineForce || !m.useCustomSlidingRotationalSpeed || (m.deltaRotation = (0 < m.engineForce ? 1 : -1) * m.customSlidingRotationalSpeed * a);
                            Math.abs(m.brake) > Math.abs(m.engineForce) && (m.deltaRotation = 0);
                            m.rotation += m.deltaRotation;
                            m.deltaRotation *= 0.99;
                        }
                    };
                    a.prototype.updateSuspension = function (a) {
                        a = this.chassisBody.mass;
                        for (var b = this.wheelInfos, c = b.length, d = 0; d < c; d++) {
                            var e = b[d];
                            if (e.isInContact) {
                                var f = e.suspensionStiffness * (e.suspensionRestLength - e.suspensionLength) * e.clippedInvContactDotSuspension;
                                var k = e.suspensionRelativeVelocity;
                                f -= (0 > k ? e.dampingCompression : e.dampingRelaxation) * k;
                                e.suspensionForce = f * a;
                                0 > e.suspensionForce && (e.suspensionForce = 0);
                            } else e.suspensionForce = 0;
                        }
                    };
                    a.prototype.removeFromWorld = function (a) {
                        a.remove(this.chassisBody);
                        a.removeEventListener("preStep", this.preStepCallback);
                        this.world = null;
                    };
                    var n = new c(),
                        q = new c();
                    a.prototype.castRay = function (a) {
                        this.updateWheelTransformWorld(a);
                        var b = this.chassisBody,
                            d = -1;
                        a.directionWorld.scale(a.suspensionRestLength + a.radius, n);
                        var e = a.chassisConnectionPointWorld;
                        e.vadd(n, q);
                        var f = a.raycastResult;
                        f.reset();
                        var k = b.collisionResponse;
                        b.collisionResponse = !1;
                        this.world.rayTest(e, q, f);
                        b.collisionResponse = k;
                        e = f.body;
                        a.raycastResult.groundObject = 0;
                        e
                            ? ((d = f.distance),
                              (a.raycastResult.hitNormalWorld = f.hitNormalWorld),
                              (a.isInContact = !0),
                              (a.suspensionLength = f.distance - a.radius),
                              (f = a.suspensionRestLength - a.maxSuspensionTravel),
                              (e = a.suspensionRestLength + a.maxSuspensionTravel),
                              a.suspensionLength < f && (a.suspensionLength = f),
                              a.suspensionLength > e && ((a.suspensionLength = e), a.raycastResult.reset()),
                              (f = a.raycastResult.hitNormalWorld.dot(a.directionWorld)),
                              (e = new c()),
                              b.getVelocityAtWorldPoint(a.raycastResult.hitPointWorld, e),
                              (b = a.raycastResult.hitNormalWorld.dot(e)),
                              -0.1 <= f ? ((a.suspensionRelativeVelocity = 0), (a.clippedInvContactDotSuspension = 10)) : ((f = -1 / f), (a.suspensionRelativeVelocity = b * f), (a.clippedInvContactDotSuspension = f)))
                            : ((a.suspensionLength = a.suspensionRestLength + 0 * a.maxSuspensionTravel),
                              (a.suspensionRelativeVelocity = 0),
                              a.directionWorld.scale(-1, a.raycastResult.hitNormalWorld),
                              (a.clippedInvContactDotSuspension = 1));
                        return d;
                    };
                    a.prototype.updateWheelTransformWorld = function (a) {
                        a.isInContact = !1;
                        var b = this.chassisBody;
                        b.pointToWorldFrame(a.chassisConnectionPointLocal, a.chassisConnectionPointWorld);
                        b.vectorToWorldFrame(a.directionLocal, a.directionWorld);
                        b.vectorToWorldFrame(a.axleLocal, a.axleWorld);
                    };
                    a.prototype.updateWheelTransform = function (a) {
                        a = this.wheelInfos[a];
                        this.updateWheelTransformWorld(a);
                        a.directionLocal.scale(-1, k);
                        m.copy(a.axleLocal);
                        k.cross(m, p);
                        p.normalize();
                        m.normalize();
                        var b = a.steering,
                            c = new h();
                        c.setFromAxisAngle(k, b);
                        b = new h();
                        b.setFromAxisAngle(m, a.rotation);
                        var d = a.worldTransform.quaternion;
                        this.chassisBody.quaternion.mult(c, d);
                        d.mult(b, d);
                        d.normalize();
                        c = a.worldTransform.position;
                        c.copy(a.directionWorld);
                        c.scale(a.suspensionLength, c);
                        c.vadd(a.chassisConnectionPointWorld, c);
                    };
                    var u = [new c(1, 0, 0), new c(0, 1, 0), new c(0, 0, 1)];
                    a.prototype.getWheelTransformWorld = function (a) {
                        return this.wheelInfos[a].worldTransform;
                    };
                    var r = new c(),
                        w = [],
                        v = [];
                    a.prototype.updateFriction = function (a) {
                        for (var b = this.wheelInfos, d = b.length, f = this.chassisBody, k = 0, m = 0; m < d; m++) {
                            var h = b[m],
                                n = h.raycastResult.body;
                            n && k++;
                            h.sideImpulse = 0;
                            h.forwardImpulse = 0;
                            v[m] || (v[m] = new c());
                            w[m] || (w[m] = new c());
                        }
                        for (m = 0; m < d; m++)
                            if (((h = b[m]), (n = h.raycastResult.body))) {
                                var l = w[m];
                                this.getWheelTransformWorld(m).vectorToWorldFrame(u[this.indexRightAxis], l);
                                k = h.raycastResult.hitNormalWorld;
                                var q = l.dot(k);
                                k.scale(q, r);
                                l.vsub(r, l);
                                l.normalize();
                                k.cross(l, v[m]);
                                v[m].normalize();
                                k = h;
                                q = f;
                                var p = h.raycastResult.hitPointWorld,
                                    I = h.raycastResult.hitPointWorld;
                                if (1.1 < l.norm2()) n = 0;
                                else {
                                    var B = H,
                                        F = P,
                                        L = R;
                                    q.getVelocityAtWorldPoint(p, B);
                                    n.getVelocityAtWorldPoint(I, F);
                                    B.vsub(F, L);
                                    n = -0.2 * l.dot(L) * (1 / (q.invMass + n.invMass));
                                }
                                k.sideImpulse = n;
                                h.sideImpulse *= 1;
                            }
                        this.sliding = !1;
                        for (m = 0; m < d; m++) {
                            h = b[m];
                            n = h.raycastResult.body;
                            q = 0;
                            h.slipInfo = 1;
                            if (n) {
                                k = h.brake ? h.brake : 0;
                                B = f;
                                p = n;
                                I = h.raycastResult.hitPointWorld;
                                l = v[m];
                                q = k;
                                F = I;
                                L = x;
                                var D = y,
                                    X = z;
                                B.getVelocityAtWorldPoint(F, L);
                                p.getVelocityAtWorldPoint(F, D);
                                L.vsub(D, X);
                                F = l.dot(X);
                                B = e(B, I, l);
                                p = e(p, I, l);
                                p = (1 / (B + p)) * -F;
                                q < p && (p = q);
                                p < -q && (p = -q);
                                q = p;
                                q += h.engineForce * a;
                                k /= q;
                                h.slipInfo *= k;
                            }
                            h.forwardImpulse = 0;
                            h.skidInfo = 1;
                            n &&
                                ((h.skidInfo = 1),
                                (n = h.suspensionForce * a * h.frictionSlip),
                                (k = n * n),
                                (h.forwardImpulse = q),
                                (q = 0.5 * h.forwardImpulse),
                                (p = 1 * h.sideImpulse),
                                (q = q * q + p * p),
                                (h.sliding = !1),
                                q > k && ((this.sliding = !0), (h.sliding = !0), (k = n / Math.sqrt(q)), (h.skidInfo *= k)));
                        }
                        if (this.sliding) for (m = 0; m < d; m++) (h = b[m]), 0 !== h.sideImpulse && 1 > h.skidInfo && ((h.forwardImpulse *= h.skidInfo), (h.sideImpulse *= h.skidInfo));
                        for (m = 0; m < d; m++)
                            (h = b[m]),
                                (a = new c()),
                                a.copy(h.raycastResult.hitPointWorld),
                                0 !== h.forwardImpulse && ((n = new c()), v[m].scale(h.forwardImpulse, n), f.applyImpulse(n, a)),
                                0 !== h.sideImpulse &&
                                    ((n = h.raycastResult.body),
                                    (k = new c()),
                                    k.copy(h.raycastResult.hitPointWorld),
                                    (q = new c()),
                                    w[m].scale(h.sideImpulse, q),
                                    f.pointToLocalFrame(a, a),
                                    (a["xyz"[this.indexUpAxis]] *= h.rollInfluence),
                                    f.pointToWorldFrame(a, a),
                                    f.applyImpulse(q, a),
                                    q.scale(-1, q),
                                    n.applyImpulse(q, k));
                    };
                    var x = new c(),
                        y = new c(),
                        z = new c(),
                        E = new c(),
                        A = new c(),
                        F = new c(),
                        L = new c(),
                        H = new c(),
                        P = new c(),
                        R = new c();
                },
                { "../collision/Ray": 9, "../collision/RaycastResult": 10, "../math/Quaternion": 28, "../math/Vec3": 30, "../objects/WheelInfo": 36, "./Body": 31 },
            ],
            33: [
                function (b, d, f) {
                    function a(a) {
                        this.wheelBodies = [];
                        this.coordinateSystem = "undefined" === typeof a.coordinateSystem ? new l(1, 2, 3) : a.coordinateSystem.clone();
                        this.chassisBody = a.chassisBody;
                        this.chassisBody || ((a = new h(new l(5, 2, 0.5))), (this.chassisBody = new e(1, a)));
                        this.constraints = [];
                        this.wheelAxes = [];
                        this.wheelForces = [];
                    }
                    var e = b("./Body"),
                        c = b("../shapes/Sphere"),
                        h = b("../shapes/Box"),
                        l = b("../math/Vec3"),
                        k = b("../constraints/HingeConstraint");
                    d.exports = a;
                    a.prototype.addWheel = function (a) {
                        a = a || {};
                        var b = a.body;
                        b || (b = new e(1, new c(1.2)));
                        this.wheelBodies.push(b);
                        this.wheelForces.push(0);
                        new l();
                        var d = "undefined" !== typeof a.position ? a.position.clone() : new l(),
                            f = new l();
                        this.chassisBody.pointToWorldFrame(d, f);
                        b.position.set(f.x, f.y, f.z);
                        a = "undefined" !== typeof a.axis ? a.axis.clone() : new l(0, 1, 0);
                        this.wheelAxes.push(a);
                        b = new k(this.chassisBody, b, { pivotA: d, axisA: a, pivotB: l.ZERO, axisB: a, collideConnected: !1 });
                        this.constraints.push(b);
                        return this.wheelBodies.length - 1;
                    };
                    a.prototype.setSteeringValue = function (a, b) {
                        var c = this.wheelAxes[b],
                            d = Math.cos(a),
                            e = Math.sin(a),
                            f = c.x;
                        c = c.y;
                        this.constraints[b].axisA.set(d * f - e * c, e * f + d * c, 0);
                    };
                    a.prototype.setMotorSpeed = function (a, b) {
                        var c = this.constraints[b];
                        c.enableMotor();
                        c.motorTargetVelocity = a;
                    };
                    a.prototype.disableMotor = function (a) {
                        this.constraints[a].disableMotor();
                    };
                    var m = new l();
                    a.prototype.setWheelForce = function (a, b) {
                        this.wheelForces[b] = a;
                    };
                    a.prototype.applyWheelForce = function (a, b) {
                        var c = this.wheelBodies[b],
                            d = c.torque;
                        this.wheelAxes[b].scale(a, m);
                        c.vectorToWorldFrame(m, m);
                        d.vadd(m, d);
                    };
                    a.prototype.addToWorld = function (a) {
                        for (var b = this.constraints, c = this.wheelBodies.concat([this.chassisBody]), d = 0; d < c.length; d++) a.add(c[d]);
                        for (d = 0; d < b.length; d++) a.addConstraint(b[d]);
                        a.addEventListener("preStep", this._update.bind(this));
                    };
                    a.prototype._update = function () {
                        for (var a = this.wheelForces, b = 0; b < a.length; b++) this.applyWheelForce(a[b], b);
                    };
                    a.prototype.removeFromWorld = function (a) {
                        for (var b = this.constraints, c = this.wheelBodies.concat([this.chassisBody]), d = 0; d < c.length; d++) a.remove(c[d]);
                        for (d = 0; d < b.length; d++) a.removeConstraint(b[d]);
                    };
                    var p = new l();
                    a.prototype.getWheelSpeed = function (a) {
                        var b = this.wheelBodies[a].angularVelocity;
                        this.chassisBody.vectorToWorldFrame(this.wheelAxes[a], p);
                        return b.dot(p);
                    };
                },
                { "../constraints/HingeConstraint": 15, "../math/Vec3": 30, "../shapes/Box": 37, "../shapes/Sphere": 44, "./Body": 31 },
            ],
            34: [
                function (b, d, f) {
                    function a() {
                        this.particles = [];
                        this.speedOfSound = this.smoothingRadius = this.density = 1;
                        this.viscosity = 0.01;
                        this.eps = 1e-6;
                        this.pressures = [];
                        this.densities = [];
                        this.neighbors = [];
                    }
                    d.exports = a;
                    b("../shapes/Shape");
                    d = b("../math/Vec3");
                    b("../math/Quaternion");
                    b("../shapes/Particle");
                    b("../objects/Body");
                    b("../material/Material");
                    a.prototype.add = function (a) {
                        this.particles.push(a);
                        this.neighbors.length < this.particles.length && this.neighbors.push([]);
                    };
                    a.prototype.remove = function (a) {
                        a = this.particles.indexOf(a);
                        -1 !== a && (this.particles.splice(a, 1), this.neighbors.length > this.particles.length && this.neighbors.pop());
                    };
                    var e = new d();
                    a.prototype.getNeighbors = function (a, b) {
                        for (var c = this.particles.length, d = a.id, f = this.smoothingRadius * this.smoothingRadius, k = 0; k !== c; k++) {
                            var h = this.particles[k];
                            h.position.vsub(a.position, e);
                            d !== h.id && e.norm2() < f && b.push(h);
                        }
                    };
                    var c = new d(),
                        h = new d(),
                        l = new d(),
                        k = new d(),
                        m = new d(),
                        p = new d();
                    a.prototype.update = function () {
                        for (var a = this.particles.length, b = this.speedOfSound, d = this.eps, e = 0; e !== a; e++) {
                            var f = this.particles[e],
                                v = this.neighbors[e];
                            v.length = 0;
                            this.getNeighbors(f, v);
                            v.push(this.particles[e]);
                            for (var x = v.length, y = 0, z = 0; z !== x; z++) {
                                f.position.vsub(v[z].position, c);
                                var E = c.norm();
                                E = this.w(E);
                                y += v[z].mass * E;
                            }
                            this.densities[e] = y;
                            this.pressures[e] = b * b * (this.densities[e] - this.density);
                        }
                        for (e = 0; e !== a; e++) {
                            b = this.particles[e];
                            h.set(0, 0, 0);
                            l.set(0, 0, 0);
                            v = this.neighbors[e];
                            x = v.length;
                            for (z = 0; z !== x; z++)
                                (y = v[z]),
                                    b.position.vsub(y.position, m),
                                    (E = m.norm()),
                                    (f = -y.mass * (this.pressures[e] / (this.densities[e] * this.densities[e] + d) + this.pressures[z] / (this.densities[z] * this.densities[z] + d))),
                                    this.gradw(m, k),
                                    k.mult(f, k),
                                    h.vadd(k, h),
                                    y.velocity.vsub(b.velocity, p),
                                    p.mult((1 / (1e-4 + this.densities[e] * this.densities[z])) * this.viscosity * y.mass, p),
                                    (f = this.nablaw(E)),
                                    p.mult(f, p),
                                    l.vadd(p, l);
                            l.mult(b.mass, l);
                            h.mult(b.mass, h);
                            b.force.vadd(l, b.force);
                            b.force.vadd(h, b.force);
                        }
                    };
                    a.prototype.w = function (a) {
                        var b = this.smoothingRadius;
                        return (315 / (64 * Math.PI * Math.pow(b, 9))) * Math.pow(b * b - a * a, 3);
                    };
                    a.prototype.gradw = function (a, b) {
                        var c = a.norm(),
                            d = this.smoothingRadius;
                        a.mult((945 / (32 * Math.PI * Math.pow(d, 9))) * Math.pow(d * d - c * c, 2), b);
                    };
                    a.prototype.nablaw = function (a) {
                        var b = this.smoothingRadius;
                        return (945 / (32 * Math.PI * Math.pow(b, 9))) * (b * b - a * a) * (7 * a * a - 3 * b * b);
                    };
                },
                { "../material/Material": 25, "../math/Quaternion": 28, "../math/Vec3": 30, "../objects/Body": 31, "../shapes/Particle": 41, "../shapes/Shape": 43 },
            ],
            35: [
                function (b, d, f) {
                    function a(a, b, c) {
                        c = c || {};
                        this.restLength = "number" === typeof c.restLength ? c.restLength : 1;
                        this.stiffness = c.stiffness || 100;
                        this.damping = c.damping || 1;
                        this.bodyA = a;
                        this.bodyB = b;
                        this.localAnchorA = new e();
                        this.localAnchorB = new e();
                        c.localAnchorA && this.localAnchorA.copy(c.localAnchorA);
                        c.localAnchorB && this.localAnchorB.copy(c.localAnchorB);
                        c.worldAnchorA && this.setWorldAnchorA(c.worldAnchorA);
                        c.worldAnchorB && this.setWorldAnchorB(c.worldAnchorB);
                    }
                    var e = b("../math/Vec3");
                    d.exports = a;
                    a.prototype.setWorldAnchorA = function (a) {
                        this.bodyA.pointToLocalFrame(a, this.localAnchorA);
                    };
                    a.prototype.setWorldAnchorB = function (a) {
                        this.bodyB.pointToLocalFrame(a, this.localAnchorB);
                    };
                    a.prototype.getWorldAnchorA = function (a) {
                        this.bodyA.pointToWorldFrame(this.localAnchorA, a);
                    };
                    a.prototype.getWorldAnchorB = function (a) {
                        this.bodyB.pointToWorldFrame(this.localAnchorB, a);
                    };
                    var c = new e(),
                        h = new e(),
                        l = new e(),
                        k = new e(),
                        m = new e(),
                        p = new e(),
                        n = new e(),
                        q = new e(),
                        u = new e(),
                        r = new e(),
                        w = new e();
                    a.prototype.applyForce = function () {
                        var a = this.stiffness,
                            b = this.damping,
                            d = this.restLength,
                            e = this.bodyA,
                            f = this.bodyB;
                        this.getWorldAnchorA(m);
                        this.getWorldAnchorB(p);
                        m.vsub(e.position, n);
                        p.vsub(f.position, q);
                        p.vsub(m, c);
                        var A = c.norm();
                        h.copy(c);
                        h.normalize();
                        f.velocity.vsub(e.velocity, l);
                        f.angularVelocity.cross(q, w);
                        l.vadd(w, l);
                        e.angularVelocity.cross(n, w);
                        l.vsub(w, l);
                        h.mult(-a * (A - d) - b * l.dot(h), k);
                        e.force.vsub(k, e.force);
                        f.force.vadd(k, f.force);
                        n.cross(k, u);
                        q.cross(k, r);
                        e.torque.vsub(u, e.torque);
                        f.torque.vadd(r, f.torque);
                    };
                },
                { "../math/Vec3": 30 },
            ],
            36: [
                function (b, d, f) {
                    function a(a) {
                        a = l.defaults(a, {
                            chassisConnectionPointLocal: new e(),
                            chassisConnectionPointWorld: new e(),
                            directionLocal: new e(),
                            directionWorld: new e(),
                            axleLocal: new e(),
                            axleWorld: new e(),
                            suspensionRestLength: 1,
                            suspensionMaxLength: 2,
                            radius: 1,
                            suspensionStiffness: 100,
                            dampingCompression: 10,
                            dampingRelaxation: 10,
                            frictionSlip: 1e4,
                            steering: 0,
                            rotation: 0,
                            deltaRotation: 0,
                            rollInfluence: 0.01,
                            maxSuspensionForce: Number.MAX_VALUE,
                            isFrontWheel: !0,
                            clippedInvContactDotSuspension: 1,
                            suspensionRelativeVelocity: 0,
                            suspensionForce: 0,
                            skidInfo: 0,
                            suspensionLength: 0,
                            maxSuspensionTravel: 1,
                            useCustomSlidingRotationalSpeed: !1,
                            customSlidingRotationalSpeed: -0.1,
                        });
                        this.maxSuspensionTravel = a.maxSuspensionTravel;
                        this.customSlidingRotationalSpeed = a.customSlidingRotationalSpeed;
                        this.useCustomSlidingRotationalSpeed = a.useCustomSlidingRotationalSpeed;
                        this.sliding = !1;
                        this.chassisConnectionPointLocal = a.chassisConnectionPointLocal.clone();
                        this.chassisConnectionPointWorld = a.chassisConnectionPointWorld.clone();
                        this.directionLocal = a.directionLocal.clone();
                        this.directionWorld = a.directionWorld.clone();
                        this.axleLocal = a.axleLocal.clone();
                        this.axleWorld = a.axleWorld.clone();
                        this.suspensionRestLength = a.suspensionRestLength;
                        this.suspensionMaxLength = a.suspensionMaxLength;
                        this.radius = a.radius;
                        this.suspensionStiffness = a.suspensionStiffness;
                        this.dampingCompression = a.dampingCompression;
                        this.dampingRelaxation = a.dampingRelaxation;
                        this.frictionSlip = a.frictionSlip;
                        this.deltaRotation = this.rotation = this.steering = 0;
                        this.rollInfluence = a.rollInfluence;
                        this.maxSuspensionForce = a.maxSuspensionForce;
                        this.brake = this.engineForce = 0;
                        this.isFrontWheel = a.isFrontWheel;
                        this.clippedInvContactDotSuspension = 1;
                        this.forwardImpulse = this.sideImpulse = this.suspensionLength = this.skidInfo = this.suspensionForce = this.suspensionRelativeVelocity = 0;
                        this.raycastResult = new h();
                        this.worldTransform = new c();
                        this.isInContact = !1;
                    }
                    var e = b("../math/Vec3"),
                        c = b("../math/Transform"),
                        h = b("../collision/RaycastResult"),
                        l = b("../utils/Utils");
                    d.exports = a;
                    var k = new e(),
                        m = new e();
                    k = new e();
                    a.prototype.updateWheel = function (a) {
                        var b = this.raycastResult;
                        if (this.isInContact) {
                            var c = b.hitNormalWorld.dot(b.directionWorld);
                            b.hitPointWorld.vsub(a.position, m);
                            a.getVelocityAtWorldPoint(m, k);
                            a = b.hitNormalWorld.dot(k);
                            -0.1 <= c ? ((this.suspensionRelativeVelocity = 0), (this.clippedInvContactDotSuspension = 10)) : ((c = -1 / c), (this.suspensionRelativeVelocity = a * c), (this.clippedInvContactDotSuspension = c));
                        } else (b.suspensionLength = this.suspensionRestLength), (this.suspensionRelativeVelocity = 0), b.directionWorld.scale(-1, b.hitNormalWorld), (this.clippedInvContactDotSuspension = 1);
                    };
                },
                { "../collision/RaycastResult": 10, "../math/Transform": 29, "../math/Vec3": 30, "../utils/Utils": 53 },
            ],
            37: [
                function (b, d, f) {
                    function a(a) {
                        e.call(this);
                        this.type = e.types.BOX;
                        this.halfExtents = a;
                        this.convexPolyhedronRepresentation = null;
                        this.updateConvexPolyhedronRepresentation();
                        this.updateBoundingSphereRadius();
                    }
                    d.exports = a;
                    var e = b("./Shape"),
                        c = b("../math/Vec3"),
                        h = b("./ConvexPolyhedron");
                    a.prototype = new e();
                    a.prototype.constructor = a;
                    a.prototype.updateConvexPolyhedronRepresentation = function () {
                        var a = this.halfExtents.x,
                            b = this.halfExtents.y,
                            d = this.halfExtents.z;
                        a = [new c(-a, -b, -d), new c(a, -b, -d), new c(a, b, -d), new c(-a, b, -d), new c(-a, -b, d), new c(a, -b, d), new c(a, b, d), new c(-a, b, d)];
                        new c(0, 0, 1);
                        new c(0, 1, 0);
                        new c(1, 0, 0);
                        this.convexPolyhedronRepresentation = a = new h(a, [
                            [3, 2, 1, 0],
                            [4, 5, 6, 7],
                            [5, 4, 0, 1],
                            [2, 3, 7, 6],
                            [0, 4, 7, 3],
                            [1, 2, 6, 5],
                        ]);
                        a.material = this.material;
                    };
                    a.prototype.calculateLocalInertia = function (b, d) {
                        d = d || new c();
                        a.calculateInertia(this.halfExtents, b, d);
                        return d;
                    };
                    a.calculateInertia = function (a, b, c) {
                        c.x = (1 / 12) * b * (4 * a.y * a.y + 4 * a.z * a.z);
                        c.y = (1 / 12) * b * (4 * a.x * a.x + 4 * a.z * a.z);
                        c.z = (1 / 12) * b * (4 * a.y * a.y + 4 * a.x * a.x);
                    };
                    a.prototype.getSideNormals = function (a, b) {
                        var c = this.halfExtents;
                        a[0].set(c.x, 0, 0);
                        a[1].set(0, c.y, 0);
                        a[2].set(0, 0, c.z);
                        a[3].set(-c.x, 0, 0);
                        a[4].set(0, -c.y, 0);
                        a[5].set(0, 0, -c.z);
                        if (void 0 !== b) for (c = 0; c !== a.length; c++) b.vmult(a[c], a[c]);
                        return a;
                    };
                    a.prototype.volume = function () {
                        return 8 * this.halfExtents.x * this.halfExtents.y * this.halfExtents.z;
                    };
                    a.prototype.updateBoundingSphereRadius = function () {
                        this.boundingSphereRadius = this.halfExtents.norm();
                    };
                    var l = new c();
                    new c();
                    a.prototype.forEachWorldCorner = function (a, b, c) {
                        var d = this.halfExtents;
                        d = [
                            [d.x, d.y, d.z],
                            [-d.x, d.y, d.z],
                            [-d.x, -d.y, d.z],
                            [-d.x, -d.y, -d.z],
                            [d.x, -d.y, -d.z],
                            [d.x, d.y, -d.z],
                            [-d.x, d.y, -d.z],
                            [d.x, -d.y, d.z],
                        ];
                        for (var e = 0; e < d.length; e++) l.set(d[e][0], d[e][1], d[e][2]), b.vmult(l, l), a.vadd(l, l), c(l.x, l.y, l.z);
                    };
                    var k = [new c(), new c(), new c(), new c(), new c(), new c(), new c(), new c()];
                    a.prototype.calculateWorldAABB = function (a, b, c, d) {
                        var e = this.halfExtents;
                        k[0].set(e.x, e.y, e.z);
                        k[1].set(-e.x, e.y, e.z);
                        k[2].set(-e.x, -e.y, e.z);
                        k[3].set(-e.x, -e.y, -e.z);
                        k[4].set(e.x, -e.y, -e.z);
                        k[5].set(e.x, e.y, -e.z);
                        k[6].set(-e.x, e.y, -e.z);
                        k[7].set(e.x, -e.y, e.z);
                        var f = k[0];
                        b.vmult(f, f);
                        a.vadd(f, f);
                        d.copy(f);
                        c.copy(f);
                        for (e = 1; 8 > e; e++) {
                            f = k[e];
                            b.vmult(f, f);
                            a.vadd(f, f);
                            var h = f.x,
                                m = f.y;
                            f = f.z;
                            h > d.x && (d.x = h);
                            m > d.y && (d.y = m);
                            f > d.z && (d.z = f);
                            h < c.x && (c.x = h);
                            m < c.y && (c.y = m);
                            f < c.z && (c.z = f);
                        }
                    };
                },
                { "../math/Vec3": 30, "./ConvexPolyhedron": 38, "./Shape": 43 },
            ],
            38: [
                function (b, d, f) {
                    function a(a, b, c) {
                        e.call(this);
                        this.type = e.types.CONVEXPOLYHEDRON;
                        this.vertices = a || [];
                        this.worldVertices = [];
                        this.worldVerticesNeedsUpdate = !0;
                        this.faces = b || [];
                        this.faceNormals = [];
                        this.computeNormals();
                        this.worldFaceNormalsNeedsUpdate = !0;
                        this.worldFaceNormals = [];
                        this.uniqueEdges = [];
                        this.uniqueAxes = c ? c.slice() : null;
                        this.computeEdges();
                        this.updateBoundingSphereRadius();
                    }
                    d.exports = a;
                    var e = b("./Shape"),
                        c = b("../math/Vec3");
                    b("../math/Quaternion");
                    var h = b("../math/Transform");
                    a.prototype = new e();
                    a.prototype.constructor = a;
                    var l = new c();
                    a.prototype.computeEdges = function () {
                        for (var a = this.faces, b = this.vertices, c = this.uniqueEdges, d = (c.length = 0); d !== a.length; d++)
                            for (var e = a[d], f = e.length, k = 0; k !== f; k++) {
                                b[e[k]].vsub(b[e[(k + 1) % f]], l);
                                l.normalize();
                                for (var h = !1, m = 0; m !== c.length; m++)
                                    if (c[m].almostEquals(l) || c[m].almostEquals(l)) {
                                        h = !0;
                                        break;
                                    }
                                h || c.push(l.clone());
                            }
                    };
                    a.prototype.computeNormals = function () {
                        this.faceNormals.length = this.faces.length;
                        for (var a = 0; a < this.faces.length; a++) {
                            for (var b = 0; b < this.faces[a].length; b++) if (!this.vertices[this.faces[a][b]]) throw Error("Vertex " + this.faces[a][b] + " not found!");
                            b = this.faceNormals[a] || new c();
                            this.getFaceNormal(a, b);
                            b.negate(b);
                            this.faceNormals[a] = b;
                            if (0 > b.dot(this.vertices[this.faces[a][0]]))
                                for (
                                    console.error(
                                        ".faceNormals[" + a + "] = Vec3(" + b.toString() + ") looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule."
                                    ),
                                        b = 0;
                                    b < this.faces[a].length;
                                    b++
                                )
                                    console.warn(".vertices[" + this.faces[a][b] + "] = Vec3(" + this.vertices[this.faces[a][b]].toString() + ")");
                        }
                    };
                    var k = new c(),
                        m = new c();
                    a.computeNormal = function (a, b, c, d) {
                        b.vsub(a, m);
                        c.vsub(b, k);
                        k.cross(m, d);
                        d.isZero() || d.normalize();
                    };
                    a.prototype.getFaceNormal = function (b, c) {
                        var d = this.faces[b];
                        return a.computeNormal(this.vertices[d[0]], this.vertices[d[1]], this.vertices[d[2]], c);
                    };
                    var p = new c();
                    a.prototype.clipAgainstHull = function (a, b, d, e, f, k, h, m, l) {
                        for (var n = -1, q = -Number.MAX_VALUE, r = 0; r < d.faces.length; r++) {
                            p.copy(d.faceNormals[r]);
                            f.vmult(p, p);
                            var t = p.dot(k);
                            t > q && ((q = t), (n = r));
                        }
                        q = [];
                        r = d.faces[n];
                        t = r.length;
                        for (var u = 0; u < t; u++) {
                            var w = d.vertices[r[u]],
                                C = new c();
                            C.copy(w);
                            f.vmult(C, C);
                            e.vadd(C, C);
                            q.push(C);
                        }
                        0 <= n && this.clipFaceAgainstHull(k, a, b, q, h, m, l);
                    };
                    var n = new c(),
                        q = new c(),
                        u = new c(),
                        r = new c(),
                        w = new c(),
                        v = new c();
                    a.prototype.findSeparatingAxis = function (a, b, c, d, e, f, k, h) {
                        var m = Number.MAX_VALUE,
                            l = 0;
                        if (this.uniqueAxes)
                            for (t = 0; t !== this.uniqueAxes.length; t++) {
                                c.vmult(this.uniqueAxes[t], n);
                                C = this.testSepAxis(n, a, b, c, d, e);
                                if (!1 === C) return !1;
                                C < m && ((m = C), f.copy(n));
                            }
                        else
                            for (var p = k ? k.length : this.faces.length, t = 0; t < p; t++) {
                                C = k ? k[t] : t;
                                n.copy(this.faceNormals[C]);
                                c.vmult(n, n);
                                var C = this.testSepAxis(n, a, b, c, d, e);
                                if (!1 === C) return !1;
                                C < m && ((m = C), f.copy(n));
                            }
                        if (a.uniqueAxes)
                            for (t = 0; t !== a.uniqueAxes.length; t++) {
                                e.vmult(a.uniqueAxes[t], q);
                                l++;
                                C = this.testSepAxis(q, a, b, c, d, e);
                                if (!1 === C) return !1;
                                C < m && ((m = C), f.copy(q));
                            }
                        else
                            for (k = h ? h.length : a.faces.length, t = 0; t < k; t++) {
                                C = h ? h[t] : t;
                                q.copy(a.faceNormals[C]);
                                e.vmult(q, q);
                                l++;
                                C = this.testSepAxis(q, a, b, c, d, e);
                                if (!1 === C) return !1;
                                C < m && ((m = C), f.copy(q));
                            }
                        for (h = 0; h !== this.uniqueEdges.length; h++)
                            for (c.vmult(this.uniqueEdges[h], r), l = 0; l !== a.uniqueEdges.length; l++)
                                if ((e.vmult(a.uniqueEdges[l], w), r.cross(w, v), !v.almostZero())) {
                                    v.normalize();
                                    t = this.testSepAxis(v, a, b, c, d, e);
                                    if (!1 === t) return !1;
                                    t < m && ((m = t), f.copy(v));
                                }
                        d.vsub(b, u);
                        0 < u.dot(f) && f.negate(f);
                        return !0;
                    };
                    var x = [],
                        y = [];
                    a.prototype.testSepAxis = function (b, c, d, e, f, k) {
                        a.project(this, b, d, e, x);
                        a.project(c, b, f, k, y);
                        d = x[0];
                        b = x[1];
                        c = y[0];
                        e = y[1];
                        if (d < e || c < b) return !1;
                        d -= e;
                        b = c - b;
                        return d < b ? d : b;
                    };
                    var z = new c(),
                        E = new c();
                    a.prototype.calculateLocalInertia = function (a, b) {
                        this.computeLocalAABB(z, E);
                        var c = E.x - z.x,
                            d = E.y - z.y,
                            e = E.z - z.z;
                        b.x = (1 / 12) * a * (4 * d * d + 4 * e * e);
                        b.y = (1 / 12) * a * (4 * c * c + 4 * e * e);
                        b.z = (1 / 12) * a * (4 * d * d + 4 * c * c);
                    };
                    a.prototype.getPlaneConstantOfFace = function (a) {
                        return -this.faceNormals[a].dot(this.vertices[this.faces[a][0]]);
                    };
                    var A = new c(),
                        F = new c(),
                        L = new c(),
                        H = new c(),
                        P = new c(),
                        R = new c(),
                        M = new c(),
                        N = new c();
                    a.prototype.clipFaceAgainstHull = function (a, b, c, d, e, f, k) {
                        for (var h = [], m = -1, l = Number.MAX_VALUE, n = 0; n < this.faces.length; n++) {
                            A.copy(this.faceNormals[n]);
                            c.vmult(A, A);
                            var p = A.dot(a);
                            p < l && ((l = p), (m = n));
                        }
                        if (!(0 > m)) {
                            a = this.faces[m];
                            a.connectedFaces = [];
                            for (l = 0; l < this.faces.length; l++) for (n = 0; n < this.faces[l].length; n++) -1 !== a.indexOf(this.faces[l][n]) && l !== m && -1 === a.connectedFaces.indexOf(l) && a.connectedFaces.push(l);
                            l = a.length;
                            for (n = 0; n < l; n++) {
                                p = this.vertices[a[n]];
                                p.vsub(this.vertices[a[(n + 1) % l]], F);
                                L.copy(F);
                                c.vmult(L, L);
                                b.vadd(L, L);
                                H.copy(this.faceNormals[m]);
                                c.vmult(H, H);
                                b.vadd(H, H);
                                L.cross(H, P);
                                P.negate(P);
                                R.copy(p);
                                c.vmult(R, R);
                                b.vadd(R, R);
                                R.dot(P);
                                p = a.connectedFaces[n];
                                M.copy(this.faceNormals[p]);
                                p = this.getPlaneConstantOfFace(p);
                                N.copy(M);
                                c.vmult(N, N);
                                p -= N.dot(b);
                                for (this.clipFaceAgainstPlane(d, h, N, p); d.length; ) d.shift();
                                for (; h.length; ) d.push(h.shift());
                            }
                            M.copy(this.faceNormals[m]);
                            p = this.getPlaneConstantOfFace(m);
                            N.copy(M);
                            c.vmult(N, N);
                            p -= N.dot(b);
                            for (l = 0; l < d.length; l++)
                                (b = N.dot(d[l]) + p), b <= e && (console.log("clamped: depth=" + b + " to minDist=" + (e + "")), (b = e)), b <= f && ((c = d[l]), 0 >= b && k.push({ point: c, normal: N, depth: b }));
                        }
                    };
                    a.prototype.clipFaceAgainstPlane = function (a, b, d, e) {
                        var f = a.length;
                        if (2 > f) return b;
                        var k = a[a.length - 1];
                        var h = d.dot(k) + e;
                        for (var m = 0; m < f; m++) {
                            var l = a[m];
                            var n = d.dot(l) + e;
                            if (0 > h) {
                                if (0 > n) {
                                    var p = new c();
                                    p.copy(l);
                                } else (p = new c()), k.lerp(l, h / (h - n), p);
                                b.push(p);
                            } else 0 > n && ((p = new c()), k.lerp(l, h / (h - n), p), b.push(p), b.push(l));
                            k = l;
                            h = n;
                        }
                        return b;
                    };
                    a.prototype.computeWorldVertices = function (a, b) {
                        for (var d = this.vertices.length; this.worldVertices.length < d; ) this.worldVertices.push(new c());
                        for (var e = this.vertices, f = this.worldVertices, k = 0; k !== d; k++) b.vmult(e[k], f[k]), a.vadd(f[k], f[k]);
                        this.worldVerticesNeedsUpdate = !1;
                    };
                    new c();
                    a.prototype.computeLocalAABB = function (a, b) {
                        var c = this.vertices.length,
                            d = this.vertices;
                        a.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
                        b.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
                        for (var e = 0; e < c; e++) {
                            var f = d[e];
                            f.x < a.x ? (a.x = f.x) : f.x > b.x && (b.x = f.x);
                            f.y < a.y ? (a.y = f.y) : f.y > b.y && (b.y = f.y);
                            f.z < a.z ? (a.z = f.z) : f.z > b.z && (b.z = f.z);
                        }
                    };
                    a.prototype.computeWorldFaceNormals = function (a) {
                        for (var b = this.faceNormals.length; this.worldFaceNormals.length < b; ) this.worldFaceNormals.push(new c());
                        for (var d = this.faceNormals, e = this.worldFaceNormals, f = 0; f !== b; f++) a.vmult(d[f], e[f]);
                        this.worldFaceNormalsNeedsUpdate = !1;
                    };
                    a.prototype.updateBoundingSphereRadius = function () {
                        for (var a = 0, b = this.vertices, c = 0, d = b.length; c !== d; c++) {
                            var e = b[c].norm2();
                            e > a && (a = e);
                        }
                        this.boundingSphereRadius = Math.sqrt(a);
                    };
                    var J = new c();
                    a.prototype.calculateWorldAABB = function (a, b, c, d) {
                        for (var e = this.vertices.length, f = this.vertices, k, h, m, l, n, p, q = 0; q < e; q++) {
                            J.copy(f[q]);
                            b.vmult(J, J);
                            a.vadd(J, J);
                            var t = J;
                            if (t.x < k || void 0 === k) k = t.x;
                            else if (t.x > l || void 0 === l) l = t.x;
                            if (t.y < h || void 0 === h) h = t.y;
                            else if (t.y > n || void 0 === n) n = t.y;
                            if (t.z < m || void 0 === m) m = t.z;
                            else if (t.z > p || void 0 === p) p = t.z;
                        }
                        c.set(k, h, m);
                        d.set(l, n, p);
                    };
                    a.prototype.volume = function () {
                        return (4 * Math.PI * this.boundingSphereRadius) / 3;
                    };
                    a.prototype.getAveragePointLocal = function (a) {
                        a = a || new c();
                        for (var b = this.vertices.length, d = this.vertices, e = 0; e < b; e++) a.vadd(d[e], a);
                        a.mult(1 / b, a);
                        return a;
                    };
                    a.prototype.transformAllPoints = function (a, b) {
                        var c = this.vertices.length,
                            d = this.vertices;
                        if (b) {
                            for (var e = 0; e < c; e++) {
                                var f = d[e];
                                b.vmult(f, f);
                            }
                            for (e = 0; e < this.faceNormals.length; e++) (f = this.faceNormals[e]), b.vmult(f, f);
                        }
                        if (a) for (e = 0; e < c; e++) (f = d[e]), f.vadd(a, f);
                    };
                    var O = new c(),
                        K = new c(),
                        C = new c();
                    a.prototype.pointIsInside = function (a) {
                        var b = this.vertices,
                            c = this.faces,
                            d = this.faceNormals,
                            e = this.faces.length;
                        this.getAveragePointLocal(O);
                        for (var f = 0; f < e; f++) {
                            var k = d[f];
                            var h = b[c[f][0]],
                                m = K;
                            a.vsub(h, m);
                            m = k.dot(m);
                            var l = C;
                            O.vsub(h, l);
                            k = k.dot(l);
                            if ((0 > m && 0 < k) || (0 < m && 0 > k)) return !1;
                        }
                        return -1;
                    };
                    new c();
                    var T = new c(),
                        t = new c();
                    a.project = function (a, b, c, d, e) {
                        var f = a.vertices.length;
                        a = a.vertices;
                        t.setZero();
                        h.vectorToLocalFrame(c, d, b, T);
                        h.pointToLocalFrame(c, d, t, t);
                        d = t.dot(T);
                        c = b = a[0].dot(T);
                        for (var k = 1; k < f; k++) {
                            var m = a[k].dot(T);
                            m > b && (b = m);
                            m < c && (c = m);
                        }
                        c -= d;
                        b -= d;
                        c > b && ((f = c), (c = b), (b = f));
                        e[0] = b;
                        e[1] = c;
                    };
                },
                { "../math/Quaternion": 28, "../math/Transform": 29, "../math/Vec3": 30, "./Shape": 43 },
            ],
            39: [
                function (b, d, f) {
                    function a(a, b, d, f) {
                        var k = [],
                            m = [],
                            l = [],
                            p = [],
                            w = [],
                            v = Math.cos,
                            x = Math.sin;
                        k.push(new c(b * v(0), b * x(0), 0.5 * -d));
                        p.push(0);
                        k.push(new c(a * v(0), a * x(0), 0.5 * d));
                        w.push(1);
                        for (var y = 0; y < f; y++) {
                            var z = ((2 * Math.PI) / f) * (y + 1),
                                E = ((2 * Math.PI) / f) * (y + 0.5);
                            y < f - 1
                                ? (k.push(new c(b * v(z), b * x(z), 0.5 * -d)), p.push(2 * y + 2), k.push(new c(a * v(z), a * x(z), 0.5 * d)), w.push(2 * y + 3), l.push([2 * y + 2, 2 * y + 3, 2 * y + 1, 2 * y]))
                                : l.push([0, 1, 2 * y + 1, 2 * y]);
                            (1 === f % 2 || y < f / 2) && m.push(new c(v(E), x(E), 0));
                        }
                        l.push(w);
                        m.push(new c(0, 0, 1));
                        a = [];
                        for (y = 0; y < p.length; y++) a.push(p[p.length - y - 1]);
                        l.push(a);
                        this.type = e.types.CONVEXPOLYHEDRON;
                        h.call(this, k, l, m);
                    }
                    d.exports = a;
                    var e = b("./Shape"),
                        c = b("../math/Vec3");
                    b("../math/Quaternion");
                    var h = b("./ConvexPolyhedron");
                    a.prototype = new h();
                },
                { "../math/Quaternion": 28, "../math/Vec3": 30, "./ConvexPolyhedron": 38, "./Shape": 43 },
            ],
            40: [
                function (b, d, f) {
                    function a(a, b) {
                        b = l.defaults(b, { maxValue: null, minValue: null, elementSize: 1 });
                        this.data = a;
                        this.maxValue = b.maxValue;
                        this.minValue = b.minValue;
                        this.elementSize = b.elementSize;
                        null === b.minValue && this.updateMinValue();
                        null === b.maxValue && this.updateMaxValue();
                        this.cacheEnabled = !0;
                        e.call(this);
                        this.pillarConvex = new c();
                        this.pillarOffset = new h();
                        this.type = e.types.HEIGHTFIELD;
                        this.updateBoundingSphereRadius();
                        this._cachedPillars = {};
                    }
                    var e = b("./Shape"),
                        c = b("./ConvexPolyhedron"),
                        h = b("../math/Vec3"),
                        l = b("../utils/Utils");
                    d.exports = a;
                    a.prototype = new e();
                    a.prototype.update = function () {
                        this._cachedPillars = {};
                    };
                    a.prototype.updateMinValue = function () {
                        for (var a = this.data, b = a[0][0], c = 0; c !== a.length; c++)
                            for (var d = 0; d !== a[c].length; d++) {
                                var e = a[c][d];
                                e < b && (b = e);
                            }
                        this.minValue = b;
                    };
                    a.prototype.updateMaxValue = function () {
                        for (var a = this.data, b = a[0][0], c = 0; c !== a.length; c++)
                            for (var d = 0; d !== a[c].length; d++) {
                                var e = a[c][d];
                                e > b && (b = e);
                            }
                        this.maxValue = b;
                    };
                    a.prototype.setHeightValueAtIndex = function (a, b, c) {
                        this.data[a][b] = c;
                        this.clearCachedConvexTrianglePillar(a, b, !1);
                        0 < a && (this.clearCachedConvexTrianglePillar(a - 1, b, !0), this.clearCachedConvexTrianglePillar(a - 1, b, !1));
                        0 < b && (this.clearCachedConvexTrianglePillar(a, b - 1, !0), this.clearCachedConvexTrianglePillar(a, b - 1, !1));
                        0 < b && 0 < a && this.clearCachedConvexTrianglePillar(a - 1, b - 1, !0);
                    };
                    a.prototype.getRectMinMax = function (a, b, c, d, e) {
                        e = e || [];
                        for (var f = this.data, h = this.minValue; a <= c; a++)
                            for (var k = b; k <= d; k++) {
                                var m = f[a][k];
                                m > h && (h = m);
                            }
                        e[0] = this.minValue;
                        e[1] = h;
                    };
                    a.prototype.getIndexOfPosition = function (a, b, c, d) {
                        var e = this.elementSize,
                            f = this.data;
                        a = Math.floor(a / e);
                        b = Math.floor(b / e);
                        c[0] = a;
                        c[1] = b;
                        d && (0 > a && (a = 0), 0 > b && (b = 0), a >= f.length - 1 && (a = f.length - 1), b >= f[0].length - 1 && (b = f[0].length - 1));
                        return 0 > a || 0 > b || a >= f.length - 1 || b >= f[0].length - 1 ? !1 : !0;
                    };
                    a.prototype.getHeightAt = function (a, b, c) {
                        var d = [];
                        this.getIndexOfPosition(a, b, d, c);
                        a = [];
                        this.getRectMinMax(d[0], d[1] + 1, d[0], d[1] + 1, a);
                        return (a[0] + a[1]) / 2;
                    };
                    a.prototype.getCacheConvexTrianglePillarKey = function (a, b, c) {
                        return a + "_" + b + "_" + (c ? 1 : 0);
                    };
                    a.prototype.getCachedConvexTrianglePillar = function (a, b, c) {
                        return this._cachedPillars[this.getCacheConvexTrianglePillarKey(a, b, c)];
                    };
                    a.prototype.setCachedConvexTrianglePillar = function (a, b, c, d, e) {
                        this._cachedPillars[this.getCacheConvexTrianglePillarKey(a, b, c)] = { convex: d, offset: e };
                    };
                    a.prototype.clearCachedConvexTrianglePillar = function (a, b, c) {
                        delete this._cachedPillars[this.getCacheConvexTrianglePillarKey(a, b, c)];
                    };
                    a.prototype.getConvexTrianglePillar = function (a, b, d) {
                        var e = this.pillarConvex,
                            f = this.pillarOffset;
                        if (this.cacheEnabled) {
                            var k = this.getCachedConvexTrianglePillar(a, b, d);
                            if (k) {
                                this.pillarConvex = k.convex;
                                this.pillarOffset = k.offset;
                                return;
                            }
                            e = new c();
                            f = new h();
                            this.pillarConvex = e;
                            this.pillarOffset = f;
                        }
                        k = this.data;
                        var m = this.elementSize,
                            l = e.faces;
                        e.vertices.length = 6;
                        for (var p = 0; 6 > p; p++) e.vertices[p] || (e.vertices[p] = new h());
                        l.length = 5;
                        for (p = 0; 5 > p; p++) l[p] || (l[p] = []);
                        p = e.vertices;
                        var x = (Math.min(k[a][b], k[a + 1][b], k[a][b + 1], k[a + 1][b + 1]) - this.minValue) / 2 + this.minValue;
                        d
                            ? (f.set((a + 0.75) * m, (b + 0.75) * m, x),
                              p[0].set(0.25 * m, 0.25 * m, k[a + 1][b + 1] - x),
                              p[1].set(-0.75 * m, 0.25 * m, k[a][b + 1] - x),
                              p[2].set(0.25 * m, -0.75 * m, k[a + 1][b] - x),
                              p[3].set(0.25 * m, 0.25 * m, -x - 1),
                              p[4].set(-0.75 * m, 0.25 * m, -x - 1),
                              p[5].set(0.25 * m, -0.75 * m, -x - 1),
                              (l[0][0] = 0),
                              (l[0][1] = 1),
                              (l[0][2] = 2),
                              (l[1][0] = 5),
                              (l[1][1] = 4),
                              (l[1][2] = 3),
                              (l[2][0] = 2),
                              (l[2][1] = 5),
                              (l[2][2] = 3),
                              (l[2][3] = 0),
                              (l[3][0] = 3),
                              (l[3][1] = 4),
                              (l[3][2] = 1),
                              (l[3][3] = 0),
                              (l[4][0] = 1),
                              (l[4][1] = 4),
                              (l[4][2] = 5),
                              (l[4][3] = 2))
                            : (f.set((a + 0.25) * m, (b + 0.25) * m, x),
                              p[0].set(-0.25 * m, -0.25 * m, k[a][b] - x),
                              p[1].set(0.75 * m, -0.25 * m, k[a + 1][b] - x),
                              p[2].set(-0.25 * m, 0.75 * m, k[a][b + 1] - x),
                              p[3].set(-0.25 * m, -0.25 * m, -x - 1),
                              p[4].set(0.75 * m, -0.25 * m, -x - 1),
                              p[5].set(-0.25 * m, 0.75 * m, -x - 1),
                              (l[0][0] = 0),
                              (l[0][1] = 1),
                              (l[0][2] = 2),
                              (l[1][0] = 5),
                              (l[1][1] = 4),
                              (l[1][2] = 3),
                              (l[2][0] = 0),
                              (l[2][1] = 2),
                              (l[2][2] = 5),
                              (l[2][3] = 3),
                              (l[3][0] = 1),
                              (l[3][1] = 0),
                              (l[3][2] = 3),
                              (l[3][3] = 4),
                              (l[4][0] = 4),
                              (l[4][1] = 5),
                              (l[4][2] = 2),
                              (l[4][3] = 1));
                        e.computeNormals();
                        e.computeEdges();
                        e.updateBoundingSphereRadius();
                        this.setCachedConvexTrianglePillar(a, b, d, e, f);
                    };
                    a.prototype.calculateLocalInertia = function (a, b) {
                        b = b || new h();
                        b.set(0, 0, 0);
                        return b;
                    };
                    a.prototype.volume = function () {
                        return Number.MAX_VALUE;
                    };
                    a.prototype.calculateWorldAABB = function (a, b, c, d) {
                        c.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
                        d.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
                    };
                    a.prototype.updateBoundingSphereRadius = function () {
                        var a = this.data,
                            b = this.elementSize;
                        this.boundingSphereRadius = new h(a.length * b, a[0].length * b, Math.max(Math.abs(this.maxValue), Math.abs(this.minValue))).norm();
                    };
                },
                { "../math/Vec3": 30, "../utils/Utils": 53, "./ConvexPolyhedron": 38, "./Shape": 43 },
            ],
            41: [
                function (b, d, f) {
                    function a() {
                        e.call(this);
                        this.type = e.types.PARTICLE;
                    }
                    d.exports = a;
                    var e = b("./Shape"),
                        c = b("../math/Vec3");
                    a.prototype = new e();
                    a.prototype.constructor = a;
                    a.prototype.calculateLocalInertia = function (a, b) {
                        b = b || new c();
                        b.set(0, 0, 0);
                        return b;
                    };
                    a.prototype.volume = function () {
                        return 0;
                    };
                    a.prototype.updateBoundingSphereRadius = function () {
                        this.boundingSphereRadius = 0;
                    };
                    a.prototype.calculateWorldAABB = function (a, b, c, d) {
                        c.copy(a);
                        d.copy(a);
                    };
                },
                { "../math/Vec3": 30, "./Shape": 43 },
            ],
            42: [
                function (b, d, f) {
                    function a() {
                        e.call(this);
                        this.type = e.types.PLANE;
                        this.worldNormal = new c();
                        this.worldNormalNeedsUpdate = !0;
                        this.boundingSphereRadius = Number.MAX_VALUE;
                    }
                    d.exports = a;
                    var e = b("./Shape"),
                        c = b("../math/Vec3");
                    a.prototype = new e();
                    a.prototype.constructor = a;
                    a.prototype.computeWorldNormal = function (a) {
                        var b = this.worldNormal;
                        b.set(0, 0, 1);
                        a.vmult(b, b);
                        this.worldNormalNeedsUpdate = !1;
                    };
                    a.prototype.calculateLocalInertia = function (a, b) {
                        return (b = b || new c());
                    };
                    a.prototype.volume = function () {
                        return Number.MAX_VALUE;
                    };
                    var h = new c();
                    a.prototype.calculateWorldAABB = function (a, b, c, d) {
                        h.set(0, 0, 1);
                        b.vmult(h, h);
                        b = Number.MAX_VALUE;
                        c.set(-b, -b, -b);
                        d.set(b, b, b);
                        1 === h.x && (d.x = a.x);
                        1 === h.y && (d.y = a.y);
                        1 === h.z && (d.z = a.z);
                        -1 === h.x && (c.x = a.x);
                        -1 === h.y && (c.y = a.y);
                        -1 === h.z && (c.z = a.z);
                    };
                    a.prototype.updateBoundingSphereRadius = function () {
                        this.boundingSphereRadius = Number.MAX_VALUE;
                    };
                },
                { "../math/Vec3": 30, "./Shape": 43 },
            ],
            43: [
                function (b, d, f) {
                    function a() {
                        this.id = a.idCounter++;
                        this.boundingSphereRadius = this.type = 0;
                        this.collisionResponse = !0;
                        this.material = null;
                    }
                    d.exports = a;
                    a = b("./Shape");
                    b("../math/Vec3");
                    b("../math/Quaternion");
                    b("../material/Material");
                    a.prototype.constructor = a;
                    a.prototype.updateBoundingSphereRadius = function () {
                        throw "computeBoundingSphereRadius() not implemented for shape type " + this.type;
                    };
                    a.prototype.volume = function () {
                        throw "volume() not implemented for shape type " + this.type;
                    };
                    a.prototype.calculateLocalInertia = function (a, b) {
                        throw "calculateLocalInertia() not implemented for shape type " + this.type;
                    };
                    a.idCounter = 0;
                    a.types = { SPHERE: 1, PLANE: 2, BOX: 4, COMPOUND: 8, CONVEXPOLYHEDRON: 16, HEIGHTFIELD: 32, PARTICLE: 64, CYLINDER: 128, TRIMESH: 256 };
                },
                { "../material/Material": 25, "../math/Quaternion": 28, "../math/Vec3": 30, "./Shape": 43 },
            ],
            44: [
                function (b, d, f) {
                    function a(a) {
                        e.call(this);
                        this.radius = void 0 !== a ? Number(a) : 1;
                        this.type = e.types.SPHERE;
                        if (0 > this.radius) throw Error("The sphere radius cannot be negative.");
                        this.updateBoundingSphereRadius();
                    }
                    d.exports = a;
                    var e = b("./Shape"),
                        c = b("../math/Vec3");
                    a.prototype = new e();
                    a.prototype.constructor = a;
                    a.prototype.calculateLocalInertia = function (a, b) {
                        b = b || new c();
                        var d = (2 * a * this.radius * this.radius) / 5;
                        b.x = d;
                        b.y = d;
                        b.z = d;
                        return b;
                    };
                    a.prototype.volume = function () {
                        return (4 * Math.PI * this.radius) / 3;
                    };
                    a.prototype.updateBoundingSphereRadius = function () {
                        this.boundingSphereRadius = this.radius;
                    };
                    a.prototype.calculateWorldAABB = function (a, b, c, d) {
                        b = this.radius;
                        for (var e = ["x", "y", "z"], f = 0; f < e.length; f++) {
                            var h = e[f];
                            c[h] = a[h] - b;
                            d[h] = a[h] + b;
                        }
                    };
                },
                { "../math/Vec3": 30, "./Shape": 43 },
            ],
            45: [
                function (b, d, f) {
                    function a(a, b) {
                        e.call(this);
                        this.type = e.types.TRIMESH;
                        this.vertices = new Float32Array(a);
                        this.indices = new Int16Array(b);
                        this.normals = new Float32Array(b.length);
                        this.aabb = new l();
                        this.edges = null;
                        this.scale = new c(1, 1, 1);
                        this.tree = new k();
                        this.updateEdges();
                        this.updateNormals();
                        this.updateAABB();
                        this.updateBoundingSphereRadius();
                        this.updateTree();
                    }
                    d.exports = a;
                    var e = b("./Shape"),
                        c = b("../math/Vec3");
                    b("../math/Quaternion");
                    var h = b("../math/Transform"),
                        l = b("../collision/AABB"),
                        k = b("../utils/Octree");
                    a.prototype = new e();
                    a.prototype.constructor = a;
                    var m = new c();
                    a.prototype.updateTree = function () {
                        var a = this.tree;
                        a.reset();
                        a.aabb.copy(this.aabb);
                        var b = this.scale;
                        a.aabb.lowerBound.x *= 1 / b.x;
                        a.aabb.lowerBound.y *= 1 / b.y;
                        a.aabb.lowerBound.z *= 1 / b.z;
                        a.aabb.upperBound.x *= 1 / b.x;
                        a.aabb.upperBound.y *= 1 / b.y;
                        a.aabb.upperBound.z *= 1 / b.z;
                        b = new l();
                        for (var d = new c(), e = new c(), f = new c(), h = [d, e, f], k = 0; k < this.indices.length / 3; k++) {
                            var m = 3 * k;
                            this._getUnscaledVertex(this.indices[m], d);
                            this._getUnscaledVertex(this.indices[m + 1], e);
                            this._getUnscaledVertex(this.indices[m + 2], f);
                            b.setFromPoints(h);
                            a.insert(b, k);
                        }
                        a.removeEmptyNodes();
                    };
                    var p = new l();
                    a.prototype.getTrianglesInAABB = function (a, b) {
                        p.copy(a);
                        var c = this.scale,
                            d = c.x,
                            e = c.y;
                        c = c.z;
                        var f = p.lowerBound,
                            h = p.upperBound;
                        f.x /= d;
                        f.y /= e;
                        f.z /= c;
                        h.x /= d;
                        h.y /= e;
                        h.z /= c;
                        return this.tree.aabbQuery(p, b);
                    };
                    a.prototype.setScale = function (a) {
                        var b = (a.x === a.y) === a.z;
                        ((this.scale.x === this.scale.y) === this.scale.z && b) || this.updateNormals();
                        this.scale.copy(a);
                        this.updateAABB();
                        this.updateBoundingSphereRadius();
                    };
                    a.prototype.updateNormals = function () {
                        for (var b = this.normals, c = 0; c < this.indices.length / 3; c++) {
                            var d = 3 * c,
                                e = this.indices[d + 1],
                                f = this.indices[d + 2];
                            this.getVertex(this.indices[d], w);
                            this.getVertex(e, v);
                            this.getVertex(f, x);
                            a.computeNormal(v, w, x, m);
                            b[d] = m.x;
                            b[d + 1] = m.y;
                            b[d + 2] = m.z;
                        }
                    };
                    a.prototype.updateEdges = function () {
                        for (
                            var a = {},
                                b = function (b, c) {
                                    a[e < f ? e + "_" + f : f + "_" + e] = !0;
                                },
                                c = 0;
                            c < this.indices.length / 3;
                            c++
                        ) {
                            var d = 3 * c,
                                e = this.indices[d],
                                f = this.indices[d + 1];
                            d = this.indices[d + 2];
                            b(e, f);
                            b(f, d);
                            b(d, e);
                        }
                        b = Object.keys(a);
                        this.edges = new Int16Array(2 * b.length);
                        for (c = 0; c < b.length; c++) (d = b[c].split("_")), (this.edges[2 * c] = parseInt(d[0], 10)), (this.edges[2 * c + 1] = parseInt(d[1], 10));
                    };
                    a.prototype.getEdgeVertex = function (a, b, c) {
                        this.getVertex(this.edges[2 * a + (b ? 1 : 0)], c);
                    };
                    var n = new c(),
                        q = new c();
                    a.prototype.getEdgeVector = function (a, b) {
                        this.getEdgeVertex(a, 0, n);
                        this.getEdgeVertex(a, 1, q);
                        q.vsub(n, b);
                    };
                    var u = new c(),
                        r = new c();
                    a.computeNormal = function (a, b, c, d) {
                        b.vsub(a, r);
                        c.vsub(b, u);
                        u.cross(r, d);
                        d.isZero() || d.normalize();
                    };
                    var w = new c(),
                        v = new c(),
                        x = new c();
                    a.prototype.getVertex = function (a, b) {
                        var c = this.scale;
                        this._getUnscaledVertex(a, b);
                        b.x *= c.x;
                        b.y *= c.y;
                        b.z *= c.z;
                        return b;
                    };
                    a.prototype._getUnscaledVertex = function (a, b) {
                        var c = 3 * a,
                            d = this.vertices;
                        return b.set(d[c], d[c + 1], d[c + 2]);
                    };
                    a.prototype.getWorldVertex = function (a, b, c, d) {
                        this.getVertex(a, d);
                        h.pointToWorldFrame(b, c, d, d);
                        return d;
                    };
                    a.prototype.getTriangleVertices = function (a, b, c, d) {
                        a *= 3;
                        this.getVertex(this.indices[a], b);
                        this.getVertex(this.indices[a + 1], c);
                        this.getVertex(this.indices[a + 2], d);
                    };
                    a.prototype.getNormal = function (a, b) {
                        var c = 3 * a;
                        return b.set(this.normals[c], this.normals[c + 1], this.normals[c + 2]);
                    };
                    var y = new l();
                    a.prototype.calculateLocalInertia = function (a, b) {
                        this.computeLocalAABB(y);
                        var c = y.upperBound.x - y.lowerBound.x,
                            d = y.upperBound.y - y.lowerBound.y,
                            e = y.upperBound.z - y.lowerBound.z;
                        return b.set((1 / 12) * a * (4 * d * d + 4 * e * e), (1 / 12) * a * (4 * c * c + 4 * e * e), (1 / 12) * a * (4 * d * d + 4 * c * c));
                    };
                    var z = new c();
                    a.prototype.computeLocalAABB = function (a) {
                        var b = a.lowerBound;
                        a = a.upperBound;
                        var c = this.vertices.length;
                        this.getVertex(0, z);
                        b.copy(z);
                        a.copy(z);
                        for (var d = 0; d !== c; d++) this.getVertex(d, z), z.x < b.x ? (b.x = z.x) : z.x > a.x && (a.x = z.x), z.y < b.y ? (b.y = z.y) : z.y > a.y && (a.y = z.y), z.z < b.z ? (b.z = z.z) : z.z > a.z && (a.z = z.z);
                    };
                    a.prototype.updateAABB = function () {
                        this.computeLocalAABB(this.aabb);
                    };
                    a.prototype.updateBoundingSphereRadius = function () {
                        var a = 0,
                            b = this.vertices,
                            d = new c(),
                            e = 0;
                        for (b = b.length / 3; e !== b; e++) {
                            this.getVertex(e, d);
                            var f = d.norm2();
                            f > a && (a = f);
                        }
                        this.boundingSphereRadius = Math.sqrt(a);
                    };
                    new c();
                    var E = new h(),
                        A = new l();
                    a.prototype.calculateWorldAABB = function (a, b, c, d) {
                        E.position = a;
                        E.quaternion = b;
                        this.aabb.toWorldFrame(E, A);
                        c.copy(A.lowerBound);
                        d.copy(A.upperBound);
                    };
                    a.prototype.volume = function () {
                        return (4 * Math.PI * this.boundingSphereRadius) / 3;
                    };
                    a.createTorus = function (b, c, d, e, f) {
                        b = b || 1;
                        c = c || 0.5;
                        d = d || 8;
                        e = e || 6;
                        f = f || 2 * Math.PI;
                        for (var h = [], k = [], m = 0; m <= d; m++)
                            for (var l = 0; l <= e; l++) {
                                var n = (l / e) * f,
                                    p = (m / d) * Math.PI * 2;
                                h.push((b + c * Math.cos(p)) * Math.cos(n), (b + c * Math.cos(p)) * Math.sin(n), c * Math.sin(p));
                            }
                        for (m = 1; m <= d; m++) for (l = 1; l <= e; l++) (b = (e + 1) * (m - 1) + l - 1), (c = (e + 1) * (m - 1) + l), (f = (e + 1) * m + l), k.push((e + 1) * m + l - 1, b, f), k.push(b, c, f);
                        return new a(h, k);
                    };
                },
                { "../collision/AABB": 3, "../math/Quaternion": 28, "../math/Transform": 29, "../math/Vec3": 30, "../utils/Octree": 50, "./Shape": 43 },
            ],
            46: [
                function (b, d, f) {
                    function a() {
                        e.call(this);
                        this.iterations = 10;
                        this.tolerance = 1e-7;
                    }
                    d.exports = a;
                    b("../math/Vec3");
                    b("../math/Quaternion");
                    var e = b("./Solver");
                    a.prototype = new e();
                    var c = [],
                        h = [],
                        l = [];
                    a.prototype.solve = function (a, b) {
                        var d = 0,
                            e = this.iterations,
                            f = this.tolerance * this.tolerance,
                            k = this.equations,
                            m = k.length,
                            w = b.bodies,
                            v = w.length,
                            x;
                        if (0 !== m) for (x = 0; x !== v; x++) w[x].updateSolveMassProperties();
                        h.length = m;
                        l.length = m;
                        c.length = m;
                        for (x = 0; x !== m; x++) {
                            var y = k[x];
                            c[x] = 0;
                            l[x] = y.computeB(a);
                            h[x] = 1 / y.computeC();
                        }
                        if (0 !== m) {
                            for (x = 0; x !== v; x++) (y = w[x]), (d = y.wlambda), y.vlambda.set(0, 0, 0), d && d.set(0, 0, 0);
                            for (d = 0; d !== e; d++) {
                                for (var z = (x = 0); z !== m; z++) {
                                    y = k[z];
                                    var E = l[z];
                                    var A = h[z];
                                    var F = c[z];
                                    var L = y.computeGWlambda();
                                    E = A * (E - L - y.eps * F);
                                    F + E < y.minForce ? (E = y.minForce - F) : F + E > y.maxForce && (E = y.maxForce - F);
                                    c[z] += E;
                                    x += 0 < E ? E : -E;
                                    y.addToWlambda(E);
                                }
                                if (x * x < f) break;
                            }
                            for (x = 0; x !== v; x++) (y = w[x]), (e = y.velocity), (f = y.angularVelocity), e.vadd(y.vlambda, e), f && f.vadd(y.wlambda, f);
                        }
                        return d;
                    };
                },
                { "../math/Quaternion": 28, "../math/Vec3": 30, "./Solver": 47 },
            ],
            47: [
                function (b, d, f) {
                    function a() {
                        this.equations = [];
                    }
                    d.exports = a;
                    a.prototype.solve = function (a, b) {
                        return 0;
                    };
                    a.prototype.addEquation = function (a) {
                        a.enabled && this.equations.push(a);
                    };
                    a.prototype.removeEquation = function (a) {
                        var b = this.equations;
                        a = b.indexOf(a);
                        -1 !== a && b.splice(a, 1);
                    };
                    a.prototype.removeAllEquations = function () {
                        this.equations.length = 0;
                    };
                },
                {},
            ],
            48: [
                function (b, d, f) {
                    function a(a, b, c) {
                        l.call(this);
                        this.iterations = b;
                        this.tolerance = c;
                        this.subsolver = a;
                        this.nodes = [];
                        for (this.nodePool = []; 128 > this.nodePool.length; ) this.nodePool.push(this.createNode());
                    }
                    function e(a) {
                        for (var b = a.length, c = 0; c !== b; c++) {
                            var d = a[c];
                            if (!(d.visited || d.body.type & n)) return d;
                        }
                        return !1;
                    }
                    function c(a, b, c) {
                        b.push(a.body);
                        b = a.eqs.length;
                        for (var d = 0; d !== b; d++) {
                            var e = a.eqs[d];
                            -1 === c.indexOf(e) && c.push(e);
                        }
                    }
                    function h(a, b) {
                        return b.id - a.id;
                    }
                    d.exports = a;
                    b("../math/Vec3");
                    b("../math/Quaternion");
                    var l = b("./Solver");
                    b = b("../objects/Body");
                    a.prototype = new l();
                    var k = [],
                        m = [],
                        p = { bodies: [] },
                        n = b.STATIC,
                        q = [];
                    a.prototype.createNode = function () {
                        return { body: null, children: [], eqs: [], visited: !1 };
                    };
                    a.prototype.solve = function (a, b) {
                        for (var d = this.nodePool, f = b.bodies, l = this.equations, n = l.length, r = f.length, u = this.subsolver; d.length < r; ) d.push(this.createNode());
                        k.length = r;
                        for (var A = 0; A < r; A++) k[A] = d[A];
                        for (A = 0; A !== r; A++) (d = k[A]), (d.body = f[A]), (d.children.length = 0), (d.eqs.length = 0), (d.visited = !1);
                        for (r = 0; r !== n; r++) {
                            d = l[r];
                            A = f.indexOf(d.bi);
                            var F = f.indexOf(d.bj);
                            A = k[A];
                            F = k[F];
                            A.children.push(F);
                            A.eqs.push(d);
                            F.children.push(A);
                            F.eqs.push(d);
                        }
                        f = 0;
                        l = m;
                        u.tolerance = this.tolerance;
                        for (u.iterations = this.iterations; (A = e(k)); ) {
                            l.length = 0;
                            p.bodies.length = 0;
                            d = A;
                            A = c;
                            n = p.bodies;
                            r = l;
                            q.push(d);
                            d.visited = !0;
                            for (A(d, n, r); q.length; ) for (d = q.pop(); (F = e(d.children)); ) (F.visited = !0), A(F, n, r), q.push(F);
                            n = l.length;
                            l = l.sort(h);
                            for (A = 0; A !== n; A++) u.addEquation(l[A]);
                            u.solve(a, p);
                            u.removeAllEquations();
                            f++;
                        }
                        return f;
                    };
                },
                { "../math/Quaternion": 28, "../math/Vec3": 30, "../objects/Body": 31, "./Solver": 47 },
            ],
            49: [
                function (b, d, f) {
                    b = function () {};
                    d.exports = b;
                    b.prototype = {
                        constructor: b,
                        addEventListener: function (a, b) {
                            void 0 === this._listeners && (this._listeners = {});
                            var c = this._listeners;
                            void 0 === c[a] && (c[a] = []);
                            -1 === c[a].indexOf(b) && c[a].push(b);
                            return this;
                        },
                        hasEventListener: function (a, b) {
                            if (void 0 === this._listeners) return !1;
                            var c = this._listeners;
                            return void 0 !== c[a] && -1 !== c[a].indexOf(b) ? !0 : !1;
                        },
                        removeEventListener: function (a, b) {
                            if (void 0 === this._listeners) return this;
                            var c = this._listeners;
                            if (void 0 === c[a]) return this;
                            var d = c[a].indexOf(b);
                            -1 !== d && c[a].splice(d, 1);
                            return this;
                        },
                        dispatchEvent: function (a) {
                            if (void 0 === this._listeners) return this;
                            var b = this._listeners[a.type];
                            if (void 0 !== b) {
                                a.target = this;
                                for (var c = 0, d = b.length; c < d; c++) b[c].call(this, a);
                            }
                            return this;
                        },
                    };
                },
                {},
            ],
            50: [
                function (b, d, f) {
                    function a(a) {
                        a = a || {};
                        this.root = a.root || null;
                        this.aabb = a.aabb ? a.aabb.clone() : new c();
                        this.data = [];
                        this.children = [];
                    }
                    function e(b, c) {
                        c = c || {};
                        c.root = null;
                        c.aabb = b;
                        a.call(this, c);
                        this.maxDepth = "undefined" !== typeof c.maxDepth ? c.maxDepth : 8;
                    }
                    var c = b("../collision/AABB"),
                        h = b("../math/Vec3");
                    d.exports = e;
                    e.prototype = new a();
                    a.prototype.reset = function (a, b) {
                        this.children.length = this.data.length = 0;
                    };
                    a.prototype.insert = function (a, b, c) {
                        var d = this.data;
                        c = c || 0;
                        if (!this.aabb.contains(a)) return !1;
                        var e = this.children;
                        if (c < (this.maxDepth || this.root.maxDepth)) {
                            var f = !1;
                            e.length || (this.subdivide(), (f = !0));
                            for (var h = 0; 8 !== h; h++) if (e[h].insert(a, b, c + 1)) return !0;
                            f && (e.length = 0);
                        }
                        d.push(b);
                        return !0;
                    };
                    var l = new h();
                    a.prototype.subdivide = function () {
                        var b = this.aabb,
                            d = b.lowerBound,
                            e = b.upperBound;
                        b = this.children;
                        b.push(
                            new a({ aabb: new c({ lowerBound: new h(0, 0, 0) }) }),
                            new a({ aabb: new c({ lowerBound: new h(1, 0, 0) }) }),
                            new a({ aabb: new c({ lowerBound: new h(1, 1, 0) }) }),
                            new a({ aabb: new c({ lowerBound: new h(1, 1, 1) }) }),
                            new a({ aabb: new c({ lowerBound: new h(0, 1, 1) }) }),
                            new a({ aabb: new c({ lowerBound: new h(0, 0, 1) }) }),
                            new a({ aabb: new c({ lowerBound: new h(1, 0, 1) }) }),
                            new a({ aabb: new c({ lowerBound: new h(0, 1, 0) }) })
                        );
                        e.vsub(d, l);
                        l.scale(0.5, l);
                        e = this.root || this;
                        for (var f = 0; 8 !== f; f++) {
                            var k = b[f];
                            k.root = e;
                            var r = k.aabb.lowerBound;
                            r.x *= l.x;
                            r.y *= l.y;
                            r.z *= l.z;
                            r.vadd(d, r);
                            r.vadd(l, k.aabb.upperBound);
                        }
                    };
                    a.prototype.aabbQuery = function (a, b) {
                        for (var c = [this]; c.length; ) {
                            var d = c.pop();
                            d.aabb.overlaps(a) && Array.prototype.push.apply(b, d.data);
                            Array.prototype.push.apply(c, d.children);
                        }
                        return b;
                    };
                    var k = new c();
                    a.prototype.rayQuery = function (a, b, c) {
                        a.getAABB(k);
                        k.toLocalFrame(b, k);
                        this.aabbQuery(k, c);
                        return c;
                    };
                    a.prototype.removeEmptyNodes = function () {
                        for (var a = [this]; a.length; ) {
                            for (var b = a.pop(), c = b.children.length - 1; 0 <= c; c--) b.children[c].data.length || b.children.splice(c, 1);
                            Array.prototype.push.apply(a, b.children);
                        }
                    };
                },
                { "../collision/AABB": 3, "../math/Vec3": 30 },
            ],
            51: [
                function (b, d, f) {
                    function a() {
                        this.objects = [];
                        this.type = Object;
                    }
                    d.exports = a;
                    a.prototype.release = function () {
                        for (var a = arguments.length, b = 0; b !== a; b++) this.objects.push(arguments[b]);
                    };
                    a.prototype.get = function () {
                        return 0 === this.objects.length ? this.constructObject() : this.objects.pop();
                    };
                    a.prototype.constructObject = function () {
                        throw Error("constructObject() not implemented in this Pool subclass yet!");
                    };
                },
                {},
            ],
            52: [
                function (b, d, f) {
                    function a() {
                        this.data = { keys: [] };
                    }
                    d.exports = a;
                    a.prototype.get = function (a, b) {
                        if (a > b) {
                            var c = b;
                            b = a;
                            a = c;
                        }
                        return this.data[a + "-" + b];
                    };
                    a.prototype.set = function (a, b, d) {
                        if (a > b) {
                            var c = b;
                            b = a;
                            a = c;
                        }
                        c = a + "-" + b;
                        this.get(a, b) || this.data.keys.push(c);
                        this.data[c] = d;
                    };
                    a.prototype.reset = function () {
                        for (var a = this.data, b = a.keys; 0 < b.length; ) {
                            var d = b.pop();
                            delete a[d];
                        }
                    };
                },
                {},
            ],
            53: [
                function (b, d, f) {
                    function a() {}
                    d.exports = a;
                    a.defaults = function (a, b) {
                        a = a || {};
                        for (var c in b) c in a || (a[c] = b[c]);
                        return a;
                    };
                },
                {},
            ],
            54: [
                function (b, d, f) {
                    function a() {
                        c.call(this);
                        this.type = e;
                    }
                    d.exports = a;
                    var e = b("../math/Vec3"),
                        c = b("./Pool");
                    a.prototype = new c();
                    a.prototype.constructObject = function () {
                        return new e();
                    };
                },
                { "../math/Vec3": 30, "./Pool": 51 },
            ],
            55: [
                function (b, d, f) {
                    function a(a) {
                        this.contactPointPool = [];
                        this.frictionEquationPool = [];
                        this.result = [];
                        this.frictionResult = [];
                        this.v3pool = new k();
                        this.world = a;
                        this.currentContactMaterial = null;
                        this.enableFrictionReduction = !1;
                    }
                    d.exports = a;
                    d = b("../collision/AABB");
                    f = b("../shapes/Shape");
                    var e = b("../collision/Ray"),
                        c = b("../math/Vec3"),
                        h = b("../math/Transform");
                    b("../shapes/ConvexPolyhedron");
                    var l = b("../math/Quaternion");
                    b("../solver/Solver");
                    var k = b("../utils/Vec3Pool"),
                        m = b("../equations/ContactEquation"),
                        p = b("../equations/FrictionEquation");
                    a.prototype.createContactEquation = function (a, b, c, d, e, f) {
                        if (this.contactPointPool.length) {
                            var h = this.contactPointPool.pop();
                            h.bi = a;
                            h.bj = b;
                        } else h = new m(a, b);
                        h.enabled = a.collisionResponse && b.collisionResponse && c.collisionResponse && d.collisionResponse;
                        var k = this.currentContactMaterial;
                        h.restitution = k.restitution;
                        h.setSpookParams(k.contactEquationStiffness, k.contactEquationRelaxation, this.world.dt);
                        a = c.material || a.material;
                        b = d.material || b.material;
                        a && b && 0 <= a.restitution && 0 <= b.restitution && (h.restitution = a.restitution * b.restitution);
                        h.si = e || c;
                        h.sj = f || d;
                        return h;
                    };
                    a.prototype.createFrictionEquationsFromContact = function (a, b) {
                        var c = a.bi,
                            d = a.bj,
                            e = this.world,
                            f = this.currentContactMaterial,
                            h = f.friction,
                            k = a.si.material || c.material,
                            m = a.sj.material || d.material;
                        k && m && 0 <= k.friction && 0 <= m.friction && (h = k.friction * m.friction);
                        if (0 < h) {
                            h *= e.gravity.length();
                            k = c.invMass + d.invMass;
                            0 < k && (k = 1 / k);
                            var l = this.frictionEquationPool;
                            m = l.length ? l.pop() : new p(c, d, h * k);
                            l = l.length ? l.pop() : new p(c, d, h * k);
                            m.bi = l.bi = c;
                            m.bj = l.bj = d;
                            m.minForce = l.minForce = -h * k;
                            m.maxForce = l.maxForce = h * k;
                            m.ri.copy(a.ri);
                            m.rj.copy(a.rj);
                            l.ri.copy(a.ri);
                            l.rj.copy(a.rj);
                            a.ni.tangents(m.t, l.t);
                            m.setSpookParams(f.frictionEquationStiffness, f.frictionEquationRelaxation, e.dt);
                            l.setSpookParams(f.frictionEquationStiffness, f.frictionEquationRelaxation, e.dt);
                            m.enabled = l.enabled = a.enabled;
                            b.push(m, l);
                            return !0;
                        }
                        return !1;
                    };
                    var n = new c(),
                        q = new c(),
                        u = new c();
                    a.prototype.createFrictionFromAverage = function (a) {
                        var b = this.result[this.result.length - 1];
                        if (this.createFrictionEquationsFromContact(b, this.frictionResult) && 1 !== a) {
                            var c = this.frictionResult[this.frictionResult.length - 2],
                                d = this.frictionResult[this.frictionResult.length - 1];
                            n.setZero();
                            q.setZero();
                            u.setZero();
                            for (var e = b.bi, f = 0; f !== a; f++) (b = this.result[this.result.length - 1 - f]), b.bodyA !== e ? (n.vadd(b.ni, n), q.vadd(b.ri, q), u.vadd(b.rj, u)) : (n.vsub(b.ni, n), q.vadd(b.rj, q), u.vadd(b.ri, u));
                            a = 1 / a;
                            q.scale(a, c.ri);
                            u.scale(a, c.rj);
                            d.ri.copy(c.ri);
                            d.rj.copy(c.rj);
                            n.normalize();
                            n.tangents(c.t, d.t);
                        }
                    };
                    var r = new c(),
                        w = new c(),
                        v = new l(),
                        x = new l();
                    a.prototype.getContacts = function (a, b, c, d, e, f, h) {
                        this.contactPointPool = e;
                        this.frictionEquationPool = h;
                        this.result = d;
                        this.frictionResult = f;
                        d = 0;
                        for (e = a.length; d !== e; d++) {
                            f = a[d];
                            h = b[d];
                            var k = null;
                            f.material && h.material && (k = c.getContactMaterial(f.material, h.material) || null);
                            for (var m = 0; m < f.shapes.length; m++) {
                                f.quaternion.mult(f.shapeOrientations[m], v);
                                f.quaternion.vmult(f.shapeOffsets[m], r);
                                r.vadd(f.position, r);
                                for (var l = f.shapes[m], n = 0; n < h.shapes.length; n++) {
                                    h.quaternion.mult(h.shapeOrientations[n], x);
                                    h.quaternion.vmult(h.shapeOffsets[n], w);
                                    w.vadd(h.position, w);
                                    var t = h.shapes[n];
                                    if (!(r.distanceTo(w) > l.boundingSphereRadius + t.boundingSphereRadius)) {
                                        var p = null;
                                        l.material && t.material && (p = c.getContactMaterial(l.material, t.material) || null);
                                        this.currentContactMaterial = p || k || c.defaultContactMaterial;
                                        (p = this[l.type | t.type]) && (l.type < t.type ? p.call(this, l, t, r, w, v, x, f, h, l, t) : p.call(this, t, l, w, r, x, v, h, f, l, t));
                                    }
                                }
                            }
                        }
                    };
                    a.prototype[f.types.BOX | f.types.BOX] = a.prototype.boxBox = function (a, b, c, d, e, f, h, k) {
                        a.convexPolyhedronRepresentation.material = a.material;
                        b.convexPolyhedronRepresentation.material = b.material;
                        a.convexPolyhedronRepresentation.collisionResponse = a.collisionResponse;
                        b.convexPolyhedronRepresentation.collisionResponse = b.collisionResponse;
                        this.convexConvex(a.convexPolyhedronRepresentation, b.convexPolyhedronRepresentation, c, d, e, f, h, k, a, b);
                    };
                    a.prototype[f.types.BOX | f.types.CONVEXPOLYHEDRON] = a.prototype.boxConvex = function (a, b, c, d, e, f, h, k) {
                        a.convexPolyhedronRepresentation.material = a.material;
                        a.convexPolyhedronRepresentation.collisionResponse = a.collisionResponse;
                        this.convexConvex(a.convexPolyhedronRepresentation, b, c, d, e, f, h, k, a, b);
                    };
                    a.prototype[f.types.BOX | f.types.PARTICLE] = a.prototype.boxParticle = function (a, b, c, d, e, f, h, k) {
                        a.convexPolyhedronRepresentation.material = a.material;
                        a.convexPolyhedronRepresentation.collisionResponse = a.collisionResponse;
                        this.convexParticle(a.convexPolyhedronRepresentation, b, c, d, e, f, h, k, a, b);
                    };
                    a.prototype[f.types.SPHERE] = a.prototype.sphereSphere = function (a, b, c, d, e, f, h, k) {
                        e = this.createContactEquation(h, k, a, b);
                        d.vsub(c, e.ni);
                        e.ni.normalize();
                        e.ri.copy(e.ni);
                        e.rj.copy(e.ni);
                        e.ri.mult(a.radius, e.ri);
                        e.rj.mult(-b.radius, e.rj);
                        e.ri.vadd(c, e.ri);
                        e.ri.vsub(h.position, e.ri);
                        e.rj.vadd(d, e.rj);
                        e.rj.vsub(k.position, e.rj);
                        this.result.push(e);
                        this.createFrictionEquationsFromContact(e, this.frictionResult);
                    };
                    var y = new c(),
                        z = new c(),
                        E = new c();
                    a.prototype[f.types.PLANE | f.types.TRIMESH] = a.prototype.planeTrimesh = function (a, b, d, e, f, k, m, l) {
                        var n = new c();
                        y.set(0, 0, 1);
                        f.vmult(y, y);
                        for (f = 0; f < b.vertices.length / 3; f++) {
                            b.getVertex(f, n);
                            var t = new c();
                            t.copy(n);
                            h.pointToWorldFrame(e, k, t, n);
                            t = z;
                            n.vsub(d, t);
                            if (0 >= y.dot(t)) {
                                var p = this.createContactEquation(m, l, a, b);
                                p.ni.copy(y);
                                var q = E;
                                y.scale(t.dot(y), q);
                                n.vsub(q, q);
                                p.ri.copy(q);
                                p.ri.vsub(m.position, p.ri);
                                p.rj.copy(n);
                                p.rj.vsub(l.position, p.rj);
                                this.result.push(p);
                                this.createFrictionEquationsFromContact(p, this.frictionResult);
                            }
                        }
                    };
                    var A = new c(),
                        F = new c();
                    new c();
                    var L = new c(),
                        H = new c(),
                        P = new c(),
                        R = new c(),
                        M = new c(),
                        N = new c(),
                        J = new c(),
                        O = new c(),
                        K = new c(),
                        C = new c(),
                        T = new c(),
                        t = new d(),
                        U = [];
                    a.prototype[f.types.SPHERE | f.types.TRIMESH] = a.prototype.sphereTrimesh = function (a, b, c, d, f, k, m, l) {
                        h.pointToLocalFrame(d, k, c, J);
                        f = a.radius;
                        t.lowerBound.set(J.x - f, J.y - f, J.z - f);
                        t.upperBound.set(J.x + f, J.y + f, J.z + f);
                        b.getTrianglesInAABB(t, U);
                        var n = a.radius * a.radius;
                        for (f = 0; f < U.length; f++)
                            for (var p = 0; 3 > p; p++)
                                if ((b.getVertex(b.indices[3 * U[f] + p], L), L.vsub(J, F), F.norm2() <= n)) {
                                    H.copy(L);
                                    h.pointToWorldFrame(d, k, H, L);
                                    L.vsub(c, F);
                                    var q = this.createContactEquation(m, l, a, b);
                                    q.ni.copy(F);
                                    q.ni.normalize();
                                    q.ri.copy(q.ni);
                                    q.ri.scale(a.radius, q.ri);
                                    q.ri.vadd(c, q.ri);
                                    q.ri.vsub(m.position, q.ri);
                                    q.rj.copy(L);
                                    q.rj.vsub(l.position, q.rj);
                                    this.result.push(q);
                                    this.createFrictionEquationsFromContact(q, this.frictionResult);
                                }
                        for (f = 0; f < U.length; f++)
                            for (p = 0; 3 > p; p++)
                                b.getVertex(b.indices[3 * U[f] + p], P),
                                    b.getVertex(b.indices[3 * U[f] + ((p + 1) % 3)], R),
                                    R.vsub(P, M),
                                    J.vsub(R, O),
                                    (c = O.dot(M)),
                                    J.vsub(P, O),
                                    (q = O.dot(M)),
                                    0 < q &&
                                        0 > c &&
                                        (J.vsub(P, O),
                                        N.copy(M),
                                        N.normalize(),
                                        (q = O.dot(N)),
                                        N.scale(q, O),
                                        O.vadd(P, O),
                                        (c = O.distanceTo(J)),
                                        c < a.radius &&
                                            ((q = this.createContactEquation(m, l, a, b)),
                                            O.vsub(J, q.ni),
                                            q.ni.normalize(),
                                            q.ni.scale(a.radius, q.ri),
                                            h.pointToWorldFrame(d, k, O, O),
                                            O.vsub(l.position, q.rj),
                                            h.vectorToWorldFrame(k, q.ni, q.ni),
                                            h.vectorToWorldFrame(k, q.ri, q.ri),
                                            this.result.push(q),
                                            this.createFrictionEquationsFromContact(q, this.frictionResult)));
                        f = 0;
                        for (p = U.length; f !== p; f++)
                            b.getTriangleVertices(U[f], K, C, T),
                                b.getNormal(U[f], A),
                                J.vsub(K, O),
                                (c = O.dot(A)),
                                A.scale(c, O),
                                J.vsub(O, O),
                                (c = O.distanceTo(J)),
                                e.pointInTriangle(O, K, C, T) &&
                                    c < a.radius &&
                                    ((q = this.createContactEquation(m, l, a, b)),
                                    O.vsub(J, q.ni),
                                    q.ni.normalize(),
                                    q.ni.scale(a.radius, q.ri),
                                    h.pointToWorldFrame(d, k, O, O),
                                    O.vsub(l.position, q.rj),
                                    h.vectorToWorldFrame(k, q.ni, q.ni),
                                    h.vectorToWorldFrame(k, q.ri, q.ri),
                                    this.result.push(q),
                                    this.createFrictionEquationsFromContact(q, this.frictionResult));
                        U.length = 0;
                    };
                    var G = new c(),
                        V = new c();
                    a.prototype[f.types.SPHERE | f.types.PLANE] = a.prototype.spherePlane = function (a, b, c, d, e, f, h, k) {
                        b = this.createContactEquation(h, k, a, b);
                        b.ni.set(0, 0, 1);
                        f.vmult(b.ni, b.ni);
                        b.ni.negate(b.ni);
                        b.ni.normalize();
                        b.ni.mult(a.radius, b.ri);
                        c.vsub(d, G);
                        b.ni.mult(b.ni.dot(G), V);
                        G.vsub(V, b.rj);
                        -G.dot(b.ni) <= a.radius && ((a = b.ri), (f = b.rj), a.vadd(c, a), a.vsub(h.position, a), f.vadd(d, f), f.vsub(k.position, f), this.result.push(b), this.createFrictionEquationsFromContact(b, this.frictionResult));
                    };
                    var I = new c(),
                        B = new c(),
                        Q = new c(),
                        S = new c(),
                        D = new c(),
                        X = new c(),
                        Y = new c(),
                        W = [new c(), new c(), new c(), new c(), new c(), new c()],
                        aa = new c(),
                        Z = new c(),
                        ha = new c(),
                        na = new c();
                    a.prototype[f.types.SPHERE | f.types.BOX] = a.prototype.sphereBox = function (a, b, c, d, e, f, h, k) {
                        e = this.v3pool;
                        c.vsub(d, S);
                        b.getSideNormals(W, f);
                        f = a.radius;
                        for (var m = !1, l = null, n = 0, t = 0, p = 0, q = null, r = 0, C = W.length; r !== C && !1 === m; r++) {
                            var u = D;
                            u.copy(W[r]);
                            var v = u.norm();
                            u.normalize();
                            var w = S.dot(u);
                            if (w < v + f && 0 < w) {
                                var x = X,
                                    y = Y;
                                x.copy(W[(r + 1) % 3]);
                                y.copy(W[(r + 2) % 3]);
                                var H = x.norm(),
                                    T = y.norm();
                                x.normalize();
                                y.normalize();
                                var B = S.dot(x),
                                    J = S.dot(y);
                                B < H && B > -H && J < T && J > -T && ((w = Math.abs(w - v - f)), null === q || w < q) && ((q = w), (t = B), (p = J), (l = v), Z.copy(u), ha.copy(x), na.copy(y), n++);
                            }
                        }
                        n &&
                            ((m = !0),
                            (n = this.createContactEquation(h, k, a, b)),
                            Z.mult(-f, n.ri),
                            n.ni.copy(Z),
                            n.ni.negate(n.ni),
                            Z.mult(l, Z),
                            ha.mult(t, ha),
                            Z.vadd(ha, Z),
                            na.mult(p, na),
                            Z.vadd(na, n.rj),
                            n.ri.vadd(c, n.ri),
                            n.ri.vsub(h.position, n.ri),
                            n.rj.vadd(d, n.rj),
                            n.rj.vsub(k.position, n.rj),
                            this.result.push(n),
                            this.createFrictionEquationsFromContact(n, this.frictionResult));
                        w = e.get();
                        for (l = 0; 2 !== l && !m; l++)
                            for (t = 0; 2 !== t && !m; t++)
                                for (p = 0; 2 !== p && !m; p++)
                                    w.set(0, 0, 0),
                                        l ? w.vadd(W[0], w) : w.vsub(W[0], w),
                                        t ? w.vadd(W[1], w) : w.vsub(W[1], w),
                                        p ? w.vadd(W[2], w) : w.vsub(W[2], w),
                                        d.vadd(w, aa),
                                        aa.vsub(c, aa),
                                        aa.norm2() < f * f &&
                                            ((m = !0),
                                            (n = this.createContactEquation(h, k, a, b)),
                                            n.ri.copy(aa),
                                            n.ri.normalize(),
                                            n.ni.copy(n.ri),
                                            n.ri.mult(f, n.ri),
                                            n.rj.copy(w),
                                            n.ri.vadd(c, n.ri),
                                            n.ri.vsub(h.position, n.ri),
                                            n.rj.vadd(d, n.rj),
                                            n.rj.vsub(k.position, n.rj),
                                            this.result.push(n),
                                            this.createFrictionEquationsFromContact(n, this.frictionResult));
                        e.release(w);
                        q = e.get();
                        r = e.get();
                        n = e.get();
                        C = e.get();
                        w = e.get();
                        u = W.length;
                        for (l = 0; l !== u && !m; l++)
                            for (t = 0; t !== u && !m; t++)
                                if (l % 3 !== t % 3) {
                                    W[t].cross(W[l], q);
                                    q.normalize();
                                    W[l].vadd(W[t], r);
                                    n.copy(c);
                                    n.vsub(r, n);
                                    n.vsub(d, n);
                                    v = n.dot(q);
                                    q.mult(v, C);
                                    for (p = 0; p === l % 3 || p === t % 3; ) p++;
                                    w.copy(c);
                                    w.vsub(C, w);
                                    w.vsub(r, w);
                                    w.vsub(d, w);
                                    v = Math.abs(v);
                                    x = w.norm();
                                    v < W[p].norm() &&
                                        x < f &&
                                        ((m = !0),
                                        (p = this.createContactEquation(h, k, a, b)),
                                        r.vadd(C, p.rj),
                                        p.rj.copy(p.rj),
                                        w.negate(p.ni),
                                        p.ni.normalize(),
                                        p.ri.copy(p.rj),
                                        p.ri.vadd(d, p.ri),
                                        p.ri.vsub(c, p.ri),
                                        p.ri.normalize(),
                                        p.ri.mult(f, p.ri),
                                        p.ri.vadd(c, p.ri),
                                        p.ri.vsub(h.position, p.ri),
                                        p.rj.vadd(d, p.rj),
                                        p.rj.vsub(k.position, p.rj),
                                        this.result.push(p),
                                        this.createFrictionEquationsFromContact(p, this.frictionResult));
                                }
                        e.release(q, r, n, C, w);
                    };
                    var xa = new c(),
                        ya = new c(),
                        za = new c(),
                        Aa = new c(),
                        Ba = new c(),
                        Ca = new c(),
                        Da = new c(),
                        Ea = new c(),
                        Fa = new c(),
                        Ga = new c();
                    a.prototype[f.types.SPHERE | f.types.CONVEXPOLYHEDRON] = a.prototype.sphereConvex = function (a, b, c, d, e, f, h, k) {
                        e = this.v3pool;
                        c.vsub(d, xa);
                        for (var m = b.faceNormals, l = b.faces, n = b.vertices, p = a.radius, t = 0; t !== n.length; t++) {
                            var q = Ba;
                            f.vmult(n[t], q);
                            d.vadd(q, q);
                            var r = Aa;
                            q.vsub(c, r);
                            if (r.norm2() < p * p) {
                                a = this.createContactEquation(h, k, a, b);
                                a.ri.copy(r);
                                a.ri.normalize();
                                a.ni.copy(a.ri);
                                a.ri.mult(p, a.ri);
                                q.vsub(d, a.rj);
                                a.ri.vadd(c, a.ri);
                                a.ri.vsub(h.position, a.ri);
                                a.rj.vadd(d, a.rj);
                                a.rj.vsub(k.position, a.rj);
                                this.result.push(a);
                                this.createFrictionEquationsFromContact(a, this.frictionResult);
                                return;
                            }
                        }
                        t = 0;
                        for (q = l.length; t !== q; t++) {
                            r = l[t];
                            var C = Ca;
                            f.vmult(m[t], C);
                            var u = Da;
                            f.vmult(n[r[0]], u);
                            u.vadd(d, u);
                            var w = Ea;
                            C.mult(-p, w);
                            c.vadd(w, w);
                            var v = Fa;
                            w.vsub(u, v);
                            w = v.dot(C);
                            v = Ga;
                            c.vsub(u, v);
                            if (0 > w && 0 < v.dot(C)) {
                                u = [];
                                v = 0;
                                for (var x = r.length; v !== x; v++) {
                                    var y = e.get();
                                    f.vmult(n[r[v]], y);
                                    d.vadd(y, y);
                                    u.push(y);
                                }
                                a: {
                                    v = u;
                                    x = C;
                                    y = c;
                                    for (var H = null, T = v.length, J = 0; J !== T; J++) {
                                        var D = v[J],
                                            z = I;
                                        v[(J + 1) % T].vsub(D, z);
                                        var K = B;
                                        z.cross(x, K);
                                        z = Q;
                                        y.vsub(D, z);
                                        D = K.dot(z);
                                        if (null === H || (0 < D && !0 === H) || (0 >= D && !1 === H)) null === H && (H = 0 < D);
                                        else {
                                            v = !1;
                                            break a;
                                        }
                                    }
                                    v = !0;
                                }
                                if (v) {
                                    a = this.createContactEquation(h, k, a, b);
                                    C.mult(-p, a.ri);
                                    C.negate(a.ni);
                                    b = e.get();
                                    C.mult(-w, b);
                                    f = e.get();
                                    C.mult(-p, f);
                                    c.vsub(d, a.rj);
                                    a.rj.vadd(f, a.rj);
                                    a.rj.vadd(b, a.rj);
                                    a.rj.vadd(d, a.rj);
                                    a.rj.vsub(k.position, a.rj);
                                    a.ri.vadd(c, a.ri);
                                    a.ri.vsub(h.position, a.ri);
                                    e.release(b);
                                    e.release(f);
                                    this.result.push(a);
                                    this.createFrictionEquationsFromContact(a, this.frictionResult);
                                    v = 0;
                                    for (r = u.length; v !== r; v++) e.release(u[v]);
                                    break;
                                } else
                                    for (v = 0; v !== r.length; v++) {
                                        C = e.get();
                                        w = e.get();
                                        f.vmult(n[r[(v + 1) % r.length]], C);
                                        f.vmult(n[r[(v + 2) % r.length]], w);
                                        d.vadd(C, C);
                                        d.vadd(w, w);
                                        T = ya;
                                        w.vsub(C, T);
                                        H = za;
                                        T.unit(H);
                                        x = e.get();
                                        y = e.get();
                                        c.vsub(C, y);
                                        J = y.dot(H);
                                        H.mult(J, x);
                                        x.vadd(C, x);
                                        H = e.get();
                                        x.vsub(c, H);
                                        if (0 < J && J * J < T.norm2() && H.norm2() < p * p) {
                                            a = this.createContactEquation(h, k, a, b);
                                            x.vsub(d, a.rj);
                                            x.vsub(c, a.ni);
                                            a.ni.normalize();
                                            a.ni.mult(p, a.ri);
                                            a.rj.vadd(d, a.rj);
                                            a.rj.vsub(k.position, a.rj);
                                            a.ri.vadd(c, a.ri);
                                            a.ri.vsub(h.position, a.ri);
                                            this.result.push(a);
                                            this.createFrictionEquationsFromContact(a, this.frictionResult);
                                            v = 0;
                                            for (r = u.length; v !== r; v++) e.release(u[v]);
                                            e.release(C);
                                            e.release(w);
                                            e.release(x);
                                            e.release(H);
                                            e.release(y);
                                            return;
                                        }
                                        e.release(C);
                                        e.release(w);
                                        e.release(x);
                                        e.release(H);
                                        e.release(y);
                                    }
                                v = 0;
                                for (r = u.length; v !== r; v++) e.release(u[v]);
                            }
                        }
                    };
                    new c();
                    new c();
                    a.prototype[f.types.PLANE | f.types.BOX] = a.prototype.planeBox = function (a, b, c, d, e, f, h, k) {
                        b.convexPolyhedronRepresentation.material = b.material;
                        b.convexPolyhedronRepresentation.collisionResponse = b.collisionResponse;
                        this.planeConvex(a, b.convexPolyhedronRepresentation, c, d, e, f, h, k);
                    };
                    var ba = new c(),
                        ca = new c(),
                        qa = new c(),
                        Ha = new c();
                    a.prototype[f.types.PLANE | f.types.CONVEXPOLYHEDRON] = a.prototype.planeConvex = function (a, b, c, d, e, f, h, k) {
                        ca.set(0, 0, 1);
                        e.vmult(ca, ca);
                        for (var m = (e = 0); m !== b.vertices.length; m++)
                            if ((ba.copy(b.vertices[m]), f.vmult(ba, ba), d.vadd(ba, ba), ba.vsub(c, qa), 0 >= ca.dot(qa))) {
                                var l = this.createContactEquation(h, k, a, b),
                                    n = Ha;
                                ca.mult(ca.dot(qa), n);
                                ba.vsub(n, n);
                                n.vsub(c, l.ri);
                                l.ni.copy(ca);
                                ba.vsub(d, l.rj);
                                l.ri.vadd(c, l.ri);
                                l.ri.vsub(h.position, l.ri);
                                l.rj.vadd(d, l.rj);
                                l.rj.vsub(k.position, l.rj);
                                this.result.push(l);
                                e++;
                                this.enableFrictionReduction || this.createFrictionEquationsFromContact(l, this.frictionResult);
                            }
                        this.enableFrictionReduction && e && this.createFrictionFromAverage(e);
                    };
                    var ra = new c(),
                        oa = new c();
                    a.prototype[f.types.CONVEXPOLYHEDRON] = a.prototype.convexConvex = function (a, b, c, d, e, f, h, k, l, m, n, p) {
                        if (!(c.distanceTo(d) > a.boundingSphereRadius + b.boundingSphereRadius) && a.findSeparatingAxis(b, c, e, d, f, ra, n, p)) {
                            n = [];
                            a.clipAgainstHull(c, e, b, d, f, ra, -100, 100, n);
                            for (f = e = 0; f !== n.length; f++) {
                                p = this.createContactEquation(h, k, a, b, l, m);
                                var t = p.ri,
                                    q = p.rj;
                                ra.negate(p.ni);
                                n[f].normal.negate(oa);
                                oa.mult(n[f].depth, oa);
                                n[f].point.vadd(oa, t);
                                q.copy(n[f].point);
                                t.vsub(c, t);
                                q.vsub(d, q);
                                t.vadd(c, t);
                                t.vsub(h.position, t);
                                q.vadd(d, q);
                                q.vsub(k.position, q);
                                this.result.push(p);
                                e++;
                                this.enableFrictionReduction || this.createFrictionEquationsFromContact(p, this.frictionResult);
                            }
                            this.enableFrictionReduction && e && this.createFrictionFromAverage(e);
                        }
                    };
                    var da = new c(),
                        ta = new c(),
                        pa = new c();
                    a.prototype[f.types.PLANE | f.types.PARTICLE] = a.prototype.planeParticle = function (a, b, c, d, e, f, h, k) {
                        da.set(0, 0, 1);
                        h.quaternion.vmult(da, da);
                        d.vsub(h.position, ta);
                        0 >= da.dot(ta) &&
                            ((a = this.createContactEquation(k, h, b, a)),
                            a.ni.copy(da),
                            a.ni.negate(a.ni),
                            a.ri.set(0, 0, 0),
                            da.mult(da.dot(d), pa),
                            d.vsub(pa, pa),
                            a.rj.copy(pa),
                            this.result.push(a),
                            this.createFrictionEquationsFromContact(a, this.frictionResult));
                    };
                    var ia = new c();
                    a.prototype[f.types.PARTICLE | f.types.SPHERE] = a.prototype.sphereParticle = function (a, b, c, d, e, f, h, k) {
                        ia.set(0, 0, 1);
                        d.vsub(c, ia);
                        ia.norm2() <= a.radius * a.radius &&
                            ((b = this.createContactEquation(k, h, b, a)),
                            ia.normalize(),
                            b.rj.copy(ia),
                            b.rj.mult(a.radius, b.rj),
                            b.ni.copy(ia),
                            b.ni.negate(b.ni),
                            b.ri.set(0, 0, 0),
                            this.result.push(b),
                            this.createFrictionEquationsFromContact(b, this.frictionResult));
                    };
                    var ua = new l(),
                        ja = new c();
                    new c();
                    var sa = new c(),
                        va = new c(),
                        ka = new c();
                    a.prototype[f.types.PARTICLE | f.types.CONVEXPOLYHEDRON] = a.prototype.convexParticle = function (a, b, c, d, e, f, h, k) {
                        var l = -1;
                        f = null;
                        var m = 0;
                        ja.copy(d);
                        ja.vsub(c, ja);
                        e.conjugate(ua);
                        ua.vmult(ja, ja);
                        if (a.pointIsInside(ja)) {
                            a.worldVerticesNeedsUpdate && a.computeWorldVertices(c, e);
                            a.worldFaceNormalsNeedsUpdate && a.computeWorldFaceNormals(e);
                            e = 0;
                            for (var n = a.faces.length; e !== n; e++) {
                                var p = a.worldFaceNormals[e];
                                d.vsub(a.worldVertices[a.faces[e][0]], va);
                                var t = -p.dot(va);
                                if (null === f || Math.abs(t) < Math.abs(f)) (f = t), (l = e), sa.copy(p), m++;
                            }
                            -1 !== l
                                ? ((a = this.createContactEquation(k, h, b, a)),
                                  sa.mult(f, ka),
                                  ka.vadd(d, ka),
                                  ka.vsub(c, ka),
                                  a.rj.copy(ka),
                                  sa.negate(a.ni),
                                  a.ri.set(0, 0, 0),
                                  (b = a.ri),
                                  (f = a.rj),
                                  b.vadd(d, b),
                                  b.vsub(k.position, b),
                                  f.vadd(c, f),
                                  f.vsub(h.position, f),
                                  this.result.push(a),
                                  this.createFrictionEquationsFromContact(a, this.frictionResult))
                                : console.warn("Point found inside convex, but did not find penetrating face!");
                        }
                    };
                    a.prototype[f.types.BOX | f.types.HEIGHTFIELD] = a.prototype.boxHeightfield = function (a, b, c, d, e, f, h, k) {
                        a.convexPolyhedronRepresentation.material = a.material;
                        a.convexPolyhedronRepresentation.collisionResponse = a.collisionResponse;
                        this.convexHeightfield(a.convexPolyhedronRepresentation, b, c, d, e, f, h, k);
                    };
                    var ea = new c(),
                        la = new c(),
                        wa = [0];
                    a.prototype[f.types.CONVEXPOLYHEDRON | f.types.HEIGHTFIELD] = a.prototype.convexHeightfield = function (a, b, c, d, e, f, k, l) {
                        var m = b.data,
                            n = b.elementSize,
                            p = a.boundingSphereRadius;
                        h.pointToLocalFrame(d, f, c, ea);
                        var t = Math.floor((ea.x - p) / n) - 1,
                            q = Math.ceil((ea.x + p) / n) + 1,
                            r = Math.floor((ea.y - p) / n) - 1;
                        n = Math.ceil((ea.y + p) / n) + 1;
                        if (!(0 > q || 0 > n || t > m.length || r > m[0].length)) {
                            0 > t && (t = 0);
                            0 > q && (q = 0);
                            0 > r && (r = 0);
                            0 > n && (n = 0);
                            t >= m.length && (t = m.length - 1);
                            q >= m.length && (q = m.length - 1);
                            n >= m[0].length && (n = m[0].length - 1);
                            r >= m[0].length && (r = m[0].length - 1);
                            m = [];
                            b.getRectMinMax(t, r, q, n, m);
                            var C = m[0];
                            if (!(ea.z - p > m[1] || ea.z + p < C))
                                for (p = t; p < q; p++)
                                    for (t = r; t < n; t++)
                                        b.getConvexTrianglePillar(p, t, !1),
                                            h.pointToWorldFrame(d, f, b.pillarOffset, la),
                                            c.distanceTo(la) < b.pillarConvex.boundingSphereRadius + a.boundingSphereRadius && this.convexConvex(a, b.pillarConvex, c, la, e, f, k, l, null, null, wa, null),
                                            b.getConvexTrianglePillar(p, t, !0),
                                            h.pointToWorldFrame(d, f, b.pillarOffset, la),
                                            c.distanceTo(la) < b.pillarConvex.boundingSphereRadius + a.boundingSphereRadius && this.convexConvex(a, b.pillarConvex, c, la, e, f, k, l, null, null, wa, null);
                        }
                    };
                    var fa = new c(),
                        ma = new c();
                    a.prototype[f.types.SPHERE | f.types.HEIGHTFIELD] = a.prototype.sphereHeightfield = function (a, b, c, d, e, f, k, m) {
                        var l = b.data,
                            n = a.radius,
                            p = b.elementSize;
                        h.pointToLocalFrame(d, f, c, fa);
                        var t = Math.floor((fa.x - n) / p) - 1,
                            q = Math.ceil((fa.x + n) / p) + 1,
                            r = Math.floor((fa.y - n) / p) - 1;
                        p = Math.ceil((fa.y + n) / p) + 1;
                        if (!(0 > q || 0 > p || t > l.length || p > l[0].length)) {
                            0 > t && (t = 0);
                            0 > q && (q = 0);
                            0 > r && (r = 0);
                            0 > p && (p = 0);
                            t >= l.length && (t = l.length - 1);
                            q >= l.length && (q = l.length - 1);
                            p >= l[0].length && (p = l[0].length - 1);
                            r >= l[0].length && (r = l[0].length - 1);
                            l = [];
                            b.getRectMinMax(t, r, q, p, l);
                            var C = l[0];
                            if (!(fa.z - n > l[1] || fa.z + n < C))
                                for (n = this.result; t < q; t++)
                                    for (l = r; l < p; l++)
                                        if (
                                            ((C = n.length),
                                            b.getConvexTrianglePillar(t, l, !1),
                                            h.pointToWorldFrame(d, f, b.pillarOffset, ma),
                                            c.distanceTo(ma) < b.pillarConvex.boundingSphereRadius + a.boundingSphereRadius && this.sphereConvex(a, b.pillarConvex, c, ma, e, f, k, m),
                                            b.getConvexTrianglePillar(t, l, !0),
                                            h.pointToWorldFrame(d, f, b.pillarOffset, ma),
                                            c.distanceTo(ma) < b.pillarConvex.boundingSphereRadius + a.boundingSphereRadius && this.sphereConvex(a, b.pillarConvex, c, ma, e, f, k, m),
                                            2 < n.length - C)
                                        )
                                            return;
                        }
                    };
                },
                {
                    "../collision/AABB": 3,
                    "../collision/Ray": 9,
                    "../equations/ContactEquation": 19,
                    "../equations/FrictionEquation": 21,
                    "../math/Quaternion": 28,
                    "../math/Transform": 29,
                    "../math/Vec3": 30,
                    "../shapes/ConvexPolyhedron": 38,
                    "../shapes/Shape": 43,
                    "../solver/Solver": 47,
                    "../utils/Vec3Pool": 54,
                },
            ],
            56: [
                function (b, d, f) {
                    function a() {
                        l.apply(this);
                        this.dt = -1;
                        this.allowSleep = !1;
                        this.contacts = [];
                        this.frictionEquations = [];
                        this.quatNormalizeSkip = 0;
                        this.quatNormalizeFast = !1;
                        this.stepnumber = this.time = 0;
                        this.default_dt = 1 / 60;
                        this.nextId = 0;
                        this.gravity = new e();
                        this.broadphase = new w();
                        this.bodies = [];
                        this.solver = new c();
                        this.constraints = [];
                        this.narrowphase = new h(this);
                        this.collisionMatrix = new k();
                        this.collisionMatrixPrevious = new k();
                        this.materials = [];
                        this.contactmaterials = [];
                        this.contactMaterialTable = new q();
                        this.defaultMaterial = new m("default");
                        this.defaultContactMaterial = new p(this.defaultMaterial, this.defaultMaterial, { friction: 0.3, restitution: 0 });
                        this.doProfiling = !1;
                        this.profile = { solve: 0, makeContactConstraints: 0, broadphase: 0, integrate: 0, narrowphase: 0 };
                        this.subsystems = [];
                        this.addBodyEvent = { type: "addBody", body: null };
                        this.removeBodyEvent = { type: "removeBody", body: null };
                    }
                    d.exports = a;
                    b("../shapes/Shape");
                    var e = b("../math/Vec3");
                    d = b("../math/Quaternion");
                    var c = b("../solver/GSSolver");
                    b("../utils/Vec3Pool");
                    b("../equations/ContactEquation");
                    b("../equations/FrictionEquation");
                    var h = b("./Narrowphase"),
                        l = b("../utils/EventTarget"),
                        k = b("../collision/ArrayCollisionMatrix"),
                        m = b("../material/Material"),
                        p = b("../material/ContactMaterial"),
                        n = b("../objects/Body"),
                        q = b("../utils/TupleDictionary"),
                        u = b("../collision/RaycastResult");
                    f = b("../collision/AABB");
                    var r = b("../collision/Ray"),
                        w = b("../collision/NaiveBroadphase");
                    a.prototype = new l();
                    new f();
                    var v = new r();
                    a.prototype.getContactMaterial = function (a, b) {
                        return this.contactMaterialTable.get(a.id, b.id);
                    };
                    a.prototype.numObjects = function () {
                        return this.bodies.length;
                    };
                    a.prototype.collisionMatrixTick = function () {
                        var a = this.collisionMatrixPrevious;
                        this.collisionMatrixPrevious = this.collisionMatrix;
                        this.collisionMatrix = a;
                        this.collisionMatrix.reset();
                    };
                    a.prototype.add = a.prototype.addBody = function (a) {
                        -1 === this.bodies.indexOf(a) &&
                            ((a.index = this.bodies.length),
                            this.bodies.push(a),
                            (a.world = this),
                            a.initPosition.copy(a.position),
                            a.initVelocity.copy(a.velocity),
                            (a.timeLastSleepy = this.time),
                            a instanceof n && (a.initAngularVelocity.copy(a.angularVelocity), a.initQuaternion.copy(a.quaternion)),
                            this.collisionMatrix.setNumObjects(this.bodies.length),
                            (this.addBodyEvent.body = a),
                            this.dispatchEvent(this.addBodyEvent));
                    };
                    a.prototype.addConstraint = function (a) {
                        this.constraints.push(a);
                    };
                    a.prototype.removeConstraint = function (a) {
                        a = this.constraints.indexOf(a);
                        -1 !== a && this.constraints.splice(a, 1);
                    };
                    a.prototype.rayTest = function (a, b, c) {
                        c instanceof u ? this.raycastClosest(a, b, { skipBackfaces: !0 }, c) : this.raycastAll(a, b, { skipBackfaces: !0 }, c);
                    };
                    a.prototype.raycastAll = function (a, b, c, d) {
                        c.mode = r.ALL;
                        c.from = a;
                        c.to = b;
                        c.callback = d;
                        return v.intersectWorld(this, c);
                    };
                    a.prototype.raycastAny = function (a, b, c, d) {
                        c.mode = r.ANY;
                        c.from = a;
                        c.to = b;
                        c.result = d;
                        return v.intersectWorld(this, c);
                    };
                    a.prototype.raycastClosest = function (a, b, c, d) {
                        c.mode = r.CLOSEST;
                        c.from = a;
                        c.to = b;
                        c.result = d;
                        return v.intersectWorld(this, c);
                    };
                    a.prototype.remove = function (a) {
                        a.world = null;
                        var b = this.bodies.length - 1,
                            c = this.bodies,
                            d = c.indexOf(a);
                        if (-1 !== d) {
                            c.splice(d, 1);
                            for (d = 0; d !== c.length; d++) c[d].index = d;
                            this.collisionMatrix.setNumObjects(b);
                            this.removeBodyEvent.body = a;
                            this.dispatchEvent(this.removeBodyEvent);
                        }
                    };
                    a.prototype.removeBody = a.prototype.remove;
                    a.prototype.addMaterial = function (a) {
                        this.materials.push(a);
                    };
                    a.prototype.addContactMaterial = function (a) {
                        this.contactmaterials.push(a);
                        this.contactMaterialTable.set(a.materials[0].id, a.materials[1].id, a);
                    };
                    "undefined" === typeof performance && (performance = {});
                    if (!performance.now) {
                        var x = Date.now();
                        performance.timing && performance.timing.navigationStart && (x = performance.timing.navigationStart);
                        performance.now = function () {
                            return Date.now() - x;
                        };
                    }
                    var y = new e();
                    a.prototype.step = function (a, b, c) {
                        c = c || 10;
                        b = b || 0;
                        if (0 === b) this.internalStep(a), (this.time += a);
                        else {
                            var d = Math.floor((this.time + b) / a) - Math.floor(this.time / a);
                            d = Math.min(d, c);
                            c = performance.now();
                            for (var e = 0; e !== d && !(this.internalStep(a), performance.now() - c > 1e3 * a); e++);
                            this.time += b;
                            a = (this.time % a) / a;
                            b = this.bodies;
                            for (d = 0; d !== b.length; d++)
                                (c = b[d]),
                                    c.type !== n.STATIC && c.sleepState !== n.SLEEPING
                                        ? (c.position.vsub(c.previousPosition, y), y.scale(a, y), c.position.vadd(y, c.interpolatedPosition))
                                        : (c.interpolatedPosition.copy(c.position), c.interpolatedQuaternion.copy(c.quaternion));
                        }
                    };
                    var z = { type: "postStep" },
                        E = { type: "preStep" },
                        A = { type: "collide", body: null, contact: null },
                        F = [],
                        L = [],
                        H = [],
                        P = [];
                    new e();
                    new e();
                    new e();
                    new e();
                    new e();
                    new e();
                    new e();
                    new e();
                    new e();
                    new d();
                    var R = new d(),
                        M = new d(),
                        N = new e();
                    a.prototype.internalStep = function (a) {
                        this.dt = a;
                        var b = this.contacts,
                            c = this.numObjects(),
                            d = this.bodies,
                            e = this.solver,
                            f = this.gravity,
                            h = this.doProfiling,
                            k = this.profile,
                            l = n.DYNAMIC,
                            m,
                            p = this.constraints;
                        f.norm();
                        var q = f.x,
                            r = f.y,
                            u = f.z;
                        h && (m = performance.now());
                        for (f = 0; f !== c; f++) {
                            var v = d[f];
                            if (v.type & l) {
                                var w = v.force;
                                v = v.mass;
                                w.x += v * q;
                                w.y += v * r;
                                w.z += v * u;
                            }
                        }
                        f = 0;
                        for (v = this.subsystems.length; f !== v; f++) this.subsystems[f].update();
                        h && (m = performance.now());
                        H.length = 0;
                        P.length = 0;
                        this.broadphase.collisionPairs(this, H, P);
                        h && (k.broadphase = performance.now() - m);
                        v = p.length;
                        for (f = 0; f !== v; f++)
                            if (((q = p[f]), !q.collideConnected)) for (r = H.length - 1; 0 <= r; --r) if ((q.bodyA === H[r] && q.bodyB === P[r]) || (q.bodyB === H[r] && q.bodyA === P[r])) H.splice(r, 1), P.splice(r, 1);
                        this.collisionMatrixTick();
                        h && (m = performance.now());
                        v = b.length;
                        for (f = 0; f !== v; f++) F.push(b[f]);
                        b.length = 0;
                        v = this.frictionEquations.length;
                        for (f = 0; f !== v; f++) L.push(this.frictionEquations[f]);
                        this.frictionEquations.length = 0;
                        this.narrowphase.getContacts(H, P, this, b, F, this.frictionEquations, L);
                        h && (k.narrowphase = performance.now() - m);
                        h && (m = performance.now());
                        for (f = 0; f < this.frictionEquations.length; f++) e.addEquation(this.frictionEquations[f]);
                        f = b.length;
                        for (r = 0; r !== f; r++)
                            (q = b[r]),
                                (v = q.bi),
                                (u = q.bj),
                                v.material && u.material && this.getContactMaterial(v.material, u.material),
                                v.material && u.material && 0 <= v.material.restitution && 0 <= u.material.restitution && (q.restitution = v.material.restitution * u.material.restitution),
                                e.addEquation(q),
                                v.allowSleep &&
                                    v.type === n.DYNAMIC &&
                                    v.sleepState === n.SLEEPING &&
                                    u.sleepState === n.AWAKE &&
                                    u.type !== n.STATIC &&
                                    u.velocity.norm2() + u.angularVelocity.norm2() >= 2 * Math.pow(u.sleepSpeedLimit, 2) &&
                                    (v._wakeUpAfterNarrowphase = !0),
                                u.allowSleep &&
                                    u.type === n.DYNAMIC &&
                                    u.sleepState === n.SLEEPING &&
                                    v.sleepState === n.AWAKE &&
                                    v.type !== n.STATIC &&
                                    v.velocity.norm2() + v.angularVelocity.norm2() >= 2 * Math.pow(v.sleepSpeedLimit, 2) &&
                                    (u._wakeUpAfterNarrowphase = !0),
                                this.collisionMatrix.set(v, u, !0),
                                this.collisionMatrixPrevious.get(v, u) || ((A.body = u), (A.contact = q), v.dispatchEvent(A), (A.body = v), u.dispatchEvent(A));
                        h && ((k.makeContactConstraints = performance.now() - m), (m = performance.now()));
                        for (f = 0; f !== c; f++) (v = d[f]), v._wakeUpAfterNarrowphase && (v.wakeUp(), (v._wakeUpAfterNarrowphase = !1));
                        v = p.length;
                        for (f = 0; f !== v; f++) for (q = p[f], q.update(), r = 0, b = q.equations.length; r !== b; r++) e.addEquation(q.equations[r]);
                        e.solve(a, this);
                        h && (k.solve = performance.now() - m);
                        e.removeAllEquations();
                        e = Math.pow;
                        for (f = 0; f !== c; f++) if (((v = d[f]), v.type & l && ((p = e(1 - v.linearDamping, a)), (b = v.velocity), b.mult(p, b), (p = v.angularVelocity)))) (b = e(1 - v.angularDamping, a)), p.mult(b, p);
                        this.dispatchEvent(E);
                        for (f = 0; f !== c; f++) (v = d[f]), v.preStep && v.preStep.call(v);
                        h && (m = performance.now());
                        l = n.DYNAMIC | n.KINEMATIC;
                        e = 0 === this.stepnumber % (this.quatNormalizeSkip + 1);
                        p = this.quatNormalizeFast;
                        b = 0.5 * a;
                        for (f = 0; f !== c; f++)
                            if (((v = d[f]), (q = v.force), (r = v.torque), v.type & l && v.sleepState !== n.SLEEPING)) {
                                u = v.velocity;
                                w = v.angularVelocity;
                                var x = v.position,
                                    y = v.quaternion,
                                    Z = v.invMass,
                                    ha = v.invInertiaWorld;
                                u.x += q.x * Z * a;
                                u.y += q.y * Z * a;
                                u.z += q.z * Z * a;
                                v.angularVelocity && (ha.vmult(r, N), N.mult(a, N), N.vadd(w, w));
                                x.x += u.x * a;
                                x.y += u.y * a;
                                x.z += u.z * a;
                                v.angularVelocity && (R.set(w.x, w.y, w.z, 0), R.mult(y, M), (y.x += b * M.x), (y.y += b * M.y), (y.z += b * M.z), (y.w += b * M.w), e && (p ? y.normalizeFast() : y.normalize()));
                                v.aabb && (v.aabbNeedsUpdate = !0);
                                v.updateInertiaWorld && v.updateInertiaWorld();
                            }
                        this.clearForces();
                        this.broadphase.dirty = !0;
                        h && (k.integrate = performance.now() - m);
                        this.time += a;
                        this.stepnumber += 1;
                        this.dispatchEvent(z);
                        for (f = 0; f !== c; f++) (v = d[f]), (a = v.postStep) && a.call(v);
                        if (this.allowSleep) for (f = 0; f !== c; f++) d[f].sleepTick(this.time);
                    };
                    a.prototype.clearForces = function () {
                        for (var a = this.bodies, b = a.length, c = 0; c !== b; c++) {
                            var d = a[c];
                            d.force.set(0, 0, 0);
                            d.torque.set(0, 0, 0);
                        }
                    };
                },
                {
                    "../collision/AABB": 3,
                    "../collision/ArrayCollisionMatrix": 4,
                    "../collision/NaiveBroadphase": 7,
                    "../collision/Ray": 9,
                    "../collision/RaycastResult": 10,
                    "../equations/ContactEquation": 19,
                    "../equations/FrictionEquation": 21,
                    "../material/ContactMaterial": 24,
                    "../material/Material": 25,
                    "../math/Quaternion": 28,
                    "../math/Vec3": 30,
                    "../objects/Body": 31,
                    "../shapes/Shape": 43,
                    "../solver/GSSolver": 46,
                    "../utils/EventTarget": 49,
                    "../utils/TupleDictionary": 52,
                    "../utils/Vec3Pool": 54,
                    "./Narrowphase": 55,
                },
            ],
        },
        {},
        [2]
    )(2);
});
CANNON = CANNON || {};
var camera,
    scene,
    renderer,
    controls = null,
    s_oRender;
CANNON.Demo = function (g) {
    function b() {
        if (z) {
            for (var a in z.__controllers) z.__controllers[a].updateDisplay();
            for (var b in z.__folders) for (a in z.__folders[b].__controllers) z.__folders[b].__controllers[a].updateDisplay();
        }
    }
    function d(a) {
        function b(a, c) {
            a.material && (a.material = c);
            for (var d = 0; d < a.children.length; d++) b(a.children[d], c);
        }
        if (-1 === V.indexOf(a)) throw Error("Render mode " + a + " not found!");
        switch (a) {
            case "solid":
                q.currentMaterial = H;
                I.intensity = 1;
                B.color.setHex(2236962);
                break;
            case "wireframe":
                (q.currentMaterial = P), (I.intensity = 0), B.color.setHex(16777215);
        }
        for (var c = 0; c < x.length; c++) b(x[c], q.currentMaterial);
        r.rendermode = a;
    }
    function f() {
        for (var a = v.length, b = 0; b < a; b++) {
            var c = v[b];
            c.position.copy(c.initPosition);
            c.velocity.copy(c.initVelocity);
            c.initAngularVelocity && (c.angularVelocity.copy(c.initAngularVelocity), c.quaternion.copy(c.initQuaternion));
        }
    }
    function a(a) {
        0 === a.x && (a.x = 1e-6);
        0 === a.y && (a.y = 1e-6);
        0 === a.z && (a.z = 1e-6);
    }
    function e() {
        for (var b = v.length, c = 0; c < b; c++) {
            var d = v[c],
                e = x[c];
            e.position.copy(d.position);
            d.quaternion && e.quaternion.copy(d.quaternion);
        }
        M.restart();
        if (r.contacts)
            for (c = 0; c < G.contacts.length; c++)
                for (b = 0; 2 > b; b++) {
                    e = M.request();
                    var f = G.contacts[c];
                    d = 0 === b ? f.bi : f.bj;
                    var g = 0 === b ? f.ri : f.rj;
                    e.position.set(d.position.x + g.x, d.position.y + g.y, d.position.z + g.z);
                }
        M.hideCached();
        N.restart();
        if (r.cm2contact)
            for (c = 0; c < G.contacts.length; c++)
                for (b = 0; 2 > b; b++) (e = N.request()), (f = G.contacts[c]), (d = 0 === b ? f.bi : f.bj), (g = 0 === b ? f.ri : f.rj), e.scale.set(g.x, g.y, g.z), a(e.scale), e.position.copy(d.position);
        N.hideCached();
        C.restart();
        T.restart();
        if (r.constraints) {
            for (c = 0; c < G.constraints.length; c++)
                (f = G.constraints[c]),
                    f instanceof CANNON.DistanceConstraint &&
                        ((d = f.equations.normal),
                        (b = d.bi),
                        (d = d.bj),
                        (e = C.request()),
                        (d = d.position ? d.position : d),
                        e.scale.set(d.x - b.position.x, d.y - b.position.y, d.z - b.position.z),
                        a(e.scale),
                        e.position.copy(b.position));
            for (c = 0; c < G.constraints.length; c++)
                if (((f = G.constraints[c]), f instanceof CANNON.PointToPointConstraint)) {
                    g = f.equations.normal;
                    b = g.bi;
                    d = g.bj;
                    e = T.request();
                    f = T.request();
                    var h = T.request();
                    e.scale.set(g.ri.x, g.ri.y, g.ri.z);
                    f.scale.set(g.rj.x, g.rj.y, g.rj.z);
                    h.scale.set(-g.penetrationVec.x, -g.penetrationVec.y, -g.penetrationVec.z);
                    a(e.scale);
                    a(f.scale);
                    a(h.scale);
                    e.position.copy(b.position);
                    f.position.copy(d.position);
                    g.bj.position.vadd(g.rj, h.position);
                }
        }
        T.hideCached();
        C.hideCached();
        t.restart();
        if (r.normals) for (c = 0; c < G.contacts.length; c++) (f = G.contacts[c]), (b = f.bi), (e = t.request()), (g = f.ni), (d = b), e.scale.set(g.x, g.y, g.z), a(e.scale), e.position.copy(d.position), f.ri.vadd(e.position, e.position);
        t.hideCached();
        U.restart();
        if (r.axes) for (b = 0; b < v.length; b++) (d = v[b]), (e = U.request()), e.position.copy(d.position), d.quaternion && e.quaternion.copy(d.quaternion);
        U.hideCached();
        K.restart();
        if (r.aabbs)
            for (c = 0; c < v.length; c++)
                (d = v[c]),
                    d.computeAABB &&
                        (d.aabbNeedsUpdate && d.computeAABB(),
                        isFinite(d.aabb.lowerBound.x) &&
                            isFinite(d.aabb.lowerBound.y) &&
                            isFinite(d.aabb.lowerBound.z) &&
                            isFinite(d.aabb.upperBound.x) &&
                            isFinite(d.aabb.upperBound.y) &&
                            isFinite(d.aabb.upperBound.z) &&
                            0 != d.aabb.lowerBound.x - d.aabb.upperBound.x &&
                            0 != d.aabb.lowerBound.y - d.aabb.upperBound.y &&
                            0 != d.aabb.lowerBound.z - d.aabb.upperBound.z &&
                            ((e = K.request()),
                            e.scale.set(d.aabb.lowerBound.x - d.aabb.upperBound.x, d.aabb.lowerBound.y - d.aabb.upperBound.y, d.aabb.lowerBound.z - d.aabb.upperBound.z),
                            e.position.set(0.5 * (d.aabb.lowerBound.x + d.aabb.upperBound.x), 0.5 * (d.aabb.lowerBound.y + d.aabb.upperBound.y), 0.5 * (d.aabb.lowerBound.z + d.aabb.upperBound.z))));
        K.hideCached();
    }
    function c() {
        requestAnimationFrame(c);
        r.paused || e();
        k();
        Q.update();
    }
    function h(a) {
        mouseX = a.clientX - W;
        mouseY = a.clientY - aa;
    }
    function l(a) {
        D = s_iCanvasResizeWidth + 2 * s_iCanvasOffsetWidth;
        X = s_iCanvasResizeHeight + 2 * s_iCanvasOffsetHeight;
        CAMERA_TEST_TRACKBALL && ((controls.screen.width = D), (controls.screen.height = X));
    }
    function k() {
        (CAMERA_TEST_TRACKBALL || (CAMERA_TEST_TRANSFORM && null !== controls)) && controls.update();
        renderer.clear();
        renderer.render(q.scene, camera);
    }
    function m(a) {
        q.dispatchEvent({ type: "destroy" });
        r.paused = !1;
        b();
        p(a);
    }
    function p(a) {
        for (var c = x.length, d = 0; d < c; d++) {
            G.remove(v.pop());
            var e = x.pop();
            q.scene.remove(e);
        }
        for (; G.constraints.length; ) G.removeConstraint(G.constraints[0]);
        y[a]();
        r.iterations = G.solver.iterations;
        r.gx = G.gravity.x + 0;
        r.gy = G.gravity.y + 0;
        r.gz = G.gravity.z + 0;
        r.quatNormalizeSkip = G.quatNormalizeSkip;
        r.quatNormalizeFast = G.quatNormalizeFast;
        b();
        M.restart();
        M.hideCached();
        N.restart();
        N.hideCached();
        C.restart();
        C.hideCached();
        t.restart();
        t.hideCached();
    }
    function n(a) {
        var b = [],
            c = [];
        this.request = function () {
            geo = b.length ? b.pop() : a();
            scene.add(geo);
            c.push(geo);
            return geo;
        };
        this.restart = function () {
            for (; c.length; ) b.push(c.pop());
        };
        this.hideCached = function () {
            for (var a = 0; a < b.length; a++) scene.remove(b[a]);
        };
    }
    var q = this;
    this.addScene = function (a, b) {
        if ("string" !== typeof a) throw Error("1st argument of Demo.addScene(title,initfunc) must be a string!");
        if ("function" !== typeof b) throw Error("2nd argument of Demo.addScene(title,initfunc) must be a function!");
        y.push(b);
        var c = y.length - 1;
        F[a] = function () {
            m(c);
        };
        u.add(F, a);
    };
    this.restartCurrentScene = f;
    this.changeScene = m;
    this.start = function () {
        p(0);
    };
    var u,
        r = (this.settings = {
            stepFrequency: 60,
            quatNormalizeSkip: 2,
            quatNormalizeFast: !0,
            gx: 0,
            gy: 0,
            gz: 0,
            iterations: 3,
            tolerance: 1e-4,
            k: 1e6,
            d: 3,
            scene: 0,
            paused: !1,
            rendermode: "solid",
            constraints: !1,
            contacts: !1,
            cm2contact: !1,
            normals: !1,
            axes: !1,
            particleSize: 0.1,
            shadows: !1,
            aabbs: !1,
            profiling: !1,
            maxSubSteps: 3,
        });
    g = g || {};
    for (var w in g) w in r && (r[w] = g[w]);
    if (0 !== r.stepFrequency % 60) throw Error("stepFrequency must be a multiple of 60.");
    var v = (this.bodies = []),
        x = (this.visuals = []),
        y = [],
        z = null,
        E = null,
        A = null,
        F = {},
        L = new THREE.SphereGeometry(0.1, 6, 6);
    this.particleGeo = new THREE.SphereGeometry(1, 16, 8);
    var H = new THREE.MeshPhongMaterial({ color: 11184810, specular: 1118481, shininess: 50 }),
        P = new THREE.MeshLambertMaterial({ color: 16777215, wireframe: !0 });
    this.currentMaterial = H;
    var R = new THREE.MeshPhongMaterial({ color: 16711680 });
    this.particleMaterial = new THREE.MeshLambertMaterial({ color: 16711680 });
    var M = new n(function () {
            return new THREE.Mesh(L, R);
        }),
        N = new n(function () {
            var a = new THREE.Geometry();
            a.vertices.push(new THREE.Vector3(0, 0, 0));
            a.vertices.push(new THREE.Vector3(1, 1, 1));
            return new THREE.Line(a, new THREE.LineBasicMaterial({ color: 16711680 }));
        }),
        J = new THREE.BoxGeometry(1, 1, 1),
        O = new THREE.MeshBasicMaterial({ color: 11184810, wireframe: !0 }),
        K = new n(function () {
            return new THREE.Mesh(J, O);
        }),
        C = new n(function () {
            var a = new THREE.Geometry();
            a.vertices.push(new THREE.Vector3(0, 0, 0));
            a.vertices.push(new THREE.Vector3(1, 1, 1));
            return new THREE.Line(a, new THREE.LineBasicMaterial({ color: 16711680 }));
        }),
        T = new n(function () {
            var a = new THREE.Geometry();
            a.vertices.push(new THREE.Vector3(0, 0, 0));
            a.vertices.push(new THREE.Vector3(1, 1, 1));
            return new THREE.Line(a, new THREE.LineBasicMaterial({ color: 16711680 }));
        }),
        t = new n(function () {
            var a = new THREE.Geometry();
            a.vertices.push(new THREE.Vector3(0, 0, 0));
            a.vertices.push(new THREE.Vector3(1, 1, 1));
            return new THREE.Line(a, new THREE.LineBasicMaterial({ color: 65280 }));
        }),
        U = new n(function () {
            var a = new THREE.Object3D(),
                b = new THREE.Vector3(0, 0, 0),
                c = new THREE.Geometry(),
                d = new THREE.Geometry(),
                e = new THREE.Geometry();
            c.vertices.push(b);
            d.vertices.push(b);
            e.vertices.push(b);
            c.vertices.push(new THREE.Vector3(1, 0, 0));
            d.vertices.push(new THREE.Vector3(0, 1, 0));
            e.vertices.push(new THREE.Vector3(0, 0, 1));
            b = new THREE.Line(c, new THREE.LineBasicMaterial({ color: 16711680 }));
            d = new THREE.Line(d, new THREE.LineBasicMaterial({ color: 65280 }));
            e = new THREE.Line(e, new THREE.LineBasicMaterial({ color: 255 }));
            a.add(b);
            a.add(d);
            a.add(e);
            return a;
        }),
        G = (this.world = new CANNON.World());
    G.broadphase = new CANNON.NaiveBroadphase();
    var V = ["solid", "wireframe"],
        I,
        B,
        Q,
        S;
    Detector.webgl || Detector.addGetWebGLMessage();
    var D = s_iCanvasResizeWidth + s_iCanvasOffsetWidth,
        X = s_iCanvasResizeHeight + s_iCanvasOffsetHeight,
        Y,
        W = D / 2,
        aa = X / 2;
    (function () {
        Y = document.createElement("div");
        document.body.appendChild(Y);
        CAMERA_TEST_TRACKBALL
            ? ((NEAR = 1),
              (camera = new THREE.PerspectiveCamera(45, D / X, NEAR, FAR)),
              camera.lookAt(new THREE.Vector3(CAMERA_TEST_LOOK_AT.x, CAMERA_TEST_LOOK_AT.y, CAMERA_TEST_LOOK_AT.z)),
              camera.position.set(0, 500, 500),
              camera.up.set(0, 0, 1))
            : (camera = createOrthoGraphicCamera());
        scene = q.scene = new THREE.Scene();
        scene.fog = new THREE.Fog(8306926, 0.5 * FAR, FAR);
        B = new THREE.AmbientLight(4473924);
        scene.add(B);
        I = new THREE.DirectionalLight(16777181, 1);
        I.position.set(180, 0, 180);
        I.target.position.set(0, 0, 0);
        I.castShadow = !0;
        I.shadow.camera.near = 10;
        I.shadow.camera.far = 100;
        I.shadow.camera.fov = FOV;
        I.shadowMapBias = 0.0139;
        I.shadowMapDarkness = 0.1;
        I.shadow.mapSize.width = 1024;
        I.shadow.mapSize.height = 1024;
        new THREE.CameraHelper(I.shadow.camera);
        scene.add(I);
        scene.add(camera);
        renderer = SHOW_3D_RENDER ? new THREE.WebGLRenderer({ clearColor: 0, clearAlpha: 0.5, antialias: !0, alpha: !0 }) : new THREE.CanvasRenderer({ clearColor: 0, clearAlpha: 0.5, antialias: !1, alpha: !0 });
        renderer.setSize(D, X);
        renderer.domElement.style.position = "relative";
        renderer.domElement.style.top = "0px";
        renderer.domElement.style.opacity = CANVAS_3D_OPACITY;
        Y.appendChild(renderer.domElement);
        S = document.createElement("div");
        S.style.position = "absolute";
        S.style.top = "10px";
        S.style.width = "100%";
        S.style.textAlign = "center";
        S.innerHTML = '<a href="http://github.com/schteppe/cannon.js">cannon.js</a> - javascript 3d physics';
        Y.appendChild(S);
        document.addEventListener("mousemove", h);
        window.addEventListener("resize", l);
        renderer.setClearColor(scene.fog.color, 1);
        renderer.autoClear = !1;
        A = document.createElement("canvas");
        A.width = D;
        A.height = X;
        A.style.opacity = 0.5;
        A.style.position = "absolute";
        A.style.top = "0px";
        A.style.zIndex = 90;
        Y.appendChild(A);
        E = new SmoothieChart({
            labelOffsetY: 50,
            maxDataSetLength: 100,
            millisPerPixel: 2,
            grid: { strokeStyle: "none", fillStyle: "none", lineWidth: 1, millisPerLine: 250, verticalSections: 6 },
            labels: { fillStyle: "rgb(180, 180, 180)" },
        });
        E.streamTo(A);
        var a = {},
            b = [
                [255, 0, 0],
                [0, 255, 0],
                [0, 0, 255],
                [255, 255, 0],
                [255, 0, 255],
                [0, 255, 255],
            ],
            c = 0,
            e;
        for (e in G.profile) {
            var f = b[c % b.length];
            a[e] = new TimeSeries({ label: e, fillStyle: "rgb(" + f[0] + "," + f[1] + "," + f[2] + ")", maxDataLength: 500 });
            c++;
        }
        G.addEventListener("postStep", function (b) {
            for (var c in G.profile) a[c].append(1e3 * G.time, G.profile[c]);
        });
        c = 0;
        for (e in G.profile) (f = b[c % b.length]), E.addTimeSeries(a[e], { strokeStyle: "rgb(" + f[0] + "," + f[1] + "," + f[2] + ")", lineWidth: 2 }), c++;
        G.doProfiling = !1;
        E.stop();
        A.style.display = "none";
        Q = new Stats();
        Q.domElement.style.position = "absolute";
        Q.domElement.style.top = "0px";
        Q.domElement.style.zIndex = 100;
        Y.appendChild(Q.domElement);
        void 0 != window.dat &&
            ((z = new dat.GUI()),
            (z.domElement.parentNode.style.zIndex = 120),
            (b = z.addFolder("Rendering")),
            b.add(r, "rendermode", { Solid: "solid", Wireframe: "wireframe" }).onChange(function (a) {
                d(a);
            }),
            b.add(r, "contacts"),
            b.add(r, "cm2contact"),
            b.add(r, "normals"),
            b.add(r, "constraints"),
            b.add(r, "axes"),
            b
                .add(r, "particleSize")
                .min(0)
                .max(1)
                .onChange(function (a) {
                    for (var b = 0; b < x.length; b++) v[b] instanceof CANNON.Particle && x[b].scale.set(a, a, a);
                }),
            b.add(r, "shadows").onChange(function (a) {
                a ? (renderer.shadowMapAutoUpdate = !0) : ((renderer.shadowMapAutoUpdate = !1), renderer.clearTarget(I.shadowMap));
            }),
            b.add(r, "aabbs"),
            b.add(r, "profiling").onChange(function (a) {
                a ? ((G.doProfiling = !0), E.start(), (A.style.display = "block")) : ((G.doProfiling = !1), E.stop(), (A.style.display = "none"));
            }),
            (b = z.addFolder("World")),
            b.add(r, "paused").onChange(function (a) {}),
            b.add(r, "stepFrequency", 60, 600).step(60),
            b.add(r, "gx", -100, 100).onChange(function (a) {
                isNaN(a) || G.gravity.set(a, r.gy, r.gz);
            }),
            b.add(r, "gy", -100, 100).onChange(function (a) {
                isNaN(a) || G.gravity.set(r.gx, a, r.gz);
            }),
            b.add(r, "gz", -100, 100).onChange(function (a) {
                isNaN(a) || G.gravity.set(r.gx, r.gy, a);
            }),
            b
                .add(r, "quatNormalizeSkip", 0, 50)
                .step(1)
                .onChange(function (a) {
                    isNaN(a) || (G.quatNormalizeSkip = a);
                }),
            b.add(r, "quatNormalizeFast").onChange(function (a) {
                G.quatNormalizeFast = !!a;
            }),
            (b = z.addFolder("Solver")),
            b
                .add(r, "iterations", 1, 50)
                .step(1)
                .onChange(function (a) {
                    G.solver.iterations = a;
                }),
            b.add(r, "k", 10, 1e7).onChange(function (a) {
                q.setGlobalSpookParams(r.k, r.d, 1 / r.stepFrequency);
            }),
            b
                .add(r, "d", 0, 20)
                .step(0.1)
                .onChange(function (a) {
                    q.setGlobalSpookParams(r.k, r.d, 1 / r.stepFrequency);
                }),
            b
                .add(r, "tolerance", 0, 10)
                .step(0.01)
                .onChange(function (a) {
                    G.solver.tolerance = a;
                }),
            (u = z.addFolder("Scenes")),
            u.open());
        CAMERA_TEST_TRACKBALL &&
            ((controls = new THREE.TrackballControls(camera, renderer.domElement)),
            (controls.rotateSpeed = 1),
            (controls.zoomSpeed = 1.2),
            (controls.panSpeed = 0.2),
            (controls.noZoom = !1),
            (controls.noPan = !1),
            (controls.staticMoving = !1),
            (controls.dynamicDampingFactor = 0.3),
            (controls.minDistance = 0),
            (controls.maxDistance = 1e5),
            (controls.keys = [65, 83, 68]),
            (controls.screen.width = D),
            (controls.screen.height = X));
    })();
    c();
    s_oRender = k;
    document.addEventListener("keypress", function (a) {
        if (a.keyCode)
            switch (a.keyCode) {
                case 32:
                    f();
                    break;
                case 104:
                    "none" == Q.domElement.style.display ? ((Q.domElement.style.display = "block"), (S.style.display = "block")) : ((Q.domElement.style.display = "none"), (S.style.display = "none"));
                    break;
                case 97:
                    r.aabbs = !r.aabbs;
                    b();
                    break;
                case 99:
                    r.constraints = !r.constraints;
                    b();
                    break;
                case 112:
                    r.paused = !r.paused;
                    b();
                    break;
                case 115:
                    G.step(1 / r.stepFrequency);
                    e();
                    break;
                case 109:
                    a = V.indexOf(r.rendermode);
                    a++;
                    a %= V.length;
                    d(V[a]);
                    b();
                    break;
                case 49:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                    y.length > a.keyCode - 49 && !document.activeElement.localName.match(/input/) && m(a.keyCode - 49);
            }
    });
};
CANNON.Demo.prototype = new CANNON.EventTarget();
CANNON.Demo.constructor = CANNON.Demo;
CANNON.Demo.prototype.setGlobalSpookParams = function (g, b, d) {
    for (var f = this.world, a = 0; a < f.constraints.length; a++) for (var e = f.constraints[a], c = 0; c < e.equations.length; c++) e.equations[c].setSpookParams(g, b, d);
    for (a = 0; a < f.contactmaterials.length; a++) (d = f.contactmaterials[a]), (d.contactEquationStiffness = g), (d.frictionEquationStiffness = g), (d.contactEquationRelaxation = b), (d.frictionEquationRelaxation = b);
    f.defaultContactMaterial.contactEquationStiffness = g;
    f.defaultContactMaterial.frictionEquationStiffness = g;
    f.defaultContactMaterial.contactEquationRelaxation = b;
    f.defaultContactMaterial.frictionEquationRelaxation = b;
};
CANNON.Demo.prototype.createTransformControl = function (g, b) {
    controls = new THREE.TransformControls(camera, renderer.domElement);
    scene.add(g);
    controls.attach(g, b);
    scene.add(controls);
    console.log("CREATE");
    window.addEventListener("keydown", function (b) {
        switch (b.keyCode) {
            case 81:
                controls.setSpace("local" === controls.space ? "world" : "local");
                break;
            case 17:
                controls.setTranslationSnap(100);
                controls.setRotationSnap(THREE.Math.degToRad(15));
                break;
            case 87:
                controls.setMode("translate");
                break;
            case 69:
                controls.setMode("rotate");
                break;
            case 82:
                controls.setMode("scale");
                break;
            case 187:
            case 107:
                controls.setSize(controls.size + 0.1);
                break;
            case 189:
            case 109:
                controls.setSize(Math.max(controls.size - 0.1, 0.1));
        }
    });
    window.addEventListener("keyup", function (b) {
        switch (b.keyCode) {
            case 17:
                controls.setTranslationSnap(null), controls.setRotationSnap(null);
        }
    });
};
CANNON.Demo.prototype.getWorld = function () {
    return this.world;
};
CANNON.Demo.prototype.addVisual = function (g, b) {
    var d;
    g instanceof CANNON.Body && (d = this.shape2mesh(g, b));
    d && (this.bodies.push(g), this.visuals.push(d), (g.visualref = d), (g.visualref.visualId = this.bodies.length - 1), this.scene.add(d));
    return d;
};
CANNON.Demo.prototype.addVisuals = function (g) {
    for (var b = 0; b < g.length; b++) this.addVisual(g[b]);
};
CANNON.Demo.prototype.removeVisual = function (g) {
    if (g.visualref) {
        for (var b = this.bodies, d = this.visuals, f = [], a = [], e = b.length, c = 0; c < e; c++) f.unshift(b.pop()), a.unshift(d.pop());
        e = g.visualref.visualId;
        for (var h = 0; h < f.length; h++) h !== e && ((c = h > e ? h - 1 : h), (b[c] = f[h]), (d[c] = a[h]), (b[c].visualref = f[h].visualref), (b[c].visualref.visualId = c));
        g.visualref.visualId = null;
        this.scene.remove(g.visualref);
        g.visualref = null;
    }
};
CANNON.Demo.prototype.removeAllVisuals = function () {
    for (; this.bodies.length; ) this.removeVisual(this.bodies[0]);
};
CANNON.Demo.prototype.shape2mesh = function (g, b) {
    for (var d = new THREE.Object3D(), f = 0; f < g.shapes.length; f++) {
        var a = g.shapes[f];
        switch (a.type) {
            case CANNON.Shape.types.SPHERE:
                var e = new THREE.SphereGeometry(a.radius, 8, 8);
                a = void 0 === b ? new THREE.Mesh(e, this.currentMaterial) : new THREE.Mesh(e, b);
                a.castShadow = !0;
                break;
            case CANNON.Shape.types.PARTICLE:
                a = new THREE.Mesh(this.particleGeo, this.particleMaterial);
                e = this.settings;
                a.scale.set(e.particleSize, e.particleSize, e.particleSize);
                break;
            case CANNON.Shape.types.PLANE:
                var c = new THREE.PlaneGeometry(10, 10, 4, 4);
                a = new THREE.Object3D();
                e = new THREE.Object3D();
                c = void 0 === b ? new THREE.Mesh(c, this.currentMaterial) : new THREE.Mesh(c, b);
                c.scale.set(100, 100, 100);
                e.add(c);
                c.castShadow = !1;
                c.receiveShadow = !0;
                a.add(e);
                break;
            case CANNON.Shape.types.BOX:
                e = new THREE.BoxGeometry(2 * a.halfExtents.x, 2 * a.halfExtents.y, 2 * a.halfExtents.z);
                a = void 0 === b ? new THREE.Mesh(e, this.currentMaterial) : new THREE.Mesh(e, b);
                break;
            case CANNON.Shape.types.CONVEXPOLYHEDRON:
                c = new THREE.Geometry();
                for (e = 0; e < a.vertices.length; e++) {
                    var h = a.vertices[e];
                    c.vertices.push(new THREE.Vector3(h.x, h.y, h.z));
                }
                for (e = 0; e < a.faces.length; e++) {
                    var l = a.faces[e],
                        k = l[0];
                    for (h = 1; h < l.length - 1; h++) c.faces.push(new THREE.Face3(k, l[h], l[h + 1]));
                }
                c.computeBoundingSphere();
                c.computeFaceNormals();
                a = void 0 === b ? new THREE.Mesh(c, this.currentMaterial) : new THREE.Mesh(c, b);
                break;
            case CANNON.Shape.types.HEIGHTFIELD:
                c = new THREE.Geometry();
                l = new CANNON.Vec3();
                k = new CANNON.Vec3();
                var m = new CANNON.Vec3();
                for (h = 0; h < a.data.length - 1; h++)
                    for (var p = 0; p < a.data[h].length - 1; p++)
                        for (var n = 0; 2 > n; n++)
                            a.getConvexTrianglePillar(h, p, 0 === n),
                                l.copy(a.pillarConvex.vertices[0]),
                                k.copy(a.pillarConvex.vertices[1]),
                                m.copy(a.pillarConvex.vertices[2]),
                                l.vadd(a.pillarOffset, l),
                                k.vadd(a.pillarOffset, k),
                                m.vadd(a.pillarOffset, m),
                                c.vertices.push(new THREE.Vector3(l.x, l.y, l.z), new THREE.Vector3(k.x, k.y, k.z), new THREE.Vector3(m.x, m.y, m.z)),
                                (e = c.vertices.length - 3),
                                c.faces.push(new THREE.Face3(e, e + 1, e + 2));
                c.computeBoundingSphere();
                c.computeFaceNormals();
                a = void 0 === b ? new THREE.Mesh(c, this.currentMaterial) : new THREE.Mesh(c, b);
                break;
            case CANNON.Shape.types.TRIMESH:
                c = new THREE.Geometry();
                l = new CANNON.Vec3();
                k = new CANNON.Vec3();
                m = new CANNON.Vec3();
                for (e = 0; e < a.indices.length / 3; e++)
                    a.getTriangleVertices(e, l, k, m),
                        c.vertices.push(new THREE.Vector3(l.x, l.y, l.z), new THREE.Vector3(k.x, k.y, k.z), new THREE.Vector3(m.x, m.y, m.z)),
                        (h = c.vertices.length - 3),
                        c.faces.push(new THREE.Face3(h, h + 1, h + 2));
                c.computeBoundingSphere();
                c.computeFaceNormals();
                a = void 0 === b ? new THREE.Mesh(c, this.currentMaterial) : new THREE.Mesh(c, b);
                break;
            default:
                throw "Visual type not recognized: " + a.type;
        }
        a.receiveShadow = !0;
        a.castShadow = !0;
        if (a.children)
            for (e = 0; e < a.children.length; e++)
                if (((a.children[e].castShadow = !0), (a.children[e].receiveShadow = !0), a.children[e]))
                    for (h = 0; h < a.children[e].length; h++) (a.children[e].children[h].castShadow = !0), (a.children[e].children[h].receiveShadow = !0);
        e = g.shapeOffsets[f];
        c = g.shapeOrientations[f];
        a.position.set(e.x, e.y, e.z);
        a.quaternion.set(c.x, c.y, c.z, c.w);
        d.add(a);
    }
    this.camera = function () {
        return camera;
    };
    this.getScene = function () {
        return scene;
    };
    return d;
};
function CBall(g, b, d, f, a) {
    var e,
        c,
        h,
        l = null,
        k = FOV * BALL_RADIUS,
        m = 0,
        p = 0;
    this._init = function (a, b, d) {
        h = new createjs.Container();
        q.addChild(h);
        var f = new createjs.SpriteSheet({ images: [d], frames: { width: d.width / 7, height: d.height, regX: d.width / 2 / 7, regY: d.height / 2 } });
        e = createSprite(f, 0, d.width / 2 / 7, d.height / 2, d.width / 7, d.height / 2);
        e.stop();
        this.scale(k);
        d = s_oSpriteLibrary.getSprite("ball_shadow");
        c = createBitmap(d);
        c.x = a;
        c.y = b;
        c.regX = 0.5 * d.width;
        c.regY = 0.5 * d.height;
        this.scaleShadow(k);
        h.addChild(c, e);
    };
    this.rolls = function () {
        e.rotation = Math.degrees(Math.sin(-(0.15 * n.velocity.x)));
        var a = Math.abs(n.angularVelocity.x),
            b = this._goToPrevFrame;
        0 > n.angularVelocity.x && (b = this._goToNextFrame);
        7 < a ? b() : 3 < a ? (m++, m > 2 / ROLL_BALL_RATE && (b(), (m = 0))) : 1 < a ? (m++, m > 3 / ROLL_BALL_RATE && (b(), (m = 0))) : a > MIN_BALL_VEL_ROTATION && (m++, m > 4 / ROLL_BALL_RATE && (b(), (m = 0)));
    };
    this._goToPrevFrame = function () {
        0 === p ? (p = 6) : p--;
        e.gotoAndStop(p);
    };
    this._goToNextFrame = function () {
        7 === p ? (p = 1) : p++;
        e.gotoAndStop(p);
    };
    this.unload = function () {
        e.removeAllEventListeners();
        q.removeChild(e);
    };
    this.setVisible = function (a) {
        h.visible = a;
    };
    this.getStartScale = function () {
        return k;
    };
    this.startPosShadowY = function (a) {
        l = a;
    };
    this.getStartShadowYPos = function () {
        return l;
    };
    this.fadeAnimation = function (a, b, c) {
        this.tweenFade(a, b, c);
    };
    this.tweenFade = function (a, b, c) {
        createjs.Tween.get(h, { override: !0 })
            .wait(c)
            .to({ alpha: a }, b)
            .call(function () {});
    };
    this.setPositionShadow = function (a, b) {
        c.x = a;
        c.y = b;
    };
    this.setPosition = function (a, b) {
        e.x = a;
        e.y = b;
    };
    this.getPhysics = function () {
        return n;
    };
    this.setAngle = function (a) {
        e.rotation = a;
    };
    this.getX = function () {
        return e.x;
    };
    this.getY = function () {
        return e.y;
    };
    this.getStartScale = function () {
        return k;
    };
    this.scale = function (a) {
        e.scaleX = a;
        e.scaleY = a;
    };
    this.scaleShadow = function (a) {
        0.08 < a ? ((c.scaleX = a), (c.scaleY = a)) : ((c.scaleX = 0.08), (c.scaleY = 0.08));
    };
    this.setAlphaByHeight = function (a) {
        c.alpha = a;
    };
    this.getScale = function () {
        return e.scaleX;
    };
    this.getObject = function () {
        return h;
    };
    this.getDepthPos = function () {
        return n.position.y;
    };
    var n = f;
    var q = a;
    this._init(g, b, d);
    return this;
}
function CScenario() {
    var g, b, d, f, a, e, c, h, l, k, m, p, n, q, u, r;
    if (SHOW_3D_RENDER) var w = new CANNON.Demo();
    this.getDemo = function () {
        return w;
    };
    this._init = function () {
        g = SHOW_3D_RENDER ? w.getWorld() : new CANNON.World();
        g.gravity.set(0, 0, -9.81);
        g.broadphase = new CANNON.NaiveBroadphase();
        g.solver.iterations = 50;
        g.solver.tolerance = 1e-5;
        b = new CANNON.Material();
        d = new CANNON.Material();
        f = new CANNON.Material();
        var a = new CANNON.ContactMaterial(d, f, { friction: 0.1, restitution: 0.01 }),
            c = new CANNON.ContactMaterial(d, b, { friction: 0.2, restitution: 0.3 });
        g.addContactMaterial(a);
        g.addContactMaterial(c);
        s_oScenario._createBallBody();
        s_oScenario._createFieldBody();
        s_oScenario._createGoal();
        s_oScenario.createBackGoalWall();
        s_oScenario.createAreaGoal(GOAL_LINE_POS, BACK_WALL_GOAL_SIZE, COLOR_AREA_GOAL[0], null);
    };
    this._createFieldBody = function () {
        h = new CANNON.Plane();
        l = new CANNON.Body({ mass: 0, material: b });
        l.addShape(h);
        l.position.z = -9;
        l.addEventListener("collide", function (a) {
            s_oScenario.fieldCollision();
        });
        g.addBody(l);
        if (SHOW_3D_RENDER) {
            var a = new THREE.MeshPhongMaterial({ color: 5803568, specular: 1118481, shininess: 10 });
            w.addVisual(l, a);
        }
    };
    this._createGoal = function () {
        k = new CANNON.Cylinder(POLE_RIGHT_LEFT_SIZE.radius_top, POLE_RIGHT_LEFT_SIZE.radius_bottom, POLE_RIGHT_LEFT_SIZE.height, POLE_RIGHT_LEFT_SIZE.segments);
        p = new CANNON.Body({ mass: 0 });
        m = new CANNON.Cylinder(POLE_UP_SIZE.radius_top, POLE_UP_SIZE.radius_bottom, POLE_UP_SIZE.height, POLE_UP_SIZE.segments);
        var a = new CANNON.Quaternion();
        a.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2);
        m.transformAllPoints(new CANNON.Vec3(), a);
        p.addShape(k, new CANNON.Vec3(0.5 * POLE_UP_SIZE.height, 0, 0));
        p.addShape(k, new CANNON.Vec3(0.5 * -POLE_UP_SIZE.height, 0, 0));
        p.addShape(m, new CANNON.Vec3(0, 0, 0.5 * POLE_RIGHT_LEFT_SIZE.height));
        p.position.set(BACK_WALL_GOAL_POSITION.x, BACK_WALL_GOAL_POSITION.y - UP_WALL_GOAL_SIZE.depth, BACK_WALL_GOAL_POSITION.z);
        p.addEventListener("collide", function (a) {
            s_oScenario.poleCollision();
        });
        g.addBody(p);
        SHOW_3D_RENDER && ((a = new THREE.MeshPhongMaterial({ color: 16777215, specular: 1118481, shininess: 50 })), w.addVisual(p, a));
    };
    this.createBackGoalWall = function () {
        n = new CANNON.Box(new CANNON.Vec3(BACK_WALL_GOAL_SIZE.width, BACK_WALL_GOAL_SIZE.depth, BACK_WALL_GOAL_SIZE.height));
        q = new CANNON.Box(new CANNON.Vec3(LEFT_RIGHT_WALL_GOAL_SIZE.width, LEFT_RIGHT_WALL_GOAL_SIZE.depth, LEFT_RIGHT_WALL_GOAL_SIZE.height));
        u = new CANNON.Box(new CANNON.Vec3(UP_WALL_GOAL_SIZE.width, UP_WALL_GOAL_SIZE.depth, UP_WALL_GOAL_SIZE.height));
        r = new CANNON.Body({ mass: 0, material: f });
        r.addShape(n);
        r.addShape(q, new CANNON.Vec3(BACK_WALL_GOAL_SIZE.width, 0, 0));
        r.addShape(q, new CANNON.Vec3(-BACK_WALL_GOAL_SIZE.width, 0, 0));
        r.addShape(u, new CANNON.Vec3(0, 0, BACK_WALL_GOAL_SIZE.height));
        r.position.set(BACK_WALL_GOAL_POSITION.x, BACK_WALL_GOAL_POSITION.y, BACK_WALL_GOAL_POSITION.z);
        g.addBody(r);
        SHOW_3D_RENDER && w.addVisual(r);
    };
    this.createAreaGoal = function (a, b, c, d) {
        b = new CANNON.Box(new CANNON.Vec3(b.width, b.depth, b.height));
        d = new CANNON.Body({ mass: 0, userData: d });
        d.addShape(b);
        d.position.set(a.x, a.y, a.z);
        d.collisionResponse = 0;
        d.addEventListener("collide", function (a) {
            s_oScenario.lineGoalCollision(a);
        });
        g.addBody(d);
        SHOW_3D_RENDER && ((a = new THREE.MeshPhongMaterial({ color: c, specular: 1118481, shininess: 70 })), w.addVisual(d, a));
        return d;
    };
    this._createBallBody = function () {
        a = new CANNON.Sphere(BALL_RADIUS);
        e = new CANNON.Body({ mass: BALL_MASS, material: d, linearDamping: BALL_LINEAR_DAMPING, angularDamping: 2 * BALL_LINEAR_DAMPING });
        var b = new CANNON.Vec3(POSITION_BALL.x, POSITION_BALL.y, POSITION_BALL.z);
        e.position.copy(b);
        e.addShape(a);
        g.add(e);
        SHOW_3D_RENDER && ((b = new THREE.MeshPhongMaterial({ color: 16777215, specular: 1118481, shininess: 70 })), (c = w.addVisual(e, b)));
    };
    this.addImpulse = function (a, b) {
        var c = new CANNON.Vec3(0, 0, BALL_RADIUS),
            d = new CANNON.Vec3(b.x, b.y, b.z);
        a.applyImpulse(d, c);
    };
    this.addForce = function (a, b) {
        var c = new CANNON.Vec3(0, 0, 0),
            d = new CANNON.Vec3(b.x, b.y, b.z);
        a.applyForce(d, c);
    };
    this.getBodyVelocity = function (a) {
        return a.velocity;
    };
    this.ballBody = function () {
        return e;
    };
    this.ballMesh = function () {
        return c;
    };
    this.getCamera = function () {
        return w.camera();
    };
    this.fieldCollision = function () {
        s_oGame.fieldCollision();
        s_oGame.ballFadeForReset();
    };
    this.setElementAngularVelocity = function (a, b) {
        a.angularVelocity.set(b.x, b.y, b.z);
    };
    this.setElementVelocity = function (a, b) {
        var c = new CANNON.Vec3(b.x, b.y, b.z);
        a.velocity = c;
    };
    this.setElementLinearDamping = function (a, b) {
        a.linearDamping = b;
    };
    this.getFieldBody = function () {
        return l;
    };
    this.lineGoalCollision = function (a) {
        s_oGame.areaGoal(a.contact.bj.userData);
    };
    this.update = function () {
        g.step(PHYSICS_STEP);
    };
    this.getGoalBody = function () {
        return p;
    };
    this.poleCollision = function () {
        s_oGame.poleCollide({ x: e.position.x, y: e.position.y, z: e.position.z });
    };
    this.destroyWorld = function () {
        for (var a = g.bodies, b = 0; b < a.length; b++) g.remove(a[b]);
        g = null;
    };
    s_oScenario = this;
    SHOW_3D_RENDER ? (w.addScene("Test", this._init), w.start()) : this._init();
}
var s_oScenario;
Detector = {
    canvas: !!window.CanvasRenderingContext2D,
    webgl: (function () {
        try {
            return !!window.WebGLRenderingContext && !!document.createElement("canvas").getContext("experimental-webgl");
        } catch (g) {
            return !1;
        }
    })(),
    workers: !!window.Worker,
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,
    getWebGLErrorMessage: function () {
        var g = document.createElement("div");
        g.id = "webgl-error-message";
        g.style.fontFamily = "monospace";
        g.style.fontSize = "13px";
        g.style.fontWeight = "normal";
        g.style.textAlign = "center";
        g.style.background = "#fff";
        g.style.color = "#000";
        g.style.padding = "1.5em";
        g.style.width = "400px";
        g.style.margin = "5em auto 0";
        this.webgl ||
            (g.innerHTML = window.WebGLRenderingContext
                ? 'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />\nFind out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
                : 'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>\nFind out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.');
        return g;
    },
    addGetWebGLMessage: function (g) {
        g = g || {};
        var b = void 0 !== g.parent ? g.parent : document.body;
        g = void 0 !== g.id ? g.id : "oldie";
        var d = Detector.getWebGLErrorMessage();
        d.id = g;
        b.appendChild(d);
    },
};
function TimeSeries(g) {
    g = g || {};
    g.resetBoundsInterval = g.resetBoundsInterval || 3e3;
    g.resetBounds = void 0 === g.resetBounds ? !0 : g.resetBounds;
    this.options = g;
    this.data = [];
    this.label = g.label || "";
    this.maxDataLength = g.maxDataLength || 1e3;
    this.dataPool = [];
    this.minValue = this.maxValue = Number.NaN;
    g.resetBounds &&
        (this.boundsTimer = setInterval(
            (function (b) {
                return function () {
                    b.resetBounds();
                };
            })(this),
            g.resetBoundsInterval
        ));
}
TimeSeries.prototype.resetBounds = function () {
    this.minValue = this.maxValue = Number.NaN;
    for (var g = 0; g < this.data.length; g++)
        (this.maxValue = isNaN(this.maxValue) ? this.data[g][1] : Math.max(this.maxValue, this.data[g][1])), (this.minValue = isNaN(this.minValue) ? this.data[g][1] : Math.min(this.minValue, this.data[g][1]));
};
TimeSeries.prototype.append = function (g, b) {
    this.lastTimeStamp = g;
    var d = this.dataPool.length ? this.dataPool.pop() : [g, b];
    d[0] = g;
    d[1] = b;
    this.data.push(d);
    this.maxValue = isNaN(this.maxValue) ? b : Math.max(this.maxValue, b);
    for (this.minValue = isNaN(this.minValue) ? b : Math.min(this.minValue, b); this.data.length > this.maxDataLength; ) this.dataPool.push(this.data.shift());
};
function SmoothieChart(g) {
    g = g || {};
    g.grid = g.grid || { fillStyle: "#000000", strokeStyle: "#777777", lineWidth: 1, millisPerLine: 1e3, verticalSections: 2 };
    g.millisPerPixel = g.millisPerPixel || 20;
    g.fps = g.fps || 50;
    g.maxValueScale = g.maxValueScale || 1;
    g.minValue = g.minValue;
    g.maxValue = g.maxValue;
    g.labels = g.labels || { fillStyle: "#ffffff" };
    g.interpolation = g.interpolation || "bezier";
    g.scaleSmoothing = g.scaleSmoothing || 0.125;
    g.maxDataSetLength = g.maxDataSetLength || 2;
    g.timestampFormatter = g.timestampFormatter || null;
    this.options = g;
    this.seriesSet = [];
    this.currentValueRange = 1;
    this.currentVisMinValue = 0;
}
SmoothieChart.prototype.addTimeSeries = function (g, b) {
    this.seriesSet.push({ timeSeries: g, options: b || {} });
};
SmoothieChart.prototype.removeTimeSeries = function (g) {
    this.seriesSet.splice(this.seriesSet.indexOf(g), 1);
};
SmoothieChart.prototype.streamTo = function (g, b) {
    var d = this;
    this.render_on_tick = function () {
        d.render(g, d.seriesSet[0].timeSeries.lastTimeStamp);
    };
    this.start();
};
SmoothieChart.prototype.start = function () {
    this.timer || (this.timer = setInterval(this.render_on_tick, 1e3 / this.options.fps));
};
SmoothieChart.prototype.stop = function () {
    this.timer && (clearInterval(this.timer), (this.timer = void 0));
};
SmoothieChart.timeFormatter = function (g) {
    function b(b) {
        return (10 > b ? "0" : "") + b;
    }
    return b(g.getHours()) + ":" + b(g.getMinutes()) + ":" + b(g.getSeconds());
};
SmoothieChart.prototype.render = function (g, b) {
    var d = g.getContext("2d"),
        f = this.options,
        a = g.clientWidth,
        e = g.clientHeight;
    d.save();
    b -= b % f.millisPerPixel;
    d.translate(0, 0);
    d.beginPath();
    d.rect(0, 0, a, e);
    d.clip();
    d.save();
    d.fillStyle = f.grid.fillStyle;
    d.clearRect(0, 0, a, e);
    d.fillRect(0, 0, a, e);
    d.restore();
    d.save();
    d.lineWidth = f.grid.lineWidth || 1;
    d.strokeStyle = f.grid.strokeStyle || "#ffffff";
    if (0 < f.grid.millisPerLine)
        for (var c = b - (b % f.grid.millisPerLine); c >= b - a * f.millisPerPixel; c -= f.grid.millisPerLine) {
            d.beginPath();
            var h = Math.round(a - (b - c) / f.millisPerPixel);
            d.moveTo(h, 0);
            d.lineTo(h, e);
            d.stroke();
            if (f.timestampFormatter) {
                var l = f.timestampFormatter(new Date(c)),
                    k = d.measureText(l).width / 2 + d.measureText(x).width + 4;
                h < a - k && ((d.fillStyle = f.labels.fillStyle), d.fillText(l, h - d.measureText(l).width / 2, e - 2));
            }
            d.closePath();
        }
    for (x = 1; x < f.grid.verticalSections; x++) (c = Math.round((x * e) / f.grid.verticalSections)), d.beginPath(), d.moveTo(0, c), d.lineTo(a, c), d.stroke(), d.closePath();
    d.beginPath();
    d.strokeRect(0, 0, a, e);
    d.closePath();
    d.restore();
    x = h = Number.NaN;
    for (l = 0; l < this.seriesSet.length; l++) {
        var m = this.seriesSet[l].timeSeries;
        isNaN(m.maxValue) || (h = isNaN(h) ? m.maxValue : Math.max(h, m.maxValue));
        isNaN(m.minValue) || (x = isNaN(x) ? m.minValue : Math.min(x, m.minValue));
    }
    if (!isNaN(h) || !isNaN(x)) {
        h = null != f.maxValue ? f.maxValue : h * f.maxValueScale;
        null != f.minValue && (x = f.minValue);
        this.currentValueRange += f.scaleSmoothing * (h - x - this.currentValueRange);
        this.currentVisMinValue += f.scaleSmoothing * (x - this.currentVisMinValue);
        k = this.currentValueRange;
        var p = this.currentVisMinValue;
        for (l = 0; l < this.seriesSet.length; l++) {
            d.save();
            m = this.seriesSet[l].timeSeries;
            m = m.data;
            for (var n = this.seriesSet[l].options; m.length >= f.maxDataSetLength && m[1][0] < b - a * f.millisPerPixel; ) m.splice(0, 1);
            d.lineWidth = n.lineWidth || 1;
            d.fillStyle = n.fillStyle;
            d.strokeStyle = n.strokeStyle || "#ffffff";
            d.beginPath();
            var q = 0,
                u = 0,
                r = 0;
            for (c = 0; c < m.length; c++) {
                var w = Math.round(a - (b - m[c][0]) / f.millisPerPixel),
                    v = m[c][1] - p;
                v = Math.max(Math.min(e - (k ? Math.round((v / k) * e) : 0), e - 1), 1);
                if (0 == c) (q = w), d.moveTo(w, v);
                else
                    switch (f.interpolation) {
                        case "line":
                            d.lineTo(w, v);
                            break;
                        default:
                            d.bezierCurveTo(Math.round((u + w) / 2), r, Math.round(u + w) / 2, v, w, v);
                    }
                u = w;
                r = v;
            }
            0 < m.length && n.fillStyle && (d.lineTo(a + n.lineWidth + 1, r), d.lineTo(a + n.lineWidth + 1, e + n.lineWidth + 1), d.lineTo(q, e + n.lineWidth), d.fill());
            d.stroke();
            d.closePath();
            d.restore();
        }
        if (!f.labels.disabled) {
            f.labelOffsetY || (f.labelOffsetY = 0);
            d.fillStyle = f.labels.fillStyle;
            c = parseFloat(h).toFixed(2);
            var x = parseFloat(x).toFixed(2);
            d.fillText(c, a - d.measureText(c).width - 2, 10);
            d.fillText(x, a - d.measureText(x).width - 2, e - 2);
            for (c = 0; c < this.seriesSet.length; c++) (m = this.seriesSet[c].timeSeries), (a = m.label), (d.fillStyle = m.options.fillStyle || "rgb(255,255,255)"), a && d.fillText(a, 2, 10 * (c + 1) + f.labelOffsetY);
        }
    }
    d.restore();
};
var Stats = function () {
    var g = 0,
        b = 0,
        d = Date.now(),
        f = d,
        a = d,
        e = 0,
        c = 1e3,
        h = 0,
        l = [
            [16, 16, 48],
            [0, 255, 255],
        ],
        k = 0,
        m = 1e3,
        p = 0,
        n = [
            [16, 48, 16],
            [0, 255, 0],
        ];
    var q = document.createElement("div");
    q.style.cursor = "pointer";
    q.style.width = "80px";
    q.style.opacity = "0.9";
    q.style.zIndex = "10001";
    q.addEventListener(
        "mousedown",
        function (a) {
            a.preventDefault();
            g = (g + 1) % 2;
            0 == g ? ((u.style.display = "block"), (x.style.display = "none")) : ((u.style.display = "none"), (x.style.display = "block"));
        },
        !1
    );
    var u = document.createElement("div");
    u.style.textAlign = "left";
    u.style.lineHeight = "1.2em";
    u.style.backgroundColor = "rgb(" + Math.floor(l[0][0] / 2) + "," + Math.floor(l[0][1] / 2) + "," + Math.floor(l[0][2] / 2) + ")";
    u.style.padding = "0 0 3px 3px";
    q.appendChild(u);
    var r = document.createElement("div");
    r.style.fontFamily = "Helvetica, Arial, sans-serif";
    r.style.fontSize = "9px";
    r.style.color = "rgb(" + l[1][0] + "," + l[1][1] + "," + l[1][2] + ")";
    r.style.fontWeight = "bold";
    r.innerHTML = "FPS";
    u.appendChild(r);
    var w = document.createElement("div");
    w.style.position = "relative";
    w.style.width = "74px";
    w.style.height = "30px";
    w.style.backgroundColor = "rgb(" + l[1][0] + "," + l[1][1] + "," + l[1][2] + ")";
    for (u.appendChild(w); 74 > w.children.length; ) {
        var v = document.createElement("span");
        v.style.width = "1px";
        v.style.height = "30px";
        v.style.cssFloat = "left";
        v.style.backgroundColor = "rgb(" + l[0][0] + "," + l[0][1] + "," + l[0][2] + ")";
        w.appendChild(v);
    }
    var x = document.createElement("div");
    x.style.textAlign = "left";
    x.style.lineHeight = "1.2em";
    x.style.backgroundColor = "rgb(" + Math.floor(n[0][0] / 2) + "," + Math.floor(n[0][1] / 2) + "," + Math.floor(n[0][2] / 2) + ")";
    x.style.padding = "0 0 3px 3px";
    x.style.display = "none";
    q.appendChild(x);
    var y = document.createElement("div");
    y.style.fontFamily = "Helvetica, Arial, sans-serif";
    y.style.fontSize = "9px";
    y.style.color = "rgb(" + n[1][0] + "," + n[1][1] + "," + n[1][2] + ")";
    y.style.fontWeight = "bold";
    y.innerHTML = "MS";
    x.appendChild(y);
    var z = document.createElement("div");
    z.style.position = "relative";
    z.style.width = "74px";
    z.style.height = "30px";
    z.style.backgroundColor = "rgb(" + n[1][0] + "," + n[1][1] + "," + n[1][2] + ")";
    for (x.appendChild(z); 74 > z.children.length; )
        (v = document.createElement("span")),
            (v.style.width = "1px"),
            (v.style.height = 30 * Math.random() + "px"),
            (v.style.cssFloat = "left"),
            (v.style.backgroundColor = "rgb(" + n[0][0] + "," + n[0][1] + "," + n[0][2] + ")"),
            z.appendChild(v);
    return {
        domElement: q,
        update: function () {
            d = Date.now();
            k = d - f;
            m = Math.min(m, k);
            p = Math.max(p, k);
            y.textContent = k + " MS (" + m + "-" + p + ")";
            var g = Math.min(30, 30 - (k / 200) * 30);
            z.appendChild(z.firstChild).style.height = g + "px";
            f = d;
            b++;
            d > a + 1e3 &&
                ((e = Math.round((1e3 * b) / (d - a))),
                (c = Math.min(c, e)),
                (h = Math.max(h, e)),
                (r.textContent = e + " FPS (" + c + "-" + h + ")"),
                (g = Math.min(30, 30 - (e / 100) * 30)),
                (w.appendChild(w.firstChild).style.height = g + "px"),
                (a = d),
                (b = 0));
        },
    };
};
THREE.TrackballControls = function (g, b) {
    function d(a) {
        !1 !== c.enabled &&
            (window.removeEventListener("keydown", d), (m = k), k === h.NONE) &&
            (a.keyCode !== c.keys[h.ROTATE] || c.noRotate ? (a.keyCode !== c.keys[h.ZOOM] || c.noZoom ? a.keyCode !== c.keys[h.PAN] || c.noPan || (k = h.PAN) : (k = h.ZOOM)) : (k = h.ROTATE));
    }
    function f(a) {
        !1 !== c.enabled &&
            (a.preventDefault(), a.stopPropagation(), k !== h.ROTATE || c.noRotate ? (k !== h.ZOOM || c.noZoom ? k !== h.PAN || c.noPan || y.copy(F(a.pageX, a.pageY)) : r.copy(F(a.pageX, a.pageY))) : q.copy(L(a.pageX, a.pageY)));
    }
    function a(b) {
        !1 !== c.enabled && (b.preventDefault(), b.stopPropagation(), (k = h.NONE), document.removeEventListener("mousemove", f), document.removeEventListener("mouseup", a), c.dispatchEvent(A));
    }
    function e(a) {
        if (!1 !== c.enabled) {
            a.preventDefault();
            a.stopPropagation();
            var b = 0;
            a.wheelDelta ? (b = a.wheelDelta / 40) : a.detail && (b = -a.detail / 3);
            u.y += 0.01 * b;
            c.dispatchEvent(E);
            c.dispatchEvent(A);
        }
    }
    var c = this,
        h = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4 };
    this.object = g;
    this.domElement = void 0 !== b ? b : document;
    this.enabled = !0;
    this.screen = { left: 0, top: 0, width: 0, height: 0 };
    this.rotateSpeed = 1;
    this.zoomSpeed = 1.2;
    this.panSpeed = 0.3;
    this.staticMoving = this.noRoll = this.noPan = this.noZoom = this.noRotate = !1;
    this.dynamicDampingFactor = 0.2;
    this.minDistance = 0;
    this.maxDistance = Infinity;
    this.keys = [65, 83, 68];
    this.target = new THREE.Vector3();
    var l = new THREE.Vector3(),
        k = h.NONE,
        m = h.NONE,
        p = new THREE.Vector3(),
        n = new THREE.Vector3(),
        q = new THREE.Vector3(),
        u = new THREE.Vector2(),
        r = new THREE.Vector2(),
        w = 0,
        v = 0,
        x = new THREE.Vector2(),
        y = new THREE.Vector2();
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.up0 = this.object.up.clone();
    var z = { type: "change" },
        E = { type: "start" },
        A = { type: "end" };
    this.handleResize = function () {
        if (this.domElement === document) (this.screen.left = 0), (this.screen.top = 0), (this.screen.width = window.innerWidth), (this.screen.height = window.innerHeight);
        else {
            var a = this.domElement.getBoundingClientRect(),
                b = this.domElement.ownerDocument.documentElement;
            this.screen.left = a.left + window.pageXOffset - b.clientLeft;
            this.screen.top = a.top + window.pageYOffset - b.clientTop;
            this.screen.width = a.width;
            this.screen.height = a.height;
        }
    };
    this.handleEvent = function (a) {
        if ("function" == typeof this[a.type]) this[a.type](a);
    };
    var F = (function () {
            var a = new THREE.Vector2();
            return function (b, d) {
                a.set((b - c.screen.left) / c.screen.width, (d - c.screen.top) / c.screen.height);
                return a;
            };
        })(),
        L = (function () {
            var a = new THREE.Vector3(),
                b = new THREE.Vector3(),
                d = new THREE.Vector3();
            return function (e, f) {
                d.set((e - 0.5 * c.screen.width - c.screen.left) / (0.5 * c.screen.width), (0.5 * c.screen.height + c.screen.top - f) / (0.5 * c.screen.height), 0);
                var g = d.length();
                c.noRoll ? (d.z = g < Math.SQRT1_2 ? Math.sqrt(1 - g * g) : 0.5 / g) : 1 < g ? d.normalize() : (d.z = Math.sqrt(1 - g * g));
                p.copy(c.object.position).sub(c.target);
                a.copy(c.object.up).setLength(d.y);
                a.add(b.copy(c.object.up).cross(p).setLength(d.x));
                a.add(p.setLength(d.z));
                return a;
            };
        })();
    this.rotateCamera = (function () {
        var a = new THREE.Vector3(),
            b = new THREE.Quaternion();
        return function () {
            var d = Math.acos(n.dot(q) / n.length() / q.length());
            d &&
                (a.crossVectors(n, q).normalize(),
                (d *= c.rotateSpeed),
                b.setFromAxisAngle(a, -d),
                p.applyQuaternion(b),
                c.object.up.applyQuaternion(b),
                q.applyQuaternion(b),
                c.staticMoving ? n.copy(q) : (b.setFromAxisAngle(a, d * (c.dynamicDampingFactor - 1)), n.applyQuaternion(b)));
        };
    })();
    this.zoomCamera = function () {
        if (k === h.TOUCH_ZOOM_PAN) {
            var a = w / v;
            w = v;
            p.multiplyScalar(a);
        } else (a = 1 + (r.y - u.y) * c.zoomSpeed), 1 !== a && 0 < a && (p.multiplyScalar(a), c.staticMoving ? u.copy(r) : (u.y += (r.y - u.y) * this.dynamicDampingFactor));
    };
    this.panCamera = (function () {
        var a = new THREE.Vector2(),
            b = new THREE.Vector3(),
            d = new THREE.Vector3();
        return function () {
            a.copy(y).sub(x);
            a.lengthSq() &&
                (a.multiplyScalar(p.length() * c.panSpeed),
                d.copy(p).cross(c.object.up).setLength(a.x),
                d.add(b.copy(c.object.up).setLength(a.y)),
                c.object.position.add(d),
                c.target.add(d),
                c.staticMoving ? x.copy(y) : x.add(a.subVectors(y, x).multiplyScalar(c.dynamicDampingFactor)));
        };
    })();
    this.checkDistances = function () {
        (c.noZoom && c.noPan) ||
            (p.lengthSq() > c.maxDistance * c.maxDistance && c.object.position.addVectors(c.target, p.setLength(c.maxDistance)),
            p.lengthSq() < c.minDistance * c.minDistance && c.object.position.addVectors(c.target, p.setLength(c.minDistance)));
    };
    this.update = function () {
        p.subVectors(c.object.position, c.target);
        c.noRotate || c.rotateCamera();
        c.noZoom || c.zoomCamera();
        c.noPan || c.panCamera();
        c.object.position.addVectors(c.target, p);
        c.checkDistances();
        c.object.lookAt(c.target);
        1e-6 < l.distanceToSquared(c.object.position) && (c.dispatchEvent(z), l.copy(c.object.position));
    };
    this.reset = function () {
        m = k = h.NONE;
        c.target.copy(c.target0);
        c.object.position.copy(c.position0);
        c.object.up.copy(c.up0);
        p.subVectors(c.object.position, c.target);
        c.object.lookAt(c.target);
        c.dispatchEvent(z);
        l.copy(c.object.position);
    };
    this.domElement.addEventListener(
        "contextmenu",
        function (a) {
            a.preventDefault();
        },
        !1
    );
    this.domElement.addEventListener(
        "mousedown",
        function (b) {
            !1 !== c.enabled &&
                (b.preventDefault(),
                b.stopPropagation(),
                k === h.NONE && (k = b.button),
                k !== h.ROTATE || c.noRotate ? (k !== h.ZOOM || c.noZoom ? k !== h.PAN || c.noPan || (x.copy(F(b.pageX, b.pageY)), y.copy(x)) : (u.copy(F(b.pageX, b.pageY)), r.copy(u))) : (n.copy(L(b.pageX, b.pageY)), q.copy(n)),
                document.addEventListener("mousemove", f, !1),
                document.addEventListener("mouseup", a, !1),
                c.dispatchEvent(E));
        },
        !1
    );
    this.domElement.addEventListener("mousewheel", e, !1);
    this.domElement.addEventListener("DOMMouseScroll", e, !1);
    this.domElement.addEventListener(
        "touchstart",
        function (a) {
            if (!1 !== c.enabled) {
                switch (a.touches.length) {
                    case 1:
                        k = h.TOUCH_ROTATE;
                        n.copy(L(a.touches[0].pageX, a.touches[0].pageY));
                        q.copy(n);
                        break;
                    case 2:
                        k = h.TOUCH_ZOOM_PAN;
                        var b = a.touches[0].pageX - a.touches[1].pageX,
                            d = a.touches[0].pageY - a.touches[1].pageY;
                        v = w = Math.sqrt(b * b + d * d);
                        x.copy(F((a.touches[0].pageX + a.touches[1].pageX) / 2, (a.touches[0].pageY + a.touches[1].pageY) / 2));
                        y.copy(x);
                        break;
                    default:
                        k = h.NONE;
                }
                c.dispatchEvent(E);
            }
        },
        !1
    );
    this.domElement.addEventListener(
        "touchend",
        function (a) {
            if (!1 !== c.enabled) {
                switch (a.touches.length) {
                    case 1:
                        q.copy(L(a.touches[0].pageX, a.touches[0].pageY));
                        n.copy(q);
                        break;
                    case 2:
                        (w = v = 0), y.copy(F((a.touches[0].pageX + a.touches[1].pageX) / 2, (a.touches[0].pageY + a.touches[1].pageY) / 2)), x.copy(y);
                }
                k = h.NONE;
                c.dispatchEvent(A);
            }
        },
        !1
    );
    this.domElement.addEventListener(
        "touchmove",
        function (a) {
            if (!1 !== c.enabled)
                switch ((a.preventDefault(), a.stopPropagation(), a.touches.length)) {
                    case 1:
                        q.copy(L(a.touches[0].pageX, a.touches[0].pageY));
                        break;
                    case 2:
                        var b = a.touches[0].pageX - a.touches[1].pageX,
                            d = a.touches[0].pageY - a.touches[1].pageY;
                        v = Math.sqrt(b * b + d * d);
                        y.copy(F((a.touches[0].pageX + a.touches[1].pageX) / 2, (a.touches[0].pageY + a.touches[1].pageY) / 2));
                        break;
                    default:
                        k = h.NONE;
                }
        },
        !1
    );
    window.addEventListener("keydown", d, !1);
    window.addEventListener(
        "keyup",
        function (a) {
            !1 !== c.enabled && ((k = m), window.addEventListener("keydown", d, !1));
        },
        !1
    );
    this.handleResize();
    this.update();
};
THREE.TrackballControls.prototype = Object.create(THREE.EventDispatcher.prototype);
var dat = dat || {};
dat.gui = dat.gui || {};
dat.utils = dat.utils || {};
dat.controllers = dat.controllers || {};
dat.dom = dat.dom || {};
dat.color = dat.color || {};
dat.utils.css = (function () {
    return {
        load: function (g, b) {
            b = b || document;
            var d = b.createElement("link");
            d.type = "text/css";
            d.rel = "stylesheet";
            d.href = g;
            b.getElementsByTagName("head")[0].appendChild(d);
        },
        inject: function (g, b) {
            b = b || document;
            var d = document.createElement("style");
            d.type = "text/css";
            d.innerHTML = g;
            b.getElementsByTagName("head")[0].appendChild(d);
        },
    };
})();
dat.utils.common = (function () {
    var g = Array.prototype.forEach,
        b = Array.prototype.slice;
    return {
        BREAK: {},
        extend: function (d) {
            this.each(
                b.call(arguments, 1),
                function (b) {
                    for (var a in b) this.isUndefined(b[a]) || (d[a] = b[a]);
                },
                this
            );
            return d;
        },
        defaults: function (d) {
            this.each(
                b.call(arguments, 1),
                function (b) {
                    for (var a in b) this.isUndefined(d[a]) && (d[a] = b[a]);
                },
                this
            );
            return d;
        },
        compose: function () {
            var d = b.call(arguments);
            return function () {
                for (var f = b.call(arguments), a = d.length - 1; 0 <= a; a--) f = [d[a].apply(this, f)];
                return f[0];
            };
        },
        each: function (b, f, a) {
            if (g && b.forEach === g) b.forEach(f, a);
            else if (b.length === b.length + 0) for (var d = 0, c = b.length; d < c && !(d in b && f.call(a, b[d], d) === this.BREAK); d++);
            else for (d in b) if (f.call(a, b[d], d) === this.BREAK) break;
        },
        defer: function (b) {
            setTimeout(b, 0);
        },
        toArray: function (d) {
            return d.toArray ? d.toArray() : b.call(d);
        },
        isUndefined: function (b) {
            return void 0 === b;
        },
        isNull: function (b) {
            return null === b;
        },
        isNaN: function (b) {
            return b !== b;
        },
        isArray:
            Array.isArray ||
            function (b) {
                return b.constructor === Array;
            },
        isObject: function (b) {
            return b === Object(b);
        },
        isNumber: function (b) {
            return b === b + 0;
        },
        isString: function (b) {
            return b === b + "";
        },
        isBoolean: function (b) {
            return !1 === b || !0 === b;
        },
        isFunction: function (b) {
            return "[object Function]" === Object.prototype.toString.call(b);
        },
    };
})();
dat.controllers.Controller = (function (g) {
    var b = function (b, f) {
        this.initialValue = b[f];
        this.domElement = document.createElement("div");
        this.object = b;
        this.property = f;
        this.__onFinishChange = this.__onChange = void 0;
    };
    g.extend(b.prototype, {
        onChange: function (b) {
            this.__onChange = b;
            return this;
        },
        onFinishChange: function (b) {
            this.__onFinishChange = b;
            return this;
        },
        setValue: function (b) {
            this.object[this.property] = b;
            this.__onChange && this.__onChange.call(this, b);
            this.updateDisplay();
            return this;
        },
        getValue: function () {
            return this.object[this.property];
        },
        updateDisplay: function () {
            return this;
        },
        isModified: function () {
            return this.initialValue !== this.getValue();
        },
    });
    return b;
})(dat.utils.common);
dat.dom.dom = (function (g) {
    function b(a) {
        if ("0" === a || g.isUndefined(a)) return 0;
        a = a.match(f);
        return g.isNull(a) ? 0 : parseFloat(a[1]);
    }
    var d = {};
    g.each({ HTMLEvents: ["change"], MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"], KeyboardEvents: ["keydown"] }, function (a, b) {
        g.each(a, function (a) {
            d[a] = b;
        });
    });
    var f = /(\d+(\.\d+)?)px/,
        a = {
            makeSelectable: function (a, b) {
                void 0 !== a &&
                    void 0 !== a.style &&
                    ((a.onselectstart = b
                        ? function () {
                              return !1;
                          }
                        : function () {}),
                    (a.style.MozUserSelect = b ? "auto" : "none"),
                    (a.style.KhtmlUserSelect = b ? "auto" : "none"),
                    (a.unselectable = b ? "on" : "off"));
            },
            makeFullscreen: function (a, b, d) {
                g.isUndefined(b) && (b = !0);
                g.isUndefined(d) && (d = !0);
                a.style.position = "absolute";
                b && ((a.style.left = 0), (a.style.right = 0));
                d && ((a.style.top = 0), (a.style.bottom = 0));
            },
            fakeEvent: function (a, b, f, l) {
                f = f || {};
                var c = d[b];
                if (!c) throw Error("Event type " + b + " not supported.");
                var e = document.createEvent(c);
                switch (c) {
                    case "MouseEvents":
                        e.initMouseEvent(b, f.bubbles || !1, f.cancelable || !0, window, f.clickCount || 1, 0, 0, f.x || f.clientX || 0, f.y || f.clientY || 0, !1, !1, !1, !1, 0, null);
                        break;
                    case "KeyboardEvents":
                        c = e.initKeyboardEvent || e.initKeyEvent;
                        g.defaults(f, { cancelable: !0, ctrlKey: !1, altKey: !1, shiftKey: !1, metaKey: !1, keyCode: void 0, charCode: void 0 });
                        c(b, f.bubbles || !1, f.cancelable, window, f.ctrlKey, f.altKey, f.shiftKey, f.metaKey, f.keyCode, f.charCode);
                        break;
                    default:
                        e.initEvent(b, f.bubbles || !1, f.cancelable || !0);
                }
                g.defaults(e, l);
                a.dispatchEvent(e);
            },
            bind: function (b, c, d, f) {
                b.addEventListener ? b.addEventListener(c, d, f || !1) : b.attachEvent && b.attachEvent("on" + c, d);
                return a;
            },
            unbind: function (b, c, d, f) {
                b.removeEventListener ? b.removeEventListener(c, d, f || !1) : b.detachEvent && b.detachEvent("on" + c, d);
                return a;
            },
            addClass: function (b, c) {
                if (void 0 === b.className) b.className = c;
                else if (b.className !== c) {
                    var d = b.className.split(/ +/);
                    -1 == d.indexOf(c) && (d.push(c), (b.className = d.join(" ").replace(/^\s+/, "").replace(/\s+$/, "")));
                }
                return a;
            },
            removeClass: function (b, c) {
                if (c) {
                    if (void 0 !== b.className)
                        if (b.className === c) b.removeAttribute("class");
                        else {
                            var d = b.className.split(/ +/),
                                e = d.indexOf(c);
                            -1 != e && (d.splice(e, 1), (b.className = d.join(" ")));
                        }
                } else b.className = void 0;
                return a;
            },
            hasClass: function (a, b) {
                return new RegExp("(?:^|\\s+)" + b + "(?:\\s+|$)").test(a.className) || !1;
            },
            getWidth: function (a) {
                a = getComputedStyle(a);
                return b(a["border-left-width"]) + b(a["border-right-width"]) + b(a["padding-left"]) + b(a["padding-right"]) + b(a.width);
            },
            getHeight: function (a) {
                a = getComputedStyle(a);
                return b(a["border-top-width"]) + b(a["border-bottom-width"]) + b(a["padding-top"]) + b(a["padding-bottom"]) + b(a.height);
            },
            getOffset: function (a) {
                var b = { left: 0, top: 0 };
                if (a.offsetParent) {
                    do (b.left += a.offsetLeft), (b.top += a.offsetTop);
                    while ((a = a.offsetParent));
                }
                return b;
            },
            isActive: function (a) {
                return a === document.activeElement && (a.type || a.href);
            },
        };
    return a;
})(dat.utils.common);
dat.controllers.OptionController = (function (g, b, d) {
    var f = function (a, e, c) {
        f.superclass.call(this, a, e);
        var g = this;
        this.__select = document.createElement("select");
        if (d.isArray(c)) {
            var l = {};
            d.each(c, function (a) {
                l[a] = a;
            });
            c = l;
        }
        d.each(c, function (a, b) {
            var c = document.createElement("option");
            c.innerHTML = b;
            c.setAttribute("value", a);
            g.__select.appendChild(c);
        });
        this.updateDisplay();
        b.bind(this.__select, "change", function () {
            g.setValue(this.options[this.selectedIndex].value);
        });
        this.domElement.appendChild(this.__select);
    };
    f.superclass = g;
    d.extend(f.prototype, g.prototype, {
        setValue: function (a) {
            a = f.superclass.prototype.setValue.call(this, a);
            this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());
            return a;
        },
        updateDisplay: function () {
            this.__select.value = this.getValue();
            return f.superclass.prototype.updateDisplay.call(this);
        },
    });
    return f;
})(dat.controllers.Controller, dat.dom.dom, dat.utils.common);
dat.controllers.NumberController = (function (g, b) {
    var d = function (f, a, e) {
        d.superclass.call(this, f, a);
        e = e || {};
        this.__min = e.min;
        this.__max = e.max;
        this.__step = e.step;
        b.isUndefined(this.__step) ? (this.__impliedStep = 0 == this.initialValue ? 1 : Math.pow(10, Math.floor(Math.log(this.initialValue) / Math.LN10)) / 10) : (this.__impliedStep = this.__step);
        f = this.__impliedStep;
        f = f.toString();
        f = -1 < f.indexOf(".") ? f.length - f.indexOf(".") - 1 : 0;
        this.__precision = f;
    };
    d.superclass = g;
    b.extend(d.prototype, g.prototype, {
        setValue: function (b) {
            void 0 !== this.__min && b < this.__min ? (b = this.__min) : void 0 !== this.__max && b > this.__max && (b = this.__max);
            void 0 !== this.__step && 0 != b % this.__step && (b = Math.round(b / this.__step) * this.__step);
            return d.superclass.prototype.setValue.call(this, b);
        },
        min: function (b) {
            this.__min = b;
            return this;
        },
        max: function (b) {
            this.__max = b;
            return this;
        },
        step: function (b) {
            this.__step = b;
            return this;
        },
    });
    return d;
})(dat.controllers.Controller, dat.utils.common);
dat.controllers.NumberControllerBox = (function (g, b, d) {
    var f = function (a, e, c) {
        function g() {
            var a = parseFloat(m.__input.value);
            d.isNaN(a) || m.setValue(a);
        }
        function l(a) {
            var b = p - a.clientY;
            m.setValue(m.getValue() + b * m.__impliedStep);
            p = a.clientY;
        }
        function k() {
            b.unbind(window, "mousemove", l);
            b.unbind(window, "mouseup", k);
        }
        this.__truncationSuspended = !1;
        f.superclass.call(this, a, e, c);
        var m = this,
            p;
        this.__input = document.createElement("input");
        this.__input.setAttribute("type", "text");
        b.bind(this.__input, "change", g);
        b.bind(this.__input, "blur", function () {
            g();
            m.__onFinishChange && m.__onFinishChange.call(m, m.getValue());
        });
        b.bind(this.__input, "mousedown", function (a) {
            b.bind(window, "mousemove", l);
            b.bind(window, "mouseup", k);
            p = a.clientY;
        });
        b.bind(this.__input, "keydown", function (a) {
            13 === a.keyCode && ((m.__truncationSuspended = !0), this.blur(), (m.__truncationSuspended = !1));
        });
        this.updateDisplay();
        this.domElement.appendChild(this.__input);
    };
    f.superclass = g;
    d.extend(f.prototype, g.prototype, {
        updateDisplay: function () {
            var a = this.__input;
            if (this.__truncationSuspended) var b = this.getValue();
            else {
                b = this.getValue();
                var c = Math.pow(10, this.__precision);
                b = Math.round(b * c) / c;
            }
            a.value = b;
            return f.superclass.prototype.updateDisplay.call(this);
        },
    });
    return f;
})(dat.controllers.NumberController, dat.dom.dom, dat.utils.common);
dat.controllers.NumberControllerSlider = (function (g, b, d, f, a) {
    function e(a, b, c, d, e) {
        return d + ((a - b) / (c - b)) * (e - d);
    }
    var c = function (a, d, f, g, p) {
        function h(a) {
            a.preventDefault();
            var c = b.getOffset(l.__background),
                d = b.getWidth(l.__background);
            l.setValue(e(a.clientX, c.left, c.left + d, l.__min, l.__max));
            return !1;
        }
        function k() {
            b.unbind(window, "mousemove", h);
            b.unbind(window, "mouseup", k);
            l.__onFinishChange && l.__onFinishChange.call(l, l.getValue());
        }
        c.superclass.call(this, a, d, { min: f, max: g, step: p });
        var l = this;
        this.__background = document.createElement("div");
        this.__foreground = document.createElement("div");
        b.bind(this.__background, "mousedown", function (a) {
            b.bind(window, "mousemove", h);
            b.bind(window, "mouseup", k);
            h(a);
        });
        b.addClass(this.__background, "slider");
        b.addClass(this.__foreground, "slider-fg");
        this.updateDisplay();
        this.__background.appendChild(this.__foreground);
        this.domElement.appendChild(this.__background);
    };
    c.superclass = g;
    c.useDefaultStyles = function () {
        d.inject(a);
    };
    f.extend(c.prototype, g.prototype, {
        updateDisplay: function () {
            var a = (this.getValue() - this.__min) / (this.__max - this.__min);
            this.__foreground.style.width = 100 * a + "%";
            return c.superclass.prototype.updateDisplay.call(this);
        },
    });
    return c;
})(
    dat.controllers.NumberController,
    dat.dom.dom,
    dat.utils.css,
    dat.utils.common,
    ".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}"
);
dat.controllers.FunctionController = (function (g, b, d) {
    var f = function (a, d, c) {
        f.superclass.call(this, a, d);
        var e = this;
        this.__button = document.createElement("div");
        this.__button.innerHTML = void 0 === c ? "Fire" : c;
        b.bind(this.__button, "click", function (a) {
            a.preventDefault();
            e.fire();
            return !1;
        });
        b.addClass(this.__button, "button");
        this.domElement.appendChild(this.__button);
    };
    f.superclass = g;
    d.extend(f.prototype, g.prototype, {
        fire: function () {
            this.__onChange && this.__onChange.call(this);
            this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());
            this.getValue().call(this.object);
        },
    });
    return f;
})(dat.controllers.Controller, dat.dom.dom, dat.utils.common);
dat.controllers.BooleanController = (function (g, b, d) {
    var f = function (a, d) {
        f.superclass.call(this, a, d);
        var c = this;
        this.__prev = this.getValue();
        this.__checkbox = document.createElement("input");
        this.__checkbox.setAttribute("type", "checkbox");
        b.bind(
            this.__checkbox,
            "change",
            function () {
                c.setValue(!c.__prev);
            },
            !1
        );
        this.domElement.appendChild(this.__checkbox);
        this.updateDisplay();
    };
    f.superclass = g;
    d.extend(f.prototype, g.prototype, {
        setValue: function (a) {
            a = f.superclass.prototype.setValue.call(this, a);
            this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());
            this.__prev = this.getValue();
            return a;
        },
        updateDisplay: function () {
            !0 === this.getValue() ? (this.__checkbox.setAttribute("checked", "checked"), (this.__checkbox.checked = !0)) : (this.__checkbox.checked = !1);
            return f.superclass.prototype.updateDisplay.call(this);
        },
    });
    return f;
})(dat.controllers.Controller, dat.dom.dom, dat.utils.common);
dat.color.toString = (function (g) {
    return function (b) {
        if (1 == b.a || g.isUndefined(b.a)) {
            for (b = b.hex.toString(16); 6 > b.length; ) b = "0" + b;
            return "#" + b;
        }
        return "rgba(" + Math.round(b.r) + "," + Math.round(b.g) + "," + Math.round(b.b) + "," + b.a + ")";
    };
})(dat.utils.common);
dat.color.interpret = (function (g, b) {
    var d,
        f,
        a = [
            {
                litmus: b.isString,
                conversions: {
                    THREE_CHAR_HEX: {
                        read: function (a) {
                            a = a.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
                            return null === a ? !1 : { space: "HEX", hex: parseInt("0x" + a[1].toString() + a[1].toString() + a[2].toString() + a[2].toString() + a[3].toString() + a[3].toString()) };
                        },
                        write: g,
                    },
                    SIX_CHAR_HEX: {
                        read: function (a) {
                            a = a.match(/^#([A-F0-9]{6})$/i);
                            return null === a ? !1 : { space: "HEX", hex: parseInt("0x" + a[1].toString()) };
                        },
                        write: g,
                    },
                    CSS_RGB: {
                        read: function (a) {
                            a = a.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
                            return null === a ? !1 : { space: "RGB", r: parseFloat(a[1]), g: parseFloat(a[2]), b: parseFloat(a[3]) };
                        },
                        write: g,
                    },
                    CSS_RGBA: {
                        read: function (a) {
                            a = a.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
                            return null === a ? !1 : { space: "RGB", r: parseFloat(a[1]), g: parseFloat(a[2]), b: parseFloat(a[3]), a: parseFloat(a[4]) };
                        },
                        write: g,
                    },
                },
            },
            {
                litmus: b.isNumber,
                conversions: {
                    HEX: {
                        read: function (a) {
                            return { space: "HEX", hex: a, conversionName: "HEX" };
                        },
                        write: function (a) {
                            return a.hex;
                        },
                    },
                },
            },
            {
                litmus: b.isArray,
                conversions: {
                    RGB_ARRAY: {
                        read: function (a) {
                            return 3 != a.length ? !1 : { space: "RGB", r: a[0], g: a[1], b: a[2] };
                        },
                        write: function (a) {
                            return [a.r, a.g, a.b];
                        },
                    },
                    RGBA_ARRAY: {
                        read: function (a) {
                            return 4 != a.length ? !1 : { space: "RGB", r: a[0], g: a[1], b: a[2], a: a[3] };
                        },
                        write: function (a) {
                            return [a.r, a.g, a.b, a.a];
                        },
                    },
                },
            },
            {
                litmus: b.isObject,
                conversions: {
                    RGBA_OBJ: {
                        read: function (a) {
                            return b.isNumber(a.r) && b.isNumber(a.g) && b.isNumber(a.b) && b.isNumber(a.a) ? { space: "RGB", r: a.r, g: a.g, b: a.b, a: a.a } : !1;
                        },
                        write: function (a) {
                            return { r: a.r, g: a.g, b: a.b, a: a.a };
                        },
                    },
                    RGB_OBJ: {
                        read: function (a) {
                            return b.isNumber(a.r) && b.isNumber(a.g) && b.isNumber(a.b) ? { space: "RGB", r: a.r, g: a.g, b: a.b } : !1;
                        },
                        write: function (a) {
                            return { r: a.r, g: a.g, b: a.b };
                        },
                    },
                    HSVA_OBJ: {
                        read: function (a) {
                            return b.isNumber(a.h) && b.isNumber(a.s) && b.isNumber(a.v) && b.isNumber(a.a) ? { space: "HSV", h: a.h, s: a.s, v: a.v, a: a.a } : !1;
                        },
                        write: function (a) {
                            return { h: a.h, s: a.s, v: a.v, a: a.a };
                        },
                    },
                    HSV_OBJ: {
                        read: function (a) {
                            return b.isNumber(a.h) && b.isNumber(a.s) && b.isNumber(a.v) ? { space: "HSV", h: a.h, s: a.s, v: a.v } : !1;
                        },
                        write: function (a) {
                            return { h: a.h, s: a.s, v: a.v };
                        },
                    },
                },
            },
        ];
    return function () {
        f = !1;
        var e = 1 < arguments.length ? b.toArray(arguments) : arguments[0];
        b.each(a, function (a) {
            if (a.litmus(e))
                return (
                    b.each(a.conversions, function (a, c) {
                        d = a.read(e);
                        if (!1 === f && !1 !== d) return (f = d), (d.conversionName = c), (d.conversion = a), b.BREAK;
                    }),
                    b.BREAK
                );
        });
        return f;
    };
})(dat.color.toString, dat.utils.common);
dat.GUI = dat.gui.GUI = (function (g, b, d, f, a, e, c, h, l, k, m, p, n, q, u) {
    function r(b, c, d, e) {
        if (void 0 === c[d]) throw Error("Object " + c + ' has no property "' + d + '"');
        e.color ? (c = new m(c, d)) : ((c = [c, d].concat(e.factoryArgs)), (c = f.apply(b, c)));
        e.before instanceof a && (e.before = e.before.__li);
        x(b, c);
        q.addClass(c.domElement, "c");
        d = document.createElement("span");
        q.addClass(d, "property-name");
        d.innerHTML = c.property;
        var g = document.createElement("div");
        g.appendChild(d);
        g.appendChild(c.domElement);
        e = w(b, g, e.before);
        q.addClass(e, K.CLASS_CONTROLLER_ROW);
        q.addClass(e, typeof c.getValue());
        v(b, e, c);
        b.__controllers.push(c);
        return c;
    }
    function w(a, b, c) {
        var d = document.createElement("li");
        b && d.appendChild(b);
        c ? a.__ul.insertBefore(d, params.before) : a.__ul.appendChild(d);
        a.onResize();
        return d;
    }
    function v(a, b, d) {
        d.__li = b;
        d.__gui = a;
        u.extend(d, {
            options: function (b) {
                if (1 < arguments.length) return d.remove(), r(a, d.object, d.property, { before: d.__li.nextElementSibling, factoryArgs: [u.toArray(arguments)] });
                if (u.isArray(b) || u.isObject(b)) return d.remove(), r(a, d.object, d.property, { before: d.__li.nextElementSibling, factoryArgs: [b] });
            },
            name: function (a) {
                d.__li.firstElementChild.firstElementChild.innerHTML = a;
                return d;
            },
            listen: function () {
                d.__gui.listen(d);
                return d;
            },
            remove: function () {
                d.__gui.remove(d);
                return d;
            },
        });
        if (d instanceof l) {
            var f = new h(d.object, d.property, { min: d.__min, max: d.__max, step: d.__step });
            u.each(["updateDisplay", "onChange", "onFinishChange"], function (a) {
                var b = d[a],
                    c = f[a];
                d[a] = f[a] = function () {
                    var a = Array.prototype.slice.call(arguments);
                    b.apply(d, a);
                    return c.apply(f, a);
                };
            });
            q.addClass(b, "has-slider");
            d.domElement.insertBefore(f.domElement, d.domElement.firstElementChild);
        } else if (d instanceof h) {
            var g = function (b) {
                return u.isNumber(d.__min) && u.isNumber(d.__max) ? (d.remove(), r(a, d.object, d.property, { before: d.__li.nextElementSibling, factoryArgs: [d.__min, d.__max, d.__step] })) : b;
            };
            d.min = u.compose(g, d.min);
            d.max = u.compose(g, d.max);
        } else
            d instanceof e
                ? (q.bind(b, "click", function () {
                      q.fakeEvent(d.__checkbox, "click");
                  }),
                  q.bind(d.__checkbox, "click", function (a) {
                      a.stopPropagation();
                  }))
                : d instanceof c
                ? (q.bind(b, "click", function () {
                      q.fakeEvent(d.__button, "click");
                  }),
                  q.bind(b, "mouseover", function () {
                      q.addClass(d.__button, "hover");
                  }),
                  q.bind(b, "mouseout", function () {
                      q.removeClass(d.__button, "hover");
                  }))
                : d instanceof m &&
                  (q.addClass(b, "color"),
                  (d.updateDisplay = u.compose(function (a) {
                      b.style.borderLeftColor = d.__color.toString();
                      return a;
                  }, d.updateDisplay)),
                  d.updateDisplay());
        d.setValue = u.compose(function (b) {
            a.getRoot().__preset_select && d.isModified() && L(a.getRoot(), !0);
            return b;
        }, d.setValue);
    }
    function x(a, b) {
        var c = a.getRoot(),
            d = c.__rememberedObjects.indexOf(b.object);
        if (-1 != d) {
            var e = c.__rememberedObjectIndecesToControllers[d];
            void 0 === e && ((e = {}), (c.__rememberedObjectIndecesToControllers[d] = e));
            e[b.property] = b;
            if (c.load && c.load.remembered) {
                c = c.load.remembered;
                if (c[a.preset]) c = c[a.preset];
                else if (c.Default) c = c.Default;
                else return;
                c[d] && void 0 !== c[d][b.property] && ((d = c[d][b.property]), (b.initialValue = d), b.setValue(d));
            }
        }
    }
    function y(a) {
        var b = (a.__save_row = document.createElement("li"));
        q.addClass(a.domElement, "has-save");
        a.__ul.insertBefore(b, a.__ul.firstChild);
        q.addClass(b, "save-row");
        var c = document.createElement("span");
        c.innerHTML = "&nbsp;";
        q.addClass(c, "button gears");
        var d = document.createElement("span");
        d.innerHTML = "Save";
        q.addClass(d, "button");
        q.addClass(d, "save");
        var e = document.createElement("span");
        e.innerHTML = "New";
        q.addClass(e, "button");
        q.addClass(e, "save-as");
        var f = document.createElement("span");
        f.innerHTML = "Revert";
        q.addClass(f, "button");
        q.addClass(f, "revert");
        var g = (a.__preset_select = document.createElement("select"));
        a.load && a.load.remembered
            ? u.each(a.load.remembered, function (b, c) {
                  F(a, c, c == a.preset);
              })
            : F(a, "Default", !1);
        q.bind(g, "change", function () {
            for (var b = 0; b < a.__preset_select.length; b++) a.__preset_select[b].innerHTML = a.__preset_select[b].value;
            a.preset = this.value;
        });
        b.appendChild(g);
        b.appendChild(c);
        b.appendChild(d);
        b.appendChild(e);
        b.appendChild(f);
        if (P) {
            var h = function () {
                k.style.display = a.useLocalStorage ? "block" : "none";
            };
            b = document.getElementById("dg-save-locally");
            var k = document.getElementById("dg-local-explain");
            b.style.display = "block";
            b = document.getElementById("dg-local-storage");
            "true" === localStorage.getItem(document.location.href + ".isLocal") && b.setAttribute("checked", "checked");
            h();
            q.bind(b, "change", function () {
                a.useLocalStorage = !a.useLocalStorage;
                h();
            });
        }
        var l = document.getElementById("dg-new-constructor");
        q.bind(l, "keydown", function (a) {
            !a.metaKey || (67 !== a.which && 67 != a.keyCode) || R.hide();
        });
        q.bind(c, "click", function () {
            l.innerHTML = JSON.stringify(a.getSaveObject(), void 0, 2);
            R.show();
            l.focus();
            l.select();
        });
        q.bind(d, "click", function () {
            a.save();
        });
        q.bind(e, "click", function () {
            var b = prompt("Enter a new preset name.");
            b && a.saveAs(b);
        });
        q.bind(f, "click", function () {
            a.revert();
        });
    }
    function z(a) {
        function b(b) {
            b.preventDefault();
            e = b.clientX;
            q.addClass(a.__closeButton, K.CLASS_DRAG);
            q.bind(window, "mousemove", c);
            q.bind(window, "mouseup", d);
            return !1;
        }
        function c(b) {
            b.preventDefault();
            a.width += e - b.clientX;
            a.onResize();
            e = b.clientX;
            return !1;
        }
        function d() {
            q.removeClass(a.__closeButton, K.CLASS_DRAG);
            q.unbind(window, "mousemove", c);
            q.unbind(window, "mouseup", d);
        }
        a.__resize_handle = document.createElement("div");
        u.extend(a.__resize_handle.style, { width: "6px", marginLeft: "-3px", height: "200px", cursor: "ew-resize", position: "absolute" });
        var e;
        q.bind(a.__resize_handle, "mousedown", b);
        q.bind(a.__closeButton, "mousedown", b);
        a.domElement.insertBefore(a.__resize_handle, a.domElement.firstElementChild);
    }
    function E(a, b) {
        a.domElement.style.width = b + "px";
        a.__save_row && a.autoPlace && (a.__save_row.style.width = b + "px");
        a.__closeButton && (a.__closeButton.style.width = b + "px");
    }
    function A(a, b) {
        var c = {};
        u.each(a.__rememberedObjects, function (d, e) {
            var f = {};
            u.each(a.__rememberedObjectIndecesToControllers[e], function (a, c) {
                f[c] = b ? a.initialValue : a.getValue();
            });
            c[e] = f;
        });
        return c;
    }
    function F(a, b, c) {
        var d = document.createElement("option");
        d.innerHTML = b;
        d.value = b;
        a.__preset_select.appendChild(d);
        c && (a.__preset_select.selectedIndex = a.__preset_select.length - 1);
    }
    function L(a, b) {
        var c = a.__preset_select[a.__preset_select.selectedIndex];
        c.innerHTML = b ? c.value + "*" : c.value;
    }
    function H(a) {
        0 != a.length &&
            p(function () {
                H(a);
            });
        u.each(a, function (a) {
            a.updateDisplay();
        });
    }
    g.inject(d);
    try {
        var P = "localStorage" in window && null !== window.localStorage;
    } catch (C) {
        P = !1;
    }
    var R,
        M = !0,
        N,
        J = !1,
        O = [],
        K = function (a) {
            function b() {
                localStorage.setItem(document.location.href + ".gui", JSON.stringify(d.getSaveObject()));
            }
            function c() {
                var a = d.getRoot();
                a.width += 1;
                u.defer(function () {
                    --a.width;
                });
            }
            var d = this;
            this.domElement = document.createElement("div");
            this.__ul = document.createElement("ul");
            this.domElement.appendChild(this.__ul);
            q.addClass(this.domElement, "dg");
            this.__folders = {};
            this.__controllers = [];
            this.__rememberedObjects = [];
            this.__rememberedObjectIndecesToControllers = [];
            this.__listening = [];
            a = a || {};
            a = u.defaults(a, { autoPlace: !0, width: K.DEFAULT_WIDTH });
            a = u.defaults(a, { resizable: a.autoPlace, hideable: a.autoPlace });
            u.isUndefined(a.load) ? (a.load = { preset: "Default" }) : a.preset && (a.load.preset = a.preset);
            u.isUndefined(a.parent) && a.hideable && O.push(this);
            a.resizable = u.isUndefined(a.parent) && a.resizable;
            a.autoPlace && u.isUndefined(a.scrollable) && (a.scrollable = !0);
            var e = P && "true" === localStorage.getItem(document.location.href + ".isLocal");
            Object.defineProperties(this, {
                parent: {
                    get: function () {
                        return a.parent;
                    },
                },
                scrollable: {
                    get: function () {
                        return a.scrollable;
                    },
                },
                autoPlace: {
                    get: function () {
                        return a.autoPlace;
                    },
                },
                preset: {
                    get: function () {
                        return d.parent ? d.getRoot().preset : a.load.preset;
                    },
                    set: function (b) {
                        d.parent ? (d.getRoot().preset = b) : (a.load.preset = b);
                        for (b = 0; b < this.__preset_select.length; b++) this.__preset_select[b].value == this.preset && (this.__preset_select.selectedIndex = b);
                        d.revert();
                    },
                },
                width: {
                    get: function () {
                        return a.width;
                    },
                    set: function (b) {
                        a.width = b;
                        E(d, b);
                    },
                },
                name: {
                    get: function () {
                        return a.name;
                    },
                    set: function (b) {
                        a.name = b;
                        g && (g.innerHTML = a.name);
                    },
                },
                closed: {
                    get: function () {
                        return a.closed;
                    },
                    set: function (b) {
                        a.closed = b;
                        a.closed ? q.addClass(d.__ul, K.CLASS_CLOSED) : q.removeClass(d.__ul, K.CLASS_CLOSED);
                        this.onResize();
                        d.__closeButton && (d.__closeButton.innerHTML = b ? K.TEXT_OPEN : K.TEXT_CLOSED);
                    },
                },
                load: {
                    get: function () {
                        return a.load;
                    },
                },
                useLocalStorage: {
                    get: function () {
                        return e;
                    },
                    set: function (a) {
                        P && ((e = a) ? q.bind(window, "unload", b) : q.unbind(window, "unload", b), localStorage.setItem(document.location.href + ".isLocal", a));
                    },
                },
            });
            if (u.isUndefined(a.parent)) {
                a.closed = !1;
                q.addClass(this.domElement, K.CLASS_MAIN);
                q.makeSelectable(this.domElement, !1);
                if (P && e) {
                    d.useLocalStorage = !0;
                    var f = localStorage.getItem(document.location.href + ".gui");
                    f && (a.load = JSON.parse(f));
                }
                this.__closeButton = document.createElement("div");
                this.__closeButton.innerHTML = K.TEXT_CLOSED;
                q.addClass(this.__closeButton, K.CLASS_CLOSE_BUTTON);
                this.domElement.appendChild(this.__closeButton);
                q.bind(this.__closeButton, "click", function () {
                    d.closed = !d.closed;
                });
            } else {
                void 0 === a.closed && (a.closed = !0);
                var g = document.createTextNode(a.name);
                q.addClass(g, "controller-name");
                f = w(d, g);
                q.addClass(this.__ul, K.CLASS_CLOSED);
                q.addClass(f, "title");
                q.bind(f, "click", function (a) {
                    a.preventDefault();
                    d.closed = !d.closed;
                    return !1;
                });
                a.closed || (this.closed = !1);
            }
            a.autoPlace &&
                (u.isUndefined(a.parent) &&
                    (M && ((N = document.createElement("div")), q.addClass(N, "dg"), q.addClass(N, K.CLASS_AUTO_PLACE_CONTAINER), document.body.appendChild(N), (M = !1)),
                    N.appendChild(this.domElement),
                    q.addClass(this.domElement, K.CLASS_AUTO_PLACE)),
                this.parent || E(d, a.width));
            q.bind(window, "resize", function () {
                d.onResize();
            });
            q.bind(this.__ul, "webkitTransitionEnd", function () {
                d.onResize();
            });
            q.bind(this.__ul, "transitionend", function () {
                d.onResize();
            });
            q.bind(this.__ul, "oTransitionEnd", function () {
                d.onResize();
            });
            this.onResize();
            a.resizable && z(this);
            d.getRoot();
            a.parent || c();
        };
    K.toggleHide = function () {
        J = !J;
        u.each(O, function (a) {
            a.domElement.style.zIndex = J ? -999 : 999;
            a.domElement.style.opacity = J ? 0 : 1;
        });
    };
    K.CLASS_AUTO_PLACE = "a";
    K.CLASS_AUTO_PLACE_CONTAINER = "ac";
    K.CLASS_MAIN = "main";
    K.CLASS_CONTROLLER_ROW = "cr";
    K.CLASS_TOO_TALL = "taller-than-window";
    K.CLASS_CLOSED = "closed";
    K.CLASS_CLOSE_BUTTON = "close-button";
    K.CLASS_DRAG = "drag";
    K.DEFAULT_WIDTH = 245;
    K.TEXT_CLOSED = "Close Controls";
    K.TEXT_OPEN = "Open Controls";
    q.bind(
        window,
        "keydown",
        function (a) {
            "text" === document.activeElement.type || (72 !== a.which && 72 != a.keyCode) || K.toggleHide();
        },
        !1
    );
    u.extend(K.prototype, {
        add: function (a, b) {
            return r(this, a, b, { factoryArgs: Array.prototype.slice.call(arguments, 2) });
        },
        addColor: function (a, b) {
            return r(this, a, b, { color: !0 });
        },
        remove: function (a) {
            this.__ul.removeChild(a.__li);
            this.__controllers.slice(this.__controllers.indexOf(a), 1);
            var b = this;
            u.defer(function () {
                b.onResize();
            });
        },
        destroy: function () {
            this.autoPlace && N.removeChild(this.domElement);
        },
        addFolder: function (a) {
            if (void 0 !== this.__folders[a]) throw Error('You already have a folder in this GUI by the name "' + a + '"');
            var b = { name: a, parent: this };
            b.autoPlace = this.autoPlace;
            this.load && this.load.folders && this.load.folders[a] && ((b.closed = this.load.folders[a].closed), (b.load = this.load.folders[a]));
            b = new K(b);
            this.__folders[a] = b;
            a = w(this, b.domElement);
            q.addClass(a, "folder");
            return b;
        },
        open: function () {
            this.closed = !1;
        },
        close: function () {
            this.closed = !0;
        },
        onResize: function () {
            var a = this.getRoot();
            if (a.scrollable) {
                var b = q.getOffset(a.__ul).top,
                    c = 0;
                u.each(a.__ul.childNodes, function (b) {
                    (a.autoPlace && b === a.__save_row) || (c += q.getHeight(b));
                });
                window.innerHeight - b - 20 < c ? (q.addClass(a.domElement, K.CLASS_TOO_TALL), (a.__ul.style.height = window.innerHeight - b - 20 + "px")) : (q.removeClass(a.domElement, K.CLASS_TOO_TALL), (a.__ul.style.height = "auto"));
            }
            a.__resize_handle &&
                u.defer(function () {
                    a.__resize_handle.style.height = a.__ul.offsetHeight + "px";
                });
            a.__closeButton && (a.__closeButton.style.width = a.width + "px");
        },
        remember: function () {
            u.isUndefined(R) && ((R = new n()), (R.domElement.innerHTML = b));
            if (this.parent) throw Error("You can only call remember on a top level GUI.");
            var a = this;
            u.each(Array.prototype.slice.call(arguments), function (b) {
                0 == a.__rememberedObjects.length && y(a);
                -1 == a.__rememberedObjects.indexOf(b) && a.__rememberedObjects.push(b);
            });
            this.autoPlace && E(this, this.width);
        },
        getRoot: function () {
            for (var a = this; a.parent; ) a = a.parent;
            return a;
        },
        getSaveObject: function () {
            var a = this.load;
            a.closed = this.closed;
            0 < this.__rememberedObjects.length && ((a.preset = this.preset), a.remembered || (a.remembered = {}), (a.remembered[this.preset] = A(this)));
            a.folders = {};
            u.each(this.__folders, function (b, c) {
                a.folders[c] = b.getSaveObject();
            });
            return a;
        },
        save: function () {
            this.load.remembered || (this.load.remembered = {});
            this.load.remembered[this.preset] = A(this);
            L(this, !1);
        },
        saveAs: function (a) {
            this.load.remembered || ((this.load.remembered = {}), (this.load.remembered.Default = A(this, !0)));
            this.load.remembered[a] = A(this);
            this.preset = a;
            F(this, a, !0);
        },
        revert: function (a) {
            u.each(
                this.__controllers,
                function (b) {
                    this.getRoot().load.remembered ? x(a || this.getRoot(), b) : b.setValue(b.initialValue);
                },
                this
            );
            u.each(this.__folders, function (a) {
                a.revert(a);
            });
            a || L(this.getRoot(), !1);
        },
        listen: function (a) {
            var b = 0 == this.__listening.length;
            this.__listening.push(a);
            b && H(this.__listening);
        },
    });
    return K;
})(
    dat.utils.css,
    '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>',
    ".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n",
    (dat.controllers.factory = (function (g, b, d, f, a, e, c) {
        return function (h, l, k, m) {
            var p = h[l];
            if (c.isArray(k) || c.isObject(k)) return new g(h, l, k);
            if (c.isNumber(p)) return c.isNumber(k) && c.isNumber(m) ? new d(h, l, k, m) : new b(h, l, { min: k, max: m });
            if (c.isString(p)) return new f(h, l);
            if (c.isFunction(p)) return new a(h, l, "");
            if (c.isBoolean(p)) return new e(h, l);
        };
    })(
        dat.controllers.OptionController,
        dat.controllers.NumberControllerBox,
        dat.controllers.NumberControllerSlider,
        (dat.controllers.StringController = (function (g, b, d) {
            var f = function (a, d) {
                function c() {
                    e.setValue(e.__input.value);
                }
                f.superclass.call(this, a, d);
                var e = this;
                this.__input = document.createElement("input");
                this.__input.setAttribute("type", "text");
                b.bind(this.__input, "keyup", c);
                b.bind(this.__input, "change", c);
                b.bind(this.__input, "blur", function () {
                    e.__onFinishChange && e.__onFinishChange.call(e, e.getValue());
                });
                b.bind(this.__input, "keydown", function (a) {
                    13 === a.keyCode && this.blur();
                });
                this.updateDisplay();
                this.domElement.appendChild(this.__input);
            };
            f.superclass = g;
            d.extend(f.prototype, g.prototype, {
                updateDisplay: function () {
                    b.isActive(this.__input) || (this.__input.value = this.getValue());
                    return f.superclass.prototype.updateDisplay.call(this);
                },
            });
            return f;
        })(dat.controllers.Controller, dat.dom.dom, dat.utils.common)),
        dat.controllers.FunctionController,
        dat.controllers.BooleanController,
        dat.utils.common
    )),
    dat.controllers.Controller,
    dat.controllers.BooleanController,
    dat.controllers.FunctionController,
    dat.controllers.NumberControllerBox,
    dat.controllers.NumberControllerSlider,
    dat.controllers.OptionController,
    (dat.controllers.ColorController = (function (g, b, d, f, a) {
        function e(b, c, d, e) {
            b.style.background = "";
            a.each(l, function (a) {
                b.style.cssText += "background: " + a + "linear-gradient(" + c + ", " + d + " 0%, " + e + " 100%); ";
            });
        }
        function c(a) {
            a.style.background = "";
            a.style.cssText += "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);";
            a.style.cssText += "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
            a.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
            a.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
            a.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
        }
        var h = function (g, l) {
            function k(a) {
                r(a);
                b.bind(window, "mousemove", r);
                b.bind(window, "mouseup", m);
            }
            function m() {
                b.unbind(window, "mousemove", r);
                b.unbind(window, "mouseup", m);
            }
            function q() {
                var a = f(this.value);
                !1 !== a ? ((v.__color.__state = a), v.setValue(v.__color.toOriginal())) : (this.value = v.__color.toString());
            }
            function u() {
                b.unbind(window, "mousemove", w);
                b.unbind(window, "mouseup", u);
            }
            function r(a) {
                a.preventDefault();
                var c = b.getWidth(v.__saturation_field),
                    d = b.getOffset(v.__saturation_field),
                    e = (a.clientX - d.left + document.body.scrollLeft) / c;
                a = 1 - (a.clientY - d.top + document.body.scrollTop) / c;
                1 < a ? (a = 1) : 0 > a && (a = 0);
                1 < e ? (e = 1) : 0 > e && (e = 0);
                v.__color.v = a;
                v.__color.s = e;
                v.setValue(v.__color.toOriginal());
                return !1;
            }
            function w(a) {
                a.preventDefault();
                var c = b.getHeight(v.__hue_field),
                    d = b.getOffset(v.__hue_field);
                a = 1 - (a.clientY - d.top + document.body.scrollTop) / c;
                1 < a ? (a = 1) : 0 > a && (a = 0);
                v.__color.h = 360 * a;
                v.setValue(v.__color.toOriginal());
                return !1;
            }
            h.superclass.call(this, g, l);
            this.__color = new d(this.getValue());
            this.__temp = new d(0);
            var v = this;
            this.domElement = document.createElement("div");
            b.makeSelectable(this.domElement, !1);
            this.__selector = document.createElement("div");
            this.__selector.className = "selector";
            this.__saturation_field = document.createElement("div");
            this.__saturation_field.className = "saturation-field";
            this.__field_knob = document.createElement("div");
            this.__field_knob.className = "field-knob";
            this.__field_knob_border = "2px solid ";
            this.__hue_knob = document.createElement("div");
            this.__hue_knob.className = "hue-knob";
            this.__hue_field = document.createElement("div");
            this.__hue_field.className = "hue-field";
            this.__input = document.createElement("input");
            this.__input.type = "text";
            this.__input_textShadow = "0 1px 1px ";
            b.bind(this.__input, "keydown", function (a) {
                13 === a.keyCode && q.call(this);
            });
            b.bind(this.__input, "blur", q);
            b.bind(this.__selector, "mousedown", function (a) {
                b.addClass(this, "drag").bind(window, "mouseup", function (a) {
                    b.removeClass(v.__selector, "drag");
                });
            });
            var x = document.createElement("div");
            a.extend(this.__selector.style, { width: "122px", height: "102px", padding: "3px", backgroundColor: "#222", boxShadow: "0px 1px 3px rgba(0,0,0,0.3)" });
            a.extend(this.__field_knob.style, {
                position: "absolute",
                width: "12px",
                height: "12px",
                border: this.__field_knob_border + (0.5 > this.__color.v ? "#fff" : "#000"),
                boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
                borderRadius: "12px",
                zIndex: 1,
            });
            a.extend(this.__hue_knob.style, { position: "absolute", width: "15px", height: "2px", borderRight: "4px solid #fff", zIndex: 1 });
            a.extend(this.__saturation_field.style, { width: "100px", height: "100px", border: "1px solid #555", marginRight: "3px", display: "inline-block", cursor: "pointer" });
            a.extend(x.style, { width: "100%", height: "100%", background: "none" });
            e(x, "top", "rgba(0,0,0,0)", "#000");
            a.extend(this.__hue_field.style, { width: "15px", height: "100px", display: "inline-block", border: "1px solid #555", cursor: "ns-resize" });
            c(this.__hue_field);
            a.extend(this.__input.style, { outline: "none", textAlign: "center", color: "#fff", border: 0, fontWeight: "bold", textShadow: this.__input_textShadow + "rgba(0,0,0,0.7)" });
            b.bind(this.__saturation_field, "mousedown", k);
            b.bind(this.__field_knob, "mousedown", k);
            b.bind(this.__hue_field, "mousedown", function (a) {
                w(a);
                b.bind(window, "mousemove", w);
                b.bind(window, "mouseup", u);
            });
            this.__saturation_field.appendChild(x);
            this.__selector.appendChild(this.__field_knob);
            this.__selector.appendChild(this.__saturation_field);
            this.__selector.appendChild(this.__hue_field);
            this.__hue_field.appendChild(this.__hue_knob);
            this.domElement.appendChild(this.__input);
            this.domElement.appendChild(this.__selector);
            this.updateDisplay();
        };
        h.superclass = g;
        a.extend(h.prototype, g.prototype, {
            updateDisplay: function () {
                var b = f(this.getValue());
                if (!1 !== b) {
                    var c = !1;
                    a.each(
                        d.COMPONENTS,
                        function (d) {
                            if (!a.isUndefined(b[d]) && !a.isUndefined(this.__color.__state[d]) && b[d] !== this.__color.__state[d]) return (c = !0), {};
                        },
                        this
                    );
                    c && a.extend(this.__color.__state, b);
                }
                a.extend(this.__temp.__state, this.__color.__state);
                this.__temp.a = 1;
                var g = 0.5 > this.__color.v || 0.5 < this.__color.s ? 255 : 0,
                    h = 255 - g;
                a.extend(this.__field_knob.style, {
                    marginLeft: 100 * this.__color.s - 7 + "px",
                    marginTop: 100 * (1 - this.__color.v) - 7 + "px",
                    backgroundColor: this.__temp.toString(),
                    border: this.__field_knob_border + "rgb(" + g + "," + g + "," + g + ")",
                });
                this.__hue_knob.style.marginTop = 100 * (1 - this.__color.h / 360) + "px";
                this.__temp.s = 1;
                this.__temp.v = 1;
                e(this.__saturation_field, "left", "#fff", this.__temp.toString());
                a.extend(this.__input.style, { backgroundColor: (this.__input.value = this.__color.toString()), color: "rgb(" + g + "," + g + "," + g + ")", textShadow: this.__input_textShadow + "rgba(" + h + "," + h + "," + h + ",.7)" });
            },
        });
        var l = ["-moz-", "-o-", "-webkit-", "-ms-", ""];
        return h;
    })(
        dat.controllers.Controller,
        dat.dom.dom,
        (dat.color.Color = (function (g, b, d, f) {
            function a(a, b, d) {
                Object.defineProperty(a, b, {
                    get: function () {
                        if ("RGB" === this.__state.space) return this.__state[b];
                        c(this, b, d);
                        return this.__state[b];
                    },
                    set: function (a) {
                        "RGB" !== this.__state.space && (c(this, b, d), (this.__state.space = "RGB"));
                        this.__state[b] = a;
                    },
                });
            }
            function e(a, b) {
                Object.defineProperty(a, b, {
                    get: function () {
                        if ("HSV" === this.__state.space) return this.__state[b];
                        h(this);
                        return this.__state[b];
                    },
                    set: function (a) {
                        "HSV" !== this.__state.space && (h(this), (this.__state.space = "HSV"));
                        this.__state[b] = a;
                    },
                });
            }
            function c(a, c, d) {
                if ("HEX" === a.__state.space) a.__state[c] = b.component_from_hex(a.__state.hex, d);
                else if ("HSV" === a.__state.space) f.extend(a.__state, b.hsv_to_rgb(a.__state.h, a.__state.s, a.__state.v));
                else throw "Corrupted color state";
            }
            function h(a) {
                var c = b.rgb_to_hsv(a.r, a.g, a.b);
                f.extend(a.__state, { s: c.s, v: c.v });
                f.isNaN(c.h) ? f.isUndefined(a.__state.h) && (a.__state.h = 0) : (a.__state.h = c.h);
            }
            var l = function () {
                this.__state = g.apply(this, arguments);
                if (!1 === this.__state) throw "Failed to interpret color arguments";
                this.__state.a = this.__state.a || 1;
            };
            l.COMPONENTS = "r g b h s v hex a".split(" ");
            f.extend(l.prototype, {
                toString: function () {
                    return d(this);
                },
                toOriginal: function () {
                    return this.__state.conversion.write(this);
                },
            });
            a(l.prototype, "r", 2);
            a(l.prototype, "g", 1);
            a(l.prototype, "b", 0);
            e(l.prototype, "h");
            e(l.prototype, "s");
            e(l.prototype, "v");
            Object.defineProperty(l.prototype, "a", {
                get: function () {
                    return this.__state.a;
                },
                set: function (a) {
                    this.__state.a = a;
                },
            });
            Object.defineProperty(l.prototype, "hex", {
                get: function () {
                    this.__state.hex = b.rgb_to_hex(this.r, this.g, this.b);
                    return this.__state.hex;
                },
                set: function (a) {
                    this.__state.space = "HEX";
                    this.__state.hex = a;
                },
            });
            return l;
        })(
            dat.color.interpret,
            (dat.color.math = (function () {
                var g;
                return {
                    hsv_to_rgb: function (b, d, f) {
                        var a = b / 60 - Math.floor(b / 60),
                            e = f * (1 - d),
                            c = f * (1 - a * d);
                        d = f * (1 - (1 - a) * d);
                        b = [
                            [f, d, e],
                            [c, f, e],
                            [e, f, d],
                            [e, c, f],
                            [d, e, f],
                            [f, e, c],
                        ][Math.floor(b / 60) % 6];
                        return { r: 255 * b[0], g: 255 * b[1], b: 255 * b[2] };
                    },
                    rgb_to_hsv: function (b, d, f) {
                        var a = Math.max(b, d, f),
                            e = a - Math.min(b, d, f);
                        if (0 == a) return { h: NaN, s: 0, v: 0 };
                        b = (b == a ? (d - f) / e : d == a ? 2 + (f - b) / e : 4 + (b - d) / e) / 6;
                        0 > b && (b += 1);
                        return { h: 360 * b, s: e / a, v: a / 255 };
                    },
                    rgb_to_hex: function (b, d, f) {
                        b = this.hex_with_component(0, 2, b);
                        b = this.hex_with_component(b, 1, d);
                        return (b = this.hex_with_component(b, 0, f));
                    },
                    component_from_hex: function (b, d) {
                        return (b >> (8 * d)) & 255;
                    },
                    hex_with_component: function (b, d, f) {
                        return (f << (g = 8 * d)) | (b & ~(255 << g));
                    },
                };
            })()),
            dat.color.toString,
            dat.utils.common
        )),
        dat.color.interpret,
        dat.utils.common
    )),
    (dat.utils.requestAnimationFrame = (function () {
        return (
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (g, b) {
                window.setTimeout(g, 1e3 / 60);
            }
        );
    })()),
    (dat.dom.CenteredDiv = (function (g, b) {
        var d = function () {
            this.backgroundElement = document.createElement("div");
            b.extend(this.backgroundElement.style, { backgroundColor: "rgba(0,0,0,0.8)", top: 0, left: 0, display: "none", zIndex: "1000", opacity: 0, WebkitTransition: "opacity 0.2s linear" });
            g.makeFullscreen(this.backgroundElement);
            this.backgroundElement.style.position = "fixed";
            this.domElement = document.createElement("div");
            b.extend(this.domElement.style, { position: "fixed", display: "none", zIndex: "1001", opacity: 0, WebkitTransition: "-webkit-transform 0.2s ease-out, opacity 0.2s linear" });
            document.body.appendChild(this.backgroundElement);
            document.body.appendChild(this.domElement);
            var d = this;
            g.bind(this.backgroundElement, "click", function () {
                d.hide();
            });
        };
        d.prototype.show = function () {
            var d = this;
            this.backgroundElement.style.display = "block";
            this.domElement.style.display = "block";
            this.domElement.style.opacity = 0;
            this.domElement.style.webkitTransform = "scale(1.1)";
            this.layout();
            b.defer(function () {
                d.backgroundElement.style.opacity = 1;
                d.domElement.style.opacity = 1;
                d.domElement.style.webkitTransform = "scale(1)";
            });
        };
        d.prototype.hide = function () {
            var b = this,
                a = function () {
                    b.domElement.style.display = "none";
                    b.backgroundElement.style.display = "none";
                    g.unbind(b.domElement, "webkitTransitionEnd", a);
                    g.unbind(b.domElement, "transitionend", a);
                    g.unbind(b.domElement, "oTransitionEnd", a);
                };
            g.bind(this.domElement, "webkitTransitionEnd", a);
            g.bind(this.domElement, "transitionend", a);
            g.bind(this.domElement, "oTransitionEnd", a);
            this.backgroundElement.style.opacity = 0;
            this.domElement.style.opacity = 0;
            this.domElement.style.webkitTransform = "scale(1.1)";
        };
        d.prototype.layout = function () {
            this.domElement.style.left = window.innerWidth / 2 - g.getWidth(this.domElement) / 2 + "px";
            this.domElement.style.top = window.innerHeight / 2 - g.getHeight(this.domElement) / 2 + "px";
        };
        return d;
    })(dat.dom.dom, dat.utils.common)),
    dat.dom.dom,
    dat.utils.common
);
function CWinPanel(g) {
    var b, d, f, a, e, c, h, l, k, m, p;
    this._init = function (g) {
        l = new createjs.Container();
        l.alpha = 0;
        l.visible = !1;
        var n = new createjs.Shape();
        n.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        n.alpha = 0.5;
        l.addChild(n);
        b = createBitmap(g);
        b.x = CANVAS_WIDTH_HALF;
        b.y = CANVAS_HEIGHT_HALF;
        b.regX = 0.5 * g.width;
        b.regY = 0.5 * g.height;
        l.addChild(b);
        d = new CCTLText(l, CANVAS_WIDTH / 2 - 270, CANVAS_HEIGHT_HALF - 160, 540, 80, 80, "center", TEXT_COLOR_STROKE, FONT_GAME, 1, 0, 0, " ", !0, !0, !0, !1);
        d.setOutline(5);
        f = new CCTLText(l, CANVAS_WIDTH / 2 - 270, CANVAS_HEIGHT_HALF - 160, 540, 80, 80, "center", TEXT_COLOR, FONT_GAME, 1, 0, 0, " ", !0, !0, !0, !1);
        a = new CCTLText(l, CANVAS_WIDTH / 2 - 270, CANVAS_HEIGHT_HALF - 50, 540, 50, 50, "center", TEXT_COLOR_STROKE, FONT_GAME, 1, 0, 0, " ", !0, !0, !0, !1);
        a.setOutline(4);
        e = new CCTLText(l, CANVAS_WIDTH / 2 - 270, CANVAS_HEIGHT_HALF - 50, 540, 50, 50, "center", TEXT_COLOR, FONT_GAME, 1, 0, 0, " ", !0, !0, !0, !1);
        c = new CCTLText(l, CANVAS_WIDTH / 2 - 200, CANVAS_HEIGHT_HALF + 50, 400, 50, 50, "center", TEXT_COLOR_STROKE, FONT_GAME, 1, 0, 0, " ", !0, !0, !0, !1);
        c.setOutline(4);
        h = new CCTLText(l, CANVAS_WIDTH / 2 - 200, CANVAS_HEIGHT_HALF + 50, 400, 50, 50, "center", TEXT_COLOR, FONT_GAME, 1, 0, 0, " ", !0, !0, !0, !1);
        g = s_oSpriteLibrary.getSprite("but_restart");
        m = new CGfxButton(0.5 * CANVAS_WIDTH + 250, 0.5 * CANVAS_HEIGHT + 120, g, l);
        m.pulseAnimation();
        m.addEventListener(ON_MOUSE_DOWN, this._onRestart, this);
        g = s_oSpriteLibrary.getSprite("but_home");
        k = new CGfxButton(0.5 * CANVAS_WIDTH - 250, 0.5 * CANVAS_HEIGHT + 120, g, l);
        k.addEventListener(ON_MOUSE_DOWN, this._onExit, this);
        p = new createjs.Container();
        l.addChild(p);
        l.on("click", function () {});
        s_oStage.addChild(l);
    };
    this.unload = function () {
        l.removeAllEventListeners();
        s_oStage.removeChild(l);
        k && (k.unload(), (k = null));
        m && (m.unload(), (m = null));
    };
    this.show = function (b) {
        d.refreshText(TEXT_GAMEOVER);
        f.refreshText(TEXT_GAMEOVER);
        a.refreshText(TEXT_SCORE + ": " + b);
        e.refreshText(TEXT_SCORE + ": " + b);
        c.refreshText(TEXT_BEST_SCORE + ": " + s_iBestScore);
        h.refreshText(TEXT_BEST_SCORE + ": " + s_iBestScore);
        l.visible = !0;
        createjs.Tween.get(l)
            .wait(MS_WAIT_SHOW_GAME_OVER_PANEL)
            .to({ alpha: 1 }, 1250, createjs.Ease.cubicOut)
            .call(function () {
                $(s_oMain).trigger("show_interlevel_ad");
            });
        $(s_oMain).trigger("save_score", b);
        $(s_oMain).trigger("share_event", b);
        console.log(b);
        fbScoreUpdater(b);

    };
    this._onContinue = function () {
        var a = this;
        createjs.Tween.get(l, { override: !0 })
            .to({ alpha: 0 }, 750, createjs.Ease.cubicOut)
            .call(function () {
                a.unload();
            });
        _oButContinue.block(!0);
        k.block(!0);
        s_oGame.onContinue();
    };
    this._onRestart = function () {
        m.block(!0);
        this.unload();
        s_oGame.restartGame();
    };
    this._onExit = function () {
        this.unload();
        s_oGame.onExit();
    };
    this._init(g);
    return this;
}
function CAreYouSurePanel(g) {
    var b, d, f, a, e;
    this._init = function () {
        a = new createjs.Container();
        a.alpha = 0;
        c.addChild(a);
        e = new createjs.Shape();
        e.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        e.alpha = 0.5;
        e.on("click", function () {});
        a.addChild(e);
        var g = s_oSpriteLibrary.getSprite("msg_box");
        b = createBitmap(g);
        b.x = CANVAS_WIDTH_HALF;
        b.y = CANVAS_HEIGHT_HALF;
        b.regX = 0.5 * g.width;
        b.regY = 0.5 * g.height;
        a.addChild(b);
        new CCTLText(a, CANVAS_WIDTH / 2 - 250, 508, 500, 200, 70, "center", TEXT_COLOR_STROKE, FONT_GAME, 1, 0, 0, TEXT_ARE_SURE, !0, !0, !0, !1).setOutline(4);
        new CCTLText(a, CANVAS_WIDTH / 2 - 250, 508, 500, 200, 70, "center", "#fff", FONT_GAME, 1, 0, 0, TEXT_ARE_SURE, !0, !0, !0, !1);
        d = new CGfxButton(CANVAS_WIDTH / 2 + 250, 0.5 * CANVAS_HEIGHT + 120, s_oSpriteLibrary.getSprite("but_yes"), a);
        d.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        f = new CGfxButton(CANVAS_WIDTH / 2 - 250, 0.5 * CANVAS_HEIGHT + 120, s_oSpriteLibrary.getSprite("but_no"), a);
        f.addEventListener(ON_MOUSE_UP, this._onButNo, this);
    };
    this.show = function () {
        createjs.Tween.get(a)
            .to({ alpha: 1 }, 150, createjs.Ease.quartOut)
            .call(function () {
                s_oGame.pause(!0);
            });
    };
    this.unload = function () {
        createjs.Tween.get(a)
            .to({ alpha: 0 }, 150, createjs.Ease.quartOut)
            .call(function () {
                c.removeChild(a, e);
            });
    };
    this._onButYes = function () {
        createjs.Ticker.paused = !1;
        this.unload();
        s_oGame.onExit();
        e.removeAllEventListeners();
    };
    this._onButNo = function () {
        s_oGame.pause(!1);
        this.unload();
        a.visible = !1;
        e.removeAllEventListeners();
    };
    var c = g;
    this._init();
}
function CCreditsPanel() {
    var g, b, d, f, a, e, c, h;
    this._init = function () {
        h = new createjs.Container();
        s_oStage.addChild(h);
        d = new createjs.Shape();
        b = d.on("click", function () {});
        d.alpha = 0;
        d.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        h.addChild(d);
        f = new createjs.Container();
        f.visible = !1;
        h.addChild(f);
        var l = s_oSpriteLibrary.getSprite("msg_box");
        c = createBitmap(l);
        c.regX = l.width / 2;
        c.regY = l.height / 2;
        f.addChild(c);
        g = c.on("click", this._onLogoButRelease);
        f.x = CANVAS_WIDTH / 2;
        f.y = CANVAS_HEIGHT / 2;
        l = new createjs.Text(TEXT_DEVELOPED, " 40px " + FONT_GAME, "#fff");
        l.y = -60;
        l.textAlign = "center";
        l.textBaseline = "alphabetic";
        f.addChild(l);
        l = new createjs.Text("www.moneygames.app", " 36px " + FONT_GAME, "#fff");
        l.y = 80;
        l.textAlign = "center";
        l.textBaseline = "alphabetic";
        l.lineWidth = 300;
        f.addChild(l);
        l = s_oSpriteLibrary.getSprite("ctl_logo");
        e = createBitmap(l);
        e.regX = l.width / 2;
        e.regY = l.height / 2;
        f.addChild(e);
        l = s_oSpriteLibrary.getSprite("but_exit");
        a = new CGfxButton(270, -140, l, f);
        a.addEventListener(ON_MOUSE_UP, this.unload, this);
        d.alpha = 0;
        createjs.Tween.get(d)
            .to({ alpha: 0.7 }, 500)
            .call(function () {
                f.alpha = 0;
                f.visible = !0;
                createjs.Tween.get(f).to({ alpha: 1 }, 300);
            });
    };
    this.unload = function () {
        createjs.Tween.get(h)
            .to({ alpha: 0 }, 500)
            .call(function () {
                s_oStage.removeChild(h);
                a.unload();
            });
        d.off("click", b);
        c.off("click", g);
    };
    this._onLogoButRelease = function () {
        window.open("https://moneygames.app");
    };
    this._init();
}
function CPause() {
    var g, b;
    this._init = function () {
        g = new createjs.Container();
        g.alpha = 0;
        b = new createjs.Shape();
        b.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        b.alpha = 0.5;
        b.on("click", function () {});
        g.addChild(b);
        var d = new createjs.Text(TEXT_PAUSE, "70px " + FONT_GAME, TEXT_COLOR);
        d.x = 0.5 * CANVAS_WIDTH;
        d.y = 0.5 * CANVAS_HEIGHT - 100;
        d.textAlign = "center";
        g.addChild(d);
        d = new createjs.Text(TEXT_PAUSE, "70px " + FONT_GAME, TEXT_COLOR_STROKE);
        d.x = 0.5 * CANVAS_WIDTH;
        d.y = 0.5 * CANVAS_HEIGHT - 100;
        d.outline = OUTLINE_WIDTH;
        d.textAlign = "center";
        g.addChild(d);
        d = s_oSpriteLibrary.getSprite("but_continue");
        new CGfxButton(0.5 * CANVAS_WIDTH, 0.5 * CANVAS_HEIGHT - 170, d, g).addEventListener(ON_MOUSE_UP, this._onLeavePause, this);
        s_oStage.addChild(g);
        var f = this;
        createjs.Tween.get(g)
            .to({ alpha: 1 }, 150, createjs.Ease.quartOut)
            .call(function () {
                f.onPause(!0);
            });
    };
    this.onPause = function (b) {
        s_oGame.pause(b);
    };
    this.unload = function () {
        b.off("click", function () {});
        s_oStage.removeChild(g);
    };
    this._onLeavePause = function () {
        playSound("click", 1, !1);
        createjs.Ticker.paused = !1;
        createjs.Tween.removeTweens(g);
        var b = this;
        createjs.Tween.get(g)
            .to({ alpha: 0 }, 150, createjs.Ease.quartIn)
            .call(function () {
                b.onPause(!1);
                s_oInterface.unloadPause();
            });
    };
    this._init();
    return this;
}
function CStartBall(g, b, d) {
    var f;
    this._init = function () {
        var a = s_oSpriteLibrary.getSprite("start_ball");
        f = createBitmap(a);
        f.regX = 0.5 * a.width;
        f.regY = 0.5 * a.height;
        this.setPosition(g, b);
        d.addChild(f);
    };
    this.setPosition = function (a, b) {
        f.x = a;
        f.y = b;
    };
    this.fadeAnim = function (a, b, c) {
        createjs.Tween.get(f, { override: !0 }).wait(c).to({ alpha: a }, b);
    };
    this.setAlpha = function (a) {
        f.alpha = a;
    };
    this.setVisible = function (a) {
        f.visible = a;
    };
    this._init();
    return this;
}
function CVector2(g, b) {
    var d, f;
    this._init = function (a, b) {
        d = a;
        f = b;
    };
    this.add = function (a, b) {
        d += a;
        f += b;
    };
    this.addV = function (a) {
        d += a.getX();
        f += a.getY();
    };
    this.scalarDivision = function (a) {
        d /= a;
        f /= a;
    };
    this.subtract = function (a) {
        d -= a.getX();
        f -= a.getY();
    };
    this.scalarProduct = function (a) {
        d *= a;
        f *= a;
    };
    this.invert = function () {
        d *= -1;
        f *= -1;
    };
    this.dotProduct = function (a) {
        return d * a.getX() + f * a.getY();
    };
    this.set = function (a, b) {
        d = a;
        f = b;
    };
    this.setV = function (a) {
        d = a.getX();
        f = a.getY();
    };
    this.length = function () {
        return Math.sqrt(d * d + f * f);
    };
    this.length2 = function () {
        return d * d + f * f;
    };
    this.normalize = function () {
        var a = this.length();
        0 < a && ((d /= a), (f /= a));
    };
    this.angleBetweenVectors = function (a) {
        a = Math.acos(this.dotProduct(a) / (this.length() * a.length()));
        return !0 === isNaN(a) ? 0 : a;
    };
    this.getNormalize = function (a) {
        this.length();
        a.set(d, f);
        a.normalize();
    };
    this.rot90CCW = function () {
        var a = d;
        d = -f;
        f = a;
    };
    this.rot90CW = function () {
        var a = d;
        d = f;
        f = -a;
    };
    this.getRotCCW = function (a) {
        a.set(d, f);
        a.rot90CCW();
    };
    this.getRotCW = function (a) {
        a.set(d, f);
        a.rot90CW();
    };
    this.ceil = function () {
        d = Math.ceil(d);
        f = Math.ceil(f);
    };
    this.round = function () {
        d = Math.round(d);
        f = Math.round(f);
    };
    this.toString = function () {
        return "Vector2: " + d + ", " + f;
    };
    this.print = function () {
        trace("Vector2: " + d + ", " + f);
    };
    this.getX = function () {
        return d;
    };
    this.getY = function () {
        return f;
    };
    this.rotate = function (a) {
        var b = d,
            c = f;
        d = b * Math.cos(a) - c * Math.sin(a);
        f = b * Math.sin(a) + c * Math.cos(a);
    };
    this._init(g, b);
}
function CPlayer(g, b, d) {
    var f,
        a = [],
        e,
        c = 0,
        h = 0;
    this._init = function (b, c) {
        f = { x: b, y: c };
        e = new createjs.Container();
        e.x = f.x;
        e.y = f.y;
        d.addChild(e);
        for (var g = 0; g < NUM_SPRITE_PLAYER; g++) a.push(createBitmap(s_oSpriteLibrary.getSprite("player_" + g))), (a[g].visible = !1), e.addChild(a[g]);
        g = s_oSpriteLibrary.getSprite("player_0");
        e.cache(0, 0, g.width, g.height);
        a[0].visible = !0;
    };
    this.setPosition = function (a, b) {
        e.x = a;
        e.y = b;
    };
    this.getX = function () {
        return e.x;
    };
    this.getY = function () {
        return e.y;
    };
    this.getStartPos = function () {
        return f;
    };
    this.setVisible = function (a) {
        e.visible = a;
    };
    this.animFade = function (a) {
        var b = this;
        createjs.Tween.get(e)
            .to({ alpha: a }, 250)
            .call(function () {
                0 === a && ((e.visible = !1), b.hideCharacter(NUM_SPRITE_PLAYER - 1), b.viewCharacter(c));
            });
    };
    this.viewCharacter = function (b) {
        a[b].visible = !0;
    };
    this.hideCharacter = function (b) {
        a[b].visible = !1;
    };
    this.getFrame = function () {
        return c;
    };
    this.animPlayer = function () {
        h += s_iTimeElaps;
        if (h > BUFFER_ANIM_PLAYER) {
            this.hideCharacter(c);
            if (c + 1 < NUM_SPRITE_PLAYER) this.viewCharacter(c + 1), c++;
            else return this.viewCharacter(c), (h = c = 0), !1;
            e.updateCache();
            h = 0;
        }
        return !0;
    };
    this._init(g, b);
    return this;
}
function CScoreBoard(g) {
    var b, d, f, a, e, c, h, l, k, m, p, n, q;
    this._init = function () {
        b = { x: 10, y: CANVAS_HEIGHT - 10 };
        n = new createjs.Container();
        n.x = b.x;
        n.y = b.y;
        g.addChild(n);
        a = new createjs.Text(TEXT_SCORE, "70px " + FONT_GAME, TEXT_COLOR_STROKE);
        a.textAlign = "left";
        a.outline = 4;
        n.addChild(a);
        f = new createjs.Text(TEXT_SCORE, "70px " + FONT_GAME, TEXT_COLOR);
        f.textAlign = "left";
        n.addChild(f);
        c = new createjs.Text(0, "70px " + FONT_GAME, TEXT_COLOR_STROKE);
        c.textAlign = "left";
        c.x = 200;
        c.outline = 4;
        n.addChild(c);
        e = new createjs.Text(0, "70px " + FONT_GAME, TEXT_COLOR);
        e.textAlign = "left";
        e.x = 200;
        n.addChild(e);
        h = new createjs.Text(TEXT_BEST + " " + s_iBestScore, "70px " + FONT_GAME, TEXT_COLOR_STROKE);
        h.y = 60;
        h.textAlign = "left";
        h.outline = 4;
        n.addChild(h);
        l = new createjs.Text(TEXT_BEST + " " + s_iBestScore, "70px " + FONT_GAME, TEXT_COLOR);
        l.y = 60;
        l.textAlign = "left";
        n.addChild(l);
        q = new createjs.Container();
        q.x = 50;
        k = new createjs.Text("+5555 " + TEXT_MULTIPLIER + 1, "36px " + FONT_GAME, TEXT_COLOR);
        k.textAlign = "left";
        q.addChild(k);
        m = new createjs.Text("+5555 " + TEXT_MULTIPLIER + 1, "36px " + FONT_GAME, TEXT_COLOR_STROKE);
        m.textAlign = "left";
        m.outline = OUTLINE_WIDTH;
        q.addChild(m);
        q.y = d = -m.getBounds().height;
        q.visible = !1;
        n.addChild(q);
        p = new CRollingScore();
        n.regY = n.getBounds().height;
    };
    this.getStartPosScore = function () {
        return b;
    };
    this.setPosScore = function (a, b) {
        n.x = a;
        n.y = b;
    };
    this.refreshTextScore = function (a) {
        p.rolling(e, c, a);
    };
    this.refreshBestScore = function () {
        h.text = TEXT_BEST + " " + s_iBestScore;
        l.text = TEXT_BEST + " " + s_iBestScore;
    };
    this.effectAddScore = function (a, b) {
        q.visible = !0;
        k.text = "+" + a + " " + TEXT_MULTIPLIER + b;
        m.text = k.text;
        createjs.Tween.get(q)
            .to({ y: d - 50, alpha: 0 }, MS_EFFECT_ADD, createjs.Ease.cubicOut)
            .call(function () {
                q.visible = !1;
                q.alpha = 1;
                q.y = d;
            });
    };
    this._init();
    return this;
}
MS_ROLLING_SCORE = 750;
function CRollingScore() {
    var g = null,
        b = null;
    this.rolling = function (d, f, a) {
        g = createjs.Tween.get(d, { override: !0 })
            .to({ text: a }, MS_ROLLING_SCORE, createjs.Ease.cubicOut)
            .addEventListener("change", function () {
                d.text = Math.floor(d.text);
            })
            .call(function () {
                createjs.Tween.removeTweens(g);
            });
        null !== f &&
            (b = createjs.Tween.get(f, { override: !0 })
                .to({ text: a }, MS_ROLLING_SCORE, createjs.Ease.cubicOut)
                .addEventListener("change", function () {
                    f.text = Math.floor(f.text);
                })
                .call(function () {
                    createjs.Tween.removeTweens(b);
                }));
    };
    return this;
}
function CLaunchBoard(g) {
    var b, d, f, a, e;
    this._init = function () {
        b = { x: CANVAS_WIDTH_HALF + 660, y: CANVAS_HEIGHT - 60 };
        e = new createjs.Container();
        e.x = b.x;
        e.y = b.y;
        g.addChild(e);
        d = new createjs.Text("0" + TEXT_OF + NUM_OF_PENALTY, "70px " + FONT_GAME, TEXT_COLOR);
        d.textAlign = "right";
        d.y = -14;
        e.addChild(d);
        e.y = b.y;
        g.addChild(e);
        f = new createjs.Text("0" + TEXT_OF + NUM_OF_PENALTY, "70px " + FONT_GAME, TEXT_COLOR_STROKE);
        f.textAlign = "right";
        f.y = d.y;
        f.outline = OUTLINE_WIDTH;
        e.addChild(f);
        var c = s_oSpriteLibrary.getSprite("shot_left");
        a = createBitmap(c);
        a.x = 1.4 * -d.getBounds().width;
        a.regX = 0.5 * c.width;
        a.regY = 10;
        e.addChild(a);
        e.getBounds();
    };
    this.getStartPos = function () {
        return b;
    };
    this.setPos = function (a, b) {
        e.x = a;
        e.y = b;
    };
    this.refreshTextLaunch = function (b, e) {
        d.text = b + TEXT_OF + e;
        f.text = d.text;
        a.x = 1.4 * -d.getBounds().width;
    };
    this._init();
    return this;
}
function CHandSwipeAnim(g, b, d, f) {
    var a,
        e,
        c = !1;
    this._init = function (b) {
        e = new createjs.Container();
        a = createBitmap(b);
        a.x = g.x;
        a.y = g.y;
        a.regX = 0.5 * b.width;
        a.regY = 0.5 * b.height;
        a.alpha = 0;
        f.addChild(e);
        e.addChild(a);
    };
    this.animAllSwipe = function () {
        c = !0;
        var d = this;
        createjs.Tween.get(a)
            .to({ alpha: 1 }, 0.1 * MS_TIME_SWIPE_END)
            .wait(0.3 * MS_TIME_SWIPE_END)
            .to({ alpha: 0 }, 0.5 * MS_TIME_SWIPE_END, createjs.Ease.quartOut);
        createjs.Tween.get(a)
            .to({ x: b[0].x, y: b[0].y }, MS_TIME_SWIPE_END, createjs.Ease.quartOut)
            .call(function () {
                a.x = g.x;
                a.y = g.y;
                createjs.Tween.get(a)
                    .to({ alpha: 1 }, 0.1 * MS_TIME_SWIPE_END)
                    .wait(0.3 * MS_TIME_SWIPE_END)
                    .to({ alpha: 0 }, 0.5 * MS_TIME_SWIPE_END, createjs.Ease.quartOut);
                createjs.Tween.get(a)
                    .to({ x: b[1].x, y: b[1].y }, MS_TIME_SWIPE_END, createjs.Ease.quartOut)
                    .call(function () {
                        a.x = g.x;
                        a.y = g.y;
                        createjs.Tween.get(a)
                            .to({ alpha: 1 }, 0.1 * MS_TIME_SWIPE_END)
                            .wait(0.3 * MS_TIME_SWIPE_END)
                            .to({ alpha: 0 }, 0.5 * MS_TIME_SWIPE_END, createjs.Ease.quartOut);
                        createjs.Tween.get(a)
                            .to({ x: b[2].x, y: b[2].y }, MS_TIME_SWIPE_END, createjs.Ease.quartOut)
                            .call(function () {
                                a.x = g.x;
                                a.y = g.y;
                                d.animAllSwipe();
                            });
                    });
            });
    };
    this.fadeAnim = function (a) {
        createjs.Tween.get(e, { override: !0 }).to({ alpha: a }, 250);
    };
    this.isAnimate = function () {
        return c;
    };
    this.setVisible = function (b) {
        a.visible = b;
    };
    this.removeTweens = function () {
        createjs.Tween.removeTweens(a);
        c = !1;
    };
    this._init(d);
    return this;
}
function CGoal(g, b, d, f) {
    var a, e, c;
    this._init = function (b, d, g) {
        c = new createjs.Container();
        f.addChild(c);
        e = createBitmap(g);
        this.setPosition(b, d);
        c.addChild(e);
        a = [];
        b = new CPoleHighlight(!0, !1, 1, 1, CROSSBAR_SCORE[4], s_oSpriteLibrary.getSprite("horizontal_angle"), c);
        a.push(b);
        b = new CPoleHighlight(!0, !1, 88, 1, CROSSBAR_SCORE[3], s_oSpriteLibrary.getSprite("horizontal_orange"), c);
        a.push(b);
        b = new CPoleHighlight(!0, !1, 175, 1, CROSSBAR_SCORE[2], s_oSpriteLibrary.getSprite("horizontal_yellow"), c);
        a.push(b);
        b = new CPoleHighlight(!0, !1, 262, 1, CROSSBAR_SCORE[1], s_oSpriteLibrary.getSprite("horizontal_orange"), c);
        a.push(b);
        b = new CPoleHighlight(!0, !1, 349, 1, CROSSBAR_SCORE[0], s_oSpriteLibrary.getSprite("horizontal_yellow"), c);
        a.push(b);
        b = new CPoleHighlight(!0, !1, 436, 1, CROSSBAR_SCORE[1], s_oSpriteLibrary.getSprite("horizontal_orange"), c);
        a.push(b);
        b = new CPoleHighlight(!0, !1, 523, 1, CROSSBAR_SCORE[2], s_oSpriteLibrary.getSprite("horizontal_yellow"), c);
        a.push(b);
        b = new CPoleHighlight(!0, !1, 610, 1, CROSSBAR_SCORE[3], s_oSpriteLibrary.getSprite("horizontal_orange"), c);
        a.push(b);
        b = new CPoleHighlight(!0, !1, 697, 1, CROSSBAR_SCORE[4], s_oSpriteLibrary.getSprite("horizontal_angle_right"), c);
        a.push(b);
    };
    this.unload = function () {
        f.removeChild(e);
    };
    this.setPosition = function (a, b) {
        c.x = a;
        c.y = b;
    };
    this.highlightCrossbar = function (b) {
        a[b].highlightAnim();
        new CScoreText(a[b].getText(), a[b].getTextX(), a[b].getTextY(), c);
    };
    this.highlightPoleLeft = function (a) {
        (void 0)[a].highlightAnim();
    };
    this.highlightPoleRight = function (a) {
        (void 0)[a].highlightAnim();
    };
    this.getDepthPos = function () {
        return GOAL_SPRITE_SWAP_Y;
    };
    this.getObject = function () {
        return c;
    };
    this._init(g, b, d);
    return this;
}
function CHelpPanel(g) {
    var b,
        d,
        f,
        a = this;
    this._init = function () {
        f = new createjs.Container();
        g.addChild(f);
        d = new createjs.Shape();
        d.graphics.beginFill("rgba()").drawRoundRect(380, 420, 600, 200, 10);
        d.alpha = 0.7;
        d.on("click", function () {});
        f.addChild(d);
        new CCTLText(f, CANVAS_WIDTH / 2 - 270, CANVAS_HEIGHT_HALF - 260, 540, 200, 70, "center", TEXT_COLOR_STROKE, FONT_GAME, 1, 0, 0, TEXT_HELP_0, !0, !0, !0, !1).setOutline(4);
        new CCTLText(f, CANVAS_WIDTH / 2 - 270, CANVAS_HEIGHT_HALF - 260, 540, 200, 70, "center", TEXT_COLOR, FONT_GAME, 1, 0, 0, TEXT_HELP_0, !0, !0, !0, !1);
        b = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, s_oSpriteLibrary.getSprite("but_continue"), f);
        b.addEventListener(ON_MOUSE_UP, this._onContinue, this);
    };
    this.show = function () {
        f.alpha = 0;
        f.visible = !0;
        createjs.Tween.get(f).to({ alpha: 1 }, 400, createjs.Ease.quartOut);
    };
    this.hide = function () {
        createjs.Tween.get(f)
            .to({ alpha: 0 }, 400, createjs.Ease.quartOut)
            .call(function () {
                f.visible = !1;
                s_oGame.onExitHelp();
            });
    };
    this.unload = function () {
        createjs.Tween.get(f)
            .to({ alpha: 0 }, 150, createjs.Ease.quartOut)
            .call(function () {
                g.removeChild(f, d);
            });
    };
    this._onContinue = function () {
        b.unload();
        a.hide();
    };
    this._init();
}
function CPoleHighlight(g, b, d, f, a, e, c) {
    var h = 0,
        l,
        k,
        m,
        p = this;
    this._init = function (a, d, e, f) {
        m = new createjs.Container();
        c.addChild(m);
        l = createBitmap(f);
        l.x = a;
        l.y = d;
        m.addChild(l);
        var h = s_oSpriteLibrary.getSprite("target_arrow"),
            n = createBitmap(h);
        n.regX = h.width / 2;
        n.regY = h.height;
        g ? ((n.x = a + f.width / 2), (n.y = d - 10)) : (b ? ((n.x = a - 10), (n.rotation = -90)) : ((n.x = a + f.width + 10), (n.rotation = 90)), (n.y = d + f.height / 2));
        m.addChild(n);
        new CCTLText(m, n.x - 40, n.y - 40, 80, 30, 70, "center", TEXT_COLOR_STROKE, FONT_GAME, 1, 0, 0, e, !0, !0, !1, !1).setOutline(4);
        k = new CCTLText(m, n.x - 40, n.y - 40, 80, 30, 70, "center", TEXT_COLOR, FONT_GAME, 1, 0, 0, e, !0, !0, !1, !1);
    };
    this.highlightAnim = function () {
        createjs.Tween.get(l)
            .wait(40)
            .call(function () {
                h++;
                20 > h ? ((l.visible = !l.visible), p.highlightAnim()) : ((h = 0), (l.visible = !0));
            });
    };
    this.getText = function () {
        return k.getString();
    };
    this.getTextX = function () {
        return k.getX();
    };
    this.getTextY = function () {
        return k.getY();
    };
    this._init(d, f, a, e);
}
function CScoreText(g, b, d, f) {
    var a;
    this._init = function (b, c, d) {
        a = new createjs.Text("+" + b, "60px " + FONT_GAME, "#fff");
        a.textAlign = "center";
        a.x = c;
        a.y = d;
        a.alpha = 0;
        a.shadow = new createjs.Shadow("#000", 1, 1, 1);
        f.addChild(a);
        var e = this;
        createjs.Tween.get(a)
            .to({ alpha: 1 }, 200, createjs.Ease.quadIn)
            .call(function () {
                e.moveUp();
            });
    };
    this.moveUp = function () {
        var b = a.y - 400,
            c = this;
        createjs.Tween.get(a)
            .to({ y: b }, 1500, createjs.Ease.sineIn)
            .call(function () {
                c.unload();
            });
        createjs.Tween.get(a).wait(800).to({ alpha: 0 }, 500);
    };
    this.unload = function () {
        f.removeChild(a);
    };
    this._init(g, b, d);
}
CCTLText.prototype = {
    constructor: CCTLText,
    __autofit: function () {
        if (this._bFitText) {
            for (
                var g = this._iFontSize;
                (this._oText.getBounds().height > this._iHeight - 2 * this._iPaddingV || this._oText.getBounds().width > this._iWidth - 2 * this._iPaddingH) &&
                !(g--, (this._oText.font = g + "px " + this._szFont), (this._oText.lineHeight = Math.round(g * this._fLineHeightFactor)), this.__updateY(), this.__verticalAlign(), 8 > g);

            );
            this._iFontSize = g;
        }
    },
    __verticalAlign: function () {
        if (this._bVerticalAlign) {
            var g = this._oText.getBounds().height;
            this._oText.y -= (g - this._iHeight) / 2 + this._iPaddingV;
        }
    },
    __updateY: function () {
        this._oText.y = this._y + this._iPaddingV;
        switch (this._oText.textBaseline) {
            case "middle":
                this._oText.y += this._oText.lineHeight / 2 + (this._iFontSize * this._fLineHeightFactor - this._iFontSize);
        }
    },
    __createText: function (g) {
        this._bDebug && ((this._oDebugShape = new createjs.Shape()), this._oDebugShape.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(this._x, this._y, this._iWidth, this._iHeight), this._oContainer.addChild(this._oDebugShape));
        this._oText = new createjs.Text(g, this._iFontSize + "px " + this._szFont, this._szColor);
        this._oText.textBaseline = "middle";
        this._oText.lineHeight = Math.round(this._iFontSize * this._fLineHeightFactor);
        this._oText.textAlign = this._szAlign;
        this._oText.lineWidth = this._bMultiline ? this._iWidth - 2 * this._iPaddingH : null;
        switch (this._szAlign) {
            case "center":
                this._oText.x = this._x + this._iWidth / 2;
                break;
            case "left":
                this._oText.x = this._x + this._iPaddingH;
                break;
            case "right":
                this._oText.x = this._x + this._iWidth - this._iPaddingH;
        }
        this._oContainer.addChild(this._oText);
        this.refreshText(g);
    },
    setVerticalAlign: function (g) {
        this._bVerticalAlign = g;
    },
    setOutline: function (g) {
        null !== this._oText && (this._oText.outline = g);
    },
    setShadow: function (g, b, d, f) {
        null !== this._oText && (this._oText.shadow = new createjs.Shadow(g, b, d, f));
    },
    setColor: function (g) {
        this._oText.color = g;
    },
    setAlpha: function (g) {
        this._oText.alpha = g;
    },
    setX: function (g) {
        this._x = g;
        this._oText.x = g;
    },
    setY: function (g) {
        this._y = g;
        this._oText.y = g;
    },
    removeTweens: function () {
        createjs.Tween.removeTweens(this._oText);
    },
    getText: function () {
        return this._oText;
    },
    getString: function () {
        return this._oText.text;
    },
    getX: function () {
        return this._x;
    },
    getY: function () {
        return this._y;
    },
    getBounds: function () {
        return this._oText.getBounds();
    },
    getFontSize: function () {
        return this._iFontSize;
    },
    refreshText: function (g) {
        "" === g && (g = " ");
        null === this._oText && this.__createText(g);
        this._oText.text = g;
        this._oText.font = this._iFontSize + "px " + this._szFont;
        this._oText.lineHeight = Math.round(this._iFontSize * this._fLineHeightFactor);
        this.__autofit();
        this.__updateY();
        this.__verticalAlign();
    },
};
function CCTLText(g, b, d, f, a, e, c, h, l, k, m, p, n, q, u, r, w) {
    this._oContainer = g;
    this._x = b;
    this._y = d;
    this._iWidth = f;
    this._iHeight = a;
    this._bMultiline = r;
    this._iFontSize = e;
    this._szAlign = c;
    this._szColor = h;
    this._szFont = l;
    this._iPaddingH = m;
    this._iPaddingV = p;
    this._bVerticalAlign = u;
    this._bFitText = q;
    this._bDebug = w;
    this._oDebugShape = null;
    this._fLineHeightFactor = k;
    this._oText = null;
    n && this.__createText(n);
}
function extractHostname(g) {
    g = -1 < g.indexOf("://") ? g.split("/")[2] : g.split("/")[0];
    g = g.split(":")[0];
    return (g = g.split("?")[0]);
}
function extractRootDomain(g) {
    g = extractHostname(g);
    var b = g.split("."),
        d = b.length;
    2 < d && (g = b[d - 2] + "." + b[d - 1]);
    return g;
}
var getClosestTop = function () {
        var g = window,
            b = !1;
        try {
            for (; g.parent.document !== g.document; )
                if (g.parent.document) g = g.parent;
                else {
                    b = !0;
                    break;
                }
        } catch (d) {
            b = !0;
        }
        return { topFrame: g, err: b };
    },
    getBestPageUrl = function (g) {
        var b = g.topFrame,
            d = "";
        if (g.err)
            try {
                try {
                    d = window.top.location.href;
                } catch (a) {
                    var f = window.location.ancestorOrigins;
                    d = f[f.length - 1];
                }
            } catch (a) {
                d = b.document.referrer;
            }
        else d = b.location.href;
        return d;
    },
    TOPFRAMEOBJ = getClosestTop(),
    PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);
function seekAndDestroy() {
    for (
        var g = extractRootDomain(PAGE_URL),
            b = [
                String.fromCharCode(99, 111, 100, 101, 116, 104, 105, 115, 108, 97, 98, 46, 99, 111, 109),
                String.fromCharCode(101, 110, 118, 97, 116, 111, 46, 99, 111, 109),
                String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 99, 111, 109),
                String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116),
            ],
            d = 0;
        d < b.length;
        d++
    )
        if (b[d] === g) return !0;
    return 1;
}

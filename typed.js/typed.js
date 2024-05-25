/*!
 *
 *   typed.js - A JavaScript Typing Animation Library
 *   Author: Matt Boldt <me@mattboldt.com>
 *   Version: v2.0.12
 *   Url: https://github.com/mattboldt/typed.js
 *   License(s): MIT
 *
 */ !(function t(e, s) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = s())
    : "function" == typeof define && define.amd
    ? define([], s)
    : "object" == typeof exports
    ? (exports.Typed = s())
    : (e.Typed = s());
})(this, function () {
  return (function (t) {
    var e = {};
    function s(n) {
      if (e[n]) return e[n].exports;
      var i = (e[n] = { exports: {}, id: n, loaded: !1 });
      return t[n].call(i.exports, i, i.exports, s), (i.loaded = !0), i.exports;
    }
    return (s.m = t), (s.c = e), (s.p = ""), s(0);
  })([
    function (t, e, s) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = (function () {
          function t(t, e) {
            for (var s = 0; s < e.length; s++) {
              var n = e[s];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(t, n.key, n);
            }
          }
          return function (e, s, n) {
            return s && t(e.prototype, s), n && t(e, n), e;
          };
        })(),
        i = s(1),
        r = s(3),
        o = (function () {
          function t(e, s) {
            !(function t(e, s) {
              if (!(e instanceof s))
                throw TypeError("Cannot call a class as a function");
            })(this, t),
              i.initializer.load(this, s, e),
              this.begin();
          }
          return (
            n(t, [
              {
                key: "toggle",
                value: function t() {
                  this.pause.status ? this.start() : this.stop();
                },
              },
              {
                key: "stop",
                value: function t() {
                  !this.typingComplete &&
                    (this.pause.status ||
                      (this.toggleBlinking(!0),
                      (this.pause.status = !0),
                      this.options.onStop(this.arrayPos, this)));
                },
              },
              {
                key: "start",
                value: function t() {
                  !this.typingComplete &&
                    this.pause.status &&
                    ((this.pause.status = !1),
                    this.pause.typewrite
                      ? this.typewrite(
                          this.pause.curString,
                          this.pause.curStrPos
                        )
                      : this.backspace(
                          this.pause.curString,
                          this.pause.curStrPos
                        ),
                    this.options.onStart(this.arrayPos, this));
                },
              },
              {
                key: "destroy",
                value: function t() {
                  this.reset(!1), this.options.onDestroy(this);
                },
              },
              {
                key: "reset",
                value: function t() {
                  var e =
                    arguments.length <= 0 ||
                    void 0 === arguments[0] ||
                    arguments[0];
                  clearInterval(this.timeout),
                    this.replaceText(""),
                    this.cursor &&
                      this.cursor.parentNode &&
                      (this.cursor.parentNode.removeChild(this.cursor),
                      (this.cursor = null)),
                    (this.strPos = 0),
                    (this.arrayPos = 0),
                    (this.curLoop = 0),
                    e &&
                      (this.insertCursor(),
                      this.options.onReset(this),
                      this.begin());
                },
              },
              {
                key: "begin",
                value: function t() {
                  var e = this;
                  this.options.onBegin(this),
                    (this.typingComplete = !1),
                    this.shuffleStringsIfNeeded(this),
                    this.insertCursor(),
                    this.bindInputFocusEvents && this.bindFocusEvents(),
                    (this.timeout = setTimeout(function () {
                      e.currentElContent && 0 !== e.currentElContent.length
                        ? e.backspace(
                            e.currentElContent,
                            e.currentElContent.length
                          )
                        : e.typewrite(
                            e.strings[e.sequence[e.arrayPos]],
                            e.strPos
                          );
                    }, this.startDelay));
                },
              },
              {
                key: "typewrite",
                value: function t(e, s) {
                  var n = this;
                  this.fadeOut &&
                    this.el.classList.contains(this.fadeOutClass) &&
                    (this.el.classList.remove(this.fadeOutClass),
                    this.cursor &&
                      this.cursor.classList.remove(this.fadeOutClass));
                  var i = this.humanizer(this.typeSpeed),
                    o = 1;
                  if (!0 === this.pause.status) {
                    this.setPauseStatus(e, s, !0);
                    return;
                  }
                  this.timeout = setTimeout(function () {
                    s = r.htmlParser.typeHtmlChars(e, s, n);
                    var t = 0,
                      i = e.substr(s);
                    if ("^" === i.charAt(0) && /^\^\d+/.test(i)) {
                      var a = 1;
                      (a += (i = /\d+/.exec(i)[0]).length),
                        (t = parseInt(i)),
                        (n.temporaryPause = !0),
                        n.options.onTypingPaused(n.arrayPos, n),
                        (e = e.substring(0, s) + e.substring(s + a)),
                        n.toggleBlinking(!0);
                    }
                    if ("`" === i.charAt(0)) {
                      for (
                        ;
                        "`" !== e.substr(s + o).charAt(0) &&
                        !(s + ++o > e.length);

                      );
                      var u = e.substring(0, s),
                        l = e.substring(u.length + 1, s + o);
                      (e = u + l + e.substring(s + o + 1)), o--;
                    }
                    n.timeout = setTimeout(function () {
                      n.toggleBlinking(!1),
                        s >= e.length
                          ? n.doneTyping(e, s)
                          : n.keepTyping(e, s, o),
                        n.temporaryPause &&
                          ((n.temporaryPause = !1),
                          n.options.onTypingResumed(n.arrayPos, n));
                    }, t);
                  }, i);
                },
              },
              {
                key: "keepTyping",
                value: function t(e, s, n) {
                  0 === s &&
                    (this.toggleBlinking(!1),
                    this.options.preStringTyped(this.arrayPos, this)),
                    (s += n);
                  var i = e.substr(0, s);
                  this.replaceText(i), this.typewrite(e, s);
                },
              },
              {
                key: "doneTyping",
                value: function t(e, s) {
                  var n = this;
                  this.options.onStringTyped(this.arrayPos, this),
                    this.toggleBlinking(!0),
                    (this.arrayPos !== this.strings.length - 1 ||
                      (this.complete(),
                      !1 !== this.loop && this.curLoop !== this.loopCount)) &&
                      (this.timeout = setTimeout(function () {
                        n.backspace(e, s);
                      }, this.backDelay));
                },
              },
              {
                key: "backspace",
                value: function t(e, s) {
                  var n = this;
                  if (!0 === this.pause.status) {
                    this.setPauseStatus(e, s, !1);
                    return;
                  }
                  if (this.fadeOut) return this.initFadeOut();
                  this.toggleBlinking(!1);
                  var i = this.humanizer(this.backSpeed);
                  this.timeout = setTimeout(function () {
                    s = r.htmlParser.backSpaceHtmlChars(e, s, n);
                    var t = e.substr(0, s);
                    if ((n.replaceText(t), n.smartBackspace)) {
                      var i = n.strings[n.arrayPos + 1];
                      i && t === i.substr(0, s)
                        ? (n.stopNum = s)
                        : (n.stopNum = 0);
                    }
                    s > n.stopNum
                      ? (s--, n.backspace(e, s))
                      : s <= n.stopNum &&
                        (n.arrayPos++,
                        n.arrayPos === n.strings.length
                          ? ((n.arrayPos = 0),
                            n.options.onLastStringBackspaced(),
                            n.shuffleStringsIfNeeded(),
                            n.begin())
                          : n.typewrite(n.strings[n.sequence[n.arrayPos]], s));
                  }, i);
                },
              },
              {
                key: "complete",
                value: function t() {
                  this.options.onComplete(this),
                    this.loop ? this.curLoop++ : (this.typingComplete = !0);
                },
              },
              {
                key: "setPauseStatus",
                value: function t(e, s, n) {
                  (this.pause.typewrite = n),
                    (this.pause.curString = e),
                    (this.pause.curStrPos = s);
                },
              },
              {
                key: "toggleBlinking",
                value: function t(e) {
                  this.cursor &&
                    !this.pause.status &&
                    this.cursorBlinking !== e &&
                    ((this.cursorBlinking = e),
                    e
                      ? this.cursor.classList.add("typed-cursor--blink")
                      : this.cursor.classList.remove("typed-cursor--blink"));
                },
              },
              {
                key: "humanizer",
                value: function t(e) {
                  return Math.round((Math.random() * e) / 2) + e;
                },
              },
              {
                key: "shuffleStringsIfNeeded",
                value: function t() {
                  this.shuffle &&
                    (this.sequence = this.sequence.sort(function () {
                      return Math.random() - 0.5;
                    }));
                },
              },
              {
                key: "initFadeOut",
                value: function t() {
                  var e = this;
                  return (
                    (this.el.className += " " + this.fadeOutClass),
                    this.cursor &&
                      (this.cursor.className += " " + this.fadeOutClass),
                    setTimeout(function () {
                      e.arrayPos++,
                        e.replaceText(""),
                        e.strings.length > e.arrayPos
                          ? e.typewrite(e.strings[e.sequence[e.arrayPos]], 0)
                          : (e.typewrite(e.strings[0], 0), (e.arrayPos = 0));
                    }, this.fadeOutDelay)
                  );
                },
              },
              {
                key: "replaceText",
                value: function t(e) {
                  this.attr
                    ? this.el.setAttribute(this.attr, e)
                    : this.isInput
                    ? (this.el.value = e)
                    : "html" === this.contentType
                    ? (this.el.innerHTML = e)
                    : (this.el.textContent = e);
                },
              },
              {
                key: "bindFocusEvents",
                value: function t() {
                  var e = this;
                  this.isInput &&
                    (this.el.addEventListener("focus", function (t) {
                      e.stop();
                    }),
                    this.el.addEventListener("blur", function (t) {
                      (!e.el.value || 0 === e.el.value.length) && e.start();
                    }));
                },
              },
              {
                key: "insertCursor",
                value: function t() {
                  this.showCursor &&
                    !this.cursor &&
                    ((this.cursor = document.createElement("span")),
                    (this.cursor.className = "typed-cursor"),
                    this.cursor.setAttribute("aria-hidden", !0),
                    (this.cursor.innerHTML = this.cursorChar),
                    this.el.parentNode &&
                      this.el.parentNode.insertBefore(
                        this.cursor,
                        this.el.nextSibling
                      ));
                },
              },
            ]),
            t
          );
        })();
      (e.default = o), (t.exports = e.default);
    },
    function (t, e, s) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n,
        i =
          Object.assign ||
          function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var s = arguments[e];
              for (var n in s)
                Object.prototype.hasOwnProperty.call(s, n) && (t[n] = s[n]);
            }
            return t;
          },
        r = (function () {
          function t(t, e) {
            for (var s = 0; s < e.length; s++) {
              var n = e[s];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(t, n.key, n);
            }
          }
          return function (e, s, n) {
            return s && t(e.prototype, s), n && t(e, n), e;
          };
        })(),
        o = (n = s(2)) && n.__esModule ? n : { default: n },
        a = (function () {
          function t() {
            !(function t(e, s) {
              if (!(e instanceof s))
                throw TypeError("Cannot call a class as a function");
            })(this, t);
          }
          return (
            r(t, [
              {
                key: "load",
                value: function t(e, s, n) {
                  if (
                    ("string" == typeof n
                      ? (e.el = document.querySelector(n))
                      : (e.el = n),
                    (e.options = i({}, o.default, s)),
                    (e.isInput = "input" === e.el.tagName.toLowerCase()),
                    (e.attr = e.options.attr),
                    (e.bindInputFocusEvents = e.options.bindInputFocusEvents),
                    (e.showCursor = !e.isInput && e.options.showCursor),
                    (e.cursorChar = e.options.cursorChar),
                    (e.cursorBlinking = !0),
                    (e.elContent = e.attr
                      ? e.el.getAttribute(e.attr)
                      : e.el.textContent),
                    (e.contentType = e.options.contentType),
                    (e.typeSpeed = e.options.typeSpeed),
                    (e.startDelay = e.options.startDelay),
                    (e.backSpeed = e.options.backSpeed),
                    (e.smartBackspace = e.options.smartBackspace),
                    (e.backDelay = e.options.backDelay),
                    (e.fadeOut = e.options.fadeOut),
                    (e.fadeOutClass = e.options.fadeOutClass),
                    (e.fadeOutDelay = e.options.fadeOutDelay),
                    (e.isPaused = !1),
                    (e.strings = e.options.strings.map(function (t) {
                      return t.trim();
                    })),
                    "string" == typeof e.options.stringsElement
                      ? (e.stringsElement = document.querySelector(
                          e.options.stringsElement
                        ))
                      : (e.stringsElement = e.options.stringsElement),
                    e.stringsElement)
                  ) {
                    (e.strings = []), (e.stringsElement.style.display = "none");
                    var r = Array.prototype.slice.apply(
                        e.stringsElement.children
                      ),
                      a = r.length;
                    if (a)
                      for (var u = 0; u < a; u += 1) {
                        var l = r[u];
                        e.strings.push(l.innerHTML.trim());
                      }
                  }
                  for (var u in ((e.strPos = 0),
                  (e.arrayPos = 0),
                  (e.stopNum = 0),
                  (e.loop = e.options.loop),
                  (e.loopCount = e.options.loopCount),
                  (e.curLoop = 0),
                  (e.shuffle = e.options.shuffle),
                  (e.sequence = []),
                  (e.pause = {
                    status: !1,
                    typewrite: !0,
                    curString: "",
                    curStrPos: 0,
                  }),
                  (e.typingComplete = !1),
                  e.strings))
                    e.sequence[u] = u;
                  (e.currentElContent = this.getCurrentElContent(e)),
                    (e.autoInsertCss = e.options.autoInsertCss),
                    this.appendAnimationCss(e);
                },
              },
              {
                key: "getCurrentElContent",
                value: function t(e) {
                  var s = "";
                  return e.attr
                    ? e.el.getAttribute(e.attr)
                    : e.isInput
                    ? e.el.value
                    : "html" === e.contentType
                    ? e.el.innerHTML
                    : e.el.textContent;
                },
              },
              {
                key: "appendAnimationCss",
                value: function t(e) {
                  var s = "data-typed-js-css";
                  if (
                    !(
                      !e.autoInsertCss ||
                      (!e.showCursor && !e.fadeOut) ||
                      document.querySelector("[" + s + "]")
                    )
                  ) {
                    var n = document.createElement("style");
                    (n.type = "text/css"), n.setAttribute(s, !0);
                    var i = "";
                    e.showCursor &&
                      (i +=
                        "\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      "),
                      e.fadeOut &&
                        (i +=
                          "\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      "),
                      0 !== n.length &&
                        ((n.innerHTML = i), document.body.appendChild(n));
                  }
                },
              },
            ]),
            t
          );
        })();
      e.default = a;
      var u = new a();
      e.initializer = u;
    },
    function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = {
          strings: [
            "These are the default values...",
            "You know what you should do?",
            "Use your own!",
            "Have a great day!",
          ],
          stringsElement: null,
          typeSpeed: 0,
          startDelay: 0,
          backSpeed: 0,
          smartBackspace: !0,
          shuffle: !1,
          backDelay: 700,
          fadeOut: !1,
          fadeOutClass: "typed-fade-out",
          fadeOutDelay: 500,
          loop: !1,
          loopCount: 1 / 0,
          showCursor: !0,
          cursorChar: "|",
          autoInsertCss: !0,
          attr: null,
          bindInputFocusEvents: !1,
          contentType: "html",
          onBegin: function t(e) {},
          onComplete: function t(e) {},
          preStringTyped: function t(e, s) {},
          onStringTyped: function t(e, s) {},
          onLastStringBackspaced: function t(e) {},
          onTypingPaused: function t(e, s) {},
          onTypingResumed: function t(e, s) {},
          onReset: function t(e) {},
          onStop: function t(e, s) {},
          onStart: function t(e, s) {},
          onDestroy: function t(e) {},
        }),
        (t.exports = e.default);
    },
    function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var s = (function () {
          function t(t, e) {
            for (var s = 0; s < e.length; s++) {
              var n = e[s];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(t, n.key, n);
            }
          }
          return function (e, s, n) {
            return s && t(e.prototype, s), n && t(e, n), e;
          };
        })(),
        n = (function () {
          function t() {
            !(function t(e, s) {
              if (!(e instanceof s))
                throw TypeError("Cannot call a class as a function");
            })(this, t);
          }
          return (
            s(t, [
              {
                key: "typeHtmlChars",
                value: function t(e, s, n) {
                  if ("html" !== n.contentType) return s;
                  var i = e.substr(s).charAt(0);
                  if ("<" === i || "&" === i) {
                    var r = "";
                    for (
                      r = "<" === i ? ">" : ";";
                      e.substr(s + 1).charAt(0) !== r && !(++s + 1 > e.length);

                    );
                    s++;
                  }
                  return s;
                },
              },
              {
                key: "backSpaceHtmlChars",
                value: function t(e, s, n) {
                  if ("html" !== n.contentType) return s;
                  var i = e.substr(s).charAt(0);
                  if (">" === i || ";" === i) {
                    var r = "";
                    for (
                      r = ">" === i ? "<" : "&";
                      e.substr(s - 1).charAt(0) !== r && !(--s < 0);

                    );
                    s--;
                  }
                  return s;
                },
              },
            ]),
            t
          );
        })();
      e.default = n;
      var i = new n();
      e.htmlParser = i;
    },
  ]);
});

!(function (e) {
  "use strict";
  let o = ((e, o = !1) =>
    ((e = e.trim()), o)
      ? [...document.querySelectorAll(e)]
      : document.querySelector(e))(".typed");
  if (o) {
    let n = o.getAttribute("data-typed-items");
    (n = n.split(",")),
      new Typed(".typed", {
        strings: n,
        loop: !0,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2e3,
      });
  }
  e(window).on("load", function () {
    e(".loader").fadeOut(1e3), new WOW({ offset: 150, mobile: !1 }).init();
  }),
    e(".animsition").animsition({
      inClass: "fade-in",
      outClass: "fade-out",
      inDuration: 1e3,
      outDuration: 700,
      linkElement: "a.project-box",
      loading: !0,
      loadingParentElement: "body",
      loadingClass: "spinner",
      loadingInner:
        '<div class="double-bounce1"></div><div class="double-bounce2"></div>',
      timeout: !1,
      timeoutCountdown: 5e3,
      onLoadEvent: !0,
      browser: ["animation-duration", "-webkit-animation-duration"],
      overlay: !1,
      overlayClass: "animsition-overlay-slide",
      overlayParentElement: "body",
      transition: function (e) {
        window.location.href = e;
      },
    }),
    e(".popup-youtube").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-with-zoom",
      removalDelay: 160,
      preloader: !1,
      fixedContentPos: !1,
    }),
    e(".navbar-toggle").on("click", function () {
      e("body").removeClass("menu-is-closed").addClass("menu-is-opened");
    }),
    e(".close-menu, .click-capture, .menu-list li a").on("click", function () {
      e("body").removeClass("menu-is-opened").addClass("menu-is-closed"),
        e(".menu-list ul").slideUp(300);
    }),
    e(".menu-list li a").on("click", function () {
      e(".menu-list li").removeClass("active"),
        e(this).closest("li").addClass("active");
    }),
    e(".owl-carousel").length > 0 &&
      e(".review-carousel").owlCarousel({
        responsive: { 0: { items: 1 }, 720: { items: 1 }, 1280: { items: 1 } },
        responsiveRefreshRate: 0,
        nav: !1,
        navText: [],
        animateIn: "fadeIn",
        dots: !0,
      }),
    e(".pagepiling").length > 0 &&
      e(".pagepiling").pagepiling({
        scrollingSpeed: 280,
        loopBottom: !0,
        anchors: [
          "page1",
          "page2",
          "page3",
          "page4",
          "page5",
          "page6",
          "page7",
        ],
        afterLoad: function (o, n) {
          e(".pp-section.active").scrollTop() > 0
            ? e(".navbar").removeClass("navbar-white")
            : e(".navbar").addClass("navbar-white");
        },
      }),
    e("#pp-nav")
      .remove()
      .appendTo(".animsition")
      .addClass("white right-boxed d-none d-sm-block"),
    e(".pp-nav-up").on("click", function () {
      e.fn.pagepiling.moveSectionUp();
    }),
    e(".pp-nav-down").on("click", function () {
      e.fn.pagepiling.moveSectionDown();
    }),
    e(".project-box").on("mouseover", function () {
      var o = e(".project-box").index(this);
      e(".bg-changer .section-bg")
        .removeClass("active")
        .eq(o)
        .addClass("active");
    });
  e(".js-form").length &&
    e(".js-form").each(function () {
      e(this).validate({
        errorClass: "error",
        submitHandler: function (o) {
          e.ajax({
            type: "POST",
            url: "https://formsubmit.co/syedshoeb886@gmail.com",
            data: e(o).serialize(),
            success: function () {
              e(".form-group-message").show(),
                e("#error").show(),
                e("#success").show();
            },
            error: function () {
              e(".form-group-message").show(),
                e("#success").show(),
                e("#error").show();
            },
          });
        },
      });
    });
})(jQuery);

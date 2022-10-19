// SHOW/HIDE NAV
var didScroll;
var lastScrollTop = 0;
var delta = 5;

const params = new URLSearchParams(document.location.search);
const lang = params.get("lang");

$(function () {
  if (lastScrollTop < 10) {
    $(".nav-header").addClass("nav-top");
  }
});

$(window).scroll(function (event) {
  didScroll = true;
});

setInterval(function () {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = $(this).scrollTop();
  if (Math.abs(lastScrollTop - st) <= delta) return;
  var navbarHeight = $(".nav-header").outerHeight();
  if (st > lastScrollTop && st > navbarHeight) {
    $(".nav-header").removeClass("show-nav").addClass("hide-nav");
  } else {
    if (st + $(window).height() < $(document).height()) {
      $(".nav-header").removeClass("hide-nav").addClass("show-nav");
      if ($(window).scrollTop()) {
        $(".nav-header").addClass("nav-shadow");
        $(".nav-header").removeClass("nav-top");
      } else {
        $(".nav-header").removeClass("nav-shadow");
        $(".nav-header").addClass("nav-top");
      }
    }
  }

  lastScrollTop = st;
}

$(function () {
  $(".selectpicker").selectpicker();
  const selectedLang = localStorage.getItem("lang");

  if (lang === null) {
    if (selectedLang === null) {
      const newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?lang=en";
      window.history.pushState({ path: newurl }, "", newurl);
    } else {
      const newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        `?lang=${selectedLang}`;
      window.history.pushState({ path: newurl }, "", newurl);
    }
  }

  if (selectedLang === null) {
    localStorage.setItem("lang", "en");
  }

  $(".selectpicker").selectpicker("val", selectedLang || "en");

  // LANGUAGE
  function allagiglossas(selectedLanguage) {
    document.querySelector("html").setAttribute("lang", selectedLanguage);
    const l = document.getElementsByTagName("*");
    if (selectedLanguage === "en") {
      for (i = 0; i < l.length; i++) {
        if (l[i].lang === "lk") {
          l[i].style.display = "none";
        }
        if (l[i].lang === "en") {
          l[i].style.display = "block";
        }
      }
    } else {
      for (i = 0; i < l.length; i++) {
        if (l[i].lang === "en") {
          l[i].style.display = "none";
        }
        if (l[i].lang === "lk") {
          l[i].style.display = "block";
        }
      }
    }
  }

  allagiglossas(selectedLang || "en");

  $(".selectpicker").on("changed.bs.select", function (e) {
    const selected = $(e.currentTarget).val();
    localStorage.setItem("lang", selected);
    allagiglossas(selected);

    const newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      `?lang=${selected}`;
    window.history.pushState({ path: newurl }, "", newurl);
  });

  $(".owl-carousel").on("initialized.owl.carousel", () => {
    setTimeout(() => {
      $(".owl-item.active .owl-slide-animated").addClass("is-transitioned");
      $("section").show();
    }, 200);
  });

  const $owlCarousel = $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    nav: true,
    autoplay: true,
    autoplayTimeout: 8000,
    navText: [
      '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>',
      '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>' /* icons from https://iconmonstr.com */,
    ],
  });

  $owlCarousel.on("changed.owl.carousel", (e) => {
    $(".owl-slide-animated").removeClass("is-transitioned");

    const $currentOwlItem = $(".owl-item").eq(e.item.index);
    $currentOwlItem.find(".owl-slide-animated").addClass("is-transitioned");

    const $target = $currentOwlItem.find(".owl-slide-text");
    doDotsCalculations($target);
  });

  $owlCarousel.on("resize.owl.carousel", () => {
    setTimeout(() => {
      setOwlDotsPosition();
    }, 50);
  });

  setOwlDotsPosition();

  function setOwlDotsPosition() {
    const $target = $(".owl-item.active .owl-slide-text");
    doDotsCalculations($target);
  }

  function doDotsCalculations(el) {
    try {
      const height = el.height();
      const { top, left } = el.position();
      const res = height + top + 20;

      $(".owl-carousel .owl-dots").css({
        top: `${res}px`,
        left: `${left}px`,
      });
    } catch (error) {}
  }
});

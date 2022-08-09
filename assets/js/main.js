$(function () {
  $(".selectpicker").selectpicker();

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

  allagiglossas("en");

  $(".selectpicker").on("changed.bs.select", function (e) {
    const selected = $(e.currentTarget).val();
    allagiglossas(selected);
  });
});

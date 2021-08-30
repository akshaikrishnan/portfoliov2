// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBOFZxWUm7q9DRsBH8hn7McRPIM0IbJonA",
//   authDomain: "akshai-ui.firebaseapp.com",
//   projectId: "akshai-ui",
//   storageBucket: "akshai-ui.appspot.com",
//   messagingSenderId: "355938465039",
//   appId: "1:355938465039:web:7e87c2ed7d8ddcfa34fa7a",
//   measurementId: "G-PE3VZV4GDH",
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

("use strict");
var accessToken =
  "178c93e018c0b2feedc9811c33b69876139c6a16f5db6e1b3d182130e7e3e42f";

// Call Dribble v2 API
$.ajax({
  url: "https://api.dribbble.com/v2/user/shots?access_token=" + accessToken,
  dataType: "json",
  type: "GET",
  success: function (data) {
    if (data.length > 0) {
      $.each(data.reverse(), function (i, val) {
        $("#portfolio-grid").prepend(
          '<div class="portfolio-item photo">' +
            '<a class="popup-link" target="_blank" href="' +
            val.images.hidpi +
            '" title="' +
            val.title +
            '">' +
            '<img src="' +
            val.images.hidpi +
            '"/> <div class="portfolio-caption"> <h3 class="portfolio-title">' +
            val.title +
            '</h3><div class="portfolio-descr">Photo / Web</div></a></div>'
        );
      });
      $(function () {
        var worksgrid = $("#portfolio-grid");
        $("a", filters).on("click", function () {
          var selector = $(this).attr("data-filter");
          $(".current", filters).removeClass("current");
          $(this).addClass("current");
          worksgrid.isotope({
            filter: selector,
          });
          return false;
        });
        $(window)
          .on("resize", function () {
            var windowWidth = Math.max($(window).width(), window.innerWidth),
              itemWidht = $(".grid-sizer").width(),
              itemHeight = Math.floor(itemWidht * 0.95),
              itemTallHeight = itemHeight * 2;
            if (windowWidth > 500) {
              $(".portfolio-item", worksgrid).each(function () {
                if ($(this).hasClass("tall")) {
                  $(this).css({
                    height: itemTallHeight,
                  });
                } else if ($(this).hasClass("wide")) {
                  $(this).css({
                    height: itemHeight,
                  });
                } else if ($(this).hasClass("wide-tall")) {
                  $(this).css({
                    height: itemTallHeight,
                  });
                } else {
                  $(this).css({
                    height: itemHeight,
                  });
                }
              });
            } else {
              $(".portfolio-item", worksgrid).each(function () {
                if ($(this).hasClass("tall")) {
                  $(this).css({
                    height: itemTallHeight,
                  });
                } else if ($(this).hasClass("wide")) {
                  $(this).css({
                    height: itemHeight / 2,
                  });
                } else if ($(this).hasClass("wide-tall")) {
                  $(this).css({
                    height: itemHeight,
                  });
                } else {
                  $(this).css({
                    height: itemHeight,
                  });
                }
              });
            }
            worksgrid.isotope();
          })
          .resize();
        $(".popup-link").magnificPopup({
          type: "image",
          gallery: {
            enabled: true,
          },
          image: {
            titleSrc: function (item) {
              return item.el.attr("title") + "<small>by Alex Smith</small>";
            },
          },
        });
        $(".popup-youtube, .popup-vimeo").magnificPopup({
          disableOn: 700,
          type: "iframe",
          mainClass: "mfp-fade",
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false,
        });
        $("#cf-form").submit(function (e) {
          e.preventDefault();
          var isValid = true;
          var email = $("#email").val();
          $("#name").css("border-color", "#e8eaf6");
          $("#email").css("border-color", "#e8eaf6");

          if ($("#name").val() == "") {
            $("#name").css("border-color", "red");
            $("#name").focus();
            isValid = false;
          }
          if ($("#email").val() == "") {
            $("#email").css("border-color", "red");
            $("#email").focus();
            isValid = false;
          }
          if (!validateEmail(email)) {
            $("#email").css("border-color", "red");
            $("#email").focus();
            isValid = false;
          }

          if (isValid) {
            var form_data = $("#cf-form").serialize();
            $.ajax({
              type: "POST",
              url: "send-mail.php",
              dataType: "json",
              data: form_data,
            })
              .done(function (data) {
                if (data["status"] == "success") {
                  $(".contact-message").html(
                    "<span class='sucess'>Thank you! Your message has been successfully sent. We will contact you very soon!</span>"
                  );
                }
                if (data["status"] == "error") {
                  $(".contact-message").html(
                    "<span class='error'>There was an error trying to send your message. Please try again later.</span>"
                  );
                }
              })
              .fail(function (data) {
                console.log(data);
              });
          }
        });
      });
    } else {
      $("#shots").append("<p>No shots yet!</p>");
    }
  },
});
function GetHeightCss() {
  var h =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  var w =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  var css = "";
  var $window = $(window);
  var windowsize = $window.width();
  if (windowsize > 767) {
    var pad = 0;
  } else {
    var pad = 0;
  }
  var availableheight = h - pad;
  css = ".height-one{ height: " + availableheight + "px;}";
  var cssEle = document.getElementById("heightStyle");
  if (cssEle == null) {
    var head = document.head || document.getElementsByTagName("head")[0],
      style = document.createElement("style");
    style.type = "text/css";
    style.setAttribute("id", "heightStyle");
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
  } else {
    cssEle.innerHTML = css;
  }
}
GetHeightCss();
$(window).on("resize", function () {
  GetHeightCss();
  equalheight(".equal-height > div");
});
var equalheight = function (container) {
  var currentTallest = 0,
    currentRowStart = 0,
    rowDivs = new Array(),
    $el,
    topPosition = 0;
  $(container).each(function () {
    $el = $(this);
    $($el).height("auto");
    topPosition = $el.position().top;
    if (currentRowStart != topPosition) {
      for (var currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
        rowDivs[currentDiv].height(currentTallest);
      }
      rowDivs.length = 0; // empty the array
      currentRowStart = topPosition;
      currentTallest = $el.height();
      rowDivs.push($el);
    } else {
      rowDivs.push($el);
      currentTallest =
        currentTallest < $el.height() ? $el.height() : currentTallest;
    }
    for (var currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
      rowDivs[currentDiv].height(currentTallest);
    }
  });
};
$(window).on("load", function () {
  equalheight(".equal-height > div");
  $("#loading").hide();
});
document.addEventListener("DOMContentLoaded", function () {
  new Typed(".home_title #subtitle", {
    strings: [
      "Hi, I am a UI/UX Designer and Developer.",
      "I like to do UI Designing, Animation and Prototyping.",
      "I deliver beautiful and usable designs for Websites and Apps.",
    ],
    typeSpeed: 50,
    backSpeed: 20,
    smartBackspace: true,
    loop: true,
  });
});

function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// get years

function getAge(dateString) {
  var now = new Date();
  var today = new Date(now.getYear(), now.getMonth(), now.getDate());

  var yearNow = now.getYear();
  var monthNow = now.getMonth();
  var dateNow = now.getDate();

  var dob = new Date(
    dateString.substring(6, 10),
    dateString.substring(0, 2) - 1,
    dateString.substring(3, 5)
  );

  var yearDob = dob.getYear();
  var monthDob = dob.getMonth();
  var dateDob = dob.getDate();
  var age = {};
  var ageString = "";
  var yearString = "";
  var monthString = "";
  var dayString = "";

  var yearAge = yearNow - yearDob;

  if (monthNow >= monthDob) var monthAge = monthNow - monthDob;
  else {
    yearAge--;
    var monthAge = 12 + monthNow - monthDob;
  }

  if (dateNow >= dateDob) var dateAge = dateNow - dateDob;
  else {
    monthAge--;
    var dateAge = 31 + dateNow - dateDob;

    if (monthAge < 0) {
      monthAge = 11;
      yearAge--;
    }
  }

  age = {
    years: yearAge,
    months: monthAge,
    days: dateAge,
  };

  if (age.years > 1) yearString = " years";
  else yearString = " year";
  if (age.months > 1) monthString = " months";
  else monthString = " month";
  if (age.days > 1) dayString = " days";
  else dayString = " day";

  if (age.years > 0 && age.months > 0 && age.days > 0)
    ageString =
      age.years +
      yearString +
      ", " +
      age.months +
      monthString +
      ", and " +
      age.days +
      dayString;
  else if (age.years == 0 && age.months == 0 && age.days > 0)
    ageString = "Only " + age.days + dayString + " old!";
  else if (age.years > 0 && age.months == 0 && age.days == 0)
    ageString = age.years + yearString + " old. Happy Birthday!!";
  else if (age.years > 0 && age.months > 0 && age.days == 0)
    ageString =
      age.years + yearString + " and " + age.months + monthString + " old.";
  else if (age.years == 0 && age.months > 0 && age.days > 0)
    ageString =
      age.months + monthString + " and " + age.days + dayString + " old.";
  else if (age.years > 0 && age.months == 0 && age.days > 0)
    ageString =
      age.years + yearString + " and " + age.days + dayString + " old.";
  else if (age.years == 0 && age.months > 0 && age.days == 0)
    ageString = age.months + monthString + " old.";
  else ageString = "Oops! Could not calculate age!";

  return ageString;
}
$(window).on("load", function () {
  $("#years").html(getAge("07/06/2017"));
});

//dribble
// const URL = "https://api.dribbble.com/v2/shots?access_token=";
// 5c3e531d36533b6602dbfb92d9aad8b00e5d258e748057234d423a374161df5f

// {
//     "access_token": "178c93e018c0b2feedc9811c33b69876139c6a16f5db6e1b3d182130e7e3e42f",
//     "token_type": "Bearer",
//     "scope": "public",
//     "created_at": 1630298356
// }

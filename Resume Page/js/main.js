/*=========================================================================

Author: Vivek Domadia
Version: 1.0
Design and Developed by: vivek

=========================================================================*/

$(function () {
  "use strict";

  // Define Some Elements
  var allWindow = $(window),
    body = $("body"),
    top = allWindow.scrollTop(),
    navBar = $(".nav-wrapper");

  /*------------------------------------------------
        Javascript Function for The Preloader
    --------------------------------------------------*/

  $("#preloader").delay(500).fadeOut("slow");

  /*-----------------------------------------------------
        Javascript Function To check Aniamtion support
    -------------------------------------------------------*/

  var animation = false,
    animationstring = "animation",
    keyframeprefix = "",
    domPrefixes = "Webkit Moz O ms Khtml".split(" "),
    pfx = "",
    elm = document.createElement("div");

  if (elm.style.animationName !== undefined) {
    animation = true;
  }

  if (animation === false) {
    for (var i = 0; i < domPrefixes.length; i++) {
      if (elm.style[domPrefixes[i] + "AnimationName"] !== undefined) {
        pfx = domPrefixes[i];
        animationstring = pfx + "Animation";
        keyframeprefix = "-" + pfx.toLowerCase() + "-";
        animation = true;
        break;
      }
    }
  }

  /*-----------------------------------------------------
        Javascript Function For Smooth Mouse Scrolling
    -------------------------------------------------------*/

  jQuery.scrollSpeed = function (step, speed) {
    var $document = $(document),
      $body = $("html, body"),
      option = "default",
      root = top,
      scroll = false,
      scrollY,
      view;

    if (window.navigator.msPointerEnabled) {
      return false;
    }

    jQuery.event.special.mousewheel = {
      setup: function (_, ns, handle) {
        if (ns.includes("PreventDefault")) {
          this.addEventListener("mousewheel", handle, { passive: false });
        } else {
          return false;
        }
      },
    };

    allWindow
      .on("mousewheel.PreventDefault DOMMouseScroll", function (e) {
        var deltaY = e.originalEvent.wheelDeltaY,
          detail = e.originalEvent.detail;
        scrollY = $document.height() > allWindow.height();
        scroll = true;

        if (scrollY) {
          view = allWindow.height();

          if (deltaY < 0 || detail > 0) {
            root = root + view >= $document.height() ? root : (root += step);
          }

          if (deltaY > 0 || detail < 0) {
            root = root <= 0 ? 0 : (root -= step);
          }

          $body.stop().animate(
            {
              scrollTop: root,
            },
            speed,
            option,
            function () {
              scroll = false;
            }
          );
        }

        return false;
      })
      .on("scroll", function () {
        if (scrollY && !scroll) root = top;
        if (!scroll) root = allWindow.scrollTop();
      })
      .on("resize", function () {
        if (scrollY && !scroll) view = allWindow.height();
      });
  };

  jQuery.easing.default = function (x, t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  };

  // initialize Smooth Scrolling Only in Modern browsers
  if (animation) {
    jQuery.scrollSpeed(50, 1000);
  }

  /*---------------------------------------------------------------------
        Javascript Function For Sticky Navigation Bar AND SMOOTH SCROLLING
    ----------------------------------------------------------------------*/

  // Define stikyNav Function
  function stikyNav() {
    top = allWindow.scrollTop();

    if (top >= 100) {
      navBar.addClass("nav-sticky");
    } else {
      navBar.removeClass("nav-sticky");
    }

    // SHow Also Scroll up Button
    if (top >= 1000) {
      $(".scroll-up").addClass("show-up-btn");
    } else {
      $(".scroll-up").removeClass("show-up-btn");
    }
  }

  // Select all links with hashes
  $("a.scroll").on("click", function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, "") ===
        this.pathname.replace(/^\//, "") &&
      location.hostname === this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash),
        speed = $(this).data("speed") || 800;
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");

      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          speed
        );
      }
    }
  });

  $(".scroll-up").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      900
    );
  });

  /*---------------------------------------------------------------------
        Javascript Function for Hide Navbar Dropdown After Click On Links
    -------------------------------------------------------------------*/

  var navLinks = navBar.find(".navbar-collapse ul li a");

  $.each(navLinks, function (i, val) {
    var navLink = $(this);

    navLink.on("click", function (e) {
      navBar.find(".navbar-collapse").collapse("hide");
    });
  });

  /*----------------------------------------------------------------
        Javascript Function For Change active Class on navigation bar
    -----------------------------------------------------------------*/

  var sections = $(".one-page-section"),
    navList = navBar.find("ul.navbar-nav");

  // Define ChangeClass Function
  function ChangeClass() {
    top = allWindow.scrollTop();

    $.each(sections, function (i, val) {
      var section = $(this),
        section_top = section.offset().top - 10,
        bottom = section_top + section.height();

      if (top >= section_top && top <= bottom) {
        var naItems = navList.find("li");

        $.each(naItems, function (i, val) {
          var item = $(this);
          item.find("a").removeClass("active");
        });

        navList
          .find('li [href="#' + section.attr("id") + '"]')
          .addClass("active");
      }
    });
  } // End of ChangeClass Function

  /*---------------------------------------------------
        Javascript Function FOR PARALLAX EFFECT
    ---------------------------------------------------*/

  // create variables
  var backgrounds = $(".parallax");

  function parallax() {
    // for each of background parallax element
    $.each(backgrounds, function (i, val) {
      var backgroundObj = $(this),
        backgroundObjTop = backgroundObj.offset().top,
        backgroundHeight = backgroundObj.height();

      // update positions
      top = allWindow.scrollTop();

      var yPos = (top - backgroundObjTop) / 2;

      if (yPos <= backgroundHeight + backgroundObjTop) {
        backgroundObj.css({
          backgroundPosition: "50% " + yPos + "px",
        });
      }
    });
  }

  /*------------------------------------------
      Javascript for initialize text Typer
    --------------------------------------------*/

  // initialize text Typer Only in Modern browsers
  if (animation) {
    var text = $("#home .typer-title"),
      textOne = "i'm full stack Developer",
      textTwo = "let's work together",
      textThree = "i can create awesome stuff";

    if (!!$.prototype.typer) {
      text.typer([textOne, textTwo, textThree]);
    }
  }

  /*----------------------------------------------------------------------
     Javascript Function Initialize Particules
    -----------------------------------------------------------------------*/

  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 600,
          },
        },
        color: {
          value: "#777",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#888",
          },
          polygon: {
            nb_sides: 5,
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 0.7,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 4,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#bbb",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 4,
          direction: "bottom",
          random: false,
          straight: false,
          out_mode: "out",
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
      config_demo: {
        hide_card: false,
        background_color: "#b61924",
        background_image: "",
        background_position: "50% 50%",
        background_repeat: "no-repeat",
        background_size: "cover",
      },
    });
  }

  /*------------------------------------------------------------------------
     Javascript Function for circular progress bar
    -------------------------------------------------------------------------*/

  $(document).ready(function ($) {
    function animateElements() {
      $(".progress-bar-circle").each(function () {
        var elementPos = $(this).offset().top;
        var topOfWindow = $(window).scrollTop();
        var percent = $(this).find(".circle").attr("data-percent");
        var percentage = parseInt(percent, 10) / parseInt(100, 10);
        var animate = $(this).data("animate");
        if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
          $(this).data("animate", true);
          $(this)
            .find(".circle")
            .circleProgress({
              startAngle: -Math.PI / 2,
              value: percent / 100,
              size: 100,
              thickness: 5,
              emptyFill: "#dfdfdf",
              fill: {
                color: "#FF8C32",
              },
            })
            .on("circle-animation-progress")
            .stop();
        }
      });
    }

    // Show animated elements
    animateElements();
    $(window).scroll(animateElements);
  }); //end document ready function

  /*-----------------------------------------------------------------
        Javascript Function for PROGRESS BAR LINES  SCRIPT
    ------------------------------------------------------------------*/

  var linesHead = $(".skills-section"),
    line = $(".progress-bar-line");

  //Progress Bars function
  function progressFunction(e) {
    if (linesHead.length) {
      if (!linesHead.hasClass("done")) {
        var linesHeadTop = linesHead.offset().top,
          top = allWindow.scrollTop(),
          winH = allWindow.height() - 160;

        if (top >= linesHeadTop - winH) {
          linesHead.addClass("done");
          $.each(line, function (i, val) {
            var thisLine = $(this),
              value = thisLine.data("percent"),
              progressCont = $(thisLine)
                .closest(".progress-bar-linear")
                .find(".progress-cont span");

            thisLine.css("width", value + "%");
            progressCont.html(value + "%");
          });
        }
      }
    }
  } //End progressFunction Fuction

  function scrollFunctions() {
    stikyNav();
    ChangeClass();
    parallax();
    progressFunction();
  }

  // add Event listener to window
  allWindow.on("scroll", function () {
    scrollFunctions();
  });

  /*------------------------------------------------------------------------
        Javascript Function for Validate and Submit the CONTACT Form Using AJAX
    -------------------------------------------------------------------------*/

  // Get the form.
  var form = $("#contact-form"),
    sendBtn = $("#sendBtn"),
    reg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})$/,
    inputs = $(".input-field"),
    formMessages = $("#form-message");

  function validateForm() {
    if ($(this).is("#email")) {
      var email = $(this).val(),
        res = reg.test(email);

      if (res) {
        $(".email-error").html("");
      } else {
        $(".email-error").html("Please enter a valid email.");
        return false;
      }
    } else {
      var target = $(this).attr("id"),
        targetMessage = $("." + target + "-error");

      if ($(this).val() === "") {
        if (target === "Fname")
          targetMessage.html("Please enter a valid first name.");
        else if (target === "Lname")
          targetMessage.html("Please enter a valid last name.");
        else if (target === "message")
          targetMessage.html("Please enter a valid message.");
        return false;
      } else {
        targetMessage.html(" ");
      }
    }
  } // End ValidateForm Function

  $.each(inputs, function (i, val) {
    $(this).on("blur", validateForm);
  });

  // Get the messages div.
  $(form).on("submit", function (event) {
    // Stop the browser from submitting the form.
    event.preventDefault();

    sendBtn.html("Message Sending...");
    sendBtn.attr("disabled", "disabled");
    formMessages.html("");

    const name = $("#Fname").val() + $("#Lname").val(),
      email = $("#email").val(),
      message = $("#message").val();

    const subject = `New contact from ${name}`;
    const text = `Name: ${name}\n Email: ${email}\n\n Message:\n${message}\n`;

    // Serialize the form data.
    var formData = {
      to: "domadia.vivek11@gmail.com",
      subject,
      text,
    };

    // Submit the form using AJAX.
    $.ajax({
      type: "POST",
      url: "https://mailer-vd.herokuapp.com/send-email",
      data: JSON.stringify(formData),
      contentType: "application/json; charset=utf-8",
    })
      .done(function (response) {
        // Make sure that the formMessages div has the 'success' class.
        formMessages.removeClass("error");
        formMessages.addClass("success");

        // Set the message text.
        formMessages.text("Message sent successfully.");

        // Clear the form.
        $("#Fname").val("");
        $("#Lname").val("");
        $("#email").val("");
        $("#message").val("");

        sendBtn.html("Send Message");
        sendBtn.removeAttr("disabled");
      })
      .fail(function (data) {
        // Make sure that the formMessages div has the 'error' class.
        formMessages.removeClass("success");
        formMessages.addClass("error");

        // Set the message text.
        formMessages.text("Message could not sent...!");

        sendBtn.html("Send Message");
        sendBtn.removeAttr("disabled");
      });
  });
});

// Preloader //
// $(window).on('load', function() {
//     $(".preloader").fadeOut("slow");

// });


jQuery(function($) {
 
    // Navbar Scroll Function
    var $window = $(window);
    $window.scroll(function() {
        var $scroll = $window.scrollTop();
        var $navbar = $(".navbar");
        if (!$navbar.hasClass("sticky-bottom")) {
            if ($scroll > 200) {
                $navbar.addClass("fixed-menu");
            } else {
                $navbar.removeClass("fixed-menu");
            }
        }
    });

    /*bottom menu fix*/
    if ($("nav.navbar").hasClass("sticky-bottom")) {
        var navHeight = $(".sticky-bottom").offset().top;
        $(window).scroll(function() {
            if ($(window).scrollTop() > navHeight) {
                $('.sticky-bottom').addClass('fixed-menu');
            } else {
                $('.sticky-bottom').removeClass('fixed-menu');
            }
        });
    }



    // Click Scroll Function
    $(".scroll").on('click', function(event) {
        event.preventDefault();
        $("html,body").animate({
            scrollTop: $(this.hash).offset().top
        }, 1000);
    });


    $("body").append("<a href='#' class='back-top'><i class='fa fa-angle-up'></i></a>");
    var amountScrolled = 700;
    var backBtn = $("a.back-top");
    $(window).on("scroll", function() {
        if ($(window).scrollTop() > amountScrolled) {
            backBtn.addClass("back-top-visible");
        } else {
            backBtn.removeClass("back-top-visible");
        }
    });
    backBtn.on("click", function() {
        $("html, body").animate({
            scrollTop: 0
        }, 700);
        return false;
    });

});
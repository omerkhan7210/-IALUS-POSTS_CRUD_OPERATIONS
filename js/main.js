/*-----------------------------------------------------------------------------------*/
/* 		Mian Js Start 
/*-----------------------------------------------------------------------------------*/
$(document).ready(function($) {
    "use strict"
    /*-----------------------------------------------------------------------------------*/
    /* 	LOADER
    /*-----------------------------------------------------------------------------------*/
    $("#loader").delay(500).fadeOut("slow");
    /*-----------------------------------------------------------------------------------*/
    /*		STICKY NAVIGATION
    /*-----------------------------------------------------------------------------------*/
    $(".sticky").sticky({
        topSpacing: 0
    });
    /*-----------------------------------------------------------------------------------*/
    /*	SERVICE LIST
    /*-----------------------------------------------------------------------------------*/
    $('.best-services .list').colio({
        id: 'demo_1',
        theme: 'black',
        placement: 'inside'
    });
    /*-----------------------------------------------------------------------------------*/
    /* 		HOMA MAIN SLIDER
    /*-----------------------------------------------------------------------------------*/
    $('.home-slide').flexslider({
        animation: "fade"
    });
    /*-----------------------------------------------------------------------------------*/
    /* 		Parallax
    /*-----------------------------------------------------------------------------------*/
    jQuery(document).ready(function() {
        jQuery.stellar({
            horizontalScrolling: false,
            scrollProperty: 'scroll',
            positionProperty: 'position',
        });
    });
    /*-----------------------------------------------------------------------------------*/
    /* 		WORK FILTER
    /*-----------------------------------------------------------------------------------*/
    var $container = $('.team-wrap .items');
    $container.imagesLoaded(function() {
        $container.isotope({
            itemSelector: '.item',
            layoutMode: 'fitRows'
        });
    });
    $('.filter li a').on('click', function() {
        $('.filter li a').removeClass('active');
        $(this).addClass('active');
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector
        });
        return false;
    });
    /*-----------------------------------------------------------------------------------*/
    /*	COUNTER
    /*-----------------------------------------------------------------------------------*/
    $('.counter .timer').countTo();
    /*-----------------------------------------------------------------------------------*/
    /*	CUBE PORTFOLIO
    /*-----------------------------------------------------------------------------------*/
    $('.ajax-work').cubeportfolio({
        filters: '#ajax-work-filter',
        loadMore: '#ajax-loadMore',
        loadMoreAction: 'click',
        layoutMode: 'grid',
        defaultFilter: '*',
        animationType: 'quicksand',
        gapHorizontal: 0,
        gapVertical: 0,
        gridAdjustment: '',
        caption: 'zoom',
        displayType: 'lazyLoading',
        displayTypeSpeed: 400,
        // singlePage popup
        singlePageDelegate: '.cbp-singlePage',
        singlePageDeeplinking: true,
        singlePageStickyNavigation: true,
        singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
        singlePageCallback: function(url, element) {
            // to update singlePage content use the following method: this.updateSinglePage(yourContent)
            var t = this;
            $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'html',
                    timeout: 10000
                })
                .done(function(result) {
                    t.updateSinglePage(result);
                })
                .fail(function() {
                    t.updateSinglePage('AJAX Error! Please refresh the page!');
                });
        },
    });
    /*-----------------------------------------------------------------------------------*/
    /* 	TESTIMONIAL SLIDER
    /*-----------------------------------------------------------------------------------*/
    $(".single-slide").owlCarousel({
        items: 1,
        autoplay: true,
        loop: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        singleItem: true,
        navigation: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        pagination: true,
        animateOut: 'fadeOut'
    });
    $('.testi-two').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            800: {
                items: 2
            },
            1000: {
                items: 2
            }
        }
    });
    $('.blog-slide').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            800: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
});
/*-----------------------------------------------------------------------------------*/
/*    CONTACT FORM
/*-----------------------------------------------------------------------------------*/
function checkmail(input) {
    var pattern1 = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (pattern1.test(input)) {
        return true;
    } else {
        return false;
    }
}

function proceed() {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var company = document.getElementById("company");
    var msg = document.getElementById("message");
    var errors = "";
    if (name.value == "") {
        name.className = 'error';
        return false;
    } else if (email.value == "") {
        email.className = 'error';
        return false;
    } else if (checkmail(email.value) == false) {
        alert('Please provide a valid email address.');
        return false;
    } else if (company.value == "") {
        company.className = 'error';
        return false;
    } else if (msg.value == "") {
        msg.className = 'error';
        return false;
    } else {
        $.ajax({
            type: "POST",
            url: "php/submit.php",
            data: $("#contact_form").serialize(),
            success: function(msg) {
                //alert(msg);
                if (msg) {
                    $('#contact_form').fadeOut(1000);
                    $('#contact_message').fadeIn(1000);
                    document.getElementById("contact_message");
                    return true;
                }
            }
        });
    }
};
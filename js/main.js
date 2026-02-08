/* ===================================================================
 * Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    const cfg = {
                scrollDuration : 800, // smoothscroll duration
                mailChimpURL   : ''   // mailchimp url
                };
    const $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
    const doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


   /* Preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        $("html").addClass('ss-preload');

        $WIN.on('load', function() {

            // force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');

        });
    };


   /* Mobile Menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const toggleButton = $('.header-menu-toggle');
        const nav = $('.header-nav-wrap');

        toggleButton.on('click', function(event){
            event.preventDefault();

            toggleButton.toggleClass('is-clicked');
            nav.slideToggle();
        });

        if (toggleButton.is(':visible')) nav.addClass('mobile');

        $WIN.on('resize', function() {
            if (toggleButton.is(':visible')) nav.addClass('mobile');
            else nav.removeClass('mobile');
        });

        nav.find('a').on("click", function() {

            if (nav.hasClass('mobile')) {
                toggleButton.toggleClass('is-clicked');
                nav.slideToggle(); 
            }
        });

    };

/* swiper
 * ------------------------------------------------------ */ 
const ssSwiper = function () {

    /* ----------------------------------------------------------------
     * menublock slider
     * ---------------------------------------------------------------- */
    const specialtiesSlider = function () {

        const mSlider = document.querySelector('.s-menublock__slider');
        if (!mSlider) return;

        new Swiper(mSlider, {
            slidesPerView: 1,
            loop: true,
            pagination: {
                el: '.s-menublock .swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.menublock-btn-next',
                prevEl: '.menublock-btn-prev'
            },
            breakpoints: {
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                681: {
                    slidesPerView: 2,
                    spaceBetween: 44
                },
                1101: {
                    slidesPerView: 3,
                    spaceBetween: 50
                },
                1401: {
                    slidesPerView: 3,
                    spaceBetween: 60
                }
            }
        });

    }; // end specialtiesSlider


    /* ----------------------------------------------------------------
     * testimonials slider (EDITORIAL LAYOUT)
     * ---------------------------------------------------------------- */
    const testimonialSlider = function () {

        const tSlider = document.querySelector('.s-testimonials__slider');
        if (!tSlider) return;

        new Swiper(tSlider, {
            slidesPerView: 'auto',        // 🔑 critical
            spaceBetween: 80,             // desktop gutter
            loop: true,
            pagination: {
                el: '.s-testimonials .swiper-pagination',
                clickable: true
            },
            breakpoints: {
                0: {
                    spaceBetween: 24
                },
                600: {
                    spaceBetween: 40
                },
                900: {
                    spaceBetween: 80
                }
            }
        });

    }; // end testimonialSlider


    /* init */
    specialtiesSlider();
    testimonialSlider();

}; // end ssSwiper


    /* ----------------------------------------------------------------
     * donate
     * ---------------------------------------------------------------- */


(function () {

  const donateSection = document.querySelector('.s-donate');
  if (!donateSection) return;

  let donationMode = 'once';

  const amountInput = donateSection.querySelector('#donateAmount');
  const currencySelect = donateSection.querySelector('#donateCurrency');
  const submitBtn = donateSection.querySelector('#donateSubmit');

  /* toggle */
  donateSection.querySelectorAll('.donate-toggle__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      donateSection.querySelectorAll('.donate-toggle__btn')
        .forEach(b => b.classList.remove('is-active'));

      btn.classList.add('is-active');
      donationMode = btn.dataset.mode;
    });
  });

  /* preset amounts */
  donateSection.querySelectorAll('.donate-amounts button').forEach(btn => {
    btn.addEventListener('click', () => {
      donateSection.querySelectorAll('.donate-amounts button')
        .forEach(b => b.classList.remove('is-active'));

      btn.classList.add('is-active');
      amountInput.value = btn.dataset.amount;
    });
  });

  /* demo submit */
  submitBtn.addEventListener('click', () => {
    const amount = amountInput.value;
    const currency = currencySelect.value;

    if (!amount || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    alert(
      `Demo only\n\n` +
      `Mode: ${donationMode === 'once' ? 'One-time' : 'Monthly'}\n` +
      `Amount: ${currency} ${amount}\n\n` +
      `Payment flow will be added later.`
    );
  });

})();



   /* Alert Boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 

    };


    
   /* Smooth Scrolling
    * ------------------------------------------------------ */
    const ssSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            const target = this.hash;
            const $target = $(target);
            
            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };


   /* Back to Top
    * ------------------------------------------------------ */
    const ssBackToTop = function() {
        
        const pxShow      = 500;
        const $goTopButton = $(".ss-go-top")

        // Show or hide the button
        if ($(window).scrollTop() >= pxShow) $goTopButton.addClass('link-is-visible');

        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                if(!$goTopButton.hasClass('link-is-visible')) $goTopButton.addClass('link-is-visible')
            } else {
                $goTopButton.removeClass('link-is-visible')
            }
        });
    };


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMobileMenu();
        ssSwiper();
        ssAlertBoxes();
        ssSmoothScroll();
        ssBackToTop();

    })();

})(jQuery);
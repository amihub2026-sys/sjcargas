(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });

    $('.time').datetimepicker({
        format: 'LT'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 25,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


 window.formatMoney = function (value) {
  if (!isFinite(value)) return "₹ 0";
  return "₹ " + Math.round(value).toLocaleString("en-IN");
};

window.calculateLpgSavings = function () {
  const fuelType = document.getElementById("fuelType")?.value;

  const petrolPrice = Number(document.getElementById("petrolPrice")?.value) || 0;
  const dieselPrice = Number(document.getElementById("dieselPrice")?.value) || 0;
  const lpgPrice = Number(document.getElementById("lpgPrice")?.value) || 0;
  const currentMileage = Number(document.getElementById("currentMileage")?.value) || 0;
  const lpgMileage = Number(document.getElementById("lpgMileage")?.value) || 0;
  const monthlyKm = Number(document.getElementById("monthlyKm")?.value) || 0;
  const kitCost = Number(document.getElementById("kitCost")?.value) || 0;

  if (currentMileage <= 0 || lpgMileage <= 0) {
    alert("Please enter valid mileage values");
    return;
  }

  const currentFuelPrice = fuelType === "petrol" ? petrolPrice : dieselPrice;

  const oldFuelCost = (monthlyKm / currentMileage) * currentFuelPrice;
  const lpgFuelCost = (monthlyKm / lpgMileage) * lpgPrice;
  const monthlySavings = oldFuelCost - lpgFuelCost;
  const yearlySavings = monthlySavings * 12;

  document.getElementById("oldFuelCost").innerText = formatMoney(oldFuelCost);
  document.getElementById("lpgFuelCost").innerText = formatMoney(lpgFuelCost);
  document.getElementById("monthlySavings").innerText = formatMoney(monthlySavings);
  document.getElementById("savingAmount").innerText = formatMoney(monthlySavings);
  document.getElementById("yearlySavings").innerText = formatMoney(yearlySavings);

  document.getElementById("payback").innerText =
    monthlySavings > 0 ? (kitCost / monthlySavings).toFixed(1) + " Months" : "No Savings";

  document.getElementById("fiveYearSaving").innerText = formatMoney(yearlySavings * 5);
  document.getElementById("tenYearSaving").innerText = formatMoney(yearlySavings * 10);
  document.getElementById("tenYearKm").innerText =
    (monthlyKm * 12 * 10).toLocaleString("en-IN") + " km";
};

$(window).on("load", function () {
  if (document.getElementById("fuelType")) {
    calculateLpgSavings();
  }
});



    // =========================
    // Company Timeline Slider
    // Car stops at every point
    // =========================
    const $timelineTrack = $('#timelineTrack');
    const $timelineIndicators = $('.timeline-indicator');
    const $movingRoadCar = $('#movingRoadCar');
    const $timelineSlides = $('.timeline-slide');
    const $timelineSlider = $('#roadTimelineSlider');

    if ($timelineTrack.length && $timelineIndicators.length && $timelineSlides.length && $movingRoadCar.length) {

        let currentSlide = 0;
        let currentPoint = 0;
        let pointTimer = null;

        function getSlideMarkers(slideIndex) {
            return $timelineSlides.eq(slideIndex).find('.timeline-marker');
        }

        function moveCarToMarker($marker) {
            if ($(window).width() <= 991.98) return;
            if (!$marker || !$marker.length) return;

            const sliderOffset = $timelineSlider.offset().left;
            const markerOffset = $marker.offset().left;
            const markerCenter = markerOffset - sliderOffset + ($marker.outerWidth() / 2);

            $movingRoadCar.addClass('moving');
            $movingRoadCar.css('left', markerCenter + 'px');

            setTimeout(function () {
                $movingRoadCar.removeClass('moving');
            }, 1800);
        }

        function updateIndicators(slideIndex) {
            $timelineIndicators.removeClass('active');
            $timelineIndicators.eq(slideIndex).addClass('active');
        }

        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            currentPoint = 0;

            $timelineTrack.css('transform', 'translateX(-' + (slideIndex * 100) + '%)');
            updateIndicators(slideIndex);

            setTimeout(function () {
                const $markers = getSlideMarkers(currentSlide);
                if ($markers.length) {
                    moveCarToMarker($markers.eq(0));
                }
            }, 950);
        }

        function playPointsLoop() {
            clearInterval(pointTimer);

            pointTimer = setInterval(function () {
                if ($(window).width() <= 991.98) return;

                const $markers = getSlideMarkers(currentSlide);

                if (!$markers.length) return;

                if (currentPoint < $markers.length) {
                    moveCarToMarker($markers.eq(currentPoint));
                    currentPoint++;
                } else {
                    currentSlide = (currentSlide + 1) % $timelineSlides.length;
                    $timelineTrack.css('transform', 'translateX(-' + (currentSlide * 100) + '%)');
                    updateIndicators(currentSlide);

                    currentPoint = 0;

                    setTimeout(function () {
                        const $newMarkers = getSlideMarkers(currentSlide);
                        if ($newMarkers.length) {
                            moveCarToMarker($newMarkers.eq(0));
                            currentPoint = 1;
                        }
                    }, 950);
                }
            }, 2500);
        }

        $timelineIndicators.each(function (index) {
            $(this).on('click', function () {
                goToSlide(index);
                playPointsLoop();
            });
        });

        $(window).on('resize', function () {
            if ($(window).width() > 991.98) {
                const $markers = getSlideMarkers(currentSlide);
                if ($markers.length) {
                    const safeIndex = Math.max(0, Math.min(currentPoint - 1, $markers.length - 1));
                    moveCarToMarker($markers.eq(safeIndex));
                }
            }
        });

        goToSlide(0);
        playPointsLoop();
    }

})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const filter = this.getAttribute("data-filter");

            galleryItems.forEach(item => {
                const category = item.getAttribute("data-category");

                if (filter === "all" || category === filter) {
                    item.classList.remove("hide-item");
                } else {
                    item.classList.add("hide-item");
                }
            });
        });
    });
});

/* =========================
   LIGHTBOX
========================= */
function openLightbox(imageSrc) {
    document.getElementById("galleryLightbox").style.display = "flex";
    document.getElementById("lightboxImg").src = imageSrc;
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    document.getElementById("galleryLightbox").style.display = "none";
    document.getElementById("lightboxImg").src = "";
    document.body.style.overflow = "auto";
}
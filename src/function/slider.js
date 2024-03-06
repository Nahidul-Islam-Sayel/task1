jQuery(document).ready(function($) {
    let currentSlide = 0;
    const slidesCount = $('.slide').length;

    function showSlide(index) {
        $('.slides').css('transform', `translateX(-${index * 100}%)`);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slidesCount;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slidesCount) % slidesCount;
        showSlide(currentSlide);
    }

    $('.next-button').on('click', nextSlide);
    $('.prev-button').on('click', prevSlide);

    // Automatically change slide every 5 seconds
    setInterval(function() {
        nextSlide();
    }, 5000);
});

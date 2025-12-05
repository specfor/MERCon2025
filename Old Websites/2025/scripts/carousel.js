$('.owl-carousel').owlCarousel({
    stagePadding: 200,
    loop:true,
    margin:10,
    nav:true,
    items:1,
    lazyLoad: true,
    autoplay:true,
    autoplayTimeout:3000,
    navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
  responsive:{
        0:{
            items:1,
            stagePadding: 60
        },
        600:{
            items:1,
            stagePadding: 100
        },
        1000:{
            items:1,
            stagePadding: 200
        },
        1200:{
            items:1,
            stagePadding: 250
        },
        1400:{
            items:1,
            stagePadding: 300
        },
        1600:{
            items:1,
            stagePadding: 350
        },
        1800:{
            items:1,
            stagePadding: 400
        }
    }
    
})
$(document).keydown(function(event) {
    if (event.keyCode == 37) { // left arrow key
        $('.owl-carousel').trigger('prev.owl.carousel');
    }
    else if (event.keyCode == 39) { // right arrow key
        $('.owl-carousel').trigger('next.owl.carousel');
    }
});
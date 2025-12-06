window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > document.getElementById("hero").offsetTop || document.documentElement.scrollTop > document.getElementById("hero").offsetTop+100) {
        document.getElementById("scroll-to-top-button").classList.add("show");
    } else {
        document.getElementById("scroll-to-top-button").classList.remove("show");
    }
}

document.getElementById("scroll-to-top-button").onclick = function(event) {
	event.preventDefault();
    smoothScrollTo(document.getElementById("hero"));
};

function smoothScrollTo(target, duration = 1000) {
    const startPosition = window.pageYOffset;
    const distance = target.getBoundingClientRect().top;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) {
            startTime = currentTime;
        }
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
            return c / 2 * t * t + b;
        }
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}
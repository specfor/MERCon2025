function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const scrollOffset = section.getBoundingClientRect().top - 50;
        window.scrollBy({
            top: scrollOffset,
            behavior: 'smooth'
        });
    }
}
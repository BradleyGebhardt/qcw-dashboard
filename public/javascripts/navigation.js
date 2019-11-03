$(document).ready(() => {
    const navGroups = $('.nav-group');
    const navItems = navGroups.children();
    const sections = $('.section');
    // navItems.toggleClass('nav-group-active');
    $('.section.section-overall').toggleClass('display');

    navGroups.on('click', function (event) {
        // console.log($(event.target).children());
        $(event.target).children('.nav-group-item').toggleClass('nav-group-active');
        $(event.target).children('.nav-arrow').toggleClass('nav-arrow-active');
    });

    navItems.on('click', function () {
        sections.removeClass('display');
        let section = $(`.section.section-${$(this).data('target')}`);
        section.toggleClass('display');
    });
});
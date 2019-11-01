$(document).ready(() => {
    let navGroups = $('.nav-group');
    let navItems = navGroups.children();
    navItems.toggleClass('nav-group-active');

    navGroups.on('click', function (event) {
        // console.log($(event.target).children());
        $(event.target).children().toggleClass('nav-group-active');
    });
});
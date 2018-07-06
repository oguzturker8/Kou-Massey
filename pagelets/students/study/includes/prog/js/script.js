jQuery(function ($) {
    //$('.read-more').readmore();

    $('.revealable').bind('click', '.revealer', function (event) {
        $(event.delegateTarget).toggleClass('revealed');
    });

    $('a.hrefCurrentProgramme').click(function (e) {
        e.preventDefault();
        $(this).parent().first().children("ul").slideToggle("slow");
        e.stopPropagation();
    });

    $('a.hrefNoEnrolmentLink').click(function(e){
        e.preventDefault();
        alert("Enrolment link is not currently available.");
    });

});

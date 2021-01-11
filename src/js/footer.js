$(function() {
    $('.videobox>div>img').on('mouseenter', function() {
        console.log(1);
        $('.videobox i').addClass('videobtn')
    });
    $('.videobox>div>img').on('mouseleave', function(ev) {
        $('.videobox i').removeClass('videobtn');
        console.log(2);
    });

    $('.vx-down').on('mouseenter', function() {
        $('.vx-download').removeClass('hide').addClass('show');
    })
    $('.vx-down').on('mouseleave', function() {
        $('.vx-download').removeClass('show').addClass('hide');
    })
});
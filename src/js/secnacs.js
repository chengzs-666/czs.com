$(function() {
    let btns = $('.midbar li');

    btns.on('mouseenter', function() {
        $(this).addClass('active').siblings().removeClass('active');
        let index = btns.index(this);
        if (index !== 6 && index !== 7) {
            $('.botbar').addClass('show');
            $('.botbar ul').eq(index).removeClass('hide').addClass('show');
        }
    })
    btns.on('mouseleave', function() {
        $('.botbar').removeClass('show').addClass('hide');
        $('.botbar ul').removeClass('show').addClass('hide');
    })
})
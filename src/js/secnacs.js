$(function() {
    let btns = $('.midbar li');
    let oli = $('.banner-list>li');

    btns.on('mouseenter', function() {
        $(this).addClass('active').siblings().removeClass('active');
        let index = btns.index(this);
        if (index !== 6 && index !== 7) {
            $('.botbar ul').eq(index).removeClass('hide').addClass('show');

            $('.botbar').removeClass('hide').addClass('show').animate({
                height: 204
            }, 200, function() {
                console.log('yes');
            })
        }
    })

    btns.on('mouseleave', function() {
        $('.botbar ul').removeClass('show').addClass('hide');
        $('.botbar').animate({
            height: 0
        }, 300, function() {
            console.log('no');
        }).removeClass('show').addClass('hide');
    })
})
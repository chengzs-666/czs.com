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


    // $('.banner-list').on('mouseenter', function(ev) {
    //     console.log(ev.target.nodeName)
    //     switch (ev.target.nodeName) {
    //         case 'A':
    //             console.log(1);
    //             break;
    //     }
    // })
    oli.on('mouseenter', function() {
        $('.banner-nav').removeClass('hide').addClass('show');
        let index = oli.index(this);
        $('.banner-nav>li').eq(index).removeClass('hide').addClass('show');
    })
    oli.on('mouseleave', function() {
        let index = oli.index(this);
        $('.banner-nav>li').eq(index).removeClass('show').addClass('hide')
        $('.banner-nav').removeClass('show').addClass('hide');
    })
})
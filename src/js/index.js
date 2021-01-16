$.ajax({
    type: "get",
    url: "../../interface/getData.php",
    dataType: "json",
    success: function(res) {
        // console.log(res);
        let temp = '';
        res.forEach((el, i) => {
            let pic = JSON.parse(el.picture);
            temp += `<li class="item">
            <a href="./product.html?id=${el.id}">
                <img src="../${pic[0].src}" alt=" ">
                <p>${el.title}</p>
                <p>${el.titlesec.slice(0,15)+' ...'}</p>
                <span>${el.oldprice}</span>
            </a>
        </li>`;
        })
        $('#itemlist').append(temp)
    }
});



$(function() {
    let shop = cookie.get('shop') || null;
    if (shop) {
        shop = JSON.parse(shop)
        $('#goods').html(shop.length)
        $('.buycar').html('去购物车结算')
    }
    $("img.lazy").lazyload({  effect:   "fadeIn"  });
    $('.lista').each(function() {
        $(this).on('mouseenter', function() {
            $('.aaa').eq($(this).index()).removeClass('hide').addClass('show');
        })
        $(this).on('mouseleave', function() {
            $('.aaa').eq($(this).index()).removeClass('show').addClass('hide');
        })
    })

    let oli = document.querySelectorAll('.smart>.titlebox li');
    for (let i = 0; i < oli.length; i++) {
        oli[i].addEventListener('mouseenter', function() {
            $(this).addClass('active').siblings().removeClass('active');
            $('#sellbox').children().eq(i).siblings().removeClass('show').addClass('hide');
            $('#sellbox').children().eq(i).removeClass('hide').addClass('show');
        })
    }


    futuer = new Date(2021, 1, 15, 20, 0, 0);
    setInterval(function() {
        let now = new Date();
        let s = parseInt((futuer - now) / 1000);
        let hour = parseInt(s % 86400 / 3600);
        let min = parseInt(s % 3600 / 60);
        let sec = parseInt(s % 60);

        sec = '0' + sec;
        sec = sec.slice(-2, );
        min = '0' + min;
        min = min.slice(-2, );
        hour = '0' + hour;
        hour = hour.slice(-2, );
        $('#hour').html(hour)
        $('#min').html(min)
        $('#sec').html(sec)
            // console.log(sec)
    }, 1000)


})
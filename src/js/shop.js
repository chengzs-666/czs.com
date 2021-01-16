let isLogined = cookie.get('isLogined') || null;
// console.log(isLogined);
if (!isLogined) {
    if (confirm('账号未登录，是否登录')) {
        location.href = './login.html'
    }
}
let shop = cookie.get('shop');
if (shop) {
    shop = JSON.parse(shop);
    let ids = shop.map(el => el.id).join();

    $.ajax({
        type: 'get',
        url: '../../interface/getGoods.php',
        data: {
            ids: ids
        },
        dataType: 'json',
        success: function(res) {
            let goodssum = 0;
            res.forEach(el => {
                let picture = JSON.parse(el.picture);

                let arr = shop.filter(val => {
                    return val.id == el.id
                })
                let temp = `
            <li>
            <input type="checkbox" class="haspicked">
            <div class="imgbox"><img src="../${picture[0].src}" alt=""></div><span class="p-title">${el.title}</span><span class="p-price">${parseFloat(el.newprice)}</span>
            <div class="p-sum">
                <i class="numD">-</i><input type="text" value="${arr[0].num}"><i class="numU">+</i>
            </div><span class="p-total">${arr[0].num*parseFloat(el.newprice)}</span>
            <i class="p-del">X</i>
        </li>
            `;
                $('#itemlist').append(temp);
                goodssum += Number(arr[0].num)
            })
            $('#goodssum').html(goodssum)

        }

    })
}


$(function() {
    let username = cookie.get('username');
    let isLogined = cookie.get('isLogined') || null;
    console.log(isLogined)
    if (isLogined) {
        $('#username').html(username)
    };

    $('#loginout').on('click', function() {
        cookie.remove('isLogined')
        cookie.remove('username')
        cookie.remove('password')
    })

    $('#itemlist').on('click', function(ev) {
        let all = document.getElementById('all');
        let chks = document.querySelectorAll('.haspicked');
        let et = ev.target
        console.log(et.className)
        switch (et.className) {
            case 'all':
                chks.forEach(el => el.checked = all.checked);
                $('#picksum').html()
                let price_total = 0;
                let num_total = 0;
                $('.p-total').each(function() {
                    price_total += Number($(this).html())
                })
                $('.p-sum').children('input').each(function() {
                        num_total += Number($(this).val())
                    })
                    // console.log(price_total)
                    // console.log(num_total)

                all.checked ? $('#picksum').html(num_total) : $('#picksum').html(0);
                all.checked ? $('#pickprice').html(price_total) : $('#pickprice').html('0');
                break;
            case 'haspicked':
                let picks = document.querySelectorAll('.haspicked');
                picks = Array.from(picks)
                console.log(picks)
                let res = picks.some(function(el, i) {
                    return el.checked
                })
                console.log(res)
                break;
            case 'numD':
                $(et).next('input').val() >= 2 ? $(et).next('input').val(Number($(et).next('input').val()) - 1) : $(et).next('input').val(1);

                console.log($(et).parent('.p-sum').prev('.p-price').html());
                if ($(et).parent('.p-sum').next('span').html() == $(et).parent('.p-sum').prev('.p-price').html()) {
                    $(et).parent('.p-sum').next('span').html($(et).parent('.p-sum').prev('.p-price').html())
                } else if ($(et).parent('.p-sum').next('span').html())


                    $(et).parent('.p-sum').next('span').html() != $(et).parent('.p-sum').prev('.p-price').html() ? $(et).parent('.p-sum').next('span').html($(et).parent('.p-sum').next('span').html() - $(et).parent('.p-sum').prev('.p-price').html()) : $(et).parent('.p-sum').next('span').html($(et).parent('.p-sum').prev('.p-price').html());
                break;
            case 'numU':
                $(et).prev('input').val() <= 99 ? $(et).prev('input').val(Number($(et).prev('input').val()) + 1) : $(et).prev('input').val(100);
                break;
            case 'p-del':
                $(et).parent('li').remove();
                break;
        }
    })

});









function addgoods(id, price, num) {
    let shop = cookie.get('shop');
    let goods = {
        id,
        price,
        num
    };

    if (shop) {
        shop = JSON.parse(shop);

        if (shop.some(elm => elm.id == id)) {

            shop.forEach(el => {
                el.id == id ? el.num = num : null;
            });
        } else {
            shop.push(goods);
        }

    } else {
        shop = [];
        shop.push(goods);
    }

    cookie.set('shop', JSON.stringify(shop), 1);

}
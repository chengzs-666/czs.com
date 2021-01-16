let id = location.search.slice(1).split('=')[1];
$.ajax({
    type: 'get',
    url: '../../interface/getItem.php',
    data: {
        id: id
    },
    dataType: 'json',
    success: function(res) {
        $('.banner-title').append(res.title);
        $('.main-title').append(res.title);
        $('.main-titlesec').append(res.titlesec);
        $('#newprice').append(parseFloat(res.newprice));
        $('#oldprice').append(res.oldprice);
        $('#num').append(res.num);
        let details = JSON.parse(res.details);
        $('.imgbox').append(`
            <img src="../${details[0].src}" alt="${details[0].alt}">
        `);
        $('.detailbox').append(`
            <img src="../${details[1].src}" alt="${details[1].alt}">
            <img src="../${details[2].src}" alt="${details[2].alt}">
            <img src="../${details[3].src}" alt="${details[3].alt}">
        `);
        let maxnum = res.num;
        let usernum;
        $('#addbtn').on('click', function(ev) {
            if (ev.preventDefault) {
                ev.preventDefault();
            } else {
                ev.returnValue = false;
            }
            usernum = $('#usernum').val();
            console.log(maxnum)
            console.log(usernum)
            if (Number(usernum) < 1) {
                alert('请输入正确的商品数量！');
            } else if (Number(usernum) > Number(maxnum)) {
                alert('请输入正确的商品数量！');
            } else {
                let shop = cookie.get('shop');
                let newprice = $('#newprice').html()

                let product = {
                    id: id,
                    price: newprice,
                    num: usernum
                };

                if (shop) {
                    shop = JSON.parse(shop);
                    if (shop.some(elm => elm.id == id)) {
                        shop.forEach(el => {
                            el.id == id ? el.num = usernum : null;
                        });
                    } else {
                        shop.push(product);
                    }

                } else {
                    shop = [];
                    shop.push(product);
                }

                cookie.set('shop', JSON.stringify(shop), 1);
                let sum = JSON.parse(cookie.get('shop')).length;

                $('#shopsum').html(sum)
                alert('商品加入购物车成功！')


                shop = cookie.get('shop') || null;
                if (shop) {
                    shop = JSON.parse(shop)
                    $('#goods').html(shop.length)
                }


            }


        });

    }
})

function addgoods(id, price, num) {
    let shop = cookie.get('shop');
    let goods = {
        id: id,
        price: price,
        num: usernum
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

$(function() {

    shop = cookie.get('shop') || null;
    if (shop) {
        shop = JSON.parse(shop)
        $('#goods').html(shop.length)
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
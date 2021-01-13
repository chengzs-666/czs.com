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

        $('#addbtn').on('click', function(ev) {
            if (ev.preventDefault) {
                ev.preventDefault();
            } else {
                ev.returnValue = false;
            }
            let num = $('input[type="number"]').val();
            if (num < 1) {
                alert('请输入正确的商品数量！');
                return;
            } else {
                alert('商品加入购物车成功！')
            }
            let shop = cookie.get('shop');
            let product = {
                id: id,
                price: newprice,
                num: num
            };

            if (shop) {
                shop = JSON.parse(shop);
                if (shop.some(elm => elm.id == id)) {
                    shop.forEach(el => {
                        el.id == id ? el.num = num : null;
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

        });

    }
})
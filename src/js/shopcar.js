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
                    // console.log(arr[0]);

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
    console.log(username)
    $('#username').html(username);
    $('#loginout').on('click', function() {
        cookie.remove('isLogined')
    })



    let all = document.getElementById('all');

    $('#itemlist').on('click', function(ev) {
        console.log(ev.target)
            // console.log(all)
        if (ev.target == all) {
            let picknum = 0;
            let pickprice = 0;
            let checkboxs = document.querySelectorAll('input[type="checkbox"]:not(#all)');
            // console.log(checkboxs)
            checkboxs.forEach(el => {
                el.checked = all.checked;
                picknum += parseInt(el.parentNode.childNodes[7].childNodes[2].value);
                pickprice += parseInt(el.parentNode.childNodes[8].innerHTML);
            })
            $('#picksum').html() == '0' ? $('#picksum').html(picknum) : $('#picksum').html('0');
            $('#pickprice').html() == '0' ? $('#pickprice').html(pickprice) : $('#pickprice').html('0');
        }
        // else if (ev.target.className == 'p-del') {
        //     ev.target.parentNode.remove()
        // }
        let nownum, nowprice;
        switch (ev.target.className) {
            case 'p-del':
                ev.target.parentNode.remove();
                break;
            case 'numD':
                nownum = ev.target.nextSibling.value - 1;
                nowprice = ev.target.parentNode.previousSibling.previousSibling.textContent;
                nownum < 2 ? nownum = 1 : null;
                ev.target.nextSibling.value = nownum;
                console.log(nownum, nowprice)
                ev.target.parentNode.nextSibling.innerHTML = nownum * nowprice;

                $('#goodssum').html($('#goodssum').html() - 1);
                $('#pickprice').html() - 1 < 0 ? null : $('#pickprice').html($('#pickprice').html() - nowprice);

                break;
            case 'numU':
                nownum = Number(ev.target.previousSibling.value) + 1;
                nowprice = ev.target.parentNode.previousSibling.previousSibling.textContent;
                nownum > 99 ? nownum = 99 : null;
                ev.target.previousSibling.value = nownum;
                console.log(nownum, nowprice)
                ev.target.parentNode.nextSibling.innerHTML = nownum * nowprice;
                $('#goodssum').html(parseInt($('#goodssum').html()) + 1)

                $('#pickprice').html() == 0 ? null :
                    $('#pickprice').html(parseFloat($('#pickprice').html()) + parseFloat(nowprice))
                break;
            case 'haspicked':
                let _thisprice = parseFloat(ev.target.parentNode.childNodes[8].innerHTML);
                console.log(_thisprice)
                let _oldpick = parseFloat($('#pickprice').html());
                console.log(_oldpick)
                ev.target.checked ? $('#pickprice').html(_oldpick + _thisprice) : $('#pickprice').html(_oldpick - _thisprice);
                break;
        }
    })
});
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
            <li class="${el.id}">
            <input type="checkbox" class="haspicked">
            <div class="imgbox"><img src="../${picture[0].src}" alt=""></div><span class="p-title">${el.title}</span><span class="p-price">${parseFloat(el.newprice)}</span>
            <div class="p-sum">
                <i class="numD">-</i><input type="text" value="${arr[0].num}" disabled><i class="numU">+</i>
            </div><span class="p-total">${arr[0].num*parseFloat(el.newprice)}</span>
            <i class="p-del">X</i>
        </li>
            `;
                $('#itemlist').append(temp);
                goodssum += Number(arr[0].num)
            })
            $('#goodssum').html(goodssum)

            $('#itemlist').on('click', function(ev) {
                let all = document.getElementById('all');
                let chks = document.querySelectorAll('.haspicked');
                let et = ev.target
                console.log(et.className)
                let _thisid;
                let pp;
                let nownum = 0;
                let price_total = 0;
                let count = 0;
                switch (et.className) {
                    case 'all':
                        let goodnum, goodprice;
                        chks.forEach(function(el) {
                            el.checked = all.checked;
                            if (el.checked) {

                                goodnum = parseInt(el.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.childNodes[2].value);
                                goodprice = parseInt(el.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML);
                                nownum += goodnum;
                                price_total += goodprice;
                                console.log(nownum, price_total)
                            }
                        });
                        $('#goodssum').html() == '0' ? $('#goodssum').html(nownum) : null;
                        $('#picksum').html(nownum);
                        $('#pickprice').html(price_total);
                        break;
                    case 'haspicked':
                        console.log(chks.length);
                        chks.forEach(function(el) {
                            if (el.checked) {
                                count += 1
                            }
                        })
                        count === chks.length ? all.checked = true : all.checked = false;
                        $(et).prop('checked') ? $('#picksum').html(Number($('#picksum').html()) + Number($(et).siblings('.p-sum').children('input').val())) : $('#picksum').html(Number($('#picksum').html()) - Number($(et).siblings('.p-sum').children('input').val()));
                        $(et).prop('checked') ? $('#pickprice').html(Number($('#pickprice').html()) + Number($(et).siblings('.p-total').html())) : $('#pickprice').html(Number($('#pickprice').html()) - Number($(et).siblings('.p-total').html()));
                        break;
                    case 'numD':
                        _thisid = et.parentNode.parentNode.className;
                        pp = shop.filter(el => el.id == _thisid);
                        console.log(pp[0])
                        if ($(et).next('input').val() == "1") {
                            $(et).next('input').val(1);
                        } else {
                            $(et).next('input').val(Number($(et).next('input').val()) - 1);
                            addgoods(_thisid, pp[0].price, Number($(et).next('input').val()))
                        }
                        nownum = Number($(et).next('input').val())
                        price_total = pp[0].price * nownum;
                        $(et).parent('.p-sum').next('span').html(price_total);
                        if (et.parentElement.parentElement.children[0].checked) {
                            console.log($(et).siblings('input').val())
                            if ($(et).siblings('input').val() != '1') {
                                $('#picksum').html(Number($('#picksum').html()) - 1)
                                $('#goodssum').html(Number($('#goodssum').html()) - 1)
                                $('#pickprice').html(Number($('#pickprice').html()) - Number($(et).parent().prev('.p-price').html()))
                            }
                        } else {
                            if ($(et).siblings('input').val() != '1') {
                                $('#goodssum').html(Number($('#goodssum').html()) - 1)
                            }
                        }
                        break;
                    case 'numU':
                        _thisid = et.parentNode.parentNode.className;
                        pp = shop.filter(el => el.id == _thisid);
                        console.log(pp[0])
                        if ($(et).prev('input').val() == '99') {
                            $(et).prev('input').val(99);
                        } else {
                            $(et).prev('input').val(Number($(et).prev('input').val()) + 1);
                            addgoods(_thisid, pp[0].price, Number($(et).prev('input').val()))
                        }
                        nownum = Number($(et).prev('input').val())
                        price_total = pp[0].price * nownum;
                        $(et).parent('.p-sum').next('span').html(price_total);

                        if (et.parentElement.parentElement.children[0].checked) {
                            console.log($(et).siblings('input').val())
                            if ($(et).siblings('input').val() != '99') {
                                $('#picksum').html(Number($('#picksum').html()) + 1)
                                $('#goodssum').html(Number($('#goodssum').html()) + 1)
                                $('#pickprice').html(Number($('#pickprice').html()) + Number($(et).parent().prev('.p-price').html()))
                            }
                        } else {
                            if ($(et).siblings('input').val() != '99') {
                                $('#goodssum').html(Number($('#goodssum').html()) + 1)
                            }
                        }
                        break;
                    case 'p-del':

                        let bool = $(et).siblings('.haspicked').prop('checked');
                        if (bool) {
                            console.log($(et).prev('.p-total').html())
                            console.log($(et).prevAll('.p-sum').children('input').val())
                            $('#goodssum').html(Number($('#goodssum').html()) - $(et).prevAll('.p-sum').children('input').val());
                            $('#picksum').html(Number($('#picksum').html()) - $(et).prevAll('.p-sum').children('input').val());



                            // $(et).parent('li').remove();
                        }
                        break;
                }
            })

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
        cookie.remove('shop')
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

// function rmgoods(id) {
//     let shop = cookie.get('shop');
//     shop = shop.parse(shop);
//     console.log(shop);
// }
// rmgoods('10000001');
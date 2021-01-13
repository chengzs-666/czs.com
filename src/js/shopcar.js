let shop = cookie.get('shop');
if (shop) {
    shop = JSON.parse(shop);
    let ids = shop.map(el => el.id).join()

    $.ajax({
        type: 'get',
        url: '../../interface/getGoods.php',
        data: {
            ids: ids
        },
        dataType: 'json',
        success: function(res) {
            res.forEach(el => {
                let picture = JSON.parse(el.picture)
                let temp = `
            <li>
            <input type="checkbox" class="haspicked">
            <div class="imgbox"><img src="../${picture[0].src}" alt=""></div><span class="p-title">${el.title}</span><span class="p-price">${parseFloat(el.newprice)}</span>
            <div class="p-sum">
                <i>-</i><input type="text"><i>+</i>
            </div><span class="p-total">9.9元</span>
            <i class="p-del">X</i>
        </li>
            `;
                $('#itemlist').append(temp);
            })
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
        // console.log(ev.target)
        // console.log(all)
        if (ev.target == all) {
            let checkboxs = document.querySelectorAll('input[type="checkbox"]:not(#all)');
            // console.log(checkboxs)
            checkboxs.forEach(el => {
                el.checked = all.checked
            })
        } else if (ev.target.className == 'p-del') {
            ev.target.parentNode.remove()
        }
    })
});
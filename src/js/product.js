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
        $('#newprice').append(res.newprice);
        $('#oldprice').append(res.oldprice);
        $('#num').append(res.num);
        console.log(res);
    }
})
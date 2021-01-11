$(function() {
    let len = $('.sallboxs ul li').length - 3;
    let _index = 1;

    $('.secsallprev').on('click', function() {
        if (_index !== 1) {
            $('.sallboxs ul').animate({
                left: '+=248'
            }, 300, function() {
                _index -= 1
                console.log(_index)
            })
        }
    })

    $('.secsallnext').on('click', function() {
        if (_index !== len) {
            $('.sallboxs ul').animate({
                left: '-=248'
            }, 300, function() {
                _index += 1
                console.log(_index)
            })
        }
    })

})
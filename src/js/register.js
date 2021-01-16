$(function() {
    console.log($('#phone').val());
    console.log($('#address').val());
    $('#address').on('change', function() {
        $('#phone').val($('#address').val())
        console.log(1)
    })
    $('#phone').on('change', function() {
        $('#address').val($('#phone').val())
        console.log(2)
    })
});
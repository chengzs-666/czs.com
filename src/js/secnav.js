window.onload = function() {
    let midbar = document.querySelectorAll('.midbar li');
    let botbar = document.querySelector('.botbar');
    midbar.forEach((el) => {
        el.addEventListener('mouseenter', function() {
            botbar.classList.remove('hide');
            botbar.classList.add('show');
        })
        el.addEventListener('mouseleave', function() {
            botbar.classList.remove('show');
            botbar.classList.add('hide');
        })

    })
};
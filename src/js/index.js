$.ajax({
    type: "get",
    url: "../../interface/getData.php",
    dataType: "json",
    success: function(res) {
        console.log(res);
        let temp = '';
        res.forEach((el, i) => {
            let pic = JSON.parse(el.picture);
            temp += `<li class="item">
            <a href="./product.html?id=${el.id}">
                <img src="../${pic[0].src}" alt=" ">
                <p>${el.title}</p>
                <p>${el.titlesec.slice(0,15)+' ...'}</p>
                <span>${el.oldprice}</span>
            </a>
        </li>`;
        })
        $('#itemlist').append(temp)
    }
});
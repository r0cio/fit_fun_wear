window.onload = function () {
    let colorSelectMobile = document.getElementsByClassName("color-mobile")[0];
    let colorSelectDesk = document.getElementsByClassName("color-desk")[0];
    let imgMobile = document.getElementsByClassName("img-mob")[0];    
    let imgDesktop = document.getElementsByClassName("img-desk")[0];

    /* console.log(imgMobile);
    console.log(imgDesktop);
    console.log(colorSelectMobile);
    console.log(colorSelectDesk); */

    colorSelectMobile.addEventListener("change", function (e) {
        alert("cambio");
        imgMobile.src = "/img/products/default-image.png";
    });

    colorSelectDesk.addEventListener("change", function (e) {
        alert("cambio");
        imgDesktop.src = "/img/products/default-image.png";
    })
}
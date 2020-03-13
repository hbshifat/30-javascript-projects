"use strict";

window.onload = () => {
    if (document.addEventListener) {
        document.addEventListener("click", haldleChangeProductColor);
    } else {
        docoment.attachEvent("onclick", haldleChangeProductColor); // ie support
    }

    function haldleChangeProductColor(event) {
        const Event = event || window.event;
        const Target = Event.target || Event.srcElement;
        const AllColors = [...document.querySelectorAll(".product-color")];
        if (Target.className.match(/product-color/)) {
            activeColor(AllColors, Target);
            changeProductPicAndColor(Target.dataset);
        }
    }

    function activeColor(elements, target) {
        // remove active class
        elements.map(element => {
            element.classList.remove("active");
        });

        // add active class to target element
        target.classList.add("active");
    }

    function changeProductPicAndColor({ color, pic }) {
        const body = document.body;
        const imageContainer = document.querySelector(".product--pics");
        const priceTag = document.querySelector(".product-price");
        const productButton = document.querySelector(".product-button");

        body.style.background = color;
        imageContainer.style.backgroundImage = pic;
        priceTag.style.color = color;
        productButton.style.color = color;
    }
};

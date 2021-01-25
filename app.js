let current = 0;
let target = 0;
let ease = 0.1;

let windowWidth, containerHeight, imageHeight, skewDiff;

let container = document.querySelector('.container');
let images = Array.from(document.querySelectorAll('.img_wrap'));
console.log(images)

images.forEach((image, idx) =>{
    image.style.backgroundImage = `url(./images/${idx + 1}.jpeg)`
})

function lerp(start, end, t){
    return start * (1 - t) + end * t;
}

function setTransform(el, transform){
    el.style.transform = transform;
}

function setupAnimation(){
    windowWidth = window.innerWidth;
    containerHeight = container.getBoundingClientRect().height;
    imageHeight = containerHeight / (windowWidth > 760 ? images.length / 2 : images.length);

    document.body.style.height = `${containerHeight}px`;
    smoothScroll()
}

function smoothScroll(){
    current = lerp(current, target, ease);
    current = parseFloat(current.toFixed(2));
    target = window.scrollY
    skewDiff = (target - current) * .015
    setTransform(container, `translateY(${-current}px) skewY(${skewDiff}deg) `);
    updateImages()
    requestAnimationFrame(smoothScroll)
}

function updateImages(){
    let ratio = current / imageHeight;
    let intersectioRatioIndex, intersectionRatioValue;

    images.forEach((image, idx) =>{
        intersectioRatioIndex = windowWidth > 760 ? parseInt(idx / 2) : idx;
        intersectionRatioValue = ratio - intersectioRatioIndex;
        setTransform(image, `translateY(${intersectionRatioValue * 70}px)`)

    })
}


setupAnimation()
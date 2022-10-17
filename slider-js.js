let images = document.querySelectorAll('.slider__img');
let sliderLine = document.querySelector('.slider__line');
let dots = document.querySelectorAll('.dots__d');

let dotIndex = 0;
let position = 0;
let startPos = 0;
let width;

let next = document.querySelector('.btn__next');
let prev = document.querySelector('.btn__prev');

function init() {
    width = document.querySelector('.slider').offsetWidth;
    sliderLine.style.width = width * images.length + 'px';
    
    for (let img of images) {
        img.style.width = width + 'px';
        img.style.height = 'auto';
    }
}

init();

window.addEventListener('resize', init);

next.addEventListener('click', function next () {
    if (position < ((images.length - 1) * width)) {
        startPos = dotIndex * width;
        
        let start = Date.now();
        let timer = setInterval(() => {
            let timePassed = Date.now() - start;
            if (timePassed >= 1500) {
                clearInterval(timer);
                this.addEventListener('click', next);
            }
            position = startPos + timePassed * width / 1500;
            sliderLine.style.left = -position  + 'px'; 
        }, 20);
        
        dotIndex++;
    }
    else { // 5 ---> 1
        let lastSlide = sliderLine.lastElementChild.cloneNode(true);
        lastSlide.style.width = width + 'px';
        lastSlide.style.height = 'auto';
        sliderLine.prepend(lastSlide);

        let start = Date.now();
        let timer = setInterval(() => {
            let timePassed = Date.now() - start;
            if (timePassed >= 1500) {
                clearInterval(timer);
                this.addEventListener('click', next);
            }
            position = timePassed * width / 1500;
            sliderLine.style.left = -position  + 'px'; 
        }, 20);

        setTimeout(function() {
            lastSlide.remove();                
            position = 0;
            sliderLine.style.left = -position  + 'px';
        }, 1500);
        
        dotIndex = 0;
    }
    ChosenSlide(dotIndex);
    this.removeEventListener('click', next);
});

prev.addEventListener('click', function prev() {
    if (position > 0) {
        startPos = dotIndex * width;

        let start = Date.now();
        let timer = setInterval(() => {
            let timePassed = Date.now() - start;
            if (timePassed >= 1500) {
                clearInterval(timer);
                this.addEventListener('click', prev);
            }
            position = startPos - timePassed * width / 1500;
            sliderLine.style.left = -position  + 'px'; 
        }, 20);
        dotIndex--;
    }
    else { // 1 ---> 5
        let firstSlide = sliderLine.firstElementChild.cloneNode(true);
        firstSlide.style.width = width + 'px';
        firstSlide.style.height = 'auto';
        sliderLine.append(firstSlide);

        let start = Date.now();
        let timer = setInterval(() => {
            let timePassed = Date.now() - start;
            if (timePassed >= 1500) {
                clearInterval(timer);
                this.addEventListener('click', next);
            }
            position = images.length * width - timePassed * width / 1500;
            sliderLine.style.left = -position  + 'px'; 
        }, 20);

        setTimeout(function() {
            firstSlide.remove();                
            position = (images.length - 1) * width;
            sliderLine.style.left = -position  + 'px';
        }, 1500);

        dotIndex = images.length - 1;
    }
    ChosenSlide(dotIndex);
    this.removeEventListener('click', prev);
});

for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', function () {
        position = width * i;
        sliderLine.style.left = -position + 'px';
        dotIndex = i;
        ChosenSlide(dotIndex);
    });
}

function ChosenSlide(i) {
    for (let dot of dots) {
        dot.classList.remove('active');
    }
    dots[i].classList.add('active');
}

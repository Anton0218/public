;( function () { 
    let inputs = document.querySelectorAll('.RegForm__input');
    let btn = document.querySelector('.RegForm__btn');

    btn.addEventListener('click', function (event) {
        for (let input of inputs) {
            if (input.value == '') {
                for (let input of inputs) {
                    input.classList.add('error');
                }
                event.preventDefault();
            }
        }
    });
})();

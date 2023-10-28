let openBtn = document.querySelector('.toggle-open-btn');
let closeBtn = document.querySelector('.toggle-close-btn');
let target = document.querySelector('.nav-container');


openBtn.addEventListener('click', toggleNav);
closeBtn.addEventListener('click', toggleNav);

function toggleNav(){
    openBtn.classList.toggle('d-none');
    closeBtn.classList.toggle('d-none');
    target.classList.toggle('d-none');
}

document.querySelectorAll('.nav-menu').forEach(e => {
    e.addEventListener('mouseenter', () => {
        e.classList.add('nav-menu-hover');
        e.lastElementChild.classList.add('underline-hover');
    })
    e.addEventListener('mouseleave', () => {
        e.classList.remove('nav-menu-hover');
        e.lastElementChild.classList.remove('underline-hover');
    })
})
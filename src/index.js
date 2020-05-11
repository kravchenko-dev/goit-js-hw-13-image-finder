import './styles.css';
import queryImg from './js/apiService';
import imageInfo from './js/imageInfo.hbs';

let page = 1;
let query;

const key = '16440988-3eff979805aa2469d0f429384';

const input = document.querySelector('input');
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const mainBlock = document.querySelector('.mainblock');

function moreBtnCreate() {
    if (!document.querySelector('.morePhoto')) {
        const moreBtn = document.createElement('button');
        moreBtn.classList.add('morePhoto');
        mainBlock.append(moreBtn);
        moreBtn.textContent = 'Больше фото';
    }
}

function renderImages(event) {
    event.preventDefault();
    gallery.innerHTML = '';
    query = input.value;
    queryImg(query, page, key).then((hits) => {
        const adding = imageInfo(hits);
        gallery.innerHTML = adding;
        moreBtnCreate();
        document.querySelector('.morePhoto').addEventListener('click', renderMoreImages);
        form.reset();
    });
}

function renderMoreImages() {
    page += 1;
    queryImg(query, page, key).then((hits) => {
        const adding = imageInfo(hits);
        gallery.insertAdjacentHTML('beforeend', adding);
        setTimeout(() => {
            window.scrollBy({
                top: document.documentElement.clientHeight,
                behavior: 'smooth'
            });
        }, 500);
    });
}

form.addEventListener('submit', renderImages);

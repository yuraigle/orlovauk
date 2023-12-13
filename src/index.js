import './index.html';
import './index.scss';

import PhotoSwipe from 'photoswipe';
import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";
import 'photoswipe/style.css';
import 'photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css';

const lightbox1 = new PhotoSwipeLightbox({
    gallery: '#gallery1',
    children: 'a',
    showHideAnimationType: 'zoom',
    pswpModule: PhotoSwipe,
});

const lightbox2 = new PhotoSwipeLightbox({
    gallery: '#gallery2',
    children: 'a',
    showHideAnimationType: 'none',
    pswpModule: PhotoSwipe,
});

const captionPlugin = new PhotoSwipeDynamicCaption(lightbox1, {
    type: 'auto',
});

lightbox1.init();
lightbox2.init();

/*
document.getElementById('enroll_form').addEventListener('submit', function(ev) {
    ev.preventDefault();

    const formBody = [];
    formBody.push('name=' + encodeURIComponent(document.getElementById('name').value));
    formBody.push('phone=' + encodeURIComponent(document.getElementById('phone').value));
    formBody.push('details=' + encodeURIComponent(document.getElementById('details').value));

    fetch("/enroll.php", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: formBody.join("&"),
    })
        .then(resp => resp.json())
        .then(() => {
            document.getElementById('enroll_form').classList.add('hidden');
            document.getElementById('enroll_success').classList.remove('hidden');
        });

    return false;
});
*/

import { createApp } from 'petite-vue-pro';
createApp({
    name: '',
    phone: '',
    details: '',
    result: '',

    // +7 (999) 999-99-99
    phoneMask(value) {
        return value
            .replace(/^\+\d\s$/, '') // фикс не работает backspace
            .replaceAll(/[^\d]/g, '')
            .substr(0, 11)
            .replace(/^(\d{9})(\d)/, "\$1-\$2")
            .replace(/^(\d{7})(\d)/, "\$1-\$2")
            .replace(/^(\d{4})(\d)/, "\$1) \$2")
            .replace(/^([0-6])/, '+\$1 (')
            .replace(/^[78]/, '+7 (')
            .replace(/^9/, '+7 (9')
    },

    // Иванов Иван-Оглы
    nameMask(value) {
        return value
            .toLowerCase()
            .replaceAll(/[^а-яё\-\s]/g, '')
            .replaceAll(/^[\- ]+/g, '')
            .replaceAll(/\s+/g, ' ')
            .replaceAll(/\-+/g, '-')
            .replace(/(^[а-яё]{1})|([\-\s][а-яё]{1})/g, c => c.toUpperCase())
            .substr(0, 40);
    },

    onInputPhone(e) {
        this.phone = e.target.value;
        this.phone = this.phoneMask(this.phone);
    },

    onInputName(e) {
        this.name = e.target.value;
        this.name = this.nameMask(this.name);
    },

    onSubmit(e) {
        e.preventDefault();

        const data = {
            'name': this.name,
            'phone': this.phone,
            'details': this.details,
        };

        fetch("/enroll.php", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        })
            .then(resp => resp.json())
            .then(() => {
                console.log('ZZZ');
                // document.getElementById('enroll_form').classList.add('hidden');
                // document.getElementById('enroll_success').classList.remove('hidden');
            })
            .catch(() => {
                console.log('ERRR');
            })
    }

}).mount('#root1');

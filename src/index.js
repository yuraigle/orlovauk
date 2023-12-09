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
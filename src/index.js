import './index.html';
import './index.scss';

import './enroll.js';

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

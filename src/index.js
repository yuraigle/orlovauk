import './index.html';
import './index.scss';

require("fslightbox");

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
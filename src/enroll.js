import { createApp } from 'petite-vue-pro';

createApp({
    name: '',
    phone: '',
    details: '',
    errors: {
        name: undefined,
        phone: undefined,
        details: undefined,
    },
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
        this.errors.phone = false;
    },

    onInputName(e) {
        this.name = e.target.value;
        this.name = this.nameMask(this.name);
        this.errors.name = false;
    },

    isFormValid() {
        if (!this.phone) {
            this.errors.phone = 'Обязательное поле';
        } else if (!this.phone.match(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/)) {
            this.errors.phone = 'Неправильный формат мобильного телефона';
        }

        if (!this.name) {
            this.errors.name = 'Обязательное поле';
        }

        return Object.values(this.errors).filter(x => !!x).length === 0;
    },

    onSubmit(e) {
        e.preventDefault();

        if (!this.isFormValid()) {
            return;
        }

        const data = {
            'name': this.name,
            'phone': this.phone,
            'details': this.details,
        };

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        fetch("/enroll.php", {
            method: "POST",
            body: formData,
        })
            .then(resp => resp.json())
            .then(() => this.result = 'OK')
            .catch(() => this.result = 'ERR')
    }

}).mount('#root1');

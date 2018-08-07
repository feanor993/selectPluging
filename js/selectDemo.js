function customizeSelect(select, options) {
    let elems = document.querySelectorAll(select);
    let wrapperClass = options.wrapperClass || 'select-wrapper',
        resultClass = options.resultClass || 'result-wrapper',
        listClass = options.listClass || 'options-list',
        itemClass = options.itemClass || 'options-item';
    elems.forEach(select => {
        let text = select.dataset.text;
        select.hidden = true;
        select.value = '';
        let wrapper = document.createElement('div');
        wrapper.classList.add(wrapperClass);
        let result = document.createElement('div');
        result.classList.add(resultClass);
        result.textContent = text;
        let list = document.createElement('ul');
        list.classList.add(listClass);
        let options = select.querySelectorAll('option');
        options.forEach(option => {
            let item = document.createElement('li');
            item.textContent = option.value || option.textContent;
            item.classList.add(itemClass);
            list.appendChild(item);
            item.addEventListener('click', function () {
                list.classList.remove('active');
                select.value = this.textContent.trim();
                result.textContent = this.textContent.trim();
                result.classList.remove('active');
            })
        });
        result.addEventListener('click', function () {
            list.classList.toggle('active');
            this.classList.toggle('active');
        });
        wrapper.appendChild(result);
        wrapper.appendChild(list);
        select.parentNode.appendChild(wrapper);
    });
    document.addEventListener('mousedown', function (e) {
        if (e.target.closest('.'+wrapperClass) === null) {
            document.querySelectorAll('.' + resultClass).forEach(res => res.classList.remove('active'));
            document.querySelectorAll('.' + listClass).forEach(list => list.classList.remove('active'));
        }
    });
}

window.onload = () => customizeSelect('select', {});

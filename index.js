class customSelectWithFloatLabel {
    constructor(args) {
        const {
            labelText,
            placeholder,
            arr
        } = args

        this.wrappedItems = arr.forEach((x) => {
            this.el = document.createElement('div')
            this.elWrapper = document.createElement('div')
            this.el.innerHTML = x;
            this.el.className = "select-values-items"
            this.elWrapper.className = "select-values-wrapper"
            document.querySelector('.list-container').appendChild(this.el)
        })
        this.select = document.querySelector.bind(document)
        this.selectAll = document.querySelectorAll.bind(document)
        this.input = this.select('input')
        this.label = this.select('label')
        this.actionButton = this.select('.action-button')
        this.valuesContainer = this.select('.select-values')
        this.itemsContainer = this.select('.list-container')
        this.values = this.selectAll('.select-values-items')
        this.labelInitialStyles = this.label.style;
        this.arr = arr
        this.label.innerHTML = labelText
        this.input.placeholder = placeholder
    }

    backLabelPosition = () => {
        this.label.style.transform = 'translateY(-25%)';
        this.label.style.top = '15%';
    }

    controlPlaceholder = (show) => {
        show ? this.input.placeholder = 'placeholder' : this.input.placeholder = ''
    }

    addClick() {
        document.body.addEventListener('click', (e) => {
            if (!(e.target.classList.contains('action-button') || e.target.classList.contains('input-select'))) {
                this.valuesContainer.style = "display:none"
                if (!this.input.value) {
                    this.label.style = this.labelInitialStyles
                }
            }
        })
    }

    inputAddClick() {
        this.input.addEventListener('click', () => {
            this.valuesContainer.style = 'display:block'
            this.backLabelPosition()
        })
    }
    valuesAddClick() {
        this.values.forEach(element => {
            element.addEventListener('click', () => {
                this.input.value = element.innerText
                this.valuesContainer.style = "display:none"
                this.actionButton.dataset.state = "selected"
            })
        });
    }

    actionButtonAddClick() {
        this.actionButton.addEventListener('click', () => {
            if (this.actionButton.dataset.state === 'ready') {
                this.valuesContainer.style = 'display:block'
                this.input.value = '';
                this.controlPlaceholder()
                this.backLabelPosition()
                return
            }
            this.input.value = '';
            this.actionButton.dataset.state = "ready"
            this.label.style = this.labelInitialStyles;
            this.valuesContainer.style = 'display:none'
            this.controlPlaceholder()
        })
    }

    init() {
        if (this.input.placeholder) {
            console.log('placeholder');
            this.backLabelPosition()
        }
        this.inputAddClick()
        this.valuesAddClick()
        this.actionButtonAddClick()
        this.addClick()

    }

}

const customSelect = new customSelectWithFloatLabel({
    labelText: 'Select a car',
    placeholder: 'select a car bellow',
    arr: ['volvo', 'audi', 'mersedes', 'BMW', 'GAZ']
})
customSelect.init()
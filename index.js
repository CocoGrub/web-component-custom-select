const iconExpand = window.btoa(`
<svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5 33C25.6127 33 33 25.6127 33 16.5C33 7.3873 25.6127 0 16.5 0C7.3873 0 0 7.3873 0 16.5C0 25.6127 7.3873 33 16.5 33Z" fill="white"/>
    <path d="M25.9711 12L16.9855 21L8 12" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`);

const iconSelected = window.btoa(`
<svg width="33" height="33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16.5" cy="16.5" r="16.5" fill="#fff" />
    <path d="M10 17l4.979 4.438 8.922-8.922" stroke="#1DB4C0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M10 17l4.979 4.438 8.922-8.922" stroke="#1DB4C0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>
`);

const iconClean = window.btoa(`
<svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5 33C25.6127 33 33 25.6127 33 16.5C33 7.3873 25.6127 0 16.5 0C7.3873 0 0 7.3873 0 16.5C0 25.6127 7.3873 33 16.5 33Z" fill="white"/>
    <path d="M7.49998 25.5L25.4711 7.5M25.4711 25.5L7.5 7.5" stroke="#C01D1D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

`);


const template = document.createElement('template')
template.innerHTML = `
<div class="container">
<label for="input_select"></label>
<input
  type="text"
  name="input_select"
  class="input-select"
  autocomplete="off"
  readonly="readonly"
/>
<div class="select-values">
  <div class="list-container"></div>
</div>
<div class="action-button" data-state="ready"></div>
</div>

<style>
.container {
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    height: 60px;
    margin: 1px 0;
  }
  .container label {
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%); /* Move it halfway back(x,y) */
    pointer-events: none;
    transition: ease-in 0.2s;
    padding-left: 10px;
  }
  .input-select {
    max-width: 100%;
    height: 100%;
    border: none;
    margin: 0;
    margin-top: auto;
    padding: 0;
    padding-top: 15px;
    background-color: #f3f5f6;
    padding-left: 10px;
  }
  .input-select:focus {
    outline: none;
  }
  
  .select-values {
    display: none;
    position: absolute;
    top: 58px;
    border: 1px solid #cfcfcf;
    left: 0;
    z-index: 2;
    background-color: #fff;
    max-height: 165px;
    overflow-y: scroll;
    box-shadow: 0px 0px 10px 6px #f3f5f6;
    transition: ease-in 0.2s;
  }
  .select-values-wrapper {
    list-style-type: none;
    padding: 0;
    margin: 0;
    padding-left: 10px;
  }
  
  .select-values {
    width: 100%;
  }
  .select-values-items {
    padding: 5px;
    cursor: pointer;
    min-height: 30px;
    line-height: 45px;
  }
  
  .select-values-items:hover {
    background-color: #f3f5f6;
  }
  
  .action-button {
    content: "";
    min-width: 55px;
    max-width: 10%;
    z-index: 14;
    position: absolute;
    height: 100%;
    right: 0;
    background-position: calc(100% - 20px) 50%;
    background-repeat: no-repeat;
    transition: ease-in 0.2s;
  }
  .action-button[data-state="ready"] {
    background-image: url('data:image/svg+xml;base64,${iconExpand}');
  }
  
  .action-button[data-state="selected"] {
    background-image: url('data:image/svg+xml;base64,${iconSelected}');
  }
  
  .action-button[data-state="selected"]:hover {
    background-image: url('data:image/svg+xml;base64,${iconClean}');
  }
  
</style>

`


class CustomSelectWithFloatLabel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        })
        this.shadowRoot.appendChild(template.content.cloneNode(true))


        const slots = document.querySelectorAll('custom-select-with-float-label .item')
        this.arr = []
        slots.forEach(x => this.arr.push(x.slot))


        this.labelText = document.querySelector('custom-select-with-float-label .label').slot;

        this.wrappedItems = this.arr.forEach((x) => {
            this.el = document.createElement('div')
            this.elWrapper = document.createElement('div')
            this.el.innerHTML = x;
            this.el.className = "select-values-items"
            this.elWrapper.className = "select-values-wrapper"
            this.shadowRoot.querySelector('.list-container').appendChild(this.el)
        })

        this.input = this.shadowRoot.querySelector('input')
        this.label = this.shadowRoot.querySelector('label')
        this.actionButton = this.shadowRoot.querySelector('.action-button')
        this.valuesContainer = this.shadowRoot.querySelector('.select-values')
        this.itemsContainer = this.shadowRoot.querySelector('.list-container')
        this.values = this.shadowRoot.querySelectorAll('.select-values-items')
        this.labelInitialStyles = this.label.style;

        this.label.innerHTML = this.labelText

    }


    backLabelPosition = () => {
        this.label.style.transform = 'translateY(-25%)';
        this.label.style.top = '15%';
    }


    addClick() {
        document.addEventListener('click', (e) => {
            if (e.target.localName !== 'custom-select-with-float-label') {
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
                this.backLabelPosition()
                return
            }
            this.input.value = '';
            this.actionButton.dataset.state = "ready"
            this.label.style = this.labelInitialStyles;
            this.valuesContainer.style = 'display:none'

        })
    }


    connectedCallback() {
        this.inputAddClick()
        this.valuesAddClick()
        this.actionButtonAddClick()
        this.addClick()


    }

}


window.customElements.define("custom-select-with-float-label", CustomSelectWithFloatLabel);
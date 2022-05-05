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
    background-image: url("./icon-expand.svg");
  }
  
  .action-button[data-state="selected"] {
    background-image: url("./icon-selected.svg");
  }
  
  .action-button[data-state="selected"]:hover {
    background-image: url("./icon-close.svg");
  }
  
</style>

`


class CustomSelectWithFloatLabel extends HTMLElement {
    constructor(args) {
        super();
        this.attachShadow({
            mode: "open"
        })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        const {
            labelText,
            arr
        } = {
            labelText: 'test',
            arr: ['1', '2', '3']
        }


        this.wrappedItems = arr.forEach((x) => {
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
        this.itemsContainer =this.shadowRoot.querySelector('.list-container')
        this.values = this.shadowRoot.querySelectorAll('.select-values-items')
        this.labelInitialStyles = this.label.style;
        this.arr = arr
        this.label.innerHTML = labelText

    }


    backLabelPosition = () => {
        this.label.style.transform = 'translateY(-25%)';
        this.label.style.top = '15%';
    }


    addClick() {
        document.addEventListener('click', (e) => {
            if (e.target.localName!=='custom-select-with-float-label') {
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

// const customSelect = new CustomSelectWithFloatLabel({
//     labelText: 'Select a car',
//     arr: ['volvo', 'audi', 'mersedes', 'BMW', 'GAZ']
// })


window.customElements.define("custom-select-with-float-label", CustomSelectWithFloatLabel);
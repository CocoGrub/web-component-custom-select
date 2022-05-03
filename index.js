const select = document.querySelector.bind(document)
const selectAll = document.querySelectorAll.bind(document)

const input = select('input')
const label = select('label')
const actionButton = select('.action-button')
const valuesContainer = select('.select-values')
const itemsContainer = select('.list-container')

const values = selectAll('li')


const inputWidth = input.offsetWidth;
const labelInitialStyles = label.style;

itemsContainer.style.width = inputWidth - 24 + 'px'


const backLabelPosition = () => {
    label.style.transform = 'translateY(-25%)';
    label.style.top = '15%';
}

const controlPlaceholder = (show) => {
    show ? input.placeholder = 'placeholder' : input.placeholder = ''
}
controlPlaceholder()
document.body.addEventListener('click', (e) => {
    if (!(e.target.classList.contains('action-button') || e.target.classList.contains('input-select'))) {
        valuesContainer.style = "display:none"
        if (!input.value) {
            label.style = labelInitialStyles
        }
    }
})


input.addEventListener('click', () => {
    valuesContainer.style = 'display:block'
    backLabelPosition()
})


values.forEach(element => {
    element.addEventListener('click', () => {
        input.value = element.innerText
        valuesContainer.style = "display:none"
        actionButton.dataset.state = "selected"
    })
});

actionButton.addEventListener('click', () => {
    if (actionButton.dataset.state === 'ready') {
        valuesContainer.style = 'display:block'
        input.value = '';
        controlPlaceholder()
        backLabelPosition()
        return
    }
    input.value = '';
    actionButton.dataset.state = "ready"
    label.style = labelInitialStyles;
    valuesContainer.style = 'display:none'
    controlPlaceholder()
})
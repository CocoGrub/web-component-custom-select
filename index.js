const select = document.querySelector.bind(document)
const selectAll = document.querySelectorAll.bind(document)

const input = select('input')

const label = select('label')

const actionButton = select('.action-button')
const values = selectAll('li')

const valuesContainer = select('.select-values')
const itemsContainer = select('.list-container')

const inputWidth = input.offsetWidth;
const labelInitialStyles = label.style;

itemsContainer.style.width = inputWidth - 24 + 'px'


const BackLabelPosition = () => {
    label.style.transform = 'translateY(-25%)';
    label.style.top = '15%';
}

document.body.addEventListener('click', (e) => {
    if (!e.target.classList.contains('input-select')) {
        valuesContainer.style = "display:none"
        if (input.value) {
            BackLabelPosition()
        }
    }
})

input.addEventListener('click', () => {
    valuesContainer.style = 'display:block'
    itemsContainer.width = inputWidth
    BackLabelPosition()
})




values.forEach(element => {
    element.addEventListener('click', () => {
        input.value = element.innerText
        valuesContainer.style = "display:none"
        actionButton.dataset.state="selected"
    })
});

actionButton.addEventListener('click', () => {
    input.value = '';
    actionButton.dataset.state="ready"
    label.style = labelInitialStyles;
})
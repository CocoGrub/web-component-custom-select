const select = document.querySelector.bind(document)
const selectAll = document.querySelectorAll.bind(document)

const input = select('input')
const inputWidth = input.offsetWidth;
const label = select('label')
const labelInitialStyles = label.style;
const actionButton = select('.action-button')

const valuesContainer = select('.select-values')
const itemsContainer = select('.list-container')


itemsContainer.style.width = inputWidth - 23 + 'px'

document.body.addEventListener('click', (e) => {
    if (!e.target.classList.contains('input-select'))
        valuesContainer.style = "display:none"
})

input.addEventListener('click', () => {
    valuesContainer.style = 'display:block'
    itemsContainer.width = inputWidth
    label.style.transform = 'translateY(-25%)';
    label.style.top = '15%';
})

const values = selectAll('li')


values.forEach(element => {
    element.addEventListener('click', () => {
        input.value = element.innerText
        valuesContainer.style = "display:none"
        actionButton.style.display="block"
    })
});

actionButton.addEventListener('click',()=>{
    input.value='';
    actionButton.style.display="none"
    label.style=labelInitialStyles;
})
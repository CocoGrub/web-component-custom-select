const select = document.querySelector.bind(document)
const selectAll = document.querySelectorAll.bind(document)

const input = select('input')
const inputWidth = input.offsetWidth;
const label = select('label')


const valuesContainer = select('.select-values')
const itemsContainer = select('.list-container')


itemsContainer.style.width = inputWidth-23 + 'px'

document.body.addEventListener('click', (e) => {
    console.log(e);
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
    console.log(inputWidth);
    element.addEventListener('click', () => {
        input.value = element.innerText
        valuesContainer.style = "display:none"
        input.classList.add('selected')

    })

});
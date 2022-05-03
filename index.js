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
            if (!(e.target.classList.contains('action-button') || e.target.classList.contains('input-select'))) {
                    console.log(e.target.classList);
                    valuesContainer.style = "display:none"
                    if (!input.value) {
                        label.style = labelInitialStyles
                    }
                }
            })


        const showSelectMenu = () => {
            valuesContainer.style = 'display:block'
            itemsContainer.width = inputWidth
            BackLabelPosition()
        }

        input.addEventListener('click', () => {
            showSelectMenu()
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
                console.log('is ready');
                valuesContainer.style = 'display:block'
                itemsContainer.width = inputWidth
                input.value = '';
                BackLabelPosition()
                return
            }
            console.log('back');
            input.value = '';
            actionButton.dataset.state = "ready"
            label.style = labelInitialStyles;
            valuesContainer.style = 'display:none'
        })
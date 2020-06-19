/** help */
// renderList()

function log(message) {
    // console.log('> ' + message)
}

/** app */
const todo = document.querySelector('#todo.dropzone')
const progress = document.querySelector('#progress.dropzone')
const done = document.querySelector('#done.dropzone')
const cards = document.querySelectorAll('.card')
const delets = document.querySelectorAll('.card .brands .delete i')
const dropzones = document.querySelectorAll('.dropzone')


/** our cards */
cards.forEach(card => {
    card.addEventListener('dragstart', dragstart)
    card.addEventListener('drag', drag)
    card.addEventListener('dragend', dragend)
})
delets.forEach(element => {
    element.addEventListener('click', (e) => {
        const item = e.target.dataset

        if (confirm(`Deseja deletar o item com nome ${item.title}`, 'sim')) {
            console.log(`Item deletado ${item.title} ${item.id}`)
            fetch(`http://localhost:3000/#${item.id}`).then(res => res.text()).then(data => document = data)
        } else {
            console.log(`Ação anulada`)
        }
    })
})

function dragstart() {
    log('CARD: Start dragging ')
    dropzones.forEach(dropzone => dropzone.classList.add('highlight'))

    // this = card
    this.classList.add('is-dragging')
}

function drag() {
    log('CARD: Is dragging ')
}

function dragend() {
    log('CARD: Stop drag! ')
    dropzones.forEach(dropzone => dropzone.classList.remove('highlight'))

    // this = card
    this.classList.remove('is-dragging')
}

/** place where we will drop cards */
dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragenter', dragenter)
    dropzone.addEventListener('dragover', dragover)
    dropzone.addEventListener('dragleave', dragleave)
    dropzone.addEventListener('drop', drop)
})

function dragenter() {
    log('DROPZONE: Enter in zone ')
}

function dragover() {
    // this = dropzone
    this.classList.add('over')

    // get dragging card
    const cardBeingDragged = document.querySelector('.is-dragging')

    // this = dropzone
    this.appendChild(cardBeingDragged)
}

function dragleave() {
    log('DROPZONE: Leave ')
        // this = dropzone
    this.classList.remove('over')

}

function drop() {
    log('DROPZONE: dropped ')
    this.classList.remove('over')
}
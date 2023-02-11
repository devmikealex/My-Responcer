const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
        const draggablesStatic = document.querySelectorAll('.draggable:not(.dragging)')
        draggablesStatic.forEach((draggable) => {
            draggable.classList.add('static')
        })
    })
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
        const draggablesStatic = document.querySelectorAll('.draggable:not(.dragging)')
        draggablesStatic.forEach((draggable) => {
            draggable.classList.remove('static')
        })
    })
})

containers.forEach((container) => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault() // меняет курсор на стрелку с ящиком при драге

        const draggable = document.querySelector('.dragging')
        // container.appendChild(draggable)

        const draggablesStatic = document.querySelectorAll('.draggable:not(.dragging)')
        const mouseY = e.clientY
        let baseY = container.getBoundingClientRect()

        for (let i = 0; i < draggablesStatic.length; i++) {
            const element = draggablesStatic[i]
            element.classList.remove('red')

            const rect = element.getBoundingClientRect()
            if (mouseY > rect.top) {
                if (mouseY < rect.bottom) {
                    console.log(element.textContent)
                    element.classList.add('red')
                    element.after(draggable)
                    // break
                }
            }
        }
    })
    // container.addEventListener('dragend', () => {})
})

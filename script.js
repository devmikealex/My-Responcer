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
        // let baseY = container.getBoundingClientRect()
        // let targetElement

        draggablesStatic.forEach((element) => {
            element.classList.remove('red')
            element.classList.remove('blue')
        })

        for (let i = 0; i < draggablesStatic.length; i++) {
            const element = draggablesStatic[i]
            const rect = element.getBoundingClientRect()
            if (mouseY > rect.top) {
                // мышь ниже верхней граници элемента
                if (mouseY < rect.bottom) {
                    // мышь внутри границ элемента
                    // console.log(element.textContent)
                    element.classList.add('red')
                    element.after(draggable)
                    break
                } else {
                    // мышь ниже и вне границ текущего элемента
                    // targetElement = element
                }
            } else {
                // мышь выше верхней граници элемента
                element.classList.add('blue')
                element.before(draggable)
                break
            }
        }
    })
    container.addEventListener('dragend', () => {
        const draggablesStatic = document.querySelectorAll('.draggable:not(.dragging)')
        draggablesStatic.forEach((element) => {
            element.classList.remove('red')
            element.classList.remove('blue')
        })
        console.log('----------------------------')
        console.log(getText('output'))
    })
})

function getText(id) {
    const nodes = document.getElementById(id).childNodes
    let nodesArr = [...nodes]
    nodesArr = nodesArr.filter((node) => node.tagName === 'P')
    return nodesArr.reduce(
        (acc, cur) => acc + cur.textContent.replace(/\s+/g, ' ').trim() + '\r\n',
        ''
    )
}

function removeEmptyLines(input) {
    return input
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line !== '')
        .join('\r\n')
}

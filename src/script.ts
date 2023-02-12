// import start from './dataRead.js'

import RecCollection from './RecCollection.js'
import { RecInfo } from './types.js'
import Viewer from './viewer.js'

const recCollection = new RecCollection()
const viewer = new Viewer()

document.getElementById('CopyBTN')?.addEventListener('click', copyText)
document.getElementById('SaveBTN')?.addEventListener('click', save)
document.getElementById('LoadBTN')?.addEventListener('click', load)
document.getElementById('LoadCLR')?.addEventListener('click', clear)

async function start() {
    const res = await fetch('./data.txt')
    const data = await res.text()
    // recCollection.createData(data)
    recCollection.readData(data)
    load()
    // viewer.createData(data)
    viewer.render(recCollection.out())

    console.log('OUT', recCollection.out())
    console.log('VIEW', viewer.getRecOrder())
}

start().then(() => {
    const draggables = document.querySelectorAll('.draggable')
    const containers = document.querySelectorAll('.container')

    draggables.forEach((draggable) => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging')
            const draggablesStatic = document.querySelectorAll(
                '.draggable:not(.dragging)'
            )
            draggablesStatic.forEach((draggable) => {
                draggable.classList.add('static')
            })
        })
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
            const draggablesStatic = document.querySelectorAll(
                '.draggable:not(.dragging)'
            )
            draggablesStatic.forEach((draggable) => {
                draggable.classList.remove('static')
            })
        })
    })

    containers.forEach((container) => {
        // TODO разобраться с типом евента
        container.addEventListener('dragover', (e: any) => {
            e.preventDefault() // меняет курсор на стрелку с ящиком при драге

            const draggable = document.querySelector('.dragging')
            // container.appendChild(draggable)

            const currentNodes = container.querySelectorAll('.draggable:not(.dragging)')
            if (!currentNodes.length && draggable) {
                e.target.appendChild(draggable)
                return
            }

            const draggablesStatic = document.querySelectorAll(
                '.draggable:not(.dragging)'
            )
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
                        if (draggable) element.after(draggable)
                        break
                    } else {
                        // мышь ниже и вне границ текущего элемента
                        // targetElement = element
                    }
                } else {
                    // мышь выше верхней граници элемента
                    element.classList.add('blue')
                    if (draggable) element.before(draggable)
                    break
                }
            }
        })
        container.addEventListener('dragend', () => {
            const draggablesStatic = document.querySelectorAll(
                '.draggable:not(.dragging)'
            )
            draggablesStatic.forEach((element) => {
                element.classList.remove('red')
                element.classList.remove('blue')
            })
            const newOrder = viewer.getRecOrder()
            console.log(newOrder)
            recCollection.newOrder(newOrder)
            console.log(recCollection.out())
            viewer.render(recCollection.out())

            console.log('----------------------------')
            console.log(getText('output'))
        })
    })
})

function save() {
    // console.log(viewer.getRecOrder())
    const t = JSON.stringify(viewer.getRecOrder())
    console.log(t)
    localStorage.setItem('RecInfo', t)
}

function load() {
    const t = localStorage.getItem('RecInfo')
    if (t) {
        console.log(t)
        const newOrder: RecInfo[] = JSON.parse(t)
        console.log(newOrder)
        recCollection.newOrder(newOrder)
        console.log(recCollection.out())
        viewer.render(recCollection.out())
    } else {
        console.info('Settings Not found')
    }
}

function clear() {
    localStorage.removeItem('RecInfo')
}

function copyText() {
    const a = getText('output')
    navigator.clipboard.writeText(a)
    console.log(a)
    // console.log(viewer.getRecOrder())
}

function getText(id: string): string {
    const nodes = document.getElementById(id)?.childNodes
    if (nodes) {
        let nodesArr = [...nodes] as HTMLElement[]
        nodesArr = nodesArr.filter((node) => node.tagName === 'DIV')
        return nodesArr.reduce(
            (acc, cur) =>
                acc +
                cur.innerHTML.replace(/\s+/g, ' ').replaceAll('<br>', '\r\n').trim() +
                '\r\n\r\n',
            ''
        )
    } else {
        return ''
    }
}

// function removeEmptyLines(input) {
//     return input
//         .split(/\r?\n/)
//         .map((line) => line.trim())
//         .filter((line) => line !== '')
//         .join('\r\n')
// }

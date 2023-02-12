fetch('./data.txt')
    .then((res) => res.text())
    .then((data) => createData(data))

function createData(data) {
    const templatesContainer = document.getElementById('templates')
    console.log('🚀 ~ file: dataRead.js:8 ~ createData ~ data', data)
    const templates = data.split('\r\n\r\n\r\n')
    console.log(templates)

    templates.forEach((text) => {
        text = text.replaceAll('\r\n\r\n', '<br>')
        const p = document.createElement('div')
        // p.textContent = text
        p.innerHTML = text
        p.className = 'draggable'
        p.draggable = true
        templatesContainer.appendChild(p)
    })

    document.querySelector('body').dispatchEvent(new Event('dataLoaded'))
}

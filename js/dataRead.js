export default async function start() {
    const res = await fetch('./data.txt');
    const data = await res.text();
    createData(data);
    // .then((res) => res.text())
    // .then((data) => createData(data))
}
export function createData(data) {
    const outputContainer = document.getElementById('output');
    const templatesContainer = document.getElementById('templates');
    if (templatesContainer && outputContainer) {
        console.log('🚀 ~ file: dataRead.js:8 ~ createData ~ data', data);
        const templates = data.split('\r\n\r\n\r\n');
        console.log(templates);
        templates.forEach((text) => {
            text = text.replaceAll('\r\n', '<br>');
            const newEl = document.createElement('div');
            // p.textContent = text
            newEl.innerHTML = text;
            newEl.className = 'draggable';
            newEl.draggable = true;
            if (text[0] === '1')
                outputContainer.appendChild(newEl);
            else
                templatesContainer.appendChild(newEl);
        });
    }
}
//# sourceMappingURL=dataRead.js.map
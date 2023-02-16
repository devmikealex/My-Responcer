import RecCollection from './RecCollection.js';
const recCollection = new RecCollection();
document
    .getElementById('CopyBTN')
    ?.addEventListener('click', () => recCollection.copyText());
document
    .getElementById('SaveBTN')
    ?.addEventListener('click', () => recCollection.saveData());
document
    .getElementById('LoadBTN')
    ?.addEventListener('click', () => recCollection.loadData());
document
    .getElementById('LoadCLR')
    ?.addEventListener('click', () => recCollection.clearData());
// document.getElementById('CopyBTN')?.addEventListener('click', copyText)
// document.getElementById('SaveBTN')?.addEventListener('click', save)
// document.getElementById('LoadBTN')?.addEventListener('click', load)
// document.getElementById('LoadCLR')?.addEventListener('click', clear)
async function start() {
    let res = await fetch('./data.txt');
    if (res.status === 404) {
        res = await fetch('./data-demo.txt');
    }
    const data = await res.text();
    const res2 = await fetch('./mySkills.txt');
    recCollection.mySkills = await res2.text();
    recCollection.readData(data);
    recCollection.loadData(); // загрузка настроек отображения
    recCollection.render();
}
start().then(() => {
    const draggables = document.querySelectorAll('.draggable');
    const containers = document.querySelectorAll('.container');
    draggables.forEach((draggable) => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
            const draggablesStatic = document.querySelectorAll('.draggable:not(.dragging)');
            draggablesStatic.forEach((draggable) => {
                draggable.classList.add('static');
            });
        });
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
            const draggablesStatic = document.querySelectorAll('.draggable:not(.dragging)');
            draggablesStatic.forEach((draggable) => {
                draggable.classList.remove('static');
            });
        });
    });
    containers.forEach((container) => {
        // TODO разобраться с типом евента
        container.addEventListener('dragover', (e) => {
            e.preventDefault(); // меняет курсор на стрелку с ящиком при драге
            const draggable = document.querySelector('.dragging');
            // container.appendChild(draggable)
            const currentNodes = container.querySelectorAll('.draggable:not(.dragging)');
            if (!currentNodes.length && draggable) {
                e.target.appendChild(draggable);
                return;
            }
            const draggablesStatic = document.querySelectorAll('.draggable:not(.dragging)');
            const mouseY = e.clientY;
            // let baseY = container.getBoundingClientRect()
            // let targetElement
            draggablesStatic.forEach((element) => {
                element.classList.remove('red');
                element.classList.remove('blue');
            });
            for (let i = 0; i < draggablesStatic.length; i++) {
                const element = draggablesStatic[i];
                const rect = element.getBoundingClientRect();
                if (mouseY > rect.top) {
                    // мышь ниже верхней граници элемента
                    if (mouseY < rect.bottom) {
                        // мышь внутри границ элемента
                        // console.log(element.textContent)
                        element.classList.add('red');
                        if (draggable)
                            element.after(draggable);
                        break;
                    }
                    else {
                        // мышь ниже и вне границ текущего элемента
                        // targetElement = element
                    }
                }
                else {
                    // мышь выше верхней граници элемента
                    element.classList.add('blue');
                    if (draggable)
                        element.before(draggable);
                    break;
                }
            }
        });
        container.addEventListener('dragend', () => {
            const draggablesStatic = document.querySelectorAll('.draggable:not(.dragging)');
            draggablesStatic.forEach((element) => {
                element.classList.remove('red');
                element.classList.remove('blue');
            });
            recCollection.updateAfterDrag();
            // console.log('----------------------------')
            // console.log(recCollection.getText())
        });
    });
});
//# sourceMappingURL=script.js.map
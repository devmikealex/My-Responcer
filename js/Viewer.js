const outputContainer = document.getElementById('output');
const templatesContainer = document.getElementById('templates');
// const logout = document.getElementById('log-output')
const snackbar = document.getElementById('snackbar');
const snackbarCloseBtn = document.getElementById('snackbar-close-button');
let snackbarTimer;
snackbarCloseBtn.onclick = log_close;
function log_close() {
    clearTimeout(snackbarTimer);
    snackbar.style.display = 'none';
}
export default class Viewer {
    // ___createData(data: string): TextRecord[] {
    //     const arr: TextRecord[] = []
    //     if (templatesContainer && outputContainer) {
    //         const templates = data.split('\r\n\r\n\r\n')
    //         templates.forEach((text) => {
    //             const record = new TextRecord(text)
    //             arr.push(record)
    //             if (record.position === 1) outputContainer.appendChild(record.element)
    //             else templatesContainer.appendChild(record.element)
    //         })
    //     }
    //     return arr
    // }
    render(recInfo) {
        recInfo.forEach((rec) => {
            if (rec.element) {
                if (rec.position === 1)
                    outputContainer.appendChild(rec.element);
                else
                    templatesContainer.appendChild(rec.element);
            }
        });
        // }
    }
    getRecOrder() {
        let arr = [];
        const draggables = [...document.querySelectorAll('.draggable')];
        arr = draggables.map((item) => {
            return {
                id: item.id,
                position: item.parentElement?.id === 'output' ? 1 : 0,
            };
        });
        return arr;
    }
    log(message) {
        // const newEl = document.createElement('div')
        // newEl.textContent = message
        // newEl.className = 'log-item'
        // logout!.prepend(newEl)
        snackbar.getElementsByClassName('message')[0].textContent = message;
        snackbar.style.display = 'block';
        clearTimeout(snackbarTimer);
        snackbarTimer = setTimeout(log_close, 4000);
    }
}
//# sourceMappingURL=Viewer.js.map
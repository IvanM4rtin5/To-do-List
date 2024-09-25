let banco = [];

const getBanco = () => JSON.parse(localStorage.getItem("lista")) ?? [];
const setBanco = (banco) => localStorage.setItem('lista', JSON.stringify(banco));

const atualizarTela = () => {
    const lista = document.getElementById('lista');
    lista.innerHTML = ''; // Limpa a lista
    getBanco().forEach((item, index) => {
        const itemLabel = document.createElement("label");
        itemLabel.classList.add("tarefa_item");
        itemLabel.innerHTML = `
            <input type="checkbox" ${item.status} data-index="${index}">
            <div>${item.tarefa}</div>
            <input type="button" value="x" data-index="${index}">
        `;
        lista.appendChild(itemLabel);
    });
}

const manipularItem = (evento) => {
    const elemento = evento.target;
    const index = elemento.dataset.index;

    if (elemento.type === 'button') {
        const banco = getBanco();
        banco.splice(index, 1);
        setBanco(banco);
    } else if (elemento.type === 'checkbox') {
        const banco = getBanco();
        banco[index].status = banco[index].status === '' ? 'checked' : '';
        setBanco(banco);
    }
    atualizarTela();
}

document.getElementById('newItem').addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        const banco = getBanco();
        banco.push({ 'tarefa': evento.target.value, 'status': "" });
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }
});

document.getElementById('lista').addEventListener('click', manipularItem);
atualizarTela();

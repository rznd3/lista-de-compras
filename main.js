let listaItens = []
let idItemEditar

const formItens = document.querySelector('#form-itens')
formItens.addEventListener('submit', salvarItem)

const listaRecuperada = localStorage.getItem('listaItens')

function salvarLocalStorage() {
    localStorage.setItem('listaItens', JSON.stringify(listaItens))
}

if (listaRecuperada) {
    listaItens = JSON.parse(listaRecuperada)
    exibirLista()
} else {
    listaItens = []
}

function salvarItem(evento) {
    evento.preventDefault()
    
    const inputItens = document.querySelector('#receber-item')
    inputItens.focus()
    
    const checarDuplicado = listaItens.some(elemento => elemento.valor.toLowerCase() === inputItens.value.toLowerCase())
    
    if (checarDuplicado) {
        alert(`O item ${inputItens.value} já está na lista.`)
    } else {
        listaItens.push({
            valor: inputItens.value,
            checar: false
        })
    }
    
    inputItens.value = ''
    
    exibirLista()
}

function exibirLista() {
    const ulItensComprados = document.querySelector('#itens-comprados')
    const ulItens = document.querySelector('#lista-de-itens')

    ulItens.innerHTML = ''
    ulItensComprados.innerHTML = ''
    
    listaItens.forEach((elemento, index) => {
        if (elemento.checar) {
            ulItensComprados.innerHTML += `
                <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                    <div>
                        <input type="checkbox" checked class="is-clickable" />  
                        <span class="itens-comprados is-size-5">${elemento.valor}</span>
                    </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
                </li>
            `
        
        
        } else {
            ulItens.innerHTML += `
                <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                    <div>
                        <input type="checkbox" class="is-clickable" />
                        <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(idItemEditar) ? 'disabled' : ''}></input>
                    </div>
                    <div>
                        ${index === Number(idItemEditar) ? '<button onclick="salvarEdicao()" display="none"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
                        <i class="fa-solid fa-trash is-clickable deletar"></i>
                    </div>
                </li>
            `
        }
    })


    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')

    inputsCheck.forEach((input) => {
        input.addEventListener('click', (evento) => {
            const idElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            listaItens[idElemento].checar = evento.target.checked
            exibirLista()
        })
    })

    salvarLocalStorage()
    chamarfuncoes()
}

function chamarfuncoes() {
    const btnDeletar = document.querySelectorAll('.deletar')
    btnDeletar.forEach(btn => {
        btn.addEventListener('click', deletarItem)
    })
    
    const btnEditar = document.querySelectorAll('.editar')
    btnEditar.forEach(btn => {
        btn.addEventListener('click', editarItem)
    })
}

function deletarItem(evento) {
    // Removendo do objeto
    const idElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
    delete listaItens[idElemento]
    
    // Removendo do DOM
    const elementoPaiItem = evento.target.parentElement.parentElement
    elementoPaiItem.remove()
}

function editarItem(evento) {
    idItemEditar = evento.target.parentElement.parentElement.getAttribute('data-value')
    exibirLista()
    return idItemEditar
    
}

function salvarEdicao() {
    const valorItemEditado = document.querySelector(`[data-value="${idItemEditar}"] input[type="text"]`)

    listaItens[idItemEditar].valor = valorItemEditado.value
    console.log(listaItens)
    idItemEditar = -1

    exibirLista()
}


let carta = [];

carta = data.events.filter(events => data.currentDate < events.date)

console.log(carta)


function tarjetas(carta) {
        let cards = ``;
        const plantilla = document.getElementById("tarjeta");
        for (let i = 0; i < carta.length; i++) {
                cards += `
                <div class="tarjeta1">    
                        <div class="tarjeta_header">
                                <img src="${carta[i].image}" alt="foto">
                        </div>
                        <div class="tarjeta_body">
                                <h3>${carta[i].name}</h3>
                                <p>${carta[i].description}</p>
                        </div>
                        <div class="tarjeta_footer">
                                <p>price:${carta[i].price}</p>
                                <a href="./details.html?id=${carta[i]._id}">ver mas</a>
                        </div>
                </div>
                `;
        }
        plantilla.innerHTML = cards
}
tarjetas(carta)

const contenedor = document.querySelector(".contenedor")

const checkbox = document.querySelector(".checkbox")

const search = document.querySelector("#search")


search.addEventListener('input', superfiltro)
checkbox.addEventListener('change', superfiltro)


function filtroTexto(array, texto) {
        let filtro = array.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
        return filtro
}


function pintarChecks(array) {
        let check = ''
        let categoriasRepetidas = array.map(categoria => categoria.category)
        let categorias = new Set(categoriasRepetidas)
        categorias.forEach(e => {
                check += `
                <input type="checkbox" id="${e}" name="${e}" value="${e}">
                <label for="${e}">${e}</label>
                `
        })
        checkbox.innerHTML = check
}
pintarChecks(carta)


function filtroCheckbox(array) {
        let checkboxes = document.querySelectorAll("input[type='checkbox']")
        let arrCheckboxes = Array.from(checkboxes)
        let checkeds = arrCheckboxes.filter(check => check.checked)
        if (checkeds.length == 0) {
                return array
        }
        let values = checkeds.map(check => check.value)
        let filtro = array.filter(i => values.includes(i.category))
        return filtro
}

function superfiltro() {
        let filtro = filtroTexto(carta, search.value)
        let filtro1 = filtroCheckbox(filtro)
        tarjetas(filtro1)
}


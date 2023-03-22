fetch('https://mindhub-xj03.onrender.com/api/amazing')
.then ((respuesta)=> respuesta.json())
.then ((datos)=>{
    let eventos = datos.events
    let eventounico=eventos.find(evento=>evento._id==params)
    console.log(eventounico)
    tarjetaUnica(eventounico)
})


const params=new URLSearchParams(window.location.search).get("id")


const tarjeta9 = document.querySelector(".container1")

function tarjetaUnica(evento){

    tarjeta9.innerHTML =`
    <div class="tarjeta_d">
        <div class="cuadrado_a">
            <img src="${evento.image}" alt="${evento.name}${evento.category}">
        </div>
        <div class="cuadrado_b">
            <div class="tarjeta_body_d">
                <h3>${evento.name}</h3>
                <p>${evento.description}</p>
            </div>
            <div class="tarjeta_footer_d">
                <p>category:${evento.category}</p>
                <p>date:${evento.date}</p>
                <p>capacity:${evento.capacity}</p>
                <p>place:${evento.place}</p>
                <p>asistance:${evento.assistance}</p>
                <p>price:${evento.price}</p>
            </div>
            <div class="cuadrado_c">
                <a href="index.html" class= "volver">volver</a>
            </div>
        </div>
    </div>`
}
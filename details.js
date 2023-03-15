const querySearch= location.search

const params=new URLSearchParams(querySearch).get("id")

const evento = data.events.find (eventos => eventos.id == params)

const tarjeta0 = document.querySelector(".container1")


tarjeta0.innerHTML =`
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
            <a href="index.html">volver</a>
        </div>
    </div>
</div>`
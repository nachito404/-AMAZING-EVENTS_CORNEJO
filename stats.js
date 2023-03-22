fetch('https://mindhub-xj03.onrender.com/api/amazing')
        .then((respuesta) => respuesta.json())
        .then((datos) => {
                let eventos = datos.events
                let past = eventos.filter(events => datos.currentDate > events.date)
                let future = eventos.filter(events => datos.currentDate < events.date)

                let result1 = [];
                let result2 = [];

                past.forEach(element => {
                        let ingresos = element.price * element.assistance
                        let asistencia = (element.assistance * 100)/ element.capacity
                        let categoria = element.category
                        result1.push({
                                category: categoria,
                                revenues: ingresos,
                                attendance: asistencia
                        })
                        return result1;
                });

                future.forEach(element => {
                        let ingresos = element.price * element.estimate
                        let estimate = (element.estimate * 100) / element.capacity
                        let categoria = element.category
                        result2.push({
                                category: categoria,
                                revenues: ingresos,
                                estimate: estimate
                        })
                        return result2;
                });

                let reduceFutureI = result2.reduce((acumulador, indice) => {
                        if (!acumulador[indice.category]) {
                                acumulador[indice.category] = [];
                        }
                        acumulador[indice.category].push({
                                revenues: indice.revenues,
                        })

                        return acumulador;
                }, {});
                let reduceFutureA = result2.reduce((acumulador, indice) => {
                        if (!acumulador[indice.category]) {
                                acumulador[indice.category] = [];
                        }
                        acumulador[indice.category].push({
                                estimate: indice.estimate
                        })

                        return acumulador;
                }, {});

                let reducePastI = result1.reduce((acumulador, indice) => {
                        if (!acumulador[indice.category]) {
                                acumulador[indice.category] = [];
                        }
                        acumulador[indice.category].push({
                                revenues: indice.revenues,
                        })

                        return acumulador;
                }, {});

                let reducePastA = result1.reduce((acumulador, indice) => {
                        if (!acumulador[indice.category]) {
                                acumulador[indice.category] = [];
                        }
                        acumulador[indice.category].push({
                                attendance: indice.attendance
                        })

                        return acumulador;
                }, {});

                let arrayFutureA = Object.values(reduceFutureA)
                let arrayFutureI = Object.values(reduceFutureI)
                let arrayPastA = Object.values(reducePastA)
                let arrayPastI = Object.values(reducePastI);

                function promediarI(array) {
                        let suma = 0
                        array.forEach(element => {
                                suma = suma + element.revenues

                        });
                        return suma
                }
                function promediarA(array) {
                        let suma = 0
                        array.forEach(element => {
                                if (element.attendance) {
                                        suma = suma + element.attendance
                                } else {
                                        suma = suma + element.estimate
                                }
                        });
                        return suma / array.length
                }

                let Past = []
                let Future = []

                Future.push({
                        foodR: promediarI(arrayFutureI[0]),
                        booksR: promediarI(arrayFutureI[1]),
                        partyR: promediarI(arrayFutureI[2]),
                        raceR: promediarI(arrayFutureI[3]),
                        concertR: promediarI(arrayFutureI[4]),
                        museumR: promediarI(arrayFutureI[5]),
                        foodA: promediarA(arrayFutureA[0]),
                        booksA: promediarA(arrayFutureA[1]),
                        partyA: promediarA(arrayFutureA[2]),
                        raceA: promediarA(arrayFutureA[3]),
                        concertA: promediarA(arrayFutureA[4]),
                        museumA: promediarA(arrayFutureA[5])
                }); 

                Past.push({
                        foodA: promediarA(arrayPastA[0]),
                        museumA: promediarA(arrayPastA[1]),
                        concertA: promediarA(arrayPastA[2]),
                        raceA: promediarA(arrayPastA[3]),
                        booksA: promediarA(arrayPastA[4]),
                        cinemaA: promediarA(arrayPastA[5]),
                        partyA: promediarA(arrayPastA[6]),
                        foodR: promediarI(arrayPastI[0]),
                        museumR: promediarI(arrayPastI[1]),
                        concertR: promediarI(arrayPastI[2]),
                        raceR: promediarI(arrayPastI[3]),
                        booksR: promediarI(arrayPastI[4]),
                        cinemaR: promediarI(arrayPastI[5]),
                        partyR: promediarI(arrayPastI[6])
                }); 

                function pintarTablaPast(array) {
                        let tabla = ``
                        let plantilla = document.querySelector(".pastEvents")
                        array.forEach(i => {
                                tabla += `
                                <thead>
                                <tr>
                                        <th class="th1">Categories</th>
                                        <th class="th2">Revenues</th>
                                        <th class="th3">Percentage of attendance</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                        <td>Food</td>
                                        <td>${i.foodR}</td>
                                        <td>${i.foodA}</td>
                                </tr>
                                <tr>
                                        <td>Museum</td>
                                        <td>${i.museumR}</td>
                                        <td>${i.museumA}</td>
                                </tr>
                                <tr>
                                        <td>Concert</td>
                                        <td>${i.concertR}</td>
                                        <td>${i.concertA}</td>
                                </tr>
                                <tr>
                                        <td>Race</td>
                                        <td>${i.raceR}</td>
                                        <td>${i.raceA}</td>
                                </tr>
                                <tr>
                                        <td>Books</td>
                                        <td>${i.booksR}</td>
                                        <td>${i.booksA}</td>
                                </tr>
                                <tr>
                                        <td>Cinema</td>
                                        <td>${i.cinemaR}</td>
                                        <td>${i.cinemaA}</td>
                                </tr>
                                <tr>
                                        <td>Party</td>
                                        <td>${i.partyR}</td>
                                        <td>${i.partyA}</td>
                                </tr>
                                </tbody>`
                        });
                        plantilla.innerHTML = tabla;
                }
                function pintarTablaFuture (array) {
                        let tabla = ``
                        let plantilla = document.querySelector(".futureEvents")
                        array.forEach(i => {
                                tabla=`<thead>
                                <tr>
                                        <th class="th1">Categories</th>
                                        <th class="th2">Revenues</th>
                                        <th class="th3">Percentage of attendance</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                        <td>Food</td>
                                        <td>${i.foodR}</td>
                                        <td>${i.foodA}</td>
                                </tr>
                                <tr>
                                        <td>Books</td>
                                        <td>${i.booksR}</td>
                                        <td>${i.booksA}</td>
                                </tr>
                                <tr>
                                        <td>Party</td>
                                        <td>${i.partyR}</td>
                                        <td>${i.partyA}</td>
                                </tr>
                                <tr>
                                        <td>Race</td>
                                        <td>${i.raceR}</td>
                                        <td>${i.raceA}</td>
                                </tr>
                                <tr>
                                        <td>Concert</td>
                                        <td>${i.concertR}</td>
                                        <td>${i.concertA}</td>
                                </tr>
                                <tr>
                                        <td>Museum</td>
                                        <td>${i.museumR}</td>
                                        <td>${i.museumA}</td>
                                </tr>
                                </tbody>`
                        });
                        plantilla.innerHTML = tabla;
                }
                pintarTablaFuture(Future)
                pintarTablaPast(Past)
        })
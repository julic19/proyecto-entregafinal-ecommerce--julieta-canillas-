
//lista de productos: simula mi base de datos
//productos es una variable global
let productos = [

];

let listaProductosCarrito = [];

//definiciones de funciones**************************

function insertarProductos(lista) {
    

    const contenedorProductos = document.querySelector("#productos .contenedorProductos");
    //console.log(contenedorProductos); para verificar q estoy accediendo al objeto del dom correcto

    for (let c = 0; c < lista.length; c++) {
        const productoActual = lista[c];

        //crear el elemento html
        const nuevoElemento = document.createElement("article");
        //asigno las clases
        nuevoElemento.className = "card col-10 col-sm-8 col-lg-6 ";
        //creamos el contenido del elemento. VER SI PONER MI ARTICLE Y CLASES 
        nuevoElemento.innerHTML = `
                    <figure>
                        <img src="${productoActual.imgRuta}" alt="Tabla de skate Krav">
                    </figure>

                    <h3>${productoActual.nombre} </h3>
                    <p>
                        <a href="#." data-descripcion="${productoActual.descripcion}">
                            Ver descripción
                        </a>
                    </p>

                    <div class="contenedorDescripcion">
                    
                    </div>

                    <p class="precio">${productoActual.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}</p>
                    <button class="boton-verde" data-id=${productoActual.id}>Agregar al carrito <i class="fa-solid fa-cart-shopping"></i></button>


        
        
        `
        //insertamos el elemento nuevo en el html
        contenedorProductos.appendChild(nuevoElemento);
    }
}

function mostrarDescripcion(datosEvento) {
    //console.log(datosEvento.target.tagName);

    const elementoEvento = datosEvento.target.tagName;
    //si clickeamos en elemento a (enlace)
    if (elementoEvento === "A") {
        //obtener el elemento clicado
        const elementoClicado = datosEvento.target;

        //obtener la descripcion del dataset
        const descripcionProducto = elementoClicado.dataset.descripcion
        //console.log(descripcionProducto);

        //encontramos la tarjeta contenedora del boton
        const articleCard = elementoClicado.closest(".card") //elemento mas cercano con clase card
        //console.log(articleCard)

        //obtener el div de la desc
        const divDescripcion = articleCard.querySelector(".contenedorDescripcion");
        //console.log(divDescripcion);



        if (divDescripcion.children.length == 0) {
            //crear el elemento que vamos a insertar
            const parrafoDescripcion = document.createElement("p");

            //insertamos la descr en el parrrafo
            parrafoDescripcion.textContent = descripcionProducto;
            //insertar el parrafo en el div
            divDescripcion.appendChild(parrafoDescripcion);

            //cambiamos el texto del enlace
            elementoClicado.textContent = "Ocultar descripción";
        } else {
            elementoClicado.textContent = "Ver descripción";
            divDescripcion.innerHTML = "";
        }

    }






}

function buscarEnLista(id, lista) {
    //verificamos datos recibidos
    //console.log(id,lista)

    for (const producto of lista) {
        if (producto.id === id) {
            console.log("encontrado", producto.id)
            return id;
        }
    }
    return -1;
}

function buscarProductoPorId(id, lista) {
    //Verificamos datos
    //console.log(id, lista);
    for (let i = 0; i < lista.length; i++) {
        //si encontramos el id retornamos el producto
        if (lista[i].id === id) { //el id del producto x es igual al id q necesito encontrar
            return lista[i];
        }
    }

}

function insertarProductoHTML(producto) {
    //console.log(producto);

    //obtener el contenedor ul
    const listaCarrito = document.querySelector("#carrito .list-group")

    //crear el elemento li
    const liProducto = document.createElement("li");

    //agregar el contenido
    liProducto.textContent = `${producto.nombre} ${producto.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}`

    liProducto.className = "list-group-item";
    listaCarrito.appendChild(liProducto)
}

function actualizarContador() {
    const contenedorNumero = document.querySelector("#carrito .contador")
    //Cambiamos el numero del contadorusando la cantidad de productos de la lista
    contenedorNumero.textContent = listaProductosCarrito.length;
}

function guardarCarritoEnStorage(lista) {
    //convertimos en JSON la lista de objetos
    const carritoJSON = JSON.stringify(lista);
    localStorage.setItem("listaCarrito", carritoJSON);
    console.log("guardado en storage");
}


function agregarAlCarrito(datosEvento) {
    //datps del evento
    //console.log(datosEvento.target.tagName);

    //si el elemento clicado es un boton
    if (datosEvento.target.tagName === "BUTTON") {
        //console.log(datosEvento.target.dataset.id)

        //guardamos el id como number
        const idProducto = parseInt(datosEvento.target.dataset.id);
        //console.log(listaProductosCarrito);

        //buscamos el id en la lista del carrito y guardamos el resultado
        const idEncontrado = buscarEnLista(idProducto, listaProductosCarrito);

        if (idEncontrado === -1) {
            const productoEncontrado = buscarProductoPorId(idProducto, productos);
            //console.log(productoEncontrado);

            //agregar el productoEncontrado a la lista del carrito, al final
            listaProductosCarrito.push(productoEncontrado);
            //console.log("agregar lista carrito");
            //console.log(listaProductosCarrito);


            //insertar el producto en el HTML
            insertarProductoHTML(productoEncontrado);

            actualizarContador();

            //agregrar producto al storage
            guardarCarritoEnStorage(listaProductosCarrito);
        }
    }
}

//funcion para vaciar carrito
function vaciarCarrito() {
    //seleccionamos el contenedor del carrito
    const listaCarrito = document.querySelector("#carrito .list-group")
    //borramos los elementos html del contenedor
    listaCarrito.innerHTML = ""
}


//eliminar el carrito en Local Storage
function eliminarCarrito() {
    //eliminar el json del storage
    localStorage.removeItem("listaCarrito");
    //eliminamos contenido de la lista del carrito
    listaProductosCarrito = [];
    //actualizamos contador
    actualizarContador();

    //sacar elementos del html
    vaciarCarrito();
}

//funcion para cargar datos desde el local storafe
function cargarCarritoDeStorage() {
    const carritoJSON = localStorage.getItem("listaCarrito");
    if (carritoJSON) {
        return JSON.parse(carritoJSON); //convierte en lista de objetos
    } else {
        return [];
    }
}





//JSDoc
/**
 * Función asincrona para obtener los productos del JSON
 * @returns {Promise<Array<Object>>}
 */
async function cargarProductosApi() {
    console.log("cargar productos");

    try {
        //peticion del archivo JSON o la URL de API
        const respuesta = await fetch("./productos.json");
        //console.log(respuesta);

        //manejo de errores de http (404 not found)
        if (!respuesta.ok) {
            //throw: lanzamiento. se lanza un error se corta la ejecucion
            //se crea un objeto error con los datos del error y se envia al bloque
            throw new Error(`Error al obtener los datos: ${respuesta.status} - ${respuesta.statusText} `)
        }
        //si respuesta.ok es true
        //conversion del json a array
        const productosArray = await respuesta.json();
        return productosArray;
    }
    //Catch captura el error y si es necesario se ejecutan instrucciones
    catch (error) {
        console.error("fallo grave en la carga:", error);
        //indormar al usuario en la interfaz
        const listaUL = document.querySelector("#productos, .contenedorProductos");
        listaUL.innerHTML = '<li id="mensaje-error">Error al cargar el catalogo</li>'

        return [];
    }
}

async function main() {
    console.log("iniciando la carga de productos");
    productos = await cargarProductosApi();

    insertarProductos(productos);
    const contenedorProductos = document.querySelector(".contenedorProductos");

    //cargar la lista del carrito desde local storage
    listaProductosCarrito = cargarCarritoDeStorage();
    console.log(listaProductosCarrito);
    //si el storage no esta vacio
    if (listaProductosCarrito.length != 0) {
        for (const producto of listaProductosCarrito) {
            insertarProductoHTML(producto);
        }
        //actualizar contador
        actualizarContador();
    }





    contenedorProductos.addEventListener("click", mostrarDescripcion);

    contenedorProductos.addEventListener("click", agregarAlCarrito);

    //AGREGAR LISTENER AL BOTON VCIAR CARRITO
    //seleccionamos boton
    const botonVaciarCarrito = document.querySelector("#carrito .vaciarCarrito");

    botonVaciarCarrito.addEventListener("click", eliminarCarrito);

}


//INSTRUCCIONES DE MI PROGRAMA

main();
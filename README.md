KRAV – Proyecto Final

Proyecto final de una página web para una marca ficticia de skate llamada KRAV, desarrollada con HTML, CSS, JavaScript y Bootstrap. Incluye catálogo dinámico, carrito de compras, formulario de contacto, reseñas, mapa y un video institucional. Los productos se cargan desde un archivo JSON para simular una API y permitir la actualización del catálogo sin modificar el código JavaScript.

Funcionalidades:

1-Catálogo dinámico

Los productos se obtienen desde productos.json.

El JavaScript realiza una petición fetch para leer el JSON y renderizar las tarjetas en el DOM.

Cada producto incluye imagen, descripción y botón para agregar al carrito.


2-Carrito de compras

Funciona con JavaScript.

Permite agregar productos y eliminarlos.

El contenido del carrito se guarda en LocalStorage para persistencia.


3-Formulario de contacto

Conectado a Formspree, permite enviar consultas reales sin backend propio.


4-Reseñas

Sección de testimonios estáticos con diseño responsivo.


5-Mapa

Integración con un mapa embebido para mostrar la ubicación de la marca.


-Video institucional

Video integrado en la página principal con subtítulos .vtt.


Tecnologías utilizadas:

-HTML5

-CSS3 (propio + Bootstrap)

-JavaScript

-Bootstrap 5

-JSON (para manejar datos del catálogo)
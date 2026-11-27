document.addEventListener("DOMContentLoaded", function () {

  // 1. Año automático en el pie de página
  var anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();

  // 2. Menú para celular
  var boton = document.getElementById("menuBoton");
  var menu = document.getElementById("menu");
  if (boton && menu) {
    boton.addEventListener("click", function () {
      var abierto = menu.classList.toggle("abierto");
      boton.setAttribute("aria-expanded", abierto);
    });
  }

  // 3. Marcar la página actual en el menú
  var actual = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a").forEach(function (enlace) {
    if (enlace.getAttribute("href") === actual) {
      enlace.classList.add("activo");
    }
  });

  // 4. Si una imagen no se encuentra, mostrar un recuadro con su nombre
  document.querySelectorAll("img").forEach(function (img) {
    img.addEventListener("error", function () {
      var aviso = document.createElement("div");
      aviso.className = "img-faltante";
      aviso.textContent = "Falta la imagen: " + img.getAttribute("src");
      img.replaceWith(aviso);
    });
  });

  // 5. Las características aparecen una por una
  var items = document.querySelectorAll("#listaSpecs li");
  items.forEach(function (li, i) {
    li.classList.add("oculto");
    setTimeout(function () {
      li.classList.remove("oculto");
    }, 150 * (i + 1));
  });

});

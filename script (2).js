document.addEventListener("DOMContentLoaded", function () {

  // ====== CONFIGURACIÓN ======
  // Pon aquí el "shortname" que te da Disqus al registrar tu sitio
  var DISQUS_SHORTNAME = "TU-SHORTNAME";

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

  // 6. Botones de compartir (Twitter y Facebook) con la dirección de la página actual
  var urlPagina = encodeURIComponent(location.href);
  var tituloPagina = encodeURIComponent(document.title);

  var botonTwitter = document.getElementById("compartirTwitter");
  if (botonTwitter) {
    botonTwitter.href = "https://twitter.com/intent/tweet?url=" + urlPagina + "&text=" + tituloPagina;
  }

  var botonFacebook = document.getElementById("compartirFacebook");
  if (botonFacebook) {
    botonFacebook.href = "https://www.facebook.com/sharer/sharer.php?u=" + urlPagina;
  }

  // 7. Comentarios con Disqus (cada página tiene su propio hilo)
  var hilo = document.getElementById("disqus_thread");
  if (hilo) {
    if (DISQUS_SHORTNAME === "TU-SHORTNAME") {
      hilo.textContent = "Aquí aparecerán los comentarios cuando pongas tu shortname de Disqus en js/script.js.";
    } else {
      window.disqus_config = function () {
        this.page.url = location.href;
        this.page.identifier = actual;
      };
      var d = document.createElement("script");
      d.src = "https://" + DISQUS_SHORTNAME + ".disqus.com/embed.js";
      d.setAttribute("data-timestamp", +new Date());
      document.body.appendChild(d);
    }
  }

});
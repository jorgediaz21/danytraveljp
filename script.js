// ==========================
// CONFIG
// ==========================
const API_TOKEN = "6de46adfb7d4f979c3344976757aa699";
const MARKER = "473820";

// ==========================
// AUTOCOMPLETADO DE AEROPUERTOS
// ==========================
const aeropuertos = [
  { code: "OSA", name: "Osaka, Japan" },
  { code: "KIX", name: "Osaka Kansai, Japan" },
  { code: "ITM", name: "Osaka Itami, Japan" },
  { code: "NRT", name: "Tokyo Narita, Japan" },
  { code: "HND", name: "Tokyo Haneda, Japan" },
  { code: "ASU", name: "Asunción Silvio Pettirossi, Paraguay" },
  { code: "GRU", name: "Sao Paulo Guarulhos, Brasil" },
  { code: "EZE", name: "Buenos Aires Ezeiza, Argentina" }
];

function activarAutocompletado(idInput) {
  const input = document.getElementById(idInput);
  const lista = document.createElement("div");
  lista.classList.add("sugerencias");
  input.parentNode.appendChild(lista);

  input.addEventListener("input", () => {
    const texto = input.value.toLowerCase();
    lista.innerHTML = "";
    if (!texto) return;

    const filtrados = aeropuertos.filter(a =>
      a.name.toLowerCase().includes(texto) ||
      a.code.toLowerCase().includes(texto)
    );

    filtrados.forEach(a => {
      const opcion = document.createElement("div");
      opcion.classList.add("sugerencia");
      opcion.innerHTML = `<b>${a.code}</b> – ${a.name}`;
      opcion.onclick = () => {
        input.value = `${a.code} – ${a.name}`;
        lista.innerHTML = "";
      };
      lista.appendChild(opcion);
    });
  });
}

activarAutocompletado("origen");
activarAutocompletado("destino");

// ==========================
// BUSCADOR CLICK
// ==========================
document.getElementById("buscarBtn").addEventListener("click", function () {
  
  const origenTxt = document.getElementById("origen").value.trim();
  const destinoTxt = document.getElementById("destino").value.trim();
  const fechaTxt = document.getElementById("fecha").value;

  if (!origenTxt || !destinoTxt || !fechaTxt) {
    document.getElementById("resultado").innerHTML =
      `<p style="color:red">⚠️ Completa todos los campos</p>`;
    return;
  }

  const ORIGEN_IATA = origenTxt.split("–")[0].trim().toUpperCase();
  const DESTINO_IATA = destinoTxt.split("–")[0].trim().toUpperCase();

  const fechaParts = fechaTxt.split("/");
  const fechaCompact = `${fechaParts[2]}${fechaParts[1]}${fechaParts[0]}`;

  const url = `https://search.aviasales.com/search/${ORIGEN_IATA}${fechaCompact}${DESTINO_IATA}1?marker=${MARKER}&refhost=search.aviasales.com`;

  document.getElementById("resultado").innerHTML = `
    <h2>Resultado</h2>
    <p><b>Origen:</b> ${origenTxt}</p>
    <p><b>Destino:</b> ${destinoTxt}</p>
    <p><b>Fecha:</b> ${fechaTxt}</p>
    <a href="${url}" 
       target="_blank" 
       style="padding:12px 20px; background:#4f46e5; color:white; border-radius:6px; text-decoration:none; display:inline-block; margin-top:10px;">
      🔎 Ver precios reales y comprar
    </a>
  `;
});

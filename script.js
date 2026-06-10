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
// ==========================
// ASISTENTE DE COTIZACIÓN WHATSAPP
// ==========================
const WHATSAPP_DANY = "818087584964";

function crearAsistenteTravel() {
  const asistenteHTML = `
    <button id="assistantBtn" class="assistant-btn">
      🤖 Asistente
    </button>

    <div id="assistantBox" class="assistant-box">
      <div class="assistant-header">
        <div>
          <h3>KAI Travel Assistant</h3>
          <p>Cotiza vuelos a cualquier destino del mundo 🌍</p>
        </div>
        <button id="assistantClose">✕</button>
      </div>

      <div class="assistant-body">
        <input id="waSalida" placeholder="Salida: ciudad, país o aeropuerto">
        <input id="waDestino" placeholder="Destino: ciudad, país o aeropuerto">
        <input id="waFecha" placeholder="Fecha aproximada">
        
        <select id="waTipo">
          <option>Ida</option>
          <option>Ida y vuelta</option>
        </select>

        <input id="waPasajeros" placeholder="Cantidad de pasajeros">

        <select id="waEquipaje">
          <option>Con equipaje</option>
          <option>Sin equipaje</option>
          <option>No estoy seguro</option>
        </select>

        <select id="waVisa">
          <option>No puede hacer escala en USA/Canadá</option>
          <option>Sí puede hacer escala en USA/Canadá</option>
          <option>No estoy seguro</option>
        </select>

        <input id="waPresupuesto" placeholder="Presupuesto aproximado">
        <input id="waNombre" placeholder="Nombre del cliente">

        <button id="waEnviar" class="assistant-send">
          📲 Enviar cotización por WhatsApp
        </button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", asistenteHTML);

  document.getElementById("assistantBtn").addEventListener("click", () => {
    document.getElementById("assistantBox").style.display = "block";
  });

  document.getElementById("assistantClose").addEventListener("click", () => {
    document.getElementById("assistantBox").style.display = "none";
  });

  document.getElementById("waEnviar").addEventListener("click", () => {
    const salida = document.getElementById("waSalida").value.trim();
    const destino = document.getElementById("waDestino").value.trim();
    const fecha = document.getElementById("waFecha").value.trim();
    const tipo = document.getElementById("waTipo").value;
    const pasajeros = document.getElementById("waPasajeros").value.trim();
    const equipaje = document.getElementById("waEquipaje").value;
    const visa = document.getElementById("waVisa").value;
    const presupuesto = document.getElementById("waPresupuesto").value.trim();
    const nombre = document.getElementById("waNombre").value.trim();

    const mensaje = `
Hola Dany, quiero cotizar un pasaje.

Salida: ${salida}
Destino: ${destino}
Fecha: ${fecha}
Ida o ida y vuelta: ${tipo}
Pasajeros: ${pasajeros}
Equipaje: ${equipaje}
Escala USA/Canadá: ${visa}
Presupuesto: ${presupuesto}
Nombre: ${nombre}
`;

    const url = `https://wa.me/${WHATSAPP_DANY}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  });
}

crearAsistenteTravel();
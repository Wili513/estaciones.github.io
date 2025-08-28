const tablaAcum = document.getElementById("tablaAcumulado");
const filtroAcum = document.getElementById("filtroAcum");
const SHEET_URL = "TU_URL_DE_SHEETS";
let acumulados = [];

async function cargarDatosAcum() {
  const res = await fetch(SHEET_URL);
  const text = await res.text();
  const filas = text.split(/\r?\n/).filter(l => l.trim() !== "");
  const datos = filas.slice(1);
  const diario = {};
  datos.forEach(fila => {
    const cols = fila.split(",");
    const fechaHora = cols[0];
    const lluvia = parseFloat(cols[3]) || 0;
    const fecha = fechaHora.split(" ")[0];
    if (!diario[fecha]) diario[fecha] = 0;
    diario[fecha] += lluvia;
  });
  acumulados = Object.keys(diario).map(f => ({
    fecha: f,
    lluvia: diario[f]
  }));
  renderAcum();
}

function renderAcum() {
  tablaAcum.innerHTML = "";
  let datos = acumulados;
  if (filtroAcum.value !== "todos") {
    const cantidad = parseInt(filtroAcum.value);
    datos = datos.slice(-cantidad);
  }
  datos.reverse().forEach(d => {
    tablaAcum.insertAdjacentHTML("beforeend", `
      <tr>
        <td>${d.fecha}</td>
        <td>${d.lluvia.toFixed(2)}</td>
      </tr>
    `);
  });
}

filtroAcum.addEventListener("change", renderAcum);
cargarDatosAcum();
const tablaLluvia = document.getElementById("tablaLluvia");
const filtroLluvia = document.getElementById("filtroLluvia");
const SHEET_URL = "TU_URL_DE_SHEETS";
let datosLluvia = [];

async function cargarDatosLluvia() {
  const res = await fetch(SHEET_URL);
  const text = await res.text();
  const filas = text.split(/\r?\n/).filter(l => l.trim() !== "");
  datosLluvia = filas.slice(1);
  renderLluvia();
}

function renderLluvia() {
  tablaLluvia.innerHTML = "";
  let datos = datosLluvia;
  if (filtroLluvia.value !== "todos") {
    const cantidad = parseInt(filtroLluvia.value);
    datos = datos.slice(-cantidad);
  }
  datos.reverse().forEach(fila => {
    const cols = fila.split(",");
    tablaLluvia.insertAdjacentHTML("beforeend", `
      <tr>
        <td>${cols[0]}</td>
        <td>${cols[3]}</td>
      </tr>
    `);
  });
}

filtroLluvia.addEventListener("change", renderLluvia);
cargarDatosLluvia();
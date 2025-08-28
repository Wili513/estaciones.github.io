const tablaLluvia = document.getElementById("tablaLluvia");
const filtroLluvia = document.getElementById("filtroLluvia");
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSxObb2nasmk3BsnNDjWiJ8R80J-6Z-pQFcHU5DTYf3ybR4VLBBGxAV6e5JaEuEYY6rPVoRJxeZ4a9_/pub?output=csv";
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

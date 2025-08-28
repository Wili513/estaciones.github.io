const tablaDHT = document.getElementById("tablaDHT");
const filtroDHT = document.getElementById("filtroDHT");
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSxObb2nasmk3BsnNDjWiJ8R80J-6Z-pQFcHU5DTYf3ybR4VLBBGxAV6e5JaEuEYY6rPVoRJxeZ4a9_/pub?gid=1773567797&single=true&output=csv";
let datosDHT = [];

async function cargarDatosDHT() {
  const res = await fetch(SHEET_URL);
  const text = await res.text();
  const filas = text.split(/\r?\n/).filter(l => l.trim() !== "");
  datosDHT = filas.slice(1);
  renderDHT();
}

function renderDHT() {
  tablaDHT.innerHTML = "";
  let datos = datosDHT;
  if (filtroDHT.value !== "todos") {
    const cantidad = parseInt(filtroDHT.value);
    datos = datos.slice(-cantidad);
  }
  datos.reverse().forEach(fila => {
    const cols = fila.split(",");
    tablaDHT.insertAdjacentHTML("beforeend", `
      <tr>
        <td>${cols[0]}</td>
        <td>${cols[1]}</td>
        <td>${cols[2]}</td>
      </tr>
    `);
  });
}

filtroDHT.addEventListener("change", renderDHT);
cargarDatosDHT();

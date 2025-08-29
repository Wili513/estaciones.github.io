// URL de tu Google Sheets en formato CSV
const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSxObb2nasmk3BsnNDjWiJ8R80J-6Z-pQFcHU5DTYf3ybR4VLBBGxAV6e5JaEuEYY6rPVoRJxeZ4a9_/pub?gid=1773567797&single=true&output=csv";

fetch(url)
  .then(res => res.text())
  .then(data => {
    let filas = data.trim().split("\n").map(r => r.split(","));
    let headers = filas.shift();

    let tabla = document.getElementById("tabla");

    // Crear encabezados
    tabla.innerHTML = "<thead><tr>" + headers.map(h => `<th>${h}</th>`).join("") + "</tr></thead>";

    // Crear cuerpo
    tabla.innerHTML += "<tbody>" + filas.map(f =>
      "<tr>" + f.map(c => `<td>${c}</td>`).join("") + "</tr>`
    ).join("") + "</tbody>";
  })
  .catch(err => {
    console.error("Error cargando datos:", err);
    document.getElementById("tabla").innerHTML = "<tr><td>Error cargando datos</td></tr>";
  });

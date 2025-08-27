const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");
const topic = "estacion/portatil/patios/sensores"; // <-- cámbialo si tu ESP32 usa otro

let ultimaTemperatura = "";
let ultimaHumedad = "";
let ultimaLluvia = "";

client.on("connect", () => {
  console.log("✅ Conectado al broker MQTT");
  console.log(`📡 Suscrito al topic: ${topic}`);
  client.subscribe(topic);
});

client.on("message", (topic, message) => {
  console.log("📩 Mensaje recibido en topic:", topic);
  console.log("📦 Contenido crudo:", message.toString());

  let datos;
  try {
    datos = JSON.parse(message.toString());
  } catch (e) {
    console.error("❌ Error al parsear JSON:", e);
    return;
  }

  console.log("🔍 Objeto interpretado:", datos);

  // Actualizar últimos valores según el tipo
  if (datos.tipo === "dht21") {
    if (datos.temperatura !== undefined) ultimaTemperatura = datos.temperatura;
    if (datos.humedad !== undefined) ultimaHumedad = datos.humedad;
  } else if (datos.tipo === "lluvia") {
    if (datos.valor !== undefined) ultimaLluvia = datos.valor;
  }

  const ahora = new Date();
  const fecha = ahora.toISOString().split("T")[0];
  const hora = ahora.toTimeString().split(" ")[0];

  const fila = `
    <tr>
      <td>${fecha}</td>
      <td>${hora}</td>
      <td>${ultimaTemperatura}</td>
      <td>${ultimaHumedad}</td>
      <td>${ultimaLluvia}</td>
    </tr>`;

  document.querySelector("#tabla tbody")
          .insertAdjacentHTML("afterbegin", fila);
});

function agregarDato() {
    const datosDiv = document.getElementById("datos");
  
    const nuevoDato = document.createElement("div");
    nuevoDato.className = "dato";
  
    const nuevaLeyenda = document.createElement("input");
    nuevaLeyenda.type = "text";
    nuevaLeyenda.placeholder = "Nueva Leyenda";
    nuevaLeyenda.className = "serie";
  
    const nuevoValor = document.createElement("input");
    nuevoValor.type = "number";
    nuevoValor.placeholder = "Nuevo Valor";
    nuevoValor.className = "valor";
  
    const botonEliminar = document.createElement("button");
    botonEliminar.className = "eliminar";
    botonEliminar.textContent = "-";
    botonEliminar.onclick = () => {
      datosDiv.removeChild(nuevoDato);
    };
  
    nuevoDato.appendChild(nuevaLeyenda);
    nuevoDato.appendChild(nuevoValor);
    nuevoDato.appendChild(botonEliminar);
  
    datosDiv.appendChild(nuevoDato);
  }
  
  function cargarGrafico() {
    const tipo = document.getElementById("tipo").value;
    const titulo = document.getElementById("titulo").value;
    const leyendas = Array.from(document.getElementsByClassName("serie")).map(
      (input) => input.value.trim()
    );
    const valores = Array.from(document.getElementsByClassName("valor")).map(
      (input) => Number(input.value)
    );
  
    if (leyendas.some((l) => l === "") || valores.some((v) => isNaN(v) || v <= 0)) {
      alert("Por favor, asegúrate de llenar todas las leyendas y valores correctamente.");
      return;
    }
  
    const colores = [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(255, 159, 64, 0.2)",
      "rgba(199, 199, 199, 0.2)",
    ];
  
    const bordes = [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
      "rgba(199, 199, 199, 1)",
    ];
  
    const ctx = document.getElementById("chartCanvas").getContext("2d");
  
    if (window.myChart) {
      window.myChart.destroy();
    }
  
    window.myChart = new Chart(ctx, {
      type: tipo,
      data: {
        labels: leyendas,
        datasets: [
          {
            label: titulo || "Gráfico",
            data: valores,
            backgroundColor: colores.slice(0, leyendas.length),
            borderColor: bordes.slice(0, leyendas.length),
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: titulo || "Gráfico Generado",
          },
        },
      },
    });
  }
  
  function limpiarCampos() {
    document.getElementById("titulo").value = "";
    Array.from(document.getElementsByClassName("serie")).forEach(
      (input) => (input.value = "")
    );
    Array.from(document.getElementsByClassName("valor")).forEach(
      (input) => (input.value = "")
    );
  }
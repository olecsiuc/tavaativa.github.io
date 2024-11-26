function calcularIMC() {
    var peso = parseFloat(document.getElementById("peso").value);
    var altura = parseFloat(document.getElementById("altura").value) / 100; // Convertendo altura de cm para metros

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        alert("Por favor, insira valores válidos.");
        return;
    }

    var imc = peso / (altura * altura);
    var resultado = "Seu IMC é: " + imc.toFixed(2);

    if (imc < 18.5) {
        resultado += " - Abaixo do peso";
    } else if (imc >= 18.5 && imc < 24.9) {
        resultado += " - Peso normal";
    } else if (imc >= 25 && imc < 29.9) {
        resultado += " - Sobrepeso";
    } else {
        resultado += " - Obesidade";
    }

    document.getElementById("resultadoIMC").innerText = resultado;
}

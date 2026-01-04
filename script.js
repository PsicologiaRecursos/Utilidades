// Elementos del DOM
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const processBtn = document.getElementById('processBtn');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const inputStats = document.getElementById('inputStats');
const outputStats = document.getElementById('outputStats');

// Actualizar estadísticas del input
inputText.addEventListener('input', () => {
    const texto = inputText.value;
    const caracteres = texto.length;
    const palabras = texto.trim() ? texto.trim().split(/\s+/).length : 0;
    const lineas = texto.split(/\r\n|\r|\n/).length;
    
    inputStats.textContent = `Caracteres: ${caracteres.toLocaleString()} | Palabras: ${palabras.toLocaleString()} | Líneas: ${lineas.toLocaleString()}`;
});

// Procesar texto a una sola línea
processBtn.addEventListener('click', () => {
    const textoOriginal = inputText.value;
    
    if (!textoOriginal.trim()) {
        alert('⚠️ Por favor, pega algún texto primero');
        return;
    }
    
    // Eliminar saltos de línea y espacios múltiples
    const textoProcesado = textoOriginal.replace(/\s+/g, ' ').trim();
    
    // Mostrar resultado
    outputText.value = textoProcesado;
    
    // Actualizar estadísticas del output
    const caracteres = textoProcesado.length;
    const palabras = textoProcesado.split(/\s+/).length;
    outputStats.textContent = `Caracteres: ${caracteres.toLocaleString()} | Palabras: ${palabras.toLocaleString()}`;
    
    // Habilitar botón de copiar
    copyBtn.disabled = false;
    
    // Feedback visual
    processBtn.textContent = '✅ ¡Convertido!';
    setTimeout(() => {
        processBtn.textContent = '▶️ Convertir a una línea';
    }, 2000);
});

// Copiar al portapapeles
copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(outputText.value);
        copyBtn.textContent = '✅ ¡Copiado!';
        setTimeout(() => {
            copyBtn.textContent = '📋 Copiar al portapapeles';
        }, 2000);
    } catch (err) {
        // Fallback para navegadores antiguos
        outputText.select();
        document.execCommand('copy');
        copyBtn.textContent = '✅ ¡Copiado (fallback)!';
    }
});

// Limpiar todo
clearBtn.addEventListener('click', () => {
    if (confirm('¿Seguro que quieres limpiar todo?')) {
        inputText.value = '';
        outputText.value = '';
        inputStats.textContent = 'Caracteres: 0 | Palabras: 0 | Líneas: 0';
        outputStats.textContent = 'Caracteres: 0 | Palabras: 0';
        copyBtn.disabled = true;
    }
});

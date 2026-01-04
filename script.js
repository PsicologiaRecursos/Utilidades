// [Mantén todo el código anterior, reemplaza TODO con esto]

// ⭐ NUEVAS FUNCIONES ⭐

// Subida de archivo
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');

uploadArea.addEventListener('click', () => fileInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/plain') {
        loadFile(file);
    }
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) loadFile(file);
});

function loadFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        inputText.value = e.target.result;
        inputText.dispatchEvent(new Event('input'));
        uploadArea.textContent = `✅ Archivo cargado: ${file.name}`;
    };
    reader.readAsText(file, 'UTF-8');
}

// Procesamiento con opciones
processBtn.addEventListener('click', () => {
    let texto = inputText.value;
    if (!texto.trim()) {
        alert('⚠️ Por favor, carga o pega algún texto');
        return;
    }
    
    // Aplicar opciones
    if (document.getElementById('uppercase').checked) {
        texto = texto.toUpperCase();
    }
    if (document.getElementById('lowercase').checked) {
        texto = texto.toLowerCase();
    }
    if (document.getElementById('removeSpecial').checked) {
        texto = texto.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]/g, '');
    }
    if (document.getElementById('removeNumbers').checked) {
        texto = texto.replace(/\d+/g, '');
    }
    
    // Convertir a una línea
    const textoProcesado = texto.replace(/\s+/g, ' ').trim();
    outputText.value = textoProcesado;
    
    // Actualizar estadísticas con más detalles
    const charsBefore = texto.length;
    const charsAfter = textoProcesado.length;
    const reduction = charsBefore - charsAfter;
    const pages = Math.ceil(charsAfter / 3000);
    const sizeKB = new Blob([textoProcesado]).size / 1024;
    
    outputStats.textContent = `Caracteres: ${charsAfter.toLocaleString()} | Palabras: ${textoProcesado.split(/\s+/).length.toLocaleString()} | Tamaño: ${sizeKB.toFixed(2)} KB`;
    
    // Mostrar mejora
    document.getElementById('improvementStats').innerHTML = `
        ✅ <strong>Procesamiento completo:</strong> 
        ${reduction.toLocaleString()} caracteres eliminados 
        (${((reduction/charsBefore)*100).toFixed(1)}% de reducción) | 
        ≈ ${pages} páginas estimadas
    `;
    
    copyBtn.disabled = false;
    downloadBtn.disabled = false;
});

// Descargar archivo
downloadBtn.addEventListener('click', () => {
    const blob = new Blob([outputText.value], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'texto_procesado.txt';
    a.click();
    URL.revokeObjectURL(url);
});

// Auto-guardar en localStorage
inputText.addEventListener('input', () => {
    localStorage.setItem('savedText', inputText.value);
});
window.addEventListener('load', () => {
    const saved = localStorage.getItem('savedText');
    if (saved) inputText.value = saved;
});

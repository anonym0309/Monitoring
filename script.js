// ==========================================
// 1. INISIALISASI WIDGET SPEEDOMETER
// ==========================================
var gSuhu = new JustGage({
    id: "gauge-suhu",
    value: 0,
    min: 0,
    max: 60,
    label: "°C",
    valueFontColor: "#888888"
});

var gLembabUdara = new JustGage({
    id: "gauge-lembab-udara",
    value: 0,
    min: 0,
    max: 100,
    label: "%",
    valueFontColor: "#888888"
});

var gLembabTanah = new JustGage({
    id: "gauge-lembab-tanah",
    value: 0,
    min: 0,
    max: 100,
    label: "%",
    valueFontColor: "#888888"
});

var gCahaya = new JustGage({
    id: "gauge-cahaya",
    value: 0,
    min: 0,
    max: 2000, 
    label: "Lux",
    valueFontColor: "#888888"
}
                          
                          /* Gaya untuk tombol Link Publik */
.btn-public {
    padding: 12px 25px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    background-color: #3498db; /* Warna Biru */
    color: white;
    border: none;
    border-radius: 30px;
    box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
    transition: 0.3s;
}

.btn-public:hover {
    background-color: #2980b9;
    transform: scale(1.05);
}

/* Penyesuaian saat Mode Gelap */
body.dark-mode .btn-public {
    background-color: #2980b9;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
});


// ==========================================
// 2. MENGAMBIL DATA DARI THINGSPEAK
// ==========================================
// PENTING: Ganti tulisan di bawah ini dengan ID milikmu!
const urlAPI = "https://api.thingspeak.com/channels/3004157/feeds.json?results=1";

function perbaruiDataSensor() {
    fetch(urlAPI)
        .then(function(respons) { return respons.json(); })
        .then(function(data) {
            let hasil = data.feeds[0];
            
            let suhuUdara = parseFloat(hasil.field3 || 0).toFixed(1);
            let lembabUdara = parseFloat(hasil.field2 || 0).toFixed(1);
            let lembabTanah = parseFloat(hasil.field1 || 0).toFixed(1);
            let intensitasCahaya = parseFloat(hasil.field4 || 0).toFixed(0);

            // Update teks angka
            document.getElementById("suhu-val").innerText = suhuUdara;
            document.getElementById("lembab-udara-val").innerText = lembabUdara;
            document.getElementById("lembab-tanah-val").innerText = lembabTanah;
            document.getElementById("cahaya-val").innerText = intensitasCahaya;

            // Menggerakkan jarum speedometer
            gSuhu.refresh(suhuUdara);
            gLembabUdara.refresh(lembabUdara);
            gLembabTanah.refresh(lembabTanah);
            gCahaya.refresh(intensitasCahaya);
        })
        .catch(function(error) { console.error("Gagal mengambil data: ", error); });
}

// Jalankan saat pertama dibuka, lalu ulangi setiap 15 detik
perbaruiDataSensor();
setInterval(perbaruiDataSensor, 15000);


// ==========================================
// 3. LOGIKA TOMBOL TEMA GELAP/TERANG
// ==========================================
const tombolTema = document.getElementById("tema-btn");

if (localStorage.getItem("tema") === "gelap") {
    document.body.classList.add("dark-mode");
    tombolTema.innerText = "Mode Terang ☀️";
}

tombolTema.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        tombolTema.innerText = "Mode Terang ☀️";
        localStorage.setItem("tema", "gelap"); 
    } else {
        tombolTema.innerText = "Mode Gelap 🌙";
        localStorage.setItem("tema", "terang"); 
    }

});


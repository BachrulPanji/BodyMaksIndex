        document.getElementById('bmiForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ambil data dari form
            const nama = document.getElementById('nama').value;
            const jenisKelamin = document.getElementById('jenisKelamin').value;
            const umur = parseInt(document.getElementById('umur').value);
            const tinggiBadan = parseFloat(document.getElementById('tinggiBadan').value);
            const beratBadan = parseFloat(document.getElementById('beratBadan').value);
            
            // Hitung BMI
            const tinggiMeter = tinggiBadan / 100;
            const bmi = beratBadan / (tinggiMeter * tinggiMeter);
            
            // Tentukan kategori BMI
            let kategori = '';
            let kelas = '';
            
            if (bmi < 18.5) {
                kategori = 'Kurus';
                kelas = 'underweight';
            } else if (bmi >= 18.5 && bmi < 25) {
                kategori = 'Normal';
                kelas = 'normal';
            } else if (bmi >= 25 && bmi < 30) {
                kategori = 'Kelebihan Berat';
                kelas = 'overweight';
            } else {
                kategori = 'Obesitas';
                kelas = 'obese';
            }
            
            // Tampilkan hasil
            document.getElementById('bmiValue').textContent = bmi.toFixed(1);
            document.getElementById('bmiCategory').textContent = kategori;
            document.getElementById('bmiCategory').className = `bmi-category ${kelas}`;
            
            // Generate saran berdasarkan BMI dan jenis kelamin
            const saran = generateSaran(bmi, jenisKelamin, umur, nama);
            document.getElementById('suggestionTitle').textContent = `💡 Saran untuk ${nama}`;
            
            const suggestionList = document.getElementById('suggestionList');
            suggestionList.innerHTML = '';
            
            saran.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                suggestionList.appendChild(li);
            });
            
            // Tampilkan container hasil
            document.getElementById('resultContainer').classList.add('show');
            
            // Scroll ke hasil
            document.getElementById('resultContainer').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
        
        function generateSaran(bmi, jenisKelamin, umur, nama) {
            let saran = [];
            
            if (bmi < 18.5) {
                // Kurus
                saran = [
                    "Konsumsi makanan bergizi tinggi seperti kacang-kacangan, alpukat, dan protein",
                    "Makan dalam porsi kecil tapi sering (5-6 kali sehari)",
                    "Lakukan olahraga ringan seperti yoga atau jalan santai",
                    "Konsultasi dengan dokter atau ahli gizi untuk program penambahan berat badan",
                    "Pastikan tidur cukup 7-8 jam per hari untuk pemulihan tubuh",
                    "Hindari stress berlebihan yang dapat mengurangi nafsu makan"
                ];
            } else if (bmi >= 18.5 && bmi < 25) {
                // Normal
                saran = [
                    "Pertahankan pola makan seimbang dengan 4 sehat 5 sempurna",
                    "Lakukan olahraga rutin 3-4 kali seminggu selama 30 menit",
                    "Minum air putih minimal 8 gelas per hari",
                    "Konsumsi buah dan sayuran segar setiap hari",
                    "Batasi makanan olahan dan fast food",
                    "Jaga pola tidur yang teratur dan berkualitas"
                ];
            } else if (bmi >= 25 && bmi < 30) {
                // Kelebihan berat
                saran = [
                    "Kurangi porsi makan dan pilih makanan rendah kalori",
                    "Tingkatkan aktivitas fisik menjadi 45-60 menit per hari",
                    "Ganti nasi putih dengan nasi merah atau quinoa",
                    "Hindari minuman manis dan beralkohol",
                    "Konsumsi protein tanpa lemak seperti ikan, ayam tanpa kulit",
                    "Catat asupan makanan harian untuk kontrol yang lebih baik"
                ];
            } else {
                // Obesitas
                saran = [
                    "Konsultasi segera dengan dokter untuk program penurunan berat badan",
                    "Mulai dengan olahraga ringan seperti jalan kaki 20-30 menit",
                    "Terapkan pola makan dengan defisit kalori yang aman",
                    "Hindari makanan tinggi gula dan lemak jenuh",
                    "Pertimbangkan konsultasi dengan ahli gizi profesional",
                    "Monitor tekanan darah dan gula darah secara rutin"
                ];
            }
            
            // Tambahkan saran khusus berdasarkan jenis kelamin dan umur
            if (jenisKelamin === 'wanita') {
                if (umur >= 20 && umur <= 35) {
                    saran.push("Pastikan asupan kalsium dan zat besi cukup untuk kesehatan reproduksi");
                } else if (umur > 35) {
                    saran.push("Lakukan pemeriksaan kesehatan rutin termasuk cek hormon");
                }
            } else if (jenisKelamin === 'pria') {
                if (umur >= 30) {
                    saran.push("Perhatikan kesehatan jantung dengan mengurangi garam dan lemak");
                }
            }
            
            return saran;
        }

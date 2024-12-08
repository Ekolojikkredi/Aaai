// Atık türlerine göre puanlar
const wastePoints = {
    "Kağıt": 10, // 1 kg kağıt = 10 puan
    "Plastik": 5, // 1 kg plastik = 5 puan
    "Metal": 8,   // 1 kg metal = 8 puan
    "Cam": 6,     // 1 kg cam = 6 puan
    "Yağ": 20,    // 1 kg yağ = 20 puan
    "Tekstil": 15, // 1 kg tekstil = 15 puan
    "Elektronik Atık": 30, // 1 kg elektronik atık = 30 puan
    "Pil": 50      // 1 kg pil = 50 puan
};

// Global değişkenler
let students = [];  // Öğrencilerin bilgilerini tutacak dizi
let schools = [];   // Okulların bilgilerini tutacak dizi
let totalWaste = 0; // Toplam atık miktarını tutacak sayaç

// Sayfa geçişlerini yöneten fonksiyon
function showPage(page) {
    let pageContent = document.getElementById('page-content'); // Sayfa içeriği
    switch (page) {
        case 'kayit':
            pageContent.innerHTML = getRegistrationPage();
            break;
        case 'veri-goruntuleme':
            pageContent.innerHTML = getDataViewPage();
            break;
        case 'veri-giris':
            pageContent.innerHTML = getDataEntryPage();
            break;
        case 'ekolojik-kredi':
            pageContent.innerHTML = getEcologicalCreditInfo();
            break;
        case 'hazirlayanlar':
            pageContent.innerHTML = getTeamInfo();
            break;
        case 'geri-donusum':
            pageContent.innerHTML = getRecyclingInfo();
            break;
        case 'bize-ulasin':
            pageContent.innerHTML = getContactInfo();
            break;
        default:
            pageContent.innerHTML = '';
    }
}

// Kayıt sayfasını döndüren fonksiyon
function getRegistrationPage() {
    return `
        <h2>Kayıt Ol</h2>
        <button onclick="showSchoolRegistration()">Okul Kaydı</button>
        <button onclick="showStudentRegistration()">Öğrenci Kaydı</button>
    `;
}

// Okul kaydı sayfasını açan fonksiyon
function showSchoolRegistration() {
    let schoolForm = `
        <h3>Okul Kaydı</h3>
        <form id="school-registration-form">
            <label for="schoolName">Okul Adı: </label><input type="text" id="schoolName" required><br>
            <label for="province">İl: </label><input type="text" id="province" required><br>
            <label for="district">İlçe: </label><input type="text" id="district" required><br>
            <label for="schoolPassword">Şifre: </label><input type="password" id="schoolPassword" required><br>
            <button type="button" onclick="registerSchool()">Kaydet</button>
        </form>
    `;
    document.getElementById('page-content').innerHTML = schoolForm;
}

// Okul kaydını işleyen fonksiyon
function registerSchool() {
    const schoolName = document.getElementById('schoolName').value;
    const province = document.getElementById('province').value;
    const district = document.getElementById('district').value;
    const schoolPassword = document.getElementById('schoolPassword').value;
    const newSchool = { schoolName, province, district, schoolPassword };
    schools.push(newSchool); // Okul kaydını okullar dizisine ekler
    alert('Okul kaydedildi!');
    showPage('kayit'); // Kayıt sayfasına geri döner
}

// Öğrenci kaydı sayfasını açan fonksiyon
function showStudentRegistration() {
    let studentForm = `
        <h3>Öğrenci Kaydı</h3>
        <form id="student-registration-form">
            <label for="studentName">Öğrenci Adı: </label><input type="text" id="studentName" required><br>
            <label for="studentSurname">Öğrenci Soyadı: </label><input type="text" id="studentSurname" required><br>
            <label for="studentNumber">Okul Numarası: </label><input type="text" id="studentNumber" required><br>
            <label for="studentEmail">E-posta: </label><input type="email" id="studentEmail" required><br>
            <label for="studentPhone">Telefon: </label><input type="tel" id="studentPhone" required><br>
            <label for="studentClass">Sınıf: </label><input type="text" id="studentClass" required><br>
            <button type="button" onclick="registerStudent()">Kaydet</button>
        </form>
    `;
    document.getElementById('page-content').innerHTML = studentForm;
}

// Öğrenci kaydını işleyen fonksiyon
function registerStudent() {
    const studentName = document.getElementById('studentName').value;
    const studentSurname = document.getElementById('studentSurname').value;
    const studentNumber = document.getElementById('studentNumber').value;
    const studentEmail = document.getElementById('studentEmail').value;
    const studentPhone = document.getElementById('studentPhone').value;
    const studentClass = document.getElementById('studentClass').value;
    const newStudent = { 
        studentName, 
        studentSurname, 
        studentNumber, 
        studentEmail, 
        studentPhone, 
        studentClass, 
        totalPoints: 0 
    };
    students.push(newStudent); // Öğrenci kaydını öğrenciler dizisine ekler
    alert('Öğrenci kaydedildi!');
    showPage('kayit'); // Kayıt sayfasına geri döner
}

// Veri girişi sayfasını gösteren fonksiyon
function getDataEntryPage() {
    return `
        <h3>Atık Girişi</h3>
        <form id="waste-entry-form">
            <label for="wasteType">Atık Türü:</label>
            <select id="wasteType" required>
                <option value="Kağıt">Kağıt</option>
                <option value="Plastik">Plastik</option>
                <option value="Metal">Metal</option>
                <option value="Cam">Cam</option>
                <option value="Yağ">Yağ</option>
                <option value="Tekstil">Tekstil</option>
                <option value="Elektronik Atık">Elektronik Atık</option>
                <option value="Pil">Pil</option>
            </select><br>
            <label for="wasteAmount">Atık Miktarı (kg):</label>
            <input type="number" id="wasteAmount" required><br>
            <button type="button" onclick="submitWasteEntry()">Kaydet</button>
        </form>
    `;
}

// Atık girişi işlemini yapan fonksiyon
function submitWasteEntry() {
    const wasteType = document.getElementById('wasteType').value;
    const wasteAmount = parseFloat(document.getElementById('wasteAmount').value);
    const wastePointsForType = wastePoints[wasteType]; // Seçilen atık türü için puan
    const studentNumber = prompt("Öğrenci numaranızı girin:"); // Öğrencinin numarasını al
    const student = students.find(student => student.studentNumber === studentNumber); // Öğrenciyi bul

    if (student) {
        const totalPoints = wasteAmount * wastePointsForType; // Toplam puan
        student.totalPoints += totalPoints; // Öğrencinin toplam puanını güncelle
        alert(`Atık kaydedildi! Toplam Puan: ${student.totalPoints}`);
        showPage('kayit'); // Kayıt sayfasına geri dön
    } else {
        alert('Öğrenci bulunamadı!');
    }
}

// Veri görüntüleme sayfasını döndüren fonksiyon
function getDataViewPage() {
    return `
        <h3>Veri Görüntüleme</h3>
        <form id="data-view-form">
            <label for="studentEmail">E-posta:</label>
            <input type="email" id="studentEmail" required><br>
            <label for="studentNumber">Öğrenci Numarası:</label>
            <input type="text" id="studentNumber" required><br>
            <button type="button" onclick="viewStudentData()">Veri Görüntüle</button>
        </form>
    `;
}

// Öğrencinin verilerini görüntüleyen fonksiyon
function viewStudentData() {
    const studentEmail = document.getElementById('studentEmail').value;
    const studentNumber = document.getElementById('studentNumber').value;
    const student = students.find(student => student.studentEmail === studentEmail && student.studentNumber === studentNumber); 

    if (student) {
        alert(`Öğrenci: ${student.studentName} ${student.studentSurname}\nToplam Puan: ${student.totalPoints}`);
    } else {
        alert('Öğrenci bulunamadı!');
    }
}

// Ekolojik kredi sayfasını döndüren fonksiyon
function getEcologicalCreditInfo() {
    return `
        <h3>Ekolojik Kredi</h3>
        <p>Ekolojik kredi, geri dönüşüm ve çevre dostu faaliyetlere katılım gösteren bireylere verilen bir ödül sistemidir. Bu sistem, çevreye duyarlı bireylerin katkılarını ödüllendirir. Öğrenciler, geri dönüşüm yaparak veya çevre dostu projelere katılarak puan toplar ve bu puanları ödüllerle takas edebilirler.</p>
    `;
}

// Hazırlayanlar sayfasını döndüren fonksiyon
function getTeamInfo() {
    return `
        <h3>Hazırlayanlar</h3>
        <ul>
            <li>Danışman Öğretmen: Osman Onuk</li>
            <li>Öğrenciler: Muhammedcan Arslanparçası, Bilal Yiğit Tezcan, Yağız Efe Yılmaz</li>
        </ul>
    `;
}

// Geri dönüşüm hakkında bilgi sayfasını döndüren fonksiyon
function getRecyclingInfo() {
    return `
        <h3>Geri Dönüşüm Nedir?</h3>
        <p>Geri dönüşüm, kullanılmaya devam edebilecek materyallerin yeniden işlenmesi ve kullanıma kazandırılması işlemidir. Bu sayede doğal kaynaklar korunur ve çevreye verilen zarar azaltılır.</p>
    `;
}

// Bize ulaşın sayfasını döndüren fonksiyon
function getContactInfo() {
    return `
        <h3>Bize Ulaşın</h3>
        <p>İletişim E-posta: <a href="mailto:ekolojikkreditubitak@gmail.com">ekolojikkreditubitak@gmail.com</a></p>
        <p>YouTube Kanalı: <a href="https://www.youtube.com" target="_blank">YouTube Kanalı Linki</a></p>
    `;
}

// Başlangıçta ana sayfayı göstermek için fonksiyon
window.onload = function() {
    showPage('kayit');
};

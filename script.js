const shareBtn = document.getElementById('share-btn');
let ayatData = {
    surahNumber: '',
    randomAyatNumber: '',
    surahName: '',
    arabicAyat: '',
    banglaTafsir: ''
  };
const quranAPIBaseUrl = "https://api.alquran.cloud/v1";

// Generate a random ayat
function generateAyat() {
    const randomSurahNumber = Math.floor(Math.random() * 114) + 1;

    // Fetch the surah data to get the total ayat count
    fetch(`${quranAPIBaseUrl}/surah/${randomSurahNumber}`)
        .then(response => response.json())
        .then(data => {
            const totalAyats = data.data.ayahs.length;
            const randomAyatNumber = Math.floor(Math.random() * totalAyats) + 1;

            // Fetch the specific ayat
            fetch(`${quranAPIBaseUrl}/ayah/${randomSurahNumber}:${randomAyatNumber}/editions/quran-simple,bn.bengali`)
                .then(response => response.json())
                .then(ayatData => {
                    const arabicAyat = ayatData.data[0].text;
                    const banglaTafsir = ayatData.data[1].text;
                    const surahName = data.data.englishName;
                    const surahNumber = data.data.number;

                    // Display the ayat and tafsir
                    document.getElementById('arabic-ayat').textContent = arabicAyat;
                    document.getElementById('bangla-tafsir').textContent = banglaTafsir;
                    document.getElementById('surah-info').textContent = `${surahName} (Surah ${surahNumber}): Ayat ${randomAyatNumber}`;


                    ayatData.surahNumber= surahNumber;
                    ayatData.randomAyatNumber= randomAyatNumber;
                    ayatData.surahName= surahName;
                    ayatData.arabicAyat= arabicAyat;
                    ayatData.banglaTafsir= banglaTafsir;
                });
        })
        .catch(error => console.error("Error fetching data:", error));
}


// Function to share and pass data to card.html
shareBtn.addEventListener('click', () => {
  localStorage.setItem('ayatData', JSON.stringify(ayatData));
  window.location.href = 'card.html';
});

console.log('Generated Ayat Data:', ayatData.arabicAyat)
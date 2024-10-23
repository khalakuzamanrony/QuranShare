const generateBtn = document.getElementById('generate-btn');
const shareBtn = document.getElementById('share-btn');

let ayatData = {
  surah: '',
  ayat: '',
  surahName: '',
  arabic: '',
  bangla: ''
};

// Fetch data from the API
async function fetchAyat(surah, ayat) {
  const response = await fetch(`https://api.alquran.cloud/v1/ayah/${surah}:${ayat}/editions/quran-simple,bn.bengali`);
  const data = await response.json();
  return data;
}

// Function to generate random ayat
generateBtn.addEventListener('click', async () => {
  const surahNumber = Math.floor(Math.random() * 114) + 1;
  const surahResponse = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
  const surahData = await surahResponse.json();
  const totalAyats = surahData.data.ayahs.length;
  const surahName = surahData.data.englishName;

  const ayatNumber = Math.floor(Math.random() * totalAyats) + 1;
  const ayatDetails = await fetchAyat(surahNumber, ayatNumber);



  ayatData.surah = surahNumber;
  ayatData.ayat = ayatNumber;
  ayatData.surahName = surahName;
  ayatData.arabic = ayatDetails.data[0].text;
  ayatData.bangla = ayatDetails.data[1].text;

  document.getElementById('arabic-ayat').innerText = ayatData.arabic;
  document.getElementById('bangla-tafsir').innerText = ayatData.bangla;
  document.getElementById('surah-info').innerText = `- Surah ${surahName} (${surahNumber}) : Ayat ${ayatNumber}`;
});

// Function to share and pass data to card.html
shareBtn.addEventListener('click', () => {
  localStorage.setItem('ayatData', JSON.stringify(ayatData));

  window.location.href = 'card.html';
  window.open('card.html', '_blank');
});

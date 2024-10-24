const generateBtn = document.getElementById('generate-btn');
const shareBtn = document.getElementById('share-btn');
const surahNamesInBangla = [
    "আল-ফাতিহা", "আল-বাকারা", "আল-ইমরান পরিবার", "আন-নিসা", "আল-মায়িদা",
    "আল-আন'আম", "আল-আ'রাফ", "আল-আনফাল", "আত-তওবা", "ইউনুস", "হুদ", "ইউসুফ",
    "আর-রা'দ", "ইবরাহিম", "আল-হিজর", "আন-নাহল", "বনি ইসরাইল", "আল-কাহফ",
    "মারইয়াম", "ত্বা-হা", "আল-আম্বিয়া", "আল-হাজ্জ", "আল-মু’মিনুন", "আন-নূর",
    "আল-ফুরকান", "আশ-শু'আরা", "আন-নামল", "আল-কাসাস", "আল-আঙ্কাবুত", "আর-রূম",
    "লুকমান", "আস-সিজদা", "আল-আহযাব", "সাবা", "ফাতির", "ইয়াসিন", "আস-সাফফাত",
    "সাদ", "আয-যুমার", "গাফির", "ফুসসিলাত", "আশ-শূরা", "আয-যুখরুফ", "আদ-দোখান",
    "আল-জাছিয়া", "আল-আহকাফ", "মুহাম্মাদ", "আল-ফাতহ", "আল-হুজুরাত", "কাফ",
    "আয-যারিয়াত", "আত-তূর", "আন-নাজম", "আল-ক্বামার", "আর-রহমান", "আল-ওয়াকিয়া",
    "আল-হাদীদ", "আল-মুজাদিলা", "আল-হাশর", "আল-মুমতাহিনা", "আস-ছাফ", "আল-জুমু'আ",
    "আল-মুনাফিকুন", "আত-তাগাবুন", "আত-তালাক", "আত-তাহরিম", "আল-মুলক", "আল-কলম",
    "আল-হাক্কাহ", "আল-মাআরিজ", "নূহ", "আল-জ্বিন", "আল-মুজ্জাম্মিল", "আল-মুদ্দাসসির",
    "আল-কেয়ামাহ", "আল-ইনসান", "আল-মুরসালাত", "আন-নাবা", "আন-নাযিয়াত", "'আবাসা",
    "আত-তাকবির", "আল-ইনফিতার", "আল-মুতাফফিফিন", "আল-ইনশিক্বাক", "আল-বুরুজ",
    "আত-তারিক", "আল-আ'লা", "আল-গাশিয়াহ", "আল-ফাজর", "আল-বালাদ", "আশ-শামস",
    "আল-লাইল", "আদ-দুহা", "আল-ইনশিরাহ", "আত-তীন", "আল-আলাক", "আল-কদর",
    "আল-বাইয়্যিনাহ", "আয-যিলযাল", "আল-আদিয়াত", "আল-কারিয়াহ", "আত-তাকাসুর",
    "আল-আসর", "আল-হুমাযাহ", "আল-ফীল", "কুরাইশ", "আল-মাউন", "আল-কাওসার",
    "আল-কাফিরুন", "আন-নাসর", "আল-লাহাব", "আল-ইখলাস", "আল-ফালাক", "আন-নাস"
  ];

let ayatData = {
  surah: '',
  ayat: '',
  surahBName: '',
  arabic: '',
  bangla: '',
  surahEname: '',
  surahEayah: ''
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



//   ayatData.surah = surahNumber;
//   ayatData.ayat = ayatNumber;
//   ayatData.surahName = surahName;
//   ayatData.arabic = ayatDetails.data[0].text;
//   ayatData.bangla = ayatDetails.data[1].text;


const surahBName= getSurahNameAndBanglaNumber(surahNumber).surahName;
const surahBNum= getSurahNameAndBanglaNumber(surahNumber).banglaNumber;
const ayahBNum= getBanglaNumber(ayatNumber);

ayatData.surah = surahBNum;
ayatData.ayat = ayahBNum;
ayatData.surahEayah = ayatNumber;
ayatData.surahBName = surahBName;
ayatData.surahEname = surahName;
ayatData.arabic = ayatDetails.data[0].text;
ayatData.bangla = ayatDetails.data[1].text;

  document.getElementById('arabic-ayat').innerText = ayatData.arabic;
  document.getElementById('bangla-tafsir').innerText = ayatData.bangla;
  //document.getElementById('surah-info').innerText = `- Surah ${surahName} (${surahNumber}) : Ayat ${ayatNumber}`;
  document.getElementById('surah-info').innerText = `-${surahBName} ${surahBNum} : ${ayahBNum}`;
  document.getElementById('surah-info-eng').innerText = `-${surahName}  ${surahNumber} : ${ayatNumber}`;
});

//Function to share and pass data to card.html

shareBtn.addEventListener('click', () => {
    const selectedCard = document.getElementById('cardDesignSelector').value;
  localStorage.setItem('ayatData', JSON.stringify(ayatData));

  window.location.href = `${selectedCard}`;
  window.open(`${selectedCard}`, '_blank');
});



function getSurahNameAndBanglaNumber(num) {
    if (num < 1 || num > 114) {
      return "Invalid Surah number";
    }
    const surahName = surahNamesInBangla[num - 1];
    const banglaNumber = getBanglaNumber(num);
    return { surahName, banglaNumber };
  }

  function getBanglaNumber(num) {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    let banglaNumber = "";
    while (num > 0) {
      const digit = num % 10;
      banglaNumber = banglaDigits[digit] + banglaNumber;
      num = Math.floor(num / 10);
    }
    return banglaNumber;
  }
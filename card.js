let sn='';
document.addEventListener('DOMContentLoaded', () => {
  const ayatData = JSON.parse(localStorage.getItem('ayatData'));
sn = `${ayatData.surahEname}:${ayatData.surahEayah}`;
console.log(""+sn);
  document.getElementById('card-arabic-ayat').innerText = ayatData.arabic;
  document.getElementById('card-bangla-tafsir').innerText = ayatData.bangla;
  document.getElementById('card-surah-info').innerText = `- ${ayatData.surahBName} (${ayatData.surah}) : ${ayatData.ayat}`;
  document.getElementById('card-surah-info').innerText = `- ${ayatData.surahBName} (${ayatData.surah}) : ${ayatData.ayat}`;
});

// Download the card as PNG using html2canvas
document.getElementById('download-btn').addEventListener('click', () => {
  const card = document.getElementById('card');
  html2canvas(card).then(canvas => {
    const link = document.createElement('a');
    link.download = `${sn}.png`;
    link.href = canvas.toDataURL();
    link.click();
  });
});

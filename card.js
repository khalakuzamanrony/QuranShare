document.addEventListener('DOMContentLoaded', () => {
    const ayatData = JSON.parse(localStorage.getItem('ayatData'));
  
    document.getElementById('card-arabic-ayat').innerText = ayatData.arabic;
    document.getElementById('card-bangla-tafsir').innerText = ayatData.bangla;
    document.getElementById('card-surah-info').innerText = `- ${ayatData.surahName} (${ayatData.surah}): ${ayatData.ayat}`;
  });
  
  // Download the card as PNG using html2canvas
  document.getElementById('download-btn').addEventListener('click', () => {
    const card = document.getElementById('card');
    html2canvas(card).then(canvas => {
      const link = document.createElement('a');
      link.download = 'ayat-card.webp';
      link.href = canvas.toDataURL();
      link.click();
    });
  });
  








  
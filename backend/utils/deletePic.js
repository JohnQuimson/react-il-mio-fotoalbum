const fs = require('fs');
const path = require('path');

const deletePic = (folder, filename) => {
  const filePath = path.join(__dirname, '..', 'public', folder, filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(
        `Errore durante l'eliminazione dell'immagine: ${err.message}`
      );
    } else {
      console.log(`Immagine ${filename} eliminata con successo`);
    }
  });
};

module.exports = deletePic;

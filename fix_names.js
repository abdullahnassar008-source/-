const fs = require('fs');
const path = require('path');

const booksDir = 'c:\\My track\\game foot ball\\web_app\\assets\\books';
const appJsPath = 'c:\\My track\\game foot ball\\web_app\\app.js';

try {
    let appJsContent = fs.readFileSync(appJsPath, 'utf8');
    const files = fs.readdirSync(booksDir).filter(f => f.endsWith('.pdf'));

    files.forEach((file, index) => {
        // Skip if already renamed to bookX.pdf to avoid double renaming if run multiple times
        if (file.match(/^book\d+\.pdf$/)) return;
        
        const oldPath = path.join(booksDir, file);
        const newName = `book${index + 1}.pdf`;
        const newPath = path.join(booksDir, newName);
        
        fs.renameSync(oldPath, newPath);
        
        // Update app.js content
        // Note: we replace the exact string in the file
        const oldPathInJS = 'assets/books/' + file;
        const newPathInJS = 'assets/books/' + newName;
        
        // It might be possible that some chars are escaped differently, but usually it matches
        appJsContent = appJsContent.replace(oldPathInJS, newPathInJS);
        // Also try URL encoded version just in case
        appJsContent = appJsContent.replace(encodeURI(oldPathInJS), newPathInJS);
    });

    fs.writeFileSync(appJsPath, appJsContent, 'utf8');
    console.log('Successfully renamed files and updated app.js');
} catch(e) {
    console.error(e);
}

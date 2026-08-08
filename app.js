const books = [
    { title: '10- المسك الأذفر في قراءة الإمام يزيد بن القعقاع أبي جعفر', author: '', path: 'assets/books/10- المسك الأذفر في قراءة الإمام يزيد بن القعقاع أبي جعفر.pdf' },
    { title: '11- حياة القلوب في قراءة الإمام الحضرمي يعقوب', author: '', path: 'assets/books/11- حياة القلوب في قراءة الإمام الحضرمي يعقوب.pdf' },
    { title: '12- رحيق الأزهار في قراءة الإمام خلف بن هشام البزَّار', author: '', path: 'assets/books/12- رحيق الأزهار في قراءة الإمام خلف بن هشام البزَّار.pdf' },
    { title: '13- قطرٌ من غيث النفع في أصول ومفردات القراءات السبع', author: '', path: 'assets/books/13- قطرٌ من غيث النفع في أصول ومفردات القراءات السبع.pdf' },
    { title: '14- البشرى في تيسير القراءات العشر الكبرى للشيخ محمد نبهان مصري رحمه الله', author: '', path: 'assets/books/14- البشرى في تيسير القراءات العشر الكبرى للشيخ محمد نبهان مصري رحمه الله.pdf' },
    { title: '2- الاستبرق في رواية الإمام ورش عن نافع من طريق الأزرق', author: '', path: 'assets/books/2- الاستبرق في رواية الإمام ورش عن نافع من طريق الأزرق.pdf' },
    { title: '3- القمر المنير في قراءة الإمام المكي عبد الله بن كثير', author: '', path: 'assets/books/3- القمر المنير في قراءة الإمام المكي عبد الله بن كثير.pdf' },
    { title: '4- فوح العطر في رواية  الإمام الدوري عن أبي عمرو', author: '', path: 'assets/books/4- فوح العطر في رواية  الإمام الدوري عن أبي عمرو.pdf' },
    { title: '5- حُسْن الجلاء في رواية السوسي عن أبي عمرو بن العلاء', author: '', path: 'assets/books/5- حُسْن الجلاء في رواية السوسي عن أبي عمرو بن العلاء.pdf' },
    { title: '6- السنا الزاهر في قراءة الإمام الشامي عبد الله بن عامر', author: '', path: 'assets/books/6- السنا الزاهر في قراءة الإمام الشامي عبد الله بن عامر.pdf' },
    { title: '7- الرِّياش في رواية الإمام شعبة بن عيَّاش', author: '', path: 'assets/books/7- الرِّياش في رواية الإمام شعبة بن عيَّاش.pdf' },
    { title: '8- أزكى التحيات في قراءة الإمام حمزة بن حبيب الزيَّات', author: '', path: 'assets/books/8- أزكى التحيات في قراءة الإمام حمزة بن حبيب الزيَّات.pdf' },
    { title: '9- النور السنائي قي قراءة علي بن حمزة الكسائي', author: '', path: 'assets/books/9- النور السنائي قي قراءة علي بن حمزة الكسائي.pdf' },
    { title: 'البدور الزاهرة', author: '', path: 'assets/books/البدور الزاهرة.pdf' },
    { title: 'الثمر اليانع في رواية الإمام قالون عن نافع', author: '', path: 'assets/books/الثمر اليانع في رواية الإمام قالون عن نافع.pdf' }
];

document.addEventListener('DOMContentLoaded', () => {
    const booksList = document.getElementById('books-list');
    const modal = document.getElementById('pdf-modal');
    const closeBtn = document.getElementById('close-modal');
    const pdfFrame = document.getElementById('pdf-frame');
    const modalTitle = document.getElementById('modal-title');
    const loader = document.getElementById('pdf-loader');

    // Render books
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <div class="book-icon">
                <i class="ri-book-mark-line"></i>
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
            </div>
            <div class="book-action">
                <i class="ri-arrow-left-s-line"></i>
            </div>
        `;
        
        card.addEventListener('click', () => openBook(book));
        booksList.appendChild(card);
    });

    // Open book modal
    function openBook(book) {
        modalTitle.textContent = book.title;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reset frame
        pdfFrame.style.display = 'none';
        loader.style.display = 'block';
        
        // Simulate loading time for smooth transition, then set source
        setTimeout(() => {
            pdfFrame.src = book.path;
            
            // Note: In a real environment, you might wait for iframe load event
            // But since PDFs load progressively, we'll just show it after a small delay
            setTimeout(() => {
                loader.style.display = 'none';
                pdfFrame.style.display = 'block';
            }, 800);
            
        }, 300);
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            pdfFrame.src = '';
        }, 300); // Wait for transition to finish
    }

    closeBtn.addEventListener('click', closeModal);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. LOGIKA PAGINATION (SLIDE GAMBAR)
    // ==========================================
    
    // Ambil elemen dari HTML
    const teamContent = document.getElementById('team-content');
    const paginationContainer = document.getElementById('pagination');
    
    // Ambil semua list orang yang sudah ditulis di HTML
    const allMembers = Array.from(document.querySelectorAll('.team-member'));

    // Konfigurasi
    const itemsPerPage = 4; // Tampilkan 4 gambar per slide
    let currentPage = 1;
    const totalPages = Math.ceil(allMembers.length / itemsPerPage);

    // --- FUNGSI TAMPILKAN HALAMAN ---
    function showPage(page) {
        // Validasi agar tidak error
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        
        currentPage = page;

        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        // Loop semua data: Tampilkan jika masuk range, Sembunyikan jika tidak
        allMembers.forEach((member, index) => {
            if (index >= start && index < end) {
                member.style.display = 'block'; // Muncul
            } else {
                member.style.display = 'none';  // Hilang
            }
        });

        // Update tombol navigasi
        renderPaginationButtons();
    }

    // --- FUNGSI MEMBUAT TOMBOL (Previous 1 2 3 Next) ---
    function renderPaginationButtons() {
        paginationContainer.innerHTML = ""; // Bersihkan tombol lama

        // A. Tombol PREVIOUS
        const prevBtn = document.createElement('button');
        prevBtn.innerText = "Previous";
        prevBtn.disabled = currentPage === 1; // Mati jika di halaman 1
        prevBtn.addEventListener('click', () => {
            showPage(currentPage - 1);
        });
        paginationContainer.appendChild(prevBtn);

        // B. Tombol ANGKA (1, 2, 3...)
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.innerText = i;
            
            // Beri warna hijau jika ini halaman aktif
            if (i === currentPage) {
                btn.classList.add('active');
            }

            btn.addEventListener('click', () => {
                showPage(i);
            });
            
            paginationContainer.appendChild(btn);
        }

        // C. Tombol NEXT
        const nextBtn = document.createElement('button');
        nextBtn.innerText = "Next";
        nextBtn.disabled = currentPage === totalPages; // Mati jika di halaman terakhir
        nextBtn.addEventListener('click', () => {
            showPage(currentPage + 1);
        });
        paginationContainer.appendChild(nextBtn);
    }

    // Jalankan Pagination jika ada data pengurus
    if (allMembers.length > 0) {
        showPage(1);
    }


    // ==========================================
    // 2. NAVBAR SHADOW SAAT SCROLL
    // ==========================================
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
                navbar.style.padding = "10px 5%";
            } else {
                navbar.style.boxShadow = "0 2px 15px rgba(0,0,0,0.05)";
                navbar.style.padding = "15px 5%";
            }
        }
    });

});

// ... (kode pagination sebelumnya) ...

    // --- 3. FITUR KIRIM PESAN (KONTAK) ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Mencegah halaman refresh
            
            // Ambil nilai (bisa dikembangkan nanti untuk dikirim ke email)
            const name = document.getElementById('name').value;
            
            // Tampilkan pesan sukses
            alert(`Terima kasih, ${name}! Pesan Anda telah kami terima.`);
            
            // Kosongkan form
            contactForm.reset();
        });
    }

    // ... (kode scroll navbar sebelumnya) ...

    // ==========================================
// 3. FITUR LIGHTBOX GALERI (POPUP GAMBAR)
// ==========================================

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const galleryImages = document.querySelectorAll('.gallery-item img'); // Ambil semua gambar di galeri

let currentImageIndex = 0; // Melacak gambar mana yang sedang dibuka

// A. Fungsi Buka Lightbox saat Gambar Diklik
if (galleryImages.length > 0) {
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            lightbox.style.display = "flex"; // UBAH DARI 'block' KE 'flex'
            lightboxImg.src = img.src; 
            currentImageIndex = index; 
            document.body.style.overflow = "hidden"; 
        });
    });
}

// B. Fungsi Tutup Lightbox
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto"; // Hidupkan scroll kembali
    });
}

// Tutup jika klik di luar gambar (area gelap)
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
}

// C. Fungsi Ganti Gambar (Next/Prev)
function changeImage(direction) {
    currentImageIndex += direction;

    // Loop kembali ke awal jika sudah di akhir, dan sebaliknya
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }

    // Ganti sumber gambar popup
    lightboxImg.src = galleryImages[currentImageIndex].src;
}

const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-links');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

// Menutup menu saat salah satu link diklik
document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
    menu.classList.remove('is-active');
    menuLinks.classList.remove('active');
}));
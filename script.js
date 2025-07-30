// Simulasi data kamar tersedia
const kamarData = [
    { tipe: "Umum", tersedia: Math.floor(Math.random() * 10) + 1 },
    { tipe: "VIP", tersedia: Math.floor(Math.random() * 5) + 1 },
    { tipe: "ICU", tersedia: Math.floor(Math.random() * 3) + 1 }
];

function tampilkanKamar() {
    let html = "<ul>";
    kamarData.forEach(kamar => {
        html += `<li>${kamar.tipe}: <strong>${kamar.tersedia}</strong> kamar tersedia</li>`;
    });
    html += "</ul>";
    document.getElementById("kamar-status").innerHTML = html;
}

function refreshKamar() {
    kamarData.forEach(kamar => {
        kamar.tersedia = Math.floor(Math.random() * 10) + 1;
    });
    tampilkanKamar();
}

// Simpan data ke LocalStorage
function simpanPendaftaran(data) {
    let daftar = JSON.parse(localStorage.getItem("pendaftaranRSUNTAN")) || [];
    daftar.push(data);
    localStorage.setItem("pendaftaranRSUNTAN", JSON.stringify(daftar));
}

// Fitur animasi menarik pada card pendaftar (fade-in dan hover pulse)
function animatePendaftarTable() {
    const table = document.querySelector("#daftar-list table");
    if (table) {
        table.style.opacity = "0";
        table.style.transform = "translateY(24px)";
        setTimeout(() => {
            table.style.transition = "opacity 0.7s, transform 0.7s";
            table.style.opacity = "1";
            table.style.transform = "translateY(0)";
        }, 100);
        // Animasi pulse pada hover baris
        Array.from(table.querySelectorAll("tr")).forEach((row, idx) => {
            if (idx === 0) return; // skip header
            row.onmouseenter = function() {
                row.style.boxShadow = "0 0 16px #ffd70099";
                row.style.transform = "scale(1.03)";
                row.style.transition = "box-shadow 0.3s, transform 0.3s";
            };
            row.onmouseleave = function() {
                row.style.boxShadow = "";
                row.style.transform = "";
            };
        });
    }
}

// DARK MODE TOGGLE MODERN
document.getElementById('darkmode-toggle').onclick = function() {
    document.body.classList.toggle('darkmode');
    // Optional: animasi transisi dark mode
    document.body.style.transition = 'background 0.5s, color 0.3s';
    // Toast feedback
    if (typeof showToast === "function") {
        showToast(document.body.classList.contains('darkmode') ? 'Dark mode aktif' : 'Dark mode nonaktif', '#0fc0e8');
    }
};

// Upgrade animasi & tampilan fitur modern
function animateFeatureCards() {
    document.querySelectorAll('.feature, .modern-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            card.classList.add('selected');
        });
        card.addEventListener('mouseleave', function() {
            card.classList.remove('selected');
        });
        card.addEventListener('focus', function() {
            card.classList.add('selected');
        });
        card.addEventListener('blur', function() {
            card.classList.remove('selected');
        });
    });
}
document.addEventListener("DOMContentLoaded", animateFeatureCards);

// Animasi pada toast notification
function showToast(msg, color='#0fc0e8') {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.position = 'fixed';
        toast.style.bottom = '32px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = color;
        toast.style.color = '#fff';
        toast.style.padding = '12px 28px';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 2px 16px #002c79';
        toast.style.display = 'none';
        toast.style.fontSize = '16px';
        toast.style.zIndex = '999';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.background = color;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.opacity = '1'; }, 50);
    setTimeout(() => { toast.style.opacity = '0'; }, 2200);
    setTimeout(() => { toast.style.display = 'none'; }, 2500);
}

// Panggil animasi setelah daftar pendaftar dan fitur card muncul
function tampilkanDaftar() {
    let daftar = JSON.parse(localStorage.getItem("pendaftaranRSUNTAN")) || [];
    let html = "<h3>Data Pendaftar Rawat Inap</h3>";
    if (daftar.length === 0) {
        html += "<p>Belum ada pendaftar.</p>";
    } else {
        html += "<table border='1' cellpadding='6' style='width:100%;margin-top:10px'><tr><th>Nama</th><th>Umur</th><th>Jenis Kelamin</th><th>Kamar</th><th>Keluhan</th></tr>";
        daftar.forEach(d => {
            html += `<tr>
                <td>${d.nama}</td>
                <td>${d.umur}</td>
                <td>${d.jenis_kelamin}</td>
                <td>${d.kamar}</td>
                <td>${d.keluhan}</td>
            </tr>`;
        });
        html += "</table>";
    }
    let daftarDiv = document.getElementById("daftar-list");
    if (daftarDiv) {
        daftarDiv.innerHTML = html;
        animatePendaftarTable();
    }
}

// Toast notification
function showToast(msg, color='#0fc0e8') {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.position = 'fixed';
        toast.style.bottom = '32px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = color;
        toast.style.color = '#fff';
        toast.style.padding = '12px 28px';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 2px 16px #002c79';
        toast.style.display = 'none';
        toast.style.fontSize = '16px';
        toast.style.zIndex = '999';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.background = color;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.opacity = '1'; }, 50);
    setTimeout(() => { toast.style.opacity = '0'; }, 2200);
    setTimeout(() => { toast.style.display = 'none'; }, 2500);
}

// Animasi pada submit pendaftaran
function showLoaderOnForm() {
    let loader = document.getElementById('form-loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'form-loader';
        loader.innerHTML = '<span class="loader"></span> Memproses...';
        loader.style.textAlign = 'center';
        loader.style.marginTop = '10px';
        document.getElementById('form-daftar').appendChild(loader);
    }
    loader.style.display = 'block';
}
function hideLoaderOnForm() {
    let loader = document.getElementById('form-loader');
    if (loader) loader.style.display = 'none';
}

// Floating chat button animasi
let floatingChat = document.getElementById('floating-chat');
if (floatingChat) {
    floatingChat.onmouseenter = function() {
        floatingChat.style.transform = 'scale(1.1)';
        showToast('Hubungi admin via WhatsApp!', '#0fc0e8');
    };
    floatingChat.onmouseleave = function() {
        floatingChat.style.transform = 'scale(1)';
    };
}

// Animasi submit pendaftaran
document.addEventListener("DOMContentLoaded", function() {
    tampilkanKamar();
    tampilkanDaftar();

    const form = document.getElementById("form-daftar");
    const alertBox = document.getElementById("form-alert");
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        showLoaderOnForm();
        setTimeout(() => {
            const data = {
                nama: form.nama.value,
                umur: form.umur.value,
                jenis_kelamin: form.jenis_kelamin.value,
                kamar: form.kamar.value,
                keluhan: form.keluhan.value
            };
            simpanPendaftaran(data);
            hideLoaderOnForm();
            alertBox.style.display = "block";
            alertBox.textContent = "Pendaftaran berhasil! Data Anda telah tersimpan.";
            showToast("Pendaftaran berhasil!", "#0fc0e8");
            form.reset();
            tampilkanDaftar();
            setTimeout(() => { alertBox.style.display = "none"; }, 4000);
        }, 1200);
    });

    // FAQ interaktif (expand/collapse)
    document.querySelectorAll('#faq ul li').forEach(function(item) {
        item.style.cursor = "pointer";
        item.addEventListener('click', function() {
            if (item.childNodes.length > 1) {
                let detail = item.querySelector('span');
                if (detail) {
                    detail.style.display = detail.style.display === "none" ? "inline" : "none";
                }
            }
        });
    });

    // Kontak interaktif
    let kontakSection = document.getElementById("kontak");
    if (kontakSection) {
        let waBtn = document.createElement("button");
        waBtn.textContent = "Chat WhatsApp";
        waBtn.className = "glow-btn";
        waBtn.style.marginRight = "10px";
        waBtn.onclick = function() {
            window.open("https://wa.me/6281234567890", "_blank");
        };
        kontakSection.appendChild(waBtn);

        let emailBtn = document.createElement("button");
        emailBtn.textContent = "Kirim Email";
        emailBtn.className = "glow-btn";
        emailBtn.onclick = function() {
            window.location.href = "mailto:info@rsuntan.ac.id";
        };
        kontakSection.appendChild(emailBtn);
    }

    // Tombol export, print, clear, dan search
    let exportBtn = document.getElementById('export-btn');
    if (exportBtn) exportBtn.onclick = exportPendaftarCSV;
    let printBtn = document.getElementById('print-data-btn');
    if (printBtn) printBtn.onclick = printPendaftar;
    let clearBtn = document.getElementById('clear-data-btn');
    if (clearBtn) clearBtn.onclick = clearPendaftar;
    let searchInput = document.getElementById('search-pendaftar');
    if (searchInput) searchInput.oninput = function() {
        searchPendaftar(this.value);
        tampilkanStatistikPendaftar();
    };

    // Tampilkan statistik saat daftar pendaftar muncul
    tampilkanStatistikPendaftar();
    animateFeatureCards();
});

// ====== FITUR PANEL ADMIN RAHASIA & PASSWORD ======
function getPendaftarDB() {
    return JSON.parse(localStorage.getItem('pendaftaranRSUNTAN') || '[]');
}

function renderAdminTable() {
    const data = getPendaftarDB();
    let html = `<h3>Data Pendaftar Rawat Inap</h3>`;
    html += `<button id="clear-db-btn" class="glow-btn" style="margin-bottom:14px;background:#ffd700;color:#002c79;">Hapus Semua Data</button>`;
    if (!data.length) {
        html += "<p style='color:red;'>Belum ada pendaftar.</p>";
    } else {
        html += `<table border='1' cellpadding='6' style='width:100%;margin-top:10px'>
            <tr style='background:#0fc0e8;color:#fff;'>
                <th>No</th>
                <th>No. Rekam Medis</th>
                <th>Nama</th>
                <th>Umur</th>
                <th>Jenis Kelamin</th>
                <th>Kamar</th>
                <th>Keluhan</th>
                <th>Surat Rujukan</th>
                <th>QR Data</th>
            </tr>`;
        data.forEach((d, i) => {
            const qrText = `No. Rekam Medis: ${d.no_rekam_medis || ''}\nNama: ${d.nama || ''}\nUmur: ${d.umur || ''}\nJenis Kelamin: ${d.jenis_kelamin || ''}\nKamar: ${d.kamar || ''}\nKeluhan: ${d.keluhan || ''}`;
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(qrText)}`;
            html += `<tr>
                <td>${i + 1}</td>
                <td>${d.no_rekam_medis || ''}</td>
                <td>${d.nama || ''}</td>
                <td>${d.umur || ''}</td>
                <td>${d.jenis_kelamin || ''}</td>
                <td>${d.kamar || ''}</td>
                <td>${d.keluhan || ''}</td>
                <td>${d.surat ? `<a href="${d.surat}" target="_blank">Lihat Surat</a>` : ''}</td>
                <td>
                    <img src="${qrUrl}" alt="QR Data" title="QR Data ${d.nama || ''}" style="border-radius:6px;box-shadow:0 2px 8px #0fc0e822;">
                </td>
            </tr>`;
        });
        html += "</table>";
    }
    let adminDiv = document.getElementById("admin-db-table");
    if (adminDiv) adminDiv.innerHTML = html;

    // Tombol hapus semua data
    const clearBtn = document.getElementById('clear-db-btn');
    if (clearBtn) {
        clearBtn.onclick = function() {
            if (confirm('Yakin ingin menghapus semua data pendaftar?')) {
                localStorage.removeItem('pendaftaranRSUNTAN');
                renderAdminTable();
                if (typeof showToast === "function") showToast('Semua data pendaftar berhasil dihapus!', '#ff4d4d');
            }
        };
    }
}

// Fungsi hapus data per baris
window.hapusDataPendaftar = function(idx) {
    let data = getPendaftarDB();
    if (confirm('Yakin ingin menghapus data ini?')) {
        data.splice(idx, 1);
        localStorage.setItem('pendaftaranRSUNTAN', JSON.stringify(data));
        renderAdminTable();
        if (typeof showToast === "function") showToast('Data berhasil dihapus!', '#ff4d4d');
    }
};

// ====== Panel admin hanya bisa diakses dengan password khusus ======
function showAdminLogin() {
    if (document.getElementById('admin-login-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'admin-login-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,44,121,0.18)';
    modal.style.zIndex = '9999';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.innerHTML = `
        <div style="background:#fff;padding:32px 28px;border-radius:18px;box-shadow:0 8px 32px #0fc0e8;min-width:280px;">
            <h3 style="color:#0fc0e8;margin-bottom:18px;">Login Admin</h3>
            <input type="password" id="admin-password" placeholder="Masukkan password admin" style="width:100%;padding:10px;border-radius:8px;border:1px solid #0fc0e8;margin-bottom:14px;">
            <button id="admin-login-btn" class="glow-btn" style="width:100%;">Login</button>
            <div id="admin-login-alert" style="color:red;margin-top:10px;display:none;"></div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('admin-login-btn').onclick = function() {
        const pass = document.getElementById('admin-password').value;
        // Password khusus admin, ubah sesuai keinginan
        if (pass === 'untan') {
            modal.remove();
            document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
            document.getElementById('admin-panel').style.display = 'block';
            document.getElementById('admin-panel').classList.add('active');
            renderAdminTable();
        } else {
            document.getElementById('admin-login-alert').textContent = 'Password salah!';
            document.getElementById('admin-login-alert').style.display = 'block';
        }
    };
}

// Tombol akses admin (hanya admin, rahasia)
if (!document.getElementById('admin-access-btn')) {
    const adminAccessBtn = document.createElement('button');
    adminAccessBtn.textContent = 'Panel Admin';
    adminAccessBtn.id = 'admin-access-btn';
    adminAccessBtn.className = 'glow-btn';
    adminAccessBtn.style.position = 'fixed';
    adminAccessBtn.style.bottom = '90px';
    adminAccessBtn.style.right = '24px';
    adminAccessBtn.style.zIndex = '999';
    adminAccessBtn.style.opacity = '0'; 
    adminAccessBtn.style.pointerEvents = 'none';
    // Untuk akses, tekan kombinasi keyboard: Ctrl+Shift+A
    window.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
            adminAccessBtn.style.opacity = '1';
            adminAccessBtn.style.pointerEvents = 'auto';
            setTimeout(() => {
                adminAccessBtn.style.opacity = '0';
                adminAccessBtn.style.pointerEvents = 'none';
            }, 7000); // Tombol admin muncul 7 detik
        }
    });
    adminAccessBtn.onclick = showAdminLogin;
    document.body.appendChild(adminAccessBtn);
}

// Tombol logout admin
document.getElementById('admin-logout-btn').onclick = function() {
    // Sembunyikan panel admin
    document.getElementById('admin-panel').style.display = 'none';
    document.getElementById('admin-panel').classList.remove('active');
    // Tampilkan tampilan awal (login)
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById('login').classList.add('active');
    // Nonaktifkan menu navigasi jika ada
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.classList.add('disabled');
        link.style.pointerEvents = 'none';
        link.style.opacity = '0.5';
        link.classList.remove('active');
    });
    // Sembunyikan tombol logout utama jika ada
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (typeof showToast === "function") showToast('Anda telah logout!', '#e53935');
};

// Simpan data pendaftar ke database setiap kali daftar (termasuk surat rujukan)
document.addEventListener('submit', function(e) {
    if (e.target && e.target.id === 'form-daftar-kamar') {
        const formData = new FormData(e.target);
        const no_rekam_medis = formData.get("no_rekam_medis");
        const nama = formData.get("nama");
        const umur = formData.get("umur");
        const jenis_kelamin = formData.get("jenis_kelamin");
        const kamar = formData.get("kamar");
        const keluhan = formData.get("keluhan");
        let surat = "";
        const fileInput = e.target.querySelector('input[name="rujukan"]');
        if (fileInput && fileInput.files && fileInput.files[0]) {
            surat = URL.createObjectURL(fileInput.files[0]);
        }
        let daftar = getPendaftarDB();
        daftar.push({no_rekam_medis, nama, umur, jenis_kelamin, kamar, keluhan, surat});
        localStorage.setItem('pendaftaranRSUNTAN', JSON.stringify(daftar));
        // Otomatis update tabel admin jika panel admin sedang aktif
        if (document.getElementById('admin-panel')?.classList.contains('active')) {
            renderAdminTable();
        }
    }
});

// === Fitur Beranda: Tampilkan info sesuai tombol yang diklik ===
document.addEventListener("DOMContentLoaded", function() {
    // Pastikan elemen ada
    const infoBeranda = {
        'btn-cara': `
            <div style="display:flex;align-items:center;gap:24px;">
                <div style="flex:0 0 70px;">
                    <div style="background:#0fc0e8;border-radius:50%;width:70px;height:70px;display:flex;align-items:center;justify-content:center;">
                        <span style="font-size:38px;color:#fff;">📝</span>
                    </div>
                </div>
                <div>
                    <h3 style="color:#0fc0e8;margin-bottom:18px;font-size:1.35em;">Cara Pendaftaran</h3>
                    <ol style="font-size:19px;color:#002c79;margin-left:22px;line-height:1.8;">
                        <li>Klik tombol <b>Masuk</b> untuk login sebagai pasien.</li>
                        <li>Pilih menu <b>Layanan</b> untuk melihat daftar kamar rawat inap.</li>
                        <li>Klik kamar yang diinginkan (VIP, Kamar 1, Kamar 2, atau Kamar 3).</li>
                        <li>Isi formulir pendaftaran dengan data yang benar.</li>
                        <li>Klik tombol <b>Daftar</b> untuk mengirimkan permohonan.</li>
                    </ol>
                </div>
            </div>
        `,
        'btn-metode': `
            <div style="display:flex;align-items:center;gap:24px;">
                <div style="flex:0 0 70px;">
                    <div style="background:#ffd700;border-radius:50%;width:70px;height:70px;display:flex;align-items:center;justify-content:center;">
                        <span style="font-size:38px;color:#002c79;">💳</span>
                    </div>
                </div>
                <div>
                    <h3 style="color:#ffd700;margin-bottom:18px;font-size:1.35em;">Metode Pembayaran</h3>
                    <ul style="font-size:19px;color:#002c79;margin-left:22px;line-height:1.8;">
                        <li><b>Cash</b></li>
                        <li><b>BPJS</b></li>
                        <li><b>Bank Transfer:</b> BCA, Mandiri, BRI, BNI, CIMB, Permata</li>
                        <li><b>Virtual Account:</b> OVO, Gopay, DANA, ShopeePay, LinkAja, Jenius</li>
                    </ul>
                </div>
            </div>
        `,
        'btn-kontak': `
            <div style="display:flex;align-items:center;gap:24px;">
                <div style="flex:0 0 70px;">
                    <div style="background:#002c79;border-radius:50%;width:70px;height:70px;display:flex;align-items:center;justify-content:center;">
                        <span style="font-size:38px;color:#ffd700;">☎️</span>
                    </div>
                </div>
                <div>
                    <h3 style="color:#002c79;margin-bottom:18px;font-size:1.35em;">Kontak & Bantuan</h3>
                    <div style="font-size:19px;color:#002c79;line-height:1.8;">
                        <div>Email: <a href="mailto:info@rsuntan.ac.id" style="color:#0fc0e8;text-decoration:underline;">info@rsuntan.ac.id</a></div>
                        <div>WhatsApp: <a href="https://wa.me/6281234567890" target="_blank" style="color:#0fc0e8;text-decoration:underline;">Chat Admin</a></div>
                        <div style="margin-top:18px;">
                            <button onclick="window.open('https://wa.me/6281234567890','_blank')" class="glow-btn" style="margin-right:10px;">Chat WhatsApp</button>
                            <button onclick="window.location.href='mailto:rsuntan.ac.id'" class="glow-btn">Kirim Email</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    };

    ['btn-cara', 'btn-metode', 'btn-kontak'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.onclick = function() {
                // Highlight tombol aktif
                ['btn-cara', 'btn-metode', 'btn-kontak'].forEach(bid => {
                    const b = document.getElementById(bid);
                    if (b) b.classList.remove('active');
                });
                this.classList.add('active');
                // Tampilkan info
                const infoDiv = document.getElementById('beranda-info');
                if (infoDiv) {
                    infoDiv.style.opacity = '0';
                    infoDiv.style.transform = 'translateY(12px)';
                    setTimeout(() => {
                        infoDiv.innerHTML = infoBeranda[this.id];
                        infoDiv.style.transition = 'opacity 0.7s, transform 0.7s';
                        infoDiv.style.opacity = '1';
                        infoDiv.style.transform = 'translateY(0)';
                    }, 100);
                }
            };
        }
    });
});

// Fungsi tambahan untuk ekspor, print, clear, dan search
function exportPendaftarCSV() {
    // ...kode ekspor CSV...
}

function printPendaftar() {
    // ...kode print data pendaftar...
}

function clearPendaftar() {
    // ...kode clear data pendaftar...
}

function searchPendaftar(keyword) {
    // ...kode search pendaftar...
}

function tampilkanStatistikPendaftar() {
    // ...kode tampilkan statistik pendaftar...
}

// === Fitur Beranda: Tampilkan info sesuai tombol yang diklik (lanjutan) ===
document.addEventListener("DOMContentLoaded", function() {
    // Pastikan elemen ada
    const infoBeranda = {
        'btn-cara': `
            <div style="display:flex;align-items:center;gap:24px;">
                <div style="flex:0 0 70px;">
                    <div style="background:#0fc0e8;border-radius:50%;width:70px;height:70px;display:flex;align-items:center;justify-content:center;">
                        <span style="font-size:38px;color:#fff;">📝</span>
                    </div>
                </div>
                <div>
                    <h3 style="color:#0fc0e8;margin-bottom:18px;font-size:1.35em;">Cara Pendaftaran</h3>
                    <ol style="font-size:19px;color:#002c79;margin-left:22px;line-height:1.8;">
                        <li>Klik tombol <b>Masuk</b> untuk login sebagai pasien.</li>
                        <li>Pilih menu <b>Layanan</b> untuk melihat daftar kamar rawat inap.</li>
                        <li>Klik kamar yang diinginkan (VIP, Kamar 1, Kamar 2, atau Kamar 3).</li>
                        <li>Isi formulir pendaftaran dengan data yang benar.</li>
                        <li>Klik tombol <b>Daftar</b> untuk mengirimkan permohonan.</li>
                    </ol>
                </div>
            </div>
        `,
        'btn-metode': `
            <div style="display:flex;align-items:center;gap:24px;">
                <div style="flex:0 0 70px;">
                    <div style="background:#ffd700;border-radius:50%;width:70px;height:70px;display:flex;align-items:center;justify-content:center;">
                        <span style="font-size:38px;color:#002c79;">💳</span>
                    </div>
                </div>
                <div>
                    <h3 style="color:#ffd700;margin-bottom:18px;font-size:1.35em;">Metode Pembayaran</h3>
                    <ul style="font-size:19px;color:#002c79;margin-left:22px;line-height:1.8;">
                        <li><b>Cash</b></li>
                        <li><b>BPJS</b></li>
                        <li><b>Bank Transfer:</b> BCA, Mandiri, BRI, BNI, CIMB, Permata</li>
                        <li><b>Virtual Account:</b> OVO, Gopay, DANA, ShopeePay, LinkAja, Jenius</li>
                    </ul>
                </div>
            </div>
        `,
        'btn-kontak': `
            <div style="display:flex;align-items:center;gap:24px;">
                <div style="flex:0 0 70px;">
                    <div style="background:#002c79;border-radius:50%;width:70px;height:70px;display:flex;align-items:center;justify-content:center;">
                        <span style="font-size:38px;color:#ffd700;">☎️</span>
                    </div>
                </div>
                <div>
                    <h3 style="color:#002c79;margin-bottom:18px;font-size:1.35em;">Kontak & Bantuan</h3>
                    <div style="font-size:19px;color:#002c79;line-height:1.8;">
                        <div>Email: <a href="mailto:info@rsuntan.ac.id" style="color:#0fc0e8;text-decoration:underline;">info@rsuntan.ac.id</a></div>
                        <div>WhatsApp: <a href="https://wa.me/6281234567890" target="_blank" style="color:#0fc0e8;text-decoration:underline;">Chat Admin</a></div>
                        <div style="margin-top:18px;">
                            <button onclick="window.open('https://wa.me/6281234567890','_blank')" class="glow-btn" style="margin-right:10px;">Chat WhatsApp</button>
                            <button onclick="window.location.href='mailto:rsuntan.ac.id'" class="glow-btn">Kirim Email</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    };

    ['btn-cara', 'btn-metode', 'btn-kontak'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.onclick = function() {
                // Highlight tombol aktif
                ['btn-cara', 'btn-metode', 'btn-kontak'].forEach(bid => {
                    const b = document.getElementById(bid);
                    if (b) b.classList.remove('active');
                });
                this.classList.add('active');
                // Tampilkan info
                const infoDiv = document.getElementById('beranda-info');
                if (infoDiv) {
                    infoDiv.style.opacity = '0';
                    infoDiv.style.transform = 'translateY(12px)';
                    setTimeout(() => {
                        infoDiv.innerHTML = infoBeranda[this.id];
                        infoDiv.style.transition = 'opacity 0.7s, transform 0.7s';
                        infoDiv.style.opacity = '1';
                        infoDiv.style.transform = 'translateY(0)';
                    }, 100);
                }
            };
        }
    });
});

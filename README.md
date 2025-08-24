# Halaman "Tentang Kami" Interaktif dengan Latar Belakang Karakter Anime

Proyek ini adalah sebuah komponen React tunggal yang menciptakan halaman "Tentang Kami" (About Us) yang sangat dinamis dan imersif secara visual. Dibangun dengan **React**, **TypeScript**, dan **Framer Motion**, halaman ini menampilkan latar belakang animasi yang kompleks dengan karakter bergaya anime yang bergerak merespons scroll pengguna, efek partikel, dan animasi konten yang elegan.

## 🎥 Pratinjau

*(Disarankan untuk menambahkan screenshot atau GIF dari halaman yang sedang beraksi di sini untuk menunjukkan efek visualnya.)*


## ✨ Fitur Utama

- **Latar Belakang Karakter Dinamis**: Karakter-karakter anime yang bergerak di latar belakang, dengan posisi dan opasitas yang dikontrol oleh posisi scroll halaman (`useScroll` dan `useTransform` dari Framer Motion).
- **Desain Responsif**: Jumlah karakter, ukuran partikel, dan tata letak kartu tim secara otomatis menyesuaikan diri untuk perangkat desktop dan mobile.
- **Animasi Berbasis Scroll**: Konten utama seperti bagian "Tentang Kami" dan "Tim Kami" muncul dengan animasi halus saat pengguna melakukan scroll ke bawah.
- **Efek Visual Kaya**:
  - **Efek Partikel Sakura**: Partikel bunga sakura yang melayang secara acak di seluruh layar.
  - **Bola Energi (Magic Orbs)**: Bola-bola cahaya lembut yang bergerak perlahan di latar belakang.
  - **Grid Futuristik**: Latar belakang grid yang opasitasnya memudar saat di-scroll.
  - **Aliran Energi (Energy Streams)**: Garis-garis vertikal bercahaya yang berdenyut.
- **Kursor Kustom**: Kursor kustom yang imersif untuk interaksi di desktop, yang berubah ukuran saat diarahkan ke elemen interaktif.
- **Kartu Tim yang Stylish**: Kartu anggota tim dengan efek hover, bayangan, dan skema warna yang dapat disesuaikan untuk setiap anggota.
- **Komponen Terstruktur**: Kode diorganisir ke dalam komponen-komponen logis (`HeroSection`, `TeamSection`, `MovingCharacter`, dll.) untuk keterbacaan dan pemeliharaan yang lebih baik.

## 🛠️ Teknologi yang Digunakan

- **React**: Pustaka JavaScript untuk membangun antarmuka pengguna.
- **TypeScript**: Menambahkan tipe statis ke JavaScript untuk meningkatkan skalabilitas dan keandalan kode.
- **Framer Motion**: Pustaka animasi yang kuat untuk membuat animasi yang kompleks dan performan di React.
- **Tailwind CSS**: (Tersirat dari nama kelas) Kerangka kerja CSS untuk styling cepat dan responsif.

## 📂 Struktur Komponen

File `responsive_character_bg.tsx` berisi beberapa komponen fungsional:

- `App`: Komponen utama yang merakit seluruh halaman.
- `GlobalStyles`: Menyuntikkan gaya CSS global, seperti menyembunyikan kursor default.
- `CustomCursor`: Mengimplementasikan kursor kustom yang mengikuti mouse.
- `ResponsiveCharacterBackground`: Komponen utama yang mengatur semua elemen latar belakang (karakter, partikel, grid, dll.).
- `MovingCharacter`: Komponen untuk satu karakter anime. Mengelola animasi, posisi, dan penampilannya berdasarkan tipe karakter dan posisi scroll.
- `AnimatedSection`: Komponen pembungkus (wrapper) yang menggunakan `IntersectionObserver` untuk menganimasikan elemen saat masuk ke dalam viewport.
- `HeroSection`: Bagian pembuka di bagian atas halaman dengan judul yang dianimasikan.
- `AboutSection`: Bagian yang berisi deskripsi tentang tim.
- `TeamSection`: Menampilkan semua anggota tim, memisahkan antara ketua dan anggota.
- `TeamMemberCard`: Kartu individual untuk setiap anggota tim, lengkap dengan gaya dan animasi hover.
- `Footer`: Bagian footer halaman.

## 🚀 Setup dan Menjalankan Proyek

Anda bisa menjalankan halaman ini dengan dua cara: sebagai proyek mandiri untuk demonstrasi, atau mengintegrasikannya ke dalam proyek React Anda yang sudah ada.

### Opsi 1: Menjalankan sebagai Proyek Mandiri (Rekomendasi untuk Coba Cepat)

Cara ini paling mudah untuk melihat halaman ini beraksi. Kita akan menggunakan **Vite** untuk membuat proyek React baru.

1.  **Buat Proyek React + TypeScript Baru dengan Vite:**
    Buka terminal Anda dan jalankan perintah berikut untuk membuat folder proyek baru bernama `about-us-page`:
    ```bash
    npm create vite@latest about-us-page -- --template react-ts
    ```

2.  **Masuk ke Direktori Proyek dan Instal Dependensi Awal:**
    ```bash
    cd about-us-page
    npm install
    ```

3.  **Instal Tailwind CSS:**
    Proyek ini memerlukan Tailwind CSS. Ikuti perintah berikut untuk menginstalnya:
    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```
    Selanjutnya, konfigurasikan file `tailwind.config.js` dan `src/index.css` Anda sesuai panduan instalasi Tailwind CSS untuk Vite.

4.  **Instal Framer Motion:**
    Ini adalah dependensi utama untuk semua animasi.
    ```bash
    npm install framer-motion
    ```

5.  **Tambahkan Kode Komponen:**
    - Ganti nama file `responsive_character_bg.tsx` menjadi nama yang lebih sesuai, misalnya `AboutPage.tsx`.
    - Pindahkan file `AboutPage.tsx` ini ke dalam folder `src/` di proyek Vite yang baru Anda buat.

6.  **Gunakan Komponen di Aplikasi Utama:**
    - Buka file `src/App.tsx`.
    - Hapus semua konten boilerplate di dalamnya dan ganti dengan kode berikut untuk me-render halaman "Tentang Kami":
    ```tsx
    // src/App.tsx
    import AboutPage from './AboutPage'; // Impor komponen yang baru ditambahkan
    import './index.css'; // Pastikan file CSS utama diimpor

    function App() {
      return <AboutPage />;
    }

    export default App;
    ```

7.  **Jalankan Server Pengembangan:**
    Sekarang, Anda siap untuk melihat hasilnya!
    ```bash
    npm run dev
    ```
    Buka browser Anda dan kunjungi URL yang ditampilkan di terminal (biasanya `http://localhost:5173`).

### Opsi 2: Integrasi ke Proyek yang Sudah Ada

Jika Anda sudah memiliki proyek React (misalnya dengan Next.js atau Create React App), ikuti langkah-langkah ini.

1.  **Instal Dependensi yang Diperlukan:**
    Pastikan proyek Anda sudah memiliki `framer-motion`. Jika belum, instal dengan perintah:
    ```bash
    npm install framer-motion
    # atau
    yarn add framer-motion
    ```

2.  **Pastikan Tailwind CSS Terkonfigurasi:**
    Komponen ini sangat bergantung pada kelas utilitas Tailwind CSS. Jika proyek Anda belum menggunakannya, Anda perlu mengaturnya terlebih dahulu.

3.  **Salin Kode Komponen:**
    - Salin seluruh konten dari file `responsive_character_bg.tsx`.
    - Tempelkan ke dalam file komponen baru di proyek Anda (misalnya, `src/pages/About.tsx` atau `src/components/AboutPage.tsx`).

4.  **Render Komponen:**
    Impor dan render komponen `App` (atau nama apa pun Anda mengekspornya) di bagian mana pun dari aplikasi Anda.

## 🎨 Kustomisasi

Komponen ini sangat mudah untuk disesuaikan.

### 1. Mengubah Anggota Tim

Edit array `teamMembers` untuk mengubah, menambah, atau menghapus anggota tim.

- `name`: Nama anggota.
- `role`: Peran/jabatan.
- `isLeader`: Setel ke `true` untuk anggota yang merupakan ketua tim.
- `bio`: Deskripsi singkat.
- `img`: URL gambar profil.
- `color`: Warna tema untuk kartu (`gold`, `cyan`, `pink`, `yellow`, `green`).

### 2. Mengubah Karakter Latar Belakang

Edit array `characters` di dalam komponen `ResponsiveCharacterBackground`. Anda dapat mengubah `type` karakter yang ada atau menambahkan yang baru.

```typescript
const characters = [
    { type: 'ninja', color: 'indigo' },
    { type: 'samurai', color: 'red' },
    // ...tambahkan lebih banyak karakter di sini
];
```

### 3. Mengubah Tema Warna Karakter

Warna untuk setiap tipe karakter didefinisikan dalam objek `colorThemes` di dalam komponen `MovingCharacter`. Anda dapat dengan mudah mengubah kode warna hex untuk setiap tema.

```typescript
const colorThemes = {
    ninja: { primary: '#4F46E5', secondary: '#6366F1', accent: '#8B5CF6' },
    samurai: { primary: '#DC2626', secondary: '#EF4444', accent: '#F97316' },
    // ...sesuaikan atau tambahkan tema baru
};
```

## 📄 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT. Lihat file `LICENSE` untuk detail lebih lanjut.

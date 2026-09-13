# Sora Living — Shopify Theme

Theme Shopify (Online Store 2.0) yang dibangun dari nol berdasarkan desain Figma "Sora Living".

## Cara install
1. Buka **Shopify Admin → Online Store → Themes**.
2. Klik **Add theme → Upload zip file**.
3. Upload file `sora-living-theme.zip` ini.
4. Klik **Publish** jika sudah siap, atau **Preview** dulu untuk cek.

## Yang sudah dibuat
- Homepage (`templates/index.json`) — mengikuti urutan section persis dari desain Figma: hero, marquee info banner, info cards, koleksi carousel, produk favorit (add to cart & qty selector berfungsi), highlight image, banner koleksi, marquee kedua, materials cards, social gallery, journal/blog, newsletter.
- Header (announcement bar + navbar + menu dropdown + mobile menu) dan Footer (link groups, social, legal) sebagai section global lewat `header-group.json` / `footer-group.json`.
- Template fungsional lain: Product, Collection, Cart, Blog, Article, Page, Search, 404, List Collections, Gift Card, dan semua halaman Customer Account (login, register, order history, address, reset password).
- Semua section bisa diedit lewat **Theme Editor** (teks, gambar, warna, link, jumlah kartu, dll) — tidak perlu edit kode untuk konten.
- CSS custom (tanpa Tailwind, tanpa dependency) di `assets/theme.css`, JS vanilla di `assets/theme.js` (quantity selector, hero carousel, mobile menu, AJAX add-to-cart).
- Font: Fraunces (serif, untuk heading — pengganti "Bespoke Serif" dari Figma karena font itu berbayar/tidak publik) + Inter (body) + Montserrat (nav), dimuat dari Google Fonts.

## PENTING — Gambar
Aset gambar dari Figma (hero, kartu produk, dll) di-hosting sementara oleh Figma dan **kedaluwarsa dalam 7 hari**, jadi saya TIDAK menyisipkannya langsung ke theme. Semua section punya field **Image picker** kosong di Theme Editor — tinggal upload foto produk/lifestyle asli kamu di sana, atau saya bisa bantu unduh & pasang otomatis kalau kamu upload file gambarnya ke chat ini.

Tanpa gambar, semua card akan menampilkan gradient placeholder (coklat/krem) — layout & fungsinya tetap 100% jalan.

## Struktur
```
layout/theme.liquid          → shell utama
sections/                    → semua section (header, footer, hero, dll)
snippets/                    → icon SVG + product card
templates/                   → index.json (homepage) + template lain
templates/customers/         → halaman akun pelanggan
assets/theme.css, theme.js   → styling & interaktivitas
config/                      → pengaturan tema
```

# Interactive Media Library (SPA)
Öğrenci Adı Soyadı || Yaman Ustaoğlu

Öğrenci Numarası || B241200555

Seçilen Proje || Seçenek 1: İnteraktif Medya Kitaplığı (SPA)

Canlı Yayın Linki || https://sauwebprogramming.github.io/web-tech-project-ymnwd/

GitHub Repository || https://github.com/SauWebProgramming/web-tech-project-ymnwd


## Proje Tanımı
Bu proje, yerel bir JSON dosyasından film verilerini alarak,
bu verileri modern bir arayüzde listeleyen, filtreleyen,
detaylarını gösteren ve favorilere eklenmesini sağlayan
istemci taraflı (client-side) bir web uygulamasıdır.
Proje tamamen istemci taraflı (client-side) olarak geliştirilmiş olup,
herhangi bir sunucu taraflı dil veya veritabanı kullanmamaktadır.

Uygulama, tek sayfa uygulaması (Single Page Application – SPA) mantığıyla
çalışmakta olup sayfa yenilenmeden içerik güncellenmektedir.

---

## Projenin Kapsamı
Bu proje kapsamında aşağıdaki konular uygulamalı olarak gerçekleştirilmiştir:

- HTML, CSS ve JavaScript dosyalarının ayrı ve düzenli kullanımı
- Yerel JSON dosyasından veri çekme (fetch API)
- JavaScript ile dinamik DOM oluşturma
- Kullanıcı etkileşimine dayalı arama ve filtreleme işlemleri
- LocalStorage kullanarak favori verilerin saklanması
- SPA mantığı ile detay görünümü oluşturulması

---

## Kullanılan Teknolojiler
- **HTML5**
  - Anlamsal (Semantic) etiketler
- **CSS3**
  - Flexbox
  - Grid yapısı
  - Hover ve transition efektleri
- **JavaScript (ES6+)**
  - `const` ve `let`
  - Arrow Functions
  - `async / await`
  - Fetch API
- **LocalStorage**
- **Git & GitHub**

---

## Proje Yapısı
Proje dosya yapısı aşağıdaki gibidir:

- `index.html`  
  → Sayfa yapısı ve içerik

- `css/style.css`  
  → Görsel tasarım ve yerleşim

- `js/app.js`  
  → Uygulama mantığı ve etkileşimler

- `data/ghibli_films.json`  
  → Film verilerinin bulunduğu yerel JSON dosyası

Inline CSS veya JavaScript kullanılmamıştır.

---

## Veri Yönetimi
Film verileri, yerel bir JSON dosyasından `fetch()` kullanılarak alınmaktadır.
Alınan veriler JavaScript ile işlenerek dinamik olarak ekrana basılmaktadır.

Kullanıcının favori olarak seçtiği filmler,
tarayıcı üzerinde **LocalStorage** kullanılarak saklanmaktadır.

---

## Projenin Çalıştırılması
Bu proje tamamen statik bir web uygulamasıdır.

Çalıştırmak için:
1. Proje dosyaları indirilir
2. `index.html` dosyası tarayıcıda açılır
3. Ek bir sunucu veya kurulum gerektirmez

---

## Versiyon Kontrolü
Proje geliştirme süreci Git kullanılarak yönetilmiştir.
Geliştirme aşamaları düzenli ve anlamlı commit mesajları ile kayıt altına alınmıştır.

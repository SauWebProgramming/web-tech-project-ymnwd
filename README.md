# Interactive Media Library (SPA)

## Proje Tanımı
Bu proje, harici bir API veya yerel JSON dosyası kullanarak film verilerini alan,
bu verileri modern ve kullanıcı dostu bir arayüzde listeleyen, filtreleyen,
detaylarını gösteren ve favorilere eklenmesini sağlayan
tek sayfa uygulaması (Single Page Application - SPA) niteliğinde bir web projesidir.

Proje tamamen istemci taraflı (client-side) olarak geliştirilmiş olup,
herhangi bir sunucu taraflı dil veya veritabanı kullanmamaktadır.

---

## Projenin Amacı
Bu projenin temel amacı, modern web teknolojileri kullanılarak:
- HTML, CSS ve JavaScript dosyalarının doğru şekilde ayrılmasını,
- Asenkron veri yönetimini (fetch, async/await),
- Dinamik DOM manipülasyonunu,
- Kullanıcı etkileşimini (arama, filtreleme, favoriler),
- Tek sayfa uygulaması (SPA) mantığını
uygulamalı olarak göstermektir.

---

## Kullanılan Teknolojiler
- **HTML5**
  - Anlamsal (Semantic) etiketler (`header`, `nav`, `main`, `section`, `article`)
- **CSS3**
  - Flexbox & Grid
  - CSS Variables
  - Hover ve transition efektleri
  - Responsive tasarım
- **JavaScript (ES6+)**
  - `const` ve `let`
  - Arrow Functions
  - `async / await`
  - Fetch API
- **LocalStorage**
  - Favori filmlerin tarayıcıda saklanması
- **Git & GitHub**
  - Versiyon kontrolü
  - Düzenli commit geçmişi

---

## Proje Özellikleri
- Film kartlarının grid yapıda listelenmesi
- Başlığa göre anlık arama
- Yıla göre filtreleme
- Kategoriye göre filtreleme
- Sayfa yenilenmeden çalışan detay ekranı (SPA)
- Favorilere ekleme ve favorilerden çıkarma
- Favorilerin LocalStorage üzerinde saklanması
- Responsive (mobil, tablet ve masaüstü uyumlu) tasarım
- Modern ve estetik kullanıcı arayüzü (UI/UX)

---

## Mimari Yapı
Proje, içerik – stil – mantık ayrımına uygun olarak geliştirilmiştir:

- `index.html` → Yapısal içerik (HTML)
- `css/style.css` → Görsel tasarım ve düzen (CSS)
- `js/app.js` → Uygulama mantığı ve etkileşimler (JavaScript)
- `data/ghibli_films.json` → Yerel veri kaynağı

Inline CSS veya JavaScript kullanılmamıştır.

---

## Veri Yönetimi
Proje, veri kaynağı olarak **yerel bir JSON dosyası** kullanmaktadır.
Veriler `fetch()` API’si ile asenkron olarak alınmakta ve
JavaScript üzerinden işlenerek DOM’a dinamik olarak yansıtılmaktadır.

Kullanıcı favorileri ise **LocalStorage** kullanılarak
tarayıcı üzerinde kalıcı şekilde saklanmaktadır.

---

## Erişilebilirlik (Accessibility)
- Anlamsal HTML etiketleri kullanılmıştır
- Kontrastlı renk paleti tercih edilmiştir
- Butonlar ve etkileşimli alanlar kullanıcı dostu olacak şekilde tasarlanmıştır

---

## Projenin Çalıştırılması
Bu proje tamamen statik bir web uygulamasıdır.

Çalıştırmak için:
1. Proje dosyaları indirilir veya klonlanır
2. `index.html` dosyası herhangi bir modern tarayıcıda açılır
3. Ek bir kurulum veya sunucu gerektirmez

(İsteğe bağlı olarak Live Server ile de çalıştırılabilir.)

---

## Versiyon Kontrolü
Proje geliştirme süreci başından itibaren Git kullanılarak yönetilmiştir.
Tüm geliştirme adımları anlamlı commit mesajları ile kayıt altına alınmıştır.

---

## Video Sunumu
Projenin genel işleyişini, kullanıcı arayüzünü ve kod yapısını
ayrıntılı şekilde anlatan video sunumu
ayrı olarak paylaşılacaktır.

---

## Sonuç
Bu proje kapsamında, modern web geliştirme prensipleri uygulanmış,
istemci taraflı dinamik bir uygulama geliştirilmiş
ve teorik bilgilerin pratikte nasıl kullanıldığı gösterilmiştir.

# Güvenlik Kontrol Listesi

Bu proje, `backend: None` ve `projectType: landing-page` olduğu için, güvenlik önlemleri daha çok frontend ve deployment katmanlarına odaklanacaktır. Genelde bir landing sayfası statik olarak barındırıldığından geleneksel backend güvenlik açıklarının çoğu geçerli değildir. Ancak, iletişim formu gibi dışa bağımlılıklar ve modern web standartları için bazı kontroller gereklidir.

## Genel Güvenlik Kontrolleri (Frontend & Deployment)

- [x] **HTTPS Kullanımı:** Tüm site trafiği HTTPS üzerinden şifrelenmeli. (Deployment platformu tarafından sağlanır.)
- [x] **Düşük Bağımlılık Riski:** (`backend: None` olduğu için) Üçüncü taraf kütüphane kullanımını minimize etmek ve kullanılanları düzenli olarak güncellemek. (Vanilla JS için daha az kritik)
- [x] **İletişim Formu Koruması (Botlar için):** Form gönderimlerinde (eğer harici servis kullanılıyorsa) ReCaptcha, Honeypot alanı gibi bot koruma mekanizmalarının entegrasyonu. (Özellikle Form-as-a-Service kullanılıyorsa servis tarafından sağlanır.)
- [x] **XSS (Cross-Site Scripting) Önlemleri:**
    - [x] Kullanıcı girdisi olan herhangi bir alan olmamasına rağmen, gelecekte eklenebilecek dinamik içerikler için güvenli çıktı kodlaması yapmak (HTML özel karakterlerini dönüştürmek).
    - [x] `innerHTML` kullanımından kaçınmak veya çok dikkatli kullanmak. (Bu projede kullanıcı girdisi DOM'a yansımadığı için düşük risk.)
- [x] **CORS (Cross-Origin Resource Sharing):**
    - [x] Eğer iletişim formu için **serverless fonksiyon** kullanılıyorsa, bu fonksiyonun sadece belirlenen alan adından gelen istekleri kabul edecek şekilde CORS başlıklarının yapılandırılması. (Landing sayfası statik olduğu için genellikle tarayıcı tarafında otomatik yönetilir veya serverless fonksiyonun kendisi CORS kurallarına uymalıdır.)
    - [x] Harici bir Form-as-a-Service kullanılıyorsa, bu servisin CORS politikasını incelemek.
- [x] **Gereksiz JavaScript Varlıkları:** Projede kullanılmayan JavaScript kütüphanelerini veya kod parçalarını temizlemek.
- [x] **CSP (Content Security Policy):** Sayfaların sadece güvenilir kaynaklardan script, stil vb. yüklemesini sağlamak için HTTP `Content-Security-Policy` başlığını eklemek. (Statik site barındıran servislerde ayarlanabilir veya meta etiketinde tanımlanabilir).

## Backend/API Güvenliği (Varsayımsal İletişim Formu için)

Bu bölümler, eğer iletişim formu bir **serverless fonksiyon** veya kendi barındırdığımız basit bir backend API'si aracılığıyla işleniyorsa geçerlidir.

- [ ] **JWT (JSON Web Tokens):** (Bu projede kullanıcı kimlik doğrulaması veya oturum yönetimi olmadığı için JWT'ye gerek yoktur.)
    - [ ] `N/A`
- [ ] **SQL Injection:** (Bu projede veritabanı kullanımı `None` olduğu için geçerli değildir.)
    - [ ] `N/A`
- [ ] **Input Doğrulama ve Temizleme:**
    - [x] İletişim formu aracılığıyla gelen tüm girdilerin (ad, e-posta, mesaj vb.) sunucu tarafında (serverless fonksiyon içinde) de kapsamlı bir şekilde doğrulanması ve potansiyel zararlı karakterlerden arındırılması (`client-side validation`'a ek olarak).
- [ ] **Rate Limiting:** İletişim formu endpoint'ine (serverless fonksiyonuna) aşırı istek gönderimini engellemek için IP tabanlı veya oturum tabanlı hız sınırlaması uygulamak.
- [ ] **Hata Yönetimi ve Bilgi Sızıntısı:**
    - [x] API hatalarında (serverless fonksiyon hataları), ayrıntılı hata mesajlarının kullanıcılara değil, sadece geliştiricilere gösterildiğinden emin olmak.
    - [x] Genel hata mesajları kullanmak (örneğin, "Bir şeyler ters gitti, lütfen tekrar deneyin.")
- [ ] **Ortam Değişkenleri:** API anahtarları veya diğer hassas bilgilerin kod içerisine gömülmek yerine ortam değişkenleri (environment variables) olarak saklanması. (Serverless fonksiyonlar için kritik).

## Yapılandırma ve Dağıtım Güvenliği

- [x] **Statik Hosting Güvenliği:** Dağıtım platformunun (Netlify, Vercel vb.) güvenlik best practices'lerine (güvenli yapılandırma, CDN kullanımı, DDoS koruması) uyulması.
- [x] **Sürüm Kontrolü Güvenliği:** Gizli bilgilerin (API anahtarları, hassas konfigürasyonlar) versiyon kontrol sistemine (Git) commit edilmediğinden emin olmak.
- [x] **Bağımlılık Güncellemesi:** Kullanılan tüm frontend kütüphanelerinin ve araçlarının güncel ve bilinen güvenlik açıklarından arındırılmış olduğundan emin olmak (npm/yarn audit gibi araçlar kullanılabilir, ancak vanilla JS projelerde daha çok manuel kontrol gerektirir).
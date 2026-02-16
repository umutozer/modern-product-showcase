# Mimari Dokümanı: modern-product-showcase

Bu belge, **modern-product-showcase** projesinin mimari yapısını, katmanlarını ve temel veri akışını açıklamaktadır. Proje, cep telefonu ve bilgisayar satışları için tasarlanmış modern, minimalist, tek sayfalık bir tanıtım (landing page) websitesidir.

## 1. Genel Bakış

Proje mimarisi `html-css-js` tabanlı olup, tamamen frontend odaklı statik bir yapıya sahiptir. Amacı, hızlı yüklenen, responsive ve görsel olarak çekici bir kullanıcı deneyimi sunmaktır. Herhangi bir backend, veritabanı veya kimlik doğrulama gereksinimi bulunmamaktadır (`backend: None`, `database: None`, `needsAuth: false`).

## 2. Proje Yapısı ve Dosya Organizasyonu

Aşağıda projenin temel dizin yapısı ve önemli dosyaların rolleri açıklanmıştır:

```
modern-product-showcase/
├── public/                     # Statik varlıklar (resimler vb. - varsayılan olarak bu dizin olabilir)
├── src/
│   ├── css/                    # Tailwind CSS çıktı dosyası ve özel CSS'ler
│   │   ├── style.css           # Ana Tailwind CSS çıktısı (geliştirme sırasında otomatik oluşturulur)
│   │   └── global.css          # Genel stiller (reset.css, variables.css ve diğer custom CSS'leri içerir.)
│   ├── js/                     # JavaScript dosyaları
│   │   └── app.js              # Ana JavaScript dosyası (animasyonlar, smooth scroll, form doğrulama vb.)
│   ├── index.html              # Ana HTML dosyası
├── docs/                       # Dokümantasyon dosyaları
│   ├── SETUP.md                # Kurulum rehberi
│   ├── ARCHITECTURE.md         # Mimari dokümanı
│   ├── api-contract.md         # API sözleşmesi (Uygulamalı API olmadığı için iç yapıyı tanımlar.)
│   └── security-checklist.md   # Güvenlik kontrol listesi
├── tests/                      # Test dosyaları
│   ├── test-plan.md            # Test planı
│   └── checklist.md            # Test kontrol listesi
├── .github/                    # GitHub Actions Workflows
│   └── workflows/
│       └── deploy.yml          # Otomatik dağıtım için CI/CD yapılandırması
├── package.json                # Proje bağımlılıkları ve script'leri
├── tailwind.config.js          # Tailwind CSS yapılandırma dosyası
├── postcss.config.js           # PostCSS yapılandırması (Tailwind için)
├── .gitignore                  # Git tarafından ignor edilecek dosyalar
└── README.md                   # Projenin genel açıklaması
```

### 2.1. Temel Dosyalar ve Sorumluluklar

*   `index.html`: Uygulamanın tek ana sayfasıdır. HTML5 semantik etiketleri kullanılarak (`pages[0].sections`'lara uygun olarak) yapılandırılmıştır. Tüm ürün tanıtım bölümleri, özellikler ve iletişim formu bu dosya içinde bulunur.
*   `src/css/`: Stillemelerin yönetildiği dizin.
    *   `global.css`: HTML sayfasına dahil edilen ana CSS dosyasıdır. Bu dosya `@import` kuralları ile `styles/reset.css` ve `styles/variables.css` gibi temel stilleri birleştirir ve özel global stilleri içerir.
    *   `style.css`: Tailwind CSS'in otomatik olarak ürettiği, uygulamanın tüm stil sınıflarını içeren çıktıdır. Geliştirme (dev) ve üretim (build) süreçlerinde otomatik olarak optimize edilir.
*   `src/js/app.js`: Tüm etkileşimli özelliklerin (smooth scroll, form doğrulama, animasyonlar, mikro etkileşimler) bulunduğu ana JavaScript dosyasıdır. Vanilla JS (`techStack.frontend`) kullanılarak yazılmıştır.
*   `tailwind.config.js`: Tailwind CSS özelleştirmelerini (renk paletleri - `design.primaryColor`, `design.secondaryColor`, `design.accentColor` vb., fontlar - `design.fontHeading`, `design.fontBody`, eklentiler ve tema uzantıları) içerir.

## 3. Katmanlar ve Bileşenler

Proje, aşağıdaki genel katmanlara ayrılabilir:

### 3.1. Sunum Katmanı (Presentation Layer)

*   **HTML (Structure)**: `index.html` dosyası, sayfanın iskeletini ve içeriğini barındırır. Semantik HTML5 kullanılmış olup, `pages[0].sections` altında belirtilen bölümleri (`hero-section`, `product-showcase-phones`, `product-showcase-computers`, `features-section`, `contact-form`) içerir.
*   **CSS (Styling)**: `Tailwind CSS` (`techStack.frontend`) çerçevesi kullanılarak minimalist ve modern bir tasarım sağlanmıştır (`design.style`). Utility-first yaklaşım sayesinde hızlı stil geliştirme ve responsive uyumluluk (`features`) hedeflenmiştir. Özel palet ve fontlar (`design.primaryColor`, `design.fontHeading` vb.) `tailwind.config.js` üzerinden yönetilir.
*   **JavaScript (Interactivity)**: `Vanilla JS` (`techStack.frontend`) kullanılarak kullanıcı etkileşimleri (navigasyon, animasyonlar, mikro etkileşimler) ve istemci tarafı (client-side) form doğrulama (`features`) sağlanır.

### 3.2. Veri Katmanı (Data Layer)

Bu projede harici bir veritabanı veya API bulunmamaktadır (`backend: None`, `database: None`). Tüm ürün bilgileri ve diğer statik içerik (`data: static`) doğrudan HTML dosyası içinde veya JavaScript sabitleri olarak tanımlanır.

## 4. Veri Akışı

Projede temel veri akışı şu şekildedir:

1.  Kullanıcı tarayıcısı `index.html` dosyasını sunucudan (statik hosting) ister.
2.  Sunucu `index.html`, `global.css`, `style.css` ve `app.js` dosyalarını tarayıcıya gönderir.
3.  Tarayıcı HTML'i işler, CSS'i uygular ve JavaScript'i çalıştırır.
4.  `app.js`, sayfa içi navigasyon için smooth scroll gibi etkileşimleri tetikler.
5.  Kullanıcı `İletişim Formu`nu doldurup gönderdiğinde, `app.js` içindeki istemci tarafı doğrulama (`client-side validation`) kuralları çalışır.
6.  Form gönderildiğinde, bu veri **herhangi bir backend'e gönderilmez**; sadece tarayıcı tarafında bir onay mesajı gösterilebilir veya bilgiler konsola yazdırılabilir (projenin sadece tanıtım amaçlı olduğu göz önüne alındığında).

## 5. Güvenlik Notları

Proje statik bir landing sayfası olduğu için gelişmiş güvenlik önlemleri gerektirmez. Ancak yine de dikkat edilmesi gereken bazı noktalar bulunmaktadır:

*   **XSS (Cross-Site Scripting)**: Dinamik içerik olmadığı için XSS riski düşüktür. Ancak eğer ileride kullanıcı tarafından girilen içerik gösterilirse, dikkatli çıktı temizliği yapılmalıdır.
*   **Form Güvenliği**: İletişim formu sadece client-side doğrulama yaptığı için, bu form verilerinin güvenli bir şekilde işlenmesi gerekiyorsa bir backend entegrasyonu şarttır. Şu anki haliyle hassas veri girişi için uygun değildir. Daha fazla bilgi için `docs/security-checklist.md` belgesine bakınız.

## 6. Dağıtım (Deployment)

Proje, oluşturulan statik dosyalar (`npm run build` komutu ile) aracılığıyla Netlify, Vercel, GitHub Pages gibi statik hosting platformlarına kolayca dağıtılabilir (`deployment: Static Hosting`). `.github/workflows/deploy.yml` dosyasında GitHub Actions kullanılarak otomatik dağıtım (`CI/CD`) yapılandırması tanımlanmıştır.
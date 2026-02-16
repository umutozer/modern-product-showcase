# Kurulum Rehberi: modern-product-showcase

Bu belge, **modern-product-showcase** projesini yerel geliştirme ortamınızda nasıl kuracağınızı ve çalıştıracağınızı adım adım açıklamaktadır.

## 1. Ön Gereksinimler

Başlamadan önce aşağıdaki yazılımların sisteminizde kurulu olduğundan emin olun:

*   [Node.js](https://nodejs.org/en/) (Tercihen LTS sürümü)
*   [npm](https://www.npmjs.com/) (Node.js ile birlikte gelir) veya [Yarn](https://yarnpkg.com/)
*   Bir kod düzenleyici (örneğin, [Visual Studio Code](https://code.visualstudio.com/))
*   Git (versiyon kontrolü için)

## 2. Kurulum Adımları

Projeyi yerel ortamınıza kurmak için aşağıdaki adımları izleyin:

### 2.1. Depoyu Klonlama

Projenin GitHub deposunu bilgisayarınıza klonlayın:

```bash
git clone <depo_url'si>
cd modern-product-showcase
```

### 2.2. Bağımlılıkları Yükleme

Bu proje `Tailwind CSS` kullanmaktadır ve geliştirme sürecinde gerekli olan araçları yüklemek için bağımlılıkların kurulması gerekmektedir. Proje bir Frontend projesi olduğu için sadece geliştirme bağımlılıkları mevcuttur.

```bash
npm install
# veya eğer yarn kullanıyorsanız
yarn install
```

### 2.3. Ortam Değişkenleri

Bu proje herhangi bir dinamik backend veya API entegrasyonu içermediğinden (`backend: None`), özel ortam değişkenlerine ihtiyaç duymaz. Tüm içerik statik HTML, CSS ve JavaScript dosyalarından gelmektedir. Bu nedenle `.env` dosyası oluşturmanıza veya yapılandırmanıza gerek yoktur.

### 2.4. Geliştirme Sunucusunu Başlatma

Projeyi yerel bir geliştirme sunucusunda çalıştırmak ve değişiklikleri anında görmek için aşağıdaki komutu kullanın. Bu komut, Tailwind CSS'in derlenmesini ve bir otomatik yenileme (live-reload) sunucusunun başlatılmasını sağlar.

```bash
npm run dev
# veya eğer yarn kullanıyorsanız
yarn dev
```

Bu komut çalıştıktan sonra, projeniz genellikle `http://localhost:3000` (veya benzer bir port) adresinde erişilebilir olacaktır. Tarayıcınızı açıp bu adrese giderek landing sayfasını görüntüleyebilirsiniz.

## 3. Derleme (Build) İşlemleri

Üretim ortamına dağıtım için projenin optimize edilmiş statik dosyalarını oluşturmak (`HTML + Tailwind CSS + Vanilla JS`) üzere aşağıdaki komutu kullanın:

```bash
npm run build
# veya eğer yarn kullanıyorsanız
yarn build
```

Bu komut, `dist/` (veya benzeri bir) dizin altında üretim için optimize edilmiş tüm statik dosyaları (HTML, CSS, JavaScript, resimler vb.) oluşturacaktır. Bu dizin daha sonra Netlify, Vercel gibi statik hosting servislerine dağıtılabilir (`deployment: Static Hosting`).

## 4. Testleri Çalıştırma

Projede tanımlanmış testleri çalıştırmak için ilgili test komutunu kullanın (eğer `package.json` dosyasında tanımlıysa):

```bash
npm test
# veya
yarn test
```

Test planı ve kontrol listesi için `tests/test-plan.md` ve `tests/checklist.md` dosyalarına bakınız.

## 5. Sorun Giderme

*   `npm install` sırasında hatalar alıyorsanız, Node.js ve npm'in güncel olduğundan emin olun.
*   Tarayıcıda sayfa yüklenmezse, geliştirme sunucusunun başarıyla başladığından ve doğru adrese eriştiğinizden emin olun (konsol çıktısını kontrol edin).
*   Tailwind CSS sınıfları uygulanmıyorsa, `npm run dev` komutunun doğru çalıştığından ve Tailwind yapılandırmanızın (`tailwind.config.js`) doğru olduğundan emin olun.
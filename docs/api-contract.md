# API Sozlesmesi

Bu proje bir "landing page" projesi olduğundan ve `backend: None` olarak belirtildiğinden, doğrudan bir Backend API'si bulunmamaktadır. Ancak, `contact-form` bölümünde bir iletişim formu olduğu için, bu formun gönderimi için **harici bir hizmet (örneğin Formspree, Netlify Forms, Getform vb.)** veya basit bir **serverless fonksiyon (örneğin AWS Lambda, Vercel/Netlify Functions)** kullanılması varsayılabilir.

Aşağıda, varsayımsal bir form gönderim endpoint'i ve beklenen request/response örnekleri bulunmaktadır.

## Endpoint: İletişim Formu Gönderimi

### `POST /api/contact`

Kullanıcının iletişim formu aracılığıyla gönderdiği mesajı işler. Bu endpoint, pratik uygulamada bir **serverless fonksiyon** veya doğrudan bir **Form-as-a-Service sağlayıcısının** adresi olacaktır.

#### Request (JSON)

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "subject": "Ürün Bilgisi Talebi",
  "message": "Öne çıkan bilgisayar modelleriniz hakkında daha fazla bilgi almak istiyorum."
}
```

#### Request (Form Data - `application/x-www-form-urlencoded` veya `multipart/form-data`)

Çoğu Form-as-a-Service sağlayıcısı bu formatı tercih eder.

```
name=John+Doe&email=john.doe%40example.com&subject=%C3%9Cr%C3%BCn+Bilgisi+Talebi&message=%C3%96ne+%C3%A7%C4%B1kan+bilgisayar+modelleriniz+hakk%C4%B1nda+daha+fazla+bilgi+almak+istiyorum.
```

#### Response (Başarılı - 200 OK veya 204 No Content)

```json
{
  "status": "success",
  "message": "Mesajınız başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz."
}
```

#### Response (Hatalı - 400 Bad Request)

```json
{
  "status": "error",
  "message": "Geçersiz giriş. Lütfen tüm alanları doğru ve eksiksiz doldurun.",
  "errors": {
    "email": "Geçerli bir e-posta adresi giriniz."
  }
}
```

---

## Client-Side API Kullanımı (Vanilla JS)

`js/app.js` dosyasında `contact-form` için aşağıdaki gibi bir JavaScript kodu beklenebilir:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Client-side validation (already defined in project features)
            // ... (validation logic here)

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                // Bu URL, kullanılan Form-as-a-Service veya serverless function'a göre değişecektir.
                const response = await fetch('/api/contact', { 
                // const response = await fetch('https://formspree.io/f/yourformid', { // Örnek Formspree
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' // Yada 'application/x-www-form-urlencoded'
                    },
                    body: JSON.stringify(data) // FormData kullanılıyorsa FormData direkt gönderilebilir.
                });

                if (response.ok) {
                    const result = await response.json(); // Bazı servisler JSON döndürmez
                    alert(result.message || 'Mesajınız başarıyla gönderildi!');
                    contactForm.reset();
                } else {
                    const errorData = await response.json();
                    alert(errorData.message || 'Mesaj gönderilirken bir hata oluştu.');
                }
            } catch (error) {
                console.error('Mesaj gönderim hatası:', error);
                alert('Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.');
            }
        });
    }
});
```
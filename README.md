# Zekke Makarna Premium Dijital Menü

Bu proje GitHub Pages üzerinde ücretsiz olarak yayınlanabilecek, mobil uyumlu bir QR menüdür.

## Dosyalar

- `index.html`: Ana sayfa
- `style.css`: Tasarım ve mobil görünüm
- `script.js`: Menü ürünleri, arama ve kategori filtreleme
- `qr-kod-olustur.html`: Yayın linkiniz için QR kod oluşturma sayfası

## GitHub Pages'e yükleme

1. GitHub hesabınıza giriş yapın.
2. Sağ üstteki `+` simgesinden **New repository** seçin.
3. Depo adını örneğin `zekke-menu` yazın.
4. Depoyu **Public** olarak oluşturun.
5. Bu klasördeki tüm dosyaları depoya yükleyin.
6. Depoda `Settings > Pages` bölümüne girin.
7. `Source` alanında **Deploy from a branch** seçin.
8. Branch olarak `main`, klasör olarak `/root` seçip **Save** butonuna basın.
9. Birkaç dakika sonra siteniz şu adrese benzer biçimde açılır:

   `https://kullaniciadi.github.io/zekke-menu/`

## QR kod oluşturma

1. Siteniz yayınlandıktan sonra `qr-kod-olustur.html` dosyasını tarayıcıda açın.
2. GitHub Pages bağlantınızı kutuya yapıştırın.
3. QR kodu oluşturun.
4. PNG olarak kaydedip masalara bastırın.

## Menüde fiyat veya ürün değiştirme

Tüm ürünler `script.js` dosyasının en üstündeki `menuData` bölümündedir.

Örnek:

```js
{
  name: "Penne Arrabiata",
  description: "Acı biber, zeytinyağı...",
  price: "250 TL"
}
```

Buradaki ürün adı, açıklama veya fiyatı değiştirip dosyayı GitHub'a yeniden yüklemeniz yeterlidir.

## Telefon, Instagram ve konum bağlantıları

`index.html` dosyasının alt tarafındaki `contact-links` bölümünde bulunan `href="#"` alanlarını kendi bağlantılarınızla değiştirin.

Telefon örneği:

```html
<a href="tel:+905551112233">☎ <span>Telefon</span></a>
```

Instagram örneği:

```html
<a href="https://instagram.com/kullaniciadi">◎ <span>Instagram</span></a>
```

Google Maps örneği:

```html
<a href="https://maps.google.com/?q=adresiniz">⌖ <span>Konum</span></a>
```

function sendEmailOnSubmit(e) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var lastRow = sheet.getLastRow();
  
    // E-posta adreslerinin bulunduğu sütünü vermeliyiz, 0 dan deği 1 den başlıyor 
    var emailColumn = 4; // e maillerin bulunduğu sütüne göre revize edin
    var email = sheet.getRange(lastRow, emailColumn).getValue().toString().trim();
  
    if (!validateEmail(email)) {
      Logger.log("Geçersiz e-posta atlandı: " + email);
      return;
    }
  
    var eventLink = "https://www.google.com/url?q=https://teams.microsoft.com/l/meetup-join/19%253ameeting_MmZmNDczZjgtMWMxMi00NWI4LThkYzctNDYzYTYyYjY5ZmZk%2540thread.v2/0?context%3D%257b%2522Tid%2522%253a%25229b2aa256-6b63-48b7-88bd-26407e34cbc4%2522%252c%2522Oid%2522%253a%25226c044e12-a948-4487-b771-776ab1804b8c%2522%257d&sa=D&source=calendar&usd=2&usg=AOvVaw1AdeLtYRxkx96J2Chqi7jC";
  
    var subject = "İnönü IEEE & Ford Otosan - Dijital Dönüşüm Etkinlik Katılım Linki";
    var body = "Merhaba,\n\n" +
               "Umarım iyisindir 💙 8 Mart Cumartesi günü saat 15:00'da gerçekleşecek İnönü IEEE & Ford Otosan Dijital Dönüşüm etkinliğimize yaptığın başvuru için bu maili sana iletiyoruz.\n\n" +
               "Katılım sağlamak için aşağıdaki bağlantıyı kullanabilirsin:\n\n" + eventLink + "\n\n" +
               "Eğer linkte sorun yaşarsan bu bilgileri de kullanabilirsin:\n\n" +
               "📌 **Meeting ID:** 338 583 144 337\n" +
               "🔑 **Passcode:** Ud3k4mq6\n\n" +
               "Bu etkinlikte sektör ve kariyer hakkında aklındaki tüm sorulara yanıt bulabileceğin keyifli ve verimli bir sohbet seni bekliyor.\n\n" +
               "Şimdiden ilgin için teşekkür ederiz. Etkinlikte görüşmek dileğiyle 💙✈️\n\n" +
               "İnönü IEEE Topluluğu";
  
    // e-posta gönder
    MailApp.sendEmail(email, subject, body);
    Logger.log("Yeni form dolduran kişiye e-posta gönderildi: " + email);
  
    // google takvime ekle
    addEventToCalendar(email);
  }
  
  // google takvime direkt etkinlik ekleme fonksiyonu
  function addEventToCalendar(email) {
    var calendar = CalendarApp.getDefaultCalendar(); // varsayılan google takvimi kullan
    var eventTitle = "İnönü IEEE & Ford Otosan - Dijital Dönüşüm Etkinliği";
    var eventDescription = "Etkinlikte sektör ve kariyer hakkında aklınızdaki tüm sorulara yanıt bulabileceğiniz keyifli bir sohbet sizi bekliyor.";
    var eventLocation = "Online - Microsoft Teams";
    var eventStartTime = new Date("March 8, 2025 15:00:00"); // başlangıç tarihi ve saati
    var eventEndTime = new Date("March 8, 2025 16:00:00"); // bitiş tarihi ve saati
  
    var event = calendar.createEvent(eventTitle, eventStartTime, eventEndTime, {
      location: eventLocation,
      description: eventDescription
    });
  
    event.addGuest(email); //kullanıcıyı davet et
    Logger.log("Etkinlik Google Takvime eklendi ve kullanıcı davet edildi: " + email);
  }
  
  // e-posta adresinin geçerli olup olmadığını kontrol eden fonksiyon
  function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+$/;
    return emailRegex.test(email);
  }
  
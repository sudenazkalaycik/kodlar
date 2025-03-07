function sendEmailToAll() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var lastRow = sheet.getLastRow();
  
    // e posta adreslerini yer aldığı sütün yazılacak (0 dan değiş 1 den başlıyor)
    var emailColumn = 4; // tabloya göre revize edin
    var emails = [];
  
    for (var i = 2; i <= lastRow; i++) { // başlık satırlarını atlamak için i = 2 den başlayacak - kendizine göre revize edin
      var email = sheet.getRange(i, emailColumn).getValue().toString().trim();
  
      if (email && validateEmail(email)) {
        emails.push(email);
      } else {
        Logger.log("Geçersiz e-posta atlandı: " + email);
      }
    }
  
    if (emails.length === 0) {
      Logger.log("Geçerli e-posta adresi bulunamadı.");
      return;
    }
  
    var eventLink = "etkinlik linkinizi buaraya yerleştirin";
  
    var subject = "e-mail konu başlığınızı buraya yazın";
    var body = "Merhaba,\n\n" +
               "örkinek metin\n\n" +
               "örnek etkinlik lin\n\n" + eventLink + "\n\n" +
               "örnek katılım sağlayabilmek adına diğer bilgiler:\n\n" +
               "📌 **Meeting ID:** xxxxxxx\n" +
               "🔑 **Passcode:** yyyyyy\n\n" +
               "örnek mail kapanış metni\n\n" +
               "imze kısmı ör: Jhon Doe";
  
    for (var j = 0; j < emails.length; j++) {
      MailApp.sendEmail(emails[j], subject, body);
      addEventToCalendar(emails[j]); //  google takvim için davet eklenir
    }
  
    Logger.log("Toplam " + emails.length + " kişiye e-posta gönderildi.");
  }
  
  // e-posta adresinin geçerli olup olmadığını kontrol eden fonksiyon kısmı
  function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  //google takvime etkinlik ekleme kısmı
  function addEventToCalendar(email) {
    var calendar = CalendarApp.getDefaultCalendar(); // varsayılan google takvimi kullan
    var eventTitle = "İnönü IEEE & Ford Otosan - Dijital Dönüşüm Etkinliği";
    var eventDescription = "Etkinlikte sektör ve kariyer hakkında aklınızdaki tüm sorulara yanıt bulabileceğiniz keyifli bir sohbet sizi bekliyor.";
    var eventLocation = "Online - Microsoft Teams";
    var eventStartTime = new Date("March 8, 2025 15:00:00"); // etkinlik başlangıi tarihi ve saati
    var eventEndTime = new Date("March 8, 2025 17:00:00"); // etkinlik bitiş tarihi ve saati
  
    var event = calendar.createEvent(eventTitle, eventStartTime, eventEndTime, {
      location: eventLocation,
      description: eventDescription
    });
  
    event.addGuest(email); // kullanıcı daveti
    Logger.log("Etkinlik Google Takvime eklendi ve kullanıcı davet edildi: " + email);
  }
  
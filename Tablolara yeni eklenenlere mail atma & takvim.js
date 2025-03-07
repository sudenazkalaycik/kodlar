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
  
    var eventLink = "örnek link";
  
    var subject = "örnek konu başlığı";
    var body = "Merhaba,\n\n" +
               "örkinek metin\n\n" +
               "örnek etkinlik lin\n\n" + eventLink + "\n\n" +
               "örnek katılım sağlayabilmek adına diğer bilgiler:\n\n" +
               "📌 **Meeting ID:** xxxxxxx\n" +
               "🔑 **Passcode:** yyyyyy\n\n" +
               "örnek mail kapanış metni\n\n" +
               "imze kısmı ör: Jhon Doe";
  
    // e-posta gönder
    MailApp.sendEmail(email, subject, body);
    Logger.log("Yeni form dolduran kişiye e-posta gönderildi: " + email);
  
    // google takvime ekle
    addEventToCalendar(email);
  }
  
  // google takvime direkt etkinlik ekleme fonksiyonu
  function addEventToCalendar(email) {
    var calendar = CalendarApp.getDefaultCalendar(); // varsayılan google takvimi kullan
    var eventTitle = "Ekinlik başlığı";
    var eventDescription = "açıklama";
    var eventLocation = "Yer";
    var eventStartTime = new Date("örnek: March 8, 2025 15:00:00"); // başlangıç tarihi ve saati
    var eventEndTime = new Date("örnek: March 8, 2025 16:00:00"); // bitiş tarihi ve saati
  
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
  
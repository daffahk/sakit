var url_spreadsheet = 'https://docs.google.com/spreadsheets/d/1S_ZFoRqAex_ztjSlaMnKkkEhSZN9SJC4V8W2joV_zFM/edit#gid=1664793252';  //Paste URL of GOOGLE SHEET

var ss= SpreadsheetApp.openByUrl(url_spreadsheet);

function doGet(e) {
  var sidebar_home="collapsed";
  var expanded_home="false";

 if (!e.parameter.p || e.parameter.p == "home") {
   

    //return HtmlService.createTemplateFromFile("Index1").evaluate();
     var template = HtmlService.createTemplateFromFile('Index')
   
   
     var html = template.evaluate()
    .setTitle('SAKIT - Home');

    var htmlOutput = HtmlService.createHtmlOutput(html);
    htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1');
    return htmlOutput;
  }  
  else if (e.parameter.p == "daftarspm") {
    return load_halaman("daftarspm");

  } else if (e.parameter.p == "transaksi") {
    return load_halaman("transaksi");
  } else if (e.parameter.p == "detilspm") {
       if (e.parameter.no) {
          template = HtmlService.createTemplateFromFile('detilspm');
           template.no_spm=e.parameter.no;
          html = template.evaluate()
            .setTitle('SAKIT');
        
          htmlOutput = HtmlService.createHtmlOutput(html);
          htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1');
          return htmlOutput;
     
       }
  }  else if (e.parameter.p == "proyeksi_sp2d") {
    return load_halaman("proyeksi_sp2d");
  }   else if (e.parameter.p == "kalender") {
    return load_halaman("kalender");
  } else if (e.parameter.p == "proyeksi_spm") {
    return load_halaman("proyeksi_spm");
  }   else if (e.parameter.p == "rka") {
    return load_halaman("rka");
  }  else if (e.parameter.p == "rka") {
    return load_halaman("rka");
  }  else if (e.parameter.p == "orang") {
      if (e.parameter.id) {
          template = HtmlService.createTemplateFromFile('detilorang');
           template.id_orang=e.parameter.id;
          html = template.evaluate()
            .setTitle('SAKIT');
        
          htmlOutput = HtmlService.createHtmlOutput(html);
          htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1');
          return htmlOutput;
     
       }
  }   else if (e.parameter.p == "detilitem") {
       if (e.parameter.no) {
          template = HtmlService.createTemplateFromFile('detilitem');
           template.item=e.parameter.no;
          html = template.evaluate()
            .setTitle('SAKIT');
        
          htmlOutput = HtmlService.createHtmlOutput(html);
          htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1');
          return htmlOutput;
     
       }
  }  
  
  else{

    return load_halaman("Index");
  }
}

function load_halaman(halaman) {
  // do some template processing here
  //return HtmlService.createTemplateFromFile(halaman).evaluate();
 
     var template = HtmlService.createTemplateFromFile(halaman)
     var html = template.evaluate()
    .setTitle('SAKIT');
  
    var htmlOutput = HtmlService.createHtmlOutput(html);
    htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1');
    return htmlOutput;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
}

function getScriptUrl() {
 var url = ScriptApp.getService().getUrl();
 
 return url;
}


function getSPMTerbaru() {
  var limit = "E"+(ambil_cell("dashboard","C21")+22);

  var arr = getRangeData("dashboard","A23",limit,true);
  console.log("ARR SPM : " + arr);
  return arr;
}

function getSPMSemua() {
  var limit = "Q"+(ambil_cell("dashboard","M1")+1);

  var arr = getRangeData("dashboard","L2",limit,true);
  console.log("ARR SPM : " + arr);
  return arr;
}


function getSP2DTerbaru() {
  var limit = "K"+(ambil_cell("dashboard","H21")+22);

  var arr = getRangeData("dashboard","F23",limit,true);
  console.log("ARR SP2D : " + arr);
  return arr;
}

function getProyeksiSP2D(jenbel) {
 
   var arr = getRangeData("proyeksi"+jenbel,"C6","I18",false);
  console.log("ARR Proyeksi SP2D " + jenbel + " : " + arr);
  return arr;
}
function getProyeksiSP2DTotal() {
 
   var arr = getRangeData("proyeksi","C22","I34",false);
  console.log("ARR Proyeksi SP2D Total  : " + arr);
  return arr;
}

function getProyeksiSPMTotal() {
 
   var arr = getRangeData("proyeksi","K22","Q34",false);
  console.log("ARR Proyeksi SPM Total  : " + arr);
  return arr;
}


function getProyeksiSPM(jenbel) {
 
   var arr = getRangeData("proyeksi"+jenbel,"K6","Q18",false);
  console.log("ARR Proyeksi SP2D " + jenbel + " : " + arr);
  return arr;
}

function getRKA() {
   var limit = "AB"+(ambil_cell("dashboard","T1")+1);
  var arr = getRangeData("dashboard","S3",limit,false);
  console.log("ARR RKA : " + arr);
  return arr;
}

function setSheet(nama_sheet,cell,nilai) {
  ss.getSheetByName(nama_sheet).getRange(cell).setValue(nilai);
  SpreadsheetApp.flush();
  
}

function getDetailSPM(no_spm) {
  setSheet("detilSPM","B2",no_spm);
  var limit = "H"+(ambil_cell("detilSPM","I6")+6);
  var arr = getRangeData("detilSPM","A7",limit,false);
  console.log("ARR Detail : " + arr);
  return arr;
}

function getDetailOrang(id_orang) {
  setSheet("lampiran","J2",id_orang);
  var limit = "M"+(ambil_cell("lampiran","L2")+2);
  var arr = getRangeData("lampiran","I3",limit,false);
  console.log("ARR Detail : " + arr);
  return arr;
}

function getDetailItem(item) {
  setSheet("detilTransaksi","B2",item);
  var limit = "G"+(ambil_cell("detilTransaksi","A8")+9);
  var arr = getRangeData("detilTransaksi","A10",limit,true);
  console.log("ARR Detail : " + arr);
  return arr;
}

function getLampiranSPM(no_spm) {
  setSheet("dashboard","AE1",no_spm);
  var limit="AI"+(ambil_cell("dashboard","AF1")+1);
   var arr = getRangeData("dashboard","AD2",limit,true);
  console.log("ARR Detail : " + arr);
  return arr;

}

function ambil_cell(nama_sheet, cellnya, display) {

    var webAppSheet = ss.getSheetByName(nama_sheet);
    if (display==true) {
      var temp = webAppSheet.getRange(cellnya).getDisplayValue();
    } else {
      var temp = webAppSheet.getRange(cellnya).getValue();
    }
    return temp;
}

function getRangeData(sheetName, startCell, endCell, display) {
  var sheet = ss.getSheetByName(sheetName);
  var dataRange = sheet.getRange(startCell + ":" + endCell);
  if (display==true){ 
    var data = dataRange.getDisplayValues();
  } else {
    var data = dataRange.getValues();
  }
  return data;
}

function array_spm_terbaru() 
{
 var webAppSheet = ss.getSheetByName('dashboard');


  var temp = webAppSheet.getRange("A23:D24").getValues();
console.log(temp);
  return temp;

}

function format_angka(angka) {

  return new Intl.NumberFormat("id-ID").format(angka);

}

function testing(){
 
 
 var arr=getLampiranSPM(235);
 return arr;
}

function cari_nilai_transaksi(kolom,searchValue){

   if (kolom=="item") {
      var pencarian= cari_nilai("RKA",0,searchValue);
    
      var result = {
        success:pencarian.success,
        message:pencarian.message,
        akun:ambil_cell("RKA","O"+pencarian.message) + " - "+ambil_cell("RKA","P"+pencarian.message)+ " - "+ambil_cell("RKA","Q"+pencarian.message)
      };
  } else if (kolom=="spm") {
       var pencarian= cari_nilai("dbSPM",0,searchValue);
    
      var result = {
        success:pencarian.success,
        message:pencarian.message,
        uraian:ambil_cell("dbSPM","C"+pencarian.message),
        output:ambil_cell("dbSPM","E"+pencarian.message),
        cara_bayar:ambil_cell("dbSPM","D"+pencarian.message),
        tgl_spm:ambil_cell("dbSPM","B"+pencarian.message,true),
      };

  }
  return result;

}
function cari_nilai(sheetName, column, searchValue) {
  
  var sheet = ss.getSheetByName(sheetName);
  var data = sheet.getDataRange().getValues();
  var row = -1;

  for (var i = 0; i < data.length; i++) {
    if (data[i][column] == searchValue) {
      row = i + 1; // kembalikan nomor baris (dalam bentuk A1 notation)
      break;
    }
  }
   
  // Kembalikan hasil
  var result = {
    success: row > -1,
    message: row > -1 ? row : 0,
    row: row > -1 ? sheet.getRange(row, 1).getA1Notation() : ""
    
  };


  return result;
}


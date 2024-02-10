Final Code

// Google Apps Script code

function generateQRCodesAndSaveToSheet() {
  // Get the active Google Sheet

  var a1 = 1001;  // Starting Module ID
  var a2 = 1015;  // Ending Module ID

  var QRcode_File_Name = 'QR Codes'; // Sheet Name of Generated QR code File  

  var sourceFileId = "1LJ-qZJCVLGZkIyC2T0ow9Pa31dEOFB7e1S_3PAIoXrY";
  var folder = DriveApp.getFolderById("1i8RIeHPw60wq-NWpY1cnX8uu728C1R3i");
  var sourceFile = DriveApp.getFileById(sourceFileId);
  
  for (var i = a1; i <= a2; i++) {
    var newFile = sourceFile.makeCopy();
    var newName = i.toString();
    newFile.setName(newName);
    folder.addFile(newFile);
    console.log(newName);
  }

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  // Replace 'YOUR_FOLDER_ID' with the ID of your Google Drive folder
  var folderId = '1i8RIeHPw60wq-NWpY1cnX8uu728C1R3i';
  var folder = DriveApp.getFolderById(folderId);

  // Get all files in the folder
  var files = folder.getFiles();

  // Create a new sheet to save the QR codes
  var qrCodeSheet = spreadsheet.insertSheet(QRcode_File_Name);
  var i = 0;
  var newRow = 1;
  var newcolumn = 0;

  // Loop through each file in the folder
  while (files.hasNext()) {
    var file = files.next();
    // Check if the file is a spreadsheet
    if (file.getMimeType() === 'application/vnd.google-apps.spreadsheet' && file.getName() != 'MainSheet') {
      // Open the spreadsheet
      var spreadsheetFile = SpreadsheetApp.open(file);
      var spreadsheetName = spreadsheetFile.getName();
      // Get the URL of the spreadsheet
      var spreadsheetUrl = spreadsheetFile.getUrl();

      // Generate QR code for the spreadsheet URL
      var qrCode = generateQRCode(spreadsheetUrl);

      // Insert the QR code into the QR Codes sheet
      
      newcolumn = newcolumn+1;
      
      console.log("New Row : " + newRow);
      console.log("New Column : " + newcolumn);
      console.log("Converted Integer to alphabet: " + integertoAlphabets(newcolumn));

      var columnNumber = integertoAlphabets(newcolumn);
      console.log("column Number is:" + columnNumber);

      var currentCellname = columnNumber+newRow;

      console.log("Currentcell is:" + currentCellname);

      qrCodeSheet.setColumnWidth(newcolumn, 121);
      qrCodeSheet.setRowHeight(newRow, 150);

      qrCodeSheet.insertImage(qrCode, newcolumn, newRow);

      qrCodeSheet.getRange(currentCellname).setValue(spreadsheetName);
      qrCodeSheet.getRange(currentCellname).setHorizontalAlignment('center');
      qrCodeSheet.getRange(currentCellname).setVerticalAlignment('Bottom');
      
      i++;

      if(i>=5)
      {
        newcolumn = 0;
        newRow = newRow + 1;
        i = 0;
      }
    }
  }
}

// Function to generate a QR code using Google Chart API
function generateQRCode(text) {
  var apiUrl = 'https://chart.googleapis.com/chart?chs=120x120&cht=qr&chl=' + encodeURIComponent(text);
  return UrlFetchApp.fetch(apiUrl);
}

function integertoAlphabets(integer_value)
{
  switch(integer_value) {
    case 1:
      return 'A';
      break;
    case 2:
      return 'B';
      break;
    case 3:
      return 'C';
      break;
    case 4:
      return 'D';
      break;
    case 5:
      return 'E';
      break;
    case 6:
      return 'F';
      break;
    case 7:
      return 'G';
      break;
    case 8:
      return 'H';
      break;
    case 9:
      return 'I';
      break;
    case 10:
      return 'J';
      break;
    case 11:
      return 'K';
      break;
    case 12:
      return 'L';
      break;
    case 13:
      return 'M';
      break;
    case 14:
      return 'N';
      break;
    case 15:
      return 'O';
      break;
    case 16:
      return 'P';
      break;
    case 17:
      return 'Q';
      break;
    case 18:
      return 'R';
      break;
    case 19:
      return 'S';
      break;
    case 20:
      return 'T';
      break;
    case 21:
      return 'U';
      break;
    case 22:
      return 'V';
      break;
    case 23:
      return 'W';
      break;
    case 24:
      return 'X';
      break;
    case 25:
      return 'Y';
      break;
    case 26:
      return 'Z';
      break;
    default:
      return 'A';
  }
}

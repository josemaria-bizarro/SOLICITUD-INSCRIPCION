function afterFormSubmit(e) {
  const info = e.namedValues;
  crearPDF(info);
}


function crearPDF(info){
  
  
const pdfFolder = DriveApp.getFolderById("1kOKewsj75rDFvIE-q7HrL8i-yRUV0AU7");
const tempFolder = DriveApp.getFolderById("1G4S9gcnEFSd1jm6RtK_ozc93pYQPl_HT");
const templateDoc = DriveApp.getFileById("1lQA-s41aCR8MZc5ZzNzmmqYkgKaAYhbja33Vl6AO9NA");

const newTempFile = templateDoc.makeCopy(tempFolder);

const openDoc = DocumentApp.openById(newTempFile.getId());
const body = openDoc.getBody();
  // En esta seccion se debe de empatar los marcadores de la plantilla con los de la hoja de respuesta,
  // entre braquets esta el marcador de la plantilla y entre corchetes el encabezado de donde obtiene los dato
body.replaceText("{fechins}", info['Marca temporal'][0]);
body.replaceText("{asesor}", info['Dirección de correo electrónico'][0]);
body.replaceText("{tipins}", info['TIPO DE INSCRIPCIÓNl'][0]);
body.replaceText("{opcionedu}", info['OPCIÓN EDUCATIVA'][0]);
openDoc.saveAndClose();
  
const blobPDF = newTempFile.getAs(MimeType.PDF);
  // En esta seccion se agregan los datos que necesita para generar el nombre del pdf
const pdfFile = pdfFolder.createFile(blobPDF).setName(info['Marca temporal'][0] + " " + info['OPCIÓN EDUCATIVA'][0]);
tempFolder.removeFile(newTempFile);
  
  
  
  
}
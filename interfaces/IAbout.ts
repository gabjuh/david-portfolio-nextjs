export default interface IAbout {
  sheetId?: string;
  pageTitle?: string;
  fileName?: string;
  driveId?: string;
  imgAlt?: string;
  imgLeft?: 'TRUE' | 'FALSE';
  text: string;
  textDe: string;
  textHu: string;
  textAlign?: 'auto' | 'justify';
  buttonText?: string;
}
export default interface ICV {
  sheetId?: string;
  pageTitle?: string;
  active: '0' | '1';
  id: number;
  fileName: string;
  driveId?: string;
  imgAlt?: string;
  imgOnSide?: 'left' | 'right';
  textEn: string;
  textDe: string;
  textHu: string;
  buttonTextEn?: string;
  buttonTextDe?: string;
  buttonTextHu?: string;
}
export default interface IBiography {
  sheetId: string;
  pageTitle?: string;
  fileName: string;
  driveId?: string;
  imgAlt: string;
  imgOnSide?: 'left' | 'right';
  text?: string;
  question?: string;
  buttonText?: string;
}
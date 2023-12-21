export default interface IBiography {
  sheetId: string;
  pageTitle?: string;
  active: '1' | '0' | '';
  fileName: string;
  driveId?: string;
  imgAlt: string;
  imgOnSide?: 'left' | 'right';
  text?: string;
  question?: string;
  buttonText?: string;
}
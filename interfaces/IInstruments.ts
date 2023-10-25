export default interface IInstruments {
  sheetId: string;
  pageTitle: string;
  active: '0' | '1';
  id: number;
  fileName: string;
  imgAlt: string;
  imgOnSide: 'left' | 'right';
  text: string;
}
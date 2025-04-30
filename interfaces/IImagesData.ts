export default interface IImagesData {
  fileName: string;
  imgId: string;
  driveId: string;
  metadata: {
    width: number;
    height: number;
    format: string;
    hasAlpha: string;
    dimension: string;
  }
}
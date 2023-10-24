const getDriveId = (url: string): string => {
  const fileId = url.match(/\/(?:drive\/[^/]+\/)?(?:folders|file)\/([^/?]+)/);
  if (!fileId) throw new Error('Invalid Google Drive URL');
  return fileId[1];
};

export default getDriveId;
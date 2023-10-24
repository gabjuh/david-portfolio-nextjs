const getVideoId = (link: string): string => {
  const id = link.match(/[A-Za-z0-9_-]{11}/);

  if (!id) throw new Error('Invalid Youtube URL');

  return id[0];
};

export default getVideoId;
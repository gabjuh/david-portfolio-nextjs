const getTextInSelectedLanguage = (obj: any, id: string) => {
  if (localStorage.getItem("username") !== null) {

    switch (localStorage.selectedLanguage) {
      case 'en':
        return obj[`${id}En`];
      case 'de':
        return obj[`${id}De`];
      case 'hu':
        return obj[`${id}Hu`];
      default:
        return obj[`${id}De`];
    }
  }
};

export default getTextInSelectedLanguage;
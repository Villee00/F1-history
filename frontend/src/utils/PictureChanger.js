
export const buildPictureURL = (url) => {
  try {
    const splitted = url.split('/')
    const splitDot = url.split('.')

    const picName = splitted[splitted.length - 1];
    const imageType = splitDot[splitDot.length - 1]
    const wikipediaStart = url.split('https://upload.wikimedia.org/wikipedia/commons/')[1];
    if (imageType == undefined || picName == undefined || wikipediaStart == undefined)
      return null

    if (imageType !== 'png' && imageType !== 'jpg') {
      return `https://upload.wikimedia.org/wikipedia/commons/thumb/${wikipediaStart}/400px-${picName}.png`
    }
    return `https://upload.wikimedia.org/wikipedia/commons/thumb/${wikipediaStart}/400px-${picName}`;

  } catch (error) {
    console.log(error)
    return null;
  }
}
function doWork(res, data) {
  var obj = JSON.parse(JSON.stringify(data));
  var response = {
    title: obj.title,
    packageName: obj.addId,
    genre: obj.genre,
    description: obj.description,
    summary: obj.summary,
    released:obj.released,
    isFree: obj.free,
    isAds: obj.adSupported,
    url: obj.url,
    media:{
        icon: obj.icon,
        headerImage: obj.headerImage,
        screenshots: obj.screenshots,
        video: obj.video,
        videoImage: obj.videoImage
    },
    stats:{
        installs: obj.installs,
        rating: obj.scoreText,
        ratingsCount: obj.ratings,
        reviewsCount: obj.reviews,
        histogram: obj.histogram
    },
    developerData: {
      developer: obj.developer,
      developerId: obj.developerId,
      developerEmail: obj.developerEmail,
      developerWebsite: obj.developerWebsite,
      developerAddress: obj.developerAddress,
      privacyPolicy: obj.privacyPolicy,
    },
    comments: obj.comments
  };
  res.send(response);
}
module.exports.doWork = doWork;
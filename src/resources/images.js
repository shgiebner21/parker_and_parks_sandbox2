
const images = {
  // I simply could not find a way to get around the require('string') issue below.
  // Pulling the image url in from the db simply could not get that to work.
  // and yes, I hate doing it this way.

  runActivity: require('../images/Hampton-Park-track.jpg'),
  fitActivity: require('../images/fitness-course.jpg'),
  racingActivity: require('../images/horse-racing.jpg'),
  denmarkActivity: require('../images/denmark-vesey.jpg'),
  bandActivity: require('../images/hampton-park-bandstand.jpg'),
  cleanActivity: require('../images/keep-clean-sign.jpg'),
  lakeActivity: require('../images/evening-over-colonial-lake.jpg'),
  learnActivity: require('../images/junior-ranger.png'),
  landmarkActivity: require('../images/StPhilips.jpg'),
  natureActivity: require('../images/Colonial-Lake-flowerbed.jpg'),
  pierActivity: require('../images/demetre-park-sunlit-dock.jpg'),
  marshActivity: require('../images/egret-demetre-park.jpg')
}

export default images

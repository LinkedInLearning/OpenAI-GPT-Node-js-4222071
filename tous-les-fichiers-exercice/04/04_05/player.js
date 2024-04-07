var player = require("play-sound")((opts = {}));

module.exports = function play(mediaFile) {
  player.play(mediaFile, function (err) {
    if (err) throw err;
  });
};

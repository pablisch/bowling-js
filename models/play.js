const readline = require('readline');
const Scorecard = require('./scorecard');

class Play {
  constructor() {
    this.scorecard = null;
    this.currentFrame = 0;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  run() {
    this.scorecard = new Scorecard();
    this.askPinsDown();
  }

  askPinsDown() {
    if (this.currentFrame < 6) {
      let frameNumber = this.scorecard.length() + 1;

      this.rl.question(`Enter pins down for frame ${frameNumber} roll 1? `, (pins1) => {
        pins1 = parseInt(pins1);
        console.log(`You knocked down ${pins1} pins!`);

        this.rl.question(`Enter pins down for frame ${frameNumber} roll 2? `, (pins2) => {
          pins2 = parseInt(pins2);
          console.log(`You knocked down ${pins2} pins!`);

          const frame = new Frame(pins1, pins2);
          this.scorecard.addFrame(frame);
          this.currentFrame++;

          this.askPinsDown();
        });
      });
    } else {
      console.log('The loop is still running!');
      this.rl.close();
    }
  }
}

play = new Play();
play.run();

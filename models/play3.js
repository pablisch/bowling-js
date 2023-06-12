const readline = require('readline');
const Scorecard = require('./scorecard');
const { promisify } = require('util');
const rlQuestion = promisify(this.rl.question).bind(this.rl);

class Play {
  constructor() {
    this.scorecard = null;
    this.currentFrame = 0;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  run() {
    this.scorecard = new Scorecard();
    this.rlQuestion = promisify(this.rl.question).bind(this.rl);
    this.askPinsDown();
  }

  async getPinsKnockedDown(frameNumber, rollNumber) {
    const question = `Enter pins down for frame ${frameNumber} roll ${rollNumber}? `;
    const pins = await this.rlQuestion(question);
    const pinsKnockedDown = parseInt(pins);
    console.log(`You knocked down ${pinsKnockedDown} pins!`);
    return pinsKnockedDown;
  };

  async askPinsDown() {
    if (this.currentFrame < 6) {
      let frameNumber = this.currentFrame + 1;
  
      const pins1 = await this.getPinsKnockedDown(frameNumber, 1);
      const pins2 = await this.getPinsKnockedDown(frameNumber, 2);
      this.currentFrame++;
      await this.askPinsDown();
    }
  }
}

play = new Play();
play.run();


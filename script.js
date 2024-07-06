const demo = document.getElementById("demo");
const btn = document.getElementById("btn");
const container = document.getElementById("container");
const audio = document.getElementById("audio");

const app = {
  list: [],
  listOutputted: [],
  maxNumberInTicket: 99,
  time: 3000,
  intervalTimerIds: [],
  handleInitArrayRandomNumber: function () {
    for (let i = 1; i <= this.maxNumberInTicket; i++) {
      this.list.push(i);
    }
  },
  handlePushOutputtedNumber: function (number) {
    this.listOutputted.push(number);
    this.handleRemoveOutputtedNumber(number);
  },
  handleRemoveOutputtedNumber: function (number) {
    this.list = this.list.filter((num) => num !== number);
    console.log("list :: ", this.list);
    console.log("output :: ", this.listOutputted);
  },
  getNewNumber: function () {
    const lengthListNumber = this.list.length;
    const offsetNumber = Math.floor(Math.random() * lengthListNumber);
    return this.list[offsetNumber];
  },
  handleRandomNumber: function () {
    let output = undefined;
    btn.disabled = true;

    const timerId = setInterval(() => {
      output = this.getNewNumber();
      demo.innerText = output;
    }, 50);
    setTimeout(() => {
      clearInterval(timerId);
      this.handlePushOutputtedNumber(output);
      this.handleShowNumberList();
      btn.disabled = false;
    }, this.time);
  },
  handleShowNumberList: function () {
    const outputHtml = this.listOutputted
      .map((number) => {
        return `<div id="number">${number}</div>`;
      })
      .join("");
    container.innerHTML = outputHtml;
  },
  onPlayBackgroudMusic: function () {
    audio.volume = 0.5;
    audio.play();
  },
  onRandomNumber: function () {
    this.handleRandomNumber();
  },
  handleEvents: function () {
    const _this = this;
    btn.addEventListener("click", function () {
      _this.onRandomNumber();
    });
  },
  start: function () {
    this.handleInitArrayRandomNumber();
    this.handleEvents();
  },
};

app.start();

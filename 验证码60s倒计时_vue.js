const TIME_COUNT = 60;
if (!this.Countdown.timer) {
    this.Countdown.count = TIME_COUNT;
    this.Countdown.show = false;
    this.Countdown.timer = setInterval(() => {
        if (this.Countdown.count > 0 && this.Countdown.count <= TIME_COUNT) {
            this.Countdown.count--;
        } else {
            this.Countdown.show = true;
            clearInterval(this.timer);
            this.Countdown.timer = null;
        }
    }, 1000)
}

// data: {
//     //验证码倒计时
//     Countdown: {
//         show: true,
//         timer: null,

//         count: ''
//     },
// }
!(function () {
  var start = new Date("2021/11/27 21:00:00");

  function update() {
    var now = new Date();
    now.setTime(now.getTime() + 250);

    var timeDiff = now - start;

    var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.round((timeDiff % (1000 * 60)) / 1000);

    document.getElementById("timeDate").innerHTML = `本站已运行&nbsp;${days}&nbsp;天&nbsp;`;
    // document.getElementById("timeDate").innerHTML = `&nbsp;${days}&nbsp;天&nbsp;`;
    document.getElementById("times").innerHTML = `${hours.toString().padStart(2, '0')}&nbsp;小时&nbsp;${minutes.toString().padStart(2, '0')}&nbsp;分&nbsp;${seconds.toString().padStart(2, '0')}&nbsp;秒`;
    document.getElementById("times").style.marginLeft = "-3px";
  }

  update();
  setInterval(update, 1000);
})();

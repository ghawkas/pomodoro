function timer() {
	let timeStart,
			timeEnd,
			timeDiff,
			timeoutTimer,
			isRunning = false,
			hours = 0,
			minutes = 0,
			seconds = 0,
			pauseHours = 0,
			pauseMinutes = 0,
			pauseSeconds = 0;

	function update() {
		timeEnd = new Date();
		timeDiff = (timeEnd - timeStart) / 1000;

		seconds = Math.round(timeDiff % 60) + pauseSeconds;
		timeDiff = Math.floor(timeDiff / 60);
		minutes = Math.round(timeDiff % 60) + pauseMinutes;
		timeDiff = Math.floor(timeDiff / 60);
		hours = Math.round(timeDiff % 24) + pauseHours;
		timeDiff = Math.floor(timeDiff / 24);

		setFields(hours, minutes, seconds);
		timeoutTimer = setTimeout(update, 1000)
	}

	function start() {
		if (!isRunning) {
			isRunning = true;
			timeStart = new Date();
			update();
		} else {
			clearTimeout(timeoutTimer);
			isRunning = false;
			pauseHours = hours;
			pauseMinutes = minutes;
			pauseSeconds = seconds;
		}
	}

	function stop() {
		clearTimeout(timeoutTimer);
		setFields(0, 0, 0);
		isRunning = false;
		timeStart = new Date();

		pauseHours = 0;
		pauseMinutes = 0;
		pauseSeconds = 0;
	}

	function setFields(hours, minutes, seconds) {
		let hoursField = document.getElementById('hours'),
				minutesField = document.getElementById('minutes'),
				secondsField = document.getElementById('seconds');

		hoursField.textContent = hours < 10 ? '0' + hours : hours;
		minutesField.textContent = minutes < 10 ? '0' + minutes : minutes;
		secondsField.textContent = seconds < 10 ? '0' + seconds : seconds;
	}

	document.getElementById('startTimer').addEventListener('click', function () {
		document.getElementById('timer').classList.add('running');
		if (isRunning) {
			document.getElementById('timer').classList.add('paused');
		} else {
			document.getElementById('timer').classList.remove('paused');
		}
		start();
	});
	document.getElementById('stopTimer').addEventListener('click', function () {
		document.getElementById('timer').classList.remove('running');
		document.getElementById('timer').classList.remove('paused');
		stop();
	});

}

timer();
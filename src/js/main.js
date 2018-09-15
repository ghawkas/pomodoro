function timer() {
	let time = new Date();

	function init() {
		setFields(time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds())
	}

	function update() {
		time = new Date();
		setFields(time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds())
	}

	function setFields(hours, minutes, seconds) {
		let hoursField = document.getElementById('hours'),
				minutesField = document.getElementById('minutes'),
				secondsField = document.getElementById('seconds');

		hoursField.innerHTML = hours < 10 ? '0' + hours : hours;
		minutesField.innerHTML = minutes < 10 ? '0' + minutes : minutes;
		secondsField.innerHTML = seconds < 10 ? '0' + seconds : seconds;
	}

	init();
	setInterval(function() {
		update();
	}, 1000)

}

timer();
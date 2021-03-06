const clock = document.createElement('template');
clock.innerHTML = `
<div class="container">
	<div class="clock">
		<img id="hourHand" class="hands" src="https://github.com/XSneha/web-components/blob/master/components/clock-analog/images/hour_hand.png?raw=true" alt="">
		<img id="minuteHand" class="hands" src="https://raw.githubusercontent.com/XSneha/web-components/master/components/clock-analog/images/minute_hand.png" alt="">
		<img id="secondHand" class="hands" src="https://raw.githubusercontent.com/XSneha/web-components/master/components/clock-analog/images/second_hand.png" alt="">
	</div>
</div>
<style>
.container {
	display: flex;
	align-items: center;
	justify-content: center;
}
.clock {
	position: relative;
	width: 300px;
	height: 300px;
//	background: url(https://raw.githubusercontent.com/XSneha/web-components/master/components/clock-analog/images/clock_face.jpg?raq=true);
	background : LEMONCHIFFON;
	border-radius: 50%;
}
.clock:after {
	position: absolute;
	content: '';
	background: #000;
	width: 10px;
	height: 10px;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	border-radius: 50%;
}
.hands {
	position: absolute;
  top: 0;
  left: 0;
}
@media screen and (min-width: 400px)  and ( max-width: 655px ) {
	img.hands { width: 250px;	height: 250px; }
	.clock { width: 250px;	height: 250px; }
}
@media screen and (max-width: 399px ){
	img.hands { width: 150px; height:150px }
	.clock { width: 150px; height:150px }
}
</style>
`;

/**
 * Clock is a web component for which will automatically provide
 *  an analog clock to user
 *	expected Usage:
 *		<clock-analog>
 *	 	</clock-analog>
 *
 * @class Clock
 * @extends {HTMLElement}
 */
class Clock extends HTMLElement {

	constructor() {
		super();
	}
	connectedCallback() {
		const shadow = this.attachShadow({ mode: 'open' });
		shadow.appendChild(clock.content.cloneNode(true));

		setInterval(function() {
			let d = new Date();
			var hourDeg = (d.getHours() * 30) + (0.5 * d.getMinutes()); // every hour, 30 deg. 30 / 60
			var minuteDeg = (d.getMinutes() * 6) + (0.1 * d.getSeconds()); // every minute, 6 deg. 6 / 60
			var secondDeg = d.getSeconds() * 6; // 360 / 60
			shadow.getElementById('hourHand').style.transform = 'rotate(' + hourDeg + 'deg)';
			shadow.getElementById('minuteHand').style.transform = 'rotate(' + minuteDeg + 'deg)';
			shadow.getElementById('secondHand').style.transform = 'rotate(' + secondDeg + 'deg)';
		}, 1000);
	}
}

window.customElements.define('clock-analog', Clock);

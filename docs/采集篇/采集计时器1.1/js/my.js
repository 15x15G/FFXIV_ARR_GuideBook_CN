var localToEorzea = function(){
	var MONTHS_PER_YEAR = 12;
	var DATES_PER_MONTH = 32;
	var HOURS_PER_DATE = 24;
	var MINUTES_PER_HOUR = 60;
	var SECONDS_PER_MINUTE = 60;
	var MILLISECONDS_PER_SECONDS = 1000;
	var EORZEA_PER_LOCAL = 1440 / 70;
	var EORZEA_MILLISECONDS = 0;	
	/*
	 *ET1min = ET1,000ms * ET60sec
	 * (60,000ms)
	 */
	var MILLISECONDS_PER_MINUTE = MILLISECONDS_PER_SECONDS * SECONDS_PER_MINUTE;
	/*
	 *ET1hour = ET60,000ms * ET60min
	 * (3,600,000ms)
	 */
	var MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * MINUTES_PER_HOUR;
	/*
	 *ET1hour = ET3,600,000ms * ET24h
	 * (86,400,000ms)
	 */
	var MILLISECONDS_PER_DATE = MILLISECONDS_PER_HOUR * HOURS_PER_DATE;
	/*
	 *ET1hour = ET86,400,000ms * ET32d
	 * (2,764,800,000ms)
	 */
	var MILLISECONDS_PER_MONTH = MILLISECONDS_PER_DATE * DATES_PER_MONTH;
	return {
		setTime : function(time){
			var UNIX = time;
			//UNIXエポックミリ秒をエオルゼアエポックミリ秒に換算
			/*
			 *LT1d = LT1440min
			 *ET1d = LT70min
			 */
			EORZEA_MILLISECONDS = UNIX * EORZEA_PER_LOCAL;
		},
		setEtTime : function(time) {
			EORZEA_MILLISECONDS = time;
		},
		getMonth : function() {
			return Math.floor(EORZEA_MILLISECONDS / MILLISECONDS_PER_MONTH) % MONTHS_PER_YEAR;
		},
		getDate : function() {
			return Math.floor(EORZEA_MILLISECONDS / MILLISECONDS_PER_DATE) % DATES_PER_MONTH;
		},
		getHours : function() {
			return Math.floor(EORZEA_MILLISECONDS / MILLISECONDS_PER_HOUR) % HOURS_PER_DATE;
		},
		getMinutes : function() {
			return Math.floor(EORZEA_MILLISECONDS / MILLISECONDS_PER_MINUTE) % MINUTES_PER_HOUR;
		},
		getSeconds : function() {
			return Math.floor(EORZEA_MILLISECONDS / MILLISECONDS_PER_SECONDS) % SECONDS_PER_MINUTE;
		},
		getMilliseconds : function() {
			return EORZEA_MILLISECONDS % MILLISECONDS_PER_SECONDS;
		},
		getTime : function() {
			return EORZEA_MILLISECONDS;
		},
		getSpeed : function() {
			return Math.floor(1000 / EORZEA_PER_LOCAL);
		}
	};
};

var eorzeaToLocal = function(){
	var UNIX = 0;
	var MONTHS_PER_YEAR = 12;
	var END_OF_THE_MONTH = new Date();
	END_OF_THE_MONTH.setFullYear(END_OF_THE_MONTH.getFullYear(), END_OF_THE_MONTH.getMonth() + 1, 0);
	var DATES_PER_MONTH = END_OF_THE_MONTH.getDate();
	var HOURS_PER_DATE = 24;
	var MINUTES_PER_HOUR = 60;
	var SECONDS_PER_MINUTE = 60;
	var MILLISECONDS_PER_SECONDS = 1000;
	var LOCAL_PER_EORZEA = 70 / 1440;
	var LOCAL_MILLISECONDS = 0;
	var MILLISECONDS_PER_MINUTE = MILLISECONDS_PER_SECONDS * SECONDS_PER_MINUTE;
	var MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * MINUTES_PER_HOUR;
	var MILLISECONDS_PER_DATE = MILLISECONDS_PER_HOUR * HOURS_PER_DATE;
	var MILLISECONDS_PER_MONTH = MILLISECONDS_PER_DATE * DATES_PER_MONTH;
	return {
		setTime : function(time){
			UNIX = time;
			LOCAL_MILLISECONDS = UNIX * LOCAL_PER_EORZEA;
		},
		setLtTime : function(time){
			LOCAL_MILLISECONDS = time;
		},
		getMonth : function() {
			return Math.floor(LOCAL_MILLISECONDS / MILLISECONDS_PER_MONTH) % MONTHS_PER_YEAR;
		},
		getDate : function() {
			return Math.floor(LOCAL_MILLISECONDS / MILLISECONDS_PER_DATE) % DATES_PER_MONTH;
		},
		getHours : function() {
			return Math.floor(LOCAL_MILLISECONDS / MILLISECONDS_PER_HOUR) % HOURS_PER_DATE;
		},
		getMinutes : function() {
			return Math.floor(LOCAL_MILLISECONDS / MILLISECONDS_PER_MINUTE) % MINUTES_PER_HOUR;
		},
		getSeconds : function() {
			return Math.floor(LOCAL_MILLISECONDS / MILLISECONDS_PER_SECONDS) % SECONDS_PER_MINUTE;
		},
		getMilliseconds : function() {
			return LOCAL_MILLISECONDS % MILLISECONDS_PER_SECONDS;
		},
		getTime : function() {
			return LOCAL_MILLISECONDS;
		}
	};
};

function updateTime(that){
	var LocalDate = new Date();
	var LocalUnix = LocalDate.getTime();
	var EorzeaDate = localToEorzea();
	EorzeaDate.setTime(LocalUnix);
	var EorzeaUnix = EorzeaDate.getTime();
	var EtSpeed = EorzeaDate.getSpeed();
	var EtMonth = EorzeaDate.getMonth() + 1;
	var EtDate = EorzeaDate.getDate() + 1;
	var EtHour = EorzeaDate.getHours();
	var EtMinute = EorzeaDate.getMinutes();
	var EtSecond = EorzeaDate.getSeconds();
	var	time = EtDate + '日 ' + doubleDigit(EtHour) + ':' + doubleDigit(EtMinute);
	that.text(time);
	setTimeout(function(){updateTime(that)},EtSpeed);
}

function doubleDigit(number){
	if (number < 10){
		number = "0" + number;
	}
	return number;
};

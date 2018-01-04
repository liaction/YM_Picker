//picker Liaciton CHEN.SI @1.0

// id说明:
//	YS:(years selected) MS(months select) DS(days selected)
// YST0:(top Of years selected by index 0 )
// YSB0:(below Of years selected by index 0)
// 其它以此类推
// class : YA:(years after 比如:年)
//
//
//

var YM = (function() {
	var initWidth = window.document.documentElement.clientWidth;
	document.getElementsByTagName('html')[0].style.fontSize = initWidth / 32 + 'px';
	var layout =
		'<div id="YMPickerContent" class="ym-picker-content">' +
		'<div class="flex-liaciton ym-picker-header">' +
		'<div style="flex: 1;color: orange;font-size: 1rem;">设置时间</div>' +
		'<div style="flex: 1;justify-content: center;" class="flex-liaciton"><span class="YS"></span><span class="YA"></span>&nbsp;&nbsp;<span class="MS"></span><span class="MA"></span>&nbsp;&nbsp;<span class="DS"></span><span class="DA"></span></div>' +
		'<div style="flex: 1;justify-content: flex-end;" class="flex-liaciton"><span id="YMPickerClose" class="mui-icon mui-icon-closeempty" style="font-size: 2rem;color: gray;"></span></div>' +
		'</div>' +
		'<div class="ym-picker-body">' +
		'<div class="flex-liaciton" style="align-items: center;justify-content: space-between;">' +
		'<div id="minsYear"><span id="YST0"></span><span class="YA"></span></div>' +
		'<div id="minsMonth"><span id="MST0"></span><span class="MA"></span></div>' +
		'<div id="minsDay"><span id="DST0"></span><span class="DA"></span></div>' +
		'</div>' +
		'<div class="flex-liaciton" style="align-items: center;justify-content: space-between;">' +
		'<div id="YS"><span  class="YS"></span><span class="YA"></span></div>' +
		'<div id="MS"><span  class="MS"></span><span class="MA"></span></div>' +
		'<div id="DS"><span  class="DS"></span><span class="DA"></span></div>' +
		'</div>' +
		'<div class="flex-liaciton" style="align-items: center;justify-content: space-between;">' +
		'<div id="addYear"><span id="YSB0"></span><span class="YA"></span></div>' +
		'<div id="addMonth"><span id="MSB0"></span><span class="MA"></span></div>' +
		'<div id="addDay"><span id="DSB0"></span><span class="DA"></span></div>' +
		'</div>' +
		'</div>' +
		'<div class="flex-liaciton" style="justify-content: center;margin-top: 1.2rem;justify-content: space-around;">' +
		'<button id="YMPickerBtnCancle" type="button" class="mui-btn mui-btn-danger" style="padding-left: 1.5rem;padding-right: 1.5rem;">取消</button>' +
		'<button id="YMPickerBtnOK" type="button" class="mui-btn mui-btn-yellow " style="padding-left: 1.5rem;padding-right: 1.5rem;">确定</button>' +
		'</div>' +
		'<div class="flex-liaciton" style="justify-content: center;margin-top: 1.2rem;justify-content: space-around;">' +
		'<button id="YMPickerBtnMinY" type="button" class="mui-btn mui-btn-yellow ym-hidden" style="padding-left: 1.5rem;padding-right: 1.5rem;">年 -</button>' +
		'<button id="YMPickerBtnAddY" type="button" class="mui-btn mui-btn-yellow ym-hidden" style="padding-left: 1.5rem;padding-right: 1.5rem;">年 +</button>' +
		'</div>' +
		'<div class="flex-liaciton" style="justify-content: center;margin-top: 1.2rem;justify-content: space-around;">' +
		'<button id="YMPickerBtnMinM" type="button" class="mui-btn mui-btn-yellow ym-hidden" style="padding-left: 1.5rem;padding-right: 1.5rem;">月 -</button>' +
		'<button id="YMPickerBtnAddM" type="button" class="mui-btn mui-btn-yellow ym-hidden" style="padding-left: 1.5rem;padding-right: 1.5rem;">月 +</button>' +
		'</div>' +
		'<div class="flex-liaciton" style="justify-content: center;margin-top: 1.2rem;justify-content: space-around;">' +
		'<button id="YMPickerBtnMinD" type="button" class="mui-btn mui-btn-yellow ym-hidden" style="padding-left: 1.5rem;padding-right: 1.5rem;">日 -</button>' +
		'<button id="YMPickerBtnAddD" type="button" class="mui-btn mui-btn-yellow ym-hidden" style="padding-left: 1.5rem;padding-right: 1.5rem;">日 +</button>' +
		'</div>' +
		'</div>' +
		'</div>';
	var nowDate = new Date();
	var metaDatas = {
		years: [],
		months: [],
		days: [],
		nickName: {
			year: '年',
			month: '月',
			day: '日'
		},
		maxDate: {
			year: nowDate.getFullYear(),
			month: nowDate.getMonth() + 1,
			day: nowDate.getDate()
		},
		minDate: {
			year: 1970,
			month: 1,
			day: 1
		},
		resultDate: {
			year: nowDate.getFullYear(),
			month: nowDate.getMonth() + 1,
			day: nowDate.getDate()
		},
		debug: false
	};

	var base = {
		datas: {},
		close: function() {
			var picker = document.getElementById('YMPicker');
			if(!picker) {
				return;
			}
			var cls = 'ym-hidden';
			if(!picker.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))) {
				picker.className += " " + cls;
			}
		},
		show: function() {
			var picker = document.getElementById('YMPicker');
			if(!picker) {
				return;
			}
			var cls = 'ym-hidden';
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			picker.className = picker.className.replace(reg, ' ');
		},
		init: function(params,callback) {
			base.datas = metaDatas;
			var picker = document.getElementById("YMPicker");

			if(!picker) {
				picker = document.createElement("div");
				picker.setAttribute('id', 'YMPicker');
				picker.className = "ym-picker flex-liaciton ym-hidden";
				picker.innerHTML = layout;
				document.body.appendChild(picker);
			}

			// 设置数据
			// 别名
			var oYaClasses = document.getElementsByClassName('YA');
			for(var i = 0; i < oYaClasses.length; i++) {
				oYaClasses[i].innerHTML = metaDatas.nickName.year;
			}
			var oMaClasses = document.getElementsByClassName('MA');
			for(var i = 0; i < oMaClasses.length; i++) {
				oMaClasses[i].innerHTML = metaDatas.nickName.month;
			}
			var oDaClasses = document.getElementsByClassName('DA');
			for(var i = 0; i < oDaClasses.length; i++) {
				oDaClasses[i].innerHTML = metaDatas.nickName.day;
			}

			checkDate();

			var oYs = document.getElementById("YS");
			var touchStartX;
			var touchStartY;
			oYs.addEventListener('touchstart', function(e) {
				e.stopPropagation();
				touchStartX = Math.round(e.touches[0].clientX);
				touchStartY = Math.round(e.touches[0].clientY);
			});
			oYs.addEventListener('touchend', function(e) {
				e.stopPropagation();
				var _x = Math.round(e.changedTouches[0].pageX - touchStartX);
				var _y = Math.round(e.changedTouches[0].pageY - touchStartY);
				var absX = Math.abs(_x);
				var absY = Math.abs(_y);
				if(absX >= absY) {
					if(_x > 0) {
						if(metaDatas.debug) {
							console.log('right');
						}
						return;
					}
					if(metaDatas.debug) {
						console.log('left');
					}
				} else {
					if(_y > 0) {
						if(metaDatas.debug) {
							console.log('down');
						}
						minsYear();
						return;
					}
					if(metaDatas.debug) {
						console.log('up');
					}
					addYear();
				}
			});
			var oMs = document.getElementById("MS");
			oMs.addEventListener('touchstart', function(e) {
				e.stopPropagation();
				touchStartX = Math.round(e.touches[0].clientX);
				touchStartY = Math.round(e.touches[0].clientY);
			});
			oMs.addEventListener('touchend', function(e) {
				e.stopPropagation();
				var _x = Math.round(e.changedTouches[0].pageX - touchStartX);
				var _y = Math.round(e.changedTouches[0].pageY - touchStartY);
				var absX = Math.abs(_x);
				var absY = Math.abs(_y);
				if(absX >= absY) {
					if(_x > 0) {
						if(metaDatas.debug) {
							console.log('right');
						}
						return;
					}
					if(metaDatas.debug) {
						console.log('left');
					}
				} else {
					if(_y > 0) {
						if(metaDatas.debug) {
							console.log('down');
						}
						minsMonth();
						return;
					}
					if(metaDatas.debug) {
						console.log('up');
					}
					addMonth();
				}
			});
			var oDs = document.getElementById("DS");
			oDs.addEventListener('touchstart', function(e) {
				e.stopPropagation();
				touchStartX = Math.round(e.touches[0].clientX);
				touchStartY = Math.round(e.touches[0].clientY);
			});
			oDs.addEventListener('touchend', function(e) {
				e.stopPropagation();
				var _x = Math.round(e.changedTouches[0].pageX - touchStartX);
				var _y = Math.round(e.changedTouches[0].pageY - touchStartY);
				var absX = Math.abs(_x);
				var absY = Math.abs(_y);
				if(absX >= absY) {
					if(_x > 0) {
						if(metaDatas.debug) {
							console.log('right');
						}
						return;
					}
					if(metaDatas.debug) {
						console.log('left');
					}
				} else {
					if(_y > 0) {
						if(metaDatas.debug) {
							console.log('down');
						}
						minsDay();
						return;
					}
					if(metaDatas.debug) {
						console.log('up');
					}
					addDay();
				}
			});

			document.getElementById('addYear').addEventListener('tap', function() {
				addYear();
			});
			document.getElementById('minsYear').addEventListener('tap', function() {
				minsYear();
			});
			document.getElementById('addMonth').addEventListener('tap', function() {
				addMonth();
			});
			document.getElementById('minsMonth').addEventListener('tap', function() {
				minsMonth();
			});
			document.getElementById('addDay').addEventListener('tap', function() {
				addDay();
			});
			document.getElementById('minsDay').addEventListener('tap', function() {
				minsDay();
			});

			function checkDate(year, month, day) {
				// 验证数据合法性
				var _year = parseInt(metaDatas.resultDate.year);
				var _month = parseInt(metaDatas.resultDate.month);
				var _day = parseInt(metaDatas.resultDate.day);
				try {
					if(year) {
						var __year = parseInt(year);
						if(__year >= parseInt(metaDatas.minDate.year) && __year <= parseInt(metaDatas.maxDate.year)) {
							_year = __year;
						}
					}
				} catch(e) {}
				try {
					if(month) {
						var __month = parseInt(month);
						if(__month >= parseInt(metaDatas.minDate.month && _month <= parseInt(metaDatas.maxDate.month))) {
							_month = __month;
						}
					}
				} catch(e) {}
				try {
					if(day) {
						var __day = parseInt(day);
						if(__day >= parseInt(metaDatas.minDate.day && __day <= parseInt(metaDatas.maxDate.day))) {
							_day = __day;
						}
					}
				} catch(e) {}

				// 年
				// top 0
				var oYst0Id = document.getElementById("YST0");
				oYst0Id.innerHTML = _year - 1;
				var oYsClasses = document.getElementsByClassName('YS');
				for(var i = 0; i < oYsClasses.length; i++) {
					oYsClasses[i].innerHTML = _year;
				}

				metaDatas.resultDate.year = _year;
				// below 0
				var oDsb0Id = document.getElementById("YSB0");
				oDsb0Id.innerHTML = _year + 1;

				// 月
				var oMst0Id = document.getElementById("MST0");
				oMaClasses[1].style.opacity = _month == 1 ? 0 : 1;
				oMst0Id.style.opacity = _month == 1 ? 0 : 1;
				oMst0Id.innerHTML = _month - 1;
				var oMsClasses = document.getElementsByClassName('MS');
				for(var i = 0; i < oMsClasses.length; i++) {
					oMsClasses[i].innerHTML = _month;
				}
				metaDatas.resultDate.month = _month;
				var oMsb0Id = document.getElementById("MSB0");
				oMaClasses[oMaClasses.length - 1].style.opacity = _month == 12 ? 0 : 1;
				oMsb0Id.style.opacity = _month == 12 ? 0 : 1;
				oMsb0Id.innerHTML = _month + 1;

				// 日
				var oDst0Id = document.getElementById("DST0");
				oDaClasses[1].style.opacity = _day == 1 ? 0 : 1;
				oDst0Id.style.opacity = _day == 1 ? 0 : 1;
				oDst0Id.innerHTML = _day - 1;

				var oDsClasses = document.getElementsByClassName('DS');
				for(var i = 0; i < oDsClasses.length; i++) {
					oDsClasses[i].innerHTML = _day;
				}
				metaDatas.resultDate.day = _day;
				var oDsb0Id = document.getElementById("DSB0");
				oDaClasses[oDaClasses.length - 1].style.opacity = _day == getMaxDayOfMonth(metaDatas.resultDate.year, metaDatas.resultDate.month) ? 0 : 1;
				oDsb0Id.style.opacity = _day == getMaxDayOfMonth(metaDatas.resultDate.year, metaDatas.resultDate.month) ? 0 : 1;
				oDsb0Id.innerHTML = _day + 1;
			}

			function getMaxDayOfMonth(year, month) {
				switch(month) {
					case 1:
					case 3:
					case 5:
					case 7:
					case 8:
					case 10:
					case 12:
						{
							return 31;
						}
						break;
					case 4:
					case 6:
					case 9:
					case 11:
						{
							return 30;
						}
						break;
					default: // 2
						{
							return ((year % 4) == 0) && ((year % 100) != 0) || ((year % 400) == 0) ? 29 : 28;
						}
						break;
				}
			}

			function fixMonth() {
				if(metaDatas.resultDate.year == metaDatas.maxDate.year && metaDatas.resultDate.month > metaDatas.maxDate.month) {
					metaDatas.resultDate.month = metaDatas.maxDate.month;
				} else if(metaDatas.resultDate.year == metaDatas.minDate.year && metaDatas.resultDate.month < metaDatas.minDate.month) {
					metaDatas.resultDate.month = metaDatas.minDate.month;
				}
			}

			function fixDay() {
				var max = getMaxDayOfMonth(metaDatas.resultDate.year, metaDatas.resultDate.month);
				if(metaDatas.resultDate.year == metaDatas.maxDate.year && metaDatas.resultDate.month == metaDatas.maxDate.month && metaDatas.resultDate.day > metaDatas.maxDate.day) {
					metaDatas.resultDate.day = metaDatas.maxDate.day;
				} else if(metaDatas.resultDate.year == metaDatas.minDate.year && metaDatas.resultDate.month == metaDatas.minDate.month && metaDatas.resultDate.day < metaDatas.minDate.day){
					metaDatas.resultDate.day = metaDatas.minDate.day;
				}else if(max < metaDatas.resultDate.day) {
					metaDatas.resultDate.day = max;
				}
			}

			function addYear() {
				if(metaDatas.resultDate.year < metaDatas.maxDate.year) {
					metaDatas.resultDate.year++;
					fixMonth();
					fixDay();
					checkDate();
				}
			}

			function minsYear() {
				if(metaDatas.resultDate.year > metaDatas.minDate.year) {
					metaDatas.resultDate.year--;
					fixMonth();
					fixDay();
					checkDate();
				}
			}

			function addMonth() {
				if(metaDatas.resultDate.year < metaDatas.maxDate.year && metaDatas.resultDate.month < 12 || metaDatas.resultDate.year == metaDatas.maxDate.year && metaDatas.resultDate.month < metaDatas.maxDate.month) {
					metaDatas.resultDate.month++;
					fixDay();
					checkDate();
				}
			}

			function minsMonth() {
				if(metaDatas.resultDate.year > metaDatas.minDate.year && metaDatas.resultDate.month > 1 || metaDatas.resultDate.year == metaDatas.minDate.year && metaDatas.resultDate.month > metaDatas.minDate.month) {
					metaDatas.resultDate.month--;
					fixDay();
					checkDate();
				}
			}

			function addDay() {
				if((metaDatas.resultDate.day >= getMaxDayOfMonth(metaDatas.resultDate.year, metaDatas.resultDate.month)) ||
					(metaDatas.resultDate.year == metaDatas.maxDate.year && metaDatas.resultDate.month == metaDatas.maxDate.month && metaDatas.resultDate.day >= metaDatas.maxDate.day)) {
					return;
				}
				metaDatas.resultDate.day++;
				checkDate();
			}

			function minsDay() {
				if(metaDatas.resultDate.day <= 1 || metaDatas.resultDate.year == metaDatas.minDate.year && metaDatas.resultDate.month == metaDatas.minDate.month && metaDatas.resultDate.day <= metaDatas.minDate.day) {
					return;
				}
				metaDatas.resultDate.day--;
				checkDate();
			}

			// test
			if(metaDatas.debug) {
				var addY = document.getElementById("YMPickerBtnAddY");
				addY.addEventListener('tap', function(e) {
					e.stopPropagation();
					addYear();
				});
				var minuY = document.getElementById("YMPickerBtnMinY");
				minuY.addEventListener('tap', function(e) {
					e.stopPropagation();
					addYear();
				});
				var addM = document.getElementById("YMPickerBtnAddM");
				addM.addEventListener('tap', function(e) {
					e.stopPropagation();
					addMonth();
				});
				var minuM = document.getElementById("YMPickerBtnMinM");
				minuM.addEventListener('tap', function(e) {
					e.stopPropagation();
					minsMonth();
				});
				var addD = document.getElementById("YMPickerBtnAddD");
				addD.addEventListener('tap', function(e) {
					e.stopPropagation();
					addDay();
				});
				var minuD = document.getElementById("YMPickerBtnMinD");
				minuD.addEventListener('tap', function(e) {
					e.stopPropagation();
					minsDay();
				});

				var cls = 'ym-hidden';
				var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
				addY.className = addY.className.replace(reg, ' ');
				minuY.className = minuY.className.replace(reg, ' ');
				addM.className = addM.className.replace(reg, ' ');
				minuM.className = minuM.className.replace(reg, ' ');
				addD.className = addD.className.replace(reg, ' ');
				minuD.className = minuD.className.replace(reg, ' ');
			}

			document.getElementById('YMPicker').addEventListener('tap', function(e) {
				e.stopPropagation();
				params && typeof(params)=="object" ? params.outerCanClick === true && params.outerClick && typeof(params.outerClick) == 'function'? params.outerClick() : base.close() : '' ;
			});
			document.getElementById('YMPickerContent').addEventListener('tap', function(e) {
				e.stopPropagation(); //此处留着的目的,是为了防止点击内容区使dialog消失
			});
			document.getElementById('YMPickerBtnCancle').addEventListener('tap', function(e) {
				e.stopPropagation();
				base.close();
			});
			document.getElementById('YMPickerClose').addEventListener('tap', function(e) {
				e.stopPropagation();
				base.close();
			});
			document.getElementById('YMPickerBtnOK').addEventListener('tap', function(e) {
				e.stopPropagation();
				base.close();
				params && typeof(params)=="function" &&  params(metaDatas.resultDate) || callback && typeof(callback)=="function" &&  callback(metaDatas.resultDate);
			});
		}
	};

	return base;
})();
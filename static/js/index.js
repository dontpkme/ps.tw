var surviveDay = 1;
var dayTime = 1;
var weather = "";
var weatherCount = 0;
var HP = 10;
var adventureTime;
var adventureEnv = "normal";

var lootItem = {};
$(document).ready(function() {
	getNewWeather();
	render();

	var rect = $("#status")[0].getBoundingClientRect();
	$("#status").height($(window).height() - rect.top);

	$("#start-btn").click(function(e) {
		$(".functionTab").hide();
		$("#logTab").show();
		$("#log").empty();
		adventureTime = 10;
		lootItem = {};
		$("#start").prop("disabled", true);
		setTimeout(function() {
			onEncounter();
		}, 1000);
	});

	$("#log-btn").click(function(e) {
		$(".functionTab").hide();
		$("#logTab").show();
	});

	$("#inventory-btn").click(function(e) {
		$(".functionTab").hide();
		$("#inventoryTab").show();
	});

	$("#make-btn").click(function(e) {
		if (!$("#makelist").hasClass("show")) {
			$("#makelist").addClass("show").empty();
			$.each(recipes, function(i, v) {
				var s = '<div class="makeitem"><span class="makeitempic not-enough-making" style="background-image:url(/image/item/' + i + '.gif)" title="' + itemName[i] + '" data-item="' + i + '"></span> = </div><div class="makeformula">';
				var enough = true;
				$.each(recipes[i].resource, function(ii, needAmount) {
					// console.log(ii);
					// console.log(needAmount);
					// console.log(inventory[ii]);
					if (needAmount > inventory[ii])
						enough = false;
					s += '<span class="resource ' + (needAmount <= inventory[ii] ? "enough-resource" : "not-enough-resource") + '" style="background-image:url(/image/item/' + ii + '.gif)" title="' + itemName[ii] + '" data-item="' + ii + '" data-amount="' + needAmount + '"></span> x ' + needAmount;
				});
				s += "</div>";
				if (enough) {
					s = s.replace("not-enough-making", "enough-making");
				}
				$("#makelist").append(s);
			});
			$(".makeitempic").click(function(e) {
				if ($(e.target).hasClass("enough-making")) {
					// console.log($(e.target).attr("data-item"));
					addInventory($(e.target).attr("data-item"), 1);
					$("#makelist").removeClass("show");
					// console.log($(e.target).parents(".makeitem").next().children());
					$.each($(e.target).parents(".makeitem").next().children(), function(i, v) {
						addInventory($(v).attr("data-item"), -$(v).attr("data-amount"));
						// console.log($(v).attr("data-item"));
						// console.log($(v).attr("data-amount"));
					});
					render();
				}
			});
		} else {
			$("#makelist").removeClass("show");
		}
	});

	/*
	$("#nap").click(function(e) {
		log("在營地休息了一個" + dayTimeName[dayTime - 1]);
		dayTimePass();
	});
	*/

	/*
	$("#rest").click(function(e) {
		emptyLog();
		dayTimePass();
	});
	*/

	/*
	$(".collect-btn").click(function(e) {
		switch ($(e.target).attr("id")) {
			case "collect-hunt":
				doHunt();
				break;
			case "collect-fish":
				doFish();
				break;
			case "collect-fruit":
				doFruit();
				break;
			case "collect-water":
				doWater();
				break;
			case "collect-lumber":
				doLumber();
				break;
			case "collect-stone":
				doStone();
				break;
		}
		dayTimePass();
	});
	*/
});

var log = function(str, color, time) {

}

var dialogContent;
var dialogBuffer = [];
var dialog = function(str) {
	dialogBuffer.push(str);
	if (!$(".dialog").hasClass("show")) {
		$(".dialog").addClass("show");
		setTimeout("dialogType()", 500);
		dialogContent = dialogBuffer[0];
	}
}

var dialogType = function() {
	$("#dialog-text").append(dialogContent.substring(0, 1));
	dialogContent = dialogContent.substring(1);
	if (dialogContent.length > 0) {
		setTimeout("dialogType()", 100);
	} else {
		setTimeout("dialogHide()", 500);
		var indexToRemove = 0;
		var numberToRemove = 1;
		dialogBuffer.splice(indexToRemove, numberToRemove);
	}
}

var dialogHide = function() {
	$("#dialog-text").empty();
	if (dialogBuffer.length > 0) {
		setTimeout("dialogType()", 500);
		dialogContent = dialogBuffer[0];
	} else {
		$(".dialog").removeClass("show");
	}
}

var emptyLog = function(str) {
	$("#history").empty();
}

var render = function() {
	ww = $(window).width();
	wh = $(window).height();

	if (ww < wh) {

	} else {

	}

	$("#survive-day").text(surviveDay);
	/*
	switch (dayTime) {
		case 1:
			$("#survive-time").text(dayTimeName[dayTime - 1]);
			$("#day-event").show();
			$("#night-event").hide();
			break;
		case 2:
			$("#survive-time").text(dayTimeName[dayTime - 1]);
			$("#day-event").show();
			$("#night-event").hide();
			break;
		case 3:
			$("#survive-time").text(dayTimeName[dayTime - 1]);
			$("#day-event").hide();
			$("#night-event").show();
			break;
	}
	*/
	switch (weather) {
		case "sunny":
			$("#weather").text("晴朗");
			break;
		case "hot":
			$("#weather").text("炎熱");
			break;
		case "cloudy":
			$("#weather").text("陰天");
			break;
		case "rainy":
			$("#weather").text("雨天");
			break;
		case "cold":
			$("#weather").text("寒冷");
			break;
	}

	var hs = "健康度";
	if (HP > 0) {
		var heartN = Math.floor(HP / 2);
		var halfHeartN = HP % 2;
		for (i = 0; i < heartN; i++) {
			hs += '<span class="heart"></span>';
		}
		if (halfHeartN)
			hs += '<span class="heart half"></span>';
	}
	$("#health-bar").empty().html(hs);

	$("#inventory").empty();
	$.each(inventory, function(i, v) {
		if (i != "hand" && (i == "food" || i == "water" || v > 0)) {
			var html = '<div class="item" title="' +
				itemName[i] +
				'"><div data-pic="' + i + '" class="item-pic' +
				'"></div><span id="amount-' + i + '" class="amount">' +
				inventory[i] +
				'</span></div>';
			$("#inventory").append(html);
		}
	});
	$.each($(".item-pic"), function(i, v) {
		var $v = $(v);
		$v.css("background-image", "url(/image/item/" + ($v.attr("data-pic")) + ".gif)");
	});

	$(".char-action").click(function(e) {
		switch ($(e.target).attr("data-action-type")) {
			case "1":
				$(e.target).text("研發");
				$(e.target).attr("data-action-type", "2");
				break;
			case "2":
				$(e.target).text("休息");
				$(e.target).attr("data-action-type", "3");
				break;
			case "3":
				$(e.target).text("採集");
				$(e.target).attr("data-action-type", "1");
				break;
		}
	});
}

/*
var doFish = function() {
	r = Math.floor(Math.random() * 4);
	log(dayTimeName[dayTime - 1] + "選擇了外出捕魚");

	switch (r) {
		case 0:
			log("在河邊眼睜睜看著魚群跑掉");
			break;
		case 1:
			log("在河邊撿到一些貝類");
			addInventory("food", 1);
			break;
		case 2:
			log("徒手抓到了一隻魚");
			addInventory("food", 2);
			break;
		case 3:
			log("使用網墜順利捕到幾隻大魚");
			addInventory("food", 3);
			break;
	}
}

var doFruit = function() {
	r = Math.floor(Math.random() * 3);
	log(dayTimeName[dayTime - 1] + "選擇了外出採果");

	switch (r) {
		case 0:
			log("在樹叢中摘採了一些新鮮水果");
			addInventory("food", 1);
			addInventory("water", 1);
			break;
		case 1:
			log("在灌木叢中摘採了一些莓果");
			addInventory("food", 1);
			break;
		case 2:
			log("從香蕉樹上摘了整串香蕉");
			addInventory("food", 2);
			break;
	}
}

var doHunt = function() {
	r = Math.floor(Math.random() * 4);
	log(dayTimeName[dayTime - 1] + "選擇了外出狩獵");

	switch (r) {
		case 0:
			log("一時粗心驚動了獵物，讓獵物都逃跑了");
			break;
		case 1:
			log("使用弓箭在湖邊射下了一隻野鴨");
			addInventory("food", 1);
			break;
		case 2:
			log("在附近的草叢中抓到幾隻兔子");
			addInventory("food", 2);
			break;
		case 3:
			log("經過一番搏鬥，抓到一頭野豬");
			addInventory("food", 4);
			break;
	}
}

var doWater = function() {
	r = Math.floor(Math.random() * 2);
	log(dayTimeName[dayTime - 1] + "選擇了外出取水");

	switch (r) {
		case 0:
			log("在森林中採集了早晨凝結的露水");
			addInventory("water", 1);
			break;
		case 1:
			log("在河邊使用陶罐裝了許多河水");
			addInventory("water", 4);
			break;
	}
}

*/

var getDayTimePassMessage = function() {
	if (dayTime == 2) {
		$(".sky-filter").removeClass("morning");
		$(".sky-filter").addClass("noon");
		switch (weather) {
			case "hot":
				return "正午了，烈日快把人烤焦";
			case "cold":
				return "正午了，但陽光的溫度依然不敵寒冷";
			case "rainy":
			case "cloudy":
				return "正午了，但是天空仍然灰濛濛的";
			default:
				return "正午了";
		}
	} else if (dayTime == 3) {
		$(".sky-filter").removeClass("noon");
		$(".sky-filter").addClass("night");
		switch (weather) {
			case "hot":
				return "夜幕低垂，但夜晚的空氣仍然悶熱";
			case "rainy":
				return "夜幕低垂，夜晚的雨聲讓人沮喪"
			case "cloudy":
				return "夜幕低垂，天空一片灰暗";
			case "cold":
				return "夜幕低垂，氣溫急劇降低";
			default:
				return "夜幕低垂，繁星點綴整個夜空";
		}
	} else if (dayTime == 1) {
		$(".sky-filter").addClass("morning");
		$(".sky-filter").removeClass("night");
		switch (weather) {
			case "hot":
				return "天亮了，刺眼的陽光襲來";
			case "rainy":
			case "cloudy":
				return "天亮了，陽光從厚厚的雲層中發出微光";
			case "cold":
				return "天亮了，寒意從晨曦中獲得一些解放";
			default:
				return "天亮了，新的一天開始";
		}
	}
}

var getNewWeather = function() {
	newWeather = "";
	if (weatherCount == 0) {
		r = Math.ceil(Math.random() * 5);
		if (r == 1) {
			newWeather = "sunny";
			if (weather == newWeather) {
				dialog("天氣持續良好穩定");
			} else {
				dialog("天氣趨於穩定");
			}
		} else if (r == 2) {
			newWeather = "hot";
			if (weather == newWeather) {
				dialog("炎熱的天氣依舊");
			} else {
				dialog("天氣變得很熱");
			}
		} else if (r == 3) {
			newWeather = "rainy";
			if (weather == newWeather) {
				dialog("雨勢仍然沒有停止");
			} else {
				dialog("開始下雨了");
			}
		} else if (r == 4) {
			newWeather = "cloudy";
			if (weather == newWeather) {
				dialog("天色依然灰濛濛");
			} else {
				dialog("雲層開始越積越厚");
			}
		} else if (r == 5) {
			newWeather = "cold";
			if (weather == newWeather) {
				dialog("寒冷的空氣依舊");
			} else {
				dialog("氣溫下降了");
			}
		}
		weather = newWeather;
		weatherCount = Math.ceil(Math.random() * 9);
	} else {
		weatherCount--;
	}
}

var onMidDayEvent = function() {
	r = Math.floor(Math.random() * 4);

	switch (r) {
		case 0:
			dialog("回到家裡，稍作休息");
			break;
		case 1:
			dialog("回到家裡，發現好像有動物來過的痕跡");
			break;
		case 2:
			dialog("回到家裡，發現食物散亂一地，數量少了一些");
			addInventory("food", -(Math.ceil(Math.random() * 2)));
			break;
		case 3:
			dialog("回到家裡，發現一隻獼猴正在偷吃存糧");
			addInventory("food", -1);
			break;
	}
}

var onNightEvent = function() {
	r = Math.floor(Math.random() * 4);

	switch (r) {
		case 0:
			dialog("回到家裡，稍作休息");
			break;
		case 1:
			dialog("回到家裡，發現好像有動物來過的痕跡");
			break;
		case 2:
			dialog("回到家裡，發現食物散亂一地，數量少了一些");
			addInventory("food", -(Math.ceil(Math.random() * 2)));
			break;
		case 3:
			dialog("回到家裡，發現一隻獼猴正在偷吃存糧");
			addInventory("food", -1);
			break;
	}
}

var onMorningEvent = function() {
	r = Math.floor(Math.random() * 2);

	switch (r) {
		case 0:
			dialog("一覺醒來");
			break;
		case 1:
			dialog("一覺醒來，昨晚的水氣凝結不少露水，順利收集起來");
			addInventory("water", 1);
			break;
	}
}

var onMidNightEvent = function() {
	r = Math.floor(Math.random() * 2);

	switch (r) {
		case 0:
			dialog("夜晚十分寧靜");
			break;
		case 1:
			dialog("黑夜中總覺得附近有窸窣的聲響");
			break;
	}
}

var actions;

var onEncounter = function() {
	char = getChar();
	adventureTime--;

	// get adventure environment
	// TODO: get different environment by different chance
	var r = Math.floor(Math.random() * 100);
	if (r > 20) {
		adventureEnv = "normal";
	} else if (r > 10 && r <= 20) {
		adventureEnv = "wood";
	} else {
		adventureEnv = "stone";
	}

	// get encounter event
	var ev;
	$.each(encounters, function(i, v) {
		if (adventureEnv == i) {
			ev = encounters[i][Math.floor(Math.random() * encounters[i].length)];
		}
	});
	if (typeof(ev.desc) == "function") {
		var msg = (ev.desc()).replace(new RegExp("\\$N", 'g'), char.name);
	} else {
		var msg = (ev.desc).replace(new RegExp("\\$N", 'g'), char.name);
	}
	$("#log").append('<div class="' + adventureEnv + 'Env">' + (16 - adventureTime) + ':00 ' + msg + "</div>");

	// show actions
	if (ev.action !== undefined) {
		actions = ev.action;
		$("#log").append('<div class="actionChoose">要採取什麼行動嗎？</div>');
		$("#log").append('<div class="adventure-action-btn" action-id="-1">直接離開</div>');
		$.each(actions, function(i, v) {
			var hasItem = inventory[v.item] > 0;
			var hasTime = !v.cost || adventureTime >= v.cost;
			if (hasItem && hasTime) {
				$("#log").append('<div class="adventure-action-btn" action-id="' + i + '">使用' + itemName[v.item] + '(' + (v.cost) + 'hr)</div>');
			} else {
				$("#log").append('<div class="disabled-adventure-action-btn" action-id="' + i + '">使用' + itemName[v.item] + '(' + (v.cost) + 'hr)</div>');
			}
		});
		$(".adventure-action-btn").click(function(e) {
			var $target = $(e.target);
			if (!$target.hasClass("disabled")) {
				chooseAction($(e.target).attr("action-id"));
			}
		});
		isChoosingAction = true;
	}

	// get loot
	if (ev.loot != undefined) {
		getLoot(ev.loot);
	}

	endEncounder();
}

var endEncounder = function() {
	$("#status").scrollTop(1000);
	if (actions == undefined) {
		if (adventureTime > 0) {
			setTimeout(function() {
				onEncounter();
			}, 1000);
		} else {
			countAdventureResult();
			$("#start").prop("disabled", false);
		}
	}
}

var chooseAction = function(actionId) {
	if (actionId == "-1") {
		$("#log").append('<div>離開了</div>');
	} else {
		var char = getChar();
		var msg = (actions[actionId].desc).replace(new RegExp("\\$N", 'g'), char.name);
		adventureTime -= actions[actionId].cost;
		$("#log").append('<div class="' + adventureEnv + 'Env">' + (16 - adventureTime) + ':00 ' + msg + '</div>');
		getLoot(actions[actionId].loot);
	}

	actions = undefined;
	$(".adventure-action-btn").addClass("disabled");
	endEncounder();
}

var getLoot = function(loot) {
	if (loot != undefined) {
		$.each(loot, function(i, v) {
			var amount = v.min + Math.floor(Math.random() * (v.max - v.min + 1));
			if (lootItem[v.type] == undefined) {
				lootItem[v.type] = amount;
			} else {
				lootItem[v.type] += amount;
			}
			$("#log").append('<div class="' + adventureEnv + 'Env">獲得' + itemName[v.type] + 'x' + amount + "</div>");
			addInventory(v.type, amount);
		});
	}
}

var sizeOfObject = function(obj) {
	var size = 0,
		key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
}

var countAdventureResult = function() {
	if (sizeOfObject(lootItem) == 0) {
		$("#log").append("<div>今日的採集結束，沒有獲得任何資源</div>");
	} else {
		var lootmsg = "";
		$.each(lootItem, function(i, v) {
			lootmsg += itemName[i] + "x" + v;
		});
		$("#log").append("<div>今日的採集結束，獲得" + lootmsg + "</div>");
	}
	render();
	setTimeout(function() {
		$("#inventory-btn").click();
	}, 3000);
	$("#status").scrollTop(1000);
}

var getChar = function() {
	return {
		name: "巴魯"
	}
}

/*var dayTimePass = function() {
	if (dayTime == 3) {
		onMidNightEvent();
	}

	getNewWeather();
	dayTime++;

	if (dayTime == 2) {
		onMidDayEvent();
		log("午餐時間");
		doEat();
	} else if (dayTime == 3) {
		log("晚餐時間");
		doEat();
		onNightEvent();
	} else if (dayTime > 3) {
		surviveDay++;
		dayTime = 1;
		onMorningEvent();
	}

	log(getDayTimePassMessage());

	render();
}*/

var setInventory = function(type, amount) {
	inventory[type] = amount;
}

var addInventory = function(type, amount) {
	inventory[type] += amount;
	if (inventory[type] < 0)
		inventory[type] = 0;

	if (amount == 0)
		return;
	else if (amount > 0)
		dialog(itemName[type] + " +" + amount);
	else
		dialog(itemName[type] + " " + amount);
}

var getInventoryAmount = function(type) {
	return inventory[type];
}

var doEat = function() {
	if (getInventoryAmount("food") >= 1) {
		addInventory("food", -1);
	} else {
		setInventory("food", 0);
		dialog("食物不夠，健康度下降了");
		HP -= 1;
	}
	if (weather == "hot") {
		dialog("炎熱的天氣必須補充更多水份");
		if (getInventoryAmount("water") >= 2) {
			addInventory("water", -2);
		} else {
			setInventory("water", 0);
			dialog("飲水不夠，健康度下降了");
			HP -= 1;
		}
	} else if (weather == "cloudy" || weather == "rainy") {
		rw = Math.floor(Math.random() * 2);
		if (getInventoryAmount("water") >= rw) {
			addInventory("water", -rw);
		} else {
			setInventory("water", 0);
			dialog("飲水不夠，健康度下降了");
			HP -= 1;
		}
	} else {
		if (getInventoryAmount("water") >= 1) {
			addInventory("water", -1);
		} else {
			setInventory("water", 0);
			dialog("飲水不夠，健康度下降了");
			HP -= 1;
		}
	}
}

$(window).resize(function() {
	render();
});
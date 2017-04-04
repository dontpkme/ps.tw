var dayTimeName = ["上午", "下午", "夜晚"];

var itemName = {
	food: "食物",
	water: "飲水",
	wood: "木材",
	branch: "樹枝",
	stone: "石材",
	clay: "黏土",
};

var inventory = {};

$.each(itemName, function(i, v) {
	inventory[i] = 0;
});

inventory.food = 5;
inventory.water = 5;
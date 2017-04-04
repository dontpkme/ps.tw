var dayTimeName = ["上午", "下午", "夜晚"];

var itemName = {
	//necessity
	food: "食物",
	water: "飲水",

	//resource
	wood: "木材",
	branch: "樹枝",
	stone: "石材",
	clay: "黏土",
	grass: "草",
	vine: "樹藤",

	//technoligy
	campfire: "火堆",
	flint: "燧石",
};

var inventory = {};

$.each(itemName, function(i, v) {
	inventory[i] = 0;
});

inventory.food = 5;
inventory.water = 5;
var dayTimeName = ["上午", "下午", "夜晚"];

var itemName = {
	hand: "雙手",

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
	feather: "羽毛",
	bone: "獸骨",
	shell: "貝殼",

	//technoligy
	campfire: "火堆",
	flint: "燧石",
	stoneknife: "石刀",
	stoneaxe: "石斧",
};

var inventory = {};

$.each(itemName, function(i, v) {
	inventory[i] = 0;
});

inventory.hand = 1;
inventory.food = 5;
inventory.water = 5;
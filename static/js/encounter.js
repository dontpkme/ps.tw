var dumpMsg = function() {
	var where = [
		"草地上", "山坡旁", "河邊", "岩石旁", "泥土地上", "榕樹下", "灌木叢中", "樹林中", "小溪旁",
		"山谷中", "花叢裡", "懸崖邊", "岩石上"
	];
	var what = [
		"觀察蚯蚓", "被自己絆倒", "被石頭絆倒", "被樹根絆倒", "眼睛吹進了砂子", "聞到花香味", "哼出一首歌",
		"被自己的影子嚇到", "感受到一股微風", "冥想", "坐下休息", "鼻子沾到蜘蛛網", "打瞌睡", "對著天空發呆",
		"聽見五色鳥叫聲", "凝視著天空", "聞到一股臭味", "放了一個大響屁", "打嗝", "趕蒼蠅", "打噴嚏", "打哈欠",
		"伸了一個舒服的懶腰", "吶喊", "練習鬥雞眼", "躲避蜜蜂", "觀察地上的螞蟻", "挖鼻孔", "感到莫名的開心",
		"沈默不語", "東張西望", "掏耳朵", "揉了揉眼睛", "伸手抓背", "拍手", "陷入沈思", "踩到大便", "整理頭髮",
		"小便", "聆聽蟲鳴", "被蜘蛛嚇了一跳", "迷路了"
	];
	return "$N在" + where[Math.floor(Math.random() * where.length)] + what[Math.floor(Math.random() * what.length)];
}

var encounters = {
	normal: [{
		desc: dumpMsg
	}],
	wood: [{
		desc: "$N在樹林中隨手撿起一些乾掉的草",
		cost: 0,
		loot: [{
			type: "grass",
			min: 1,
			max: 4
		}]
	}, {
		desc: "$N在樹林中發現了枯萎的灌木",
		action: [{
			item: "hand",
			cost: 1,
			desc: "$N徒手折下一些樹枝",
			loot: [{
				type: "branch",
				min: 3,
				max: 6
			}]
		}, {
			item: "stoneknife",
			cost: 1,
			desc: "$N拿出石刀用力砍下這棵灌木",
			loot: [{
				type: "branch",
				min: 5,
				max: 10
			}, {
				type: "wood",
				min: 1,
				max: 1
			}]
		}, {
			item: "stoneaxe",
			cost: 1,
			desc: "$N拿出石斧用力砍下這棵灌木",
			loot: [{
				type: "branch",
				min: 5,
				max: 10
			}, {
				type: "wood",
				min: 1,
				max: 1
			}]
		}]
	}, {
		desc: "$N在途中經過一株結實的梧桐樹",
		action: [{
			item: "hand",
			cost: 1,
			desc: "$N折下一些低矮的樹枝",
			loot: [{
				type: "branch",
				min: 1,
				max: 2
			}]
		}, {
			item: "stoneknife",
			cost: 2,
			desc: "$N拿出石刀慢慢砍下這棵樹",
			loot: [{
				type: "branch",
				min: 1,
				max: 3
			}, {
				type: "wood",
				min: 3,
				max: 6
			}]
		}, {
			item: "stoneaxe",
			cost: 1,
			desc: "$N拿出石斧用力砍下這棵樹",
			loot: [{
				type: "branch",
				min: 1,
				max: 3
			}, {
				type: "wood",
				min: 3,
				max: 6
			}]
		}]
	}],
	stone: [{
		desc: "$N在河邊搜集一些石頭",
		cost: 0,
		loot: [{
			type: "stone",
			min: 1,
			max: 3
		}]
	}]
};
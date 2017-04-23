var dumpMsg = function() {
	var where = ["草地上", "山坡旁", "河邊", "岩石旁", "泥土地上", "榕樹下", "灌木叢中"];
	var what = [
		"觀察蚯蚓", "被自己絆倒", "被石頭絆倒", "被樹根絆倒", "眼睛吹進了風沙", "聞到花香味", "哼了一首歌",
		"被自己的影子嚇到", "感受到一股微風", "冥想", "休息", "鼻子沾到蜘蛛網", "打瞌睡", "對著天空發呆", "偷懶",
		"聽見五色鳥叫聲"
	]
	return "$N在" + where[Math.floor(Math.random() * where.length)] + what[Math.floor(Math.random() * what.length)];
}

var encounters = {
	normal: [{
		desc: dumpMsg
	}],
	wood: [{
		desc: "$N在樹林中撿起一些乾掉的草",
		loot: [{
			type: "grass",
			min: 1,
			max: 4
		}]
	}, {
		desc: "$N在樹林中發現了枯萎的灌木",
		action: [{
			item: "hand",
			desc: "$N徒手折下一些樹枝",
			loot: [{
				type: "branch",
				min: 3,
				max: 6
			}]
		}, {
			item: "stoneaxe",
			desc: "$N拿出石斧用力砍下這棵灌木",
			loot: [{
				type: "branch",
				min: 5,
				max: 10
			}]
		}]
	}, {
		desc: "$N在途中經過一株結實的梧桐樹",
		action: [{
			item: "hand",
			desc: "$N折下一些低矮的樹枝",
			loot: [{
				type: "branch",
				min: 1,
				max: 2
			}]
		}, {
			item: "stoneaxe",
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
	}]
};
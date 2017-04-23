var encounters = [{
	wood: [{
		desc: "$N發現了枯萎的灌木",
		action: [{
			item: "hand",
			desc: "$N徒手折下一些樹枝",
			loot: [{
				type: "branch",
				min: 3,
				max: 6
			}]
		}]
	}, {
		desc: "$N經過一株結實的樹",
		action: [{
			item: "hand",
			desc: "$N徒手折下一些樹枝",
			loot: [{
				type: "branch",
				min: 1,
				max: 2
			}]
		}, {
			item: "stoneaxe",
			desc: "$N拿出石斧用力砍倒了這棵樹",
			loot: [{
				type: "wood",
				min: 3,
				max: 6
			}]
		}]
	}]
}];
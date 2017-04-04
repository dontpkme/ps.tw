var recipes = {
	campfire: {
		resource: {
			wood: 3,
			branch: 4
		}
	},
	stoneknife: {
		resource: {
			stone: 2,
		}
	}
	stoneaxe: {
		resource: {
			stone: 1,
			wood: 1,
		},
		based: [
			"stoneknife"
		]
	}
};
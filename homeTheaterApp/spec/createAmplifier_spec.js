TEST_AMPLIFIERS = [
	{
		component : "amplifier", brand : "bose", cost : 300,
		performance : 10, reliability : 0.8, power_handling : 100,
		inputs : [
			{ type : "ac power", quantity : 1 },
			{ type : "audio-l", quantity : 1 },
			{ type : "audio-r", quantity : 1}
		],
		outputs : [{ type : "speaker-l", quantity : 1 },
			{ type : "speaker-r", quantity : 1 }
		]
	},
	{ component : "amplifier", brand : "polk", cost : 350,
	  performance : 8, reliability : 0.9, power_handling : 175,
		inputs : [
			{ type : "ac power", quantity : 1 },
			{ type : "audio-l", quantity : 1 },
			{ type : "audio-r", quantity : 1 }
		],
		outputs : [{ type : "speaker-l", quantity : 1 },
			{ type : "speaker-r", quantity : 1 }
		]
	},
	{
		component: "amplifier", brand : "klipsch", cost : 370,
		performance : 5, reliability : 0.7, power_handling : 70,
		inputs : [
			{ type : "ac power", quantity : 1 },
			{ type : "audio-l", quantity : 1 },
			{ type : "audio-r", quantity : 1 }
		],
		outputs : [
			{ type : "speaker-l", quantity : 1 },
			{ type : "speaker-r", quantity : 1 }
		]
	}
];
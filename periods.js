window.STREET_PERIODS = {
  "morning": {
    "label": "晨起",
    "name": "从巷子，到江心",
    "image": "assets/scenes/route-morning.png",
    "time": "06:40—08:10 / 过早 · 赶集 · 过江",
    "headline": "过早以后，去过江。",
    "subtitle": "从过早铺到江上，替陈姨留一篮明早的菜。",
    "note": "从巷子走到码头，江在这幅画里流动。",
    "scenes": [
      {
        "id": "breakfast",
        "name": "过早铺",
        "en": "BEFORE THE DAY",
        "time": "06:40 / 先过早，再出门",
        "light": "morning",
        "x": 0.09,
        "y": 0.8,
        "focus": [
          0.54,
          0.56
        ],
        "image": "assets/scenes/breakfast-pot-closed.png",
        "title": "吴姐先问口味，<br>再下这一碗。",
        "intro": "先选口味，看吴姐做一碗面。吃好后去菜场，替陈姨留菜。",
        "actions": [
          {
            "id": "door",
            "name": "推开店门",
            "x": 0.455,
            "y": 0.57,
            "w": 0.126,
            "h": 0.5,
            "type": "door"
          },
          {
            "id": "noodles",
            "name": "看看热干面",
            "x": 0.675,
            "y": 0.635,
            "w": 0.1,
            "h": 0.12,
            "type": "food",
            "food": 6
          },
          {
            "id": "menwo",
            "name": "看看面窝",
            "x": 0.75,
            "y": 0.63,
            "w": 0.09,
            "h": 0.1,
            "type": "food",
            "food": 7
          },
          {
            "id": "doupi",
            "name": "看看豆皮",
            "x": 0.86,
            "y": 0.64,
            "w": 0.1,
            "h": 0.12,
            "type": "food",
            "food": 8
          },
          {
            "id": "menu",
            "name": "翻翻早点单",
            "x": 0.563,
            "y": 0.434,
            "w": 0.055,
            "h": 0.17,
            "type": "menu"
          },
          {
            "id": "pot",
            "name": "听听锅里的水",
            "x": 0.586,
            "y": 0.605,
            "w": 0.09,
            "h": 0.16,
            "type": "pot"
          },
          {
            "id": "cook",
            "name": "看一碗面做好",
            "x": 0.677,
            "y": 0.535,
            "w": 0.09,
            "h": 0.12,
            "type": "cook"
          },
          {
            "id": "wu",
            "name": "跟吴姐说口味",
            "type": "person",
            "x": 0.705,
            "y": 0.455,
            "w": 0.14,
            "h": 0.23,
            "person": "wu"
          },
          {
            "id": "trace-menu-edit",
            "name": "看看改过的早点单",
            "type": "trace",
            "x": 0.563,
            "y": 0.41,
            "w": 0.08,
            "h": 0.13,
            "trace": "menu-edit",
            "noteWidth": 0.08
          },
          {
            "id": "trace-flavor-note",
            "name": "灶边的口味便条",
            "type": "trace",
            "x": 0.79,
            "y": 0.48,
            "w": 0.1,
            "h": 0.13,
            "trace": "flavor-note",
            "noteWidth": 0.1
          }
        ]
      },
      {
        "id": "market",
        "name": "早市菜摊",
        "en": "THE MORNING MARKET",
        "time": "06:55 / 菜篮里的新鲜",
        "light": "morning",
        "x": 0.25,
        "y": 0.79,
        "focus": [
          0.6,
          0.57
        ],
        "image": "assets/scenes/market-day.png",
        "title": "挑哪两样，<br>你来定。",
        "intro": "陈姨想留明早的菜，也不拦你只挑自己的一篮。",
        "actions": [
          {
            "id": "market-basket",
            "name": "提起菜篮，挑一篮菜",
            "type": "journey",
            "flow": "market",
            "x": 0.53,
            "y": 0.69,
            "w": 0.55,
            "h": 0.3
          },
          {
            "id": "old-scale",
            "name": "看看这杆旧秤",
            "x": 0.725,
            "y": 0.42,
            "w": 0.16,
            "h": 0.32,
            "type": "focus-note",
            "text": "铁钩磨亮了，秤杆上的刻度还清楚。",
            "zoom": 1.14
          },
          {
            "id": "trace-reserve-tag",
            "name": "看看熟客预留牌",
            "type": "trace",
            "x": 0.58,
            "y": 0.42,
            "w": 0.1,
            "h": 0.13,
            "trace": "reserve-tag",
            "noteWidth": 0.1
          }
        ]
      },
      {
        "id": "newsstand",
        "name": "街角报摊",
        "en": "A PAPER MORNING",
        "time": "07:10 / 油墨还新着",
        "light": "morning",
        "x": 0.4,
        "y": 0.78,
        "focus": [
          0.59,
          0.57
        ],
        "image": "assets/scenes/newsstand-day.png",
        "title": "一张新报，<br>夹着半日闲。",
        "intro": "这张原创街坊小报里，夹着今晚的电影预告和一则招领。",
        "actions": [
          {
            "id": "paper-unfold",
            "name": "展开今日早报",
            "type": "journey",
            "flow": "paper",
            "x": 0.5,
            "y": 0.68,
            "w": 0.4,
            "h": 0.22
          },
          {
            "id": "paper-radio",
            "name": "拨一下老收音机",
            "x": 0.874,
            "y": 0.41,
            "w": 0.13,
            "h": 0.14,
            "type": "paper-radio"
          },
          {
            "id": "trace-movie-notice",
            "name": "院坝电影预告",
            "type": "trace",
            "x": 0.39,
            "y": 0.45,
            "w": 0.1,
            "h": 0.13,
            "trace": "movie-notice",
            "noteWidth": 0.1
          }
        ]
      },
      {
        "id": "exercise",
        "name": "江滩晨练",
        "en": "BREATHE BY THE RIVER",
        "time": "07:25 / 风从江面来",
        "image": "assets/scenes/river-exercise.png",
        "title": "江边的早晨，<br>不止一阵风。",
        "intro": "扶着扇柄慢慢摇，让这一阵风吹过江滩。",
        "x": 0.55,
        "y": 0.78,
        "focus": [
          0.48,
          0.55
        ],
        "actions": [
          {
            "id": "river-fan",
            "name": "借一把蒲扇，摇来江风",
            "type": "journey",
            "flow": "fan",
            "x": 0.36,
            "y": 0.72,
            "w": 0.25,
            "h": 0.3
          },
          {
            "id": "river-thermos",
            "name": "借一口热茶",
            "type": "focus-note",
            "x": 0.33,
            "y": 0.82,
            "w": 0.15,
            "h": 0.14,
            "text": "杯盖当小杯，江风里喝一口，刚刚好。",
            "zoom": 1.15
          }
        ]
      },
      {
        "id": "pier",
        "name": "轮渡码头",
        "en": "ONE TICKET, TWO BANKS",
        "time": "07:40 / 一张票，两岸日常",
        "image": "assets/scenes/ferry-pier.png",
        "title": "票夹在指间，<br>江就在门外。",
        "intro": "拿一张纸票，划过验票口。沿着跳板，去江上坐一会儿。",
        "x": 0.72,
        "y": 0.75,
        "focus": [
          0.54,
          0.56
        ],
        "actions": [
          {
            "id": "ferry-ticket",
            "name": "取票、验票、登船",
            "type": "journey",
            "flow": "ticket",
            "x": 0.29,
            "y": 0.66,
            "w": 0.25,
            "h": 0.3
          },
          {
            "id": "pier-rope",
            "name": "看看缆绳和旧船漆",
            "type": "illustration",
            "x": 0.74,
            "y": 0.77,
            "w": 0.18,
            "h": 0.2,
            "title": "一根缆绳，系着两岸。",
            "line": "船在水里轻轻靠着。",
            "text": "骑车上班的人从跳板走过，买菜的篮子靠在脚边。这班船承载的是普通的一天。",
            "cropWidth": 0.32
          }
        ]
      },
      {
        "id": "ferry",
        "name": "江上轮渡",
        "en": "THE RIVER IS THE JOURNEY",
        "time": "08:00 / 从这一岸，到那一岸",
        "image": "assets/scenes/ferry-river.png",
        "title": "这一次，<br>真的到江上。",
        "intro": "登上甲板，岸线慢慢退后。左右拖动看江，整班船不催你。",
        "x": 0.89,
        "y": 0.64,
        "focus": [
          0.5,
          0.51
        ],
        "actions": [
          {
            "id": "river-crossing",
            "name": "登上甲板，随船过江",
            "type": "journey",
            "flow": "ferry",
            "x": 0.55,
            "y": 0.62,
            "w": 0.5,
            "h": 0.4
          }
        ]
      }
    ],
    "extras": []
  },
  "night": {
    "label": "入夜",
    "name": "从院子，到江滩",
    "image": "assets/scenes/route-night.png",
    "time": "18:10—22:15 / 傍晚备料 · 院坝开映 · 江边坐坐",
    "headline": "夜色不止一条街。",
    "subtitle": "到汤铺交菜，找陈姨取篮，最后去江边收竿。",
    "note": "放一场电影，听一段晚风，坐到水边去。",
    "scenes": [
      {
        "id": "cinema",
        "name": "露天电影",
        "en": "A COURTYARD CINEMA",
        "time": "20:00 / 电影还没开场",
        "image": "assets/scenes/courtyard-cinema.png",
        "title": "把白幕拉开，<br>院子就坐满了。",
        "intro": "沿着拉绳展开白幕，再转动手轮。放映的是这条街自己的片段。",
        "x": 0.08,
        "y": 0.76,
        "focus": [
          0.5,
          0.55
        ],
        "actions": [
          {
            "id": "courtyard-movie",
            "name": "拉开白幕，放一场电影",
            "type": "journey",
            "flow": "cinema",
            "x": 0.47,
            "y": 0.45,
            "w": 0.45,
            "h": 0.43
          },
          {
            "id": "movie-seat",
            "name": "在后排坐一坐",
            "type": "focus-note",
            "x": 0.27,
            "y": 0.83,
            "w": 0.22,
            "h": 0.2,
            "zoom": 1.1,
            "text": "凳子是各家搬来的。往旁边挪一点，后排也看得见。"
          }
        ]
      },
      {
        "id": "soup",
        "name": "巷口煨汤",
        "en": "A POT OF WARMTH",
        "time": "18:10 / 今晚的汤，明早的料",
        "x": 0.24,
        "y": 0.79,
        "focus": [
          0.59,
          0.57
        ],
        "image": "assets/scenes/soup-night.png",
        "title": "今晚这一锅，<br>中午就煨上了。",
        "intro": "周姐先收明早的菜，再给晚归的客人舀汤。",
        "actions": [
          {
            "id": "soup-pot",
            "name": "听听砂锅的热气",
            "x": 0.52,
            "y": 0.66,
            "w": 0.25,
            "h": 0.2,
            "type": "pot",
            "text": "盖沿冒一线热气，小火把这锅汤慢慢煨着。"
          },
          {
            "id": "soup-bowl",
            "name": "看看这碗煨汤",
            "x": 0.825,
            "y": 0.71,
            "w": 0.18,
            "h": 0.17,
            "type": "illustration",
            "title": "一碗汤，先暖了手。",
            "line": "莲藕煨得松软，汤面漂一点葱。",
            "text": "锅盖靠在炉边，搪瓷碗磕掉一点漆。没有催促，刚散场的街坊坐下，慢慢把这一碗喝完。",
            "cropWidth": 0.27
          },
          {
            "id": "soup-warm",
            "name": "靠近小炉暖暖手",
            "x": 0.55,
            "y": 0.8,
            "w": 0.18,
            "h": 0.16,
            "type": "soup-warm"
          },
          {
            "id": "basket-delivery",
            "name": "跟周姐核对备料篮",
            "type": "delivery",
            "x": 0.74,
            "y": 0.83,
            "w": 0.18,
            "h": 0.2
          }
        ]
      },
      {
        "id": "barbecue",
        "name": "老街烧烤",
        "en": "CHARCOAL AFTER DARK",
        "time": "21:23 / 炭火正暖",
        "x": 0.39,
        "y": 0.79,
        "focus": [
          0.64,
          0.56
        ],
        "image": "assets/scenes/barbecue-night.png",
        "title": "炭火慢慢红，<br>夜才刚热闹。",
        "intro": "旧铁炉、搪瓷盘，几串烟火就能坐一晚。",
        "actions": [
          {
            "id": "charcoal",
            "name": "靠近炭火",
            "x": 0.53,
            "y": 0.66,
            "w": 0.28,
            "h": 0.19,
            "type": "charcoal"
          },
          {
            "id": "skewers",
            "name": "看看刚烤的串",
            "x": 0.837,
            "y": 0.738,
            "w": 0.2,
            "h": 0.13,
            "type": "skewers"
          },
          {
            "id": "bbq-fan",
            "name": "扇一阵炉边风",
            "x": 0.912,
            "y": 0.367,
            "w": 0.09,
            "h": 0.21,
            "type": "bbq-fan"
          },
          {
            "id": "bbq-light",
            "name": "留住这盏暖灯",
            "x": 0.834,
            "y": 0.233,
            "w": 0.08,
            "h": 0.14,
            "type": "bbq-light"
          }
        ]
      },
      {
        "id": "grocery",
        "name": "杂货铺",
        "en": "LITTLE EVERYDAY THINGS",
        "time": "21:28",
        "x": 0.54,
        "y": 0.79,
        "focus": [
          0.57,
          0.55
        ],
        "image": "assets/scenes/grocery.png",
        "title": "杯子不算押瓶，<br>本子里另有一页。",
        "intro": "陈姨的瓶子、李伯欠的一只，还有吴姐被认错的杯。",
        "actions": [
          {
            "id": "soda",
            "name": "握住汽水，慢慢斟一杯",
            "x": 0.455,
            "y": 0.64,
            "w": 0.09,
            "h": 0.25,
            "type": "journey",
            "flow": "soda"
          },
          {
            "id": "fan",
            "name": "摇一摇蒲扇",
            "x": 0.52,
            "y": 0.65,
            "w": 0.14,
            "h": 0.2,
            "type": "fan"
          },
          {
            "id": "torch",
            "name": "试试旧手电",
            "x": 0.8,
            "y": 0.68,
            "w": 0.14,
            "h": 0.13,
            "type": "torch"
          }
        ]
      },
      {
        "id": "neighbors",
        "name": "街坊纳凉",
        "en": "PULL UP A STOOL",
        "time": "21:32",
        "x": 0.69,
        "y": 0.79,
        "focus": [
          0.5,
          0.57
        ],
        "image": "assets/scenes/neighbors.png",
        "title": "陈姨认篮子，<br>李伯认刻度。",
        "intro": "一张修过的凳子，两个人谁也不肯先夸谁。",
        "actions": [
          {
            "id": "aunt",
            "name": "听陈姨说今天的事",
            "x": 0.3,
            "y": 0.52,
            "w": 0.17,
            "h": 0.29,
            "type": "person",
            "person": "chen"
          },
          {
            "id": "uncle",
            "name": "听李伯说收音机",
            "x": 0.67,
            "y": 0.49,
            "w": 0.18,
            "h": 0.3,
            "type": "person",
            "person": "li"
          },
          {
            "id": "radio",
            "name": "转动旋钮，找一段晚风",
            "x": 0.49,
            "y": 0.575,
            "w": 0.15,
            "h": 0.13,
            "type": "journey",
            "flow": "radio"
          },
          {
            "id": "stool",
            "name": "坐这个空位",
            "x": 0.43,
            "y": 0.83,
            "w": 0.16,
            "h": 0.17,
            "type": "stool"
          }
        ]
      },
      {
        "id": "fishing",
        "name": "江滩夜钓",
        "en": "WAITING IS A WAY OF STAYING",
        "time": "22:15 / 等风，也等浮漂",
        "image": "assets/scenes/night-fishing-clean.png",
        "title": "灯影落在水里，<br>把这一晚留长一点。",
        "intro": "牵一下鱼线，把浮漂送到水面。没有倒计时，不急着等结果。",
        "x": 0.89,
        "y": 0.66,
        "focus": [
          0.52,
          0.55
        ],
        "actions": [
          {
            "id": "cast-line",
            "name": "握住鱼线，坐到江边",
            "type": "journey",
            "flow": "fishing",
            "x": 0.66,
            "y": 0.67,
            "w": 0.32,
            "h": 0.35
          },
          {
            "id": "river-tea",
            "name": "听听岸上的人",
            "type": "focus-note",
            "x": 0.23,
            "y": 0.74,
            "w": 0.24,
            "h": 0.29,
            "zoom": 1.12,
            "text": "“不一定钓得到。坐这儿，看看水，也蛮好。”"
          }
        ]
      }
    ],
    "extras": []
  }
};

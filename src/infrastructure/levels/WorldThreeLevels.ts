import { Puzzle } from '../../domain/entities/Puzzle';
import { Vector2D } from '../../domain/value-objects/Vector2D';

export const WORLD_THREE_LEVELS: Puzzle[] = [
    {
        "id": "waterfall_l1",
        "worldId": "waterfall",
        "levelNumber": 1,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 4,
                "row": 3
            },
            "direction": new Vector2D(-1, 0),
            "color": "RED",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 3,
                    "row": 3
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "RED",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 3,
                    "row": 5
                }
            }
        ]
    },
    {
        "id": "waterfall_l2",
        "worldId": "waterfall",
        "levelNumber": 2,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 0,
                "row": 6
            },
            "direction": new Vector2D(0, -1),
            "color": "WHITE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 0,
                    "row": 4
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "WHITE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 1,
                    "row": 5
                }
            }
        ]
    },
    {
        "id": "waterfall_l3",
        "worldId": "waterfall",
        "levelNumber": 3,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 2,
                "row": 2
            },
            "direction": new Vector2D(0, -1),
            "color": "WHITE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 2,
                    "row": 0
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "WHITE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 0,
                    "row": 1
                }
            }
        ]
    },
    {
        "id": "waterfall_l4",
        "worldId": "waterfall",
        "levelNumber": 4,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 6,
                "row": 0
            },
            "direction": new Vector2D(0, 1),
            "color": "WHITE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 135,
                "position": {
                    "col": 6,
                    "row": 6
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "WHITE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 1,
                    "row": 6
                }
            }
        ]
    },
    {
        "id": "waterfall_l5",
        "worldId": "waterfall",
        "levelNumber": 5,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 3,
                "row": 0
            },
            "direction": new Vector2D(1, 0),
            "color": "BLUE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 4,
                    "row": 0
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "BLUE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 5,
                    "row": 4
                }
            }
        ]
    },
    {
        "id": "waterfall_l6",
        "worldId": "waterfall",
        "levelNumber": 6,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 2,
                "row": 6
            },
            "direction": new Vector2D(0, 1),
            "color": "YELLOW",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 2,
                    "row": 7
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "YELLOW",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 5,
                    "row": 7
                }
            }
        ]
    },
    {
        "id": "waterfall_l7",
        "worldId": "waterfall",
        "levelNumber": 7,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 2,
                "row": 1
            },
            "direction": new Vector2D(1, 0),
            "color": "WHITE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 45,
                "position": {
                    "col": 5,
                    "row": 1
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "WHITE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 5,
                    "row": 6
                }
            }
        ]
    },
    {
        "id": "waterfall_l8",
        "worldId": "waterfall",
        "levelNumber": 8,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 4,
                "row": 2
            },
            "direction": new Vector2D(-1, 0),
            "color": "YELLOW",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 45,
                "position": {
                    "col": 1,
                    "row": 2
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "YELLOW",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 1,
                    "row": 0
                }
            }
        ]
    },
    {
        "id": "waterfall_l9",
        "worldId": "waterfall",
        "levelNumber": 9,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 5,
                "row": 7
            },
            "direction": new Vector2D(0, -1),
            "color": "YELLOW",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 5,
                    "row": 6
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 0,
                    "row": 6
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "YELLOW",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 0,
                    "row": 2
                }
            }
        ]
    },
    {
        "id": "waterfall_l10",
        "worldId": "waterfall",
        "levelNumber": 10,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 1,
                "row": 0
            },
            "direction": new Vector2D(0, 1),
            "color": "WHITE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 1,
                    "row": 3
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 5,
                    "row": 4
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "WHITE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 5,
                    "row": 7
                }
            }
        ]
    },
    {
        "id": "waterfall_l11",
        "worldId": "waterfall",
        "levelNumber": 11,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 5,
                "row": 7
            },
            "direction": new Vector2D(-1, 0),
            "color": "RED",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 1,
                    "row": 7
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 1,
                    "row": 1
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "RED",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 0,
                    "row": 2
                }
            }
        ]
    },
    {
        "id": "waterfall_l12",
        "worldId": "waterfall",
        "levelNumber": 12,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 3,
                "row": 3
            },
            "direction": new Vector2D(0, 1),
            "color": "RED",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 45,
                "position": {
                    "col": 3,
                    "row": 5
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 4,
                    "row": 5
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "RED",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 4,
                    "row": 4
                }
            }
        ]
    },
    {
        "id": "waterfall_l13",
        "worldId": "waterfall",
        "levelNumber": 13,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 6,
                "row": 8
            },
            "direction": new Vector2D(0, -1),
            "color": "YELLOW",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 6,
                    "row": 6
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 0,
                    "row": 6
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "YELLOW",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 1,
                    "row": 5
                }
            }
        ]
    },
    {
        "id": "waterfall_l14",
        "worldId": "waterfall",
        "levelNumber": 14,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 5,
                "row": 7
            },
            "direction": new Vector2D(-1, 0),
            "color": "RED",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 0,
                    "row": 7
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 1,
                    "row": 2
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "RED",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 2,
                    "row": 3
                }
            }
        ]
    },
    {
        "id": "waterfall_l15",
        "worldId": "waterfall",
        "levelNumber": 15,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 3,
                "row": 7
            },
            "direction": new Vector2D(0, -1),
            "color": "WHITE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 135,
                "position": {
                    "col": 3,
                    "row": 2
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 4,
                    "row": 2
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "WHITE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 5,
                    "row": 4
                }
            }
        ]
    },
    {
        "id": "waterfall_l16",
        "worldId": "waterfall",
        "levelNumber": 16,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 3,
                "row": 6
            },
            "direction": new Vector2D(-1, 0),
            "color": "YELLOW",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 1,
                    "row": 6
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 135,
                "position": {
                    "col": 0,
                    "row": 4
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "YELLOW",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 1,
                    "row": 4
                }
            }
        ]
    },
    {
        "id": "waterfall_l17",
        "worldId": "waterfall",
        "levelNumber": 17,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 0,
                "row": 5
            },
            "direction": new Vector2D(0, -1),
            "color": "WHITE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 0,
                    "row": 0
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 2,
                    "row": 0
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "WHITE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 1,
                    "row": 2
                }
            }
        ]
    },
    {
        "id": "waterfall_l18",
        "worldId": "waterfall",
        "levelNumber": 18,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 3,
                "row": 6
            },
            "direction": new Vector2D(0, -1),
            "color": "WHITE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 3,
                    "row": 2
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 5,
                    "row": 1
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "WHITE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 5,
                    "row": 2
                }
            }
        ]
    },
    {
        "id": "waterfall_l19",
        "worldId": "waterfall",
        "levelNumber": 19,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 2,
                "row": 1
            },
            "direction": new Vector2D(0, 1),
            "color": "WHITE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 2,
                    "row": 6
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 0,
                    "row": 7
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "WHITE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 1,
                    "row": 5
                }
            }
        ]
    },
    {
        "id": "waterfall_l20",
        "worldId": "waterfall",
        "levelNumber": 20,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 2,
                "row": 0
            },
            "direction": new Vector2D(0, 1),
            "color": "YELLOW",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 2,
                    "row": 8
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 3,
                    "row": 8
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "YELLOW",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 3,
                    "row": 6
                }
            }
        ]
    },
    {
        "id": "waterfall_l21",
        "worldId": "waterfall",
        "levelNumber": 21,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 2,
                "row": 5
            },
            "direction": new Vector2D(1, 0),
            "color": "RED",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 5,
                    "row": 5
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 5,
                    "row": 4
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "RED",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 4,
                    "row": 3
                }
            }
        ]
    },
    {
        "id": "waterfall_l22",
        "worldId": "waterfall",
        "levelNumber": 22,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 5,
                "row": 6
            },
            "direction": new Vector2D(-1, 0),
            "color": "YELLOW",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 1,
                    "row": 6
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 1,
                    "row": 1
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "YELLOW",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 0,
                    "row": 2
                }
            }
        ]
    },
    {
        "id": "waterfall_l23",
        "worldId": "waterfall",
        "levelNumber": 23,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 2,
                "row": 4
            },
            "direction": new Vector2D(0, 1),
            "color": "YELLOW",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 2,
                    "row": 7
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 3,
                    "row": 6
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "YELLOW",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 3,
                    "row": 0
                }
            }
        ]
    },
    {
        "id": "waterfall_l24",
        "worldId": "waterfall",
        "levelNumber": 24,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 2,
                "row": 8
            },
            "direction": new Vector2D(1, 0),
            "color": "BLUE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 4,
                    "row": 8
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 45,
                "position": {
                    "col": 3,
                    "row": 7
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "BLUE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 1,
                    "row": 7
                }
            }
        ]
    },
    {
        "id": "waterfall_l25",
        "worldId": "waterfall",
        "levelNumber": 25,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 4,
                "row": 4
            },
            "direction": new Vector2D(-1, 0),
            "color": "WHITE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 1,
                    "row": 4
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 45,
                "position": {
                    "col": 1,
                    "row": 8
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 5,
                    "row": 8
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "WHITE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 6,
                    "row": 6
                }
            }
        ]
    },
    {
        "id": "waterfall_l26",
        "worldId": "waterfall",
        "levelNumber": 26,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 4,
                "row": 0
            },
            "direction": new Vector2D(0, 1),
            "color": "YELLOW",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 4,
                    "row": 3
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 2,
                    "row": 2
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "ROTATE",
                "angleDegrees": 135,
                "position": {
                    "col": 2,
                    "row": 1
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "YELLOW",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 3,
                    "row": 1
                }
            }
        ]
    },
    {
        "id": "waterfall_l27",
        "worldId": "waterfall",
        "levelNumber": 27,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 6,
                "row": 2
            },
            "direction": new Vector2D(-1, 0),
            "color": "YELLOW",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 0,
                    "row": 2
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 0,
                    "row": 6
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 3,
                    "row": 5
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "YELLOW",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 2,
                    "row": 4
                }
            }
        ]
    },
    {
        "id": "waterfall_l28",
        "worldId": "waterfall",
        "levelNumber": 28,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 6,
                "row": 2
            },
            "direction": new Vector2D(0, -1),
            "color": "BLUE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 6,
                    "row": 1
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 5,
                    "row": 1
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 4,
                    "row": 4
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "BLUE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 2,
                    "row": 4
                }
            }
        ]
    },
    {
        "id": "waterfall_l29",
        "worldId": "waterfall",
        "levelNumber": 29,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 3,
                "row": 3
            },
            "direction": new Vector2D(1, 0),
            "color": "RED",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 135,
                "position": {
                    "col": 5,
                    "row": 3
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 5,
                    "row": 1
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 4,
                    "row": 1
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "RED",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 4,
                    "row": 8
                }
            }
        ]
    },
    {
        "id": "waterfall_l30",
        "worldId": "waterfall",
        "levelNumber": 30,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 5,
                "row": 0
            },
            "direction": new Vector2D(0, 1),
            "color": "RED",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 5,
                    "row": 7
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 45,
                "position": {
                    "col": 4,
                    "row": 6
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 4,
                    "row": 2
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "RED",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 5,
                    "row": 1
                }
            }
        ]
    },
    {
        "id": "waterfall_l31",
        "worldId": "waterfall",
        "levelNumber": 31,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 0,
                "row": 3
            },
            "direction": new Vector2D(1, 0),
            "color": "YELLOW",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 6,
                    "row": 3
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 6,
                    "row": 1
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 3,
                    "row": 0
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "YELLOW",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 3,
                    "row": 5
                }
            }
        ]
    },
    {
        "id": "waterfall_l32",
        "worldId": "waterfall",
        "levelNumber": 32,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 2,
                "row": 3
            },
            "direction": new Vector2D(1, 0),
            "color": "BLUE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 5,
                    "row": 3
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 135,
                "position": {
                    "col": 5,
                    "row": 5
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 0,
                    "row": 5
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "BLUE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 0,
                    "row": 1
                }
            }
        ]
    },
    {
        "id": "waterfall_l33",
        "worldId": "waterfall",
        "levelNumber": 33,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 3,
                "row": 1
            },
            "direction": new Vector2D(0, 1),
            "color": "WHITE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 45,
                "position": {
                    "col": 3,
                    "row": 3
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 4,
                    "row": 3
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 4,
                    "row": 2
                },
                "isMovable": true
            },
            {
                "id": "m_3",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 2,
                    "row": 1
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "WHITE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 2,
                    "row": 4
                }
            }
        ]
    },
    {
        "id": "waterfall_l34",
        "worldId": "waterfall",
        "levelNumber": 34,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 0,
                "row": 2
            },
            "direction": new Vector2D(0, 1),
            "color": "BLUE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 0,
                    "row": 8
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 3,
                    "row": 8
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 3,
                    "row": 5
                },
                "isMovable": true
            },
            {
                "id": "m_3",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 6,
                    "row": 5
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "BLUE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 5,
                    "row": 1
                }
            }
        ]
    },
    {
        "id": "waterfall_l35",
        "worldId": "waterfall",
        "levelNumber": 35,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 0,
                "row": 2
            },
            "direction": new Vector2D(1, 0),
            "color": "YELLOW",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 1,
                    "row": 2
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 45,
                "position": {
                    "col": 1,
                    "row": 3
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 3,
                    "row": 3
                },
                "isMovable": true
            },
            {
                "id": "m_3",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 4,
                    "row": 0
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "YELLOW",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 3,
                    "row": 0
                }
            }
        ]
    },
    {
        "id": "waterfall_l36",
        "worldId": "waterfall",
        "levelNumber": 36,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 5,
                "row": 2
            },
            "direction": new Vector2D(1, 0),
            "color": "YELLOW",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 45,
                "position": {
                    "col": 6,
                    "row": 2
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 6,
                    "row": 5
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "ROTATE",
                "angleDegrees": 45,
                "position": {
                    "col": 0,
                    "row": 5
                },
                "isMovable": true
            },
            {
                "id": "m_3",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 0,
                    "row": 0
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "YELLOW",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 1,
                    "row": 0
                }
            }
        ]
    },
    {
        "id": "waterfall_l37",
        "worldId": "waterfall",
        "levelNumber": 37,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 3,
                "row": 2
            },
            "direction": new Vector2D(0, 1),
            "color": "YELLOW",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 3,
                    "row": 6
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 45,
                "position": {
                    "col": 1,
                    "row": 7
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 1,
                    "row": 5
                },
                "isMovable": true
            },
            {
                "id": "m_3",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 6,
                    "row": 4
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "YELLOW",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 5,
                    "row": 7
                }
            }
        ]
    },
    {
        "id": "waterfall_l38",
        "worldId": "waterfall",
        "levelNumber": 38,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 1,
                "row": 1
            },
            "direction": new Vector2D(0, -1),
            "color": "RED",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 1,
                    "row": 0
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 3,
                    "row": 0
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "ROTATE",
                "angleDegrees": 135,
                "position": {
                    "col": 3,
                    "row": 5
                },
                "isMovable": true
            },
            {
                "id": "m_3",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 2,
                    "row": 5
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "RED",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 2,
                    "row": 0
                }
            }
        ]
    },
    {
        "id": "waterfall_l39",
        "worldId": "waterfall",
        "levelNumber": 39,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 5,
                "row": 0
            },
            "direction": new Vector2D(0, 1),
            "color": "RED",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 45,
                "position": {
                    "col": 5,
                    "row": 5
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 6,
                    "row": 5
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 6,
                    "row": 0
                },
                "isMovable": true
            },
            {
                "id": "m_3",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 5,
                    "row": 1
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "RED",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 5,
                    "row": 2
                }
            }
        ]
    },
    {
        "id": "waterfall_l40",
        "worldId": "waterfall",
        "levelNumber": 40,
        "gridSize": {
            "cols": 7,
            "rows": 9
        },
        "mechanic": "BOTH",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 4,
                "row": 8
            },
            "direction": new Vector2D(-1, 0),
            "color": "RED",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 45,
                "position": {
                    "col": 3,
                    "row": 8
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 3,
                    "row": 7
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 4,
                    "row": 7
                },
                "isMovable": true
            },
            {
                "id": "m_3",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 5,
                    "row": 4
                },
                "isMovable": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "RED",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 2,
                    "row": 4
                }
            }
        ]
    }
];
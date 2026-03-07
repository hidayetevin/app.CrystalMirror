import { Puzzle } from '../../domain/entities/Puzzle';
import { Vector2D } from '../../domain/value-objects/Vector2D';

export const WORLD_TWO_LEVELS: Puzzle[] = [
    {
        "id": "glacier_l1",
        "worldId": "glacier",
        "levelNumber": 1,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 3,
                "row": 7
            },
            "direction": new Vector2D(0, -1),
            "color": "BLUE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 3,
                    "row": 6
                },
                "isMovable": true,
                "isFinisher": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "BLUE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 4,
                    "row": 6
                }
            }
        ]
    },
    {
        "id": "glacier_l2",
        "worldId": "glacier",
        "levelNumber": 2,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 2,
                "row": 1
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
                    "col": 2,
                    "row": 2
                },
                "isMovable": true,
                "isFinisher": true
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
                    "row": 3
                }
            }
        ]
    },
    {
        "id": "glacier_l3",
        "worldId": "glacier",
        "levelNumber": 3,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 4,
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
                    "col": 4,
                    "row": 1
                },
                "isMovable": true,
                "isFinisher": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "WHITE",
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
        "id": "glacier_l4",
        "worldId": "glacier",
        "levelNumber": 4,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 2,
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
                "angleDegrees": 135,
                "position": {
                    "col": 2,
                    "row": 2
                },
                "isMovable": true,
                "isFinisher": true
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
                    "row": 3
                }
            }
        ]
    },
    {
        "id": "glacier_l5",
        "worldId": "glacier",
        "levelNumber": 5,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 0,
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
                "angleDegrees": 45,
                "position": {
                    "col": 0,
                    "row": 5
                },
                "isMovable": true,
                "isFinisher": true
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
        "id": "glacier_l6",
        "worldId": "glacier",
        "levelNumber": 6,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 2,
                "row": 4
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
                    "row": 2
                },
                "isMovable": true,
                "isFinisher": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "WHITE",
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
        "id": "glacier_l7",
        "worldId": "glacier",
        "levelNumber": 7,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 1,
                "row": 6
            },
            "direction": new Vector2D(0, -1),
            "color": "YELLOW",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 1,
                    "row": 4
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 0,
                    "row": 3
                },
                "isMovable": true,
                "isFinisher": true
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
                    "row": 7
                }
            }
        ]
    },
    {
        "id": "glacier_l8",
        "worldId": "glacier",
        "levelNumber": 8,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 2,
                "row": 1
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
                    "col": 2,
                    "row": 5
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 3,
                    "row": 4
                },
                "isMovable": true,
                "isFinisher": true
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
        "id": "glacier_l9",
        "worldId": "glacier",
        "levelNumber": 9,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 3,
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
                    "col": 3,
                    "row": 5
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 5,
                    "row": 4
                },
                "isMovable": true,
                "isFinisher": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "YELLOW",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 4,
                    "row": 2
                }
            }
        ]
    },
    {
        "id": "glacier_l10",
        "worldId": "glacier",
        "levelNumber": 10,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 4,
                "row": 2
            },
            "direction": new Vector2D(-1, 0),
            "color": "BLUE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 2,
                    "row": 2
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 3,
                    "row": 0
                },
                "isMovable": true,
                "isFinisher": true
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
                    "row": 1
                }
            }
        ]
    },
    {
        "id": "glacier_l11",
        "worldId": "glacier",
        "levelNumber": 11,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 5,
                "row": 0
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
                    "col": 4,
                    "row": 0
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 3,
                    "row": 7
                },
                "isMovable": true,
                "isFinisher": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "YELLOW",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 4,
                    "row": 6
                }
            }
        ]
    },
    {
        "id": "glacier_l12",
        "worldId": "glacier",
        "levelNumber": 12,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 1,
                "row": 7
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
                    "row": 7
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 5,
                    "row": 3
                },
                "isMovable": true,
                "isFinisher": true
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
                    "row": 4
                }
            }
        ]
    },
    {
        "id": "glacier_l13",
        "worldId": "glacier",
        "levelNumber": 13,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 1,
                "row": 5
            },
            "direction": new Vector2D(0, -1),
            "color": "BLUE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 1,
                    "row": 4
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 3,
                    "row": 3
                },
                "isMovable": true,
                "isFinisher": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "BLUE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 4,
                    "row": 1
                }
            }
        ]
    },
    {
        "id": "glacier_l14",
        "worldId": "glacier",
        "levelNumber": 14,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 1,
                "row": 4
            },
            "direction": new Vector2D(1, 0),
            "color": "YELLOW",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 5,
                    "row": 4
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 5,
                    "row": 3
                },
                "isMovable": true,
                "isFinisher": true
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
                    "row": 3
                }
            }
        ]
    },
    {
        "id": "glacier_l15",
        "worldId": "glacier",
        "levelNumber": 15,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
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
                    "row": 4
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 1,
                    "row": 5
                },
                "isMovable": true,
                "isFinisher": true
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
                    "row": 7
                }
            }
        ]
    },
    {
        "id": "glacier_l16",
        "worldId": "glacier",
        "levelNumber": 16,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
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
                "angleDegrees": 135,
                "position": {
                    "col": 5,
                    "row": 3
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 3,
                    "row": 4
                },
                "isMovable": true,
                "isFinisher": true
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
                    "row": 7
                }
            }
        ]
    },
    {
        "id": "glacier_l17",
        "worldId": "glacier",
        "levelNumber": 17,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 1,
                "row": 5
            },
            "direction": new Vector2D(0, -1),
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
                    "row": 3
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 3,
                    "row": 4
                },
                "isMovable": true,
                "isFinisher": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "YELLOW",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 4,
                    "row": 6
                }
            }
        ]
    },
    {
        "id": "glacier_l18",
        "worldId": "glacier",
        "levelNumber": 18,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 0,
                "row": 4
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
                    "col": 0,
                    "row": 6
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 1,
                    "row": 7
                },
                "isMovable": true,
                "isFinisher": true
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
                    "row": 0
                }
            }
        ]
    },
    {
        "id": "glacier_l19",
        "worldId": "glacier",
        "levelNumber": 19,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 0,
                "row": 3
            },
            "direction": new Vector2D(0, -1),
            "color": "YELLOW",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 0,
                    "row": 0
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 1,
                    "row": 1
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_2",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 1,
                    "row": 3
                },
                "isMovable": true,
                "isFinisher": true
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
                    "row": 2
                }
            }
        ]
    },
    {
        "id": "glacier_l20",
        "worldId": "glacier",
        "levelNumber": 20,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 2,
                "row": 4
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
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 3,
                    "row": 5
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_2",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 4,
                    "row": 1
                },
                "isMovable": true,
                "isFinisher": true
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
        "id": "glacier_l21",
        "worldId": "glacier",
        "levelNumber": 21,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 4,
                "row": 7
            },
            "direction": new Vector2D(0, -1),
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
                    "row": 6
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 0,
                    "row": 5
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_2",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 0,
                    "row": 0
                },
                "isMovable": true,
                "isFinisher": true
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
                    "row": 1
                }
            }
        ]
    },
    {
        "id": "glacier_l22",
        "worldId": "glacier",
        "levelNumber": 22,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 0,
                "row": 5
            },
            "direction": new Vector2D(0, -1),
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
                    "row": 2
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 1,
                    "row": 3
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_2",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 1,
                    "row": 7
                },
                "isMovable": true,
                "isFinisher": true
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
                    "row": 7
                }
            }
        ]
    },
    {
        "id": "glacier_l23",
        "worldId": "glacier",
        "levelNumber": 23,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 3,
                "row": 5
            },
            "direction": new Vector2D(0, -1),
            "color": "YELLOW",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 3,
                    "row": 0
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 5,
                    "row": 0
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_2",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 5,
                    "row": 6
                },
                "isMovable": true,
                "isFinisher": true
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
                    "row": 5
                }
            }
        ]
    },
    {
        "id": "glacier_l24",
        "worldId": "glacier",
        "levelNumber": 24,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 2,
                "row": 2
            },
            "direction": new Vector2D(1, 0),
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
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 3,
                    "row": 6
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_2",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 5,
                    "row": 7
                },
                "isMovable": true,
                "isFinisher": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "WHITE",
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
        "id": "glacier_l25",
        "worldId": "glacier",
        "levelNumber": 25,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 5,
                "row": 7
            },
            "direction": new Vector2D(0, -1),
            "color": "BLUE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 5,
                    "row": 4
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 0,
                    "row": 3
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_2",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 0,
                    "row": 1
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_3",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 3,
                    "row": 2
                },
                "isMovable": true,
                "isFinisher": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "BLUE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 4,
                    "row": 6
                }
            }
        ]
    },
    {
        "id": "glacier_l26",
        "worldId": "glacier",
        "levelNumber": 26,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 0,
                "row": 6
            },
            "direction": new Vector2D(0, 1),
            "color": "BLUE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 0,
                    "row": 7
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 4,
                    "row": 7
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_2",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 5,
                    "row": 6
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_3",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 3,
                    "row": 6
                },
                "isMovable": true,
                "isFinisher": true
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
                    "row": 7
                }
            }
        ]
    },
    {
        "id": "glacier_l27",
        "worldId": "glacier",
        "levelNumber": 27,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 4,
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
                "angleDegrees": 135,
                "position": {
                    "col": 4,
                    "row": 5
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 1,
                    "row": 4
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_2",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 2,
                    "row": 0
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_3",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 1,
                    "row": 0
                },
                "isMovable": true,
                "isFinisher": true
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
                    "row": 3
                }
            }
        ]
    },
    {
        "id": "glacier_l28",
        "worldId": "glacier",
        "levelNumber": 28,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 4,
                "row": 0
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
                    "col": 4,
                    "row": 3
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 2,
                    "row": 4
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_2",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 1,
                    "row": 7
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_3",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 5,
                    "row": 6
                },
                "isMovable": true,
                "isFinisher": true
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
                    "row": 3
                }
            }
        ]
    },
    {
        "id": "glacier_l29",
        "worldId": "glacier",
        "levelNumber": 29,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 2,
                "row": 6
            },
            "direction": new Vector2D(-1, 0),
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
                    "row": 6
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 0,
                    "row": 4
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_2",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 5,
                    "row": 3
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_3",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 5,
                    "row": 0
                },
                "isMovable": true,
                "isFinisher": true
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
                    "row": 0
                }
            }
        ]
    },
    {
        "id": "glacier_l30",
        "worldId": "glacier",
        "levelNumber": 30,
        "gridSize": {
            "cols": 6,
            "rows": 8
        },
        "mechanic": "SLIDE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 4,
                "row": 6
            },
            "direction": new Vector2D(0, -1),
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
                    "row": 4
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_1",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 1,
                    "row": 3
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_2",
                "type": "SLIDE",
                "angleDegrees": 135,
                "position": {
                    "col": 0,
                    "row": 0
                },
                "isMovable": true,
                "isFinisher": false
            },
            {
                "id": "m_3",
                "type": "SLIDE",
                "angleDegrees": 45,
                "position": {
                    "col": 2,
                    "row": 1
                },
                "isMovable": true,
                "isFinisher": true
            }
        ],
        "crystals": [
            {
                "id": "c_target",
                "color": "BLUE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 3,
                    "row": 7
                }
            }
        ]
    }
];
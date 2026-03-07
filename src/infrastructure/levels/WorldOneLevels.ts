import { Puzzle } from '../../domain/entities/Puzzle';
import { Vector2D } from '../../domain/value-objects/Vector2D';

export const WORLD_ONE_LEVELS: Puzzle[] = [
    {
        "id": "forest_l1",
        "worldId": "forest",
        "levelNumber": 1,
        "gridSize": {
            "cols": 5,
            "rows": 7
        },
        "mechanic": "ROTATE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 0,
                "row": 5
            },
            "direction": new Vector2D(1, 0),
            "color": "WHITE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 0,
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
                "color": "WHITE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 2,
                    "row": 2
                }
            }
        ]
    },
    {
        "id": "forest_l2",
        "worldId": "forest",
        "levelNumber": 2,
        "gridSize": {
            "cols": 5,
            "rows": 7
        },
        "mechanic": "ROTATE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 0,
                "row": 5
            },
            "direction": new Vector2D(1, 0),
            "color": "WHITE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 0,
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
        "id": "forest_l3",
        "worldId": "forest",
        "levelNumber": 3,
        "gridSize": {
            "cols": 5,
            "rows": 7
        },
        "mechanic": "ROTATE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 4,
                "row": 0
            },
            "direction": new Vector2D(-1, 0),
            "color": "WHITE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 135,
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
                "color": "WHITE",
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
        "id": "forest_l4",
        "worldId": "forest",
        "levelNumber": 4,
        "gridSize": {
            "cols": 5,
            "rows": 7
        },
        "mechanic": "ROTATE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 4,
                "row": 2
            },
            "direction": new Vector2D(0, 1),
            "color": "WHITE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 0,
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
                "color": "WHITE",
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
        "id": "forest_l5",
        "worldId": "forest",
        "levelNumber": 5,
        "gridSize": {
            "cols": 5,
            "rows": 7
        },
        "mechanic": "ROTATE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 3,
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
                    "col": 3,
                    "row": 0
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 135,
                "position": {
                    "col": 1,
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
                    "row": 5
                }
            }
        ]
    },
    {
        "id": "forest_l6",
        "worldId": "forest",
        "levelNumber": 6,
        "gridSize": {
            "cols": 5,
            "rows": 7
        },
        "mechanic": "ROTATE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 3,
                "row": 1
            },
            "direction": new Vector2D(-1, 0),
            "color": "WHITE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 135,
                "position": {
                    "col": 1,
                    "row": 1
                },
                "isMovable": true
            },
            {
                "id": "m_1",
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
                "color": "WHITE",
                "fillLevel": 0,
                "isTarget": true,
                "position": {
                    "col": 2,
                    "row": 2
                }
            }
        ]
    },
    {
        "id": "forest_l7",
        "worldId": "forest",
        "levelNumber": 7,
        "gridSize": {
            "cols": 5,
            "rows": 7
        },
        "mechanic": "ROTATE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 4,
                "row": 6
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
                    "col": 4,
                    "row": 2
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 2,
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
                    "col": 2,
                    "row": 4
                }
            }
        ]
    },
    {
        "id": "forest_l8",
        "worldId": "forest",
        "levelNumber": 8,
        "gridSize": {
            "cols": 5,
            "rows": 7
        },
        "mechanic": "ROTATE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 2,
                "row": 0
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
                    "col": 0,
                    "row": 0
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 0,
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
                    "col": 3,
                    "row": 4
                }
            }
        ]
    },
    {
        "id": "forest_l9",
        "worldId": "forest",
        "levelNumber": 9,
        "gridSize": {
            "cols": 5,
            "rows": 7
        },
        "mechanic": "ROTATE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 1,
                "row": 5
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
                    "col": 3,
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
                    "col": 3,
                    "row": 0
                }
            }
        ]
    },
    {
        "id": "forest_l10",
        "worldId": "forest",
        "levelNumber": 10,
        "gridSize": {
            "cols": 5,
            "rows": 7
        },
        "mechanic": "ROTATE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 4,
                "row": 2
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
                    "col": 4,
                    "row": 4
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 3,
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
                    "col": 3,
                    "row": 3
                }
            }
        ]
    },
    {
        "id": "forest_l11",
        "worldId": "forest",
        "levelNumber": 11,
        "gridSize": {
            "cols": 5,
            "rows": 7
        },
        "mechanic": "ROTATE",
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
                "angleDegrees": 45,
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
                "color": "WHITE",
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
        "id": "forest_l12",
        "worldId": "forest",
        "levelNumber": 12,
        "gridSize": {
            "cols": 5,
            "rows": 7
        },
        "mechanic": "ROTATE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 3,
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
                    "col": 3,
                    "row": 3
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 0,
                    "row": 3
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
                    "row": 6
                }
            }
        ]
    },
    {
        "id": "forest_l13",
        "worldId": "forest",
        "levelNumber": 13,
        "gridSize": {
            "cols": 5,
            "rows": 7
        },
        "mechanic": "ROTATE",
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
                "angleDegrees": 135,
                "position": {
                    "col": 3,
                    "row": 4
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 0,
                    "row": 4
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "ROTATE",
                "angleDegrees": 0,
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
                "color": "WHITE",
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
        "id": "forest_l14",
        "worldId": "forest",
        "levelNumber": 14,
        "gridSize": {
            "cols": 5,
            "rows": 7
        },
        "mechanic": "ROTATE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 0,
                "row": 2
            },
            "direction": new Vector2D(1, 0),
            "color": "WHITE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 4,
                    "row": 2
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 4,
                    "row": 4
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "ROTATE",
                "angleDegrees": 45,
                "position": {
                    "col": 2,
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
                    "col": 2,
                    "row": 3
                }
            }
        ]
    },
    {
        "id": "forest_l15",
        "worldId": "forest",
        "levelNumber": 15,
        "gridSize": {
            "cols": 5,
            "rows": 7
        },
        "mechanic": "ROTATE",
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
                "angleDegrees": 0,
                "position": {
                    "col": 3,
                    "row": 4
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 0,
                    "row": 4
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 0,
                    "row": 3
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
                    "col": 4,
                    "row": 3
                }
            }
        ]
    },
    {
        "id": "forest_l16",
        "worldId": "forest",
        "levelNumber": 16,
        "gridSize": {
            "cols": 5,
            "rows": 7
        },
        "mechanic": "ROTATE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 1,
                "row": 4
            },
            "direction": new Vector2D(1, 0),
            "color": "WHITE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 4,
                    "row": 4
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 45,
                "position": {
                    "col": 4,
                    "row": 0
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 1,
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
                    "row": 5
                }
            }
        ]
    },
    {
        "id": "forest_l17",
        "worldId": "forest",
        "levelNumber": 17,
        "gridSize": {
            "cols": 5,
            "rows": 7
        },
        "mechanic": "ROTATE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 0,
                "row": 4
            },
            "direction": new Vector2D(1, 0),
            "color": "WHITE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 135,
                "position": {
                    "col": 4,
                    "row": 4
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 4,
                    "row": 2
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 2,
                    "row": 2
                },
                "isMovable": true
            },
            {
                "id": "m_3",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 2,
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
                    "col": 3,
                    "row": 4
                }
            }
        ]
    },
    {
        "id": "forest_l18",
        "worldId": "forest",
        "levelNumber": 18,
        "gridSize": {
            "cols": 5,
            "rows": 7
        },
        "mechanic": "ROTATE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 1,
                "row": 3
            },
            "direction": new Vector2D(0, 1),
            "color": "WHITE",
            "intensity": 1
        },
        "mirrors": [
            {
                "id": "m_0",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 1,
                    "row": 5
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 3,
                    "row": 5
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 3,
                    "row": 6
                },
                "isMovable": true
            },
            {
                "id": "m_3",
                "type": "ROTATE",
                "angleDegrees": 45,
                "position": {
                    "col": 2,
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
                    "col": 2,
                    "row": 1
                }
            }
        ]
    },
    {
        "id": "forest_l19",
        "worldId": "forest",
        "levelNumber": 19,
        "gridSize": {
            "cols": 5,
            "rows": 7
        },
        "mechanic": "ROTATE",
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
                "angleDegrees": 135,
                "position": {
                    "col": 0,
                    "row": 0
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 90,
                "position": {
                    "col": 2,
                    "row": 0
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 2,
                    "row": 1
                },
                "isMovable": true
            },
            {
                "id": "m_3",
                "type": "ROTATE",
                "angleDegrees": 135,
                "position": {
                    "col": 0,
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
                    "col": 0,
                    "row": 6
                }
            }
        ]
    },
    {
        "id": "forest_l20",
        "worldId": "forest",
        "levelNumber": 20,
        "gridSize": {
            "cols": 5,
            "rows": 7
        },
        "mechanic": "ROTATE",
        "timeLimit": null,
        "lightSource": {
            "position": {
                "col": 1,
                "row": 2
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
                    "col": 1,
                    "row": 3
                },
                "isMovable": true
            },
            {
                "id": "m_1",
                "type": "ROTATE",
                "angleDegrees": 0,
                "position": {
                    "col": 4,
                    "row": 3
                },
                "isMovable": true
            },
            {
                "id": "m_2",
                "type": "ROTATE",
                "angleDegrees": 45,
                "position": {
                    "col": 4,
                    "row": 1
                },
                "isMovable": true
            },
            {
                "id": "m_3",
                "type": "ROTATE",
                "angleDegrees": 135,
                "position": {
                    "col": 0,
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
                    "col": 0,
                    "row": 3
                }
            }
        ]
    }
];
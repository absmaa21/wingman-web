export type FetchContentResponse = {
  DisabledIDs: unknown[];
  Seasons: {
    ID: string;
    Name: string;
    Type: "episode" | "act";
    /** Date in ISO 8601 format */
    StartTime: string;
    /** Date in ISO 8601 format */
    EndTime: string;
    IsActive: boolean;
  }[];
  Events: {
    ID: string;
    Name: string;
    /** Date in ISO 8601 format */
    StartTime: string;
    /** Date in ISO 8601 format */
    EndTime: string;
    IsActive: boolean;
  }[];
};

export type AccountXPResponse = {
  Version: number;
  /** Player UUID */
  Subject: string;
  Progress: {
    Level: number;
    XP: number;
  };
  History: {
    ID: string;
    /** Date in ISO 8601 format */
    MatchStart: string;
    StartProgress: {
      Level: number;
      XP: number;
    };
    EndProgress: {
      Level: number;
      XP: number;
    };
    XPDelta: number;
    XPSources: {
      ID: "time-played" | "match-win" | "first-win-of-the-day";
      Amount: number;
    }[];
    XPMultipliers: unknown[];
  }[];
  /** Date in ISO 8601 format */
  LastTimeGrantedFirstWin: string;
  /** Date in ISO 8601 format */
  NextTimeFirstWinAvailable: string;
};

export type PlayerLoadoutGun = {
  ID: string;
  CharmInstanceID?: string | undefined;
  CharmID?: string | undefined;
  CharmLevelID?: string | undefined;
  SkinID: string;
  SkinLevelID: string;
  ChromaID: string;
  Attachments: unknown[];
}

export type PlayerLoadoutSpray = {
  EquipSlotID: string;
  SprayID: string;
  SprayLevelID: null;
}

export type PlayerLoadoutIdentity = {
  PlayerCardID: string;
  PlayerTitleID: string;
  AccountLevel: number;
  PreferredLevelBorderID: string;
  HideAccountLevel: boolean;
}

export type PlayerLoadoutResponse = SetPlayerLoadoutBody & {
  /** Player UUID */
  Subject: string;
  Version: number;
}

export type SetPlayerLoadoutBody = {
  Guns: PlayerLoadoutGun[];
  Sprays: PlayerLoadoutSpray[];
  Identity: PlayerLoadoutIdentity
  Incognito: boolean;
}

export type SetPlayerLoadoutResponse = PlayerLoadoutResponse

// @ts-ignore
export enum QueueSkill {
  COMPETITIVE = 'competitive',
  DEATHMATCH = 'deathmatch',
  TEAM_DEATHMATCH = 'ggteam',
  PREMIER = 'premier',
  NEW_MAP = 'newmap',
  SPIKE_RUSH = 'spikerush',
  SWIFTPLAY = 'swiftplay',
  UNRATED = 'unrated',
  SEEDING = 'seeding',
  HURM = 'hurm',
}

export type PlayerMMRResponse = {
  Version: number;
  Subject: string;
  NewPlayerExperienceFinished: boolean;
  QueueSkills: {
    [x: string]: QueueSkills;
  };
  LatestCompetitiveUpdate: {
    MatchID: string;
    MapID: string;
    SeasonID: string;
    MatchStartTime: number;
    TierAfterUpdate: number;
    TierBeforeUpdate: number;
    RankedRatingAfterUpdate: number;
    RankedRatingBeforeUpdate: number;
    RankedRatingEarned: number;
    RankedRatingPerformanceBonus: number;
    CompetitiveMovement: "MOVEMENT_UNKNOWN";
    AFKPenalty: number;
  };
  IsLeaderboardAnonymized: boolean;
  IsActRankBadgeHidden: boolean;
}

export type QueueSkills = {
  TotalGamesNeededForRating: number;
  TotalGamesNeededForLeaderboard: number;
  CurrentSeasonGamesNeededForRating: number;
  SeasonalInfoBySeasonID: {
    [x: string]: SeasonalInfo;
  };
}

export type SeasonalInfo = {
  SeasonID: string;
  NumberOfWins: number;
  NumberOfWinsWithPlacements: number;
  NumberOfGames: number;
  Rank: number;
  CapstoneWins: number;
  LeaderboardRank: number;
  CompetitiveTier: number;
  RankedRating: number;
  WinsByTier: {
    [x: string]: number;
  } | null;
  GamesNeededForRating: number;
  TotalWinsNeededForRank: number;
}

export type MatchDetailsResponse = {
  matchInfo: {
    matchId: string;
    mapId: string;
    gamePodId: string;
    gameLoopZone: string;
    gameServerAddress: string;
    gameVersion: string;
    gameLengthMillis: number | null;
    gameStartMillis: number;
    provisioningFlowID: "Matchmaking" | "CustomGame";
    isCompleted: boolean;
    customGameName: string;
    forcePostProcessing: boolean;
    queueID: string;
    gameMode: string;
    isRanked: boolean;
    isMatchSampled: boolean;
    seasonId: string;
    completionState: "Surrendered" | "Completed" | "VoteDraw" | "";
    platformType: "PC";
    premierMatchInfo: object;
    partyRRPenalties?: {
      [x: string]: number;
    } | undefined;
    shouldMatchDisablePenalties: boolean;
  };
  players: MatchDetailsPlayer[];
  bots: unknown[];
  coaches: {
    /** Player UUID */
    subject: string;
    teamId: "Blue" | "Red";
  }[];
  teams: {
    teamId: ("Blue" | "Red") | string;
    won: boolean;
    roundsPlayed: number;
    roundsWon: number;
    numPoints: number;
  }[] | null;
  roundResults: {
    roundNum: number;
    roundResult: "Eliminated" | "Bomb detonated" | "Bomb defused" | "Surrendered" | "Round timer expired";
    roundCeremony: "CeremonyDefault" | "CeremonyTeamAce" | "CeremonyFlawless" | "CeremonyCloser" | "CeremonyClutch" | "CeremonyThrifty" | "CeremonyAce" | "";
    winningTeam: ("Blue" | "Red") | string;
    /** Player UUID */
    bombPlanter?: string | undefined;
    bombDefuser?: (("Blue" | "Red") | string) | undefined;
    /** Time in milliseconds since the start of the round when the bomb was planted. 0 if not planted */
    plantRoundTime?: number | undefined;
    plantPlayerLocations: {
      /** Player UUID */
      subject: string;
      viewRadians: number;
      location: {
        x: number;
        y: number;
      };
    }[] | null;
    plantLocation: {
      x: number;
      y: number;
    };
    plantSite: "A" | "B" | "C" | "";
    /** Time in milliseconds since the start of the round when the bomb was defused. 0 if not defused */
    defuseRoundTime?: number | undefined;
    defusePlayerLocations: {
      /** Player UUID */
      subject: string;
      viewRadians: number;
      location: {
        x: number;
        y: number;
      };
    }[] | null;
    defuseLocation: {
      x: number;
      y: number;
    };
    playerStats: {
      /** Player UUID */
      subject: string;
      kills: {
        /** Time in milliseconds since the start of the game */
        gameTime: number;
        /** Time in milliseconds since the start of the round */
        roundTime: number;
        /** Player UUID */
        killer: string;
        /** Player UUID */
        victim: string;
        victimLocation: {
          x: number;
          y: number;
        };
        assistants: string[];
        playerLocations: {
          /** Player UUID */
          subject: string;
          viewRadians: number;
          location: {
            x: number;
            y: number;
          };
        }[];
        finishingDamage: {
          damageType: "Weapon" | "Bomb" | "Ability" | "Fall" | "Melee" | "Invalid" | "";
          /** Item ID of the weapon used to kill the player. Empty string if the player was killed by the spike, fall damage, or melee. */
          damageItem: (string | ("Ultimate" | "Ability1" | "Ability2" | "GrenadeAbility" | "Primary")) | "";
          isSecondaryFireMode: boolean;
        };
      }[];
      damage: {
        /** Player UUID */
        receiver: string;
        damage: number;
        legshots: number;
        bodyshots: number;
        headshots: number;
      }[];
      score: number;
      economy: {
        loadoutValue: number;
        /** Item ID */
        weapon: string | "";
        /** Armor ID */
        armor: string | "";
        remaining: number;
        spent: number;
      };
      ability: {
        grenadeEffects: null;
        ability1Effects: null;
        ability2Effects: null;
        ultimateEffects: null;
      };
      wasAfk: boolean;
      wasPenalized: boolean;
      stayedInSpawn: boolean;
    }[];
    /** Empty string if the timer expired */
    roundResultCode: "Elimination" | "Detonate" | "Defuse" | "Surrendered" | "";
    playerEconomies: {
      /** Player UUID */
      subject: string;
      loadoutValue: number;
      /** Item ID */
      weapon: string | "";
      /** Armor ID */
      armor: string | "";
      remaining: number;
      spent: number;
    }[] | null;
    playerScores: {
      /** Player UUID */
      subject: string;
      score: number;
    }[] | null;
  }[] | null;
  kills: {
    /** Time in milliseconds since the start of the game */
    gameTime: number;
    /** Time in milliseconds since the start of the round */
    roundTime: number;
    /** Player UUID */
    killer: string;
    /** Player UUID */
    victim: string;
    victimLocation: {
      x: number;
      y: number;
    };
    assistants: string[];
    playerLocations: {
      /** Player UUID */
      subject: string;
      viewRadians: number;
      location: {
        x: number;
        y: number;
      };
    }[];
    finishingDamage: {
      damageType: "Weapon" | "Bomb" | "Ability" | "Fall" | "Melee" | "Invalid" | "";
      /** Item ID of the weapon used to kill the player. Empty string if the player was killed by the spike, fall damage, or melee. */
      damageItem: (string | ("Ultimate" | "Ability1" | "Ability2" | "GrenadeAbility" | "Primary")) | "";
      isSecondaryFireMode: boolean;
    };
    round: number;
  }[] | null;
};

export type MatchDetailsPlayer = {
  subject: string;
  gameName: string;
  tagLine: string;
  platformInfo: {
    platformType: "PC";
    platformOS: "Windows";
    platformOSVersion: string;
    platformChipset: "Unknown";
  };
  teamId: ("Blue" | "Red") | string;
  partyId: string;
  characterId: string;
  stats: {
    score: number;
    roundsPlayed: number;
    kills: number;
    deaths: number;
    assists: number;
    playtimeMillis: number;
    abilityCasts?: ({
      grenadeCasts: number;
      ability1Casts: number;
      ability2Casts: number;
      ultimateCasts: number;
    } | null) | undefined;
  } | null;
  roundDamage: {
    round: number;
    /** Player UUID */
    receiver: string;
    damage: number;
  }[] | null;
  competitiveTier: number;
  isObserver: boolean;
  playerCard: string;
  playerTitle: string;
  preferredLevelBorder?: (string | "") | undefined;
  accountLevel: number;
  sessionPlaytimeMinutes?: (number | null) | undefined;
  xpModifications?: {
    /** XP multiplier */
    Value: number;
    /** XP Modification ID */
    ID: string;
  }[] | undefined;
  behaviorFactors?: {
    afkRounds: number;
    /** Float value of unknown significance. Possibly used to quantify how much the player was in the way of their teammates? */
    collisions?: number | undefined;
    commsRatingRecovery: number;
    damageParticipationOutgoing: number;
    friendlyFireIncoming?: number | undefined;
    friendlyFireOutgoing?: number | undefined;
    mouseMovement?: number | undefined;
    stayedInSpawnRounds?: number | undefined;
  } | undefined;
  newPlayerExperienceDetails?: {
    basicMovement: {
      idleTimeMillis: 0;
      objectiveCompleteTimeMillis: 0;
    };
    basicGunSkill: {
      idleTimeMillis: 0;
      objectiveCompleteTimeMillis: 0;
    };
    adaptiveBots: {
      adaptiveBotAverageDurationMillisAllAttempts: 0;
      adaptiveBotAverageDurationMillisFirstAttempt: 0;
      killDetailsFirstAttempt: null;
      idleTimeMillis: 0;
      objectiveCompleteTimeMillis: 0;
    };
    ability: {
      idleTimeMillis: 0;
      objectiveCompleteTimeMillis: 0;
    };
    bombPlant: {
      idleTimeMillis: 0;
      objectiveCompleteTimeMillis: 0;
    };
    defendBombSite: {
      success: false;
      idleTimeMillis: 0;
      objectiveCompleteTimeMillis: 0;
    };
    settingStatus: {
      isMouseSensitivityDefault: boolean;
      isCrosshairDefault: boolean;
    };
    versionString: "";
  } | undefined;
}

// @ts-ignore
export enum ItemType {
  AGENTS = "01bb38e1-da47-4e6a-9b3d-945fe4655707",
  CONTRACTS = "f85cb6f7-33e5-4dc8-b609-ec7212301948",
  SPRAYS = "d5f120f8-ff8c-4aac-92ea-f2b5acbe9475",
  GUN_BUDDIES = "dd3bf334-87f3-40bd-b043-682a57a8dc3a",
  PLAYER_CARDS = "3f296c07-64c3-494c-923b-fe692a4fa1bd",
  SKINS = "e7c63390-eda7-46e0-bb7a-a6abdacd2433",
  SKIN_VARIANTS = "3ad1b2b2-acdb-4524-852f-954a76ddae0a",
  TITLES = "de7caa6b-adf7-4588-bbd1-143831e786c6",
}

export type OwnedItemsResponse = {
  EntitlementsByTypes: {
    ItemTypeID: string;
    Entitlements: {
      TypeID: string;
      ItemID: string;
      InstanceID?: string | undefined;
    }[];
  }[];
};

export type EntitlementResponse = {
  entitlements_token: string;
};

export type RiotGeoResponse = {
  token: string;
  /** The region IDs for PBE and live servers */
  affinities: {
    pbe: string;
    live: string;
  };
};

export type RiotGeoBody = {
  /** The ID token */
  id_token: string;
};

export type WalletResponse = {
  Balances: {
    [x: string]: number;
  };
};

// @ts-ignore
export enum Balance {
  VP = '85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741',
  KC = '85ca954a-41f2-ce94-9b45-8ca3dd39a00d',
  R = 'e59aa87c-4cbf-517a-5983-6e81511be9b7',
  FREE_AGENTS = 'f08d4ae3-939c-4576-ab26-09ce1f23bb37',
}

export type StorefrontBundle = {
  /** UUID */
  ID: string;
  /** UUID */
  DataAssetID: string;
  /** Currency ID */
  CurrencyID: string;
  Items: {
    Item: {
      /** Item Type ID */
      ItemTypeID: string;
      /** Item ID */
      ItemID: string;
      Amount: number;
    };
    BasePrice: number;
    /** Currency ID */
    CurrencyID: string;
    DiscountPercent: number;
    DiscountedPrice: number;
    IsPromoItem: boolean;
  }[];
  ItemOffers: {
    /** UUID */
    BundleItemOfferID: string;
    Offer: {
      OfferID: string;
      IsDirectPurchase: boolean;
      /** Date in ISO 8601 format */
      StartDate: string;
      Cost: {
        [x: string]: number;
      };
      Rewards: {
        /** Item Type ID */
        ItemTypeID: string;
        /** Item ID */
        ItemID: string;
        Quantity: number;
      }[];
    };
    DiscountPercent: number;
    DiscountedCost: {
      [x: string]: number;
    };
  }[] | null;
  TotalBaseCost: {
    [x: string]: number;
  } | null;
  TotalDiscountedCost: {
    [x: string]: number;
  } | null;
  TotalDiscountPercent: number;
  DurationRemainingInSeconds: number;
  WholesaleOnly: boolean;
}

export type StorefrontResponse = {
  FeaturedBundle: {
    Bundle: {
      /** UUID */
      ID: string;
      /** UUID */
      DataAssetID: string;
      /** Currency ID */
      CurrencyID: string;
      Items: {
        Item: {
          /** Item Type ID */
          ItemTypeID: string;
          /** Item ID */
          ItemID: string;
          Amount: number;
        };
        BasePrice: number;
        /** Currency ID */
        CurrencyID: string;
        DiscountPercent: number;
        DiscountedPrice: number;
        IsPromoItem: boolean;
      }[];
      ItemOffers: {
        /** UUID */
        BundleItemOfferID: string;
        Offer: {
          OfferID: string;
          IsDirectPurchase: boolean;
          /** Date in ISO 8601 format */
          StartDate: string;
          Cost: {
            [x: string]: number;
          };
          Rewards: {
            /** Item Type ID */
            ItemTypeID: string;
            /** Item ID */
            ItemID: string;
            Quantity: number;
          }[];
        };
        DiscountPercent: number;
        DiscountedCost: {
          [x: string]: number;
        };
      }[] | null;
      TotalBaseCost: {
        [x: string]: number;
      } | null;
      TotalDiscountedCost: {
        [x: string]: number;
      } | null;
      TotalDiscountPercent: number;
      DurationRemainingInSeconds: number;
      WholesaleOnly: boolean;
    };
    Bundles: StorefrontBundle[];
    BundleRemainingDurationInSeconds: number;
  };
  SkinsPanelLayout: {
    SingleItemOffers: string[];
    SingleItemStoreOffers: SingleItemStoreOffer[];
    SingleItemOffersRemainingDurationInSeconds: number;
  };
  UpgradeCurrencyStore: {
    UpgradeCurrencyOffers: {
      /** UUID */
      OfferID: string;
      /** Item ID */
      StorefrontItemID: string;
      Offer: SingleItemStoreOffer;
      DiscountedPercent: number;
    }[];
  };
  AccessoryStore: {
    AccessoryStoreOffers: {
      Offer: SingleItemStoreOffer;
      /** UUID */
      ContractID: string;
    }[];
    AccessoryStoreRemainingDurationInSeconds: number;
    /** UUID */
    StorefrontID: string;
  };
  /** Night market */
  BonusStore?: {
    BonusStoreOffers: {
      /** UUID */
      BonusOfferID: string;
      Offer: SingleItemStoreOffer;
      DiscountPercent: number;
      DiscountCosts: {
        [x: string]: number;
      };
      IsSeen: boolean;
    }[];
    BonusStoreRemainingDurationInSeconds: number;
  } | undefined;
};

export type SingleItemStoreOffer = {
  OfferID: string;
  IsDirectPurchase: boolean;
  /** Date in ISO 8601 format */
  StartDate: string;
  Cost: {
    [x: string]: number;
  };
  Rewards: {
    /** Item Type ID */
    ItemTypeID: string;
    /** Item ID */
    ItemID: string;
    Quantity: number;
  }[];
}

export type EsportSchedulesResponse = {
  EventScheduleList: {
    LeagueID: string
    LeagueName: string
    LeagueSlug: string
    TournamentID: string
    TournamentName: string
    TournamentSlug: string
    TournamentState: string
    StartTime: string
    EndTime: string
    Matches: {
      ID: string
      StartTime: string
      StageName: string
      StageSlug: string
      Stage: string
      Status: string
      StructuralID: string
      Destinations: {
        Win: {
          StructuralID: string
          Type: string
          Slot: number
        }
        Loss: {
          StructuralID: string
          Type: string
          Slot: number
        }
      }
      Teams: {
        ID: string
        Name: string
        Code: string
        CodeSanitized: string
        ImageURL: string
        ImageLowResURL: string
        ImageHighResURL: string
        AlternativeImageURL: string
        BackgroundImageURL: string
        PrimaryColor: string
        SecondaryColor: string
        MatchOutcome: {
          MatchID: string
          TeamID: string
          Outcome: string
          GameWins: number
        }
        Origin: {
          StructuralID: string
          Type: string
          Slot: number
        }
        Players: object
        Record: {
          Wins: number
          Losses: number
          Ties: number
        }
        HomeLeague: {
          ID: string
          Name: string
          ImageURL: string
          Region: string
        }
        BundleID: string
      }[]
      Games: {
        ID: string
        Number: number
        VODs: {
          ID: string
          Locale: string
          ProviderURL: string
        }[]
      }[]
      Streams?: {
        ID: string
        Locale: string
        ProviderURL: string
        MediaLocale: {
          Locale: string
          EnglishName: string
          TranslatedName: string
        }
      }[]
    }[]
  }[]
}

export type EsportEventsResponse = {
  Data: {
    Events: {
      LeagueID: string
      LeagueName: string
      LeagueSlug: string
      TournamentID: string
      TournamentName: string
      TournamentSlug: string
      TournamentState: string
      StartTime: string
      EndTime: string
      Matches: {
        ID: string
        StartTime: string
        StageName: string
        StageSlug: string
        Stage: string
        Status: string
        StructuralID: string
        Destinations: {
          Win: {
            StructuralID: string
            Type: string
            Slot: number
          }
          Loss: {
            StructuralID: string
            Type: string
            Slot: number
          }
        }
        Teams: {
          ID: string
          Name: string
          Code: string
          CodeSanitized: string
          ImageURL: string
          ImageLowResURL: string
          ImageHighResURL: string
          AlternativeImageURL: string
          BackgroundImageURL: string
          PrimaryColor: string
          SecondaryColor: string
          MatchOutcome: {
            MatchID: string
            TeamID: string
            Outcome: string
            GameWins: number
          }
          Origin: {
            StructuralID: string
            Type: string
            Slot: number
          }
          Players: object
          Record: {
            Wins: number
            Losses: number
            Ties: number
          }
          HomeLeague: {
            ID: string
            Name: string
            ImageURL: string
            Region: string
          }
          BundleID: string
        }[]
        Games: {
          ID: string
          Number: number
          VODs: {
            ID: string
            Locale: string
            ProviderURL: string
          }[]
        }[]
        Streams: object
      }[]
    }
    Standings: {
      ID: string
      Name: string
      StartTime: string
      EndTime: string
      TournamentSections: object
      TournamentSectionsV2: {
        playoffs: EsportEventStage
        swiss?: EsportEventStage
        group_a?: EsportEventStage
        group_b?: EsportEventStage
        group_c?: EsportEventStage
        play_in_groups?: EsportEventStage
        group_d?: EsportEventStage
      }
    }
    Teams: {
      Teams: {
        ID: string
        Name: string
        Code: string
        CodeSanitized: string
        ImageURL: string
        ImageLowResURL: string
        ImageHighResURL: string
        AlternativeImageURL: string
        BackgroundImageURL: string
        PrimaryColor: string
        SecondaryColor: string
        MatchOutcome: {
          MatchID: string
          TeamID: string
          Outcome: string
          GameWins: number
        }
        Origin: {
          StructuralID: string
          Type: string
          Slot: number
        }
        Players: {
          ID: string
          SummonerName: string
          Handle: string
          FirstName: string
          LastName: string
          Image: string
          Status: string
          Roles: {
            Type: string
            Name: string
          }[]
        }[]
        Record: {
          Wins: number
          Losses: number
          Ties: number
        }
        HomeLeague: {
          ID: string
          Name: string
          ImageURL: string
          Region: string
        }
        BundleID: string
      }[]
    }
  }[]
}

export type EsportEventStage = {
  ID: string
  StageIndex: number
  SectionIndex: number
  LeagueID: string
  Name: string
  StageName: string
  StageSlug: string
  Matches: {
    ID: string
    StartTime: string
    StageName: string
    StageSlug: string
    Stage: string
    Status: string
    StructuralID: string
    Destinations: {
      Win: {
        StructuralID: string
        Type: string
        Slot: number
      }
      Loss: {
        StructuralID: string
        Type: string
        Slot: number
      }
    }
    Teams: {
      ID: string
      Name: string
      Code: string
      CodeSanitized: string
      ImageURL: string
      ImageLowResURL: string
      ImageHighResURL: string
      AlternativeImageURL: string
      BackgroundImageURL: string
      PrimaryColor: string
      SecondaryColor: string
      MatchOutcome: {
        MatchID: string
        TeamID: string
        Outcome: string
        GameWins: number
      }
      Origin: {
        StructuralID: string
        Type: string
        Slot: number
      }
      Players: {
        ID: string
        SummonerName: string
        Handle: string
        FirstName: string
        LastName: string
        Image: string
        Status: string
        Roles: {
          Type: string
          Name: string
        }[]
      }[]
      Record: {
        Wins: number
        Losses: number
        Ties: number
      }
      HomeLeague: {
        ID: string
        Name: string
        ImageURL: string
        Region: string
      }
      BundleID: string
    }[]
    Games: object
    Streams: object
  }[]
  Type: string
  Standing: {
    Group?: {
      ID: string
      Name: string
      Rankings: {
        Rank: number
        Teams: {
          ID: string
          Name: string
          Code: string
          CodeSanitized: string
          ImageURL: string
          ImageLowResURL: string
          ImageHighResURL: string
          AlternativeImageURL: string
          BackgroundImageURL: string
          PrimaryColor: string
          SecondaryColor: string
          MatchOutcome: {
            MatchID: string
            TeamID: string
            Outcome: string
            GameWins: number
          }
          Origin: {
            StructuralID: string
            Type: string
            Slot: number
          }
          Players: object
          Record: {
            Wins: number
            Losses: number
            Ties: number
          }
          HomeLeague: {
            ID: string
            Name: string
            ImageURL: string
            Region: string
          }
          BundleID: string
        }[]
      }[]
    }
    Bracket?: {
      Columns: {
        Cells: {
          Stage: string
          Type: string
          RoundNumber: number
          MatchIDs: string[]
        }[]
      }[]
    }
  }
}

export type EsportPickemLeaguesResponse = {
  PickemLeagues: {
    LeagueID: string
    EldsLeagueID: string
    Tournament: {
      ID: string
      EldsTournamentID: string
      LeagueID: string
      PickBlocks: {
        ID: string
        EldsTournamentID: string
        Slug: {
          Slug: string
          Localizations: object
        }
        PickOpenTime: string
        PickCloseTime: string
        State: string
        OpenLevel: string
        BlockType: string
        PickBlockElements: {
          ID: string
          PickBlockID: string
          Section: {
            ID: string
            EldsSectionID: string
            CorrectPick: {
              Entries: object
            }
          }
          Match: {
            ID: string
            EldsMatchID: string
            BaselinePoints: number
            CorrectPick: string
            ResultState: string
          }
          PickOpenTime: string
          PickCloseTime: string
          State: string
          DisplayOrder: number
        }[]
        CompletionStatus: string
      }[]
      Participants: {
        ID: string
        EldsTeamID: string
      }[]
    }
    Published: boolean
  }[]
}

export type EsportPickemRewardsResponse = {
  Rewards: {
    ItemID: string
    ItemTypeID: string
  }[]
}

export type EsportPickemLeaderboardResponse = {
  Standings: {
    Rank: number
    Name: string
    ID: string
    Points: number
  }[]
}

export type EsportPickemSectionResponse = {
  PickBlockID: string
  SectionPicks: {
    EldsSectionID: string
    Lineup: {
      Entries: {
        Index: number
        Correctness: string
        ParticipantID: string
        Points: number
        Rank: number
      }[]
    }
    PickType: string
    Result: {
      Correctness: string
      TotalAwardedPoints: number
      TotalPossiblePoints: number
      PerfectPickPoints: number
      Entries: {
        Index: number
        Correctness: string
        ParticipantID: string
        Points: number
        Rank: number
      }[]
    }
  }[] | null
}

export type EsportPickemBracketResponse = {
  PickBlockID: string
  PlayerName: string
  Picks: unknown
  MatchPicks: unknown[]
  Score: number
}

export type PregamePlayerResponse = {
  Subject: string;
  MatchID: string;
  Version: number;
}

export type PregameMatchResponse = {
  ID: string;
  Version: number;
  Teams: {
    TeamID: ("Blue" | "Red") | string;
    Players: {
      Subject: string;
      CharacterID: string;
      CharacterSelectionState: "" | "selected" | "locked";
      PregamePlayerState: "joined";
      CompetitiveTier: number;
      PlayerIdentity: {
        Subject: string;
        PlayerCardID: string;
        PlayerTitleID: string;
        AccountLevel: number;
        PreferredLevelBorderID: string | "";
        Incognito: boolean;
        HideAccountLevel: boolean;
      };
      SeasonalBadgeInfo: {
        SeasonID: string | "";
        NumberOfWins: number;
        WinsByTier: null;
        Rank: number;
        LeaderboardRank: number;
      };
      IsCaptain: boolean;
    }[];
  }[];
  AllyTeam: {
    TeamID: ("Blue" | "Red") | string;
    Players: {
      Subject: string;
      CharacterID: string;
      CharacterSelectionState: "" | "selected" | "locked";
      PregamePlayerState: "joined";
      CompetitiveTier: number;
      PlayerIdentity: {
        Subject: string;
        PlayerCardID: string;
        PlayerTitleID: string;
        AccountLevel: number;
        PreferredLevelBorderID: string | "";
        Incognito: boolean;
        HideAccountLevel: boolean;
      };
      SeasonalBadgeInfo: {
        SeasonID: string | "";
        NumberOfWins: number;
        WinsByTier: null;
        Rank: number;
        LeaderboardRank: number;
      };
      IsCaptain: boolean;
    }[];
  } | null;
  EnemyTeam: {
    TeamID: ("Blue" | "Red") | string;
    Players: {
      Subject: string;
      CharacterID: string;
      CharacterSelectionState: "" | "selected" | "locked";
      PregamePlayerState: "joined";
      CompetitiveTier: number;
      PlayerIdentity: {
        Subject: string;
        PlayerCardID: string;
        PlayerTitleID: string;
        AccountLevel: number;
        PreferredLevelBorderID: string | "";
        Incognito: boolean;
        HideAccountLevel: boolean;
      };
      SeasonalBadgeInfo: {
        SeasonID: string | "";
        NumberOfWins: number;
        WinsByTier: null;
        Rank: number;
        LeaderboardRank: number;
      };
      IsCaptain: boolean;
    }[];
  } | null;
  ObserverSubjects: unknown[];
  MatchCoaches: unknown[];
  EnemyTeamSize: number;
  EnemyTeamLockCount: number;
  PregameState: "character_select_active" | "provisioned";
  /** Date in ISO 8601 format */
  LastUpdated: string;
  MapID: string;
  MapSelectPool: unknown[];
  BannedMapIDs: unknown[];
  CastedVotes?: unknown;
  MapSelectSteps: unknown[];
  MapSelectStep: number;
  Team1: ("Blue" | "Red") | string;
  GamePodID: string;
  Mode: string;
  VoiceSessionID: string;
  MUCName: string;
  TeamMatchToken: string;
  QueueID: string | "";
  ProvisioningFlowID: "Matchmaking" | "CustomGame";
  IsRanked: boolean;
  PhaseTimeRemainingNS: number;
  StepTimeRemainingNS: number;
  altModesFlagADA: boolean;
  TournamentMetadata: null;
  RosterMetadata: null;
}

export type PregameLoadoutsResponse = {
  Loadouts: GamePlayerLoadout[];
  LoadoutsValid: boolean;
};

export type PregameResponse = {
  match: PregameMatchResponse,
  loadouts: PregameLoadoutsResponse,
}

export type CurrentGamePlayerResponse = PregamePlayerResponse

export type CurrentGameMatchResponse = {
  MatchID: string;
  Version: number;
  State: "IN_PROGRESS";
  MapID: string;
  ModeID: string;
  ProvisioningFlow: "Matchmaking" | "CustomGame";
  GamePodID: string;
  /** Chat room ID for "all" chat */
  AllMUCName: string;
  /** Chat room ID for "team" chat */
  TeamMUCName: string;
  TeamVoiceID: string;
  /** JWT containing match ID, participant IDs, and match region */
  TeamMatchToken: string;
  IsReconnectable: boolean;
  ConnectionDetails: {
    GameServerHosts: string[];
    GameServerHost: string;
    GameServerPort: number;
    GameServerObfuscatedIP: number;
    GameClientHash: number;
    PlayerKey: string;
  };
  PostGameDetails: null;
  Players: {
    Subject: string;
    TeamID: ("Blue" | "Red") | string;
    CharacterID: string;
    PlayerIdentity: {
      Subject: string;
      PlayerCardID: string;
      PlayerTitleID: string;
      AccountLevel: number;
      PreferredLevelBorderID: string | "";
      Incognito: boolean;
      HideAccountLevel: boolean;
    };
    SeasonalBadgeInfo: {
      SeasonID: string | "";
      NumberOfWins: number;
      WinsByTier: null;
      Rank: number;
      LeaderboardRank: number;
    };
    IsCoach: boolean;
    IsAssociated: boolean;
    PlatformType: string,
  }[];
  MatchmakingData: {
    "QueueID": string,
    "IsRanked": boolean,
  } | null;
}

export type CurrentGameLoadoutsResponse = {
  Loadouts: {
    CharacterID: string;
    Loadout: GamePlayerLoadout;
  }[];
};

export type CurrentGameResponse = {
  match: CurrentGameMatchResponse,
  loadouts: CurrentGameLoadoutsResponse,
}

export type GamePlayerLoadout = {
  Subject: string;
  Sprays: {
    SpraySelections: {
      SocketID: string;
      SprayID: string;
      LevelID: string;
    }[];
  };
  Expressions: {
    AESSelections: {
      SocketID: string;
      AssetID: string;
      TypeID: string;
    }[];
  };
  Items: {
    [x: string]: {
      ID: string;
      TypeID: string;
      Sockets: {
        [x: string]: {
          ID: string;
          Item: {
            ID: string;
            TypeID: string;
          };
        };
      };
    };
  };
}

export type LivePlayer = {
  Subject: string;
  DisplayName: string;
  GameName: string,
  TagLine: string,
  CharacterID: string;
  TeamID: ("Blue" | "Red") | string;
  PlayerIdentity: {
    Subject: string;
    PlayerCardID: string;
    PlayerTitleID: string;
    AccountLevel: number;
    PreferredLevelBorderID: string | "";
    Incognito: boolean;
    HideAccountLevel: boolean;
  };
  SeasonalBadgeInfo: {
    SeasonID: string | "";
    NumberOfWins: number;
    WinsByTier: null;
    Rank: number;
    LeaderboardRank: number;
  };
  Loadout?: GamePlayerLoadout;
}

export type CompetitiveUpdatesResponse = {
  Version: number;
  Subject: string;
  Matches: {
    MatchID: string;
    MapID: string;
    SeasonID: string;
    /** Milliseconds since epoch */
    MatchStartTime: number;
    TierAfterUpdate: number;
    TierBeforeUpdate: number;
    RankedRatingAfterUpdate: number;
    RankedRatingBeforeUpdate: number;
    RankedRatingEarned: number;
    RankedRatingPerformanceBonus: number;
    CompetitiveMovement: "MOVEMENT_UNKNOWN" | string;
    AFKPenalty: number;
  }[];
};

export type NameServiceResponse = {
  DisplayName: string;
  Subject: string;
  GameName: string;
  TagLine: string;
}[];

export type PartyPlayerResponse = {
  Subject: string;
  Version: number;
  CurrentPartyID: string;
  Invites: null;
  Requests: {
    ID: string;
    PartyID: string;
    RequestedBySubject: string;
    Subjects: string[];
    /** Date in ISO 8601 format */
    CreatedAt: string;
    /** Date in ISO 8601 format */
    RefreshedAt: string;
    ExpiresIn: number;
  }[];
  PlatformInfo: {
    platformType: "PC";
    platformOS: "Windows";
    platformOSVersion: string;
    platformChipset: "Unknown";
  };
};

export type PartyMember = {
  Subject: string;
  CompetitiveTier: number;
  PlayerIdentity: {
    Subject: string;
    PlayerCardID: string;
    PlayerTitleID: string;
    AccountLevel: number;
    PreferredLevelBorderID: string | "";
    Incognito: boolean;
    HideAccountLevel: boolean;
  };
  SeasonalBadgeInfo: null;
  IsOwner?: boolean | undefined;
  QueueEligibleRemainingAccountLevels: number;
  Pings: {
    Ping: number;
    GamePodID: string;
  }[];
  IsReady: boolean;
  IsModerator: boolean;
  UseBroadcastHUD: boolean;
  PlatformType: "PC";
}

export type PartyResponse = {
  ID: string;
  MUCName: string;
  VoiceRoomID: string;
  Version: number;
  ClientVersion: string;
  Members: PartyMember[];
  State: string;
  PreviousState: string;
  StateTransitionReason: string;
  Accessibility: "OPEN" | "CLOSED";
  CustomGameData: {
    Settings: {
      Map: string;
      Mode: string;
      UseBots: boolean;
      GamePod: string;
      GameRules: {
        AllowGameModifiers?: string | undefined;
        IsOvertimeWinByTwo?: string | undefined;
        PlayOutAllRounds?: string | undefined;
        SkipMatchHistory?: string | undefined;
        TournamentMode?: string | undefined;
      } | null;
    };
    Membership: {
      teamOne: {
        Subject: string;
      }[] | null;
      teamTwo: {
        Subject: string;
      }[] | null;
      teamSpectate: {
        Subject: string;
      }[] | null;
      teamOneCoaches: {
        Subject: string;
      }[] | null;
      teamTwoCoaches: {
        Subject: string;
      }[] | null;
    };
    MaxPartySize: number;
    AutobalanceEnabled: boolean;
    AutobalanceMinPlayers: number;
    HasRecoveryData: boolean;
  };
  MatchmakingData: {
    QueueID: string;
    PreferredGamePods: string[];
    SkillDisparityRRPenalty: number;
  };
  Invites: null;
  Requests: unknown[];
  /** Date in ISO 8601 format */
  QueueEntryTime: string;
  ErrorNotification: {
    ErrorType: string;
    ErroredPlayers: {
      Subject: string;
    }[] | null;
  };
  RestrictedSeconds: number;
  EligibleQueues: string[];
  QueueIneligibilities: string[];
  CheatData: {
    GamePodOverride: string;
    ForcePostGameProcessing: boolean;
  };
  XPBonuses: unknown[];
  InviteCode: string;
};

export type SessionResponse = {
  subject: string
  cxnState: string
  cxnCloseReason: string
  clientID: string
  clientVersion: string
  loopState: string
  loopStateMetadata: string
  version: number
  lastHeartbeatTime: string
  expiredTime: string
  heartbeatIntervalMillis: number
  playtimeNotification: string
  playtimeMinutes: number
  isRestricted: boolean
  userinfoValidTime: string
  restrictionType: string
  clientPlatformInfo: {
    platformType: string
    platformOS: string
    platformOSVersion: string
    platformChipset: string
    platformDevice: string
  }
  connectionTime: string
  shouldForceInvalidate: boolean
}

export type MatchHistoryResponse = {
  Subject: string;
  BeginIndex: number;
  EndIndex: number;
  Total: number;
  History: {
    MatchID: string;
    GameStartTime: number;
    QueueID: string;
  }[];
};
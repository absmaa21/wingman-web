export type ValorantAssetsAgent = {
  uuid: string;
  displayName: string;
  description: string;
  developerName: string;
  characterTags: string[] | null;
  displayIcon: string;
  displayIconSmall: string;
  bustPortrait: null | string;
  fullPortrait: null | string;
  fullPortraitV2: null | string;
  killfeedPortrait: string;
  background: null | string;
  backgroundGradientColors: string[];
  assetPath: string;
  isFullPortraitRightFacing: boolean;
  isPlayableCharacter: boolean;
  isAvailableForTest: boolean;
  isBaseContent: boolean;
  role: {
    uuid: string;
    displayName: 'Controller' | 'Duelist' | 'Initiator' | 'Sentinel';
    description: string;
    displayIcon: string;
    assetPath: string;
  } | null;
  recruitmentData: {
    counterId: string;
    milestoneId: string;
    milestoneThreshold: number;
    useLevelVpCostOverride: boolean;
    levelVpCostOverride: number;
    startDate: Date;
    endDate: Date;
  } | null;
  abilities: {
    slot: 'Ability1' | 'Ability2' | 'Grenade' | 'Passive' | 'Ultimate';
    displayName: string;
    description: string;
    displayIcon: null | string;
  }[];
  voiceLine: null;
}

export type ValorantAssetsMap = {
  uuid: string;
  displayName: string;
  narrativeDescription: null;
  tacticalDescription: 'A/B Sites' | 'A/B/C Sites' | string | null;
  coordinates: null | string;
  displayIcon: null | string;
  listViewIcon: string;
  listViewIconTall: null | string;
  splash: string;
  stylizedBackgroundImage: null | string;
  premierBackgroundImage: null | string;
  assetPath: string;
  mapUrl: string;
  xMultiplier: number;
  yMultiplier: number;
  xScalarToAdd: number;
  yScalarToAdd: number;
  callouts: {
    regionName: string;
    superRegionName: 'A' | 'B' | 'C' | 'Attacker Side' | 'Defender Side' | string;
    location: { x: number, y: number };
  }[] | null;
}

export type ValorantAssetsTitle = {
  uuid: string;
  displayName: null | string;
  titleText: null | string;
  isHiddenIfNotOwned: boolean;
  assetPath: string;
}

export type ValorantAssetsSeason = {
  uuid: string;
  displayName: string;
  title: null | string;
  type: 'EAresSeasonType::Act' | string | null;
  startTime: Date;
  endTime: Date;
  parentUuid: null | string;
  assetPath: string;
}

export type ValorantAssetsWeapon = {
  uuid: string;
  displayName: string;
  category: string;
  defaultSkinUuid: string;
  displayIcon: string;
  killStreamIcon: string;
  assetPath: string;
  weaponStats: {
    fireRate: number;
    magazineSize: number;
    runSpeedMultiplier: number;
    equipTimeSeconds: number;
    reloadTimeSeconds: number;
    firstBulletAccuracy: number;
    shotgunPelletCount: number;
    wallPenetration: 'EWallPenetrationDisplayType::High' | 'EWallPenetrationDisplayType::Medium' | 'EWallPenetrationDisplayType::Low';
    feature: null | string;
    fireMode: null | string;
    altFireType: 'EWeaponAltFireDisplayType::ADS' | 'EWeaponAltFireDisplayType::AirBurst' | 'EWeaponAltFireDisplayType::Shotgun' | null;
    adsStats: {
      zoomMultiplier: number;
      fireRate: number;
      runSpeedMultiplier: number;
      burstCount: number;
      firstBulletAccuracy: number;
    } | null;
    altShotgunStats: {
      shotgunPelletCount: number;
      burstRate: number;
    } | null;
    airBurstStats: {
      shotgunPelletCount: number;
      burstDistance: number;
    } | null;
    damageRanges: {
      rangeStartMeters: number;
      rangeEndMeters: number;
      headDamage: number;
      bodyDamage: number;
      legDamage: number;
    }[];
  } | null;
  shopData: {
    cost: number;
    category: string;
    shopOrderPriority: number;
    categoryText: string;
    gridPosition: { row: number, column: number } | null;
    canBeTrashed: boolean;
    image: null;
    newImage: string;
    newImage2: null;
    assetPath: string;
  } | null;
  skins: ValorantAssetsSkin[];
}

export type ValorantAssetsSkin = {
  uuid: string;
  displayName: string;
  themeUuid: string;
  contentTierUuid: null | string;
  displayIcon: null | string;
  wallpaper: null | string;
  assetPath: string;
  chromas: ValorantAssetsSkinChroma[];
  levels: ValorantAssetsSkinLevel[];
}

export type ValorantAssetsSkinChroma = {
  uuid: string;
  displayName: string;
  displayIcon: null | string;
  fullRender: string;
  swatch: null | string;
  streamedVideo: null | string;
  assetPath: string;
}

export type ValorantAssetsSkinLevel = {
  uuid: string;
  displayName: string;
  levelItem: string | null; // .split('::')[1] for text
  displayIcon: null | string;
  streamedVideo: null | string;
  assetPath: string;
}

export type ValorantAssetsVersion = {
  manifestId: string;
  branch: string;
  version: string;
  buildVersion: string;
  engineVersion: string;
  riotClientVersion: string;
  riotClientBuild: string;
  buildDate: Date;
}

export type ValorantAssetsGameMode = {
  uuid: string;
  displayName: string;
  description: null | string;
  duration: null | string;
  economyType: null | string;
  allowsMatchTimeouts: boolean;
  isTeamVoiceAllowed: boolean;
  isMinimapHidden: boolean;
  orbCount: number;
  roundsPerHalf: number;
  teamRoles: string[] | null;
  gameFeatureOverrides: {
    featureName: string;
    state: boolean;
  }[] | null;
  gameRuleBoolOverrides: {
    ruleName: string;
    state: boolean;
  }[] | null;
  displayIcon: null | string;
  listViewIconTall: null | string;
  assetPath: string;
}

export type ValorantAssetsBundle = {
  uuid: string;
  displayName: string;
  displayNameSubText: "CAPSULE" | "NOW AVAILABLE" | "COLLECTOR'S SET" | null;
  description: string;
  extraDescription: null | string;
  promoDescription: null | string;
  useAdditionalContext: boolean;
  displayIcon: string;
  displayIcon2: string;
  logoIcon: null | string;
  verticalPromoImage: null | string;
  assetPath: string;
}

export type ValorantAssetsBuddie = {
  uuid: string;
  displayName: string;
  isHiddenIfNotOwned: boolean;
  themeUuid: null | string;
  displayIcon: string;
  assetPath: string;
  levels: {
    uuid: string;
    charmLevel: number;
    hideIfNotOwned: boolean;
    displayName: string;
    displayIcon: string;
    assetPath: string;
  }[];
}

export type ValorantAssetsPlayerCard = {
  uuid: string;
  displayName: string;
  isHiddenIfNotOwned: boolean;
  themeUuid: null | string;
  displayIcon: string;
  smallArt: string;
  wideArt: string;
  largeArt: string;
  assetPath: string;
}

export type ValorantAssetsSpray = {
  uuid: string;
  displayName: string;
  category: "EAresSprayCategory::Contextual" | string | null;
  themeUuid: null | string;
  isNullSpray: boolean;
  hideIfNotOwned: boolean;
  displayIcon: string;
  fullIcon: null | string;
  fullTransparentIcon: null | string;
  animationPng: null | string;
  animationGif: null | string;
  assetPath: string;
  levels: {
    uuid: string;
    sprayLevel: number;
    displayName: string;
    displayIcon: null | string;
    assetPath: string;
  }[];
}

type ValorantAssets = {
  agents: ValorantAssetsAgent[],
  buddies: ValorantAssetsBuddie[],
  bundles: ValorantAssetsBundle[],
  maps: ValorantAssetsMap[],
  gameModes: ValorantAssetsGameMode[],
  playerCards: ValorantAssetsPlayerCard[],
  titles: ValorantAssetsTitle[],
  seasons: ValorantAssetsSeason[],
  sprays: ValorantAssetsSpray[],
  weapons: ValorantAssetsWeapon[],
  version: ValorantAssetsVersion,
}

export default ValorantAssets
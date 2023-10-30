import type {
  DBStore,
  SessionStore,
  SUPPORTED_LANGUAGES,
} from './constants.js';
import type { TranslationKey } from './translations.js';

export interface SessionState {
  [SessionStore.TOKEN]?: TokenResponse;
  [SessionStore.AUTH_STATE]?: string;
}

export interface PersistentState {
  [DBStore.META]: {
    manifestUpdated: number;
    manifestLanguage: string;
  };
  [DBStore.MANIFEST]: ManifestResponse;
  [DBStore.ITEMS]: ItemsResponse;
  [DBStore.RECORDS]: RecordsResponse;
  [DBStore.PRESENTATION_NODES]: PresentationNodesResponse;
  [DBStore.EQUIPMENT_SLOT]: EquipmentSlotResponse;
  [DBStore.DAMAGE_TYPE]: DamageTypeResponse;
}

export interface StateContextValue {
  dbInitialized: boolean;
  language: SupportedLanguage;
  session: SessionState | null;
  persistent: PersistentState | null;
}

export enum APIErrorCode {
  Success = 1,
  Unknown = 0,
}

export enum APIErrorStatus {
  Success = 'Success',
}

export interface APISuccessResponse<T> {
  ErrorCode: APIErrorCode.Success;
  ErrorStatus: APIErrorStatus.Success;
  ThrottleSeconds: number;
  Message: string;
  MessageData: unknown;
  Response: T;
}

export interface APIErrorResponse {
  ErrorCode: APIErrorCode.Unknown;
  ErrorStatus: APIErrorStatus;
  ThrottleSeconds: number;
  Message: string;
  MessageData: unknown;
}

export type APIResponse<T> = APISuccessResponse<T> | APIErrorResponse;

export interface WorldComponentContentPaths {
  DestinyAchievementDefinition: string;
  DestinyActivityDefinition: string;
  DestinyActivityGraphDefinition: string;
  DestinyActivityInteractableDefinition: string;
  DestinyActivityModeDefinition: string;
  DestinyActivityModifierDefinition: string;
  DestinyActivityTypeDefinition: string;
  DestinyArtDyeChannelDefinition: string;
  DestinyArtDyeReferenceDefinition: string;
  DestinyArtifactDefinition: string;
  DestinyBondDefinition: string;
  DestinyBreakerTypeDefinition: string;
  DestinyCharacterCustomizationCategoryDefinition: string;
  DestinyCharacterCustomizationOptionDefinition: string;
  DestinyChecklistDefinition: string;
  DestinyClassDefinition: string;
  DestinyCollectibleDefinition: string;
  DestinyDamageTypeDefinition: string;
  DestinyDestinationDefinition: string;
  DestinyEnergyTypeDefinition: string;
  DestinyEntitlementOfferDefinition: string;
  DestinyEquipmentSlotDefinition: string;
  DestinyEventCardDefinition: string;
  DestinyFactionDefinition: string;
  DestinyGenderDefinition: string;
  DestinyGuardianRankConstantsDefinition: string;
  DestinyGuardianRankDefinition: string;
  DestinyInventoryBucketDefinition: string;
  DestinyInventoryItemDefinition: string;
  DestinyInventoryItemLiteDefinition: string;
  DestinyItemCategoryDefinition: string;
  DestinyItemTierTypeDefinition: string;
  DestinyLoadoutColorDefinition: string;
  DestinyLoadoutConstantsDefinition: string;
  DestinyLoadoutIconDefinition: string;
  DestinyLoadoutNameDefinition: string;
  DestinyLocationDefinition: string;
  DestinyLoreDefinition: string;
  DestinyMaterialRequirementSetDefinition: string;
  DestinyMedalTierDefinition: string;
  DestinyMetricDefinition: string;
  DestinyMilestoneDefinition: string;
  DestinyNodeStepSummaryDefinition: string;
  DestinyObjectiveDefinition: string;
  DestinyPlaceDefinition: string;
  DestinyPlatformBucketMappingDefinition: string;
  DestinyPlugSetDefinition: string;
  DestinyPowerCapDefinition: string;
  DestinyPresentationNodeDefinition: string;
  DestinyProgressionDefinition: string;
  DestinyProgressionLevelRequirementDefinition: string;
  DestinyProgressionMappingDefinition: string;
  DestinyRaceDefinition: string;
  DestinyRecordDefinition: string;
  DestinyReportReasonCategoryDefinition: string;
  DestinyRewardAdjusterPointerDefinition: string;
  DestinyRewardAdjusterProgressionMapDefinition: string;
  DestinyRewardItemListDefinition: string;
  DestinyRewardMappingDefinition: string;
  DestinyRewardSheetDefinition: string;
  DestinyRewardSourceDefinition: string;
  DestinySackRewardItemListDefinition: string;
  DestinySandboxPatternDefinition: string;
  DestinySandboxPerkDefinition: string;
  DestinySeasonDefinition: string;
  DestinySeasonPassDefinition: string;
  DestinySocialCommendationDefinition: string;
  DestinySocialCommendationNodeDefinition: string;
  DestinySocketCategoryDefinition: string;
  DestinySocketTypeDefinition: string;
  DestinyStatDefinition: string;
  DestinyStatGroupDefinition: string;
  DestinyTalentGridDefinition: string;
  DestinyTraitDefinition: string;
  DestinyUnlockCountMappingDefinition: string;
  DestinyUnlockDefinition: string;
  DestinyUnlockEventDefinition: string;
  DestinyUnlockExpressionMappingDefinition: string;
  DestinyUnlockValueDefinition: string;
  DestinyVendorDefinition: string;
  DestinyVendorGroupDefinition: string;
}

export enum MembershipType {
  None = 0,
  TigerXbox = 1,
  TigerPsn = 2,
  TigerSteam = 3,
  TigerBlizzard = 4,
  TigerStadia = 5,
  TigerEgs = 6,
  TigerDemon = 10,
  BungieNext = 254,
  All = -1,
}

export interface ManifestResponse {
  version: string;
  jsonWorldComponentContentPaths: Record<
    SupportedLanguage,
    WorldComponentContentPaths
  > & {
    en: WorldComponentContentPaths;
  };
}

export enum ItemType {
  None = 0,
  Currency = 1,
  Armor = 2,
  Weapon = 3,
  Message = 7,
  Engram = 8,
  Consumable = 9,
  ExchangeMaterial = 10,
  MissionReward = 11,
  QuestStep = 12,
  QuestStepComplete = 13,
  Emblem = 14,
  Quest = 15,
  Subclass = 16,
  ClanBanner = 17,
  Aura = 18,
  Mod = 19,
  Dummy = 20,
  Ship = 21,
  Vehicle = 22,
  Emote = 23,
  Ghost = 24,
  Package = 25,
  Bounty = 26,
  Wrapper = 27,
  SeasonalArtifact = 28,
  Finisher = 29,
  Pattern = 30,
}

export enum ItemSubType {
  None = 0,
  Crucible = 1,
  // DEPRECATED. Items can be both "Crucible" and something else interesting.
  Vanguard = 2,
  // DEPRECATED. An item can both be "Vanguard" and something else.
  Exotic = 5,
  // DEPRECATED. An item can both be Exotic and something else.
  AutoRifle = 6,
  Shotgun = 7,
  Machinegun = 8,
  HandCannon = 9,
  RocketLauncher = 10,
  FusionRifle = 11,
  SniperRifle = 12,
  PulseRifle = 13,
  ScoutRifle = 14,
  Crm = 16,
  // DEPRECATED. An item can both be CRM and something else.
  Sidearm = 17,
  Sword = 18,
  Mask = 19,
  Shader = 20,
  Ornament = 21,
  FusionRifleLine = 22,
  GrenadeLauncher = 23,
  SubmachineGun = 24,
  TraceRifle = 25,
  HelmetArmor = 26,
  GauntletsArmor = 27,
  ChestArmor = 28,
  LegArmor = 29,
  ClassArmor = 30,
  Bow = 31,
  DummyRepeatableBounty = 32,
  Glaive = 33,
}

export enum ToastStyle {
  None = 0,
  Record = 1,
  Lore = 2,
  Badge = 3,
  MetaRecord = 4,
  MedalComplete = 5,
  SeasonChallengeComplete = 6,
  GildedTitleComplete = 7,
  CraftingRecipeUnlocked = 8,
  ToastGuardianRankDetails = 9,
}

export enum ComponentType {
  None = 0,
  Profiles = 100,
  VendorReceipts = 101,
  ProfileInventories = 102,
  ProfileCurrencies = 103,
  ProfileProgression = 104,
  PlatformSilver = 105,
  Characters = 200,
  CharacterInventories = 201,
  CharacterProgressions = 202,
  CharacterRenderData = 203,
  CharacterActivities = 204,
  CharacterEquipment = 205,
  CharacterLoadouts = 206,
  ItemInstances = 300,
  ItemObjectives = 301,
  ItemPerks = 302,
  ItemRenderData = 303,
  ItemStats = 304,
  ItemSockets = 305,
  ItemTalentGrids = 306,
  ItemCommonData = 307,
  ItemPlugStates = 308,
  ItemPlugObjectives = 309,
  ItemReusablePlugs = 310,
  Vendors = 400,
  VendorCategories = 401,
  VendorSales = 402,
  Kiosks = 500,
  CurrencyLookups = 600,
  PresentationNodes = 700,
  Collectibles = 800,
  Records = 900,
  Transitory = 1000,
  Metrics = 1100,
  StringVariables = 1200,
  Craftables = 1300,
  SocialCommendations = 1400,
}

export enum PresentationNodeType {
  Default = 0,
  Category = 1,
  Collectibles = 2,
  Records = 3,
  Metric = 4,
  Craftable = 5,
}

export enum DamageType {
  None = 0,
  Kinetic = 1,
  Arc = 2,
  Thermal = 3,
  Void = 4,
  Raid = 5,
  Stasis = 6,
  Strand = 7,
}

export enum AmmoType {
  None = 0,
  Primary = 1,
  Special = 2,
  Heavy = 3,
}

export interface PresentationNodeReference {
  presentationNodeHash: number;
  nodeDisplayPriority: number;
}

export interface RecordReference {
  recordHash: number;
  nodeDisplayPriority: number;
}

export interface PresentationNodeItemWithPresentationNodes {
  displayProperties: DisplayProperties;
  objectiveHash: number;
  hash: number;
  children: {
    presentationNodes: readonly PresentationNodeReference[];
    records: readonly never[];
  };
}

export interface PresentationNodeItemWithRecords
  extends Omit<PresentationNodeItemWithPresentationNodes, 'children'> {
  children: {
    presentationNodes: readonly never[];
    records: readonly RecordReference[];
  };
}

export type PresentationNodeItem =
  | PresentationNodeItemWithPresentationNodes
  | PresentationNodeItemWithRecords;

export interface DisplayPropertiesWithIcon {
  name: string;
  description: string;
  hasIcon: true;
  icon: string;
}

export interface DisplayPropertiesWithoutIcon {
  name: string;
  description: string;
  hasIcon: false;
}

export type DisplayProperties =
  | DisplayPropertiesWithIcon
  | DisplayPropertiesWithoutIcon;

export interface ItemCrafting {
  outputItemHash: number;
}

export interface DestinyItem {
  hash: number;
  collectibleHash?: number;
  itemType: ItemType;
  itemSubType: ItemSubType;
  itemTypeDisplayName: string;
  itemTypeAndTierDisplayName: string;
  displayProperties: DisplayProperties;
  flavorText: string;
  crafting?: ItemCrafting;
  equippingBlock?: {
    equipmentSlotTypeHash: number;
    ammoType: number;
  };
  defaultDamageType?: DamageType;
  defaultDamageTypeHash?: number;
}

export interface RecordItem {
  hash: number;
  displayProperties: DisplayProperties;
  objectiveHashes: readonly number[];
  completionInfo: {
    toastStyle: ToastStyle;
  };
  presentationNodeType: PresentationNodeType;
}

export interface ProfileRecordObjective {
  objectiveHash: number;
  progress: number;
  completionValue: number;
  complete: boolean;
  visible: boolean;
}

export interface ProfileRecord {
  state: number;
  objectives: readonly ProfileRecordObjective[];
}

export interface ProfileResponse {
  profileRecords: {
    data: {
      records: Record<string, ProfileRecord>;
    };
  };
}

export type ItemsResponse = Record<string, DestinyItem>;

export type RecordsResponse = Record<string, RecordItem>;

export type PresentationNodesResponse = Record<string, PresentationNodeItem>;

export enum TokenType {
  Bearer = 'Bearer',
}

export interface TokenResponse {
  access_token: string;
  token_type: TokenType;
  expires_in: number;
  membership_id: string;
}

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export interface LinkedProfile {
  membershipType: MembershipType;
  membershipId: string;
  displayName: string;
}

export interface LinkedProfilesResponse {
  profiles: readonly LinkedProfile[];
}

export interface PatternWithCompletion extends DestinyItem {
  complete?: boolean;
  objectives?: readonly ProfileRecordObjective[];
}

export interface WeaponSubGroup {
  key: string;
  items: readonly {
    patternHash: number;
    patternWithCompletion?: PatternWithCompletion;
  }[];
}

export interface WeaponGroup {
  key: TranslationKey;
  groups: readonly WeaponSubGroup[];
}

export type WeaponGroupings = readonly WeaponGroup[];

export interface EquipmentSlotItem {
  displayProperties: DisplayProperties;
  hash: number;
  index: number;
}

export type EquipmentSlotResponse = Record<string, EquipmentSlotItem>;

export interface DamageTypeItem {
  displayProperties: DisplayProperties;
  enumValue: DamageType;
  color: {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  };
  hash: number;
  index: number;
}

export type DamageTypeResponse = Record<string, DamageTypeItem>;

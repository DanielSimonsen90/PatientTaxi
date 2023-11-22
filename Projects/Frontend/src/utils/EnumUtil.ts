import { Role, CarHeight, Companion, Follow, HelpingUtil } from 'models/backend/common/enums';
import { Enum, EnumTypes } from 'types';

/**
 * Translate an enum value to a string
 * @param key Enum value to translate
 * @returns The translated enum value
 */
export const translateEnum = (key: Enum): string => {
  switch (key) {
    case Role.Citizen: return 'Borger';
    case Role.Admin: return 'Admin';

    case CarHeight.Any: return 'Alle';
    case CarHeight.Low: return 'Lav';
    case CarHeight.High: return 'Høj';

    case Companion.Alone: return 'Alene';
    case Companion.WithRelative: return 'Med pårørende';
    case Companion.WithHelper: return 'Med hjælper';
    case Companion.WithCompanion: return 'Med ledsager';
    case Companion.WithPet: return 'Med kæledyr';
    case Companion.WithChild: return 'Med barn';

    case Follow.No: return 'Nej';
    case Follow.AtDesitnation: return 'Ved destination';
    case Follow.AtPickup: return 'Ved afhentning';
    case Follow.Both: return 'Ved begge';

    case HelpingUtil.None: return 'Ingen';
    case HelpingUtil.WalkingStick: return 'Gangstok';
    case HelpingUtil.Crutches: return 'Krykker';
    case HelpingUtil.Rollator: return 'Rollator';
    case HelpingUtil.Wheelchair: return 'Kørestol';

    default: return 'Ukendt';
  }
};

/**
 * Revert an enum translation to an enum value
 * @param translation The enum translation to revert
 * @param enumType Type of enum to revert
 * @returns Enum value from the translation
 */
export const revertTranslationForEnum = (translation: string, enumType: EnumTypes): number => {
  const keys = Object.keys(enumType)
    .filter(key => !isNaN(Number(key)))
    .map(key => Number(key));
  const values = keys.map(key => translateEnum(key));
  const index = values.indexOf(translation);
  return keys[index];
};

/**
 * Get a list of enum values
 * @param enumType Enum type to get list from
 * @returns List of enum values
 */
export const getListFromEnum = (enumType: EnumTypes): number[] => {
  return Object.keys(enumType)
    .filter(key => !isNaN(Number(key)))
    .map(key => Number(key));
};
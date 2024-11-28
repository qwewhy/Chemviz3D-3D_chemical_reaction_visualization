// 导入所需的分子类 / Import required molecule classes
import { H2O } from "../../models/molecules/H2O";
import { H2 } from "../../models/molecules/H2";
import { NH3 } from "../../models/molecules/NH3";
import { NH3H2O } from "../../models/molecules/NH3H2O";
import { Cl2 } from "../../models/molecules/Cl2";
import { HClO } from "../../models/molecules/HClO";
import { HCl } from "../../models/molecules/HCl";
import { N2 } from "../../models/molecules/N2";
import { O2 } from "../../models/molecules/O2";
import { H2O2 } from "../../models/molecules/H2O2";
import { C } from "../../models/molecules/C";
import { H2CO3 } from "../../models/molecules/H2CO3";
import { NH4HCO3 } from "../../models/molecules/NH4HCO3";
// 分子类型配置-用于controls组件的按钮配置（分子类名，按钮背景颜色，i18n翻译键） 
// Molecule type configuration for controls component button configuration 
//(molecule class name, button background color, i18n translation key)
export const MOLECULE_TYPES = {
  WATER: {
    class: H2O,
    bgColor: "bg-green-500",
    translationKey: "simulator.controls.addWater"
  },
  HYDROGEN: {
    class: H2,
    bgColor: "bg-blue-500",
    translationKey: "simulator.controls.addHydrogen"
  },
  AMMONIA: {
    class: NH3,
    bgColor: "bg-purple-500",
    translationKey: "simulator.controls.addAmmonia"
  },
  AMMONIA_HYDRATE: {
    class: NH3H2O,
    bgColor: "bg-blue-500",
    translationKey: "simulator.controls.addAmmoniaHydrate"
  },
  CHLORINE: {
    class: Cl2,
    bgColor: "bg-red-500",
    translationKey: "simulator.controls.addChlorine"
  },
  HYPOCHLOROUS_ACID: {
    class: HClO,
    bgColor: "bg-orange-500",
    translationKey: "simulator.controls.addHypochlorousAcid"
  },
  HYDROCHLORIC_ACID: {
    class: HCl,
    bgColor: "bg-yellow-500",
    translationKey: "simulator.controls.addHydrochloricAcid"
  },
  NITROGEN: {
    class: N2,
    bgColor: "bg-gray-500",
    translationKey: "simulator.controls.addNitrogen"
  },
  OXYGEN: {
    class: O2,
    bgColor: "bg-blue-500",
    translationKey: "simulator.controls.addOxygen"
  },
  HYDROGEN_PEROXIDE: {
    class: H2O2,
    bgColor: "bg-purple-500",
    translationKey: "simulator.controls.addHydrogenPeroxide"
  },
  CARBON: {
    class: C,
    bgColor: "bg-gray-500",
    translationKey: "simulator.controls.addCarbon"
  },
  CARBONIC_ACID: {
    class: H2CO3,
    bgColor: "bg-gray-500",
    translationKey: "simulator.controls.addCarbonicAcid"
  },
  AMMONIUM_BICARBONATE: {
    class: NH4HCO3,
    bgColor: "bg-gray-500",
    translationKey: "simulator.controls.addAmmoniumBicarbonate"
  }
};  
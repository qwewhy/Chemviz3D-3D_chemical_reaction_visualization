/**
 * 原子属性常量定义
 * Atom property constants
 */

/**
 * 原子颜色映射表
 * Mapping table for atom colors
 */
export const ATOM_COLORS = {
  // 第一周期 / First period
  H: "#FFFFFF",  // 氢原子 - 白色 / Hydrogen - White
  
  // 第二周期 / Second period
  B: "#FFB5B5",  // 硼原子 - 浅粉色 / Boron - Light pink
  C: "#808080",  // 碳原子 - 灰色 / Carbon - Gray
  N: "#0000FF",  // 氮原子 - 蓝色 / Nitrogen - Blue
  O: "#FF0000",  // 氧原子 - 红色 / Oxygen - Red
  F: "#90E050",  // 氟原子 - 浅绿色 / Fluorine - Light green
  
  // 第三周期 / Third period
  P: "#FF8000",  // 磷原子 - 橙色 / Phosphorus - Orange
  S: "#FFFF30",  // 硫原子 - 黄色 / Sulfur - Yellow
  Cl: "#1FF01F", // 氯原子 - 绿色 / Chlorine - Green
  
  // 第四周期 / Fourth period
  Br: "#A62929", // 溴原子 - 棕红色 / Bromine - Brownish red
  
  // 第五周期 / Fifth period
  I: "#940094",  // 碘原子 - 紫色 / Iodine - Purple
  
  // 过渡金属 / Transition metals
  Fe: "#FFA500", // 铁原子 - 橙色 / Iron - Orange
  Cu: "#C88033", // 铜原子 - 铜色 / Copper - Copper
  Zn: "#7D80B0",  // 锌原子 - 蓝灰色 / Zinc - Blue-gray
  Hg: "#D4B454", // 汞原子 - 黄色 / Mercury - Yellow

  // 其它辅助元素 / Other auxiliary elements
  R: "#FF0000", // 有机官能团 红色 / Organic functional group - Red
  '+': "#00FF00", // 正电荷 绿色 / Positive charge - Green
  '-': "#0000FF", // 负电荷 蓝色 / Negative charge - Blue
  '?': "#CCCCCC", // 未知元素 灰色 / Unknown element - Gray
};


/**
 * 原子半径映射表
 * Mapping table for atom radii
 */
export const ATOM_RADIUS = {
  // 第一周期 / First period
  H: 0.30,   // 氢原子最小 / Hydrogen is the smallest
  
  // 第二周期 / Second period
  B: 0.85,   // 硼原子 / Boron
  C: 0.70,   // 碳原子标准大小 / Carbon is the standard size
  N: 0.65,   // 氮原子介于碳氧之间 / Nitrogen is between carbon and oxygen
  O: 0.60,   // 氧原子略小于碳 / Oxygen is slightly smaller than carbon
  F: 0.50,   // 氟原子最小的卤素 / Fluorine is the smallest halogen
  
  // 第三周期 / Third period
  Na: 1.80,  // 钠原子碱金属较大 / Sodium is a large alkali metal
  Mg: 1.50,  // 镁原子碱土金属 / Magnesium is an alkaline earth metal
  Al: 1.25,  // 铝原子金属 / Aluminum metal
  Si: 1.10,  // 硅原子介于金属与非金属之间 / Silicon is between metal and non-metal
  P: 1.00,   // 磷原子 / Phosphorus
  S: 1.00,   // 硫原子 / Sulfur
  Cl: 0.75,  // 氯原子 / Chlorine
  
  // 第四周期 / Fourth period
  K: 2.20,   // 钾原子最大的碱金属 / Potassium is the largest alkali metal
  Ca: 1.95,  // 钙原子碱土金属 / Calcium is an alkaline earth metal
  As: 1.15,  // 砷原子类金属 / Arsenic is a metalloid
  Se: 1.15,  // 硒原子与砷相近 / Selenium is similar to arsenic
  Br: 0.85,  // 溴原子 / Bromine
  
  // 第五周期 / Fifth period
  I: 0.98,   // 碘原子 / Iodine
  Pb: 1.75,  // 铅原子重金属 / Lead is a heavy metal
  
  // 过渡金属 / Transition metals
  Fe: 1.40,  // 铁原子 / Iron
  Cu: 1.35,  // 铜原子 / Copper
  Zn: 1.35,  // 锌原子 / Zinc
  Hg: 1.35,  // 汞原子 / Mercury

  // 其它辅助元素 / Other auxiliary elements
  R: 1.00,  // 有机官能团 / Organic functional group
  '+': 0.1, // 正电荷 / Positive charge
  '-': 0.1, // 负电荷 / Negative charge
  '?': 1.00, // 未知元素 / Unknown element
};
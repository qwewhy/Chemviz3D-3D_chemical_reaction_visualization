/**
 * @file useMolecule.js
 * @author1 [Hongyuan Wang] <HW8545626@gmail.com>
 * @copyright Copyright (c) 2024 [Hongyuan Wang]
 * @license MIT
 * @description This module implements the reaction rules configuration.
 */

/**
 * Chemical reaction rules configuration
 * 化学反应规则配置
 *
 * @typedef {Object} ReactionRule
 * @property {Object} reactants - Reactants and their quantities
 * @property {Object} products - Products and their quantities
 * @property {string} name - Reaction name
 */

export const reactionRules = [
  {
    reactants: { H2O: 1, NH3: 1 },
    products: { NH3H2O: 1 },
    name: "water and ammonia to ammonia hydrate",
  },
  {
    reactants: { H2O: 2, Cl2: 1 },
    products: { HClO: 2 },
    name: "water and chlorine to hypochlorous acid",
  },
  {
    reactants: { H2O: 1, HCl: 1 },
    products: { HClO: 1 },
    name: "water and hydrochloric acid to hypochlorous acid",
  },
  {
    reactants: { NH3: 2, Cl2: 3 },
    products: { N2: 1, HCl: 6 },
    name: "ammonia and chlorine to nitrogen and hydrochloric acid",
  },
  {
    reactants: { H2O: 2, O2: 1 },
    products: { H2O2: 2 },
    name: "water and oxygen to hydrogen peroxide",
  },
  {
    reactants: { H2: 2, O2: 1 },
    products: { H2O: 2 },
    name: "hydrogen and oxygen to water",
  },
  {
    reactants: { H2: 1, Cl2: 1 },
    products: { HCl: 2 },
    name: "hydrogen and chlorine to hydrogen chloride",
  },
  {
    reactants: { NH3: 1, HCl: 1 },
    products: { NH4Cl: 1 },
    name: "ammonia and hydrogen chloride to ammonium chloride",
  },
  {
    reactants: { H2O2: 1, Cl2: 1 },
    products: { HClO: 2, O2: 1 },
    name: "hydrogen peroxide and chlorine to hypochlorous acid and oxygen",
  },
  {
    reactants: { H2O2: 2 },
    products: { H2O: 2, O2: 1 },
    name: "hydrogen peroxide decomposition to water and oxygen",
  },
  {
    reactants: { C: 1, H2O: 1 },
    products: { H2CO3: 1 },
    name: "carbon and water to carbonic acid",
  },
  {
    reactants: { H2CO3: 1, NH3: 1, H2O: 1 },
    products: { NH4HCO3: 1, H2O: 1 },
    name: "carbonic acid and ammonia to ammonium bicarbonate",
  },
  {
    reactants: { H2CO3: 1, NH3H2O: 1 },
    products: { NH4HCO3: 1, H2O: 1 },
    name: "carbonic acid and ammonia water to ammonium bicarbonate and water",
  },
];

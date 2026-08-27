// Mutants & Masterminds 4th Edition Character Data Model & Logic Engine

class CharacterModel {
  constructor() {
    this.name = "New Hero";
    this.powerLevel = 10;
    this.totalPointsAllowed = 150;
    this.sizeCategory = "Medium";
    this.massRank = 3;

    // 6 Core Abilities
    this.abilities = { STR: 0, STA: 0, AGL: 0, INT: 0, AWE: 0, PRE: 0 };
    this.absentAbilities = { STR: false, STA: false, AGL: false, INT: false, AWE: false, PRE: false };

    // Combat Abilities
    this.combat = { ATK: 0, DEF: 0 };

    // Purchased Resistance Ranks beyond ability scores
    this.purchasedResistances = { Dodge: 0, Fortitude: 0, Will: 0 };

    // Purchased Skills & Advantages
    this.skills = {};
    this.skillDetails = {};
    this.advantages = {};
    this.advantageDetails = {};

    // Constructed Powers Array with structured modifiers
    this.powers = [];

    // Equipment & Installations
    this.gear = [];
    this.vehicles = [];
    this.installations = [];

    // Background & Identity
    this.identity = "";
    this.motivation = "";
    this.complications = "";
    this.history = "";
  }

  reset() {
    this.name = "New Hero";
    this.powerLevel = 10;
    this.totalPointsAllowed = 150;
    this.sizeCategory = "Medium";
    this.massRank = 3;

    this.abilities = { STR: 0, STA: 0, AGL: 0, INT: 0, AWE: 0, PRE: 0 };
    this.absentAbilities = { STR: false, STA: false, AGL: false, INT: false, AWE: false, PRE: false };

    this.combat = { ATK: 0, DEF: 0 };
    this.purchasedResistances = { Dodge: 0, Fortitude: 0, Will: 0 };

    this.skills = {};
    this.skillDetails = {};
    this.advantages = {};
    this.advantageDetails = {};

    this.powers = [];
    this.gear = [];
    this.vehicles = [];
    this.installations = [];

    this.identity = "";
    this.motivation = "";
    this.complications = "";
    this.history = "";
  }

  serialize() {
    return {
      format: "MM4E_CHARACTER",
      version: "1.0",
      savedAt: new Date().toISOString(),
      character: {
        name: this.name,
        powerLevel: this.powerLevel,
        totalPointsAllowed: this.totalPointsAllowed,
        sizeCategory: this.sizeCategory,
        massRank: this.massRank,
        abilities: { ...this.abilities },
        absentAbilities: { ...this.absentAbilities },
        combat: { ...this.combat },
        purchasedResistances: { ...this.purchasedResistances },
        skills: { ...this.skills },
        skillDetails: { ...this.skillDetails },
        advantages: { ...this.advantages },
        advantageDetails: { ...this.advantageDetails },
        powers: JSON.parse(JSON.stringify(this.powers || [])),
        gear: JSON.parse(JSON.stringify(this.gear || [])),
        vehicles: JSON.parse(JSON.stringify(this.vehicles || [])),
        installations: JSON.parse(JSON.stringify(this.installations || [])),
        identity: this.identity || "",
        motivation: this.motivation || "",
        complications: this.complications || "",
        history: this.history || ""
      }
    };
  }

  deserialize(raw) {
    if (!raw) return;
    const data = (raw.format === "MM4E_CHARACTER" && raw.character) ? raw.character : raw;

    this.name = data.name || "New Hero";
    this.powerLevel = typeof data.powerLevel === "number" ? data.powerLevel : (data.pl || 10);
    this.totalPointsAllowed = typeof data.totalPointsAllowed === "number" ? data.totalPointsAllowed : (this.powerLevel * 15);
    this.sizeCategory = data.sizeCategory || data.size || "Medium";
    this.massRank = typeof data.massRank === "number" ? data.massRank : 3;

    // Abilities
    this.abilities = { STR: 0, STA: 0, AGL: 0, INT: 0, AWE: 0, PRE: 0, ...(data.abilities || {}) };
    this.absentAbilities = { STR: false, STA: false, AGL: false, INT: false, AWE: false, PRE: false, ...(data.absentAbilities || {}) };

    // Combat
    this.combat = {
      ATK: typeof data.combat?.ATK === "number" ? data.combat.ATK : (data.combat?.atk || 0),
      DEF: typeof data.combat?.DEF === "number" ? data.combat.DEF : (data.combat?.def || 0)
    };

    // Purchased Resistances
    this.purchasedResistances = {
      Dodge: typeof data.purchasedResistances?.Dodge === "number" ? data.purchasedResistances.Dodge : (data.combat?.dodge || 0),
      Fortitude: typeof data.purchasedResistances?.Fortitude === "number" ? data.purchasedResistances.Fortitude : (data.combat?.fort || 0),
      Will: typeof data.purchasedResistances?.Will === "number" ? data.purchasedResistances.Will : (data.combat?.will || 0)
    };

    // Skills & Advantages
    this.skills = { ...(data.skills || {}) };
    this.skillDetails = { ...(data.skillDetails || {}) };
    this.advantages = { ...(data.advantages || {}) };
    this.advantageDetails = { ...(data.advantageDetails || {}) };

    // Powers - ensure container structure and effect metadata
    let loadedPowers = Array.isArray(data.powers) ? JSON.parse(JSON.stringify(data.powers)) : [];
    if (loadedPowers.length > 0 && !loadedPowers[0].effects) {
      loadedPowers = loadedPowers.map(oldEff => {
        const cName = oldEff.name || "Imported Power";
        const cCol = oldEff.collapsed || false;
        return {
          name: cName,
          collapsed: cCol,
          effects: [{ ...oldEff, id: oldEff.id || ("eff_" + Math.random().toString(36).substr(2, 9)), association: "primary", linkedTo: null, name: cName }]
        };
      });
    } else {
      // Ensure all effects in containers have unique IDs and migrated link data
      loadedPowers.forEach(container => {
        if (Array.isArray(container.effects)) {
          let prevAssoc = "primary";
          container.effects.forEach((eff, eIdx) => {
            if (!eff.id) eff.id = "eff_" + Math.random().toString(36).substr(2, 9) + "_" + eIdx;
            
            // Legacy migration: association === 'linked'
            if (eff.association === "linked") {
              eff.linkedTo = "previous";
              eff.association = prevAssoc;
            } else {
              if (eff.linkedTo === undefined) eff.linkedTo = null;
              if (!eff.association) eff.association = "primary";
              prevAssoc = eff.association;
            }
          });
        }
      });
    }
    this.powers = loadedPowers;

    // Equipment
    this.gear = Array.isArray(data.gear) ? JSON.parse(JSON.stringify(data.gear)) : [];
    this.vehicles = Array.isArray(data.vehicles) ? JSON.parse(JSON.stringify(data.vehicles)) : [];
    this.installations = Array.isArray(data.installations) ? JSON.parse(JSON.stringify(data.installations)) : [];

    // Background & Identity
    this.identity = data.identity || (data.background?.identity || "");
    this.motivation = data.motivation || (data.background?.motivation || "");
    this.complications = data.complications || (data.background?.complications || "");
    this.history = data.history || (data.background?.history || "");
  }

  findEffectById(effectId) {
    if (!effectId || !Array.isArray(this.powers)) return null;
    for (let pIdx = 0; pIdx < this.powers.length; pIdx++) {
      const container = this.powers[pIdx];
      if (Array.isArray(container.effects)) {
        for (let eIdx = 0; eIdx < container.effects.length; eIdx++) {
          if (container.effects[eIdx].id === effectId) {
            return { container, pIdx, effect: container.effects[eIdx], eIdx };
          }
        }
      }
    }
    return null;
  }

  getAbilityRank(key) {
    if (this.absentAbilities[key]) return null;
    return Number(this.abilities[key]) || 0;
  }

  getCombatRank(key) {
    return Number(this.combat[key]) || 0;
  }

  getAdvantageMaxRank(adv) {
    if (adv.maxRanks === "heroicLimit") {
      const plData = (typeof PL_LIMITS !== 'undefined' && PL_LIMITS[this.powerLevel]) ? PL_LIMITS[this.powerLevel] : { maxHeroicAdv: 5 };
      return plData.maxHeroicAdv;
    }
    if (adv.maxRanks === "plHalf") {
      return Math.ceil(this.powerLevel / 2);
    }
    return typeof adv.maxRanks === "number" ? adv.maxRanks : 20;
  }

  get advantageLimitsCheck() {
    const plData = (typeof PL_LIMITS !== 'undefined' && PL_LIMITS[this.powerLevel]) ? PL_LIMITS[this.powerLevel] : { maxHeroicAdv: 5 };
    const maxHeroic = plData.maxHeroicAdv;

    const hasTacticalGenius = (this.advantages["Tactical Genius"] || 0) > 0;
    const commandBase = hasTacticalGenius ? this.getAbilityRank("INT") : this.getAbilityRank("PRE");
    const maxCommand = commandBase === null ? 0 : Math.max(0, commandBase);

    let totalHeroic = 0;
    let totalCommand = 0;

    if (typeof ADVANTAGES_LIST !== 'undefined') {
      ADVANTAGES_LIST.forEach(adv => {
        const ranks = this.advantages[adv.name] || 0;
        if (ranks > 0) {
          if (adv.types.includes("Heroic")) totalHeroic += ranks;
          if (adv.types.includes("Command")) totalCommand += ranks;
        }
      });
    }

    return {
      heroicSpent: totalHeroic,
      heroicMax: maxHeroic,
      heroicValid: totalHeroic <= maxHeroic,
      commandSpent: totalCommand,
      commandMax: maxCommand,
      commandValid: totalCommand <= maxCommand,
      commandAbility: hasTacticalGenius ? "INT" : "PRE"
    };
  }

  // Calculate dynamic point cost of an individual effect using M&M 4E modifier math
  calculateEffectCost(effect) {
    if (!effect) return 0;
    const effectData = (typeof POWER_EFFECTS_LIST !== 'undefined') 
      ? (POWER_EFFECTS_LIST.find(e => e.name === effect.effectName) || POWER_EFFECTS_LIST[0])
      : { baseCost: 1 };
      
    let pBaseCost = effectData ? effectData.baseCost : 1;

    if (effect.optionKey && effect.optionKey.startsWith("variable_")) {
      const selectedOption = effectData.options?.find(o => o.key === effect.optionKey);
      if (selectedOption && typeof selectedOption.cost === "number") {
        pBaseCost = selectedOption.cost;
      }
    }

    if (effect.subPowers && effect.subPowers.length > 0) {
      let totalSubCost = 0;
      let totalRank = 0;
      
      if (effect.effectName === "Summon" || effect.effectName === "Illusion") {
        totalRank = parseInt(effect.rank) || 1;
        totalSubCost = (parseInt(effect.rank) || 1) * pBaseCost;
      } else if (effect.effectName === "Morph") {
        totalRank = parseInt(effect.rank) || 1;
        totalSubCost = (parseInt(effect.rank) || 1) * pBaseCost;
      } else if (effect.effectName === "Variable" || effect.effectName === "Enhance Trait" || effect.effectName === "Movement" || effect.effectName === "Immunity" || effect.effectName === "Senses") {
        effect.subPowers.forEach(sub => {
          let sRank = parseInt(sub.rank) || 1;
          totalRank += sRank;
          let sBase = sub.baseCost || (pBaseCost);
          let sPerRank = 0, sFlat = 0, sRemovable = 0;
          
          if (sub.modifiers && sub.modifiers.length > 0) {
              sub.modifiers.forEach(m => {
                  let mult = m.category === 'extra' ? 1 : -1;
                  let mC = (m.cost || 1) * (parseInt(m.ranks)||1);
                  if (m.costType === 'per_rank') sPerRank += mult * mC;
                  else if (m.costType === 'flat') sFlat += mult * mC;
                  else if (m.costType === 'removable') sRemovable += parseInt(m.ranks)||1;
              });
          }
          let sRate = sBase + sPerRank;
          if (sRate < 1) sRate = 1;
          let sCost = (sRate * sRank) + sFlat;
          
          if (sRemovable > 0) {
              let discount = Math.floor(sCost / 5) * sRemovable;
              sCost -= discount;
          }

          if (sCost < 1) sCost = 1;
          totalSubCost += sCost;
        });
      }
      
      effect.rank = totalRank || 1;

      let pPerRank = 0, pFlat = 0, pRemovable = 0;
      if (effect.modifiers && effect.modifiers.length > 0) {
          effect.modifiers.forEach(m => {
              let mult = m.category === 'extra' ? 1 : -1;
              let mC = (m.cost || 1) * (parseInt(m.ranks)||1);
              if (m.costType === 'per_rank') pPerRank += mult * mC;
              else if (m.costType === 'flat') pFlat += mult * mC;
              else if (m.costType === 'removable') pRemovable += parseInt(m.ranks)||1;
          });
      }

      let finalCost = totalSubCost + (pPerRank * effect.rank) + pFlat;
      if (pRemovable > 0) finalCost -= Math.floor(finalCost / 5) * pRemovable;
      return finalCost < 1 ? 1 : finalCost;

    } else {
      let pPerRank = 0, pFlat = 0, pRemovable = 0;
      if (effect.modifiers && effect.modifiers.length > 0) {
          effect.modifiers.forEach(m => {
              let mult = m.category === 'extra' ? 1 : -1;
              let mC = (m.cost || 1) * (parseInt(m.ranks)||1);
              if (m.costType === 'per_rank') pPerRank += mult * mC;
              else if (m.costType === 'flat') pFlat += mult * mC;
              else if (m.costType === 'removable') pRemovable += parseInt(m.ranks)||1;
          });
      }
      let netRate = pBaseCost + pPerRank;
      if (netRate < 1) netRate = 1;
      let finalCost = (netRate * (parseInt(effect.rank)||1)) + pFlat;
      if (pRemovable > 0) finalCost -= Math.floor(finalCost / 5) * pRemovable;
      return finalCost < 1 ? 1 : finalCost;
    }
  }

  // Calculate container cost with compound linked primary slots and compound linked alternate/dynamic slots
  calculateTotalPowerCost(powerContainer) {
    if (!powerContainer || !powerContainer.effects || powerContainer.effects.length === 0) return 0;
    
    let slots = [];
    let currentSlot = null;
    
    powerContainer.effects.forEach((eff) => {
      let c = this.calculateEffectCost(eff);
      let isLinked = eff.linkedTo === "previous" || (typeof eff.linkedTo === "string" && eff.linkedTo !== "") || eff.association === "linked";
      
      let slotRole = eff.association;
      if (slotRole === "linked" || !slotRole) {
        slotRole = currentSlot ? currentSlot.type : "primary";
      }

      if (isLinked && currentSlot) {
        // Compound link: Adds directly into the current slot's combined total
        currentSlot.combinedCost += c;
        currentSlot.effects.push(eff);
      } else {
        // Starts a new independent slot (Primary, Alternate, or Dynamic)
        if (slotRole === "primary" || slots.length === 0) {
          currentSlot = { type: "primary", baseCost: c, combinedCost: c, effects: [eff], alts: [] };
          slots.push(currentSlot);
        } else {
          // Alternate or Dynamic slot
          currentSlot = { type: slotRole, baseCost: c, combinedCost: c, effects: [eff] };
          if (slots.length > 0) {
            slots[0].alts.push(currentSlot);
          } else {
            currentSlot.type = "primary";
            currentSlot.alts = [];
            slots.push(currentSlot);
          }
        }
      }
    });

    let totalCost = 0;
    slots.forEach(slot => {
      let maxPrimaryCost = slot.combinedCost;
      let alts = slot.alts || [];
      
      alts.forEach(alt => {
        if (alt.combinedCost > maxPrimaryCost) {
          maxPrimaryCost = alt.combinedCost;
        }
      });
      
      let slotTotal = maxPrimaryCost;
      alts.forEach(alt => {
        slotTotal += (alt.type === "dynamic" ? 2 : 1);
      });
      totalCost += slotTotal;
    });
    
    return totalCost;
  }

  calculatePowerCost(power) {
    if (power && Array.isArray(power.effects)) {
      return this.calculateTotalPowerCost(power);
    }
    return this.calculateEffectCost(power);
  }

  // Aggregated benefits from active power effects
  get powerTraitModifiers() {
    let protectionToughness = 0;
    let speedBonus = 0;
    let flightRank = null;
    let swimRank = 0;
    let extraLifting = 0;

    if (this.powers && Array.isArray(this.powers)) {
      this.powers.forEach(container => {
        const effects = Array.isArray(container.effects) ? container.effects : [container];
        effects.forEach(p => {
          const rank = Number(p.rank) || 0;
          if (p.effectName === "Protection") protectionToughness += rank;
          if (p.effectName === "Speed") speedBonus += rank;
          if (p.effectName === "Flight") flightRank = (flightRank === null ? rank : Math.max(flightRank, rank));
          if (p.effectName === "Swimming") swimRank += rank;
          if (p.effectName === "Lifting") extraLifting += rank;
        });
      });
    }

    return {
      protectionToughness,
      speedBonus,
      flightRank,
      swimRank,
      extraLifting
    };
  }

  get derivedStats() {
    const sizeData = (typeof SIZE_TABLE !== 'undefined' && SIZE_TABLE[this.sizeCategory]) ? SIZE_TABLE[this.sizeCategory] : { spaces: "1", reach: "1", rank: 0, speed: 0 };
    const str = this.getAbilityRank("STR");
    const sta = this.getAbilityRank("STA");
    const agl = this.getAbilityRank("AGL");
    const awe = this.getAbilityRank("AWE");
    const atk = this.getCombatRank("ATK");
    const def = this.getCombatRank("DEF");

    const pMods = this.powerTraitModifiers;

    const defensiveRollRanks = this.advantages["Defensive Roll"] || 0;
    const toughRanks = this.advantages["Tough"] || 0;
    const closeDefRanks = this.advantages["Close Defense"] || 0;
    const rangedDefRanks = this.advantages["Ranged Defense"] || 0;
    const closeAtkAdv = this.advantages["Close Attack"] || 0;
    const rangedAtkAdv = this.advantages["Ranged Attack"] || 0;
    const improvedInitRanks = this.advantages["Improved Initiative"] || 0;

    const closeCombatSkill = this.skills["Close Combat"] || 0;
    const rangedCombatSkill = this.skills["Ranged Combat"] || 0;

    const defenseClass = def + 10;
    const initiative = (agl === null ? 0 : agl) + (improvedInitRanks * 4);

    const dodge = (def === null) ? null : (def + (this.purchasedResistances.Dodge || 0));
    const fortitude = (sta === null) ? null : (sta + (this.purchasedResistances.Fortitude || 0));
    const toughness = (sta === null) ? 0 : (sta + defensiveRollRanks + toughRanks + pMods.protectionToughness);
    const will = (awe === null) ? null : (awe + (this.purchasedResistances.Will || 0));

    const closeDef = def + closeDefRanks;
    const rangedDef = def + rangedDefRanks;
    const closeAtk = atk + closeAtkAdv + closeCombatSkill;
    const rangedAtk = atk + rangedAtkAdv + rangedCombatSkill;

    const baseSpeed = 2 + (sizeData.speed || 0) + pMods.speedBonus;
    const liftRank = (str === null ? -5 : str) + pMods.extraLifting;

    return {
      defenseClass,
      initiative,
      dodge,
      fortitude,
      toughness,
      will,
      closeDefense: closeDef,
      rangedDefense: rangedDef,
      closeAttack: closeAtk,
      rangedAttack: rangedAtk,
      groundSpeed: baseSpeed,
      airSpeed: pMods.flightRank,
      waterSpeed: pMods.swimRank,
      spaces: sizeData.spaces,
      reach: sizeData.reach,
      sizeRank: sizeData.rank,
      maxLiftingMassRank: liftRank
    };
  }

  get powerPointsSummary() {
    let abilityPP = 0;
    for (const key of Object.keys(this.abilities)) {
      if (this.absentAbilities[key]) {
        abilityPP -= 10;
      } else {
        abilityPP += (this.abilities[key] * 2);
      }
    }

    const combatPP = (this.combat.ATK * 2) + (this.combat.DEF * 2);

    const resistancePP = (this.purchasedResistances.Dodge || 0) +
                         (this.purchasedResistances.Fortitude || 0) +
                         (this.purchasedResistances.Will || 0);

    let totalSkillRanks = 0;
    let expertiseRanks = 0;
    for (const [name, rank] of Object.entries(this.skills)) {
      if (name === "Expertise") {
        expertiseRanks += Number(rank) || 0;
      } else {
        totalSkillRanks += Number(rank) || 0;
      }
    }
    const skillsPP = Math.ceil(totalSkillRanks / 2) + Math.ceil(expertiseRanks / 4);

    let advantagesPP = 0;
    for (const rank of Object.values(this.advantages)) {
      advantagesPP += Number(rank) || 0;
    }

    let powersPP = 0;
    if (this.powers && Array.isArray(this.powers)) {
      this.powers.forEach(p => {
        powersPP += this.calculatePowerCost(p);
      });
    }

    const totalSpent = abilityPP + combatPP + resistancePP + skillsPP + advantagesPP + powersPP;
    const remaining = this.totalPointsAllowed - totalSpent;

    return {
      abilities: abilityPP,
      combat: combatPP,
      resistances: resistancePP,
      skills: skillsPP,
      advantages: advantagesPP,
      powers: powersPP,
      totalSpent: totalSpent,
      remaining: remaining
    };
  }
}
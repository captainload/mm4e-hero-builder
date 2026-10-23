const char = new CharacterModel();
window.char = char;
window.primaryHero = char;
window.activeCompanionId = null;
char.powers = [];

let skillSort = { col: "name", asc: true };
let advSort = { col: "name", asc: true };

let skillsDisplayList = typeof SKILLS_LIST !== 'undefined' ? [...SKILLS_LIST] : [];
let advantagesDisplayList = typeof ADVANTAGES_LIST !== 'undefined' ? [...ADVANTAGES_LIST] : [];

// --- DYNAMIC CONFIGURATION INJECTOR ---
const EXTRACTED_CONFIGS = {
  "Affliction": [
    { 
      name: "Affliction Aura", 
      rank: 1,
      options: { resist: "Fortitude", deg1: "Dazed", deg2: "Stunned", deg3: "Incapacitated" },
      modifiers: [{ name: "Aura", ranks: 1, cost: 3, costType: "per_rank", category: "extra" }],
      notes: "Affliction triggering on touch/contact."
    },
    { 
      name: "Dazzle", 
      rank: 1,
      options: { resist: "Dodge", deg1: "Disabled", deg2: "Unaware", deg3: "- None -" },
      modifiers: [
        { name: "Ranged", ranks: 1, cost: 1, costType: "per_rank", category: "extra" },
        { name: "Limited Degree", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }
      ],
      notes: "Blinds or deafens targets at range (2 degrees only)."
    },
    { 
      name: "Hallucination", 
      rank: 1,
      options: { resist: "Will", deg1: "Figment", deg2: "Phantasm", deg3: "Delusion" },
      modifiers: [
        { name: "Perception Range", ranks: 1, cost: 2, costType: "per_rank", category: "extra" }, 
        { name: "Alternate Resistance (Will)", ranks: 1, cost: 0, costType: "flat", category: "extra" }
      ], 
      notes: "Induces sensory illusions directly into the target's mind."
    },
    { 
      name: "Mind Control", 
      rank: 1,
      options: { resist: "Will", deg1: "Dazed", deg2: "Compelled", deg3: "Controlled" },
      modifiers: [
        { name: "Perception Range", ranks: 1, cost: 2, costType: "per_rank", category: "extra" }, 
        { name: "Alternate Resistance (Will)", ranks: 1, cost: 0, costType: "flat", category: "extra" }
      ], 
      notes: "Telepathic control of target's actions."
    },
    { 
      name: "Paralyze", 
      rank: 1,
      options: { resist: "Fortitude", deg1: "Hindered", deg2: "Immobile", deg3: "Paralyzed" },
      notes: "Freezes target's motor functions."
    },
    { 
      name: "Snare", 
      rank: 1,
      options: { resist: "Dodge", deg1: "Hindered", deg1_extra: "Vulnerable", deg2: "Defenseless", deg2_extra: "Immobile", deg3: "- None -" },
      modifiers: [
        { name: "Extra Condition", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }, 
        { name: "Ranged", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }, 
        { name: "Limited Degree", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }
      ], 
      notes: "Binds targets at range with entangling material (Hindered/Vulnerable, Defenseless/Immobile)."
    },
    { 
      name: "Stun", 
      rank: 1,
      options: { resist: "Fortitude", deg1: "Dazed", deg2: "Stunned", deg3: "Incapacitated" },
      notes: "Overwhelms target with concussive shock or nerve strike."
    },
    { 
      name: "Suffocation", 
      rank: 1,
      options: { resist: "Fortitude", deg1: "Dazed", deg2: "Stunned", deg3: "Incapacitated" },
      modifiers: [
        { name: "Ranged", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }, 
        { name: "Concentration", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }
      ], 
      notes: "Chokes or cuts off air to target from a distance."
    },
    { 
      name: "Toxin", 
      rank: 1,
      options: { resist: "Fortitude", deg1: "Impaired", deg2: "Disabled", deg3: "Incapacitated" },
      notes: "Biological or chemical venom attacking bodily systems."
    },
    { 
      name: "Transform", 
      rank: 1,
      options: { resist: "Fortitude", deg1: "- None -", deg2: "- None -", deg3: "Transformed" },
      modifiers: [
        { name: "Progressive", ranks: 1, cost: 2, costType: "per_rank", category: "extra" }, 
        { name: "Limited Degree", ranks: 2, cost: 1, costType: "per_rank", category: "flaw" }
      ], 
      notes: "Transforms target into another shape or object upon complete failure."
    },
    { 
      name: "Weaken", 
      rank: 1,
      options: { resist: "Fortitude", deg1: "Impaired", deg2: "Disabled", deg3: "Debilitated" },
      modifiers: [
        { name: "Cumulative", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }, 
        { name: "Limited", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }
      ], 
      notes: "Drains target traits, debilitating physical or mental capabilities."
    }
  ],
  "Burrowing": [
    { name: "Basic Burrowing", rank: 1, modifiers: [], notes: "Tunnels through soil and loose earth." },
    { name: "Penetrating Burrow", rank: 1, modifiers: [{ name: "Penetrating", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }], notes: "Tunnels through hard rock and dense material." },
    { name: "Ranged Excavation", rank: 1, modifiers: [{ name: "Ranged", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }], notes: "Excavates tunnels from a distance." },
    { name: "Collapse Tunnel", rank: 1, modifiers: [{ name: "No Tunnel", ranks: 1, cost: 1, costType: "flat", category: "flaw" }], notes: "Displaces earth without leaving an open tunnel behind." },
    { name: "Reinforced Tunnel", rank: 1, modifiers: [{ name: "No Collapse", ranks: 1, cost: 1, costType: "flat", category: "extra" }], notes: "Creates structurally stable tunnels that resist collapse." }
  ],
  "Communication": [
    { 
      name: "Commlink", 
      rank: 1,
      options: { medium: "Radio" },
      modifiers: [
        { name: "One-Way", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }, 
        { name: "Removable (Easily Removable)", ranks: 1, cost: 2, costType: "removable", category: "flaw" }
      ], 
      notes: "Radio Communication via removable earpiece or device." 
    },
    { 
      name: "Interface", 
      rank: 1,
      options: { medium: "Special" }, 
      notes: "Electromagnetic Communication directly with computers and digital networks." 
    },
    { 
      name: "Psychic Connection", 
      rank: 1,
      options: { medium: "Mental" }, 
      modifiers: [{ name: "Limited", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }], 
      notes: "Mental Communication. Limited to a single bonded person." 
    },
    { 
      name: "Telepathic Link", 
      rank: 1,
      options: { medium: "Mental" }, 
      notes: "Two-way Mental Communication with any mind in range." 
    }
  ],
  "Comprehend": [
    { 
      name: "Animal Empathy", 
      rank: 2, 
      options: { comprehend_type: "Animals" }, 
      subPowers: [{ name: "Animals (Speak to and Understand) [2 ranks]", type: "Animals", rank: 2, baseCost: 1, costType: "per_rank", modifiers: [] }], 
      notes: "Understand and communicate with animals." 
    },
    { 
      name: "Machine Interface", 
      rank: 2, 
      options: { comprehend_type: "Computers" }, 
      subPowers: [{ name: "Computers (Communicate with and Understand) [2 ranks]", type: "Computers", rank: 2, baseCost: 1, costType: "per_rank", modifiers: [] }], 
      notes: "Communicate with and comprehend digital systems and software." 
    },
    { 
      name: "Universal Translator", 
      rank: 2, 
      options: { comprehend_type: "Languages" }, 
      subPowers: [{ name: "Languages (Understand and Speak All) [2 ranks]", type: "Languages", rank: 2, baseCost: 1, costType: "per_rank", modifiers: [] }], 
      notes: "Speak and understand any spoken or written human language." 
    },
    { 
      name: "Object Reading", 
      rank: 2, 
      options: { comprehend_type: "Objects" }, 
      subPowers: [{ name: "Objects (Read Impressions) [2 ranks]", type: "Objects", rank: 2, baseCost: 1, costType: "per_rank", modifiers: [] }], 
      notes: "Read psychic impressions and memories from physical objects." 
    },
    { 
      name: "Spirit Medium", 
      rank: 2, 
      options: { comprehend_type: "Spirits" }, 
      subPowers: [{ name: "Spirits (Communicate with) [2 ranks]", type: "Spirits", rank: 2, baseCost: 1, costType: "per_rank", modifiers: [] }], 
      notes: "Communicate with ghosts, spirits, and discorporate entities." 
    }
  ],
  "Concealment": [
    { name: "Inaudibility", rank: 1, options: { senses: "Normal Hearing (1 rank)" }, notes: "Hearing Concealment (completely silent)." },
    { name: "Invisibility", rank: 2, options: { senses: "Normal Sight (2 ranks)" }, notes: "Sight Concealment (invisible to normal vision)." },
    { name: "Complete Sensory Mask", rank: 10, options: { senses: "All Senses (10 ranks)" }, notes: "Total concealment against all sensory types." }
  ],
  "Create": [
    { name: "Force Constructs", rank: 1, modifiers: [{ name: "Movable", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }], notes: "Solid energy shapes that can be moved at flight speed." },
    { name: "Matter Shaping", rank: 1, modifiers: [{ name: "Permanent", ranks: 1, cost: 0, costType: "per_rank", category: "extra" }], notes: "Creates permanent physical objects that remain after creation." }
  ],
  "Damage": [
    { name: "Blast", rank: 1, modifiers: [{ name: "Ranged", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }], notes: "Ranged physical or energy blast." },
    { name: "Damage Aura", rank: 1, modifiers: [{ name: "Aura", ranks: 1, cost: 3, costType: "per_rank", category: "extra" }], notes: "Deals damage to anyone making physical contact." },
    { name: "Mental Blast", rank: 1, modifiers: [{ name: "Perception Range", ranks: 1, cost: 2, costType: "per_rank", category: "extra" }, { name: "Alternate Resistance (Will)", ranks: 1, cost: 0, costType: "flat", category: "extra" }], notes: "Psychic damage resisted by Will at perception range." },
    { name: "Strike", rank: 1, modifiers: [{ name: "Strength-Based", ranks: 1, cost: 0, costType: "per_rank", category: "extra" }], notes: "Close combat attack adding to Strength damage." },
    { name: "Weapon", rank: 1, modifiers: [{ name: "Strength-Based", ranks: 1, cost: 0, costType: "per_rank", category: "extra" }, { name: "Removable (Easily Removable)", ranks: 1, cost: 2, costType: "removable", category: "flaw" }], notes: "Handheld weapon (sword, club, etc.) easily disarmed." }
  ],
  "Enhanced Movement": [
    { 
      name: "Wall-Crawling", 
      rank: 2, 
      options: { enh_mov_type: "Wall-Crawling" }, 
      subPowers: [{ name: "Wall-Crawling [1 pt/r]", type: "Wall-Crawling", rank: 2, baseCost: 1, costType: "per_rank", modifiers: [] }], 
      notes: "Walk on walls and ceilings at normal speed." 
    },
    { 
      name: "Water-Walking", 
      rank: 1, 
      options: { enh_mov_type: "Water-Walking" }, 
      subPowers: [{ name: "Water-Walking [1 pt/r]", type: "Water-Walking", rank: 1, baseCost: 1, costType: "per_rank", modifiers: [] }], 
      notes: "Walk across liquid surfaces without sinking." 
    },
    { 
      name: "Safe Fall", 
      rank: 1, 
      options: { enh_mov_type: "Safe Fall" }, 
      subPowers: [{ name: "Safe Fall [1 pt]", type: "Safe Fall", rank: 1, baseCost: 1, costType: "flat", modifiers: [] }], 
      notes: "Fall any distance without taking falling damage." 
    },
    { 
      name: "Trackless", 
      rank: 1, 
      options: { enh_mov_type: "Trackless" }, 
      subPowers: [{ name: "Trackless [1 pt/r]", type: "Trackless", rank: 1, baseCost: 1, costType: "per_rank", modifiers: [] }], 
      notes: "Leave no trail or tracks while moving on foot." 
    },
    { 
      name: "Dimensional Travel", 
      rank: 2, 
      options: { enh_mov_type: "Dimensional Travel" }, 
      subPowers: [{ name: "Dimensional Travel [1 pt/r]", type: "Dimensional Travel", rank: 2, baseCost: 1, costType: "per_rank", modifiers: [] }], 
      notes: "Travel to other dimensions or planes of existence." 
    },
    { 
      name: "Space Travel", 
      rank: 1, 
      options: { enh_mov_type: "Space Travel" }, 
      subPowers: [{ name: "Space Travel [1 pt/r]", type: "Space Travel", rank: 1, baseCost: 1, costType: "per_rank", modifiers: [] }], 
      notes: "Travel through the vacuum of space at sublight speeds." 
    },
    { 
      name: "Environmental Adaptation", 
      rank: 1, 
      options: { enh_mov_type: "Environmental Adaptation" }, 
      subPowers: [{ name: "Environmental Adaptation [1 pt/r]", type: "Environmental Adaptation", rank: 1, baseCost: 1, costType: "per_rank", modifiers: [] }], 
      notes: "Move and act normally in a specific hazardous environment (e.g. aquatic, zero-g)." 
    }
  ],
  "Enhanced Senses": [
    { name: "Radar", subPowers: [{ name: "Radio [1 pt]", type: "Radio", rank: 1, baseCost: 1, costType: "flat", modifiers: [{ name: "Accurate (Single Sense) [+2 pts]", ranks: 1, cost: 2, costType: "flat", category: "extra", isMeta: true }] }], notes: "Accurate radio perception." },
    { name: "Sonar", subPowers: [{ name: "Ultra-Hearing [1 pt]", type: "Ultra-Hearing", rank: 1, baseCost: 1, costType: "flat", modifiers: [{ name: "Accurate (Single Sense) [+2 pts]", ranks: 1, cost: 2, costType: "flat", category: "extra", isMeta: true }] }], notes: "Accurate high-frequency echolocation." },
    { name: "Spatial Sense", subPowers: [{ name: "Normal Touch [0 pts]", type: "Normal Touch", rank: 1, baseCost: 0, costType: "flat", modifiers: [{ name: "Ranged (Single Sense) [+1 pt]", ranks: 1, cost: 1, costType: "flat", category: "extra", isMeta: true }] }], modifiers: [{ name: "Subtle", ranks: 2, cost: 2, costType: "flat", category: "extra" }], notes: "3D awareness of surroundings via subtle touch vibrations." },
    { name: "True Sight", subPowers: [{ name: "Visual Senses - Sense Type [0 pts]", type: "Visual Senses", rank: 1, baseCost: 0, costType: "flat", modifiers: [{ name: "Counters Concealment (All) [+5 pts]", ranks: 1, cost: 5, costType: "flat", category: "extra", isMeta: true }, { name: "Counters Illusion [+2 pts]", ranks: 1, cost: 2, costType: "flat", category: "extra", isMeta: true }] }], notes: "Penetrates all visual concealment and illusions." },
    { name: "X-Ray Vision", subPowers: [{ name: "Visual Senses - Sense Type [0 pts]", type: "Visual Senses", rank: 1, baseCost: 0, costType: "flat", modifiers: [{ name: "Penetrates Concealment [+4 pts]", ranks: 1, cost: 4, costType: "flat", category: "extra", isMeta: true }] }], notes: "Vision penetrates solid obstacles and barriers." }
  ],
  "Enhanced Trait": [
    { 
      name: "Berserker Rage", 
      rank: 8,
      subPowers: [
        {
          name: "Strength (STR) [2 pts/r]",
          type: "Strength (STR)",
          rank: 4,
          baseCost: 2,
          costType: "per_rank",
          modifiers: []
        },
        {
          name: "Stamina (STA) [2 pts/r]",
          type: "Stamina (STA)",
          rank: 4,
          baseCost: 2,
          costType: "per_rank",
          modifiers: []
        }
      ],
      modifiers: [{ name: "Sustained", ranks: 1, cost: 0, costType: "per_rank", category: "extra" }], 
      notes: "Berserk state boosting Strength & Stamina.",
      linkedEffects: [
        {
          name: "Berserker Fearlessness",
          effectName: "Enhanced Trait",
          rank: 1,
          subPowers: [
            {
              name: "Fearless [1 pt]",
              type: "Fearless",
              rank: 1,
              baseCost: 1,
              costType: "flat",
              modifiers: []
            }
          ],
          modifiers: [{ name: "Sustained", ranks: 1, cost: 0, costType: "per_rank", category: "extra" }],
          notes: "Fearless advantage active while in rage."
        }
      ]
    },
    { 
      name: "Trait Boost", 
      rank: 4,
      subPowers: [
        {
          name: "Strength (STR) [2 pts/r]",
          type: "Strength (STR)",
          rank: 4,
          baseCost: 2,
          costType: "per_rank",
          modifiers: []
        }
      ],
      modifiers: [{ name: "Fades", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }],
      notes: "Temporary burst of enhanced trait that fades with each use."
    }
  ],
  "Environment": [
    { name: "Flashlight", rank: 1, modifiers: [{ name: "Area Effect (Cone)", ranks: 1, cost: 0, costType: "per_rank", category: "extra" }], notes: "Illumination 1 (Cone shape)." },
    { name: "Mist", rank: 1, notes: "Visibility (-2 penalty to sight Perception checks in area)." },
    { name: "Weather Control", rank: 2, modifiers: [{ name: "Variable", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }], notes: "Controls temperature, precipitation, and winds in an area." },
    { name: "Extreme Cold", rank: 2, notes: "Lowers temperature to Extreme Cold (Fortitude DC 10 / min)." },
    { name: "Extreme Heat", rank: 2, notes: "Raises temperature to Extreme Heat (Fortitude DC 10 / min)." }
  ],
  "Feature": [
    { name: "Animal Harmony", rank: 1, notes: "Animals are calm and well-disposed towards you; +2 to interaction checks with animals." },
    { name: "Battery", rank: 1, notes: "Stores energy to power devices or recharge equipment." },
    { name: "Built-in Equipment", rank: 1, notes: "Includes 1 equipment point of built-in gear (e.g. tools, flashlight, lighter)." },
    { name: "Charmed Life", rank: 1, notes: "Reroll one natural 1 on a d20 roll per game session." },
    { name: "Chill", rank: 1, notes: "Can lower the temperature of small objects or liquids (e.g. keep drinks cold)." },
    { name: "Dimensional Pocket", rank: 1, notes: "Can store small objects (mass rank -5 or less) in an extradimensional pocket." },
    { name: "Display", rank: 1, notes: "Can project or display visual images or holographic symbols on your body." },
    { name: "Higher Guidance", rank: 1, notes: "Receive occasional cryptic intuition, guidance, or omen from a higher power." },
    { name: "Insulating Fur", rank: 1, notes: "Provides comfort and warmth in freezing conditions; ignores routine cold checks." },
    { name: "Internal Compartment", rank: 1, notes: "Can conceal small items (mass rank -5 or less) inside your body." },
    { name: "Iron Stomach", rank: 1, notes: "Can consume and digest virtually anything organic without ill effect." },
    { name: "Light Sleeper", rank: 1, notes: "Remain fully aware of surroundings while asleep; wake instantly with no penalty." },
    { name: "Lucid Dreamer", rank: 1, notes: "Full conscious control and awareness inside dreams and dreamscapes." },
    { name: "Massive", rank: 1, notes: "Count as one size category larger for resistance to being moved or tripped." },
    { name: "Megaphone", rank: 1, notes: "Can project your voice up to distance rank 0 (several hundred feet)." },
    { name: "Mimicry", rank: 1, notes: "Can accurately imitate sounds, voices, or accents you have heard." },
    { name: "Quick Change", rank: 1, notes: "Can switch into hero costume or chosen clothing as a free action." },
    { name: "Remote", rank: 1, notes: "Can operate personal electronic or computer devices remotely as a free action." },
    { name: "Shade", rank: 1, notes: "Provide shade or minor ambient shielding against blinding light in your immediate space." },
    { name: "Special Effect", rank: 1, notes: "Produces harmless, purely cosmetic visual/auditory special effects on demand." },
    { name: "Temporal Inertia", rank: 1, notes: "Immune to minor temporal alterations and always know the exact date and time." },
    { name: "Weatherproof", rank: 1, notes: "Clothing and gear are completely impervious to weather damage, dirt, and wetness." }
  ],
  "Flight": [
    { name: "Wings", rank: 1, modifiers: [{ name: "Restrainable", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }], notes: "Flight dependent on wings that can be bound or tangled." }
  ],
  "Healing": [
    { name: "Restoration", rank: 1, modifiers: [{ name: "Energizing", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }], notes: "Heals damage conditions and removes Fatigued/Exhausted." },
    { name: "Ranged Healing", rank: 1, modifiers: [{ name: "Ranged", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }], notes: "Heals targets at distance." },
    { name: "Resurrection", rank: 1, modifiers: [{ name: "Resurrection", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }], notes: "Can restore dead subjects to life." },
    { name: "Empathic Healing", rank: 1, modifiers: [{ name: "Empathic", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }], notes: "Takes the target's damage conditions onto yourself." }
  ],
  "Immunity": [
    { 
      name: "Absorption", 
      rank: 10,
      subPowers: [
        { 
          name: "Common Descriptor (e.g. all Fire or Electricity effects) [10 ranks]", 
          type: "Common Descriptor", 
          rank: 10, 
          baseCost: 1, 
          costType: "per_rank", 
          modifiers: [] 
        }
      ],
      modifiers: [
        { 
          name: "Fades", 
          ranks: 1, 
          cost: 1, 
          costType: "per_rank", 
          category: "flaw" 
        }
      ], 
      notes: "Immunity to a Common Damage/Hazard Descriptor with Fades (e.g. all Fire or Electricity effects).",
      linkedEffects: [
        {
          name: "Absorption (Enhanced Trait Boost)",
          effectName: "Enhanced Trait",
          rank: 10,
          subPowers: [
            {
              name: "Strength (STR) [2 pts/r]",
              type: "Strength (STR)",
              rank: 5,
              baseCost: 2,
              costType: "per_rank",
              modifiers: []
            }
          ],
          modifiers: [
            {
              name: "Fades",
              ranks: 1,
              cost: 1,
              costType: "per_rank",
              category: "flaw"
            }
          ],
          notes: "Enhanced Strength boost fueled by absorbed energy (Fades)."
        }
      ]
    },
    { 
      name: "Ageless", 
      rank: 1,
      subPowers: [
        {
          name: "Aging [1 rank]",
          type: "Aging",
          rank: 1,
          baseCost: 1,
          costType: "per_rank",
          modifiers: []
        }
      ],
      notes: "Immunity to aging effects."
    },
    { 
      name: "[Effect] Resistance", 
      rank: 1, 
      modifiers: [{ name: "Resistance", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }],
      subPowers: [
        {
          name: "Custom Immunity (Specified Effect) [1 rank]",
          type: "Custom Immunity",
          rank: 1,
          baseCost: 1,
          costType: "per_rank",
          modifiers: []
        }
      ],
      notes: "Halves the rank of specified effects before rolling resistance checks."
    },
    { 
      name: "Environmental Immunity", 
      rank: 10,
      subPowers: [
        {
          name: "Life Support (All Environments) [10 ranks]",
          type: "Life Support",
          rank: 10,
          baseCost: 1,
          costType: "per_rank",
          modifiers: []
        }
      ],
      notes: "Complete immunity to all Environmental Hazards (cold, heat, pressure, radiation, vacuum, and suffocation)."
    },
    { 
      name: "Fortitude Immunity", 
      rank: 30,
      subPowers: [
        {
          name: "Fortitude Effects [30 ranks]",
          type: "Fortitude Effects",
          rank: 30,
          baseCost: 1,
          costType: "per_rank",
          modifiers: []
        }
      ],
      notes: "Complete immunity to all effects requiring Fortitude resistance checks."
    },
    { 
      name: "Save Immunities (Fortitude & Will)", 
      rank: 60,
      subPowers: [
        {
          name: "Fortitude Effects [30 ranks]",
          type: "Fortitude Effects",
          rank: 30,
          baseCost: 1,
          costType: "per_rank",
          modifiers: []
        },
        {
          name: "Will Effects [30 ranks]",
          type: "Will Effects",
          rank: 30,
          baseCost: 1,
          costType: "per_rank",
          modifiers: []
        }
      ],
      notes: "Complete immunity to all Fortitude and Will resistance checks (30 ranks each, 60 ranks total)."
    },
    { 
      name: "Mental Immunity", 
      rank: 10,
      subPowers: [
        {
          name: "Common Descriptor (Mental Effects) [10 ranks]",
          type: "Common Descriptor",
          rank: 10,
          baseCost: 1,
          costType: "per_rank",
          modifiers: []
        }
      ],
      notes: "Immunity to all mental powers and psychic effects."
    },
    { 
      name: "Water Breathing", 
      rank: 1,
      subPowers: [
        {
          name: "Suffocation (One Type: Drowning) [1 rank]",
          type: "Suffocation (One Type)",
          rank: 1,
          baseCost: 1,
          costType: "per_rank",
          modifiers: []
        }
      ],
      notes: "Immunity to suffocation underwater (drowning)."
    },
    { 
      name: "Will Immunity", 
      rank: 30,
      subPowers: [
        {
          name: "Will Effects [30 ranks]",
          type: "Will Effects",
          rank: 30,
          baseCost: 1,
          costType: "per_rank",
          modifiers: []
        }
      ],
      notes: "Complete immunity to all effects requiring Will resistance checks."
    }
  ],
  "Move Object": [
    { name: "Cyclone", rank: 1, modifiers: [{ name: "Area Effect (Cone)", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }, { name: "Limited Direction", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }], notes: "Cone of swirling telekinetic winds." },
    { name: "Energy Tendrils", rank: 1, modifiers: [{ name: "Damaging", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }], notes: "Tendrils of force capable of manipulating and crushing targets." },
    { name: "Gravity Field", rank: 1, modifiers: [{ name: "Area Effect (Sphere)", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }, { name: "Limited Direction", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }], notes: "Sphere of intensified gravity pulling objects down." },
    { name: "[Matter] Moving", rank: 1, modifiers: [{ name: "Limited Material", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }], notes: "Move Object limited to a single material (e.g. metal, water, earth)." },
    { 
      name: "Poltergeist", 
      rank: 4,
      modifiers: [
        { name: "Perception Range", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }, 
        { name: "Precise", ranks: 1, cost: 1, costType: "flat", category: "extra" }, 
        { name: "Subtle", ranks: 2, cost: 2, costType: "flat", category: "extra" }
      ], 
      notes: "Telekinetic manifestation requiring sensory link.",
      linkedEffects: [
        {
          name: "Poltergeist Senses",
          effectName: "Enhanced Senses",
          rank: 4,
          subPowers: [
            {
              name: "Normal Sight [0 pts]",
              type: "Normal Sight",
              rank: 1,
              baseCost: 0,
              costType: "flat",
              modifiers: [
                { name: "Radius (Single Sense) [+1 pt]", ranks: 1, cost: 1, costType: "flat", category: "extra", isMeta: true },
                { name: "Counters Concealment (One Descriptor) [+2 pts]", ranks: 1, cost: 2, costType: "flat", category: "extra", isMeta: true },
                { name: "Penetrates Concealment [+4 pts]", ranks: 1, cost: 4, costType: "flat", category: "extra", isMeta: true }
              ]
            }
          ],
          modifiers: [
            { name: "Limited", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }
          ],
          notes: "Radius sight penetrating barriers, limited to targeting Poltergeist."
        }
      ]
    },
    { name: "Psychokinesis", rank: 1, modifiers: [{ name: "Perception Range", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }], notes: "Manipulate objects at perception range." },
    { name: "Tether", rank: 1, modifiers: [{ name: "Limited Direction", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }], notes: "Pulls objects directly toward or away from you." }
  ],
  "Obscure": [
    { name: "Darkness", rank: 1, modifiers: [{ name: "Area Effect (Sphere)", ranks: 1, cost: 0, costType: "per_rank", category: "extra" }], options: { sense_type: "Normal Sight" }, notes: "Blocks Normal Sight in an area." },
    { name: "Silence", rank: 1, modifiers: [{ name: "Area Effect (Sphere)", ranks: 1, cost: 0, costType: "per_rank", category: "extra" }], options: { sense_type: "Normal Hearing" }, notes: "Blocks Normal Hearing in an area." },
    { name: "Static", rank: 1, modifiers: [{ name: "Area Effect (Sphere)", ranks: 1, cost: 0, costType: "per_rank", category: "extra" }], options: { sense_type: "Radio" }, notes: "Jams Radio communications and senses in an area." },
    { name: "Wards", rank: 1, modifiers: [{ name: "Area Effect (Sphere)", ranks: 1, cost: 0, costType: "per_rank", category: "extra" }], options: { sense_type: "Detect and Remote Sensing" }, notes: "Blocks Detect and Remote Sensing in an area." }
  ],
  "Protection": [
    { name: "Armored Skin", rank: 1, modifiers: [{ name: "Noticeable", ranks: 1, cost: 1, costType: "flat", category: "flaw" }], notes: "Tough hide or dense scales noticeable to observers." },
    { name: "Force Field", rank: 1, modifiers: [{ name: "Sustained", ranks: 1, cost: 0, costType: "per_rank", category: "extra" }], notes: "Energy barrier maintained as a free action (+0 pts/r)." }
  ],
  "Regeneration": [
    { name: "Rapid Healing", rank: 5, notes: "Recovers from damage conditions every 6 rounds." },
    { name: "Instant Regeneration", rank: 10, notes: "Recovers from least severe damage condition every round." },
    { name: "Undying", rank: 15, modifiers: [{ name: "Persistent", ranks: 1, cost: 1, costType: "flat", category: "extra" }], notes: "Can regenerate even from the Dead condition within 4 minutes." },
    { name: "Sustained Regeneration", rank: 5, modifiers: [{ name: "Sustained", ranks: 1, cost: 0, costType: "per_rank", category: "extra" }], notes: "Requires active Free action each round to maintain healing (+0 tradeoff)." }
  ],
  "Remote Sensing": [
    { name: "Astral Projection", rank: 1, options: { remote_senses: "Three Sense Types (7 pts/r)" }, modifiers: [{ name: "Side Effect", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }], notes: "Displaces Sight, Hearing, and Mental senses; physical body remains defenseless/immobile." },
    { name: "Scrying", rank: 1, options: { remote_senses: "Sight / Two Sense Types (6 pts/r)" }, notes: "Displaces Sight and Hearing to perceive a distant location." },
    { name: "Telepresence", rank: 1, options: { remote_senses: "Sight / Two Sense Types (6 pts/r)" }, modifiers: [{ name: "Medium", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }], notes: "Perceives through electronic video and audio feeds (Technology medium)." }
  ],
  "Summon": [
    { name: "Duplication", rank: 1, modifiers: [{ name: "Heroic", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }], notes: "Summons a heroic clone/duplicate of yourself." }
  ],
  "Teleport": [
    { name: "Portal", rank: 1, modifiers: [{ name: "Area Effect (Sphere)", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }, { name: "Concentration", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }], notes: "Leaves a gateway open that others can step through." }
  ]
};

const EXTRACTED_MODIFIERS = {
  "Affliction": {
      extras: [{name: "Concentration", cost: 1, costType: "per_rank"}, {name: "Contagious", cost: 1, costType: "per_rank"}, {name: "Cumulative", cost: 1, costType: "per_rank"}, {name: "Empowering", cost: 2, costType: "per_rank"}, {name: "Extra Condition", cost: 1, costType: "per_rank"}, {name: "Fatal", cost: 1, costType: "per_rank"}, {name: "Increasing Difficulty", cost: 1, costType: "per_rank"}, {name: "Progressive", cost: 2, costType: "per_rank"}, {name: "Prolonged", cost: 2, costType: "per_rank"}, {name: "Reversible (Close)", cost: 1, costType: "flat"}, {name: "Reversible (Ranged)", cost: 2, costType: "flat"}, {name: "Sustained", cost: 2, costType: "per_rank"}, {name: "Variable Conditions (One Degree)", cost: 1, costType: "per_rank"}, {name: "Variable Conditions (All)", cost: 2, costType: "per_rank"}],
      flaws: [{name: "Decreasing Difficulty", cost: 1, costType: "flat"}, {name: "Instant Recovery", cost: 1, costType: "per_rank"}, {name: "Limited Degree", cost: 1, costType: "per_rank"}, {name: "Onset (1 Round)", cost: 1, costType: "flat"}, {name: "Onset (1 Scene)", cost: 1, costType: "per_rank"}]
  },
  "Burrowing": {
      extras: [{name: "Penetrating", cost: 1, costType: "per_rank"}, {name: "Ranged", cost: 1, costType: "per_rank"}],
      flaws: [{name: "Limited", cost: 1, costType: "per_rank"}, {name: "No Collapse", cost: 1, costType: "flat"}, {name: "No Tunnel", cost: 1, costType: "flat"}]
  },
  "Communication": {
      extras: [{name: "Broadcast", cost: 1, costType: "per_rank"}, {name: "Dimensional (1 Dimension)", cost: 1, costType: "flat"}, {name: "Dimensional (Related Group)", cost: 2, costType: "flat"}, {name: "Dimensional (Any)", cost: 3, costType: "flat"}, {name: "Rapid", cost: 1, costType: "flat"}, {name: "Selective", cost: 1, costType: "per_rank"}, {name: "Subtle (Encrypted)", cost: 1, costType: "flat"}, {name: "Subtle (Undetectable)", cost: 2, costType: "flat"}],
      flaws: [{name: "Limited", cost: 1, costType: "per_rank"}, {name: "One-Way", cost: 1, costType: "per_rank"}, {name: "Sense-Dependent", cost: 1, costType: "per_rank"}]
  },
  "Comprehend": {
      extras: [],
      flaws: [{name: "Limited Type (Broad)", cost: 1, costType: "flat"}, {name: "Limited Type (Narrow)", cost: 2, costType: "flat"}]
  },
  "Concealment": {
      extras: [{name: "Affects Others", cost: 1, costType: "per_rank"}, {name: "Precise", cost: 1, costType: "flat"}],
      flaws: [{name: "Blending", cost: 1, costType: "per_rank"}, {name: "Limited", cost: 1, costType: "per_rank"}, {name: "Partial", cost: 1, costType: "per_rank"}, {name: "Passive", cost: 1, costType: "per_rank"}, {name: "Resistible", cost: 1, costType: "per_rank"}]
  },
  "Create": {
      extras: [{name: "Continuous", cost: 1, costType: "per_rank"}, {name: "Equipment", cost: 1, costType: "per_rank"}, {name: "Increased Volume", cost: 1, costType: "flat"}, {name: "Movable", cost: 1, costType: "per_rank"}, {name: "Permanent", cost: 0, costType: "per_rank"}, {name: "Precise", cost: 1, costType: "flat"}, {name: "Selective", cost: 1, costType: "per_rank"}, {name: "Self-Repairing", cost: 1, costType: "per_rank"}, {name: "Stationary", cost: 0, costType: "per_rank"}, {name: "Subtle (Looks Real)", cost: 1, costType: "flat"}, {name: "Subtle (Invisible)", cost: 2, costType: "flat"}, {name: "Variable Opacity", cost: 1, costType: "flat"}],
      flaws: [{name: "Feedback", cost: 1, costType: "per_rank"}, {name: "Fragile", cost: 1, costType: "flat"}, {name: "Small", cost: 1, costType: "flat"}]
  },
  "Damage": {
      extras: [{name: "Strength-Based", cost: 0, costType: "per_rank"}],
      flaws: []
  },
  "Deflect": {
      extras: [{name: "Aura", cost: 3, costType: "per_rank"}, {name: "Free Action", cost: 2, costType: "per_rank"}, {name: "Ranged", cost: 1, costType: "per_rank"}, {name: "Reaction", cost: 1, costType: "per_rank"}, {name: "Redirect", cost: 1, costType: "flat"}, {name: "Reflect", cost: 1, costType: "per_rank"}, {name: "Simple Action", cost: 1, costType: "per_rank"}],
      flaws: [{name: "Limited", cost: 1, costType: "per_rank"}]
  },
  "Elongation": {
      extras: [{name: "Slithering", cost: 1, costType: "flat"}, {name: "Striding", cost: 1, costType: "flat"}, {name: "Swinging", cost: 2, costType: "flat"}],
      flaws: []
  },
  "Enhanced Senses": {
      extras: [{name: "Affects Others", cost: 1, costType: "per_rank"}, {name: "Area Effect", cost: 1, costType: "per_rank"}, {name: "Ranged", cost: 1, costType: "per_rank"}],
      flaws: [{name: "Limited", cost: 1, costType: "per_rank"}, {name: "Noticeable", cost: 1, costType: "flat"}, {name: "Unreliable", cost: 1, costType: "per_rank"}]
  },
  "Enhanced Trait": {
      extras: [{name: "Sustained", cost: 0, costType: "per_rank"}],
      flaws: [{name: "Limited", cost: 1, costType: "per_rank"}, {name: "Reduced Trait", cost: 1, costType: "flat", hasRanks: true, maxRanks: 20}]
  },
  "Environment": {
      extras: [{name: "Shape", cost: 0, costType: "per_rank"}, {name: "Variable", cost: 1, costType: "per_rank"}],
      flaws: []
  },
  "Extra Limbs": {
      extras: [{name: "Continuous", cost: 1, costType: "per_rank"}, {name: "Projection", cost: 1, costType: "per_rank"}, {name: "Sustained", cost: 0, costType: "per_rank"}, {name: "Variable", cost: 1, costType: "flat"}],
      flaws: [{name: "Distracting", cost: 1, costType: "per_rank"}]
  },
  "Feature": {
      extras: [{name: "Sustained", cost: 0, costType: "per_rank"}],
      flaws: []
  },
  "Flight": {
      extras: [{name: "Continuous", cost: 1, costType: "per_rank"}, {name: "Safe Landing", cost: 1, costType: "flat"}, {name: "Subtle (Quiet)", cost: 1, costType: "flat"}, {name: "Subtle (Unnoticeable)", cost: 2, costType: "flat"}],
      flaws: [{name: "Concentration", cost: 1, costType: "per_rank"}, {name: "Distracting", cost: 1, costType: "per_rank"}, {name: "Gliding", cost: 1, costType: "per_rank"}, {name: "Levitation", cost: 1, costType: "per_rank"}, {name: "Platform", cost: 1, costType: "per_rank"}, {name: "Restrainable", cost: 1, costType: "per_rank"}, {name: "Rocket", cost: 1, costType: "per_rank"}]
  },
  "Fortune Control": {
      extras: [{name: "Additional Use", cost: 1, costType: "flat"}, {name: "Enhanced Advantages", cost: 1, costType: "flat"}],
      flaws: [{name: "Action (Free)", cost: 1, costType: "per_rank"}, {name: "Action (Standard/Reaction)", cost: 2, costType: "per_rank"}, {name: "Attack Check", cost: 1, costType: "per_rank"}, {name: "Resistible", cost: 1, costType: "per_rank"}, {name: "Side Effect (Failure)", cost: 1, costType: "per_rank"}, {name: "Side Effect (Always)", cost: 2, costType: "per_rank"}]
  },
  "Growth": {
      extras: [{name: "Growth Momentum", cost: 1, costType: "flat"}, {name: "Permanent", cost: 0, costType: "per_rank"}],
      flaws: []
  },
  "Healing": {
      extras: [{name: "Area Effect", cost: 1, costType: "per_rank"}, {name: "Energizing", cost: 1, costType: "per_rank"}, {name: "Perception Range", cost: 2, costType: "per_rank"}, {name: "Persistent", cost: 1, costType: "flat"}, {name: "Ranged", cost: 1, costType: "per_rank"}, {name: "Repair", cost: 1, costType: "per_rank"}, {name: "Repair Only", cost: 0, costType: "per_rank"}, {name: "Resurrection", cost: 1, costType: "per_rank"}, {name: "Selective", cost: 1, costType: "per_rank"}],
      flaws: [{name: "Empathic", cost: 1, costType: "per_rank"}, {name: "Limited", cost: 1, costType: "per_rank"}, {name: "Temporary", cost: 1, costType: "per_rank"}]
  },
  "Illusion": {
      extras: [{name: "Active", cost: 1, costType: "per_rank"}, {name: "Continuous", cost: 2, costType: "per_rank"}, {name: "Selective", cost: 1, costType: "per_rank"}],
      flaws: [{name: "Feedback", cost: 1, costType: "per_rank"}, {name: "Limited to Minds", cost: 1, costType: "per_rank"}, {name: "Limited to One Subject", cost: 1, costType: "per_rank"}, {name: "Resistible", cost: 1, costType: "per_rank"}]
  },
  "Immunity": {
      extras: [{name: "Affects Others", cost: 1, costType: "per_rank"}, {name: "Affects Others Only", cost: 0, costType: "per_rank"}, {name: "Area Effect", cost: 1, costType: "per_rank"}, {name: "Ranged", cost: 1, costType: "per_rank"}, {name: "Sustained", cost: 0, costType: "per_rank"}, {name: "Redirect (Reaction)", cost: 1, costType: "flat"}, {name: "Redirect (Sustained)", cost: 1, costType: "per_rank"}, {name: "Redirect (Continuous)", cost: 2, costType: "per_rank"}],
      flaws: [{name: "Concentration", cost: 1, costType: "per_rank"}, {name: "Resistance", cost: 1, costType: "per_rank"}, {name: "Fades", cost: 1, costType: "per_rank"}, {name: "Limited", cost: 1, costType: "per_rank"}]
  },
  "Insubstantial": {
      extras: [{name: "Affects Corporeal", cost: 1, costType: "per_rank"}, {name: "Affects Others", cost: 1, costType: "per_rank"}, {name: "Continuous", cost: 1, costType: "per_rank"}, {name: "Linked", cost: 0, costType: "per_rank"}, {name: "Normally Insubstantial", cost: 0, costType: "per_rank"}, {name: "Permanent", cost: 0, costType: "per_rank"}, {name: "Precise", cost: 1, costType: "flat"}, {name: "Reaction", cost: 1, costType: "flat"}, {name: "Subtle (DC 20)", cost: 1, costType: "flat"}, {name: "Subtle (Unnoticeable)", cost: 2, costType: "flat"}],
      flaws: [{name: "Limited to While Insubstantial", cost: 1, costType: "per_rank"}, {name: "No Strength", cost: 5, costType: "flat"}]
  },
  "Leaping": {
      extras: [],
      flaws: [{name: "Acrobatics Check Required", cost: 1, costType: "per_rank"}, {name: "Full Power", cost: 1, costType: "flat"}]
  },
  "Lifting": {
      extras: [{name: "Still Strength", cost: 1, costType: "flat"}],
      flaws: []
  },
  "Mind Reading": {
      extras: [{name: "Cumulative", cost: 1, costType: "per_rank"}, {name: "Effortless", cost: 1, costType: "per_rank"}, {name: "Sensory Link", cost: 1, costType: "per_rank"}, {name: "Subtle (DC 20)", cost: 1, costType: "flat"}, {name: "Subtle (Unnoticeable)", cost: 2, costType: "flat"}],
      flaws: [{name: "Close", cost: 2, costType: "per_rank"}, {name: "Feedback", cost: 1, costType: "per_rank"}, {name: "Limited by Language", cost: 1, costType: "per_rank"}, {name: "Limited to Emotions", cost: 1, costType: "per_rank"}, {name: "Limited to Sensory Link", cost: 1, costType: "per_rank"}, {name: "Limited to Surface", cost: 1, costType: "per_rank"}, {name: "Sense-Dependent", cost: 1, costType: "per_rank"}]
  },
  "Morph": {
      extras: [{name: "Metamorph", cost: 1, costType: "flat"}],
      flaws: [{name: "Resistible", cost: 1, costType: "per_rank"}]
  },
  "Move Object": {
      extras: [{name: "Damaging", cost: 1, costType: "per_rank"}, {name: "Perception Range", cost: 1, costType: "per_rank"}, {name: "Precise", cost: 1, costType: "flat"}, {name: "Subtle (Hard to Notice)", cost: 1, costType: "flat"}, {name: "Subtle (Unnoticeable)", cost: 2, costType: "flat"}],
      flaws: [{name: "Close Range", cost: 1, costType: "per_rank"}, {name: "Concentration", cost: 1, costType: "per_rank"}, {name: "Limited Direction", cost: 1, costType: "per_rank"}, {name: "Limited Material", cost: 1, costType: "per_rank"}, {name: "Limited Material (Rare)", cost: 2, costType: "per_rank"}]
  },
  "Nullify": {
      extras: [{name: "Alternate Resistance", cost: 0, costType: "per_rank"}, {name: "Area Effect", cost: 1, costType: "per_rank"}, {name: "Broad", cost: 1, costType: "per_rank"}, {name: "Concentration", cost: 1, costType: "per_rank"}, {name: "Continuous", cost: 3, costType: "per_rank"}, {name: "Effortless", cost: 1, costType: "per_rank"}, {name: "Precise", cost: 1, costType: "flat"}, {name: "Reaction", cost: 1, costType: "flat"}, {name: "Selective", cost: 1, costType: "per_rank"}, {name: "Simultaneous", cost: 1, costType: "per_rank"}, {name: "Sustained", cost: 2, costType: "per_rank"}],
      flaws: [{name: "Close Range", cost: 1, costType: "per_rank"}]
  },
  "Obscure": {
      extras: [{name: "Continuous", cost: 1, costType: "per_rank"}, {name: "Independent", cost: 0, costType: "per_rank"}, {name: "Selective", cost: 1, costType: "per_rank"}],
      flaws: [{name: "Close Range", cost: 1, costType: "per_rank"}]
  },
  "Protection": {
      extras: [{name: "Sustained", cost: 0, costType: "per_rank"}],
      flaws: [{name: "Fades", cost: 1, costType: "per_rank"}, {name: "Limited", cost: 1, costType: "per_rank"}, {name: "Noticeable", cost: 1, costType: "flat"}, {name: "Unreliable", cost: 1, costType: "per_rank"}]
  },
  "Quickness": {
      extras: [],
      flaws: [{name: "Limited to One Task", cost: 2, costType: "per_rank"}, {name: "Mental Quickness", cost: 1, costType: "per_rank"}, {name: "Physical Quickness", cost: 1, costType: "per_rank"}]
  },
  "Regeneration": {
      extras: [{name: "Diehard", cost: 1, costType: "flat"}, {name: "Persistent", cost: 1, costType: "flat"}, {name: "Sustained", cost: 0, costType: "per_rank"}],
      flaws: [{name: "Not Against [Descriptor]", cost: 1, costType: "per_rank"}, {name: "Not Against [Rare Descriptor]", cost: 2, costType: "flat"}, {name: "Only When Dead", cost: 2, costType: "per_rank"}, {name: "Only When Incapacitated", cost: 1, costType: "per_rank"}, {name: "Source", cost: 1, costType: "per_rank"}]
  },
  "Remote Sensing": {
      extras: [{name: "Communication", cost: 2, costType: "per_rank"}, {name: "Dimensional (1 Dimension)", cost: 1, costType: "flat"}, {name: "Dimensional (Group)", cost: 2, costType: "flat"}, {name: "Dimensional (Any)", cost: 3, costType: "flat"}, {name: "Protected", cost: 1, costType: "per_rank"}, {name: "Simultaneous", cost: 1, costType: "per_rank"}, {name: "Subtle (DC 20)", cost: 1, costType: "flat"}, {name: "Subtle (Unnoticeable)", cost: 2, costType: "flat"}, {name: "Targeting", cost: 1, costType: "per_rank"}],
      flaws: [{name: "Feedback", cost: 1, costType: "per_rank"}, {name: "Medium", cost: 1, costType: "per_rank"}, {name: "Noticeable", cost: 1, costType: "flat"}]
  },
  "Shrinking": {
      extras: [{name: "Atomic", cost: 1, costType: "flat"}, {name: "Growth Momentum", cost: 1, costType: "flat"}, {name: "Microscopic", cost: 1, costType: "flat"}, {name: "Normal Speed", cost: 1, costType: "per_rank"}, {name: "Permanent", cost: 0, costType: "per_rank"}],
      flaws: []
  },
  "Summon": {
      extras: [{name: "Controlled", cost: 1, costType: "per_rank"}, {name: "Heroic", cost: 1, costType: "per_rank"}, {name: "Horde", cost: 1, costType: "per_rank"}, {name: "Memory Merge", cost: 1, costType: "flat"}, {name: "Mental Link", cost: 1, costType: "flat"}, {name: "Multiple Minions", cost: 2, costType: "per_rank"}, {name: "Sacrifice", cost: 1, costType: "flat"}, {name: "Variable Type (General)", cost: 1, costType: "per_rank"}, {name: "Variable Type (Broad)", cost: 2, costType: "per_rank"}],
      flaws: [{name: "Attitude (Indifferent)", cost: 1, costType: "per_rank"}, {name: "Attitude (Unfavorable)", cost: 2, costType: "per_rank"}, {name: "Hostile", cost: 2, costType: "per_rank"}, {name: "Resistible", cost: 1, costType: "per_rank"}]
  },
  "Teleport": {
      extras: [{name: "Accurate (Teleport)", cost: 1, costType: "per_rank"}, {name: "Change Direction", cost: 1, costType: "flat"}, {name: "Change Velocity", cost: 1, costType: "flat"}, {name: "Easy", cost: 1, costType: "per_rank"}, {name: "Extended", cost: 1, costType: "per_rank"}, {name: "Increased Mass", cost: 1, costType: "flat"}, {name: "Known Location", cost: 1, costType: "flat"}, {name: "Turnabout", cost: 1, costType: "flat"}],
      flaws: [{name: "Extended Only", cost: 1, costType: "per_rank"}, {name: "Medium", cost: 1, costType: "per_rank"}]
  },
  "Transmute": {
      extras: [{name: "Continuous", cost: 1, costType: "per_rank"}],
      flaws: [{name: "Concentration", cost: 1, costType: "per_rank"}]
  },
  "Variable": {
      extras: [{name: "Action (Simple)", cost: 1, costType: "per_rank"}, {name: "Action (Free)", cost: 2, costType: "per_rank"}, {name: "Triggered", cost: 3, costType: "per_rank"}],
      flaws: []
  }
};

if (typeof POWER_EFFECTS_LIST !== 'undefined') {
    POWER_EFFECTS_LIST.forEach(eff => {
        if (EXTRACTED_CONFIGS[eff.name]) {
            eff.configurations = EXTRACTED_CONFIGS[eff.name];
        }
        if (EXTRACTED_MODIFIERS[eff.name]) {
            eff.specificExtras = EXTRACTED_MODIFIERS[eff.name].extras || [];
            eff.specificFlaws = EXTRACTED_MODIFIERS[eff.name].flaws || [];
        }
    });
}

// --- EFFECT TYPE TO ALLOWED MODIFIERS FILTER ---
const MODIFIER_CATEGORY_MAP = {
  Attack: ["Accurate","Affects Insubstantial","Area Effect (Cone)","Area Effect (Cube)","Area Effect (Line)","Area Effect (Shapeable)","Area Effect (Sphere)","Aura","Contagious","Diminished Range","Extended Range","Homing","Inaccurate","Incurable","Indirect","Increased Range","Multiattack","Penetrating","Perception Range","Ranged","Reach","Reduced Range","Close","Ricochet","Secondary Effect","Selective","Split","Triggered","Variable Descriptor","Distracting","Fades","Feedback","Grab-Based","Resistible","Sense-Dependent","Tiring","Alternate Defense","Thrown","Increased Action"],
  Defense: ["Affects Others","Area Effect (Sphere)","Hardened","Impenetrable","Impervious","Increased Range","Perception Range","Ranged","Reach","Increased Duration (Sustained)","Increased Duration (Continuous)","Distracting","Fades","Reduced Range","Resistible","Tiring","Sustained","Concentration"],
  Movement: ["Affects Others","Area Effect (Sphere)","Increased Duration (Continuous)","Extended Range","Increased Range","Perception Range","Ranged","Selective","Subtle","Distracting","Fades","Reduced Range","Resistible","Tiring","Increased Mass","Sustained","Concentration"],
  Sensory: ["Affects Others","Area Effect (Sphere)","Dimensional","Extended Range","Increased Range","Perception Range","Ranged","Selective","Subtle","Diminished Range","Distracting","Fades","Feedback","Reduced Range","Sense-Dependent","Tiring","Increased Duration (Concentration)","Increased Duration (Sustained)","Increased Duration (Continuous)","Sustained","Concentration"],
  Control: ["Affects Insubstantial","Affects Objects","Area Effect (Cone)","Area Effect (Cube)","Area Effect (Line)","Area Effect (Shapeable)","Area Effect (Sphere)","Increased Duration (Continuous)","Diminished Range","Extended Range","Increased Range","Indirect","Perception Range","Precise","Ranged","Reach","Reduced Range","Close","Selective","Subtle","Triggered","Variable Descriptor","Increased Duration (Concentration)","Distracting","Fades","Feedback","Resistible","Sense-Dependent","Tiring","Increased Mass","Sustained","Concentration"],
  Alteration: ["Affects Corporeal","Affects Others","Area Effect (Sphere)","Increased Duration (Continuous)","Diminished Range","Extended Range","Increased Range","Perception Range","Precise","Ranged","Reach","Reduced Range","Close","Subtle","Increased Duration (Concentration)","Distracting","Fades","Feedback","Resistible","Tiring","Sustained","Concentration"],
  General: ["Alternate Effect","Feature","Linked","Quirk","Removable (Device)","Removable (Easily Removable)","Activation","Check Required","Side Effect","Noticeable","Insidious","Limited","Uncontrolled","Unreliable","Independent","Short-Term","Reversible","Alternate Resistance","Permanent","Reaction"]
};


// --- SENSE TYPE DICTIONARY ---
const SENSE_TYPE_MAP = {
  "Normal Sight": "Visual", "Darkvision": "Visual", "Dark-Vision": "Visual", "Infravision": "Visual", "Infra-Vision": "Visual", 
  "Low-Light Vision": "Visual", "Microscopic Vision": "Visual", "Ultravision": "Visual", "Ultra-Vision": "Visual",
  "Normal Hearing": "Auditory", "Ultra-Hearing": "Auditory",
  "Normal Smell": "Olfactory", "Normal Taste": "Olfactory",
  "Normal Touch": "Tactile",
  "Normal Radio": "Radio", "Radio": "Radio",
  "Normal Mental": "Mental", "Awareness": "Mental", "Danger Sense": "Mental"
};


window.generateSmartModifiers = function(effect) {
    if (!effect || !effect.effectName) return { extras: [], flaws: [] };
    let effectData = typeof POWER_EFFECTS_LIST !== 'undefined' ? POWER_EFFECTS_LIST.find(e => e.name === effect.effectName) : null;
    if (!effectData) return { extras: [], flaws: [] };
    
    let extras = [];
    let flaws = [];
    
    let baseRange = effectData.range || "Close";
    let baseDur = effectData.duration || "Instant";
    let baseAct = effectData.action || "Standard";

    const DURATION_TIERS = { "Instant": 1, "Concentration": 2, "Sustained": 3, "Continuous": 4, "Permanent": 5 };
    const ACTION_TIERS = { "Full": 1, "Standard": 2, "Move": 3, "Free": 4, "Reaction": 5, "None": 6 };

    // RANGE
    if (baseRange === "Personal") {
        extras.push({ name: "Increased Range", cost: 1, costType: "per_rank", hasRanks: true, maxRanks: 2, category: "extra" });
    } else if (baseRange === "Close") {
        extras.push({ name: "Increased Range", cost: 1, costType: "per_rank", hasRanks: true, maxRanks: 2, category: "extra" });
        extras.push({ name: "Ranged", cost: 1, costType: "per_rank", hasRanks: false, category: "extra" });
        extras.push({ name: "Perception Range", cost: 2, costType: "per_rank", hasRanks: false, category: "extra" });
        extras.push({ name: "Reach", cost: 1, costType: "flat", hasRanks: true, maxRanks: 20, category: "extra" });
    } else if (baseRange === "Ranged") {
        extras.push({ name: "Increased Range", cost: 1, costType: "per_rank", hasRanks: false, category: "extra" });
        extras.push({ name: "Perception Range", cost: 1, costType: "per_rank", hasRanks: false, category: "extra" });
        extras.push({ name: "Extended Range", cost: 1, costType: "flat", hasRanks: true, maxRanks: 10, category: "extra" });
        flaws.push({ name: "Reduced Range", cost: 1, costType: "per_rank", hasRanks: false, category: "flaw" });
        flaws.push({ name: "Close", cost: 1, costType: "per_rank", hasRanks: false, category: "flaw" });
        flaws.push({ name: "Diminished Range", cost: 1, costType: "flat", hasRanks: true, maxRanks: 3, category: "flaw" });
    } else if (baseRange === "Perception") {
        flaws.push({ name: "Reduced Range", cost: 1, costType: "per_rank", hasRanks: true, maxRanks: 2, category: "flaw" });
        flaws.push({ name: "Close", cost: 2, costType: "per_rank", hasRanks: false, category: "flaw" });
    }

    // DURATION
    let dTier = DURATION_TIERS[baseDur];
    if (dTier !== undefined && dTier >= 1 && dTier <= 4) {
        if (dTier === 1) {
            extras.push({ name: "Increased Duration (Concentration)", cost: 1, costType: "per_rank", category: "extra" });
            extras.push({ name: "Increased Duration (Sustained)", cost: 2, costType: "per_rank", category: "extra" });
            extras.push({ name: "Increased Duration (Continuous)", cost: 3, costType: "per_rank", category: "extra" });
        } else if (dTier === 2) {
            extras.push({ name: "Increased Duration (Sustained)", cost: 1, costType: "per_rank", category: "extra" });
            extras.push({ name: "Increased Duration (Continuous)", cost: 2, costType: "per_rank", category: "extra" });
            flaws.push({ name: "Decreased Duration (Instant)", cost: 1, costType: "per_rank", category: "flaw" });
        } else if (dTier === 3) {
            extras.push({ name: "Increased Duration (Continuous)", cost: 1, costType: "per_rank", category: "extra" });
            flaws.push({ name: "Decreased Duration (Concentration)", cost: 1, costType: "per_rank", category: "flaw" });
            flaws.push({ name: "Decreased Duration (Instant)", cost: 2, costType: "per_rank", category: "flaw" });
        } else if (dTier === 4) {
            flaws.push({ name: "Decreased Duration (Sustained)", cost: 1, costType: "per_rank", category: "flaw" });
            flaws.push({ name: "Decreased Duration (Concentration)", cost: 2, costType: "per_rank", category: "flaw" });
            flaws.push({ name: "Decreased Duration (Instant)", cost: 3, costType: "per_rank", category: "flaw" });
        }
    }

    // ACTION
    let aTier = ACTION_TIERS[baseAct];
    if (aTier !== undefined && aTier >= 2 && aTier <= 5) {
        if (aTier === 2) {
            extras.push({ name: "Action (Move)", cost: 1, costType: "per_rank", category: "extra" });
            extras.push({ name: "Action (Free)", cost: 2, costType: "per_rank", category: "extra" });
            extras.push({ name: "Action (Reaction)", cost: 3, costType: "per_rank", category: "extra" });
            flaws.push({ name: "Activation (Move)", cost: 1, costType: "flat", category: "flaw" });
            flaws.push({ name: "Activation (Standard)", cost: 2, costType: "flat", category: "flaw" });
        } else if (aTier === 3) {
            extras.push({ name: "Action (Free)", cost: 1, costType: "per_rank", category: "extra" });
            extras.push({ name: "Action (Reaction)", cost: 2, costType: "per_rank", category: "extra" });
            flaws.push({ name: "Action (Standard)", cost: 1, costType: "per_rank", category: "flaw" });
        } else if (aTier === 4) {
            extras.push({ name: "Action (Reaction)", cost: 1, costType: "per_rank", category: "extra" });
            flaws.push({ name: "Action (Move)", cost: 1, costType: "per_rank", category: "flaw" });
            flaws.push({ name: "Action (Standard)", cost: 2, costType: "per_rank", category: "flaw" });
        } else if (aTier === 5) {
            flaws.push({ name: "Action (Free)", cost: 1, costType: "per_rank", category: "flaw" });
            flaws.push({ name: "Action (Move)", cost: 2, costType: "per_rank", category: "flaw" });
            flaws.push({ name: "Action (Standard)", cost: 3, costType: "per_rank", category: "flaw" });
        }
    }
    
    return { extras, flaws };
};

// --- GET FILTERED MODIFIERS FOR EFFECT ---
function getFilteredModifiersForEffect(effectType, effectOrSub) {
  const allowedNames = MODIFIER_CATEGORY_MAP[effectType] || MODIFIER_CATEGORY_MAP["General"];
  let available = [];

  if (typeof POWER_MODIFIERS_LIST !== 'undefined') {
    available = POWER_MODIFIERS_LIST.filter(m => allowedNames.includes(m.name) && !m.name.includes("Alternate Effect"));
  }

  if (effectOrSub && (effectOrSub.effectName === "Enhanced Senses" || (effectOrSub.name && effectOrSub.name.includes("Senses")))) {
      available = available.filter(m => m.name !== "Sense-Dependent" && m.name !== "Selective");
  }

  return available;
}

// --- REAL-TIME COST CALCULATION ENGINE WITH ARRAY/LINKED ROLLUP ---
char.calculateEffectCost = function(effect) {
  const effectData = typeof POWER_EFFECTS_LIST !== 'undefined' ? POWER_EFFECTS_LIST.find(e => e.name === effect.effectName) : null;
  let pBaseCost = effectData ? effectData.baseCost : 1;
  const isComposite = ["Enhanced Senses", "Enhanced Movement", "Enhanced Trait", "Comprehend", "Immunity"].includes(effect.effectName);

  if (isComposite) {
    let totalRank = 0;
    let totalSubCost = 0;

    if (effect.subPowers && effect.subPowers.length > 0) {
      effect.subPowers.forEach(sub => {
        let sRank = parseInt(sub.rank) || 1;
        totalRank += sRank;

        let sBaseCost = sub.baseCost !== undefined ? sub.baseCost : pBaseCost;
        let cType = sub.costType || "per_rank";
        let sPerRankMod = 0;
        let sFlatMod = 0;
        let sRemovableTiers = 0;

        if (sub.modifiers && sub.modifiers.length > 0) {
          sub.modifiers.forEach(m => {
            let mult = m.category === 'extra' ? 1 : -1;
            let mCost = (m.cost !== undefined && m.cost !== null) ? Number(m.cost) : 1;
            let mRanks = parseInt(m.ranks) || 1;
            
            if (m.isMeta) {
               if (m.costType === 'per_rank') sFlatMod += mult * (mCost * mRanks);
               else sFlatMod += mult * mCost;
            } else if (m.costType === 'per_rank') {
               sPerRankMod += mult * mCost;
            } else if (m.costType === 'flat') {
               sFlatMod += mult * (mCost * mRanks);
            } else if (m.costType === 'removable') {
               sRemovableTiers += mRanks;
            }
          });
        }

        let netSubRate = sBaseCost + sPerRankMod;
        if (netSubRate < 1 && cType === "per_rank") netSubRate = 1;

        let sCost = 0;
        if (cType === "per_rank") {
            sCost = (netSubRate * sRank) + sFlatMod;
        } else {
            sCost = sBaseCost + (sPerRankMod * sRank) + sFlatMod;
        }

        if (sRemovableTiers > 0) {
            let discount = Math.floor(sCost / 5) * sRemovableTiers;
            sCost -= discount;
        }

        if (sCost < 1) sCost = 1;
        
        if (sub.isReduced) {
            sCost = -sCost;
        }
        
        totalSubCost += sCost;
      });
    } else {
      totalRank = 1; 
    }
    
    effect.rank = totalRank || 1;

    let pPerRank = 0, pFlat = 0, pRemovable = 0;
    if(effect.modifiers && effect.modifiers.length > 0) {
        effect.modifiers.forEach(m => {
            let mult = m.category === 'extra' ? 1 : -1;
            let mC = (m.cost !== undefined && m.cost !== null ? Number(m.cost) : 1) * (parseInt(m.ranks)||1);
            if(m.costType === 'per_rank') pPerRank += mult * mC;
            else if(m.costType === 'flat') pFlat += mult * mC;
            else if(m.costType === 'removable') pRemovable += parseInt(m.ranks)||1;
        });
    }

    let finalCost = totalSubCost + (pPerRank * effect.rank) + pFlat;
    if(pRemovable > 0) finalCost -= Math.floor(finalCost / 5) * pRemovable;
    return finalCost < 1 ? 1 : finalCost;

  } else {
    let pPerRank = 0, pFlat = 0, pRemovable = 0;
    if(effect.modifiers && effect.modifiers.length > 0) {
        effect.modifiers.forEach(m => {
            let mult = m.category === 'extra' ? 1 : -1;
            let mC = (m.cost !== undefined && m.cost !== null ? Number(m.cost) : 1) * (parseInt(m.ranks)||1);
            if(m.costType === 'per_rank') pPerRank += mult * mC;
            else if(m.costType === 'flat') pFlat += mult * mC;
            else if(m.costType === 'removable') pRemovable += parseInt(m.ranks)||1;
        });
    }
    let netRate = pBaseCost + pPerRank;
    if(netRate < 1) netRate = 1;
    let finalCost = (netRate * (parseInt(effect.rank)||1)) + pFlat;
    if(pRemovable > 0) finalCost -= Math.floor(finalCost / 5) * pRemovable;
    return finalCost < 1 ? 1 : finalCost;
  }
};

char.calculateTotalPowerCost = function(powerContainer) {
  return CharacterModel.prototype.calculateTotalPowerCost.call(char, powerContainer);
};
char.calculatePowerCost = char.calculateTotalPowerCost;

window.getMaxPowerRank = function(effect, subPower) {
  if (subPower) {
     let type = subPower.type || subPower.name || "";
     
     if (effect && effect.effectName === "Enhanced Trait") {
       if (typeof ADVANTAGES_LIST !== 'undefined') {
         let adv = ADVANTAGES_LIST.find(a => a.name === type);
         if (adv) {
           return (adv.hasRanks || adv.ranked) ? (adv.maxRanks || 10) : 1;
         }
       }
       return 20;
     }

     if (subPower.costType === "flat" && !type.includes("Sense Type") && effect.effectName !== "Immunity") return 1;

     if (type.includes("Dimensional Travel") || type.includes("Space Travel")) return 20; 
     if (type.includes("Permeate")) return 6;
     if (type.includes("Wall-Crawling")) return 4;
     if (type.includes("Water-Walking") || type.includes("Swinging")) return 2;
     
     if (type.includes("Microscopic Vision")) return 4;
     if (type.includes("Dimensional")) return 3;
     
     if (effect.effectName === "Immunity") {
         if (type.includes("Custom Immunity")) return 30;
         const rMatch = type.match(/\[(\d+)\s*ranks?\]/i) || (subPower.name && subPower.name.match(/\[(\d+)\s*ranks?\]/i));
         if (rMatch) return parseInt(rMatch[1]);
         return 30;
     }

     if (type.includes("Custom Sense")) return 20;

     if (type.includes("Communication")) return 5;
     if (type.includes("Languages")) return 4;
     if (type.includes("Animals") || type.includes("Computers") || type.includes("Objects") || type.includes("Plants") || type.includes("Spirits")) return 2;
     return 20; 
  }

  if (!effect) return 20;

  let nameToCheck = effect.effectName;
  if (nameToCheck === "Comprehend") {
     let max = 4;
     if (effect.subPowers && effect.subPowers.length > 0) {
         let highest = 0;
         effect.subPowers.forEach(sub => {
             let t = sub.type || sub.name || "";
             if (t.includes("Languages")) highest = Math.max(highest, 4);
             else highest = Math.max(highest, 2);
         });
         return highest > 0 ? highest : 4;
     }
     return 4;
  }

  if (effect.subPowers && effect.subPowers.length > 0) {
     let highest = 0;
     let hasUncapped = false;
     effect.subPowers.forEach(sub => {
         let cap = window.getMaxPowerRank(effect, sub);
         if (cap === 20) hasUncapped = true;
         if (cap > highest) highest = cap;
     });
     if (hasUncapped) return 20;
     return highest > 0 ? highest : 20;
  }

  return 20;
};

function renderOptgroupChoices(choices, currentVal) {
    let html = '';
    let inGroup = false;
    choices.forEach(c => {
        if (c.startsWith("**") || c.startsWith("---")) {
            if (inGroup) html += '</optgroup>';
            html += `<optgroup label="${c.replace(/[*\-]/g, '').trim()}">`;
            inGroup = true;
        } else {
            html += `<option value="${c}" ${currentVal === c ? 'selected' : ''} style="color: var(--text-main); font-weight: normal;">${c}</option>`;
        }
    });
    if (inGroup) html += '</optgroup>';
    return html;
}

window.updateSubPowerDetails = function(pIdx, eIdx, subIdx, val) {
    if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx] && char.activePowers[pIdx].effects[eIdx].subPowers[subIdx]) {
        char.activePowers[pIdx].effects[eIdx].subPowers[subIdx].details = val;
    }
};

window.stepVal = function(elemId, delta, minVal, maxVal) {
  const input = document.getElementById(elemId);
  if (!input || input.disabled) return;
  let val = (parseInt(input.value) || 0) + delta;
  if (minVal !== undefined && val < minVal) val = minVal;
  if (maxVal !== undefined && val > maxVal) val = maxVal;
  input.value = val;
  input.dispatchEvent(new Event("input", { bubbles: true }));
};

window.showAdvantageInfo = function(advName) {
  const adv = ADVANTAGES_LIST.find(a => a.name === advName);
  if (!adv) return;
  document.getElementById("modalRuleTitle").textContent = adv.name + ` [${adv.types.join(", ")}]`;
  document.getElementById("modalRuleBody").textContent = adv.fullText || adv.description;
  document.getElementById("ruleInfoModal").classList.add("active");
};

window.showSkillInfo = function(skillName) {
  const skill = SKILLS_LIST.find(s => s.name === skillName);
  if (!skill) return;
  document.getElementById("modalRuleTitle").textContent = skill.name + ` (${skill.ability})`;
  document.getElementById("modalRuleBody").textContent = skill.fullText;
  document.getElementById("ruleInfoModal").classList.add("active");
};

let COMPLETE_FULL_TEXT_MAP = {};

window.showPowerEffectInfo = function(effectName) {
  const effect = POWER_EFFECTS_LIST.find(e => e.name === effectName);
  if (!effect) return;
  
  document.getElementById("modalRuleTitle").textContent = `${effect.name} [${effect.type}]`;
  const textToDisplay = effect.fullText || effect.shortDesc || "No description available.";

  const modalBody = document.getElementById("modalRuleBody");
  if (modalBody) {
      modalBody.innerHTML = textToDisplay.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
  }
  
  const modalElement = document.getElementById("ruleInfoModal");
  if (modalElement) {
      modalElement.classList.add("active");
  }
};

window.showModifierInfo = function(modName) {
  let mod = null;
  let baseName = modName.replace(/\s*\([^)]*\)/g, ''); // Remove parenthesis e.g., "Area Effect (Cone)" -> "Area Effect"
  
  if (typeof POWER_MODIFIERS_LIST !== 'undefined') {
    mod = POWER_MODIFIERS_LIST.find(m => m.name === modName) || POWER_MODIFIERS_LIST.find(m => m.name === baseName);
  }
  if (!mod && typeof POWER_EFFECTS_LIST !== 'undefined') {
    for (const eff of POWER_EFFECTS_LIST) {
      if (eff.specificExtras) {
        mod = eff.specificExtras.find(m => m.name === modName) || eff.specificExtras.find(m => m.name === baseName);
        if (mod) break;
      }
      if (eff.specificFlaws) {
        mod = eff.specificFlaws.find(m => m.name === modName) || eff.specificFlaws.find(m => m.name === baseName);
        if (mod) break;
      }
    }
  }

  const titleEl = document.getElementById("modalRuleTitle");
  const bodyEl = document.getElementById("modalRuleBody");

  if (!mod) {
      titleEl.textContent = modName || "Unknown Modifier";
      bodyEl.textContent = "No detailed description available for this modifier.";
      document.getElementById("ruleInfoModal").classList.add("active");
      return;
  }
  
  if (!mod.fullText && !mod.description && typeof POWER_EFFECTS_LIST !== 'undefined') {
      for (const eff of POWER_EFFECTS_LIST) {
          if ((eff.specificExtras && eff.specificExtras.some(m => m.name === mod.name)) || (eff.specificFlaws && eff.specificFlaws.some(m => m.name === mod.name))) {
              const regex = new RegExp(`\\*\\s*${mod.name.toUpperCase().replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")}\\s*:?\\s*(.*)`, 'i');
              const match = eff.fullText ? eff.fullText.match(regex) : null;
              if (match) {
                  mod.fullText = match[0].trim();
              } else {
                  const baseRegex = new RegExp(`\\*\\s*${baseName.toUpperCase().replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")}\\s*:?\\s*(.*)`, 'i');
                  const baseMatch = eff.fullText ? eff.fullText.match(baseRegex) : null;
                  if (baseMatch) {
                      mod.fullText = baseMatch[0].trim();
                  }
              }
              break;
          }
      }
  }

  titleEl.textContent = `${mod.name}`;
  bodyEl.textContent = mod.fullText || mod.description || "No description available.";
  document.getElementById("ruleInfoModal").classList.add("active");
};

window.showOptionInfo = function(optName, optDesc) {
  const titleEl = document.getElementById("modalRuleTitle");
  const bodyEl = document.getElementById("modalRuleBody");
  titleEl.textContent = optName || "Option Details";
  bodyEl.innerHTML = optDesc || "No additional information.";
  document.getElementById("ruleInfoModal").classList.add("active");
};

window.showConditionInfo = function(condName) {
  let cond = null;
  if (typeof CONDITIONS_LIST !== 'undefined') {
    cond = CONDITIONS_LIST.find(c => c.name.toLowerCase() === condName.toLowerCase());
  }
  if (!cond) {
      document.getElementById("modalRuleTitle").textContent = condName + " [Condition]";
      document.getElementById("modalRuleBody").textContent = "Rule text not found. The conditions list may not be loaded.";
      document.getElementById("ruleInfoModal").classList.add("active");
      return;
  }
  document.getElementById("modalRuleTitle").textContent = cond.name + " [Condition]";
  document.getElementById("modalRuleBody").textContent = cond.fullText || cond.description || "No specific rule text available.";
  document.getElementById("ruleInfoModal").classList.add("active");
};

window.checkScreenResolution = function() {
    if (localStorage.getItem("mm4e_disable_res_warning") === "true") {
        const existingWarning = document.getElementById("resWarningBanner");
        if (existingWarning) existingWarning.remove();
        return;
    }
    if (window.innerWidth < 1080) {
        if (!document.getElementById("resWarningBanner")) {
            const banner = document.createElement("div");
            banner.id = "resWarningBanner";
            banner.style.position = "fixed";
            banner.style.top = "0";
            banner.style.left = "0";
            banner.style.width = "100%";
            banner.style.backgroundColor = "#ef4444";
            banner.style.color = "#ffffff";
            banner.style.textAlign = "center";
            banner.style.padding = "8px 16px";
            banner.style.zIndex = "9999";
            banner.style.fontSize = "14px";
            banner.style.fontWeight = "bold";
            banner.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
            banner.innerHTML = `⚠️ Your screen width is less than 1080px. For the best builder experience, please use a wider screen or switch your device to landscape mode. <button id="dismissResWarning" style="margin-left:12px; background:rgba(0,0,0,0.2); border:1px solid #fff; color:white; padding:4px 8px; cursor:pointer; border-radius:4px; font-size:10pt;">Dismiss</button>`;
            document.body.prepend(banner);
            
            document.getElementById("dismissResWarning").addEventListener("click", () => {
                banner.remove();
            });
        }
    } else {
        const existingWarning = document.getElementById("resWarningBanner");
        if (existingWarning) existingWarning.remove();
    }
};

/* ==========================================================================
   REFERENCE TABLES POP-UP & POPOUT MANAGER
   ========================================================================== */
const TablesPopoutManager = {
  storageKey: "mm4e_tables_bounds",
  storageStateKey: "mm4e_tables_popped_out",
  defaultBounds: { width: 920, height: 720, left: 160, top: 120 },

  isPoppedOutSaved() {
    try {
      return localStorage.getItem(this.storageStateKey) === "true";
    } catch (e) {
      return false;
    }
  },

  setPoppedOutSaved(val) {
    try {
      if (val) localStorage.setItem(this.storageStateKey, "true");
      else localStorage.removeItem(this.storageStateKey);
    } catch (e) {}
  },
  win: null,
  placeholder: null,
  pollTimer: null,
  activeFilter: "",
  activeContentEl: null,
  parentContainer: null,
  isRedocking: false,

  getModalOverlay() {
    return document.getElementById("modalReferenceTables");
  },

  getContentEl() {
    if (this.activeContentEl && this.activeContentEl.ownerDocument) {
      return this.activeContentEl;
    }
    let el = document.getElementById("tablesDockableBody");
    if (!el && this.win && !this.win.closed) {
      try {
        el = this.win.document.getElementById("tablesDockableBody");
      } catch (e) {}
    }
    if (el) {
      this.activeContentEl = el;
      if (el.parentNode && el.parentNode.classList && el.parentNode.classList.contains("tables-modal-dialog")) {
        this.parentContainer = el.parentNode;
      }
    }
    return this.activeContentEl;
  },

  getNoticeEl() {
    return document.getElementById("boxPoppedOutTablesNotice");
  },

  getPopoutBtn() {
    return document.getElementById("btnPopoutTables");
  },

  getSearchInput() {
    return document.getElementById("txtTableFilter");
  },

  isOpenModal() {
    const modal = this.getModalOverlay();
    return modal && modal.style.display === "flex";
  },

  isPoppedOut() {
    return !!(this.win && !this.win.closed);
  },

  updateHeaderBtnState() {
    const btn = document.getElementById("btnOpenTablesModal");
    if (!btn) return;
    if (this.isPoppedOut()) {
      btn.title = "Reference Tables are open in pop-out window (Click to bring to front)";
      btn.classList.add("btn-popped-out-active");
    } else {
      btn.title = this.isPoppedOutSaved() ? "Open Reference Tables (Pop-Out)" : "Open Reference Tables";
      btn.classList.remove("btn-popped-out-active");
    }
  },

  getSavedBounds() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object") {
          let w = Math.max(380, Math.min(window.screen.availWidth || 2560, Number(parsed.width) || this.defaultBounds.width));
          let h = Math.max(280, Math.min(window.screen.availHeight || 1440, Number(parsed.height) || this.defaultBounds.height));
          let l = Number(parsed.left);
          let t = Number(parsed.top);
          if (isNaN(l) || l < -1000 || l > (window.screen.availWidth || 2560)) l = this.defaultBounds.left;
          if (isNaN(t) || t < -1000 || t > (window.screen.availHeight || 1440)) t = this.defaultBounds.top;
          return { width: Math.round(w), height: Math.round(h), left: Math.round(l), top: Math.round(t) };
        }
      }
    } catch (e) {}
    return { ...this.defaultBounds };
  },

  saveBounds() {
    if (!this.win || this.win.closed) return;
    try {
      const x = this.win.screenX !== undefined ? this.win.screenX : this.win.screenLeft;
      const y = this.win.screenY !== undefined ? this.win.screenY : this.win.screenTop;
      const w = this.win.outerWidth || this.win.innerWidth;
      const h = this.win.outerHeight || this.win.innerHeight;
      if (typeof x === "number" && typeof y === "number" && typeof w === "number" && typeof h === "number" &&
          !isNaN(x) && !isNaN(y) && !isNaN(w) && !isNaN(h) && w >= 300 && h >= 200) {
        const bounds = { width: Math.round(w), height: Math.round(h), left: Math.round(x), top: Math.round(y) };
        localStorage.setItem(this.storageKey, JSON.stringify(bounds));
      }
    } catch (e) {}
  },

  ensureDocked() {
    const contentEl = this.getContentEl();
    const parent = this.parentContainer || (document.getElementById("modalReferenceTables") ? document.getElementById("modalReferenceTables").querySelector(".tables-modal-dialog") : null);
    if (!contentEl || !parent) return;

    if (contentEl.ownerDocument === document && contentEl.parentNode === parent) {
      if (this.placeholder && this.placeholder.parentNode) {
        this.placeholder.remove();
        this.placeholder = null;
      }
      contentEl.style.display = "";
      return;
    }

    try {
      if (document.adoptNode && contentEl.ownerDocument !== document) {
        document.adoptNode(contentEl);
      }
    } catch (e) {}

    if (this.placeholder && this.placeholder.parentNode) {
      this.placeholder.parentNode.insertBefore(contentEl, this.placeholder);
      this.placeholder.remove();
      this.placeholder = null;
    } else {
      parent.appendChild(contentEl);
    }
    contentEl.style.display = "";
  },

  openModal(forceDocked = false) {
    if (this.isPoppedOut()) {
      try {
        this.win.focus();
      } catch (e) {}
      if (typeof showToast === "function") {
        showToast("Reference Tables window focused.", "info");
      }
      return;
    }

    if (!forceDocked && this.isPoppedOutSaved()) {
      this.popout();
      return;
    }

    this.ensureDocked();
    const modal = this.getModalOverlay();
    if (modal) {
      modal.style.display = "flex";
      const notice = this.getNoticeEl();
      if (notice) notice.style.display = "none";
      const popBtn = this.getPopoutBtn();
      if (popBtn) popBtn.style.display = "";
      const input = this.getSearchInput();
      if (input) {
        input.value = this.activeFilter;
        setTimeout(() => input.focus(), 60);
      }
      this.filterTables(this.activeFilter);
      this.updateToggleAllBtnState();
    }
  },

  closeModal(fromPopout = false) {
    const modal = this.getModalOverlay();
    if (modal) modal.style.display = "none";
    if (!fromPopout && !this.isPoppedOut()) {
      this.setPoppedOutSaved(false);
    }
  },

  toggleAllTables(forceExpand) {
    const contentEl = this.getContentEl();
    if (!contentEl) return;
    const panels = contentEl.querySelectorAll(".collapsible-panel");
    if (panels.length === 0) return;
    if (typeof forceExpand !== "boolean") {
      const anyCollapsed = Array.from(panels).some(p => p.classList.contains("collapsed"));
      forceExpand = anyCollapsed;
    }
    panels.forEach(p => {
      if (forceExpand) {
        p.classList.remove("collapsed");
      } else {
        p.classList.add("collapsed");
      }
    });
    this.updateToggleAllBtnState();
  },

  updateToggleAllBtnState() {
    const contentEl = this.getContentEl();
    if (!contentEl) return;
    const panels = contentEl.querySelectorAll(".collapsible-panel");
    if (panels.length === 0) return;
    const anyCollapsed = Array.from(panels).some(p => p.classList.contains("collapsed"));
    const text = anyCollapsed ? "Expand / Collapse All" : "Collapse All";
    const title = anyCollapsed ? "Expand all tables (Click to open all)" : "Collapse all tables (Click to collapse all)";
    const btnDocked = document.getElementById("btnToggleAllTables");
    if (btnDocked) {
      btnDocked.textContent = text;
      btnDocked.title = title;
    }
    if (this.win && !this.win.closed) {
      try {
        const btnPop = this.win.document.getElementById("btnPopoutToggleAll");
        if (btnPop) {
          btnPop.textContent = text;
          btnPop.title = title;
        }
      } catch (e) {}
    }
  },

  popout() {
    if (this.isPoppedOut()) {
      try { this.win.focus(); } catch (e) {}
      return;
    }

    this.ensureDocked();
    const contentEl = this.getContentEl();
    if (!contentEl) return;

    if (!this.parentContainer) {
      this.parentContainer = contentEl.parentNode || (document.getElementById("modalReferenceTables") ? document.getElementById("modalReferenceTables").querySelector(".tables-modal-dialog") : null);
    }

    const bounds = this.getSavedBounds();
    const features = `popup=yes,width=${bounds.width},height=${bounds.height},left=${bounds.left},top=${bounds.top},resizable=yes,scrollbars=yes`;

    try {
      this.win = window.open("", "_blank", features);
    } catch (err) {
      console.warn("Popout window open error:", err);
    }

    if (!this.win || this.win.closed || typeof this.win.closed === "undefined") {
      alert("Pop-out window was blocked by your browser. Please allow popups for this page.");
      this.setPoppedOutSaved(false);
      this.openModal(true);
      return;
    }

    this.setPoppedOutSaved(true);

    const popDoc = this.win.document;
    const baseHref = document.baseURI || window.location.href || "";

    popDoc.open();
    popDoc.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>📊 Reference Tables &amp; Rules - M&amp;M 4E</title>
  ${baseHref ? `<base href="${baseHref}">` : ''}
</head>
<body class="popout-tables-body">
  <div class="popout-tables-header">
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 16px;">📊</span>
      <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: var(--accent-primary);">Reference Tables &amp; Rules</h3>
    </div>
    <div style="display: flex; align-items: center; gap: 8px; flex: 1; max-width: 400px; margin: 0 12px;">
      <input type="text" id="txtPopoutTableFilter" placeholder="🔍 Filter tables..." value="${this.activeFilter.replace(/"/g, '&quot;')}" style="width: 100%; height: 28px; font-size: 10pt; padding: 2px 8px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-panel); color: var(--text-main);">
    </div>
    <div style="display: flex; align-items: center; gap: 6px;">
      <button type="button" class="btn btn-secondary btn-sm" id="btnPopoutToggleAll" title="Expand or collapse all reference tables">Expand / Collapse All</button>
      <button type="button" class="btn btn-secondary btn-sm" id="btnPopoutRedock" title="Redock back to main builder">⬅ Redock</button>
      <button type="button" class="btn btn-secondary btn-sm" id="btnPopoutClose" title="Close window">✕ Close</button>
    </div>
  </div>
  <div class="popout-tables-container" id="popoutMountContainer"></div>
</body>
</html>`);
    popDoc.close();

    // Copy stylesheet and style tags from parent
    document.querySelectorAll('link[rel="stylesheet"], style').forEach(node => {
      try {
        popDoc.head.appendChild(popDoc.importNode ? popDoc.importNode(node, true) : node.cloneNode(true));
      } catch (e) {}
    });

    // Mirror data-theme
    const curTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    popDoc.documentElement.setAttribute('data-theme', curTheme);
    popDoc.body.setAttribute('data-theme', curTheme);

    // Setup placeholder and move DOM element
    if (!this.placeholder) {
      this.placeholder = document.createComment("tablesDockableBody-placeholder");
    }
    if (contentEl.parentNode) {
      contentEl.parentNode.insertBefore(this.placeholder, contentEl);
    }
    const mount = popDoc.getElementById("popoutMountContainer");
    if (mount) {
      try {
        if (popDoc.adoptNode) popDoc.adoptNode(contentEl);
      } catch (e) {}
      mount.appendChild(contentEl);
      contentEl.style.display = "";
    }

    // Completely close the main window modal overlay so no popup or backdrop is left behind
    this.closeModal(true);

    const notice = this.getNoticeEl();
    if (notice) notice.style.display = "none";
    const popBtn = this.getPopoutBtn();
    if (popBtn) popBtn.style.display = "";

    this.updateHeaderBtnState();

    // Track geometry
    if (this.pollTimer) clearInterval(this.pollTimer);
    this.pollTimer = setInterval(() => {
      if (this.win && !this.win.closed) {
        this.saveBounds();
      } else {
        clearInterval(this.pollTimer);
        this.pollTimer = null;
        this.redock({ openMainModal: false });
      }
    }, 500);

    // Listeners in popout
    this.win.addEventListener("resize", () => this.saveBounds());
    this.win.addEventListener("beforeunload", () => {
      this.saveBounds();
      this.redock({ openMainModal: false });
    });
    this.win.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.redock({ openMainModal: false });
      }
    });

    const popFilterInput = popDoc.getElementById("txtPopoutTableFilter");
    if (popFilterInput) {
      popFilterInput.addEventListener("input", (e) => {
        this.activeFilter = e.target.value;
        const mainInput = this.getSearchInput();
        if (mainInput) mainInput.value = this.activeFilter;
        this.filterTables(this.activeFilter);
      });
    }

    const btnToggleAll = popDoc.getElementById("btnPopoutToggleAll");
    if (btnToggleAll) {
      btnToggleAll.addEventListener("click", () => this.toggleAllTables());
    }

    const btnRedock = popDoc.getElementById("btnPopoutRedock");
    if (btnRedock) {
      btnRedock.addEventListener("click", () => this.redock({ openMainModal: true }));
    }

    const btnClose = popDoc.getElementById("btnPopoutClose");
    if (btnClose) {
      btnClose.addEventListener("click", () => {
        this.redock({ openMainModal: false });
      });
    }

    // Keep filter applied in popout
    this.filterTables(this.activeFilter);
  },

  redock(options = {}) {
    if (this.isRedocking) return;
    this.isRedocking = true;

    try {
      if (this.pollTimer) {
        clearInterval(this.pollTimer);
        this.pollTimer = null;
      }

      this.ensureDocked();

      if (this.win && !this.win.closed) {
        try {
          this.win.close();
        } catch (e) {}
      }
      this.win = null;

      this.updateHeaderBtnState();

      const notice = this.getNoticeEl();
      if (notice) notice.style.display = "none";
      const popBtn = this.getPopoutBtn();
      if (popBtn) popBtn.style.display = "";

      const mainInput = this.getSearchInput();
      if (mainInput) {
        mainInput.value = this.activeFilter;
      }
      this.filterTables(this.activeFilter);

      if (options.openMainModal) {
        this.setPoppedOutSaved(false);
        this.openModal(true);
      } else {
        this.closeModal(true);
      }
    } finally {
      this.isRedocking = false;
    }
  },

  filterTables(query) {
    this.activeFilter = query || "";
    const q = this.activeFilter.trim().toLowerCase();
    const contentEl = this.getContentEl();
    if (!contentEl) return;

    const panels = contentEl.querySelectorAll(".collapsible-panel");
    panels.forEach(panel => {
      const header = panel.querySelector(".panel-header");
      const title = (header ? header.textContent : "").toLowerCase();
      const rows = panel.querySelectorAll("tbody tr");

      if (!q) {
        rows.forEach(r => r.style.display = "");
        panel.style.display = "";
        return;
      }

      let anyMatch = false;
      if (title.includes(q)) {
        anyMatch = true;
        rows.forEach(r => r.style.display = "");
      } else {
        rows.forEach(r => {
          const text = r.textContent.toLowerCase();
          if (text.includes(q)) {
            r.style.display = "";
            anyMatch = true;
          } else {
            r.style.display = "none";
          }
        });
      }

      if (anyMatch) {
        panel.style.display = "";
        panel.classList.remove("collapsed");
      } else {
        panel.style.display = "none";
      }
    });
  },

  init() {
    const btnOpen = document.getElementById("btnOpenTablesModal");
    const btnClose = document.getElementById("btnCloseTablesModal");
    const btnPopout = document.getElementById("btnPopoutTables");
    const btnRedock = document.getElementById("btnRedockTables");
    const btnToggleAll = document.getElementById("btnToggleAllTables");
    const modal = this.getModalOverlay();
    const filterInput = this.getSearchInput();
    const contentEl = this.getContentEl();

    if (btnOpen && !btnOpen.__tablesBound) {
      btnOpen.__tablesBound = true;
      btnOpen.addEventListener("click", () => this.openModal());
    }

    if (btnClose && !btnClose.__tablesBound) {
      btnClose.__tablesBound = true;
      btnClose.addEventListener("click", () => this.closeModal());
    }

    if (btnPopout && !btnPopout.__tablesBound) {
      btnPopout.__tablesBound = true;
      btnPopout.addEventListener("click", () => this.popout());
    }

    if (btnRedock && !btnRedock.__tablesBound) {
      btnRedock.__tablesBound = true;
      btnRedock.addEventListener("click", () => this.redock({ openMainModal: true }));
    }

    if (btnToggleAll && !btnToggleAll.__tablesBound) {
      btnToggleAll.__tablesBound = true;
      btnToggleAll.addEventListener("click", () => this.toggleAllTables());
    }

    if (modal && !modal.__tablesBound) {
      modal.__tablesBound = true;
      modal.addEventListener("click", (e) => {
        if (e.target === modal) this.closeModal();
      });
    }

    if (filterInput && !filterInput.__tablesBound) {
      filterInput.__tablesBound = true;
      filterInput.addEventListener("input", (e) => {
        this.filterTables(e.target.value);
      });
    }

    // Event delegation for collapsible headers
    if (contentEl && !contentEl.__tablesBound) {
      contentEl.__tablesBound = true;
      contentEl.addEventListener("click", (e) => {
        const header = e.target.closest(".panel-header");
        if (header && contentEl.contains(header)) {
          if (e.__headerHandled) return;
          e.__headerHandled = true;
          header.parentElement.classList.toggle("collapsed");
          TablesPopoutManager.updateToggleAllBtnState();
        }
      });
    }

    if (!document.__tablesEscBound) {
      document.__tablesEscBound = true;
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.isOpenModal()) {
          this.closeModal();
        }
      });
    }

    this.updateHeaderBtnState();
  }
};
window.TablesPopoutManager = TablesPopoutManager;

/* ==========================================================================
   OPTIONS & DISPLAY SETTINGS POP-UP & POPOUT MANAGER
   ========================================================================== */
const OptionsPopoutManager = {
  storageKey: "mm4e_options_bounds",
  storageStateKey: "mm4e_options_popped_out",
  defaultBounds: { width: 380, height: 640, left: 100, top: 100 },

  isPoppedOutSaved() {
    try {
      return localStorage.getItem(this.storageStateKey) === "true";
    } catch (e) {
      return false;
    }
  },

  setPoppedOutSaved(val) {
    try {
      if (val) localStorage.setItem(this.storageStateKey, "true");
      else localStorage.removeItem(this.storageStateKey);
    } catch (e) {}
  },
  win: null,
  placeholder: null,
  pollTimer: null,
  activeContentEl: null,
  parentContainer: null,
  isRedocking: false,

  getModalEl() {
    return document.getElementById("optionsModal");
  },

  getContentEl() {
    if (this.activeContentEl && this.activeContentEl.ownerDocument) {
      return this.activeContentEl;
    }
    let el = document.getElementById("optionsDockableBody");
    if (!el && this.win && !this.win.closed) {
      try {
        el = this.win.document.getElementById("optionsDockableBody");
      } catch (e) {}
    }
    if (el) {
      this.activeContentEl = el;
      if (el.parentNode) {
        this.parentContainer = el.parentNode;
      }
    }
    return this.activeContentEl;
  },

  getNoticeEl() {
    return document.getElementById("boxPoppedOutOptionsNotice");
  },

  getPopoutBtn() {
    return document.getElementById("btnPopoutOptions");
  },

  isOpenModal() {
    const modal = this.getModalEl();
    return modal && modal.classList.contains("show");
  },

  isPoppedOut() {
    return !!(this.win && !this.win.closed);
  },

  getSavedBounds() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object") {
          let w = Math.max(300, Math.min(window.screen.availWidth || 2560, Number(parsed.width) || this.defaultBounds.width));
          let h = Math.max(250, Math.min(window.screen.availHeight || 1440, Number(parsed.height) || this.defaultBounds.height));
          let l = Number(parsed.left);
          let t = Number(parsed.top);
          if (isNaN(l) || l < -1000 || l > (window.screen.availWidth || 2560)) l = this.defaultBounds.left;
          if (isNaN(t) || t < -1000 || t > (window.screen.availHeight || 1440)) t = this.defaultBounds.top;
          return { width: Math.round(w), height: Math.round(h), left: Math.round(l), top: Math.round(t) };
        }
      }
    } catch (e) {}
    return { ...this.defaultBounds };
  },

  saveBounds() {
    if (!this.win || this.win.closed) return;
    try {
      const x = this.win.screenX !== undefined ? this.win.screenX : this.win.screenLeft;
      const y = this.win.screenY !== undefined ? this.win.screenY : this.win.screenTop;
      const w = this.win.outerWidth || this.win.innerWidth;
      const h = this.win.outerHeight || this.win.innerHeight;
      if (typeof x === "number" && typeof y === "number" && typeof w === "number" && typeof h === "number" &&
          !isNaN(x) && !isNaN(y) && !isNaN(w) && !isNaN(h) && w >= 250 && h >= 200) {
        const bounds = { width: Math.round(w), height: Math.round(h), left: Math.round(x), top: Math.round(y) };
        localStorage.setItem(this.storageKey, JSON.stringify(bounds));
      }
    } catch (e) {}
  },

  ensureDocked() {
    const contentEl = this.getContentEl();
    const parent = this.parentContainer || document.getElementById("optionsModal");
    if (!contentEl || !parent) return;

    if (contentEl.ownerDocument === document && contentEl.parentNode === parent) {
      if (this.placeholder && this.placeholder.parentNode) {
        this.placeholder.remove();
        this.placeholder = null;
      }
      contentEl.style.display = "";
      return;
    }

    try {
      if (document.adoptNode && contentEl.ownerDocument !== document) {
        document.adoptNode(contentEl);
      }
    } catch (e) {}

    if (this.placeholder && this.placeholder.parentNode) {
      this.placeholder.parentNode.insertBefore(contentEl, this.placeholder);
      this.placeholder.remove();
      this.placeholder = null;
    } else {
      parent.appendChild(contentEl);
    }
    contentEl.style.display = "";
  },

  openModal(forceDocked = false) {
    if (this.isPoppedOut()) {
      try { this.win.focus(); } catch (e) {}
      if (typeof showToast === "function") {
        showToast("Display Settings window focused.", "info");
      }
      return;
    }

    if (!forceDocked && this.isPoppedOutSaved()) {
      this.popout();
      return;
    }

    this.ensureDocked();
    const modal = this.getModalEl();
    if (modal) {
      modal.classList.add("show");
      const btnToggle = document.getElementById("btnToggleOptions");
      if (btnToggle) btnToggle.classList.add("active");
      const notice = this.getNoticeEl();
      if (notice) notice.style.display = "none";
      const popBtn = this.getPopoutBtn();
      if (popBtn) popBtn.style.display = "";
    }
  },

  closeModal(fromPopout = false) {
    const modal = this.getModalEl();
    if (modal) modal.classList.remove("show");
    const btnToggle = document.getElementById("btnToggleOptions");
    if (btnToggle) btnToggle.classList.remove("active");
    if (!fromPopout && !this.isPoppedOut()) {
      this.setPoppedOutSaved(false);
    }
  },

  toggleModal() {
    if (this.isPoppedOut()) {
      try { this.win.focus(); } catch (e) {}
      if (typeof showToast === "function") {
        showToast("Display Settings window focused.", "info");
      }
      return;
    }
    if (this.isPoppedOutSaved()) {
      this.popout();
      return;
    }
    const modal = this.getModalEl();
    if (modal) {
      if (modal.classList.contains("show")) {
        this.closeModal();
      } else {
        this.openModal();
      }
    }
  },

  popout() {
    if (this.isPoppedOut()) {
      try { this.win.focus(); } catch (e) {}
      return;
    }

    this.ensureDocked();
    const contentEl = this.getContentEl();
    if (!contentEl) return;

    if (!this.parentContainer) {
      this.parentContainer = contentEl.parentNode || document.getElementById("optionsModal");
    }

    const bounds = this.getSavedBounds();
    const features = `popup=yes,width=${bounds.width},height=${bounds.height},left=${bounds.left},top=${bounds.top},resizable=yes,scrollbars=yes`;

    try {
      this.win = window.open("", "_blank", features);
    } catch (err) {
      console.warn("Options popout open error:", err);
    }

    if (!this.win || this.win.closed || typeof this.win.closed === "undefined") {
      alert("Pop-out window was blocked by your browser. Please allow popups for this page.");
      this.setPoppedOutSaved(false);
      this.openModal(true);
      return;
    }

    this.setPoppedOutSaved(true);

    const popDoc = this.win.document;
    const baseHref = document.baseURI || window.location.href || "";

    popDoc.open();
    popDoc.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>⚙️ Display &amp; Settings - M&amp;M 4E</title>
  ${baseHref ? `<base href="${baseHref}">` : ''}
</head>
<body class="popout-options-body">
  <div class="popout-options-header">
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 16px;">⚙️</span>
      <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: var(--accent-primary);">Display &amp; Settings</h3>
    </div>
    <div style="display: flex; align-items: center; gap: 6px;">
      <button type="button" class="btn btn-secondary btn-sm" id="btnPopoutRedock" title="Redock back into main app">⬅ Redock</button>
      <button type="button" class="btn btn-secondary btn-sm" id="btnPopoutClose" title="Close window">✕ Close</button>
    </div>
  </div>
  <div class="popout-options-container" id="popoutOptionsMountContainer"></div>
</body>
</html>`);
    popDoc.close();

    // Copy stylesheet and style tags from parent
    document.querySelectorAll('link[rel="stylesheet"], style').forEach(node => {
      try {
        popDoc.head.appendChild(popDoc.importNode ? popDoc.importNode(node, true) : node.cloneNode(true));
      } catch (e) {}
    });

    // Mirror current data-theme and custom style properties
    const curTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    popDoc.documentElement.setAttribute('data-theme', curTheme);
    popDoc.body.setAttribute('data-theme', curTheme);
    if (document.documentElement.style.cssText) {
      popDoc.documentElement.style.cssText = document.documentElement.style.cssText;
    }

    // Setup placeholder and adopt element
    if (!this.placeholder) {
      this.placeholder = document.createComment("optionsDockableBody-placeholder");
    }
    if (contentEl.parentNode) {
      contentEl.parentNode.insertBefore(this.placeholder, contentEl);
    }
    const mount = popDoc.getElementById("popoutOptionsMountContainer");
    if (mount) {
      try {
        if (popDoc.adoptNode) popDoc.adoptNode(contentEl);
      } catch (e) {}
      mount.appendChild(contentEl);
      contentEl.style.display = "";
    }

    // Completely close main options modal so nothing is left behind
    this.closeModal();

    const notice = this.getNoticeEl();
    if (notice) notice.style.display = "none";
    const popBtn = this.getPopoutBtn();
    if (popBtn) popBtn.style.display = "";

    // Track geometry
    if (this.pollTimer) clearInterval(this.pollTimer);
    this.pollTimer = setInterval(() => {
      if (this.win && !this.win.closed) {
        this.saveBounds();
      } else {
        clearInterval(this.pollTimer);
        this.pollTimer = null;
        this.redock({ openMainModal: false });
      }
    }, 500);

    // Listeners in child window
    this.win.addEventListener("resize", () => this.saveBounds());
    this.win.addEventListener("beforeunload", () => {
      this.saveBounds();
      this.redock({ openMainModal: false });
    });
    this.win.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.redock({ openMainModal: false });
      }
    });

    const btnRedock = popDoc.getElementById("btnPopoutRedock");
    if (btnRedock) {
      btnRedock.addEventListener("click", () => this.redock({ openMainModal: true }));
    }

    const btnClose = popDoc.getElementById("btnPopoutClose");
    if (btnClose) {
      btnClose.addEventListener("click", () => {
        this.redock({ openMainModal: false });
      });
    }
  },

  redock(options = {}) {
    if (this.isRedocking) return;
    this.isRedocking = true;

    try {
      if (this.pollTimer) {
        clearInterval(this.pollTimer);
        this.pollTimer = null;
      }

      this.ensureDocked();

      if (this.win && !this.win.closed) {
        try {
          this.win.close();
        } catch (e) {}
      }
      this.win = null;

      const notice = this.getNoticeEl();
      if (notice) notice.style.display = "none";
      const popBtn = this.getPopoutBtn();
      if (popBtn) popBtn.style.display = "";

      if (options.openMainModal) {
        this.setPoppedOutSaved(false);
        this.openModal(true);
      } else {
        this.closeModal(true);
      }
    } finally {
      this.isRedocking = false;
    }
  },

  init() {
    const btnToggle = document.getElementById("btnToggleOptions");
    const btnClose = document.getElementById("btnCloseOptions");
    const btnPopout = document.getElementById("btnPopoutOptions");
    const btnRedock = document.getElementById("btnRedockOptions");
    const modal = this.getModalEl();

    if (btnToggle && !btnToggle.__optionsBound) {
      btnToggle.__optionsBound = true;
      btnToggle.onclick = (e) => {
        e.stopPropagation();
        this.toggleModal();
      };
    }

    if (btnClose && !btnClose.__optionsBound) {
      btnClose.__optionsBound = true;
      btnClose.onclick = (e) => {
        e.stopPropagation();
        this.closeModal();
      };
    }

    if (btnPopout && !btnPopout.__optionsBound) {
      btnPopout.__optionsBound = true;
      btnPopout.onclick = (e) => {
        e.stopPropagation();
        this.popout();
      };
    }

    if (btnRedock && !btnRedock.__optionsBound) {
      btnRedock.__optionsBound = true;
      btnRedock.onclick = (e) => {
        e.stopPropagation();
        this.redock({ openMainModal: true });
      };
    }

    if (modal && !modal.__optionsBound) {
      modal.__optionsBound = true;
      modal.onclick = (e) => {
        e.stopPropagation();
      };
    }

    if (!document.__optionsClickBound) {
      document.__optionsClickBound = true;
      document.addEventListener("click", (e) => {
        if (modal && modal.classList.contains("show")) {
          const mainMenu = document.getElementById("mainMenuDropdown");
          const btnMain = document.getElementById("btnMainMenu");
          if (!modal.contains(e.target) && 
              e.target !== btnToggle && !btnToggle?.contains(e.target) &&
              (!mainMenu || !mainMenu.contains(e.target)) &&
              (!btnMain || (e.target !== btnMain && !btnMain.contains(e.target)))) {
            this.closeModal();
          }
        }
      });
    }

    if (!document.__optionsEscBound) {
      document.__optionsEscBound = true;
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.isOpenModal()) {
          this.closeModal();
        }
      });
    }
  }
};
window.OptionsPopoutManager = OptionsPopoutManager;

document.addEventListener("DOMContentLoaded", () => {
  const injectedStyles = document.createElement('style');
  injectedStyles.id = 'injected-option-btn-styles';
  injectedStyles.innerHTML = `
    :root[data-theme="light"] .btn-add-option { background-color: #059669 !important; color: #ffffff !important; border-color: #047857 !important; font-weight: 600; }
    :root[data-theme="light"] .btn-add-option:hover { background-color: #047857 !important; }
    :root[data-theme="dark"] .btn-add-option { background-color: #4f46e5 !important; color: #ffffff !important; border-color: #4338ca !important; font-weight: 600; }
    :root[data-theme="dark"] .btn-add-option:hover { background-color: #4338ca !important; }
    :root[data-theme="parchment"] .btn-add-option { background-color: #8b5a2b !important; color: #ffffff !important; border-color: #6b4423 !important; font-weight: 600; }
    :root[data-theme="parchment"] .btn-add-option:hover { background-color: #6b4423 !important; }
    
    .power-card { border: 2px solid var(--border-color) !important; }
    
    #lblAbilPP, #lblCombatPP, #lblResistPP, #lblSkillPP, #lblAdvPP, #lblPowerPP, #lblTotalPP, #lblHeroicLimit, #lblCommandLimit, .power-card-header .badge, .effect-cost-badge {
        background-color: #333333 !important;
        color: #eeeeee !important;
        font-weight: normal !important;
        border: 1px solid #222 !important;
        box-shadow: none !important;
        border-radius: 4px !important;
        padding: 2px 6px !important;
    }
  `;
  document.head.appendChild(injectedStyles);

  const ppIds = ['lblAbilPP', 'lblCombatPP', 'lblResistPP', 'lblSkillPP', 'lblAdvPP', 'lblPowerPP', 'lblTotalPP'];
  ppIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.parentElement) {
          el.parentElement.style.fontWeight = 'normal';
          const strongs = el.parentElement.querySelectorAll('strong, b');
          strongs.forEach(s => s.style.fontWeight = 'normal');
      }
  });

  window.checkScreenResolution();
  window.addEventListener("resize", window.checkScreenResolution);

  buildAbilitiesUI();
  buildSkillsUI();
  buildAdvantagesUI();
  buildPowersUI();
  buildAllReferenceTables();
  setupTabs();
  setupCollapsibles();
  setupOptionsModal();
  setupInfoModalHandlers();
  setupThemeAndFontControls();
  setupBackgroundHandlers();
  setupFileHandlers();
  setupSortingHeaders();
  setupDefenseSteppers();
  setupPowerHandlers();
  setupEquipmentHandlers();
  buildEquipmentUI();
  FileManager.init();
  setupMainMenuAndHeader();
  TablesPopoutManager.init();
  OptionsPopoutManager.init();
  HelpModalManager.init();
  UpdateCheckerManager.init();
  refreshUI();
});

function setupTabs() {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
      
      // Update power context for shared UI logic
      if (btn.dataset.tab === "tab-blueprints") {
          window.activePowerContext = 'blueprints';
          buildPowersUI();
      } else if (btn.dataset.tab === "tab-powers") {
          window.activePowerContext = 'powers';
          buildPowersUI();
      } else if (btn.dataset.tab === "tab-companions") {
          renderCompanionsTab();
      }
    });
  });
}

function setupCollapsibles() {
  document.querySelectorAll(".panel-header").forEach(header => {
    if (header.__collapsibleBound) return;
    header.__collapsibleBound = true;
    header.addEventListener("click", (e) => {
      if (e.__headerHandled) return;
      e.__headerHandled = true;
      header.parentElement.classList.toggle("collapsed");
    });
  });
}

function setupOptionsModal() {
  const modalContent = document.getElementById("optionsDockableBody") || document.getElementById("optionsModal");

  if (modalContent && !document.getElementById("chkDisableWarnings")) {
      const warningsDiv = document.createElement("div");
      warningsDiv.style.marginTop = "12px";
      warningsDiv.style.paddingTop = "10px";
      warningsDiv.style.borderTop = "1px dashed var(--border-color)";
      
      const isChecked = localStorage.getItem("mm4e_disable_warnings") === "true";
      const isResWarningDisabled = localStorage.getItem("mm4e_disable_res_warning") === "true";
      const isDeleteWarningDisabled = localStorage.getItem("mm4e_disable_delete_warning") === "true";

      warningsDiv.innerHTML = `
          <label style="display: flex; align-items: center; gap: 8px; font-size: var(--font-size-labels); cursor: pointer; margin-bottom: 8px;">
              <input type="checkbox" id="chkDisableWarnings" ${isChecked ? "checked" : ""}>
              Disable non-critical power option alerts
          </label>
          <label style="display: flex; align-items: center; gap: 8px; font-size: var(--font-size-labels); cursor: pointer; margin-bottom: 8px;">
              <input type="checkbox" id="chkDisableDeleteWarning" ${isDeleteWarningDisabled ? "checked" : ""}>
              Disable power container deletion warnings
          </label>
          <label style="display: flex; align-items: center; gap: 8px; font-size: var(--font-size-labels); cursor: pointer; margin-bottom: 8px;">
              <input type="checkbox" id="chkDisableResWarning" ${isResWarningDisabled ? "checked" : ""}>
              Disable screen resolution warning
          </label>
          <label style="display: flex; align-items: center; gap: 8px; font-size: var(--font-size-labels); cursor: pointer; border-top: 1px dashed var(--border-color); padding-top: 8px;">
              <input type="checkbox" id="chkEnableF1Help" ${HelpModalManager.isF1Enabled() ? "checked" : ""}>
              Enable F1 key for Help
          </label>
          <div id="lblF1ConflictNotice" style="${localStorage.getItem('mm4e_f1_conflict_reason') ? 'display: block;' : 'display: none;'} font-size: 10pt; color: #f59e0b; margin-left: 24px; margin-top: 2px;">
              ⚠️ F1 was disabled due to browser/OS conflict: ${localStorage.getItem('mm4e_f1_conflict_reason') || ''}
          </div>
      `;
      modalContent.appendChild(warningsDiv);

      document.getElementById("chkDisableWarnings").addEventListener("change", (e) => {
          localStorage.setItem("mm4e_disable_warnings", e.target.checked);
      });
      document.getElementById("chkDisableDeleteWarning").addEventListener("change", (e) => {
          localStorage.setItem("mm4e_disable_delete_warning", e.target.checked);
      });
      const chkF1 = document.getElementById("chkEnableF1Help");
      if (chkF1) {
          chkF1.addEventListener("change", (e) => {
              HelpModalManager.setF1Enabled(e.target.checked);
          });
      }
      document.getElementById("chkDisableResWarning").addEventListener("change", (e) => {
          localStorage.setItem("mm4e_disable_res_warning", e.target.checked);
          window.checkScreenResolution(); 
      });
  }

  OptionsPopoutManager.init();
  HelpModalManager.init();
}

function setupInfoModalHandlers() {
  const overlay = document.getElementById("ruleInfoModal");
  const closeBtn = document.getElementById("modalRuleClose");

  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
    }
  });
}

function setupThemeAndFontControls() {
  const root = document.documentElement;
  const btnTheme = document.getElementById("btnThemeToggle");
  const sliderLabel = document.getElementById("sliderLabelFont");
  const sliderControl = document.getElementById("sliderControlFont");
  const sliderLink = document.getElementById("sliderLinkFont");
  const sliderSecondary = document.getElementById("sliderSecondaryFont");
  const sliderMinorControl = document.getElementById("sliderMinorControlFont");

  const themes = ["light", "dark", "parchment"];
  const themeNames = { light: "Light", dark: "Dark", parchment: "Parchment" };

  const savedTheme = localStorage.getItem("mm4e_theme") || "light";
  const savedLabelFont = localStorage.getItem("mm4e_font_labels") || "16";
  const savedControlFont = localStorage.getItem("mm4e_font_controls") || "14";
  const savedLinkFont = localStorage.getItem("mm4e_font_links") || "14";
  const savedSecondaryFont = localStorage.getItem("mm4e_font_secondary") || "14";
  const savedMinorControlFont = localStorage.getItem("mm4e_font_minor_controls") || "14";
  
  root.setAttribute("data-theme", savedTheme);

  function updateThemeBtnUI(activeTheme) {
    const idx = themes.indexOf(activeTheme) > -1 ? themes.indexOf(activeTheme) : 0;
    let dotsHtml = '<span style="display: flex; gap: 4px; margin-left: 12px;">';
    for (let i = 0; i < 3; i++) {
      const isActive = (i === idx);
      const bg = isActive ? 'var(--accent-primary)' : 'var(--text-muted)';
      const op = isActive ? '1' : '0.4';
      dotsHtml += `<span style="width: 8px; height: 8px; border-radius: 50%; background-color: ${bg}; opacity: ${op}; transition: background-color 0.2s;"></span>`;
    }
    dotsHtml += '</span>';
    btnTheme.innerHTML = `<span>Theme: ${themeNames[themes[idx]]}</span>${dotsHtml}`;
  }

  updateThemeBtnUI(savedTheme);

  root.style.setProperty("--font-size-labels", savedLabelFont + "px");
  sliderLabel.value = savedLabelFont;
  document.getElementById("valLabelFont").textContent = savedLabelFont + "px";

  root.style.setProperty("--font-size-controls", savedControlFont + "px");
  sliderControl.value = savedControlFont;
  document.getElementById("valControlFont").textContent = savedControlFont + "px";

  root.style.setProperty("--font-size-links", savedLinkFont + "px");
  sliderLink.value = savedLinkFont;
  document.getElementById("valLinkFont").textContent = savedLinkFont + "px";

  root.style.setProperty("--font-size-secondary", savedSecondaryFont + "px");
  sliderSecondary.value = savedSecondaryFont;
  document.getElementById("valSecondaryFont").textContent = savedSecondaryFont + "px";

  root.style.setProperty("--font-size-minor-controls", savedMinorControlFont + "px");
  sliderMinorControl.value = savedMinorControlFont;
  document.getElementById("valMinorControlFont").textContent = savedMinorControlFont + "px";

  function syncToAllPopouts(fn) {
    if (typeof TablesPopoutManager !== "undefined" && TablesPopoutManager.win && !TablesPopoutManager.win.closed) {
      try { fn(TablesPopoutManager.win); } catch (e) {}
    }
    if (typeof OptionsPopoutManager !== "undefined" && OptionsPopoutManager.win && !OptionsPopoutManager.win.closed) {
      try { fn(OptionsPopoutManager.win); } catch (e) {}
    }
  }

  function updateOptionValText(id, text) {
    const el = document.getElementById(id) || (typeof OptionsPopoutManager !== 'undefined' && OptionsPopoutManager.win && !OptionsPopoutManager.win.closed ? OptionsPopoutManager.win.document.getElementById(id) : null);
    if (el) el.textContent = text;
  }

  btnTheme.addEventListener("click", (e) => {
    e.stopPropagation(); 
    const currentTheme = root.getAttribute("data-theme");
    let currentIndex = themes.indexOf(currentTheme);
    if (currentIndex === -1) currentIndex = 0;
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    root.setAttribute("data-theme", nextTheme);
    updateThemeBtnUI(nextTheme);
    localStorage.setItem("mm4e_theme", nextTheme);
    syncToAllPopouts(win => {
      win.document.documentElement.setAttribute("data-theme", nextTheme);
      win.document.body.setAttribute("data-theme", nextTheme);
    });
  });

  sliderLabel.addEventListener("input", (e) => {
    root.style.setProperty("--font-size-labels", e.target.value + "px");
    updateOptionValText("valLabelFont", e.target.value + "px");
    localStorage.setItem("mm4e_font_labels", e.target.value);
    syncToAllPopouts(win => win.document.documentElement.style.setProperty("--font-size-labels", e.target.value + "px"));
  });
  sliderControl.addEventListener("input", (e) => {
    root.style.setProperty("--font-size-controls", e.target.value + "px");
    updateOptionValText("valControlFont", e.target.value + "px");
    localStorage.setItem("mm4e_font_controls", e.target.value);
    syncToAllPopouts(win => win.document.documentElement.style.setProperty("--font-size-controls", e.target.value + "px"));
  });
  sliderLink.addEventListener("input", (e) => {
    root.style.setProperty("--font-size-links", e.target.value + "px");
    updateOptionValText("valLinkFont", e.target.value + "px");
    localStorage.setItem("mm4e_font_links", e.target.value);
    syncToAllPopouts(win => win.document.documentElement.style.setProperty("--font-size-links", e.target.value + "px"));
  });
  sliderSecondary.addEventListener("input", (e) => {
    root.style.setProperty("--font-size-secondary", e.target.value + "px");
    updateOptionValText("valSecondaryFont", e.target.value + "px");
    localStorage.setItem("mm4e_font_secondary", e.target.value);
    syncToAllPopouts(win => win.document.documentElement.style.setProperty("--font-size-secondary", e.target.value + "px"));
  });
  sliderMinorControl.addEventListener("input", (e) => {
    root.style.setProperty("--font-size-minor-controls", e.target.value + "px");
    updateOptionValText("valMinorControlFont", e.target.value + "px");
    localStorage.setItem("mm4e_font_minor_controls", e.target.value);
    syncToAllPopouts(win => win.document.documentElement.style.setProperty("--font-size-minor-controls", e.target.value + "px"));
  });
}
window.resetFont = function(type, defaultSize) {
  const root = document.documentElement;
  let cssVar = "";
  let lsKey = "";
  if (type === 'Label') { cssVar = "--font-size-labels"; lsKey = "mm4e_font_labels"; }
  else if (type === 'Control') { cssVar = "--font-size-controls"; lsKey = "mm4e_font_controls"; }
  else if (type === 'Link') { cssVar = "--font-size-links"; lsKey = "mm4e_font_links"; }
  else if (type === 'Secondary') { cssVar = "--font-size-secondary"; lsKey = "mm4e_font_secondary"; }
  else if (type === 'MinorControl') { cssVar = "--font-size-minor-controls"; lsKey = "mm4e_font_minor_controls"; }

  if (cssVar) {
    root.style.setProperty(cssVar, defaultSize + "px");
    if (typeof TablesPopoutManager !== "undefined" && TablesPopoutManager.win && !TablesPopoutManager.win.closed) {
      try { TablesPopoutManager.win.document.documentElement.style.setProperty(cssVar, defaultSize + "px"); } catch (e) {}
    }
    if (typeof OptionsPopoutManager !== "undefined" && OptionsPopoutManager.win && !OptionsPopoutManager.win.closed) {
      try { OptionsPopoutManager.win.document.documentElement.style.setProperty(cssVar, defaultSize + "px"); } catch (e) {}
    }
    const slider = document.getElementById("slider" + type + "Font") || (typeof OptionsPopoutManager !== 'undefined' && OptionsPopoutManager.win && !OptionsPopoutManager.win.closed ? OptionsPopoutManager.win.document.getElementById("slider" + type + "Font") : null);
    if (slider) slider.value = defaultSize;
    const valEl = document.getElementById("val" + type + "Font") || (typeof OptionsPopoutManager !== 'undefined' && OptionsPopoutManager.win && !OptionsPopoutManager.win.closed ? OptionsPopoutManager.win.document.getElementById("val" + type + "Font") : null);
    if (valEl) valEl.textContent = defaultSize + "px";
    localStorage.setItem(lsKey, defaultSize);
  }
};

function setupSortingHeaders() {
  document.querySelectorAll("th.sortable").forEach(th => {
    th.addEventListener("click", () => {
      const tableType = th.dataset.table;
      const col = th.dataset.col;

      if (tableType === "skills") {
        if (skillSort.col === col) {
          skillSort.asc = !skillSort.asc;
        } else {
          skillSort.col = col;
          skillSort.asc = true;
        }
        sortSkills();
        buildSkillsUI();
      } else if (tableType === "advantages") {
        if (advSort.col === col) {
          advSort.asc = !advSort.asc;
        } else {
          advSort.col = col;
          advSort.asc = true;
        }
        sortAdvantages();
        buildAdvantagesUI();
      }
      updateSortHeaderClasses();
      refreshUI();
    });
  });
  updateSortHeaderClasses();
}

function updateSortHeaderClasses() {
  document.querySelectorAll("th.sortable").forEach(th => {
    th.classList.remove("sort-asc", "sort-desc");
    const tableType = th.dataset.table;
    const col = th.dataset.col;

    if (tableType === "skills" && skillSort.col === col) {
      th.classList.add(skillSort.asc ? "sort-asc" : "sort-desc");
    } else if (tableType === "advantages" && advSort.col === col) {
      th.classList.add(advSort.asc ? "sort-asc" : "sort-desc");
    }
  });
}

function sortSkills() {
  skillsDisplayList.sort((a, b) => {
    let valA = a[skillSort.col];
    let valB = b[skillSort.col];

    if (typeof valA === "boolean") {
      valA = valA ? 1 : 0;
      valB = valB ? 1 : 0;
    }

    if (valA < valB) return skillSort.asc ? -1 : 1;
    if (valA > valB) return skillSort.asc ? 1 : -1;
    return 0;
  });
}

function sortAdvantages() {
  advantagesDisplayList.sort((a, b) => {
    let valA = a[advSort.col];
    let valB = b[advSort.col];

    if (Array.isArray(valA)) valA = valA.join(", ");
    if (Array.isArray(valB)) valB = valB.join(", ");

    if (valA < valB) return advSort.asc ? -1 : 1;
    if (valA > valB) return advSort.asc ? 1 : -1;
    return 0;
  });
}

function buildAbilitiesUI() {
  const container = document.getElementById("abilitiesContainer");
  const list = [
    { id: "STR", name: "Strength" },
    { id: "STA", name: "Stamina" },
    { id: "AGL", name: "Agility" },
    { id: "INT", name: "Intellect" },
    { id: "AWE", name: "Awareness" },
    { id: "PRE", name: "Presence" }
  ];

  container.innerHTML = list.map(abil => `
    <div class="list-row">
      <input type="checkbox" class="row-enable-toggle" id="enable_${abil.id}" checked title="Enable / Disable Trait">
      <span class="row-title">${abil.name} (${abil.id})</span>
      
      <div class="stepper-group">
        <button type="button" class="stepper-btn stepper-dec" id="dec_${abil.id}" onclick="stepVal('input_${abil.id}', -1, -5, 20)">−</button>
        <input type="number" id="input_${abil.id}" class="stepper-input" min="-5" max="20" value="0">
        <button type="button" class="stepper-btn stepper-inc" id="inc_${abil.id}" onclick="stepVal('input_${abil.id}', 1, -5, 20)">+</button>
      </div>

      <div class="row-adjustments" id="adj_${abil.id}">
        <em>Base points only</em>
      </div>

      <div class="ability-total-col" id="total_rank_${abil.id}">0</div>
    </div>
  `).join("");

  list.forEach(abil => {
    document.getElementById(`input_${abil.id}`).addEventListener("input", (e) => {
      char.abilities[abil.id] = parseInt(e.target.value) || 0;
      refreshUI();
    });
    
    document.getElementById(`enable_${abil.id}`).addEventListener("change", (e) => {
      const isAbsent = !e.target.checked;
      char.absentAbilities[abil.id] = isAbsent;
      document.getElementById(`input_${abil.id}`).disabled = isAbsent;
      document.getElementById(`dec_${abil.id}`).disabled = isAbsent;
      document.getElementById(`inc_${abil.id}`).disabled = isAbsent;
      refreshUI();
    });
  });

  document.getElementById("heroNameInput").addEventListener("input", (e) => {
    char.name = e.target.value;
    refreshUI();
  });
  const heroHPInput = document.getElementById("heroHPInput");
  if (heroHPInput) {
    heroHPInput.addEventListener("input", (e) => {
      char.heroPoints = Math.max(0, parseInt(e.target.value) || 0);
      refreshUI();
    });
  }
  document.getElementById("playerNameInput").addEventListener("input", (e) => {
    char.playerName = e.target.value;
  });
  document.getElementById("heroPLInput").addEventListener("input", (e) => {
    char.powerLevel = parseInt(e.target.value) || 10;
    char.totalPointsAllowed = char.powerLevel * 15;
    buildAdvantagesUI();
    refreshUI();
  });
  document.getElementById("heroSizeInput").addEventListener("change", (e) => {
    char.sizeCategory = e.target.value;
    refreshUI();
  });
  document.getElementById("heroMassInput").addEventListener("input", (e) => {
    char.massRank = parseInt(e.target.value) || 0;
    refreshUI();
  });
  document.getElementById("inputATK").addEventListener("input", (e) => {
    char.combat.ATK = parseInt(e.target.value) || 0;
    refreshUI();
  });
  document.getElementById("inputDEF").addEventListener("input", (e) => {
    char.combat.DEF = parseInt(e.target.value) || 0;
    refreshUI();
  });
}

function setupDefenseSteppers() {
  document.getElementById("inputDodge").addEventListener("input", (e) => {
    char.purchasedResistances.Dodge = parseInt(e.target.value) || 0;
    refreshUI();
  });
  document.getElementById("inputFort").addEventListener("input", (e) => {
    char.purchasedResistances.Fortitude = parseInt(e.target.value) || 0;
    refreshUI();
  });
  document.getElementById("inputWill").addEventListener("input", (e) => {
    char.purchasedResistances.Will = parseInt(e.target.value) || 0;
    refreshUI();
  });
}

function buildSkillsUI() {
  const tbody = document.querySelector("#skillsTable tbody");
  if (!tbody) return;
  tbody.innerHTML = skillsDisplayList.map(skill => {
    const idSafe = skill.name.replace(/[^a-zA-Z0-9]/g, "_");
    const val = char.skills[skill.name] || 0;
    const focusVal = char.skillDetails ? (char.skillDetails[skill.name] || "") : "";

    const skillNameStyle = val > 0 ? 'color: #f59e0b;' : '';

    let advTagsHtml = "";
    if (skill.relatedAdvantages && skill.relatedAdvantages.length > 0) {
      advTagsHtml = skill.relatedAdvantages.map(advName => {
        const advRanks = char.advantages[advName] || 0;
        const rankText = advRanks > 0 ? ` (${advRanks})` : "";
        const activeClass = advRanks > 0 ? " active-adv-tag" : "";
        return `
          <span class="skill-adv-tag${activeClass}" onclick="showAdvantageInfo('${advName}')" title="Click to view ${advName} rule">
            <span class="bolt">⚡</span>${advName}${rankText}
          </span>
        `;
      }).join(" ");
    } else {
      advTagsHtml = `<span class="secondary-text">—</span>`;
    }

    return `
      <tr>
        <td><strong style="${skillNameStyle}">${skill.name}</strong></td>
        <td>${skill.ability}</td>
        <td>${skill.untrained ? `<span style="color:#10b981; font-weight:600;">Yes</span>` : `<span style="color:#f59e0b; font-weight:600;">Trained Only</span>`}</td>
        <td id="skill_base_${idSafe}">0</td>
        <td>
          <div class="stepper-group">
            <button type="button" class="stepper-btn stepper-dec" onclick="stepVal('skill_input_${idSafe}', -1, 0, 20)">−</button>
            <input type="number" id="skill_input_${idSafe}" class="stepper-input" min="0" max="20" value="${val}" data-skill="${skill.name}">
            <button type="button" class="stepper-btn stepper-inc" onclick="stepVal('skill_input_${idSafe}', 1, 0, 20)">+</button>
          </div>
        </td>
        <td id="skill_total_${idSafe}"><strong>+0</strong></td>
        <td>
          ${skill.focused ? `<input type="text" class="skill-focus-input" data-skill="${skill.name}" value="${focusVal}" placeholder="e.g. ${skill.focuses ? skill.focuses.slice(0, 3).join(', ') : 'Specialization'}..." style="width: 100%; min-width: 130px;">` : `<span class="secondary-text">${skill.specializations ? skill.specializations.slice(0, 2).join(', ') : '—'}</span>`}
        </td>
        <td>${advTagsHtml}</td>
        <td style="text-align: center;">
          <button type="button" class="btn-info-circle" onclick="showSkillInfo('${skill.name}')" title="View Full Skill Rules">?</button>
        </td>
      </tr>
    `;
  }).join("");

  tbody.querySelectorAll("input.stepper-input").forEach(input => {
    input.addEventListener("input", (e) => {
      char.skills[e.target.dataset.skill] = parseInt(e.target.value) || 0;
      buildSkillsUI();
      refreshUI();
    });
  });

  tbody.querySelectorAll("input.skill-focus-input").forEach(input => {
    input.addEventListener("input", (e) => {
      if (!char.skillDetails) char.skillDetails = {};
      char.skillDetails[e.target.dataset.skill] = e.target.value;
    });
  });
}

function buildAdvantagesUI() {
  const tbody = document.querySelector("#advantagesTable tbody");
  if (!tbody) return;
  tbody.innerHTML = advantagesDisplayList.map(adv => {
    const idSafe = adv.name.replace(/[^a-zA-Z0-9]/g, "_");
    const val = char.advantages[adv.name] || 0;
    const maxRank = char.getAdvantageMaxRank(adv);
    const detailVal = char.advantageDetails[adv.name] || "";

    const advNameStyle = val > 0 ? 'color: #f59e0b;' : '';

    return `
      <tr>
        <td><strong style="${advNameStyle}">${adv.name}</strong></td>
        <td class="secondary-text">${adv.types.join(", ")}</td>
        <td>
          <div class="stepper-group">
            <button type="button" class="stepper-btn stepper-dec" onclick="stepVal('adv_input_${idSafe}', -1, 0, ${maxRank})">−</button>
            <input type="number" id="adv_input_${idSafe}" class="stepper-input" min="0" max="${maxRank}" value="${val}" data-adv="${adv.name}">
            <button type="button" class="stepper-btn stepper-inc" onclick="stepVal('adv_input_${idSafe}', 1, 0, ${maxRank})">+</button>
          </div>
        </td>
        <td>
          ${adv.focused ? `<input type="text" class="adv-detail-input" data-adv="${adv.name}" value="${detailVal}" placeholder="Specify focus / detail..." style="width: 100%; min-width: 140px;">` : `<span class="secondary-text">—</span>`}
        </td>
        <td class="secondary-text">${adv.description}</td>
        <td style="text-align: center;">
          <button type="button" class="btn-info-circle" onclick="showAdvantageInfo('${adv.name}')" title="View Full Description">?</button>
        </td>
      </tr>
    `;
  }).join("");

  tbody.querySelectorAll("input.stepper-input").forEach(input => {
    input.addEventListener("input", (e) => {
      const val = parseInt(e.target.value) || 0;
      char.advantages[e.target.dataset.adv] = val;
      buildAdvantagesUI(); 
      buildSkillsUI();     
      buildEquipmentUI(); 
      refreshUI();
    });
  });

  tbody.querySelectorAll("input.adv-detail-input").forEach(input => {
    input.addEventListener("input", (e) => {
      char.advantageDetails[e.target.dataset.adv] = e.target.value;
    });
  });
}

window.applyEffectConfiguration = function(pIdx, eIdx, configName, skipHistory = false) {
  if (!char.activePowers[pIdx] || !char.activePowers[pIdx].effects[eIdx]) return;
  const effect = char.activePowers[pIdx].effects[eIdx];

  const targetConfig = configName || "";

  if (!skipHistory) {
      if (!effect.configHistory) { 
        effect.configHistory = [effect.name && effect.name !== "New Effect" && effect.name !== effect.effectName ? effect.name : ""]; 
        effect.configHistoryIdx = 0; 
      }
      if (effect.configHistory[effect.configHistoryIdx] !== targetConfig) {
          effect.configHistory = effect.configHistory.slice(0, effect.configHistoryIdx + 1);
          effect.configHistory.push(targetConfig);
          if (effect.configHistory.length > 20) effect.configHistory.shift();
          else effect.configHistoryIdx++;
      }
  }

  // If reverting to "- Select Config -" (empty / none)
  if (!targetConfig || targetConfig === "New Effect") {
      effect.name = effect.effectName || "New Effect";
      effect.options = {};
      effect.subPowers = [];
      effect.modifiers = [];
      effect.rank = 1;
      effect.descriptors = "";
      effect.notes = "";
      if (effect.effectName) {
          if (!effect.effectCache) effect.effectCache = {};
          effect.effectCache[effect.effectName] = {
              options: {},
              subPowers: [],
              modifiers: [],
              rank: 1,
              name: effect.effectName
          };
      }
      buildPowersUI();
      refreshUI();
      return;
  }
  
  let config = null;
  let targetEffectName = "";

  for (const eff of POWER_EFFECTS_LIST) {
    if (eff.configurations) {
      config = eff.configurations.find(c => c.name === targetConfig);
      if (config) {
        targetEffectName = eff.name;
        break;
      }
    }
  }
  
  if (!config) return;

  effect.effectName = targetEffectName;
  effect.name = config.name;
  effect.descriptors = "";
  
  if (config.rank !== undefined) {
    effect.rank = config.rank;
  } else {
    effect.rank = 1;
  }
  
  effect.options = config.options ? JSON.parse(JSON.stringify(config.options)) : {};
  effect.modifiers = config.modifiers ? JSON.parse(JSON.stringify(config.modifiers)) : [];
  effect.subPowers = config.subPowers ? JSON.parse(JSON.stringify(config.subPowers)) : [];
  effect.notes = config.notes ? config.notes : "";

  // Auto-configure Immunity subPowers if missing or for any Save Immunity config
  if (effect.effectName === "Immunity" && (!effect.subPowers || effect.subPowers.length === 0)) {
    const cfgLower = (targetConfig || config.name || "").toLowerCase();
    if (cfgLower.includes("fortitude") && cfgLower.includes("will")) {
      effect.subPowers = [
        { name: "Fortitude Effects [30 ranks]", type: "Fortitude Effects", rank: 30, baseCost: 1, costType: "per_rank", modifiers: [] },
        { name: "Will Effects [30 ranks]", type: "Will Effects", rank: 30, baseCost: 1, costType: "per_rank", modifiers: [] }
      ];
    } else if (cfgLower.includes("fortitude") || (cfgLower.includes("save") && !cfgLower.includes("will"))) {
      effect.subPowers = [
        { name: "Fortitude Effects [30 ranks]", type: "Fortitude Effects", rank: 30, baseCost: 1, costType: "per_rank", modifiers: [] }
      ];
    } else if (cfgLower.includes("will")) {
      effect.subPowers = [
        { name: "Will Effects [30 ranks]", type: "Will Effects", rank: 30, baseCost: 1, costType: "per_rank", modifiers: [] }
      ];
    } else if (cfgLower.includes("environment") || cfgLower.includes("life support")) {
      effect.subPowers = [
        { name: "Life Support (All Environments) [10 ranks]", type: "Life Support", rank: 10, baseCost: 1, costType: "per_rank", modifiers: [] }
      ];
    } else if (cfgLower.includes("mental")) {
      effect.subPowers = [
        { name: "Common Descriptor (Mental Effects) [10 ranks]", type: "Common Descriptor", rank: 10, baseCost: 1, costType: "per_rank", modifiers: [] }
      ];
    } else if (cfgLower.includes("water") || cfgLower.includes("drown")) {
      effect.subPowers = [
        { name: "Suffocation (One Type: Drowning) [1 rank]", type: "Suffocation (One Type)", rank: 1, baseCost: 1, costType: "per_rank", modifiers: [] }
      ];
    } else if (cfgLower.includes("ageless") || cfgLower.includes("aging")) {
      effect.subPowers = [
        { name: "Aging [1 rank]", type: "Aging", rank: 1, baseCost: 1, costType: "per_rank", modifiers: [] }
      ];
    } else if (config.rank && config.rank > 0) {
      effect.subPowers = [
        { name: `${config.name} [${config.rank} ranks]`, type: config.name, rank: config.rank, baseCost: 1, costType: "per_rank", modifiers: [] }
      ];
    }
  }

  const isComposite = ["Enhanced Senses", "Enhanced Movement", "Enhanced Trait", "Comprehend", "Immunity"].includes(effect.effectName);
  if (isComposite && effect.subPowers && effect.subPowers.length > 0) {
    let sumRanks = 0;
    effect.subPowers.forEach(sp => { sumRanks += (parseInt(sp.rank) || 1); });
    effect.rank = sumRanks;
  } else if (!isComposite) {
      let maxR = window.getMaxPowerRank(effect); 
      if (effect.rank > maxR) effect.rank = maxR;
  }
  
  if (!effect.id) {
    effect.id = "eff_" + Math.random().toString(36).substr(2, 9);
  }

  // If this configuration defines linked secondary effects, append and link them!
  if (config.linkedEffects && Array.isArray(config.linkedEffects) && config.linkedEffects.length > 0) {
    // Clean up any previous auto-linked children from this parent effect
    char.activePowers[pIdx].effects = char.activePowers[pIdx].effects.filter(otherEff => otherEff.linkedTo !== effect.id);

    config.linkedEffects.forEach((linkedCfg, lIdx) => {
      const linkedId = "eff_" + Math.random().toString(36).substr(2, 9);
      const newLinkedEff = {
        id: linkedId,
        name: linkedCfg.name || "Linked Effect",
        effectName: linkedCfg.effectName || "",
        association: effect.association || "primary",
        linkedTo: effect.id,
        rank: linkedCfg.rank !== undefined ? linkedCfg.rank : 1,
        descriptors: linkedCfg.descriptors || "",
        notes: linkedCfg.notes || "",
        modifiers: linkedCfg.modifiers ? JSON.parse(JSON.stringify(linkedCfg.modifiers)) : [],
        options: linkedCfg.options ? JSON.parse(JSON.stringify(linkedCfg.options)) : {},
        subPowers: linkedCfg.subPowers ? JSON.parse(JSON.stringify(linkedCfg.subPowers)) : [],
        effectCache: {},
        effectHistory: [linkedCfg.effectName || ""],
        effectHistoryIdx: 0,
        configHistory: [linkedCfg.name || ""],
        configHistoryIdx: 0
      };
      
      char.activePowers[pIdx].effects.splice(eIdx + 1 + lIdx, 0, newLinkedEff);
    });
  }

  buildPowersUI();
  refreshUI();
};

window.toggleAllConfigs = function(pIdx, eIdx, isChecked) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
    char.activePowers[pIdx].effects[eIdx].showAllConfigs = isChecked;
    buildPowersUI();
  }
};

window.updateEffectAssociation = function(pIdx, eIdx, val) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
      const container = char.activePowers[pIdx];
      
      if (val === 'primary') {
          // Clear other primaries
          container.effects.forEach((eff, idx) => {
              if (idx !== eIdx && eff.association === 'primary') {
                  eff.association = 'alternate';
              }
          });
      } else if (val === 'alternate' || val === 'dynamic') {
          // Ensure there is at least one primary remaining
          let otherPrimary = container.effects.find((eff, idx) => idx !== eIdx && eff.association === 'primary');
          if (!otherPrimary) {
             let firstAvailable = container.effects.find((eff, idx) => idx !== eIdx);
             if (firstAvailable) {
                 firstAvailable.association = 'primary';
             } else {
                 val = 'primary'; // If it's the only effect, it must be primary
             }
          }
      }
      container.effects[eIdx].association = val;
      buildPowersUI();
      refreshUI();
  }
};

window.updateEffectLink = function(pIdx, eIdx, val) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
      char.activePowers[pIdx].effects[eIdx].linkedTo = val || null;
      buildPowersUI();
      refreshUI();
  }
};

function calculateEffectiveRange(effect, baseRange) {
  let effectiveRange = baseRange || "Close";
  if (!effect || !effect.modifiers || effect.modifiers.length === 0) {
    return effectiveRange;
  }

  const incRange = effect.modifiers.find(m => m.name === "Increased Range");
  const rangedMod = effect.modifiers.find(m => m.name === "Ranged" || m.name.includes("Ranged (Deflect)") || m.name.includes("Ranged (Burrowing)"));
  const perRange = effect.modifiers.find(m => m.name === "Perception Range" || m.name === "Perception");
  const decRange = effect.modifiers.find(m => m.name === "Reduced Range" || m.name === "Decreased Range" || m.name === "Close" || m.name === "Close (Flaw)");

  if (baseRange === "Personal") {
    if (incRange) {
      const r = parseInt(incRange.ranks) || 1;
      effectiveRange = r >= 2 ? "Ranged" : "Close";
    }
  } else if (baseRange === "Close") {
    if (incRange) {
      const r = parseInt(incRange.ranks) || 1;
      effectiveRange = r >= 2 ? "Perception" : "Ranged";
    } else if (perRange) {
      effectiveRange = "Perception";
    } else if (rangedMod) {
      effectiveRange = "Ranged";
    }
  } else if (baseRange === "Ranged") {
    if (incRange || perRange) {
      effectiveRange = "Perception";
    } else if (decRange) {
      effectiveRange = "Close";
    }
  } else if (baseRange === "Perception") {
    if (decRange) {
      const r = parseInt(decRange.ranks) || 1;
      effectiveRange = r >= 2 ? "Close" : "Ranged";
    }
  }

  return effectiveRange;
}
window.calculateEffectiveRange = calculateEffectiveRange;

function getEffectiveEffectTraits(effect) {
  if (!effect || !effect.effectName) return { action: "Standard", range: "Close", duration: "Instant", check: "None" };
  const baseData = typeof POWER_EFFECTS_LIST !== 'undefined' 
    ? POWER_EFFECTS_LIST.find(e => e.name === effect.effectName) 
    : null;
    
  let action = baseData?.action || "Standard";
  let range = calculateEffectiveRange(effect, baseData?.range || "Close");
  let duration = baseData?.duration || "Instant";
  let check = baseData?.check || "None";
  
  if (Array.isArray(effect.modifiers)) {
    effect.modifiers.forEach(m => {
      const mName = m.name || "";
      if (mName === "Reaction") action = "Reaction";
      else if (mName === "Triggered") action = "Triggered";
      else if (mName === "Action (Move)") action = "Move";
      else if (mName === "Action (Free)") action = "Free";
      else if (mName === "Action (Reaction)") action = "Reaction";
      else if (mName === "Action (Standard)") action = "Standard";
      else if (mName === "Increased Action") {
        const actionProgression = ["Free", "Move", "Standard", "Full", "Reaction"]; // Reaction shouldn't be reached but just in case
        let idx = actionProgression.indexOf(action);
        if (idx !== -1 && idx < 3) {
            action = actionProgression[Math.min(3, idx + (parseInt(m.ranks) || 1))];
        }
      }
      
      if (mName === "Increased Duration (Concentration)") duration = "Concentration";
      else if (mName === "Increased Duration (Sustained)") duration = "Sustained";
      else if (mName === "Increased Duration (Continuous)") duration = "Continuous";
      else if (mName === "Concentration") duration = "Concentration";
      else if (mName === "Sustained") duration = "Sustained";
      else if (mName === "Permanent") duration = "Permanent";
    });
  }
  
  return { action, range, duration, check };
}
window.getEffectiveEffectTraits = getEffectiveEffectTraits;

window.updatePowerContainerName = function(pIdx, val) {
  if (char.activePowers[pIdx]) {
      char.activePowers[pIdx].name = val;
      const headerTitle = document.getElementById(`powerContainerName_${pIdx}`);
      if (headerTitle) headerTitle.value = val;
  }
};


window.navigateEffectHistory = function(pIdx, eIdx, dir) {
    const effect = char.activePowers[pIdx]?.effects[eIdx];
    if (!effect) return;
    if (!effect.effectHistory) {
        effect.effectHistory = [effect.effectName || ""];
        effect.effectHistoryIdx = 0;
    }
    
    let newIdx = effect.effectHistoryIdx + dir;
    if (dir === -1 && newIdx < 0) {
        if (effect.effectHistory.length === 20) {
            let warningsDisabled = localStorage.getItem("mm4e_disable_warnings") === "true";
            if (!warningsDisabled) alert("History limit reached (last 20 changes). Cannot go back further.");
        }
        return;
    }
    if (dir === 1 && newIdx >= effect.effectHistory.length) {
        return; 
    }
    
    effect.effectHistoryIdx = newIdx;
    window.updateEffectDirect(pIdx, eIdx, effect.effectHistory[newIdx], true);
};

window.navigateConfigHistory = function(pIdx, eIdx, dir) {
    const effect = char.activePowers[pIdx]?.effects[eIdx];
    if (!effect) return;
    if (!effect.configHistory) {
        effect.configHistory = [effect.name && effect.name !== "New Effect" && effect.name !== effect.effectName ? effect.name : ""];
        effect.configHistoryIdx = 0;
    }
    
    let newIdx = effect.configHistoryIdx + dir;
    if (dir === -1 && newIdx < 0) {
        if (effect.configHistory.length === 20) {
            let warningsDisabled = localStorage.getItem("mm4e_disable_warnings") === "true";
            if (!warningsDisabled) alert("History limit reached (last 20 changes). Cannot go back further.");
        }
        return;
    }
    if (dir === 1 && newIdx >= effect.configHistory.length) {
        return; 
    }
    
    effect.configHistoryIdx = newIdx;
    window.applyEffectConfiguration(pIdx, eIdx, effect.configHistory[newIdx], true);
};

function buildPowersUI() {
  const containerId = (window.activePowerContext === 'blueprints') ? "blueprintsContainer" : "powersContainer";
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!char.activePowers || char.activePowers.length === 0) {
    container.innerHTML = `<p class="secondary-text" style="padding: 12px 0;">No powers constructed yet. Click <strong>+ Add New Power Container</strong> above to build a power container.</p>`;
    return;
  }

  container.innerHTML = char.activePowers.map((powerContainer, pIdx) => {
    const containerCost = char.calculateTotalPowerCost(powerContainer);
    const isCollapsed = powerContainer.collapsed ? 'collapsed' : '';
    const summaryText = powerContainer.effects.map(e => `${e.effectName || 'No Effect'} ${e.rank}`).join(" | ");

    let effectsHtml = powerContainer.effects.map((effect, eIdx) => {
        const isComposite = ["Enhanced Senses", "Enhanced Movement", "Enhanced Trait", "Comprehend", "Immunity"].includes(effect.effectName);
        
        let effectData = null;
        if (effect.effectName) {
            effectData = (typeof POWER_EFFECTS_LIST !== 'undefined') ? POWER_EFFECTS_LIST.find(e => e.name === effect.effectName) : null;
        }
        
        if (!effectData) {
            effectData = { name: "- Select Effect -", type: "—", action: "—", range: "—", duration: "—", check: "—", baseCost: 0, fullText: "Please select an effect from the dropdown list to configure your power.", shortDesc: "No effect selected." };
        }
        
        const effectiveTraits = getEffectiveEffectTraits(effect);
          
        if (!effect.options) effect.options = {};
        if (!effect.subPowers) effect.subPowers = [];
        
        let maxPowerRank = window.getMaxPowerRank(effect);
        if (effect.rank > maxPowerRank) effect.rank = maxPowerRank;
        
        const rawEffectCost = char.calculateEffectCost(effect);
        let effectCostDisplay = `${rawEffectCost} PP`;
        if (effect.association === 'alternate') effectCostDisplay = `1 PP`;
        if (effect.association === 'dynamic') effectCostDisplay = `2 PP`;

        let shortDescText = "";
        if (effect.effectName === "Enhanced Movement") shortDescText = "Provides one or more specialized forms of movement.";
        else if (effect.effectName === "Enhanced Senses") shortDescText = "Improves existing senses or grants entirely new ones.";
        else if (effect.effectName === "Comprehend") shortDescText = "Understand and speak with specific subjects.";
        else if (effect.effectName === "Immunity") shortDescText = "Immunity to specific descriptors, conditions, or entire defense checks.";
        else if (effect.effectName === "Feature") shortDescText = "Grants minor, specific benefits or quirks.";
        else if (effect.effectName === "Variable") shortDescText = `Provides <strong style="color: var(--accent-primary);">${effect.rank * 5} Variable Power Points</strong> you can allocate to different effects.`;
        else {
          shortDescText = effectData.shortDesc || "";
          if (!shortDescText && effectData.fullText) {
            shortDescText = (effectData.fullText.length <= 300) ? effectData.fullText : (effectData.fullText.substring(0, 280) + "...");
          }
        }

        const baseRange = effectData ? (effectData.range || "Close") : "Close";
        const effectiveRange = calculateEffectiveRange(effect, baseRange);

        let reachRanks = 0;
        const reachMod = effect.modifiers ? effect.modifiers.find(m => m.name === "Reach") : null;
        if (reachMod) reachRanks = parseInt(reachMod.ranks) || 1;

        let rangeShift = 0;
        const extRangeMod = effect.modifiers ? effect.modifiers.find(m => m.name === "Extended Range") : null;
        if (extRangeMod) rangeShift += (parseInt(extRangeMod.ranks) || 1);

        const dimRangeMod = effect.modifiers ? effect.modifiers.find(m => m.name === "Diminished Range") : null;
        if (dimRangeMod) rangeShift -= (parseInt(dimRangeMod.ranks) || 1);

        let rangeDisplay = effectiveRange;

        if (effectiveRange === "Close") {
          if (reachRanks > 0) {
            let reachDist = (typeof MEASUREMENT_TABLE !== 'undefined' && MEASUREMENT_TABLE[reachRanks.toString()]) ? MEASUREMENT_TABLE[reachRanks.toString()].dist_imp : (5 + reachRanks * 5) + " ft.";
            rangeDisplay = `Close (Reach: Rank ${reachRanks} / ${reachDist})`;
          } else {
            rangeDisplay = `Close (Adjacent / 6 ft.)`;
          }
        } else if (effectiveRange === "Ranged") {
          let r = parseInt(effect.rank) || 1;
          const multipliers = [
            { s: 2, m: 5, l: 10 },      // Shift -3 (Diminished Range 3)
            { s: 5, m: 10, l: 25 },     // Shift -2 (Diminished Range 2)
            { s: 10, m: 25, l: 50 },    // Shift -1 (Diminished Range 1)
            { s: 25, m: 50, l: 100 },   // Shift  0 (Standard Ranged)
            { s: 50, m: 100, l: 250 },  // Shift +1 (Extended Range 1)
            { s: 100, m: 250, l: 500 }, // Shift +2 (Extended Range 2)
            { s: 250, m: 500, l: 1000 },// Shift +3 (Extended Range 3)
            { s: 500, m: 1000, l: 2500 },// Shift +4 (Extended Range 4)
            { s: 1000, m: 2500, l: 5000 },// Shift +5 (Extended Range 5)
            { s: 2500, m: 5000, l: 10000 } // Shift +6 (Extended Range 6)
          ];
          let shiftIndex = 3 + rangeShift; 
          if (shiftIndex < 0) shiftIndex = 0;
          if (shiftIndex >= multipliers.length) shiftIndex = multipliers.length - 1;
          let mults = multipliers[shiftIndex];
          rangeDisplay = `Ranged (Short: ${r * mults.s} ft. / Med: ${r * mults.m} ft. / Long: ${r * mults.l} ft.)`;
        } else if (effectiveRange === "Perception") {
          rangeDisplay = "Perception (Line of sight / Accurate Sense)";
        } else if (effectiveRange === "Personal") {
          rangeDisplay = "Personal";
        } else if (effectiveRange === "Rank") {
          let effRank = Math.max(-5, effect.rank + rangeShift);
          let dist = (typeof MEASUREMENT_TABLE !== 'undefined' && MEASUREMENT_TABLE[effRank.toString()]) ? MEASUREMENT_TABLE[effRank.toString()].dist_imp : "Special";
          rangeDisplay = `Rank ${effRank} (${dist})`;
        }

        let measurementHtml = "";
        if (typeof MEASUREMENT_TABLE !== 'undefined') {
          const mData = MEASUREMENT_TABLE[effect.rank.toString()] || MEASUREMENT_TABLE["20"];
          
          let effMassRank = parseInt(effect.rank) || 1;
          const increasedMassMod = effect.modifiers ? effect.modifiers.find(m => m.name === "Increased Mass") : null;
          if (increasedMassMod) {
              effMassRank += parseInt(increasedMassMod.ranks) || 1;
          }
          const massData = MEASUREMENT_TABLE[effMassRank.toString()] || MEASUREMENT_TABLE["20"];

          let effDistRank = parseInt(effect.rank) || 1;
          if (effectiveRange === "Rank") {
              effDistRank = Math.max(-5, effDistRank + rangeShift);
          }
          
          let effVolRank = effDistRank;
          const areaMod = effect.modifiers ? effect.modifiers.find(m => m.name && m.name.includes("Area Effect")) : null;
          if (areaMod) {
             const areaRanks = parseInt(areaMod.ranks) || 1;
             effDistRank = areaRanks - 1; 
             effVolRank = areaRanks - 1;
          }
          
          const distData = MEASUREMENT_TABLE[effDistRank.toString()] || MEASUREMENT_TABLE["20"];
          const volData = MEASUREMENT_TABLE[effVolRank.toString()] || MEASUREMENT_TABLE["20"];

          if (mData && effect.effectName) {
            const showDist = (effectiveRange === "Rank" || areaMod || effectData.type === "Movement");
            const showTable = showDist || ["Move Object", "Create", "Insubstantial"].includes(effect.effectName);
            
            if (showTable && effect.effectName !== "Enhanced Movement") {
                measurementHtml = `
                  <div style="margin-top: 6px; padding-top: 6px; border-top: 1px dashed var(--border-color); display: flex; gap: 16px; flex-wrap: wrap; font-size: calc(var(--font-size-secondary) * 0.95); font-family: monospace;">
                    <strong style="color: var(--accent-primary);">Table Equivalents:</strong>
                    ${showDist ? `<span><strong>Dist:</strong> ${distData.dist_imp}</span>` : ''}
                    <span><strong>Mass:</strong> ${massData.mass_imp}</span>
                    <span><strong>Time:</strong> ${mData.time}</span>
                    <span><strong>Vol:</strong> ${volData.vol_imp}</span>
                  </div>
                `;
            }
          }
        }

        let allTemplates = [];
        if (typeof POWER_EFFECTS_LIST !== 'undefined') {
            POWER_EFFECTS_LIST.forEach(eff => {
              if (eff.configurations) {
                eff.configurations.forEach(cfg => {
                  allTemplates.push({ ...cfg, effectName: eff.name });
                });
              }
            });
            allTemplates.sort((a, b) => a.name.localeCompare(b.name));
        }

        const showAll = effect.showAllConfigs;
        const availableTemplates = showAll ? allTemplates : (effectData.configurations || []);
        const hasPresets = availableTemplates && availableTemplates.length > 0;
        const isCustomConfig = effect.name && effect.name !== 'New Effect' && effect.name !== effect.effectName;

        let configIndicatorBadge = "";
        if (hasPresets && !showAll) {
          configIndicatorBadge = `<span class="badge-config-indicator" title="This power has ${availableTemplates.length} ready-to-use configurations/presets">⚙ ${availableTemplates.length} Presets Available</span>`;
        } else if (showAll) {
          configIndicatorBadge = `<span class="badge-config-indicator" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border-color: rgba(16, 185, 129, 0.4);" title="Showing all ${allTemplates.length} global configurations">⚙ All Presets (${allTemplates.length})</span>`;
        }

        let templateDropdownHtml = `
          <div class="config-control-group ${hasPresets ? 'has-configs' : ''}" style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
            <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">${hasPresets ? '<span style="color: #0284c7;">★</span> ' : ''}Config:</label>
            <select class="minor-control" style="width: 160px; ${isCustomConfig ? 'color: var(--accent-primary); font-weight: bold;' : ''}" onchange="applyEffectConfiguration(${pIdx}, ${eIdx}, this.value)">
              <option value="" ${!isCustomConfig ? 'selected' : ''} style="color: var(--text-main); font-weight: normal;">${hasPresets ? '- Select Config -' : '- No Presets -'}</option>
              ${availableTemplates.map(cfg => `<option value="${cfg.name}" ${cfg.name === effect.name ? 'selected' : ''} style="color: var(--text-main); font-weight: normal;">${cfg.name}${showAll ? ` (${cfg.effectName || effectData.name})` : ''}</option>`).join('')}
            </select>
            <div style="display: flex; align-items: center; gap: 2px;">
                <button type="button" class="btn minor-control-btn" style="padding: 2px 6px; font-weight: bold;" onclick="navigateConfigHistory(${pIdx}, ${eIdx}, -1)" title="Back">&lt;</button>
                <button type="button" class="btn minor-control-btn" style="padding: 2px 6px; font-weight: bold;" onclick="navigateConfigHistory(${pIdx}, ${eIdx}, 1)" title="Forward">&gt;</button>
            </div>
            <label style="display: inline-flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; font-weight: normal; cursor: pointer; font-size: calc(var(--font-size-minor-controls) * 0.9); margin-left: 2px; line-height: 1;">
              <input type="checkbox" onchange="toggleAllConfigs(${pIdx}, ${eIdx}, this.checked)" ${showAll ? 'checked' : ''} style="margin: 0;">
              <span style="text-align: center;">Show<br>All</span>
            </label>
            ${configIndicatorBadge}
          </div>
        `;

        let subPowersHtml = "";
        if (effect.subPowers && effect.subPowers.length > 0) {
          subPowersHtml = effect.subPowers.map((sub, sIdx) => {
            let subMaxR = window.getMaxPowerRank(effect, sub);
            let sRank = sub.rank !== undefined ? sub.rank : 1;
            let dynDesc = "";
            let sType = sub.type || sub.name;
            
            let placeholderText = "Details, specifics, or configurations...";

            let mData = typeof MEASUREMENT_TABLE !== 'undefined' ? MEASUREMENT_TABLE[sRank.toString()] : null;
            let subMeasurementHtml = "";

            let isSenseTypeOpt = sType.includes("Sense Type");
            let mySenseType = isSenseTypeOpt ? sType.split(" - ")[0].replace(" Senses", "") : (SENSE_TYPE_MAP[sType] || "Unknown");

            let isVisual = mySenseType === "Visual" || /Sight|Visual|vision/i.test(sType);
            let isAuditory = mySenseType === "Auditory" || /Hearing|Auditory/i.test(sType);
            let isTactile = mySenseType === "Tactile" || /Touch|Tactile/i.test(sType);

            let defaults = [];
            if (isVisual) { defaults.push("Accurate", "Acute"); }
            if (isAuditory) { defaults.push("Acute"); }
            if (isTactile) { defaults.push("Accurate"); }

            let defaultText = defaults.length > 0 ? `<div style="margin-top: 2px; color: var(--accent-primary);"><strong>Default Traits:</strong> ${defaults.join(", ")}</div>` : "";

            if (sType.includes("Dimensional Travel")) {
                let dest = "Home dimension and one other (Base 2 ranks)";
                let baseDestRank = 2;
                if (sRank >= 6) { dest = "Any dimension known to you (Base 6 ranks)"; baseDestRank = 6; }
                else if (sRank >= 4) { dest = "A related group of dimensions (Base 4 ranks)"; baseDestRank = 4; }
                let massIncrease = Math.max(0, sRank - baseDestRank);
                
                const incMassMod = sub.modifiers ? sub.modifiers.find(m => m.name === "Increased Mass") : null;
                if (incMassMod) massIncrease += parseInt(incMassMod.ranks) || 1;

                let massStr = "50 lbs (Rank 0)";
                if (typeof MEASUREMENT_TABLE !== 'undefined' && MEASUREMENT_TABLE[massIncrease.toString()]) {
                    massStr = MEASUREMENT_TABLE[massIncrease.toString()].mass_imp + " (Rank " + massIncrease + ")";
                }
                if (sRank < 2) dynDesc = `<span style="color: #ef4444;">Requires at least 2 ranks.</span>`;
                else dynDesc = `<strong>Destination Tier:</strong> ${dest}. <br><strong>Mass Capacity:</strong> ${massStr}.`;
            } else if (sType.includes("Space Travel")) {
                let dest = "Solar System / Other planets (Base 2 ranks)";
                let baseDestRank = 2;
                if (sRank >= 6) { dest = "Intergalactic / Distant star systems (Base 6 ranks)"; baseDestRank = 6; }
                else if (sRank >= 4) { dest = "Interstellar / Other star systems (Base 4 ranks)"; baseDestRank = 4; }
                if (sRank < 2) dynDesc = `<span style="color: #ef4444;">Requires at least 2 ranks.</span>`;
                else dynDesc = `<strong>Destination Tier:</strong> ${dest}.`; 
            } else if (sType.includes("Environmental Adaptation")) {
                placeholderText = "Specify adapted environment(s) (e.g. Underwater, Zero-G)...";
                dynDesc = `Provides normal movement and action in ${sRank} specific hazardous environment(s).`;
            } else if (sType.includes("Permeate")) {
                let spd = "Speed rank 0";
                let baseRank = 2;
                if (sRank >= 6) { spd = "Normal ground speed"; baseRank = 6; }
                else if (sRank >= 4) { spd = "Speed rank 1"; baseRank = 4; }
                if (sRank < 2) {
                    dynDesc = `<span style="color: #ef4444;">Requires at least 2 ranks.</span>`;
                } else {
                    dynDesc = `<strong>Permeate Speed:</strong> ${spd} through obstacles (Base ${baseRank} ranks).`;
                }
            } else if (sType.includes("Wall-Crawling")) {
                dynDesc = sRank >= 4 ? "Full ground speed rank, not Vulnerable" : "Ground speed rank -1, Vulnerable while climbing";
            } else if (sType.includes("Water-Walking")) {
                dynDesc = sRank >= 2 ? "Can stand, move, and lie Prone on liquid surfaces" : "Can stand or move across liquid surfaces (sinks if Prone)";
            } else if (sType.includes("Safe Fall")) {
                dynDesc = "Fall any reasonable distance without harm.";
            } else if (sType.includes("Slithering")) {
                dynDesc = "Move at normal ground speed while Prone.";
            } else if (sType.includes("Swinging")) {
                dynDesc = sRank < 2 ? `<span style="color: #ef4444;">Requires 2 ranks.</span>` : "Swing through the air at speed rank 2.";
            } else if (sType.includes("Stable")) {
                placeholderText = "Specify unstable movement mode(s)...";
                dynDesc = `Ignore movement penalties for ${sRank} unstable movement mode(s).`;
            } else if (sType.includes("Trackless")) {
                placeholderText = "Specify sense type(s)...";
                dynDesc = `Leave no trail and cannot be tracked using ${sRank} sense type(s).`;
            } else if (sType.includes("Microscopic Vision")) {
                dynDesc = sRank >= 4 ? "Atomic scale" : (sRank >= 3 ? "DNA / Molecules" : (sRank >= 2 ? "Cellular scale" : "Dust-sized"));
            } else if (sType.includes("Sense Type")) {
              if (mySenseType === "Visual") dynDesc = "Includes: Normal Sight, Low-Light, Darkvision, Infra-Vision, Ultra-Vision, Microscopic, etc.";
              else if (mySenseType === "Auditory") dynDesc = "Includes: Normal Hearing, Ultra-Hearing, Ultrasonic, Sonar, etc.";
              else if (mySenseType === "Radio") dynDesc = "Includes: Radio, Radar, etc.";
              else if (mySenseType === "Mental") dynDesc = "Includes: Mental Awareness, Detect Minds, Danger Sense, etc.";
              else if (mySenseType === "Tactile") dynDesc = "Includes: Normal Touch, Ranged Touch, Tremorsense, etc.";
              else if (mySenseType === "Olfactory") dynDesc = "Includes: Normal Smell, Normal Taste, Tracking Scent, etc.";
              else dynDesc = `All senses within the ${mySenseType} sense type.`;
            } else if (effect.effectName === "Comprehend") {
              if (sType.includes("Animals")) dynDesc = sRank === 1 ? "Communicate to OR comprehend animals." : "Communicate to AND comprehend animals.";
              else if (sType.includes("Computers")) dynDesc = sRank === 1 ? "Communicate to OR receive from digital devices." : "Communicate to AND comprehend digital devices.";
              else if (sType.includes("Languages")) {
                if (sRank === 1) dynDesc = "Communicate in OR understand any language.";
                else if (sRank === 2) dynDesc = "Communicate in AND understand any language.";
                else if (sRank === 3) dynDesc = "Communicate in multiple languages at once.";
                else dynDesc = "Communicate in any language and gain physical ability to do so.";
              } else if (sType.includes("Objects")) dynDesc = sRank >= 2 ? "Communicate with inanimate objects." : "Requires 2 ranks to function.";
              else if (sType.includes("Plants")) dynDesc = sRank >= 2 ? "Communicate to and comprehend plants." : "Requires 2 ranks to function.";
              else if (sType.includes("Spirits")) dynDesc = sRank === 1 ? "Comprehend spirits." : "Comprehend spirits and be understood by them.";
            } else if (effect.effectName === "Enhanced Trait") {
              if (typeof ADVANTAGES_LIST !== 'undefined' && ADVANTAGES_LIST.some(a => a.name === sType)) {
                let adv = ADVANTAGES_LIST.find(a => a.name === sType);
                dynDesc = adv ? (adv.description || adv.conditionalSummary || "Enhanced advantage.") : "Enhanced advantage.";
              } else if (typeof SKILLS_LIST !== 'undefined' && SKILLS_LIST.some(s => s.name === sType)) {
                dynDesc = `Provides +${sRank} enhanced skill rank to ${sType} checks.`;
              } else {
                dynDesc = `Provides +${sRank} enhanced rank to ${sType}.`;
              }
              placeholderText = "Notes, descriptor specifics, or limits...";
            } else if (effect.effectName === "Affliction") {
              dynDesc = `Applies the '${sType}' condition on a target at this degree.`;
            } else if (effect.effectName === "Immunity") {
              if (sType.includes("Life Support")) dynDesc = "Immunity to all Environmental Hazards (Aging, Cold, Deprivation, Disease, Heat, Poison, Pressure, Radiation, Sleep, Suffocation, Vacuum).";
              else if (sType.includes("Very Common Descriptor")) dynDesc = "Immunity to a Very Common descriptor (e.g. Energy Damage, Bludgeoning Damage, Piercing Damage, Slashing Damage).";
              else if (sType.includes("Common Descriptor")) dynDesc = "Immunity to a Common descriptor (e.g. all effects of a type like Cold, Electricity, Fire, Radiation, Weather, or Ballistic Damage).";
              else if (sType.includes("Uncommon Descriptor")) dynDesc = "Immunity to an Uncommon descriptor (e.g. Fire Damage, Cold Damage, Electricity Damage, Radiation Damage, Falling Damage, Entrapment, Dazzle, Fatigue).";
              else if (sType.includes("Rare Descriptor")) dynDesc = "Immunity to a Rare descriptor (e.g. Chemical, Fear, Gravitic, Holy, or Critical Hits).";
              else if (sType.includes("Very Rare Descriptor")) dynDesc = "Immunity to a Very Rare descriptor (e.g. own powers, specific individual's powers).";
              else if (sType.includes("Custom Immunity")) dynDesc = "Specify custom immunity details below.";
              else dynDesc = `Immunity to ${sType}.`;
              if (sType.includes("Descriptor") || sType.includes("Custom") || sType.includes("One Type")) placeholderText = "Specify descriptor or details...";
            }

            if (effect.effectName === "Enhanced Senses") {
                if (!dynDesc && defaultText) {
                    dynDesc = defaultText;
                } else if (dynDesc) {
                    dynDesc += defaultText;
                }
            }

            let subModsHtml = "";
            let metaTagsHtml = "";
            if (sub.modifiers && sub.modifiers.length > 0) {
              sub.modifiers.forEach((sMod, smIdx) => {
                if (sMod.isMeta) {
                  let mDescText = "";
                  let m = sMod.name;
                  let smRank = parseInt(sMod.ranks) || 1;
                  
                  if (m.includes("Extended")) {
                      let mult = Math.pow(10, smRank).toLocaleString();
                      mDescText = `x${mult} distance`;
                  } else if (m.includes("Rapid")) {
                      let mult = Math.pow(10, smRank).toLocaleString();
                      mDescText = `x${mult} perception speed`;
                  } else if (m.includes("Counters Illusion")) {
                      mDescText = "Ignores Illusion effects";
                  } else if (m.includes("Penetrates Concealment")) {
                      mDescText = "Ignores solid barriers and obstacles";
                  }
                  
                  let stepperHtml = "";
                  if (sMod.costType === "per_rank") {
                      stepperHtml = `
                        <div class="modifier-stepper-group" style="margin-left: 6px;">
                          <button type="button" class="modifier-stepper-btn" onclick="stepSubPowerModifierRank(${pIdx}, ${eIdx}, ${sIdx}, ${smIdx}, -1, 1, 10)">−</button>
                          <span class="modifier-stepper-val">${smRank}</span>
                          <button type="button" class="modifier-stepper-btn" onclick="stepSubPowerModifierRank(${pIdx}, ${eIdx}, ${sIdx}, ${smIdx}, 1, 1, 10)">+</button>
                        </div>
                      `;
                  }
                  
                  metaTagsHtml += `
                    <div class="modifier-chip" style="background: rgba(59, 130, 246, 0.1); border-color: var(--accent-primary);">
                      <span><strong>${m.split(" [+")[0]}</strong></span>
                      ${stepperHtml}
                      <button type="button" style="background: none; border: none; color: #ef4444; font-weight: bold; cursor: pointer; padding: 0 4px; margin-left: 4px;" onclick="removeSubPowerModifier(${pIdx}, ${eIdx}, ${sIdx}, ${smIdx})" title="Remove Meta-Option">✕</button>
                      ${mDescText ? `<div style="font-size: 10pt; width: 100%; color: var(--text-muted); margin-top: 2px;">${mDescText}</div>` : ''}
                    </div>
                  `;
                } else {
                  let mRanks = parseInt(sMod.ranks) || 1;
                  let mCostType = sMod.costType === "flat" ? " flat" : "/r";
                  let mCost = sMod.cost !== undefined ? sMod.cost : 1;
                  let isEx = sMod.category === 'extra' ? '+' : '-';
                  
                  subModsHtml += `
                    <div class="modifier-chip" style="font-size: calc(var(--font-size-minor-controls) * 0.9);">
                      <span><strong>${sMod.name.split(" [")[0]}</strong> (${isEx}${mCost}${mCostType})</span>
                      <div class="modifier-stepper-group" style="margin-left: 6px;">
                        <button type="button" class="modifier-stepper-btn" onclick="stepSubPowerModifierRank(${pIdx}, ${eIdx}, ${sIdx}, ${smIdx}, -1, 1, 20)">−</button>
                        <span class="modifier-stepper-val">${mRanks}</span>
                        <button type="button" class="modifier-stepper-btn" onclick="stepSubPowerModifierRank(${pIdx}, ${eIdx}, ${sIdx}, ${smIdx}, 1, 1, 20)">+</button>
                      </div>
                      <button type="button" style="background: none; border: none; color: #ef4444; font-weight: bold; cursor: pointer; padding: 0 4px; margin-left: 4px;" onclick="removeSubPowerModifier(${pIdx}, ${eIdx}, ${sIdx}, ${smIdx})" title="Remove Modifier">✕</button>
                    </div>
                  `;
                }
              });
            }

            let metaPickerHtml = "";
            if (effect.effectName === "Enhanced Senses") {
              let metaChoices = [
                "- Select Option Modifier -",
                "Accurate (Single Sense) [+2 pts]", "Accurate (Sense Type) [+4 pts]", 
                "Acute (Single Sense) [+1 pt]", "Acute (Sense Type) [+2 pts]", 
                "Analytical (Single Sense) [+1 pt]", "Analytical (Sense Type) [+2 pts]",
                "Counters Concealment (One Descriptor) [+2 pts]", "Counters Concealment (All) [+5 pts]", 
                "Counters Illusion [+2 pts]", 
                "Extended (Single Sense) [+1 pt/r]", "Extended (Sense Type) [+2 pts/r]", 
                "Penetrates Concealment [+4 pts]",
                "Radius (Single Sense) [+1 pt]", "Radius (Sense Type) [+2 pts]", 
                "Ranged (Single Sense) [+1 pt]", "Ranged (Sense Type) [+2 pts]",
                "Rapid (Single Sense) [+1 pt/r]", "Rapid (Sense Type) [+2 pts/r]", 
                "Tracking (Half Speed) [+1 pt]", "Tracking (Full Speed) [+2 pts]"
              ];

              if (isSenseTypeOpt) {
                  metaChoices = metaChoices.filter(c => !c.includes("(Single Sense)"));
              } else {
                  metaChoices = metaChoices.filter(c => !c.includes("(Sense Type)"));
              }

              if (!isSenseTypeOpt && mySenseType !== "Unknown") {
                  let parentSenseTypeSub = effect.subPowers.find(sp => sp.type.includes(mySenseType) && sp.type.includes("Sense Type"));
                  if (parentSenseTypeSub && parentSenseTypeSub.modifiers) {
                      parentSenseTypeSub.modifiers.forEach(pm => {
                          let coreMeta = pm.name.split(" (")[0]; 
                          metaChoices = metaChoices.filter(c => !c.startsWith(coreMeta));
                      });
                  }
              }

              if (isVisual) metaChoices = metaChoices.filter(c => !c.includes("Accurate") && !c.includes("Acute"));
              if (isAuditory) metaChoices = metaChoices.filter(c => !c.includes("Acute"));
              if (isTactile) metaChoices = metaChoices.filter(c => !c.includes("Accurate"));

              if (sub.modifiers && sub.modifiers.some(m => m.name.includes("Counters Concealment (All)"))) {
                  metaChoices = metaChoices.filter(c => !c.includes("Counters Concealment (One Descriptor)"));
              }

              metaPickerHtml = `
                <select id="selSubMeta_${pIdx}_${eIdx}_${sIdx}" class="minor-control" style="font-size: var(--font-size-minor-controls, 14px); max-width: 200px;">
                  ${metaChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
                <button type="button" class="btn minor-control-btn" style="font-size: 10pt; padding: 2px 6px;" onclick="addSubPowerMeta(${pIdx}, ${eIdx}, ${sIdx}, 'selSubMeta_${pIdx}_${eIdx}_${sIdx}')">+ Add Modifier</button>
                <div style="display: inline-flex; align-items: center; gap: 4px; flex-wrap: wrap;">
                  ${metaTagsHtml}
                </div>
              `;
            } else if (effect.effectName === "Immunity") {
              let metaChoices = [
                "- Select Option Modifier -",
                "Affects Others [+1 pt/r]", 
                "Affects Others Only [+0 pts/r]", 
                "Area Effect [+1 pt/r]", 
                "Sustained [+0 pts/r]",
                "Ranged [+1 pt/r]",
                "Redirect (Reaction) [+1 pt]",
                "Redirect (Sustained) [+1 pt/r]",
                "Redirect (Continuous) [+2 pts/r]",
                "Concentration [-1 pt/r]",
                "Resistance [-1 pt/r]"
              ];
              metaPickerHtml = `
                <select id="selSubMeta_${pIdx}_${eIdx}_${sIdx}" class="minor-control" style="font-size: var(--font-size-minor-controls, 14px); max-width: 200px;">
                  ${metaChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
                <button type="button" class="btn minor-control-btn" style="font-size: 10pt; padding: 2px 6px;" onclick="addSubPowerMeta(${pIdx}, ${eIdx}, ${sIdx}, 'selSubMeta_${pIdx}_${eIdx}_${sIdx}')">+ Add Modifier</button>
                <div style="display: inline-flex; align-items: center; gap: 4px; flex-wrap: wrap;">
                  ${subModsHtml}
                </div>
              `;
            }

            let isImmunityLocked = effect.effectName === "Immunity" && !sType.includes("Custom");
            let isFlatAdvantage = effect.effectName === "Enhanced Trait" && typeof ADVANTAGES_LIST !== 'undefined' && ADVANTAGES_LIST.some(a => a.name === sType && !(a.hasRanks || a.ranked));
            let allowsRanks = (sub.costType === "per_rank") || (effect.effectName === "Enhanced Trait" && !isFlatAdvantage);

            let stepperControls = subMaxR > 1 && allowsRanks && !isImmunityLocked ? `
              <button type="button" class="stepper-btn stepper-dec" style="width: 26px !important; min-width: 26px !important;" onclick="stepSubPowerRank(${pIdx}, ${eIdx}, ${sIdx}, -1, 1, ${subMaxR})">−</button>
              <input type="number" class="stepper-input" style="width: 38px !important; min-width: 38px !important; font-size: var(--font-size-minor-controls);" value="${sRank}" min="1" max="${subMaxR}" readonly>
              <button type="button" class="stepper-btn stepper-inc" style="width: 26px !important; min-width: 26px !important;" onclick="stepSubPowerRank(${pIdx}, ${eIdx}, ${sIdx}, 1, 1, ${subMaxR})">+</button>
            ` : `
              <input type="number" class="stepper-input" style="width: 50px !important; min-width: 50px !important; font-size: var(--font-size-minor-controls); background: transparent; border: none;" value="${sRank}" readonly title="${isImmunityLocked ? 'Rank Locked by Tier' : (isFlatAdvantage ? 'Rank 1 (Standard Advantage)' : 'Rank Locked')}">
            `;

            let cardStyle = "background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 4px; padding: 8px 10px;";
            if (effect.effectName === "Enhanced Trait") {
                cardStyle += " flex: 1; min-width: calc(50% - 10px);";
            } else {
                cardStyle += " width: 100%;";
            }
            
            let arrowIcon = "";
            if (effect.effectName === "Enhanced Trait") {
                arrowIcon = sub.isReduced ? '<span style="color: #ef4444; font-size: 14px;" title="Reduced Trait">▼</span> ' : '<span style="color: #10b981; font-size: 14px;" title="Enhanced Trait">▲</span> ';
            }

            return `
              <div class="sub-power-card" style="${cardStyle}">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
                  <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
                    <strong style="font-size: var(--font-size-controls); color: var(--accent-primary); white-space: nowrap;">
                      ${arrowIcon}${sub.name.split(" [")[0] || sub.type}
                      ${dynDesc ? `<button type="button" class="btn-info-circle" style="min-width: 18px; min-height: 18px; font-size: 10pt; margin-left: 4px; vertical-align: middle;" onclick="showOptionInfo('${(sub.name.split(" [")[0] || sub.type).replace(/'/g, "\\'")}', '${dynDesc.replace(/'/g, "\\'").replace(/"/g, "&quot;")}')" title="View Option Info">?</button>` : ''}
                    </strong>
                    <span class="badge effect-cost-badge" style="font-size: 10pt; white-space: nowrap;">${sub.baseCost || 1} ${sub.costType === 'per_rank' ? 'PP/r' : 'PP'}</span>
                    ${effect.effectName !== "Enhanced Trait" ? `
                        <input type="text" class="minor-control" placeholder="${placeholderText}" value="${sub.details || ''}" oninput="updateSubPowerDetails(${pIdx}, ${eIdx}, ${sIdx}, this.value)" style="flex: 1; min-width: 80px; border: 1px solid var(--border-color); background: var(--bg-panel); color: var(--text-main); font-size: var(--font-size-controls, 14px); padding: 2px 6px; margin-left: 4px; height: 26px;">
                    ` : ''}
                  </div>

                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <label style="font-size: var(--font-size-secondary);">Rank:</label>
                      <div class="stepper-group" style="height: 24px; width: 90px; min-width: 90px;">
                        ${stepperControls}
                      </div>
                    </div>
                    <button type="button" class="btn-delete-power" style="padding: 2px 6px; font-size: 10pt;" onclick="removeSubPower(${pIdx}, ${eIdx}, ${sIdx})" title="Delete Option">Delete</button>
                  </div>
                </div>
                
                ${metaPickerHtml ? `
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 6px;">
                    ${metaPickerHtml}
                </div>` : ''}

                ${subMeasurementHtml}

              </div>
            `;
          }).join("");
        }

        let optionPickersHtml = "";
        if (effect.effectName === "Enhanced Senses") {
          const senseChoices = [
            "- Select Primary Sense -", "Normal Hearing [0 pts]", "Normal Mental [0 pts]", "Normal Radio [0 pts]", "Normal Sight [0 pts]", "Normal Smell [0 pts]", "Normal Taste [0 pts]", "Normal Touch [0 pts]",
            "Auditory Senses - Sense Type [0 pts]", "Mental Senses - Sense Type [0 pts]", "Olfactory Senses - Sense Type [0 pts]", "Radio Senses - Sense Type [0 pts]", "Tactile Senses - Sense Type [0 pts]", "Visual Senses - Sense Type [0 pts]",
            "Awareness [1 pt]", "Communication Link [1 pt]", "Danger Sense [1 pt]", "Detect [1 pt]", "Direction Sense [1 pt]", "Distance Sense [1 pt]", "Infravision [1 pt]", "Low-Light Vision [1 pt]", "Radio [1 pt]", "Time Sense [1 pt]", "Tracking [1 pt]", "Ultra-Hearing [1 pt]", "Ultravision [1 pt]",
            "Custom Sense [1 pt/r]", "Microscopic Vision [1 pt/r]",
            "Darkvision [2 pts]"
          ];

          optionPickersHtml = `
            <div class="power-options-row" style="display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end; background: var(--bg-panel); padding: 8px; border: 1px solid var(--border-color); border-radius: 4px; margin-top: 4px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Sense Option:</label>
                <select id="selOptionChoice_${pIdx}_${eIdx}" class="minor-control" style="width: 220px;">
                  ${senseChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
                <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selOptionChoice_${pIdx}_${eIdx}')">+ Add Option</button>
              </div>
            </div>
          `;
        } else if (effect.effectName === "Enhanced Movement") {
          const movChoices = [
            "- Select Movement Option -", "Safe Fall [1 pt]", "Slithering [1 pt]", 
            "Dimensional Travel [1 pt/r]", "Environmental Adaptation [1 pt/r]", "Permeate [1 pt/r]", "Space Travel [1 pt/r]", "Stable [1 pt/r]", "Swinging [1 pt/r]", "Trackless [1 pt/r]", "Wall-Crawling [1 pt/r]", "Water-Walking [1 pt/r]"
          ];

          optionPickersHtml = `
            <div class="power-options-row" style="display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end; background: var(--bg-panel); padding: 8px; border: 1px solid var(--border-color); border-radius: 4px; margin-top: 4px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Movement Option:</label>
                <select id="selOptionChoice_${pIdx}_${eIdx}" class="minor-control" style="width: 200px;">
                  ${movChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
                <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selOptionChoice_${pIdx}_${eIdx}')">+ Add Option</button>
              </div>
            </div>
          `;
        } else if (effect.effectName === "Comprehend") {
          const compChoices = ["- Select Comprehension Option -", "Animals [1 pt/r]", "Computers [1 pt/r]", "Languages [1 pt/r]", "Objects [1 pt/r]", "Plants [1 pt/r]", "Spirits [1 pt/r]"];
          optionPickersHtml = `
            <div class="power-options-row" style="display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end; background: var(--bg-panel); padding: 8px; border: 1px solid var(--border-color); border-radius: 4px; margin-top: 4px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Comprehend Option:</label>
                <select id="selOptionChoice_${pIdx}_${eIdx}" class="minor-control" style="width: 200px;">
                  ${compChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
                <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selOptionChoice_${pIdx}_${eIdx}')">+ Add Option</button>
              </div>
            </div>
          `;
        } else if (effect.effectName === "Immunity") {
          const immChoices = [
            "- Select Immunity Option -",
            "Aging [1 rank]", "Cold (Environment) [1 rank]", "Deprivation [1 rank]", "Disease [1 rank]", "Heat (Environment) [1 rank]", "Poison [1 rank]", "Pressure [1 rank]", "Radiation (Environment) [1 rank]", "Sleep [1 rank]", "Suffocation (One Type) [1 rank]", "Vacuum [1 rank]", "Very Rare Descriptor [1 rank]",
            "All Suffocation [2 ranks]", "Chemical [2 ranks]", "Critical Hits [2 ranks]", "Fear [2 ranks]", "Gravitic [2 ranks]", "Holy [2 ranks]", "Rare Descriptor [2 ranks]",
            "Ballistic Damage [5 ranks]", "Cold Damage [5 ranks]", "Dazzle Effects [5 ranks]", "Electricity Damage [5 ranks]", "Emotion Effects [5 ranks]", "Entrapment Effects [5 ranks]", "Falling Damage [5 ranks]", "Fatigue Effects [5 ranks]", "Fire Damage [5 ranks]", "Interaction Skills [5 ranks]", "Magic Damage [5 ranks]", "Radiation Damage [5 ranks]", "Sonic Damage [5 ranks]", "Uncommon Descriptor [5 ranks]",
            "Cold Effects (All) [10 ranks]", "Common Descriptor [10 ranks]", "Electricity Effects (All) [10 ranks]", "Fire Effects (All) [10 ranks]", "Life Support (All Environments) [10 ranks]", "Radiation Effects (All) [10 ranks]", "Weather Effects (All) [10 ranks]",
            "Bludgeoning Damage [20 ranks]", "Energy Damage [20 ranks]", "Piercing Damage [20 ranks]", "Slashing Damage [20 ranks]", "Very Common Descriptor [20 ranks]",
            "Fortitude Effects [30 ranks]", "Will Effects [30 ranks]",
            "Custom Immunity [1 rank/r]"
          ];
          optionPickersHtml = `
            <div class="power-options-row" style="display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end; background: var(--bg-panel); padding: 8px; border: 1px solid var(--border-color); border-radius: 4px; margin-top: 4px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Immunity Option:</label>
                <select id="selOptionChoice_${pIdx}_${eIdx}" class="minor-control" style="width: 250px;">
                  ${immChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
                <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selOptionChoice_${pIdx}_${eIdx}')">+ Add Option</button>
              </div>
            </div>
          `;
        } else if (effect.effectName === "Enhanced Trait") {
          let abilityChoices = [
            "- Select Ability / Defense -",
            "Strength (STR) [2 pts/r]",
            "Stamina (STA) [2 pts/r]",
            "Agility (AGL) [2 pts/r]",
            "Intellect (INT) [2 pts/r]",
            "Awareness (AWE) [2 pts/r]",
            "Presence (PRE) [2 pts/r]",
            "Attack (ATK) [2 pts/r]",
            "Defense (DEF) [2 pts/r]",
            "Dodge Resistance [1 pt/r]",
            "Fortitude Resistance [1 pt/r]",
            "Will Resistance [1 pt/r]",
            "Toughness [1 pt/r]"
          ];

          let advChoices = ["- Select Advantage -"];
          if (typeof ADVANTAGES_LIST !== 'undefined' && Array.isArray(ADVANTAGES_LIST)) {
            ADVANTAGES_LIST.forEach(adv => {
              advChoices.push(`${adv.name} [1 pt${adv.hasRanks ? '/r' : ''}]`);
            });
          } else {
            advChoices.push(
              "Agile Feint [1 pt]", "All-Out Attack [1 pt]", "Animal Empathy [1 pt]", "Assessment [1 pt]", "Benefit [1 pt/r]", "Close Attack [1 pt/r]", "Close Defense [1 pt/r]", "Connected [1 pt]", "Contact [1 pt]", "Daze [1 pt]", "Defensive Attack [1 pt]", "Defensive Roll [1 pt/r]", "Eidetic Memory [1 pt]", "Equipment [1 pt/r]", "Evasion [1 pt/r]", "Fascinate [1 pt/r]", "Fast Grab [1 pt]", "Favored Environment [1 pt]", "Favored Foe [1 pt]", "Grab Finesse [1 pt]", "Great Endurance [1 pt]", "Hide in Plain Sight [1 pt]", "Improved Aim [1 pt]", "Improved Critical [1 pt/r]", "Improved Defense [1 pt]", "Improved Disarm [1 pt]", "Improved Hold [1 pt]", "Improved Initiative [1 pt/r]", "Improved Trip [1 pt]", "Improvised Tools [1 pt]", "Jack-of-all-Trades [1 pt]", "Languages [1 pt/r]", "Luck [1 pt/r]", "Minion [1 pt/r]", "Move-by Action [1 pt]", "Multilingual [1 pt/r]", "Power Attack [1 pt]", "Prone Fighting [1 pt]", "Quick Draw [1 pt]", "Ranged Attack [1 pt/r]", "Ranged Defense [1 pt/r]", "Ranged Disarm [1 pt]", "Redirect [1 pt]", "Ricochet Attack [1 pt/r]", "Ritualist [1 pt]", "Second Chance [1 pt/r]", "Setup [1 pt/r]", "Sidekick [1 pt/r]", "Skill Focus [1 pt/r]", "Startle [1 pt]", "Tough [1 pt/r]", "Trance [1 pt]", "Ultimate Effort [1 pt/r]", "Uncanny Dodge [1 pt]", "Weapon Bind [1 pt]", "Weapon Break [1 pt]"
            );
          }

          let skillChoices = ["- Select Skill -"];
          if (typeof SKILLS_LIST !== 'undefined' && Array.isArray(SKILLS_LIST)) {
            SKILLS_LIST.forEach(sk => {
              skillChoices.push(`${sk.name} [1 pt/r]`);
            });
          } else {
            skillChoices.push(
              "Acrobatics [1 pt/r]", "Athletics [1 pt/r]", "Close Combat [1 pt/r]", "Computers [1 pt/r]", "Deception [1 pt/r]", "Expertise [1 pt/r]", "Insight [1 pt/r]", "Intimidation [1 pt/r]", "Investigation [1 pt/r]", "Perception [1 pt/r]", "Persuasion [1 pt/r]", "Ranged Combat [1 pt/r]", "Sleight of Hand [1 pt/r]", "Stealth [1 pt/r]", "Technology [1 pt/r]", "Treatment [1 pt/r]", "Vehicles [1 pt/r]"
            );
          }

          const hasReducedTrait = effect.modifiers && effect.modifiers.some(m => m.name === 'Reduced Trait');

          optionPickersHtml = `
            <div class="power-options-row" style="display: flex; flex-direction: column; gap: 10px; background: var(--bg-panel); padding: 10px; border: 1px solid var(--border-color); border-radius: 4px; margin-top: 4px;">
              <div style="font-size: var(--font-size-secondary); font-weight: 600; color: var(--accent-primary); margin-bottom: -4px;"><span style="color: #10b981;">▲</span> Enhanced Traits</div>
              <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
                
                <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                  <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Abils/Defs:</label>
                  <select id="selEnhAbility_${pIdx}_${eIdx}" class="minor-control" style="width: 175px;">
                    ${abilityChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                  </select>
                  <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selEnhAbility_${pIdx}_${eIdx}', false)">+ Ability</button>
                </div>

                <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                  <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Advs:</label>
                  <select id="selEnhAdvantage_${pIdx}_${eIdx}" class="minor-control" style="width: 175px;">
                    ${advChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                  </select>
                  <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selEnhAdvantage_${pIdx}_${eIdx}', false)">+ Adv</button>
                </div>

                <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                  <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Skills:</label>
                  <select id="selEnhSkill_${pIdx}_${eIdx}" class="minor-control" style="width: 175px;">
                    ${skillChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                  </select>
                  <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selEnhSkill_${pIdx}_${eIdx}', false)">+ Skill</button>
                </div>

              </div>
              
              ${hasReducedTrait ? `
              <div style="border-top: 1px dashed var(--border-color); margin-top: 4px; padding-top: 10px;">
                  <div style="font-size: var(--font-size-secondary); font-weight: 600; color: var(--accent-primary); margin-bottom: 6px;"><span style="color: #ef4444;">▼</span> Reduced Traits</div>
                  <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                      <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Abils/Defs:</label>
                      <select id="selRedAbility_${pIdx}_${eIdx}" class="minor-control" style="width: 175px;">
                        ${abilityChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                      </select>
                      <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selRedAbility_${pIdx}_${eIdx}', true)">- Ability</button>
                    </div>

                    <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                      <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Advs:</label>
                      <select id="selRedAdvantage_${pIdx}_${eIdx}" class="minor-control" style="width: 175px;">
                        ${advChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                      </select>
                      <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selRedAdvantage_${pIdx}_${eIdx}', true)">- Adv</button>
                    </div>

                    <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                      <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Skills:</label>
                      <select id="selRedSkill_${pIdx}_${eIdx}" class="minor-control" style="width: 175px;">
                        ${skillChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                      </select>
                      <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selRedSkill_${pIdx}_${eIdx}', true)">- Skill</button>
                    </div>
                  </div>
              </div>
              ` : ''}
            </div>
          `;
        } else if (effect.effectName === "Affliction") {
          const cond1List = ["- None -", "Dazed", "Deafened", "Disabled", "Fatigued", "Figment", "Hindered", "Impaired", "Indifferent", "Prone", "Unaware", "Vulnerable"];
          const cond2List = ["- None -", "Blinded", "Compelled", "Confused", "Defenseless", "Disabled", "Exhausted", "Favorable", "Frightened", "Immobile", "Phantasm", "Stunned", "Susceptible", "Unaware", "Unfavorable"];
          const cond3List = ["- None -", "Asleep", "Controlled", "Debilitated", "Delusion", "Helpful", "Hostile", "Incapacitated", "Paralyzed", "Transformed", "Unaware", "Unconscious"];
          
          const d1 = (effect.options.deg1 && effect.options.deg1 !== "- Select Condition -") ? effect.options.deg1 : "- None -";
          const d2 = (effect.options.deg2 && effect.options.deg2 !== "- Select Condition -") ? effect.options.deg2 : "- None -";
          const d3 = (effect.options.deg3 && effect.options.deg3 !== "- Select Condition -") ? effect.options.deg3 : "- None -";
          const d1e = (effect.options.deg1_extra && effect.options.deg1_extra !== "- Select Condition -") ? effect.options.deg1_extra : "- None -";
          const d2e = (effect.options.deg2_extra && effect.options.deg2_extra !== "- Select Condition -") ? effect.options.deg2_extra : "- None -";
          const d3e = (effect.options.deg3_extra && effect.options.deg3_extra !== "- Select Condition -") ? effect.options.deg3_extra : "- None -";
          
          const hasExtra = effect.modifiers && effect.modifiers.some(m => m.name === "Extra Condition");

          optionPickersHtml = `
            <div class="power-options-row" style="display: flex; flex-direction: column; gap: 8px; background: var(--bg-panel); padding: 8px; border: 1px solid var(--border-color); border-radius: 4px; margin-top: 4px;">
              <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                <div style="display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 140px;">
                  <label style="font-size: var(--font-size-secondary); font-weight: 600;">1st: Minor</label>
                  <div style="display: flex; gap: 4px; align-items: center;">
                    <select class="minor-control" style="flex: 1; ${d1 !== '- None -' ? 'color: var(--accent-primary); font-weight: bold;' : ''}" onchange="updateEffectOptionSelect(${pIdx}, ${eIdx}, 'deg1', this.value)">
                      ${cond1List.map(c => `<option value="${c}" ${d1 === c ? 'selected' : ''} style="color: var(--text-main); font-weight: normal;">${c}</option>`).join('')}
                    </select>
                    ${d1 !== "- None -" ? `<button type="button" class="btn-info-circle" onclick="showConditionInfo('${d1}')" title="View Rule">?</button>` : ''}
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 140px;">
                  <label style="font-size: var(--font-size-secondary); font-weight: 600;">2nd: Moderate</label>
                  <div style="display: flex; gap: 4px; align-items: center;">
                    <select class="minor-control" style="flex: 1; ${d2 !== '- None -' ? 'color: var(--accent-primary); font-weight: bold;' : ''}" onchange="updateEffectOptionSelect(${pIdx}, ${eIdx}, 'deg2', this.value)">
                      ${cond2List.map(c => `<option value="${c}" ${d2 === c ? 'selected' : ''} style="color: var(--text-main); font-weight: normal;">${c}</option>`).join('')}
                    </select>
                    ${d2 !== "- None -" ? `<button type="button" class="btn-info-circle" onclick="showConditionInfo('${d2}')" title="View Rule">?</button>` : ''}
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 140px;">
                  <label style="font-size: var(--font-size-secondary); font-weight: 600;">3rd: Major</label>
                  <div style="display: flex; gap: 4px; align-items: center;">
                    <select class="minor-control" style="flex: 1; ${d3 !== '- None -' ? 'color: var(--accent-primary); font-weight: bold;' : ''}" onchange="updateEffectOptionSelect(${pIdx}, ${eIdx}, 'deg3', this.value)">
                      ${cond3List.map(c => `<option value="${c}" ${d3 === c ? 'selected' : ''} style="color: var(--text-main); font-weight: normal;">${c}</option>`).join('')}
                    </select>
                    ${d3 !== "- None -" ? `<button type="button" class="btn-info-circle" onclick="showConditionInfo('${d3}')" title="View Rule">?</button>` : ''}
                  </div>
                </div>
              </div>
              ${hasExtra ? `
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 4px; border-top: 1px dashed var(--border-color); padding-top: 8px;">
                <div style="display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 140px;">
                  <label style="font-size: var(--font-size-secondary); font-weight: 600;">Extra 1st: Minor</label>
                  <div style="display: flex; gap: 4px; align-items: center;">
                    <select class="minor-control" style="flex: 1; ${d1e !== '- None -' ? 'color: var(--accent-primary); font-weight: bold;' : ''}" onchange="updateEffectOptionSelect(${pIdx}, ${eIdx}, 'deg1_extra', this.value)">
                      ${cond1List.map(c => `<option value="${c}" ${d1e === c ? 'selected' : ''} style="color: var(--text-main); font-weight: normal;">${c}</option>`).join('')}
                    </select>
                    ${d1e !== "- None -" ? `<button type="button" class="btn-info-circle" onclick="showConditionInfo('${d1e}')" title="View Rule">?</button>` : ''}
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 140px;">
                  <label style="font-size: var(--font-size-secondary); font-weight: 600;">Extra 2nd: Moderate</label>
                  <div style="display: flex; gap: 4px; align-items: center;">
                    <select class="minor-control" style="flex: 1; ${d2e !== '- None -' ? 'color: var(--accent-primary); font-weight: bold;' : ''}" onchange="updateEffectOptionSelect(${pIdx}, ${eIdx}, 'deg2_extra', this.value)">
                      ${cond2List.map(c => `<option value="${c}" ${d2e === c ? 'selected' : ''} style="color: var(--text-main); font-weight: normal;">${c}</option>`).join('')}
                    </select>
                    ${d2e !== "- None -" ? `<button type="button" class="btn-info-circle" onclick="showConditionInfo('${d2e}')" title="View Rule">?</button>` : ''}
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 140px;">
                  <label style="font-size: var(--font-size-secondary); font-weight: 600;">Extra 3rd: Major</label>
                  <div style="display: flex; gap: 4px; align-items: center;">
                    <select class="minor-control" style="flex: 1; ${d3e !== '- None -' ? 'color: var(--accent-primary); font-weight: bold;' : ''}" onchange="updateEffectOptionSelect(${pIdx}, ${eIdx}, 'deg3_extra', this.value)">
                      ${cond3List.map(c => `<option value="${c}" ${d3e === c ? 'selected' : ''} style="color: var(--text-main); font-weight: normal;">${c}</option>`).join('')}
                    </select>
                    ${d3e !== "- None -" ? `<button type="button" class="btn-info-circle" onclick="showConditionInfo('${d3e}')" title="View Rule">?</button>` : ''}
                  </div>
                </div>
              </div>
              ` : ''}
            </div>
          `;
        } else if (effectData && effectData.powerOptions && effectData.powerOptions.length > 0) {
          optionPickersHtml = `
            <div class="power-options-row" style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center; background: var(--bg-panel); padding: 8px; border: 1px solid var(--border-color); border-radius: 4px; margin-top: 4px;">
              ${effectData.powerOptions.map(opt => {
                const currentVal = effect.options[opt.key] || "";
                const fullRowClass = opt.fullRow ? " flex: 1; min-width: 260px;" : "";
                
                if (opt.type === "dropdown") {
                  return `
                    <div class="power-option-item" style="display: flex; flex-direction: column; gap: 4px;${fullRowClass}">
                      <label style="font-size: var(--font-size-secondary); font-weight: 600;">${opt.label}</label>
                      <select class="minor-control" style="width: 100%; ${currentVal && currentVal !== '- None -' && !currentVal.startsWith('- Select') ? 'color: var(--accent-primary); font-weight: bold;' : ''}" onchange="updateEffectOptionSelect(${pIdx}, ${eIdx}, '${opt.key}', this.value)">
                        ${renderOptgroupChoices(opt.choices, currentVal)}
                      </select>
                    </div>
                  `;
                } else {
                  return `
                    <div class="power-option-item" style="display: flex; flex-direction: column; gap: 4px; width: 100%;${fullRowClass}">
                      <label style="font-size: var(--font-size-secondary); font-weight: 600;">${opt.label}</label>
                      <textarea rows="1" placeholder="${opt.placeholder || ''}" class="minor-control" style="width: 100%; min-height: 26px; padding: 4px 8px; font-family: inherit; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-panel); color: var(--text-main); resize: vertical; overflow-y: hidden;" oninput="this.style.height = ''; this.style.height = this.scrollHeight + 'px'; updateEffectOptionText(${pIdx}, ${eIdx}, '${opt.key}', this.value)">${currentVal}</textarea>
                    </div>
                  `;
                }
              }).join('')}
            </div>
          `;
        }

        const existingModNames = effect.modifiers ? effect.modifiers.map(m => m.name) : [];
        let allowedRootMods = getFilteredModifiersForEffect(effectData ? effectData.type : "General", effect);
        
        let specificExtras = effectData && effectData.specificExtras ? effectData.specificExtras : [];
        let specificFlaws = effectData && effectData.specificFlaws ? effectData.specificFlaws : [];
        
        const specificModNames = [...specificExtras.map(m=>m.name), ...specificFlaws.map(m=>m.name)];
        
        let availableRootExtras = allowedRootMods.filter(m => m.category === 'extra' && !specificModNames.includes(m.name) && !existingModNames.includes(m.name));
        let availableRootFlaws = allowedRootMods.filter(m => m.category === 'flaw' && !specificModNames.includes(m.name) && !existingModNames.includes(m.name));

        let smartMods = window.generateSmartModifiers(effect);
        smartMods.extras.forEach(sm => {
            if (!existingModNames.includes(sm.name) && !specificModNames.includes(sm.name) && !availableRootExtras.some(m => m.name === sm.name)) {
                availableRootExtras.push(sm);
            }
        });
        smartMods.flaws.forEach(sm => {
            if (!existingModNames.includes(sm.name) && !specificModNames.includes(sm.name) && !availableRootFlaws.some(m => m.name === sm.name)) {
                availableRootFlaws.push(sm);
            }
        });
        
        availableRootExtras.sort((a, b) => a.name.localeCompare(b.name));
        availableRootFlaws.sort((a, b) => a.name.localeCompare(b.name));
        
        let availableSpecificExtras = specificExtras.filter(m => !existingModNames.includes(m.name));
        let availableSpecificFlaws = specificFlaws.filter(m => !existingModNames.includes(m.name));

        let rootModifiersHtml = "";
        if (effect.modifiers && effect.modifiers.length > 0) {
          rootModifiersHtml = effect.modifiers.map((mod, mIdx) => {
            let modData = null;
            if (typeof POWER_MODIFIERS_LIST !== 'undefined') {
              modData = POWER_MODIFIERS_LIST.find(m => m.name === mod.name);
            }
            if (!modData && effectData && effectData.specificExtras) modData = effectData.specificExtras.find(m => m.name === mod.name);
            if (!modData && effectData && effectData.specificFlaws) modData = effectData.specificFlaws.find(m => m.name === mod.name);
            if (!modData) modData = { name: mod.name, cost: 1, costType: "flat", category: "extra", hasRanks: false };

            modData = JSON.parse(JSON.stringify(modData));
            const isExtra = (mod.category === "extra" || (modData.category === "extra" && mod.category !== "flaw"));
            const rateStr = modData.costType === 'per_rank' ? '/r' : (modData.costType === 'removable' ? '/5 PP' : ' flat');
            const needsRanks = (modData.hasRanks === true || modData.costType === 'removable');
            let maxR = modData.maxRanks || 20;
            if (mod.name === "Striding") maxR = 5;
            if (mod.name.includes("Removable")) maxR = 2;
            if (mod.name === "Increased Range") maxR = (effectData && effectData.range === "Close") ? 2 : 1;
            if (mod.name === "Reduced Range") maxR = (effectData && effectData.range === "Perception") ? 2 : 1;
            if (mod.name === "Diminished Range") maxR = 3;
            if (mod.name === "Extended Range") maxR = 10;
            if (mod.name === "Reach") maxR = 20;
            if (modData.hasRanks && modData.costType === 'per_rank' && mod.name !== "Increased Range" && mod.name !== "Reduced Range") {
                maxR = Math.min(20, Math.max(effect.rank, 20));
            }
            const currentRanks = Math.min(maxR, Math.max(1, Number(mod.ranks) || 1));
            return `
              <div class="modifier-chip">
                <span><strong>${mod.name}</strong> (${isExtra ? '+' : '-'}${modData.cost}${rateStr})</span>
                ${needsRanks ? `
                  <div class="modifier-stepper-group">
                    <button type="button" class="modifier-stepper-btn" onclick="stepModifierRank(${pIdx}, ${eIdx}, ${mIdx}, -1, 1, ${maxR})">−</button>
                    <span class="modifier-stepper-val">${currentRanks}</span>
                    <button type="button" class="modifier-stepper-btn" onclick="stepModifierRank(${pIdx}, ${eIdx}, ${mIdx}, 1, 1, ${maxR})">+</button>
                  </div>
                ` : ''}
                <button type="button" class="btn-info-circle" style="min-width: 18px; min-height: 18px; font-size: calc(var(--font-size-minor-controls) * 0.85);" onclick="showModifierInfo('${mod.name}')" title="View Modifier Rule">?</button>
                <button type="button" style="background: none; border: none; color: #ef4444; font-weight: bold; cursor: pointer; padding: 0 2px;" onclick="removeModifier(${pIdx}, ${eIdx}, ${mIdx})" title="Remove Modifier">✕</button>
              </div>
            `;
          }).join(" ");
        } else {
          rootModifiersHtml = `<span class="secondary-text minor-control">No modifiers attached.</span>`;
        }

        let rankStepperHtml = "";
        if (effect.effectName === "") {
            rankStepperHtml = `<span class="secondary-text">Select an effect first</span>`;
        } else if (isComposite) {
          rankStepperHtml = `
            <div class="stepper-group" style="background: var(--bg-app); width: 60px; min-width: 60px;">
              <input type="number" class="stepper-input" style="width: 100% !important; max-width: none !important; background: transparent !important; border: none !important; color: var(--text-muted);" value="${effect.rank}" readonly title="Auto-calculated from options">
            </div>
          `;
        } else {
          rankStepperHtml = `
            <div class="stepper-group">
              <button type="button" class="stepper-btn stepper-dec" onclick="stepEffectRank(${pIdx}, ${eIdx}, -1)">−</button>
              <input type="number" id="effectRankInput_${pIdx}_${eIdx}" class="stepper-input" min="1" max="${maxPowerRank}" value="${effect.rank}" onchange="updatePowerProp(${pIdx}, ${eIdx}, 'rank', this.value)">
              <button type="button" class="stepper-btn stepper-inc" onclick="stepEffectRank(${pIdx}, ${eIdx}, 1)">+</button>
            </div>
          `;
        }

        effect.id = effect.id || ("eff_" + pIdx + "_" + eIdx + "_" + Math.random().toString(36).substr(2, 6));
        if (effect.linkedTo === undefined) effect.linkedTo = null;
        if (effect.association === undefined) effect.association = "";

        const isLinked = effect.linkedTo === "previous" || (typeof effect.linkedTo === "string" && effect.linkedTo !== "") || effect.association === "linked";

        // Build list of potential link targets (previous effect + other effects across containers)
        let linkOptions = `<option value="">🔗 Not Linked</option>`;
        if (eIdx > 0) {
          const prevEff = powerContainer.effects[eIdx - 1];
          const prevName = prevEff.name || prevEff.effectName || ("Effect " + eIdx);
          linkOptions += `<option value="previous" ${effect.linkedTo === 'previous' ? 'selected' : ''}>🔗 Link to Previous (${prevName})</option>`;
        }

        char.activePowers.forEach((otherContainer, otherPIdx) => {
          if (Array.isArray(otherContainer.effects)) {
            otherContainer.effects.forEach((otherEff, otherEIdx) => {
              if (otherEff.id && otherEff.id !== effect.id) {
                // If it's already previous, skip duplicate option
                if (otherPIdx === pIdx && otherEIdx === eIdx - 1) return;
                const optLabel = (otherContainer.name || 'Power') + ' > ' + (otherEff.name || otherEff.effectName || `Effect ${otherEIdx + 1}`);
                linkOptions += `<option value="${otherEff.id}" ${effect.linkedTo === otherEff.id ? 'selected' : ''}>🔗 Link to: ${optLabel}</option>`;
              }
            });
          }
        });

        // Determine linked target effect (outgoing) and incoming links
        let targetEffect = null;
        let targetDesc = "";
        if (effect.linkedTo === "previous" && eIdx > 0) {
          targetEffect = powerContainer.effects[eIdx - 1];
          targetDesc = targetEffect.name || targetEffect.effectName || ("Effect " + eIdx);
        } else if (effect.linkedTo && effect.linkedTo !== "previous") {
          const found = char.findEffectById(effect.linkedTo);
          if (found) {
            targetEffect = found.effect;
            targetDesc = (found.container.name || "Power") + " > " + (found.effect.name || found.effect.effectName || "Effect");
          }
        }

        // Find all other effects linked TO this effect (incoming)
        let linkedChildren = [];
        char.activePowers.forEach((otherContainer, otherPIdx) => {
          if (Array.isArray(otherContainer.effects)) {
            otherContainer.effects.forEach((otherEff, otherEIdx) => {
              if (otherEff.id !== effect.id) {
                if (otherEff.linkedTo === effect.id) {
                  const childName = (otherContainer.name || 'Power') + ' > ' + (otherEff.name || otherEff.effectName || `Effect ${otherEIdx + 1}`);
                  linkedChildren.push({ effect: otherEff, name: childName });
                } else if (otherPIdx === pIdx && otherEIdx === eIdx + 1 && otherEff.linkedTo === "previous") {
                  const childName = otherEff.name || otherEff.effectName || `Effect ${otherEIdx + 1}`;
                  linkedChildren.push({ effect: otherEff, name: childName });
                }
              }
            });
          }
        });

        const isLinkedCard = isLinked || (linkedChildren.length > 0);

        // Build Two-Way Link Banners & Rule Checks
        let linkBannerHtml = "";
        const allConnected = [];
        if (targetEffect) {
          allConnected.push({ effect: targetEffect, desc: targetDesc, role: "parent" });
        }
        linkedChildren.forEach(child => {
          if (!allConnected.some(c => c.effect.id === child.effect.id)) {
            allConnected.push({ effect: child.effect, desc: child.name, role: "child" });
          }
        });

        if (allConnected.length > 0) {
          const currTraits = getEffectiveEffectTraits(effect);
          const banners = [];

          allConnected.forEach(conn => {
            const connTraits = getEffectiveEffectTraits(conn.effect);
            const warnings = [];

            if (currTraits.action !== connTraits.action && currTraits.action !== "None" && connTraits.action !== "None") {
              warnings.push(`Action mismatch (${currTraits.action} vs ${connTraits.action}) — Linked effects must share the same action`);
            }
            if (currTraits.range !== connTraits.range) {
              warnings.push(`Range mismatch (${currTraits.range} vs ${connTraits.range}) — Apply 'Increased Range' extra to match`);
            }

            banners.push(`
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <span class="link-badge">🔗 Linked with: <strong>${conn.desc}</strong></span>
                ${warnings.map(w => `<span class="link-warning-tag">⚠️ ${w}</span>`).join('')}
              </div>
            `);
          });

          linkBannerHtml = `
            <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px;">
              ${banners.join('')}
            </div>
          `;
        }

        return `
          <div class="effect-card ${isLinkedCard ? 'is-linked' : ''}" style="margin-top: 12px; padding-top: 12px; border-top: 2px dashed var(--text-muted);">
            
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; margin-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    
                    <select onchange="updateEffectAssociation(${pIdx}, ${eIdx}, this.value)" class="minor-control" style="width: 135px; background: var(--bg-app);" title="Slot Role in Array">
                        <option value="" ${!effect.association || effect.association === '' ? 'selected' : ''}>- Select Array Role -</option>
                        <option value="primary" ${effect.association === 'primary' ? 'selected' : ''}>Primary Slot</option>
                        <option value="alternate" ${effect.association === 'alternate' ? 'selected' : ''} ${powerContainer.effects.length === 1 ? 'disabled style="color: var(--text-muted);"' : ''}>Alternate (1 PP)</option>
                        <option value="dynamic" ${effect.association === 'dynamic' ? 'selected' : ''} ${powerContainer.effects.length === 1 ? 'disabled style="color: var(--text-muted);"' : ''}>Dynamic (2 PP)</option>
                    </select>

                    <select onchange="updateEffectLink(${pIdx}, ${eIdx}, this.value)" class="minor-control" style="max-width: 175px; background: var(--bg-app);" title="Link this effect to another effect">
                        ${linkOptions}
                    </select>
                    
                    <select onchange="updateEffectDirect(${pIdx}, ${eIdx}, this.value)" class="minor-control" style="min-width: 160px; color: var(--accent-primary); font-weight: bold;">
                      <option value="" ${effect.effectName === "" ? "selected" : ""} style="color: var(--text-main); font-weight: normal;">- Select Effect -</option>
                      ${POWER_EFFECTS_LIST.map(eff => {
  const hasConfigs = (eff.configurations && eff.configurations.length > 0) || (typeof EXTRACTED_CONFIGS !== 'undefined' && EXTRACTED_CONFIGS[eff.name] && EXTRACTED_CONFIGS[eff.name].length > 0);
  const mark = hasConfigs ? ' ⚙' : '';
  return `<option value="${eff.name}" ${eff.name === effect.effectName ? 'selected' : ''} style="color: var(--text-main); font-weight: normal;">${eff.name}${mark} (${eff.baseCost} PP/r)</option>`;
}).join('')}
                    </select>
                    <div style="display: flex; align-items: center; gap: 2px;">
                        <button type="button" class="btn minor-control-btn" style="padding: 2px 6px; font-weight: bold;" onclick="navigateEffectHistory(${pIdx}, ${eIdx}, -1)" title="Back">&lt;</button>
                        <button type="button" class="btn minor-control-btn" style="padding: 2px 6px; font-weight: bold;" onclick="navigateEffectHistory(${pIdx}, ${eIdx}, 1)" title="Forward">&gt;</button>
                    </div>
                    ${effectData && effect.effectName !== "" ? `<button type="button" class="btn-info-circle" onclick="showPowerEffectInfo('${effect.effectName}')" title="View Effect Rules">?</button>` : ''}
                </div>
                
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <label>Rank:</label>
                    ${rankStepperHtml}
                    <span class="badge effect-cost-badge" style="margin-left: 8px; font-size: 10pt;" title="Base Cost: ${rawEffectCost} PP">${effectCostDisplay}</span>
                    <button type="button" class="btn" style="padding: 2px 6px; font-size: 10pt; margin-left: 8px;" onclick="resetEffect(${pIdx}, ${eIdx})" title="Reset Effect Config">Reset</button>
                    <button type="button" class="btn-delete-power" style="padding: 2px 6px; font-size: 10pt; margin-left: 4px;" onclick="deleteEffect(${pIdx}, ${eIdx})" title="Delete Effect">Delete</button>
                </div>
            </div>

            ${linkBannerHtml}

            <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 6px;">
                <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap; flex: 1;">
                  ${templateDropdownHtml}
                  <div style="display: flex; align-items: center; gap: 6px; flex: 1; min-width: 200px;">
                    <label style="font-size: var(--font-size-secondary); color: var(--text-muted); font-weight: 600; white-space: nowrap;">Descriptors:</label>
                    <input type="text" value="${effect.descriptors || ''}" placeholder="e.g. Fire, Magic, Technology, Piercing" style="flex: 1; min-width: 140px; font-size: var(--font-size-secondary); padding: 4px 8px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-panel); color: var(--text-main);" oninput="updateEffectDescriptorsDirect(${pIdx}, ${eIdx}, this.value)">
                  </div>
                </div>
            </div>

            ${optionPickersHtml}

            ${subPowersHtml ? `<div style="margin-top: 8px;"><strong style="font-size: var(--font-size-secondary); color: var(--text-main);">Configured Options:</strong><div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px;">${subPowersHtml}</div></div>` : ''}

            ${effect.effectName !== "" ? `
            <div class="power-modifiers-row" style="margin-top: 8px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <select id="selRootExtra_${pIdx}_${eIdx}" class="minor-control" style="max-width: 170px;">
                  <option value="">+ Add Extra...</option>
                  ${availableSpecificExtras.length > 0 ? `<optgroup label="Effect-Specific Extras">${availableSpecificExtras.map(e => `<option value="${e.name}">${e.name} (+${e.cost !== undefined ? e.cost : 1}${e.costType === 'flat' ? ' flat' : '/r'})</option>`).join('')}</optgroup>` : ''}
                  <optgroup label="Universal Extras">
                    ${availableRootExtras.map(e => `<option value="${e.name}">${e.name} (+${e.cost}/r)</option>`).join('')}
                  </optgroup>
                </select>
                <button type="button" class="btn-info-circle" style="min-width: 18px; min-height: 18px; font-size: calc(var(--font-size-minor-controls) * 0.85); margin-left: -2px; margin-right: 2px;" onclick="const val = document.getElementById('selRootExtra_${pIdx}_${eIdx}').value; if(val) showModifierInfo(val);" title="View Info for Selected Extra">?</button>
                <button type="button" class="btn minor-control-btn" onclick="addModifierToEffect(${pIdx}, ${eIdx}, 'selRootExtra_${pIdx}_${eIdx}')">+ Extra</button>
              </div>

              <div style="display: flex; align-items: center; gap: 6px;">
                <select id="selRootFlaw_${pIdx}_${eIdx}" class="minor-control" style="max-width: 170px;">
                  <option value="">+ Add Flaw...</option>
                  ${availableSpecificFlaws.length > 0 ? `<optgroup label="Effect-Specific Flaws">${availableSpecificFlaws.map(f => `<option value="${f.name}">${f.name} (-${f.cost !== undefined ? f.cost : 1}${f.costType === 'flat' ? ' flat' : '/r'})</option>`).join('')}</optgroup>` : ''}
                  <optgroup label="Universal Flaws">
                    ${availableRootFlaws.map(f => `<option value="${f.name}">${f.name} (-${f.cost}/r)</option>`).join('')}
                  </optgroup>
                </select>
                <button type="button" class="btn-info-circle" style="min-width: 18px; min-height: 18px; font-size: calc(var(--font-size-minor-controls) * 0.85); margin-left: -2px; margin-right: 2px;" onclick="const val = document.getElementById('selRootFlaw_${pIdx}_${eIdx}').value; if(val) showModifierInfo(val);" title="View Info for Selected Flaw">?</button>
                <button type="button" class="btn btn-secondary minor-control-btn" onclick="addModifierToEffect(${pIdx}, ${eIdx}, 'selRootFlaw_${pIdx}_${eIdx}')">+ Flaw</button>
              </div>

              <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; flex: 1; margin-top: 4px;">
                ${rootModifiersHtml}
              </div>
            </div>
            ` : ''}

            <div class="power-short-desc">
              <div><strong>Effect Summary:</strong> ${shortDescText}</div>
              ${measurementHtml}
            </div>

            <div class="power-meta-row">
              <span><strong>Type:</strong> ${effectData ? effectData.type : '—'}</span>
              <span><strong>Action:</strong> ${effectiveTraits.action}</span>
              <span><strong>Range:</strong> ${rangeDisplay}</span>
              <span><strong>Duration:</strong> ${effectiveTraits.duration}</span>
              <span><strong>Check:</strong> ${effectiveTraits.check}</span>
            </div>

            <div class="power-notes-row" style="margin-top: 8px;">
              <label style="min-width: 80px;">Notes:</label>
              <textarea rows="1" placeholder="Details, limits, or custom sense descriptions..." oninput="this.style.height = ''; this.style.height = this.scrollHeight + 'px'; updateEffectNotesDirect(${pIdx}, ${eIdx}, this.value)">${effect.notes || ''}</textarea>
            </div>
          </div>
        `;
    }).join("");

    return `
      <div class="power-card ${isCollapsed}" id="powerCard_${pIdx}" style="border: 2px solid var(--border-color);">
        <div class="power-card-header" onclick="togglePowerCollapse(${pIdx})">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span id="powerCollapseIcon_${pIdx}" style="font-size: var(--font-size-secondary);">${powerContainer.collapsed ? '▶' : '▼'}</span>
            <input type="text" id="powerContainerName_${pIdx}" value="${powerContainer.name}" placeholder="Power Container Name" style="font-weight: bold; font-size: var(--font-size-labels); width: 200px; background: var(--bg-panel); border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 6px; color: var(--text-main);" onclick="event.stopPropagation();" oninput="updatePowerContainerName(${pIdx}, this.value)">
            <span class="secondary-text" style="font-weight: normal; font-size: 10pt;">(${summaryText})</span>
          </div>

          <div style="display: flex; align-items: center; gap: 12px;" onclick="event.stopPropagation();">
            ${window.activePowerContext === 'blueprints' ? `
              <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 4px; padding: 2px 8px; font-size: 10pt; color: var(--accent-success); display: flex; flex-direction: column; align-items: center; line-height: 1.1; margin-right: 8px;">
                <strong>Check DC: ${10 + containerCost}</strong>
                <span>Normal: ${containerCost * 4} hrs | Fast: ${containerCost * 10} min</span>
              </div>
            ` : ''}
            <span class="badge" id="powerCostBadge_${pIdx}" style="font-size: var(--font-size-labels); font-weight: normal;">${containerCost} PP</span>
            <button type="button" id="btnPowerCollapse_${pIdx}" class="btn" style="padding: 4px 8px;" onclick="togglePowerCollapse(${pIdx})" title="${powerContainer.collapsed ? 'Edit Power Container' : 'Save and Collapse'}">${powerContainer.collapsed ? 'Edit' : 'Save'}</button>
            <button type="button" class="btn-delete-power" onclick="deletePowerContainer(${pIdx})" title="Delete Entire Container">Delete Container</button>
          </div>
        </div>

        <div class="power-card-body">
            ${effectsHtml}
            <div style="margin-top: 16px; padding-top: 8px; border-top: 2px solid var(--border-color); display: flex; justify-content: flex-end;">
                <button type="button" class="btn" onclick="addEffectToPower(${pIdx})">+ Add New Effect</button>
            </div>
        </div>
      </div>
    `;
  }).join("");
}

window.addOptionSubPower = function(pIdx, eIdx, selectId, isReduced = false) {
  const sel = document.getElementById(selectId);
  if (!sel || !sel.value || sel.value.startsWith("- Select")) return;
  const optChoice = sel.value;
  const effect = char.activePowers[pIdx].effects[eIdx];

  if (!effect.subPowers) effect.subPowers = [];
  
  let bCost = 1;
  let cType = "per_rank";
  let r = 1;

  if (effect.effectName === "Flight" || effect.effectName === "Teleport" || effect.effectName === "Move Object" || effect.effectName === "Create") bCost = 2;
  else if (effect.effectName === "Insubstantial") bCost = 10;
  else if (effect.effectName === "Comprehend") bCost = 2;

  if (optChoice.includes("[") && optChoice.includes("pts")) {
     const match = optChoice.match(/\[(\+?\d+)\+?\s*pts?(?:\/r)?\]/i) || optChoice.match(/\[(\+?\d+)\s*pt/i);
     if (match) {
         bCost = parseInt(match[1].replace('+', ''));
         if (optChoice.includes("/r") || optChoice.toLowerCase().includes("per rank") || optChoice.toLowerCase().includes("ranks")) {
             cType = "per_rank";
         } else {
             cType = "flat";
         }
     }
     if (optChoice.includes("Microscopic") || optChoice.includes("Extended Sense")) {
         bCost = 1; cType = "per_rank";
     }
  }

  let cleanName = optChoice.split(" [")[0];
  let coreName = cleanName.split(" (")[0]; 
  
  if (effect.effectName === "Immunity" || effect.effectName === "Enhanced Trait") {
      coreName = cleanName;
  } else {
      if (cleanName.includes("Dimensional Travel")) coreName = "Dimensional Travel";
      else if (cleanName.includes("Space Travel")) coreName = "Space Travel";
      else if (cleanName.includes("Permeate")) coreName = "Permeate";
      else if (cleanName.includes("Wall-Crawling")) coreName = "Wall-Crawling";
      else if (cleanName.includes("Water-Walking")) coreName = "Water-Walking";
  }

  if (effect.subPowers.some(sub => sub.type === coreName || sub.name === cleanName || (sub.name && sub.name.split(" [")[0] === cleanName))) {
      let warningsDisabled = localStorage.getItem("mm4e_disable_warnings") === "true";
      if (!warningsDisabled) {
          alert(coreName + " has already been added to this power. Increase its rank instead.");
      }
      return;
  }

  if (effect.effectName === "Immunity") {
      const rankMatch = optChoice.match(/\[(\d+)\s*ranks?\]/i);
      if (rankMatch) {
          r = parseInt(rankMatch[1]);
      }
      if (optChoice.includes("Custom Immunity")) {
          r = 1;
      }
  } else {
      if (cleanName.includes("Dimensional Travel (1 other)") || cleanName.includes("Space Travel (Solar system)") || cleanName.includes("Wall-Crawling (Speed -1)") || cleanName.includes("Permeate (Speed 0)") || cleanName === "Swinging") r = 2;
      if (cleanName.includes("Dimensional Travel (Related group)") || cleanName.includes("Space Travel (Interstellar)") || cleanName.includes("Permeate (Speed 1)") || cleanName.includes("Wall-Crawling (Full Speed)")) r = 4;
      if (cleanName.includes("Dimensional Travel (Any)") || cleanName.includes("Space Travel (Intergalactic)") || cleanName.includes("Permeate (Normal Speed)") || cleanName === "Microscopic Vision") r = 6;
      if (cleanName === "Microscopic Vision") r = 4; 
      if (cleanName.includes("Water-Walking (Prone)")) r = 2;
  }

  effect.subPowers.push({
    name: optChoice,
    type: coreName,
    rank: r,
    baseCost: bCost,
    costType: cType,
    details: "",
    modifiers: [],
    isReduced: isReduced
  });

  sel.selectedIndex = 0;
  buildPowersUI();
  refreshUI();
};

window.addSubPowerMeta = function(pIdx, eIdx, subIdx, selectId) {
  const sel = document.getElementById(selectId);
  if (!sel || !sel.value || sel.value.startsWith("- Select") || sel.value.startsWith("- None")) return;
  const metaName = sel.value;
  const effect = char.activePowers[pIdx].effects[eIdx];

  if (effect && effect.subPowers && effect.subPowers[subIdx]) {
    let sub = effect.subPowers[subIdx];
    if (!sub.modifiers) sub.modifiers = [];
    
    let mCost = 1;
    let mType = "flat";
    let mCategory = "extra";
    const mMatch = metaName.match(/\[([+-]?\d+)\s*pts?(?:\/r)?\]/i);
    if (mMatch) {
        mCost = parseInt(mMatch[1]);
        if (mCost < 0) {
            mCategory = "flaw";
            mCost = Math.abs(mCost);
        }
    }
    if (metaName.includes("/r") || metaName.includes("per rank")) mType = "per_rank";

    if (metaName.includes("Counters Concealment (All)")) {
        sub.modifiers = sub.modifiers.filter(m => !m.name.includes("Counters Concealment (One Descriptor)"));
    }

    const isSenseMeta = effect.effectName === "Enhanced Senses";

    sub.modifiers.push({
      name: metaName,
      ranks: 1,
      cost: mCost, 
      costType: mType,
      category: mCategory,
      isMeta: isSenseMeta
    });
    
    let addedMetaCore = metaName.split(" (")[0];
    let subType = sub.type || sub.name;
    
    if (subType.includes("Sense Type") && metaName.includes("(Sense Type)")) {
        let mySenseCategory = subType.split(" - ")[0].replace(" Senses", "");
        effect.subPowers.forEach(otherSub => {
            let oType = otherSub.type || otherSub.name;
            if (!oType.includes("Sense Type") && SENSE_TYPE_MAP[oType] === mySenseCategory) {
                if (otherSub.modifiers) {
                    otherSub.modifiers = otherSub.modifiers.filter(m => !m.name.startsWith(addedMetaCore));
                }
            }
        });
    }

    sel.selectedIndex = 0;
    buildPowersUI();
    refreshUI();
  }
};

window.removeSubPower = function(pIdx, eIdx, subIdx) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx] && char.activePowers[pIdx].effects[eIdx].subPowers) {
    char.activePowers[pIdx].effects[eIdx].subPowers.splice(subIdx, 1);
    
    let maxR = window.getMaxPowerRank(char.activePowers[pIdx].effects[eIdx]);
    if (char.activePowers[pIdx].effects[eIdx].rank > maxR) {
        char.activePowers[pIdx].effects[eIdx].rank = maxR;
    }

    buildPowersUI();
    refreshUI();
  }
};

window.stepSubPowerRank = function(pIdx, eIdx, subIdx, delta, minVal, maxVal) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx] && char.activePowers[pIdx].effects[eIdx].subPowers && char.activePowers[pIdx].effects[eIdx].subPowers[subIdx]) {
    let sub = char.activePowers[pIdx].effects[eIdx].subPowers[subIdx];
    let val = (parseInt(sub.rank) || 1) + delta;
    if (minVal !== undefined && val < minVal) val = minVal;
    if (maxVal !== undefined && val > maxVal) val = maxVal;
    sub.rank = val;
    buildPowersUI();
    refreshUI();
  }
};

window.addSubPowerModifier = function(pIdx, eIdx, subIdx, selectId, category) {
  const sel = document.getElementById(selectId);
  if (!sel || !sel.value) return;
  const modName = sel.value;

  let modData = POWER_MODIFIERS_LIST.find(m => m.name === modName) || { name: modName, cost: 1, costType: "flat", category: category };
  const sub = char.activePowers[pIdx].effects[eIdx].subPowers[subIdx];
  if (!sub.modifiers) sub.modifiers = [];
  sub.modifiers.push({
    name: modName,
    ranks: 1,
    cost: modData.cost,
    costType: modData.costType,
    category: category,
    isMeta: false
  });

  sel.selectedIndex = 0;
  buildPowersUI();
  refreshUI();
};

window.stepSubPowerModifierRank = function(pIdx, eIdx, subIdx, modIdx, delta, minVal, maxVal) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx] && char.activePowers[pIdx].effects[eIdx].subPowers && char.activePowers[pIdx].effects[eIdx].subPowers[subIdx]) {
    let sMod = char.activePowers[pIdx].effects[eIdx].subPowers[subIdx].modifiers[modIdx];
    if (sMod) {
       let val = (parseInt(sMod.ranks) || 1) + delta;
       if (minVal !== undefined && val < minVal) val = minVal;
       if (maxVal !== undefined && val > maxVal) val = maxVal;
       sMod.ranks = val;
       buildPowersUI();
       refreshUI();
    }
  }
};

window.removeSubPowerModifier = function(pIdx, eIdx, subIdx, modIdx) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx] && char.activePowers[pIdx].effects[eIdx].subPowers && char.activePowers[pIdx].effects[eIdx].subPowers[subIdx]) {
    char.activePowers[pIdx].effects[eIdx].subPowers[subIdx].modifiers.splice(modIdx, 1);
    buildPowersUI();
    refreshUI();
  }
};

window.addAfflictionCondition = function(pIdx, eIdx, degKey, selectId) {
    const sel = document.getElementById(selectId);
    if(!sel || !sel.value || sel.value.startsWith("-")) return;
    if(!char.activePowers[pIdx].effects[eIdx].options) char.activePowers[pIdx].effects[eIdx].options = {};
    char.activePowers[pIdx].effects[eIdx].options[degKey] = sel.value;
    sel.selectedIndex = 0;
    buildPowersUI();
    refreshUI();
};

window.removeAfflictionCondition = function(pIdx, eIdx, degKey) {
    if(char.activePowers[pIdx].effects[eIdx].options) {
        char.activePowers[pIdx].effects[eIdx].options[degKey] = "";
        buildPowersUI();
        refreshUI();
    }
};

window.resetEffect = function(pIdx, eIdx) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
      let effect = char.activePowers[pIdx].effects[eIdx];
      
      if (!effect.effectHistory) { effect.effectHistory = [effect.effectName || ""]; effect.effectHistoryIdx = 0; }
      if (effect.effectHistory[effect.effectHistoryIdx] !== "") {
          effect.effectHistory = effect.effectHistory.slice(0, effect.effectHistoryIdx + 1);
          effect.effectHistory.push("");
          if (effect.effectHistory.length > 20) effect.effectHistory.shift();
          else effect.effectHistoryIdx++;
      }
      
      if (!effect.configHistory) { effect.configHistory = [effect.name || "New Effect"]; effect.configHistoryIdx = 0; }
      if (effect.configHistory[effect.configHistoryIdx] !== "New Effect") {
          effect.configHistory = effect.configHistory.slice(0, effect.configHistoryIdx + 1);
          effect.configHistory.push("New Effect");
          if (effect.configHistory.length > 20) effect.configHistory.shift();
          else effect.configHistoryIdx++;
      }

      effect.effectName = "";
      effect.options = {};
      effect.subPowers = [];
      effect.modifiers = [];
      effect.rank = 1;
      effect.descriptors = "";
      effect.name = "New Effect";
      effect.notes = "";
      effect.effectCache = {};
      buildPowersUI();
      refreshUI();
  }
};

window.addEffectToPower = function(pIdx) {
    if (char.activePowers[pIdx]) {
        let assoc = "primary";
        if (char.activePowers[pIdx].effects.length > 0) {
            assoc = "alternate";
        }
        char.activePowers[pIdx].effects.push({
            id: "eff_" + Math.random().toString(36).substr(2, 9),
            name: "New Effect",
            effectName: "",
            association: assoc,
            linkedTo: null,
            rank: 1,
            descriptors: "",
            notes: "",
            modifiers: [],
            options: {},
            subPowers: [],
            effectCache: {},
            effectHistory: [""],
            effectHistoryIdx: 0,
            configHistory: ["New Effect"],
            configHistoryIdx: 0
        });
        buildPowersUI();
        refreshUI();
    }
};

function setupPowerHandlers() {
  const btnAdd = document.getElementById("btnAddPower");
  const btnAddBlueprint = document.getElementById("btnAddBlueprint");
  
  if (btnAddBlueprint) {
      btnAddBlueprint.addEventListener("click", () => {
          char.blueprints.push({
            name: "New Improvised Effect",
            collapsed: false,
            effects: [
                {
                  id: "imp_" + Math.random().toString(36).substr(2, 9),
                  name: "New Effect",
                  effectName: "",
                  association: "primary",
                  linkedTo: null,
                  rank: 1,
                  descriptors: "",
                  notes: "",
                  modifiers: [],
                  options: {},
                  subPowers: [],
                  effectCache: {},
                  effectHistory: [""],
                  effectHistoryIdx: 0,
                  configHistory: ["New Effect"],
                  configHistoryIdx: 0
                }
            ]
          });
          buildPowersUI();
          refreshUI();
      });
  }
  if (!btnAdd) return;
  btnAdd.textContent = "+ Add New Power Container"; 
  btnAdd.addEventListener("click", () => {
    char.activePowers.push({
      name: "New Power Container",
      collapsed: false,
      effects: [
          {
            id: "eff_" + Math.random().toString(36).substr(2, 9),
            name: "New Effect",
            effectName: "",
            association: "primary",
            linkedTo: null,
            rank: 1,
            descriptors: "",
            notes: "",
            modifiers: [],
            options: {},
            subPowers: [],
            effectCache: {},
            effectHistory: [""],
            effectHistoryIdx: 0,
            configHistory: ["New Effect"],
            configHistoryIdx: 0
          }
      ]
    });
    buildPowersUI();
    refreshUI();
  });
}

window.togglePowerCollapse = function(index) {
  if (char.activePowers[index]) {
    char.activePowers[index].collapsed = !char.activePowers[index].collapsed;
    const card = document.getElementById(`powerCard_${index}`);
    const icon = document.getElementById(`powerCollapseIcon_${index}`);
    const btn = document.getElementById(`btnPowerCollapse_${index}`);
    if (card && icon) {
      if (char.activePowers[index].collapsed) {
        card.classList.add('collapsed');
        icon.textContent = '▶';
        if (btn) { btn.textContent = 'Edit'; btn.title = 'Edit Power Container'; }
      } else {
        card.classList.remove('collapsed');
        icon.textContent = '▼';
        if (btn) { btn.textContent = 'Save'; btn.title = 'Save and Collapse Container'; }
      }
    }
  }
};

window.updateEffectDescriptorsDirect = function(pIdx, eIdx, value) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
    char.activePowers[pIdx].effects[eIdx].descriptors = value;
  }
};

window.updateEffectNotesDirect = function(pIdx, eIdx, value) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
    char.activePowers[pIdx].effects[eIdx].notes = value;
  }
};

window.updateEffectOptionSelect = function(pIdx, eIdx, optionKey, value) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
    if (!char.activePowers[pIdx].effects[eIdx].options) char.activePowers[pIdx].effects[eIdx].options = {};
    char.activePowers[pIdx].effects[eIdx].options[optionKey] = value;
    buildPowersUI();
    refreshUI();
  }
};

window.updateEffectOptionText = function(pIdx, eIdx, optionKey, value) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
    if (!char.activePowers[pIdx].effects[eIdx].options) char.activePowers[pIdx].effects[eIdx].options = {};
    char.activePowers[pIdx].effects[eIdx].options[optionKey] = value;
  }
};

window.updateEffectDirect = function(pIdx, eIdx, value, skipHistory = false) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
    let effect = char.activePowers[pIdx].effects[eIdx];
    
    if (!skipHistory) {
        if (!effect.effectHistory) { effect.effectHistory = [effect.effectName || ""]; effect.effectHistoryIdx = 0; }
        if (effect.effectHistory[effect.effectHistoryIdx] !== (value || "")) {
            effect.effectHistory = effect.effectHistory.slice(0, effect.effectHistoryIdx + 1);
            effect.effectHistory.push(value || "");
            if (effect.effectHistory.length > 20) effect.effectHistory.shift();
            else effect.effectHistoryIdx++;
        }
    }
    
    if (!effect.effectCache) effect.effectCache = {};

    if (effect.effectName) {
        effect.effectCache[effect.effectName] = {
            options: JSON.parse(JSON.stringify(effect.options)),
            subPowers: JSON.parse(JSON.stringify(effect.subPowers)),
            modifiers: JSON.parse(JSON.stringify(effect.modifiers)),
            rank: effect.rank,
            name: effect.name 
        };
    }

    effect.effectName = value;

    if (value && effect.effectCache[value]) {
        let cache = effect.effectCache[value];
        effect.options = JSON.parse(JSON.stringify(cache.options));
        effect.subPowers = JSON.parse(JSON.stringify(cache.subPowers));
        effect.modifiers = JSON.parse(JSON.stringify(cache.modifiers));
        effect.rank = cache.rank;
        effect.name = cache.name || value;
    } else {
        effect.options = {}; 
        effect.subPowers = [];
        effect.modifiers = [];
        effect.rank = 1;
        effect.name = value || "New Effect"; 
    }
    
    let maxR = window.getMaxPowerRank(effect);
    if (effect.rank > maxR) {
        effect.rank = maxR;
    }

    buildPowersUI();
    refreshUI();
  }
};

window.updatePowerProp = function(pIdx, eIdx, prop, value) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
    if (prop === 'rank') {
      let val = parseInt(value) || 1;
      let effect = char.activePowers[pIdx].effects[eIdx];
      let maxRank = window.getMaxPowerRank(effect);
      if (val > maxRank) val = maxRank;
      if (val < 1) val = 1;
      char.activePowers[pIdx].effects[eIdx][prop] = val;
    } else {
      char.activePowers[pIdx].effects[eIdx][prop] = value;
    }
    buildPowersUI();
    refreshUI();
  }
};

window.stepEffectRank = function(pIdx, eIdx, delta) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx]) {
    let effect = char.activePowers[pIdx].effects[eIdx];
    let maxRank = window.getMaxPowerRank(effect);
    
    let val = (parseInt(effect.rank) || 1) + delta;
    if (val < 1) val = 1;
    if (val > maxRank) val = maxRank;
    
    effect.rank = val;
    const rankInput = document.getElementById(`effectRankInput_${pIdx}_${eIdx}`);
    if (rankInput) rankInput.value = val;
    buildPowersUI(); 
    refreshUI();
  }
};

window.deletePowerContainer = function(index) {
  if (char.activePowers[index]) {
    let warningsDisabled = localStorage.getItem("mm4e_disable_delete_warning") === "true";
    if (!warningsDisabled) {
        if (!confirm("Are you sure you want to delete this entire power container and all its effects?")) {
            return;
        }
    }
    char.activePowers.splice(index, 1);
    buildPowersUI();
    refreshUI();
  }
};

window.deleteEffect = function(pIdx, eIdx) {
    if (char.activePowers[pIdx] && char.activePowers[pIdx].effects) {
        char.activePowers[pIdx].effects.splice(eIdx, 1);
        if (char.activePowers[pIdx].effects.length === 0) {
            char.activePowers.splice(pIdx, 1);
        } else if (char.activePowers[pIdx].effects.length === 1) {
            char.activePowers[pIdx].effects[0].association = "primary";
        }
        buildPowersUI();
        refreshUI();
    }
};

window.addModifierToEffect = function(pIdx, eIdx, selectElemId) {
  const sel = document.getElementById(selectElemId);
  if (!sel || !sel.value) return;
  const modName = sel.value;
  const effect = char.activePowers[pIdx].effects[eIdx];
  const isFlawSelect = selectElemId.includes("Flaw");

  let effName = effect.effectName;
  let effData = POWER_EFFECTS_LIST.find(e => e.name === effName);
  let modData = null;

  if (isFlawSelect) {
      if (effData && effData.specificFlaws) modData = effData.specificFlaws.find(m => m.name === modName);
      if (!modData && typeof POWER_MODIFIERS_LIST !== 'undefined') modData = POWER_MODIFIERS_LIST.find(m => m.name === modName && m.category === "flaw");
  } else {
      if (effData && effData.specificExtras) modData = effData.specificExtras.find(m => m.name === modName);
      if (!modData && typeof POWER_MODIFIERS_LIST !== 'undefined') modData = POWER_MODIFIERS_LIST.find(m => m.name === modName && m.category === "extra");
  }

  if (!modData && typeof POWER_MODIFIERS_LIST !== 'undefined') {
      modData = POWER_MODIFIERS_LIST.find(m => m.name === modName);
  }
  if (!modData && effData) {
      if (effData.specificExtras) modData = effData.specificExtras.find(m => m.name === modName);
      if (!modData && effData.specificFlaws) modData = effData.specificFlaws.find(m => m.name === modName);
  }
  if (!modData) {
      let smartMods = window.generateSmartModifiers(effect);
      modData = smartMods.extras.find(m => m.name === modName) || smartMods.flaws.find(m => m.name === modName);
  }
  if (!modData) modData = { name: modName, cost: 1, costType: "flat", category: isFlawSelect ? "flaw" : "extra" };

  if (!effect.modifiers) effect.modifiers = [];
  effect.modifiers.push({
    name: modName,
    ranks: 1,
    cost: modData.cost !== undefined ? modData.cost : 1,
    costType: modData.costType || "per_rank",
    category: isFlawSelect ? "flaw" : (modData.category || "extra")
  });
  sel.value = "";
  buildPowersUI();
  refreshUI();
};

window.stepModifierRank = function(pIdx, eIdx, modIdx, delta, minVal, maxVal) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx] && char.activePowers[pIdx].effects[eIdx].modifiers && char.activePowers[pIdx].effects[eIdx].modifiers[modIdx]) {
    let val = (parseInt(char.activePowers[pIdx].effects[eIdx].modifiers[modIdx].ranks) || 1) + delta;
    if (minVal !== undefined && val < minVal) val = minVal;
    if (maxVal !== undefined && val > maxVal) val = maxVal;
    char.activePowers[pIdx].effects[eIdx].modifiers[modIdx].ranks = val;
    buildPowersUI();
    refreshUI();
  }
};

window.removeModifier = function(pIdx, eIdx, modIdx) {
  if (char.activePowers[pIdx] && char.activePowers[pIdx].effects[eIdx] && char.activePowers[pIdx].effects[eIdx].modifiers) {
    char.activePowers[pIdx].effects[eIdx].modifiers.splice(modIdx, 1);
    buildPowersUI();
    refreshUI();
  }
};

function buildAllReferenceTables() {
  const aBody = document.querySelector("#actionsViewTable tbody");
  if (aBody && typeof ACTIONS_TABLE !== 'undefined') {
    let aHtml = "";
    for (const act of ACTIONS_TABLE) {
      aHtml += `
        <tr>
          <td><strong>${act.name}</strong></td>
          <td>${act.type}</td>
          <td>${act.check}</td>
          <td class="secondary-text">${act.effect}</td>
        </tr>
      `;
    }
    aBody.innerHTML = aHtml;
  }

  const mBody = document.querySelector("#measurementsViewTable tbody");
  if (mBody && typeof MEASUREMENT_TABLE !== 'undefined') {
    let mHtml = "";
    const ranks = Object.keys(MEASUREMENT_TABLE).map(Number).sort((a, b) => a - b);
    for (const rank of ranks) {
      const data = MEASUREMENT_TABLE[rank.toString()];
      mHtml += `
        <tr>
          <td><strong>${rank}</strong></td>
          <td>${data.mass_imp}</td>
          <td>${data.mass_met}</td>
          <td>${data.time}</td>
          <td>${data.dist_imp}</td>
          <td>${data.dist_met}</td>
          <td>${data.vol_imp}</td>
          <td>${data.vol_met}</td>
          <td class="secondary-text">${data.benchmark || "—"}</td>
        </tr>
      `;
    }
    mBody.innerHTML = mHtml;
  }

  const sBody = document.querySelector("#sizeViewTable tbody");
  if (sBody && typeof SIZE_TABLE !== 'undefined') {
    let sHtml = "";
    for (const [name, size] of Object.entries(SIZE_TABLE)) {
      sHtml += `
        <tr>
          <td><strong>${name}</strong></td>
          <td>${size.rank}</td>
          <td>${size.spaces}</td>
          <td>${size.reach}</td>
          <td>${size.defense >= 0 ? "+" : ""}${size.defense}</td>
          <td>${size.damage >= 0 ? "+" : ""}${size.damage}</td>
          <td>${size.toughness >= 0 ? "+" : ""}${size.toughness}</td>
          <td>${size.speed >= 0 ? "+" : ""}${size.speed}</td>
          <td>${size.intimidation >= 0 ? "+" : ""}${size.intimidation}</td>
          <td>${size.stealth >= 0 ? "+" : ""}${size.stealth}</td>
        </tr>
      `;
    }
    sBody.innerHTML = sHtml;
  }

  const plBody = document.querySelector("#plLimitsViewTable tbody");
  if (plBody && typeof PL_LIMITS !== 'undefined') {
    let plHtml = "";
    for (const [pl, limits] of Object.entries(PL_LIMITS)) {
      plHtml += `
        <tr>
          <td><strong>PL ${pl}</strong></td>
          <td>${limits.maxSkill}</td>
          <td>${limits.maxAttackEffect}</td>
          <td>${limits.maxDefTough}</td>
          <td>${limits.maxFortWill}</td>
          <td>${limits.maxHeroicAdv}</td>
        </tr>
      `;
    }
    plBody.innerHTML = plHtml;
  }
}
// --- MODIFIER INJECTOR ---
if (typeof POWER_EFFECTS_LIST !== 'undefined') {
    if (typeof EXTRACTED_MODIFIERS !== 'undefined') {
        if (EXTRACTED_MODIFIERS["Create"] && !EXTRACTED_MODIFIERS["Create"].extras.some(e => e.name === "Self-Repairing")) {
            EXTRACTED_MODIFIERS["Create"].extras.push({name: "Self-Repairing", cost: 1, costType: "per_rank"});
            EXTRACTED_MODIFIERS["Create"].extras.push({name: "Variable Opacity", cost: 1, costType: "flat"});
        }
        if (EXTRACTED_MODIFIERS["Deflect"] && !EXTRACTED_MODIFIERS["Deflect"].extras.some(e => e.name === "Reflect")) {
            EXTRACTED_MODIFIERS["Deflect"].extras.push({name: "Reflect", cost: 1, costType: "per_rank"});
        }
        if (EXTRACTED_MODIFIERS["Environment"] && !EXTRACTED_MODIFIERS["Environment"].extras.some(e => e.name === "Shape")) {
            EXTRACTED_MODIFIERS["Environment"].extras.push({name: "Shape", cost: 0, costType: "flat"});
        }
        if (EXTRACTED_MODIFIERS["Extra Limbs"] && !EXTRACTED_MODIFIERS["Extra Limbs"].extras.some(e => e.name === "Projection")) {
            EXTRACTED_MODIFIERS["Extra Limbs"].extras.push({name: "Projection", cost: 1, costType: "per_rank"});
        }
        if (EXTRACTED_MODIFIERS["Flight"] && !EXTRACTED_MODIFIERS["Flight"].extras.some(e => e.name === "Safe Landing")) {
            EXTRACTED_MODIFIERS["Flight"].extras.push({name: "Safe Landing", cost: 1, costType: "flat"});
        }
        if (EXTRACTED_MODIFIERS["Healing"] && !EXTRACTED_MODIFIERS["Healing"].extras.some(e => e.name === "Energizing")) {
            EXTRACTED_MODIFIERS["Healing"].extras.push({name: "Energizing", cost: 1, costType: "per_rank"});
            EXTRACTED_MODIFIERS["Healing"].extras.push({name: "Persistent", cost: 1, costType: "flat"});
            EXTRACTED_MODIFIERS["Healing"].extras.push({name: "Resurrection", cost: 1, costType: "per_rank"});
        }
        if (EXTRACTED_MODIFIERS["Immunity"] && !EXTRACTED_MODIFIERS["Immunity"].extras.some(e => e.name.includes("Redirect"))) {
            EXTRACTED_MODIFIERS["Immunity"].extras.push({name: "Redirect (Reaction)", cost: 1, costType: "flat"});
            EXTRACTED_MODIFIERS["Immunity"].extras.push({name: "Redirect (Sustained)", cost: 1, costType: "per_rank"});
            EXTRACTED_MODIFIERS["Immunity"].extras.push({name: "Redirect (Continuous)", cost: 2, costType: "per_rank"});
        }
        if (EXTRACTED_MODIFIERS["Insubstantial"] && !EXTRACTED_MODIFIERS["Insubstantial"].extras.some(e => e.name === "Affects Corporeal")) {
            EXTRACTED_MODIFIERS["Insubstantial"].extras.push({name: "Affects Corporeal", cost: 1, costType: "per_rank"});
        }
        if (EXTRACTED_MODIFIERS["Move Object"] && !EXTRACTED_MODIFIERS["Move Object"].extras.some(e => e.name === "Damaging")) {
            EXTRACTED_MODIFIERS["Move Object"].extras.push({name: "Damaging", cost: 1, costType: "per_rank"});
        }
        if (EXTRACTED_MODIFIERS["Nullify"] && !EXTRACTED_MODIFIERS["Nullify"].extras.some(e => e.name === "Alternate Resistance")) {
            EXTRACTED_MODIFIERS["Nullify"].extras.push({name: "Alternate Resistance", cost: 0, costType: "per_rank"});
        }
        if (EXTRACTED_MODIFIERS["Remote Sensing"] && !EXTRACTED_MODIFIERS["Remote Sensing"].extras.some(e => e.name === "Protected")) {
            EXTRACTED_MODIFIERS["Remote Sensing"].extras.push({name: "Protected", cost: 1, costType: "per_rank"});
            EXTRACTED_MODIFIERS["Remote Sensing"].extras.push({name: "Targeting", cost: 1, costType: "per_rank"});
        }
        if (EXTRACTED_MODIFIERS["Shrinking"] && !EXTRACTED_MODIFIERS["Shrinking"].extras.some(e => e.name === "Atomic")) {
            EXTRACTED_MODIFIERS["Shrinking"].extras.push({name: "Atomic", cost: 1, costType: "flat"});
            EXTRACTED_MODIFIERS["Shrinking"].extras.push({name: "Microscopic", cost: 1, costType: "flat"});
            EXTRACTED_MODIFIERS["Shrinking"].extras.push({name: "Normal Speed", cost: 1, costType: "per_rank"});
        }
        if (EXTRACTED_MODIFIERS["Summon"] && !EXTRACTED_MODIFIERS["Summon"].extras.some(e => e.name === "Memory Merge")) {
            EXTRACTED_MODIFIERS["Summon"].extras.push({name: "Memory Merge", cost: 1, costType: "flat"});
            EXTRACTED_MODIFIERS["Summon"].extras.push({name: "Sacrifice", cost: 1, costType: "flat"});
        }
        if (EXTRACTED_MODIFIERS["Teleport"] && !EXTRACTED_MODIFIERS["Teleport"].extras.some(e => e.name === "Change Direction")) {
            EXTRACTED_MODIFIERS["Teleport"].extras.push({name: "Change Direction", cost: 1, costType: "flat"});
            EXTRACTED_MODIFIERS["Teleport"].extras.push({name: "Change Velocity", cost: 1, costType: "flat"});
            EXTRACTED_MODIFIERS["Teleport"].extras.push({name: "Easy", cost: 1, costType: "per_rank"});
            EXTRACTED_MODIFIERS["Teleport"].extras.push({name: "Known Location", cost: 1, costType: "flat"});
            EXTRACTED_MODIFIERS["Teleport"].extras.push({name: "Turnabout", cost: 1, costType: "flat"});
        }
        if (EXTRACTED_MODIFIERS["Affliction"]) {
            EXTRACTED_MODIFIERS["Affliction"].extras = EXTRACTED_MODIFIERS["Affliction"].extras.filter(e => !e.name.includes("Variable Conditions"));
            EXTRACTED_MODIFIERS["Affliction"].extras.push({name: "Variable Conditions (1st Degree)", cost: 1, costType: "per_rank"});
            EXTRACTED_MODIFIERS["Affliction"].extras.push({name: "Variable Conditions (2nd Degree)", cost: 1, costType: "per_rank"});
            EXTRACTED_MODIFIERS["Affliction"].extras.push({name: "Variable Conditions (3rd Degree)", cost: 1, costType: "per_rank"});
            EXTRACTED_MODIFIERS["Affliction"].extras.push({name: "Variable Conditions (All Degrees)", cost: 2, costType: "per_rank"});
        }
    }
}

function setupEquipmentHandlers() {
  const btnGear = document.getElementById("btnAddGear");
  const btnVeh = document.getElementById("btnAddVehicle");
  const btnHQ = document.getElementById("btnAddHQ");
  
  if (btnGear) {
      btnGear.addEventListener("click", () => {
        char.gear = char.gear || [];
        char.gear.push({ name: "New Gear", cost: 1, type: "General", description: "" });
        buildEquipmentUI();
      });
  }
  
  if (btnVeh) {
      btnVeh.addEventListener("click", () => {
        char.vehicles = char.vehicles || [];
        char.vehicles.push({ name: "New Vehicle", cost: 10, size: 0, strength: 2, speed: 5, defense: 0, toughness: 5, category: "Ground" });
        buildEquipmentUI();
      });
  }
  
  if (btnHQ) {
      btnHQ.addEventListener("click", () => {
        char.installations = char.installations || [];
        char.installations.push({ name: "New HQ", size: 5, toughness: 6, cost: 0, features: "" });
        buildEquipmentUI();
      });
  }
}
window.setupEquipmentHandlers = setupEquipmentHandlers;

window.stepEquipVal = function(type, idx, key, delta, minVal) {
    let arr = type === 'gear' ? char.gear : (type === 'vehicle' ? char.vehicles : char.installations);
    if (!arr || !arr[idx]) return;
    let val = (parseInt(arr[idx][key]) || 0) + delta;
    if (minVal !== undefined && val < minVal) val = minVal;
    arr[idx][key] = val;
    buildEquipmentUI();
};

window.addHQFeature = function(idx, selectId) {
    const sel = document.getElementById(selectId);
    if (!sel || !sel.value) return;
    const featureName = sel.value;
    let hq = char.installations[idx];
    if (hq.features) {
        hq.features += (hq.features.trim().endsWith(",") ? " " : ", ") + featureName;
    } else {
        hq.features = featureName;
    }
    hq.cost = (parseInt(hq.cost) || 0) + 1;
    sel.selectedIndex = 0;
    buildEquipmentUI();
};

function buildEquipmentUI() {
    char.gear = char.gear || [];
    char.vehicles = char.vehicles || [];
    char.installations = char.installations || [];
    
    const equipAdvRanks = char.advantages["Equipment"] || 0;
    const totalEP = equipAdvRanks * 5;
    
    let spentEP = 0;
    char.gear.forEach(g => spentEP += (parseInt(g.cost) || 0));
    char.vehicles.forEach(v => spentEP += (parseInt(v.cost) || 0));
    char.installations.forEach(h => spentEP += (parseInt(h.cost) || 0));
    
    const epBadge = document.getElementById("lblAvailableEP");
    if (epBadge) {
        epBadge.textContent = `${spentEP} / ${totalEP}`;
        epBadge.style.color = spentEP > totalEP ? "#ef4444" : "var(--text-main)";
    }

    const gearCont = document.getElementById("gearContainer");
    if (gearCont) {
        if (char.gear.length === 0) {
            gearCont.innerHTML = `<p class="secondary-text">No gear added.</p>`;
        } else {
            gearCont.innerHTML = char.gear.map((g, idx) => `
                <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 8px; padding: 6px; border: 1px dashed var(--border-color); border-radius: 4px;">
                    <select class="minor-control" style="width: 180px;" onchange="applyEquipmentTemplate('gear', ${idx}, this.value)">
                        <option value="">- Select Template -</option>
                        <optgroup label="General Gear">${typeof EQUIPMENT_GEAR_LIST !== 'undefined' ? EQUIPMENT_GEAR_LIST.map(item => `<option value="${item.name}">${item.name}</option>`).join('') : ''}</optgroup>
                        <optgroup label="Weapons">${typeof EQUIPMENT_WEAPONS_LIST !== 'undefined' ? EQUIPMENT_WEAPONS_LIST.map(item => `<option value="${item.name}">${item.name}</option>`).join('') : ''}</optgroup>
                        <optgroup label="Grenades & Explosives">${typeof EQUIPMENT_GRENADES_LIST !== 'undefined' ? EQUIPMENT_GRENADES_LIST.map(item => `<option value="${item.name}">${item.name}</option>`).join('') : ''}</optgroup>
                        <optgroup label="Armor & Shields">${typeof EQUIPMENT_ARMOR_LIST !== 'undefined' ? EQUIPMENT_ARMOR_LIST.map(item => `<option value="${item.name}">${item.name}</option>`).join('') : ''}</optgroup>
                    </select>
                    <input type="text" class="minor-control" style="flex: 1; min-width: 150px;" value="${g.name}" placeholder="Item Name" oninput="updateEquipData('gear', ${idx}, 'name', this.value)">
                    <div style="display: flex; align-items: center; gap: 4px;">
                        <label style="font-size: var(--font-size-secondary); font-weight: 600;">Cost:</label>
                        <div class="stepper-group" style="height: 24px; min-width: 80px;">
                            <button type="button" class="stepper-btn stepper-dec" onclick="stepEquipVal('gear', ${idx}, 'cost', -1, 0)">−</button>
                            <input type="number" class="stepper-input" value="${g.cost}" onchange="updateEquipData('gear', ${idx}, 'cost', parseInt(this.value)||0)">
                            <button type="button" class="stepper-btn stepper-inc" onclick="stepEquipVal('gear', ${idx}, 'cost', 1)">+</button>
                        </div>
                    </div>
                    <input type="text" class="minor-control" style="flex: 2; min-width: 200px;" value="${g.description || g.effect || ''}" placeholder="Description / Effect" oninput="updateEquipData('gear', ${idx}, 'description', this.value)">
                    <button type="button" class="btn-delete-power" onclick="deleteEquipment('gear', ${idx})">✕</button>
                </div>
            `).join("");
        }
    }
    
    const vehCont = document.getElementById("vehiclesContainer");
    if (vehCont) {
        if (char.vehicles.length === 0) {
            vehCont.innerHTML = `<p class="secondary-text">No vehicles added.</p>`;
        } else {
            vehCont.innerHTML = char.vehicles.map((v, idx) => `
                <div style="display: flex; flex-direction: column; gap: 8px; padding: 8px; border: 1px dashed var(--border-color); margin-bottom: 8px; border-radius: 4px;">
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <select class="minor-control" style="width: 180px;" onchange="applyEquipmentTemplate('vehicle', ${idx}, this.value)">
                            <option value="">- Select Template -</option>
                            ${typeof VEHICLES_LIST !== 'undefined' ? VEHICLES_LIST.map(item => `<option value="${item.name}">${item.name}</option>`).join('') : ''}
                        </select>
                        <input type="text" class="minor-control" style="flex: 1; min-width: 150px;" value="${v.name}" placeholder="Vehicle Name" oninput="updateEquipData('vehicle', ${idx}, 'name', this.value)">
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <label style="font-size: var(--font-size-secondary); font-weight: 600;">Cost:</label>
                            <div class="stepper-group" style="height: 24px; min-width: 80px;">
                                <button type="button" class="stepper-btn stepper-dec" onclick="stepEquipVal('vehicle', ${idx}, 'cost', -1, 0)">−</button>
                                <input type="number" class="stepper-input" value="${v.cost}" onchange="updateEquipData('vehicle', ${idx}, 'cost', parseInt(this.value)||0)">
                                <button type="button" class="stepper-btn stepper-inc" onclick="stepEquipVal('vehicle', ${idx}, 'cost', 1)">+</button>
                            </div>
                        </div>
                        <button type="button" class="btn-delete-power" onclick="deleteEquipment('vehicle', ${idx})">✕</button>
                    </div>
                    <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap; font-size: 10pt; color: var(--text-muted);">
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <span style="font-weight: 600;">Size:</span>
                            <div class="stepper-group" style="height: 24px; min-width: 70px;">
                                <button type="button" class="stepper-btn stepper-dec" onclick="stepEquipVal('vehicle', ${idx}, 'size', -1)">−</button>
                                <input type="number" class="stepper-input" value="${v.size}" onchange="updateEquipData('vehicle', ${idx}, 'size', parseInt(this.value)||0)">
                                <button type="button" class="stepper-btn stepper-inc" onclick="stepEquipVal('vehicle', ${idx}, 'size', 1)">+</button>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <span style="font-weight: 600;">STR:</span>
                            <div class="stepper-group" style="height: 24px; min-width: 70px;">
                                <button type="button" class="stepper-btn stepper-dec" onclick="stepEquipVal('vehicle', ${idx}, 'strength', -1)">−</button>
                                <input type="number" class="stepper-input" value="${v.strength}" onchange="updateEquipData('vehicle', ${idx}, 'strength', parseInt(this.value)||0)">
                                <button type="button" class="stepper-btn stepper-inc" onclick="stepEquipVal('vehicle', ${idx}, 'strength', 1)">+</button>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <span style="font-weight: 600;">Speed:</span>
                            <input type="text" class="minor-control" style="width: 80px; padding: 2px 4px;" value="${v.speed}" oninput="updateEquipData('vehicle', ${idx}, 'speed', this.value)">
                        </div>
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <span style="font-weight: 600;">DEF:</span>
                            <div class="stepper-group" style="height: 24px; min-width: 70px;">
                                <button type="button" class="stepper-btn stepper-dec" onclick="stepEquipVal('vehicle', ${idx}, 'defense', -1)">−</button>
                                <input type="number" class="stepper-input" value="${v.defense}" onchange="updateEquipData('vehicle', ${idx}, 'defense', parseInt(this.value)||0)">
                                <button type="button" class="stepper-btn stepper-inc" onclick="stepEquipVal('vehicle', ${idx}, 'defense', 1)">+</button>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <span style="font-weight: 600;">Tough:</span>
                            <div class="stepper-group" style="height: 24px; min-width: 70px;">
                                <button type="button" class="stepper-btn stepper-dec" onclick="stepEquipVal('vehicle', ${idx}, 'toughness', -1)">−</button>
                                <input type="number" class="stepper-input" value="${v.toughness}" onchange="updateEquipData('vehicle', ${idx}, 'toughness', parseInt(this.value)||0)">
                                <button type="button" class="stepper-btn stepper-inc" onclick="stepEquipVal('vehicle', ${idx}, 'toughness', 1)">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join("");
        }
    }
    
    const hqCont = document.getElementById("hqContainer");
    if (hqCont) {
        if (char.installations.length === 0) {
            hqCont.innerHTML = `<p class="secondary-text">No headquarters added.</p>`;
        } else {
            hqCont.innerHTML = char.installations.map((hq, idx) => `
                <div style="display: flex; flex-direction: column; gap: 8px; padding: 8px; border: 1px dashed var(--border-color); margin-bottom: 8px; border-radius: 4px;">
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <select class="minor-control" style="width: 180px;" onchange="applyEquipmentTemplate('hq', ${idx}, this.value)">
                            <option value="">- Select Template -</option>
                            ${typeof STOCK_INSTALLATIONS !== 'undefined' ? STOCK_INSTALLATIONS.map(item => `<option value="${item.name}">${item.name}</option>`).join('') : ''}
                        </select>
                        <input type="text" class="minor-control" style="flex: 1; min-width: 150px;" value="${hq.name}" placeholder="HQ Name" oninput="updateEquipData('hq', ${idx}, 'name', this.value)">
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <label style="font-size: var(--font-size-secondary); font-weight: 600;">Cost:</label>
                            <div class="stepper-group" style="height: 24px; min-width: 80px;">
                                <button type="button" class="stepper-btn stepper-dec" onclick="stepEquipVal('hq', ${idx}, 'cost', -1, 0)">−</button>
                                <input type="number" class="stepper-input" value="${hq.cost}" onchange="updateEquipData('hq', ${idx}, 'cost', parseInt(this.value)||0)">
                                <button type="button" class="stepper-btn stepper-inc" onclick="stepEquipVal('hq', ${idx}, 'cost', 1)">+</button>
                            </div>
                        </div>
                        <button type="button" class="btn-delete-power" onclick="deleteEquipment('hq', ${idx})">✕</button>
                    </div>
                    <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap; font-size: 10pt; color: var(--text-muted);">
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <span style="font-weight: 600;">Size:</span>
                            <div class="stepper-group" style="height: 24px; min-width: 70px;">
                                <button type="button" class="stepper-btn stepper-dec" onclick="stepEquipVal('hq', ${idx}, 'size', -1)">−</button>
                                <input type="number" class="stepper-input" value="${hq.size}" onchange="updateEquipData('hq', ${idx}, 'size', parseInt(this.value)||0)">
                                <button type="button" class="stepper-btn stepper-inc" onclick="stepEquipVal('hq', ${idx}, 'size', 1)">+</button>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 4px;">
                            <span style="font-weight: 600;">Tough:</span>
                            <div class="stepper-group" style="height: 24px; min-width: 70px;">
                                <button type="button" class="stepper-btn stepper-dec" onclick="stepEquipVal('hq', ${idx}, 'toughness', -1)">−</button>
                                <input type="number" class="stepper-input" value="${hq.toughness}" onchange="updateEquipData('hq', ${idx}, 'toughness', parseInt(this.value)||0)">
                                <button type="button" class="stepper-btn stepper-inc" onclick="stepEquipVal('hq', ${idx}, 'toughness', 1)">+</button>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <select id="selHQFeature_${idx}" class="minor-control" style="width: 180px;">
                            <option value="">+ Add Feature...</option>
                            ${typeof INSTALLATION_FEATURES !== 'undefined' ? INSTALLATION_FEATURES.map(f => `<option value="${f}">${f}</option>`).join('') : ''}
                        </select>
                        <button type="button" class="btn minor-control-btn" style="padding: 2px 6px;" onclick="addHQFeature(${idx}, 'selHQFeature_${idx}')">+ Add Feature</button>
                        <input type="text" class="minor-control" style="flex: 1; min-width: 200px;" value="${hq.features || ''}" placeholder="Features list..." oninput="updateEquipData('hq', ${idx}, 'features', this.value)">
                    </div>
                </div>
            `).join("");
        }
    }
}
window.buildEquipmentUI = buildEquipmentUI;

window.updateEquipData = function(type, idx, key, val) {
    if (type === 'gear') char.gear[idx][key] = val;
    else if (type === 'vehicle') char.vehicles[idx][key] = val;
    else if (type === 'hq') char.installations[idx][key] = val;
    buildEquipmentUI();
};

window.deleteEquipment = function(type, idx) {
    if (type === 'gear') char.gear.splice(idx, 1);
    else if (type === 'vehicle') char.vehicles.splice(idx, 1);
    else if (type === 'hq') char.installations.splice(idx, 1);
    buildEquipmentUI();
};

window.applyEquipmentTemplate = function(type, idx, templateName) {
    if (!templateName) return;
    
    if (type === 'gear') {
        const item = [...EQUIPMENT_GEAR_LIST, ...EQUIPMENT_WEAPONS_LIST, ...EQUIPMENT_GRENADES_LIST, ...EQUIPMENT_ARMOR_LIST].find(i => i.name === templateName);
        if (item) {
            char.gear[idx] = { ...item };
            char.gear[idx].description = item.description || item.effect;
        }
    } else if (type === 'vehicle') {
        const item = VEHICLES_LIST.find(i => i.name === templateName);
        if (item) {
            char.vehicles[idx] = { ...item };
        }
    } else if (type === 'hq') {
        const item = STOCK_INSTALLATIONS.find(i => i.name === templateName);
        if (item) {
            char.installations[idx] = { ...item };
        }
    }
    buildEquipmentUI();
};

function populateUIFromCharacter() {
  if (document.getElementById("heroNameInput")) document.getElementById("heroNameInput").value = char.name || "New Hero";
  if (document.getElementById("heroHPInput")) document.getElementById("heroHPInput").value = typeof char.heroPoints === "number" ? char.heroPoints : 1;
  if (document.getElementById("playerNameInput")) document.getElementById("playerNameInput").value = char.playerName || "";
  if (document.getElementById("heroPLInput")) document.getElementById("heroPLInput").value = char.powerLevel || 10;
  if (document.getElementById("heroSizeInput")) document.getElementById("heroSizeInput").value = char.sizeCategory || "Medium";
  if (document.getElementById("heroMassInput")) document.getElementById("heroMassInput").value = char.massRank !== undefined ? char.massRank : 3;
  if (document.getElementById("inputATK")) document.getElementById("inputATK").value = char.combat ? (char.combat.ATK || 0) : 0;
  if (document.getElementById("inputDEF")) document.getElementById("inputDEF").value = char.combat ? (char.combat.DEF || 0) : 0;
  if (document.getElementById("inputDodge")) document.getElementById("inputDodge").value = char.purchasedResistances ? (char.purchasedResistances.Dodge || 0) : 0;
  if (document.getElementById("inputFort")) document.getElementById("inputFort").value = char.purchasedResistances ? (char.purchasedResistances.Fortitude || 0) : 0;
  if (document.getElementById("inputWill")) document.getElementById("inputWill").value = char.purchasedResistances ? (char.purchasedResistances.Will || 0) : 0;

  if (char.abilities) {
    for (const [k, v] of Object.entries(char.abilities)) {
      const el = document.getElementById(`input_${k}`);
      if (el) el.value = v;
    }
  }
  if (char.absentAbilities) {
    for (const [k, v] of Object.entries(char.absentAbilities)) {
      const chk = document.getElementById(`enable_${k}`);
      const input = document.getElementById(`input_${k}`);
      const dec = document.getElementById(`dec_${k}`);
      const inc = document.getElementById(`inc_${k}`);
      if (chk) chk.checked = !v;
      if (input) input.disabled = v;
      if (dec) dec.disabled = v;
      if (inc) inc.disabled = v;
    }
  }

  if (document.getElementById("bgIdentity")) document.getElementById("bgIdentity").value = char.identity || "";
  if (document.getElementById("bgMotivation")) document.getElementById("bgMotivation").value = char.motivation || "";
  if (document.getElementById("bgComplications")) document.getElementById("bgComplications").value = char.complications || "";
  if (document.getElementById("bgHistory")) document.getElementById("bgHistory").value = char.history || "";
  if (document.getElementById("txtHeroPoints")) {
    document.getElementById("txtHeroPoints").value = typeof char.heroPoints === "number" ? char.heroPoints : 1;
  }
  if (document.getElementById("txtTotalPointsAllowed")) {
    document.getElementById("txtTotalPointsAllowed").value = char.totalPointsAllowed || (char.powerLevel * 15);
  }

  buildSkillsUI();
  buildAdvantagesUI();
  buildPowersUI();
  buildEquipmentUI();
  refreshUI();
}

function applyLoadedCharacter(loaded) {
  if (!loaded) return;
  if (window.activeCompanionId) {
    window.activeCompanionId = null;
  }
  char.deserialize(loaded);
  window.primaryHero = char;
  populateUIFromCharacter();
  if (typeof updateAltSelectorUI === "function") {
    updateAltSelectorUI();
  }
  if (typeof FileManager !== "undefined") {
    FileManager.captureSavedSnapshot();
    FileManager.updateFileStatusUI();
  }
}

function refreshUI() {
  const lblHeroName = document.getElementById("lblHeroName");
  if (lblHeroName) lblHeroName.textContent = char.name;
  const heroHPEl = document.getElementById("heroHPInput");
  if (heroHPEl && document.activeElement !== heroHPEl) {
    heroHPEl.value = typeof char.heroPoints === "number" ? char.heroPoints : 1;
  }
  document.getElementById("lblPL").textContent = char.powerLevel;

  // Title Bar Hero & Alt Name Display
  const titleHeroEl = document.getElementById("titleHeroName");
  const titleAltBadge = document.getElementById("titleAltBadge");
  const btnDeleteAlt = document.getElementById("btnDeleteCurrentAlt");

  if (window.activeCompanionId && window.primaryHero) {
    const comp = (window.primaryHero.companions || []).find(c => c.id === window.activeCompanionId);
    if (comp) {
      if (titleHeroEl) titleHeroEl.textContent = window.primaryHero.name || "Hero";
      if (titleAltBadge) {
        const typeLabels = { minion: "Minion", mecha: "Mecha", alt_form: "Alt Form" };
        titleAltBadge.textContent = `[${comp.name} (${typeLabels[comp.type] || "Alt"})]`;
        titleAltBadge.className = `header-alt-badge ${comp.type}`;
        titleAltBadge.style.display = "inline-block";
      }
      if (btnDeleteAlt) btnDeleteAlt.style.display = "inline-block";
    }
  } else {
    if (titleHeroEl) titleHeroEl.textContent = char.name || "New Hero";
    if (titleAltBadge) titleAltBadge.style.display = "none";
    if (btnDeleteAlt) btnDeleteAlt.style.display = "none";
  }


  if (typeof MEASUREMENT_TABLE !== 'undefined') {
    const massData = MEASUREMENT_TABLE[char.massRank ? char.massRank.toString() : "3"];
    const massStr = massData ? massData.mass_imp : "Special";
    document.getElementById("lblHeroMassVal").textContent = `(${massStr})`;
  }

  const pp = char.powerPointsSummary;
  const totalSpent = pp.totalSpent || 0;
  const totalAllowed = typeof char.totalPointsAllowed === "number" ? char.totalPointsAllowed : (char.powerLevel * 15);
  const isOverBudget = totalSpent > totalAllowed;

  document.getElementById("lblAbilPP").textContent = `${pp.abilities} PP`;
  document.getElementById("lblCombatPP").textContent = `${pp.combat} PP`;
  document.getElementById("lblResistPP").textContent = `${pp.resistances} PP`;
  document.getElementById("lblSkillPP").textContent = `${pp.skills} PP`;
  document.getElementById("lblAdvPP").textContent = `${pp.advantages} PP`;
  document.getElementById("lblPowerPP").textContent = `${pp.powers} PP`;

  const totalPPElem = document.getElementById("lblTotalPP");
  if (totalPPElem) {
    totalPPElem.textContent = `${totalSpent} / ${totalAllowed} PP`;
    if (isOverBudget) {
      totalPPElem.style.setProperty("color", "#ef4444", "important");
      totalPPElem.style.setProperty("font-weight", "700", "important");
      totalPPElem.style.setProperty("border-color", "#ef4444", "important");
      totalPPElem.title = `Power Points exceeded by ${totalSpent - totalAllowed} PP!`;
    } else {
      totalPPElem.style.removeProperty("color");
      totalPPElem.style.removeProperty("font-weight");
      totalPPElem.style.removeProperty("border-color");
      totalPPElem.title = `Total Power Points`;
    }
  }

  // Basics Tab PP display
  const lblBasicsSpent = document.getElementById("lblBasicsSpentPP");
  const lblBasicsTotal = document.getElementById("lblBasicsTotalPP");
  const boxBasicsPP = document.getElementById("boxBasicsPP");

  if (lblBasicsSpent) {
    lblBasicsSpent.textContent = totalSpent;
    lblBasicsSpent.style.color = isOverBudget ? "#ef4444" : "var(--text-main)";
  }
  if (lblBasicsTotal) {
    lblBasicsTotal.textContent = totalAllowed;
  }
  if (boxBasicsPP) {
    if (isOverBudget) {
      boxBasicsPP.classList.add("over-budget");
      boxBasicsPP.title = `Power Points exceeded: ${totalSpent} / ${totalAllowed} PP (+${totalSpent - totalAllowed} over limit)`;
    } else {
      boxBasicsPP.classList.remove("over-budget");
      boxBasicsPP.title = `Power Points: ${totalSpent} / ${totalAllowed} PP`;
    }
  }

  // History Tab Trackers & Summary Hero Points
  const hpVal = typeof char.heroPoints === "number" ? char.heroPoints : 1;
  const luckRanks = (char.advantages && char.advantages["Luck"]) || 0;
  const startingHP = 1 + luckRanks;

  const summaryHPElem = document.getElementById("lblSummaryHeroPoints");
  if (summaryHPElem) summaryHPElem.textContent = `${hpVal} HP`;

  const heroPointsBadge = document.getElementById("lblHeroPointsBadge");
  if (heroPointsBadge) heroPointsBadge.textContent = `${hpVal} HP`;

  const txtHP = document.getElementById("txtHeroPoints");
  if (txtHP && document.activeElement !== txtHP) txtHP.value = hpVal;

  const lblStartingHP = document.getElementById("lblStartingHeroPoints");
  if (lblStartingHP) {
    lblStartingHP.innerHTML = `Starting (per scene/session): <strong>${startingHP}</strong> (1 + ${luckRanks} Luck)`;
  }

  // Power Points Tracker on History Tab
  const remainingPP = totalAllowed - totalSpent;
  const basePLPP = char.powerLevel * 15;

  const txtTotalPP = document.getElementById("txtTotalPointsAllowed");
  if (txtTotalPP && document.activeElement !== txtTotalPP) txtTotalPP.value = totalAllowed;

  const lblPLMult = document.getElementById("lblPLMultiplier");
  if (lblPLMult) lblPLMult.textContent = char.powerLevel;

  const lblBasePP = document.getElementById("lblBasePLPP");
  if (lblBasePP) lblBasePP.textContent = basePLPP;

  const lblTrackerSpent = document.getElementById("lblTrackerSpentPP");
  if (lblTrackerSpent) lblTrackerSpent.textContent = totalSpent;

  const lblTrackerRem = document.getElementById("lblTrackerRemainingPP");
  if (lblTrackerRem) {
    lblTrackerRem.textContent = remainingPP;
    lblTrackerRem.style.color = remainingPP < 0 ? "#ef4444" : "var(--accent-primary)";
  }

  const lblRemBadge = document.getElementById("lblRemainingPPBadge");
  if (lblRemBadge) {
    lblRemBadge.textContent = remainingPP < 0 ? `${Math.abs(remainingPP)} Over Budget` : `${remainingPP} Unspent`;
    lblRemBadge.style.background = remainingPP < 0 ? "#ef4444" : (remainingPP === 0 ? "var(--bg-card)" : "#10b981");
  }

  const limits = char.advantageLimitsCheck;
  const heroicElem = document.getElementById("lblHeroicLimit");
  if (heroicElem) {
    heroicElem.textContent = `${limits.heroicSpent} / ${limits.heroicMax}`;
    heroicElem.style.background = limits.heroicValid ? "var(--accent-primary)" : "#ef4444";
  }

  const commandElem = document.getElementById("lblCommandLimit");
  if (commandElem) {
    commandElem.textContent = `${limits.commandSpent} / ${limits.commandMax} (${limits.commandAbility})`;
    commandElem.style.background = limits.commandValid ? "var(--accent-primary)" : "#ef4444";
  }

  const derived = char.derivedStats;
  const atk = char.getCombatRank("ATK");
  const closeAtkAdv = char.advantages["Close Attack"] || 0;
  const rangedAtkAdv = char.advantages["Ranged Attack"] || 0;
  const closeCombatSkill = char.skills["Close Combat"] || 0;
  const rangedCombatSkill = char.skills["Ranged Combat"] || 0;

  document.getElementById("lblCloseAttack").textContent = (derived.closeAttack >= 0 ? "+" : "") + derived.closeAttack;
  document.getElementById("lblCloseAtkBreakdown").textContent = `(ATK ${atk} + Adv ${closeAtkAdv} + Skill ${closeCombatSkill})`;

  document.getElementById("lblRangedAttack").textContent = (derived.rangedAttack >= 0 ? "+" : "") + derived.rangedAttack;
  document.getElementById("lblRangedAtkBreakdown").textContent = `(ATK ${atk} + Adv ${rangedAtkAdv} + Skill ${rangedCombatSkill})`;

  document.getElementById("resDefenseClass").textContent = derived.defenseClass;
  document.getElementById("resDodge").textContent = derived.dodge === null ? "—" : derived.dodge;
  document.getElementById("resToughness").textContent = derived.toughness;
  document.getElementById("resFortitude").textContent = derived.fortitude === null ? "—" : derived.fortitude;
  document.getElementById("resWill").textContent = derived.will === null ? "—" : derived.will;
  document.getElementById("resCloseDef").textContent = derived.closeDefense;
  document.getElementById("resRangedDef").textContent = derived.rangedDefense;

  const sta = char.getAbilityRank("STA");
  const awe = char.getAbilityRank("AWE");
  const defRank = char.getCombatRank("DEF");
  const defRoll = char.advantages["Defensive Roll"] || 0;
  const toughAdv = char.advantages["Tough"] || 0;
  const closeDefAdv = char.advantages["Close Defense"] || 0;
  const rangedDefAdv = char.advantages["Ranged Defense"] || 0;
  const impInit = char.advantages["Improved Initiative"] || 0;
  const pMods = char.powerTraitModifiers;

  document.getElementById("adjDodge").textContent = `DEF (${defRank}) + Bought (${char.purchasedResistances.Dodge || 0})`;
  document.getElementById("adjToughness").textContent = sta === null ? "Absent STA" : `STA (${sta}) + Def Roll (${defRoll}) + Tough (${toughAdv}) + Protection (${pMods.protectionToughness})`;
  document.getElementById("adjFort").textContent = sta === null ? "Absent STA" : `STA (${sta}) + Bought (${char.purchasedResistances.Fortitude || 0})`;
  document.getElementById("adjWill").textContent = awe === null ? "Absent AWE" : `AWE (${awe}) + Bought (${char.purchasedResistances.Will || 0})`;
  document.getElementById("adjCloseDef").textContent = `DEF (${defRank}) + Close Def Adv (${closeDefAdv})`;
  document.getElementById("adjRangedDef").textContent = `DEF (${defRank}) + Ranged Def Adv (${rangedDefAdv})`;

  document.getElementById("resInitiative").textContent = derived.initiative;
  document.getElementById("adjInitiative").textContent = `AGL (${char.getAbilityRank("AGL") || 0}) + Imp Initiative (+${impInit * 4})`;

  if (typeof MEASUREMENT_TABLE !== 'undefined') {
    const groundDist = MEASUREMENT_TABLE[derived.groundSpeed] ? MEASUREMENT_TABLE[derived.groundSpeed].dist_imp : "Special";
    document.getElementById("resGroundSpeed").textContent = `Rank ${derived.groundSpeed} (${groundDist})`;
    
    const rowAirSpeed = document.getElementById("rowAirSpeed");
    if (rowAirSpeed) {
      if (derived.airSpeed !== null && derived.airSpeed > 0) {
        rowAirSpeed.style.display = "";
        const airDist = MEASUREMENT_TABLE[derived.airSpeed] ? MEASUREMENT_TABLE[derived.airSpeed].dist_imp : "Special";
        document.getElementById("resAirSpeed").textContent = `Rank ${derived.airSpeed} (${airDist})`;
      } else {
        rowAirSpeed.style.display = "none";
      }
    }

    const waterDist = MEASUREMENT_TABLE[derived.waterSpeed] ? MEASUREMENT_TABLE[derived.waterSpeed].dist_imp : "Special";
    document.getElementById("resWaterSpeed").textContent = `Rank ${derived.waterSpeed} (${waterDist})`;
    
    const rowSpaceSpeed = document.getElementById("rowSpaceSpeed");
    if (rowSpaceSpeed) {
      if (derived.spaceSpeed !== null && derived.spaceSpeed > 0) {
        rowSpaceSpeed.style.display = "";
        let spaceDesc = "Orbital";
        if (derived.spaceSpeed >= 6) spaceDesc = "Intergalactic";
        else if (derived.spaceSpeed >= 4) spaceDesc = "Interstellar";
        else if (derived.spaceSpeed >= 2) spaceDesc = "Solar System";
        document.getElementById("resSpaceSpeed").textContent = `Rank ${derived.spaceSpeed} (${spaceDesc})`;
      } else {
        rowSpaceSpeed.style.display = "none";
      }
    }
    
    const liftDist = MEASUREMENT_TABLE[derived.maxLiftingMassRank] ? MEASUREMENT_TABLE[derived.maxLiftingMassRank].mass_imp : "—";
    document.getElementById("resMaxLifting").textContent = `Rank ${derived.maxLiftingMassRank} (${liftDist})`;
  }
  document.getElementById("resSpacesReach").textContent = `${derived.spaces} / ${derived.reach}`;

  const combatAdvListContainer = document.getElementById("combatAdvList");
  let activeCombatAdvHTML = "";

  const combatSkills = [
    { name: "Acrobatics", action: "Balancing, Contorting, Stand without Hindered (DC 20), Tumbling vs fall damage" },
    { name: "Athletics", action: "DC 15 Run for +1 speed rank; Climbing, Jumping, Swimming" },
    { name: "Deception", action: "Distract Impress (Vulnerable/Defenseless), Innuendo, Trick action" },
    { name: "Intimidation", action: "Demoralize Impress (Impaired/Frightened), Coerce" },
    { name: "Sleight of Hand", action: "Slip out of restraints (DC 10-20), Conceal, Plant, Steal" },
    { name: "Stealth", action: "Hide while in cover, Sneak vs Perception, Tailing" }
  ];

  const hideUnranked = document.getElementById("chkFilterUnrankedSkills") && document.getElementById("chkFilterUnrankedSkills").checked;

  combatSkills.forEach(cs => {
    if (hideUnranked && (!char.skills[cs.name] || char.skills[cs.name] === 0)) return;
    activeCombatAdvHTML += `
      <div class="combat-conditional-row">
        <span class="combat-conditional-name">
          ${cs.name}
          <button type="button" class="btn-info-circle" onclick="showSkillInfo('${cs.name}')" title="View Skill Rules">?</button>
        </span>
        <span class="combat-conditional-desc">${cs.action}</span>
      </div>
    `;
  });

  if (typeof ADVANTAGES_LIST !== 'undefined') {
    ADVANTAGES_LIST.forEach(adv => {
      if (adv.types.includes("Combat") && adv.conditionalSummary) {
        const ranks = char.advantages[adv.name] || 0;
        if (ranks > 0) {
          const detail = char.advantageDetails[adv.name] ? ` (${char.advantageDetails[adv.name]})` : "";
          const rankLabel = adv.ranked ? ` [Rank ${ranks}]` : "";
          activeCombatAdvHTML += `
            <div class="combat-conditional-row">
              <span class="combat-conditional-name">
                ${adv.name}${rankLabel}${detail}
                <button type="button" class="btn-info-circle" onclick="showAdvantageInfo('${adv.name}')" title="View Full Rule">?</button>
              </span>
              <span class="combat-conditional-desc">${adv.conditionalSummary}</span>
            </div>
          `;
        }
      }
    });
  }

  combatAdvListContainer.innerHTML = activeCombatAdvHTML;

  ["STR", "STA", "AGL", "INT", "AWE", "PRE"].forEach(k => {
    const val = char.getAbilityRank(k);
    const totalElem = document.getElementById(`total_rank_${k}`);
    const adjElem = document.getElementById(`adj_${k}`);

    if (val === null) {
      if (totalElem) totalElem.textContent = "—";
      if (adjElem) adjElem.innerHTML = "<span style='color:#ef4444;'>Absent / Disabled</span>";
    } else {
      if (totalElem) totalElem.textContent = val;
      if (adjElem) adjElem.innerHTML = "<em>Base points only</em>";
    }
  });

  if (typeof SKILLS_LIST !== 'undefined') {
    const maxSkillCap = char.powerLevel + 10;
    SKILLS_LIST.forEach(skill => {
      const idSafe = skill.name.replace(/[^a-zA-Z0-9]/g, "_");
      let base = 0;
      if (skill.ability === "ATK") {
        base = char.getCombatRank("ATK");
      } else {
        const val = char.getAbilityRank(skill.ability);
        base = val === null ? 0 : val;
      }

      const bought = char.skills[skill.name] || 0;
      const total = base + bought;

      const baseElem = document.getElementById(`skill_base_${idSafe}`);
      const totalElem = document.getElementById(`skill_total_${idSafe}`);
      if (baseElem) baseElem.textContent = (base >= 0 ? "+" : "") + base;
      if (totalElem) {
        totalElem.textContent = (total >= 0 ? "+" : "") + total;
        if (total > maxSkillCap) {
          totalElem.style.color = "#ef4444";
          totalElem.title = `Exceeds PL Cap (${maxSkillCap})`;
        } else {
          totalElem.style.color = "inherit";
          totalElem.title = "";
        }
      }
    });
  }

  if (typeof FileManager !== "undefined" && typeof FileManager.updateFileStatusUI === "function") {
    FileManager.updateFileStatusUI();
  }
}

/* ==========================================================================
   TOAST NOTIFICATION ENGINE
   ========================================================================== */

function showToast(message, type = "info", durationMs = 3500) {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast-message toast-${type}`;
  
  let icon = "ℹ️";
  if (type === "success") icon = "✅";
  else if (type === "error") icon = "⚠️";

  toast.innerHTML = `<span style="font-size:16px;">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("toast-visible");
  });

  setTimeout(() => {
    toast.classList.remove("toast-visible");
    toast.classList.add("toast-hiding");
    setTimeout(() => toast.remove(), 300);
  }, durationMs);
}

/* ==========================================================================
   BACKGROUND & IDENTITY HANDLERS
   ========================================================================== */

function setupBackgroundHandlers() {
  const bgId = document.getElementById("bgIdentity");
  const bgMot = document.getElementById("bgMotivation");
  const bgComp = document.getElementById("bgComplications");
  const bgHist = document.getElementById("bgHistory");

  if (bgId) bgId.addEventListener("input", (e) => { char.identity = e.target.value; });
  if (bgMot) bgMot.addEventListener("input", (e) => { char.motivation = e.target.value; });
  if (bgComp) bgComp.addEventListener("input", (e) => { char.complications = e.target.value; });
  if (bgHist) bgHist.addEventListener("input", (e) => { char.history = e.target.value; });

  // Hero Points Tracker Controls
  const txtHP = document.getElementById("txtHeroPoints");
  if (txtHP) {
    txtHP.addEventListener("input", (e) => {
      char.heroPoints = Math.max(0, parseInt(e.target.value) || 0);
      refreshUI();
    });
  }

  const btnResetHP = document.getElementById("btnResetHeroPoints");
  if (btnResetHP) {
    btnResetHP.addEventListener("click", () => {
      const luck = (char.advantages && char.advantages["Luck"]) || 0;
      char.heroPoints = 1 + luck;
      refreshUI();
      if (typeof showToast === "function") showToast(`Hero Points reset to starting (${1 + luck}).`, "info");
    });
  }

  // Power Points Tracker Controls
  const txtTotPP = document.getElementById("txtTotalPointsAllowed");
  if (txtTotPP) {
    txtTotPP.addEventListener("input", (e) => {
      char.totalPointsAllowed = Math.max(0, parseInt(e.target.value) || 0);
      refreshUI();
    });
  }

  const btnResetTotPP = document.getElementById("btnResetTotalPP");
  if (btnResetTotPP) {
    btnResetTotPP.addEventListener("click", () => {
      char.totalPointsAllowed = (char.powerLevel || 10) * 15;
      refreshUI();
      if (typeof showToast === "function") showToast(`Total Power Points reset to PL standard (${char.powerLevel * 15} PP).`, "info");
    });
  }
}

/* ==========================================================================
   PERSISTENT FOLDER SETTINGS (IndexedDB)
   ========================================================================== */

const FolderStore = {
  dbName: "MM4E_App_Settings",
  storeName: "folder_settings",

  init: function() {
    return new Promise((resolve) => {
      if (typeof indexedDB === 'undefined') return resolve(null);
      const req = indexedDB.open(this.dbName, 1);
      req.onerror = () => resolve(null);
      req.onsuccess = () => resolve(req.result);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
    });
  },

  getSavedFolder: async function() {
    try {
      const db = await this.init();
      if (!db) return null;
      return new Promise((resolve) => {
        const tx = db.transaction(this.storeName, "readonly");
        const store = tx.objectStore(this.storeName);
        const req = store.get("default_folder");
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
    } catch (e) {
      console.warn("Could not retrieve saved folder handle:", e);
      return null;
    }
  },

  saveFolder: async function(handle, name) {
    try {
      const db = await this.init();
      if (!db) return;
      const tx = db.transaction(this.storeName, "readwrite");
      const store = tx.objectStore(this.storeName);
      store.put({ handle, name }, "default_folder");
    } catch (e) {
      console.warn("Could not persist folder handle:", e);
    }
  },

  clearFolder: async function() {
    try {
      const db = await this.init();
      if (!db) return;
      const tx = db.transaction(this.storeName, "readwrite");
      const store = tx.objectStore(this.storeName);
      store.delete("default_folder");
    } catch (e) {
      console.warn("Could not clear folder handle:", e);
    }
  }
};

/* ==========================================================================
   LOCAL FILE MANAGER (.mm4e) WITH FILE SYSTEM ACCESS API & FALLBACKS
   ========================================================================== */

const FileManager = {
  currentFileHandle: null,
  currentFileName: null,
  activeDirectoryHandle: null,
  activeDirectoryName: null,
  lastSavedSnapshot: null,

  init: async function() {
    const saved = await FolderStore.getSavedFolder();
    if (saved && saved.handle) {
      this.activeDirectoryHandle = saved.handle;
      this.activeDirectoryName = saved.name || saved.handle.name || "Custom Folder";
    }
    this.captureSavedSnapshot();
    this.updateFolderUI();
    this.updateFileStatusUI();
  },

  captureSavedSnapshot: function() {
    try {
      if (typeof syncActiveCompanionToPrimary === "function") {
        syncActiveCompanionToPrimary();
      }
      const hero = window.primaryHero || window.char;
      if (hero && typeof hero.serialize === "function") {
        this.lastSavedSnapshot = JSON.stringify(hero.serialize().character);
      }
    } catch (e) {
      console.warn("Could not capture character snapshot:", e);
    }
  },

  hasUnsavedChanges: function() {
    if (!this.lastSavedSnapshot) {
      return false;
    }
    try {
      if (typeof syncActiveCompanionToPrimary === "function") {
        syncActiveCompanionToPrimary();
      }
      const hero = window.primaryHero || window.char;
      if (!hero || typeof hero.serialize !== "function") return false;
      const currentSnapshot = JSON.stringify(hero.serialize().character);
      return currentSnapshot !== this.lastSavedSnapshot;
    } catch (e) {
      return false;
    }
  },

  confirmUnsavedChanges: function(actionDescription = "load a different character") {
    if (!this.hasUnsavedChanges()) {
      return true;
    }
    const heroName = (window.primaryHero || window.char).name || "Current Hero";
    const fileDesc = this.currentFileName 
      ? `file "${this.currentFileName}" (${heroName})` 
      : `character "${heroName}"`;
    return confirm(
      `⚠️ Unsaved Changes Warning!\n\nYou have unsaved changes to ${fileDesc}.\n\nProceeding to ${actionDescription} will overwrite and discard all unsaved edits.\n\nDo you want to discard unsaved changes and proceed?`
    );
  },

  updateFolderUI: function() {
    const folderLbl = document.getElementById("lblActiveFolder");
    const ffNotice = document.getElementById("boxFirefoxNotice");

    if (ffNotice) {
      const isFF = typeof navigator !== 'undefined' && (/firefox/i.test(navigator.userAgent) || !window.showDirectoryPicker);
      ffNotice.style.display = isFF ? "block" : "none";
    }

    if (!folderLbl) return;
    if (this.activeDirectoryName) {
      folderLbl.textContent = this.activeDirectoryName;
      folderLbl.title = `Current Default Folder: ${this.activeDirectoryName}`;
    } else if (this.activeDirectoryHandle && this.activeDirectoryHandle.name) {
      folderLbl.textContent = this.activeDirectoryHandle.name;
      folderLbl.title = `Current Default Folder: ${this.activeDirectoryHandle.name}`;
    } else if (!window.showDirectoryPicker) {
      folderLbl.textContent = "[Firefox Downloads]";
      folderLbl.title = "Managed via Firefox Settings > Downloads";
    } else {
      folderLbl.textContent = "[Project Default]";
      folderLbl.title = "Project Default Folder";
    }
  },

  updateFileStatusUI: function() {
    const badge = document.getElementById("lblCurrentFile");
    if (!badge) return;
    const isDirty = this.hasUnsavedChanges();
    const dirtyMark = isDirty ? " *" : "";
    if (this.currentFileName) {
      badge.textContent = `[${this.currentFileName}${dirtyMark}]`;
      badge.title = `Active File: ${this.currentFileName}${isDirty ? " (Unsaved changes)" : ""}`;
    } else {
      badge.textContent = isDirty ? `[Unsaved Character *]` : `[Unsaved Character]`;
      badge.title = isDirty ? `Unsaved Character (Changes pending)` : `Unsaved Character`;
    }
  },

  getPickerOptions: function(suggestedName = null) {
    const options = {
      types: [{
        description: "Mutants & Masterminds 4E Character File (*.mm4e)",
        accept: { "application/json": [".mm4e", ".json"] }
      }]
    };
    if (suggestedName) {
      options.suggestedName = suggestedName;
    }

    if (this.activeDirectoryHandle) {
      options.startIn = this.activeDirectoryHandle;
    } else if (this.currentFileHandle) {
      options.startIn = this.currentFileHandle;
    } else {
      options.id = "mm4e_character_folder";
    }
    return options;
  },

  confirmPPOverLimit: function() {
    if (typeof syncActiveCompanionToPrimary === "function") {
      syncActiveCompanionToPrimary();
    }
    const current = window.char;
    const hero = window.primaryHero || window.char;

    // 1. Check current form
    const currentSpent = current.powerPointsSummary ? current.powerPointsSummary.totalSpent : 0;
    const currentAllowed = typeof current.totalPointsAllowed === "number" ? current.totalPointsAllowed : (current.powerLevel * 15);

    if (currentSpent > currentAllowed) {
      const over = currentSpent - currentAllowed;
      const msg = `⚠️ Warning: Power Points Exceeded!\n\n"${current.name || 'Hero'}" has spent ${currentSpent} PP, which is ${over} PP over the allowed limit of ${currentAllowed} PP.\n\nDo you want to proceed and save this character anyway?`;
      return confirm(msg);
    }

    // 2. If editing a companion, also check primary hero
    if (hero && hero !== current) {
      const heroSpent = hero.powerPointsSummary ? hero.powerPointsSummary.totalSpent : 0;
      const heroAllowed = typeof hero.totalPointsAllowed === "number" ? hero.totalPointsAllowed : (hero.powerLevel * 15);
      if (heroSpent > heroAllowed) {
        const over = heroSpent - heroAllowed;
        const msg = `⚠️ Warning: Power Points Exceeded!\n\nPrimary Hero "${hero.name || 'Hero'}" has spent ${heroSpent} PP, which is ${over} PP over the allowed limit of ${heroAllowed} PP.\n\nDo you want to proceed and save this character anyway?`;
        return confirm(msg);
      }
    }

    // 3. Check any other companions
    if (hero && Array.isArray(hero.companions)) {
      for (const comp of hero.companions) {
        if (comp.id === window.activeCompanionId) continue;
        const compPL = comp.powerLevel || hero.powerLevel || 10;
        const compAllowed = typeof comp.totalPointsAllowed === "number" ? comp.totalPointsAllowed : (compPL * 15);
        let compSpent = 0;
        if (comp.data) {
          try {
            const tempModel = new CharacterModel();
            tempModel.deserialize(comp.data);
            compSpent = tempModel.powerPointsSummary ? tempModel.powerPointsSummary.totalSpent : 0;
          } catch (e) {}
        }
        if (compSpent > compAllowed) {
          const over = compSpent - compAllowed;
          const msg = `⚠️ Warning: Power Points Exceeded!\n\nCompanion form "${comp.name}" has spent ${compSpent} PP, which is ${over} PP over the allowed limit of ${compAllowed} PP.\n\nDo you want to proceed and save this character anyway?`;
          return confirm(msg);
        }
      }
    }

    return true;
  },

  // Save As: Opens native OS save dialog to choose any directory/filename, or downloads
  saveHeroAs: async function() {
    if (!this.confirmPPOverLimit()) {
      showToast("Save cancelled (Power Point limit exceeded).", "warning");
      return false;
    }
    if (typeof syncActiveCompanionToPrimary === "function") {
      syncActiveCompanionToPrimary();
    }
    const hero = window.primaryHero || window.char;
    const safeHeroName = hero.name ? hero.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() : "hero";
    const defaultFileName = `${safeHeroName}.mm4e`;
    const payload = JSON.stringify(hero.serialize(), null, 2);

    if (window.showSaveFilePicker) {
      try {
        const pickerOptions = this.getPickerOptions(defaultFileName);
        const handle = await window.showSaveFilePicker(pickerOptions);
        const writable = await handle.createWritable();
        await writable.write(payload);
        await writable.close();

        this.currentFileHandle = handle;
        this.currentFileName = handle.name;
        // Last used save location becomes the starting point for further loads and saves
        if (!this.activeDirectoryName) {
          this.activeDirectoryHandle = handle;
        }
        this.captureSavedSnapshot();
        this.updateFileStatusUI();
        showToast(`Saved "${handle.name}" successfully!`, "success");
        return true;
      } catch (err) {
        if (err.name === "AbortError") {
          return false;
        }
        console.warn("showSaveFilePicker error, falling back to download:", err);
      }
    }

    // Fallback download
    this.fallbackDownload(payload, defaultFileName);
    this.currentFileName = defaultFileName;
    this.captureSavedSnapshot();
    this.updateFileStatusUI();

    const isFF = typeof navigator !== 'undefined' && (/firefox/i.test(navigator.userAgent) || !window.showSaveFilePicker);
    if (isFF) {
      showToast(`Saving "${defaultFileName}"... Click "OK / Save File" in Firefox to choose your save folder.`, "info", 5000);
    } else {
      showToast(`Saved "${defaultFileName}" to downloads!`, "success");
    }
    return true;
  },

  // Save: Writes directly to the active file handle in-place, or prompts Save As
  saveHero: async function() {
    if (!this.confirmPPOverLimit()) {
      showToast("Save cancelled (Power Point limit exceeded).", "warning");
      return false;
    }
    if (!this.currentFileHandle) {
      return this.saveHeroAs();
    }
    if (typeof syncActiveCompanionToPrimary === "function") {
      syncActiveCompanionToPrimary();
    }
    const hero = window.primaryHero || window.char;
    const payload = JSON.stringify(hero.serialize(), null, 2);
    try {
      const writable = await this.currentFileHandle.createWritable();
      await writable.write(payload);
      await writable.close();
      this.captureSavedSnapshot();
      this.updateFileStatusUI();
      showToast(`Saved "${this.currentFileName}" successfully!`, "success");
      return true;
    } catch (err) {
      console.warn("Direct file save failed, reverting to Save As prompt:", err);
      return this.saveHeroAs();
    }
  },

  // Load: Opens native OS open dialog starting in active/last used folder, or opens file input
  loadHero: async function() {
    if (!this.confirmUnsavedChanges("load a different character")) {
      return false;
    }
    if (window.showOpenFilePicker) {
      try {
        const pickerOptions = this.getPickerOptions();
        pickerOptions.multiple = false;
        const [handle] = await window.showOpenFilePicker(pickerOptions);
        const file = await handle.getFile();
        const text = await file.text();
        const parsed = JSON.parse(text);

        applyLoadedCharacter(parsed);
        this.currentFileHandle = handle;
        this.currentFileName = handle.name;
        // Last used location becomes the default starting point for further operations
        if (!this.activeDirectoryName) {
          this.activeDirectoryHandle = handle;
        }
        this.captureSavedSnapshot();
        this.updateFileStatusUI();
        showToast(`Loaded "${handle.name}" successfully!`, "success");
        return true;
      } catch (err) {
        if (err.name === "AbortError") {
          return false;
        }
        console.warn("showOpenFilePicker error, falling back to file input:", err);
      }
    }

    const fileInput = document.getElementById("fileLoadHero");
    if (fileInput) {
      fileInput.click();
    }
  },

  // Explicitly choose a default folder from options
  setCustomFolder: async function() {
    if (window.showDirectoryPicker) {
      try {
        const dirHandle = await window.showDirectoryPicker({
          id: "mm4e_character_folder",
          mode: "readwrite"
        });
        if (dirHandle) {
          this.activeDirectoryHandle = dirHandle;
          this.activeDirectoryName = dirHandle.name;
          await FolderStore.saveFolder(dirHandle, dirHandle.name);
          this.updateFolderUI();
          showToast(`Default folder set to "${dirHandle.name}".`, "success");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.warn("showDirectoryPicker error:", err);
          showToast("Could not access selected folder.", "error");
        }
      }
    } else {
      const modal = document.getElementById("ruleInfoModal");
      const titleEl = document.getElementById("modalRuleTitle");
      const bodyEl = document.getElementById("modalRuleBody");

      if (modal && titleEl && bodyEl) {
        titleEl.textContent = "Folder Settings in Firefox";
        bodyEl.innerHTML = `
          <div style="line-height: 1.6; font-size: var(--font-size-controls);">
            <p style="margin-bottom: 8px;"><strong>Why this happens:</strong> For security, browsers prevent websites from directly opening internal configuration pages (like <code>about:preferences</code>) or modifying folder paths via scripts.</p>
            <p style="margin-bottom: 8px;">To set your save folder in Firefox:</p>
            
            <div style="margin: 10px 0 14px 0; padding: 8px 12px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
              <div>
                <span style="color: var(--text-muted); font-size: var(--font-size-secondary);">Firefox Address:</span>
                <code style="font-weight: bold; color: var(--accent-primary); margin-left: 6px;">about:preferences</code>
              </div>
              <button type="button" class="btn btn-secondary" style="font-size: var(--font-size-minor-controls); padding: 4px 10px;" onclick="navigator.clipboard.writeText('about:preferences').then(() => { this.textContent = '✓ Copied!'; setTimeout(() => this.textContent = '📋 Copy Address', 2000); })">📋 Copy Address</button>
            </div>

            <ol style="margin-left: 20px; margin-bottom: 12px; display: flex; flex-direction: column; gap: 8px;">
              <li>Open a new tab in Firefox and paste or enter <code>about:preferences</code> in the address bar.</li>
              <li>Under <strong>General &gt; Files and Applications &gt; Downloads</strong>:
                <ul style="margin-left: 16px; margin-top: 4px; display: flex; flex-direction: column; gap: 4px;">
                  <li><strong>Recommended:</strong> Check <em>"Always ask you where to save files"</em>.</li>
                  <li>Or click <strong>"Browse..."</strong> next to <em>Save files to</em> to choose a default folder.</li>
                </ul>
              </li>
              <li><strong>How Saving Works in Firefox:</strong> When you click <em>Save Character</em> or <em>Save As</em>, Firefox will show its confirmation prompt (<em>"Open with / Save File"</em>). Click <strong>OK</strong> and the standard Windows "Save As" file explorer dialog will immediately open so you can choose any directory or file name!</li>
            </ol>
            <p style="color: var(--text-muted); font-size: var(--font-size-secondary);">Tip: In Chromium browsers (Chrome, Edge, Opera, Brave), direct folder selection works via the File System Access API without the browser prompt step.</p>
          </div>
        `;
        modal.classList.add("active");
      } else {
        showToast("Firefox manages save folders in Settings > Downloads.", "info");
      }
    }
  },

  // Reset folder location back to project default
  resetFolderToDefault: async function() {
    this.activeDirectoryHandle = null;
    this.activeDirectoryName = null;
    this.currentFileHandle = null;
    await FolderStore.clearFolder();
    this.updateFolderUI();
    showToast("Folder location reset to project default.", "info");
  },

  // New Character: Resets model and UI to clean slate
  newHero: function() {
    if (this.hasUnsavedChanges()) {
      if (!this.confirmUnsavedChanges("create a new character")) {
        return;
      }
    } else {
      const msg = this.currentFileName 
        ? `Create a new hero? Current file "${this.currentFileName}" will be closed.` 
        : `Create a new hero sheet?`;
      if (!confirm(msg)) {
        return;
      }
    }

    char.reset();
    window.primaryHero = char;
    window.activeCompanionId = null;
    this.currentFileHandle = null;
    this.currentFileName = null;
    this.captureSavedSnapshot();
    this.updateFileStatusUI();
    populateUIFromCharacter();
    if (typeof updateAltSelectorUI === "function") {
      updateAltSelectorUI();
    }
    showToast("New hero sheet created.", "info");
  },

  fallbackDownload: function(content, filename) {
    // Using octet-stream data URI forces Firefox to trigger the OS Save As picker dialog
    const dataUri = 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(content);
    const a = document.createElement("a");
    a.href = dataUri;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) document.body.removeChild(a);
    }, 1000);
  }
};
window.FileManager = FileManager;

/* ==========================================================================
   FILE & TOOLBAR BUTTON BINDINGS
   ========================================================================== */

function setupFileHandlers() {
  const btnNew = document.getElementById("btnNewHero");
  const btnSave = document.getElementById("btnSaveHero");
  const btnSaveAs = document.getElementById("btnSaveAsHero");
  const btnLoad = document.getElementById("btnLoadHero");
  const fileInput = document.getElementById("fileLoadHero");
  const btnSetFolder = document.getElementById("btnSetCustomFolder");
  const btnResetFolder = document.getElementById("btnResetFolder");

  if (btnNew) btnNew.addEventListener("click", () => FileManager.newHero());
  if (btnSave) btnSave.addEventListener("click", () => FileManager.saveHero());
  if (btnSaveAs) btnSaveAs.addEventListener("click", () => FileManager.saveHeroAs());
  if (btnLoad) btnLoad.addEventListener("click", () => FileManager.loadHero());
  if (btnSetFolder) btnSetFolder.addEventListener("click", () => FileManager.setCustomFolder());
  if (btnResetFolder) btnResetFolder.addEventListener("click", () => FileManager.resetFolderToDefault());

  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!FileManager.confirmUnsavedChanges("load a different character")) {
        fileInput.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        try {
          const loadedData = JSON.parse(uploadEvent.target.result);
          applyLoadedCharacter(loadedData);
          FileManager.currentFileHandle = null;
          FileManager.currentFileName = file.name;
          FileManager.captureSavedSnapshot();
          FileManager.updateFileStatusUI();
          showToast(`Loaded "${file.name}" successfully!`, "success");
        } catch (err) {
          console.error("File load error:", err);
          showToast("Invalid character file format.", "error");
        }
      };
      reader.readAsText(file);
      fileInput.value = "";
    });
  }

  window.addEventListener("beforeunload", (e) => {
    if (typeof FileManager !== "undefined" && FileManager.hasUnsavedChanges()) {
      e.preventDefault();
      e.returnValue = "";
      return "";
    }
  });
}


/* ==========================================================================
   MINIONS, MECHA & ALTERNATE FORMS (ALTS) MANAGEMENT
   ========================================================================== */

function syncActiveCompanionToPrimary() {
  if (window.activeCompanionId && window.primaryHero) {
    const comp = (window.primaryHero.companions || []).find(c => c.id === window.activeCompanionId);
    if (comp) {
      comp.name = window.char.name;
      comp.powerLevel = window.char.powerLevel;
      comp.totalPointsAllowed = window.char.totalPointsAllowed;
      comp.data = window.char.serialize().character;
    }
  }
}
window.syncActiveCompanionToPrimary = syncActiveCompanionToPrimary;

function updateAltSelectorUI() {
  const sel = document.getElementById("selActiveCharacter");
  if (!sel) return;

  const hero = window.primaryHero || window.char;
  const comps = hero.companions || [];

  let html = `<option value="main" ${!window.activeCompanionId ? 'selected' : ''}>🦸 Primary Hero: ${escapeHtml(hero.name || 'Hero')}</option>`;

  if (comps.length > 0) {
    comps.forEach(c => {
      const icon = c.type === 'mecha' ? '🤖' : (c.type === 'minion' ? '👾' : '⚡');
      const isSel = window.activeCompanionId === c.id ? 'selected' : '';
      html += `<option value="${c.id}" ${isSel}>${icon} ${escapeHtml(c.name)} [PL ${c.powerLevel || 10}]</option>`;
    });
  }

  html += `<option disabled>──────────</option>`;
  html += `<option value="__add_minion">+ Add Minion...</option>`;
  html += `<option value="__add_alt_form">+ Add Alternate Form...</option>`;

  sel.innerHTML = html;
}
window.updateAltSelectorUI = updateAltSelectorUI;

function switchToCompanion(targetId) {
  syncActiveCompanionToPrimary();

  if (targetId === "main") {
    window.char = window.primaryHero;
    window.activeCompanionId = null;
    populateUIFromCharacter();
    updateAltSelectorUI();
  TablesPopoutManager.init();
    renderCompanionsTab();
    showToast("Switched to Primary Hero.", "info");
    return;
  }

  const hero = window.primaryHero || window.char;
  const comp = (hero.companions || []).find(c => c.id === targetId);
  if (!comp) return;

  window.activeCompanionId = comp.id;
  const newChar = new CharacterModel();
  newChar.deserialize(comp.data);
  newChar.name = comp.name;
  newChar.powerLevel = comp.powerLevel || hero.powerLevel;
  newChar.totalPointsAllowed = comp.totalPointsAllowed || (newChar.powerLevel * 15);
  newChar.isMecha = comp.type === 'mecha';
  newChar.isMinion = comp.type === 'minion';
  newChar.isAltForm = comp.type === 'alt_form';
  newChar.altType = comp.type;
  newChar.altParentHeroName = hero.name;

  window.char = newChar;
  populateUIFromCharacter();
  updateAltSelectorUI();
  renderCompanionsTab();
  showToast(`Switched to ${comp.name}.`, "info");
}
window.switchToCompanion = switchToCompanion;

function createNewCompanion(type, customName = "") {
  syncActiveCompanionToPrimary();
  const hero = window.primaryHero || window.char;
  const entry = hero.addCompanion(type, customName);
  updateAltSelectorUI();
  switchToCompanion(entry.id);
  renderCompanionsTab();
  showToast(`Created ${entry.type}: ${entry.name}`, "success");
}
window.createNewCompanion = createNewCompanion;

function deleteCurrentAlt() {
  if (!window.activeCompanionId || !window.primaryHero) return;
  const comp = (window.primaryHero.companions || []).find(c => c.id === window.activeCompanionId);
  if (!comp) return;

  if (confirm(`Are you sure you want to delete "${comp.name}"?`)) {
    window.primaryHero.removeCompanion(comp.id);
    switchToCompanion("main");
    renderCompanionsTab();
    showToast("Deleted companion form.", "info");
  }
}
window.deleteCurrentAlt = deleteCurrentAlt;

function renderCompanionsTab() {
  const container = document.getElementById("companionsListContainer");
  if (!container) return;

  const hero = window.primaryHero || window.char;
  const comps = hero.companions || [];

  let html = "";

  // 1. Primary Hero Card
  const heroPP = hero.powerPointsSummary ? hero.powerPointsSummary.totalSpent : 0;
  const heroAllowed = hero.totalPointsAllowed || (hero.powerLevel * 15);
  const isHeroActive = !window.activeCompanionId;

  html += `
    <div class="companion-card" style="${isHeroActive ? 'border: 2px solid var(--accent-primary); background: rgba(37,99,235,0.04);' : ''}">
      <div class="companion-card-header">
        <span class="companion-card-title">🦸 ${escapeHtml(hero.name || 'Hero')}</span>
        <span class="companion-type-badge" style="background: rgba(37,99,235,0.15); color: var(--accent-primary);">PRIMARY HERO</span>
      </div>
      <div style="font-size: 10pt; color: var(--text-muted);">
        <strong>Power Level:</strong> ${hero.powerLevel || 10} • <strong>Points:</strong> ${heroPP} / ${heroAllowed} PP
      </div>
      <div style="margin-top: 8px;">
        ${isHeroActive ? '<span style="font-size: 10pt; font-weight: bold; color: var(--accent-primary);">● Currently Active</span>' : `<button type="button" class="btn btn-secondary btn-sm" onclick="switchToCompanion('main')">Switch to Primary Hero</button>`}
      </div>
    </div>
  `;

  // 2. Each Companion
  if (comps.length === 0) {
    html += `<div style="grid-column: 1 / -1; font-style: italic; color: var(--text-muted); padding: 12px 0;">No minions or alternate forms added yet. Click an Add button above to create one.</div>`;
  } else {
    comps.forEach(c => {
      const isCompActive = window.activeCompanionId === c.id;
      const icon = c.type === 'mecha' ? '🤖' : (c.type === 'minion' ? '👾' : '⚡');
      const typeLabel = c.type === 'mecha' ? 'MECHA' : (c.type === 'minion' ? 'MINION' : 'ALT FORM');
      const budget = c.totalPointsAllowed || (c.powerLevel * 15);

      html += `
        <div class="companion-card" style="${isCompActive ? 'border: 2px solid var(--accent-primary); background: rgba(37,99,235,0.04);' : ''}">
          <div class="companion-card-header">
            <span class="companion-card-title">${icon} ${escapeHtml(c.name)}</span>
            <span class="companion-type-badge ${c.type}">${typeLabel}</span>
          </div>
          <div style="font-size: 10pt; color: var(--text-muted);">
            <strong>Power Level:</strong> ${c.powerLevel || 10} • <strong>Budget:</strong> ${budget} PP
          </div>
          <div style="display: flex; gap: 8px; align-items: center; margin-top: 8px;">
            ${isCompActive ? '<span style="font-size: 10pt; font-weight: bold; color: var(--accent-primary);">● Currently Active</span>' : `<button type="button" class="btn btn-secondary btn-sm" onclick="switchToCompanion('${c.id}')">Edit Form</button>`}
            <button type="button" class="btn btn-sm" style="background: rgba(239,68,68,0.1); color: #ef4444; border: 1px solid rgba(239,68,68,0.3); padding: 2px 8px;" onclick="if(confirm('Delete ${escapeHtml(c.name)}?')){ window.primaryHero.removeCompanion('${c.id}'); if(window.activeCompanionId === '${c.id}') switchToCompanion('main'); else { updateAltSelectorUI(); renderCompanionsTab(); } }">Delete</button>
          </div>
        </div>
      `;
    });
  }

  container.innerHTML = html;
}
window.renderCompanionsTab = renderCompanionsTab;

/* ==========================================================================
   MAIN MENU & HEADER BUTTON BINDINGS
   ========================================================================== */




/* ==========================================================================
   HELP & TAB GUIDE MODAL MANAGER (F1 & MAIN MENU)
   ========================================================================== */
const HelpModalManager = {
  storageKey: "mm4e_help_bounds",
  storageStateKey: "mm4e_help_popped_out",
  defaultBounds: { width: 1060, height: 860, left: 120, top: 60 },

  isPoppedOutSaved() {
    try {
      return localStorage.getItem(this.storageStateKey) === "true";
    } catch (e) {
      return false;
    }
  },

  setPoppedOutSaved(val) {
    try {
      if (val) localStorage.setItem(this.storageStateKey, "true");
      else localStorage.removeItem(this.storageStateKey);
    } catch (e) {}
  },
  win: null,
  placeholder: null,
  pollTimer: null,
  activeFilter: "",
  activeContentEl: null,
  parentContainer: null,
  isRedocking: false,
  f1Enabled: true,
  f1Conflict: false,

  getModalOverlay() {
    return document.getElementById("modalHelpGuide");
  },

  getContentEl() {
    if (this.activeContentEl && this.activeContentEl.ownerDocument) {
      return this.activeContentEl;
    }
    let el = document.getElementById("helpDockableBody");
    if (!el && this.win && !this.win.closed) {
      try {
        el = this.win.document.getElementById("helpDockableBody");
      } catch (e) {}
    }
    if (el) {
      this.activeContentEl = el;
      if (el.parentNode && el.parentNode.classList && el.parentNode.classList.contains("help-modal-dialog")) {
        this.parentContainer = el.parentNode;
      }
    }
    return this.activeContentEl;
  },

  getPopoutBtn() {
    return document.getElementById("btnPopoutHelp");
  },

  getSearchInput() {
    return document.getElementById("txtHelpFilter");
  },

  isOpenModal() {
    const modal = this.getModalOverlay();
    return modal && modal.style.display === "flex";
  },

  isPoppedOut() {
    return !!(this.win && !this.win.closed);
  },

  updateHeaderBtnState() {
    const btn = document.getElementById("btnOpenHelpModal");
    if (!btn) return;
    if (this.isPoppedOut()) {
      btn.title = "Help Manual is open in pop-out window (Click to bring to front)";
      btn.classList.add("btn-popped-out-active");
    } else {
      btn.title = this.isPoppedOutSaved() ? "Open Help Manual & Tab Guide (Pop-Out) (F1)" : "Open Help Manual & Tab Guide (F1)";
      btn.classList.remove("btn-popped-out-active");
    }
  },

  getSavedBounds() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object") {
          let w = Math.max(480, Math.min(window.screen.availWidth || 2560, Number(parsed.width) || this.defaultBounds.width));
          let h = Math.max(380, Math.min(window.screen.availHeight || 1440, Number(parsed.height) || this.defaultBounds.height));
          let l = Number(parsed.left);
          let t = Number(parsed.top);
          if (isNaN(l) || l < -1000 || l > (window.screen.availWidth || 2560)) l = this.defaultBounds.left;
          if (isNaN(t) || t < -1000 || t > (window.screen.availHeight || 1440)) t = this.defaultBounds.top;
          return { width: Math.round(w), height: Math.round(h), left: Math.round(l), top: Math.round(t) };
        }
      }
    } catch (e) {}
    return { ...this.defaultBounds };
  },

  saveBounds() {
    if (!this.win || this.win.closed) return;
    try {
      const x = this.win.screenX !== undefined ? this.win.screenX : this.win.screenLeft;
      const y = this.win.screenY !== undefined ? this.win.screenY : this.win.screenTop;
      const w = this.win.outerWidth || this.win.innerWidth;
      const h = this.win.outerHeight || this.win.innerHeight;
      if (typeof x === "number" && typeof y === "number" && typeof w === "number" && typeof h === "number" &&
          !isNaN(x) && !isNaN(y) && !isNaN(w) && !isNaN(h) && w >= 360 && h >= 240) {
        const bounds = { width: Math.round(w), height: Math.round(h), left: Math.round(x), top: Math.round(y) };
        localStorage.setItem(this.storageKey, JSON.stringify(bounds));
      }
    } catch (e) {}
  },

  ensureDocked() {
    const contentEl = this.getContentEl();
    const parent = this.parentContainer || (document.getElementById("modalHelpGuide") ? document.getElementById("modalHelpGuide").querySelector(".help-modal-dialog") : null);
    if (!contentEl || !parent) return;

    if (contentEl.ownerDocument === document && contentEl.parentNode === parent) {
      if (this.placeholder && this.placeholder.parentNode) {
        this.placeholder.remove();
        this.placeholder = null;
      }
      return;
    }

    try {
      if (document.adoptNode && contentEl.ownerDocument !== document) {
        document.adoptNode(contentEl);
      }
    } catch (e) {}

    if (this.placeholder && this.placeholder.parentNode) {
      this.placeholder.parentNode.insertBefore(contentEl, this.placeholder);
      this.placeholder.remove();
      this.placeholder = null;
    } else {
      parent.appendChild(contentEl);
    }
    contentEl.style.display = "flex";
  },

  isF1Enabled() {
    return localStorage.getItem("mm4e_f1_help_enabled") !== "false";
  },

  setF1Enabled(enabled, reason) {
    if (enabled) {
      this.f1Enabled = true;
      this.f1Conflict = false;
      localStorage.removeItem("mm4e_f1_help_enabled");
      localStorage.removeItem("mm4e_f1_conflict_reason");
      if (typeof showToast === "function") showToast("F1 Help shortcut enabled.", "info");
    } else {
      this.f1Enabled = false;
      localStorage.setItem("mm4e_f1_help_enabled", "false");
      if (reason) {
        this.f1Conflict = true;
        localStorage.setItem("mm4e_f1_conflict_reason", reason);
        if (typeof showToast === "function") {
          showToast(`F1 mapping conflict detected (${reason}). F1 Help shortcut disabled. Use Main Menu > Help anytime.`, "warning");
        }
      } else {
        if (typeof showToast === "function") showToast("F1 Help shortcut disabled.", "info");
      }
    }
    this.updateF1UI();
  },

  disableF1(reason) {
    this.setF1Enabled(false, reason || "Conflict detected");
  },

  updateF1UI() {
    const isEnabled = this.isF1Enabled();
    const conflictReason = localStorage.getItem("mm4e_f1_conflict_reason");

    const badge = document.getElementById("lblF1HelpBadge");
    if (badge) {
      if (isEnabled) {
        badge.textContent = "(F1)";
        badge.style.color = "";
        badge.style.opacity = "0.7";
      } else {
        badge.textContent = conflictReason ? "(F1 Off)" : "(F1 Off)";
        badge.style.color = "var(--accent-warning, #f59e0b)";
        badge.style.opacity = "1";
      }
    }

    const chk = document.getElementById("chkEnableF1Help");
    if (chk) chk.checked = isEnabled;

    const notice = document.getElementById("lblF1ConflictNotice");
    if (notice) {
      if (conflictReason) {
        notice.style.display = "block";
        notice.textContent = `⚠️ F1 disabled due to browser/OS conflict: ${conflictReason}`;
      } else {
        notice.style.display = "none";
      }
    }

    const contentEl = this.getContentEl();
    const activeDoc = contentEl && contentEl.ownerDocument ? contentEl.ownerDocument : document;
    const modalStatus = activeDoc.getElementById("lblHelpF1Status");
    if (modalStatus) {
      if (isEnabled) {
        modalStatus.innerHTML = `<span style="color: #10b981;">●</span> F1 Shortcut: <strong>Active</strong>`;
      } else if (conflictReason) {
        modalStatus.innerHTML = `<span style="color: #f59e0b;">⚠️</span> F1 Shortcut: <strong>Disabled (${conflictReason})</strong> <button type="button" class="btn btn-secondary btn-sm" id="btnReenableF1" style="padding: 1px 6px; font-size: 10pt; margin-left: 6px;">Test &amp; Re-enable</button>`;
        const btnRe = modalStatus.querySelector("#btnReenableF1");
        if (btnRe) btnRe.onclick = () => this.setF1Enabled(true);
      } else {
        modalStatus.innerHTML = `<span style="color: var(--text-muted);">○</span> F1 Shortcut: <strong>Disabled</strong> <button type="button" class="btn btn-secondary btn-sm" id="btnReenableF1" style="padding: 1px 6px; font-size: 10pt; margin-left: 6px;">Enable</button>`;
        const btnRe = modalStatus.querySelector("#btnReenableF1");
        if (btnRe) btnRe.onclick = () => this.setF1Enabled(true);
      }
    }
  },

  openModal(tabTarget, forceDocked = false) {
    if (this.isPoppedOut()) {
      try {
        this.win.focus();
      } catch (e) {}
      if (typeof showToast === "function") {
        showToast("Help Manual window focused.", "info");
      }
      if (tabTarget) {
        this.scrollToSection(tabTarget);
      }
      return;
    }

    if (!forceDocked && this.isPoppedOutSaved()) {
      this.popout(tabTarget);
      return;
    }

    this.ensureDocked();
    const modal = this.getModalOverlay();
    if (modal) {
      modal.style.display = "flex";
      this.updateF1UI();
      if (tabTarget) {
        this.scrollToSection(tabTarget);
      } else {
        const input = document.getElementById("txtHelpFilter");
        if (input) {
          input.value = this.activeFilter;
          this.filterTopics(this.activeFilter);
          setTimeout(() => input.focus(), 60);
        }
      }
    }
  },

  closeModal(fromPopout = false) {
    const modal = this.getModalOverlay();
    if (modal) modal.style.display = "none";
    if (!fromPopout && !this.isPoppedOut()) {
      this.setPoppedOutSaved(false);
    }
  },

  toggleModal() {
    if (this.isPoppedOut()) {
      try { this.win.focus(); } catch (e) {}
      return;
    }
    if (this.isPoppedOutSaved()) {
      this.popout();
      return;
    }
    if (this.isOpenModal()) this.closeModal();
    else this.openModal();
  },

  scrollToSection(sectionId) {
    const contentEl = this.getContentEl();
    const activeDoc = contentEl && contentEl.ownerDocument ? contentEl.ownerDocument : document;
    const el = activeDoc.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.classList.add("highlight-pulse");
      setTimeout(() => el.classList.remove("highlight-pulse"), 1500);

      activeDoc.querySelectorAll(".help-pill").forEach(p => {
        if (p.dataset.target === sectionId) p.classList.add("active");
        else p.classList.remove("active");
      });
    }
  },

  filterTopics(query) {
    this.activeFilter = query || "";
    const contentEl = this.getContentEl();
    const activeDoc = contentEl && contentEl.ownerDocument ? contentEl.ownerDocument : document;
    const q = (query || "").trim().toLowerCase();
    const cards = activeDoc.querySelectorAll(".help-topic-card");
    cards.forEach(card => {
      if (!q) {
        card.style.display = "";
        return;
      }
      const text = card.textContent.toLowerCase();
      if (text.includes(q)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  },

  popout(tabTarget) {
    if (this.isPoppedOut()) {
      try { this.win.focus(); } catch (e) {}
      if (tabTarget) this.scrollToSection(tabTarget);
      return;
    }

    this.ensureDocked();
    const contentEl = this.getContentEl();
    if (!contentEl) return;

    if (!this.parentContainer) {
      this.parentContainer = contentEl.parentNode || (document.getElementById("modalHelpGuide") ? document.getElementById("modalHelpGuide").querySelector(".help-modal-dialog") : null);
    }

    const bounds = this.getSavedBounds();
    const features = `popup=yes,width=${bounds.width},height=${bounds.height},left=${bounds.left},top=${bounds.top},resizable=yes,scrollbars=yes`;

    try {
      this.win = window.open("", "_blank", features);
    } catch (err) {
      console.warn("Popout window open error:", err);
    }

    if (!this.win || this.win.closed || typeof this.win.closed === "undefined") {
      alert("Pop-out window was blocked by your browser. Please allow popups for this page.");
      this.setPoppedOutSaved(false);
      this.openModal(tabTarget, true);
      return;
    }

    this.setPoppedOutSaved(true);

    const popDoc = this.win.document;
    const baseHref = document.baseURI || window.location.href || "";

    popDoc.open();
    popDoc.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>📖 Hero Builder Manual &amp; Tab Guide - M&amp;M 4E</title>
  ${baseHref ? `<base href="${baseHref}">` : ""}
</head>
<body class="popout-help-body">
  <div class="popout-help-header" id="popoutHelpHeader">
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 16px;">📖</span>
      <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: var(--accent-primary);">Hero Builder Manual &amp; Tab Guide</h3>
    </div>
    <div style="display: flex; align-items: center; gap: 8px; flex: 1; max-width: 360px; margin: 0 12px;">
      <input type="text" id="txtPopoutHelpFilter" placeholder="🔍 Search help topics..." value="${(this.activeFilter || "").replace(/"/g, "&quot;")}" style="width: 100%; height: 28px; font-size: 10pt; padding: 2px 8px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-panel); color: var(--text-main);">
    </div>
    <div style="display: flex; align-items: center; gap: 6px;">
      <button type="button" class="btn btn-secondary btn-sm" id="btnPopoutHelpRedock" title="Redock back to main builder window">⬅ Redock</button>
      <button type="button" class="btn btn-secondary btn-sm" id="btnPopoutHelpClose" title="Close window">✕ Close</button>
    </div>
  </div>
  <div class="popout-help-container" id="popoutHelpMountContainer"></div>
</body>
</html>`);
    popDoc.close();

    // Copy stylesheet and style tags from parent
    document.querySelectorAll('link[rel="stylesheet"], style').forEach(node => {
      try {
        popDoc.head.appendChild(popDoc.importNode ? popDoc.importNode(node, true) : node.cloneNode(true));
      } catch (e) {}
    });

    // Mirror data-theme
    const curTheme = document.documentElement.getAttribute("data-theme") || "dark";
    popDoc.documentElement.setAttribute("data-theme", curTheme);
    popDoc.body.setAttribute("data-theme", curTheme);

    // Setup placeholder and move DOM element
    if (!this.placeholder) {
      this.placeholder = document.createComment("helpDockableBody-placeholder");
    }
    if (contentEl.parentNode) {
      contentEl.parentNode.insertBefore(this.placeholder, contentEl);
    }
    const mount = popDoc.getElementById("popoutHelpMountContainer");
    if (mount) {
      try {
        if (popDoc.adoptNode) popDoc.adoptNode(contentEl);
      } catch (e) {}
      mount.appendChild(contentEl);
      contentEl.style.display = "";
    }

    // Completely close the main window modal overlay so no popup or backdrop is left behind
    this.closeModal();

    this.updateHeaderBtnState();
    this.updateF1UI();

    // Track geometry
    if (this.pollTimer) clearInterval(this.pollTimer);
    this.pollTimer = setInterval(() => {
      if (this.win && !this.win.closed) {
        this.saveBounds();
      } else {
        clearInterval(this.pollTimer);
        this.pollTimer = null;
        this.redock({ openMainModal: false });
      }
    }, 500);

    // Listeners in popout
    this.win.addEventListener("resize", () => this.saveBounds());
    this.win.addEventListener("beforeunload", () => {
      this.saveBounds();
      this.redock({ openMainModal: false });
    });
    this.win.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.redock({ openMainModal: false });
      }
    });
    this.win.addEventListener("wheel", (e) => {
      const popBody = popDoc.getElementById("helpModalBody");
      if (popBody && !popBody.contains(e.target)) {
        popBody.scrollTop += e.deltaY;
      }
    }, { passive: true });

    const popFilterInput = popDoc.getElementById("txtPopoutHelpFilter");
    if (popFilterInput) {
      popFilterInput.addEventListener("input", (e) => {
        this.activeFilter = e.target.value;
        const mainInput = this.getSearchInput();
        if (mainInput) mainInput.value = this.activeFilter;
        this.filterTopics(this.activeFilter);
      });
    }

    const btnRedock = popDoc.getElementById("btnPopoutHelpRedock");
    if (btnRedock) {
      btnRedock.addEventListener("click", () => this.redock({ openMainModal: true }));
    }

    const btnClose = popDoc.getElementById("btnPopoutHelpClose");
    if (btnClose) {
      btnClose.addEventListener("click", () => {
        this.redock({ openMainModal: false });
      });
    }

    this.filterTopics(this.activeFilter);
  },

  redock(options = {}) {
    if (this.isRedocking) return;
    this.isRedocking = true;

    try {
      if (this.pollTimer) {
        clearInterval(this.pollTimer);
        this.pollTimer = null;
      }

      this.ensureDocked();

      if (this.win && !this.win.closed) {
        try {
          this.win.close();
        } catch (e) {}
      }
      this.win = null;

      this.updateHeaderBtnState();
      this.updateF1UI();

      const mainInput = this.getSearchInput();
      if (mainInput) {
        mainInput.value = this.activeFilter;
      }
      this.filterTopics(this.activeFilter);

      if (options.openMainModal) {
        this.setPoppedOutSaved(false);
        this.openModal(null, true);
      } else {
        this.closeModal(true);
      }
    } finally {
      this.isRedocking = false;
    }
  },

  init() {
    const btnMenu = document.getElementById("btnOpenHelpModal");
    const btnClose = document.getElementById("btnCloseHelpModal");
    const btnPopout = document.getElementById("btnPopoutHelp");
    const modal = this.getModalOverlay();
    const filterInput = document.getElementById("txtHelpFilter");

    if (btnMenu && !btnMenu.__helpBound) {
      btnMenu.__helpBound = true;
      btnMenu.addEventListener("click", () => this.openModal());
    }

    if (btnClose && !btnClose.__helpBound) {
      btnClose.__helpBound = true;
      btnClose.addEventListener("click", () => this.closeModal());
    }

    if (btnPopout && !btnPopout.__helpBound) {
      btnPopout.__helpBound = true;
      btnPopout.addEventListener("click", () => this.popout());
    }

    if (modal && !modal.__helpBound) {
      modal.__helpBound = true;
      modal.addEventListener("click", (e) => {
        if (e.target === modal) this.closeModal();
      });
      const dialog = modal.querySelector(".help-modal-dialog");
      if (dialog && !dialog.__wheelBound) {
        dialog.__wheelBound = true;
        dialog.addEventListener("wheel", (e) => {
          const body = document.getElementById("helpModalBody");
          if (body && !body.contains(e.target)) {
            body.scrollTop += e.deltaY;
          }
        }, { passive: true });
      }
    }

    if (filterInput && !filterInput.__helpBound) {
      filterInput.__helpBound = true;
      filterInput.addEventListener("input", (e) => {
        this.filterTopics(e.target.value);
      });
    }

    // Quick jump pills
    document.querySelectorAll(".help-pill").forEach(pill => {
      if (pill.__helpBound) return;
      pill.__helpBound = true;
      pill.addEventListener("click", () => {
        const target = pill.dataset.target;
        if (target) this.scrollToSection(target);
      });
    });

    // Global keyboard listener for F1 with conflict detection & Esc to close
    if (!document.__helpKeyBound) {
      document.__helpKeyBound = true;
      window.addEventListener("keydown", (e) => {
        if (e.key === "F1" || e.keyCode === 112) {
          if (!this.isF1Enabled()) {
            return;
          }

          let conflictReason = null;

          if (e.defaultPrevented) {
            conflictReason = "Pre-intercepted by browser/extension";
          }

          try {
            e.preventDefault();
            e.stopPropagation();
          } catch (err) {
            conflictReason = err && err.message ? err.message : "preventDefault error";
          }

          if (!e.defaultPrevented) {
            conflictReason = "Browser rejected event cancellation";
          }

          if (conflictReason) {
            console.warn("F1 conflict detected:", conflictReason);
            this.disableF1(conflictReason);
            return;
          }

          // Monitor if the browser seized focus anyway (e.g. Edge/Windows Help popup)
          if (this.activeBlurConflictHandler) {
            clearTimeout(this.activeBlurTimeout);
            window.removeEventListener("blur", this.activeBlurConflictHandler);
          }
          this.activeBlurConflictHandler = () => {
            clearTimeout(this.activeBlurTimeout);
            window.removeEventListener("blur", this.activeBlurConflictHandler);
            this.activeBlurConflictHandler = null;
            console.warn("F1 conflict: window lost focus immediately upon F1 keypress.");
            this.disableF1("OS/Browser intercepted F1");
          };
          this.activeBlurTimeout = setTimeout(() => {
            if (this.activeBlurConflictHandler) {
              window.removeEventListener("blur", this.activeBlurConflictHandler);
              this.activeBlurConflictHandler = null;
            }
          }, 300);
          window.addEventListener("blur", this.activeBlurConflictHandler, { once: true });

          this.toggleModal();
        } else if (e.key === "Escape" && this.isOpenModal()) {
          this.closeModal();
        }
      });
    }

    this.updateF1UI();
    this.updateHeaderBtnState();
  }
};
window.HelpModalManager = HelpModalManager;


// --- UPDATE CHECKER SYSTEM (FOR LOCAL & OFFLINE USERS) ---
const UpdateCheckerManager = {
  currentVersion: "1.4.2",
  buildDate: "2026-10-22",
  githubRepo: "https://github.com/captainload/mm4e-hero-builder",
  rawVersionUrl: "https://raw.githubusercontent.com/captainload/mm4e-hero-builder/main/version.json",
  commitApiUrl: "https://api.github.com/repos/captainload/mm4e-hero-builder/commits/main",
  downloadZipUrl: "https://github.com/captainload/mm4e-hero-builder/archive/refs/heads/main.zip",

  init() {
    const btnCheck = document.getElementById("btnCheckUpdates");
    const btnOptionsCheck = document.getElementById("btnOptionsCheckUpdates");
    const btnClose = document.getElementById("btnUpdateModalClose");
    const modal = document.getElementById("updateModal");

    if (btnCheck && !btnCheck.__updateBound) {
      btnCheck.__updateBound = true;
      btnCheck.addEventListener("click", () => {
        const mainMenuDropdown = document.getElementById("mainMenuDropdown");
        if (mainMenuDropdown) mainMenuDropdown.style.display = "none";
        this.check(false);
      });
    }

    if (btnOptionsCheck && !btnOptionsCheck.__updateBound) {
      btnOptionsCheck.__updateBound = true;
      btnOptionsCheck.addEventListener("click", () => {
        this.check(false);
      });
    }

    if (btnClose && !btnClose.__updateBound) {
      btnClose.__updateBound = true;
      btnClose.addEventListener("click", () => this.close());
    }

    if (modal && !modal.__updateBound) {
      modal.__updateBound = true;
      modal.addEventListener("click", (e) => {
        if (e.target === modal) this.close();
      });
    }

    if (!document.__updateEscBound) {
      document.__updateEscBound = true;
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal && modal.style.display !== "none") {
          this.close();
        }
      });
    }

    // Top update banner buttons
    const btnBannerView = document.getElementById("btnBannerViewUpdate");
    if (btnBannerView && !btnBannerView.__bound) {
      btnBannerView.__bound = true;
      btnBannerView.addEventListener("click", () => {
        this.check(false);
      });
    }

    const btnBannerDismiss = document.getElementById("btnBannerDismiss");
    if (btnBannerDismiss && !btnBannerDismiss.__bound) {
      btnBannerDismiss.__bound = true;
      btnBannerDismiss.addEventListener("click", () => {
        const banner = document.getElementById("appUpdateBanner");
        if (banner) banner.style.display = "none";
      });
    }

    // Options auto check toggle
    const chkAutoCheck = document.getElementById("chkAutoCheckUpdates");
    const autoCheckPref = localStorage.getItem("mm4e_auto_check_updates") !== "false";
    if (chkAutoCheck) {
      chkAutoCheck.checked = autoCheckPref;
      if (!chkAutoCheck.__bound) {
        chkAutoCheck.__bound = true;
        chkAutoCheck.addEventListener("change", () => {
          localStorage.setItem("mm4e_auto_check_updates", chkAutoCheck.checked ? "true" : "false");
        });
      }
    }

    // Check for updates automatically on startup when enabled
    if (autoCheckPref && typeof window !== "undefined") {
      setTimeout(() => this.check(true, true), 1200);
    }
  },

  open() {
    const modal = document.getElementById("updateModal");
    if (modal) modal.style.display = "flex";
  },

  close() {
    const modal = document.getElementById("updateModal");
    if (modal) modal.style.display = "none";
  },

  compareVersions(vA, vB) {
    const pA = String(vA).replace(/^v/i, '').split('.').map(n => parseInt(n) || 0);
    const pB = String(vB).replace(/^v/i, '').split('.').map(n => parseInt(n) || 0);
    for (let i = 0; i < Math.max(pA.length, pB.length); i++) {
      const a = pA[i] || 0;
      const b = pB[i] || 0;
      if (a > b) return 1;
      if (a < b) return -1;
    }
    return 0;
  },

  safeEscape(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  },

  updateStatusBadge(text, isNew = false) {
    const badge = document.getElementById("lblUpdateStatusBadge");
    if (badge) {
      badge.textContent = text;
      badge.style.color = isNew ? "#10b981" : "var(--text-muted)";
      badge.style.fontWeight = isNew ? "700" : "normal";
    }
  },

  async check(silent = false, isStartup = false) {
    const modalBody = document.getElementById("updateModalBody");
    if (!silent) {
      this.open();
      if (modalBody) {
        modalBody.innerHTML = `
          <div style="text-align: center; padding: 24px 12px;">
            <div style="font-size: 34px; animation: spin 1.2s linear infinite; display: inline-block;">🔄</div>
            <div style="font-size: 11.5pt; font-weight: 700; margin-top: 14px; color: var(--text-main);">Checking for Updates...</div>
            <div style="font-size: 10pt; color: var(--text-muted); margin-top: 4px;">Connecting to GitHub (Current: v${this.currentVersion})...</div>
          </div>
        `;
      }
    }

    try {
      let remoteData = null;
      let checkSource = "version_json";

      // 1. First try fetching version.json directly with cache-busting
      try {
        const resp = await fetch(`${this.rawVersionUrl}?_t=${Date.now()}`, { cache: "no-store" });
        if (resp.ok) {
          remoteData = await resp.json();
        }
      } catch (err) {}

      // 2. If version.json failed or returned 404, fall back to GitHub commits API
      if (!remoteData || !remoteData.version) {
        try {
          const resp = await fetch(`${this.commitApiUrl}?_t=${Date.now()}`, {
            headers: { 'Accept': 'application/vnd.github.v3+json' },
            cache: "no-store"
          });
          if (resp.ok) {
            const commitData = await resp.json();
            checkSource = "commit_api";
            remoteData = {
              version: this.currentVersion,
              commitSha: commitData.sha ? commitData.sha.substring(0, 7) : null,
              commitDate: commitData.commit?.committer?.date,
              commitMessage: commitData.commit?.message?.split("\n")[0] || ""
            };
          }
        } catch (err) {}
      }

      if (!remoteData) {
        throw new Error("Unable to reach GitHub. Please check your network connection.");
      }

      localStorage.setItem("mm4e_last_update_check", new Date().toISOString());

      if (checkSource === "version_json") {
        const isNewer = this.compareVersions(remoteData.version, this.currentVersion) > 0;
        const isSameVersionNewerBuild = this.compareVersions(remoteData.version, this.currentVersion) === 0 && 
                                        remoteData.buildDate && remoteData.buildDate > this.buildDate;

        if (isNewer || isSameVersionNewerBuild) {
          this.notifyUpdateAvailable(remoteData, silent, isStartup);
        } else {
          this.updateStatusBadge("Up to date");
          if (!silent) {
            this.renderUpToDate(remoteData);
          }
        }
      } else {
        const commitDate = remoteData.commitDate ? new Date(remoteData.commitDate) : null;
        const localBuildDate = new Date(this.buildDate);
        const isCommitNewer = commitDate && commitDate > localBuildDate;

        if (isCommitNewer) {
          this.notifyCommitUpdateAvailable(remoteData, silent, isStartup);
        } else {
          this.updateStatusBadge("Up to date");
          if (!silent) {
            this.renderUpToDate(remoteData);
          }
        }
      }

    } catch (err) {
      if (!silent) {
        this.renderError(err.message);
      } else {
        this.updateStatusBadge("Offline");
      }
    }
  },

  notifyUpdateAvailable(data, silent, isStartup = false) {
    this.updateStatusBadge("NEW v" + data.version, true);

    const btnCheck = document.getElementById("btnCheckUpdates");
    if (btnCheck && !document.getElementById("badgeNewUpdate")) {
      const badge = document.createElement("span");
      badge.id = "badgeNewUpdate";
      badge.className = "badge";
      badge.style.background = "#10b981";
      badge.style.color = "#ffffff";
      badge.style.fontSize = "10pt";
      badge.style.marginLeft = "auto";
      badge.style.padding = "1px 6px";
      badge.textContent = "NEW";
      btnCheck.appendChild(badge);
    }

    const btnMainMenu = document.getElementById("btnMainMenu");
    if (btnMainMenu && !document.getElementById("dotMainMenuUpdate")) {
      const dot = document.createElement("span");
      dot.id = "dotMainMenuUpdate";
      dot.className = "main-menu-update-dot";
      dot.title = "An update is available!";
      btnMainMenu.appendChild(dot);
    }

    // Top update banner
    const banner = document.getElementById("appUpdateBanner");
    const bannerText = document.getElementById("appUpdateBannerText");
    if (banner && bannerText) {
      bannerText.innerHTML = `A new version (<strong>v${this.safeEscape(data.version)}</strong>) of Mutants &amp; Masterminds 4E Hero Builder is available!`;
      banner.style.display = "flex";
    }

    if (isStartup || !silent) {
      this.open();
      this.renderUpdateAvailable(data);
    } else {
      if (typeof showToast === "function") {
        showToast(`🎉 New update available: v${data.version}! Open Main Menu to update.`, "success", 5000);
      }
    }
  },

  notifyCommitUpdateAvailable(data, silent, isStartup = false) {
    this.updateStatusBadge("Update ready", true);

    const banner = document.getElementById("appUpdateBanner");
    const bannerText = document.getElementById("appUpdateBannerText");
    if (banner && bannerText) {
      bannerText.innerHTML = `New updates are available on GitHub! (${this.safeEscape(data.commitSha || "main")})`;
      banner.style.display = "flex";
    }

    if (isStartup || !silent) {
      this.open();
      this.renderCommitUpdateAvailable(data);
    } else {
      if (typeof showToast === "function") {
        showToast("New updates are available on GitHub! Open Main Menu to update.", "info", 5000);
      }
    }
  },

  renderCommitUpdateAvailable(data) {
    const modalBody = document.getElementById("updateModalBody");
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 6px; padding: 10px 14px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 24px;">🎉</span>
          <div>
            <div style="font-weight: 700; color: #10b981; font-size: 11pt;">New GitHub Updates Available</div>
            <div style="font-size: 10pt; color: var(--text-muted); margin-top: 1px;">
              Latest Commit: <strong>${this.safeEscape(data.commitSha || "main")}</strong> (${this.safeEscape(data.commitDate ? data.commitDate.slice(0, 10) : "")})
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <button type="button" class="btn btn-primary" onclick="window.reloadApp()" style="padding: 6px 14px; font-size: 10pt; display: inline-flex; align-items: center; gap: 6px;">
            ⟳ Reload App
          </button>
        </div>
      </div>

      <div class="update-grid-container" style="margin-bottom: 14px;">
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 12px 14px; display: flex; flex-direction: column;">
          <div style="font-weight: 700; font-size: 10.5pt; margin-bottom: 8px; color: var(--text-main); display: flex; align-items: center; gap: 6px;">
            <span>📝</span> Latest Commit Message:
          </div>
          <div style="font-size: 10pt; color: var(--text-main); font-style: italic; background: rgba(0,0,0,0.15); padding: 8px 10px; border-radius: 4px; border-left: 3px solid var(--accent-primary);">
            "${this.safeEscape(data.commitMessage)}"
          </div>
          <div style="margin-top: 10px; font-size: 10pt; color: var(--text-muted);">
            Your local installation build date is <strong>${this.safeEscape(this.buildDate)}</strong>.
          </div>
        </div>

        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 12px 14px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-weight: 700; font-size: 10.5pt; margin-bottom: 8px; color: var(--accent-primary); display: flex; align-items: center; gap: 6px;">
              <span>📦</span> Local Update Instructions:
            </div>
            <ol style="margin: 0; padding-left: 20px; font-size: 10pt; color: var(--text-muted); line-height: 1.45;">
              <li>Download the latest ZIP or pull with git.</li>
              <li>Extract and replace files in your local folder.</li>
              <li>Click <strong>Reload App</strong> or relaunch with <code>Launch Hero Builder.bat</code>.</li>
            </ol>
          </div>
          <div style="margin-top: 10px; padding: 6px 10px; background: rgba(37, 99, 235, 0.08); border: 1px solid rgba(37, 99, 235, 0.2); border-radius: 4px; font-size: 10pt; color: var(--text-muted);">
            🔒 <em>Your saved character files (.mm4e) and browser data are completely safe and untouched!</em>
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 10px; justify-content: flex-end; align-items: center; flex-wrap: wrap; padding-top: 8px; border-top: 1px solid var(--border-color);">
        <button type="button" class="btn btn-primary" onclick="window.reloadApp()" style="padding: 6px 14px; font-size: 10pt; display: inline-flex; align-items: center; gap: 6px;">
          ⟳ Reload App
        </button>
        <a href="${this.downloadZipUrl}" target="_blank" rel="noopener" class="btn" style="text-decoration: none; padding: 6px 14px; font-size: 10pt; display: inline-flex; align-items: center; gap: 6px;">
          ⬇️ Download Latest ZIP
        </a>
        <a href="${this.githubRepo}" target="_blank" rel="noopener" class="btn btn-secondary" style="text-decoration: none; padding: 6px 12px; font-size: 10pt; display: inline-flex; align-items: center; gap: 6px;">
          View on GitHub ↗
        </a>
        <button type="button" class="btn btn-secondary" id="btnDismissUpdate" style="padding: 6px 14px; font-size: 10pt;">Close</button>
      </div>
    `;

    const btnDismiss = document.getElementById("btnDismissUpdate");
    if (btnDismiss) btnDismiss.onclick = () => this.close();
  },

  renderUpdateAvailable(data) {
    const modalBody = document.getElementById("updateModalBody");
    if (!modalBody) return;

    const notes = Array.isArray(data.releaseNotes) 
      ? data.releaseNotes.map(n => `<li style="margin-bottom: 4px;">${this.safeEscape(n)}</li>`).join("")
      : (data.releaseNotes ? `<p style="margin: 0;">${this.safeEscape(data.releaseNotes)}</p>` : "<li>Performance enhancements and rules refinements.</li>");

    modalBody.innerHTML = `
      <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 6px; padding: 10px 14px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 24px;">🎉</span>
          <div>
            <div style="font-weight: 700; color: #10b981; font-size: 11pt;">New Version Available: v${this.safeEscape(data.version)}</div>
            <div style="font-size: 10pt; color: var(--text-muted); margin-top: 1px;">
              Installed: <strong>v${this.currentVersion}</strong> (${this.safeEscape(this.buildDate)}) • Released: <strong>v${this.safeEscape(data.version)}</strong> (${this.safeEscape(data.buildDate || "Latest")})
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <button type="button" class="btn btn-primary" onclick="window.reloadApp()" style="padding: 6px 14px; font-size: 10pt; display: inline-flex; align-items: center; gap: 6px;">
            ⟳ Reload App
          </button>
        </div>
      </div>

      <div class="update-grid-container" style="margin-bottom: 14px;">
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 12px 14px; display: flex; flex-direction: column;">
          <div style="font-weight: 700; font-size: 10.5pt; margin-bottom: 8px; color: var(--text-main); display: flex; align-items: center; gap: 6px;">
            <span>✨</span> What's New in v${this.safeEscape(data.version)}:
          </div>
          <div style="max-height: 240px; overflow-y: auto; padding-right: 4px;">
            <ul style="margin: 0; padding-left: 20px; font-size: 10pt; color: var(--text-main); line-height: 1.5;">
              ${notes}
            </ul>
          </div>
        </div>

        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 12px 14px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-weight: 700; font-size: 10.5pt; margin-bottom: 8px; color: var(--accent-primary); display: flex; align-items: center; gap: 6px;">
              <span>📦</span> Local Update Instructions:
            </div>
            <ol style="margin: 0; padding-left: 20px; font-size: 10pt; color: var(--text-muted); line-height: 1.45;">
              <li>Click <strong>Download Latest ZIP</strong> below to save the latest files.</li>
              <li>Extract and replace files into your local program folder.</li>
              <li>Click <strong>Reload App</strong> or relaunch with <code>Launch Hero Builder.bat</code>.</li>
            </ol>
          </div>
          <div style="margin-top: 10px; padding: 6px 10px; background: rgba(37, 99, 235, 0.08); border: 1px solid rgba(37, 99, 235, 0.2); border-radius: 4px; font-size: 10pt; color: var(--text-muted);">
            🔒 <em>Your saved character files (.mm4e) and browser saves will remain completely safe and untouched!</em>
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 10px; justify-content: flex-end; align-items: center; flex-wrap: wrap; padding-top: 8px; border-top: 1px solid var(--border-color);">
        <button type="button" class="btn btn-primary" onclick="window.reloadApp()" style="padding: 6px 14px; font-size: 10pt; display: inline-flex; align-items: center; gap: 6px;">
          ⟳ Reload App
        </button>
        <a href="${data.downloadZipUrl || this.downloadZipUrl}" target="_blank" rel="noopener" class="btn" style="text-decoration: none; padding: 6px 14px; font-size: 10pt; display: inline-flex; align-items: center; gap: 6px;">
          ⬇️ Download Latest ZIP
        </a>
        <a href="${data.githubRepo || this.githubRepo}" target="_blank" rel="noopener" class="btn btn-secondary" style="text-decoration: none; padding: 6px 12px; font-size: 10pt; display: inline-flex; align-items: center; gap: 6px;">
          View on GitHub ↗
        </a>
        <button type="button" class="btn btn-secondary" id="btnDismissUpdate" style="padding: 6px 14px; font-size: 10pt;">Close</button>
      </div>
    `;

    const btnDismiss = document.getElementById("btnDismissUpdate");
    if (btnDismiss) btnDismiss.onclick = () => this.close();
  },

  renderUpToDate(data) {
    const modalBody = document.getElementById("updateModalBody");
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div style="padding: 8px 12px; text-align: center;">
        <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 12px;">
          <span style="font-size: 32px;">✅</span>
          <div style="text-align: left;">
            <h4 style="margin: 0; font-size: 12pt; color: #10b981; font-weight: 700;">You are running the latest version!</h4>
            <div style="font-size: 10pt; color: var(--text-muted); margin-top: 2px;">
              Current Version: <strong>v${this.currentVersion}</strong> (Build: ${this.buildDate})
            </div>
          </div>
        </div>
        <div style="font-size: 10pt; color: var(--text-muted); max-width: 600px; margin: 0 auto 16px auto; line-height: 1.5;">
          Your local installation of the Mutants &amp; Masterminds 4E Hero Builder is completely up to date with the official GitHub repository.
        </div>
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
          <button type="button" class="btn btn-secondary" onclick="window.reloadApp()" style="padding: 6px 14px; font-size: 10pt; display: inline-flex; align-items: center; gap: 6px;">
            ⟳ Reload App
          </button>
          <a href="${this.githubRepo}" target="_blank" rel="noopener" class="btn btn-secondary" style="text-decoration: none; padding: 6px 14px; font-size: 10pt; display: inline-flex; align-items: center; gap: 6px;">
            View GitHub Repository ↗
          </a>
          <button type="button" class="btn" id="btnDismissUpdate" style="padding: 6px 18px; font-size: 10pt;">Great!</button>
        </div>
      </div>
    `;

    const btnDismiss = document.getElementById("btnDismissUpdate");
    if (btnDismiss) btnDismiss.onclick = () => this.close();
  },

  renderError(msg) {
    const modalBody = document.getElementById("updateModalBody");
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div style="padding: 8px 12px; text-align: center;">
        <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 12px;">
          <span style="font-size: 32px;">🌐</span>
          <div style="text-align: left;">
            <h4 style="margin: 0; font-size: 12pt; color: #f59e0b; font-weight: 700;">Unable to check for updates</h4>
            <div style="font-size: 10pt; color: var(--text-muted); margin-top: 2px;">
              Installed Version: <strong>v${this.currentVersion}</strong> (Build: ${this.buildDate})
            </div>
          </div>
        </div>
        <div style="font-size: 10pt; color: var(--text-muted); max-width: 600px; margin: 0 auto 16px auto; line-height: 1.5;">
          Could not connect to GitHub to check for updates. This usually means you are working offline or GitHub could not be reached. You can still download updates manually from GitHub.
        </div>
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
          <button type="button" class="btn" id="btnRetryUpdate" style="padding: 6px 14px; font-size: 10pt;">
            🔄 Retry Check
          </button>
          <button type="button" class="btn btn-secondary" onclick="window.reloadApp()" style="padding: 6px 14px; font-size: 10pt; display: inline-flex; align-items: center; gap: 6px;">
            ⟳ Reload App
          </button>
          <a href="${this.githubRepo}" target="_blank" rel="noopener" class="btn btn-secondary" style="text-decoration: none; padding: 6px 14px; font-size: 10pt;">
            Open GitHub ↗
          </a>
          <button type="button" class="btn btn-secondary" id="btnDismissUpdate" style="padding: 6px 14px; font-size: 10pt;">Close</button>
        </div>
      </div>
    `;

    const btnRetry = document.getElementById("btnRetryUpdate");
    if (btnRetry) btnRetry.onclick = () => this.check(false);
    const btnDismiss = document.getElementById("btnDismissUpdate");
    if (btnDismiss) btnDismiss.onclick = () => this.close();
  }
};

window.reloadApp = async function() {
  try {
    if (typeof showToast === "function") {
      showToast("Reloading app...", "info", 1500);
    }
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        await reg.update();
        if (reg.waiting) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      }
    }
    if ('caches' in window) {
      const keys = await caches.keys();
      for (const key of keys) {
        await caches.delete(key);
      }
    }
  } catch (e) {
    console.warn("Cache reset error:", e);
  }
  setTimeout(() => {
    window.location.reload(true);
  }, 100);
};

window.UpdateCheckerManager = UpdateCheckerManager;

function setupMainMenuAndHeader() {
  if (window.__mainMenuAndHeaderSetup) return;
  window.__mainMenuAndHeaderSetup = true;

  // Main Menu Toggle
  const btnMainMenu = document.getElementById("btnMainMenu");
  const mainMenuDropdown = document.getElementById("mainMenuDropdown");
  if (btnMainMenu && mainMenuDropdown && !btnMainMenu.__bound) {
    btnMainMenu.__bound = true;
    btnMainMenu.onclick = (e) => {
      e.stopPropagation();
      const isVisible = mainMenuDropdown.style.display === "block";
      mainMenuDropdown.style.display = isVisible ? "none" : "block";
      btnMainMenu.setAttribute("aria-expanded", !isVisible);
      if (isVisible) {
        const optModal = document.getElementById("optionsModal");
        if (optModal && optModal.classList.contains("show") && window.OptionsPopoutManager) {
          window.OptionsPopoutManager.closeModal();
        }
      }
    };

    document.addEventListener("click", (e) => {
      const optModal = document.getElementById("optionsModal");
      if (optModal && optModal.contains(e.target)) return;
      if (!mainMenuDropdown.contains(e.target) && e.target !== btnMainMenu && !btnMainMenu.contains(e.target)) {
        mainMenuDropdown.style.display = "none";
        btnMainMenu.setAttribute("aria-expanded", "false");
        if (optModal && optModal.classList.contains("show") && window.OptionsPopoutManager) {
          window.OptionsPopoutManager.closeModal();
        }
      }
    });

    // Close menu when menu action buttons are clicked (except options which handles itself)
    mainMenuDropdown.querySelectorAll(".menu-action-btn").forEach(b => {
      if (b.id !== "btnToggleOptions" && !b.__closeBound) {
        b.__closeBound = true;
        b.addEventListener("click", () => {
          mainMenuDropdown.style.display = "none";
          btnMainMenu.setAttribute("aria-expanded", "false");
          const optModal = document.getElementById("optionsModal");
          if (optModal && optModal.classList.contains("show") && window.OptionsPopoutManager) {
            window.OptionsPopoutManager.closeModal();
          }
        });
      }
    });
  }

  // Main Menu Position Preference (Left / Right)
  const savedMenuPos = localStorage.getItem("mm4e_menu_position") || "right";
  const headerEl = document.getElementById("appTopHeader");
  if (headerEl) {
    headerEl.classList.remove("menu-left", "menu-right");
    headerEl.classList.add(`menu-${savedMenuPos}`);
  }

  const radioLeft = document.getElementById("optMenuLeft");
  const radioRight = document.getElementById("optMenuRight");
  if (radioLeft && radioRight && !radioLeft.__bound) {
    radioLeft.__bound = true;
    radioRight.__bound = true;
    if (savedMenuPos === "left") radioLeft.checked = true;
    else radioRight.checked = true;

    radioLeft.addEventListener("change", () => {
      if (radioLeft.checked) {
        localStorage.setItem("mm4e_menu_position", "left");
        if (headerEl) {
          headerEl.classList.remove("menu-right");
          headerEl.classList.add("menu-left");
        }
      }
    });

    radioRight.addEventListener("change", () => {
      if (radioRight.checked) {
        localStorage.setItem("mm4e_menu_position", "right");
        if (headerEl) {
          headerEl.classList.remove("menu-left");
          headerEl.classList.add("menu-right");
        }
      }
    });
  }

  // Active Form Selector dropdown
  const selActive = document.getElementById("selActiveCharacter");
  if (selActive && !selActive.__bound) {
    selActive.__bound = true;
    selActive.addEventListener("change", (e) => {
      const val = e.target.value;
      if (val === "__add_minion") {
        createNewCompanion("minion");
      } else if (val === "__add_alt_form") {
        createNewCompanion("alt_form");
      } else {
        switchToCompanion(val);
      }
    });
  }

  // Delete current alt button
  const btnDeleteAlt = document.getElementById("btnDeleteCurrentAlt");
  if (btnDeleteAlt && !btnDeleteAlt.__bound) {
    btnDeleteAlt.__bound = true;
    btnDeleteAlt.addEventListener("click", () => deleteCurrentAlt());
  }

  // Quick Add Companion buttons in Main Menu
  const btnQuickMinion = document.getElementById("btnQuickAddMinion");
  const btnQuickAlt = document.getElementById("btnQuickAddAltForm");
  if (btnQuickMinion && !btnQuickMinion.__bound) {
    btnQuickMinion.__bound = true;
    btnQuickMinion.addEventListener("click", () => createNewCompanion("minion"));
  }
  if (btnQuickAlt && !btnQuickAlt.__bound) {
    btnQuickAlt.__bound = true;
    btnQuickAlt.addEventListener("click", () => createNewCompanion("alt_form"));
  }

  // Add Companion buttons on Companions Tab
  const btnAddMinion = document.getElementById("btnAddMinion");
  const btnAddAlt = document.getElementById("btnAddAltForm");
  if (btnAddMinion && !btnAddMinion.__bound) {
    btnAddMinion.__bound = true;
    btnAddMinion.addEventListener("click", () => createNewCompanion("minion"));
  }
  if (btnAddAlt && !btnAddAlt.__bound) {
    btnAddAlt.__bound = true;
    btnAddAlt.addEventListener("click", () => createNewCompanion("alt_form"));
  }

  // PDF Export and Print Preview buttons
  const btnExportPdf = document.getElementById("btnExportPdf");
  const btnPrintHero = document.getElementById("btnPrintHero");
  const btnModalExportPdf = document.getElementById("btnModalExportPdf");
  const btnClosePrintPreview = document.getElementById("btnClosePrintPreview");

  if (btnExportPdf && !btnExportPdf.__bound) {
    btnExportPdf.__bound = true;
    btnExportPdf.addEventListener("click", () => {
      if (typeof window.exportToPdf === 'function') window.exportToPdf();
    });
  }
  if (btnModalExportPdf && !btnModalExportPdf.__bound) {
    btnModalExportPdf.__bound = true;
    btnModalExportPdf.addEventListener("click", () => {
      if (typeof window.exportToPdf === 'function') window.exportToPdf();
    });
  }

  if (btnPrintHero && !btnPrintHero.__bound) {
    btnPrintHero.__bound = true;
    btnPrintHero.addEventListener("click", () => {
      if (typeof window.openPrintPreview === 'function') window.openPrintPreview();
    });
  }

  if (btnClosePrintPreview && !btnClosePrintPreview.__bound) {
    btnClosePrintPreview.__bound = true;
    btnClosePrintPreview.addEventListener("click", () => {
      if (typeof window.closePrintPreview === 'function') window.closePrintPreview();
    });
  }

  updateAltSelectorUI();
  TablesPopoutManager.init();
  OptionsPopoutManager.init();
  HelpModalManager.init();
}

// Popout window cleanup on main window unload
window.addEventListener("beforeunload", () => {
  if (typeof TablesPopoutManager !== "undefined" && TablesPopoutManager.win && !TablesPopoutManager.win.closed) {
    try { TablesPopoutManager.win.close(); } catch (e) {}
  }
  if (typeof OptionsPopoutManager !== "undefined" && OptionsPopoutManager.win && !OptionsPopoutManager.win.closed) {
    try { OptionsPopoutManager.win.close(); } catch (e) {}
  }
  if (typeof HelpModalManager !== "undefined" && HelpModalManager.win && !HelpModalManager.win.closed) {
    try { HelpModalManager.win.close(); } catch (e) {}
  }
});

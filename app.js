const char = new CharacterModel();
window.char = char;
char.powers = [];

let skillSort = { col: "name", asc: true };
let advSort = { col: "name", asc: true };

let skillsDisplayList = typeof SKILLS_LIST !== 'undefined' ? [...SKILLS_LIST] : [];
let advantagesDisplayList = typeof ADVANTAGES_LIST !== 'undefined' ? [...ADVANTAGES_LIST] : [];

// --- DYNAMIC CONFIGURATION INJECTOR ---
const EXTRACTED_CONFIGS = {
  "Affliction": [
    { name: "Affliction Aura", modifiers: [{ name: "Aura", ranks: 1, cost: 4, costType: "per_rank", category: "extra" }] },
    { name: "Dazzle", modifiers: [{ name: "Ranged", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }], options: { deg1: "Disabled", deg2: "Unaware" } },
    { name: "Hallucination", modifiers: [{ name: "Perception Range", ranks: 1, cost: 2, costType: "per_rank", category: "extra" }, { name: "Alternate Resistance (Will)", ranks: 1, cost: 0, costType: "flat", category: "extra" }], options: { deg1: "Figment", deg2: "Phantasm", deg3: "Delusion" } },
    { name: "Mind Control", modifiers: [{ name: "Perception Range", ranks: 1, cost: 2, costType: "per_rank", category: "extra" }, { name: "Alternate Resistance (Will)", ranks: 1, cost: 0, costType: "flat", category: "extra" }], options: { deg1: "Dazed", deg2: "Compelled", deg3: "Controlled" } },
    { name: "Paralyze", options: { deg1: "Hindered", deg2: "Immobile", deg3: "Paralyzed" } },
    { name: "Snare", modifiers: [{ name: "Extra Condition", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }, { name: "Ranged", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }, { name: "Limited Degree", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }], options: { deg1: "Hindered", deg1_extra: "Vulnerable", deg2: "Defenseless", deg2_extra: "Immobile" } },
    { name: "Stun", options: { deg1: "Dazed", deg2: "Stunned", deg3: "Incapacitated" } },
    { name: "Suffocation", modifiers: [{ name: "Ranged", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }, { name: "Concentration", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }], options: { deg1: "Dazed", deg2: "Stunned", deg3: "Incapacitated" } },
    { name: "Toxin", options: { deg1: "Impaired", deg2: "Disabled", deg3: "Incapacitated" } },
    { name: "Transform", modifiers: [{ name: "Progressive", ranks: 1, cost: 2, costType: "per_rank", category: "extra" }, { name: "Limited Degree", ranks: 2, cost: 1, costType: "per_rank", category: "flaw" }], options: { deg3: "Transformed" } },
    { name: "Weaken", modifiers: [{ name: "Cumulative", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }, { name: "Limited", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }], options: { deg1: "Impaired", deg2: "Disabled", deg3: "Debilitated" } }
  ],
  "Communication": [
    { name: "Commlink", modifiers: [{ name: "One-Way", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }, { name: "Removable (Easily Removable)", ranks: 1, cost: 2, costType: "removable", category: "flaw" }], notes: "Radio Communication." },
    { name: "Interface", notes: "Electromagnetic Communication." },
    { name: "Psychic Connection", modifiers: [{ name: "Limited", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }], notes: "Mental Communication. Limited to One Person." },
    { name: "Telepathic Link", notes: "Mental Communication." }
  ],
  "Concealment": [
    { name: "Inaudibility", rank: 1, notes: "Hearing Concealment." },
    { name: "Invisibility", rank: 2, notes: "Sight Concealment." }
  ],
  "Create": [
    { name: "Force Constructs", modifiers: [{ name: "Movable", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }] },
    { name: "Matter Shaping", modifiers: [{ name: "Permanent", ranks: 1, cost: 0, costType: "per_rank", category: "extra" }] }
  ],
  "Damage": [
    { name: "Blast", modifiers: [{ name: "Ranged", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }] },
    { name: "Damage Aura", modifiers: [{ name: "Aura", ranks: 1, cost: 3, costType: "per_rank", category: "extra" }] },
    { name: "Mental Blast", modifiers: [{ name: "Perception Range", ranks: 1, cost: 2, costType: "per_rank", category: "extra" }, { name: "Alternate Resistance (Will)", ranks: 1, cost: 0, costType: "flat", category: "extra" }] },
    { name: "Strike" },
    { name: "Weapon", modifiers: [{ name: "Removable (Easily Removable)", ranks: 1, cost: 2, costType: "removable", category: "flaw" }] }
  ],
  "Enhanced Senses": [
    { name: "Radar", subPowers: [{ name: "Radio [1 pt]", type: "Radio", rank: 1, baseCost: 1, costType: "flat", modifiers: [{ name: "Accurate (Single Sense) [+2 pts]", ranks: 1, cost: 2, costType: "flat", category: "extra", isMeta: true }] }] },
    { name: "Sonar", subPowers: [{ name: "Ultra-Hearing [1 pt]", type: "Ultra-Hearing", rank: 1, baseCost: 1, costType: "flat", modifiers: [{ name: "Accurate (Single Sense) [+2 pts]", ranks: 1, cost: 2, costType: "flat", category: "extra", isMeta: true }] }] },
    { name: "Spatial Sense", subPowers: [{ name: "Normal Touch [0 pts]", type: "Normal Touch", rank: 1, baseCost: 0, costType: "flat", modifiers: [{ name: "Ranged (Single Sense) [+1 pt]", ranks: 1, cost: 1, costType: "flat", category: "extra", isMeta: true }] }], modifiers: [{ name: "Subtle", ranks: 2, cost: 2, costType: "flat", category: "extra" }] },
    { name: "True Sight", subPowers: [{ name: "Visual Senses - Sense Type [0 pts]", type: "Visual Senses", rank: 1, baseCost: 0, costType: "flat", modifiers: [{ name: "Counters Concealment (All) [+5 pts]", ranks: 1, cost: 5, costType: "flat", category: "extra", isMeta: true }, { name: "Counters Illusion [+2 pts]", ranks: 1, cost: 2, costType: "flat", category: "extra", isMeta: true }] }] },
    { name: "X-Ray Vision", subPowers: [{ name: "Visual Senses - Sense Type [0 pts]", type: "Visual Senses", rank: 1, baseCost: 0, costType: "flat", modifiers: [{ name: "Penetrates Concealment [+4 pts]", ranks: 1, cost: 4, costType: "flat", category: "extra", isMeta: true }] }] }
  ],
  "Enhanced Trait": [
    { name: "Berserker Rage", modifiers: [{ name: "Sustained", ranks: 1, cost: 0, costType: "per_rank", category: "extra" }], notes: "Linked to Enhanced Advantage: Fearless 2 and Reduced Defense 1." },
    { name: "Trait Boost", modifiers: [{ name: "Fades", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }] }
  ],
  "Environment": [
    { name: "Flashlight", rank: 1, modifiers: [{ name: "Area Effect (Cone)", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }], notes: "Illumination 1" },
    { name: "Mist", notes: "Visibility" },
    { name: "Weather Control", modifiers: [{ name: "Variable", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }] }
  ],
  "Feature": [
    "Animal Harmony", "Battery", "Built-in Equipment", "Charmed Life", "Chill", "Dimensional Pocket", "Display", "Higher Guidance", "Insulating Fur", "Internal Compartment", "Iron Stomach", "Light Sleeper", "Lucid Dreamer", "Massive", "Megaphone", "Mimicry", "Quick Change", "Remote", "Shade", "Special Effect", "Temporal Inertia", "Weatherproof"
  ].map(name => ({ name })),
  "Flight": [
    { name: "Wings", modifiers: [{ name: "Restrainable", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }] }
  ],
  "Immunity": [
    { name: "Absorption", notes: "Immunity to a Damage Descriptor. Linked to Enhanced Trait with Fades." },
    { name: "Ageless", rank: 1 },
    { name: "[Effect] Resistance", modifiers: [{ name: "Resistance", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }] },
    { name: "Environmental Immunity", rank: 10 },
    { name: "Fortitude Immunity", rank: 30 },
    { name: "Mental Immunity", rank: 10 },
    { name: "Water Breathing", rank: 1 },
    { name: "Will Immunity", rank: 30 }
  ],
  "Move Object": [
    { name: "Cyclone", modifiers: [{ name: "Area Effect (Cone)", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }, { name: "Limited Direction", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }] },
    { name: "Energy Tendrils" },
    { name: "Gravity Field", modifiers: [{ name: "Area Effect (Sphere)", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }, { name: "Limited Direction", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }] },
    { name: "[Matter] Moving", modifiers: [{ name: "Limited Material", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }] },
    { name: "Poltergeist", modifiers: [{ name: "Perception Range", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }, { name: "Precise", ranks: 1, cost: 1, costType: "flat", category: "extra" }, { name: "Subtle", ranks: 2, cost: 2, costType: "flat", category: "extra" }], notes: "Requires Indirect 4. Linked to Enhanced Senses 10 (Radius Sight Counters and Penetrates All Concealment, Limited to Targeting)." },
    { name: "Psychokinesis", modifiers: [{ name: "Perception Range", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }] },
    { name: "Tether", modifiers: [{ name: "Limited Direction", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }] }
  ],
  "Obscure": [
    { name: "Darkness", modifiers: [{ name: "Area Effect (Sphere)", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }], notes: "Normal Sight" },
    { name: "Silence", modifiers: [{ name: "Area Effect (Sphere)", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }], notes: "Normal Hearing" },
    { name: "Static", modifiers: [{ name: "Area Effect (Sphere)", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }], notes: "Radio" },
    { name: "Wards", notes: "Detect and Remote Sensing" }
  ],
  "Protection": [
    { name: "Armored Skin", modifiers: [{ name: "Noticeable", ranks: 1, cost: 1, costType: "flat", category: "flaw" }] },
    { name: "Force Field", modifiers: [{ name: "Sustained", ranks: 1, cost: 0, costType: "per_rank", category: "extra" }] }
  ],
  "Remote Sensing": [
    { name: "Astral Projection", modifiers: [{ name: "Side Effect", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }], notes: "Sight, Hearing, Mental. Side-Effect: physical body defenseless/immobile." },
    { name: "Scrying", notes: "Sight and Hearing." },
    { name: "Telepresence", modifiers: [{ name: "Medium", ranks: 1, cost: 1, costType: "per_rank", category: "flaw" }], notes: "Sight and Hearing. Medium: Technology." }
  ],
  "Summon": [
    { name: "Duplication" }
  ],
  "Teleport": [
    { name: "Portal", modifiers: [{ name: "Area Effect (Sphere)", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }, { name: "Concentration", ranks: 1, cost: 1, costType: "per_rank", category: "extra" }] }
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
      flaws: [{name: "Limited", cost: 1, costType: "per_rank"}]
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
      extras: [{name: "Accurate", cost: 1, costType: "per_rank"}, {name: "Change Direction", cost: 1, costType: "flat"}, {name: "Change Velocity", cost: 1, costType: "flat"}, {name: "Easy", cost: 1, costType: "per_rank"}, {name: "Extended", cost: 1, costType: "per_rank"}, {name: "Increased Mass", cost: 1, costType: "flat"}, {name: "Known Location", cost: 1, costType: "flat"}, {name: "Turnabout", cost: 1, costType: "flat"}],
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
  Attack: [
    "Accurate", "Affects Insubstantial", "Area Effect (Cone)", "Area Effect (Cube)", "Area Effect (Cylinder)",
    "Area Effect (Line)", "Area Effect (Shapeable)", "Area Effect (Sphere)", "Attack", "Aura", "Contagious",
    "Cumulative", "Diminished Range", "Extended Range", "Homing", "Inaccurate", "Incurable", "Indirect",
    "Increased Range", "Multiattack", "Penetrating", "Perception Range", "Progressive", "Ranged", "Reach",
    "Reduced Range", "Close", "Ricochet", "Secondary Effect", "Selective", "Sleep", "Split", "Triggered",
    "Variable Descriptor", "Distracting", "Fades", "Feedback", "Grab-Based", "Limited", "Noticeable",
    "Quirk", "Removable (Device)", "Removable (Easily Removable)", "Resistible", "Sense-Dependent",
    "Side Effect", "Tiring", "Unreliable"
  ],
  Defense: [
    "Affects Others", "Area Effect (Sphere)", "Continuous", "Hardened", "Impenetrable", "Impervious",
    "Increased Range", "Perception Range", "Ranged", "Reach", "Redirect", "Reflect", "Sustained",
    "Distracting", "Fades", "Limited", "Noticeable", "Quirk", "Reduced Range", "Removable (Device)",
    "Removable (Easily Removable)", "Side Effect", "Unreliable"
  ],
  Movement: [
    "Acrobatics Check Required", "Affects Others", "Aquatic", "Area Effect (Sphere)", "Continuous",
    "Extended Range", "Increased Range", "Perception Range", "Ranged", "Selective", "Subtle",
    "Distracting", "Gliding", "Levitation", "Limited", "Noticeable", "Platform", "Quirk", "Reduced Range",
    "Removable (Device)", "Removable (Easily Removable)", "Restrainable", "Side Effect", "Unreliable"
  ],
  Sensory: [
    "Affects Others", "Area Effect (Sphere)", "Broadcast", "Dimensional", "Extended Range", "Increased Range",
    "Perception Range", "Ranged", "Rapid", "Selective", "Simultaneous", "Subtle", "Diminished Range",
    "Distracting", "Fades", "Feedback", "Limited", "Medium", "Noticeable", "One-Way", "Passive", "Quirk",
    "Reduced Range", "Removable (Device)", "Removable (Easily Removable)", "Side Effect", "Unreliable"
  ],
  Control: [
    "Affects Insubstantial", "Affects Objects", "Area Effect (Cone)", "Area Effect (Cube)", "Area Effect (Cylinder)",
    "Area Effect (Line)", "Area Effect (Shapeable)", "Area Effect (Sphere)", "Attack", "Continuous", "Damaging",
    "Diminished Range", "Extended Range", "Increased Range", "Indirect", "Movable", "Perception Range",
    "Precise", "Ranged", "Reach", "Reduced Range", "Close", "Selective", "Stationary", "Subtle", "Triggered",
    "Variable Descriptor", "Concentration", "Distracting", "Fades", "Feedback", "Limited", "Limited Direction",
    "Limited Material", "Noticeable", "Passive", "Quirk", "Removable (Device)", "Removable (Easily Removable)",
    "Resistible", "Sense-Dependent", "Side Effect", "Unreliable"
  ],
  Alteration: [
    "Affects Corporeal", "Affects Others", "Area Effect (Sphere)", "Continuous", "Diminished Range",
    "Extended Range", "Increased Range", "Metamorph", "Perception Range", "Precise", "Projection", "Ranged",
    "Reach", "Reduced Range", "Close", "Subtle", "Variable", "Concentration", "Distracting", "Fades",
    "Feedback", "Limited", "Noticeable", "Passive", "Quirk", "Removable (Device)", "Removable (Easily Removable)",
    "Resistible", "Side Effect", "Unreliable"
  ],
  General: [
    "Affects Others", "Continuous", "Extended Range", "Increased Range", "Perception Range", "Ranged",
    "Reach", "Reduced Range", "Close", "Fades", "Limited", "Noticeable", "Quirk", "Removable (Device)",
    "Removable (Easily Removable)", "Side Effect", "Subtle", "Sustained", "Unreliable"
  ]
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
    available = POWER_MODIFIERS_LIST.filter(m => allowedNames.includes(m.name));
  }

  if (effectOrSub && (effectOrSub.effectName === "Enhanced Senses" || (effectOrSub.name && effectOrSub.name.includes("Senses")))) {
      available = available.filter(m => m.name !== "Sense-Dependent" && m.name !== "Selective");
  }

  return available;
}

// --- REAL-TIME COST CALCULATION ENGINE WITH ARRAY/LINKED ROLLUP ---
char.calculateEffectCost = function(effect) {
  const effectData = typeof POWER_EFFECTS_LIST !== 'undefined' ? POWER_EFFECTS_LIST.find(e => e.name === effect.effectName) : null;
  const isComposite = ["Enhanced Senses", "Enhanced Movement", "Enhanced Trait", "Comprehend", "Feature", "Immunity"].includes(effect.effectName);

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
            let mCost = m.cost || 1;
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
            let mC = (m.cost || 1) * (parseInt(m.ranks)||1);
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
            let mC = (m.cost || 1) * (parseInt(m.ranks)||1);
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
           return adv.hasRanks ? (adv.maxRanks || 10) : 1;
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
    if (char.powers[pIdx] && char.powers[pIdx].effects[eIdx] && char.powers[pIdx].effects[eIdx].subPowers[subIdx]) {
        char.powers[pIdx].effects[eIdx].subPowers[subIdx].details = val;
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
  if (typeof POWER_MODIFIERS_LIST !== 'undefined') {
    mod = POWER_MODIFIERS_LIST.find(m => m.name === modName);
  }
  if (!mod && typeof POWER_EFFECTS_LIST !== 'undefined') {
    for (const eff of POWER_EFFECTS_LIST) {
      if (eff.specificExtras) {
        mod = eff.specificExtras.find(m => m.name === modName);
        if (mod) break;
      }
      if (eff.specificFlaws) {
        mod = eff.specificFlaws.find(m => m.name === modName);
        if (mod) break;
      }
    }
  }
  if (!mod) return;
  document.getElementById("modalRuleTitle").textContent = `${mod.name}`;
  document.getElementById("modalRuleBody").textContent = mod.fullText || mod.description;
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
            banner.innerHTML = `⚠️ Your screen width is less than 1080px. For the best builder experience, please use a wider screen or switch your device to landscape mode. <button id="dismissResWarning" style="margin-left:12px; background:rgba(0,0,0,0.2); border:1px solid #fff; color:white; padding:4px 8px; cursor:pointer; border-radius:4px; font-size:12px;">Dismiss</button>`;
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
  refreshUI();
});

function setupTabs() {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });
}

function setupCollapsibles() {
  document.querySelectorAll(".panel-header").forEach(header => {
    header.addEventListener("click", () => {
      header.parentElement.classList.toggle("collapsed");
    });
  });
}

function setupOptionsModal() {
  const btn = document.getElementById("btnToggleOptions");
  const modal = document.getElementById("optionsModal");
  const modalContent = modal ? modal.querySelector(".modal-content") || modal : null;

  if (modalContent && !document.getElementById("chkDisableWarnings")) {
      const warningsDiv = document.createElement("div");
      warningsDiv.style.marginTop = "16px";
      warningsDiv.style.paddingTop = "16px";
      warningsDiv.style.borderTop = "1px solid var(--border-color)";
      
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
          <label style="display: flex; align-items: center; gap: 8px; font-size: var(--font-size-labels); cursor: pointer;">
              <input type="checkbox" id="chkDisableResWarning" ${isResWarningDisabled ? "checked" : ""}>
              Disable screen resolution warning
          </label>
      `;
      modalContent.appendChild(warningsDiv);

      document.getElementById("chkDisableWarnings").addEventListener("change", (e) => {
          localStorage.setItem("mm4e_disable_warnings", e.target.checked);
      });
      document.getElementById("chkDisableDeleteWarning").addEventListener("change", (e) => {
          localStorage.setItem("mm4e_disable_delete_warning", e.target.checked);
      });
      document.getElementById("chkDisableResWarning").addEventListener("change", (e) => {
          localStorage.setItem("mm4e_disable_res_warning", e.target.checked);
          window.checkScreenResolution(); 
      });
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    modal.classList.toggle("show");
  });

  modal.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    modal.classList.remove("show");
  });
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
  const savedLinkFont = localStorage.getItem("mm4e_font_links") || "12";
  const savedSecondaryFont = localStorage.getItem("mm4e_font_secondary") || "12";
  const savedMinorControlFont = localStorage.getItem("mm4e_font_minor_controls") || "12";

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

  btnTheme.addEventListener("click", (e) => {
    e.stopPropagation(); 
    const currentTheme = root.getAttribute("data-theme");
    let currentIndex = themes.indexOf(currentTheme);
    if (currentIndex === -1) currentIndex = 0;
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    root.setAttribute("data-theme", nextTheme);
    updateThemeBtnUI(nextTheme);
    localStorage.setItem("mm4e_theme", nextTheme);
  });

  sliderLabel.addEventListener("input", (e) => {
    root.style.setProperty("--font-size-labels", e.target.value + "px");
    document.getElementById("valLabelFont").textContent = e.target.value + "px";
    localStorage.setItem("mm4e_font_labels", e.target.value);
  });
  sliderControl.addEventListener("input", (e) => {
    root.style.setProperty("--font-size-controls", e.target.value + "px");
    document.getElementById("valControlFont").textContent = e.target.value + "px";
    localStorage.setItem("mm4e_font_controls", e.target.value);
  });
  sliderLink.addEventListener("input", (e) => {
    root.style.setProperty("--font-size-links", e.target.value + "px");
    document.getElementById("valLinkFont").textContent = e.target.value + "px";
    localStorage.setItem("mm4e_font_links", e.target.value);
  });
  sliderSecondary.addEventListener("input", (e) => {
    root.style.setProperty("--font-size-secondary", e.target.value + "px");
    document.getElementById("valSecondaryFont").textContent = e.target.value + "px";
    localStorage.setItem("mm4e_font_secondary", e.target.value);
  });
  sliderMinorControl.addEventListener("input", (e) => {
    root.style.setProperty("--font-size-minor-controls", e.target.value + "px");
    document.getElementById("valMinorControlFont").textContent = e.target.value + "px";
    localStorage.setItem("mm4e_font_minor_controls", e.target.value);
  });
}

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
  if (!char.powers[pIdx] || !char.powers[pIdx].effects[eIdx]) return;
  const effect = char.powers[pIdx].effects[eIdx];

  if (!skipHistory) {
      if (!effect.configHistory) { effect.configHistory = [effect.name || "New Effect"]; effect.configHistoryIdx = 0; }
      if (effect.configHistory[effect.configHistoryIdx] !== (configName || "New Effect")) {
          effect.configHistory = effect.configHistory.slice(0, effect.configHistoryIdx + 1);
          effect.configHistory.push(configName || "New Effect");
          if (effect.configHistory.length > 20) effect.configHistory.shift();
          else effect.configHistoryIdx++;
      }
  }

  if (!configName || configName === "New Effect") {
      if (effect.effectName) {
          updateEffectDirect(pIdx, eIdx, effect.effectName, true); 
      }
      return;
  }
  
  let config = null;
  let targetEffectName = "";

  for (const eff of POWER_EFFECTS_LIST) {
    if (eff.configurations) {
      config = eff.configurations.find(c => c.name === configName);
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
  }
  
  effect.options = config.options ? JSON.parse(JSON.stringify(config.options)) : {};
  effect.modifiers = config.modifiers ? JSON.parse(JSON.stringify(config.modifiers)) : [];
  effect.subPowers = config.subPowers ? JSON.parse(JSON.stringify(config.subPowers)) : [];
  effect.notes = config.notes ? config.notes : "";

  const isisComposite = ["Enhanced Senses", "Enhanced Movement", "Comprehend", "Feature", "Immunity"].includes(effect.effectName);
  if (!isComposite) {
      let maxR = window.getMaxPowerRank(effect); 
      if (effect.rank > maxR) effect.rank = maxR;
  }
  
  if (!effect.effectCache) effect.effectCache = {};
  effect.effectCache[targetEffectName] = {
      options: JSON.parse(JSON.stringify(effect.options)),
      subPowers: JSON.parse(JSON.stringify(effect.subPowers)),
      modifiers: JSON.parse(JSON.stringify(effect.modifiers)),
      rank: effect.rank,
      name: effect.name 
  };

  buildPowersUI();
  refreshUI();
};

window.toggleAllConfigs = function(pIdx, eIdx, isChecked) {
  if (char.powers[pIdx] && char.powers[pIdx].effects[eIdx]) {
    char.powers[pIdx].effects[eIdx].showAllConfigs = isChecked;
    buildPowersUI();
  }
};

window.updateEffectAssociation = function(pIdx, eIdx, val) {
  if (char.powers[pIdx] && char.powers[pIdx].effects[eIdx]) {
      char.powers[pIdx].effects[eIdx].association = val;
      buildPowersUI();
      refreshUI();
  }
};

window.updateEffectLink = function(pIdx, eIdx, val) {
  if (char.powers[pIdx] && char.powers[pIdx].effects[eIdx]) {
      char.powers[pIdx].effects[eIdx].linkedTo = val || null;
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
  if (!effect || !effect.effectName) return { action: "Standard", range: "Close" };
  const baseData = typeof POWER_EFFECTS_LIST !== 'undefined' 
    ? POWER_EFFECTS_LIST.find(e => e.name === effect.effectName) 
    : null;
    
  let action = baseData?.action || "Standard";
  let range = calculateEffectiveRange(effect, baseData?.range || "Close");
  
  if (Array.isArray(effect.modifiers)) {
    effect.modifiers.forEach(m => {
      const mName = m.name || "";
      if (mName === "Reaction") action = "Reaction";
      else if (mName === "Triggered") action = "Triggered";
      else if (mName === "Action (Move)") action = "Move";
      else if (mName === "Action (Free)") action = "Free";
      else if (mName === "Action (Reaction)") action = "Reaction";
      else if (mName === "Action (Standard)") action = "Standard";
    });
  }
  
  return { action, range };
}
window.getEffectiveEffectTraits = getEffectiveEffectTraits;

window.updatePowerContainerName = function(pIdx, val) {
  if (char.powers[pIdx]) {
      char.powers[pIdx].name = val;
      const headerTitle = document.getElementById(`powerContainerName_${pIdx}`);
      if (headerTitle) headerTitle.value = val;
  }
};


window.navigateEffectHistory = function(pIdx, eIdx, dir) {
    const effect = char.powers[pIdx]?.effects[eIdx];
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
    updateEffectDirect(pIdx, eIdx, effect.effectHistory[newIdx], true);
};

window.navigateConfigHistory = function(pIdx, eIdx, dir) {
    const effect = char.powers[pIdx]?.effects[eIdx];
    if (!effect) return;
    if (!effect.configHistory) {
        effect.configHistory = [effect.name || "New Effect"];
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
    applyEffectConfiguration(pIdx, eIdx, effect.configHistory[newIdx], true);
};

function buildPowersUI() {
  const container = document.getElementById("powersContainer");
  if (!container) return;
  if (!char.powers || char.powers.length === 0) {
    container.innerHTML = `<p class="secondary-text" style="padding: 12px 0;">No powers constructed yet. Click <strong>+ Add New Power Container</strong> above to build a power container.</p>`;
    return;
  }

  container.innerHTML = char.powers.map((powerContainer, pIdx) => {
    const containerCost = char.calculateTotalPowerCost(powerContainer);
    const isCollapsed = powerContainer.collapsed ? 'collapsed' : '';
    const summaryText = powerContainer.effects.map(e => `${e.effectName || 'No Effect'} ${e.rank}`).join(" | ");

    let effectsHtml = powerContainer.effects.map((effect, eIdx) => {
        const isComposite = ["Enhanced Senses", "Enhanced Movement", "Enhanced Trait", "Comprehend", "Feature", "Immunity"].includes(effect.effectName);
        
        let effectData = null;
        if (effect.effectName) {
            effectData = (typeof POWER_EFFECTS_LIST !== 'undefined') ? POWER_EFFECTS_LIST.find(e => e.name === effect.effectName) : null;
        }
        
        if (!effectData) {
            effectData = { name: "- Select Effect -", type: "—", action: "—", range: "—", duration: "—", check: "—", baseCost: 0, fullText: "Please select an effect from the dropdown list to configure your power.", shortDesc: "No effect selected." };
        }
          
        if (!effect.options) effect.options = {};
        if (!effect.subPowers) effect.subPowers = [];
        
        let maxPowerRank = window.getMaxPowerRank(effect);
        if (effect.rank > maxPowerRank) effect.rank = maxPowerRank;
        
        const effectCost = char.calculateEffectCost(effect);

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
          if (mData && effect.effectName) {
            const showDist = (effectiveRange === "Rank" || (effect.modifiers && effect.modifiers.some(m => m.name.includes("Area"))) || effectData.type === "Movement");
            if (showDist && effect.effectName !== "Enhanced Movement") {
                measurementHtml = `
                  <div style="margin-top: 6px; padding-top: 6px; border-top: 1px dashed var(--border-color); display: flex; gap: 16px; flex-wrap: wrap; font-size: calc(var(--font-size-secondary) * 0.95); font-family: monospace;">
                    <strong style="color: var(--accent-primary);">Table Equivalents:</strong>
                    ${showDist ? `<span><strong>Dist:</strong> ${mData.dist_imp}</span>` : ''}
                    <span><strong>Mass:</strong> ${mData.mass_imp}</span>
                    <span><strong>Time:</strong> ${mData.time}</span>
                    <span><strong>Vol:</strong> ${mData.vol_imp}</span>
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

        let templateDropdownHtml = `
          <div style="display: flex; align-items: center; gap: 6px;">
            <label>Config:</label>
            <select class="minor-control" style="width: 160px; ${effect.name && effect.name !== 'New Effect' && effect.name !== effect.effectName ? 'color: var(--accent-primary); font-weight: bold;' : ''}" onchange="applyEffectConfiguration(${pIdx}, ${eIdx}, this.value)">
              <option value="" style="color: var(--text-main); font-weight: normal;">- Select Config -</option>
              ${availableTemplates.map(cfg => `<option value="${cfg.name}" ${cfg.name === effect.name ? 'selected' : ''} style="color: var(--text-main); font-weight: normal;">${cfg.name}${showAll ? ` (${cfg.effectName || effectData.name})` : ''}</option>`).join('')}
            </select>
            <div style="display: flex; align-items: center; gap: 2px;">
                <button type="button" class="btn minor-control-btn" style="padding: 2px 6px; font-weight: bold;" onclick="navigateConfigHistory(${pIdx}, ${eIdx}, -1)" title="Back">&lt;</button>
                <button type="button" class="btn minor-control-btn" style="padding: 2px 6px; font-weight: bold;" onclick="navigateConfigHistory(${pIdx}, ${eIdx}, 1)" title="Forward">&gt;</button>
            </div>
            <label style="display: inline-flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; font-weight: normal; cursor: pointer; font-size: calc(var(--font-size-minor-controls) * 0.9); margin-left: 4px; line-height: 1;">
              <input type="checkbox" onchange="toggleAllConfigs(${pIdx}, ${eIdx}, this.checked)" ${showAll ? 'checked' : ''} style="margin: 0;">
              <span style="text-align: center;">Show<br>All</span>
            </label>
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
                dynDesc = adv ? (adv.shortDesc || "Enhanced advantage.") : "Enhanced advantage.";
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
                      ${mDescText ? `<div style="font-size: 10px; width: 100%; color: var(--text-muted); margin-top: 2px;">${mDescText}</div>` : ''}
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
                <select id="selSubMeta_${pIdx}_${eIdx}_${sIdx}" class="minor-control" style="font-size: 11px; max-width: 200px;">
                  ${metaChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
                <button type="button" class="btn minor-control-btn" style="font-size: 11px; padding: 2px 6px;" onclick="addSubPowerMeta(${pIdx}, ${eIdx}, ${sIdx}, 'selSubMeta_${pIdx}_${eIdx}_${sIdx}')">+ Add Modifier</button>
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
                <select id="selSubMeta_${pIdx}_${eIdx}_${sIdx}" class="minor-control" style="font-size: 11px; max-width: 200px;">
                  ${metaChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
                <button type="button" class="btn minor-control-btn" style="font-size: 11px; padding: 2px 6px;" onclick="addSubPowerMeta(${pIdx}, ${eIdx}, ${sIdx}, 'selSubMeta_${pIdx}_${eIdx}_${sIdx}')">+ Add Modifier</button>
                <div style="display: inline-flex; align-items: center; gap: 4px; flex-wrap: wrap;">
                  ${subModsHtml}
                </div>
              `;
            }

            let isImmunityLocked = effect.effectName === "Immunity" && !sType.includes("Custom");
            let isFlatAdvantage = effect.effectName === "Enhanced Trait" && typeof ADVANTAGES_LIST !== 'undefined' && ADVANTAGES_LIST.some(a => a.name === sType && !a.hasRanks);
            let allowsRanks = (sub.costType === "per_rank") || (effect.effectName === "Enhanced Trait" && !isFlatAdvantage);

            let stepperControls = subMaxR > 1 && allowsRanks && !isImmunityLocked ? `
              <button type="button" class="stepper-btn stepper-dec" style="width: 26px !important; min-width: 26px !important;" onclick="stepSubPowerRank(${pIdx}, ${eIdx}, ${sIdx}, -1, 1, ${subMaxR})">−</button>
              <input type="number" class="stepper-input" style="width: 38px !important; min-width: 38px !important; font-size: var(--font-size-minor-controls);" value="${sRank}" min="1" max="${subMaxR}" readonly>
              <button type="button" class="stepper-btn stepper-inc" style="width: 26px !important; min-width: 26px !important;" onclick="stepSubPowerRank(${pIdx}, ${eIdx}, ${sIdx}, 1, 1, ${subMaxR})">+</button>
            ` : `
              <input type="number" class="stepper-input" style="width: 50px !important; min-width: 50px !important; font-size: var(--font-size-minor-controls); background: transparent; border: none;" value="${sRank}" readonly title="${isImmunityLocked ? 'Rank Locked by Tier' : (isFlatAdvantage ? 'Rank 1 (Standard Advantage)' : 'Rank Locked')}">
            `;

            return `
              <div class="sub-power-card" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 4px; padding: 8px 10px; margin-top: 6px;">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <strong style="font-size: var(--font-size-controls); color: var(--accent-primary);">${sub.name.split(" [")[0] || sub.type}</strong>
                    <span class="badge effect-cost-badge" style="font-size: 11px;">${sub.baseCost || 1} ${sub.costType === 'per_rank' ? 'PP/r' : 'PP'}</span>
                  </div>

                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <label style="font-size: var(--font-size-secondary);">Rank:</label>
                      <div class="stepper-group" style="height: 24px; width: 90px; min-width: 90px;">
                        ${stepperControls}
                      </div>
                    </div>
                    <button type="button" class="btn-delete-power" style="padding: 2px 6px; font-size: 11px;" onclick="removeSubPower(${pIdx}, ${eIdx}, ${sIdx})" title="Delete Option">Delete</button>
                  </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 6px;">
                    <input type="text" class="minor-control" placeholder="${placeholderText}" value="${sub.details || ''}" oninput="updateSubPowerDetails(${pIdx}, ${eIdx}, ${sIdx}, this.value)" style="flex: 1; min-width: 150px; border: 1px solid var(--border-color); background: var(--bg-panel); color: var(--text-main); font-size: 12px; padding: 4px;">
                    ${metaPickerHtml}
                </div>

                ${dynDesc ? `<div class="secondary-text" style="margin-top: 6px; font-size: var(--font-size-secondary); line-height: 1.3;">${dynDesc}</div>` : ''}

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

          optionPickersHtml = `
            <div class="power-options-row" style="display: flex; flex-direction: column; gap: 10px; background: var(--bg-panel); padding: 10px; border: 1px solid var(--border-color); border-radius: 4px; margin-top: 4px;">
              <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
                
                <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                  <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Abilities / Defenses:</label>
                  <select id="selEnhAbility_${pIdx}_${eIdx}" class="minor-control" style="width: 175px;">
                    ${abilityChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                  </select>
                  <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selEnhAbility_${pIdx}_${eIdx}')">+ Add Ability</button>
                </div>

                <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                  <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Advantages:</label>
                  <select id="selEnhAdvantage_${pIdx}_${eIdx}" class="minor-control" style="width: 175px;">
                    ${advChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                  </select>
                  <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selEnhAdvantage_${pIdx}_${eIdx}')">+ Add Advantage</button>
                </div>

                <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                  <label style="font-size: var(--font-size-secondary); font-weight: 600; white-space: nowrap;">Skills:</label>
                  <select id="selEnhSkill_${pIdx}_${eIdx}" class="minor-control" style="width: 175px;">
                    ${skillChoices.map(c => `<option value="${c}">${c}</option>`).join('')}
                  </select>
                  <button type="button" class="btn minor-control-btn btn-add-option" style="height: 26px;" onclick="addOptionSubPower(${pIdx}, ${eIdx}, 'selEnhSkill_${pIdx}_${eIdx}')">+ Add Skill</button>
                </div>

              </div>
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
            const isExtra = (modData.category === "extra" || (effectData && effectData.specificExtras && effectData.specificExtras.some(e => e.name === mod.name)));
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
        if (!effect.association) effect.association = "primary";

        const isLinked = effect.linkedTo === "previous" || (typeof effect.linkedTo === "string" && effect.linkedTo !== "") || effect.association === "linked";

        // Build list of potential link targets (previous effect + other effects across containers)
        let linkOptions = `<option value="">🔗 Not Linked</option>`;
        if (eIdx > 0) {
          const prevEff = powerContainer.effects[eIdx - 1];
          const prevName = prevEff.name || prevEff.effectName || ("Effect " + eIdx);
          linkOptions += `<option value="previous" ${effect.linkedTo === 'previous' ? 'selected' : ''}>🔗 Link to Previous (${prevName})</option>`;
        }

        char.powers.forEach((otherContainer, otherPIdx) => {
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
        char.powers.forEach((otherContainer, otherPIdx) => {
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
                        <option value="primary" ${effect.association === 'primary' ? 'selected' : ''}>Primary Slot</option>
                        <option value="alternate" ${effect.association === 'alternate' ? 'selected' : ''}>Alternate (1 PP)</option>
                        <option value="dynamic" ${effect.association === 'dynamic' ? 'selected' : ''}>Dynamic (2 PP)</option>
                    </select>

                    <select onchange="updateEffectLink(${pIdx}, ${eIdx}, this.value)" class="minor-control" style="max-width: 175px; background: var(--bg-app);" title="Link this effect to another effect">
                        ${linkOptions}
                    </select>
                    
                    <select onchange="updateEffectDirect(${pIdx}, ${eIdx}, this.value)" class="minor-control" style="min-width: 160px; color: var(--accent-primary); font-weight: bold;">
                      <option value="" ${effect.effectName === "" ? "selected" : ""} style="color: var(--text-main); font-weight: normal;">- Select Effect -</option>
                      ${POWER_EFFECTS_LIST.map(eff => `<option value="${eff.name}" ${eff.name === effect.effectName ? 'selected' : ''} style="color: var(--text-main); font-weight: normal;">${eff.name} (${eff.baseCost} PP/r)</option>`).join('')}
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
                    <span class="badge effect-cost-badge" style="margin-left: 8px; font-size: 11px;">${effectCost} PP</span>
                    <button type="button" class="btn" style="padding: 2px 6px; font-size: 11px; margin-left: 8px;" onclick="resetEffect(${pIdx}, ${eIdx})" title="Reset Effect Config">Reset</button>
                    <button type="button" class="btn-delete-power" style="padding: 2px 6px; font-size: 11px; margin-left: 4px;" onclick="deleteEffect(${pIdx}, ${eIdx})" title="Delete Effect">Delete</button>
                </div>
            </div>

            ${linkBannerHtml}

            <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
                  ${templateDropdownHtml}
                </div>
            </div>

            ${optionPickersHtml}

            ${subPowersHtml ? `<div style="margin-top: 8px;"><strong style="font-size: var(--font-size-secondary); color: var(--text-main);">Configured Options:</strong>${subPowersHtml}</div>` : ''}

            ${effect.effectName !== "" && effect.effectName !== "Immunity" ? `
            <div class="power-modifiers-row" style="margin-top: 8px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <select id="selRootExtra_${pIdx}_${eIdx}" class="minor-control" style="max-width: 170px;">
                  <option value="">+ Add Extra...</option>
                  ${availableSpecificExtras.length > 0 ? `<optgroup label="Effect-Specific Extras">${availableSpecificExtras.map(e => `<option value="${e.name}">${e.name} (+${e.cost || 1}${e.costType === 'flat' ? ' flat' : '/r'})</option>`).join('')}</optgroup>` : ''}
                  <optgroup label="Universal Extras">
                    ${availableRootExtras.map(e => `<option value="${e.name}">${e.name} (+${e.cost}/r)</option>`).join('')}
                  </optgroup>
                </select>
                <button type="button" class="btn minor-control-btn" onclick="addModifierToEffect(${pIdx}, ${eIdx}, 'selRootExtra_${pIdx}_${eIdx}')">+ Extra</button>
              </div>

              <div style="display: flex; align-items: center; gap: 6px;">
                <select id="selRootFlaw_${pIdx}_${eIdx}" class="minor-control" style="max-width: 170px;">
                  <option value="">+ Add Flaw...</option>
                  ${availableSpecificFlaws.length > 0 ? `<optgroup label="Effect-Specific Flaws">${availableSpecificFlaws.map(f => `<option value="${f.name}">${f.name} (-${f.cost || 1}${f.costType === 'flat' ? ' flat' : '/r'})</option>`).join('')}</optgroup>` : ''}
                  <optgroup label="Universal Flaws">
                    ${availableRootFlaws.map(f => `<option value="${f.name}">${f.name} (-${f.cost}/r)</option>`).join('')}
                  </optgroup>
                </select>
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
              <span><strong>Action:</strong> ${effectData ? effectData.action : '—'}</span>
              <span><strong>Range:</strong> ${rangeDisplay}</span>
              <span><strong>Duration:</strong> ${effectData ? effectData.duration : '—'}</span>
              <span><strong>Check:</strong> ${effectData ? effectData.check : '—'}</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <label style="font-size: var(--font-size-secondary); color: var(--text-muted); font-weight: 600; min-width: 80px;">Descriptors:</label>
                <input type="text" value="${effect.descriptors || ''}" placeholder="e.g. Fire, Magic, Technology" style="flex: 1; font-size: var(--font-size-secondary); padding: 6px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-panel); color: var(--text-main);" oninput="updateEffectDescriptorsDirect(${pIdx}, ${eIdx}, this.value)">
              </div>
              
              <div class="power-notes-row" style="margin-top: 0;">
                <label style="min-width: 80px;">Notes:</label>
                <textarea rows="1" placeholder="Details, limits, or custom sense descriptions..." oninput="this.style.height = ''; this.style.height = this.scrollHeight + 'px'; updateEffectNotesDirect(${pIdx}, ${eIdx}, this.value)">${effect.notes || ''}</textarea>
              </div>
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
            <span class="secondary-text" style="font-weight: normal; font-size: 13px;">(${summaryText})</span>
          </div>

          <div style="display: flex; align-items: center; gap: 12px;" onclick="event.stopPropagation();">
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

window.addOptionSubPower = function(pIdx, eIdx, selectId) {
  const sel = document.getElementById(selectId);
  if (!sel || !sel.value || sel.value.startsWith("- Select")) return;
  const optChoice = sel.value;
  const effect = char.powers[pIdx].effects[eIdx];

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
    modifiers: []
  });

  sel.selectedIndex = 0;
  buildPowersUI();
  refreshUI();
};

window.addSubPowerMeta = function(pIdx, eIdx, subIdx, selectId) {
  const sel = document.getElementById(selectId);
  if (!sel || !sel.value || sel.value.startsWith("- Select") || sel.value.startsWith("- None")) return;
  const metaName = sel.value;
  const effect = char.powers[pIdx].effects[eIdx];

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

    sub.modifiers.push({
      name: metaName,
      ranks: 1,
      cost: mCost, 
      costType: mType,
      category: mCategory,
      isMeta: true
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
  if (char.powers[pIdx] && char.powers[pIdx].effects[eIdx] && char.powers[pIdx].effects[eIdx].subPowers) {
    char.powers[pIdx].effects[eIdx].subPowers.splice(subIdx, 1);
    
    let maxR = window.getMaxPowerRank(char.powers[pIdx].effects[eIdx]);
    if (char.powers[pIdx].effects[eIdx].rank > maxR) {
        char.powers[pIdx].effects[eIdx].rank = maxR;
    }

    buildPowersUI();
    refreshUI();
  }
};

window.stepSubPowerRank = function(pIdx, eIdx, subIdx, delta, minVal, maxVal) {
  if (char.powers[pIdx] && char.powers[pIdx].effects[eIdx] && char.powers[pIdx].effects[eIdx].subPowers && char.powers[pIdx].effects[eIdx].subPowers[subIdx]) {
    let sub = char.powers[pIdx].effects[eIdx].subPowers[subIdx];
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
  const sub = char.powers[pIdx].effects[eIdx].subPowers[subIdx];
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
  if (char.powers[pIdx] && char.powers[pIdx].effects[eIdx] && char.powers[pIdx].effects[eIdx].subPowers && char.powers[pIdx].effects[eIdx].subPowers[subIdx]) {
    let sMod = char.powers[pIdx].effects[eIdx].subPowers[subIdx].modifiers[modIdx];
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
  if (char.powers[pIdx] && char.powers[pIdx].effects[eIdx] && char.powers[pIdx].effects[eIdx].subPowers && char.powers[pIdx].effects[eIdx].subPowers[subIdx]) {
    char.powers[pIdx].effects[eIdx].subPowers[subIdx].modifiers.splice(modIdx, 1);
    buildPowersUI();
    refreshUI();
  }
};

window.addAfflictionCondition = function(pIdx, eIdx, degKey, selectId) {
    const sel = document.getElementById(selectId);
    if(!sel || !sel.value || sel.value.startsWith("-")) return;
    if(!char.powers[pIdx].effects[eIdx].options) char.powers[pIdx].effects[eIdx].options = {};
    char.powers[pIdx].effects[eIdx].options[degKey] = sel.value;
    sel.selectedIndex = 0;
    buildPowersUI();
    refreshUI();
};

window.removeAfflictionCondition = function(pIdx, eIdx, degKey) {
    if(char.powers[pIdx].effects[eIdx].options) {
        char.powers[pIdx].effects[eIdx].options[degKey] = "";
        buildPowersUI();
        refreshUI();
    }
};

window.resetEffect = function(pIdx, eIdx) {
  if (char.powers[pIdx] && char.powers[pIdx].effects[eIdx]) {
      let effect = char.powers[pIdx].effects[eIdx];
      
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
    if (char.powers[pIdx]) {
        let assoc = "primary";
        if (char.powers[pIdx].effects.length > 0) {
            assoc = "alternate";
        }
        char.powers[pIdx].effects.push({
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
  if (!btnAdd) return;
  btnAdd.textContent = "+ Add New Power Container"; 
  btnAdd.addEventListener("click", () => {
    char.powers.push({
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
  if (char.powers[index]) {
    char.powers[index].collapsed = !char.powers[index].collapsed;
    const card = document.getElementById(`powerCard_${index}`);
    const icon = document.getElementById(`powerCollapseIcon_${index}`);
    const btn = document.getElementById(`btnPowerCollapse_${index}`);
    if (card && icon) {
      if (char.powers[index].collapsed) {
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
  if (char.powers[pIdx] && char.powers[pIdx].effects[eIdx]) {
    char.powers[pIdx].effects[eIdx].descriptors = value;
  }
};

window.updateEffectNotesDirect = function(pIdx, eIdx, value) {
  if (char.powers[pIdx] && char.powers[pIdx].effects[eIdx]) {
    char.powers[pIdx].effects[eIdx].notes = value;
  }
};

window.updateEffectOptionSelect = function(pIdx, eIdx, optionKey, value) {
  if (char.powers[pIdx] && char.powers[pIdx].effects[eIdx]) {
    if (!char.powers[pIdx].effects[eIdx].options) char.powers[pIdx].effects[eIdx].options = {};
    char.powers[pIdx].effects[eIdx].options[optionKey] = value;
    buildPowersUI();
    refreshUI();
  }
};

window.updateEffectOptionText = function(pIdx, eIdx, optionKey, value) {
  if (char.powers[pIdx] && char.powers[pIdx].effects[eIdx]) {
    if (!char.powers[pIdx].effects[eIdx].options) char.powers[pIdx].effects[eIdx].options = {};
    char.powers[pIdx].effects[eIdx].options[optionKey] = value;
  }
};

window.updateEffectDirect = function(pIdx, eIdx, value, skipHistory = false) {
  if (char.powers[pIdx] && char.powers[pIdx].effects[eIdx]) {
    let effect = char.powers[pIdx].effects[eIdx];
    
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
  if (char.powers[pIdx] && char.powers[pIdx].effects[eIdx]) {
    if (prop === 'rank') {
      let val = parseInt(value) || 1;
      let effect = char.powers[pIdx].effects[eIdx];
      let maxRank = window.getMaxPowerRank(effect);
      if (val > maxRank) val = maxRank;
      if (val < 1) val = 1;
      char.powers[pIdx].effects[eIdx][prop] = val;
    } else {
      char.powers[pIdx].effects[eIdx][prop] = value;
    }
    buildPowersUI();
    refreshUI();
  }
};

window.stepEffectRank = function(pIdx, eIdx, delta) {
  if (char.powers[pIdx] && char.powers[pIdx].effects[eIdx]) {
    let effect = char.powers[pIdx].effects[eIdx];
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
  if (char.powers[index]) {
    let warningsDisabled = localStorage.getItem("mm4e_disable_delete_warning") === "true";
    if (!warningsDisabled) {
        if (!confirm("Are you sure you want to delete this entire power container and all its effects?")) {
            return;
        }
    }
    char.powers.splice(index, 1);
    buildPowersUI();
    refreshUI();
  }
};

window.deleteEffect = function(pIdx, eIdx) {
    if (char.powers[pIdx] && char.powers[pIdx].effects) {
        char.powers[pIdx].effects.splice(eIdx, 1);
        if (char.powers[pIdx].effects.length === 0) {
            char.powers.splice(pIdx, 1);
        } else if (char.powers[pIdx].effects.length === 1) {
            char.powers[pIdx].effects[0].association = "primary";
        }
        buildPowersUI();
        refreshUI();
    }
};

window.addModifierToEffect = function(pIdx, eIdx, selectElemId) {
  const sel = document.getElementById(selectElemId);
  if (!sel || !sel.value) return;
  const modName = sel.value;
  const effect = char.powers[pIdx].effects[eIdx];

  let effName = effect.effectName;
  let effData = POWER_EFFECTS_LIST.find(e => e.name === effName);
  let modData = null;

  if (typeof POWER_MODIFIERS_LIST !== 'undefined') {
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
  if (!modData) modData = { name: modName, cost: 1, costType: "flat", category: "extra" };

  if (!effect.modifiers) effect.modifiers = [];
  effect.modifiers.push({
    name: modName,
    ranks: 1,
    cost: modData.cost,
    costType: modData.costType,
    category: modData.category
  });
  sel.value = "";
  buildPowersUI();
  refreshUI();
};

window.stepModifierRank = function(pIdx, eIdx, modIdx, delta, minVal, maxVal) {
  if (char.powers[pIdx] && char.powers[pIdx].effects[eIdx] && char.powers[pIdx].effects[eIdx].modifiers && char.powers[pIdx].effects[eIdx].modifiers[modIdx]) {
    let val = (parseInt(char.powers[pIdx].effects[eIdx].modifiers[modIdx].ranks) || 1) + delta;
    if (minVal !== undefined && val < minVal) val = minVal;
    if (maxVal !== undefined && val > maxVal) val = maxVal;
    char.powers[pIdx].effects[eIdx].modifiers[modIdx].ranks = val;
    buildPowersUI();
    refreshUI();
  }
};

window.removeModifier = function(pIdx, eIdx, modIdx) {
  if (char.powers[pIdx] && char.powers[pIdx].effects[eIdx] && char.powers[pIdx].effects[eIdx].modifiers) {
    char.powers[pIdx].effects[eIdx].modifiers.splice(modIdx, 1);
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
                    <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap; font-size: 12px; color: var(--text-muted);">
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
                    <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap; font-size: 12px; color: var(--text-muted);">
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

  buildSkillsUI();
  buildAdvantagesUI();
  buildPowersUI();
  buildEquipmentUI();
  refreshUI();
}

function applyLoadedCharacter(loaded) {
  if (!loaded) return;
  char.deserialize(loaded);
  populateUIFromCharacter();
}

function refreshUI() {
  document.getElementById("lblHeroName").textContent = char.name;
  document.getElementById("lblPL").textContent = char.powerLevel;

  if (typeof MEASUREMENT_TABLE !== 'undefined') {
    const massData = MEASUREMENT_TABLE[char.massRank ? char.massRank.toString() : "3"];
    const massStr = massData ? massData.mass_imp : "Special";
    document.getElementById("lblHeroMassVal").textContent = `(${massStr})`;
  }

  const pp = char.powerPointsSummary;
  document.getElementById("lblAbilPP").textContent = `${pp.abilities} PP`;
  document.getElementById("lblCombatPP").textContent = `${pp.combat} PP`;
  document.getElementById("lblResistPP").textContent = `${pp.resistances} PP`;
  document.getElementById("lblSkillPP").textContent = `${pp.skills} PP`;
  document.getElementById("lblAdvPP").textContent = `${pp.advantages} PP`;
  document.getElementById("lblPowerPP").textContent = `${pp.powers} PP`;
  document.getElementById("lblTotalPP").textContent = `${pp.totalSpent} / ${char.totalPointsAllowed} PP`;

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
    
    if (derived.airSpeed !== null) {
      const airDist = MEASUREMENT_TABLE[derived.airSpeed] ? MEASUREMENT_TABLE[derived.airSpeed].dist_imp : "Special";
      document.getElementById("resAirSpeed").textContent = `Rank ${derived.airSpeed} (${airDist})`;
    } else {
      document.getElementById("resAirSpeed").textContent = "—";
    }

    const waterDist = MEASUREMENT_TABLE[derived.waterSpeed] ? MEASUREMENT_TABLE[derived.waterSpeed].dist_imp : "Special";
    document.getElementById("resWaterSpeed").textContent = `Rank ${derived.waterSpeed} (${waterDist})`;
    document.getElementById("resSpaceSpeed").textContent = "—";
    
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

  init: async function() {
    const saved = await FolderStore.getSavedFolder();
    if (saved && saved.handle) {
      this.activeDirectoryHandle = saved.handle;
      this.activeDirectoryName = saved.name || saved.handle.name || "Custom Folder";
    }
    this.updateFolderUI();
    this.updateFileStatusUI();
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
    if (this.currentFileName) {
      badge.textContent = `[${this.currentFileName}]`;
      badge.title = `Active File: ${this.currentFileName}`;
    } else {
      badge.textContent = `[Unsaved Character]`;
      badge.title = `Unsaved Character`;
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

  // Save As: Opens native OS save dialog to choose any directory/filename, or downloads
  saveHeroAs: async function() {
    const safeHeroName = char.name ? char.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() : "hero";
    const defaultFileName = `${safeHeroName}.mm4e`;
    const payload = JSON.stringify(char.serialize(), null, 2);

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
    this.updateFileStatusUI();

    const isFF = typeof navigator !== 'undefined' && (/firefox/i.test(navigator.userAgent) || !window.showSaveFilePicker);
    if (isFF) {
      showToast(`Saved "${defaultFileName}" to Downloads! (Tip: In Firefox Settings > Downloads, check "Always ask where to save" to choose folders)`, "info", 6500);
    } else {
      showToast(`Saved "${defaultFileName}" to downloads!`, "success");
    }
    return true;
  },

  // Save: Writes directly to the active file handle in-place, or prompts Save As
  saveHero: async function() {
    if (!this.currentFileHandle) {
      return this.saveHeroAs();
    }

    const payload = JSON.stringify(char.serialize(), null, 2);
    try {
      const writable = await this.currentFileHandle.createWritable();
      await writable.write(payload);
      await writable.close();
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
                <ul style="margin-left: 16px; margin-top: 4px;">
                  <li><strong>Recommended:</strong> Check <em>"Always ask you where to save files"</em> so Firefox prompts you with a folder picker every time you save.</li>
                  <li>Or click <strong>"Browse..."</strong> next to <em>Save files to</em> to choose your default character folder.</li>
                </ul>
              </li>
            </ol>
            <p style="color: var(--text-muted); font-size: var(--font-size-secondary);">Tip: In Chrome or Edge, direct folder picking works out of the box via the File System Access API.</p>
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
    const isUnsaved = !this.currentFileName;
    const msg = isUnsaved 
      ? "Create a new hero? Any unsaved changes will be lost." 
      : `Create a new hero? Current file "${this.currentFileName}" will be closed.`;

    if (confirm(msg)) {
      char.reset();
      this.currentFileHandle = null;
      this.currentFileName = null;
      this.updateFileStatusUI();
      populateUIFromCharacter();
      showToast("New hero sheet created.", "info");
    }
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

      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        try {
          const loadedData = JSON.parse(uploadEvent.target.result);
          applyLoadedCharacter(loadedData);
          FileManager.currentFileHandle = null;
          FileManager.currentFileName = file.name;
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
}

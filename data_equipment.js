// Mutants & Masterminds 4th Edition - Equipment & HQ Data

const EQUIPMENT_GEAR_LIST = [
  { name: "Antitoxin", cost: 1, type: "Defensive", description: "+5 bonus on resistance checks against toxins." },
  { name: "Flare Goggles", cost: 1, type: "Defensive", description: "Provides Resistance to Visual Dazzle effects." },
  { name: "Fire Extinguisher", cost: 1, type: "Defensive", description: "Puts out a fire up to rank 2 in distance rank 0 radius. Contains 2 uses." },
  { name: "Gas Mask", cost: 1, type: "Defensive", description: "Immunity to inhaled gases and face-directed gases." },
  { name: "Rebreather", cost: 2, type: "Defensive", description: "Provides a few minutes of breathable air for Immunity to Suffocation." },
  { name: "Binoculars", cost: 1, type: "General", description: "Visual Perception checks at a greater distance (like Extended Vision 1)." },
  { name: "Burglary Tools", cost: 1, type: "General", description: "Removes penalties for picking locks and overcoming security systems." },
  { name: "Commlink", cost: 1, type: "General", description: "Radio Communication 1 with the One-Way flaw." },
  { name: "Cutting Torch", cost: 2, type: "General", description: "Close Penetrating Damage 1." },
  { name: "Evidence Kit", cost: 1, type: "General", description: "Tools for gather evidence use of Investigation skill. (2 pts for portable crime lab)." },
  { name: "First-Aid Kit", cost: 1, type: "General", description: "Tools for the Treatment skill (antiseptic, bandages, etc)." },
  { name: "Flashlight", cost: 1, type: "General", description: "Negates concealment for darkness within illuminated Cone Area." },
  { name: "Mini-Computer", cost: 1, type: "General", description: "Tools necessary for use of the Computers skill." },
  { name: "Multi-Tool", cost: 1, type: "General", description: "Lessens penalty for lacking appropriate tools to -2 instead of -5." },
  { name: "Night Vision Goggles", cost: 1, type: "General", description: "Grants Low-Light Vision while worn." },
  { name: "Restraints", cost: 1, type: "General", description: "DC 20 Sleight of Hand to escape, Toughness 5 to break." },
  { name: "Tracer", cost: 1, type: "General", description: "Tiny radio transmitter. Effectively Communication rank 1." },
  { name: "Climbing Cable", cost: 1, type: "Movement", description: "Scale walls like 1 rank of Wall-Crawling." },
  { name: "Climbing Gear", cost: 1, type: "Movement", description: "+2 bonus to Athletics checks to climb." },
  { name: "Glider", cost: 6, type: "Movement", description: "Flight 6 with the Gliding flaw." },
  { name: "Parachute", cost: 1, type: "Movement", description: "Safe Fall effect of Enhancement Movement." },
  { name: "Roller-skates / Inline-skates", cost: 1, type: "Movement", description: "+5 bonus for Athletics checks to move faster along suitable surfaces." },
  { name: "Skateboard", cost: 1, type: "Movement", description: "+5 bonus for Athletics checks to move faster along suitable surfaces." },
  { name: "Stealth Suit", cost: 1, type: "Movement", description: "+5 bonus on Stealth skill checks to remain unseen." },
  { name: "Swing Line", cost: 2, type: "Movement", description: "Benefits of the Swinging effect of Enhanced Movement." }
];

const EQUIPMENT_WEAPONS_LIST = [
  // Close Weapons
  { name: "Axe", cost: 5, effect: "Str-based Damage 3 (slashing)", critical: "19-20", category: "Close" },
  { name: "Brass Knuckles", cost: 1, effect: "Damage 1 (bludgeoning)", critical: "20", category: "Close" },
  { name: "Chain", cost: 6, effect: "Damage 2 (bludgeoning), Grab, Trip, Reach 2", critical: "20", category: "Close" },
  { name: "Chainsaw", cost: 9, effect: "Damage 6 (slashing), Penetrating 2", critical: "19-20", category: "Close" },
  { name: "Club", cost: 2, effect: "Str-based Damage 2 (bludgeoning)", critical: "20", category: "Close" },
  { name: "Dagger", cost: 2, effect: "Str-based Damage 1 (piercing)", critical: "19-20", category: "Close" },
  { name: "Flail", cost: 5, effect: "Str-based Damage 2 (bludgeoning), Disarm, Reach", critical: "19-20", category: "Close" },
  { name: "Garrote", cost: 1, effect: "Sleeper Hold", critical: "-", category: "Close" },
  { name: "Hammer", cost: 4, effect: "Str-based Damage 3 (bludgeoning), Smash", critical: "20", category: "Close" },
  { name: "Hook Sword", cost: 7, effect: "Str-based Damage 3 (slashing), Disarm, Reach or Split, Trip", critical: "20", category: "Close" },
  { name: "Javelin", cost: 3, effect: "Str-based Damage 1 (piercing), Thrown", critical: "19-20", category: "Close" },
  { name: "Katar", cost: 3, effect: "Str-based Damage 2 (piercing), Penetrating 1", critical: "20", category: "Close" },
  { name: "Mace", cost: 3, effect: "Str-based Damage 2 (bludgeoning)", critical: "19-20", category: "Close" },
  { name: "Pepper Spray", cost: 4, effect: "Close Visual Dazzle 4 (chemical)", critical: "20", category: "Close" },
  { name: "Sai", cost: 3, effect: "Str-based Damage 1 (bludgeoning, piercing), Disarm, Bind", critical: "20", category: "Close" },
  { name: "Sash", cost: 3, effect: "Fast Grab, Improved Grab, Reach", critical: "20", category: "Close" },
  { name: "Spear", cost: 4, effect: "Str-based Damage 2 (piercing), Reach, Thrown", critical: "19-20", category: "Close" },
  { name: "Staff", cost: 3, effect: "Str-based Damage 2 (bludgeoning), Split", critical: "20", category: "Close" },
  { name: "Stun Gun", cost: 5, effect: "Stun 5 (electrical)", critical: "20", category: "Close" },
  { name: "Sword", cost: 3, effect: "Str-based Damage 3 (slashing)", critical: "20", category: "Close" },
  { name: "Tonfa", cost: 3, effect: "Str-based Damage 2, Defensive", critical: "20", category: "Close" },
  { name: "Trident", cost: 5, effect: "Str-based Damage 3 (piercing), Disarm, Reach", critical: "19-20", category: "Close" },
  { name: "War Fan", cost: 3, effect: "Str-based Damage 1 (slashing), Concealed, Defensive", critical: "20", category: "Close" },
  { name: "Whip", cost: 5, effect: "Damage 1, Disarm, Fast Grab, Reach 2", critical: "20", category: "Close" },

  // Firearms
  { name: "Holdout pistol", cost: 5, effect: "Ranged Damage 2", critical: "20", category: "Firearms" },
  { name: "Light pistol", cost: 6, effect: "Ranged Damage 3", critical: "20", category: "Firearms" },
  { name: "Heavy pistol", cost: 8, effect: "Ranged Damage 4", critical: "20", category: "Firearms" },
  { name: "Rifle", cost: 8, effect: "Ranged Damage 4", critical: "20", category: "Firearms" },
  { name: "Rifle, high-power", cost: 10, effect: "Ranged Damage 5", critical: "20", category: "Firearms" },
  { name: "Assault Rifle", cost: 15, effect: "Ranged Multiattack Damage 5", critical: "20", category: "Firearms" },
  { name: "Sniper Rifle", cost: 11, effect: "Ranged Damage 5, Extended Range", critical: "20", category: "Firearms" },
  { name: "Shotgun", cost: 10, effect: "Ranged Damage 5*", critical: "20", category: "Firearms" },
  { name: "Machine pistol", cost: 9, effect: "Ranged Multiattack Damage 3", critical: "20", category: "Firearms" },
  { name: "Submachine gun", cost: 12, effect: "Ranged Multiattack Damage 4", critical: "20", category: "Firearms" },

  // Other Guns
  { name: "Air Gun", cost: 10, effect: "Ranged Stun 5", critical: "20", category: "Other Guns" },
  { name: "Dart Gun", cost: 5, effect: "Ranged Toxin 5, Resistible by Toughness", critical: "20", category: "Other Guns" },
  { name: "Flare Gun", cost: 2, effect: "Environment 2 (Illumination)", critical: "-", category: "Other Guns" },
  { name: "Paintball Gun", cost: 1, effect: "Feature 1 or Ranged Affliction", critical: "-", category: "Other Guns" },

  // Bows
  { name: "Bow", cost: 6, effect: "Ranged Damage 3", critical: "20", category: "Bows" },
  { name: "Crossbow", cost: 7, effect: "Ranged Damage 3", critical: "19-20", category: "Bows" },

  // Thrown Weapons
  { name: "Blowgun", cost: 4, effect: "Ranged Toxin 5, Diminished Range, Resistible by Toughness", critical: "-", category: "Thrown" },
  { name: "Bolos", cost: 8, effect: "Snare 4", critical: "20", category: "Thrown" },
  { name: "Boomerang", cost: 2, effect: "Ranged Damage 1", critical: "20", category: "Thrown" },
  { name: "Chakram", cost: 7, effect: "Ranged Damage 3", critical: "19-20", category: "Thrown" },
  { name: "Javelin", cost: 4, effect: "Ranged Damage 2", critical: "20", category: "Thrown" },
  { name: "Shuriken", cost: 3, effect: "Ranged Multiattack Damage 1", critical: "20", category: "Thrown" },

  // Energy Weapons
  { name: "Blaster pistol", cost: 10, effect: "Ranged Damage 5", critical: "20", category: "Energy" },
  { name: "Blaster rifle", cost: 16, effect: "Ranged Damage 8", critical: "20", category: "Energy" },
  { name: "Taser", cost: 10, effect: "Ranged Stun 5", critical: "20", category: "Energy" },

  // Heavy Weapons
  { name: "Flamethrower", cost: 13, effect: "Cone or Line Area Damage 6", critical: "20", category: "Heavy" },
  { name: "Grenade Launcher", cost: 15, effect: "Sphere Area Ranged Damage 5", critical: "-", category: "Heavy" },
  { name: "Machine-gun", cost: 14, effect: "Ranged Multiattack Damage 7", critical: "20", category: "Heavy" },
  { name: "Rocket Launcher", cost: 27, effect: "Ranged Damage 10, Sphere Area 7", critical: "20", category: "Heavy" }
];

const EQUIPMENT_GRENADES_LIST = [
  { name: "Fragmentation", cost: 15, effect: "Sphere Area Damage 5", dodgeDC: 15 },
  { name: "Smoke", cost: 8, effect: "Visual Obscure 4", dodgeDC: 14 },
  { name: "Flash", cost: 12, effect: "Sphere Area Visual Dazzle 4", dodgeDC: 14 },
  { name: "Flash-bang", cost: 16, effect: "Sphere Area Dazzle 4", dodgeDC: 14 },
  { name: "Sleep gas", cost: 12, effect: "Sphere Area Stun 4", dodgeDC: 14 },
  { name: "Tear gas", cost: 16, effect: "Sphere Area Affliction 4", dodgeDC: 14 },
  { name: "Dynamite", cost: 15, effect: "Sphere Area Damage 5", dodgeDC: 15 },
  { name: "Plastic explosive", cost: 30, effect: "Sphere Area Damage 10", dodgeDC: 20 }
];

const EQUIPMENT_ARMOR_LIST = [
  { name: "Leather", cost: 1, effect: "Protection 1", category: "Archaic" },
  { name: "Chain-mail", cost: 7, effect: "Protection 3, Hardened 1", category: "Archaic" },
  { name: "Plate-mail", cost: 11, effect: "Protection 5, Hardened 1", category: "Archaic" },
  { name: "Full-plate", cost: 14, effect: "Protection 6, Hardened 2", category: "Archaic" },
  { name: "Armor cloth", cost: 1, costType: "per_rank", effect: "Hardened Toughness 1+", category: "Modern" },
  { name: "Undercover shirt", cost: 3, effect: "Protection 2, Limited to Ballistic, Hardened 1, Subtle", category: "Modern" },
  { name: "Bulletproof vest", cost: 4, effect: "Protection 4, Limited to Ballistic, Hardened 1, Subtle", category: "Modern" },
  { name: "Armored costume", cost: 1, costType: "per_rank", effect: "Protection (possibly Hardened)", category: "Modern" },
  { name: "Fire resistant", cost: 3, effect: "Resistance to Fire Damage", category: "Modern" },
  { name: "Small shield", cost: 2, effect: "Enhanced Defense 1", category: "Shields" },
  { name: "Medium shield", cost: 4, effect: "Enhanced Defense 2", category: "Shields" },
  { name: "Large shield", cost: 6, effect: "Enhanced Defense 3", category: "Shields" }
];

const VEHICLES_LIST = [
  { name: "Motorcycle", size: 0, strength: 2, speed: 8, defense: 0, toughness: 5, cost: 10, category: "Ground" },
  { name: "Car", size: 1, strength: 5, speed: 7, defense: -1, toughness: 8, cost: 10, category: "Ground" },
  { name: "Police Cruiser", size: 1, strength: 6, speed: 8, defense: -1, toughness: 9, cost: 13, category: "Ground" },
  { name: "Limousine", size: 2, strength: 8, speed: 7, defense: -2, toughness: 9, cost: 14, category: "Ground" },
  { name: "Truck", size: 2, strength: 9, speed: 7, defense: -2, toughness: 9, cost: 15, category: "Ground" },
  { name: "Armored Car", size: 2, strength: 8, speed: 7, defense: -2, toughness: 12, cost: 23, category: "Ground" },
  { name: "Tank", size: 2, strength: 10, speed: 6, defense: -2, toughness: 12, cost: 76, category: "Ground" },
  { name: "APC", size: 2, strength: 12, speed: 6, defense: -2, toughness: 12, cost: 46, category: "Ground" },
  { name: "BUS", size: 3, strength: 12, speed: 7, defense: -3, toughness: 11, cost: 17, category: "Ground" },
  { name: "Semi", size: 3, strength: 13, speed: 7, defense: -3, toughness: 11, cost: 18, category: "Ground" },
  { name: "Train engine", size: 2, strength: 10, speed: 7, defense: -2, toughness: 10, cost: 16, category: "Ground" },
  
  { name: "Jet-Ski", size: 0, strength: 2, speed: 7, defense: 0, toughness: 7, cost: 10, category: "Water" },
  { name: "Sailboat", size: 2, strength: 6, speed: 5, defense: -1, toughness: 6, cost: 6, category: "Water" },
  { name: "Speedboat", size: 1, strength: 6, speed: 8, defense: -1, toughness: 7, cost: 12, category: "Water" },
  { name: "Yacht", size: 2, strength: 10, speed: 7, defense: -2, toughness: 9, cost: 15, category: "Water" },
  { name: "Cutter", size: 3, strength: 13, speed: 7, defense: -3, toughness: 12, cost: 37, category: "Water" },
  { name: "Destroyer", size: 4, strength: 16, speed: 7, defense: -4, toughness: 14, cost: 50, category: "Water" },
  { name: "Cruise ship", size: 5, strength: 20, speed: 7, defense: -5, toughness: 15, cost: 25, category: "Water" },
  { name: "Battleship", size: 5, strength: 20, speed: 7, defense: -5, toughness: 16, cost: 76, category: "Water" },
  { name: "Submarine", size: 4, strength: 16, speed: 4, defense: -4, toughness: 13, cost: 39, category: "Water" },
  
  { name: "Two-seater plane", size: 1, strength: 6, speed: 8, defense: -1, toughness: 8, cost: 13, category: "Air" },
  { name: "Helicopter", size: 2, strength: 8, speed: 9, defense: -2, toughness: 9, cost: 24, category: "Air" },
  { name: "Military copter", size: 2, strength: 8, speed: 10, defense: -2, toughness: 11, cost: 70, category: "Air" },
  { name: "Private Jet", size: 3, strength: 12, speed: 10, defense: -3, toughness: 11, cost: 30, category: "Air" },
  { name: "Jumbo Jet", size: 4, strength: 16, speed: 9, defense: -4, toughness: 13, cost: 32, category: "Air" },
  { name: "Fighter Jet", size: 3, strength: 10, speed: 14, defense: -3, toughness: 10, cost: 89, category: "Air" },
  { name: "Bomber", size: 4, strength: 13, speed: 11, defense: -4, toughness: 13, cost: 87, category: "Air" },
  
  { name: "Space Shuttle", size: 4, strength: 16, speed: 14, defense: -4, toughness: 13, cost: 42, category: "Space" },
  { name: "Space Fighter", size: 3, strength: 10, speed: 16, defense: -3, toughness: 11, cost: 60, category: "Space" },
  { name: "Space Cruiser", size: 4, strength: 18, speed: 16, defense: -4, toughness: 15, cost: 116, category: "Space" },
  { name: "Space Battleship", size: 5, strength: 22, speed: 18, defense: -5, toughness: 18, cost: 139, category: "Space" },

  { name: "Dimension Hopper", size: 2, strength: 8, speed: "6 + Move", defense: -2, toughness: 9, cost: "6+", category: "Exotic" },
  { name: "Mole Machine", size: 2, strength: 11, speed: 6, defense: -2, toughness: 12, cost: 18, category: "Exotic" },
  { name: "Time Machine", size: 2, strength: 8, speed: "6 + Move", defense: -2, toughness: 9, cost: "6+", category: "Exotic" }
];

const INSTALLATION_FEATURES = [
  "Combat Simulator", "Communications", "Computer System", "Concealed", "Defense System", "Deathtraps", 
  "Dimensional Portal", "Dock", "Dual Size", "Effect", "Fire Prevention System", "Garage", "Grounds", "Gym", 
  "Hangar", "Habitat", "Holding Cells", "Infirmary", "Intelligent", "Isolated", "Laboratory", "Library", 
  "Living Space", "Movable", "Personnel", "Power System", "Remote Feature", "Sealed", "Secret", 
  "Security System", "Self-Repairing", "Teleport Lock", "Temporal Limbo", "Trophy Room", "Variable Environment", "Workshop"
];

const STOCK_INSTALLATIONS = [
  { name: "Abandoned Warehouse", size: 4, toughness: 8, cost: 14, features: "Communications, Computer, Concealed, Garage, Gym, Living Space, Power System, Security System" },
  { name: "Moon-Base", size: 9, toughness: 20, cost: 39, features: "Combat Simulator, Communications, Computer, Defense System, Fire Prevention System, Gym, Hangar, Holding Cells, Infirmary, Isolated, Laboratory, Living Space, Power System, Security System, Teleport, Workshop" },
  { name: "Orbiting Satellite", size: 8, toughness: 20, cost: 37, features: "Combat Simulator, Communications, Computer, Defense System, Fire Prevention System, Gym, Hangar, Holding Cells, Infirmary, Isolated, Laboratory, Living Space, Power System, Security System, Teleport" },
  { name: "Sanctum Sanctorum", size: 4, toughness: 10, cost: 15, features: "Concealed, Dual-Size (Huge), Laboratory, Library, Living Space, Security System, Workshop" },
  { name: "Sea-Base", size: 6, toughness: 14, cost: 23, features: "Communications, Computer, Concealed, Dock, Fire Prevention System, Isolated, Living Space, Power System, Security System" },
  { name: "Skyscraper (5 Floors)", size: 5, toughness: 10, cost: 20, features: "Communications, Computer, Defense System, Fire Prevention System, Gym, Hangar, Infirmary, Laboratory, Library, Living Space, Power System, Security System, Workshop" },
  { name: "Stately Manor", size: 5, toughness: 10, cost: 23, features: "Communications, Computer, Concealed, Dock, Garage, Gym, Hangar, Infirmary, Laboratory, Library, Living Space, Power System, Security System, Workshop" },
  { name: "Underground Lair", size: 5, toughness: 14, cost: 25, features: "Communications, Computer, Concealed, Defense System, Garage, Holding Cells, Isolated, Laboratory, Library, Living Space, Power System, Security System" },
  { name: "Urban Fortress", size: 4, toughness: 12, cost: 26, features: "Combat Simulator, Communications, Computer, Concealed, Defense System, Fire Prevention System, Garage, Gym, Holding Cells, Infirmary, Living Space, Power System, Security System, Workshop" }
];
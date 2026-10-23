// --- DATA: POWER MODIFIERS (EXTRAS AND FLAWS) ---
// Complete, unabridged 4th Edition rules definitions for all modifiers

const POWER_MODIFIERS_LIST = [
  {
    "name": "Accurate",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "description": "+2 bonus per rank to attack checks made with this effect.",
    "fullText": "ACCURATE\n1 POINT PER RANK FLAT\nAn effect with this extra is especially accurate; you get a +2 bonus per Accurate rank to attack checks made with it. Accurate provides a flat point bonus rather than adding to effect rank, but the total attack bonus plus effect rank is still subject to Power Level limits."
  },
  {
    "name": "Affects Corporeal",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Allows incorporeal beings to affect the corporeal world with a personal or touch effect.",
    "fullText": "AFFECTS CORPOREAL\n+1 POINT PER RANK\nAn incorporeal being can use an effect with this extra on the corporeal world. The effect functions normally against corporeal targets while you are Insubstantial. See the Insubstantial effect description for full details on incorporeal interactions."
  },
  {
    "name": "Affects Insubstantial",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "maxRanks": 2,
    "description": "Works on insubstantial targets (half effect at rank 1, full effectiveness at rank 2).",
    "fullText": "AFFECTS INSUBSTANTIAL\n1 OR 2 POINTS FLAT\nAn effect with this extra works on insubstantial targets, in addition to having its normal effect on corporeal targets. Rank 1 allows the effect to function against insubstantial targets at half effectiveness (target gains Resistance against it). Rank 2 allows the effect to function against insubstantial targets with full effectiveness."
  },
  {
    "name": "Affects Objects",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Fortitude-resisted effect works on non-living objects (+0 if Objects Only).",
    "fullText": "AFFECTS OBJECTS\n+0 OR +1 POINT PER RANK\nThis modifier allows effects normally resisted by Fortitude to work on non-living objects. For +1 point per rank, the effect works on both living subjects (resisted by Fortitude) and non-living objects (resisted by Toughness). If the effect Affects Only Objects, it has a net modifier of +0 points per rank."
  },
  {
    "name": "Affects Others",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Grant use of a personal effect to others by touch (+0 if Others Only).",
    "fullText": "AFFECTS OTHERS\n+1 OR +0 POINT PER RANK\nThis extra allows you to give someone else the use of a Personal Range, Sustained or Continuous Duration effect by touching them as a standard action. The recipient controls and benefits from the effect until you take it back or the duration expires. If the effect Affects Only Others, it has a net modifier of +0 points per rank. If combined with Area or Ranged, you can grant the effect to multiple targets or at distance."
  },
  {
    "name": "Alternate Effect",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "description": "Shares a pool of Power Points with another power (1 pt for standard array, 2 pts for dynamic).",
    "fullText": "ALTERNATE EFFECT\n1 OR 2 POINTS FLAT\nAn Alternate Effect is a power array sharing a single pool of Power Points. A standard Alternate Effect costs 1 Power Point flat; only one effect in the array can be active at a time, switched as a free action once per turn. A Dynamic Alternate Effect costs 2 Power Points flat; dynamic effects can share their pool of Power Points simultaneously, dividing ranks among active dynamic effects as desired."
  },
  {
    "name": "Alternate Defense",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Attack check targets an alternate defense class rather than active Defense (+0 or +1).",
    "fullText": "ALTERNATE DEFENSE\n+0 OR +1 POINT PER RANK\nAn attack check with this modifier targets a Defense Class other than the standard active defense (usually targeting Fortitude or Will resistance instead of Defense, or targeting a different defense). If targeting an uncommon defense, it costs +1 point per rank; if shifting between standard active defenses (Dodge/Parry), it is +0."
  },
  {
    "name": "Alternate Resistance",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Resisted by a different resistance check than usual (+0 or +1 pt/rank).",
    "fullText": "ALTERNATE RESISTANCE\n+0 OR +1 POINT PER RANK\nAn effect with this modifier is resisted by a different resistance check than usual. Shifting resistance check to Toughness, Fortitude, or Will is typically +0 points per rank if replacing a comparable resistance, or +1 point per rank if shifting to an inherently harder-to-resist check (such as Dodge or active Defense for damage)."
  },
  {
    "name": "Area Effect (Cone)",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Affects all targets in a cone distance rank 1 long and wide; Dodge check for half.",
    "fullText": "AREA EFFECT (CONE)\n+1 POINT PER RANK\nThe effect fills a cone with a length, width, and height of distance rank 1 radiating outward from you. Targets caught in the cone make a Dodge check vs DC (10 + effect rank) to gain Resistance (halving effect rank); the remaining effect rank is resisted normally. Each additional rank in Area increases the distance rank of the cone by +1."
  },
  {
    "name": "Area Effect (Cube)",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Affects all targets in a cube distance rank 1 on each side; Dodge check for half.",
    "fullText": "AREA EFFECT (CUBE)\n+1 POINT PER RANK\nThe effect fills a cube distance rank 1 on each side within range. Targets caught in the cube make a Dodge check vs DC (10 + effect rank) to gain Resistance (halving effect rank); the remaining effect rank is resisted normally. Each additional rank in Area increases the distance rank of the cube by +1."
  },
  {
    "name": "Area Effect (Line)",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Affects all targets in a straight line distance rank 1 long and 5 ft wide; Dodge check for half.",
    "fullText": "AREA EFFECT (LINE)\n+1 POINT PER RANK\nThe effect fills a straight line path distance rank 1 long and 5 feet (1 space) wide. Targets in the path make a Dodge check vs DC (10 + effect rank) to gain Resistance (halving effect rank); the remaining effect rank is resisted normally. Each additional rank in Area increases the distance rank of the line by +1."
  },
  {
    "name": "Area Effect (Sphere)",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Affects all targets in a sphere distance rank 1 in diameter; Dodge check for half.",
    "fullText": "AREA EFFECT (SPHERE)\n+1 POINT PER RANK\nThe effect fills a sphere distance rank 1 in diameter centered within range. Targets caught in the sphere make a Dodge check vs DC (10 + effect rank) to gain Resistance (halving effect rank); the remaining effect rank is resisted normally. Each additional rank in Area increases the distance rank of the sphere by +1."
  },
  {
    "name": "Area Effect (Shapeable)",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Fills contiguous volume equal to effect rank in 5-ft cubes; Dodge check for half.",
    "fullText": "AREA EFFECT (SHAPEABLE)\n+1 POINT PER RANK\nThe effect fills a contiguous volume equal to the effect's rank in 5-foot (1 space) cubes, arranged in any shape or configuration desired. Targets in the area make a Dodge check vs DC (10 + effect rank) to gain Resistance (halving effect rank); the remaining effect rank is resisted normally."
  },
  {
    "name": "Aura",
    "category": "extra",
    "cost": 3,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Surrounds your body, automatically affecting anyone touching you as a reaction.",
    "fullText": "AURA\n+3 POINTS PER RANK\nThis extra turns a Close Range effect into an ongoing aura around your body. While the aura is active (requiring a free action each round to maintain), anyone who touches you or who you touch in close combat is automatically subjected to the effect as a reaction, with no attack check required."
  },
  {
    "name": "Contagious",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Spreads to anyone coming into physical contact with the target while active.",
    "fullText": "CONTAGIOUS\n+1 POINT PER RANK\nA Contagious effect works on both the original target and anyone coming into physical contact with that target while the effect lasts. The new target receives an immediate resistance check against the effect at its full rank. Secondary targets can likewise spread the contagious effect to others."
  },
  {
    "name": "Dimensional",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "maxRanks": 3,
    "description": "Works on targets in other dimensions (1 pt single, 2 pts group, 3 pts any).",
    "fullText": "DIMENSIONAL\n1-3 POINTS FLAT\nAn effect with this extra can cross dimensional boundaries to affect targets in other dimensions.\n• Rank 1 (1 point): Affects a single specific other dimension (e.g., the Astral Plane or Netherworld).\n• Rank 2 (2 points): Affects a related group of dimensions.\n• Rank 3 (3 points): Affects any dimension."
  },
  {
    "name": "Extended Range",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "maxRanks": 10,
    "description": "Doubles the base distance values for each range category per rank.",
    "fullText": "EXTENDED RANGE\n1 POINT PER RANK FLAT\nEach rank of Extended Range doubles the base distance multiplier for each range category of a Ranged effect: Rank 1 gives Short: 50 ft × rank, Med: 100 ft × rank, Long: 200 ft × rank (+1 distance rank shift per rank)."
  },
  {
    "name": "Feature",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "description": "Adds a minor capability, utility benefit, or cosmetic advantage to an effect (1 PP flat).",
    "fullText": "FEATURE\n1 POINT PER RANK FLAT\nA Feature adds a minor capability, utility benefit, or cosmetic advantage to an effect, equivalent to 1 Power Point. Features provide minor in-game utility without significantly altering the power's combat effectiveness."
  },
  {
    "name": "Hardened",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Roll two d20s taking higher against Damage <= rank; no damage on 2+ degrees success.",
    "fullText": "HARDENED\n+1 POINT PER RANK\nAgainst incoming Damage checks equal to or less than your Hardened rank, roll two d20s and take the higher result. Furthermore, if you achieve 2 or more degrees of success on the resistance check, you suffer no damage conditions whatsoever (ignoring minor hits)."
  },
  {
    "name": "Homing",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "maxRanks": 5,
    "description": "Retries attack check on next turn if attack misses (+1 retry per rank).",
    "fullText": "HOMING\n1 POINT PER RANK FLAT\nIf an attack check with a Homing effect misses its target, the projectile or effect turns around and attempts to strike the target again on your next turn as a free action, using the same attack bonus. Each rank of Homing grants one additional retry attempt (+1 attempt per rank)."
  },
  {
    "name": "Impenetrable",
    "category": "extra",
    "cost": 3,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Immunity to Damage <= rank; completely ignores Penetrating extra.",
    "fullText": "IMPENETRABLE\n+3 POINTS PER RANK\nImpenetrable functions like Impervious (completely ignoring effects with rank equal to or less than your Impenetrable rank), but additionally completely ignores the Penetrating extra. Penetrating attacks cannot pierce Impenetrable defense."
  },
  {
    "name": "Impervious",
    "category": "extra",
    "cost": 2,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Immunity to effects with rank equal to or lower than your Impervious rank.",
    "fullText": "IMPERVIOUS\n+2 POINTS PER RANK\nA defense with Impervious completely negates any incoming attack effect with an effect rank equal to or lower than your Impervious rank; no resistance check is required and you suffer no effect. Attacks with an effect rank greater than your Impervious rank are resisted normally."
  },
  {
    "name": "Increased Duration (Concentration)",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Maintains an Instant effect with a Concentrate action each round.",
    "fullText": "INCREASED DURATION (CONCENTRATION)\n+1 POINT PER RANK\nIncreases the duration of an Instant effect to Concentration. So long as you take a Concentrate action each round, the effect continues to operate on the target without requiring additional attack checks."
  },
  {
    "name": "Increased Duration (Sustained)",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Maintains a Concentration effect with a free Sustain action each round.",
    "fullText": "INCREASED DURATION (SUSTAINED)\n+1 POINT PER RANK\nIncreases the duration of a Concentration effect to Sustained. You can maintain the ongoing effect with a simple free Sustain action on your turn each round, leaving your standard action free."
  },
  {
    "name": "Increased Duration (Continuous)",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Continuous effect lasts without maintenance until dismissed or countered.",
    "fullText": "INCREASED DURATION (CONTINUOUS)\n+1 POINT PER RANK\nIncreases the duration of a Sustained effect to Continuous. The effect remains active without requiring any maintenance actions on your part, continuing even if you are stunned, asleep, or incapacitated, until countered or dismissed."
  },
  {
    "name": "Increased Mass",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "maxRanks": 20,
    "description": "Increases mass rank carried or moved with effect by +1 rank per rank.",
    "fullText": "INCREASED MASS\n1 POINT PER RANK FLAT\nIncreases the mass rank an effect can move, lift, carry, or affect by +1 mass rank per rank of this extra, without increasing the effect's other parameters."
  },
  {
    "name": "Incurable",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": false,
    "description": "Damage cannot be healed by standard Healing or Regeneration without Persistent.",
    "fullText": "INCURABLE\n1 POINT FLAT\nDamage or conditions caused by an Incurable effect cannot be healed by normal rest, Healing, or Regeneration without the Persistent extra. An Incurable effect requires medical treatment or magic capable of overcoming the Incurable descriptor."
  },
  {
    "name": "Indirect",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "maxRanks": 4,
    "description": "Originates from points other than user, bypassing cover (1-4 pts flat).",
    "fullText": "INDIRECT\n1-4 POINTS FLAT\nAn Indirect effect originates from a point other than the user:\n• Rank 1: Originates from a fixed point away from you, aimed towards you or away from that point.\n• Rank 2: Can originate from any point away from you, aimed towards you or fixed direction.\n• Rank 3: Can originate from any point away from you, aimed in a fixed direction.\n• Rank 4: Can originate from any point in range, aimed in any direction.\nIndirect attacks bypass cover and can catch targets Vulnerable or Defenseless if unexpected."
  },
  {
    "name": "Increased Range",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": true,
    "maxRanks": 2,
    "description": "Increases range category (Close to Ranged, or Ranged to Perception).",
    "fullText": "INCREASED RANGE\n+1 POINT PER RANK\nIncreases the range category of an effect by one step per rank:\n• Rank 1 (from Close): Increases to Ranged (Short: 25 ft × rank, Med: 50 ft × rank, Long: 100 ft × rank).\n• Rank 1 (from Ranged): Increases to Perception Range (no attack check needed; works on anything accurately perceived).\n• Rank 2 (from Close): Increases directly to Perception Range (+2 pts/rank)."
  },
  {
    "name": "Insidious",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": false,
    "description": "Result of effect is not noticeable; requires DC 20 check to detect.",
    "fullText": "INSIDIOUS\n1 POINT FLAT\nThe result of an Insidious effect is not noticeable, and is only detected by a skill check (Perception, Medicine, Insight, etc., DC 20) or by its aftereffects. While the target might feel the physical impact of an attack (unless Subtle is also applied), they do not recognize what affected them and may attribute their condition to illness, fatigue, or natural causes."
  },
  {
    "name": "Linked",
    "category": "extra",
    "cost": 0,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Links two or more effects together so they only activate simultaneously as one power.",
    "fullText": "LINKED\n+0 POINTS\nThis modifier applies to two or more effects, linking them together so they only function simultaneously as a single power. You must use all linked effects together; you cannot use one without the others. The linked power uses the action of the slowest effect, and range is determined by the shortest-range effect. A power cannot link multiple damage effects unless they are different descriptors or types. An effect cannot be linked to another effect of the same name."
  },
  {
    "name": "Multiattack",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Rapid fire (+2 to +5 DC on single target), walking fire across targets, or covering fire.",
    "fullText": "MULTIATTACK\n+1 POINT PER RANK\nA Multiattack effect can be used in three different ways:\n• Single Target: Attack a single target with rapid fire; achieving 2 degrees of success adds +2 to the effect rank DC (+5 for 3 or more degrees of success).\n• Multiple Targets: Walk fire across multiple adjacent targets in an arc, taking a -1 penalty on attack checks per target.\n• Covering Fire: Provide covering or suppressing fire to hinder enemy movements or protect allies."
  },
  {
    "name": "Penetrating",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Overcomes Impervious defense rank for rank.",
    "fullText": "PENETRATING\n+1 POINT PER RANK\nA Penetrating effect overcomes Impervious defense. For each rank of Penetrating, the effect ignores 1 rank of Impervious. If Penetrating rank equals or exceeds the target's Impervious rank, the attack is resisted normally with no reduction from Impervious."
  },
  {
    "name": "Perception Range",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Works on anything accurately perceived; requires no attack check.",
    "fullText": "PERCEPTION RANGE\n+1 OR +2 POINTS PER RANK\nExpands the range of an effect to Perception Range (+1 pt/rank from Ranged, +2 pts/rank from Close). The effect can target anything within your line of sight or that you can accurately perceive with a precise sensory sense, requiring no attack check."
  },
  {
    "name": "Precise",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": false,
    "description": "Perform delicate manipulation, fine control, or exclude targets from area.",
    "fullText": "PRECISE\n1 POINT FLAT\nYou can use a power with this modifier to perform tasks requiring delicate, fine control, or precise manipulation, such as picking a lock, typing on a keyboard, or writing your initials. For effects with Area, Precise allows you to exclude specific targets or spaces within the area of effect."
  },
  {
    "name": "Ranged",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Extends a Close Range effect to standard range (25/50/100 ft x rank).",
    "fullText": "RANGED\n+1 POINT PER RANK\nApplied to a Close Range effect, this extra expands its range to Ranged, allowing you to use it at a distance up to standard range (Short: rank × 25 ft., Medium: rank × 50 ft., Long: rank × 100 ft.). A ranged attack requires a ranged attack check against the target's Defense Class."
  },
  {
    "name": "Reach",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "maxRanks": 20,
    "description": "Each rank extends close reach distance by 5 feet (1 space).",
    "fullText": "REACH\n1 POINT PER RANK FLAT\nEach rank of Reach extends the distance at which you can make a Close attack or use a Close effect by 5 feet (1 space). Reach allows you to attack targets without moving into their space or being adjacent."
  },
  {
    "name": "Reaction",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": false,
    "description": "Effect triggers automatically in response to a specified circumstance.",
    "fullText": "REACTION\n+1 POINT PER RANK (OR +3 FROM STANDARD)\nAn effect with this extra functions automatically as a Reaction in response to a specific triggering circumstance (such as being attacked, being touched, or an opponent entering a certain area), requiring no conscious action on your turn."
  },
  {
    "name": "Reversible",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "description": "Can reverse the effects of your power at will as a free action.",
    "fullText": "REVERSIBLE\n1 POINT FLAT\nYou can reverse the effects of your power at will as a free action, instantly returning the target or area to its original state (e.g., removing conditions, restoring transformed objects, or cleaning up altered terrain)."
  },
  {
    "name": "Ricochet",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "maxRanks": 5,
    "description": "Bounce ranged attack off solid surfaces to bypass cover (+1 bounce per rank).",
    "fullText": "RICOCHET\n1 POINT PER RANK FLAT\nYou can bounce a Ranged attack off one or more solid surfaces before it strikes the target. Each rank of Ricochet allows one bounce (+1 bounce per rank), allowing you to bypass cover and strike targets around corners."
  },
  {
    "name": "Secondary Effect",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Instant effect affects target a second time on next round automatically.",
    "fullText": "SECONDARY EFFECT\n+1 POINT PER RANK\nAn Instant duration effect with this extra affects the target a second time on the round immediately following the initial attack, requiring no additional action from you. The target makes a second resistance check against the full effect rank at the start of your next turn."
  },
  {
    "name": "Selective",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Choose precisely who is and is not affected in an Area or multi-target effect.",
    "fullText": "SELECTIVE\n+1 POINT PER RANK\nYou can choose precisely who is and is not affected by your Area or multi-target effect. Allies in the area are completely unaffected while enemies suffer the full effect."
  },
  {
    "name": "Split",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "maxRanks": 10,
    "description": "Divide effect rank among multiple targets (+1 target per rank).",
    "fullText": "SPLIT\n1 POINT PER RANK FLAT\nWith this extra, you can split your effect rank among multiple targets in a single action. Each additional rank of Split allows you to split the effect among one more target (+1 target per rank). The rank allocated to any one target cannot be less than 1. You make a separate attack check for each target."
  },
  {
    "name": "Subtle",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "maxRanks": 2,
    "description": "Difficult to detect (DC 20 check at rank 1, completely undetectable at rank 2).",
    "fullText": "SUBTLE\n1 OR 2 POINTS FLAT\nAn effect with Subtle is difficult or impossible to detect:\n• Rank 1 (1 point): Requires a DC 20 Perception check to notice that the power is being used.\n• Rank 2 (2 points): Completely undetectable to normal senses; only detectable by specific specialized sensory powers (such as Detect Magic or Mental Awareness)."
  },
  {
    "name": "Sustained",
    "category": "extra",
    "cost": 0,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Makes a Permanent effect Sustained (+0 tradeoff: requires Sustain action, allows Extra Effort/deactivation).",
    "fullText": "SUSTAINED\n+0 POINTS PER RANK\nApplied to a Permanent Duration effect, this modifier makes its duration Sustained. The effect requires a free action each round to maintain. If the character is unable to take a free action (such as when stunned, incapacitated, or asleep), the effect stops functioning until resumed.\nThis provides a unique zero-point tradeoff in how the power works: while the effect now requires conscious maintenance and can be interrupted, it can also be deactivated at will and can be improved using Extra Effort (which permanent effects cannot normally do)."
  },
  {
    "name": "Thrown",
    "category": "extra",
    "cost": 0,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Allows a Close Range effect to be thrown using Strength/lifting distance rules.",
    "fullText": "THROWN\n+0 POINTS PER RANK\nAllows a Close Range effect to be thrown as a ranged attack using your Strength or lifting capacity to determine distance, using thrown weapon rules."
  },
  {
    "name": "Triggered",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "maxRanks": 5,
    "description": "Set effect to activate later in response to a specified trigger (+1 trigger per rank).",
    "fullText": "TRIGGERED\n1 POINT PER RANK FLAT\nYou can set an effect to activate later in response to a specific triggering condition (proximity, timer, pressure, touch, etc.). Setting the trigger requires the normal action for the effect. Each rank of Triggered allows you to maintain one active trigger at a time (+1 trigger per rank)."
  },
  {
    "name": "Variable Descriptor",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "maxRanks": 2,
    "description": "Change descriptor when using effect (1 pt narrow/related, 2 pts broad category).",
    "fullText": "VARIABLE DESCRIPTOR\n1 OR 2 POINTS FLAT\nYou can change the descriptor of your effect when you use it:\n• Rank 1 (1 point): Can change between related descriptors (e.g., any energy type: fire, cold, electricity).\n• Rank 2 (2 points): Can change between any broad descriptor category (e.g., any environmental, physical, or magical descriptor)."
  },
  {
    "name": "Activation",
    "category": "flaw",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "maxRanks": 2,
    "description": "Requires an action to activate before effects can be used (Move -1 pt, Standard -2 pts).",
    "fullText": "ACTIVATION\n-1 OR -2 POINTS FLAT\nA power requires an action to activate or turn on before its effects can be used:\n• Move/Simple Action: -1 point flat.\n• Standard Action: -2 points flat.\nOnce activated, the power functions normally until deactivated or dismissed."
  },
  {
    "name": "Check Required",
    "category": "flaw",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "maxRanks": 10,
    "description": "Must succeed on skill check vs DC (10 + flaw ranks) to activate or use effect.",
    "fullText": "CHECK REQUIRED\n-1 POINT PER RANK FLAT\nYou must succeed on a specific skill check (Acrobatics, Athletics, Expertise, Technology, etc.) against DC (10 + flaw ranks) to activate or use the effect. If the check fails, the action is wasted and the effect does not activate."
  },
  {
    "name": "Reduced Range",
    "category": "flaw",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": true,
    "maxRanks": 2,
    "description": "Reduces range category by one step per rank (Perception to Ranged, Ranged to Close).",
    "fullText": "REDUCED RANGE\n-1 POINT PER RANK\nReduces the range category of an effect by one step per rank:\n• Rank 1 (from Perception): Reduces to Ranged (requires ranged attack check).\n• Rank 1 (from Ranged): Reduces to Close (requires touch/close attack check).\n• Rank 2 (from Perception): Reduces directly to Close (-2 pts/rank)."
  },
  {
    "name": "Close",
    "category": "flaw",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Reduces range to Close, requiring physical touch and close attack check.",
    "fullText": "CLOSE\n-1 OR -2 POINTS PER RANK\nReduces the range of an effect to Close range (-1 pt/rank from Ranged, -2 pts/rank from Perception), requiring you to touch the target and make a close attack check."
  },
  {
    "name": "Concentration",
    "category": "flaw",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Requires Concentrate action each round to maintain rather than free Sustain action.",
    "fullText": "CONCENTRATION\n-1 POINT PER RANK\nApplied to a Sustained effect, this flaw requires you to take a Concentrate action each round to maintain the effect, rather than a free Sustain action. If you cannot or do not take the concentrate action, the effect immediately ends."
  },
  {
    "name": "Diminished Range",
    "category": "flaw",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "maxRanks": 3,
    "description": "Reduces distance multipliers for Ranged effect (Rank 1: 10/25/50; Rank 2: 5/10/25; Rank 3: 2/5/10).",
    "fullText": "DIMINISHED RANGE\n-1 POINT PER RANK FLAT\nReduces the distance multiplier for a Ranged effect:\n• Rank 1: Short 10 ft × rank, Med 25 ft × rank, Long 50 ft × rank.\n• Rank 2: Short 5 ft × rank, Med 10 ft × rank, Long 25 ft × rank.\n• Rank 3: Short 2 ft × rank, Med 5 ft × rank, Long 10 ft × rank."
  },
  {
    "name": "Distracting",
    "category": "flaw",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Using effect causes you to gain Vulnerable condition until start of next turn.",
    "fullText": "DISTRACTING\n-1 POINT PER RANK\nUsing the effect requires so much focus that you gain the Vulnerable condition (halving your active defenses) until the start of your next turn."
  },
  {
    "name": "Fades",
    "category": "flaw",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Loses 1 rank per use or round until rank 0; recovers outside action time.",
    "fullText": "FADES\n-1 POINT PER RANK\nEach time you use the effect (or each round it is continuously maintained), its rank decreases by 1. Once reduced to rank 0, the effect stops working and must be recovered outside of action time through rest or recharging."
  },
  {
    "name": "Feedback",
    "category": "flaw",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Damage to manifestations (Create, Illusion, Remote Sensing) causes damage to you.",
    "fullText": "FEEDBACK\n-1 POINT PER RANK\nAttacks against your manifestations (such as Create objects, Illusion, or Remote Sensing displaced senses) cause feedback damage to your physical body. You make a resistance check against the damage dealt to the manifestation."
  },
  {
    "name": "Grab-Based",
    "category": "flaw",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Must successfully Grab target before effect applies; escaping grab ends effect.",
    "fullText": "GRAB-BASED\n-1 POINT PER RANK\nYou must successfully Grab and hold your target before this effect can be applied. The target makes a resistance check to escape the grab each round; escaping the grab immediately ends the effect."
  },
  {
    "name": "Inaccurate",
    "category": "flaw",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "maxRanks": 5,
    "description": "-2 penalty per rank on attack checks made with this effect.",
    "fullText": "INACCURATE\n-1 POINT PER RANK FLAT\nAn effect with this flaw is clumsy or difficult to aim. You take a -2 penalty per rank of Inaccurate on attack checks made with this effect. This penalty cannot exceed your attack bonus."
  },
  {
    "name": "Increased Action",
    "category": "flaw",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Increases required action by one step (Free to Simple, or Simple to Standard).",
    "fullText": "INCREASED ACTION\n-1 POINT PER RANK\nIncreases the action required to use the effect by one step:\n• Free to Simple/Move: -1 point per rank.\n• Simple/Move to Standard: -1 point per rank.\n• Standard to Full-Round (two simple actions): -1 point per rank."
  },
  {
    "name": "Independent",
    "category": "flaw",
    "cost": 0,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Sustained effect lasts without maintenance, but loses 1 rank per round until it ends.",
    "fullText": "INDEPENDENT\n-0 POINTS PER RANK\nA Sustained Duration effect lasts without requiring any maintenance actions, but loses 1 rank of effectiveness per round until it reaches rank 0 and ends."
  },
  {
    "name": "Limited",
    "category": "flaw",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Effect loses about half its usefulness or is usable only in specific conditions/targets.",
    "fullText": "LIMITED\n-1 POINT PER RANK\nThe effect loses approximately half of its total usefulness, or is only usable under specific, restricted circumstances or against a specific subset of targets (e.g., only at night, only against machines, only while underwater)."
  },
  {
    "name": "Noticeable",
    "category": "flaw",
    "cost": 1,
    "costType": "flat",
    "hasRanks": false,
    "description": "Continuous or permanent effect has an obvious visual, audible, or sensory manifestation.",
    "fullText": "NOTICEABLE\n-1 POINT FLAT\nA Continuous or Permanent effect has an obvious, unmistakable visual, audible, or olfactory manifestation that cannot be concealed (such as glowing skin, stone hide, or an eerie hum)."
  },
  {
    "name": "Permanent",
    "category": "flaw",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Continuous effect is always on, cannot be turned off, and cannot use Extra Effort.",
    "fullText": "PERMANENT\n-1 POINT PER RANK\nApplied to a Continuous effect, makes its duration Permanent. The effect is always on, cannot be turned off at will, and cannot be improved using Extra Effort."
  },
  {
    "name": "Quirk",
    "category": "flaw",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "maxRanks": 3,
    "description": "Minor nuisance or limitation attached to the effect (-1 to -3 PP total).",
    "fullText": "QUIRK\n-1 POINT PER RANK FLAT\nA minor nuisance, flaw, or limitation that restricts the power in a small way not covered by other flaws, worth -1 to -3 Power Points total."
  },
  {
    "name": "Removable (Device)",
    "category": "flaw",
    "cost": 1,
    "costType": "removable",
    "hasRanks": false,
    "description": "Power in a device; can be removed when stunned/defenseless (-1 pt per 5 PP).",
    "fullText": "REMOVABLE\n-1 POINT FLAT PER 5 TOTAL POINTS\nThe power is housed in an item, armor, or device that can be removed from you when you are Stunned and Defenseless outside of action time. Reduces total power cost by 1 point per 5 full Power Points."
  },
  {
    "name": "Removable (Easily Removable)",
    "category": "flaw",
    "cost": 2,
    "costType": "removable",
    "hasRanks": false,
    "description": "Handheld weapon/item; can be disarmed in combat (-2 pt per 5 PP).",
    "fullText": "EASILY REMOVABLE\n-2 POINTS FLAT PER 5 TOTAL POINTS\nThe power is a handheld weapon, wand, or item that can be disarmed or knocked from your grasp during combat with a Disarm or Grab action. Reduces total power cost by 2 points per 5 full Power Points."
  },
  {
    "name": "Resistible",
    "category": "flaw",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Grants targets a resistance check against personal or un-resisted effects.",
    "fullText": "RESISTIBLE\n-1 POINT PER RANK\nGives an effect that does not normally allow a resistance check an appropriate resistance check, or adds a second resistance check (such as Dodge or Fortitude) to an already-resisted effect."
  },
  {
    "name": "Sense-Dependent",
    "category": "flaw",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Target must perceive source with a specific sense for effect to work.",
    "fullText": "SENSE-DEPENDENT\n-1 POINT PER RANK\nThe target must be able to perceive the source of the effect using a specific sense (Sight, Hearing, Scent, etc.) for it to work. Targets with concealment from that sense or who avert their senses gain Resistance or immunity."
  },
  {
    "name": "Short-Term",
    "category": "flaw",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Effect works for only 6 uses/rounds before stopping until reset outside action time.",
    "fullText": "SHORT-TERM\n-1 POINT PER RANK\nThe effect functions for only 6 uses (or 6 consecutive rounds), after which its charges are expended and it stops working until reset outside of action time."
  },
  {
    "name": "Side Effect",
    "category": "flaw",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Failing power check triggers problematic side-effect (-1/r on fail, -2/r always).",
    "fullText": "SIDE EFFECT\n-1 OR -2 POINTS PER RANK\nFailing an attack check or power check with this effect triggers a problematic side effect equal in point value to the power itself that harms you or your allies (-1 pt/rank on failure, -2 pts/rank whenever used regardless of outcome)."
  },
  {
    "name": "Tiring",
    "category": "flaw",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Using effect causes user to gain Fatigued condition.",
    "fullText": "TIRING\n-1 POINT PER RANK\nUsing the effect is physically or mentally exhausting, causing you to gain the Fatigued condition. If you are already Fatigued, you become Exhausted, then Incapacitated."
  },
  {
    "name": "Uncontrolled",
    "category": "flaw",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "GM decides when and how the effect activates.",
    "fullText": "UNCONTROLLED\n-1 POINT PER RANK\nYou have no conscious control over when or how the effect activates. The Game Master decides when the effect triggers and who or what it targets."
  },
  {
    "name": "Unreliable",
    "category": "flaw",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": false,
    "description": "Roll d20 before activating; fails on roll of 10 or less.",
    "fullText": "UNRELIABLE\n-1 POINT PER RANK\nAn Unreliable effect does not work reliably. You must roll a d20 before using or maintaining the effect; on a roll of 10 or less, the action is wasted and the effect fails to activate."
  },
  {
    "name": "Accurate (Teleport)",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": true,
    "description": "Do not need to accurately sense destination; general description or coordinates suffice.",
    "fullText": "ACCURATE\n+1 POINT PER RANK\nYou do not need to accurately perceive or previously know your destination; a general description or coordinates (e.g. \"three miles north\", \"the Mayor's office\") is sufficient to teleport there accurately."
  },
  {
    "name": "Change Direction",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": false,
    "description": "Change direction/orientation upon arrival after teleporting.",
    "fullText": "CHANGE DIRECTION\n1 POINT FLAT\nWhen you teleport, you can arrive facing in any direction or orientation you choose, regardless of your starting orientation."
  },
  {
    "name": "Change Velocity",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": false,
    "description": "Arrive at destination 'at rest' with zero relative velocity (avoids fall/impact damage).",
    "fullText": "CHANGE VELOCITY\n1 POINT FLAT\nWhen you teleport, you arrive at rest with zero relative velocity, regardless of how fast you were moving when you teleported. This prevents impact or falling damage."
  },
  {
    "name": "Easy",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": true,
    "description": "Not Dazed or Vulnerable after making Extended teleports.",
    "fullText": "EASY\n1 POINT PER RANK\nYou are not Dazed or Vulnerable after making an Extended Teleport. You can act normally on the round immediately following an Extended Teleport."
  },
  {
    "name": "Extended",
    "category": "extra",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": true,
    "description": "Take two simple actions to teleport distance rank + 10.",
    "fullText": "EXTENDED\n1 POINT PER RANK\nYou can take two simple actions on your turn to teleport a distance rank equal to your effect rank + 10. You are Dazed and Vulnerable until your next turn unless you also have the Easy extra."
  },
  {
    "name": "Known Location",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": true,
    "description": "Memorize specific locations for precise teleporting without sensory link.",
    "fullText": "KNOWN LOCATION\n1 POINT FLAT PER LOCATION\nYou have memorized specific locations so thoroughly that you can teleport to them with complete precision without needing to accurately sense them."
  },
  {
    "name": "Turnabout",
    "category": "extra",
    "cost": 1,
    "costType": "flat",
    "hasRanks": false,
    "description": "Teleport, take standard action, and teleport back as a free action in same turn.",
    "fullText": "TURNABOUT\n1 POINT FLAT\nYou can teleport, take your standard action, and then teleport back to your starting location as a free action, all on the same turn, provided total distance teleported does not exceed your maximum teleport rank."
  },
  {
    "name": "Extended Only",
    "category": "flaw",
    "cost": 1,
    "costType": "per_rank",
    "hasRanks": true,
    "description": "Restricted to extended teleports only; cannot make single-action simple teleports.",
    "fullText": "EXTENDED ONLY\n-1 POINT PER RANK\nYou can only make Extended Teleports (requiring two simple actions to teleport distance rank + 10); you cannot make standard single-action simple teleports."
  }
];

// Unabridged 4th Edition Universal Power Modifiers Master Table (Extras & Flaws)

const POWER_MODIFIERS_LIST = [
  // UNIVERSAL EXTRAS
  {
    name: "Accurate",
    category: "extra",
    cost: 1,
    costType: "flat",
    hasRanks: true,
    description: "+2 attack check bonus per rank.",
    fullText: `ACCURATE
1 POINT PER RANK FLAT
An effect with this extra is especially accurate; you get a +2 bonus per Accurate rank to attack checks made with it. This bonus is limited by Power Level.`
  },
  {
    name: "Affects Corporeal",
    category: "extra",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Allows incorporeal beings to affect the corporeal world.",
    fullText: `AFFECTS CORPOREAL
+1 POINT PER RANK
An incorporeal being can use an effect with this extra on the corporeal world. See the Insubstantial effect description.`
  },
  {
    name: "Affects Insubstantial",
    category: "extra",
    cost: 1,
    costType: "flat",
    hasRanks: true,
    maxRanks: 2,
    description: "Works on insubstantial targets (half effect at rank 1, full at rank 2).",
    fullText: `AFFECTS INSUBSTANTIAL
1 OR 2 POINTS FLAT
An effect with this extra works on insubstantial targets, in addition to having its normal effect on corporeal targets. Rank 1 gives target Resistance. Rank 2 functions normally.`
  },
  {
    name: "Affects Objects",
    category: "extra",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Fortitude-resisted effect works on non-living objects (+0 if Objects Only).",
    fullText: `AFFECTS OBJECTS
+0 OR +1 POINT PER RANK
This modifier allows effects normally resisted by Fortitude to work on non-living objects. If the effect Affects Only Objects, it has a net modifier of +0.`
  },
  {
    name: "Affects Others",
    category: "extra",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Grant use of a personal effect to others by touch (+0 if Others Only).",
    fullText: `AFFECTS OTHERS
+1 OR +0 POINT PER RANK
This extra allows you to give someone else use of a Sustained Duration personal effect. If the effect Affects Only Others, it has a net modifier of +0.`
  },
  {
    name: "Alternate Effect",
    category: "extra",
    cost: 1,
    costType: "flat",
    hasRanks: true,
    description: "Adds an Alternate Effect to a power array (1 pt standard, 2 pt dynamic).",
    fullText: `ALTERNATE EFFECT
1 OR 2 POINTS FLAT
An Alternate Effect costs 1 Power Point, while a Dynamic Alternate Effect costs 2 Power Points.`
  },
  {
    name: "Alternate Defense",
    category: "extra",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Attack check targets Fortitude or Will instead of Defense Class.",
    fullText: `ALTERNATE DEFENSE
VARIES (SEE DESCRIPTION)
An effect with this modifier makes its attack check against a target's Fortitude or Will resistance rather than Defense.`
  },
  {
    name: "Alternate Resistance",
    category: "extra",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Resisted by a different defense/trait (e.g. Fortitude or Will).",
    fullText: `ALTERNATE RESISTANCE
VARIES (SEE DESCRIPTION)
An effect with this modifier has a different resistance than usual.`
  },
  {
    name: "Area Effect (Cone)",
    category: "extra",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Fills a cone shape (distance rank 1).",
    fullText: `AREA EFFECT (CONE)
+1 POINT PER RANK
The effect fills a cone with a length, width, and height of distance rank 1. Targets make a Dodge check vs DC (10 + Area rank) for Resistance.`
  },
  {
    name: "Area Effect (Cube)",
    category: "extra",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Fills a cube shape (distance rank 1 on each side).",
    fullText: `AREA EFFECT (CUBE)
+1 POINT PER RANK
The effect fills a cube distance rank 1 on each side. Targets make a Dodge check vs DC (10 + Area rank) for Resistance.`
  },
  {
    name: "Area Effect (Line)",
    category: "extra",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Fills a straight line path (distance rank 1 long).",
    fullText: `AREA EFFECT (LINE)
+1 POINT PER RANK
The effect fills a path distance rank 1 long in a straight line. Targets make a Dodge check vs DC (10 + Area rank) for Resistance.`
  },
  {
    name: "Area Effect (Sphere)",
    category: "extra",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Fills a sphere shape (distance rank 1 diameter).",
    fullText: `AREA EFFECT (SPHERE)
+1 POINT PER RANK
The effect fills a sphere distance rank 1 in diameter. Targets make a Dodge check vs DC (10 + Area rank) for Resistance.`
  },
  {
    name: "Area Effect (Shapeable)",
    category: "extra",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Fills contiguous spaces equal to effect rank.",
    fullText: `AREA EFFECT (SHAPEABLE)
+1 POINT PER RANK
The effect fills a number of spaces equal to the effect's rank, placed contiguously as desired.`
  },
  {
    name: "Aura",
    category: "extra",
    cost: 3,
    costType: "per_rank",
    hasRanks: false,
    description: "Surrounds your body, affecting anyone touching you as a free action.",
    fullText: `AURA
+3 POINTS PER RANK
Turns a Close Range effect into a sustained aura around your body affecting anyone who touches you.`
  },
  {
    name: "Contagious",
    category: "extra",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Spreads to anyone coming into physical contact with the target.",
    fullText: `CONTAGIOUS
+1 POINT PER RANK
Contagious effects work on both the target and anyone coming into contact with the target.`
  },
  {
    name: "Dimensional",
    category: "extra",
    cost: 1,
    costType: "flat",
    hasRanks: true,
    maxRanks: 3,
    description: "Affects targets in other dimensions (1 pt single, 2 pt group, 3 pt any).",
    fullText: `DIMENSIONAL
1-3 POINTS FLAT
Allows an effect to work on targets in other dimensions (1 rank single, 2 ranks group, 3 ranks any).`
  },
  {
    name: "Extended Range",
    category: "extra",
    cost: 1,
    costType: "flat",
    hasRanks: true,
    description: "Increases distance multipliers for ranged effects (+1 rank per rank).",
    fullText: `EXTENDED RANGE
1 POINT PER RANK FLAT
Each rank of Extended Range increases the base values of the effect's range categories by +1 rank.`
  },
  {
    name: "Feature",
    category: "extra",
    cost: 1,
    costType: "flat",
    hasRanks: true,
    description: "Adds a minor useful capability or benefit.",
    fullText: `FEATURE
1 POINT PER RANK FLAT
Adds a minor additional capability or benefit to a basic effect (1 PP per rank).`
  },
  {
    name: "Hardened",
    category: "extra",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Roll two dice on Toughness checks and take no damage on 2+ DoS.",
    fullText: `HARDENED
+1 POINT PER RANK
Roll two dice taking higher against Damage equal/less than Hardened rank; take no damage on 2+ degrees of success.`
  },
  {
    name: "Homing",
    category: "extra",
    cost: 1,
    costType: "flat",
    hasRanks: true,
    description: "Ranged attack gets +1 retry check on next turn if it misses.",
    fullText: `HOMING
1 POINT PER RANK FLAT
If an attack check with a Homing effect fails, it attempts to hit again on next turn (+1 attempt per rank).`
  },
  {
    name: "Impenetrable",
    category: "extra",
    cost: 3,
    costType: "per_rank",
    hasRanks: false,
    description: "Impervious resistance that also ignores Penetrating effects.",
    fullText: `IMPENETRABLE
+3 POINTS PER RANK
Works like Impervious, but also completely ignores Penetrating effects.`
  },
  {
    name: "Impervious",
    category: "extra",
    cost: 2,
    costType: "per_rank",
    hasRanks: false,
    description: "Immune to effect ranks equal or lower than Impervious rank.",
    fullText: `IMPERVIOUS
+2 POINTS PER RANK
Immunity to effects with rank equal to or lower than Impervious rank; take no damage on 2+ degrees of success.`
  },
  {
    name: "Increased Duration (Concentration)",
    category: "extra",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Increases Instant duration to Concentration.",
    fullText: `INCREASED DURATION (CONCENTRATION)
+1 POINT PER RANK
Maintains an Instant effect with a Concentrate action each turn.`
  },
  {
    name: "Increased Duration (Sustained)",
    category: "extra",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Increases Concentration duration to Sustained.",
    fullText: `INCREASED DURATION (SUSTAINED)
+1 POINT PER RANK
Maintains a Concentration effect with a free Sustain action each turn.`
  },
  {
    name: "Increased Duration (Continuous)",
    category: "extra",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Increases Sustained duration to Continuous.",
    fullText: `INCREASED DURATION (CONTINUOUS)
+1 POINT PER RANK
Continuous effect lasts without maintenance until dismissed or countered.`
  },
  {
    name: "Increased Mass",
    category: "extra",
    cost: 1,
    costType: "flat",
    hasRanks: true,
    description: "Carries or moves +1 mass rank per rank.",
    fullText: `INCREASED MASS
1 POINT PER RANK FLAT
Increases the mass rank you can carry or move with the effect by 1 per rank.`
  },
  {
    name: "Incurable",
    category: "extra",
    cost: 1,
    costType: "flat",
    hasRanks: false,
    description: "Damage cannot be healed by standard Healing or Regeneration.",
    fullText: `INCURABLE
1 POINT FLAT
Damage caused by this effect cannot be healed by Healing or Regeneration without Persistent.`
  },
  {
    name: "Indirect",
    category: "extra",
    cost: 1,
    costType: "flat",
    hasRanks: true,
    maxRanks: 4,
    description: "Ranged attack originates from points away from user to bypass cover.",
    fullText: `INDIRECT
1-4 POINTS FLAT
Originates from points other than the user: 1 fixed point away, 2 any point aiming away, 3 any point aiming fixed direction, 4 any point aiming any direction.`
  },
  {
    name: "Insidious",
    category: "extra",
    cost: 1,
    costType: "flat",
    hasRanks: false,
    description: "Results of the effect are not noticed without a DC 20 check.",
    fullText: `INSIDIOUS
1 POINT FLAT
Makes the result of the effect harder to detect (DC 20 check to notice).`
  },
  {
    name: "Linked",
    category: "extra",
    cost: 0,
    costType: "per_rank",
    hasRanks: false,
    description: "Two or more effects activate simultaneously with the same action.",
    fullText: `LINKED
+0 POINTS
Links two or more effects together so they activate at the same time.`
  },
  {
    name: "Multiattack",
    category: "extra",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Hit single targets with increased damage, spray multiple targets, or provide covering fire.",
    fullText: `MULTIATTACK
+1 POINT PER RANK
Single target gains -2 or -5 to resistance on extra degrees of success; spray multiple targets in an arc with check penalty; or provide covering fire for Full Concealment.`
  },
  {
    name: "Penetrating",
    category: "extra",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Overcomes Impervious and Resistance ratings.",
    fullText: `PENETRATING
+1 POINT PER RANK
Overcomes Impervious resistance up to Penetrating rank and reduces Resistance bonuses.`
  },
  {
    name: "Perception Range",
    category: "extra",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Affects any target accurately perceived without attack checks (+2 from Close).",
    fullText: `PERCEPTION RANGE
+1 OR +2 POINTS PER RANK
Make a Ranged effect Perception Range (+1/rank) or Close effect Perception Range (+2/rank).`
  },
  {
    name: "Precise",
    category: "extra",
    cost: 1,
    costType: "flat",
    hasRanks: false,
    description: "Perform delicate manipulation or fine tasks with the effect.",
    fullText: `PRECISE
1 POINT FLAT
Perform tasks requiring delicacy, fine control, or precise manipulation.`
  },
  {
    name: "Ranged",
    category: "extra",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Increases Close range to Ranged.",
    fullText: `RANGED
+1 OR -1 POINT PER RANK
Extends a Close Range effect to operate at standard distance ranks.`
  },
  {
    name: "Reach",
    category: "extra",
    cost: 1,
    costType: "flat",
    hasRanks: true,
    description: "+1 space of reach per rank for close effects.",
    fullText: `REACH
1 POINT PER RANK FLAT
Each rank extends close reach by 1 space.`
  },
  {
    name: "Reaction",
    category: "extra",
    cost: 1,
    costType: "flat",
    hasRanks: false,
    description: "Activates as a reaction to a specific triggering circumstance.",
    fullText: `REACTION
+1 POINT FLAT
Effect is usable as a reaction in response to a specific triggering circumstance.`
  },
  {
    name: "Reversible",
    category: "extra",
    cost: 1,
    costType: "flat",
    hasRanks: true,
    maxRanks: 2,
    description: "Remove conditions caused by effect at will (1 pt in range, 2 pt anywhere).",
    fullText: `REVERSIBLE
1 OR 2 POINTS FLAT
Remove conditions caused by the effect at will as a free action (1 pt in range, 2 pts anywhere).`
  },
  {
    name: "Ricochet",
    category: "extra",
    cost: 1,
    costType: "flat",
    hasRanks: true,
    description: "Bounce ranged attacks off surfaces (+1 bounce per rank).",
    fullText: `RICOCHET
1 POINT PER RANK FLAT
Bounce ranged effects off surfaces (+1 bounce per rank) to bypass cover.`
  },
  {
    name: "Secondary Effect",
    category: "extra",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Affects target immediately, then affects target again on following round.",
    fullText: `SECONDARY EFFECT
+1 POINT PER RANK
Instant effect affects target once immediately and once again at the start of attacker's next turn.`
  },
  {
    name: "Selective",
    category: "extra",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Choose who is and is not affected within an area.",
    fullText: `SELECTIVE
+1 POINT PER RANK
Discriminating effect allowing you to choose who is affected in an Area Effect.`
  },
  {
    name: "Split",
    category: "extra",
    cost: 1,
    costType: "flat",
    hasRanks: true,
    description: "Divide effect rank between two or more targets (+1 target per rank).",
    fullText: `SPLIT
1 POINT PER RANK FLAT
Divide effect rank among multiple targets (+1 target per rank).`
  },
  {
    name: "Subtle",
    category: "extra",
    cost: 1,
    costType: "flat",
    hasRanks: true,
    maxRanks: 2,
    description: "Difficult to detect (DC 20 Perception at rank 1, completely undetectable at rank 2).",
    fullText: `SUBTLE
1-2 POINTS FLAT
Rank 1 requires DC 20 check to notice; Rank 2 makes effect completely undetectable.`
  },
  {
    name: "Sustained",
    category: "extra",
    cost: 0,
    costType: "per_rank",
    hasRanks: false,
    description: "Makes a Permanent effect Sustained (can be improved with Extra Effort).",
    fullText: `SUSTAINED
+0 POINTS PER RANK
Applied to a Permanent Duration effect, makes it Sustained.`
  },
  {
    name: "Thrown",
    category: "extra",
    cost: 0,
    costType: "per_rank",
    hasRanks: false,
    description: "Close attack can be thrown based on Strength; requires retrieval.",
    fullText: `THROWN
+0 POINTS PER RANK
Close attack can be thrown (short range: distance rank 2 + STR); must be retrieved before being used again.`
  },
  {
    name: "Triggered",
    category: "extra",
    cost: 1,
    costType: "flat",
    hasRanks: true,
    description: "Set effect to activate in response to a detectable circumstance (+1 use per rank).",
    fullText: `TRIGGERED
1 POINT FLAT PER RANK
Set an effect to activate upon a specific triggering circumstance (1 use per rank).`
  },
  {
    name: "Variable Descriptor",
    category: "extra",
    cost: 1,
    costType: "flat",
    hasRanks: true,
    maxRanks: 2,
    description: "Change descriptors on the fly (1 pt close group, 2 pt broad group).",
    fullText: `VARIABLE DESCRIPTOR
1 POINT FLAT PER RANK
Vary descriptors as a free action: Rank 1 close group, Rank 2 broad group.`
  },

  // UNIVERSAL FLAWS
  {
    name: "Activation",
    category: "flaw",
    cost: 1,
    costType: "flat",
    hasRanks: true,
    maxRanks: 2,
    description: "Requires action to bring online (-1 pt simple, -2 pt standard).",
    fullText: `ACTIVATION
-1 OR -2 POINTS FLAT
A power requires an extra action to activate before effects are usable: -1 point flat for simple action, -2 points flat for standard action.`
  },
  {
    name: "Check Required",
    category: "flaw",
    cost: 1,
    costType: "flat",
    hasRanks: true,
    description: "Requires a successful skill check vs DC (10 + ranks) to activate.",
    fullText: `CHECK REQUIRED
-1 POINT PER RANK FLAT
Requires a successful skill check vs DC (10 + flaw ranks) to activate the effect.`
  },
  {
    name: "Close",
    category: "flaw",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Reduces Ranged to Close (-1/r) or Perception to Close (-2/r).",
    fullText: `CLOSE
-1 OR -2 POINTS PER RANK
Changes Range parameter to Close, requiring touch and close attack check.`
  },
  {
    name: "Concentration",
    category: "flaw",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Reduces Sustained duration to Concentration.",
    fullText: `CONCENTRATION
-1 POINT PER RANK
Requires a Concentrate action each turn to maintain rather than free Sustain.`
  },
  {
    name: "Diminished Range",
    category: "flaw",
    cost: 1,
    costType: "flat",
    hasRanks: true,
    maxRanks: 3,
    description: "Reduces distance multiplier for ranged effects.",
    fullText: `DIMINISHED RANGE
-1 POINT PER RANK FLAT
Reduces the distance value multiplier for a Ranged effect per rank.`
  },
  {
    name: "Distracting",
    category: "flaw",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Become Vulnerable until the start of your next turn when using effect.",
    fullText: `DISTRACTING
-1 POINT PER RANK
Using the effect leaves you Vulnerable until the start of your next turn.`
  },
  {
    name: "Fades",
    category: "flaw",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Loses 1 rank of effectiveness per round/use until recovered.",
    fullText: `FADES
-1 POINT PER RANK
Loses 1 rank of effectiveness per use/round until 0 ranks; recovered outside action time.`
  },
  {
    name: "Feedback",
    category: "flaw",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Suffer damage/side-effects when manifestations are struck.",
    fullText: `FEEDBACK
-1 POINT PER RANK
Damage to manifestations (Create, Illusion, etc.) causes feedback damage to you.`
  },
  {
    name: "Grab-Based",
    category: "flaw",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Must successfully Grab target first before effect applies.",
    fullText: `GRAB-BASED
-1 POINT PER RANK
Must successfully grab target before effect applies; escaping grab ends effect.`
  },
  {
    name: "Inaccurate",
    category: "flaw",
    cost: 1,
    costType: "flat",
    hasRanks: true,
    description: "-2 attack check penalty per rank.",
    fullText: `INACCURATE
-1 POINT PER RANK FLAT
Imposes a -2 penalty on attack checks with the effect per rank.`
  },
  {
    name: "Increased Action",
    category: "flaw",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Requires a longer action to activate (Free -> Simple -> Standard).",
    fullText: `INCREASED ACTION
-1 POINT PER RANK
Increases required action by one step (e.g. Free to Simple or Simple to Standard).`
  },
  {
    name: "Independent",
    category: "flaw",
    cost: 0,
    costType: "per_rank",
    hasRanks: false,
    description: "Lasts without maintenance, losing 1 rank of area/effect per round.",
    fullText: `INDEPENDENT
-0 POINTS PER RANK
A Sustained Duration effect lasts without maintenance, but loses 1 rank of effectiveness per round until it ends.`
  },
  {
    name: "Limited",
    category: "flaw",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Loses roughly half its utility or usable only in specific conditions.",
    fullText: `LIMITED
-1 POINT PER RANK
Effect loses about half its usefulness or is usable only under specific circumstances/targets.`
  },
  {
    name: "Noticeable",
    category: "flaw",
    cost: 1,
    costType: "flat",
    hasRanks: false,
    description: "Continuous or permanent effect is easily noticeable.",
    fullText: `NOTICEABLE
-1 POINT FLAT
Permanent or continuous effect has an obvious visual, audible, or sensory manifestation.`
  },
  {
    name: "Permanent",
    category: "flaw",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Continuous effect is always on and cannot be improved with Extra Effort.",
    fullText: `PERMANENT
-1 POINT PER RANK
Continuous effect becomes permanent in duration. It cannot be turned off or improved with Extra Effort.`
  },
  {
    name: "Quirk",
    category: "flaw",
    cost: 1,
    costType: "flat",
    hasRanks: true,
    maxRanks: 3,
    description: "Minor nuisance or limitation attached to the effect.",
    fullText: `QUIRK
-1 POINT PER RANK FLAT
A Quirk is some minor nuisance attached to an effect, worth -1 to -3 Power Points total.`
  },
  {
    name: "Removable (Device)",
    category: "flaw",
    cost: 1,
    costType: "removable",
    hasRanks: false,
    description: "Power in a device; can be removed when stunned/defenseless (-1 pt per 5 PP).",
    fullText: `REMOVABLE
-1 POINT FLAT PER 5 TOTAL POINTS
Power resides in an object/device that can be taken away when you are both Stunned and Defenseless outside of action time. Reduces total power cost by -1 point per 5 total Power Points.`
  },
  {
    name: "Removable (Easily Removable)",
    category: "flaw",
    cost: 2,
    costType: "removable",
    hasRanks: false,
    description: "Handheld weapon/item; can be disarmed in combat (-2 pt per 5 PP).",
    fullText: `EASILY REMOVABLE
-2 POINTS FLAT PER 5 TOTAL POINTS
Handheld item or weapon that can be taken away during action time with a Disarm or Grab action. Reduces total power cost by -2 points per 5 total Power Points.`
  },
  {
    name: "Resistible",
    category: "flaw",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Grants targets a resistance check against personal/un-resisted effects.",
    fullText: `RESISTIBLE
-1 POINT PER RANK
Gives a resistance check to an effect that doesn't normally allow one, or adds a second resistance check to an existing effect.`
  },
  {
    name: "Sense-Dependent",
    category: "flaw",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Target must be able to perceive user with a specific sense for effect to work.",
    fullText: `SENSE-DEPENDENT
-1 POINT PER RANK
The target must be able to perceive the source of the effect with a specific sense for it to work. Target gets a Dodge resistance check to avoid effect entirely.`
  },
  {
    name: "Short-Term",
    category: "flaw",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Effect works for only 6 uses/rounds before stopping until reset.",
    fullText: `SHORT-TERM
-1 POINT PER RANK
An effect with this flaw has six uses (or 6 rounds) where the effect works normally, then stops working until reset outside of action time.`
  },
  {
    name: "Side Effect",
    category: "flaw",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Failing to use effect causes a harmful side-effect to you (-2/r if always).",
    fullText: `SIDE EFFECT
-1 OR -2 POINTS PER RANK
Failing to successfully use an effect causes a problematic effect (equal in point value to the power) to affect you instead (-1 pt/rank on failure, -2 pts/rank always).`
  },
  {
    name: "Tiring",
    category: "flaw",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Using effect causes user to gain the Fatigued condition.",
    fullText: `TIRING
-1 POINT PER RANK
An effect with this flaw causes you to gain the Fatigued condition when you use it. Effectively requires Extra Effort to use.`
  },
  {
    name: "Uncontrolled",
    category: "flaw",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "GM decides when and how the effect activates.",
    fullText: `UNCONTROLLED
-1 POINT PER RANK
You have no control over an effect with this flaw. Instead, the Game Master decides when and how it works.`
  },
  {
    name: "Unreliable",
    category: "flaw",
    cost: 1,
    costType: "per_rank",
    hasRanks: false,
    description: "Roll d20 each round; fails on a 10 or less.",
    fullText: `UNRELIABLE
-1 POINT PER RANK
An Unreliable effect doesn't work all the time. Roll a d20 each round you use or maintain the effect; on a 10 or less, it fails to activate.`
  }
];
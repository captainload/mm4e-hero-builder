// Mutants & Masterminds 4th Edition Power Effects Data (Complete Master File with Unabridged Book Text, Extras & Flaws)

const POWER_EFFECTS_LIST = [
  {
    name: "Affliction",
    type: "Attack",
    action: "Standard",
    range: "Close",
    duration: "Instant",
    check: "Close Attack vs. Defense Class",
    resistance: "Fortitude or Will vs. Effect DC",
    baseCost: 1,
    costType: "per_rank",
    fullText: `Afflictions can impose various conditions on a target. See Conditions in The Basics chapter. An Affliction imposes a mild condition if the target fails their resistance check by only one degree, and more serious conditions if they fail by more degrees. Select the conditions the Affliction imposes and the resistance targets use to resist and overcome it when configuring the effect.

USING AFFLICTION
Make a close attack check against the target's Defense Class. If successful, the target makes a resistance check against the Effect DC. Choose which resistance is used when the effect is configured. The resistance check results are:
SUCCESS: No effect.
FAILURE (ONE DEGREE): Imposes a minor Condition: one of Dazed, Deafened, Disabled (limited to one trait), Fatigued, Figment, Hindered, Impaired, Indifferent, Prone, Unaware (limited to one non-accurate sense), or Vulnerable.
FAILURE (TWO DEGREES): Imposes a moderate Condition: one of Blinded, Compelled, Confused, Defenseless, Disabled, Exhausted, Favorable, Frightened, Immobile, Phantasm, Stunned, Susceptible, Unaware (limited to one accurate sense), or Unfavorable.
FAILURE (THREE DEGREE): Imposes a major Condition: one of Asleep, Controlled, Debilitated, Delusion, Helpful, Hostile, Incapacitated, Paralyzed, Transformed, Unaware, or Unconscious.

Affliction effects are not normally cumulative: Only the highest degree of failure from multiple Afflictions applies. So a target hit with an Affliction three times for 1 DoF, 1 DoF, and 2 DoF, is only affected by two degrees of failure. The Cumulative extra makes an Affliction's results cumulative.

OVERCOMING AFFLICTIONS
A target affected by an Affliction makes a new resistance check at the end of each of their turns for first and second degree conditions. A target affected by a third degree condition must wait a full minute (ten turns) between new resistance checks without using a Recover action or Extra Effort for Resistance. A successful resistance check removes the condition. Failure means the ongoing effect remains. By default the same resistance used to initially resist the Affliction's effects is also used to overcome it, but the resistance check to overcome can use a different resistance, chosen when the effect is configured. So, for example, an Affliction might be initially resisted by a Dodge check, but overcome by a Fortitude or Will check.

IMPOSED ATTITUDES
If an Affliction imposes an attitude on a character the character acts in accordance with that attitude while the condition lasts. See Attitudes under Interaction Skills in Chapter 4. Once they overcome the Affliction, they are aware their attitude was altered and may react accordingly, usually by their attitude worsening at least one degree, if not simply shifting to Hostile. Similarly, if an Affliction imposes the Compelled or Controlled conditions, the subject is aware their actions were dictated to them, and may react accordingly once they overcome the condition. The Subtle extra makes it more difficult to determine where the outside influence comes from, while the Insidious extra means the subject is not aware they were influenced by an outside agency, and have no explanation for their changed behavior. See the descriptions in Extras section of this chapter for details.

IMPOSED EFFECTS
The Transformed condition can be configured to impose a particular Personal Range effect on the target, such as Morphing them, Shrinking them, or having them Teleport elsewhere, for examples, chosen when the effect is configured. The imposed effect must have a Power Point cost equal to or less than the total cost of the Affliction and require a standard action or less to activate.

If the Affliction imposes the Transformed condition, then the imposed effect occurs as a part of it. The target's resistance to the effect is part of their resistance checks against the Affliction. An Instant Duration effect like Teleport occurs and then ends, along with the condition, while a longer Duration effect like an Alteration lasts for as long as the Transformed condition does: One resistance check per minute to overcome it.

Some Transform effects essentially leave the target both Incapacitated and Transformed, such as turning the target to stone, for example. This doesn't count as an extra or flaw, just a descriptor of the power.

EXTRAS
* CONCENTRATION: The Affliction's Duration parameter becomes Concentration. So long as you take a Concentrate action on your turn to maintain the effect, the target is subjected to a new Affliction effect, with no attack check required. If the target overcomes the Affliction, they are still subject to a new effect on your next turn so long as you continue to maintain the effect. +1 point per rank.
* CONTAGIOUS: When another potential target comes into contact with a target affected by an ongoing Contagious Affliction, they must make a resistance check or also be affected by the Affliction. They in turn also become Contagious, and the Affliction effect lingers until all targets affected by it have overcome it or its duration expires. +1 point per rank.
* CUMULATIVE: Each time a target fails to resist a new use of a Cumulative Affliction, it intensifies. Add up all the target's degrees of failure against the Affliction to determine the effective degree. This does not include failures on resistance checks to overcome the Affliction, but see Progressive, following. +1 point per rank.
* EMPOWERING: The Affliction's major condition can Transform the subject into a form with a Power Point total equal to (effect rank x 15) Power Points, although you can always choose a form worth fewer Power Points. +2 points per rank.
* EXTRA CONDITION: The Affliction imposes a second condition at the first and second degree, chosen when the effect is configured. +1 point per rank.
* FATAL: A Fatal Affliction is potentially deadly. If it imposes a third degree condition and the target fails their first resistance check to overcome the Affliction, they gain the Dying condition. This can happen multiple times so long as the target continues failing resistance checks to overcome the Affliction's third degree condition until they are either successful or they perish. If their condition is stabilized, they are no longer Dying. +1 point per rank.
* INCREASING DIFFICULTY: When applied to a Cumulative or Progressive Affliction, this extra increases the DC of the effect's resistance checks by +1 per check after the initial check. This continues until the target either succeeds on a resistance check, ending the effect, or the DC exceeds the target's applicable resistance + 20, at which point the DC stops increasing, but they only succeed on a roll of 20 on the die. +1 point per rank.
* PROGRESSIVE: If the target fails a resistance check to overcome the Affliction, it not only continues, but increases by one degree. A successful resistance check still ends the Affliction, as usual. +2 points per rank.
* PROLONGED: Additional resistance checks against the Affliction occur at the end of each scene, rather than per round or minute. Characters can still use Extra Effort for Resistance to gain a new immediate resistance check and the Affliction effect can still be countered. +2 points per rank.
* REVERSIBLE: You can remove any conditions imposed by your Affliction automatically as a free action or reaction, so long as the subject is within your effect's Range. For 2 ranks of this extra, you can remove the Affliction's conditions regardless of distance. +1 or +2 points flat.
* SUSTAINED: The effect's Duration parameter becomes Sustained. So long as you take a Sustain action on your turn to maintain the effect, the target is subjected to a new Affliction effect, with no attack check required. If the target overcomes the Affliction, they are still subject to a new effect on your next turn so long as you continue to maintain the effect. +2 points per rank.
* VARIABLE CONDITIONS: An Affliction with this extra can vary the conditions it imposes. Choose the conditions imposed when the Affliction is used rather than when it is configured. The Affliction is still limited to the target's degree of failure on the resistance check. A Variable Transformed condition lets the user choose the form the target is transformed into when the Affliction is used. +2 points per rank. +1 point per rank if only one degree of the Affliction (first, second, or third) is Variable, chosen when the effect is configured.

FLAWS
* DECREASING DIFFICULTY: Each successive resistance check to overcome the Affliction after the first gains a cumulative +1 bonus. -1 point flat.
* INSTANT RECOVERY: Targets of the Affliction automatically overcome it and remove its conditions at the end of the round when its duration expires. For Instant Afflictions that is when the target would normally get their first resistance check to overcome the Affliction. For Concentration and Sustained Afflictions, it is when the effect is no longer being maintained. For longer duration Afflictions, targets still get resistance checks to overcome the Affliction at its usual rate. -1 point per rank.
* LIMITED DEGREE: A Limited Degree Affliction does not impose a condition for one of its degrees (first, second, or third). With two applications of this flaw, the Affliction does not impose a condition for two of its degrees. Those degrees don't do anything other than determining the Affliction's total degree, including when resistance checks to overcome it occur. -1 point per rank.
* ONSET: Although the target makes their resistance check against the Affliction immediately as usual, the effect does not impose its conditions right away. Instead, they occur after a specific onset time. The Affliction's conditions are either imposed in one round, at the start of the user's next turn, or at the start of the next scene. Resistance against the ongoing effect then proceeds normally. This flaw is often combined with the Prolonged extra for slow, long-lasting Afflictions. -1 point flat for one round, -1 point per rank for one scene.`,
    shortDesc: "Imposes conditions based on degrees of failure: minor (1st), moderate (2nd), or major (3rd).",
    powerOptions: [
      { key: "resist", label: "Resisted/Overcome By", type: "dropdown", choices: ["Fortitude", "Will", "Dodge"], fullRow: true },
      { key: "deg1", label: "1st Degree", type: "dropdown", choices: ["- None -", "Dazed", "Deafened", "Disabled", "Fatigued", "Figment", "Hindered", "Impaired", "Indifferent", "Prone", "Unaware", "Vulnerable"] },
      { key: "deg1_extra", label: "Extra 1st Degree", type: "dropdown", choices: ["- None -", "Dazed", "Deafened", "Disabled", "Fatigued", "Figment", "Hindered", "Impaired", "Indifferent", "Prone", "Unaware", "Vulnerable"] },
      { key: "deg2", label: "2nd Degree", type: "dropdown", choices: ["- None -", "Blinded", "Compelled", "Confused", "Defenseless", "Disabled", "Exhausted", "Favorable", "Frightened", "Immobile", "Phantasm", "Stunned", "Susceptible", "Unaware", "Unfavorable"] },
      { key: "deg2_extra", label: "Extra 2nd Degree", type: "dropdown", choices: ["- None -", "Blinded", "Compelled", "Confused", "Defenseless", "Disabled", "Exhausted", "Favorable", "Frightened", "Immobile", "Phantasm", "Stunned", "Susceptible", "Unaware", "Unfavorable"] },
      { key: "deg3", label: "3rd Degree", type: "dropdown", choices: ["- None -", "Asleep", "Controlled", "Debilitated", "Delusion", "Helpful", "Hostile", "Incapacitated", "Paralyzed", "Transformed", "Unaware", "Unconscious"] },
      { key: "deg3_extra", label: "Extra 3rd Degree", type: "dropdown", choices: ["- None -", "Asleep", "Controlled", "Debilitated", "Delusion", "Helpful", "Hostile", "Incapacitated", "Paralyzed", "Transformed", "Unaware", "Unconscious"] }
    ],
    configurations: [
      { name: "Affliction Aura", modifiers: [{ name: "Aura", ranks: 1 }] },
      { name: "Dazzle", options: { resist: "Dodge", deg1: "Unaware", deg2: "Unaware", deg3: "- None -" }, modifiers: [{ name: "Ranged", ranks: 1 }, { name: "Limited Degree", ranks: 1 }] },
      { name: "Hallucination", options: { resist: "Will", deg1: "Figment", deg2: "Phantasm", deg3: "Delusion" }, modifiers: [{ name: "Perception Range", ranks: 2 }] },
      { name: "Mind Control", options: { resist: "Will", deg1: "Dazed", deg2: "Compelled", deg3: "Controlled" }, modifiers: [{ name: "Perception Range", ranks: 2 }] },
      { name: "Paralyze", options: { resist: "Fortitude", deg1: "Hindered", deg2: "Immobile", deg3: "Paralyzed" } },
      { name: "Snare", options: { resist: "Dodge", deg1: "Hindered", deg1_extra: "Vulnerable", deg2: "Defenseless", deg2_extra: "Immobile", deg3: "- None -" }, modifiers: [{ name: "Ranged", ranks: 1 }, { name: "Extra Condition", ranks: 1 }, { name: "Limited Degree", ranks: 1 }] },
      { name: "Stun", options: { resist: "Fortitude", deg1: "Dazed", deg2: "Stunned", deg3: "Incapacitated" } },
      { name: "Suffocation", options: { resist: "Fortitude", deg1: "Dazed", deg2: "Stunned", deg3: "Incapacitated" }, modifiers: [{ name: "Ranged", ranks: 1 }, { name: "Concentration", ranks: 1 }] },
      { name: "Toxin", options: { resist: "Fortitude", deg1: "Impaired", deg2: "Disabled", deg3: "Incapacitated" } },
      { name: "Transform", options: { resist: "Fortitude", deg1: "- None -", deg2: "- None -", deg3: "Transformed" }, modifiers: [{ name: "Progressive", ranks: 1 }, { name: "Limited Degree", ranks: 2 }] },
      { name: "Weaken", options: { resist: "Fortitude", deg1: "Impaired", deg2: "Disabled", deg3: "Debilitated" }, modifiers: [{ name: "Cumulative", ranks: 1 }, { name: "Limited", ranks: 1 }] }
    ]
  },
  {
    name: "Burrowing",
    type: "Movement",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    baseCost: 1,
    costType: "per_rank",
    fullText: `You can burrow through the ground, leaving a tunnel behind you, if you choose, that's large enough to accommodate your size rank.

BURROWING MOVEMENT
You move through soil and sand at a speed rank equal to your Burrowing rank. Burrowing through hard clay or packed earth reduces Speed by 1 rank, while Burrowing through rock reduces it by 2 ranks. The tunnel behind you is wide enough to accommodate your size and either stable and semi-permanent or collapses immediately, your choice each turn you burrow.

BURROWING AND SENSES
Burrowing does not grant the ability to perceive through solid materials, so many burrowers also acquire Enhanced Senses like Direction Sense, Distance Sense, Sight Penetrates Concealment, or Ranged Touch Penetrates Concealment, to help them navigate while burrowing. See the Enhanced Senses effect for details.

BURROWING AND PERMEATE
Note that Burrowing differs from the Permeate effect of Enhanced Movement, which allows you to move through solid obstacles without disturbing them at all. See the Enhanced Movement effect for details.

BURROWING VS. BARRIERS
Burrowing is not useful as an attack, even to damage objects, although the GM can decide—depending on its descriptors—if it can "dig" through some solid walls or other, similar barriers. Generally, this should be treated like damaging an object using your Burrowing rank as Damage. See Damaging Objects in the Action & Adventure chapter.

EXTRAS
* PENETRATING: Normally, the hardness of the ground affects only the speed at which you burrow. At the GM's discretion, some super-hard materials may be considered Impervious to Burrowing, in which case this extra allows you to dig through them at your Penetrating rank. +1 point per rank.
* RANGED: This extra either allows you to dig tunnels at a distance, without having to be at the end-point of the tunnel as it forms, or in conjunction with the Affects Others extra it allows you to bestow a Burrowing effect on someone else at a distance. Doing both requires two applications of this extra. +1 or +2 points per rank.

FLAWS
* LIMITED: Burrowing may be limited to certain circumstances or materials, such as only loose sand and soil, leaving the character unable to burrow through dense clay or solid rock, or only snow and ice, being unable to burrow through earth and soil at all, for examples. -1 point per rank.
* NO COLLAPSE: Your burrowed tunnels are always stable and you cannot choose to collapse the tunnel you leave behind you as you burrow. -1 point flat.
* NO TUNNEL: Your burrowed tunnels are always unstable and collapse behind you. You cannot leave a stable tunnel when you burrow. -1 point flat.`,
    shortDesc: "Dig through earth or similar materials at speed rank equal to Burrowing rank.",
    specificExtras: [
      { name: "Penetrating", cost: 1, costType: "per_rank", description: "Allows Burrowing to bypass materials normally impervious to digging." },
      { name: "Ranged", cost: 1, costType: "per_rank", description: "Allows tunneling at a distance or granting Burrowing to others with Affects Others." }
    ],
    specificFlaws: [
      { name: "Limited", cost: 1, costType: "per_rank", description: "Burrowing only works through specific materials such as sand, soil, snow, or ice." },
      { name: "No Collapse", cost: 1, costType: "flat", description: "Tunnel cannot be collapsed intentionally." },
      { name: "No Tunnel", cost: 1, costType: "flat", description: "Tunnel collapses behind you and cannot be left open." }
    ],
    configurations: [
      { name: "Basic Burrowing", modifiers: [] },
      { name: "Penetrating Burrow", modifiers: [{ name: "Penetrating", ranks: 1 }] },
      { name: "Ranged Excavation", modifiers: [{ name: "Ranged", ranks: 1 }] },
      { name: "Collapse Tunnel", modifiers: [{ name: "No Tunnel", ranks: 1 }] },
      { name: "Reinforced Tunnel", modifiers: [{ name: "No Collapse", ranks: 1 }] }
    ]
  },
  {
    name: "Communication",
    type: "Sensory",
    action: "Free",
    range: "Rank",
    duration: "Sustained",
    baseCost: 2,
    costType: "per_rank",
    fullText: `You can communicate at a distance using a medium other than normal means. Choose a sense type as your Communication medium:

COMMUNICATION MEDIUM TABLE:
* Sight: laser, infrared, or fiber optic link
* Hearing: ultrasonic or infrasonic beam, pheromones or chemical markers, super-ventriloquism
* Touch: vibratory carrier wave
* Radio: AM, FM, or short-wave radio bands, microwaves
* Mental: telepathy, psychic link, mystical sending
* Special: neutrinos, tachyons, gravity waves

COMMUNICATION DISTANCE
Your effect rank determines the maximum range of your Communication:
* Rank 1 (Short Range): Within the same city
* Rank 2 (Medium Range): Within the same geographic area
* Rank 3 (Long Range): Within the same continent
* Rank 4 (Worldwide): Anywhere in the world
* Rank 5 (Unlimited): Effectively anywhere

RECEIVING COMMUNICATION
The recipient of your Communication must be within range and have a means of receiving, either an Enhanced Sense or suitable equipment. A conscious mind is all that is needed to receive Mental Communication, but actual equipment capable of receiving or recording it is generally limited. You can receive and respond to Communication that uses the same medium as your own. Receivers can choose to ignore your Communication, if they wish. Communication is normally language-dependent; you and the receiver must share a common language to communicate. See the Comprehend effect to communicate across language barriers. Your Communication is normally point-to-point, sent to a single receiver within your range, and two-way, allowing receivers to respond along the communications channel you create.

USING COMMUNICATION
Activating your Communication effect is a free action. Communicating, however, takes the normal amount of time. You can apply the Rapid extra to speed things up, provided your recipient is also capable of processing Communication at that speed.

DETECTING COMMUNICATION
Others with an Acute Sense able to detect your Communication medium can "tap into" your transmissions with a DC (10 + Communication rank) Perception check. In some cases this might be an appropriate skill check such as Expertise, Magic, or Technology. The eavesdropper must be within their normal sensory range of you or the receiver. With two degrees of success, the eavesdropper can also understand your transmission, "listening in" on your Communication. Sensory effects targeting your Communication medium can "jam" or block your transmissions.

EXTRAS
* BROADCAST: You can broadcast simultaneously to every receiver within your Communication range at once. Note this extra is only strictly necessary to communicate with everyone over a wide area simultaneously—since using and maintaining Communication is a free action, you can establish and maintain Communication separately with multiple receivers, such as the members of a team, all in the same turn. +1 point per rank.
* DIMENSIONAL: This modifier allows you to extend your Communication into other dimensions with range proximate to your location in that dimension. One rank of Dimensional allows you to communicate with a single other dimension, two for a group of related dimensions, and three for any dimension in the setting suitable to your Communication descriptors. +1 point flat per rank of Dimensional.
* RAPID: Your Communication occurs 10 times faster than normal speech. Each additional rank of this extra increases Communication speed by a factor of 10. This is useful for high-speed computer links or "deep sharing" psychic connections and the like. +1 point flat per rank of Rapid.
* SELECTIVE: If you have the Broadcast extra you can choose which receivers within range get your Communication, everyone else excluded. +1 point per rank.
* SUBTLE: Your Communication cannot be "overheard," it is encrypted, scrambled, or otherwise protected. With 2 ranks, your Communication cannot even be detected; no one can tell you are transmitting, much less what you're saying. +1 or 2 points flat.

FLAWS
* LIMITED: Communication may be limited to only members of a particular group, such as a species, family, members of an organization, and so forth. -1 point per rank.
* ONE-WAY: You can only transmit communication, but cannot receive replies unless the receiver also has a Communication effect with sufficient range to reach you. -1 point per rank.`,
    shortDesc: "Transmit messages across distance using a chosen sensory medium.",
    powerOptions: [
      { key: "medium", label: "Communication Medium", type: "dropdown", choices: ["- Select Medium -", "Mental", "Radio", "Sight", "Hearing", "Smell", "Touch", "Special"] }
    ],
    specificExtras: [
      { name: "Broadcast", cost: 1, costType: "per_rank", description: "Transmit to all receivers in range simultaneously." },
      { name: "Rapid (Communication)", cost: 1, costType: "flat", hasRanks: true, description: "Transmit messages 10x faster per rank." },
      { name: "Subtle", cost: 1, costType: "flat", description: "Communication cannot be overheard; encrypted or hidden." }
    ],
    specificFlaws: [
      { name: "Limited (Group)", cost: 1, costType: "per_rank", description: "Communication only works with a specific group or species." },
      { name: "One-Way", cost: 1, costType: "per_rank", description: "Can only transmit; cannot receive replies." }
    ],
    configurations: [
      { name: "Commlink", options: { medium: "Radio" }, modifiers: [{ name: "One-Way", ranks: 1 }, { name: "Removable (Easily Removable)", ranks: 1 }] },
      { name: "Interface", options: { medium: "Special" }, modifiers: [] },
      { name: "Psychic Connection", options: { medium: "Mental" }, modifiers: [{ name: "Limited", ranks: 1 }] },
      { name: "Telepathic Link", options: { medium: "Mental" }, modifiers: [] }
    ]
  },
  {
    name: "Comprehend",
    type: "Sensory",
    action: "None",
    range: "Personal",
    duration: "Permanent",
    baseCost: 2,
    costType: "per_rank",
    fullText: `You can understand different forms of communication or even communicate with things that don't normally do so through language. Allocate ranks in Comprehend to the following options. Some options require more than 1 rank, noted in their descriptions.

In some situations, the GM may treat your Comprehend effect as an opportunity to use the Guidance advantage, either with a Hero Point for a heroic feat or just as a benefit of the information you receive from communicating with your subjects.

ANIMALS
* 1 Rank: You can either communicate to or comprehend animals.
* 2 Ranks: You can both communicate to and comprehend animals.
You can use interaction skills on animals able to understand you, although they are no more cooperative than normal. Wary or cunning animals may be terse and evasive, while especially stupid ones may make communication difficult. If an animal is Favorable or Helpful towards you, it may assist you.

COMPUTERS
* 1 Rank: You can either communicate to or receive communication from digital devices like computers.
* 2 Ranks: You can both communicate to and comprehend digital devices.
Most computers are limited by their programming and function in terms of what they "know" and some may not be able to answer some inquiries with anything other than "unknown" or "not found." At the GM's discretion, you can use technical skills, particularly Computers, in place of interaction skills when communicating with digital devices.

LANGUAGES
* 1 Rank: You can either communicate in any language or understand any language. This ability does not allow you to communicate with any being that does not have a language, nor does it allow you to communicate in languages where you lack the physical ability, such as using pheromones to communicate with an alien being.
* 2 Ranks: You can both communicate in any language and understand any language, communicating in one language at a time, but comprehending multiple languages at once.
* 3 Ranks: In addition to the previous, you can communicate in multiple languages at once: Listeners all hear you in a language they understand, usually their native language by default.
* 4 Ranks: In addition to the previous, you can communicate in languages where you normally lack the physical ability, gaining the necessary abilities temporarily while this effect is in use.

OBJECTS
* 2 Ranks: You can communicate with inanimate objects, granting them the ability to speak to you. Objects only "know" about events directly affecting them or occurring in their immediate area.

PLANTS
* 2 Ranks: You can communicate to and comprehend both normal plants and animate plant creatures. A plant's sense of its surroundings is limited, so it can't give or recognize detailed descriptions or answer questions about things outside of its immediate vicinity.

SPIRITS
* 1 Rank: You can comprehend spirit beings, such as ghosts or certain supernatural or extradimensional entities, perceiving their communication and relaying what you perceive to others, like a spirit medium.
* 2 Ranks: The denizens of the spirit world clearly understand you as well. The GM defines what spirit beings are affected by this, depending on the setting. In some cases, additional ranks may be required for the ability to Comprehend all spirits in the setting.

FLAWS
* LIMITED TYPE: You can only Comprehend a broad category of subject, such as avians, canines, sea creatures, or ancestral spirits, for example, or you can only Comprehend a narrow category of subject, such as dogs, falcons, or dolphins, for examples. -1 point flat for broad, -2 points flat for narrow.`,
    shortDesc: "Understand or communicate with specific subjects such as animals, plants, spirits, or languages.",
    powerOptions: [
      { key: "comprehend_type", label: "Subject", type: "dropdown", choices: ["- None -", "Animals", "Computers", "Languages", "Objects", "Plants", "Spirits"], fullRow: true }
    ],
    configurations: [
      { name: "Animal Empathy", options: { comprehend_type: "Animals" } },
      { name: "Machine Interface", options: { comprehend_type: "Computers" } },
      { name: "Universal Translator", options: { comprehend_type: "Languages" } },
      { name: "Object Reading", options: { comprehend_type: "Objects" } }
    ]
  },
  {
    name: "Concealment",
    type: "Sensory",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    baseCost: 2,
    costType: "per_rank",
    fullText: `When this effect is active, you gain Full Concealment from a particular sense, although you remain detectable to other senses, even other sense of the same type, so you could have sight Concealment from normal sight, for example, but not Infra-Vision or other senses in the Sight Sense Type.

Each additional rank gives you Concealment from another sense; 2 ranks give you Concealment from an entire sense type. Concealment from sight senses costs double: 2 ranks for one sight sense, 4 ranks for all sight senses. You cannot have Concealment from touch senses, since that requires being incorporeal. See the Insubstantial effect. So with Concealment 5, you can have Full Concealment from all sight senses (4 ranks) as well as normal hearing (1 rank), for example. With Concealment 10, you have Full Concealment from all sense types other than touch.

To conceal an area, see the Obscure effect.

CONCEALMENT EFFECTS
Full Concealment from all of an attacker's accurate senses applies a -5 penalty against any attacks against you, and attackers need a Perception check against your Stealth check result to guess your current position. If they fail, any direct attacks they make against you automatically miss. You cannot be targeted by Perception Range attacks using a sense from which you are totally concealed. If you attack a target unaware of your presence, you gain a +5 bonus on the attack check, but give away your location.

EXTRAS
* AFFECTS OTHERS: You can grant Concealment to others while you are touching them, or at range, if you also apply the Ranged extra. +1 point per rank.
* PRECISE: You can vary your Concealment at will as a free action, going from total to partial to no concealment, concealing some parts of yourself and not others, or anywhere in-between. +1 point flat.

FLAWS
* BLENDING: You blend into the background like a super-chameleon. Your Concealment effect only functions so long as you move no faster than speed rank 1. -1 point per rank.
* LIMITED: Your Concealment only works under certain conditions, such as in fog, shadows, or in urban areas. -1 point per rank.
* PARTIAL: Your effect provides only Partial Concealment, applying a -2 penalty to attack checks against you. -1 point per rank.
* PASSIVE: Your Concealment only lasts until you take a standard action requiring a check. -1 point per rank.
* RESISTIBLE: Anyone aware of your presence or actively looking for you can make a resistance check against DC 10 + Concealment rank to overcome your Concealment. -1 point per rank.`,
    shortDesc: "Become undetectable to one or more senses.",
    powerOptions: [
      { key: "senses", label: "Concealed Senses", type: "dropdown", choices: [
        "- Select Sense -",
        "Normal Sight (2 ranks)", "All Sight Senses (4 ranks)",
        "Normal Hearing (1 rank)", "All Hearing Senses (2 ranks)",
        "All Radio Senses (2 ranks)", "All Mental Senses (2 ranks)", "All Senses (10 ranks)"
      ], fullRow: true }
    ],
    specificExtras: [
      { name: "Precise (Concealment)", cost: 1, costType: "flat", description: "Vary concealment between total, partial, and none at will." }
    ],
    specificFlaws: [
      { name: "Blending", cost: 1, costType: "per_rank", description: "Only functions while moving at speed rank 1 or slower." },
      { name: "Passive", cost: 1, costType: "per_rank", description: "Deactivates whenever you take a standard action requiring a check." }
    ],
    configurations: [
      { name: "Inaudibility", rank: 1, options: { senses: "Normal Hearing (1 rank)" } },
      { name: "Invisibility", rank: 2, options: { senses: "Normal Sight (2 ranks)" } },
      { name: "Complete Sensory Mask", rank: 10, options: { senses: "All Senses (10 ranks)" } }
    ]
  },
  {
    name: "Create",
    type: "Control",
    action: "Standard",
    range: "Ranged",
    duration: "Sustained",
    baseCost: 2,
    costType: "per_rank",
    fullText: `You can form solid objects essentially out of nothing. They may be made from solidified energy, "hard" water or air, transmuted bulk matter, nanotech or "smart" matter, ice, stone, or some other medium, depending on the effect's descriptors and modifiers.

CREATED OBJECT CHARACTERISTICS
You can create an object with the following characteristics:
* Volume rank up to your effect rank. If you create a hollow rather than solid object, it can be up to 2 ranks larger.
* A created object typically has a mass rank up to its volume rank.
* Toughness rank up to your effect rank.
* The object can be in the form of a simple geometric shape or common object. The GM has final say whether or not a particular object is too complex to create.
* The object cannot have moving parts more complex than a hinge.
* Objects are either opaque, translucent, or transparent, providing total, partial, or no concealment, chosen when you configure the effect. For an object to look entirely real or to be entirely invisible, apply the Subtle extra.
* The object is stationary once created, although other effects can move it.
* Placing the created object accurately is a ranged attack check, but you can make it as a routine check against DC 10 unless you're specifically using creating the object as an attack. See Trapping With Objects and Dropping Objects, following.

MAINTAINING CREATED OBJECTS
Maintaining created objects requires a Sustain action each turn. If not maintained, the objects disappear, or crumble or collapse into dust or the like. You can only maintain your Create effect rank in total volume ranks of objects at once. So, for example, Create 10 can maintain a single volume 7 object plus a volume 3 object or three volume 1 objects, or any other combination adding up to 10. If you take the Concentrate action, you can maintain up to twice your effect rank in total object volumes, but your ability to create more will likely be limited. The Continuous and Permanent Create effects do not need maintenance and can create an unlimited number of objects, although they can still be destroyed or nullified, and you can dismiss Continuous Create effects, essentially "uncreating" the object as a free action.

DAMAGING CREATED OBJECTS
Created objects can be damaged and broken like other objects. If the object gains two or more degrees of success on a Damage resistance check, it suffers no Damage conditions. You can repair all damage to a created object by using your effect again, essentially "re-creating" the object intact once again. See Damaging Objects under the Damage effect for more.

OBJECT COVER & CONCEALMENT
A created object can provide Cover as well as Concealment, if the object is not transparent. See Cover and Concealment in the Action and Adventure chapter. Cover provided by a created object blocks incoming attacks, but blocks outgoing attacks as well. Attacks hitting the covering object damage it normally. Effects with the Indirect extra can bypass the Cover provided by a created object like any other Cover. The Selective extra allows you to vary both the Cover and Concealment your objects provide.

TRAPPING WITH OBJECTS
You can trap a target inside a hollow object larger than them, such as a cage or a bubble. This requires a successful attack check against the target's Defense and the target gets a Dodge resistance check against your Effect DC to avoid being trapped. A trapped character can break the object normally. Imposing conditions on the target other than just trapping them requires a separate effect, such as an Affliction, which may be a suitable alternate effect of Create.

ATTACKING WITH OBJECTS
While a created object could potentially be wielded as an improvised weapon, the effect cannot otherwise create attacks or other effects. You must acquire those separately, possibly as alternate effects of Create.

DROPPING OBJECTS
Simply dropping a created object onto a target is handled like a ranged attack, treating the object as an Area Effect, if it is larger than the target. See Area Effect in the Extras section. The object inflicts Damage equal to its Toughness (the effect rank) and targets get a Dodge resistance check against the Effect DC to evade the falling object, with success resulting in no damage.

SUPPORTING WEIGHT
If the created object needs to support weight, such as with a bridge or column, it has an effective Strength equal to your effect rank. You can "shore up" a created object by taking the Concentrate action, increasing its effective Strength by 1 until the end of your next turn. You can also use Extra Effort to increase a created object's Strength by 1 for one turn, and these modifiers are cumulative.

CREATE AND OTHER EFFECTS
Depending on its descriptors and modifiers, Create can range from forming simulations of physical objects out of energy to actually creating nearly-real physical things. Create is not intended for animate characters; for that effect, see Summon. Create also doesn't transform existing things; for that see Transmute. With the Equipment extra, Create can form working versions of equipment within its rank. For just the ability to summon-up different types of equipment, consider a Variable effect instead.

EXTRAS
* CONTINUOUS: Continuous Create makes objects that do not require maintenance; they remain until they are destroyed, nullified, or you choose to dismiss them. +1 point per rank.
* EQUIPMENT: You can Create fully-functional equipment, up to 1 Equipment Point per rank of Create. +1 point per rank.
* INCREASED VOLUME: Each application in this extra adds to your Create rank in determining the maximum volume rank of objects you can create. +1 point flat.
* MOVABLE: You have a Move Object effect at your Create rank that only works on your created objects. +1 point per rank.
* PERMANENT: Your created objects do not require maintenance and remain until they are destroyed or nullified. +0 per rank.
* PRECISE: You can create more precise and detailed objects with moving parts. +1 point flat.
* SELF-REPAIRING: At the start of each of your turns, any object you are maintaining that is damaged removes all Damage conditions. +1 point per rank.
* SELECTIVE: You can make your created objects selectively transparent to attacks or solid/incorporeal to specific creatures. +1 point per rank.
* STATIONARY: Your created objects can hang immobile in the air, resisting being moved with a Strength rank equal to your Create rank. +0 points per rank.
* SUBTLE: Your created objects look real or are completely unnoticeable (invisible force). +1 or 2 points flat.
* VARIABLE OPACITY: You can choose if your created objects are opaque, translucent, or transparent. +1 point flat.

FLAWS
* FEEDBACK: When your created objects are damaged, you suffer a Feedback effect. -1 point per rank.
* FRAGILE: Your created objects have a lower maximum Toughness. -1 point flat per rank.
* PROPORTIONAL: Apply ranks to volume and Toughness separately rather than simultaneously. -1 point per rank.
* SMALL: Your created objects have a lower maximum volume rank. -1 point flat per rank.
* WEAKNESS: Your created objects automatically fail Damage resistance checks. -2 points per rank (-1 point per rank for specific weakness).

* * *
UNDER THE HOOD: CREATE
Create can be a very versatile effect, particularly when applied to various Power Stunts (see Extra Effort in The Basics chapter). A character can use Create for things like improvised ramps, bridges, or supports, as well as dropping heavy objects on foes or attempting to trap them.

The key to keeping Create balanced is enforcing its limits:
* Created objects have no more Toughness or volume than the effect's rank.
* Creating an object requires a standard action, unless altered by modifiers.
* Without the Movable extra, created objects are stationary and cannot be used to "push" or move targets, only trap or drop on them.
* Hollow objects can be trapped in, but targets get a resistance check (Dodge) to avoid being enclosed.

Players with Create effects should be encouraged to think about how their character uses the power and maybe establish a few standard "tricks" or alternate effects to handle common maneuvers rather than relying solely on improvising complex object creations in the middle of action time.`,
    shortDesc: "Form solid, stationary objects with Toughness and volume equal to effect rank."
  },
  {
    name: "Damage",
    type: "Attack",
    action: "Standard",
    range: "Close",
    duration: "Instant",
    check: "Close Attack vs. Defense Class",
    resistance: "Toughness vs. Effect DC",
    baseCost: 1,
    costType: "per_rank",
    fullText: `You can inflict Damage conditions on a target by making a close attack check against your target's Defense. If your attack hits, the target makes a resistance check against your Damage effect DC:
* SUCCESS (TWO OR MORE DEGREES): If the target has Hardened, Impervious, or Impenetrable resistance against the attack and this degree of success, they receive no damage conditions. Otherwise, this is the same as one degree of success.
* SUCCESS (ONE DEGREE): The target receives the Hit condition. For each Hit condition, apply a -1 penalty to the character's further resistance checks against Damage.
* FAILURE (ONE DEGREE): The target receives a Hit condition, and the Dazed condition. If the target already has the Dazed condition, it becomes Stunned instead.
* FAILURE (TWO DEGREES): The target receives a Hit condition, the Stunned condition, plus the Staggered condition.
* FAILURE (THREE DEGREES): The target receives the Hit and Staggered conditions, plus the Incapacitated condition. If an Incapacitated character fails a Damage resistance check, their condition becomes Dying. If a Dying character fails a Damage resistance check by any degree, they are Dead.

See the Conditions section of The Basics chapter for details on the various Damage conditions. See the Damage section of the Action and Adventure chapter for additional details on Damage in play.

STRENGTH DAMAGE
Strength provides a "built-in" Damage effect: the ability to hit things! You can apply extras and flaws to the Damage your Strength inflicts. You can also have alternate effects for your Strength Damage; see Alternate Effect in the Extras section of this chapter for details. A character's Strength Damage has the same parameters as the Damage effect by default.

EXTRAS
* STRENGTH-BASED: Your Damage effect is Strength-based—something like a hand-held or thrown weapon—in which case you add your Strength and Damage ranks together when determining the rank of the attack. +0 points per rank.

* * *
UNDER THE HOOD: DAMAGE
The Damage effect—and damage in general in Mutants & Masterminds—is intended to be "superheroic" in nature: Characters often get dazed or staggered by powerful hits, but they generally bounce back and are fine by the next scene. It's fairly difficult to inflict the Dying condition on most characters and, even then, there are opportunities to save them before they perish.

The main exception to this is minions, who can be Incapacitated or even killed with a single failed Damage resistance check, and any instances where the GM feels it's dramatically appropriate for a non-player character to suffer more severe conditions from Damage, as best suits the adventure. For Game Masters and groups looking to modify the Damage system to their taste, see the Mastermind's Manual for a variety of options.`,
    shortDesc: "Inflicts harm on a target, forcing a Toughness resistance check."
  },
  {
    name: "Deflect",
    type: "Defense",
    action: "Standard",
    range: "Personal",
    duration: "Instant",
    check: "Deflect vs. Attack",
    baseCost: 1,
    costType: "per_rank",
    fullText: `When you use this effect, until the start of your next turn, you can block ranged attacks against you as well as close attacks. See Block under Actions in Chapter 8. You use your Deflect rank in place of your attack bonus when you do so, rolling a Deflect check against the attacker's check result. If your Deflect check result is higher, you deflect the attack and it has no effect on you.

If the ranged attack is a physical weapon and your Deflect check is successful, you can choose to Catch the weapon as part of your Deflect action instead of simply knocking it aside, if that makes sense for the descriptors of your effect. See Catch under Actions in the Action and Adventure chapter for details.

DEFLECT LIMITS
Deflect does not work against Area Effects, attacks that do not require an attack check, or attacks targeting resistances other than Defense. Your Deflect rank cannot be higher than the greater of the Power Level limit of your attack bonus or of your Defense rank.

EXTRAS
* AURA: Your effect automatically Blocks attacks against you without any action on your part, unless you deliberately deactivate it. +3 points per rank.
* FREE ACTION: You can use Deflect to Block as a free action. +2 points per rank.
* RANGED: You can Deflect for allies who are targeted within a range based on your Deflect rank. +1 point per rank.
* REACTION: You can use Deflect to Block as your reaction for the round. +1 point per rank.
* REDIRECT: If you successfully block an attack, you can use your reaction for the Redirect advantage. +1 point flat.
* REFLECT: Whenever you successfully block an attack, you can use the Redirect advantage without requiring an action. +1 point per rank.
* SIMPLE ACTION: You can use Deflect to Block as a simple action. +1 point per rank.

FLAWS
* LIMITED: Deflect may be limited to a particular type of ranged attacks, such as only thrown weapons, ballistic weapons, energy attacks, and so forth. -1 point per rank.`,
    shortDesc: "Actively defend yourself or allies by substituting your Deflect rank for their Defense."
  },
  {
    name: "Elongation",
    type: "Alteration",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    baseCost: 1,
    costType: "per_rank",
    fullText: `You can elongate your body and limbs to extend your reach or length. You can extend up to a maximum of (rank × distance value 3). Actions performed at an extension of (rank × distance value 1) have no modifier, those at (rank × distance value 2) have a –2 check penalty, while those at full extension (rank × distance value 3) have a –5 penalty. If performing actions with your limbs in an area you cannot accurately sense, you also take a –5 penalty on any associated checks due to concealment. See Concealment in Chapter 8.

By elongating your body, you can use your increased height to see over or around obstacles or to reach high places you might not otherwise be able to reach.

ELONGATING ATTACKS
You can use Elongation to make “close” attacks at a greater distance by elongating your limbs, giving you greater reach, with the usual modifiers for distance and concealment given previously.

ELONGATING CLIMBS
Elongating your arms and pulling yourself up allows you to substitute your Elongation rank for your Strength for Athletics checks to climb. See Athletics in the Skills chapter for details.

ELONGATING GRABS
Elongation allows you to wrap your limbs or body around an opponent when taking the Grab action, so you can substitute your Elongation rank for your Strength for the effect rank of your Grab. Your rank is limited by Power Level in this instance, like your Strength rank. Using your Elongation to Grab gives you the benefits of the Improved Grab advantage and allows you to Grab opponents with a size rank equal to or less than the total distance rank you can elongate.

EXTRAS
* SLITHERING: Your elongated form can slither along the ground, giving you the Slithering effect of Enhanced Movement. +1 point flat.
* STRIDING: By elongating your stride, you can move more quickly. Each rank of this extra gives you 1 rank of Speed (max 5 or your Elongation rank). +1 point per rank flat.
* SWINGING: Your elongated arms allow you to use the Swinging effect of Enhanced Movement. +2 points flat.`,
    shortDesc: "Extend your reach by stretching your body a distance equal to your rank."
  },
  {
    name: "Enhanced Movement",
    type: "Movement",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    baseCost: 1,
    costType: "per_rank",
    fullText: `You have an enhanced or special form of movement. Allocate ranks in Enhanced Movement to the following options. Some options require more than 1 rank, noted in their descriptions.

DIMENSIONAL TRAVEL
You can shift from one dimension to another as a standard action, carrying up to mass rank 0 of additional material with you, with the ranks allocated determining the range of possible destinations:
* 2 Ranks: You can move between your home dimension and one other.
* 4 Ranks: You can move between a related group of dimensions: mystical dimensions, dreams, parallel earths, and so on.
* 6 Ranks: You can travel to any other dimension known to you.
The Game Master determines the range of possible dimensional destinations in the setting, if any. A version of this effect is the ability to travel through time rather than other dimensions. Consult with your Game Master and obtain their permission, if you want a character who has that power.

ENVIRONMENTAL ADAPTATION
You're adapted to a particular environment, such as underwater, zero gravity, and so forth. You suffer none of the movement penalties associated with that environment, moving and acting normally, although you still need the Immunity effect to survive hazardous environments. 1 rank per Environment.

PERMEATE
You can pass through solid obstacles as if they weren't there:
* 2 Ranks: You can move at speed rank 0 through obstacles.
* 4 Ranks: You can move at speed rank 1 through obstacles.
* 6 Ranks: You can move at your normal ground speed through obstacles.
You cannot breathe while completely submerged inside a solid object, so you either need Immunity to Suffocation or have to hold your breath. You may also need Penetrates Concealment Enhanced Senses to know where you're going, since you cannot see inside solid objects, either. Permeate provides no protection against attacks, although you do gain Cover while inside an object. For the ability to allow things, including attacks, to pass through you, see the Insubstantial effect. Permeate is often Limited to a particular substance like earth, ice, or metal, for example.

SAFE FALL
As a free action or reaction, you can fall any reasonable distance without harm. You can also stop your fall at any point along a distance so long as there is a handhold or projection for you to grab onto. 1 rank.

SLITHERING
You can move at your normal ground speed while you have the Prone condition. 1 rank.

SPACE TRAVEL
You can travel faster than the speed of light through the vacuum of space, but not in a planetary atmosphere! You can carry your normal capacity with you while you travel. Ranks allocated determine how far you can travel in the context of a normal scene:
* 2 Ranks: You can travel to other planets within a solar system.
* 4 Ranks: You can travel to other star systems.
* 6 Ranks: You can visit distant star systems, perhaps even other galaxies!
You're assumed to be able to navigate to your destination, so long as it is known to you. The Game Master may place additional requirements on this, such as an appropriate skill check or use of an Enhanced Sense. This effect does not provide protection from the rigors of outer space; for that, see the Immunity effect.

STABLE
Unstable movement for a particular movement mode does not affect you and you do not need to make checks for it. See Unstable Movement in the Abilities chapter for details. 1 rank per mode of movement.

SWINGING
You can swing through the air at speed rank 2, using a swing-line you provide or available lines and projections like tree limbs, flagpoles, vines, telephone- and power-lines, and so forth. As a free action or reaction, you can use a swing-line to arrest a fall, so long as there is a place to attach it. 2 ranks.

TRACKLESS
You leave no trail and cannot be tracked using one sense type, usually sight. Each additional sense type requires another rank. 1 rank per sense type.

WALL-CRAWLING
With 2 Enhanced Movement ranks applied to this effect, you can climb walls and ceilings at your ground speed rank -1 with no chance of falling and no need for an Athletics check. You are still Vulnerable while climbing, however. For 4 ranks, you climb at your full ground speed rank and are not Vulnerable while climbing. 2 or 4 ranks.

WATER-WALKING
For 1 rank, you can stand or move at your normal ground speed across the surface of liquids without sinking. If you fall Prone for any reason, you sink normally. For 2 ranks, you can also lie Prone on a liquid surface without sinking; you only sink if you choose to. The effects of touching the liquid still affect you in the case of hazardous surfaces like acid or molten lava, for examples. 1 or 2 ranks.`,
    shortDesc: "Grants specialized movement capabilities such as Flight, Speed, Leaping, or Dimensional Travel.",
    powerOptions: [
      { key: "enh_mov_type", label: "Movement Type", type: "dropdown", choices: [
        "- Select Type -", 
        "Burrowing", 
        "Dimension Travel (Rank 2: One other, Rank 4: Related group, Rank 6: Any)", 
        "Environmental Adaptation", 
        "Flight", 
        "Leaping", 
        "Permeate (Rank 2: Speed 0, Rank 4: Speed 1, Rank 6: Normal Speed)",
        "Safe Fall", 
        "Space Travel (Rank 2: Solar System, Rank 4: Interstellar, Rank 6: Intergalactic)", 
        "Speed", 
        "Swimming", 
        "Wall-Crawling (Rank 2: Ground -1, Rank 4: Full Speed)", 
        "Water-Walking (Rank 1: Surface, Rank 2: Surface + Prone)", 
        "Zero-G"
      ], fullRow: true }
    ]
  },
  {
    name: "Enhanced Senses",
    type: "Sensory",
    action: "None",
    range: "Personal",
    duration: "Permanent",
    baseCost: 1,
    costType: "flat",
    fullText: `You have one or more enhanced sensory abilities or added sensory abilities beyond the normal senses. See Senses and Perception in Chapter 3. Allocate ranks in Enhanced Senses to the following effects. Some options require more than 1 rank, noted in their descriptions.

Enhanced Senses effects are non-actions and always available, but using them for Perception or more detailed examination of things may require an action, at the GM's discretion. In addition to the listed benefits, having an Enhanced Senses effect can be a good opportunity for a use of the Guidance advantage, including as a Heroic Feat from spending a Hero Point.

ACCURATE
An Accurate Sense can pinpoint something's exact location. You can use an Accurate Sense to target something in combat. Sight and touch senses are already Accurate. Accurate Ultra-Hearing may be Sonar, the ability to sense objects around you through ultrasonic echolocation. Accurate Radio Sense may be Radar, "pinging" a radio signal off solid objects to determine their location. An Accurate version of a mental sense like Detect Minds may be able to target them with mental powers. 2 ranks for one sense, 4 for an entire sense type.

ACUTE
You can sense fine details about anything you can detect with a particular sense, allowing you to distinguish between and identify different subjects. Sight and hearing senses are already Acute. 1 rank for one sense, 2 for an entire sense type.

ANALYTICAL
Beyond Acute, you can perceive specific details about anything you can detect with a particular sense, such as chemical composition, exact dimensions or mass, frequency of sounds and energy wavelengths, and so forth. No normal sense is Analytical. You can only apply this effect to an already Acute sense. 1 rank for one sense, 2 for an entire sense type.

AWARENESS
You can sense the use of effects of a particular descriptor at a distance in one direction, usually in front of you, with a DC 10 ranged Perception check. Examples include Cosmic Awareness, Divine Awareness, Magical Awareness, Psionic Awareness, and so forth. Choose a sense type your Awareness belongs to. A form of Awareness is a common means of noticing effects that have 1 rank of the Subtle extra. See Extras later in this chapter. 1 rank.

COUNTERS CONCEALMENT
For 2 ranks, a sense type with this effect ignores the concealment from a particular descriptor; you sense as if the concealment wasn't there. So if you have sight that Counters Invisibility, for example, then invisible beings are visible to you. For 5 ranks, the sense type ignores all Concealment effects, regardless of descriptor. Concealed subjects seem slightly "off" to you, enough to know they are concealed to others. This effect does not work on the concealment provided by opaque objects; for that, see Penetrates Concealment. 2 ranks for one Concealment effect for a sense type, 5 ranks for All Concealment effects for a sense type.

COUNTERS ILLUSION
A sense type with this effect ignores the Illusion effect; you automatically sense the illusion isn't real. Note that this effect does not work against the Hallucination effect, which occurs in the subject's mind. 2 ranks.

DANGER SENSE
When you gain the Surprised or Vulnerable conditions, make a DC 10 Perception check: One degree of success means you're not Vulnerable, even while Surprised. Two degrees of success mean you are not Surprised at all. 2 ranks.

DARK-VISION
You can see in complete darkness as if it were normal lighting, the equivalent of Sight Counters Concealment from darkness. 2 ranks.

DETECT
You can sense a particular item, quality, or effect by touch with a Perception check, usually DC 10, but set by the GM. Choose a sense type your Detect belongs to. Detect only indicates the presence or absence of something and is not Acute, Accurate, Radius, or Ranged, although you can apply those and other Enhanced Senses effects to it. 1 rank.

DIMENSIONAL
This effect allows you to extend all of your senses into other dimensions proximate to your location in that dimension. 1 rank of Dimensional allows you to sense into a single other dimension, 2 ranks for a group of related dimensions, and 3 ranks for any dimension in the setting suitable to your power descriptors. Dimensional with an Accurate sense is especially useful for targeting other Dimensional effects. See Dimensional under Extras for details. +1 point flat for a single other dimension, +2 for a group of related dimensions, +3 for any dimension.

DIRECTION SENSE
You always know what direction magnetic north lies in and can retrace your steps through any place you've been. 1 rank.

DISTANCE SENSE
You can accurately and automatically judge distances you can accurately perceive. 1 rank.

EXTENDED SENSE
Each rank in Extended Sense multiplies the distance for a -1 penalty to your Perception checks with a Ranged Sense by 10. 1 rank for one sense, 2 ranks for an entire sense type.

INFRA-VISION
You can see in the infrared portion of the spectrum, allowing you to perceive heat patterns. Darkness does not provide concealment for objects, such as people, that differ in temperature from their surroundings. Note that unlike normal sight, Infra-Vision is not Acute, although it is Accurate. 1 rank.

LOW-LIGHT VISION
You ignore penalties to sight Perception checks for poor lighting, so long as it is not completely dark. 1 rank.

MICROSCOPIC VISION
You can see extremely small things. For 1 rank you can see dust-sized objects, cellular-sized for 2 ranks, DNA and complex molecules at 3 ranks, and individual atoms at 4 ranks. This may allow you to gather information unavailable to others, especially with an Investigation or Expertise skill check to interpret it. 1 to 4 ranks.

PENETRATES CONCEALMENT
A sense with this effect ignores concealment from obstacles. Sight that Penetrates Concealment sees right through opaque objects, for example, and hearing that Penetrates Concealment is unaffected by sound-proofing or intervening materials. 4 ranks for an accurate sense, 2 ranks for other sense types.

RADIO
You can perceive radio frequencies including AM, FM, cellular, WiFi, police bands, and so forth and "listen-in" on their broadcasts as if you were a receiver. This sense is Ranged, Radius, and Acute by default. 1 rank.

RADIUS
You can make Perception checks with a sense at any point around you. Hearing, smell, radio, and touch senses are normally Radius. 1 rank for one sense, 2 ranks for an entire sense type.

RANGED
You can use a sense that normally has no range, such as normal taste or touch, to make Perception checks at Range, with a -1 penalty to Perception checks per space between you and the subject. 1 rank for one sense, 2 ranks for an entire sense type.

RAPID
You can take in information from a sense faster than normal: 1 rank increases your perception speed by a factor of +3 time ranks with a single sense, 2 ranks for an entire sense type. You can use Rapid Sight to speed-read, pick up on flickering between frames of a film, watch video replays in fast-forward speeds, and such, Rapid Hearing to listen to time-compressed audio "blips," and so forth. If you also have Quickness, your Rapid Sense ranks apply on top of your Quickness ranks. 1+ ranks.

TIME SENSE
You always know what time it is relative to your location and can time events as if you had an accurate stopwatch. 1 rank.

TRACKING
You can follow trails and track using a particular sense. The DC to follow a trail is 10, modified by circumstances, including your distance from the trail, and is set by the GM. You move at up to speed rank 1 while tracking. For 2 ranks, you move at your normal speed rank while tracking. 1 or 2 ranks.

ULTRA-HEARING
You can hear very high and low frequency sounds, like dog whistles or ultrasonic signals. 1 rank.

ULTRA-VISION
You can see ultraviolet light, allowing you to see normally at night by the light of the stars as if it were daylight. 1 rank.

EXTRAS
* AFFECTS OTHERS: You can grant the benefits of one or more Enhanced Senses to another character. Apply Affects Others only to the ranks of the chosen Enhanced Senses. +0 or +1 point per rank, if both you and your subject can use the senses.
* AREA: The Area Effect modifier only applies to Enhanced Senses that Affect Others, and only to extend their benefits to everyone in the Area. Apply the Selective modifier for the ability to choose who in the area does and does not benefit from the Enhanced Senses. +1 point per rank.
* RANGED: The Ranged extra only applies to senses that Affect Others, extending the distance at which you can grant their benefits. +1 point per rank.

FLAWS
* LIMITED: Some Enhanced Senses may be Limited to only sensing certain things or only under certain circumstances. -1 point per rank.
* NOTICEABLE: Enhanced Senses with this flaw are noticeable in some way: your eyes may glow, or you may emit a noticeable sound, vibration, energy, or the like for use as a sensor. -1 point flat.
* UNRELIABLE: Some Enhanced Senses may be Unreliable; the GM makes checks for reliability when the sense is used. -1 point per rank.`,
    shortDesc: "Grants enhanced or additional sensory abilities beyond normal perception.",
    powerOptions: [
      { key: "sense_type", label: "Primary Sense Option", type: "dropdown", choices: [
        "- Select Sense Option -",
        "Awareness [1 pt]",
        "Counters Concealment [2-5 pts]",
        "Counters Illusion [2 pts]",
        "Danger Sense [2 pts]",
        "Dark-Vision [2 pts]",
        "Detect [1 pt]",
        "Dimensional [1-3 pts flat]",
        "Direction Sense [1 pt]",
        "Distance Sense [1 pt]",
        "Extended Sense [1 pt per +4 ranks]",
        "Infra-Vision [1 pt]",
        "Low-Light Vision [1 pt]",
        "Microscopic Vision [1-4 ranks]",
        "Penetrates Concealment [2-4 ranks]",
        "Radio [1 pt]",
        "Radius [1-2 pts]",
        "Ranged [1-2 pts]",
        "Rapid [1+ pts]",
        "Time Sense [1 pt]",
        "Tracking [1-2 pts]",
        "Ultra-Hearing [1 pt]",
        "Ultra-Vision [1 pt]",
        "X-Ray Vision [4 pts]",
        "Custom Sense"
      ], fullRow: true },
      { key: "sense_meta", label: "Meta-Option Modifier", type: "dropdown", choices: [
        "- None / Standalone -",
        "Accurate (Pinpoint location) [+2 pts for 1 sense / +4 for type]",
        "Acute (Distinguish fine details) [+1 pt for 1 sense / +2 for type]",
        "Analytical (Perceive specific scientific specs) [+1 pt for 1 sense / +2 for type]"
      ], fullRow: true },
      { key: "sense_details", label: "Custom Sense Details / Notes", type: "textarea", placeholder: "Describe descriptors, target objects, or custom sense parameters...", fullRow: true }
    ]
  },
  {
    name: "Enhanced Trait",
    type: "General",
    action: "None",
    range: "Personal",
    duration: "Permanent",
    baseCost: 1,
    costType: "per_rank",
    fullText: `You have an improved ability, skill, advantage, Defense, or other non-effect trait as an effect. So, for example, Enhanced Strength 5 increases your Strength rank by 5 but those additional 5 ranks of Strength are a power effect rather than your "natural" Strength.

The cost of Enhanced Trait is the same as acquiring the chosen trait normally. The key differences are the Enhanced Trait is an effect and as such it can be combined with other effects as well as countered or nullified. See Enhanced Abilities in the Abilities chapter for more.

EXTRAS
* SUSTAINED: Your Enhanced Trait is a Sustained Duration improvement. Its Action changes to Free, since it needs to be activated and then maintained. +0 points per rank.

FLAWS
* LIMITED: Enhanced Traits are often Limited in some way, like Nighttime or Daytime Only, While Angry, or Underwater. -1 point per rank.
* REDUCED TRAIT: One or more of your traits are lowered while others are enhanced. -1x (the cost of the reduced trait) flat.`,
    shortDesc: "Raises the rank of a specific Ability, Skill, Defense, or Advantage.",
    powerOptions: [
      { key: "enhanced_trait", label: "Trait Raised", type: "dropdown", choices: [
        "- Select Trait -",
        "Strength (STR)", "Stamina (STA)", "Agility (AGL)", "Intellect (INT)", "Awareness (AWE)", "Presence (PRE)",
        "Attack (ATK)", "Defense (DEF)", "Dodge Resistance", "Fortitude Resistance", "Will Resistance",
        "**SKILLS**",
        "Acrobatics", "Athletics", "Close Combat", "Computers", "Deception", "Expertise", "Insight", "Intimidation", "Investigation", "Perception", "Persuasion", "Ranged Combat", "Sleight of Hand", "Stealth", "Technology", "Treatment", "Vehicles",
        "**ADVANTAGES**",
        "Agile Feint", "All-Out Attack", "Animal Empathy", "Assessment", "Benefit", "Close Attack", "Close Defense", "Connected", "Contact", "Daze", "Defensive Attack", "Defensive Roll", "Eidetic Memory", "Equipment", "Evasion", "Fascinate", "Fast Grab", "Favored Environment", "Favored Foe", "Grab Finesse", "Great Endurance", "Hide in Plain Sight", "Improved Aim", "Improved Critical", "Improved Defense", "Improved Disarm", "Improved Hold", "Improved Initiative", "Improved Trip", "Improvised Tools", "Jack-of-all-Trades", "Languages", "Luck", "Minion", "Move-by Action", "Multilingual", "Power Attack", "Prone Fighting", "Quick Draw", "Ranged Attack", "Ranged Defense", "Ranged Disarm", "Redirect", "Ricochet Attack", "Ritualist", "Second Chance", "Setup", "Sidekick", "Skill Focus", "Startle", "Tough", "Trance", "Ultimate Effort", "Uncanny Dodge", "Weapon Bind", "Weapon Break"
      ], fullRow: true }
    ]
  },
  {
    name: "Environment",
    type: "Control",
    action: "Free",
    range: "Rank",
    duration: "Sustained",
    baseCost: 1,
    costType: "per_rank",
    fullText: `You can change the environment in an area: raising or lowering the temperature, raising or lowering the illumination or visibility, impeding or creating hazardous movement, and so forth. See Environmental Hazards in the Action and Adventure chapter for details on environmental conditions and their effects.

Your Environment affects a distance rank area equal to your effect rank, like a Sphere Area Effect. See Area Effect in the Extras section. Rank 20 is sufficient to alter the environment of an entire continent!

Each of the following is a separate Environment effect. You can acquire others as alternate effects of the first, but you can then only use and maintain one at a time. To use or maintain multiple Environment effects at once, add their costs together for the effect's total cost per rank or apply the Selective extra, allowing you to mix-and-match effects or a total point value. See Extras, following.

COLD
You can lower the temperature in the area. For 1 point per rank, you create intense cold. For 2 points per rank, you create extreme cold. Characters in a cold environment have to make a Fortitude resistance check (DC 10, +1 per previous check) to avoid gaining a Fatigued condition. The check is once per 10 minutes for intense cold, once per minute for extreme cold.

HAZARDOUS MOVEMENT
You cause movement through the area to become hazardous with high winds, icy or wet surfaces, tremors, or similar descriptors. For 1 point per rank, characters must make an Athletics check when moving through the area or fall Prone. The DC for the check is 5, +5 per point per rank in this effect. Characters can avoid the need for the Athletics check by reducing their speed rank in the area by -1 per point per rank of this effect. So for 2 points per rank, Hazardous Movement requires a DC 15 Athletics check and characters can avoid the need for a check by reducing their speed by 2.

HEAT
You can raise the temperature in the area. For 1 point per rank, you create intense heat. For 2 points per rank, you create extreme heat. Characters in a hot environment have to make a Fortitude resistance check (DC 10, +1 per previous check) to avoid gaining a Fatigued condition. The check is once per 10 minutes for intense heat, once per minute for extreme heat.

HIGH GRAVITY
For 1 point per rank, you increase the pull of gravity in the area, imposing a mass rank 1 weight on everyone within it. For 2 points per rank, you increase the mass rank imposed to 2. It is at the Game Master's discretion whether or not you can increase the cost of this Environment effect to more than 2 points per rank. Stronger high gravity effects can be configured as Area Effect Move Object, Limited to Pulling Downwards. See Move Object later in this chapter.

HINDERED MOVEMENT
You can impede movement through the area with high winds, icy or wet surfaces, or similar descriptors. For 1 point per rank, you reduce movement speed through the area by 1 rank; for 2 points per rank, you reduce it by 2 ranks.

ILLUMINATION
You can raise the light level in the area, countering the concealment of darkness. For 1 point per rank, you can create enough light to reduce Full Concealment to Partial and Partial Concealment to none. For 2 points per rank, you can shed light as bright as a sunlit day, eliminating all Concealment provided by natural darkness. Power effects with the darkness descriptor may be countered with a successful power check. See Countering Effects previously in this chapter.

LOW GRAVITY
For 1 point per rank, you lower gravity in the area, increasing effective lifting and jumping ranks by +1, but leaving characters Impaired on all action checks unless they have Environmental Adaptation: Low Gravity or succeed on a DC 10 Acrobatics check as a free action each turn. For 2 points per rank, you create an area of microgravity or free-fall: Characters are Vulnerable and Disabled on all action checks, including attacks, unless they have Environmental Adaptation or succeed on a DC 15 Acrobatics check as a free action each turn.

VISIBILITY
You impose a -2 penalty to sight Perception checks for 1 point per rank, and a -5 penalty for 2 points per rank. For more significant obscuring of senses use the Obscure effect later in this chapter.

EXTRAS
* SHAPE: At the Game Master's discretion, you can change the default Range of your Environment effect at no cost to a shape other than a sphere, such as a Cone, Cube, or Shapable Area. +0 points.
* VARIABLE: You can vary the environment within your affected area, choosing how the Environment effect's points are configured among different effects. +1 point per rank.`,
    shortDesc: "Alter environmental conditions such as temperature, light, visibility, or movement."
  },
  {
    name: "Extra Limbs",
    type: "Alteration",
    action: "None",
    range: "Personal",
    duration: "Permanent",
    baseCost: 1,
    costType: "per_rank",
    fullText: `You have extra manipulative limbs, such as arms, tentacles, or even prehensile feet, hair, or a tail.

NUMBER OF EXTRA LIMBS
Rank 1 in this effect grants you one extra limb, with each additional rank doubling your maximum number of extra limbs: 2, 4, and 8. At 5 or more ranks, you could have any number of extra limbs that suits your descriptors, but the benefits of the effect are capped at +5. You can choose to have fewer Extra Limbs than your effect rank provides, if you wish. The game benefits remain the same.

EXTRA LIMBS AND GRABBING
Extra Limbs do not allow you to take additional actions on your turn, but they do provide the benefits of the Improved Grab advantage, grabbing with some of your limbs and leaving others free. If you apply more than the required number of limbs to a Grab action, rather than taking the option to leave some of them free, you gain a +1 bonus to the opposed Grab check per Extra Limbs rank, up to a maximum of +5.

EXTRA LIMBS AND STABILITY
If you wish, some or all of your Extra Limbs can be allocated to stability, acting as extra legs or support limbs, chosen when you configure this effect. In this case, you gain a +1 bonus per Extra Limbs rank so allocated to checks to resist being tripped and checks dealing with unstable movement along a solid surface up to a maximum of +5. See Trip in Chapter 8 and Unstable Movement in Chapter 3 for more.

EXTRAS
* CONTINUOUS: Continuous Extra Limbs is an effect you can turn on or off at will, without requiring maintenance. +1 point per rank.
* PROJECTION: Your Extra Limbs are a projection of your power rather than an extension of your body. Harm directed solely against your Extra Limbs has no effect on you. +1 point per rank.
* SUSTAINED: Sustained Extra Limbs can be turned on or off, but disappear or stop working if you are unable to maintain the effect with a Sustain action each turn. +0 points per rank.
* VARIABLE: You can decide whether your Extra Limbs ranks are allocated to Grabbing or Stability as a free action at the start of each of your turns. +1 point flat.

FLAWS
* DISTRACTING: Coordinating the action of your Extra Limbs is difficult, so you are Vulnerable while applying your Extra Limbs to an action. -1 point per rank.`,
    shortDesc: "Gain additional manipulative limbs such as arms, tentacles, or prehensile appendages."
  },
  {
    name: "Feature",
    type: "General",
    action: "None",
    range: "Personal",
    duration: "Permanent",
    baseCost: 1,
    costType: "per_rank",
    fullText: `You have one or more minor useful Features, effects granting you an occasionally useful ability. This is essentially an effect version of the Benefit advantage, but a power rather than a virtue of skill, talent, or social background. For example, Diplomatic Immunity or Wealth are Benefits. Fur, the ability to mimic sounds, or a hidden compartment in your hollow leg are all Features.

It is up to the Game Master what capabilities qualify as Features. Generally, if something has no real game effect, it is considered a descriptor. See Descriptors earlier in this chapter. If it has an actual game benefit, it may be a Feature. There's no need to define every possible Feature a character may have down to the last detail: If nothing else, very rarely used or encountered Features may be considered Power Stunts, temporarily acquired through Extra Effort or Hero Points. See Extra Effort and Hero Points in The Basics chapter. Typically a Feature requires 1 rank of this effect, but the GM may decide some especially useful Features require or allow for more than 1 rank.

EXTRAS
* SUSTAINED: Some Features may be Sustained Duration rather than Permanent. +0 per rank.`,
    shortDesc: "Grants minor, specific benefits or useful abilities."
  },
  {
    name: "Flight",
    type: "Movement",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    baseCost: 2,
    costType: "per_rank",
    fullText: `You can move through the air, including hovering in place. While this effect is active you have a flight speed rank equal to your effect rank. You can lift and carry the normal mass for your Strength while flying. Flight ranks of 10 or less are sub-sonic, while Flight 11 breaks the sound barrier. Flight 20 can reach anywhere on Earth within a couple of minutes (time rank 4 or less). For faster-than-light flight speeds in space, see the Space Travel effect of Enhanced Movement.

PUSHING WITH FLIGHT
In appropriate circumstances, a character can use the propulsion of their Flight effect to push against an object. In such instances, the character can divide their Flight ranks between effective Strength to push the object and ranks devoted to movement speed. Using their full Flight ranks to push means the character moves at speed rank 0. Characters do not get the usual +2 ranks to pushing and dragging as they do with Strength: they only push a mass rank equal to their allocated Flight rank.

EXTRAS
* CONTINUOUS: Continuous Flight operates without needing to maintain it. When not actively moving, you remain hovering in the air. +1 point per rank.
* SAFE LANDING: If you are unable to maintain your Flight, you float safely to the ground whenever the effect ends. +1 point flat.
* SUBTLE: Reduces and eliminates traces, contrails, or noise from Flight. +1 or +2 points flat.

FLAWS
* CONCENTRATION: Your Flight requires a Concentrate action each turn to maintain. -1 point per rank.
* DISTRACTING: You are Vulnerable while flying. -1 point per rank.
* GLIDING: You can only gain altitude occasionally by catching thermal updrafts or winds. -1 point per rank.
* LEVITATION: You can only move vertically, straight up and down. -1 point per rank.
* PLATFORM: Your effect is reliant on some type of platform you stand or sit on. -1 point per rank.
* RESTRAINABLE: If you are Immobile, you cannot maintain your Flight effect. -1 point per rank.
* ROCKET: You can only fly in a straight line from point to point. -1 point per rank.`,
    shortDesc: "Move through the air at a speed rank equal to your Flight rank."
  },
  {
    name: "Fortune Control",
    type: "Control",
    action: "None",
    range: "Perception",
    duration: "Instant",
    baseCost: 3,
    costType: "per_rank",
    fullText: `You can use Hero Points and heroic advantages to affect others in various ways. See The Basics and Advantages chapters for details. For each rank you have in Fortune Control, choose one of the following things you can do:
* You can spend a Hero Point or use a heroic advantage on behalf of another character in range, granting them its benefits instead of yourself.
* You can give a Hero Point or use of a heroic advantage to another character in range. You can do this once for any given character in a round, and the recipient can use the bestowed Hero Point or advantage normally.
* You can spend one of your Hero Points, a heroic advantage, or uses of Fortune Control to negate someone else's use of a Hero Point or heroic advantage within range. A heroic advantage can only counter itself, while Hero Points or uses of Fortune Control can counter all three.
* You can spend one of your Hero Points or uses of Fortune Control to avoid a complication, in which case no Hero Points are awarded for it.
* You can spend one of your Hero Points or uses of Fortune Control to force another character to re-roll a die roll and take the worse of the two rolls. This can happen after the die has been rolled but before the result has been announced. The target of this last effect may spend a Hero Point or a use of the Luck advantage to avoid having to re-roll.

Fortune Control is a non-action, so you can use its effects even when it is not your turn during a round, within the restrictions for a given effect. So, for example, you can spend as many Hero Points as you have on behalf of other characters within range during a round. NPC uses of Fortune Control are considered plot complications for the player characters, awarding the players Hero Points. See Plot Complications in Chapter 2 for details.

EXTRAS
* ADDITIONAL USE: Each rank gives you an additional use of Fortune Control. +1 point flat per Additional Use.
* ENHANCED ADVANTAGES: You can acquire fortune and heroic advantages from the Advantages chapter as Enhanced Traits. +1 point flat per advantage.

FLAWS
* ACTION: If the action required for Fortune Control is increased, it is only usable during your turn each round unless you Ready an action. -1 point per rank for free action, -2 points per rank for standard action or reaction.
* ATTACK CHECK: Your Fortune Control requires a ranged attack check against your target's Defense. -1 point per rank.
* RESISTIBLE: Targets of your Fortune Control get a resistance check (usually Dodge or Will). -1 point per rank.
* SIDE EFFECT: Suffer a complication on failure or always. -1 or -2 points per rank.`,
    shortDesc: "Manipulate luck by granting rerolls or forcing rerolls for others."
  },
  {
    name: "Growth",
    type: "Alteration",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    baseCost: 1,
    costType: "per_rank",
    fullText: `You temporarily increase your size category, gaining all of the modifiers of that size. See Size under Capabilities in the Abilities chapter. Each rank in Growth increases your size category and rank by 1, to a maximum of Awesome size (rank 5). The Game Master may permit higher ranks of Growth in some settings or under some circumstances, but such ranks involve truly gigantic characters!

ADDED GROWTH EFFECTS
In addition to the normal modifiers for increased size, you can take other effects and make them Linked to your Growth, including:
* Enhanced Strength, Stamina, Fortitude, or Toughness, and possibly other abilities.
* Toughness modifiers like Hardened, Impervious, or Impenetrable.
* Immunity or Resistance.
* Enhanced Advantages, particularly combat advantages, associated with your increased size.
* Features like Massive to reflect the character's greater mass and weight.
Added effects should be approved by the Game Master and are limited by Power Level. They should fit the requirements of the Linked extra: having the same Action and Duration as your Growth effect, allowing you to activate and use them simultaneously when you grow, but also meaning you lose the use of them when not using your Growth effect.

EXTRAS
* GROWTH MOMENTUM: If you increase in size on your turn and also make a damaging close attack against a target with a size larger than your initial size rank, your target has a penalty on their Damage resistance check equal to the number of size ranks you grow (up to 5). +1 point flat.
* PERMANENT: If you are permanently a larger size than Medium, simply change your size category at no cost. +0 per rank.`,
    shortDesc: "Increase your size category and gain associated physical bonuses."
  },
  {
    name: "Healing",
    type: "General",
    action: "Standard",
    range: "Close",
    duration: "Instant",
    check: "Effect vs. DC 10",
    baseCost: 2,
    costType: "per_rank",
    fullText: `You can heal Damage conditions by touching a voluntary or Incapacitated subject and taking a standard action to make a DC 10 Healing check. Both you and your subject are Vulnerable while healing or being healed, until the start of each character's next turn.

REMOVING DAMAGE CONDITIONS
Each degree of success on the Healing check removes one Damage condition, starting with the subject's least severe condition, and working towards the most severe: Hits, Dazed, Stunned, Staggered, and Incapacitated. If the subject is Dying, the first degree of success stabilizes the subject, removing the Dying condition. So if a subject has three Hits and is Staggered and Incapacitated, it requires five total degrees of success (DC 30) to eliminate all of the conditions, starting with the Hits, then Staggered, then finally Incapacitated. It is often easier for a healer to wait until the subject recovers on their own from lesser conditions before trying to heal more severe ones.

ADDED RESISTANCE
You can use one degree of success to grant a subject a bonus equal to your Healing rank on their next resistance check against ongoing effects with disease or poison descriptors.

HEALING LIMITS
You can make one Healing check per subject per scene. Additional uses on the same subject in that scene require Extra Effort. You can use Healing on yourself, provided you are still capable of taking the necessary Action. Healing does not work on subjects unable to recover on their own, such as those with no Stamina rank, unless you have the Repair modifier.

EXTRAS
* AREA EFFECT: Grants your Healing benefits to all subjects within the Area. +1 point per rank.
* ENERGIZING: Remove Fatigued and Exhausted conditions. +1 point per rank.
* PERCEPTION RANGE: Work at a distance on any character you can accurately perceive. +2 points per rank.
* PERSISTENT: Remove Damage conditions caused by Incurable effects. +1 point flat.
* RANGED: Work on characters at normal range with distance penalties. +1 point per rank.
* REPAIR: Remove Damage conditions from objects. +1 point per rank (+0 if Repair Only).
* RESURRECTION: Restore life to the dead using Extra Effort. +1 point per rank.
* SELECTIVE: Choose who in the area benefits. +1 point per rank.

FLAWS
* EMPATHIC: Take on the Damage conditions you remove and recover yourself. -1 point per rank.
* LIMITED: Limited in effect (One Type of Damage, Others Only, or Self Only). -1 point per rank.
* TEMPORARY: Healing benefits are temporary, lasting for one hour before subject regains conditions. -1 point per rank.`,
    shortDesc: "Remove Damage conditions from a touched subject using a DC 10 Healing check."
  },
  {
    name: "Illusion",
    type: "Sensory",
    action: "Standard",
    range: "Ranged",
    duration: "Concentration",
    baseCost: 1,
    costType: "per_rank",
    fullText: `You can generate realistic sensory impressions that aren't real. Your illusions have no effect on the real world: You can't walk on an illusion of a bridge, or eat a brick with the illusionary smell and taste of food, and so forth, but illusions may fool the people experiencing them into reacting as if they were real.

ILLUSION COST AND SCOPE
For 1 point per effect rank, you can create an illusion affecting one sense type. Each additional sense type increases cost per rank by +1 up to 5 points per rank, which can affect all sense types. Sight illusions count as two sense types, requiring a minimum of 2 points per rank in cost.

ILLUSION SIZE
Your illusions can fill an area with a maximum total size rank equal to your Illusion rank. See Size in Chapter 3 for details.

RECOGNIZING ILLUSIONS
People experiencing your Illusions can recognize they are not real with a successful Insight or Perception check against your effect DC but only if they interact with the illusion directly or otherwise have some reason to believe it might be fake. A failed check means the character does not notice anything amiss, so the GM may wish to make the check in secret. A character faced with clear proof an illusion isn't real does not need a check to recognize it as such. Senses with the Counters Illusion Enhanced Senses effect automatically recognize illusions as such. If a character who has recognized an illusion communicates that to others, they gain a +5 bonus on their checks to recognize the illusion. Anyone who has recognized an illusion knows it is not real and can still perceive the illusion, but it is translucent, ephemeral, and clearly unreal to their senses, no longer providing concealment or any other effects.

MAINTAINING ILLUSIONS
Maintaining an active illusion, such as that of a moving and fighting creature, requires a Concentrate action, but maintaining a static illusion that doesn't move or interact is only a Sustain action. Extras can change these requirements.

EXTRAS
* ACTIVE: Maintained with a simple Sustain action. +1 point per rank.
* CONTINUOUS: Requires no maintenance and lasts until ended or countered. +2 points per rank.
* SELECTIVE: Choose who perceives your Illusion and who does not. +1 point per rank.

FLAWS
* FEEDBACK: Physical attack on illusion causes feedback Stun effect on you. -1 point per rank.
* LIMITED TO MINDS: Only subjects with mental ability ranks perceive illusions (machines don't). -1 point per rank.
* LIMITED TO ONE SUBJECT: Only a single subject at a time can perceive your illusions. -1 point per rank.
* RESISTIBLE: Observers get a resistance check upon first encountering illusions. -1 point per rank.

* * *
ILLUSION VS. HALLUCINATION
The Illusion effect creates actual sensory images whereas effects imposing the Hallucinating condition create increasingly effective hallucinations within the subject's own mind. Illusions are detectable by everyone who perceives them, including machines, by default, whereas Hallucination affects only specific subjects. Illusion has rank-based limits on its size and area while Hallucination is limited by its degree of success against the subject. The player and GM should decide which effect best suits a given power concept in the game, particularly with the application of the appropriate modifiers to fine-tune it.`,
    shortDesc: "Create false sensory impressions affecting chosen senses."
  },
  {
    name: "Immunity",
    type: "Defense",
    action: "None",
    range: "Personal",
    duration: "Permanent",
    baseCost: 1,
    costType: "flat",
    fullText: `You are immune to certain effects or descriptors, and do not need to make resistance checks against them, they simply do not affect you. Immunity to different things requires multiple ranks, with more extensive Immunity also requiring more ranks. You assign ranks of Immunity separately when you configure the effect, and they can't normally be changed later. So three rank 1 Immunities plus a rank 5 Immunity is a total of 8 ranks of the effect. The GM adjudicates how common a given effect or descriptor is in terms of Immunity, based on the guidelines given here.

IMMUNITY EXAMPLES
Examples of Immunity include the following:
* 1 Rank: A specific Environmental Hazard including Aging, Cold, Deprivation (starvation and thirst), Disease, Heat, Poison, Pressure, Radiation, Sleep, Suffocation of one type (such as breathing underwater or in a non-oxygen atmosphere), or Vacuum. See Environmental Hazards in Chapter 8. A very rare descriptor, such as your own powers or another specific character's powers.
* 2 Ranks: Critical Hits or a rare descriptor, such as Chemical, Fear, Gravitic, or Holy, all Suffocation effects (no need to breathe at all).
* 5 Ranks: An uncommon descriptor, including a specific Affliction descriptor like Dazzle effects, Emotion effects, Entrapment effects (grabs, snares, or bonds), or Fatigue effects, Interaction skills, or a particular Damage descriptor such as Ballistic, Cold, Electricity, Falling, Fire, Magic, Radiation, Sonic, and so forth.
* 10 Ranks: A common descriptor, such as Ballistic Damage or all effects with Cold, Electricity, Fire, Radiation, or Weather descriptors, for example, or all Environments, including all of the rank 1 Environmental Hazards. Environmental Immunity is sometimes referred to as "Life Support".
* 20 Ranks: A very common Descriptor like Bludgeoning, Energy, Piercing, or Slashing Damage, for examples.
* 30 Ranks: All effects resisted by Fortitude or all effects resisted by Will.

EXTRAS
* AFFECTS OTHERS: Grant the benefits of your Immunity to others by touch. +1 point per rank (+0 if Affects Others Only).
* AREA EFFECT: Grant Immunity benefits to everyone in an area. +1 point per rank.
* SUSTAINED: Sustained Duration Immunity for force fields or protective abilities. +0 points per rank.
* RANGED: Grant Immunity benefits at a distance. +1 point per rank.
* REDIRECT: Direct immune attacks at a new target using a reaction, sustained action, or continuous duration. +1 flat, +1/rank, or +2/rank.

FLAWS
* CONCENTRATION: Concentration duration. -1 point per rank.
* RESISTANCE: Halve effect rank before resistance check instead of complete immunity. -1 point per rank.

* * *
UNDER THE HOOD: DEGREES OF IMMUNITY
Some Immunity effects are a matter of degree. For example, "Cold Immunity" can range from cold hazards described under Environmental Hazards in Chapter 8 to cold Damage, to complete immunity to all cold effects. The first requires only 1 rank, and provides no immunity to other sorts of cold effects. The second requires 5 ranks and only provides immunity to cold Damage effects. The third requires 10 ranks and provides complete immunity to all effects with the "cold" descriptor, whatever they may be.

The Game Master sets the commonality of effect descriptors for Immunity based on the setting and chooses the degrees (and ranks) of Immunity available to player characters. Note that all of the instances of rank 20 Damage Immunity add up to a total of 80 ranks and effective Immunity to All Damage, an option the GM should be very cautious about allowing for player characters!`,
    shortDesc: "Become immune to specific descriptors, conditions, or defense checks."
  },
  {
    name: "Insubstantial",
    type: "Alteration",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    baseCost: 10,
    costType: "per_rank",
    fullText: `You can assume a progressively less solid form. You do not gain the ability to assume lower-ranked Insubstantial forms at higher ranks, but you can acquire a lower-ranked form of Insubstantial as an alternate effect of a higher-ranked one. You can switch between normal and Insubstantial form as a free action once per round. The default is that substantial is your "normal" form, but the GM may permit you to make Insubstantial your "normal" form, in which case remaining solid is a Sustained Duration for you.

Insubstantial offers four ranks of effect:
RANK 1: FLUID
You become a fluid, able to flow through any sort of opening, under or around doors, through keyholes and pipes, and so forth. You cannot pass through watertight seals. You can automatically flow out of any restraint—such as a snare or grab—that is not watertight. So you cannot flow out of a container completely enclosing you, for example, but anything less cannot hold you. You can exert your normal Strength and can still push or carry objects, although your Agility to manipulate things may be limited in fluid form at the GM's discretion. A fluid character can catch a falling person or object, cushioning the fall. This requires a simple action or reaction, sufficient movement speed to reach the subject, and a DC 10 Agility check, possibly higher at the GM's discretion. Success reduces the falling or crash Damage rank by the higher of the cushioning character's Strength or Toughness ranks, representing flexibility in this case. Both characters must make resistance checks against the remaining Damage rank.

RANK 2: GASEOUS
You become a cloud of gas or fine particles. You have no effective Strength in gaseous form, but have Immunity to Direct Physical Damage. Energy and Area Attacks still affect you normally and you can be pushed by winds or pressure or enclosed in an airtight container. You can move through any opening that is not airtight. You can use your various other effects normally.

RANK 3: ENERGY
You become a field of coherent energy. You have no effective Strength, but have Immunity to Physical Damage. Energy attacks damage you normally, except for the energy making up your form, to which you also have Immunity. You can pass through solid objects permeable to your type of energy, but energy resistant barriers, like heavy shielding or force fields, block your movement.

RANK 4: INCORPOREAL
You become an incorporeal phantom. You can pass through solid matter at your normal speed and you have Immunity to Physical and Energy Attacks. Sensory effects and those targeting Will still work on you, as do effects with the Affects Insubstantial modifier. Choose one other reasonably common effect or descriptor that works on you while you are incorporeal. You have no effective Strength and cannot affect the physical world, except by using effects with the Affects Corporeal modifier. Your sensory effects work normally. Unless you have Immunity to Suffocation, you must hold your breath while passing through a solid object, and you can suffocate. If you revert to solid form while inside a solid object, you suffer damage equal to the object's Toughness, resisted by your Fortitude. If not Incapacitated by the damage, you're immediately ejected from the object into the nearest open space. If you are Incapacitated, you're trapped inside the object and your condition worsens to Dying on the following round, making it difficult for aid to reach you.

INSUBSTANTIAL DESCRIPTORS
Note that the fluid, gaseous, etc., rank names are essentially descriptors for the different Insubstantial effects. A character with Insubstantial 1 might be a stretchable, doughy or rubbery form rather than a liquid, for example, while one with Insubstantial 2 could transform into a swarm of insects or nanobots or a cloud of dust, rather than a gas or a mist.

INSUBSTANTIAL MOVEMENT
The Insubstantial effect itself offers no special forms of movement other than the ability to pass through certain barriers. Insubstantial characters otherwise move at their normal speed along surfaces, or through spaces they are able to pass through. Characters with Insubstantial effects often also have different movement effects, possibly Limited to While Insubstantial.

EXTRAS
* AFFECTS CORPOREAL: An incorporeal being can use an effect with this extra on the corporeal world. +1 point per rank.
* AFFECTS OTHERS: Extend your Insubstantial effect to another willing character by touch. +0 or +1 point per rank.
* CONTINUOUS: Remain Insubstantial until you choose to return to your corporeal form as a free action. +1 point per rank.
* LINKED: Link Immunity and movement effects to Insubstantial. +0 points per rank.
* NORMALLY INSUBSTANTIAL: Normally insubstantial; staying solid requires maintenance. +0 points per rank.
* PERMANENT: Permanently Insubstantial. +0 points per rank.
* PRECISE: Selectively make portions of your body substantial as a free action. +1 point flat.
* REACTION: Turn Insubstantial using a reaction. +1 point flat.
* SUBTLE: Make Insubstantial effect less noticeable or completely unnoticeable. +1 or 2 points flat.

FLAWS
* LIMITED TO WHILE INSUBSTANTIAL: Applied to other effects usable only while Insubstantial. -1 point per rank.
* NO STRENGTH: Removes effective Strength for rank 1 Fluid. -5 points flat.
* PERMANENT: Always Insubstantial and cannot assume solid form. +0 points per rank.`,
    shortDesc: "Assume a less solid form: Fluid, Gaseous, Energy, or Incorporeal."
  },
  {
    name: "Leaping",
    type: "Movement",
    action: "Free",
    range: "Personal",
    duration: "Instant",
    baseCost: 1,
    costType: "per_rank",
    fullText: `You can make prodigious leaps, far more than even a skilled athlete. Your Leaping rank is the distance rank you cross in a single standing jump. You do not suffer any falling damage from landing after a jump, including straight down, so long as it is within your maximum Leaping distance.

If you can leap further than your ground speed rank, you can travel faster by leaping, as if you had the Speed effect. The maximum speed you can achieve through Leaping is rank 10. If your leap distance would take you farther than this, use the formula of (distance rank - Leaping rank = time rank) to determine how long you spend in the air with each leap.

FLAWS
* ACROBATICS CHECK REQUIRED: Make a DC 10 Acrobatics skill check; each point over DC allows 1 rank of Leaping. -1 point per rank.
* FULL POWER: Leap only maximum distance; shorter leaps unavailable. -1 point flat.`,
    shortDesc: "Leap vast distances based on your Leaping rank."
  },
  {
    name: "Lifting",
    type: "General",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    baseCost: 1,
    costType: "per_rank",
    fullText: `Your lifting ability is improved. Each rank of Lifting increases your effective Strength by +1 rank for purposes of lifting, carrying, and throwing objects. See Lifting, Carrying & Throwing in the Abilities chapter for details.

EXTRAS
* STILL STRENGTH: Exert Lifting on something simply by touching it without moving (tactile telekinesis). +1 point flat.`,
    shortDesc: "Increase lifting capacity without increasing Damage."
  },
  {
    name: "Mind Reading",
    type: "Sensory",
    action: "Standard",
    range: "Perception",
    duration: "Sustained",
    check: "Effect vs. Will",
    resistance: "Will vs. Effect",
    baseCost: 2,
    costType: "per_rank",
    fullText: `You can read another character's mind. To use Mind Reading, make an opposed effect check against the result of the target's Will check result. The degree of success determines the degree of contact:
* 1 Degree (Surface thoughts): You can read what the target is presently thinking. Mind Reading transcends language; you comprehend the target's thoughts whether or not you share a common language.
* 2 Degrees (Personal thoughts): You can probe deeper into the target's mind for information. You can essentially ask any one question and receive the answer from the target's mind. If the target doesn't know the answer, then you know that as well.
* 3 Degrees (Memory): You can read the subject's memories and recollections. This allows you to perceive them exactly as the target recalls them, one memory per round.
* 4 Degrees (Subconscious): You can read memories from the target's subconscious, things even the target does not consciously know. This might mean repressed or hidden memories, deep-seated psychological traumas, or even other personalities.

If you lose the opposed check, you cannot read the target's mind. With two or more degrees of failure, any renewed attempt in that scene requires Extra Effort. If you desire a greater degree of contact, you must take another standard action and make a new opposed check. The target gets a new Will check against your effect DC at the end of each of their turns to shut you out; success ends the effect.

READING AND DECEPTION
If you can interact with your subject, a successful Deception check against the target's Deception or Insight check causes the subject to consciously think about a particular piece of information you're looking for, such as a password or name, allowing you to pluck it from the subject's mind with surface thoughts level contact.

EXTRAS
* CUMULATIVE: Adds further degrees of success to existing degree on target. +1 point per rank.
* EFFORTLESS: Retrying after two or more degrees of failure does not require Extra Effort. +1 point per rank.
* SENSORY LINK: Tap into the senses of subjects like Remote Sensing. +1 point per rank.
* SUBTLE: Make Mind Reading harder to detect or completely undetectable. +1 or 2 points flat.

FLAWS
* CLOSE: Requires a close attack check and physical contact throughout Duration. -2 points per rank.
* FEEDBACK: Suffer Feedback if a subject is harmed or from traumatic thoughts. -1 point per rank.
* LIMITED BY LANGUAGE: Require a shared common language. -1 point per rank.
* LIMITED TO EMOTIONS: Read or probe only for emotions. -1 point per rank.
* LIMITED TO SENSORY LINK: Tap into senses only, no thoughts/memories. -1 point per rank.
* LIMITED TO SURFACE: Surface thoughts only. -1 point per rank.
* SENSE-DEPENDENT: Dependent on an additional sense (sight, hearing, smell). -1 point per rank.`,
    shortDesc: "Read the thoughts of a subject within perception range."
  },
  {
    name: "Morph",
    type: "Alteration",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    baseCost: 5,
    costType: "per_rank",
    fullText: `You can alter your appearance. Your traits do not change, merely your appearance. You gain a +20 bonus to Deception checks to disguise yourself as the form you assume.

Your Morph rank determines what form(s) you can assume:
* Rank 1: A single other appearance, so you have two forms you can switch between as a free action.
* Rank 2: A narrow group of forms, such as people of roughly your size, or a particular type of animal like birds or reptiles, and so forth.
* Rank 3: Any of a broad group of forms like humanoids, animals, machines, and so forth.
* Rank 4: Any form of roughly the same mass as your own.

For the ability to change size as well as appearance see the Growth and Shrinking effects. To take on the traits of forms you assume, see the Metamorph extra or the Variable effect.

EXTRAS
* METAMORPH: Acquire complete alternate character traits/forms per rank. +1 point flat per rank.

FLAWS
* RESISTIBLE: Will resistance check lets observers see through disguise or retain normal traits. -1 point per rank.`,
    shortDesc: "Change your physical appearance without altering traits."
  },
  {
    name: "Move Object",
    type: "Control",
    action: "Standard",
    range: "Ranged",
    duration: "Sustained",
    check: "Attack vs. Defense",
    resistance: "Strength vs. Effect",
    baseCost: 2,
    costType: "per_rank",
    fullText: `This effect lets you lift and move objects at a distance without touching them, whether using telekinesis or something like a tractor beam, or control over air, gravity, or magnetism.

This effect can move objects, but cannot perform tasks of fine manipulation like tying or untying knots, typing, or manipulating controls without the Precise extra and cannot directly inflict damage without the Damaging extra, although the objects it moves may do so. Move Object's effective Strength rank for lifting and moving objects is equal to your effect rank. When lifting, but not throwing, you may take a Concentrate action to increase your effective Strength rank for lifting with Move Object by +1 for 1 round.

GRABBING AND MOVING OBJECTS
Move Object requires a Grab action against a target as part of the action to use it. This can be a routine check against inanimate objects and Defenseless targets. See Grab under Actions in the Action and Adventure chapter. Grab attempts with Move Object are limited by the mass rank you can move, rather than size, and effectively have the benefits of the Agile Grab advantage: You're not Vulnerable while grabbing with Move Object. If the Grab action is successful, you can move the object as part of that same standard action, up to a distance rank of your Move Object rank minus the object's mass rank within your effect's range. You can also throw or wield a successfully grabbed target as detailed under Grab in the Action and Adventure chapter. Move Object is not considered "physical contact" or "touch" for other effects requiring it and you cannot move yourself with it, for that see the Flight effect. There is no action-reaction through your Move Object effect: You can grab something and make it Immobile, but you cannot, for example, grab a moving object and be pulled along by it.

MOVE OBJECT AND ATTACKS
Move Object cannot inflict Damage directly; you can't "punch" or "crush" objects with it without the Damaging extra. You can use it for actions like Disarm, Grab, and Trip. See the Action and Adventure chapter for their descriptions. Disarm and Trip actions using Move Object require a ranged attack check and you use your Move Object rank in place of your Strength rank. Objects thrown or slammed into targets as attacks base their damage off your power rank as if it were your Strength rank.

AREA MOVE OBJECT
Move Object with the Area Effect extra can work on all of the objects in the area. The effect is either targeted at a specific character or object, requiring a normal ranged attack check, or at a point in space that is DC 10. Targets in the area are each considered separately for the Move Object effect's rank: So a rank 5 Area Move Object can move any object in the area with a mass rank of 5 or less, and the distance it can move each object is determined by its individual mass rank. The effect user has to move all of the affected objects in the same way unless the effect has the Selective extra, in which case the user can choose to affect some objects and not others in the area. Targets in a Move Object Area Effect roll a Dodge resistance check as usual against the effect DC, gaining resistance to the effect if they succeed. A target directly targeted with an attack check does not make a Dodge resistance check, but the effect can only target one subject in this way.

EXTRAS
* DAMAGING: Directly inflict Damage equal to effect rank with a ranged attack check. +1 point per rank.
* PERCEPTION: Perception Range Move Object can affect any object you can accurately perceive without an attack check. +1 point per rank.
* PRECISE: Fine manipulation tasks. +1 point flat.
* SUBTLE: Less noticeable manifestation. +1 or +2 points flat.

FLAWS
* CLOSE RANGE: Originates at you and extends outward to fill space. -1 point per rank.
* CONCENTRATION: Requires a Concentrate action each turn. -1 point per rank.
* LIMITED DIRECTION: Move objects only in a particular path or direction. -1 point per rank.
* LIMITED MATERIAL: Control only specific types of objects or materials. -1 point per rank.`,
    shortDesc: "Telekinetically lift and move objects at a distance."
  },
  {
    name: "Nullify",
    type: "Control",
    action: "Standard",
    range: "Ranged",
    duration: "Instant",
    check: "Attack vs. Defense",
    resistance: "Effect vs. Will or Rank",
    baseCost: 1,
    costType: "per_rank",
    fullText: `The Nullify effect can counter other effects of a particular descriptor. See Descriptors and Countering Effects at the start of this chapter. You can counter one effect of your chosen descriptor per use of Nullify, unless you have the Simultaneous extra.

USING NULLIFY
Make a ranged attack check against the target's Defense Class, DC 10 if you are targeting an immobile area. If successful, make an opposed check of your Nullify rank and the targeted effect rank or the target's Will resistance, whichever is greater. Use Will resistance if the targeted effect has no rank. If you are targeting the subject of an effect rather than the user, make an opposed check of Nullify rank vs. effect rank. If you win, the targeted effect turns off, although the user can re-activate it normally. If you lose the opposed check, you do not Nullify the effect. With two or more degrees of failure, trying to Nullify the effect again in the same scene requires Extra Effort for a renewed attempt.

You can take a Ready action to prepare a use of Nullify to counter a use of an effect during action time. See Countering Effects at the start of this chapter.

EXTRAS
* AFFECTS INSUBSTANTIAL: Affect insubstantial targets and effects directly. +0 points.
* ALTERNATE RESISTANCE: Require Fortitude instead of Will check. +0 points per rank.
* AREA EFFECT: Works on all targets in the area. +1 point per rank.
* BROAD: Counter broad descriptors (magical, mutant, technological). +1 point per rank.
* CONCENTRATION: Suppress countered effects while concentrating. +1 point per rank.
* CONTINUOUS: Suppress countered effects until ended as a free action. +3 points per rank.
* SIMULTANEOUS: Counter all effects of a descriptor at once. +1 point per rank.
* EFFORTLESS: Retrying after failure does not require Extra Effort. +1 point per rank.
* IMPOSE FLAW: Targeted effects gain a flaw instead of being countered.
* PRECISE: Choose which effects are affected during simultaneous nullification. +1 point flat.
* REACTION: Use reaction to nullify without readied action. +1 point flat.
* SELECTIVE: Choose who in an area is affected. +1 point per rank.
* SUSTAINED: Suppress countered effects while sustaining. +2 points per rank.

FLAWS
* CLOSE RANGE: Require touch and close attack check. -1 point per rank.`,
    shortDesc: "Cancel or counter effects of a chosen descriptor."
  },
  {
    name: "Obscure",
    type: "Sensory",
    action: "Standard",
    range: "Ranged",
    duration: "Sustained",
    baseCost: 1,
    costType: "per_rank",
    fullText: `You can block one or more senses in an area, creating Full Concealment from that sense. See Concealment in Chapter 8. One sense costs 1 point per rank, an entire sense type costs 2 points per rank. Sight senses cost double: 2 points per rank for one sight sense, 4 points per rank for all sight senses. You can create concealment against touch senses, preventing others from perceiving anything using them, but they still notice physical surfaces and objects by their inability to move through them.

OBSCURE AREA
Choose an Area Effect shape when you configure your Obscure. See Area Effect under Extras later in this chapter. You have 1 rank in that Area per rank in this effect: So a Sphere Area Obscure with 10 ranks has a distance rank 10 diameter. Obscure effects with different shapes can be acquired as Alternate Effects.

OBSCURE TARGETING
An Obscure effect can be centered on you or any point within your range. It does not move once created, although you can reposition an existing Obscure effect as a simple action on your turn. Characters perceiving within or through the obscured area experience the effects of Full Concealment for the affected senses.

EXTRAS
* CONTINUOUS: Lasts without maintenance until countered or dismissed. +1 point per rank.
* INDEPENDENT: Instant duration that fades away on its own. +0 points per rank.
* SELECTIVE: Choose who is and isn't affected. +1 point per rank.

FLAWS
* CLOSE RANGE: Centered on you. -1 point per rank.`,
    shortDesc: "Block a chosen sense type in an area, creating Full Concealment."
  },
  {
    name: "Postcognition",
    type: "Sensory",
    action: "Standard",
    range: "Personal",
    duration: "Concentration",
    baseCost: 1,
    costType: "per_rank",
    fullText: `You have a limited ability to gain glimpses or visions of events that happened in a place in the past. You gain one use of Postcognition per rank in the effect per adventure.

You can spend a use of your Postcognition to "replay" events at your location, as if you were present at that time, specifying a time when you want the playback to begin. You are Unaware of your normal senses while using Postcognition, immersed in the vision of the past. It plays out in real time and you can move around and perceive with all of your sensory abilities, but you cannot physically interact or affect anything that happened. The vision lasts as long as you Concentrate to maintain the effect, although you cannot view more than a scene of time per use.

Generally, the Game Master should treat a use of Postcognition like the Guidance advantage based on looking into the past. As with Guidance, the GM decides exactly how much you learn, although you can ask for a specific benefit or insight, and the effect should be beneficial to you to be worth a use of your effect.

POSTCOGNITION LIMITS
You can only perceive past events in your immediate surroundings. If you want to review the past of a place, you have to physically go there. You also have to specify how far back you go: If you don't know the time you're looking for, that makes it more difficult to find. Ranks in Postcognition count as ranks in the Guidance advantage, meaning they count towards your limit in heroic advantage ranks, as given in the Advantages chapter. Even with these limits, Postcognition can easily solve certain mysteries by simply looking at past events, so the Game Master may choose to limit or even prohibit this effect in their game, if it's likely to spoil too many adventures.`,
    shortDesc: "See past events that occurred in your current location."
  },
  {
    name: "Precognition",
    type: "Sensory",
    action: "None",
    range: "Personal",
    duration: "Permanent",
    baseCost: 1,
    costType: "per_rank",
    fullText: `You have a limited ability to get glimpses or visions of the future. You gain one use of Precognition per rank in the effect per adventure. You can use this effect in two ways:

PRECOGNITIVE GUIDANCE
You can spend a use of your Precognition to gain the benefits of the Guidance advantage based on receiving a glimpse of the future. As with Guidance, the GM decides exactly what you learn, although you can ask for a specific benefit or insight, and the effect should be beneficial to you to be worth a use of your effect.

PRECOGNITIVE WARNING
You can spend a use of your Precognition to move a scene back to an earlier point in the game. Everything that happened after that point becomes a precognitive warning you experienced, rather than actual events that played out, and effectively never happened. Game play resumes from the earlier point, but you are the only one aware of the events from your vision, unless you share the information with others.

The Game Master may also choose to use your Precognition to give you hints, visions, or other guidance as part of the game's narrative, just like any other Enhanced Sense, but not costing you any uses of the effect. Ranks in Precognition count as ranks in the Guidance advantage, meaning they count towards your limit in heroic advantage ranks, as given in the Advantages chapter.`,
    shortDesc: "Gain glimpses or visions of possible future events."
  },
  {
    name: "Protection",
    type: "Defense",
    action: "None",
    range: "Personal",
    duration: "Permanent",
    baseCost: 1,
    costType: "per_rank",
    fullText: `Protection helps you resist Damage, providing +1 to Toughness resistance per rank. Your total Toughness is limited by Power Level.

EXTRAS
* SUSTAINED: Sustained Duration requiring activation (force fields, armor). +0 points per rank.

FLAWS
* FADES: Ablative Protection reduced by 1 each time resistance check is made. -1 point per rank.
* LIMITED: Limited to specific Damage descriptors (Physical, Energy). -1 point per rank.
* NOTICEABLE: Noticeable physical changes (armored scales, metallic skin). -1 point flat.
* UNRELIABLE: Partial coverage allowing some attacks through. -1 point per rank.`,
    shortDesc: "Gain +1 Toughness per rank against Damage."
  },
  {
    name: "Quickness",
    type: "General",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    baseCost: 1,
    costType: "per_rank",
    fullText: `You can think and act at incredible speed, though you can't necessarily move or attack at great speeds. You can only use Quickness to speed-up tasks that have no penalty for failure on the check required, if any, or non-combat tasks you can perform as a routine check.

Subtract your Quickness rank from the time rank normally needed to perform a task to determine how long it takes you. So, for example, if you have Quickness 7, a task normally requiring an hour (time rank 9) takes you 30 seconds! If you reduce the time rank of a task to 0, you can do it during your turn in action time as a standard action, at time rank -1 as a simple action, and at time rank -2 as a free action, if the Game Master agrees, although you're still limited to a reasonable number of free actions per turn.

For moving faster, see movement effects like Flight and Speed in this chapter. For acting sooner during action time, see the Improved Initiative advantage—possibly as an Enhanced Trait—and see extras you can apply to your Strength Damage like Area Effect, Multiattack, or Split in the Extras section to attack multiple opponents at once.

FLAWS
* LIMITED TO ONE TASK: Applies to only one particular task. -2 points per rank.
* MENTAL QUICKNESS: Applies only to mental processes. -1 point per rank.
* PHYSICAL QUICKNESS: Applies only to physical labor/routine tasks. -1 point per rank.`,
    shortDesc: "Perform routine tasks much faster by reducing required time ranks."
  },
  {
    name: "Regeneration",
    type: "Defense",
    action: "None",
    range: "Personal",
    duration: "Permanent",
    baseCost: 3,
    costType: "per_rank",
    fullText: `You recover quickly from Damage conditions. With Rank 1 Regeneration, every 10 rounds, at the start of your turn, you automatically remove your least severe Damage Condition, until you have no more Damage Conditions. Each additional rank of Regeneration reduces the time interval between recoveries by 1 round, so every 9 rounds at rank 2, every 8 at rank 3, and so on.

At rank 11 Regeneration, you automatically remove your two least severe Damage Conditions at the start of your turn every round. Each additional rank of Regeneration beyond that removes an additional Damage Condition, in order of least to most severe, each round: three at rank 12, four at rank 13, and so forth.

At rank 15 Regeneration, you can recover from the Dead condition! This takes 4 minutes (time rank 5), with each additional rank of Regeneration reducing the time rank by 1 to a minimum of time rank 0 (1 round) at rank 20 Regeneration. Once you recover from being Dead, your Regeneration removes any remaining damage conditions normally. At rank 20 Regeneration, you remove all of your damage conditions, including Dead, at the start of your turn every round, essentially regenerating instantly.

REGENERATION ABSENT STAMINA
If you have no Stamina rank, 1 rank of Regeneration makes you "self-repairing" and allows you to automatically remove your least severe Damage Condition every 10 rounds.

EXTRAS
* DIEHARD: Automatically stabilize when gaining Dying condition. +1 point flat.
* PERSISTENT: Regenerate Incurable Damage conditions. +1 point flat.
* SUSTAINED: Requires Sustain action throughout recovery time. +0 points per rank.

FLAWS
* NOT AGAINST [DESCRIPTOR]: Cannot remove damage caused by specific descriptors. -1 point per rank.
* ONLY WHEN DEAD: Functions only when dead. -2 points per rank.
* ONLY WHEN INCAPACITATED: Functions only when incapacitated. -1 point per rank.
* SOURCE: Requires access to a specific source (food, electricity, sunlight). -1 point per rank.`,
    shortDesc: "Automatically recover from Damage conditions over time."
  },
  {
    name: "Remote Sensing",
    type: "Sensory",
    action: "Free",
    range: "Rank",
    duration: "Sustained",
    baseCost: 5,
    costType: "per_rank",
    fullText: `You can displace one or more of your senses over a distance, perceiving as if you were at that location. You make Perception checks normally using your displaced senses, taking the normal actions to do so. Remote Sensing overrides your normal sense(s), leaving you Vulnerable and Unaware of your surroundings while using it.

Remote Sensing costs 5 points per rank for one sense type and +1 point per rank per additional sense type, 10 points per rank for all of your senses. Sight senses count as two sense types, so sight Remote Sensing is 6 points per rank.

REMOTE SENSING RANGE
Your effect rank determines the range of your Remote Sensing:
* Rank 1 (Short Range): Within the same city
* Rank 2 (Medium Range): Within the same geographic area
* Rank 3 (Long Range): Within the same continent
* Rank 4 (Worldwide): Anywhere in the world
* Rank 5 (Unlimited): Effectively anywhere
You sense things in real time within your effective range, regardless of distance.

NOTICING REMOTE SENSING
Remote sensing is noticeable: Subjects observed via the effect can "feel" or otherwise notice it with an Insight check (DC 10 + rank) getting the sensation they are being observed. Sensory effects targeted on the spot where you have displaced your senses affect you normally.

SEARCHING REMOTELY
To search a large area for someone or something, use the Searching guidelines given in the description of the Investigation skill.

SENSORY EFFECTS
Sensory effects targeting the area where you have displaced your senses affect you normally, so you cannot, for example, see in an Obscure area that blocks your sight remote senses, and a Dazzle attack against your remote senses can still affect them. See Dazzle under the Affliction effect in this chapter. You cannot normally target Perception Range effects using Remote Sensing without the Targeting extra.

EXTRAS
* COMMUNICATION: Add Communication effect to Remote Sensing. +2 points per rank.
* DIMENSIONAL: Extend Remote Sensing into other dimensions. +1 to +3 points flat.
* PROTECTED: Sensory attacks at the remote location do not affect you. +1 point per rank.
* SIMULTANEOUS: Use normal and remote senses at the same time without penalties. +1 point per rank.
* SUBTLE: Make Remote Sensing harder to notice or completely unnoticeable. +1 or 2 points flat.
* TARGETING: Use Perception Range effects through remote senses. +1 point per rank.

FLAWS
* FEEDBACK: Damaging attacks at the remote location affect you. -1 point per rank.
* MEDIUM: Require a specific medium (shadows, mirrors, water, screens). -1 point per rank.
* NOTICEABLE: Has an easily noticeable display at the observed location. -1 point flat.`,
    shortDesc: "Project your senses to a distant location and perceive remotely."
  },
  {
    name: "Shrinking",
    type: "Alteration",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    baseCost: 1,
    costType: "per_rank",
    fullText: `You temporarily decrease your size category, gaining all of the modifiers of that size. See Size under Capabilities in the Abilities chapter. Each rank in Shrinking decreases your size category and rank by 1, down to minuscule, size rank -5.

ADDED SHRINKING EFFECTS
In addition to the normal modifiers for decreased size, you can take other effects and make them Linked to your Shrinking, including:
* Enhanced Defense.
* Concealment, usually sight and hearing.
* Flight or other movement effects like Leaping or Speed.
* Immunity or Resistance.
* Enhanced Advantages, particularly those associated with the agility of your smaller size like Defensive Roll, Evasion, Hide in Plain Sight, Improved Defense, Improved Initiative, or Set-Up.
Added effects should be approved by the Game Master and are limited by Power Level. They should fit the requirements of the Linked extra: having the same Action and Duration as your Shrinking effect, allowing you to activate and use them simultaneously when you grow, but also meaning you lose the use of them when not using your Shrinking effect.

EXTRAS
* ATOMIC: Shrink to molecular/atomic size (requires Microscopic). +1 point flat.
* GROWTH MOMENTUM: Penalty to targets' Damage check when growing in size. +1 point flat.
* MICROSCOPIC: Shrink to microscopic cell scale (requires Shrinking 5). +1 point flat.
* PERMANENT: Permanently smaller size at no cost. +0 per rank.
* NORMAL SPEED: Speed ranks are not reduced while smaller. +1 point per rank.`,
    shortDesc: "Decrease your size category and gain associated bonuses."
  },
  {
    name: "Speed",
    type: "Movement",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    baseCost: 1,
    costType: "per_rank",
    fullText: `You can move fast. Add your Speed rank to your ground speed and climbing speed ranks, but not your jumping distance or swimming speed. If your jumping or swimming movement is also greater, you can take the Leaping and Swimming effects as alternate effects of your Speed.

Speed does not allow you to perform any actions faster than normal other than moving. For quickly performing routine tasks, see the Quickness effect, for acting sooner during action time, see the Improved Initiative advantage—possibly as an Enhanced Trait—and for attacking more rapidly, see the Multiattack and Split extras.`,
    shortDesc: "Move faster by adding Speed rank to your ground and climbing speed."
  },
  {
    name: "Summon",
    type: "Control",
    action: "Standard",
    range: "Close",
    duration: "Sustained",
    baseCost: 2,
    costType: "per_rank",
    fullText: `You call upon a non-player character to appear and aid you. Create the summoned character with (effect rank × 15) Power Points. They are subject to the normal Power Level limits, have the minion characteristics, and cannot have minions of their own, either from this effect or the Minions advantage. For more information and guidelines see the Minions section at the end of Chapter 3.

SUMMONING AND COMMANDING MINIONS
When you use the Summon effect, your minion appears in the nearest open space beside you. Minions have their own initiative and act starting on the round after you summon them. See Initiative in the Action and Adventure chapter. Directing a minion to do something is a Command action, but minions generally do as they are told until a task is completed.

MINION TRAITS AND CONDITIONS
You always summon the same minion unless you apply the Variable Type modifier, allowing you to summon different minions. Your minion automatically has a Helpful attitude and does their best to aid you and obey your commands. Incapacitated minions disappear. They recover normally and you cannot summon an Incapacitated minion until they have completely recovered. Your summoned minions also vanish if your effect is not maintained, or is countered or nullified.

EXTRAS
* CONTROLLED: Minions have no free will and are completely directed. +1 cost per rank.
* HEROIC: Summoned characters are normal NPCs, not restricted by minion rules. +1 cost per rank.
* HORDE: Summon max minions at once as a standard action. +1 point per rank.
* MEMORY MERGE: Gain minion's memories when it vanishes. +1 point flat.
* MENTAL LINK: Telepathic communication link with minions. +1 point flat.
* MULTIPLE MINIONS: Double total number of minions per rank. +2 points per rank.
* SACRIFICE: Shift incoming attack resistance check to a minion. +1 point flat.
* VARIABLE TYPE: Summon different minions of general or broad types. +1 or +2 cost per rank.

FLAWS
* ATTITUDE: Minions are Indifferent or Unfavorable. -1 or -2 cost per rank.
* HOSTILE: Minions resist and become hostile upon failure. -2 per rank.
* RESISTIBLE: Targets get a resistance check to avoid being summoned. -1 cost per rank.

* * *
UNDER THE HOOD: SUMMON
Summon is a useful effect, so useful in fact, that Game Masters may want to restrict its use. It doesn't cost much to summon up a gang of minions, giving you a lot of effective actions per round! Game masters may wish to limit large numbers of minions, summoned or otherwise, to villains and non-player characters. Player character minions are subject to the series power level limits. There are also practical matters limiting just how much your minions can do at any one time.

First, directing your minions to do something is a Command action. If you want to issue different commands to different minions, then it's one simple action per command. So it's easier to tell all of your minions "attack!" than it is to issue complex commands to each in the midst of combat.

Second, Game Masters may want to have groups of minions use team checks rather than rolling their actions separately. For example, instead of making eight attacks for eight different minions, the GM has seven minions aid the eighth, giving that minion a bonus. This makes groups of minions more effective and efficient overall, but keeps the number of die rolls to a minimum. GMs should keep in mind the limits on the number of opponents that can team up on a character at once. See Team Checks in The Basics chapter for more.

Lastly, Game Masters may wish to limit the use of the Heroic extra for Summon. Treating minions the same as heroes can greatly slow down combat, especially if there are more than a couple of them, since it becomes that much harder to take them out of a fight.`,
    shortDesc: "Call forth a minion built with (rank × 15) Power Points to serve you."
  },
  {
    name: "Swimming",
    type: "Movement",
    action: "Free",
    range: "Personal",
    duration: "Sustained",
    baseCost: 1,
    costType: "per_rank",
    fullText: `You can swim quickly. Add your Swimming rank to the base speed rank you swim, generally meaning you swim at Swimming rank speed. You can make Athletics checks to swim as routine checks. See Swimming under Athletics in the Skills chapter.

Note that Swimming does not allow you to breathe underwater. For that, see the Immunity effect in this chapter. Nor does it ignore the effects of taking actions underwater. For that, see the Environmental Adaptation effect of Enhanced Movement.`,
    shortDesc: "Move through water at a speed rank equal to your Swimming rank."
  },
  {
    name: "Teleport",
    type: "Movement",
    action: "Simple",
    range: "Rank",
    duration: "Instant",
    baseCost: 2,
    costType: "per_rank",
    fullText: `When you use this effect, you move instantly from place to place without crossing the distance in between. You can teleport yourself and up to mass rank 0 of additional mass you are wearing or carrying a distance rank equal to your effect rank.

You can only teleport to places you can accurately sense or know especially well in the GM's judgment. You retain your position and relative velocity when you teleport. So if you are falling when you teleport, you are still falling at the same speed when you arrive at your destination.

CARRYING PASSENGERS
You can bring willing passengers with you when you teleport, so long as you are in physical contact with them and can carry their mass rank, which may require ranks in the Increased Mass extra. At the GM's discretion, willing passengers can just be in close proximity to you, or all touching, such as holding hands in a circle. You can also bring unwilling "passengers" with you, but only if you successfully Grab them first. See the Grab action in Chapter 8 for details. So long as you can carry their mass, a Grabbed character can be carried along with you when you teleport.

EXTRAS
* ACCURATE: Do not need to accurately sense destination; general description suffices. +1 point per rank.
* CHANGE DIRECTION: Change direction/orientation after teleport. +1 point flat.
* CHANGE VELOCITY: Arrive at destination "at rest" (no fall damage). +1 point flat.
* EASY: Not Dazed or Vulnerable after Extended teleports. +1 point per rank.
* EXTENDED: Two simple actions for distance rank +10. +1 point per rank.
* INCREASED MASS: Carry additional mass when teleporting. +1 point flat per rank.
* KNOWN LOCATION: Memorize specific locations for precise teleporting. +1 point flat per location.
* TURNABOUT: Teleport, take action, and teleport back as a free action. +1 point flat.

FLAWS
* EXTENDED ONLY: Restricted to extended teleports only. -1 point per rank.
* MEDIUM: Require a medium (wires, shadows, water). -1 point per rank.`,
    shortDesc: "Instantly travel a distance equal to your Teleport rank."
  },
  {
    name: "Transmute",
    type: "Control",
    action: "Standard",
    range: "Close",
    duration: "Sustained",
    baseCost: 2,
    costType: "per_rank",
    fullText: `You can change objects into other objects, altering their shape or material composition in the process. You must touch the chosen object, which requires a close attack check if the object is held or worn by another character. What you can transmute affects cost per rank:
* 2 Points: Transmute one thing or substance into one other thing or substance, such as metal into wood, iron into glass, or broken objects into repaired ones.
* 3 Points: Transmute a broad group of things into a single result (any metal into gold, for example) or a single target into any of a broad group (one type of metal, such as lead, into any other metal, water into other liquids, and so forth).
* 4 Points: Transmute a broad group of targets into one of a broad group of results (solids into other solids, for example).
* 5 Points: Transmute any material into anything else.

You can affect (Transmute rank -6) rank mass, so Transmute 1 can affect up to mass rank -5, then mass rank -4 at rank 2, and so forth, on up to mass rank 14 at Transmute rank 20. Transmute requires a Sustain action each round to maintain. When you stop maintaining it, the target reverts to normal.

DESTRUCTIVE TRANSMUTATIONS
It is possible for Transmute to effectively destroy objects: turning a steel door into water, air, or even rust certainly removes it as a barrier. However, keep in mind that Transmute is normally Sustained; the target isn't truly destroyed unless the effect is Continuous, and therefore irreversible. Even then, the destruction of targets tends to be all-or-nothing based on the object's mass rank. For an effect capable of wearing-down and eventually destroying objects, use Damage or Weaken instead.

TRANSMUTING DEVICES AND EQUIPMENT
Transmuting someone's devices or equipment requires targeting them first: characters can make Dodge resistance checks for their held or worn items, with a +5 bonus for hand-held and similar-sized objects. So transmuting a hand-held weapon like a gun requires an attack check and permits the wielder a Dodge resistance check with a +5 bonus. Targeting a worn suit of armor requires an attack check and allows the wearer a Dodge resistance check, with no modifier for a large item. Transmute is generally just another way of "removing" a device or equipment, considered a part of their discount in cost from the Removable flaw, although transmuted items should eventually be restored or replaced.

TRANSMUTING BEINGS
Transforming living or otherwise willful beings, as opposed to inanimate matter, requires Transform rather than Transmute. When dealing with non-living creatures, those absent Stamina, but possessing Will, the GM may permit Transmute to function like a Transform of the same rank, resisted with Will, rather than Fortitude: The target's willpower and sense of self can prevent them from being transmuted and restore them to their normal form if they overcome the effect.

EXTRAS
* CONTINUOUS: Duration becomes Continuous (irreversible). +1 point per rank.

FLAWS
* CONCENTRATION: Duration becomes Concentration. -1 point per rank.

* * *
UNDER THE HOOD: TRANSMUTE
Transmute is a powerful effect, particularly in the hands of a cunning player. To some degree, Transmute could duplicate certain other effects, such as trapping a target by transforming air into a solid material or turning oxygen into a suffocating gas for Snare or Suffocate Afflictions. This is perfectly allowable; use the guidelines for other effects to handle these situations, using Transmute rank to determine resistance DCs.

Keep in mind, however, that Transmute has a sustained duration, which may affect how such "tricks" work (e.g., the trap disappears if the character is stunned, the suffocating gas dissipates unless the character concentrates each round to continue transforming it, etc.). As always, the GM should use common sense and good judgment. Asking for Extra Effort for a Power Stunt for unusual applications of Transmute is perfectly reasonable.

If characters use Continuous Transmute to acquire material resources, you may want to require them to spend Power Points on ranks of the Benefit advantage to reflect their Wealth, assuming things like wealth matter in your series. Otherwise, the goods fade or remain impermanent in some way.`,
    shortDesc: "Transform inanimate objects into other substances or forms."
  },
  {
    name: "Variable",
    type: "General",
    action: "Standard",
    range: "Personal",
    duration: "Sustained",
    baseCost: 7,
    costType: "per_rank",
    fullText: `This effect grants access to potentially any effect of an appropriate type and descriptor! A Variable effect provides you with (rank × 5) Variable Power Points you can allocate to different effects. Take a Concentrate action on your turn and choose how to configure your Variable Power Points. It is a good idea to have a "menu" of commonly used options written down in advance to help speed up this process during play. You can think of a Variable effect as a power array with every possible power appropriate for its descriptors.

VARIABLE AND POWER LEVEL
The effects you gain from your Variable effect are subject to the normal Power Level and series limits. So you cannot, for example, acquire Enhanced Trait as a Variable Effect to improve a trait beyond its Power Level limit, or acquire effects or descriptors the Game Master has specifically banned from the series. The GM has final say as to whether or not a particular use of a Variable effect is appropriate and may veto your configurations, if necessary.

VARIABLE DESCRIPTORS
You must place descriptors on your Variable effect limiting its scope. For example, a Variable effect that mimics other's traits is limited to the traits its subject(s) possess; a Variable effect providing you with traits suitable to different shapes is limited by the form(s) you assume; a Variable effect providing adaptations is limited to the stimulus to which it adapts, and so forth. This descriptor does not reduce the effect's cost unless it's especially narrow or limiting, and the GM is the final arbiter of what constitutes a suitable descriptor and which descriptors are narrow enough to qualify for a Limited flaw.

VARIABLE DURATION
The configuration of your Variable Power Points is Sustained, so if you stop maintaining the Variable effect for any reason, your configured Variable Power Points "reset" to a "null" state: You lose any traits those points were configured for and must take the action necessary to reconfigure your Variable Points again on your turn to regain them. Points in a Continuous Variable effect remain configured without maintenance, unless the Variable effect itself is countered or nullified. A Variable effect cannot be Permanent Duration by definition.

EXTRAS
* ACTION: Reconfigure faster (Simple Action: +1 pt/rank; Free Action: +2 pts/rank).
* TRIGGERED: Reconfigure automatically in response to a triggering event. +3 points per rank.

FLAWS
* LIMITED: Further restrict scope beyond default descriptor limits. -1 (or more) points per rank.
* SLOW: Reconfigure only outside action time (between scenes). -1 point per rank.

* * *
UNDER THE HOOD: VARIABLE EFFECTS
Powers based off the Variable effect are obviously very flexible. Responsibility for controlling Variable effects in the game is placed largely in the hands of both the Game Master and responsible players. To do otherwise would require weighing the effect down with numerous game-system limitations that would keep it from doing what it is supposed to do: create a wide range of effects.

Keep in mind a Variable effect is not an "any effect I want" trait. That kind of unlimited power doesn't belong in the hands of player characters. A Variable effect can be "any effect within a given set of parameters," but it's up to you and the GM to define those parameters. The limits of power flexibility in Mutants & Masterminds are deliberately set by Variable effects, the use of Extra Effort, Hero Points, Improvised Effects, and Power Stunts.

Many comic book heroes who appear to have the power to "do anything" are actually using one of these options in Mutants & Masterminds game terms. For example, a super-sorcerer can do practically anything with magic. However, generally speaking, these characters have certain abilities they use all the time, typically an array of powers they have acquired with Power Points, things they only do occasionally, essentially power stunts performed with Extra Effort and Hero Points, and more complex rituals, created using the Improvised Effect Advantage from the Advantages chapter. So the "variability" of magic seen in the comics is already built-in to the system, with some costs to control it, without having to give players the unlimited ability to duplicate any effect in the game at-will.

Variable effects are better reserved for things where it is difficult to cost-out and define everything about a given power in advance. For example, the ability to transform into any animal could be an application of the Morph effect with a very large array of Metamorph options, but listing out every single possible animal form, one at a time, would be tedious to say the least, especially when a good number of those forms would be superfluous. A Variable effect, with the descriptor "animal forms" is easier to manage. The player can pre-build certain commonly used animal forms for use during play, but also has the option for new configurations that fit into the power's descriptors.

Similarly, the ability to mimic or duplicate other characters' traits is only effectively handled by a Variable effect where its points can be configured for the duplicated traits, with extras and flaws defining the other parameters of the power.

In short, Variable is a "last resort" in power design, and the GM should treat it as such.`,
    shortDesc: "Gain a pool of (rank × 5) points to dynamically create and reconfigure effects."
  }
];
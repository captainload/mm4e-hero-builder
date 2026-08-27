// Unabridged 4th Edition Advantages Reference Data

const ADVANTAGES_LIST = [
  {
    name: "Agile Grab",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "You are not Vulnerable while Grabbing",
    conditionalSummary: "Retain Defense while Grabbing opponents.",
    fullText: `AGILE GRAB
COMBAT
You are not Vulnerable while grabbing. See Grab in the Actions section of Chapter 8.`
  },
  {
    name: "Alternate Feint",
    types: ["Combat", "Focused"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "You can Feint using a different trait",
    conditionalSummary: "Feint using chosen alternate trait (Acrobatics, Deception, Intimidation, etc.).",
    fullText: `ALTERNATE FEINT
COMBAT, FOCUSED
When you take the Feint action you can make the check using a trait other than your attack bonus, chosen when you configure this advantage. Examples include Acrobatics, Deception, Expertise, Intimidation, or a particular power effect rank. See Feint in the Actions section of Chapter 8.

NORMAL: The Feint action is normally an attack bonus check.

FOCUSED: Each alternate trait you can use to make Feint checks is a separate advantage.`
  },
  {
    name: "Alternate Initiative",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "Your Initiative is based on a mental ability",
    conditionalSummary: "Initiative uses INT, AWE, or PRE instead of AGL.",
    fullText: `ALTERNATE INITIATIVE
COMBAT
Your Initiative bonus is based on your Intellect, Awareness, or Presence. Choose which ability when configuring this advantage; the choice is permanent for as long as you have the advantage.

NORMAL: Initiative bonus is normally based on Agility.`
  },
  {
    name: "Animal Empathy",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "You can use interaction skills on animals",
    fullText: `ANIMAL EMPATHY
SKILL
You can use interaction skills on animals normally, and do not have to speak a language the animal understands; you communicate your intent through tone, gestures, and body language and learn things by studying animal behavior. You can use Expertise: Animal Handling or another suitable Expertise skill at the GM's discretion in place of any interaction skill with animals.

NORMAL: Characters normally have a -10 penalty to use Interaction Skills on animals.`
  },
  {
    name: "Assessment",
    types: ["General"],
    ranked: true,
    maxRanks: 10,
    description: "You can use Insight to learn an opponent's combat capabilities",
    fullText: `ASSESSMENT
GENERAL, RANKED
You can size-up an opponent's combat capabilities. Once per turn as a free action, choose a subject you can accurately perceive and have the GM make a secret Insight check for you, opposed by the subject's Deception check result (or 10 + their Deception, if they don't know you're assessing them).

SUCCESS: The GM tells you the subject's attack and Defense bonuses relative to yours (lower, higher, or equal). With each degree of success after the first, you learn one of the target's bonuses of your choice exactly.

FAILURE: You don't learn anything and cannot try again during that scene without Extra Effort for a Renewed Attempt. With more than one degree of failure, the GM may lie or otherwise exaggerate the subject's bonuses.

QUICK ASSESSMENT: You can choose to assess multiple opponents on the same turn, but this imposes a penalty to your Insight check equal to the total number of opponents assessed. A group of minions with the same traits counts as a single opponent for this purpose. So assessing four opponents in one turn is a single Insight check with a -4 penalty, compared against each of their Deception check results.

RANKED: For each additional rank in this advantage, you can assess an additional opponent per turn with no penalty.`
  },
  {
    name: "Beginner's Luck",
    types: ["Fortune"],
    ranked: false,
    maxRanks: 1,
    description: "Gain a +5 bonus with a rank 4 or less skill",
    fullText: `BEGINNER'S LUCK
FORTUNE
By spending a Hero Point, you gain a +5 bonus for the duration of the scene with checks for one skill of your choice for which you currently have 4 or fewer ranks, including skills you have no ranks in, even if they can't be used untrained.`
  },
  {
    name: "Benefit",
    types: ["General", "Focused"],
    ranked: true,
    maxRanks: 5,
    focused: true,
    description: "Gain a significant perquisite or benefit",
    fullText: `BENEFIT
GENERAL, FOCUSED, RANKED
You have some significant benefit. The exact nature of the benefit is for you and the Game Master to determine. As a general guideline, it should not exceed the benefits of any other advantage, but should be significant enough to still be considered an advantage. The larger or more influential the benefit, the more ranks in this advantage are needed to reflect it. Here are a few examples of Benefits:

• ALTERNATE IDENTITY: You have an alternate identity, complete with legal paperwork (driver's license, birth certificate, etc.) per Benefit rank. This is different from a costumed identity, which doesn't necessarily have any special legal status.
• DIPLOMATIC IMMUNITY: You can't be punished for crimes outside your native country. The more ranks you have, the more severe the crimes you can escape.
• SECURITY CLEARANCE: You have access to restricted information and secure facilities.
• STATUS: You have significant status or position within an organization, giving you influence and access to resources.
• WEALTH: You have enough money to enjoy luxuries and solve many mundane problems. Wealth 1 means you're comfortable, while Wealth 5 means you're a billionaire.

FOCUSED: Each particular Benefit is a separate advantage.

RANKED: Additional Benefit ranks mean a greater or more effective Benefit.`
  },
  {
    name: "Blind Shot",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Ignore Concealment penalties for ranged attacks",
    conditionalSummary: "Ignore Concealment penalties on ranged attacks.",
    fullText: `BLIND SHOT
COMBAT
Your ranged attack checks ignore penalties for Concealment.

NORMAL: See Concealment in the Range section of Chapter 8.`
  },
  {
    name: "Blind Strike",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Ignore Concealment penalties for close attacks",
    conditionalSummary: "Ignore Concealment penalties on close attacks.",
    fullText: `BLIND STRIKE
COMBAT
Your close attack checks ignore penalties for Concealment.

NORMAL: See Concealment in the Range section of Chapter 8.`
  },
  {
    name: "Close Attack",
    types: ["Combat"],
    ranked: true,
    maxRanks: 20,
    description: "+1 to close attack checks per rank",
    fullText: `CLOSE ATTACK
COMBAT, RANKED
You gain a +1 bonus to all close attack checks. For bonuses with a specific type of close attack, use the Close Combat skill from the Skills chapter.

RANKED: Each additional rank increases your close attack bonus by +1, up to the Power Level limit.`
  },
  {
    name: "Close Defense",
    types: ["Combat"],
    ranked: true,
    maxRanks: 20,
    description: "+1 to Defense against close attacks per rank",
    fullText: `CLOSE DEFENSE
COMBAT, RANKED
You gain a +1 bonus to your Defense against close range attacks.

RANKED: Each additional rank increases your Defense against close range attacks by +1, up to the Power Level limit.`
  },
  {
    name: "Connections",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Call in assistance or favors with a Persuasion check",
    fullText: `CONNECTIONS
SKILL
You know people who can help you out sometimes, offering expert advice, information, legal help, or access to resources, among other things.

You can use your Connections by making a Persuasion check. A simple favor is DC 10, ranging up to DC 25 or higher for especially difficult, dangerous, or expensive favors, as set by the Game Master. The GM has the right to veto any request of your Connections if it is too dangerous, expensive, or may spoil the plot of the adventure.

It takes at least a few minutes, and sometimes much longer, to call on your Connections, and you must have some means of contacting them.`
  },
  {
    name: "Contacts",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Make an initial Investigation check in one minute",
    fullText: `CONTACTS
SKILL
You have a sufficiently extensive network of informants that you can make an initial Investigation check to gather information in only one minute, so long as you have some way of getting in touch with your contacts. Additional Investigation checks to gather information on the same subject require the normal amount of time, since you must search beyond your usual network.`
  },
  {
    name: "Counterattack",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction to attack an opponent who just hit you",
    conditionalSummary: "Reaction: Make an immediate close attack when hit by a close attack.",
    fullText: `COUNTERATTACK
COMBAT, REACTION
If an opponent hits you with a close attack, you can use your reaction to make an immediate attack against them, before your resistance check against their attack's effect, if any.`
  },
  {
    name: "Critical Volley",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "On a critical hit, make a second ranged attack",
    conditionalSummary: "Reaction: Make a second ranged attack against the same target on a Critical Hit.",
    fullText: `CRITICAL VOLLEY
COMBAT, REACTION
If you score a critical hit with a ranged attack, you can use your reaction to make another immediate ranged attack against the same target. Resolve the results of the attacks separately.`
  },
  {
    name: "Damaging Escape",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Follow an Escape with an Attack action",
    conditionalSummary: "Reaction: Make an immediate unarmed attack upon escaping a Grab.",
    fullText: `DAMAGING ESCAPE
COMBAT, REACTION
When you succeed on an Escape action against a hold from a Grab, you can use your reaction to make an immediate unarmed Attack action against the opponent who was holding you. If you escaped multiple opponents, choose one to attack.`
  },
  {
    name: "Damaging Grab",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Inflict Damage with a successful Grab check",
    conditionalSummary: "Inflict Strength Damage as part of a successful Grab or hold increase.",
    fullText: `DAMAGING GRAB
COMBAT
When you Grab and successfully hold a target, or increase the degree of your hold on a target, you can also inflict your Strength Damage on the target as part of the Grab action.

NORMAL: Squeezing a target in a hold to damage them requires an Attack action. See Grab in the Action & Adventure chapter.`
  },
  {
    name: "Dazing Interaction",
    types: ["Skill", "Focused"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "Make an impress check to Daze or Stun",
    fullText: `DAZING INTERACTION
SKILL, FOCUSED
You can make an impress check using an interaction skill, chosen when you configure this advantage, to cause an opponent to hesitate in combat. See Impress Check in the Action & Adventure chapter for details. If the impress check is successful, the target is Dazed, Stunned with two or more degrees of success. The target repeats their resistance check at the end of each of their turns, with success removing the condition.

FOCUSED: The ability to Daze with each interaction skill is a separate advantage: Dazing Performance, or Dazing Persuasion.`
  },
  {
    name: "Defensive Grab",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction to Grab an opponent who just missed you",
    conditionalSummary: "Reaction: Immediate Grab against a close attacker who misses you.",
    fullText: `DEFENSIVE GRAB
COMBAT, REACTION
If an opponent attacks you in close combat and misses, you can use your reaction for an immediate Grab action against them. See Grab in the Actions section of Chapter 8.`
  },
  {
    name: "Defensive Roll",
    types: ["Combat"],
    ranked: true,
    maxRanks: 20,
    description: "+1 to Toughness checks per rank",
    conditionalSummary: "+1 Toughness per rank. Take no damage conditions on 2+ degrees of success while not Vulnerable/Defenseless.",
    fullText: `DEFENSIVE ROLL
COMBAT, RANKED
You can avoid damage through agility, mobility, and "rolling" with a hit, giving you a +1 bonus to your Toughness. Additionally, if you get two or more degrees of success on a resistance check using your Defensive Roll bonus, you take no damage conditions, the same as Hardened Toughness (see the Protection effect in the Powers chapter).

You lose the ability to avoid all damage conditions while you are Vulnerable or Defenseless, but retain your Toughness bonus. You lose all benefits of this advantage while you are Stunned. Defensive Roll is common for those who lack high toughness, relying instead on their agility or speed to avoid harm.

RANKED: Each additional rank in this advantage increases your Toughness rank by +1, up to the Power Level limit.`
  },
  {
    name: "Defensive Throw",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction to Trip an opponent who just missed you",
    conditionalSummary: "Reaction: Immediate Trip action against a close attacker who misses you.",
    fullText: `DEFENSIVE THROW
COMBAT, REACTION
If an opponent attacks you in close combat and misses, you can use your reaction for an immediate Trip action against them.`
  },
  {
    name: "Determination",
    types: ["Heroic"],
    ranked: true,
    maxRanks: "heroicLimit",
    description: "Remove Dazed, Fatigued, or Stunned, or new resistance check",
    fullText: `DETERMINATION
HEROIC, RANKED
Once per adventure, you can immediately remove one of the Dazed, Fatigued, or Stunned conditions from your character or immediately give your character a new resistance check against an ongoing effect. Using Determination to immediately remove the Fatigued condition effectively lets you perform one use of Extra Effort without becoming Fatigued. See Extra Effort in The Basics chapter.

RANKED: You can use Determination an additional time per adventure per additional rank in this advantage. Your maximum Determination rank is limited by your total ranks in heroic advantages. All of your uses of Determination reset at the start of the next adventure.`
  },
  {
    name: "Diehard",
    types: ["General"],
    ranked: false,
    maxRanks: 1,
    description: "Stabilize while Dying",
    fullText: `DIEHARD
GENERAL
When you gain the Dying condition, you automatically stabilize without any need for a Stamina check, although further damage—such as a finishing attack—can still kill you. See the Dying condition in The Basics chapter and Finishing Attack in the Action and Adventure chapter for details.`
  },
  {
    name: "Dive for Cover",
    types: ["Command", "Reaction"],
    ranked: true,
    maxRanks: 2,
    description: "Command action for allies to drop Prone",
    fullText: `DIVE FOR COVER
COMMAND, REACTION, RANKED 2
When an ally is targeted with an Area Effect or a ranged attack, you can use your reaction for a Command action that allows any allies able to hear you to immediately drop Prone, if they wish. This gives them the benefits of the Prone condition and may change the amount of Concealment or Cover they have against the attack. See the Prone condition in The Basics chapter and Cover and Concealment in the Action & Adventure chapter for more.

RANKED: With 2 ranks in this advantage, allies can also immediately move up their movement speed -2 ranks before dropping Prone, possibly allowing them to move out of an area or to reach cover, for example.`
  },
  {
    name: "Edit Scene",
    types: ["Heroic"],
    ranked: true,
    maxRanks: "heroicLimit",
    description: "Make a small change to the description of the scene",
    fullText: `EDIT SCENE
HEROIC, RANKED
Once per adventure, you can make a small change to the description of the scene, adding some new detail that helps you or your allies. The Game Master has to approve any edits, and generally edits can only help you, not automatically allow you to succeed.

For example, while you're fighting a plant-based foe, you could use Edit Scene for there to be some weed-killer or defoliant close at hand, provided that would make sense for the locale. Similarly, you could use Edit Scene to say a thunderstorm just happens to knock out the power and the lights during a tense conflict, or that a stray attack allows sunlight to pour into an enclosed area, or punches a hole in a boat's hull and causes it to start sinking.

RANKED: You can use Edit Scene an additional time per adventure per additional rank in this advantage. Your maximum Edit Scene rank is limited by your total ranks in heroic advantages. All of your uses of Edit Scene reset at the start of the next adventure.`
  },
  {
    name: "Eidetic Memory",
    types: ["General"],
    ranked: false,
    maxRanks: 1,
    description: "Perfect recall, +5 to memory-related checks",
    fullText: `EIDETIC MEMORY
GENERAL
You have perfect recall of everything you notice or observe. You have a +5 bonus on resistance checks against effects that alter or erase memories. The GM can also provide you with the benefits of the Guidance advantage whenever they feel it involves information your character would remember, although the GM does not need to provide any additional details or hints without an actual use of Guidance.`
  },
  {
    name: "Elusive Target",
    types: ["Combat"],
    ranked: true,
    maxRanks: 2,
    description: "Gain Cover while in close combat",
    conditionalSummary: "Gain +2 Defense (Rank 1) or +5 Defense (Rank 2) against ranged attacks while engaged in close combat.",
    fullText: `ELUSIVE TARGET
COMBAT, RANKED
When you are in close combat with one or more opponents, you gain the benefit of partial cover against ranged attacks: +2 to your Defense. See Cover in Chapter 8 for details.

RANKED: With 2 ranks in this advantage, you gain full cover while in close combat: A +5 bonus to your Defense against ranged attacks.`
  },
  {
    name: "Encouragement",
    types: ["Command", "Fortune", "Heroic"],
    ranked: false,
    maxRanks: 1,
    description: "Command action and a Hero Point to grant an ally Extra Effort",
    fullText: `ENCOURAGEMENT
COMMAND, FORTUNE, HEROIC
By taking the Command action and spending a Hero Point, you grant an ally able to see or hear you one of the benefits of Extra Effort at no cost in Fatigue for either of you. This can stack with the benefit of that character using Extra Effort themselves, or even the Extraordinary Effort advantage (following).

Encouragement counts towards your total rank limit in command and heroic advantages.`
  },
  {
    name: "Equipment",
    types: ["General"],
    ranked: true,
    maxRanks: 20,
    description: "Configure 5 points worth of equipment per rank",
    fullText: `EQUIPMENT
GENERAL, RANKED
You have access to equipment you regularly have on-hand. For each rank in this advantage, choose or configure up to 5 Equipment Points worth of equipment from the Equipment chapter.

You can reconfigure your Equipment Points at the start of each adventure, or when you have appropriate access to your headquarters or other cache of equipment between scenes, at the GM's discretion, possibly including a use of the Edit Scene advantage (previously).

RANKED: Each additional rank in Equipment gives you 5 more Equipment Points to configure.`
  },
  {
    name: "Evasion",
    types: ["Combat"],
    ranked: true,
    maxRanks: 2,
    description: "+5 for Dodge resistance checks vs. Area Affects per rank",
    conditionalSummary: "+5 Dodge resistance vs Area Effects (Rank 1). Successful Dodge completely negates Area Effect damage (Rank 2).",
    fullText: `EVASION
COMBAT, RANKED 2
You have a +5 bonus for Dodge resistance checks to avoid Area Effects. See the Area Effect extra in the Powers chapter.

RANKED: With 2 ranks in this advantage, if you succeed on your Dodge resistance check against an Area Effect, it has no effect on you.`
  },
  {
    name: "Extraordinary Effort",
    types: ["General"],
    ranked: false,
    maxRanks: 1,
    description: "Gain two benefits while using Extra Effort",
    fullText: `EXTRAORDINARY EFFORT
GENERAL
When using Extra Effort, you can gain two of the listed benefits, even stacking two of the same benefit. However, you also double the cost of the effort, acquiring two instances of the Fatigued condition, likely leaving you Exhausted. See Extra Effort in The Basics chapter.`
  },
  {
    name: "Fallen Inspiration",
    types: ["Combat", "Fortune"],
    ranked: false,
    maxRanks: 1,
    description: "Grant all of your allies a Hero Point when you are Incapacitated",
    conditionalSummary: "When Incapacitated, all aware allies in the scene gain a bonus Hero Point.",
    fullText: `FALLEN INSPIRATION
COMBAT, FORTUNE
Your loss is keenly felt. When you are Incapacitated, including Dying or Dead, each of your allies in the scene aware of this gains a Hero Point. Allies lose this bonus Hero Point if they do not use it before you recover from the Incapacitated condition.`
  },
  {
    name: "Fascinating Interaction",
    types: ["Skill", "Focused"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "Use an interaction skill to Stun a target while out of combat",
    fullText: `FASCINATING INTERACTION
SKILL, FOCUSED
One of your interaction skills, chosen when you configure this advantage, is so effective you can use it for an impress check to capture and hold someone's attention with it, keeping them from taking other actions. See Impress Checks in the Action & Adventure chapter for details.

Make an impress check with your chosen skill. If you succeed, the target is Stunned and cannot take actions other than paying attention to your performance. You can maintain the effect with a Concentrate action on your turn, continuing your performance and giving the target a new resistance check at the end of their turn. The Stunned condition ends when you stop performing, can no longer interact, the target successfully resists, or any immediate danger presents itself, such as a conflict breaking out.

You can use Fascinating Interaction on a group, but must affect everyone in the group in the same way. You can't use this advantage during a conflict.

FOCUSED: Fascinating with each different interaction skill is a separate advantage: Fascinating Deception, Fascinating Intimidation, Fascinating Performance, and Fascinating Persuasion.`
  },
  {
    name: "Fast Feint",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Feint as a simple action with no penalty",
    conditionalSummary: "Perform Feints as a Simple Action with no -5 check penalty.",
    fullText: `FAST FEINT
COMBAT
You can perform a Feint as a simple action without a penalty on your check. See Feint in the Action and Adventure chapter.

NORMAL: Performing a Feint as a simple action imposes a -5 penalty on the check.`
  },
  {
    name: "Favored Environment",
    types: ["Combat", "Focused"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "+2 to Attack or Defense in a particular environment",
    conditionalSummary: "Choose +2 Attack or +2 Defense each turn while operating in your chosen environment.",
    fullText: `FAVORED ENVIRONMENT
COMBAT, FOCUSED
You have an environment you're especially at home in, chosen when you configure this advantage. While you are in your favored environment, you gain a +2 bonus to your Attack or your Defense. Choose at the start of your turn whether the bonus applies to one or the other. The choice remains until the start of your next turn. This bonus is not limited by Power Level.

Favored Environment is meant to be at least somewhat limited, such as a particular kind of terrain (arctic, desert, jungle, etc.) or situation like aerial or underwater combat. If a character has traits allowing them to always be in their Favored Environment, the GM should consider limiting or disallowing this advantage, including its use as a Heroic Feat for "the environment I'm currently in."

FOCUSED: Each type of Favored Environment is a separate advantage.`
  },
  {
    name: "Favored Foe",
    types: ["Skill", "Focused"],
    ranked: true,
    maxRanks: 2,
    focused: true,
    description: "Bonus to skill checks with a particular type of opponent",
    fullText: `FAVORED FOE
SKILL, FOCUSED, RANKED 2
You have a particular type of opponent you've studied or are especially effective against, chosen when you configure this advantage. You gain a +2 bonus on Deception, Intimidation, Insight, and Perception checks dealing with your Favored Foe. This includes impress checks and other actions based on those skills. This bonus is not limited by Power Level.

Your Favored Foe may be a type of creature, such as aliens, animals, constructs, or undead, a profession like ninja, soldiers, police officers, Yakuza, and such, or any other category the Game Master approves. Some categories like "humans" or "villains" are too broad and should be disallowed. Favored Foe is likewise disallowed as a Heroic Feat for "the foe I am currently fighting."

RANKED: If you have 2 ranks in Favored Foe, you gain a +5 bonus on Deception, Intimidation, Insight, and Perception checks dealing with your Favored Foe.

FOCUSED: Each type of Favored Foe is a separate advantage.`
  },
  {
    name: "Fearless",
    types: ["General"],
    ranked: true,
    maxRanks: 2,
    description: "Resistance to Fear effects, Immunity at rank 2",
    fullText: `FEARLESS
GENERAL, RANKED 2
You have Resistance to Fear effects, including any effect imposing the Frightened condition, gaining a bonus to resistance checks against them equal to half the effect's rank, rounded up.

RANKED: With 2 ranks of this advantage, you have Immunity to Fear effects, automatically succeeding on any resistance checks against them.`
  },
  {
    name: "Fearsome Presence",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Free Intimidation impress check when you first appear or act",
    fullText: `FEARSOME PRESENCE
SKILL
When you first appear in a scene or at the start of your first turn during a conflict, you can make an immediate Intimidation impress check to demoralize as a free action. See Impress Checks in the Action and Adventure chapter and the Intimidation skill description in the Skills chapter.`
  },
  {
    name: "Follow-Up Strike",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "On a critical hit, make a second close attack",
    conditionalSummary: "Reaction: Make an immediate extra close attack upon scoring a close Critical Hit.",
    fullText: `FOLLOW-UP STRIKE
COMBAT, REACTION
If you score a critical hit with a close attack, you can use your reaction to make another immediate close attack against the same or a different target within range.`
  },
  {
    name: "Grabbing Block",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "With a successful Block make an immediate Grab",
    conditionalSummary: "Immediate Grab attempt against a close attacker upon a successful Block.",
    fullText: `GRABBING BLOCK
COMBAT
With a successful Block action against a close attack, you can immediately perform a Grab action against the attacker. See Block and Grab in the Action & Adventure chapter.`
  },
  {
    name: "Grabbing Finesse",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Use Attack in place of Strength for Grabs",
    conditionalSummary: "Use Attack bonus instead of Strength for opposed Grab checks.",
    fullText: `GRABBING FINESSE
COMBAT
You can use your Attack bonus for grabbing in place of your Strength for opposed Grab checks. See Grab in the Action and Adventure chapter.`
  },
  {
    name: "Great Endurance",
    types: ["General"],
    ranked: false,
    maxRanks: 1,
    description: "+5 for particular Fortitude and Stamina checks",
    fullText: `GREAT ENDURANCE
GENERAL
You have a +5 bonus on checks to avoid becoming Fatigued, to hold your breath, avoid the effects of starvation or thirst, avoid the effects of cold or hot environments, and to resist suffocation and drowning. See Hazardous Environments in Chapter 8 for details.`
  },
  {
    name: "Guidance",
    types: ["Heroic"],
    ranked: true,
    maxRanks: "heroicLimit",
    description: "Gain a flash of insight or a key piece of information",
    fullText: `GUIDANCE
HEROIC, RANKED
Once per adventure, when you choose, you gain a flash of insight, some helpful guidance, or otherwise stumble across an important clue. You might figure out the trick to escaping a villain's deathtrap, or find important evidence at a crime scene. The Game Master decides exactly what you find or what you learn, but it should help move the adventure along in the right direction.

RANKED: You can receive Guidance an additional time per adventure per additional rank in this advantage. Your maximum Guidance rank is limited by your total ranks in heroic advantages. Your uses of Guidance reset at the start of the next adventure.`
  },
  {
    name: "Hide in Plain Sight",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Use Stealth to hide while being observed",
    fullText: `HIDE IN PLAIN SIGHT
SKILL
You can use the Stealth skill to hide while others are aware of you without any sort of diversion, and without penalty to your Stealth check for doing so (see the Stealth description in the Skills chapter). You're literally there one moment, and gone the next. You must still have some form of Cover or Concealment within range of your movement speed and be able to reach it in order to hide.

NORMAL: You cannot make a Stealth check to hide from someone able to accurately perceive you.`
  },
  {
    name: "Holding Back",
    types: ["Fortune", "Heroic"],
    ranked: true,
    maxRanks: "heroicLimit",
    description: "Temporarily increase your Power Level and traits at a cost",
    fullText: `HOLDING BACK
FORTUNE, HEROIC
You're more powerful than you seem, capable of wielding power greater than the series power level at times, but you're Holding Back that extra power for a reason.

To tap into your extra power, you need to spend a Hero Point and the situation has to be appropriately dramatic, dire, or needful: You and the Game Master should agree on this. Generally, you can't stop Holding Back more than once per adventure.

If the conditions are met, you gain a +1 increase in Power Level and an additional 15 Power Points worth of traits, chosen and configured when you configure this advantage, but this also triggers your drawback.

DRAWBACK
When you stop Holding Back, you trigger a particular drawback, which is usually the reason why you are Holding Back most of the time. Choose one of the following or create a suitable drawback with the approval of the Game Master. Note that while these drawbacks are often like complications, you do not earn Hero Points for triggering them.

• BERSERK: You fly into a berserker rage, attacking whatever provoked you to stop Holding Back, followed by any other perceived threat.
• CONTROLLED: You lose your free will to the control of some outside force or entity, which might possess your body or direct your actions, gaining the Controlled condition.
• HUNTED: When you stop Holding Back, you essentially send up a flare for someone (or something) that is hunting you. If you're lucky, you'll recover and slip away before they show up. Maybe.
• INERT: You crash, hard, after using your added power. You are Incapacitated for an hour per Holding Back rank thereafter, then can make a DC 10 Stamina check to recover each hour thereafter.
• MONSTROSITY: Your added power transforms you into something terrible and terrifying. For a week per Holding Back rank after your transformation, you have a -5 penalty on interaction skill checks other than Intimidation with anyone who knows that you are that... thing.
• UNLEASHED: No longer contained, your added power lashes out. At the end of the scene, your largest offensive power attacks random targets each turn until you are Incapacitated or spend a Hero Point (which automatically incapacitates you).

Your added power lasts for the remainder of the scene. You can spend an additional Hero Point to prevent your drawback from causing you to cross a line you really don't want to cross, such as killing someone, or setting off a truly terrible disaster, pulling yourself back from the brink. Doing so immediately ends both the drawback and the benefits of this advantage.

RANKED: Each additional rank you have in Holding Back gives you an additional 15 Power Points worth of traits and +1 Power Level when you stop Holding Back. Your rank in Holding Back is limited by your total ranks in heroic advantages, and may be additionally limited by the GM as best suits the series.`
  },
  {
    name: "Impressive Superiority",
    types: ["Combat", "Reaction", "Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction for an impress check against a foe who fails",
    conditionalSummary: "Reaction: Immediate Impress check against an opponent who misses you or fails a check against you.",
    fullText: `IMPRESSIVE SUPERIORITY
COMBAT, REACTION, SKILL
If an opponent misses you with an attack or fails a skill check against you, you can use your reaction for an immediate Impress action against that opponent. See Impress Checks in the Action & Adventure chapter.`
  },
  {
    name: "Improved Aim",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "When Aiming, gain Luck with your second die",
    conditionalSummary: "When Aiming, if either d20 rolls 10 or less, add +10 to the result.",
    fullText: `IMPROVED AIM
COMBAT
When you take the Aim action (see Aim under Actions in Chapter 8) if one of your two dice roll a 10 or less, you can add 10 to it, like a use of the Luck advantage. If both dice roll 10 or less, choose one and add 10 to it.

NORMAL: When you Aim you can roll two dice and take the better of the two rolls for your attack check.`
  },
  {
    name: "Improved Block",
    types: ["Combat"],
    ranked: true,
    maxRanks: 2,
    description: "+2 to attack checks to Block (+5 at rank 2)",
    conditionalSummary: "+2 bonus on attack checks to Block (+5 bonus at Rank 2).",
    fullText: `IMPROVED BLOCK
COMBAT, RANKED 2
When you perform a Block action (see Block under Actions in Chapter 8) you gain a +2 bonus to your attack check.

RANKED: With 2 ranks of this advantage, you gain a +5 bonus on your attack checks to Block.`
  },
  {
    name: "Improved Critical",
    types: ["Combat", "Focused"],
    ranked: true,
    maxRanks: 4,
    focused: true,
    description: "+1 critical threat range per rank with an attack (16-20 max)",
    conditionalSummary: "+1 Critical threat range per rank for chosen attack (19-20 at Rank 1 down to 16-20 at Rank 4).",
    fullText: `IMPROVED CRITICAL
COMBAT, FOCUSED, RANKED 4
One of your attacks is especially dangerous. Choose the attack when you configure this advantage. You score a Critical Hit with the chosen attack on a die roll of 19 or 20. Only a natural 20 is an Added Success, however, and an attack that misses is not a Critical Hit, regardless of the die roll. See Critical Hits under Attack in the Action and Adventure chapter.

FOCUSED: Each specific attack requires a separate Improved Critical advantage. Improved Critical can apply to an array of related attacks, but only benefits those that share a common theme and require an attack check.

RANKED: Each additional rank increases your chance of a Critical Hit with that attack by one more, to a maximum range of 16-20 with 4 ranks.`
  },
  {
    name: "Improved Defense",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "+5 to Defense with the Defend action",
    conditionalSummary: "Taking the Defend action grants +5 Defense (instead of +2).",
    fullText: `IMPROVED DEFENSE
COMBAT
When you take the Defend action, you gain a +5 bonus to your Defense until the start of your next turn.

NORMAL: When you take the Defend action, you gain a +2 bonus to your Defense until the start of your next turn.`
  },
  {
    name: "Improved Disarm",
    types: ["Combat"],
    ranked: true,
    maxRanks: 2,
    description: "+2 to attack checks to Disarm (+5 at rank 2)",
    conditionalSummary: "+2 bonus on attack checks to Disarm (+5 bonus at Rank 2).",
    fullText: `IMPROVED DISARM
COMBAT, RANKED 2
When you attempt a Disarm action, you gain a +2 bonus to your attack check.

NORMAL: With 2 ranks of this advantage, you gain a +5 bonus on your attack checks to Disarm.`
  },
  {
    name: "Improved Grab",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Only need one arm to Grab",
    conditionalSummary: "Initiate and maintain Grabs using only one arm.",
    fullText: `IMPROVED GRAB
COMBAT
When you take the Grab action you only need to use one arm. You can also maintain a Grab using only one arm. See Grab under Actions in Chapter 8.

NORMAL: Taking or maintaining the Grab action normally requires at least two arms.`
  },
  {
    name: "Improved Hold",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "-5 for opponents to Escape from your Grab",
    conditionalSummary: "Opponents suffer a -5 penalty on Escape checks against your Grabs.",
    fullText: `IMPROVED HOLD
COMBAT
Opponents you successfully Grab have a -5 penalty on their Escape action attempts. See Escape under Actions in Chapter 8.`
  },
  {
    name: "Improved Initiative",
    types: ["Combat"],
    ranked: true,
    maxRanks: "plHalf",
    description: "+4 to your Initiative per rank (max PL / 2)",
    conditionalSummary: "+4 to Initiative per rank.",
    fullText: `IMPROVED INITIATIVE
COMBAT, RANKED
You have a +4 to your Initiative rank. See Initiative in the Action & Adventure chapter.

RANKED: Each additional rank in Improved Initiative adds another +4 to your Initiative. You can have no more ranks in Improved Initiative than half the Power Level, rounded up.`
  },
  {
    name: "Improved Smash",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "No attack penalty with Smash action",
    conditionalSummary: "Ignore standard attack penalties when using the Smash action on held objects.",
    fullText: `IMPROVED SMASH
COMBAT
When taking the Smash action against an object held by another character, you have no penalty on your attack check. See Smash under Actions in Chapter 8.

NORMAL: You have up to a -5 penalty on your attack check with a Smash action.`
  },
  {
    name: "Improved Strike",
    types: ["Combat"],
    ranked: true,
    maxRanks: 20,
    description: "+1 close damage rank with Strength per rank",
    conditionalSummary: "+1 close Strength-based damage rank per rank.",
    fullText: `IMPROVED STRIKE
COMBAT
Your Damage rank with close combat attacks based on your Strength increases by +1, up to the Power Level limit.

RANKED: Each additional rank in Improved Strike increases your close attack Damage by +1.`
  },
  {
    name: "Improved Team Attack",
    types: ["Combat"],
    ranked: true,
    maxRanks: 2,
    description: "Contribute to Team Attacks beyond standard restrictions",
    conditionalSummary: "Contribute to Team Attacks even if not within 5 ranks (Rank 1) or with different effects (Rank 2).",
    fullText: `IMPROVED TEAM ATTACK
COMBAT, RANKED
You can contribute to a team attack even if your attack's effect rank is not within 5 of the other attacks.

NORMAL: You can only contribute to a team attack if your attack is the same effect as the other attacks and its rank is within 5 ranks of the other contributing attacks.

RANKED: If you have 2 ranks in this advantage, your attack does not even have to be the same effect as the other attacks, although the combined team attack still has the effect of the main attack.`
  },
  {
    name: "Improved Treatment",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Provide additional benefits using Treatment to revive",
    fullText: `IMPROVED TREATMENT
SKILL
When you use the Treatment skill to revive a subject, you can provide additional benefits. See Treatment in the Skills chapter for details. With a successful revive effort against the following Difficulty Classes, you can:

• DC 10: Remove one of the Dazed, Hit, or Impaired conditions. For each additional degree of success, you can remove an additional Hit condition. You can also choose to eliminate the effects of the Fatigued condition, but the condition itself remains until the character has rested.
• DC 15: Remove one of the Disabled or Stunned conditions. You can also choose to eliminate the effects of the Exhausted condition, but the condition itself remains until the character has rested.`
  },
  {
    name: "Improved Trip",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Choose which trait targets use to resist your Trip action",
    conditionalSummary: "You choose whether targets resist your Trip with Dodge or Strength.",
    fullText: `IMPROVED TRIP
COMBAT
When performing the Trip action you choose the trait your target uses to resist—Dodge or Strength—rather than the target choosing.

NORMAL: When performing the Trip action your target chooses the trait they use to resist being tripped. See Trip under Actions in Chapter 8.`
  },
  {
    name: "Improvised Effect",
    types: ["Heroic", "Skill", "Focused"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "Use a technical skill to prepare and use an effect",
    fullText: `IMPROVISED EFFECT
HEROIC, SKILL, FOCUSED
You can use a technical skill to prepare and use Improvised Effects. See Technical Skills in Chapter 4 and Improvised Effects in Chapter 6. Magic and Technology are the most common technical skills used with this advantage, but others may be available with the Game Master's approval, particularly Expertise skills.

FOCUSED: Each different skill you can use for Improvised Effects is a separate advantage. Your Improvised Effect advantages count towards your rank limit in heroic advantages.`
  },
  {
    name: "Improvised Tools",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "No penalty for using technical skills without tools",
    fullText: `IMPROVISED TOOLS
SKILL
You ignore penalties for using technical skills without proper tools, since you can improvise sufficient ones with whatever you have at hand. If you're forced to work without any tools for some reason, you still suffer only a -2 penalty.

NORMAL: You have a -5 penalty while attempting technical skill checks without proper tools.`
  },
  {
    name: "Improvised Weapons",
    types: ["Combat"],
    ranked: true,
    maxRanks: 20,
    description: "Use Close Combat: Unarmed skill and +1 damage per rank",
    conditionalSummary: "Use Close Combat: Unarmed for improvised weapons, plus +1 Damage rank per rank.",
    fullText: `IMPROVISED WEAPONS
COMBAT, RANKED
When wielding an improvised weapon in close combat, you can use your Close Combat: Unarmed skill bonus for attack checks with it.

RANKED: Each additional rank in this advantage gives you a +1 to Damage rank with improvised weapons. Your maximum Damage rank is limited by Power Level.

NORMAL: Improvised weapons use the Close Combat: Improvised Weapons skill, rather than the Unarmed focus.`
  },
  {
    name: "Inspiration",
    types: ["Command", "Fortune"],
    ranked: true,
    maxRanks: 5,
    description: "Use Command to give allies a +1 bonus per rank for one round",
    fullText: `INSPIRATION
COMMAND, FORTUNE, RANKED 5
You can inspire allies to greatness. Once per scene you can take a Command action and spend a Hero Point to grant every ally able to see or hear you a +1 bonus on all checks until the start of your next turn. This bonus is not limited by Power Level. You do not gain the bonus, only your allies do. Multiple uses of Inspire from different characters do not stack, only the highest bonus applies.

RANKED: The bonus granted to your allies improves by +1 for every additional Inspire rank you have to a maximum of 5 ranks.`
  },
  {
    name: "Instant Counter",
    types: ["General", "Reaction", "Focused"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "Use your reaction to counter an effect",
    fullText: `INSTANT COUNTER
GENERAL, REACTION, FOCUSED
You can use your reaction to counter a particular type of opposing effect with one of your own as if you had a Ready action to do so. The chosen effect must be limited to a particular type, such as a type of attack, a magical spell, a psionic power, and so forth. The Game Master approves if the effect is sufficiently defined for this advantage and should disallow any that are too broadly defined, such as all Damage effects, Afflictions, or all attacks, for examples. You also need to choose an effect you are using to counter, as usual, and its descriptors must suit the opposing effect you wish to counter. See Countering Effects in the Powers chapter for details.

FOCUSED: Each additional particular type of effect you can Instant Counter is a separate advantage.`
  },
  {
    name: "Instant Up",
    types: ["General"],
    ranked: false,
    maxRanks: 1,
    description: "Take the Stand action with no requirements",
    fullText: `INSTANT UP
GENERAL
When you take the Stand action you are not Hindered and can move at your full Speed Rank. See Stand under Actions in Chapter 8.`
  },
  {
    name: "Interpose",
    types: ["General", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction to interpose yourself in front of an attack",
    fullText: `INTERPOSE
GENERAL, REACTION
When an ally within range of your normal movement speed would be hit by an attack or affected by a hazard allowing a Dodge resistance check, you can use your reaction to move between the attack and your ally, making you the target instead.

You effectively grant your ally total cover against the attack or hazard, while it affects you normally. See Cover in the Action and Adventure chapter for details. For attacks, compare the attack check result against your Defense Class. For effects allowing a Dodge resistance check, you make the Dodge resistance check against the effect normally.`
  },
  {
    name: "Jack-of-All-Trades",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Use any skill other than Expertise or Languages untrained",
    fullText: `JACK-OF-ALL-TRADES
SKILL
You can use any skill other than Expertise or Languages untrained, even skills that normally cannot be used untrained, but you do not gain the benefits of having ranks in a skill in which you are untrained. See Untrained Skills in the Skills chapter.`
  },
  {
    name: "Know-It-All",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Use any Intellect-based Expertise untrained",
    fullText: `KNOW-IT-ALL
SKILL
You can use any Intellect-based Expertise skill untrained, including answering difficult questions, but you do not gain the benefits of having ranks in a skill in which you are untrained. See Untrained Skills and Expertise in the Skills chapter.`
  },
  {
    name: "Leadership",
    types: ["Command", "Fortune"],
    ranked: true,
    maxRanks: 10,
    description: "Command action and a Hero Point to grant an ally an advantage",
    fullText: `LEADERSHIP
COMMAND, FORTUNE, RANKED
Your leadership helps others try harder and achieve more. As a Command action, you can spend a Hero Point to immediately grant an ally able to see or hear you the benefits of a single advantage until the end of their next turn. For ranked advantages, they gain 1 rank, and you cannot grant fortune advantages in this way. Determination, Inspiration, and Luck are commonly-granted advantages, but you can grant any non-fortune advantage.

RANKED: For each additional rank, you can affect another ally with the same Command action by spending an additional Hero Point. You can grant different advantages to different allies when you do so.`
  },
  {
    name: "Luck",
    types: ["Heroic"],
    ranked: true,
    maxRanks: "heroicLimit",
    description: "Re-roll a die once per rank, adding +10 on a 1-10 roll",
    fullText: `LUCK
HEROIC, RANKED
Once per adventure, you can re-roll a d20 result you just rolled. If the die on your re-roll shows a 1-10, add +10 to the result, so the re-roll is always an 11-20.

RANKED: You can use Luck an additional time per adventure per additional rank in this advantage. Your maximum Luck rank is limited by your total ranks in heroic advantages. Your uses of Luck reset at the start of the next adventure.`
  },
  {
    name: "Menacing Attack",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction for Intimidation after incapacitating a foe",
    conditionalSummary: "Reaction: Immediate free-action Intimidation Impress check upon Incapacitating an opponent.",
    fullText: `MENACING ATTACK
COMBAT, REACTION
If you render an opponent Incapacitated—including Dying or Dead, at the GM's discretion—you can use your reaction for an immediate Impress action using Intimidation to Demoralize. See Impress Checks in the Action & Adventure chapter.`
  },
  {
    name: "Minion",
    types: ["General", "Focused"],
    ranked: true,
    maxRanks: 20,
    focused: true,
    description: "Gain a follower with (rank x 15) Power Points",
    fullText: `MINION
GENERAL, FOCUSED, RANKED
You have a non-player character minion who assists you. This minion has a Power Point total of (Minion advantage rank x 15) and the Minion traits given in the Minions section at the end of the Abilities chapter. Minions are subject to the normal series Power Level limits, and cannot have minions themselves, either through this advantage or otherwise.

Your minion automatically has a Helpful Attitude toward you and is considered your ally. Minions do not have or gain Hero Points, although you can use command advantages to benefit them, particularly Leadership. Any lost minions are replaced in between adventures with other followers with similar abilities at the Game Master's discretion. Game Masters may limit or even prohibit player characters from having this advantage.

MULTIPLE MINIONS: Rather than increasing Power Points available, you can allocate additional ranks of this advantage to double your number of minions per rank: 2, 4, 8, 16, and so forth. Your minions should be all of the same general type, such as human agents, infernal demons, undead, and so forth.

RANKED: Minions do not earn Power Points. Instead, you must spend your own earned Power Points to increase your rank in this advantage to improve the Minion's Power Point total and traits.

FOCUSED: Each type of Minion you have is a separate instance of this advantage.`
  },
  {
    name: "Partner Bond",
    types: ["Fortune", "Heroic", "Focused"],
    ranked: true,
    maxRanks: "heroicLimit",
    focused: true,
    description: "Grant a partner an advantage/Hero Point once per rank",
    fullText: `PARTNER BOND
FORTUNE, HEROIC, FOCUSED, RANKED
When you configure this advantage, choose one other character as your partner or teammate. Once per adventure, you can use your Partner Bond to grant that character the benefit of a Hero Point, with the additional ability to grant the benefits of fortune advantages (other than this one). To do so, you must be able to see your partner and they must be able to see or hear you. Characters often have reciprocal Partner Bond advantages with each other, but this is not required.

RANKED: You can use your Partner Bond an additional time per adventure per additional rank in this advantage. Your maximum Partner Bond rank is limited by your total ranks in heroic advantages. Your uses of Partner Bond reset at the start of the next adventure.

FOCUSED: You can have a Partner Bond with more than one character. Each Partner Bond is a separate advantage.`
  },
  {
    name: "Precise Shot",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Ignore penalties for Cover for ranged attacks",
    conditionalSummary: "Ignore penalties for less than total cover on ranged attacks.",
    fullText: `PRECISE SHOT
COMBAT
Your ranged attack checks ignore penalties for less than total cover.`
  },
  {
    name: "Precise Strike",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Ignore penalties for Cover for close attacks",
    conditionalSummary: "Ignore penalties for less than total cover on close attacks.",
    fullText: `PRECISE STRIKE
COMBAT
Your close attack checks ignore penalties for less than total cover.`
  },
  {
    name: "Prepared Effect",
    types: ["Heroic"],
    ranked: true,
    maxRanks: "heroicLimit",
    description: "One prepared Improvised Effect per rank per adventure",
    fullText: `PREPARED EFFECT
HEROIC, RANKED
At the start of each adventure, you have an already-prepared improvised effect (see Improvised Effects in Chapter 6) you can define and use during the adventure, but you are limited to effects you could have prepared with a routine check (see Routine Checks in Chapter 1). The improvised effect lasts for a scene, as usual, and then stops working. Your use of Prepared Effect renews at the start of each adventure.

RANKED: For each additional rank in this advantage, you have another already-prepared improvised effect, all of which renew at the start of each adventure. Your maximum Prepared Effect rank is limited by your total ranks in heroic advantages.`
  },
  {
    name: "Prone Fighting",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "No penalties for fighting while Prone",
    conditionalSummary: "No -5 attack penalty while Prone, and close attackers gain no bonus against you.",
    fullText: `PRONE FIGHTING
COMBAT
You do not have a -5 penalty to your close attack checks while Prone, and opponents do not gain a bonus on close attack checks against you. See the Prone condition in Chapter 1.

NORMAL: While Prone you have a -5 penalty to close attack checks and opponents gain a +5 bonus to close attack checks against you.`
  },
  {
    name: "Ranged Attack",
    types: ["Combat"],
    ranked: true,
    maxRanks: 20,
    description: "+1 to ranged attack checks per rank",
    fullText: `RANGED ATTACK
COMBAT, RANKED
You have a +1 bonus to all ranged attack checks. For bonuses with a single type of ranged attack, use the Ranged Combat Skill.

RANKED: Each additional rank increases your ranged attack check bonus by +1, up to the Power Level limit.`
  },
  {
    name: "Ranged Defense",
    types: ["Combat"],
    ranked: true,
    maxRanks: 20,
    description: "+1 to Defense against ranged attacks per rank",
    fullText: `RANGED DEFENSE
COMBAT, RANKED
You gain a +1 bonus to your Defense against ranged attacks.

RANKED: Each additional rank increases your Defense against ranged attacks by +1, up to the Power Level limit.`
  },
  {
    name: "Ranged Pin",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Use a ranged attack to pin and Restrain a target",
    conditionalSummary: "Target adjacent to a surface hit by a ranged attack is Restrained (DC 15 Escape).",
    fullText: `RANGED PIN
COMBAT
You can use a ranged weapon to pin an opponent to a nearby surface. The target must be adjacent to a suitable surface like a wall, tree trunk, or the like. Make an attack check against the target's Dodge DC. If the attack succeeds, the target is Restrained (Immobile and Vulnerable). To break free, the target must take an Escape action against a DC of 15, which removes the Restrained condition.`
  },
  {
    name: "Redirect",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction to redirect a missed attack at another target",
    conditionalSummary: "Reaction: Redirect a missed attack targeting you toward another visible target in range.",
    fullText: `REDIRECT
COMBAT, REACTION
If an attack check against you results in a miss, you can use your reaction to direct the missed attack at another target you can accurately perceive. The new target must be within range of the original attack. The Game Master rolls a new attack check using the attacker's check modifier against the new target.`
  },
  {
    name: "Reflexive Block",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction to Block",
    conditionalSummary: "Reaction: Perform a Block action that lasts until your next turn.",
    fullText: `REFLEXIVE BLOCK
COMBAT, REACTION
You can use your reaction to perform the Block action, which lasts until the start of your next turn.`
  },
  {
    name: "Reverse Hold",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "When you succeed on an Escape, you can Grab your opponent",
    conditionalSummary: "Reaction: Immediate opposed Grab check to hold your opponent upon successfully Escaping a Grab.",
    fullText: `REVERSE HOLD
COMBAT, REACTION
When you succeed on an Escape action against a Grab, you can use your reaction for an opposed Grab check against the opponent from whom you just escaped in order to try and put them into a hold. If you escaped from multiple opponents, choose one to attempt to Grab.`
  },
  {
    name: "Reviving Team Attack",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "When you participate in a Team Attack, remove a condition",
    conditionalSummary: "Remove Dazed or Stunned from an ally in a Team Attack instead of adding damage bonus.",
    fullText: `REVIVING TEAM ATTACK
COMBAT
Your teamwork lends support and inspires your allies. When you successfully contribute to a team attack, rather than adding a bonus to the attack's rank, you can choose to remove one of the Dazed or Stunned conditions from another character contributing to the team attack. You can remove one condition per degree of success on your team attack check, and can choose a different character or condition for each.`
  },
  {
    name: "Ricochet",
    types: ["Combat", "Focused"],
    ranked: true,
    maxRanks: 10,
    focused: true,
    description: "Bounce a ranged attack off surfaces (+1 bounce per rank)",
    conditionalSummary: "Bounce a chosen ranged attack off surfaces (+1 bounce per rank) to bypass cover.",
    fullText: `RICOCHET
COMBAT, FOCUSED, RANKED
You can "bounce" a ranged attack, chosen when this advantage is configured, off of surfaces, even other characters, to make trick shots, avoid cover, or change its direction. Your attack can bounce once before hitting your target. Determine cover from the last bounce to the target. The bounce doesn't harm the surface it hits, and an attack with Ricochet can't damage multiple targets at once.

FOCUSED: Each different ranged attack you can Ricochet is a separate advantage.

RANKED: For each additional rank in this advantage, you can bounce your attack an additional time before it hits its target.`
  },
  {
    name: "Riposte",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction to make a close attack when missed",
    conditionalSummary: "Reaction: Immediate close attack against an opponent who misses you with a close attack.",
    fullText: `RIPOSTE
COMBAT, REACTION
If an opponent misses you with a Close Attack, you can use your reaction to make an immediate Close Attack against them.`
  },
  {
    name: "Rush of Victory",
    types: ["Combat", "Command", "Fortune", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Spend a Hero Point for allies to Recover when you Incapacitate a foe",
    conditionalSummary: "Spend a Hero Point when Incapacitating a foe to allow all visible allies to take a free Recover action.",
    fullText: `RUSH OF VICTORY
COMBAT, COMMAND, FORTUNE, REACTION
If you render a non-Minion opponent Incapacitated—including Dying or Dead, at the GM's discretion—you can spend a Hero Point to allow all allies able to see or hear you to use their reaction to Recover, even if they have already taken the Recover action in this Scene.`
  },
  {
    name: "Seize Initiative",
    types: ["Fortune"],
    ranked: false,
    maxRanks: 1,
    description: "Spend a Hero Point to go first in the Initiative Order",
    fullText: `SEIZE INITIATIVE
FORTUNE
When making an Initiative check, you can spend a Hero Point to automatically go first in the Initiative Order (see Initiative in the Action and Adventure chapter). You may only do so at the start of combat, when you would normally make your Initiative check. If more than one character uses Seize Initiative at the same time, everyone who used it makes Initiative checks normally and acts in Initiative Order before everyone else, then all the remaining characters who did not use this advantage act in Initiative Order.`
  },
  {
    name: "Set-Up",
    types: ["Combat"],
    ranked: true,
    maxRanks: 10,
    description: "Transfer Feint/Impress combat benefits to allies",
    conditionalSummary: "Transfer the combat benefits of a successful Feint or Impress check to one or more allies (+1 ally per rank).",
    fullText: `SET-UP
COMBAT, RANKED
You can transfer the benefits of a successful Feint or Impress check to one of your allies able to see or hear you. See those actions in the Action and Adventure chapter, for details. For example, you can Feint and have your target Vulnerable to your ally's next attack, rather than yours.

RANKED: Each additional Rank in Set-Up lets you simultaneously transfer the benefit to an additional ally, including yourself, meaning both you and one or more allies gain the benefit of the Feint or Impress action.`
  },
  {
    name: "Sidekick",
    types: ["General", "Focused"],
    ranked: true,
    maxRanks: 20,
    focused: true,
    description: "Gain a sidekick with (5 x rank) Power Points",
    fullText: `SIDEKICK
GENERAL, FOCUSED, RANKED
You have a Sidekick, a non-player character serving as your ally, partner, or aide. Create your Sidekick as an independent character with (Sidekick advantage rank x 5) Power Points, and subject to the series Power Level. Your Sidekick's Attitude is automatically Helpful towards you. Game Masters should generally allow you to control your Sidekick, although Sidekicks remain NPCs and the GM has final say in their actions.

Sidekicks do not have Hero Points, but you can spend your own Hero Points on the Sidekick's behalf as if you had the Leadership advantage solely for them. Sidekicks are not minions, but full-fledged characters, so they are not subject to the Minion guidelines in Chapter 1.

RANKED: Sidekicks do not earn Power Points. Instead, you must spend earned Power Points to increase your rank in this advantage to improve the Sidekick's Power Point total and traits; each additional rank grants the Sidekick 5 additional power points.`
  },
  {
    name: "Skill Expertise",
    types: ["Skill", "Focused"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "Roll two dice for a skill specialization, taking the better",
    fullText: `SKILL EXPERTISE
SKILL, FOCUSED
Choose a skill specialization for one of your trained skills. You may roll two dice when making skill checks with that specialization, taking the better of the two rolls for your check result.

FOCUSED: Skill Expertise with each skill specialization is a separate advantage, including the different specializations of the same skill.`
  },
  {
    name: "Skill Mastery",
    types: ["Skill", "Focused"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "Make routine checks with a chosen skill under pressure",
    fullText: `SKILL MASTERY
SKILL, FOCUSED
Choose one of your trained skills. You can make routine checks with that skill even while under pressure (see Routine Checks in The Basics chapter). This advantage does not allow you to make routine checks with skills that do not normally allow them.

FOCUSED: Skill Mastery with each skill is a separate advantage.`
  },
  {
    name: "Sleeper Hold",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Use a Grab to Incapacitate a target",
    conditionalSummary: "Maintain a Grab with Concentrate to force Fortitude checks vs (10 + STR): Dazed, Stunned, Asleep.",
    fullText: `SLEEPER HOLD
COMBAT
With a successful Grab action, you can put a target into a hold designed to knock them out. After winning an opposed Grab check, you can take the Concentrate action on your next turn to maintain the grab and force the held target to make a Fortitude resistance check against a DC of (10 + your Strength rank):

• SUCCESS: No effect.
• FAILURE (ONE DEGREE): The target is Dazed.
• FAILURE (TWO DEGREES): The target is Stunned.
• FAILURE (THREE DEGREES): The target is Asleep.

On subsequent turns, you can continue to take the Concentrate action to maintain the sleeper hold, requiring a new resistance check from the target: Success means no additional effect. Failure means the effect increases by one degree. When the sleeper hold ends, targets can roll a new Fortitude resistance check at the end of each of their turns to remove the Dazed or Stunned condition. Sleeping targets get a Fortitude resistance check each minute to wake up unless they're deliberately awakened.

Sleeper Hold has no effect on targets with Fortitude Immunity or with Hardened or Impervious Toughness equal to or greater than your Strength rank.`
  },
  {
    name: "Snap Shot",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction for a ranged attack at -5",
    conditionalSummary: "Reaction: Make a ranged attack at -5 when a target moves within range.",
    fullText: `SNAP SHOT
COMBAT, REACTION
When a target moves and is within range of your ranged attack, you can use your reaction to make a ranged attack against the target, with a -5 penalty on the attack check.`
  },
  {
    name: "Split Attack",
    types: ["Combat", "Ranked", "Focused"],
    ranked: true,
    maxRanks: 5,
    focused: true,
    description: "Split an attack into multiple smaller attacks",
    conditionalSummary: "Divide a chosen attack's rank between 2 targets (+1 target per additional rank).",
    fullText: `SPLIT ATTACK
COMBAT, RANKED, FOCUSED
Choose a specific attack that you have. When you take the Attack action, you can divide that attack between two different targets. This usually represents rapid, but less forceful, attacks in order to hit more than one target. Divide the attack's effect rank between the two targets as you wish and make an attack check for each target. The attack works on each target normally at its reduced rank. An attack's effect cannot split to less than 1 rank per target, and cannot attack the same target more than once per Attack action.

RANKED: Each additional rank of this advantage allows you to split an attack an additional time, so rank 2 lets you split an attack among three targets, then four, and so forth.

FOCUSED: Each specific attack you can use Split Attack with is a separate advantage.`
  },
  {
    name: "Startling Intimidation",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Use Intimidation in place of Deception for an impress check",
    fullText: `STARTLING INTIMIDATION
SKILL
You can use your Intimidation skill in place of Deception for an Impress action to Distract a target. See the Deception skill description and Impress Checks in the Action and Adventure chapter.`
  },
  {
    name: "Stunning Strike",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Close unarmed attack can stun instead of damage",
    conditionalSummary: "Close unarmed hit forces Fortitude check vs (10 + STR): Dazed, Stunned, Incapacitated.",
    fullText: `STUNNING STRIKE
COMBAT
When you make an unarmed attack in close combat, instead of inflicting damage, you can choose to have your target make a Fortitude resistance check against a DC of (10 + your Strength rank):

• SUCCESS: No effect.
• FAILURE (ONE DEGREE): The target is Dazed.
• FAILURE (TWO DEGREES): The target is Stunned.
• FAILURE (THREE DEGREES): The target is Incapacitated.

Targets can roll a new Fortitude resistance check at the end of each of their turns to remove the Dazed or Stunned condition. Incapacitated targets get a Fortitude resistance check each minute to recover and remove the condition. Stunning Strike has no effect on targets with Fortitude Immunity.`
  },
  {
    name: "Surprise Attack",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Greater effect when attacking a Surprised or Defenseless target",
    conditionalSummary: "+5 to the resistance DC of attacks made against Surprised or Defenseless targets.",
    fullText: `SURPRISE ATTACK
COMBAT
If you successfully attack a Surprised or Defenseless target and do not have any penalties on your attack check, you increase the resistance DC of your attack by +5.`
  },
  {
    name: "Swift Strike",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Use your reaction for a close attack at -5",
    conditionalSummary: "Reaction: Make a close attack at -5 when a target moves into reach.",
    fullText: `SWIFT STRIKE
COMBAT, REACTION
When a target moves into range of your close attack, you can use your reaction to make an immediate close attack against them with a -5 penalty on your check.`
  },
  {
    name: "Tactical Advance",
    types: ["Combat", "Command", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "When you Daze or Stun, allies can move towards the target",
    conditionalSummary: "Reaction: When you Daze or Stun a target, aware allies can use reactions to Move toward it.",
    fullText: `TACTICAL ADVANCE
COMBAT, COMMAND, REACTION
When you impose the Dazed or Stunned condition on an opponent, allies able to see or hear you can use their reaction for a Move action to move towards that opponent.`
  },
  {
    name: "Tactical Genius",
    types: ["General"],
    ranked: false,
    maxRanks: 1,
    description: "Use Intellect instead of Presence for Command advantages",
    fullText: `TACTICAL GENIUS
GENERAL
Your limit for command advantages is your Intellect rank rather than your Presence rank. See Command Advantages under Ranked Advantages at the start of this chapter.`
  },
  {
    name: "Tactical Training",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Perform deception/intimidation actions with Expertise: Tactics",
    conditionalSummary: "Perform Distract, Innuendo, Trick, and Demoralize checks using Expertise: Tactics.",
    fullText: `TACTICAL TRAINING
COMBAT
Having trained alongside teammates, you work together in combat like a well-oiled machine. You may perform the Distracting, Innuendo, and Tricking actions of the Deception skill and the Demoralizing action of the Intimidation skill using the Expertise: Tactics skill instead. You may only share the benefits of these actions with other characters—sending coded messages with Innuendo or transferring the benefits of a Distracting Impress action using the Set-up advantage—if those characters also have this advantage and have trained with you previously.`
  },
  {
    name: "Takedown",
    types: ["Combat"],
    ranked: true,
    maxRanks: 2,
    description: "Free extra attack when you Incapacitate a minion",
    conditionalSummary: "Free extra attack against adjacent minion when incapacitating a minion. Rank 2 allows moving between attacks.",
    fullText: `TAKEDOWN
COMBAT, RANKED 2
If you Incapacitate a Minion with an attack, you can make an immediate extra Attack action against another Minion within range and adjacent to the previous target as a free action. The extra attack uses the same attack and check modifier as the first. If you continue to Incapacitate Minions, you can continue making extra attacks as free actions until you fail to Incapacitate a target or there are no more valid targets you can attack.

RANKED: A second rank in this advantage allows you to attack non-adjacent Minion targets, including moving between attacks if necessary to do so. You cannot move more than your total movement speed in the round, regardless of the number of attacks you make. You stop attacking once you miss or there are no more valid targets you can attack.`
  },
  {
    name: "Taunting Interaction",
    types: ["Skill", "Focused"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "Make an impress check to Impair or Disable an opponent",
    fullText: `TAUNTING INTERACTION
SKILL, FOCUSED
You can use an interaction skill for an Impress action to inflame an opponent's emotions so they make mistakes and are less effective. See Impress Checks in the Action & Adventure chapter. If you succeed on your impress check, the target is Impaired, Disabled with two or more degrees of failure. The target makes a new resistance check at the end of each of their Turns, with success removing the condition.

FOCUSED: Taunting with each interaction skill is a separate advantage: Taunting Deception, Taunting Intimidation, Taunting Performance, Taunting Persuasion.`
  },
  {
    name: "Team Code",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Tactical communication with teammates",
    fullText: `TEAM CODE
SKILL
You and any other members of a team with this advantage share a knowledge of various code words, pre-planned maneuvers, and so forth, allowing you to quickly and easily communicate tactical plans without being overheard. In play, you can make tactical plans with other players as a free action and sum up those plans as a code word or phrase like "Maneuver 14" or "Orbital Strike." You also gain a +5 bonus for Deception and Insight checks to use Innuendo to communicate tactical information with other members of your team.`
  },
  {
    name: "Teamwork",
    types: ["General"],
    ranked: false,
    maxRanks: 1,
    description: "+5 on Team Checks",
    fullText: `TEAMWORK
GENERAL
You're especially effective at helping your teammates. When you support a team check you have a +5 bonus on your check. This bonus also applies to the Aid action and to team attacks. See Team Checks in The Basics chapter and Aid and Team Attack under Actions in the Action & Adventure chapter for details.`
  },
  {
    name: "Throwing Mastery",
    types: ["Combat"],
    ranked: true,
    maxRanks: 20,
    description: "+1 damage with thrown weapons per rank",
    conditionalSummary: "+1 Damage rank with thrown weapons per rank. Throw tiny objects as Damage 1 weapons.",
    fullText: `THROWING MASTERY
COMBAT, RANKED
You have a +1 bonus to Damage rank with thrown weapons. You can also throw normally harmless small objects—playing cards, pens, paper clips, and so forth—as Damage 1 throwing weapons. Your maximum Damage bonus with any given weapon or attack is still limited by Power Level.

RANKED: Each additional rank in Throwing Mastery increases your Damage bonus by +1.`
  },
  {
    name: "Tough",
    types: ["General"],
    ranked: true,
    maxRanks: 20,
    description: "+1 Toughness per rank",
    fullText: `TOUGH
GENERAL, RANKED
Increase your Toughness rank by +1, to a maximum of your Power Level limit.

RANKED: Each additional rank in Tough increases your Toughness rank by +1, to a maximum of your Power Level limit. The Game Master may set a reasonable rank limit on this advantage, usually 2-4, depending on the series style.`
  },
  {
    name: "Tracking",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Use Perception or Survival for tracking",
    fullText: `TRACKING
SKILL
You're a skilled tracker. You can use the Perception or Survival skills to follow tracks with an acute sense like the Tracking effect of Enhanced Senses in the Powers chapter.`
  },
  {
    name: "Trance",
    types: ["General"],
    ranked: false,
    maxRanks: 1,
    description: "Go into a deathlike trance and slow body functions",
    fullText: `TRANCE
GENERAL
With a minute of meditation and a DC 15 Awareness check, you can slip into a deep trance. While in the trance add your Awareness rank to your Stamina rank to determine how long you can hold your breath and you use the higher of your Fortitude or Will Defenses for resistance checks against suffocation, disease, poison, and other biological hazards. Poison and disease effects can also be suspended for the duration of the trance.

It requires a Perception check opposed by your Awareness check result to determine you're not actually dead. You are aware of your surroundings while in trance and can come out of it at any time at will as a simple action. You cannot take any actions while in the trance, but your GM may allow conversation via Mental Communication or a Communication Link. See the Communication and Enhanced Senses effects in the Powers chapter.`
  },
  {
    name: "Ultimate Effort",
    types: ["Fortune", "Heroic", "Focused"],
    ranked: false,
    maxRanks: 1,
    focused: true,
    description: "Spend a Hero Point to gain a 20 roll on a check",
    fullText: `ULTIMATE EFFORT
FORTUNE, HEROIC, FOCUSED
You can always do your best at some particular task when it really matters. Pick a specific type of check: attack checks with a specific attack, resistance checks with one Defense, or skill checks with one non-combat Skill, approved by the GM. You can spend a Hero Point on your chosen check to skip rolling the die and just treat the result as a 20 plus your check modifier. This is not a natural 20, and so does not count as an added success. This advantage must be used before you choose to roll the die for a check.

The following are some example Ultimate Efforts. Your Game Master may approve others:

• ULTIMATE AIM: When you take the Aim action with any attack, you can spend a Hero Point to apply a 20 result to the attack check. Since the Ultimate Aim bonus is not a natural 20, it does not qualify as a Critical Hit.
• ULTIMATE ATTACK: When you make an attack check with a specific attack, you can spend a Hero Point to apply a 20 result to the attack check. Since the Ultimate Attack bonus is not a natural 20, it does not qualify as a Critical Hit.
• ULTIMATE RESISTANCE: You can spend a Hero Point to apply a 20 result to a resistance check with one Defense, such as Ultimate Toughness or Ultimate Will.
• ULTIMATE SKILL: You can spend a Hero Point to apply a 20 result to checks with one particular Skill, such as Ultimate Investigation or Ultimate Stealth.

FOCUSED: You can take Ultimate Effort multiple times to apply its benefits to different specific checks, choosing a different check each time. Your maximum Ultimate Effort advantages are limited by your total ranks in heroic advantages.`
  },
  {
    name: "Uncanny Dodge",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Not Vulnerable when Surprised",
    conditionalSummary: "Retain full Defense when Surprised or caught off-guard.",
    fullText: `UNCANNY DODGE
COMBAT
You are especially attuned to danger. You are not Vulnerable when Surprised or otherwise caught off-guard. You can still be made Vulnerable by effects or situations that limit your mobility.`
  },
  {
    name: "Untapped Potential",
    types: ["Heroic"],
    ranked: true,
    maxRanks: "heroicLimit",
    description: "Gain +2 ranks (or +1 per additional rank) from Extra Effort",
    fullText: `UNTAPPED POTENTIAL
HEROIC
When you use Extra Effort to increase an effect's rank, you gain 2 ranks rather than just 1. As with other uses of Extra Effort, this rank increase is not subject to Power Level limits. See Extra Effort in The Basics chapter.

RANKED: Each additional rank adds 1 to the increase in power rank you gain from Extra Effort. Your maximum Untapped Potential rank is limited by your total ranks in heroic advantages.`
  },
  {
    name: "Up and At 'Em",
    types: ["Combat", "Command"],
    ranked: false,
    maxRanks: 1,
    description: "Command action to allow allies to Stand with Instant Up",
    conditionalSummary: "Command action allows all aware allies to Stand immediately without being Hindered.",
    fullText: `UP AND AT 'EM
COMBAT, COMMAND
You can take a Command action to allow all allies able to see or hear you to immediately Stand as if they had the Instant Up advantage. See the Stand action in the Action and Adventure chapter and Instant Up in this chapter.`
  },
  {
    name: "Variable Team Attack",
    types: ["Combat"],
    ranked: false,
    maxRanks: 1,
    description: "Apply a Variable Descriptor to a Team Attack",
    conditionalSummary: "Apply a 1-point (or 2-point on 3+ degrees) Variable Descriptor to a Team Attack.",
    fullText: `VARIABLE TEAM ATTACK
COMBAT
When you successfully contribute to a Team Attack, rather than adding a bonus to the attack's rank, you can apply a 1-point Variable Descriptor to the attack's effect. If your team attack check has three or more degrees of success, you can apply a 2-point Variable Descriptor instead. See Variable Descriptor in the Extras section of the Powers chapter.`
  },
  {
    name: "Weapon Bind",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Reaction Disarm when missed with a weapon attack",
    conditionalSummary: "Reaction: Immediate Disarm check against an attacker who misses you with a weapon attack.",
    fullText: `WEAPON BIND
COMBAT, REACTION
If a close attack with a weapon misses you, you can use your reaction for an immediate Disarm action against the attacker. See Disarm in the Action & Adventure chapter.`
  },
  {
    name: "Weapon Break",
    types: ["Combat", "Reaction"],
    ranked: false,
    maxRanks: 1,
    description: "Reaction Smash when missed with a weapon attack",
    conditionalSummary: "Reaction: Immediate Smash check against the attacker's weapon when missed in close combat.",
    fullText: `WEAPON BREAK
COMBAT, REACTION
If a close attack with a weapon misses you, you can use your reaction for an immediate Smash action against the attacker's weapon. See Smash in the Action & Adventure chapter.`
  },
  {
    name: "Well-Equipped",
    types: ["Heroic"],
    ranked: true,
    maxRanks: "heroicLimit",
    description: "Produce one item or 5 points of Equipment per adventure",
    fullText: `WELL-EQUIPPED
HEROIC, RANKED
You are well-equipped and prepared for every situation. Once per adventure, you can have a single piece of Equipment "on-hand" so long as it is within your allotment of Equipment Points, or worth 5 Equipment Points or less, if you do not have the Equipment advantage. See On-Hand Equipment in the Equipment chapter for more details.

RANKED: For each additional rank in this advantage, you can use it an additional time per adventure. Your maximum Well-Equipped rank is limited by your total ranks in heroic advantages. Your uses of Well-Equipped reset at the start of the next adventure.`
  },
  {
    name: "Well-Informed",
    types: ["Skill"],
    ranked: false,
    maxRanks: 1,
    description: "Immediate skill check for available information",
    fullText: `WELL-INFORMED
SKILL
You are exceptionally well-informed. When encountering an individual, group, or organization for the first time, you can make an immediate Investigation or Persuasion check to see if your character has already heard something about them. You can do this as a routine check, if you wish. Use the guidelines for gathering information from the Investigation skill in the Skills chapter to determine the level of information you gain. You receive only one check per subject when you first encounter them. Your Game Master may allow another check if you encounter the subject again after a significant amount of time has passed, or if you choose to spend a Hero Point to gain an additional check.`
  }
];
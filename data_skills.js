// Unabridged 4th Edition Skills Master Table

const SKILLS_LIST = [
  {
    name: "Acrobatics",
    ability: "AGL",
    untrained: true,
    action: "Simple or Free",
    specializations: ["Balancing", "Contorting", "Maneuvering", "Standing", "Tumbling"],
    relatedAdvantages: ["Instant Up", "Skill Expertise", "Skill Mastery"],
    fullText: `ACROBATICS[cite: 2]
AGILITY[cite: 2]
SPECIALIZATIONS: Balancing, Contorting, Maneuvering, Standing, Tumbling[cite: 2]

Use Acrobatics to flip, dive, roll, tumble, and perform other acrobatic maneuvers, as well as keep your balance under difficult circumstances[cite: 2].

BALANCING[cite: 2]
You can make an Acrobatics check to keep your balance during hazardous movement[cite: 2]. A degree of failure means you spend your Move action just maintaining your balance and do not actually move, while two or more degrees of failure means you lose your balance and fall[cite: 2]. See Falling and Hazardous Movement under Environmental Hazards in Chapter 8 for details[cite: 2].
You are both Hindered and Vulnerable while balancing[cite: 2]. You can ignore either condition for a +5 increase to your Acrobatics DC, +10 for both[cite: 2]. If you fail a resistance check while balancing, make an immediate Acrobatics check against the original DC to avoid falling[cite: 2].

CONTORTING[cite: 2]
Make a DC 25 Acrobatics check as part of a Move action to fit through a tight space wide enough for your head but too narrow for the width of your shoulders, or to reach through an opening wide enough for your hand, but too narrow for your arm[cite: 2]. Failure means you make no progress that turn and don't actually move, while two or more degrees of failure mean you can't try again without Extra Effort and might actually become stuck and Immobilized, at the GM's discretion, until you're able to make a DC 15 or greater Acrobatics check to get free[cite: 2].

MANEUVERING[cite: 2]
A DC 15 Acrobatics check may allow you to ignore the Hindered condition imposed by certain kinds of terrain, if you can flip, tumble, or otherwise acrobatically maneuver around or through it[cite: 2]. A failed check means you spend your Move action making no progress, while two or more degrees of failure cause you to fall Prone[cite: 2].

STANDING[cite: 2]
A DC 20 Acrobatics check lets you take the Stand action, removing the Prone Condition, without becoming Hindered that round[cite: 2]. See Stand under Actions in Chapter 8[cite: 2]. If you fail the check, you are still Hindered if you Stand that turn[cite: 2]. Two or more degrees of failure mean you waste your simple action and remain Prone[cite: 2]. To do this automatically without an Acrobatics check, take the Instant Up advantage[cite: 2].

TUMBLING[cite: 2]
You can make a DC 5 Acrobatics check to lessen damage from a fall, reducing the damage by 1 rank per degree of success[cite: 2]. A fall reduced to rank 0 damage does no damage and you quickly roll to or land on your feet as a free action[cite: 2]. Otherwise, you are Prone at the end of a fall[cite: 2].`
  },
  {
    name: "Athletics",
    ability: "STR",
    untrained: true,
    action: "Simple",
    specializations: ["Climbing", "Jumping", "Running", "Swimming"],
    relatedAdvantages: ["Great Endurance", "Skill Expertise", "Skill Mastery"],
    fullText: `ATHLETICS[cite: 2]
STRENGTH[cite: 2]
SPECIALIZATIONS: Climbing, Jumping, Running, Swimming[cite: 2]

Use Athletics for physical feats like climbing, jumping, and swimming[cite: 2].

CLIMBING[cite: 2]
With a successful Athletics check, you can climb along a slope, wall, or other steep incline[cite: 2]. A perfectly smooth, flat, vertical surface can't be climbed without the Wall-Crawling effect of Enhanced Movement[cite: 2].
A failed Athletics check indicates you make no progress, and two or more degrees of failure means you fall from whatever height you attained, unless you are secured with a safety harness or other equipment[cite: 2].
If you fall, you can make an Athletics resistance check to catch yourself with a DC equal to the initial check DC + 10[cite: 2]. Someone else within arm's reach can also make an Athletics check to catch you with the same DC[cite: 2]. You are Vulnerable while climbing unless you accept a +5 increase in the DC[cite: 2]. Any time you fail a resistance check while climbing, make an immediate Athletics check against the DC of the climb; failure means you fall[cite: 2].

JUMPING[cite: 2]
You can jump distance rank 0 as a running long-jump, essentially moving Speed 1 and then jumping the distance as one Move action[cite: 2]. You can jump distance rank -1 as a standing long-jump with no initial movement and make a vertical jump of distance rank -2[cite: 2]. Every degree of success on a DC 15 Athletics skill check increases jumping distance ranks by 1, to a maximum of +3[cite: 2].

RUNNING[cite: 2]
You can make a DC 15 Athletics check as part of your Move action to run faster: success increases your ground speed rank by +1 until the start of your next turn, failure doesn't affect your speed, but two or more degrees of failure cause you to collide with an obstacle and fall prone, or simply fall prone if there are no obstacles in your path[cite: 2].

SWIMMING[cite: 2]
You can make a DC 10 Athletics check to swim at speed rank 0, higher DC for especially choppy or difficult waters[cite: 2]. Each degree of success after the first on your Athletics check increases swim speed rank by +1 for one round, to a maximum of your ground speed rank (normally 2)[cite: 2]. With more than one degree of failure, you go under[cite: 2]. While underwater, you must hold your breath to avoid drowning[cite: 2].`
  },
  {
    name: "Close Combat",
    ability: "ATK",
    untrained: true,
    action: "Standard",
    focused: true,
    focuses: ["Array", "Blades", "Bludgeons", "Disarming", "Grabbing", "Tripping", "Unarmed"],
    specializations: ["Hammers", "Knives", "Swords", "Specific Weapon"],
    relatedAdvantages: ["Close Attack", "Improved Critical", "Improvised Weapons", "Skill Expertise"],
    fullText: `CLOSE COMBAT[cite: 2]
ATTACK FOCUSED COMBAT[cite: 2]
FOCUSES: Array, Blades, Bludgeons, Disarming, Grabbing, Tripping, Unarmed[cite: 2]
SPECIALIZATIONS: by specific weapon or attack, such as Hammers, Knives, Swords, and so forth[cite: 2].

You're trained with a particular type of close attack, giving you a bonus to your attack checks with it equal to your skill rank[cite: 2]. See Attack Check in The Basics and in the Action and Adventure chapter[cite: 2].
Each type of close attack is a separate Close Combat skill with its own rank, and encompasses a single type of attack, effect, or weapon, although an Array may also be a focus for this skill, at the Game Master's discretion[cite: 2].

The Unarmed focus is for unarmed strikes like punches and kicks, but does not apply to other forms of unarmed combat maneuvers, including, but not limited to, grabbing or tripping, which have their own focuses[cite: 2].
The bonus from a Close Combat skill applies only to attack checks with the particular attack[cite: 2].`
  },
  {
    name: "Deception",
    ability: "PRE",
    untrained: true,
    action: "Standard",
    specializations: ["Bluffing", "Disguise", "Distracting", "Innuendo", "Tricking"],
    relatedAdvantages: ["Alternate Feint", "Dazing Interaction", "Fascinating Interaction", "Fast Feint", "Taunting Interaction", "Tactical Training", "Team Code"],
    fullText: `DECEPTION[cite: 2]
PRESENCE INTERACTION[cite: 2]
SPECIALIZATIONS: Bluffing, Disguise, Distracting, Innuendo, Tricking[cite: 2]

Deception is the skill of getting others to believe what you want them to believe[cite: 2]. It covers things like acting, bluffing, fast-talk, trickery, and subterfuge[cite: 2].

BLUFFING[cite: 2]
Make a Deception check to tell a believable lie[cite: 2]. A bluff is opposed by the target's Deception or Insight check and circumstances weigh heavily on the outcome[cite: 2].

DISTRACTING[cite: 2]
You can use Deception for an impress check to distract an opponent in combat[cite: 2]. See Impress Checks in the Action and Adventure chapter[cite: 2]. If your check succeeds, your target is Vulnerable to your attacks, Defenseless with two or more degrees of success[cite: 2]. Targets get a new resistance check at the end of each of their turns to remove the condition[cite: 2].
You can also use Deception for an impress check to distract someone sufficiently to allow you to Hide from them[cite: 2].

INNUENDO[cite: 2]
You can use Deception to send covert messages using word-play and double-meanings in conversation while apparently talking about other things[cite: 2]. The DC for a basic message is 10, complex is 15, and detailed is 20[cite: 2]. The intended recipient of the message must make a Deception or Insight check against the same DC to understand it[cite: 2].

TRICKING[cite: 2]
You can use Deception in combat for a Trick maneuver to mislead an opponent into taking a potentially unwise action[cite: 2]. See Trick in the Action and Adventure chapter for details[cite: 2].`
  },
  {
    name: "Disguise",
    ability: "AWE",
    untrained: true,
    action: "None",
    specializations: ["By disguise type"],
    relatedAdvantages: ["Skill Expertise", "Skill Mastery"],
    fullText: `DISGUISE[cite: 2]
AWARENESS MANIPULATION TECHNICAL[cite: 2]
SPECIALIZATIONS: By disguise type[cite: 2].

You can use makeup, costumes, and other props to alter your appearance[cite: 2]. Your Disguise check result determines the effectiveness of the disguise, opposed by others' Perception check results[cite: 2]. The GM makes Perception checks immediately when others first encounter your disguise and each hour or day thereafter, depending on circumstances[cite: 2]. The GM makes the Disguise check secretly so you are not sure exactly how well your disguise holds up under scrutiny[cite: 2].

If you are impersonating a particular individual, anyone who knows that individual gets a bonus to the Perception check: regular associates get a +2, while friends get a +5 and intimate loved ones a +10[cite: 2].
Successfully acting like who you appear to be requires a Deception check with a DC equal to the observer's Deception or Insight check, modified by familiarity if the observer knows the subject well[cite: 2].
A disguise normally requires at least time rank 6 (8 minutes) of preparation and can be done as a routine check[cite: 2]. You can speed up the process by 1 time rank for every -5 penalty you take to the Deception check[cite: 2].`
  },
  {
    name: "Expertise",
    ability: "INT",
    untrained: false,
    action: "None",
    focused: true,
    focuses: ["Art", "Business", "Carpentry", "Cooking", "Criminal", "Current Events", "History", "Journalism", "Law", "Law Enforcement", "Medicine", "Military", "Music", "Philosophy", "Politics", "Popular Culture", "Psychiatry", "Science", "Sociology", "Streetwise", "Survival", "Theology"],
    specializations: ["By area of expertise"],
    relatedAdvantages: ["Know-It-All", "Jack-of-All-Trades", "Skill Expertise", "Skill Mastery"],
    fullText: `EXPERTISE[cite: 2]
INTELLECT FOCUSED TRAINED ONLY[cite: 2]
FOCUSES: Specialization required (see description)[cite: 2]
SPECIALIZATIONS: By area of expertise[cite: 2].

Expertise is a broad area of skills encompassing knowledge and training in a variety of specialized fields, particularly professional disciplines and scholarship[cite: 2]. Each is considered a separate skill and training in each is acquired separately[cite: 2].

SPECIALIZATION[cite: 2]
Because Expertise is so broad, specialization is required for it: So 1 Power Point buys 4 ranks in Expertise Skills, rather than just 2[cite: 2]. As with all other skills, all 4 ranks don't have to be assigned to the same area of Expertise[cite: 2].

KNOWLEDGE[cite: 2]
You can make Expertise checks to see if your character knows the answer to a particular question related to the area of expertise[cite: 2]. The DC is 10 for easy questions, 15 for basic questions, and 20 or higher for difficult questions[cite: 2].

PROFESSION[cite: 2]
If you are trained in an Expertise, you can practice it professionally[cite: 2]. You know how to use the tools of that trade, perform the profession's daily tasks, supervise untrained helpers, and handle common problems[cite: 2].

TECHNICAL EXPERTISE[cite: 2]
Some Expertise skills may count as technical skills: Requiring suitable tools and allowing characters to operate, construct, repair, and disable certain items[cite: 2].`
  },
  {
    name: "Insight",
    ability: "AWE",
    untrained: true,
    action: "Free",
    specializations: ["Avoid Influence", "Detect Falsehood", "Detect Influence", "Evaluate", "Innuendo"],
    relatedAdvantages: ["Assessment", "Skill Expertise", "Skill Mastery", "Team Code"],
    fullText: `INSIGHT[cite: 2]
AWARENESS INTERACTION[cite: 2]
SPECIALIZATIONS: Avoid Influence, Detect Falsehood, Detect Influence, Evaluate, Innuendo[cite: 2]

You can tell someone's true intentions and feelings, and if they are trying to influence or manipulate you, by paying attention to things like body language, inflection, and your own intuition[cite: 2].

AVOID INFLUENCE[cite: 2]
Make a resistance check using Insight when called to do so to avoid or overcome the effects of certain interaction skills[cite: 2]. If the result of your check equals or exceeds your opponent's, you are unaffected by their attempt to influence or manipulate you[cite: 2].

DETECT FALSEHOOD[cite: 2]
The GM makes a secret Insight check to determine if you sense a particular statement or experience is false[cite: 2]. This is essentially Avoid Influence for Deception, but also applies to picking up on the true nature of an Illusion or Hallucination effect or seeing through a disguise[cite: 2].

DETECT INFLUENCE[cite: 2]
You can make an Insight check to notice someone acting under an outside influence[cite: 2]. The DC is 10 + the effect rank or skill affecting the subject[cite: 2].

EVALUATE[cite: 2]
With an Insight check, opposed by Deception, you can tell if someone is trustworthy and honorable or not upon meeting them[cite: 2]. You can also make a DC 20 Insight check to evaluate a social situation[cite: 2].`
  },
  {
    name: "Intimidation",
    ability: "PRE",
    untrained: true,
    action: "Standard",
    specializations: ["Coercing", "Demoralizing"],
    relatedAdvantages: ["Fearsome Presence", "Menacing Attack", "Startling Intimidation", "Taunting Interaction", "Tactical Training"],
    fullText: `INTIMIDATION[cite: 2]
PRESENCE INTERACTION[cite: 2]
SPECIALIZATION: Coercing, Demoralizing[cite: 2]

You know how to use threats, both real and implied, to get others to do what you want[cite: 2].

COERCING[cite: 2]
You can use Intimidation as an impress check to coerce someone into cooperating[cite: 2]. If your check succeeds, you may treat the target's Attitude as Favorable, Helpful with two or more degrees of success, but only for actions taken in your presence[cite: 2]. With two or more degrees of failure on your check, the target may actually do the opposite of what you want[cite: 2]. Succeed or fail, a target's true Attitude towards you generally becomes Hostile after you have coerced them[cite: 2].

DEMORALIZING[cite: 2]
You can use Intimidation as an impress check in combat to undermine an opponent's confidence[cite: 2]. See Impress Checks in the Action and Adventure chapter[cite: 2]. If your check succeeds, your target is Impaired, or Frightened of you with two or more degrees of failure[cite: 2]. Targets get a new resistance check at the end of each of their turns to remove the condition[cite: 2].

RESISTING[cite: 2]
You can use your Intimidation for resistance checks to resist Intimidation attempts against you[cite: 2].`
  },
  {
    name: "Investigation",
    ability: "INT",
    untrained: false,
    action: "None",
    specializations: ["Analyzing Evidence", "Gathering Evidence", "Gathering Information", "Searching", "Surveillance"],
    relatedAdvantages: ["Contacts", "Well-Informed", "Skill Expertise", "Skill Mastery"],
    fullText: `INVESTIGATION[cite: 2]
INTELLECT TRAINED ONLY TECHNICAL[cite: 2]
SPECIALIZATIONS: Analyzing Evidence, Gathering Evidence, Gathering Information, Searching, Surveillance[cite: 2]

You know how to search for and study clues, gather information through interviews and surveillance, and analyze evidence to help solve crimes[cite: 2].

SEARCHING[cite: 2]
You can search an area for clues, hidden items, traps, and other details[cite: 2]. Perception allows you to immediately notice things, while an Investigation check allows you to pick up on details with some effort[cite: 2].

GATHERING EVIDENCE[cite: 2]
To collect a piece of evidence for analysis, make a DC 15 Investigation check[cite: 2]. If successful, the evidence can be analyzed[cite: 2]. With more than one degree of failure on the gathering check, the evidence is ruined[cite: 2]. Two or more degrees of success provide a +5 bonus on the analysis[cite: 2].

ANALYZING EVIDENCE[cite: 2]
Analysis is a DC 15 Investigation check, modified by the time elapsed since the evidence was left, and whether or not the scene was disturbed[cite: 2]. Success gives you information based on the clue[cite: 2].

GATHERING INFORMATION[cite: 2]
By succeeding at an Investigation check taking at least an hour, you get a feel for the major news and rumors in an area[cite: 2]: General (DC 10), Specific (DC 15), Restricted (DC 20), Protected (DC 25)[cite: 2].

SURVEILLANCE[cite: 2]
You can set up surveillance of a particular area, watching from a stationary location[cite: 2]. The DC of a Stealth check to evade your notice is equal to the result of your Investigation check[cite: 2].`
  },
  {
    name: "Languages",
    ability: "INT",
    untrained: false,
    action: "None",
    focused: true,
    focuses: ["By specific language"],
    specializations: ["Dialects", "Ancient Languages"],
    relatedAdvantages: ["Jack-of-All-Trades"],
    fullText: `LANGUAGES[cite: 2]
INTELLECT FOCUSED TRAINED ONLY[cite: 2]
FOCUSES: By language[cite: 2]

You are fluent in languages other than your native language[cite: 2]. All characters are assumed to be fluent in at least one language and literate as well[cite: 2].
With 1 rank in Languages, you are fluent in an additional language[cite: 2]. Each additional rank doubles the number of additional languages you know: 2 at rank 2, 4 at rank 3, 8 at rank 4, and so on[cite: 2].

LANGUAGES LIMITS[cite: 2]
Unlike most skills, Languages is not limited by Power Level, except as the Game Master sees fit[cite: 2].

LANGUAGES AND INTERACTION[cite: 2]
Sharing a common language is a prerequisite for the use of interaction skills[cite: 2]. Trying to use interaction skills when others do not understand you imposes a -5 penalty on your checks[cite: 2].`
  },
  {
    name: "Magic",
    ability: "INT",
    untrained: false,
    action: "None",
    specializations: ["Constructing", "Disabling", "Lore", "Repairing", "Technique"],
    relatedAdvantages: ["Improvised Effect", "Skill Expertise", "Skill Mastery"],
    fullText: `MAGIC[cite: 2]
INTELLECT TRAINED ONLY TECHNICAL[cite: 2]
SPECIALIZATIONS: Constructing, Disabling, Lore, Repairing, Technique[cite: 2]

You are trained in the arcane arts and understand the secrets and ways of magic, however they may be expressed in the setting[cite: 2].

LORE[cite: 2]
You can use your Magic skill to answer questions about magical or arcane lore, creatures, or phenomena like an Expertise skill[cite: 2]. You cannot use this aspect of the Magic skill untrained[cite: 2].

TECHNIQUE[cite: 2]
You can potentially use Magic as a technical skill for studying, repairing, and disabling magical items or devices[cite: 2].

IMPROVISED EFFECTS[cite: 2]
If you have the Improvised Effects advantage for your Magic skill you can use it to prepare and perform such effects as magical rituals or limited-used magic items[cite: 2].`
  },
  {
    name: "Perception",
    ability: "AWE",
    untrained: true,
    action: "Free",
    specializations: ["Sight", "Hearing", "Smell", "Touch", "Radio", "Mental"],
    relatedAdvantages: ["Tracking", "Skill Expertise", "Skill Mastery"],
    fullText: `PERCEPTION[cite: 2]
AWARENESS[cite: 2]
SPECIALIZATIONS: Specific sense type[cite: 2].

Use this skill to notice and pick up on things using your senses[cite: 2]. In general, you have a -1 penalty to Perception checks for every two Spaces between you and what you are trying to perceive[cite: 2].

SIGHT[cite: 2]
Make a check against a DC based on how visible the object is or against an opposed Stealth check[cite: 2]. Something in plain sight is DC 0, subtle is DC 5-10+[cite: 2].

HEARING[cite: 2]
Normal conversation is DC 0, soft noise DC 10, listening through a door is +5 DC, +15 for a solid wall[cite: 2]. Hearing something while asleep to wake up is +10 DC[cite: 2].

NOTICING VS. OBSERVATION[cite: 2]
You make a Perception check automatically as a non-action whenever you have the opportunity to notice something new, so long as you are not Unaware[cite: 2]. As a simple action, you can also observe and try to perceive something you failed to notice previously[cite: 2].`
  },
  {
    name: "Performance",
    ability: "PRE",
    untrained: false,
    action: "Standard",
    focused: true,
    focuses: ["Acting", "Comedy", "Dance", "Keyboards", "Oratory", "Percussion Instruments", "Poetry", "Singing", "Stringed Instruments", "Wind Instruments"],
    specializations: ["By style or medium"],
    relatedAdvantages: ["Dazing Interaction", "Fascinating Interaction", "Taunting Interaction", "Skill Expertise", "Skill Mastery"],
    fullText: `PERFORMANCE[cite: 2]
PRESENCE TRAINED ONLY FOCUSED INTERACTION[cite: 2]
FOCUSES: Specific type of performance such as Acting, Comedy, Dance, Keyboards, Oratory, Singing, etc[cite: 2].

You are skilled in a type of performance[cite: 2]. You can use your Performance skill as a professional skill and might earn a living with it[cite: 2].

IMPRESSING[cite: 2]
You can simply impress an audience with a performance: A DC 15 check is competent, and every degree of success beyond that is that much more impressive[cite: 2]. A performance that impresses an audience can provide a bonus on later interaction checks with them, typically +2 for success, and a +5 bonus for three or more degrees of success[cite: 2].

SWAYING[cite: 2]
You can use your Performance as an interaction skill to change Attitudes like the Persuasion skill[cite: 2]. The Difficulty Classes for your Performance skill check are the same as Persuasion[cite: 2].`
  },
  {
    name: "Persuasion",
    ability: "PRE",
    untrained: true,
    action: "None",
    specializations: ["Negotiating", "Swaying", "Specific Social Group"],
    relatedAdvantages: ["Connections", "Dazing Interaction", "Fascinating Interaction", "Taunting Interaction", "Well-Informed"],
    fullText: `PERSUASION[cite: 2]
PRESENCE INTERACTION[cite: 2]
SPECIALIZATIONS: Negotiating, Swaying, a particular social group or environment[cite: 2]

You're skilled in dealing with people, from etiquette and social graces to a charming way with words and public speaking[cite: 2].

SWAYING[cite: 2]
You can change others' Attitudes with a Persuasion check[cite: 2]: Helpful (DC 10), Favorable (DC 15), Indifferent (DC 20), Unfavorable (DC 25), Hostile (DC 30)[cite: 2].
Success lets you shift the subject's Attitude by one step, while every two additional degrees of success can shift it another step[cite: 2]. Two or more degrees of failure undoes all of your success and worsens the subject's initial Attitude towards you by one step[cite: 2].

NEGOTIATING[cite: 2]
In negotiations, all participants roll Persuasion checks to see who gains the best result[cite: 2]. Opposed checks also resolve cases where two advocates plead opposing cases before a third party[cite: 2].`
  },
  {
    name: "Ranged Combat",
    ability: "ATK",
    untrained: true,
    action: "Standard",
    focused: true,
    focuses: ["Array", "Guns", "Throwing"],
    specializations: ["Energy Blast", "Pistols", "Rifles", "Bows", "Specific Weapon"],
    relatedAdvantages: ["Ranged Attack", "Improved Critical", "Ricochet", "Split Attack", "Skill Expertise"],
    fullText: `RANGED COMBAT[cite: 2]
ATTACK FOCUSED COMBAT[cite: 2]
FOCUSES: Array, Guns, Throwing[cite: 2]
SPECIALIZATIONS: By specific attack or weapon such as Energy Blast, Pistols, Spears, and so forth[cite: 2].

You're trained with a particular type of ranged attack, giving you a bonus to your attack checks with it equal to your skill rank[cite: 2]. See Attack Check in The Basics and in the Action and Adventure chapter[cite: 2]. Each ranged attack focus is a separate Ranged Combat skill with its own rank[cite: 2].
The bonus from a Ranged Combat skill applies only to attack checks with the particular attack, not to defenses[cite: 2].`
  },
  {
    name: "Sleight of Hand",
    ability: "AGL",
    untrained: false,
    action: "Standard",
    specializations: ["Concealing", "Escaping", "Legerdemain", "Planting", "Stealing"],
    relatedAdvantages: ["Skill Expertise", "Skill Mastery"],
    fullText: `SLEIGHT OF HAND[cite: 2]
AGILITY TRAINED ONLY MANIPULATION[cite: 2]
SPECIALIZATIONS: Concealing, Escaping, Legerdemain, Planting, Stealing[cite: 2]

You can perform dexterous feats of legerdemain such as palming small objects, picking pockets, and so forth[cite: 2].

CONCEALING[cite: 2]
You can use Sleight of Hand to conceal a small item, making your check result the DC of an Investigation or Perception check to find it[cite: 2].

ESCAPING[cite: 2]
Make a Sleight of Hand check to slip out of various restraints: Ropes (DC 10), Handcuffs (DC 15), Straight-jacket (DC 20), Grab or power effect (Effect DC)[cite: 2].

LEGERDEMAIN[cite: 2]
Minor feats of "close-up magic" like making a coin or playing card "disappear" have a DC of 10 unless an observer is focused on noticing what you are doing[cite: 2].

PLANTING[cite: 2]
A DC 20 Sleight of Hand check lets you plant a small object on someone, slip something into their pocket, drop something into their drink, or place a tracer[cite: 2].

STEALING[cite: 2]
To covertly steal something from someone's possession, make a DC 15 Sleight of Hand check[cite: 2]. Target makes a Perception check to notice[cite: 2].`
  },
  {
    name: "Stealth",
    ability: "AGL",
    untrained: true,
    action: "Simple",
    specializations: ["Hiding", "Sneaking", "Tailing", "Specific Terrain"],
    relatedAdvantages: ["Hide in Plain Sight", "Skill Expertise", "Skill Mastery"],
    fullText: `STEALTH[cite: 2]
AGILITY[cite: 2]
SPECIALIZATIONS: Hiding, Sneaking, Tailing, specific environment or terrain[cite: 2]

You're skilled in going unnoticed[cite: 2]. While using Stealth, you are Hindered, at -1 to your movement speed rank[cite: 2]. You can remove the Hindered condition by taking a -5 penalty on your Stealth checks[cite: 2].

HIDING[cite: 2]
If you have Cover or Concealment, make a Stealth check, opposed by an observer's Perception check, to hide and go unnoticed[cite: 2].
If others are aware of you, you can't use Stealth to hide or remain hidden without a distraction or the Hide in Plain Sight advantage[cite: 2].

SNEAKING[cite: 2]
You can limit or cover-up sounds and other signs of your presence or movement with a successful Stealth check against an observer's Perception check result[cite: 2].

TAILING[cite: 2]
You can use Stealth to tail someone—following them without being noticed at your normal speed assuming you have cover or concealment[cite: 2].`
  },
  {
    name: "Survival",
    ability: "AWE",
    untrained: false,
    action: "None",
    specializations: ["Avoid Hazards", "Construction", "Foraging", "Navigation", "Specific Environment"],
    relatedAdvantages: ["Tracking", "Skill Expertise", "Skill Mastery"],
    fullText: `SURVIVAL[cite: 2]
AWARENESS TRAINED ONLY TECHNICAL[cite: 2]
SPECIALIZATIONS: Avoid Hazards, Construction, Foraging, Navigation, specific environment or terrain[cite: 2]

You are trained to survive in the wilderness, including finding food and shelter, and safely navigating and guiding others[cite: 2].

AVOID HAZARDS[cite: 2]
With a DC 15 Survival check, you gain a +2 bonus to resistance checks against the effects of severe weather and other natural hazards, or a +5 bonus if you are stationary and under shelter[cite: 2]. You can grant the same bonus to an additional person per point your check result exceeds the DC[cite: 2].

FORAGING[cite: 2]
With a DC 10 Survival check, you can move at your ground speed rank - 1 while hunting and foraging for sufficient food and water for yourself, plus an additional person per 2 points your check result exceeds the DC[cite: 2].

NAVIGATION[cite: 2]
You can use Survival to navigate outdoors[cite: 2]. The DC is 10, 15 if you are also avoiding any potential hazards[cite: 2].

SIMPLE CONSTRUCTION[cite: 2]
You can use Survival as a technical skill to construct shelters, repair simple items, and set traps (-5 penalty without tools)[cite: 2].`
  },
  {
    name: "Technology",
    ability: "INT",
    untrained: false,
    action: "None",
    specializations: ["Computers", "Constructing", "Disabling", "Electronics", "Operating", "Mechanics", "Repairing", "Security"],
    relatedAdvantages: ["Improvised Effect", "Improvised Tools", "Skill Expertise", "Skill Mastery"],
    fullText: `TECHNOLOGY[cite: 2]
INTELLECT TRAINED ONLY MANIPULATION TECHNICAL[cite: 2]
SPECIALIZATIONS: Computers, Constructing, Disabling, Electronics, Operating, Mechanics, Repairing, Security[cite: 2]

You are skilled with technology[cite: 2]. Routine uses of common technological items do not require a skill check and may be done untrained[cite: 2]. If you lack the necessary tools, you take a -5 penalty on your skill checks to do anything other than operate technology[cite: 2].
Like other technical skills, you can use Technology to operate, construct, repair, and disable technology[cite: 2].

IMPROVISED EFFECTS[cite: 2]
If you have the Improvised Effects advantage, you can use your Technology skill to prepare and perform such effects as limited-use technological devices[cite: 2].`
  },
  {
    name: "Treatment",
    ability: "INT",
    untrained: false,
    action: "Standard",
    specializations: ["Diagnosis", "Disease and Toxins", "Provide Care", "Revive", "Stabilize"],
    relatedAdvantages: ["Improved Treatment", "Skill Expertise", "Skill Mastery"],
    fullText: `TREATMENT[cite: 2]
INTELLECT TRAINED ONLY MANIPULATION TECHNICAL[cite: 2]
SPECIALIZATIONS: Diagnosis, Disease and Toxins, Provide Care, Revive, Stabilize[cite: 2]

You're trained in treating injuries and ailments[cite: 2]. You have a -5 penalty without medical tools or when treating yourself[cite: 2].

DIAGNOSIS (DC 10)[cite: 2]
Diagnose injuries and ailments[cite: 2]. Success provides a +2 bonus on further Treatment checks for that condition (+5 with 3+ degrees of success)[cite: 2].

REVIVE[cite: 2]
Standard action to remove conditions from a subject: DC 10 for Dazed, DC 15 for Stunned, DC 20 for Incapacitated[cite: 2]. You are Vulnerable while reviving[cite: 2].

STABILIZE (DC 15)[cite: 2]
Standard action to stabilize a Dying character[cite: 2].

TREAT AILMENTS[cite: 2]
Treat disease or poison; success grants patient +2 circumstance bonus to their resistance checks (+5 with 3+ degrees)[cite: 2].`
  },
  {
    name: "Vehicles",
    ability: "AGL",
    untrained: false,
    action: "Standard",
    specializations: ["Driving", "Sailing", "Piloting"],
    relatedAdvantages: ["Skill Expertise", "Skill Mastery"],
    fullText: `VEHICLES[cite: 2]
AGILITY MANIPULATION[cite: 2]
SPECIALIZATIONS: Driving, Sailing, Piloting[cite: 2]

Use this skill to operate vehicles, from driving ground vehicles to sailing water vehicles or piloting air and space vehicles[cite: 2]. Routine tasks in common vehicles do not require a check[cite: 2]. Make a Vehicles check only when operating in stressful, dramatic, or combat situations[cite: 2].`
  }
];
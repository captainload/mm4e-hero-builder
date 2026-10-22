/**
 * Mutants & Masterminds 4th Edition Hero Builder - Tactical Dossier & Print Engine
 * Condensed, high-contrast, visually attractive character sheet and PDF generator.
 */

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const ATTACK_EFFECT_NAMES = new Set([
  'Damage', 'Blast', 'Strike', 'Affliction', 'Weaken', 'Nullify',
  'Move Object', 'Mind Control', 'Illusion', 'Snare', 'Stun', 'Dazzle'
]);

function calculateEffectSaveDc(eff, effectiveRank = null) {
  if (!eff || !eff.effectName) return null;
  const effName = eff.effectName;
  const rank = parseInt(effectiveRank || eff.rank || eff.ranks || 1) || 1;

  let altSave = null;
  if (Array.isArray(eff.modifiers)) {
    const altMod = eff.modifiers.find(m => m.name && m.name.includes("Alternate Resistance"));
    if (altMod) {
      const match = altMod.name.match(/Alternate Resistance\s*\(([^)]+)\)/i);
      if (match) altSave = match[1];
    }
  }

  if (['Damage', 'Blast', 'Strike'].includes(effName)) {
    return `${altSave || "Toughness"} DC ${15 + rank}`;
  }
  if (effName === 'Affliction') {
    return `${altSave || "Fortitude/Will"} DC ${10 + rank}`;
  }
  if (effName === 'Weaken') {
    return `${altSave || "Fortitude/Will"} DC ${10 + rank}`;
  }
  if (effName === 'Nullify') {
    return `Opposed Check (+${rank}) vs Will/Power`;
  }
  if (['Snare', 'Dazzle'].includes(effName)) {
    return `${altSave || "Dodge/Fortitude"} DC ${10 + rank}`;
  }
  if (eff.savingThrow && eff.savingThrow.toLowerCase() !== 'none' && eff.savingThrow.toLowerCase() !== 'harmless') {
    return `${altSave || eff.savingThrow} DC ${10 + rank}`;
  }
  return null;
}

function extractHeroAttacks(c) {
  const attacks = [];
  const derived = c.derivedStats || {};
  const closeBonus = derived.closeAttack !== undefined ? derived.closeAttack : 0;
  const rangedBonus = derived.rangedAttack !== undefined ? derived.rangedAttack : 0;
  const strRank = c.getAbilityRank ? (c.getAbilityRank("STR") || 0) : (parseInt(c.abilities?.STR) || 0);

  // 1. Unarmed Strike
  attacks.push({
    name: "👊 Unarmed Strike",
    bonus: closeBonus >= 0 ? `+${closeBonus}` : `${closeBonus}`,
    range: "Close",
    saveDc: `Toughness DC ${15 + strRank}`,
    notes: "Bludgeoning • Damage " + strRank + " • Crit 20"
  });

  // 2. Equipment Weapons
  const gearItems = c.gear || [];
  gearItems.forEach(item => {
    if (item.damage || (item.type && (item.type.includes("Weapon") || item.type.includes("Melee") || item.type.includes("Ranged")))) {
      const isRanged = item.type && item.type.includes("Ranged");
      const bonus = isRanged ? rangedBonus : closeBonus;
      const dmg = parseInt(item.damage) || 0;
      const crit = item.crit || "20";
      attacks.push({
        name: `⚔️ ${item.name || "Weapon"}`,
        bonus: bonus >= 0 ? `+${bonus}` : `${bonus}`,
        range: item.range || (isRanged ? "Ranged" : "Close"),
        saveDc: `Toughness DC ${15 + dmg}`,
        notes: `${item.damageType || "Physical"} • Damage ${dmg} • Crit ${crit}`
      });
    }
  });

  // 3. Attack Powers
  (c.powers || []).forEach(power => {
    (power.effects || []).forEach(eff => {
      const effName = eff.effectName || "";
      const isAttack = ATTACK_EFFECT_NAMES.has(effName) || eff.isAttack;
      const saveDc = calculateEffectSaveDc(eff);

      if (isAttack || saveDc) {
        const rank = parseInt(eff.rank || eff.ranks || 1) || 1;
        const rangeStr = (eff.range || "").toLowerCase();
        const isPerception = rangeStr.includes("perception");
        const isArea = rangeStr.includes("area") || (eff.modifiers || []).some(m => (m.name || '').includes("Area"));
        const isRanged = rangeStr.includes("ranged");

        let atkStr = "";
        if (isPerception) {
          atkStr = "Perception (Auto)";
        } else if (isArea) {
          atkStr = "Area (Dodge half)";
        } else if (isRanged) {
          atkStr = rangedBonus >= 0 ? `+${rangedBonus}` : `${rangedBonus}`;
        } else {
          atkStr = closeBonus >= 0 ? `+${closeBonus}` : `${closeBonus}`;
        }

        const descParts = [];
        if (eff.descriptors) {
          descParts.push(Array.isArray(eff.descriptors) ? eff.descriptors.join(', ') : eff.descriptors);
        }
        descParts.push("Crit 20");

        const displayName = (eff.name && eff.name !== "New Effect" && eff.name !== effName)
          ? `⚡ ${eff.name} [${effName} ${rank}]`
          : `⚡ ${power.name || effName} [Rank ${rank}]`;

        attacks.push({
          name: displayName,
          bonus: atkStr,
          range: eff.range || (isRanged ? "Ranged" : "Close"),
          saveDc: saveDc || "—",
          notes: descParts.join(" • ")
        });
      }
    });
  });

  return attacks;
}

function buildPrintHeader(c) {
  let html = `<div class="print-header">`;
  const pName = c.playerName ? `<span class="player-name">${c.isMecha ? 'Pilot / Creator' : 'Player'}: ${escapeHtml(c.playerName)}</span>` : '';
  let altTag = '';
  if (c.isMecha) {
    altTag = ` <span class="print-alt-badge mecha-badge">[🤖 MECHA]</span>`;
  } else if (c.isMinion) {
    altTag = ` <span class="print-alt-badge minion-badge">[👾 MINION]</span>`;
  } else if (c.isAltForm) {
    altTag = ` <span class="print-alt-badge altform-badge">[⚡ ALTERNATE FORM]</span>`;
  }
  const identityStr = c.identity ? ` <span class="print-muted" style="font-size: 10pt; font-weight: normal; margin-left: 6px;">(${escapeHtml(c.identity)})</span>` : '';

  html += `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px; border-bottom: 2px solid #0f172a; padding-bottom: 6px;">
      <div>
        <h1 style="margin: 0; font-size: 18pt; font-weight: 800; text-transform: uppercase; color: #0f172a; letter-spacing: -0.5px;">
          ${escapeHtml(c.name || 'Unnamed Hero')}${identityStr}${altTag}
        </h1>
        <div style="font-size: 9pt; color: #475569; margin-top: 3px;">
          ${pName ? `${pName} • ` : ''}<strong>Power Level:</strong> ${c.powerLevel || 10}
          ${c.altParentHeroName ? ` • <em>Primary Hero: ${escapeHtml(c.altParentHeroName)}</em>` : ''}
        </div>
      </div>
      <div class="print-hp-box" style="text-align: right; border: 1.5px solid #0f172a; padding: 4px 10px; border-radius: 4px; background: #f8fafc; min-width: 130px;">
        <span style="font-size: 8pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #0f172a;">HERO POINTS</span>
        <div style="font-size: 9pt; color: #334155; margin-top: 2px;">
          Starting: <strong style="color: #0f172a;">${1 + ((c.advantages && c.advantages["Luck"]) || 0)}</strong>
          <span style="font-size: 7.5pt; color: #64748b;">(1 + ${(c.advantages && c.advantages["Luck"]) || 0} Luck)</span>
        </div>
        <div style="font-size: 8pt; color: #475569; margin-top: 2px;">
          Current: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]
        </div>
      </div>
    </div>
  `;

  // Point Budget Breakdown Ribbon
  const summary = c.powerPointsSummary || {};
  const abilPP = summary.abilityPP || 0;
  const combatPP = summary.combatPP || 0;
  const resistPP = summary.resistancePP || 0;
  const skillsPP = summary.skillPP || 0;
  const advPP = summary.advantagePP || 0;
  const powersPP = summary.powerPP || 0;
  const totalSpent = summary.totalSpent || 0;
  const totalAllowed = summary.totalAllowed || (c.powerLevel * 15);

  html += `
    <div style="display: flex; justify-content: space-between; align-items: center; background: #0f172a; color: #ffffff; padding: 4px 10px; border-radius: 2px; margin-top: 6px; font-size: 8.5pt;">
      <div>
        <strong>POINT TOTALS:</strong> 
        Abilities ${abilPP} • Combat ${combatPP} • Resistances ${resistPP} • Skills ${skillsPP} • Advantages ${advPP} • Powers ${powersPP}
      </div>
      <div>
        <strong>TOTAL: ${totalSpent} / ${totalAllowed} PP</strong>
      </div>
    </div>
  `;

  // Physical & Movement Traits Ribbon
  const derived = c.derivedStats || {};
  const traits = [];
  traits.push(`<strong>Size:</strong> ${escapeHtml(c.sizeCategory || "Medium")}`);
  if (typeof c.massRank === "number") traits.push(`<strong>Mass Rank:</strong> ${c.massRank}`);
  traits.push(`<strong>Ground Speed:</strong> ${derived.groundSpeed || 2} (30 ft/rnd)`);
  if (derived.airSpeed) traits.push(`<strong>Flight:</strong> Rank ${derived.airSpeed}`);
  if (derived.waterSpeed) traits.push(`<strong>Swimming:</strong> Rank ${derived.waterSpeed}`);
  if (derived.initiative !== undefined) traits.push(`<strong>Initiative:</strong> ${derived.initiative >= 0 ? '+' : ''}${derived.initiative}`);

  html += `
    <div style="display: flex; flex-wrap: wrap; gap: 4px 14px; font-size: 8.5pt; color: #334155; padding: 4px 0; border-bottom: 1px dotted #94a3b8; margin-bottom: 10px;">
      ${traits.join(" • ")}
    </div>
  `;

  html += `</div>`;
  return html;
}

function generatePrintSheet(targetContainerId = "print-layout", targetChar = null) {
  const c = targetChar || window.char;
  if (!c) return;

  const container = document.getElementById(targetContainerId);
  if (!container) return;

  const derived = c.derivedStats || {};
  let html = `<div class="tactical-sheet-wrapper">`;
  html += buildPrintHeader(c);

  // Tactical 2-Column Layout
  html += `<div class="tactical-sheet-grid">`;

  // ==========================================
  // LEFT COLUMN: Abilities, Defenses, Skills, Advantages
  // ==========================================
  html += `<div class="tactical-col">`;

  // 1. ABILITIES BOX
  html += `
    <div class="print-box print-box-abilities">
      <div class="print-box-title">Abilities (6 Core)</div>
      <div class="print-abilities-grid">
  `;
  const abils = [
    { key: "STR", name: "Strength" },
    { key: "STA", name: "Stamina" },
    { key: "AGL", name: "Agility" },
    { key: "INT", name: "Intellect" },
    { key: "AWE", name: "Awareness" },
    { key: "PRE", name: "Presence" }
  ];
  abils.forEach(ab => {
    const isAbsent = c.absentAbilities && c.absentAbilities[ab.key];
    const val = isAbsent ? "—" : (c.abilities ? c.abilities[ab.key] : 0);
    const cost = isAbsent ? "-10" : ((val || 0) * 2);
    html += `
      <div class="print-ability-cell">
        <div class="ab-meta">
          <div class="ab-key-name">
            <span class="ab-key">${ab.key}</span>
            <span class="ab-name">${ab.name}</span>
          </div>
          <span class="ab-cost">[${cost} PP]</span>
        </div>
        <span class="ab-score">${val >= 0 && !isAbsent ? '+' + val : val}</span>
      </div>
    `;
  });
  html += `</div></div>`; // End Abilities

  // 2. DEFENSES & COMBAT BOX
  html += `
    <div class="print-box">
      <div class="print-box-title">Defenses &amp; Combat Values</div>
      <div class="print-defenses-grid">
        <div class="print-def-cell">
          <span class="def-label">Defense Class:</span>
          <span class="def-val">${derived.defenseClass || 10}</span>
        </div>
        <div class="print-def-cell">
          <span class="def-label">Close Defense:</span>
          <span class="def-val">+${derived.closeDefense !== undefined ? derived.closeDefense : 0}</span>
        </div>
        <div class="print-def-cell">
          <span class="def-label">Ranged Defense:</span>
          <span class="def-val">+${derived.rangedDefense !== undefined ? derived.rangedDefense : 0}</span>
        </div>
        <div class="print-def-cell">
          <span class="def-label">Toughness:</span>
          <span class="def-val">+${derived.toughness !== undefined ? derived.toughness : 0}</span>
        </div>
        <div class="print-def-cell">
          <span class="def-label">Dodge:</span>
          <span class="def-val">${derived.dodge !== null ? '+' + derived.dodge : '—'}</span>
        </div>
        <div class="print-def-cell">
          <span class="def-label">Fortitude:</span>
          <span class="def-val">${derived.fortitude !== null ? '+' + derived.fortitude : '—'}</span>
        </div>
        <div class="print-def-cell">
          <span class="def-label">Will:</span>
          <span class="def-val">${derived.will !== null ? '+' + derived.will : '—'}</span>
        </div>
        <div class="print-def-cell">
          <span class="def-label">Initiative:</span>
          <span class="def-val">${derived.initiative >= 0 ? '+' : ''}${derived.initiative || 0}</span>
        </div>
      </div>
    </div>
  `;

  // 3. SKILLS BOX
  html += `
    <div class="print-box">
      <div class="print-box-title">Skills &amp; Specialties</div>
  `;
  const skillsList = Object.entries(c.skills || {}).filter(([k, v]) => v > 0);
  if (skillsList.length === 0) {
    html += `<div style="font-size: 8pt; color: #64748b; font-style: italic; padding: 4px;">No trained skills purchased.</div>`;
  } else {
    html += `<div class="print-skills-grid">`;
    skillsList.forEach(([sName, sRank]) => {
      let sDetail = c.skillDetails && c.skillDetails[sName] ? ` (${c.skillDetails[sName]})` : '';
      let baseAbil = "AGL";
      if (["Close Combat", "Athletics"].includes(sName)) baseAbil = "STR";
      else if (["Deception", "Intimidation", "Persuasion"].includes(sName)) baseAbil = "PRE";
      else if (["Insight", "Perception"].includes(sName)) baseAbil = "AWE";
      else if (["Investigation", "Technology", "Treatment"].includes(sName)) baseAbil = "INT";
      
      const abilVal = c.getAbilityRank ? (c.getAbilityRank(baseAbil) || 0) : 0;
      const totalBonus = sRank + abilVal;

      html += `
        <div class="print-skill-row">
          <span class="sk-name">${escapeHtml(sName)}${escapeHtml(sDetail)}</span>
          <span class="sk-ranks">${sRank}r [${baseAbil}]</span>
          <span class="sk-total">${totalBonus >= 0 ? '+' : ''}${totalBonus}</span>
        </div>
      `;
    });
    html += `</div>`;
  }
  html += `</div>`; // End Skills

  // 4. ADVANTAGES BOX
  html += `
    <div class="print-box">
      <div class="print-box-title">Advantages (Feats)</div>
  `;
  const advList = Object.entries(c.advantages || {}).filter(([k, v]) => v > 0);
  if (advList.length === 0) {
    html += `<div style="font-size: 8pt; color: #64748b; font-style: italic; padding: 4px;">No advantages purchased.</div>`;
  } else {
    html += `<div class="print-adv-list">`;
    advList.forEach(([aName, aRank]) => {
      let aDetail = c.advantageDetails && c.advantageDetails[aName] ? ` (${c.advantageDetails[aName]})` : '';
      let rankStr = aRank > 1 ? ` ${aRank}` : '';
      html += `<span class="print-adv-tag"><strong>${escapeHtml(aName)}${rankStr}</strong>${escapeHtml(aDetail)}</span>`;
    });
    html += `</div>`;
  }
  html += `</div>`; // End Advantages

  html += `</div>`; // End Left Column

  // ==========================================
  // RIGHT COLUMN: Attacks Table, Powers, Gear, Background
  // ==========================================
  html += `<div class="tactical-col">`;

  // 1. OFFENSE & ATTACKS TABLE
  const attacks = extractHeroAttacks(c);
  html += `
    <div class="print-box">
      <div class="print-box-title">Offense &amp; Attack Actions</div>
      <table class="print-attack-table">
        <thead>
          <tr>
            <th style="width: 32%;">Attack</th>
            <th style="width: 16%;">Bonus</th>
            <th style="width: 16%;">Range</th>
            <th style="width: 36%;">Save DC &amp; Notes</th>
          </tr>
        </thead>
        <tbody>
  `;
  attacks.forEach(atk => {
    html += `
      <tr>
        <td class="atk-name"><strong>${escapeHtml(atk.name)}</strong></td>
        <td class="atk-bonus">${escapeHtml(atk.bonus)}</td>
        <td class="atk-range">${escapeHtml(atk.range)}</td>
        <td class="atk-notes"><strong style="color: #0f172a;">${escapeHtml(atk.saveDc)}</strong><br><span style="font-size: 7.5pt; color: #475569;">${escapeHtml(atk.notes)}</span></td>
      </tr>
    `;
  });
  html += `</tbody></table></div>`;

  // 2. POWERS & DEVICES
  html += `
    <div class="print-box">
      <div class="print-box-title">Powers, Containers &amp; Effects</div>
  `;
  const powers = c.powers || [];
  if (powers.length === 0) {
    html += `<div style="font-size: 8pt; color: #64748b; font-style: italic; padding: 4px;">No powers configured yet.</div>`;
  } else {
    powers.forEach((p, pIdx) => {
      let pCost = c.calculateTotalPowerCost ? c.calculateTotalPowerCost(p) : 0;
      let pDesc = p.descriptors ? ` <span class="print-muted">[${escapeHtml(p.descriptors)}]</span>` : '';
      html += `
        <div class="print-power-entry" style="margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid #cbd5e1;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span style="font-size: 9.5pt; font-weight: 700; color: #0f172a;">⚡ ${escapeHtml(p.name || 'Power')}${pDesc}</span>
            <span style="font-size: 8.5pt; font-weight: 700; color: #0369a1; background: #e0f2fe; padding: 1px 6px; border-radius: 3px;">${pCost} PP</span>
          </div>
      `;

      (p.effects || []).forEach(eff => {
        let effName = eff.effectName || eff.name || "Effect";
        let effRank = eff.rank !== undefined ? eff.rank : 1;
        let effCost = c.calculateEffectCost ? c.calculateEffectCost(eff) : 0;
        let assoc = eff.association === 'alternate' ? ' <span style="font-size: 7.5pt; color: #d97706; font-weight: bold;">(Alternate Effect)</span>' : '';
        let link = eff.linkedTo ? ' <span style="font-size: 7.5pt; color: #2563eb; font-weight: bold;">(Linked)</span>' : '';

        const modStrs = [];
        (eff.modifiers || []).forEach(m => {
          let mR = (m.ranks && m.ranks > 1) ? ` ${m.ranks}` : '';
          modStrs.push(`${m.name}${mR}`);
        });

        html += `
          <div style="font-size: 8pt; margin-top: 3px; padding-left: 8px; border-left: 2px solid #cbd5e1;">
            <div>
              <strong>${escapeHtml(eff.name || effName)}</strong> [${escapeHtml(effName)} ${effRank}]${assoc}${link} • <em>${effCost} PP</em>
            </div>
            <div style="color: #475569; font-size: 7.5pt;">
              ${eff.action || 'Standard'} • ${eff.range || 'Close'} • ${eff.duration || 'Instant'}
              ${modStrs.length > 0 ? ` • <strong>Modifiers:</strong> ${escapeHtml(modStrs.join(', '))}` : ''}
            </div>
            ${eff.notes ? `<div style="color: #64748b; font-size: 7.5pt; font-style: italic;">${escapeHtml(eff.notes)}</div>` : ''}
          </div>
        `;
      });

      html += `</div>`;
    });
  }
  html += `</div>`; // End Powers

  // 3. GEAR, VEHICLES & INSTALLATIONS
  const hasGear = (c.gear && c.gear.length > 0) || (c.vehicles && c.vehicles.length > 0) || (c.installations && c.installations.length > 0);
  if (hasGear) {
    html += `
      <div class="print-box">
        <div class="print-box-title">Equipment, Vehicles &amp; Headquarters</div>
        <div style="font-size: 8pt; display: flex; flex-direction: column; gap: 4px;">
    `;
    (c.gear || []).forEach(g => {
      html += `<div><strong>${escapeHtml(g.name || 'Item')}</strong> (${g.cost || 0} EP) ${g.notes ? ` - <span class="print-muted">${escapeHtml(g.notes)}</span>` : ''}</div>`;
    });
    (c.vehicles || []).forEach(v => {
      html += `<div><strong>🚗 ${escapeHtml(v.name || 'Vehicle')}</strong> (${v.cost || 0} EP) ${v.notes ? ` - <span class="print-muted">${escapeHtml(v.notes)}</span>` : ''}</div>`;
    });
    (c.installations || []).forEach(h => {
      html += `<div><strong>🏢 ${escapeHtml(h.name || 'HQ')}</strong> (${h.cost || 0} EP) ${h.notes ? ` - <span class="print-muted">${escapeHtml(h.notes)}</span>` : ''}</div>`;
    });
    html += `</div></div>`;
  }

  // 4. BACKGROUND & COMPLICATIONS
  const hasBg = c.motivation || c.complications || c.history;
  if (hasBg) {
    html += `
      <div class="print-box">
        <div class="print-box-title">Background, Motivation &amp; Complications</div>
        <div style="font-size: 8pt; line-height: 1.4;">
    `;
    if (c.motivation) html += `<div><strong>Motivation:</strong> ${escapeHtml(c.motivation)}</div>`;
    if (c.complications) html += `<div style="margin-top: 3px;"><strong>Complications:</strong> ${escapeHtml(c.complications)}</div>`;
    if (c.history) html += `<div style="margin-top: 3px;"><strong>History:</strong> ${escapeHtml(c.history)}</div>`;
    html += `</div></div>`;
  }

  html += `</div>`; // End Right Column

  html += `</div>`; // End Tactical Grid
  html += `</div>`; // End Tactical Sheet Wrapper

  container.innerHTML = html;
}

// Function to open Print & PDF Preview Modal
function openPrintPreview() {
  const modal = document.getElementById("modalPrintPreview");
  if (!modal) return;
  generatePrintSheet("printPreviewModalBody");
  modal.style.display = "flex";
}

function closePrintPreview() {
  const modal = document.getElementById("modalPrintPreview");
  if (modal) modal.style.display = "none";
}

// Function to trigger native browser Print-to-PDF export
function exportToPdf() {
  const oldTitle = document.title;
  const heroName = (window.char && window.char.name) ? window.char.name.replace(/[^a-zA-Z0-9_-]/g, '_') : 'Hero';
  document.title = `${heroName}_M&M4E.pdf`;

  generatePrintSheet("print-layout");

  // Allow browser layout to settle before opening print dialog
  setTimeout(() => {
    window.print();
    // Restore title after print dialog closes
    setTimeout(() => {
      document.title = oldTitle;
    }, 1000);
  }, 150);
}

// Expose functions globally
window.generatePrintSheet = generatePrintSheet;
window.openPrintPreview = openPrintPreview;
window.closePrintPreview = closePrintPreview;
window.exportToPdf = exportToPdf;

// Hook into browser beforeprint
if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
  window.addEventListener('beforeprint', () => {
    generatePrintSheet("print-layout");
  });
}

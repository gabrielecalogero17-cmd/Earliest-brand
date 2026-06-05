const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', '..', 'leads_dashboard', 'elenco_lead_the_earliest.html');
const localLeadsPath = path.join(__dirname, '..', 'src', 'data', 'localLeads.ts');
const sectorScriptsPath = path.join(__dirname, '..', 'src', 'data', 'sectorScripts.ts');
const csvPath = path.join(__dirname, '..', 'leads.csv');

// Read the HTML file in UTF-8
const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const lines = htmlContent.split(/\r?\n/);

// Helper to extract lines (1-indexed based on what we saw, but we'll use exact match or line numbers)
// Line 1227 is 0-indexed line 1226
function getLineRange(startLine, endLine) {
  return lines.slice(startLine - 1, endLine).join('\n');
}

console.log('Extracting sectorScripts...');
let scriptsBlock = getLineRange(1228, 1726); // from "estetica: {" to "            }"
// clean up assignment or formatting if any
const sectorScriptsContent = `export interface ScriptVariant {
  conversational: string;
  direct: string;
  bold: string;
}

export interface SectorScripts {
  [key: string]: ScriptVariant;
}

export const sectorScripts: SectorScripts = {
${scriptsBlock}
};
`;

fs.writeFileSync(sectorScriptsPath, sectorScriptsContent, 'utf8');
console.log('Saved sectorScripts.ts');

console.log('Extracting leads arrays...');
let nazionaleBlock = getLineRange(1730, 1936); // lines inside leadsDataNazionale brackets
let cataniaBlock = getLineRange(1941, 2147); // lines inside leadsDataCatania brackets
let o95Block = getLineRange(2152, 2351); // lines inside leadsData095 brackets

const localLeadsContent = `export interface Lead {
  id: number;
  target: 'estetica' | 'realestate' | 'dentisti' | 'hotellerie' | 'boutique' | 'profumeria' | 'artigianato' | 'd2c';
  name: string;
  location: string;
  phone: string;
  email: string;
  instagram: string;
}

export const leadsDataNazionale: Lead[] = [
${nazionaleBlock}
];

export const leadsDataCatania: Lead[] = [
${cataniaBlock}
];

export const leadsData095: Lead[] = [
${o95Block}
];

export const allLeads: Lead[] = [...leadsDataNazionale, ...leadsDataCatania, ...leadsData095];
`;

fs.writeFileSync(localLeadsPath, localLeadsContent, 'utf8');
console.log('Saved localLeads.ts');

// Now parse the leads using a helper to generate CSV
function cleanString(str) {
  if (!str) return '';
  return str.trim();
}

function parseLeadObjects(blockText) {
  // Regex to extract fields from each line like:
  // { id: 1, target: "estetica", name: "Clinica Villa Bella", location: "Salò (BS)", phone: "0365 41446", email: "info@villabella.it", instagram: "@villa_bella_clinic" },
  const leads = [];
  const linesArray = blockText.split('\n');
  
  for (const line of linesArray) {
    if (!line.includes('{') || !line.includes('}')) continue;
    
    // We can evaluate the line using eval safely since it's a static array definition we just read from our repo
    try {
      // Wrap in parentheses to make it a valid statement
      const leadObj = eval('(' + line.trim().replace(/,$/, '') + ')');
      if (leadObj && typeof leadObj.id === 'number') {
        leads.push(leadObj);
      }
    } catch (e) {
      console.error('Failed to parse line:', line, e.message);
    }
  }
  return leads;
}

const leadsNazionale = parseLeadObjects(nazionaleBlock);
const leadsCatania = parseLeadObjects(cataniaBlock);
const leads095 = parseLeadObjects(o95Block);

const allLeadsParsed = [...leadsNazionale, ...leadsCatania, ...leads095];
console.log(`Parsed ${allLeadsParsed.length} leads successfully (expected 600)`);

// Generate CSV
const csvRows = [];
// CSV Headers: id,target,name,location,phone,email,instagram,status,notes
csvRows.push('id,target,name,location,phone,email,instagram,status,notes');

for (const lead of allLeadsParsed) {
  const escapeCsv = (val) => {
    if (val === null || val === undefined) return '';
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };
  
  const row = [
    lead.id,
    escapeCsv(lead.target),
    escapeCsv(lead.name),
    escapeCsv(lead.location),
    escapeCsv(lead.phone),
    escapeCsv(lead.email),
    escapeCsv(lead.instagram),
    'new', // default status
    ''     // default notes (empty)
  ].join(',');
  csvRows.push(row);
}

fs.writeFileSync(csvPath, csvRows.join('\n'), 'utf8');
console.log('Saved leads.csv with 600 records.');

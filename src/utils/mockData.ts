export interface FieldConfig {
  name: string;
  type: 'id' | 'uuid' | 'name' | 'email' | 'role' | 'company' | 'country' | 'number' | 'status' | 'created_at' | 'boolean';
  min?: number;
  max?: number;
}

const FIRST_NAMES = ['Kaelen', 'Thorne', 'Lyra', 'Alistair', 'Evelyn', 'Vance', 'Seraphina', 'Dante', 'Rowan', 'Cassian', 'Freya', 'Kael', 'Ophelia', 'Rylan', 'Kira', 'Julian', 'Elara', 'Sterling', 'Gideon', 'Aria'];
const LAST_NAMES = ['Morgan', 'Vance', 'Sterling', 'West', 'Blackwood', 'Davenport', 'Hawthorne', 'Mercer', 'Pendleton', 'Sinclair', 'Thorne', 'Valerius', 'Kensington', 'Stratos', 'Apex', 'Core', 'Locke'];
const ROLES = ['Frontend Architect', 'Full Stack Builder', 'DBA Strategist', 'Cloud Architect', 'SecOps Specialist', 'Lead Developer', 'Data Platform Expert', 'Product Owner'];
const COMPANIES = ['CloudForce Labs', 'Novatech Systems', 'Stratos AI Core', 'Apex Systems Corp', 'Spectra Systems', 'Vanguard Software', 'Nebula Ventures', 'Aetheric Systems'];
const COUNTRIES = ['United States', 'Singapore', 'Canada', 'United Kingdom', 'Estonia', 'Japan', 'Germany', 'Australia', 'Switzerland'];
const STATUSES = ['active', 'pending', 'suspended', 'completed', 'scheduled', 'failed'];

/**
 * Generates an RFC4122 compliant UUID v4 string
 */
function createUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Returns a random element from an array
 */
function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generates a mock record with customized schema blueprint configurations
 */
export function generateMockRecord(index: number, fields: FieldConfig[]): Record<string, any> {
  const record: Record<string, any> = {};
  
  // Cache to align names and emails if both are requested
  let generatedName = '';

  fields.forEach((field) => {
    switch (field.type) {
      case 'id':
        record[field.name] = index + 1;
        break;
      case 'uuid':
        record[field.name] = createUUID();
        break;
      case 'name':
        if (!generatedName) {
          generatedName = `${getRandomElement(FIRST_NAMES)} ${getRandomElement(LAST_NAMES)}`;
        }
        record[field.name] = generatedName;
        break;
      case 'email':
        if (!generatedName) {
          generatedName = `${getRandomElement(FIRST_NAMES)} ${getRandomElement(LAST_NAMES)}`;
        }
        const cleanName = generatedName.toLowerCase().replace(/\s+/g, '.');
        const domain = getRandomElement(['cloudforce.io', 'novatech.co', 'stratos-ai.net', 'company.internal']);
        record[field.name] = `${cleanName}@${domain}`;
        break;
      case 'role':
        record[field.name] = getRandomElement(ROLES);
        break;
      case 'company':
        record[field.name] = getRandomElement(COMPANIES);
        break;
      case 'country':
        record[field.name] = getRandomElement(COUNTRIES);
        break;
      case 'number':
        const min = field.min ?? 10;
        const max = field.max ?? 1000;
        record[field.name] = Math.floor(Math.random() * (max - min + 1)) + min;
        break;
      case 'status':
        record[field.name] = getRandomElement(STATUSES);
        break;
      case 'created_at':
        // Generate random date within the last 90 days
        const daysPast = Math.floor(Math.random() * 90);
        const date = new Date();
        date.setDate(date.getDate() - daysPast);
        record[field.name] = date.toISOString();
        break;
      case 'boolean':
        record[field.name] = Math.random() > 0.5;
        break;
      default:
        record[field.name] = null;
    }
  });

  return record;
}

/**
 * Output generator for multi-formats (JSON, CSV, XML, YAML)
 */
export function compileOutput(
  records: Record<string, any>[],
  format: 'json' | 'csv' | 'xml' | 'yaml'
): string {
  if (records.length === 0) return '';

  switch (format) {
    case 'json':
      return JSON.stringify(records, null, 2);

    case 'csv': {
      const keys = Object.keys(records[0]);
      const csvRows = [];
      // Row header
      csvRows.push(keys.join(','));
      // Row contents
      records.forEach((rec) => {
        const values = keys.map((key) => {
          const val = rec[key];
          if (typeof val === 'string') {
            // Escape double quotes and wraps
            return `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        });
        csvRows.push(values.join(','));
      });
      return csvRows.join('\n');
    }

    case 'xml': {
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<dataset>\n';
      records.forEach((rec) => {
        xml += '  <record>\n';
        Object.entries(rec).forEach(([key, val]) => {
          xml += `    <${key}>${val}</${key}>\n`;
        });
        xml += '  </record>\n';
      });
      xml += '</dataset>';
      return xml;
    }

    case 'yaml': {
      let yaml = '';
      records.forEach((rec) => {
        yaml += '-\n';
        Object.entries(rec).forEach(([key, val]) => {
          if (typeof val === 'string' && val.includes('\n')) {
            yaml += `  ${key}: |\n` + val.split('\n').map(line => `    ${line}`).join('\n') + '\n';
          } else {
            yaml += `  ${key}: ${typeof val === 'string' ? `"${val}"` : val}\n`;
          }
        });
      });
      return yaml;
    }

    default:
      return '';
  }
}

import React, { useState, useEffect } from 'react';
import { 
  FileJson, 
  Settings, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Dices, 
  FileDown, 
  Sparkles, 
  ChevronRight, 
  HelpCircle,
  Database,
  Grid
} from 'lucide-react';
import { generateMockRecord, compileOutput, type FieldConfig } from '../utils/mockData';
import { AdsenseBanner } from './AdsenseBanner';
import { ToolSeoContent } from './ToolSeoContent';

export default function BlueprintGenerator() {
  const [fields, setFields] = useState<FieldConfig[]>([
    { name: 'id', type: 'id' },
    { name: 'fullName', type: 'name' },
    { name: 'emailAddress', type: 'email' },
    { name: 'enterprise', type: 'company' },
    { name: 'activeStatus', type: 'status' },
    { name: 'createdDate', type: 'created_at' }
  ]);

  const [recordCount, setRecordCount] = useState<number>(25);
  const [outputFormat, setOutputFormat] = useState<'json' | 'csv' | 'xml' | 'yaml'>('json');
  const [outputText, setOutputText] = useState<string>('');
  
  // Custom states for adding new fields
  const [newFieldName, setNewFieldName] = useState<string>('');
  const [newFieldType, setNewFieldType] = useState<FieldConfig['type']>('name');
  const [newFieldMin, setNewFieldMin] = useState<number>(10);
  const [newFieldMax, setNewFieldMax] = useState<number>(1000);

  // States for copy feedback
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Generate live data
  const handleGenerate = () => {
    const rawRecords = [];
    for (let idx = 0; idx < recordCount; idx++) {
      rawRecords.push(generateMockRecord(idx, fields));
    }
    const compiled = compileOutput(rawRecords, outputFormat);
    setOutputText(compiled);
  };

  // Run automatically when fields or parameters configuration shifts
  useEffect(() => {
    handleGenerate();
  }, [fields, recordCount, outputFormat]);

  // Remove field
  const handleDeleteField = (indexToDelete: number) => {
    if (fields.length <= 1) {
      alert("Schemas must feature at least one core database field.");
      return;
    }
    setFields(fields.filter((_, idx) => idx !== indexToDelete));
  };

  // Add field
  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = newFieldName.trim().replace(/[^a-zA-Z0-9_]/g, '');
    if (!cleanName) return;

    if (fields.some(f => f.name === cleanName)) {
      alert("A field named '" + cleanName + "' already exists in the blueprint.");
      return;
    }

    const fieldConfig: FieldConfig = {
      name: cleanName,
      type: newFieldType,
      ...(newFieldType === 'number' ? { min: newFieldMin, max: newFieldMax } : {})
    };

    setFields([...fields, fieldConfig]);
    setNewFieldName('');
  };

  // Change single field config properties
  const handleUpdateFieldType = (index: number, newType: FieldConfig['type']) => {
    const updated = [...fields];
    updated[index].type = newType;
    if (newType === 'number') {
      updated[index].min = 10;
      updated[index].max = 1000;
    }
    setFields(updated);
  };

  const handleUpdateFieldName = (index: number, newName: string) => {
    const updated = [...fields];
    updated[index].name = newName.trim().replace(/[^a-zA-Z0-9_]/g, '');
    setFields(updated);
  };

  // File downloads
  const handleDownloadFile = () => {
    const extensions = { json: 'json', csv: 'csv', xml: 'xml', yaml: 'yaml' };
    const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mock_dataset_${recordCount}_records.${extensions[outputFormat]}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate file sizes
  const byteCount = new TextEncoder().encode(outputText).length;
  const fileSizeDisplay = byteCount > 1024 
    ? `${(byteCount / 1024).toFixed(2)} KB` 
    : `${byteCount} Bytes`;

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0 bg-[#0F172A]" id="blueprint-workspace-canvas">
      
      {/* LOCAL SUB-TOOLBAR */}
      <div className="bg-[#1E293B] border-b border-slate-800/80 px-6 py-3 shrink-0 flex flex-col md:flex-row gap-4 items-center justify-between animate-fade-in" id="blueprint-header-menu">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-emerald-600/10 rounded-lg text-emerald-400 border border-emerald-500/20">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">Raw Dev-Data & Blueprint Generator</h2>
            <p className="text-[10px] text-slate-400 font-mono">Create beautiful mock databases, GFM tables, test schemas in JSON/CSV</p>
          </div>
        </div>

        {/* Global format tabs selectable */}
        <div className="flex items-center bg-slate-950/60 p-1 rounded-xl border border-slate-800" id="blueprint-format-tabs">
          {(['json', 'csv', 'xml', 'yaml'] as const).map((format) => (
            <button
              key={format}
              onClick={() => setOutputFormat(format)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase transition cursor-pointer ${
                outputFormat === format 
                  ? 'bg-emerald-650 text-white shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {format}
            </button>
          ))}
        </div>
      </div>

      {/* PARAMETERS CONFIG CONTROL SHEET */}
      <div className="bg-slate-900 border-b border-slate-800/40 p-4.5 shrink-0 flex flex-wrap items-center justify-between gap-5" id="blueprint-data-metrics-board">
        
        {/* Record count sliders */}
        <div className="flex items-center gap-4 bg-slate-950/45 px-4 py-2 rounded-xl border border-slate-800/85">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">RECORDS TO GENERATE:</span>
          <div className="flex items-center gap-3">
            <input 
              type="range" 
              min="5" 
              max="150" 
              value={recordCount}
              onChange={(e) => setRecordCount(parseInt(e.target.value))}
              className="accent-emerald-500 cursor-pointer w-32" 
            />
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-md min-w-[36px] text-center">
              {recordCount}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleGenerate}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-755 border border-slate-705 text-slate-250 hover:text-white text-[11px] rounded-lg flex items-center gap-2 font-bold cursor-pointer transition"
          >
            <Dices className="w-3.5 h-3.5 text-emerald-400" />
            <span>Reseed Random Data</span>
          </button>

          <button
            onClick={handleDownloadFile}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-755 border border-slate-705 text-slate-250 hover:text-white text-[11px] rounded-lg flex items-center gap-2 font-bold cursor-pointer transition"
          >
            <FileDown className="w-3.5 h-3.5 text-emerald-400" />
            <span>Download Data</span>
          </button>

          <span className="border-l border-slate-800 h-5 mx-0.5"></span>

          <div className="text-[10px] bg-slate-950 border border-slate-850 py-1.5 px-3.5 rounded-lg text-slate-450 font-mono select-none">
            DATA VOLUME: <span className="text-emerald-400 font-bold ml-1">{fileSizeDisplay}</span>
          </div>
        </div>
      </div>

      {/* TWIN BLUEPRINTS WORKSPACE */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0 select-text" id="blueprint-canvas-workspace">
        
        {/* Mid-Content Ad Slot Banner */}
        <div className="mb-4">
          <AdsenseBanner type="midContent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left panel: Schema editor builder column (width config) */}
          <div className="lg:col-span-5 flex flex-col gap-4.5 bg-[#1B253B] rounded-2xl border border-slate-800/70 p-4.5 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-widest">Blueprint Schema Schema</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-450 bg-slate-950 px-2 py-0.5 rounded">{fields.length} active fields</span>
            </div>

            {/* List of active schema fields */}
            <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1 select-none" id="blueprint-active-rows">
              {fields.map((field, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700 transition">
                  <div className="text-[10px] font-mono text-slate-500 w-4 font-bold text-center">
                    {fIdx + 1}
                  </div>
                  
                  {/* Field key name */}
                  <input
                    type="text"
                    value={field.name}
                    onChange={(e) => handleUpdateFieldName(fIdx, e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-[11px] font-mono text-white focus:outline-hidden focus:border-emerald-500"
                    placeholder="field_key"
                  />

                  {/* DataType Selector */}
                  <select
                    value={field.type}
                    onChange={(e) => handleUpdateFieldType(fIdx, e.target.value as any)}
                    className="bg-slate-950 border border-slate-850 text-[10px] text-emerald-350 px-2 py-1.5 rounded-lg font-semibold focus:outline-hidden cursor-pointer"
                  >
                    <option value="id">Sequential Index (1, 2...)</option>
                    <option value="uuid">Universal UUID v4</option>
                    <option value="name">Random Human Full Name</option>
                    <option value="email">Matching Email Domain</option>
                    <option value="role">Professional Job Role</option>
                    <option value="company">Authentic Corporate Corp</option>
                    <option value="country">Universal Country Name</option>
                    <option value="status">Process Status Enum</option>
                    <option value="created_at">Timestamp ISO date</option>
                    <option value="boolean">Random Boolean status</option>
                  </select>

                  {/* Detacher remove field */}
                  <button
                    onClick={() => handleDeleteField(fIdx)}
                    className="p-1.5 text-slate-500 hover:text-rose-450 hover:bg-slate-950 rounded transition cursor-pointer"
                    title="Remove Field"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Form to submit and append a brand-new custom key-value field */}
            <form onSubmit={handleAddField} className="mt-2.5 bg-slate-950/50 p-3 rounded-xl border border-slate-850/60 flex flex-col gap-3">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                APPEND NEW SCHEMA FIELD:
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <input
                  type="text"
                  required
                  value={newFieldName}
                  onChange={(e) => setNewFieldName(e.target.value)}
                  placeholder="e.g. employee_role"
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-[11px] font-mono text-emerald-300 focus:outline-hidden focus:border-emerald-500 placeholder-slate-600"
                />

                <select
                  value={newFieldType}
                  onChange={(e) => setNewFieldType(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-300 focus:outline-hidden cursor-pointer"
                >
                  <option value="id">Index (Sequential)</option>
                  <option value="uuid">UUID v4 String</option>
                  <option value="name">Full Name</option>
                  <option value="email">Email</option>
                  <option value="role">Developer Job Role</option>
                  <option value="company">Tech Company Name</option>
                  <option value="country">Country</option>
                  <option value="status">Status Enum</option>
                  <option value="created_at">ISO Timestamp</option>
                  <option value="boolean">Boolean True/False</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#182C25] border border-[#234A3E] hover:bg-[#203D33] text-emerald-300 hover:text-white transition font-bold py-1.5 px-3 rounded-lg text-[11px] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Inject Field to Schema</span>
              </button>
            </form>

          </div>

          {/* Right panel: Live Generated Dataset Compiler View Code Display */}
          <div className="lg:col-span-7 flex flex-col bg-slate-950 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl h-[460px]">
            
            <div className="h-11 px-4.5 bg-[#111827] border-b border-slate-850/80 flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-bold text-slate-300 font-mono uppercase tracking-widest">
                  COMPILED PREVIEW DATA • {outputFormat}
                </span>
              </div>

              <button 
                onClick={copyToClipboard}
                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1.5 font-mono transition cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 font-bold" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Output Block'}</span>
              </button>
            </div>

            <div className="flex-1 overflow-auto bg-[#070b14] p-4.5 font-mono text-[11px] leading-relaxed relative scrollbar-thin scrollbar-thumb-slate-800 select-text">
              <pre className="text-emerald-300 whitespace-pre">{outputText}</pre>
            </div>

          </div>

        </div>

        {/* High-fidelity SEO optimization copy */}
        <div className="mt-8 select-text">
          <ToolSeoContent tool="blueprint" />
        </div>

        {/* Footer Ad Slot Banner */}
        <div className="mt-10">
          <AdsenseBanner type="footer" />
        </div>

      </div>

    </div>
  );
}

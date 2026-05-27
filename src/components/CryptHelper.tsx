import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Binary, 
  RotateCcw, 
  Copy, 
  Check, 
  Globe, 
  FileLock2, 
  FileCode, 
  Trash2,
  Upload,
  Fingerprint
} from 'lucide-react';
import { 
  base64Encode, 
  base64Decode, 
  urlEncode, 
  urlDecode, 
  computeHash, 
  computeMD5 
} from '../utils/crypto';
import { AdsenseBanner } from './AdsenseBanner';
import { ToolSeoContent } from './ToolSeoContent';

type CryptMode = 'base64' | 'url' | 'hash';

export default function CryptHelper() {
  const [activeTab, setActiveTab] = useState<CryptMode>('base64');
  const [inputText, setInputText] = useState<string>('Welcome to DevHub Pro. Clean, beautiful, and secure code translation.');
  const [outputText, setOutputText] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Config States
  const [b64Base64Url, setB64Base64Url] = useState<boolean>(false);
  const [urlType, setUrlType] = useState<'standard' | 'component' | 'all'>('component');
  const [selectedHashAlg, setSelectedHashAlg] = useState<'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512'>('SHA-256');

  // Interactive copy feedback status
  const [copiedInput, setCopiedInput] = useState<boolean>(false);
  const [copiedOutput, setCopiedOutput] = useState<boolean>(false);

  // Clear inputs
  const clearFields = () => {
    setInputText('');
    setOutputText('');
    setErrorMsg('');
  };

  // Switch input and output
  const swapInputOutput = () => {
    setInputText(outputText);
    setOutputText(inputText);
    setErrorMsg('');
  };

  // Clipboard copies
  const handleCopy = (text: string, setFlag: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setFlag(true);
    setTimeout(() => setFlag(false), 2000);
  };

  // Interactive live updates
  useEffect(() => {
    setErrorMsg('');
    if (!inputText) {
      setOutputText('');
      return;
    }

    const processTranslation = async () => {
      try {
        if (activeTab === 'base64') {
          // Standard encoding is default, then we can convert output to URL-safe if chosen
          let encoded = base64Encode(inputText);
          if (b64Base64Url) {
            encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
          }
          setOutputText(encoded);
        } else if (activeTab === 'url') {
          setOutputText(urlEncode(inputText, urlType));
        } else if (activeTab === 'hash') {
          if (selectedHashAlg === 'MD5') {
            setOutputText(computeMD5(inputText));
          } else {
            const hashResult = await computeHash(inputText, selectedHashAlg);
            setOutputText(hashResult);
          }
        }
      } catch (err) {
        setOutputText('');
        setErrorMsg((err as Error).message || 'Calculation error occurred.');
      }
    };

    processTranslation();
  }, [inputText, activeTab, b64Base64Url, urlType, selectedHashAlg]);

  // Handle manual decoding (when converting Base64 or URL back to raw text)
  const handleDecodeAction = () => {
    setErrorMsg('');
    if (!inputText) return;
    try {
      if (activeTab === 'base64') {
        let inputToDecode = inputText.trim();
        // Convert URL-safe base64 back to standard base64 if needed
        if (b64Base64Url || /[-_]/.test(inputToDecode)) {
          inputToDecode = inputToDecode.replace(/-/g, '+').replace(/_/g, '/');
          while (inputToDecode.length % 4) {
            inputToDecode += '=';
          }
        }
        setOutputText(base64Decode(inputToDecode));
      } else if (activeTab === 'url') {
        setOutputText(urlDecode(inputText, urlType === 'standard' ? 'standard' : 'component'));
      }
    } catch (err) {
      setErrorMsg((err as Error).message || 'Decoding failed. Please verify source integrity.');
    }
  };

  // Quick preset loader buttons
  const loadPreset = (preset: string) => {
    setInputText(preset);
  };

  // Handle Drag and Drop for Crypt Target text
  const [dragActive, setDragActive] = useState<boolean>(false);
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setInputText(event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0 bg-[#0F172A]" id="crypto-workspace-main">
      
      {/* LOCAL SUB-MENU BAR */}
      <div className="bg-[#1E293B] border-b border-slate-800/80 px-6 py-3 shrink-0 flex flex-col md:flex-row gap-4 items-center justify-between" id="crypto-header-menu">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-violet-600/10 rounded-lg text-violet-400 border border-violet-500/20">
            <Fingerprint className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">Cryptographic & Encoding Helper</h2>
            <p className="text-[10px] text-slate-400 font-mono">Convert text schemas, sign hex digests, decode parameters safely</p>
          </div>
        </div>

        {/* Local Tab Selectors */}
        <div className="flex bg-slate-950/60 p-1 rounded-xl border border-slate-800" id="crypto-action-tabs">
          <button
            onClick={() => { setActiveTab('base64'); setErrorMsg(''); }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[11px] font-bold cursor-pointer transition ${
              activeTab === 'base64' 
                ? 'bg-violet-600 text-white shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Binary className="w-3 h-3" />
            <span>Base64</span>
          </button>

          <button
            onClick={() => { setActiveTab('url'); setErrorMsg(''); }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[11px] font-bold cursor-pointer transition ${
              activeTab === 'url' 
                ? 'bg-violet-600 text-white shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3 h-3" />
            <span>URL En/Decoder</span>
          </button>

          <button
            onClick={() => { setActiveTab('hash'); setErrorMsg(''); }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[11px] font-bold cursor-pointer transition ${
              activeTab === 'hash' 
                ? 'bg-violet-600 text-white shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileLock2 className="w-3 h-3" />
            <span>Secure Hashes</span>
          </button>
        </div>
      </div>

      {/* DETAILED OPTIONS ACCENTS SHADOW */}
      <div className="bg-slate-900 border-b border-slate-800/40 p-4.5 shrink-0 flex flex-wrap items-center justify-between gap-4" id="crypto-config-box">
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Key className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Active Rules</span>
          </div>

          {/* Tab Specific Settings Checkboxes */}
          {activeTab === 'base64' && (
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={b64Base64Url}
                onChange={() => setB64Base64Url(!b64Base64Url)}
                className="accent-violet-500 rounded border-slate-700 bg-slate-950 cursor-pointer" 
              />
              <span>URL-Safe Alphabet <span className="text-[10px] font-mono text-slate-500">(-_ instead of +/)</span></span>
            </label>
          )}

          {activeTab === 'url' && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Character Range:</span>
              <select
                value={urlType}
                onChange={(e) => setUrlType(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 text-[11px] text-violet-300 rounded-md px-2 py-0.5"
              >
                <option value="component">Standard URL Component (encodeURIComponent)</option>
                <option value="standard">Standard URL Address (encodeURI)</option>
                <option value="all">Strict Full Percent Encoding (Every single char)</option>
              </select>
            </div>
          )}

          {activeTab === 'hash' && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Hashing Formula:</span>
              <div className="flex items-center gap-1.5 bg-slate-950/70 border border-slate-800 p-0.5 rounded-lg">
                {(['MD5', 'SHA-1', 'SHA-256', 'SHA-512'] as const).map((alg) => (
                  <button
                    key={alg}
                    onClick={() => setSelectedHashAlg(alg)}
                    className={`px-2 py-1 text-[10px] uppercase font-bold rounded transiton cursor-pointer ${
                      selectedHashAlg === alg 
                        ? 'bg-violet-600 text-white shadow-xs' 
                        : 'text-slate-450 hover:text-white'
                    }`}
                  >
                    {alg}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick sample loading helpers */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest select-none">Source Snippets:</span>
          <button 
            onClick={() => loadPreset('{"id": 412, "name": "Admin Dev", "access": ["read", "write", "sudo"]}')}
            className="text-[10px] bg-slate-800 hover:bg-slate-750 border border-slate-751 px-2 py-0.5 rounded text-slate-300 hover:text-white transition cursor-pointer"
          >
            JSON Raw
          </button>
          <button 
            onClick={() => loadPreset('https://example.com/api/v1/auth/callback?code=748fba109c91b6de&scope=user:mail')}
            className="text-[10px] bg-slate-800 hover:bg-slate-750 border border-slate-751 px-2 py-0.5 rounded text-slate-300 hover:text-white transition cursor-pointer"
          >
            Complex URL
          </button>
          <button 
            onClick={() => loadPreset('The quick brown fox jumps over the lazy dog')}
            className="text-[10px] bg-slate-800 hover:bg-slate-750 border border-slate-751 px-2 py-0.5 rounded text-slate-300 hover:text-white transition cursor-pointer"
          >
            Fox Phrase
          </button>
        </div>
      </div>

      {/* CORE INPUT & OUTPUT SIDE BY SIDE GRID CONTAINER */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0 select-text" id="crypto-canvas">
        
        {/* Mid-Content Ad Slot Banner */}
        <div className="mb-4">
          <AdsenseBanner type="midContent" />
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-950/20 border border-rose-500/20 rounded-xl text-rose-300 font-mono text-[10px] mb-4.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-[360px]" id="crypto-fields-box">
          
          {/* Output Block Original Source Input */}
          <div 
            className={`flex flex-col rounded-xl border p-4.5 bg-[#1B253B] transition-all relative ${
              dragActive ? 'border-violet-500 bg-violet-950/15' : 'border-slate-800'
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex items-center justify-between text-xs mb-3 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800 select-none">
              <div className="flex items-center gap-2 font-bold text-slate-300">
                <FileCode className="w-3.5 h-3.5 text-slate-400" />
                <span>INPUT COMPILATION TEXT</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-500">
                  {inputText.length} chars
                </span>
                <span className="border-l border-slate-800 h-3"></span>
                <button 
                  onClick={() => handleCopy(inputText, setCopiedInput)}
                  className="text-[10px] text-slate-450 hover:text-white flex items-center gap-1 font-mono transition cursor-pointer"
                >
                  {copiedInput ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy</span>
                </button>
              </div>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 min-h-[180px] text-[11px] font-mono bg-slate-950/80 text-violet-100 hover:text-white focus:text-white border border-slate-850 focus:border-violet-500 focus:outline-hidden p-3 rounded-lg leading-relaxed focus:ring-1 focus:ring-violet-505/30 transition shadow-inner"
              placeholder="Input unicode code, base64 strings, hash raw sentences, or parameters to decode..."
              id="raw-crypt-input"
            />

            {dragActive && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center border border-violet-500 border-dashed rounded-xl select-none">
                <div className="text-center">
                  <Upload className="w-8 h-8 text-violet-400 mx-auto mb-2 animate-bounce" />
                  <p className="text-xs font-bold text-white">Release File to Crypt-input</p>
                  <p className="text-[10px] text-slate-500 mt-1">UTF-8 compatible files supported</p>
                </div>
              </div>
            )}
          </div>

          {/* Output Block Translated Destination Output */}
          <div className="flex flex-col rounded-xl border p-4.5 bg-[#1B253B] border-slate-850">
            <div className="flex items-center justify-between text-xs mb-3 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800 select-none">
              <div className="flex items-center gap-2 font-bold text-slate-300">
                <Binary className="w-3.5 h-3.5 text-violet-400" />
                <span>OUTPUT RESULT</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-500">
                  {outputText.length} chars
                </span>
                <span className="border-l border-slate-800 h-3"></span>
                <button 
                  onClick={() => handleCopy(outputText, setCopiedOutput)}
                  className="text-[10px] text-slate-450 hover:text-white flex items-center gap-1 font-mono transition cursor-pointer"
                >
                  {copiedOutput ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy</span>
                </button>
              </div>
            </div>

            <textarea
              value={outputText}
              readOnly
              className="flex-1 min-h-[180px] text-[11px] font-mono bg-slate-950/90 text-emerald-250 border border-slate-850 p-3 rounded-lg leading-relaxed shadow-inner focus:outline-hidden"
              placeholder="Output will be computed automatically dynamically with live tracking update..."
              id="raw-crypt-output"
            />
          </div>

        </div>

        {/* SWAP AND DECODE UTILITIES BUTTON BAR */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 select-none" id="crypto-action-bar">
          <div className="flex gap-2">
            {activeTab !== 'hash' && (
              <button
                onClick={handleDecodeAction}
                className="px-4 py-1.5 bg-violet-650 hover:bg-violet-600 text-white text-[11px] rounded-lg flex items-center gap-1.5 font-bold cursor-pointer shadow transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Manual Decode Input</span>
              </button>
            )}

            {activeTab !== 'hash' && (
              <button
                onClick={swapInputOutput}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-[11px] rounded-lg border border-slate-700 flex items-center gap-1.5 font-bold cursor-pointer transition"
              >
                <span>Swap Input/Output</span>
              </button>
            )}

            <button
              onClick={clearFields}
              className="px-3.5 py-1.5 bg-slate-850 hover:bg-slate-800 text-rose-455 hover:text-rose-400 text-[11px] rounded-lg border border-slate-800 flex items-center gap-1.5 font-bold cursor-pointer transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Text Fields</span>
            </button>
          </div>

          <div className="text-[10px] text-slate-500 font-mono">
            {activeTab === 'hash' ? 'Hashes are cryptographic one-way digests and cannot be decoded' : 'Instant decoding translations are processed instantly locally'}
          </div>
        </div>

        {/* High-fidelity SEO optimization copy */}
        <div className="mt-8 select-text">
          <ToolSeoContent tool="crypto" />
        </div>

        {/* Footer Ad Slot Banner */}
        <div className="mt-10">
          <AdsenseBanner type="footer" />
        </div>

      </div>

    </div>
  );
}

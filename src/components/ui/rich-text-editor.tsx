'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Table as TableIcon,
  Quote,
  Code,
  FileCode,
  Eye,
  Sparkles,
  Undo,
  Redo,
  Palette,
  CheckSquare,
  Minus,
  Maximize2,
  Minimize2,
  Eraser,
  HelpCircle,
  Check,
  X,
  ChevronDown,
  Type,
} from 'lucide-react';

export interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  minHeight?: string;
  className?: string;
  helperText?: string;
  enableFullscreen?: boolean;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label,
  value = '',
  onChange,
  placeholder = 'Write formatted rich content or HTML here...',
  rows = 4,
  minHeight = '140px',
  className = '',
  helperText,
  enableFullscreen = true,
}) => {
  const [mode, setMode] = useState<'visual' | 'html' | 'preview'>('visual');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);

  // Link Dialog State
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkTargetBlank, setLinkTargetBlank] = useState(true);

  // Image Dialog State
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  // Table Dialog State
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  // Live Statistics
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  // DOM Refs
  const editorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lastHtmlRef = useRef<string>(value || '');
  const isInitialMount = useRef<boolean>(true);
  const savedSelectionRange = useRef<Range | null>(null);

  // Utility to calculate words and characters
  const updateStats = useCallback((html: string) => {
    if (typeof document === 'undefined') return;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html || '';
    const text = tempDiv.textContent || tempDiv.innerText || '';
    setCharCount(text.length);
    const words = text.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
  }, []);

  // Save current selection for toolbar action modals
  const saveCurrentSelection = () => {
    if (typeof window === 'undefined') return;
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelectionRange.current = sel.getRangeAt(0).cloneRange();
    }
  };

  // Restore selection before inserting HTML or links
  const restoreSavedSelection = () => {
    if (typeof window === 'undefined') return;
    if (savedSelectionRange.current) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedSelectionRange.current);
      }
    }
  };

  // Synchronize incoming value prop from parent (only when externally changed)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      lastHtmlRef.current = value || '';
      if (editorRef.current) {
        editorRef.current.innerHTML = lastHtmlRef.current;
      }
      updateStats(lastHtmlRef.current);
      return;
    }

    // If external value differs from what we emitted, safely update DOM without cursor jumps
    if (value !== lastHtmlRef.current) {
      lastHtmlRef.current = value || '';
      if (editorRef.current && editorRef.current.innerHTML !== lastHtmlRef.current) {
        editorRef.current.innerHTML = lastHtmlRef.current;
      }
      updateStats(lastHtmlRef.current);
    }
  }, [value, updateStats]);

  // Handle typing inside contentEditable editor (Zero cursor jumps)
  const handleEditorInput = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    lastHtmlRef.current = html;
    updateStats(html);
    onChange(html);
  };

  // Handle typing inside HTML source code textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const html = e.target.value;
    lastHtmlRef.current = html;
    updateStats(html);
    onChange(html);
  };

  // Execute standard formatting commands without blurring the editor
  const executeCommand = (command: string, val: string = '') => {
    if (mode === 'html' && textareaRef.current) {
      // In HTML mode, execute quick tag wrap
      const ta = textareaRef.current;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selText = ta.value.substring(start, end);
      let openTag = '';
      let closeTag = '';

      switch (command) {
        case 'bold':
          openTag = '<strong>';
          closeTag = '</strong>';
          break;
        case 'italic':
          openTag = '<em>';
          closeTag = '</em>';
          break;
        case 'underline':
          openTag = '<u>';
          closeTag = '</u>';
          break;
        case 'strikeThrough':
          openTag = '<del>';
          closeTag = '</del>';
          break;
        case 'formatBlock':
          openTag = val;
          closeTag = val.replace('<', '</');
          break;
        default:
          break;
      }

      if (openTag) {
        const replacement = `${openTag}${selText || 'text'}${closeTag}`;
        const newHtml = ta.value.substring(0, start) + replacement + ta.value.substring(end);
        lastHtmlRef.current = newHtml;
        onChange(newHtml);
        setTimeout(() => {
          ta.focus();
          ta.setSelectionRange(start + openTag.length, start + openTag.length + (selText.length || 4));
        }, 0);
      }
      return;
    }

    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, val);
    handleEditorInput();
  };

  // Insert arbitrary HTML fragment at current selection / caret
  const insertHtmlFragment = (htmlSnippet: string) => {
    if (mode === 'html' && textareaRef.current) {
      const ta = textareaRef.current;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newHtml = ta.value.substring(0, start) + htmlSnippet + ta.value.substring(end);
      lastHtmlRef.current = newHtml;
      onChange(newHtml);
      setTimeout(() => {
        ta.focus();
        ta.setSelectionRange(start + htmlSnippet.length, start + htmlSnippet.length);
      }, 0);
      return;
    }

    if (editorRef.current) {
      editorRef.current.focus();
    }
    restoreSavedSelection();

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) {
      if (editorRef.current) {
        editorRef.current.innerHTML += htmlSnippet;
        handleEditorInput();
      }
      return;
    }

    const range = sel.getRangeAt(0);
    range.deleteContents();

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlSnippet;
    const frag = document.createDocumentFragment();
    let node: Node | null;
    let lastNode: Node | null = null;
    while ((node = tempDiv.firstChild)) {
      lastNode = frag.appendChild(node);
    }
    range.insertNode(frag);

    if (lastNode) {
      const newRange = range.cloneRange();
      newRange.setStartAfter(lastNode);
      newRange.collapse(true);
      sel.removeAllRanges();
      sel.addRange(newRange);
    }

    handleEditorInput();
  };

  // Mode switching with synchronized buffer
  const handleModeChange = (newMode: 'visual' | 'html' | 'preview') => {
    if (newMode === mode) return;

    if (mode === 'html' && textareaRef.current) {
      lastHtmlRef.current = textareaRef.current.value;
    } else if (mode === 'visual' && editorRef.current) {
      lastHtmlRef.current = editorRef.current.innerHTML;
    }

    setMode(newMode);

    if (newMode === 'visual') {
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = lastHtmlRef.current;
        }
      }, 0);
    }
  };

  // Keyboard shortcuts handling
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      executeCommand('insertHTML', '&nbsp;&nbsp;&nbsp;&nbsp;');
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      executeCommand('bold');
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      executeCommand('italic');
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
      e.preventDefault();
      executeCommand('underline');
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      if (e.shiftKey) {
        e.preventDefault();
        executeCommand('redo');
      } else {
        e.preventDefault();
        executeCommand('undo');
      }
    }
  };

  // Textarea Tab key handling in HTML code mode
  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const val = ta.value;
      ta.value = val.substring(0, start) + '  ' + val.substring(end);
      ta.selectionStart = ta.selectionEnd = start + 2;
      handleTextareaChange(e as any);
    }
  };

  // Link submission
  const handleApplyLink = () => {
    if (!linkUrl.trim()) return;
    const target = linkTargetBlank ? ' target="_blank" rel="noopener noreferrer"' : '';
    const text = linkText.trim() || linkUrl.trim();
    const linkHtml = `<a href="${linkUrl.trim()}"${target} class="text-blue-600 hover:text-blue-800 underline font-medium">${text}</a>`;
    insertHtmlFragment(linkHtml);
    setShowLinkModal(false);
    setLinkUrl('');
    setLinkText('');
  };

  // Image submission
  const handleApplyImage = () => {
    if (!imageUrl.trim()) return;
    const alt = imageAlt.trim() ? ` alt="${imageAlt.trim()}"` : ' alt="Embedded image"';
    const imgHtml = `<img src="${imageUrl.trim()}"${alt} class="rounded-xl shadow-md max-w-full my-2 border border-slate-200" />`;
    insertHtmlFragment(imgHtml);
    setShowImageModal(false);
    setImageUrl('');
    setImageAlt('');
  };

  // Table submission
  const handleApplyTable = () => {
    let tableHtml = '<table class="w-full border-collapse border border-slate-300 text-xs my-2.5 rounded-lg overflow-hidden">';
    tableHtml += '<thead><tr class="bg-slate-100">';
    for (let c = 1; c <= tableCols; c++) {
      tableHtml += `<th class="border border-slate-300 p-2 text-left font-bold text-slate-800">Header ${c}</th>`;
    }
    tableHtml += '</tr></thead><tbody>';
    for (let r = 1; r <= tableRows; r++) {
      tableHtml += '<tr class="hover:bg-slate-50">';
      for (let c = 1; c <= tableCols; c++) {
        tableHtml += `<td class="border border-slate-300 p-2 text-slate-700">Cell ${r}-${c}</td>`;
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</tbody></table><p><br></p>';
    insertHtmlFragment(tableHtml);
    setShowTableModal(false);
  };

  return (
    <div
      className={`space-y-1.5 ${
        isFullscreen
          ? 'fixed inset-0 z-[999999] bg-slate-950/85 backdrop-blur-md p-4 sm:p-8 flex flex-col justify-center animate-in fade-in duration-150'
          : className
      }`}
    >
      {/* Editor Top Navigation Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 ${isFullscreen ? 'bg-white p-3.5 rounded-t-2xl border border-b-0 border-slate-300 max-w-5xl w-full mx-auto shadow-2xl' : ''}`}>
        {label ? (
          <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {label}
          </label>
        ) : (
          <div />
        )}

        {/* Mode Switcher Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap self-start sm:self-auto select-none">
          <button
            type="button"
            onClick={() => handleModeChange('visual')}
            className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold border transition flex items-center gap-1.5 ${
              mode === 'visual'
                ? 'bg-[#002060] text-amber-300 border-[#002060] shadow-sm ring-1 ring-amber-400/40'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
          >
            <Type className="w-3 h-3" />
            Visual Editor
          </button>

          <button
            type="button"
            onClick={() => handleModeChange('html')}
            className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold border transition flex items-center gap-1.5 ${
              mode === 'html'
                ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
          >
            <FileCode className="w-3 h-3" />
            HTML Source
          </button>

          <button
            type="button"
            onClick={() => handleModeChange('preview')}
            className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold border transition flex items-center gap-1.5 ${
              mode === 'preview'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
          >
            <Eye className="w-3 h-3" />
            Live Preview
          </button>

          {enableFullscreen && (
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-300 transition ml-1"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Editor'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Main Editor Container */}
      <div
        className={`rounded-2xl border border-slate-300 overflow-hidden bg-white shadow-sm transition ${
          isFullscreen ? 'max-w-5xl w-full mx-auto flex-1 flex flex-col shadow-2xl rounded-t-none' : 'focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500'
        }`}
      >
        {/* Full Rich Formatting Toolbar (Active in Visual & HTML mode) */}
        {mode !== 'preview' && (
          <div className="bg-slate-50 border-b border-slate-200 p-1.5 flex flex-wrap items-center gap-1 text-slate-600 select-none">
            {/* History Controls */}
            <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1 mr-0.5">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('undo');
                }}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Undo (Ctrl+Z)"
              >
                <Undo className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('redo');
                }}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Redo (Ctrl+Y)"
              >
                <Redo className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Typography Styles */}
            <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1 mr-0.5">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('bold');
                }}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Bold (Ctrl+B)"
              >
                <Bold className="w-3.5 h-3.5 font-bold" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('italic');
                }}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Italic (Ctrl+I)"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('underline');
                }}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Underline (Ctrl+U)"
              >
                <Underline className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('strikeThrough');
                }}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Strikethrough"
              >
                <Strikethrough className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('subscript');
                }}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition hidden sm:inline-flex"
                title="Subscript (X₂)"
              >
                <Subscript className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('superscript');
                }}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition hidden sm:inline-flex"
                title="Superscript (X²)"
              >
                <Superscript className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Headings & Blocks */}
            <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1 mr-0.5">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('formatBlock', '<h1>');
                }}
                className="px-1.5 py-1 rounded hover:bg-slate-200 text-slate-800 text-[10px] font-black font-serif"
                title="Heading 1"
              >
                H1
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('formatBlock', '<h2>');
                }}
                className="px-1.5 py-1 rounded hover:bg-slate-200 text-slate-800 text-[10px] font-black font-serif"
                title="Heading 2"
              >
                H2
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('formatBlock', '<h3>');
                }}
                className="px-1.5 py-1 rounded hover:bg-slate-200 text-slate-800 text-[10px] font-black font-serif"
                title="Heading 3"
              >
                H3
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('formatBlock', '<p>');
                }}
                className="px-1.5 py-1 rounded hover:bg-slate-200 text-slate-700 text-[10px] font-bold"
                title="Paragraph"
              >
                ¶
              </button>
            </div>

            {/* Alignment Controls */}
            <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1 mr-0.5">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('justifyLeft');
                }}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Align Left"
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('justifyCenter');
                }}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Align Center"
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('justifyRight');
                }}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Align Right"
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('justifyFull');
                }}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition hidden sm:inline-flex"
                title="Justify"
              >
                <AlignJustify className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Lists & Quotes */}
            <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1 mr-0.5">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('insertUnorderedList');
                }}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Bullet List"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('insertOrderedList');
                }}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Numbered List"
              >
                <ListOrdered className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('formatBlock', '<blockquote>');
                }}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Blockquote"
              >
                <Quote className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Colors & Badges Popover Trigger */}
            <div className="relative border-r border-slate-200 pr-1 mr-0.5">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  saveCurrentSelection();
                  setShowColorPicker(!showColorPicker);
                }}
                className="px-2 py-1 rounded hover:bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center gap-1 transition"
                title="Color & Badge Palettes"
              >
                <Palette className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Styles</span>
                <ChevronDown className="w-2.5 h-2.5 opacity-60" />
              </button>

              {/* Color & Styles Dropdown Modal */}
              {showColorPicker && (
                <div
                  className="absolute left-0 top-full mt-1 z-50 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 w-64 text-xs space-y-2.5 animate-in zoom-in-95 duration-100"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Text Colors
                    </span>
                    <div className="flex items-center gap-1.5">
                      {[
                        { label: 'Royal Navy', color: '#002060', bg: 'bg-[#002060]' },
                        { label: 'Amber Gold', color: '#d97706', bg: 'bg-amber-600' },
                        { label: 'Emerald', color: '#059669', bg: 'bg-emerald-600' },
                        { label: 'Rose Red', color: '#dc2626', bg: 'bg-rose-600' },
                        { label: 'Purple', color: '#7c3aed', bg: 'bg-purple-600' },
                        { label: 'Dark Slate', color: '#0f172a', bg: 'bg-slate-900' },
                      ].map((item) => (
                        <button
                          key={item.color}
                          type="button"
                          onClick={() => {
                            executeCommand('foreColor', item.color);
                            setShowColorPicker(false);
                          }}
                          className={`w-6 h-6 rounded-full ${item.bg} border-2 border-white shadow-sm hover:scale-110 transition`}
                          title={item.label}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Background Highlights
                    </span>
                    <div className="flex items-center gap-1.5">
                      {[
                        { label: 'Yellow', color: '#fef08a', bg: 'bg-yellow-200' },
                        { label: 'Light Blue', color: '#dbeafe', bg: 'bg-blue-100' },
                        { label: 'Light Green', color: '#d1fae5', bg: 'bg-emerald-100' },
                        { label: 'Light Rose', color: '#ffe4e6', bg: 'bg-rose-100' },
                        { label: 'Amber Tint', color: '#fef3c7', bg: 'bg-amber-100' },
                      ].map((item) => (
                        <button
                          key={item.color}
                          type="button"
                          onClick={() => {
                            executeCommand('hiliteColor', item.color);
                            setShowColorPicker(false);
                          }}
                          className={`w-6 h-6 rounded-md ${item.bg} border border-slate-300 shadow-xs hover:scale-110 transition`}
                          title={item.label}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Institutional Badge Tags
                    </span>
                    <div className="grid grid-cols-2 gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          insertHtmlFragment(
                            '<span class="inline-block bg-blue-100 text-blue-900 border border-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full mx-1 shadow-xs">SGM Important</span>'
                          );
                          setShowColorPicker(false);
                        }}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded px-1.5 py-1 text-[9px] font-bold text-left"
                      >
                        🏷️ Blue Badge
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          insertHtmlFragment(
                            '<span class="inline-block bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full mx-1 shadow-xs">Admissions 2026</span>'
                          );
                          setShowColorPicker(false);
                        }}
                        className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded px-1.5 py-1 text-[9px] font-bold text-left"
                      >
                        ⭐ Gold Badge
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          insertHtmlFragment(
                            '<span class="inline-block bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full mx-1 shadow-xs">Verified</span>'
                          );
                          setShowColorPicker(false);
                        }}
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded px-1.5 py-1 text-[9px] font-bold text-left"
                      >
                        ✅ Green Badge
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          insertHtmlFragment(
                            '<span class="inline-block bg-rose-100 text-rose-900 border border-rose-300 text-[10px] font-bold px-2 py-0.5 rounded-full mx-1 shadow-xs">Notice</span>'
                          );
                          setShowColorPicker(false);
                        }}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded px-1.5 py-1 text-[9px] font-bold text-left"
                      >
                        📢 Notice Pill
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Media & Interactive Inserts */}
            <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1 mr-0.5">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  saveCurrentSelection();
                  setShowLinkModal(true);
                }}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Insert Hyperlink"
              >
                <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  saveCurrentSelection();
                  setShowImageModal(true);
                }}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition hidden sm:inline-flex"
                title="Embed Image URL"
              >
                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  saveCurrentSelection();
                  setShowTableModal(true);
                }}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition hidden sm:inline-flex"
                title="Insert Responsive Table"
              >
                <TableIcon className="w-3.5 h-3.5 text-purple-600" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  insertHtmlFragment('<hr class="my-4 border-t-2 border-slate-200" /><p><br></p>');
                }}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition hidden sm:inline-flex"
                title="Horizontal Divider"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Formatting Cleaner */}
            <div className="flex items-center gap-0.5 ml-auto">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  executeCommand('removeFormat');
                }}
                className="px-2 py-1 rounded hover:bg-slate-200 text-slate-500 text-[10px] font-medium flex items-center gap-1 transition"
                title="Clear Formatting"
              >
                <Eraser className="w-3 h-3" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>
          </div>
        )}

        {/* Content Body Rendering */}
        {mode === 'preview' ? (
          /* Live Rendered Public View */
          <div className="p-4 sm:p-6 bg-slate-50/70 min-h-[160px] text-xs text-slate-800 leading-relaxed overflow-y-auto max-h-[600px]">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between border-b border-slate-200 pb-1.5">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                Live Rendered Website Preview
              </span>
              <span className="text-[9px] font-mono text-slate-400">
                {wordCount} words &bull; {charCount} chars
              </span>
            </div>
            <div
              className="prose prose-xs sm:prose-sm max-w-none text-slate-800 prose-headings:font-serif prose-headings:text-slate-900 prose-a:text-blue-600 prose-a:underline prose-table:border-collapse"
              dangerouslySetInnerHTML={{
                __html:
                  value ||
                  '<em class="text-slate-400 flex items-center justify-center py-8">No content entered yet. Switch to Visual Editor to write rich content.</em>',
              }}
            />
          </div>
        ) : mode === 'html' ? (
          /* High-Contrast HTML Source Code Mode */
          <div className="relative bg-slate-950 flex flex-col flex-1">
            <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[9.5px] font-mono text-slate-400 flex items-center justify-between">
              <span>HTML Source Code &bull; Indent supported (Tab)</span>
              <span className="text-emerald-400 font-bold">&lt;/&gt; HTML5</span>
            </div>
            <textarea
              ref={textareaRef}
              rows={rows}
              value={value || ''}
              onChange={handleTextareaChange}
              onKeyDown={handleTextareaKeyDown}
              placeholder="<p>Enter HTML tags directly, e.g. <b>Bold</b> or <span class='text-amber-500 font-bold'>Gold text</span></p>"
              className="w-full p-3.5 font-mono text-xs text-emerald-400 bg-slate-950 outline-none resize-y leading-relaxed selection:bg-blue-900 selection:text-white"
              style={{ minHeight: isFullscreen ? '70vh' : minHeight }}
              spellCheck={false}
            />
          </div>
        ) : (
          /* Rock-Solid Zero-Jump Visual ContentEditable Editor */
          <div className="relative bg-white flex-1">
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={handleEditorInput}
              onBlur={handleEditorInput}
              onKeyDown={handleKeyDown}
              className="p-3.5 text-xs text-slate-800 outline-none overflow-y-auto leading-relaxed focus:outline-none select-text prose prose-xs max-w-none prose-headings:font-serif prose-headings:text-slate-900 prose-a:text-blue-600 min-h-[140px]"
              style={{ minHeight: isFullscreen ? '70vh' : minHeight }}
              data-placeholder={placeholder}
            />
          </div>
        )}

        {/* Bottom Statistics & Status Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-3 py-1.5 flex items-center justify-between text-[9.5px] text-slate-400 font-mono select-none">
          <div className="flex items-center gap-2">
            <span>Mode: <strong className="text-slate-700 uppercase">{mode}</strong></span>
            <span>&bull;</span>
            <span>Words: <strong className="text-slate-700">{wordCount}</strong></span>
            <span>&bull;</span>
            <span>Characters: <strong className="text-slate-700">{charCount}</strong></span>
          </div>

          <div className="flex items-center gap-1 text-[9px] text-slate-400">
            {mode === 'visual' && <span>Rich WYSIWYG Active</span>}
            {mode === 'html' && <span>Direct HTML Input</span>}
            {mode === 'preview' && <span>Read-Only Output</span>}
          </div>
        </div>
      </div>

      {helperText && <p className="text-[10.5px] text-slate-500">{helperText}</p>}

      {/* Link Dialog Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-[9999999] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-4 max-w-sm w-full shadow-2xl border border-slate-200 space-y-3 animate-in zoom-in-95 duration-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
                Insert Web Link
              </h4>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">Destination URL *</label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com or /admissions"
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-blue-600"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">Link Display Text (Optional)</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. Click Here to Apply Online"
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-blue-600"
                />
              </div>

              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={linkTargetBlank}
                  onChange={(e) => setLinkTargetBlank(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600"
                />
                <span className="text-[11px] text-slate-700 font-medium">Open in new browser tab (`target="_blank"`)</span>
              </label>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleApplyLink}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-1.5 rounded-lg shadow-sm"
              >
                Insert Link
              </button>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-1.5 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Dialog Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-[9999999] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-4 max-w-sm w-full shadow-2xl border border-slate-200 space-y-3 animate-in zoom-in-95 duration-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                Embed Image URL
              </h4>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">Image Web Address / URL *</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://.../photo.jpg or /logo.png"
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-emerald-600"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">Alternative Description (Alt Text)</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="e.g. SGM Campus Building"
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleApplyImage}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-1.5 rounded-lg shadow-sm"
              >
                Embed Image
              </button>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-1.5 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Dialog Modal */}
      {showTableModal && (
        <div className="fixed inset-0 z-[9999999] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-4 max-w-xs w-full shadow-2xl border border-slate-200 space-y-3 animate-in zoom-in-95 duration-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <TableIcon className="w-3.5 h-3.5 text-purple-600" />
                Insert Data Grid Table
              </h4>
              <button
                type="button"
                onClick={() => setShowTableModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">Rows</label>
                <input
                  type="number"
                  min={1}
                  max={15}
                  value={tableRows}
                  onChange={(e) => setTableRows(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1">Columns</label>
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={tableCols}
                  onChange={(e) => setTableCols(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-purple-600"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleApplyTable}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-1.5 rounded-lg shadow-sm"
              >
                Insert Table
              </button>
              <button
                type="button"
                onClick={() => setShowTableModal(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-1.5 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


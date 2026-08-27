'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Quote,
  Code,
  Eye,
  Sparkles,
  Undo,
  Redo,
  Palette,
  CheckSquare,
} from 'lucide-react';

interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  minHeight?: string;
  className?: string;
  helperText?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Write formatted rich content or HTML here...',
  rows = 4,
  minHeight = '140px',
  className = '',
  helperText,
}) => {
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const editorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isInternalChange = useRef(false);

  // Sync value to contentEditable editor when external value changes
  useEffect(() => {
    if (editorRef.current && !isInternalChange.current) {
      if (editorRef.current.innerHTML !== (value || '')) {
        editorRef.current.innerHTML = value || '';
      }
    }
    isInternalChange.current = false;
  }, [value]);

  const handleEditorInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      isInternalChange.current = true;
      onChange(html);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const executeCommand = (command: string, val: string = '') => {
    if (isHtmlMode) return;
    document.execCommand(command, false, val);
    if (editorRef.current) {
      editorRef.current.focus();
      handleEditorInput();
    }
  };

  const insertCustomHtml = (before: string, after: string = '') => {
    if (isHtmlMode && textareaRef.current) {
      const ta = textareaRef.current;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = ta.value.substring(start, end);
      const replacement = `${before}${selected}${after}`;
      const newValue = ta.value.substring(0, start) + replacement + ta.value.substring(end);
      onChange(newValue);
      setTimeout(() => {
        ta.focus();
        ta.setSelectionRange(start + before.length, end + before.length);
      }, 0);
      return;
    }

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    const selectedContent = range.extractContents();
    const span = document.createElement('span');
    span.innerHTML = `${before}`;
    span.appendChild(selectedContent);
    if (after) {
      const endSpan = document.createElement('span');
      endSpan.innerHTML = after;
      span.appendChild(endSpan);
    }
    range.insertNode(span);
    handleEditorInput();
  };

  const handleAddLink = () => {
    const url = prompt('Enter destination URL (e.g. https://... or /admissions):', 'https://');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
          <label className="block text-xs font-bold text-slate-800">
            {label}
          </label>
          <div className="flex items-center gap-1.5 flex-wrap self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setIsHtmlMode(!isHtmlMode)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition flex items-center gap-1 ${
                isHtmlMode
                  ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-300'
              }`}
            >
              <Code className="w-3 h-3" />
              {isHtmlMode ? 'HTML Source' : 'Visual Mode'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'editor' ? 'preview' : 'editor')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition flex items-center gap-1 ${
                activeTab === 'preview'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-300'
              }`}
            >
              <Eye className="w-3 h-3" />
              {activeTab === 'preview' ? 'Exit Preview' : 'Live Preview'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'preview' ? (
        /* Real-time Rendered Live Preview */
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 min-h-[140px] text-xs text-slate-800 leading-relaxed shadow-inner">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1 border-b border-slate-200 pb-1">
            <Eye className="w-3 h-3 text-emerald-600" /> Formatted Output Preview
          </div>
          <div
            className="prose prose-xs max-w-none text-slate-800 prose-headings:font-serif prose-headings:text-slate-900 prose-a:text-blue-600 prose-a:underline"
            dangerouslySetInnerHTML={{ __html: value || '<em class="text-slate-400">No content to preview</em>' }}
          />
        </div>
      ) : (
        /* Rich Text / HTML Editor Container */
        <div className="rounded-xl border border-slate-300 overflow-hidden bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 shadow-sm transition">
          {/* Advanced Toolbar */}
          <div className="bg-slate-50 border-b border-slate-200 p-1.5 flex flex-wrap items-center gap-1 text-slate-600 select-none">
            {/* Text Styling */}
            <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5 mr-0.5">
              <button
                type="button"
                onClick={() => executeCommand('bold')}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Bold (Ctrl+B)"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('italic')}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Italic (Ctrl+I)"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('underline')}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Underline (Ctrl+U)"
              >
                <Underline className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('strikeThrough')}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Strikethrough"
              >
                <Strikethrough className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Headings */}
            <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5 mr-0.5">
              <button
                type="button"
                onClick={() => executeCommand('formatBlock', '<h2>')}
                className="px-1.5 py-1 rounded hover:bg-slate-200 text-slate-700 text-[10px] font-black font-serif"
                title="Heading 2"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => executeCommand('formatBlock', '<h3>')}
                className="px-1.5 py-1 rounded hover:bg-slate-200 text-slate-700 text-[10px] font-black font-serif"
                title="Heading 3"
              >
                H3
              </button>
              <button
                type="button"
                onClick={() => executeCommand('formatBlock', '<p>')}
                className="px-1.5 py-1 rounded hover:bg-slate-200 text-slate-700 text-[10px] font-bold"
                title="Normal Paragraph"
              >
                ¶
              </button>
            </div>

            {/* Alignment */}
            <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5 mr-0.5">
              <button
                type="button"
                onClick={() => executeCommand('justifyLeft')}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Align Left"
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('justifyCenter')}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Align Center"
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('justifyRight')}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Align Right"
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Lists & Quotes */}
            <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5 mr-0.5">
              <button
                type="button"
                onClick={() => executeCommand('insertUnorderedList')}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Bullet List"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('insertOrderedList')}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Numbered List"
              >
                <ListOrdered className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('formatBlock', '<blockquote>')}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Blockquote"
              >
                <Quote className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Color Highlights & Badges */}
            <div className="flex items-center gap-1 border-r border-slate-200 pr-1.5 mr-0.5">
              <button
                type="button"
                onClick={() => insertCustomHtml('<span class="text-blue-600 font-bold">', '</span>')}
                className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                title="Blue Text"
              >
                Blue
              </button>
              <button
                type="button"
                onClick={() => insertCustomHtml('<span class="text-amber-500 font-bold">', '</span>')}
                className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                title="Gold Text"
              >
                Gold
              </button>
              <button
                type="button"
                onClick={() => insertCustomHtml('<span class="bg-amber-100 px-1 py-0.5 rounded text-slate-900">', '</span>')}
                className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-slate-900 hover:bg-amber-300"
                title="Highlight Yellow"
              >
                Highlight
              </button>
            </div>

            {/* Links & Clear */}
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={handleAddLink}
                className="p-1.5 rounded hover:bg-slate-200 hover:text-slate-900 text-slate-700 transition"
                title="Insert Link"
              >
                <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('removeFormat')}
                className="px-1.5 py-0.5 rounded hover:bg-slate-200 text-slate-500 text-[10px] font-medium"
                title="Clear Formatting"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Editor Body */}
          {isHtmlMode ? (
            <textarea
              ref={textareaRef}
              rows={rows}
              value={value || ''}
              onChange={handleTextareaChange}
              placeholder="<p>Enter HTML tags directly, e.g. <b>Bold</b> or <span class='text-amber-400'>Gold text</span></p>"
              className="w-full p-3 font-mono text-xs text-slate-800 bg-slate-900 text-emerald-400 outline-none resize-y"
              style={{ minHeight }}
            />
          ) : (
            <div
              ref={editorRef}
              contentEditable
              onInput={handleEditorInput}
              onBlur={handleEditorInput}
              className="p-3 text-xs text-slate-800 outline-none overflow-y-auto leading-relaxed focus:outline-none"
              style={{ minHeight }}
              dangerouslySetInnerHTML={{ __html: value || '' }}
              data-placeholder={placeholder}
            />
          )}
        </div>
      )}

      {helperText && <p className="text-[10px] text-slate-500">{helperText}</p>}
    </div>
  );
};


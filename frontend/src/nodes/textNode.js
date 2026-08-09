// textNode.js
//
// Two behaviors beyond a normal config-driven node, which is why this
// one isn't built through BaseNode/createNode:
//
// 1. Auto-resize: the node grows (width up to a cap, then height) as
//    the user types, instead of clipping/scrolling text.
// 2. Dynamic variable handles: any {{variableName}} found in the text
//    gets its own target Handle on the left edge, live, as you type.

import { useEffect, useMemo, useRef, useState } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { useStore } from '../store';
import { ACCENT_COLORS } from './accentColors';
// Matches {{ someValidJsIdentifier }} -- mirrors what would actually be a
// legal variable/handle name, so junk like {{1bad}} is correctly ignored.
const VARIABLE_PATTERN = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

function extractVariables(text) {
  const found = [];
  const seen = new Set();
  let match;
  VARIABLE_PATTERN.lastIndex = 0;
  while ((match = VARIABLE_PATTERN.exec(text)) !== null) {
    const name = match[1];
    if (!seen.has(name)) {
      seen.add(name);
      found.push(name);
    }
  }
  return found;
}

const MIN_WIDTH = 220;
const MAX_WIDTH = 380;
const MIN_HEIGHT = 90;

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const updateNodeInternals = useUpdateNodeInternals();

  const text = data?.text ?? '{{input}}';
  const variables = useMemo(() => extractVariables(text), [text]);

  const [size, setSize] = useState({ width: MIN_WIDTH, height: MIN_HEIGHT });

  // Hidden mirrors used purely to measure how big the text wants to be.
  // One unconstrained (to see the "natural" single-content width, capped
  // at MAX_WIDTH), one wrapped at that width (to measure the resulting
  // height once wrapping kicks in). Neither is ever shown to the user.
  const wideMirrorRef = useRef(null);
  const wrappedMirrorRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const wideMirror = wideMirrorRef.current;
    const wrappedMirror = wrappedMirrorRef.current;
    if (!wideMirror || !wrappedMirror) return;

    const content = text.length > 0 ? text : ' ';
    wideMirror.textContent = content;
    const naturalWidth = wideMirror.offsetWidth + 24; // + padding
    const nextWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, naturalWidth));

    wrappedMirror.style.width = `${nextWidth}px`;
    wrappedMirror.textContent = content;
    const wrappedHeight = wrappedMirror.offsetHeight + 56; // + header/padding
    const nextHeight = Math.max(MIN_HEIGHT, wrappedHeight);

    setSize((prev) =>
      prev.width === nextWidth && prev.height === nextHeight
        ? prev
        : { width: nextWidth, height: nextHeight }
    );
  }, [text]);

  // Tell reactflow whenever handle count/position or node size changes,
  // otherwise edges connected to this node will drift out of sync.
  useEffect(() => {
    updateNodeInternals(id);
  }, [id, variables, size.height, updateNodeInternals]);

  const handleTextChange = (e) => {
    updateNodeField(id, 'text', e.target.value);
  };

  return (
    <div
      className="vs-node vs-node-text"
      style={{ width: size.width, height: size.height, '--vs-accent': ACCENT_COLORS.text }}
    >
      <div className="vs-node-header">Text</div>

      <div className="vs-node-body vs-node-body-text">
        <textarea
          ref={textareaRef}
          className="vs-node-textarea vs-node-textarea-auto"
          value={text}
          onChange={handleTextChange}
        />
      </div>

      {/* Invisible measuring elements -- never shown */}
      <span ref={wideMirrorRef} className="vs-text-mirror vs-text-mirror-wide" />
      <div ref={wrappedMirrorRef} className="vs-text-mirror vs-text-mirror-wrapped" />

      {variables.map((varName, idx) => {
        const top = `${((idx+1)/(variables.length+1))*100}%`;
        return (
          <Handle
          key={varName}
          type='target'
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{top}}
          />
        );
      })}
      {variables.map((varName,idx)=>{
        const top=`${((idx+1)/(variables.length+1)) *100}%`;
        return(
          <span
          key={`${varName}-label`}
          className='vs-handle-label vs-handle-label-left'
          style={{top}}>{varName}</span>
        );
      })}

      <Handle
      type='source'
      position={Position.Right}
      id={`${id}-output`}
      style={{top:'50%'}}
      />
    </div>
  );
};
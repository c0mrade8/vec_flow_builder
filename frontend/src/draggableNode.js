// draggableNode.js

import { ACCENT_COLORS } from "./nodes/accentColors";

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
    const accent=ACCENT_COLORS[type]||'#94A3B8'
  
    return (
      <div
      className="vs-chip"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable>
      <span className="vs-chip-dot" style={{ backgroundColor: accent }} />
      <span className="vs-chip-label">{label}</span>
    </div>
    );
  };
  
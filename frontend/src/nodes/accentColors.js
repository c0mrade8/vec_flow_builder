// accentColors.js
//
// One accent color per node type. This is the visual "signature" of the
// UI: every node card gets a colored left stripe in this color, and the
// toolbar chip for that node type gets a matching dot — so before you've
// dragged anything onto the canvas, you already know what's what.

export const ACCENT_COLORS = {
  customInput: '#2DD4BF',   // teal   -- signal in
  customOutput: '#FB7185',  // rose   -- signal out
  llm: '#A78BFA',           // violet -- "the brain"
  text: '#FBBF24',          // amber
  mixer: '#60A5FA',          // blue
  fork: '#F472B6',   // pink   -- forks the signal
  relay: '#34D399',    // emerald
  intake: '#FDBA74',    // orange
  buffer: '#94A3B8',         // slate  -- muted, reads as "pause"
};
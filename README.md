# Node Pipeline Builder

A visual, node-based pipeline builder. Drag nodes onto a canvas, connect
them, and submit the graph to a backend that validates its structure
(node/edge counts, and whether it forms a valid DAG).

## Stack

- **Frontend:** React (Create React App), `reactflow` for the canvas, `zustand` for state
- **Backend:** FastAPI, Pydantic, pure-Python DAG check (no extra graph library)

## Running it

**Backend** (port 8000):

```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend** (port 3000):

```
cd frontend
npm install
npm start
```

The frontend expects the backend at `http://localhost:8000`. Start the backend first, or the "Run Pipeline" button will show a friendly error instead of crashing.

## What's here

### Node abstraction (`frontend/src/nodes/`)

Every node type is a plain config object (`nodeConfigs.js`) — title, fields, input/output handles — rendered by a single shared component, `BaseNode.js`. Adding a new node type is adding a config object, not writing a new component. `createNode.js` is the 3-line factory connecting the two.

Nine node types: Input, Output, LLM, Text, and five custom ones themed around signal routing — **Mixer** (combines two values), **Fork** (splits down one of two paths), **Relay** (sends a request out and waits on a response), **Intake** (accepts a file), **Buffer** (holds the signal for N seconds).

The Text node (`textNode.js`) is the one exception — it's built by hand rather than through the config system, because it needs behavior a static config can't express: it auto-resizes as you type, and it parses `{{variableName}}` patterns out of its own text to create a matching input handle for each one, live.

### Styling (`frontend/src/index.css`)

Every node type has a signature accent color, shown as a colored stripe on the card and a matching dot in the toolbar — the toolbar doubles as a color legend before you've dragged anything. Dark canvas, warm paper node cards, monospace headers (IBM Plex Mono) over a plain sans body face (Inter).

### Backend (`backend/main.py`)

`POST /pipelines/parse` accepts `{ nodes, edges }`, returns `{ num_nodes, num_edges, is_dag }`. DAG detection uses Kahn's algorithm (topological sort via repeated removal of zero-in-degree nodes) — if every node can be removed this way, it's a DAG; anything left over is part of a cycle. CORS is explicitly enabled for `localhost:3000`, since the frontend and backend run on different origins in dev.

## Known limitations / things I'd do with more time

- Node deletion currently relies on ReactFlow's built-in behavior (select a node/edge, press Backspace) rather than a custom delete affordance.
- The DAG check assumes node IDs are unique, which the frontend already guarantees via `getNodeID` in `store.js`.

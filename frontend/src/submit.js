// submit.js
import { useState } from "react";
import { useStore } from "./store";
import { shallow } from 'zustand/shallow';

const API_URL='http://localhost:8000/pipelines/parse';
const selector=(state)=>({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges }=useStore(selector,shallow);
    const [status, setStatus]=useState(null); 

    const handleSubmit=async()=>{
        setStatus({state:'loading'});
        try{
            const payload={
                nodes: nodes.map((n)=>({id: n.id})),
                edges: edges.map((e)=>({source: e.source, target: e.target})),
            };
            const response=await fetch(API_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload),
            });
            if (!response.ok){
                throw new Error(`Backend responded with ${response.status}`);
            }
            const result=await response.json();
            setStatus({state: 'success', ...result});
        } catch (err){
            setStatus({
                state: 'error',
                message: `Could not reach the backend. Is it running at ${API_URL.replace('/pipelines/parse', '')}?`,
            });
        }
    };
    return (
        <div className="vs-submit-bar">
        {status?.state === 'success' && (
            <div className="vs-submit-result vs-submit-result-success">
            Your pipeline has <strong>{status.num_nodes}</strong> node
            {status.num_nodes === 1 ? '' : 's'} and <strong>{status.num_edges}</strong> edge
            {status.num_edges === 1 ? '' : 's'}. Is it a DAG?{' '}
            <strong>{status.is_dag ? 'Yes' : 'No'}</strong>.
            </div>
        )}
        {status?.state === 'error' && (
            <div className="vs-submit-result vs-submit-result-error">{status.message}</div>
        )}
        <button
            type="submit"
            className="vs-submit-btn"
            onClick={handleSubmit}
            disabled={status?.state === 'loading'}
        >
            {status?.state === 'loading' ? 'Checking…' : 'Run Pipeline'}
        </button>
        </div>
    );
}

import { ACCENT_COLORS } from "./accentColors";

//inputnode config
export const inputNodeConfig={
    title: 'Input',
    accentColor: ACCENT_COLORS.customInput,
    fields: [
        {
            name: 'inputName',
            label: 'Name',
            type: 'text',
            getDefaultValue: (id)=> id.replace('customInput-', 'input_'),
        },
        {
            name: 'inputType',
            label: 'Type',
            type: 'select',
            options: ['Text', 'File'],
            defaultValue: 'Text',
        },
    ],
    outputs: [{id: (nodeId)=>`${nodeId}-value`}],
};

//ouput node config
export const outputNodeConfig={
    title: 'Output',
    accentColor: ACCENT_COLORS.customOutput,
    fields: [
        {
            name: 'outputName',
            label: 'Name',
            type: 'text',
            getDefaultValue: (id)=>id.replace('customOutput-', 'output_'),
        },
        {
            name: 'outputType',
            label: 'Type',
            type: 'select',
            options: ['Text', 'Image'],
            defaultValue: 'Text',
            
        },
    ],
    inputs: [{id:(nodeId)=> `${nodeId}-value`}],
};

//llmnode config
export const llmNodeConfig={
    title: 'LLM',
    accentColor: ACCENT_COLORS.llm,
    description: 'This is an LLM.',
    inputs: [
        {
            id: (nodeId) => `${nodeId}-system`, 
            label: 'System',
            style: {top: '33%'}
        },
        {
            id: (nodeId)=> `${nodeId}-prompt`,
            label: 'Prompt',
            style: {top: '66%'}
        },
    ],
    outputs: [{id: (nodeId)=>`${nodeId}-response`}],
};

//textnode requires cutomisation so it's in textNode.js

//new five node types;
//math node config
export const mixerNodeConfig ={
    title: 'Mixer',
    accentColor: ACCENT_COLORS.mixer,
    description: 'Blends A and B into one signal. Connect them, or type a fallback below.',
    fields: [
        {
            name: 'operation',
            label: 'Operation',
            type: 'select',
            options: ['Add', 'Subtract', 'Multiply', 'Divide'],
            defaultValue: 'Add'
        },
        {name: 'valueA', label:'A (fallback)', type: 'text', defaultValue:'0'},
        {name: 'valueB', label:'B (fallback)', type: 'text', defaultValue:'0'}
    ],
    inputs: [
        {
            id: (nodeId)=> `${nodeId}-a`, 
            label: 'A',
            style: {top: '33%'}
        },
        {
            id: (nodeId)=> `${nodeId}-b`,
            label: 'B',
            style: {top: '66%'}
        },
    ],
    outputs: [{id: (nodeId)=> `${nodeId}-result`}],

};

//conditional node config
export const forkNodeConfig = {
    title: 'Fork',
    accentColor: ACCENT_COLORS.fork,
    description: 'Splits signal down one of two paths.',
    fields: [
        {
            name: 'condition',
            label: 'Condition',
            type: 'text', 
            defaultValue: 'value>0'
        },
    ],
    inputs: [{id: (nodeId)=>`${nodeId}-input`}],
    outputs: [
        {
            id: (nodeId)=> `${nodeId}-true`,
            label: 'True',
            style: {top: '33%'}
        },
        {
            id: (nodeId) => `${nodeId}-false`,
            label: 'False',
            style: {top: '66%'}
        },
    ],
};

//api request node config
export const relayNodeConfig = {
    title: 'Relay',
    accentColor: ACCENT_COLORS.relay,
    fields: [
        {
            name: 'url',
            label: 'URL',
            type: 'text',
            defaultValue: 'https://api.example.com'
        },
        {
            name: 'method',
            label: 'Method',
            type: 'select',
            options: ['GET', 'POST', 'PUT', 'DELETE'],
            defaultValue: 'GET',
        },
    ],
    inputs: [{id: (nodeId)=>`${nodeId}-body`}],
    outputs: [{id: (nodeId)=>`${nodeId}-response`}],    
};

export const intakeNodeConfig = {
    title: 'Intake',
    accentColor: ACCENT_COLORS.intake,
    fields: [
        {
            name: 'acceptedType',
            label: 'Accepts',
            type: 'select',
            options: ['Any', 'Image', 'PDF', 'CSV'],
            defaultValue: 'Any',
        },
    ],
    outputs: [{id: (nodeId)=> `${nodeId}-file`}],
};

export const bufferNodeConfig = {
    title: 'Buffer',
    accentColor: ACCENT_COLORS.buffer,
    fields: [
        {
            name: 'seconds',
            label: 'Seconds',
            type: 'text',
            defaultValue: '1',
        },
    ],
    inputs: [{id: (nodeId) => `${nodeId}-input`}],
    outputs: [{id: (nodeId) => `${nodeId}-output`}],
};


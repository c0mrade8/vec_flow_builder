//inputnode config
export const inputNodeConfig={
    title: 'Input',
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
    fields: [
        {
            name: 'outputName',
            label: 'Name',
            type: 'text',
            getDefaultValue: (id)=>id.replace('customOutput-', 'ouput_'),
        },
        {
            name: 'OutputType',
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
    ouputs: [{id: (nodeId)=>`${nodeId}-reponse`}],
};

//textnode requires cutomisation so it's in textNode.js

//new five node types;
//math node config
export const mathNodeConfig ={
    title: 'Math',
    fields: [
        {
            name: 'operation',
            label: 'Operation',
            type: 'select',
            options: ['Add', 'Subtract', 'Multiply', 'Divide'],
            defaultValue: 'Add'
        },
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
export const conditionalNodeConfig = {
    title: 'Conditional',
    description: 'Routes input to True or False',
    fields: [
        {
            name: 'condition',
            label: 'Condition',
            type: 'text', 
            defaultValue: 'value>0'
        },
    ],
    inputs: [{id: (nodeId)=>`${nodeId}-input`}],
    ouputs: [
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
export const apiRequestNodeConfig = {
    title: 'API Request',
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
    outputs: [{id: (nodeId)=>`${nodeId}-reponse`}],    
};

export const fileUploadNodeConfig = {
    title: 'File Upload',
    fields: [
        {
            name: 'acceptedType',
            label: 'Accepts',
            type: 'select',
            options: ['Any', 'Image', 'PDF', 'CSV'],
            defaultValue: 'Any',
        },
    ],
    ouputs: [{id: (nodeId)=> `${nodeId}-file`}],
};

export const delayNodeConfig = {
    title: 'Delay',
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


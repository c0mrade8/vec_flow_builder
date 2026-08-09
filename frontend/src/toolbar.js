// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className='vs-toolbar'>
            <div className='vs-toolbar-inner'>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='mixer' label='Mixer' />
                <DraggableNode type='fork' label='Fork' />
                <DraggableNode type='relay' label='Relay' />
                <DraggableNode type='intake' label='Intake' />
                <DraggableNode type='buffer' label='Buffer' />
            </div>
        </div>
    );
};
//BaseNode.js
//Now no react component from scratch for every new node type, just write a config object


import { Handle, Position } from 'reactflow';
import { useStore } from '../store'

const resolve=(value, id, data)=>
    typeof value === 'function' ? value(id,data) : value;
export const BaseNode=({id,data,config})=>{
    const updateNodeField=useStore((State)=>State.updateNodeField);
    const fields=resolve(config.fields, id, data)||[];
    const inputs=resolve(config.inputs, id, data)||[];
    const outputs=resolve(config.outputs, id, data)||[];
    const extraStyle=resolve(config.style, id, data)||[];
    const handleFieldChange=(fieldName, value)=>{
        updateNodeField(id, fieldName, value);
    };

    const getFieldValue=(field)=>{
        if (data&&data[field.name]!==undefined) return data[field.name];
        if (field.getDefaultValue) return field.getDefaultValue(id);
        return field.Defaultvalue ?? '';

    };

    return (
    <div className="vs-node" style={{ width: config.width || 220, ...extraStyle }}>
      <div className="vs-node-header">{config.title}</div>
 
      {config.description && (
        <div className="vs-node-description">{config.description}</div>
      )}
 
      {fields.length > 0 && (
        <div className="vs-node-body">
          {fields.map((field) => {
            const value = getFieldValue(field);
            return (
              <label className="vs-node-field" key={field.name}>
                <span className="vs-node-field-label">{field.label}</span>
                {field.type === 'select' ? (
                  <select
                    className="vs-node-select"
                    value={value}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  >
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    className="vs-node-textarea"
                    value={value}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    className="vs-node-input"
                    value={value}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  />
                )}
              </label>
            );
          })}
        </div>
      )}
 
      {inputs.map((handle, idx) => {
        const handleId = handle.id ? handle.id(id) : `${id}-in-${idx}`;
        return (
          <div className="vs-handle-wrap vs-handle-wrap-left" style={handle.style} key={handleId}>
            <Handle type="target" position={Position.Left} id={handleId} />
            {handle.label && <span className="vs-handle-label vs-handle-label-left">{handle.label}</span>}
          </div>
        );
      })}
 
      {outputs.map((handle, idx) => {
        const handleId = handle.id ? handle.id(id) : `${id}-out-${idx}`;
        return (
          <div className="vs-handle-wrap vs-handle-wrap-right" style={handle.style} key={handleId}>
            {handle.label && <span className="vs-handle-label vs-handle-label-right">{handle.label}</span>}
            <Handle type="source" position={Position.Right} id={handleId} />
          </div>
        );
      })}
    </div>
  );
}
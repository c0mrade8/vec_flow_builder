// Turns a config object (see nodeConfigs.js) into a component that reactflow
// can render. This is the entire "abstraction" — every node type is
// use~ createNode(config), nothing more.

import { BaseNode } from './BaseNode';

export const createNode = (config) => {
  const NodeComponent = ({ id, data }) => (
    <BaseNode id={id} data={data} config={config} />
  );
  return NodeComponent;
};
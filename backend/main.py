from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from collections import defaultdict,deque

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    #extra fields of node is ignored cause they are not required currently to count the nodes/edges 
    #or to check the DAG-ness, so not modelled here

class Edge(BaseModel):
    source: str
    target: str

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

def is_dag(node_ids: List[str], edges: List[Edge])->bool:
    adjacency=defaultdict(list)
    in_degree={node_id:0 for node_id in node_ids}

    for edge in edges:
        if edge.source not in in_degree or edge.target not in in_degree:
            continue
        adjacency[edge.source].append(edge.target)
        in_degree[edge.target]+=1

    queue=deque([n for n,deg in in_degree.items() if deg==0])
    visited=0
    while queue: 
        current=queue.popleft()
        visited+=1
        for neighbor in adjacency[current]:
            in_degree[neighbor]-=1
            if in_degree[neighbor]==0:
                queue.append(neighbor)
    return visited==len(node_ids)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse', response_model=PipelineResponse)
def parse_pipeline(pipeline: PipelineRequest):
    node_ids=[node.id for node in pipeline.nodes]
    return PipelineResponse(
        num_nodes=len(pipeline.nodes),
        num_edges=len(pipeline.edges),
        is_dag=is_dag(node_ids, pipeline.edges),
    )

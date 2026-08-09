import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className='vs-app'>
      <header className='vs-header'>
        <div className='vs-header-title'>
          <span className='vs-header-mark'>VS</span>
          <div>
            <div className='vs-header-name'>Pipeline Builder</div>
            <div className='vs-header-sub'>Drag Nodes onto the canvas and connect them</div>
          </div>
        </div>

      </header>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;

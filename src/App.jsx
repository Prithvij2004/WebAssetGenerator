import { RouterProvider } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import { router } from './router';

function App() {
  return (
    <ProjectProvider>
      <RouterProvider router={router} />
    </ProjectProvider>
  );
}

export default App;

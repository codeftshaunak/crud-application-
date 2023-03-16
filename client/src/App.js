import logo from './logo.svg';
import './App.css';
import TaskItem from './components/TaskItem';
import Task from './components/Task';

function App() {
  return (
    <div className="App">
      <Task />
      <TaskItem />
    </div>
  );
}

export default App;

import { useState } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import TaskItem from './interfaces/TaskItem';

const App = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleTasksFetch = (fetchedTasks: TaskItem[]) => {
    setTasks(fetchedTasks);
  };

  const handleLoadingState = () => {
    setLoading(true);
  };

  return (
    <>
      <Header onTasksFetch={handleTasksFetch} onLoading={handleLoadingState} />
      {loading ? (
        <Tasks tasks={tasks} />
      ) : (
        <p>Please select a day to load tasks</p>
      )}
    </>
  );
};

export default App;

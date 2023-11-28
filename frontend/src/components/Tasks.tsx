import React, { useState, useEffect } from 'react';
import { Box, Heading, Button } from '@chakra-ui/react';
import TaskItem from '../interfaces/TaskItem';

interface TasksProps {
  tasks: TaskItem[];
}

const Tasks: React.FC<TasksProps> = ({ tasks }) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        if (currentTaskIndex < tasks.length - 1) {
          setCurrentTaskIndex((prevIndex) => prevIndex + 1);
        } else {
          setIsPlaying(false);
          clearInterval(interval);
        }
      }, tasks[currentTaskIndex]?.duration * 1000); // Display task for its duration in seconds
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentTaskIndex, tasks]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div>
      <Box textAlign="center" mt={10}>
        <Heading as="h2" size="xl">
          Task:
        </Heading>
        {tasks.length > 0 ? (
          <div>
            <Heading as="h1" size="lg">
              {tasks[currentTaskIndex]?.task}
            </Heading>
            <p>Duration: {tasks[currentTaskIndex]?.duration} seconds</p>
            {isPlaying ? (
              <Button onClick={handlePause}>Pause</Button>
            ) : (
              <Button onClick={handlePlay}>Play</Button>
            )}
            <Button onClick={handlePrev} disabled={currentTaskIndex === 0}>
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentTaskIndex === tasks.length - 1}
            >
              Next
            </Button>
          </div>
        ) : (
          <p>To view tasks, please select a day</p>
        )}
      </Box>
    </div>
  );
};

export default Tasks;

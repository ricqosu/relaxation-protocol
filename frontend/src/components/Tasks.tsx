import React, { useState, useEffect } from 'react';
import { Box, Heading, Button, Flex, ButtonGroup } from '@chakra-ui/react';
import TaskItem from '../interfaces/TaskItem';

interface TasksProps {
  tasks: TaskItem[];
}

const Tasks: React.FC<TasksProps> = ({ tasks }) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(tasks[0]?.duration);

  // Kicks off countdown based on each task's duration
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime === 1) {
            clearInterval(interval);
            setCurrentTaskIndex((prevIndex) =>
              prevIndex < tasks.length - 1 ? prevIndex + 1 : prevIndex
            );
            return tasks[currentTaskIndex]?.duration;
          }
          return prevTime - 1;
        });
      }, 1000);
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
      setTimeRemaining(tasks[currentTaskIndex + 1]?.duration);
    }
  };

  const handlePrev = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex((prevIndex) => prevIndex - 1);
      setTimeRemaining(tasks[currentTaskIndex - 1]?.duration);
    }
  };

  const handleRestart = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(0);
    }
  };

  return (
    <Flex direction="column" alignItems="center">
      <Box mt={10}>
        <Heading as="h2" size="xl">
          Task {currentTaskIndex + 1} out of {tasks.length - 1}:
        </Heading>
      </Box>
      <Box maxW="xl" textAlign="center">
        {tasks.length > 0 ? (
          <Heading as="h1" size="4xl">
            {tasks[currentTaskIndex]?.task}
          </Heading>
        ) : (
          <p>To view tasks, please select a day</p>
        )}
      </Box>
      <Box>
        <p>Duration: {timeRemaining} seconds</p>
      </Box>
      <ButtonGroup>
        <Button onClick={handlePrev} disabled={currentTaskIndex === 0}>
          Previous
        </Button>
        {isPlaying ? (
          <Button onClick={handlePause}>Pause</Button>
        ) : (
          <Button onClick={handlePlay}>Play</Button>
        )}
        <Button
          onClick={handleNext}
          disabled={currentTaskIndex < tasks.length - 1}
        >
          Next
        </Button>
        <Button
          onClick={handleRestart}
          disabled={currentTaskIndex < tasks.length - 1}
        >
          Restart
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default Tasks;

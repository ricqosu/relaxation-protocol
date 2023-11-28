import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Button,
  Flex,
  ButtonGroup,
  Center,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import TaskItem from '../interfaces/TaskItem';

interface TasksProps {
  tasks: TaskItem[];
}

const Tasks: React.FC<TasksProps> = ({ tasks }) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(tasks[0]?.duration);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setCurrentTaskIndex(0);
    setTimeRemaining(tasks[0]?.duration);
    setIsPlaying(false);
  }, [tasks]);

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
            return tasks[currentTaskIndex + 1]?.duration;
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
      handlePause();
    }
  };

  const handlePrev = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex((prevIndex) => prevIndex - 1);
      setTimeRemaining(tasks[currentTaskIndex - 1]?.duration);
      handlePause();
    }
  };

  const handleRestart = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(0);
      setTimeRemaining(tasks[0]?.duration);
      handlePause();
    }
  };

  return (
    <Flex direction="column" alignItems="center">
      <Box mt={20}>
        <Heading as="h2" size="xl">
          Task {currentTaskIndex + 1} out of {tasks.length - 1}:
        </Heading>
      </Box>
      <Center maxW="xl" h="400px" borderRadius="1px" textAlign="center">
        {tasks.length > 0 ? (
          <motion.div
            key={currentTaskIndex}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 100, y: 0 }}
            transition={{ duration: 1.1 }}
          >
            <Heading as="h1" size="4xl">
              {tasks[currentTaskIndex]?.task}
            </Heading>
          </motion.div>
        ) : (
          <p>To view tasks, please select a day</p>
        )}
      </Center>
      <Box>
        <Heading maxW="md">
          Time Left:{' '}
          {
            <motion.span
              key={currentTaskIndex}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1 }}
            >
              {timeRemaining}
            </motion.span>
          }{' '}
          seconds
        </Heading>
      </Box>
      <ButtonGroup mt="150px">
        <Button
          onClick={handlePrev}
          disabled={currentTaskIndex === 0 || isPlaying}
        >
          Previous
        </Button>
        {isPlaying ? (
          <Button onClick={handlePause}>Pause</Button>
        ) : (
          <Button onClick={handlePlay}>Play</Button>
        )}
        <Button
          onClick={handleNext}
          disabled={currentTaskIndex < tasks.length - 1 || isPlaying}
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

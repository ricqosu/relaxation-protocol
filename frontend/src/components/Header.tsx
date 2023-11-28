import React, { useState } from 'react';
import axios from 'axios';
import TaskItem from '../interfaces/TaskItem';
import {
  Box,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface HeaderProps {
  onTasksFetch: (tasks: TaskItem[]) => void;
  onLoading: () => void;
}

const Header: React.FC<HeaderProps> = ({ onTasksFetch, onLoading }) => {
  const [selectedDayLabel, setSelectedDayLabel] = useState('Select Day');

  const dayOptions: string[] = Array.from(
    { length: 15 },
    (_, index) => `Day ${index + 1}`
  );

  const handleDaySelect = (selectedDayOption: string): void => {
    setSelectedDayLabel(selectedDayOption);
    const dayNumber = parseInt(selectedDayOption.split(' ')[1], 10);

    axios
      .get(`http://localhost:3001/tasks/${dayNumber}`)
      .then((response) => {
        console.log(response.data);
        onTasksFetch(response.data);
        onLoading();
      })
      .catch((error) => {
        console.error('Error fetching tasks from Menu', error);
      });
  };

  return (
    <Box bg="teal.100" p={3}>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h1" size="xl" color="black">
          RelaxMyPup
        </Heading>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} color="black">
            {selectedDayLabel}
          </MenuButton>
          <MenuList>
            {dayOptions.map((day, index) => (
              <MenuItem
                key={index}
                color="black"
                onClick={() => {
                  handleDaySelect(day);
                }}
              >
                {day}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default Header;

import React from 'react';
import {IconButton, Tooltip } from '@chakra-ui/react';
import { RepeatClockIcon} from '@chakra-ui/icons';


export default function ResetButton({ movie, update }) {
  const resetHistory = () => {
    update({
      ...movie,
      dater : new Date().toLocaleString()
    });
  };


  return (
    <Tooltip label="I watched te movie today">
      <IconButton
        aria-label={"reset time"}
        icon={<RepeatClockIcon />}
        colorScheme="teal"
    
        onClick={resetHistory}
      />
      </Tooltip>
    
  );
}

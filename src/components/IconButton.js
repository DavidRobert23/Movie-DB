import React from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { STATUS } from '../utils';
import { HISTORY } from '../connectors/api';

export default function HiButton({ movie, status, update }) {
  const toggleHistory = () => {
    update({
      ...movie,
      history: movie.history === HISTORY.WATCHED ? HISTORY.REMOVED : HISTORY.WATCHED,
      dater : new Date().toLocaleString(),
    });
  };

  const iswatched = movie.history === HISTORY.WATCHED; // we don't care if watchlist is REMOVED or undefined, both means it's not listed
  const label = iswatched ? 'Remove from history' : 'Mark as watched';
  return (
    <Tooltip label={label}>
      <IconButton
        aria-label={label}
        icon={<CheckIcon />}
        colorScheme="teal"
        variant={iswatched ? 'solid' : 'outline'}
        isLoading={status === STATUS.PENDING}
        onClick={toggleHistory}
      />
    </Tooltip>
  );
}

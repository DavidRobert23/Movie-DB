import React from 'react';
import {
  Text,
  Image,
  CircularProgress,
  Center,
  Container,
  Box,
  HStack,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import { ChevronLeftIcon} from '@chakra-ui/icons';
//AddIcon,CheckIcon
import { useParams, useHistory } from 'react-router-dom';
import useMovie from '../hooks/useMovie';
import { buildImageUrl, imageFallback } from '../connectors/tmdb';
import { getYear, STATUS } from '../utils';
import WatchlistButton from '../components/WatchlistButton';
import HiButton from '../components/IconButton';


export default function Movie() {
  const { movieId } = useParams();
  const history = useHistory();
 // const [isHistoryActive, setHistoryActive] = React.useState(false); // temp state, for UI only, should be removed when implemented properly

  const { movie, status, error, updateStatus, updateMovie } = useMovie(movieId);

  if (status === STATUS.IDLE) {
    return null;
  }
  if (status === STATUS.PENDING) {
    return (
      <Center minH="50vh">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  if (status === STATUS.REJECTED) {
    return (
      <Container p={3}>
        <Text>
          Error fetching movie with ID {movieId}: {JSON.stringify(error)}
        </Text>
      </Container>
    );
  }

  

  return (
    <Container p={3} maxW="80em">
      <HStack mb={3} justify="space-between">
        <IconButton
          aria-label="Back"
          icon={<ChevronLeftIcon />}
          variant="outline"
          fontSize={36}
          colorScheme="teal"
          onClick={history.goBack}
        />
        <HStack>
          <WatchlistButton movie={movie} status={updateStatus} update={updateMovie} />
          <HiButton
movie={movie} status={updateStatus} update={updateMovie} 
           
          
          />
        </HStack>
        
      </HStack>
      <HStack spacing={3} align="flex-start">
        <Box>
          <Image
            src={buildImageUrl(movie.poster_path, 'w300')}
            alt="Poster"
            w="35vw"
            maxW={300}
            fallbackSrc={imageFallback}
          />
        </Box>
        <Box w="100%">
          <HStack justify="space-between">
            <Heading as="h2">{movie.title}</Heading>
            <Text as="span" color="GrayText">
              {getYear(movie.release_date)}
            </Text>
          </HStack>
          <Text>{movie.overview}</Text>
          <Text as="span" color="GrayText">
              {movie.runtime}
              {movie.tagline}
              {JSON.stringify(movie.genres)}
            </Text>
        </Box>

        
      </HStack>
    </Container>
  );
}

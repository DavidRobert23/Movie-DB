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
  SimpleGrid,
} from '@chakra-ui/react';
import { ChevronLeftIcon} from '@chakra-ui/icons';
//AddIcon,CheckIcon
import { useParams, useHistory } from 'react-router-dom';
import useMovie from '../hooks/useMovie';
import { buildImageUrl, imageFallback } from '../connectors/tmdb';
import { getYear, STATUS } from '../utils';
import WatchlistButton from '../components/WatchlistButton';
import HiButton from '../components/IconButton';
import ResetButton from '../components/ResetButton';


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
    <Container p={5} maxW="90em">
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
          <HiButton movie={movie} status={updateStatus} update={updateMovie} />
          <ResetButton movie={movie} update={updateMovie} />
          
        </HStack>
        
      </HStack>
      <HStack spacing={2} align="flex-start">
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
          <Text as="span" color="GrayText"> </Text>
          </Box>
          
      </HStack>
      <HStack spacing={2} align="flex-start">
        
        <Box>

  <SimpleGrid columns={[2, null, 3]} spacing="40px">
  <Box bg="grey" height="3em">Runtime : {movie.runtime}</Box>
  <Box bg="grey" height="3em">Budget : {movie.budget}</Box>
  <Box bg="grey" height="3em">Tagline : {movie.tagline}</Box>
  <Box bg="grey" height="3em">Release Year {JSON.stringify(movie.release_date)}</Box>
  <Box bg="grey" height="8em">Genres:{movie.genres.map(genre => (<Text>{genre.name}</Text>))}</Box>
  <Box bg="grey" height="3em">I watched the movie :{movie.dater}</Box>
</SimpleGrid>
</Box>

      </HStack>

    </Container>
    
  );
}

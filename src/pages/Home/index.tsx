import { useState, useEffect, useCallback } from "react";
import { TMDB_ACCESS_TOKEN, TMDB_BASE_URL } from "../../api/tmdbConfig";
import { 
  GenreButton, 
  GenreFilterContainer, 
  LoadMoreButton, 
  MediaCard, 
  MediaGrid, 
  OptionItem, 
  OptionsContainer,
  FilterTypeContainer,
  TypeButton
} from "./styles";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onMediaTypeChange: (type: 'movies' | 'series') => void;
}

interface Media {
  vote_count: number;
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  vote_average: number;
  genre_ids?: number[];
  release_date?: string;
  first_air_date?: string;
}

interface Genre {
  id: number;
  name: string;
}

export function Home({ searchQuery, onSearchChange, onMediaTypeChange }: HomeProps) {
  useAuth();
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOption, setSelectedOption] = useState<'movies' | 'series'>('movies');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [filterType, setFilterType] = useState<'top_rated' | 'latest'>('top_rated');
  const navigate = useNavigate();

  const handleOptionSelect = (option: 'movies' | 'series') => {
    setSelectedOption(option);
    setSelectedGenre(null);
    setPage(1);
    onMediaTypeChange(option);
    onSearchChange('');
  };

  const filterAndTranslateGenres = (genres: Genre[], type: 'movies' | 'series') => {
    const genresToRemove = [10766, 10767, 10763]; // IDs para soap, talk e news
  
    const seriesTranslations: Record<number, string> = {
      10759: 'Ação e Aventura',
      10765: 'Ficção Científica e Fantasia',
      10768: 'Guerra e Política',
      35: 'Comédia',
      18: 'Drama',
      80: 'Crime',
      9648: 'Mistério',
      10751: 'Família',
      10762: 'Infantil',
      10764: 'Reality Show',
      37: 'Faroeste',
      99: 'Documentário'
    };
  
    const movieTranslations: Record<number, string> = {
      28: 'Ação',
      12: 'Aventura',
      16: 'Animação',
      35: 'Comédia',
      80: 'Crime',
      18: 'Drama',
      10751: 'Família',
      14: 'Fantasia',
      36: 'História',
      27: 'Terror',
      10402: 'Música',
      9648: 'Mistério',
      10749: 'Romance',
      878: 'Ficção Científica',
      53: 'Thriller',
      10752: 'Guerra',
      37: 'Faroeste'
    };
  
    return genres
      .filter(genre => !genresToRemove.includes(genre.id))
      .map(genre => ({
        ...genre,
        name: type === 'series' 
          ? seriesTranslations[genre.id] || genre.name 
          : movieTranslations[genre.id] || genre.name
      }));
  };

  const fetchGenres = useCallback(async () => {
    try {
      const endpoint = selectedOption === 'movies' ? 'genre/movie/list' : 'genre/tv/list';
      const response = await fetch(`${TMDB_BASE_URL}/${endpoint}?language=pt-BR`, {
        headers: {
          'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setGenres(filterAndTranslateGenres(data.genres, selectedOption));
    } catch (error) {
      console.error('Erro ao buscar gêneros:', error);
    }
  }, [selectedOption]);

  const fetchMedia = useCallback(async (currentPage: number, query: string = '') => {
    setLoading(true);
    setError(null);
    
    try {
      let url;
      if (query) {
        const searchType = selectedOption === 'movies' ? 'movie' : 'tv';
        url = `${TMDB_BASE_URL}/search/${searchType}?query=${encodeURIComponent(query)}&language=pt-BR&page=${currentPage}`;
      } else {
        if (filterType === 'latest') {
          const endpoint = selectedOption === 'movies' ? 'movie/now_playing' : 'tv/on_the_air';
          url = `${TMDB_BASE_URL}/${endpoint}?language=pt-BR&page=${currentPage}`;
        } else {
          const endpoint = selectedOption === 'movies' ? 'discover/movie' : 'discover/tv';
          url = `${TMDB_BASE_URL}/${endpoint}?language=pt-BR&page=${currentPage}`;
          url += `&sort_by=vote_average.desc`;
          url += `&vote_count.gte=500`;
          url += `&vote_average.gte=7`;
        }
        
        if (selectedGenre) {
          url += `&with_genres=${selectedGenre}`;
        }
      }
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      let filteredResults = data.results;
      if (selectedGenre && !query) {
        filteredResults = filteredResults.filter((item: Media) => 
          item.genre_ids?.includes(selectedGenre)
        );
      }
      
      if (filterType === 'latest') {
        filteredResults.sort((a: Media, b: Media) => {
          const dateA = selectedOption === 'movies' ? a.release_date : a.first_air_date;
          const dateB = selectedOption === 'movies' ? b.release_date : b.first_air_date;
          return new Date(dateB || 0).getTime() - new Date(dateA || 0).getTime();
        });
      } else {
        filteredResults.sort((a: Media, b: Media) => {
          if (b.vote_average !== a.vote_average) {
            return b.vote_average - a.vote_average;
          }
          return b.vote_count - a.vote_count;
        });
      }
      
      if (currentPage === 1) {
        setMedia(filteredResults);
      } else {
        setMedia(prev => [...prev, ...filteredResults]);
      }
      
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      setError('Falha ao carregar dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [selectedOption, selectedGenre, filterType]);

  useEffect(() => {
    fetchGenres();
  }, [selectedOption, fetchGenres]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchMedia(1, searchQuery);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery, selectedOption, selectedGenre, filterType, fetchMedia]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMedia(nextPage, searchQuery);
  };

  return (
    <div>
      <OptionsContainer>
        <OptionItem 
          $isSelected={selectedOption === 'movies'}
          onClick={() => handleOptionSelect('movies')}
        >
          Filmes
        </OptionItem>
        <OptionItem 
          $isSelected={selectedOption === 'series'}
          onClick={() => handleOptionSelect('series')}
        >
          Séries
        </OptionItem>
      </OptionsContainer>

      <FilterTypeContainer>
        <TypeButton
          $isActive={filterType === 'top_rated'}
          onClick={() => setFilterType('top_rated')}
        >
          Melhores Avaliados
        </TypeButton>
        <TypeButton
          $isActive={filterType === 'latest'}
          onClick={() => setFilterType('latest')}
        >
          Últimos Lançamentos
        </TypeButton>
      </FilterTypeContainer>

      {genres.length > 0 && (
        <GenreFilterContainer>
          <GenreButton
            $isActive={!selectedGenre}
            onClick={() => setSelectedGenre(null)}
          >
            Todos
          </GenreButton>
          {genres.map(genre => (
            <GenreButton
              key={genre.id}
              $isActive={selectedGenre === genre.id}
              onClick={() => setSelectedGenre(genre.id)}
            >
              {genre.name}
            </GenreButton>
          ))}
        </GenreFilterContainer>
      )}

      {loading && page === 1 ? (
        <p>Carregando...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : media.length === 0 ? (
        <p>{searchQuery ? `Nenhum resultado encontrado para "${searchQuery}"` : 'Nenhum conteúdo disponível'}</p>
      ) : (
        <>
          <MediaGrid>
            {media.map((item) => (
              <MediaCard  
                key={item.id}
                onClick={() => navigate(`/media/${selectedOption === 'movies' ? 'movie' : 'tv'}/${item.id}`)}
              >
                {item.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title || item.name || 'Mídia sem título'}
                    loading="lazy"
                  />
                ) : (
                  <div className="placeholder">Sem imagem</div>
                )}
                <h3>{item.title || item.name || 'Título desconhecido'}</h3>
                <span>{item.vote_average.toFixed(1)} ★</span>
                {filterType === 'latest' && (
                  <span className="release-date">
                    {selectedOption === 'movies' 
                      ? item.release_date?.substring(0, 4) 
                      : item.first_air_date?.substring(0, 4)}
                  </span>
                )}
              </MediaCard>
            ))}
          </MediaGrid>

          {page < totalPages && (
            <LoadMoreButton 
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Carregar mais'}
            </LoadMoreButton>
          )}
        </>
      )}
    </div>
  );
}
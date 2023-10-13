import useSwr from 'swr'
import fetcher from '@/lib/fetcher';

const useMovie = (id?:string) => {
  const { data, error, isLoading, mutate } = useSwr(id? `/api/movies/${id}` :null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {data, error, isLoading, mutate }
};

export default useMovie; 
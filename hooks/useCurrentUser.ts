import useSWR from 'swr'

import fetcher from '@/lib/fetcher';

const useCurrentUser = () => {

  const { data, error, isLoading } = useSWR('/api/current',fetcher);

  // console.log(data,"ssdsdw45ds45d4s",error)
  // if (error) return (<div>failed to load</div>)
  // if (isLoading) return (<div>loading...</div>)
  return {
    data,
    error,
    isLoading,
  }
};

export default useCurrentUser;
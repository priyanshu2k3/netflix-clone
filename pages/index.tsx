import {getSession,signOut} from 'next-auth/react';
import { NextPageContext } from 'next';
import useCurrentUser from '@/hooks/useCurrentUser';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Bullboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavourites from '@/hooks/useFavourites'


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}


export default function Home() { 
  const {data:user}=useCurrentUser();
  console.log(user)

  const { data : movies =[]}=useMovieList()
  const { data : favourites =[]}=useFavourites();

  return (
    <div>
      <Navbar/>
      <Billboard/>
      <div className='pb-40'>
        <MovieList title="Trending Now" data={movies}/>
        <MovieList title="My List" data={favourites}/>
      </div>
    </div>
  )
}
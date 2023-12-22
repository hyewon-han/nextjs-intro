import Seo from "@/components/Seo";
import { useEffect, useState } from "react";

export default function Home({ results }) {
  return (
    <div className="container">
      <Seo title="Home" />

      {results?.map((movie) => (
        <div className="movie" key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <h4>{movie.original_title}</h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
// 이 코드는 서버에서 돌아가게 된다. (이걸 이용해서 api 를 숨길 수 있다.)
// 이 함수는 object를 리턴하게 되고 이 객체 안에는 props라는 키가 있다.
// results를 위에서 props로 받아오자!
// 여기서 무엇을 리턴하든지 이걸 props로 page에게 주게 된다.⭐️ => pageProps
// react components의 render result가 소스코드에 들어가게 된다.
// nextjs의 역할은 백엔드에서 받아온 props를 return해서 html코드에 가져다 주면, reactjs가 저 props를 가져와서 그걸 가지고 results array를 뿌려준다
// page가 유저에게 보여지기 전에 props를 받아오는 함수를 만드는 것이다.
export async function getServerSideProps() {
  const { results } = await (
    await fetch("http://localhost:3001/api/movies")
  ).json(); // fake fetching url
  return {
    props: {
      results,
    },
  };
}

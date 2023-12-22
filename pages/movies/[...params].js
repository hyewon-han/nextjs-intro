import Seo from "@/components/Seo";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Detail({ params }) {
  const router = useRouter();
  const [movie, setMovie] = useState();
  /*
  const {
    query: { id, title }, // 이는 유저가 홈페이지에서 상세페이지로 넘어올 때만 존재한다. 이미 로드 되어있으로 더 빠르다. (로딩중은 안보임)
  } = useRouter();
  */
  const [title, id] = params || []; // 시크릿모드로 상세페이지 바로 접속하면 에러난다. 그 이유는 이 페이지가 벡엔드에서 pre-render 되기 때문.
  // 서버는 아직 router.query.params 가 뭔지 모름!

  useEffect(() => {
    (async () => {
      const data = await (
        await fetch(`http://localhost:3001/api/movies/${id}`)
      ).json();
      setMovie(data);
    })();
  }, []);

  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
      <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} />
    </div>
  );
}

export function getServerSideProps({ params: { params } }) {
  return {
    props: { params },
  };
}

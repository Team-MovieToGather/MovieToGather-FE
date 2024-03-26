// 백엔드 API를 Axios로 호출하는 함수들을 정의합니다.
import axios from "axios";
import router from "@/router";

const DOMAIN = "http://localhost:8080";
const UNAUTHORIZED = 401;
// 인증 실패 시 로그인 페이지로 이동
const onUnauthorized = () => {
  router.push("/pages/landing-pages/basic");

};

const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data
  })
    .then((result) => result.data)
    .catch((result) => {
      const { status } = result.response;
      if (status === UNAUTHORIZED) onUnauthorized();
      throw Error(result);
    });
};

export const meetingInfo = {
  fetch() {
    return request(
      "get",
      "/api/meetings?type=ALL&searchCondition=MOVIE_TITLE&keyword=str&page=0&size=9&sort=string"
    );
  }
};
export const deleteCommunity = {
  fetch(id) {
    return request("delete", `/api/meetings/${id}`);
  }
};
export const updateCommunity = {
  fetch(id, meetingName, startTime, endTime) {
    const data = {
      meetingName,
      startTime,
      endTime
    };
    return request("put", `/api/meetings/${id}`, data); // assuming the method to update a community is PUT
  }
};

export const searchReview = {
  // 리뷰 조회
  fetchReviews(searchCondition = 'MOVIE_TITLE', keyword = '', page = 0, size = 9) {
    return request(
      "get",
      `/api/reviews/search?searchCondition=${searchCondition}&keyword=${keyword}&page=${page}&size=${size}&sort=string`
    );
  }
};

export const getMovies = {
  fetchMovies(title = '') {
    return request(
      "get",
      `/api/reviews/movies?title=${encodeURIComponent(title)}`
    );
  }
};

export const deleteReview = {
  fetch(reviewId) {
    return request("delete", `/api/reviews/${reviewId}`);
  }
};

export const updateReview = {
  fetch(reviewId, postingTitle, star, contents) {
    return request("put", `/api/reviews/${reviewId}`, {
      postingTitle,
      star,
      contents
    });
  }
};

export const postReview = {
  async fetch(movieTitle, movieImg, genre, postingTitle, star, contents) {
    return request("post", "/api/reviews", {
      movieTitle,
      movieImg,
      genre,
      postingTitle,
      star: Number(star), // star 값이 Double 타입으로 요구됨에 따라 Number로 변환
      contents
    });
  }
};

export const getReview = {
  fetch(reviewId) {
    return request(
      "get",
      `/api/reviews/${reviewId}`);
  }
}

export const postReviewComments = {
  fetch(reviewId, commentText) {
    return request(
      "post",
      `/api/reviews/${reviewId}/comments`,
      { contents: commentText });
  }
};

export const updateReviewComments = {
  fetch(reviewId, commentId, commentText) {
    return request(
      "put",
      `/api/reviews/${reviewId}/comments/${commentId}`,
      { contents: commentText });
  }
};

export const deleteReviewComments = {
  fetch(reviewId, commentId) {
    return request("delete", `/api/reviews/${reviewId}/comments/${commentId}`);
  }
}
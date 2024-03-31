// 백엔드 API를 Axios로 호출하는 함수들을 정의합니다.
import axios from "axios";
import router from "@/router";

const DOMAIN = "http://localhost:8080";

export const apiClient = axios.create({
  //baseURL = 서버 주소
  baseURL: import.meta.env.VITE_APP_LOCAL_BACKEND_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  }
});


// 로그인 성공 시 토큰 로컬 스토리지에 저장 !!
// -> apiClient 요청 보낼 때 자동으로 토큰을 헤더에 추가함
apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken && config.headers) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

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
export const getMeetings = async (id) => {
  const response = await apiClient.get(`/api/meetings/${id}`);
  return response;

};


export const searchMeetings = async (params) => {
  const response =
    apiClient.get(
      `/api/meetings?locationType=${params.locationType}&searchCondition=${params.searchCondition}&keyword=${params.keyword}&page=${params.page}&size=${params.size}&sort=string`);
  return response;
};


export const deleteCommunity = async (id) => {
  const response = await apiClient.delete(`/api/meetings/${id}`);
  return response;
};
// 모임 수정
export const updateCommunity = async (id, data) => {
  const response = await apiClient.put(`/api/meetings/${id}`, data);
  const result = await response.data;
  return result;
};

// 모임 생성
export const postMeetings = async (data) => {
  const response = await apiClient.post(`/api/meetings`, data);
  const result = await response.data;
  return result;
};
// 모임 신청
export const joinMeetings = async (id) => {
  const response = await apiClient.post(`/api/meetings/${id}/join`);
  return response;
};


// 영화
export const getMovies = async (title = "") => {
  const response =
    apiClient.get(`/api/reviews/movies?title=${encodeURIComponent(title)}`);
  return response;
};

// 리뷰
export const searchReview = async (searchCondition, keyword, page, size) => {
  const response =
    apiClient.get(
      `/api/reviews/search?searchCondition=${searchCondition}&keyword=${keyword}&page=${page}&size=${size}&sort=string`);
  return response;
};

export const deleteReview = async (reviewId) => {
  const response =
    apiClient.delete(`/api/reviews/${reviewId}`);
  return response;
};

export const updateReview = async (reviewId, postingTitle, contents) => {
  const response =
    apiClient.put(`/api/reviews/${reviewId}`,
      {
        postingTitle: postingTitle,
        contents: contents
      });
  return response;
};

export const postReview = async (
  movieTitle, movieImg, genre, postingTitle, contents
) => {
  const response =
    apiClient.post(`/api/reviews`,
      {
        movieTitle: movieTitle,
        movieImg: movieImg,
        genre: genre,
        postingTitle: postingTitle,
        // star: star,
        contents: contents
      });
  return response;
};

export const getReview = async (reviewId) => {
  const response =
    apiClient.get(`/api/reviews/${reviewId}`);
  return response;
};


// 리뷰 댓글
export const postReviewComments = async (reviewId, commentText) => {
  const response =
    apiClient.post(`/api/reviews/${reviewId}/comments`,
      { contents: commentText });
  return response;
};

export const updateReviewComments = async (reviewId, commentId, commentText) => {
  const response =
    apiClient.put(`/api/reviews/${reviewId}/comments/${commentId}`,
      { contents: commentText });
  return response;
};

export const deleteReviewCommentsAxios = async (reviewId, commentId) => {
  const response =
    apiClient.delete(`/api/reviews/${reviewId}/comments/${commentId}`);
  return response;
};

export const getReviewHeart = async (reviewId) => {
  const response =
    apiClient.get(`/api/review/${reviewId}/heart`);
  return response;
};

export const getBestReview = async () => {
  const response =
    apiClient.get("/api/reviews/bestTop3");
  return response;
};

export const getChatRoom = async (meetingId) => {
  const response =
    apiClient.get(`/api/meetings/${meetingId}/chat/chatRoom`);
  return response;
};

export const postChatRoom = async (meetingId, name) => {
  const response =
    apiClient.post(`/api/meetings/${meetingId}/chat/chatRoom`, name);
  return response;
};

export const getChatMessage = async (meetingId) => {
  const response =
    apiClient.get(`/api/meetings/${meetingId}/chat/messages`);
  return response;
};
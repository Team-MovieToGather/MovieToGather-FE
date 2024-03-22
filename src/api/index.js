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

export const review = {
  fetch() {
    return request(
      "get",
      "/api/reviews/search?searchCondition=POSTING_TITLE&keyword=str&page=0&size=2&sort=string"
    );
  }
};
export const meetingInfo = {
  fetch() {
    return request("get", "/api/meetings?type=OFFLINE&searchCondition=MOVIE_TITLE&keyword=str&page=0&size=9&sort=string");
  }
};

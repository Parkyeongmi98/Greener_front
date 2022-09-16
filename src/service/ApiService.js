import { API_BASE_URL } from "../app-config";
import axios from "axios";


export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  }
  );

  // 로컬 스토리지에서 ACCESS TOKEN 가져오기
  const accessToken = localStorage.getItem("access");
  console.log(accessToken)
  if (accessToken && accessToken !== null) {
    headers.append("access", "Bearer " + accessToken);
    
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    // GET method
    options.body = JSON.stringify(request);
    
  }
  
  return fetch(options.url, options)
    .then((response) =>
    
       {
        
        if (!response.ok) {
          // response.ok가 true이면 정상적인 리스폰스를 받은것, 아니면 에러 리스폰스를 받은것.
          return Promise.reject(response);
        }
        return response;
       }
    )
    .catch((error) => {
      // 추가된 부분
      if (error.status === 400) {
        // window.location.href = "/login"; // redirect
      }
      return Promise.reject(error);
    });
}

export function login(userDto) {
  return call("/auth/login", "POST", userDto).then((response) => {
  

    if (response.headers.get("access")) {

      // 로컬 스토리지에 토큰 저장
      axios.defaults.headers.common[
        "accessToken"
      ] = `Bearer ${response.headers.get("access")}`;
      console.log(response)
      localStorage.setItem("access", response.headers.get("access"));
      localStorage.setItem("id", response.headers.get("id"));
      
      // token이 존재하는 경우 Todo 화면으로 리디렉트
      window.location.href = "/";
      alert('로그인 되었습니다.')
    } else {
      alert('로그인 실패하였습니다.')
    }
  });
}



// export function logout() {
//   return axios.defaults.headers.common['Authorization'] = `Bearer ${res.payload.accessToken}`
//   axios.get('/user/me')
//     .then(res => {
//       console.log(res);	
//     })
// })
// }
    
//     localStorage.removeItem("access");
//     window.location.href = "/login";
//     alert('로그아웃 되었습니다.')     
      
//     })
// };




export function signup(userDto) {
    return call("/auth/signup", "POST", userDto);
}


export function todo(TodoDTO) {
  return call("/todo", "POST", TodoDTO);
}
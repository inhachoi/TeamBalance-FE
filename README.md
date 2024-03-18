<h1>트러블 슈팅</h1>
#이벤트 버블링
        
        ```
                  <Link key={item.id} to={`/detail/${item.id}`}>
                    <StTmi>
                      {item.gameTitle}
                      <StDeleteButton onClick={() => handleDeleteGame(item.id)}>
                        X
                      </StDeleteButton>
                    </StTmi>
                  </Link>
        
        ```
        
1. 삭제 버튼을 누르면 페이지 이동 기능까지 같이 동작
2. 이벤트 버블링 에러
3. StDeleteButotn 컴포넌트에 stopPropagation() 적용
4. Link를 없애주고 자식 컴포넌트에 stopPropagation() 적용 후 해결
        
        ```jsx
                      <StTmi key={item.id} onClick={() => handleGameClick(item.id)}>
                        {item.gameTitle}
                        <StDeleteButton
                          onClick={(e) => {
                            e.stopPropagation(); // 클릭 이벤트가 상위 요소로 전파되지 않도록 중단합니다.
                            handleDeleteGame(item.id);
                          }}
                        >
                          X
                        </StDeleteButton>
                      </StTmi>
        ```
        
#무한 콘솔에러
        
        ```jsx
        authInstance.interceptors.response.use(
          (response) => {
            console.log("응답 인터셉트됨:", response, new Date());
            return response;
          },
          async (error) => {
            console.error("응답 오류 인터셉트됨:", error);
            if (error.response) {
              try {
                // 토큰을 새로 고칩니다.
                const data = await postRefreshToken();
                console.log("새로 고친 토큰 데이터:", data);
                const { accessToken } = data;
                localStorage.setItem("accessToken", accessToken);
                // 새 토큰을 사용하여 원래의 요청을 다시 보냅니다.
                const originalRequest = error.config;
                originalRequest.headers.Authorization = accessToken;
                return authInstance(originalRequest);
              } catch (refreshError) {
                console.error("토큰을 새로 고치는 중 오류 발생:", refreshError);
                return Promise.reject(error); // 원래의 요청에 대한 오류를 반환합니다.
              }
            }
            return Promise.reject(error);
          }
        );
        ```
        
1. 남이 만든 게임 삭제하면 권한 문제로 무한 콘솔 루프 에러
2. 본인이 만든게 아니면 에러창 뜨게 처리해서 해결
        
        ```
        authInstance.interceptors.response.use(
          (response) => {
            console.log("응답 인터셉트됨:", response, new Date());
            return response;
          },
          async (error) => {
            console.error("응답 오류 인터셉트됨:", error);
            console.log("status : ", error.response.status);
            if (error.response.status === 400) {
              alert(`${error.response.data.message}`);
              return Promise.reject(error);
            }
          }
        );
        ```

#리프레시 토큰 문제 → 해결 필요 사항
        - 만료 시 interceptor 응값할 때 토큰이 만료되면 error로 처리되어 구현을 토큰 재발급 요청을 보내야하지만 response로 받아져서 처리할 수 있는 방법을 새로 모색해야함
            
            
#FE / BE 소통 문제
        - 서버 관련
            - 문제
            
             탄력적 IP 주소를 사용하지 않아서 인스턴스 중지하고 다시 시작하면 IP 변경되는 문제
            
            - 해결 방법
            
            탄력적 IP 설정 후 적용해서 IP 변동이 없도록 조치했다.
            
            - 문제
            
            SSH 접속이 끊기면 서버 접속이 종료되는 문제 → 프론트에서 서버 ON 요청을 계속 해야한다.
            
            - 해결 방안
            
            SSH 명령어를 통해 접속이 끊겨도 서버가 계속 돌도록 설정했다.
            
            ```jsx
            nohup java -jar JAR파일명.jar &
            ```
            
        - 유저 인증 문제
            - 문제
            
            프론트엔드와 백엔드의 역할 범위를 인지하지 못한 문제
            
            - 원인
            
            백엔드와 프론트간에 역할 차이에서 문제가 생겼다. 그것을 서로 설명이 부족해서 문제가 생겼다. 백엔드에서는 로그인 시 토큰 값이 서버에 입력이 된다는 것을 알았지만, 그것을 프론트에 설명하지 못해서 생긴 문제였다. 
            
            - 해결방안
            
            기술 매니저님의 조언을 통해, 서로 대화를 통해서 해결을 했다.
            
        
#CORS 문제
        - 문제
        
        프로젝트 도중 CORS 문제가 발생했다.
        
        - 원인
        
        백엔드에서는 8080 포트를 사용하는데, 프론트에서는 3000 포트를 사용했다. 즉, SOP(Same Origin Policy)을 위반했기 때문에 CORS 문제가 발생했다. 
        
        - 해결방안
        
        Access-Cotrol-Allow-Origin 헤더 세팅으로 CORS를 해결했으나 헤더에 Authorization 값이 안 들어가는 문제가 추가적으로 발생했다. 그 후 참고 자료를 통해configuration.addExposedHeader("Authorization"); 를 추가해 헤더에 Authorization Token이 정상적으로 추가되도록 수정했다.
        
        수정 전
        
        ```java
          // SecurityFilterChain 부분에 추가한 코드
          http.cors(cors ->
                        cors.configurationSource(corsConfigurationSource())
                );
                
          @Bean
            public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
        
                configuration.addAllowedOrigin("*");
                configuration.addAllowedHeader("*");
                configuration.addAllowedMethod("*");
                configuration.setAllowCredentials(false);
        
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
            }
        }
        ```
        
        수정 후
        
        ```java
           // SecurityFilterChain 부분에 추가한 코드
          http.cors(cors ->
                        cors.configurationSource(corsConfigurationSource())
                );
                
          @Bean
            public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
        
                configuration.addAllowedOrigin("*");
                configuration.addAllowedHeader("*");
                configuration.addAllowedMethod("*");
                configuration.addExposedHeader("Authorization");
                configuration.setAllowCredentials(false);
        
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
            }
        }
        ```
        
#DB 충돌
        - 문제
        
        선택지 좋아요를 하게되면 게임 선택 조회에서 무한 루프가 생기게 되었다.
        
        - 원인
        
        데이터 베이스 매핑에서 문제가 발생했다.
        
        - 해결방안
        
        @JsonIgnore 에너테이션 추가했다. 
        
        @JsonIgnore으로 해당 필드를 JSON 직렬화/역직렬화에서 제외시켰다.
        
        ```java
        @JsonIgnore
        @OneToMany(mappedBy = "choice")
        private List<ChoiceLike> likes = new ArrayList<>();
        ```
        
    - 
#http → https 전환 문제
        - 문제
        1. http 참고자료를 보면서 설정했으나, 도메인 접속이 불가능했다. -> 다른 조랑 비교해도 다른 부분이 없었다.
        2. 탄력적 ip 적용 후 삭제하거나, 수정하는 방향으로 다시 설정했으나 도메인 접속이 불가능했다.
        3. 아예 전부 삭제하고 시도를 했으나, aws에서 
        - 원인
        1. SSL 보안 연결 문제(ERR_SSL_PROTOCOL_ERROR)
        - 해결방안
        
        Reference를 통해 문제 해결 시도
        
    

<h1>더 구현하고 싶었던 점</h1> 
#이미지 첨부
        - 현재는 화면에 게임에 주제만 보이게 함.
        → 게임을 추가할때 사진도 첨부해서 화면에 제목과 각 선택지의 사진까지 보이게 하여 직관성 상승 .

#마이페이지 구현
        - 닉네임 수정기능 추가
        - 현재 메인 창에서 게임 삭제 / 디테일 창에서 댓글 삭제. 본인이 만들지 않은 것은 경고창이 뜨게 구현
        → 이렇게 말고 마이페이지에서 본인이 만든 게임, 댓글만 뜨게해서 여기서 수정
        
#css 애니메이션 효과 추가
        - 현재는 정적으로 화면에 뜸
        → 동적으로 게임들이 보이게 하기.
        
#리프레시 토큰

#밸런스 게임 생성 시 이미지 추가 기능
    
#성능 향상을 위해 QueryMethod를 QueryDSL로 리팩토링
    
#DTO와 Entity 클래스 매핑 시 MapStruct 적용

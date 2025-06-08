# section 03

## 10. 앱 셋업

nestJs cli를 설치하고 프로젝트 생성
`npm i -g @nestjs/cli`
`nest new section-03`

GET 요청과 POST 요청에 대한 프로세스 설명

1. Pipe: 요청에 포함된 데이터 유효성 검사
2. Guard: 사용자가 인증되었는지 확인합니다.
3. Controller: 요청을 특정 함수로 라우팅하기
4. Service: 일부 비즈니스 로직 실행
5. Repository: 데이터베이스에 액세스

GET은 Controller, Service, Repository 과정을,
POST는 Pipe, Controller, Service, Repository
에 대한 처리를 알아보도록 한다.

## 11. Nest CLI로 파일 생성하기

nestjs cli로 생성한 프로젝트에서 기본 app으로 시작하는 모듈, 컨트롤러, 서비스를 삭제하고
nestjs generate 를 이용하여 messages 모듈을 생성한다.
`nest generate module messages`

## 12. 파일 생성에 관한 더 자세한 설명

## 13. 라우팅 논리 넣기

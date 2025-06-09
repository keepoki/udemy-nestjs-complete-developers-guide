# Scratch

- Section 02: Nest 기초

## 4. 프로젝트 설정

NestJs의 CLI를 통해 생성할 수 있지만, 이번 시간에는 직접 서버를 실행하기 위한 기본 과정으로 NestJs 의존 패키지를 설치한다.

## 5. 타입스크립트 설정

tsconfig.json 파일 생성 및 NestJs 데코레이션 사용을 위해 설정한다.

```json
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
```

## 6. 컨트롤러 만들기

`@nestjs/common` 패키지의 데코레이터를 이용하여 컨트롤러를 만든다.
컨트롤러가 라우트를 정의하는 것임을 알 수 있었다.

## 7. Nest 앱 시작하기

모듈을 만들고, 모듈에 컨트롤러를 연결함
서버 실행을 위해 `bootstrap` 비동기 함수를 만들고
HTTP 서버를 3000번 포트를 사용하여 서버 동작 준비를 마친다.

```ts
const app = await NestFactory.create(AppModule);
await app.listen(3000);
```

그리고 다음 명령어를 통해 서버를 실행하고 잘 작동하는지 확인하였다.
`npx ts-node-dev ./src/main.ts`

`ts-node-dev`는 ts-node와 nodemon의 기능을 합쳐놓은 것으로, 타입스크립트 코드를 실행해주고 파일이 변경될 때 자동으로 재시작해주는 기능을 제공한다.

`ts-node`는 타입스크립트를 자바스크립트로 트랜스파일 하지 않고 바로 실행주는 도구이다.
`nodemon`은 nodejs 프로그램의 파일 변경 사항을 감지하여 자동으로 재시작하는 도구이다.

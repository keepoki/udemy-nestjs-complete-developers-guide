# messages

## 목차

- **Section 03. Nest CLI로 프로젝트 생성하기 완료**
  - [10. 앱 셋업](#10앱-셋업)
  - [11. Nest CLI로 파일 생성하기](#11-nest-cli로-파일-생성하기)
  - [12. 파일 생성에 관한 더 자세한 설명](#12-파일-생성에-관한-더-자세한-설명)
  - [13. 라우팅 논리 넣기](#13-라우팅-논리-넣기)
  - [15. VSCode REST Client 익스텐션 (선택)](#15-vscode-rest-client-익스텐션-선택)

- **Section 04. 파이프로 요청 데이터 검증하기**
  - [16.데코레이터로 요청 데이터에 액세스하기](#16-데코레이터로-요청-데이터에-엑세스하기)
  - [17. 추가 필수 라이브러리 설치하기](#17-추가-필수-라이브러리-설치하기)
  - [18. ValidationPipe 사용하기](#18-validationpipe-사용하기)
  - [19. 검증 규칙 추가하기](#19-검증-규칙-추가하기)
  - [20. 검증 과정 심층 분석](#20검증-과정-심층-분석)
  - [21. 타입 정보가 Javascript에서도 보존되는 이유](#21-타입-정보가-javascript에서도-보존되는-이유)
- **Section 05. Nest 아키텍쳐: 서비스와 리포지토리**
  - [22. 서비스와 리포지토리](#22-서비스와-리포지토리)
  - [23. 리포지토리 구현하기](#23-리포지토리-구현하기)
  - [24. 스토리지 파일 읽고 쓰기](#24-스토리지-파일-읽고-쓰기)
  - [25. 서비스 구현하기](#25-서비스-구현하기)
  - [26. 컨트롤러 수동 테스트](#26-컨트롤러-수동-테스트)
  - [27. Nest에 내장된 예외 라이브러리로 오류 보고하기](#27-nest에-내장된-예외-라이브러리로-오류-보고하기)
  - [28. 제어 역전 자세히 알아보기](#28-제어-역전-자세히-알아보기)
  - [29. 의존성 주입 소개](#29-의존성-주입-소개)
  - [30. 의존성 주입을 이용하기 위한 리팩터링](#30-의존성-주입을-이용하기-위한-리팩터링)
  - [31. 의존성 주입에 관한 추가 참고사항](#31-의존성-주입에-관한-추가-참고사항)

---

## Section 03. Nest CLI로 프로젝트 생성하기 완료

### 10.앱 셋업

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

### 11. Nest CLI로 파일 생성하기

nestjs cli로 생성한 프로젝트에서 기본 app으로 시작하는 모듈, 컨트롤러, 서비스를 삭제하고
nestjs generate 를 이용하여 messages 모듈을 생성한다.
`nest generate module messages`

### 12. 파일 생성에 관한 더 자세한 설명

이번에는 messages controller를 만들어본다.
`nest generate controller messages/messages --flat`
_messages 폴더에 controller를 생성하는데 클래스 이름을 messages로 하겠다는 의미이다.
`--flat`옵션은 messages에 하위 폴더로 controllers를 추가로 생성하지 않는 옵션이다._

`messages.controller.spec.ts`, `messages.controller.ts`, `messages.module.ts` 파일이 생성되었다.

### 13. 라우팅 논리 넣기

messages.controller에 `Get, Post, Get('/:id)` 데코레이터로 라우팅 핸들러 메서드를 만들었다.

### 15. VSCode REST Client 익스텐션 (선택)

`rest client` 익스텐션을 설치하고, request.http 파일을 생성하여 요청 메서드를 작성하고 실행해보는 시간이었다.
_POST 요청을 보낼 때 Body는 Headers 밑에 한 줄을 띄어서 작성해야한다._

```http
### List all messages
GET http://localhost:3000/messages

### Create a new message
POST http://localhost:3000/messages
Content-Type: application/json

{
  "content": "hi there"
}

### Get a particular message
GET http://localhost:3000/messages/20250609
```

---

## Section 04. 파이프로 요청 데이터 검증하기

### 16. 데코레이터로 요청 데이터에 엑세스하기

`@Param('id')`, `@Query()`, `@Headers()`, `@Body()`

데코레이터는 클래스 데코레이터와, 메서드 데코레이터로 나누어진다

### 17. 추가 필수 라이브러리 설치하기

`npm i class-validator class-transformer`

### 18. ValidationPipe 사용하기

특정 라우트에 대한 요청이 들어왔을 때, 컨트롤러(라우트 핸들러)에 바로 연결되는 것이 아닌 미들웨어로 검증 파이프를 거치도록 설정하였다.

```ts
// main.ts
...
import { ValidationPipe } from '@nestjs/common'; // 추가

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  app.useGlobalPipes(new ValidationPipe()); // 추가
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

### 19. 검증 규칙 추가하기

 `CreateMessageDto` 클래스를 추가하였다.

 ```ts
 // create-message.dto.ts
import { IsString } from "class-validator";

export class CreateMessageDto {
  @IsString()
  content: string;
}
 ```

> DTO(Data Transfer Object) 데이터 전송 객체
프로세스 간에 데이터를 전달하는 객체이다. 프로세스 간 통신이 일반적으로 원격 인터페이스(예: 웹 서비스)로 재정렬하면서 이루어지게 되는데 여기에서 각 호출의 비용이 많다는 점을 동기로 하여 이용하게 된다.각 호출의 비용이 큰 것이 클라이언트와 서버 간 왕복 시간과 관련되기 때문에 호출의 수를 줄이기 위해 여러 호출에 의해 전송되는 데이터를 축적하면서 오직 하나의 호출만으로 서비스되는 객체인 DTO를 사용하는 것이다.

### 20.검증 과정 심층 분석

`class-transformer` 패키지는 JSON 형식 데이터 또는 자바스크립트 객체를 클래스 인스턴스로 만드는 기능을 제공하며, 반대로 바꾸는 것도 가능하다.
`class-validator` 패키지는 데코레이터 기반 및 비데코레이터 기반 유효성 검사 기능을 제공한다. 내부적으로 validator.js를 사용하여 유효성 검사를 수행합니다. 브라우저와 Node.js 플랫폼 모두에서 작동한다.

ValidationPipe에 대한 과정을 아래와 같이 구성한다.

1. `class-transformer`를 사용하여 DTO 클래스 인스턴스로 변환한다.
2. `class-validator`를 이용하여 인스턴스에 있는 다양한 속성들을 검증한다.
3. 검증 오류가 있는지 확인하고 오류가 있으면 즉시 응답을 반환하고, 그렇지 않다면 컨트롤러 안에 정의한 요청 핸들러에게 요청을 전달한다.

### 21. 타입 정보가 JavaScript에서도 보존되는 이유

일반적으로 타입스크립트는 자바스크립트 코드로 변환될 때 타입은 보존되지 않는다.

`tsconfig.json`에서 설정한 옵션들 로 인해 아주 적은 양의 타입 어노테이션과 정보가 자바스크립트로 변환 된다.

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true,
}
```

변환 결과를 아래 코드로 확인하자.

```ts
// messages.controller.ts
@Post()
createMessage(@Body() body: CreateMessageDto) {
  console.log(body);
}
```

위 소스 코드가 아래 자바스크립트 소스 코드로 변환되었다.
데코레이터와, DTO 클래스 타입을 유지하고 있다.

```js
__decorate([
// dist/messages/messages.controller.js
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", void 0)
], MessagesController.prototype, "createMessage", null);
```

---

## Section 05. Nest 아키텍쳐: 서비스와 리포지토리

### 22. 서비스와 리포지토리

### 23. 리포지토리 구현하기

### 24. 스토리지 파일 읽고 쓰기

### 25. 서비스 구현하기

### 26. 컨트롤러 수동 테스트

### 27. Nest에 내장된 예외 라이브러리로 오류 보고하기

### 28. 제어 역전 자세히 알아보기

### 29. 의존성 주입 소개

### 30. 의존성 주입을 이용하기 위한 리팩터링

### 31. 의존성 주입에 관한 추가 참고사항

# DI (Dependency Injection, 의존성 주입)

## 목차

- **Section 06. Nest 아키텍처: 모듈로 코드 정리하기**
  - [32. 프로젝트 개요](#32-프로젝트-개요)
  - [33. 파일 생성하기](#33-파일-생성하기)
  - [34. 모듈 간 DI 설정하기](#34-모듈-간-di-설정하기)
  - [35. 모듈 간 DI 추가 학습](#35-모듈-간-di-추가-학습)
  - [36. 다수의 모듈 사용](#36-다수의-모듈-사용)
  - [37. 모듈 묶기](#37-모듈-묶기)

## Section 06. Nest 아키텍처: 모듈로 코드 정리하기

### 32. 프로젝트 개요

이번 프로젝트는 Computer, CPU, Power, Disk 각각의 모듈을 만들면서 관계와 각각의 기능을 배운다고 한다.
프로젝트 생성 `nest new di` (npm 패키지)

### 33. 파일 생성하기

모듈 생성 `nest g module computer`, 똑같은 방법으로 모두 생성
서비스 생성 `nest g service cpu`, `power`, `disk`
컨트롤러 생성 `nest g controller computer`

※매번 NestJS에서 프로젝트 생성하면 ts파일에서 뜨는 Delete 'CR'은 윈도우에서 개행은 `\r\n` (CRLF)으로 처리하기 때문인데..
VSCode 설정창에서 `files eol`를 검색해서 `\n`으로 바꾸면 된다. 다만 이미 생성한 파일은 CRLF으로 되어있다.
일괄 변경하기 그래서 eslint 설정 파일을 수정하였다.

```js
// eslint.config.mjs
rules: {
  'prettier/prettier': [
    'error',
    {
      endOfLine: 'auto',
    },
  ],
},
```

### 34. 모듈 간 DI 설정하기

### 35. 모듈 간 DI 추가 학습

### 36. 다수의 모듈 사용

### 37. 모듈 묶기
# My Car Value

## 목차

- **Section 07. 본격 프로젝트 시작**
  - [38. 앱개요](#38-앱-개요)
  - [39. API 설계](#39-api-설계)
  - [40. 모듈 설계](#40-모듈-설계)
  - [41. 모듈, 컨트롤러, 서비스 생성하기](#41-모듈-컨트롤러-서비스-생성하기)
- **Section 08. TypeORM을 이용해 데이터 보관하기**
  - [42. Nest를 이용한 영구 데이터를](#42-nest를-이용한-영구-데이터를)
  - [43. 데이터베이스 연결 설정](#43-데이터베이스-연결-설정)
  - [44. 엔터티와 리포지토리 생성하기](#44-엔터티와-리포지토리-생성하기)
  - [45. 데이터베이스 내용 보기](#45-데이터베이스-내용-보기)
  - [46. TypeORM 데코레이터 이해하기](#46-typeorm-데코레이터-이해하기)
  - [47. 리포지토리에 관한 짤막한 설명](#47-리포지토리에-관한-짤막한-설명)
  - [48. 몇 가지 추가 경로](#48-몇-가지-추가-경로)
  - [49. 본문 검증 설정하기](#49-본문-검증-설정하기)
  - [50. 수동으로 경로 테스트하기](#50-수동으로-경로-테스트하기)

## Section 07. 본격 프로젝트 시작

### 38. 앱 개요

중고차 견적을 내주는 API를 만든다.

이메일과 패스워드를 이용한 회원 가입 기능을 제공한다. 차종, 모델, 연식, 주행거리에 따라 예상 가격을 산정한다.
실제로 판매한 금액을 사용자에게 입력받는다. 그런 다음, 그 금액을 이용해 앞으로 문의하는 차량의 가격을 추산하는 능력을 더 보완한다.
사용자가 차량을 판매했다고 보고할 때마다 데이터를 관리자가 검토한다.

### 39. API 설계

앞으로 만들어야 할 API에 대해 설명한다.
Method and Route, Body or Query String, Description으로 나누어서 설명한다.
회원 가입, 로그인, 리포트 생성/조회/갱신

### 40. 모듈 설계

`Users`, `Reports` 모듈에 대해 설명한다.
각 모듈은 컨트롤러, 서비스, 리포지토리로 구성할 예정이다.

### 41. 모듈, 컨트롤러, 서비스 생성하기

NextJs CLI로 `Users`, `Reports` 각각 모듈, 컨트롤러, 서비스를 생성한다.

---

## Section 08. TypeORM을 이용해 데이터 보관하기

### 42. Nest를 이용한 영구 데이터를

TypeORM은 NestJS에서 지원하는 도구가 있어서 궁합이 좋다고 한다.
따라서 TypeORM과 DB는 SQLite를 사용하기로 하였다. 패키지를 설치하자.
`npm install @nestjs/typeorm typeorm sqlite3`

### 43. 데이터베이스 연결 설정

DB와 `AppModule`를 연결하여 다른 모듈에서도 사용할 수 있도록 설정한다.

`UsersModule`과 `ReportsModule`은 각각 `Entity`와 `Repository`를 가진다.
엔터티에는 데이터베이스에 필요한 속성들을 정의한다.
리포지토리에는 데이터베이스 기능을 정의한다.

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 추가
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ // TypeORM 설정
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

`npm run start:dev` 명령어로 실행하면 root폴더에 `db.sqlite` 파일이 생성되는 것을 확인할 수 있다.

### 44. 엔터티와 리포지토리 생성하기

엔터티를 생성하는 과정 3단계를 소개한다.
1단계는 엔터티 파일을 만들고 그 안에 클래스를 생성한다. 이 클래스는 엔터티에 있어야 할 것으로 예상되는 다양한 속성들을 모두 열거한다.
`user.entity.ts` 파일을 생성하고 아래와 같이 구성한다.

```ts
// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
```

2단계는 엔터티를 부모 모듈에 연결한다. `user.module.ts` 파일에서 설정한다.

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])], // forFeature메서드를 사용하여 엔터티를 등록한다.
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
```

3단계는 엔터티를 루트 커넥션으로 연결한다.

```ts
// app.module.ts
import { UserEntity } from './users/user.entity';
...

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [UserEntity], // 엔터티 추가
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  ...
})
```

### 45. 데이터베이스 내용 보기

reports도 이전 과정과 마찬가지로 엔터티를 만들고 루트에 연결한다.
`db.sqlite`파일은 바이너리로 되어있어서 제대로 된 구성을 보기 위해서는 익스텐션을 설치해야한다.
`SQLite Viewer`를 설치하고 파일을 확인하면, 정의한 엔터티들이 테이블로 생성된 것을 확인할 수 있다.

### 46. TypeORM 데코레이터 이해하기

`app.module.ts`에서 설정한 `TypeOrmModule.forRoot`에서 `synchronize` 옵션은 엔터티를 동기화하여 테이블이 없으면 생성해주고, 변경되 었다면 적용해주는 옵션이다.

### 47. 리포지토리에 관한 짤막한 설명

앞으로 우리가 구성할 리포지토리 API에 대해 설명한다.
create(), save(), find(), findOne(), remove()
save()는 insert/update를 둘 다 수행하는 메서드이다.

### 48. 몇 가지 추가 경로

구성할 메서드 그리고 라우터에 대한 설명과 이를 구현하기 위한 컨트롤러 메서드를 설명한다.
createUser, findUser, findAllUser, updateUser, removeUser

### 49. 본문 검증 설정하기

### 50. 수동으로 경로 테스트하기

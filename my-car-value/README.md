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
- **Section 09. 사용자 데이터 생성 및 저장**
  - [51. 사용자 생성과 저장](#51-사용자-생성과-저장)
  - [52. 간단한 리뷰](#52-간단한-리뷰)
  - [53. 생성과 저장에 관한 추가 내용](#53-생성과-저장에-관한-추가-내용)
  - [54. find()와 findOne() 메서드에 필요한 업데이트](#54-find와-findone-메서드에-필요한-업데이트)
  - [55. 데이터 쿼리](#55-데이터-쿼리)
  - [56. 데이터 업데이트](#56-데이터-업데이트)
  - [57. 사용자 삭제](#57-사용자-삭제)
  - [58. 레코드 검색과 필터링](#58-레코드-검색과-필터링)
  - [59. 레코드 삭제](#59-레코드-삭제)
  - [60. 레코드 업데이트](#60-레코드-업데이트)
  - [61. 예외에 관한 사항](#61-예외에-관한-사항)
- **Section 10. 커스텀 데이터 직렬화**
  - [62. 응답 속성 제외](#62-응답-속성-제외)
  - [63. 직렬화 솔루션](#63-직렬화-솔루션)
  - [64. 인터셉터 구현 방법](#64-인터셉터-구현-방법)
  - [65. 인터셉터 내 직렬화](#65-인터셉터-내-직렬화)
  - [66. 인터셉터 DTO 커스터마이즈](#66-인터셉터-dto-커스터마이즈)
  - [67. 데코레이터에 인터셉터 포함하기](#67-데코레이터에-인터셉터-포함하기)
  - [68. 컨트롤러 범위의 직렬화](#68-컨트롤러-범위의-직렬화)
  - [69. 직렬화 타입 안정성](#69-직렬화-타입-안정성)
- **Section 11. 기초부터 배우는 인증**
  - [70. 인증 개요](#70-인증-개요)
  - [71. 서비스 셋업 복습](#71-서비스-셋업-복습)
  - [72. 가입하기 구현하기](#72-가입하기-구현하기)
  - [73. (선택) 비밀번호 해시 암호화 이해하기](#73-선택-비밀번호-해시-암호화-이해하기)
  - [74. 해시와 솔트로 비밀번호 암호화하기](#74-해시와-솔트로-비밀번호-암호화하기)
  - [75. 사용자 생성하기](#75-사용자-생성하기)
  - [76. 사용자 로그인 처리하기](#76-사용자-로그인-처리하기)
  - [77. 세션 설정하기](#77-세션-설정하기)
  - [78. 세션 데이터 변경 및 조회하기](#78-세션-데이터-변경-및-조회하기)
  - [79. 사용자 로그인시키기](#79-사용자-로그인시키기)
  - [80. 현재 사용자 조회하기](#80-현재-사용자-조회하기)
  - [81. 사용자 로그아웃시키기](#81-사용자-로그아웃시키기)
  - [82. 자동화 도구 둘](#82-자동화-도구-둘)
  - [83. Param 데코레이터 직접 만들기](#83-param-데코레이터-직접-만들기)
  - [84. 데코레이터와 인터셉터를 쓰는 이유는](#84-데코레이터와-인터셉터를-쓰는-이유는)
  - [85. 인터셉터에서 데코레이터로 정보 전달하기](#85-인터셉터에서-데코레이터로-정보-전달하기)
  - [86. CurrentUserInterceptor를 약간 수정하기](#86-currentuserinterceptor를-약간-수정하기)
  - [87. 인터셉터를 의존성 주입과 연결하기](#87-인터셉터를-의존성-주입과-연결하기)
  - [88. 전역적인 인터셉터](#88-전역적인-인터셉터)
  - [89. 인증 가드를 이용하여 접근 제어하기](#89-인증-가드를-이용하여-접근-제어하기)

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

이전 프로젝트와 마찬가지로 `class-validator`, `class-transformer` 패키지를 설치하였다.
그리고 `create-user.dto.ts` dto를, `main.ts`에서 `ValidationPipe`를 구성하였다.

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
  }),
);
```

### 50. 수동으로 경로 테스트하기

`requests.http` 파일을 생성하여 아래와 같이 설정

```http
### Create a new user
POST http://localhost:3000/auth/signup
content-type: application/json

{
  "email": "asdf@asdf.com",
  "password": "asdfasdf"
}
```

메인에 `ValidationPipe`를 설정할 떄 `whitelist` 옵션의 역할은 예를들어 유저 dto에서 설정한 데이터 보다 많은 데이터가 `body`에 포함된 경우 이를 무시해주는 옵션이다.

예를들어 요청 body JSON에 `admin: true` 같은 옵션을 추가하여, 원치않는 기능 작동으로 보안상 문제가 발생할 수 있으므로 방지해주는 것이다.

---

## Section 09. 사용자 데이터 생성 및 저장

### 51. 사용자 생성과 저장

`TypeORM`을 사용하여 리포지토리 의존성 주입을 하려면 아래와 같이 구성해야 한다.
`Repository`는 리포지토리 타입을 명시해주는 것인데 제네릭 타입으로 `TypeORM`으로 만든 엔터티를 지정해주면 된다.
제네릭 타입을 통해 의존성 주입을 위해서는 `InjectRepository` 데코레이터를 사용해야 한다.

그리고 `create` 메서드를 정의한다. 이메일과 패스워드를 받아서 리포지토리에 생성하고 저장한다.

그리고 실제적으로 요청을 받는 라우터 컨트롤러에 `createUser` 메서드를 정의한다.
테스트 결과 DB에 잘 적용 된 것을 확인할 수 있다.

```ts
// users.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm'; // 제네릭 타입의 의존성 주입

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }
}

// users.service.ts
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }
}
```

### 52. 간단한 리뷰

```ts
// users.service.ts
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }
}
```

`user.service.ts`에서 `create()`와 `save()`를 왜 각각 사용하는지 설명한다.
`create()` 메서드는 새로운 엔터티 인스턴스를 생성하고 데이터를 설정하는 기능이다.
`save()` 메서드는 실제로 엔터티를 가져와서 데이터베이스에 저장하는 기능을 한다.

`save()` 메서드만 있으면 데이터를 저장할 수 있는데 `create()` 메서드를 사용하는 이유는 유효성 검사를 실행하려면 엔터티 인스턴스가 필요하기 때문이다.
유효성 검사를 하고, 유효성 검사를 마친 데이터를 실제 데이터베이스에 저장하기 위함이다.

### 53. 생성과 저장에 관한 추가 내용

후크는 특정 시점에 자동으로 호출되는 엔터티에 함수를 정의한다. `create` 메서드를 통해 엔터티 인스턴스가 생성되어야 후크도 작동한다.

```ts
import { Entity, PrimaryGeneratedColumn, Column, AfterInsert, AfterRemove, AfterUpdate } from 'typeorm';

@Entity()
export class UserEntity {
  ...

  @AfterInsert() // 후크 insert될 때 호출된다.
  logInsert() {
    console.log(`Inserted user with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated user with id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed user with id ${this.id}`);
  }
}

```

### 54. find()와 findOne() 메서드에 필요한 업데이트

0.3.0 TypeORM 릴리스부터 `findBy()`를 더 이상 사용하지 않는다.

따라서 `findOne()` 메서드를 찾아서 반환문을 다음과 같이 설정한다.

```ts
return this.repo.findOneBy({ id });
```

`find()` 메서드를 찾아서 리턴문을 다음과 같이 설정한다.

```ts
return this.repo.find({ where: { email } });
```

### 55. 데이터 쿼리

서비스 함수 정의하기

### 56. 데이터 업데이트

타입스크립트에서 지원하는 `Partial<T>` 제네릭은 모든 옵션을 선택적으로 만들어준다.
`attrs: Partial<UserEntity>`은 `UserEntity`의 속성들을 옵셔널로 만들어 준다는 뜻이다.

![56-01](resources/56-01.png)

유저 서비스의 `update()` 메서드를 작성한다.

레포지토리의 `save()` 메서드를 사용하는 것은 `insert()` 메서드와 `update()` 메서드를 합쳐놓은 기능과 같다.

새로운 엔티티 인스턴스를 전달하면 `INSERT` 쿼리가 실행되고, `@AfterInsert` 후크가 호출된다.
기존 엔티티를 수정하여 전달하면 `UPDATE` 쿼리가 실행되고, `@AfterUpdate` 후크가 호출된다.

차이점은 `insert()`와 `update()`는 직접적인 SQL `INSERT` 또는 `UPDATE` 쿼리를 실행하는 것과 같다. 그렇기 때문에 후크가 없다.

### 57. 사용자 삭제

`remove()` 메서드를 사용하면 `@AfterRemove()` 후크가 호출 된다. 엔터티를 매개변수로 받는다. `remove(Entity)`
`delete()` 메서드는 직접적인 SQL `DELETE` 쿼리를 실행하는 것과 같다. 후크가 없다.

### 58. 레코드 검색과 필터링

`user.services.ts` 파일에 버전 업데이트로 사용법이 바뀐 부분을 수정하였다.
`user.controller.ts`에 `findUser()` 메서드와 `findAllUsers()` 메서드를 정의하였다.

### 59. 레코드 삭제

`user.controller.ts` 삭제 로직 추가

### 60. 레코드 업데이트

업데이트 요청 데이터가 상이할 수 있다.
이메일과 패스워드 모두 바꾸거나, 이메일만 바꾸거나, 패스워드만 바꾸는 경우 등
따라서 `UpdateUserDto`를 정의하고 컨트롤러에 업데이트 로직을 추가한다.

### 61. 예외에 관한 사항

Nest에서 구현된 예외 함수에 대해 배우는 시간이었다.

![61-01](./resources/61-01.png)

---

## Section 10. 커스텀 데이터 직렬화

### 62. 응답 속성 제외

지금은 유저의 데이터 요청시 패스워드를 그대로 노출하고 있지만
보안상 노출되면 안되는 데이터나 불필요한 데이터가 응답되지 않도록 해야 한다.

`class-transformer` 패키지에서 `Exclude()` 데코레이터를 이용하여 지정한 데이터를 응답 데이터에서 제외시킬 수 있다.

`Class Serializer Interceptor`를 이용하여 응답 엔터티 인터페이스를 가로채서
응답 데이터를 조정한다.

### 63. 직렬화 솔루션

공개 라우터와 비공개 라우터에 대하여 설명한다.
관리자는 사용자의 상세 정보를 모두 볼 수 있어야 한다. 따라서, 관리자 라우트 핸들러를 만들어야 한다.
커스텀 인터셉터를 만들어서 사용자 엔터티 인스턴스를 DTO에 설정된 직렬화 규칙에 따라 일반 객체로 바꾸고 일반 JSON으로 바꾼다.
사용자 DTO가 사용자 엔터티를 형식화하는 방법을 규정하도록 만든다.

커스텀 DTO를 만들어서 서로 다른 사용자 엔터티 직렬화 방법을 정의한다.

### 64. 인터셉터 구현 방법

인터셉터는 나가는 응답이나 들어오는 요청을 가로채는 데 사용한다.
인터셉터를 만들 떄마다 각 라우트 핸들러에 적용할 수 있다.
그리고 인터셉터를 전체 컨트롤러에 적용할 수도 있다.

커스텀 인터셉터를 만들었다. `serialize.interceptor.ts`

`users.controller.ts` 파일에서 `findUser()` 메서드에 설정된 인터셉터를 커스텀한 인터셉터로 바꿔주고, 콘솔 로그에 실행 순서를 확인하였다.

```ts
// serialize.interceptor.ts
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // 요청 핸들러가 요청을 처리하기 전에 무언가를 실행합니다.
    console.log('나는 핸들러 전에 실행됩니다.', context);

    return handler.handle().pipe(
      map((data: any) => {
        // 응답이 발송되기 전에 무언가를 실행하십시오
        console.log('응답이 발송되기 전에 실행 중입니다', data);
      }),
    );
  }
}

// users.controller.ts
@UseInterceptors(SerializeInterceptor)
@Get('/:id')
async findUser(@Param('id') id: string) {
  console.log('핸들러가 실행 중입니다.');
  const user = await this.usersService.findOne(parseInt(id));
  if (!user) {
    throw new NotFoundException('user not found');
  }
  return user;
}
```

1. 핸들러가 실행 중입니다
2. 나는 핸들러 전에 실행됩니다.
3. 응답이 발송되기 전에 실행 중입니다.

### 65. 인터셉터 내 직렬화

인터셉터에서 내보낼 데이터를 구성하기 위해 `UserDto`를 설계하였다.
따라서 유저 응답 데이터에는 패스워드는 보이지 않는다.
![65-01](resources/65-01.png)

### 66. 인터셉터 DTO 커스터마이즈

인터셉터 생성자를 추가하고, dto를 의존성으로 받아서 처리할 수 있도록 수정하였다.

### 67. 데코레이터에 인터셉터 포함하기

유저 컨트롤러에서 사용한 인터셉터 데코레이터 `@UseInterceptors(new SerializeInterceptor(UserDto))` 가 불필요하게 길어져서 데코레이터에 인터셉터를 포함하도록 리팩터링 하였다.

### 68. 컨트롤러 범위의 직렬화

유저 컨트롤러 전체적으로 직렬화하기 위해 메서드로 지정한 인터셉터 데코레이터를 클래스에 적용시켰다.

### 69. 직렬화 타입 안정성

인터셉터에서 직렬화 메서드에 매개변수 `dto`를 `any`타입으로 받고 있어서, 어떤 데이터를 넣어도 코드를 자석하는 컴파일 타임에서는 에러가 발생하지 않지만, 실제로 이상한 값을 넣으면 에러가 발생한다.

따라서, 완벽하진 않지만 생성자를 가진 클래스 형태만 받을 수 있도록 수정하였다.

---

## Section 11. 기초부터 배우는 인증

### 70. 인증 개요

인증 단계에 대해 이해하는 시간이었다.
회원가입 요청 -> 유효성 검사 -> 저장소에 유저 추가 -> 생성한 사용자 식별 아이디를 쿠키에 담아서 클라이언트에 응답
이후에는 유저가 원하는 요청에 식별자 아이디 쿠키를 이용하여 처리한다.

그리고 회원가입과 로그인에 대한 로직을 구현하는 두 가지 방법에 대해 소개했다.
첫 번째는 기존 유저 서비스에 `SignUp`, `SignIn`을 추가하는 것이고,
두 번째는 확장성을 고려하여 인증 서비스를 추가하여 `SignUp`, `SignIn`을 추가하는 것이다.

첫 번째는 정말 간단한 어플리케이션이라면 괜찮지만, 대규모 어플리케이션이나 확장성을 고려하면 조금 복잡하더라도 두 번째 방법이 낫다. 또한 인증 이후 유저 관련 다른 분류의 서비스가 더 필요해지는 상황을 생각할 필요가 있다. 나중에는 바꾸기도 어려워진다.

따라서 두 번째 방법으로 구현할 예정이라고 한다.

### 71. 서비스 셋업 복습

### 72. 가입하기 구현하기

### 73. (선택) 비밀번호 해시 암호화 이해하기

### 74. 해시와 솔트로 비밀번호 암호화하기

### 75. 사용자 생성하기

### 76. 사용자 로그인 처리하기

### 77. 세션 설정하기

### 78. 세션 데이터 변경 및 조회하기

### 79. 사용자 로그인시키기

### 80. 현재 사용자 조회하기

### 81. 사용자 로그아웃시키기

### 82. 자동화 도구 둘

### 83. Param 데코레이터 직접 만들기

### 84. 데코레이터와 인터셉터를 쓰는 이유는

### 85. 인터셉터에서 데코레이터로 정보 전달하기

### 86. CurrentUserInterceptor를 약간 수정하기

### 87. 인터셉터를 의존성 주입과 연결하기

### 88. 전역적인 인터셉터

### 89. 인증 가드를 이용하여 접근 제어하기

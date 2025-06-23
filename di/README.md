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

명령어로 생성한 서비스는 기본적으로 의존성 클래스로 설정된 것을 확인할 수 있다.

```ts
// power.services.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
  supplyPower(watts: number) {
    console.log(`Supplying ${watts} worth of power.`);
  }
}
```

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

모듈간 의존성 클래스를 내보내고, 포함시키는 방법에 대해 알아본다.

모듈의 `providers`는 기본적으로 `private`이다. (해당 모듈 내부에서만 사용 가능)
다른 모듈에서 사용할 수 있도록 의존성 클래스를 내보내기 위해서는 `exports` 속성을 사용한다.

```ts
// power.module.ts
import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  providers: [PowerService],
  exports: [PowerService], // 다른 모듈에 의존성 클래스를 제공
})
export class PowerModule {}
```

다른 모듈에서는 `imports` 배열 속성을 사용하여 다른 모듈의 의존성 클래스를 사용할 수 있다.

```ts
// cpu.module.ts
import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from '../power/power.module'; // Power Module

@Module({
  imports: [PowerModule], // 모듈을 포함하고, 해당 의존성 클래스를 사용할 수 있다.
  providers: [CpuService],
})
export class CpuModule {}

// cpu.service.ts
import { Injectable } from '@nestjs/common';
import { PowerService } from '../power/power.service';

@Injectable()
export class CpuService {
  constructor(private powerService: PowerService) {} // 의존성 주입
}
```

### 35. 모듈 간 DI 추가 학습

디스크 모듈에도 파워 모듈을 포함시키고, 디스크 서비스에 파워 서비스를 의존성 주입하였다.

### 36. 다수의 모듈 사용

의존성 관계를 생각하며 다시 한번 모듈들의 `exports`, `imports`를 살펴본다.
컴퓨터 모듈에 디스크와 CPU 모듈을 포함시키기 위해 각각 의존성 클래스를 `exports`에 등록한다.
이제 컴퓨터 모듈에 디스크와 CPU 모듈을 추가한다.

```ts
// computer.module.ts
import { Module } from '@nestjs/common';
import { ComputerController } from './computer.controller';
import { CpuModule } from 'src/cpu/cpu.module';
import { DiskModule } from 'src/disk/disk.module';

@Module({
  imports: [CpuModule, DiskModule], // cpu, disk 모듈 포함
  controllers: [ComputerController],
})
export class ComputerModule {}

// computer.controller.ts
import { Controller, Get } from '@nestjs/common';
import { CpuService } from '../cpu/cpu.service';
import { DiskService } from '../disk/disk.service';

@Controller('computer')
export class ComputerController {
  constructor(
    private cpuService: CpuService,
    private diskService: DiskService,
  ) {}

  @Get()
  run() {
    return [this.cpuService.compute(1, 2), this.diskService.getData()];
  }
}
```

`npm run start:dev` 명령어로 서버를 실행하고 <http://localhost:3000/computer> 접속을 통해 제대로 Get 메서드가 동작하는 것을 확인할 수 있다.

### 37. 모듈 묶기

파워 모듈 -> 디스크 모듈, CPU 모듈 -> 컴퓨터 모듈
컴퓨터 모듈은 파워 모듈과 직접적으로 연결되어 있지 않지만, 포함된 모듈에서 내부적으로 사용하고 있다.
제어를 외부에서 한다는 제어역전의 형태라는 것을 배울 수 있었다.

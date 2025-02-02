# Docker 테스트

일관된 환경과 설정으로 실행될 수 있게 `Docker` 테스트

`Windows`에서 `Docker Desktop`을 설치한 기준으로 정리한다.

## 요구사항

1. 프로젝트 최상위에 `Dockerfile`을 구성
2. `Docker Desktop` 설치 후 실행

# VSCode 실행

## 요구사항

1. VS Code 확장 설치
   - Docker
   - Dev Containers
2. 프로젝트 루트 디렉토리에 `.devcontainer` 폴더를 생성
   - 그 안에 `devcontainer.json` 파일을 생성하고 각종 설정을 구성한다.

## Dev Containers

`command palette`에서 `Dev Containers: Reopen in container` 실행.
또는 `Dev Containers` 옵션에서 `Reopen in Container` 실행.

`Dev Container: Reopen in Container`를 실행하면 다음과 같은 과정이 진행된다.

1. `devcontainer.json` 설정에 따라 빌드를 시작
2. `.dockerignore` 설정이 적용되어 빌드 컨텍스트에서 제외할 파일 및 디렉토리를 필터링
3. `Dockerfile` 설정에 따라 `node:22.12.0` 기반 이미지를 생성
4. 생성된 `node:22.12.0` 이미지를 기반으로 `simple-thumbnail` 이미지를 생성
5. `simple-thumbnail` 이미지를 사용하여 컨테이너를 생성하고 실행
6. `Dockerfile`에 정의된 명령어들을 실행하여 `workspace`를 준비

`.dockerignore` 파일은 `Docker` 빌드 컨텍스트를 설정할 때 적용되므로, `devcontainer.json` 설정에 따라 빌드를 시작한 후, `Dockerfile`을 사용하여 이미지를 생성하기 전에 적용된다.

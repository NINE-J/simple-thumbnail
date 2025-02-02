# 이미지에선 npm install을 따로 실행하지 않고 컨테이너 생성 및 실행 후 컨테이너에서 npm install을 실행한다.

# 프로젝트의 이미지를 생성하기 위해, 노드 버전 22.12.0 기반 이미지가 생성되고 생성된 node:22.12.0 이미지를 기반으로 프로젝트 이미지를 생성한다.
FROM node:22.12.0

# root 사용자로 설정
USER root

# workspaces 디렉토리로 이동
WORKDIR /workspaces/simple-thumbnail

# 프로젝트 소스를 현재 경로에 복사
COPY . .

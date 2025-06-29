# Tomoro AI

## 소개

Tomoro AI는 AI를 활용하여 자연어 형태의 작업을 구조화된 할 일 목록으로 변환하고 효율적으로 관리할 수 있도록 돕는 스마트한 작업 관리 애플리케이션입니다. 사용자 친화적인 인터페이스를 통해 작업을 쉽게 추가, 관리하고 생산성을 높일 수 있습니다.

## 주요 기능

* **작업 파서 (Task Parser)**: AI를 사용하여 자연어 입력(예: "금요일까지 보고서 보내기, 우선순위 높음")을 작업 내용, 마감일, 우선순위 등 구조화된 할 일 항목으로 자동 파싱합니다.
* **작업 표시 (Task Display)**: 현재 할 일 목록을 명확하고 깔끔하게 표시합니다.
* **작업 완료 (Task Completion)**: 간단한 상호작용으로 작업을 완료 상태로 표시할 수 있습니다.
* **작업 순서 변경 (Task Reordering)**: 드래그 앤 드롭 기능을 통해 할 일의 순서를 자유롭게 변경할 수 있습니다.

## 기술 스택

* **프론트엔드**:
    * **Next.js**: React 기반의 웹 애플리케이션 프레임워크 (버전 15.3.3)
    * **React**: 사용자 인터페이스 구축을 위한 JavaScript 라이브러리 (버전 18.3.1)
    * **TypeScript**: 정적 타입 지원을 위한 JavaScript 상위 집합
    * **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크
    * **Shadcn/ui**: UI 컴포넌트
* **백엔드/AI**:
    * **Genkit AI**: AI 기능을 위한 개발 프레임워크
    * **Google AI (Gemini)**: 자연어 처리 및 파싱을 위한 AI 모델 (Gemini 2.0 Flash)
    * **Firebase**: 백엔드 서비스 (Firebase Studio Next.js 스타터)

## 시작하기

프로젝트를 로컬 환경에서 설정하고 실행하는 방법입니다.

### 전제 조건

* Node.js (버전 18 이상 권장) 및 npm (또는 Yarn) 설치
* Google AI (Gemini) API 키 (Genkit AI 사용을 위해 필요)

### 설치

1.  저장소를 클론합니다.
    ```bash
    git clone [저장소 URL]
    cd tomoroAI
    ```
2.  의존성을 설치합니다.
    ```bash
    npm install
    # 또는 yarn install
    ```
3.  **환경 변수 설정**: 프로젝트 루트에 `.env` 파일을 생성하고 Google AI (Gemini) API 키를 추가합니다.
    ```env
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    # 또는 GOOGLE_API_KEY=YOUR_GEMINI_API_KEY
    ```
    `YOUR_GEMINI_API_KEY`를 발급받은 실제 API 키로 대체하세요.

### 개발 서버 실행

애플리케이션을 로컬에서 실행하려면 두 가지 개발 서버를 시작해야 합니다:

1.  **Next.js 개발 서버 실행 (애플리케이션 UI)**:
    ```bash
    npm run dev
    # 또는 yarn dev
    ```
    이 명령어는 애플리케이션 UI를 `http://localhost:9002`에서 실행합니다.

2.  **Genkit AI 개발 서버 실행 (AI 플로우)**:
    새로운 터미널을 열고 다음 명령어를 실행합니다.
    ```bash
    npm run genkit:dev
    # 또는 yarn genkit:dev
    ```
    또는 변경 사항을 감지하여 자동으로 다시 로드하는 `watch` 모드를 사용할 수도 있습니다.
    ```bash
    npm run genkit:watch
    # 또는 yarn genkit:watch
    ```
    Genkit Developer UI는 `http://localhost:4000`에서 접근할 수 있습니다.

두 서버가 모두 실행되면 `http://localhost:9002`에서 Tomoro AI 애플리케이션을 사용할 수 있습니다.

## 스타일 가이드라인

Tomoro AI는 사용자에게 편안하고 집중할 수 있는 경험을 제공하기 위해 다음과 같은 시각적 가이드라인을 따릅니다.

* **기본 색상**: 부드러운 파란색 (`#7BB4E5`)을 사용하여 차분하고 집중된 분위기를 조성합니다.
* **배경 색상**: 매우 밝은 파란색 (`#F0F8FF`, 거의 흰색)으로 깔끔한 인터페이스를 제공합니다.
* **강조 색상**: 차분한 보라색 (`#A088E5`)으로 창의적인 느낌을 더하고 인터랙티브 요소를 돋보이게 합니다.
* **폰트**: 'Inter', sans-serif 폰트를 사용하여 현대적이고 중립적인 외관을 연출합니다.
* **아이콘**: 간단한 선 기반의 아이콘을 사용하여 작업, 완료 상태, 우선순위를 나타냅니다.
* **애니메이션**: 작업 추가 또는 완료 시 부드러운 전환 애니메이션을 적용하여 유연한 사용자 경험을 제공합니다.

---

드래그 앤 드롭으로 작업 순서를 변경할 수 있습니다.

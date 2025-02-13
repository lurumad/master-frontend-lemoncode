# Master Front End XVII - Módulo 4.1 - Frameworks - React Lab

Basic React Lab project for the Master Front End XVII at Lemoncode.

## Description

This project is a basic React project that uses the Github API to fetch the members of an organization:

- By default shows the members of the Lemoncode organization.
- Shows an input to search for a specific organization.
- Shows a detail page with the user profile information.
- Allows to back to the list of members keeping the state of the list.
- Adds pagination to the list of members.
- Uses Material-UI components.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

- [Node.js](https://nodejs.org/en) (v20.13.1) and npm

### Installing

A step by step series of examples that tell you how to get a development env running

1. Clone the repository

```
git clone https://github.com/lurumad/master-frontend-lemoncode.git
```

2. Go to the project directory

```bash
cd master-frontend-lemoncode/04-react/basic
```

3. Install dependencies

```bash
npm install
```

4. Start the project

```bash
npm run dev
```

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at Any Scale.
- [Material-UI](https://material-ui.com/) - React components for faster and easier web development.
- [React Router](https://reactrouter.com/) - Declarative routing for React.
- [React Query](https://react-query.tanstack.com/) - Hooks for fetching, caching and updating asynchronous data in React.
- [MSW](https://mswjs.io/) - Seamless REST/GraphQL API mocking library for browser and Node.

## Github Api Rate Limit

This project uses the Github API to fetch the repositories of a user. The Github API has a rate limit of 60 requests per hour for unauthenticated requests. If you reach the limit. This project adds a [MockApiProvider](src/test/mockApiProvider.tsx) that mocks the API responses. You can use this provider by changing the [App.tsx](src/App.tsx) file.

```typescript
import { Router } from "@/core/router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MockApiProvider } from "./test/MockApiProvider";
import { ListStateProvider } from "./core/list-state/list-state.context";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <MockApiProvider>
      <ListStateProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </ListStateProvider>
    </MockApiProvider>
  );
};
```

## Authors

- **Luis Ruiz** - [lurumad](https://githut.com/lurumad)

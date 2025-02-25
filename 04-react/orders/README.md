# Master Front End XVII - Módulo 4.1 - Frameworks - React Lab

Supplier Orders project for the Master Front End XVII at Lemoncode.

## Description

The proposed model is an Order (advanced users can also manage the list of orders).

The rules are simple:

- The order has a header with general information such as the order number, date, and customer.
- Each order consists of multiple order lines, each specifying the item being requested and its corresponding amount.
- When the amount of an order line is modified, the total order amount is updated.
- Each order line can be validated or invalidated (returning to a pending state).
- The order can only be submitted if all order lines are validated.
- The order status indicates the percentage of validated lines; for example, an order with half of its lines validated will be at 50%.

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
cd master-frontend-lemoncode/04-react/orders
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

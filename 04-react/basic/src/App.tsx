import { Router } from "@/core/router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MockApiProvider } from "@/test/MockApiProvider";
import { ListStateProvider } from "@/core/list-state/list-state.context";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <>
      {import.meta.env.DEV ? (
        <MockApiProvider>
          <ListStateProvider>
            <QueryClientProvider client={queryClient}>
              <Router />
            </QueryClientProvider>
          </ListStateProvider>
        </MockApiProvider>
      ) : (
        <ListStateProvider>
          <QueryClientProvider client={queryClient}>
            <Router />
          </QueryClientProvider>
        </ListStateProvider>
      )}
    </>
  );
};

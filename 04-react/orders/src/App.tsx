import { Router } from "@/core/router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MockApiProvider } from "@/test/MockApiProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <>
      {import.meta.env.DEV ? (
        <MockApiProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />
              <Router />
            </QueryClientProvider>
          </LocalizationProvider>
        </MockApiProvider>
      ) : (
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      )}
    </>
  );
};

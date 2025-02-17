import { Router } from "@/core/router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MockApiProvider } from "@/test/MockApiProvider";
import { CartProvider } from "@/core/cart";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <MockApiProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </CartProvider>
    </MockApiProvider>
  );
};

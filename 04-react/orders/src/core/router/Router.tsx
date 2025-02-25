import { OrderListPage } from "@/pages/order-list";
import { OrderDetailsPage } from "@/pages/order-details";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrderListPage />} />
        <Route path="/orders/:id" element={<OrderDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

import { ListPage } from "@/pages/list";
import { DetailPage } from "@/pages/detail";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

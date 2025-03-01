import { BrowserRouter, Route, Routes } from "react-router-dom";
import { KittiesPage } from "@/pages/kitties";
import { PuppiesPage } from "@/pages/puppies";
import { CheckoutPage } from "@/pages/checkout";
import { NavigationTabs } from "../components/navigationtabs.component";

export const Router = () => {
  return (
    <BrowserRouter>
      <NavigationTabs />
      <Routes>
        <Route path="/" element={<KittiesPage />} />
        <Route path="/kitties" element={<KittiesPage />} />
        <Route path="/puppies" element={<PuppiesPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  );
};

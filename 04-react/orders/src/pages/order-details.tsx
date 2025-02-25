import { DetailContainer } from "@/pods/order-detail/order-details.container";
import { useParams } from "react-router-dom";

export const OrderDetailsPage = () => {
  const { id } = useParams();
  return <DetailContainer id={Number(id)} />;
};

import { DetailContainer } from "@/pods/detail";
import { useParams } from "react-router-dom";

export const DetailPage = () => {
  const { id } = useParams();
  return <DetailContainer id={id} />;
};

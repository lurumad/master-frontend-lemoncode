import { KittiesContainer } from "@/pods/kitties/kitties.container";
import { AppLayout } from "@/layouts/app.layout";

export const KittiesPage = () => {
  return (
    <AppLayout>
      <KittiesContainer />
    </AppLayout>
  );
};

import { auth } from "@/lib/auth";
import CheckoutUi from "./checkout";

const CheckoutPage = async () => {
  const user = await auth();
  return <CheckoutUi user={user} />;
};

export default CheckoutPage;

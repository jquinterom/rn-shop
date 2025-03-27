// 1 setup payment sheet
// 2 open stripe checkout form

import { CollectionMode } from "@stripe/stripe-react-native/lib/typescript/src/types/PaymentSheet";
import { supabase } from "./supabase";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

const fetchStipeKeys = async (totalAmount: number) => {
  const { data, error } = await supabase.functions.invoke("stripe-checkout", {
    body: { totalAmount },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const setupStripePaymentSheet = async (totalAmount: number) => {
  // Fetch payment intent and publishable key from server

  const { paymentIntent, publicKey, ephemeralKey, customer } =
    await fetchStipeKeys(totalAmount);

  console.log(
    "fetched payment intent and public key",
    paymentIntent,
    publicKey
  );

  if (!paymentIntent || !publicKey) {
    throw new Error("Failed to fetch payment intent and publishable key");
  }

  await initPaymentSheet({
    merchantDisplayName: "Codewithlari",
    paymentIntentClientSecret: paymentIntent,
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
    billingDetailsCollectionConfiguration: {
      name: "always" as CollectionMode,
      phone: "always" as CollectionMode,
    },
  });
};

export const openStripeCheckout = async () => {
  const { error } = await presentPaymentSheet();

  console.log("presenting payment sheet", error);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};

import { createClient } from "jsr:@supabase/supabase-js@2";
import Stripe from "npm:stripe@^17.7.0";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"), {
  httpClient: Stripe.createFetchHttpClient(),
});

export const getOrCreateStripeCustomerForSupabaseUser = async (
  req: Request
) => {
  const authHeader = req.headers.get("Authorization")!;
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: {
        headers: { Authorization: authHeader },
      },
    }
  );

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { data, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }

  if (data.stripe_customer_id) {
    return data.stripe_customer_id;
  }

  const customer = await stripe.customers.create({
    email: data.email,
    metadata: {
      supabase_user_id: user.id,
    },
  });

  await supabaseClient
    .from("users")
    .update({ stripe_customer_id: customer.id })
    .eq("id", user.id);

  return customer.id;
};

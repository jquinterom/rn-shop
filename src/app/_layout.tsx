import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Stacks from "../components/Stacks/Stacks";
import { ToastProvider } from "react-native-toast-notifications";
import { AuthProvider } from "../providers/auth-provider";
import { QueryProvider } from "../providers/query-provider";
import { StripeProvider } from "@stripe/stripe-react-native";
import NotificationProvider from "../providers/notification-provider";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />

      <ToastProvider>
        <AuthProvider>
          <QueryProvider>
            <StripeProvider
              publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
            >
              <NotificationProvider>
                <Stacks />
              </NotificationProvider>
            </StripeProvider>
          </QueryProvider>
        </AuthProvider>
      </ToastProvider>
    </SafeAreaProvider>
  );
}

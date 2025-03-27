import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import ProductListItem from "../../components/ProductListItem/ProductListItem";
import ListHeader from "../../components/ListHeader/ListHeader";
import { getProductsAndCategories } from "../../api/api";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Home = () => {
  const insets = useSafeAreaInsets();
  const { data, error, isLoading } = getProductsAndCategories();

  if (isLoading) return <ActivityIndicator />;

  if (error || !data) {
    return <Text>Error : {error?.message || "An error occurred"}</Text>;
  }

  return (
    <FlatList
      data={data.products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      ListHeaderComponent={<ListHeader categories={data.categories} />}
      contentContainerStyle={styles.flatListContent}
      columnWrapperStyle={styles.flatListColumn}
      style={{ paddingHorizontal: 10, paddingTop: insets.top }}
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  flatListContent: {
    paddingBottom: 20,
  },
  flatListColumn: {
    justifyContent: "space-between",
  },
});

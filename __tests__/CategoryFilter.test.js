import { render } from "@testing-library/react-native";
import { Text, View, FlatList } from "react-native";

// Sample expense data
const TEST_EXPENSES = [
  {
    id: "1",
    amount: 250,
    category: "food",
    vibe: "impulse",
    note: "Pizza",
  },
  {
    id: "2",
    amount: 120,
    category: "food",
    vibe: "worth-it",
    note: "Coffee",
  },
  {
    id: "3",
    amount: 500,
    category: "travel",
    vibe: "needed-this",
    note: "Bus",
  },
  {
    id: "4",
    amount: 300,
    category: "entertainment",
    vibe: "regret",
    note: "Movie",
  },
  {
    id: "5",
    amount: 150,
    category: "food",
    vibe: "needed-this",
    note: "Lunch",
  },
];

// Component used for testing
function FilteredList({ expenses, category }) {
  const filtered =
    category === "all"
      ? expenses
      : expenses.filter((expense) => expense.category === category);

  return (
    <View>
      <Text>{filtered.length} expenses</Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.note}</Text>}
      />
    </View>
  );
}

describe("Category Filter", () => {
  test('shows all expenses when category is "all"', async () => {
    const { getByText } = await render(
      <FilteredList
        expenses={TEST_EXPENSES}
        category="all"
      />
    );

    expect(getByText("5 expenses")).toBeTruthy();
  });

  test('shows only food expenses', async () => {
    const { getByText } = await render(
      <FilteredList
        expenses={TEST_EXPENSES}
        category="food"
      />
    );

    expect(getByText("3 expenses")).toBeTruthy();
    expect(getByText("Pizza")).toBeTruthy();
    expect(getByText("Coffee")).toBeTruthy();
    expect(getByText("Lunch")).toBeTruthy();
  });

  test("shows zero expenses for an empty category", async () => {
    const { getByText } = await render(
      <FilteredList
        expenses={TEST_EXPENSES}
        category="other"
      />
    );

    expect(getByText("0 expenses")).toBeTruthy();
  });
});
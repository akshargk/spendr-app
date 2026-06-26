import { render } from "@testing-library/react-native";
import { View, Text } from "react-native";

function ProfileName({ name }) {
  return (
    <View>
      <Text>{name || "Your Name"}</Text>
      <Text>{name ? name.charAt(0).toUpperCase() : "?"}</Text>
    </View>
  );
}

describe("ProfileScreen", () => {
  test("renders the saved name when provided", async () => {
    const { getByText } = await render(
      <ProfileName name="Akshu" />
    );

    expect(getByText("Akshu")).toBeTruthy();
    expect(getByText("A")).toBeTruthy();
  });

  test("renders fallback when no name is provided", async () => {
    const { getByText } = await render(
      <ProfileName name="" />
    );

    expect(getByText("Your Name")).toBeTruthy();
    expect(getByText("?")).toBeTruthy();
  });
});
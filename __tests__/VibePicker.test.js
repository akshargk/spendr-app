import { render, fireEvent } from "@testing-library/react-native";
import VibePicker from "../components/VibePicker";

describe("VibePicker", () => {
  test("calls onSelect with the correct vibe key when tapped", async () => {
    const mockOnSelect = jest.fn();

    const { getByText } = await render(
      <VibePicker
        selected={null}
        onSelect={mockOnSelect}
      />
    );

    fireEvent.press(getByText("Impulse"));

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith("impulse");
  });

  test("highlights the selected vibe", async () => {
    const { getByText } = await render(
      <VibePicker
        selected="worth-it"
        onSelect={jest.fn()}
      />
    );

    expect(getByText("Worth It")).toBeTruthy();
  });
});
export const addItem = (
  item: string,
  setState: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setState((prev) => (prev.includes(item) ? prev : [...prev, item]));
};

export const toggleIndex = (
  index: number,
  setState: React.Dispatch<React.SetStateAction<number[]>>
) => {
  setState((prevSelected) =>
    prevSelected.includes(index)
      ? prevSelected.filter((i) => i !== index)
      : [...prevSelected, index]
  );
};

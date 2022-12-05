export const environment = (key: string) => {
  const value = process.env[key];

  return {
    getOrDefault: (defaultValue: string) => value ?? defaultValue,
    getOrThrow: () => {
      if (!value) {
        throw new Error(`environment not found: ${key}`);
      }
      return value;
    }
  };
};

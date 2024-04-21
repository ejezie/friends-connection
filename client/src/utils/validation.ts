const validate = (values: { [key in string]: string | number }) => {
  const errors: { [key in string]: string } = {};
  Object.keys(values)?.forEach((item: string) => {
    // Check empty inputs
    if (values[item] === null) {
      errors[item] = `${item} is required`;
    }

    // Validate email
    if (
      item?.includes("identifier") &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values[item] as string)
    ) {
      errors[item] = "Invalid email address";
    }
  });

  return errors;
};

// required field validation
export const required =
  (name = "This") =>
  (value: string | number) =>
    value ? undefined : `${name} field is required`;

export default validate;

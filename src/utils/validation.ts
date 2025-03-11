// We pass _ for using the validator in antd
export const validateIsraeliID = (_: unknown, value: string): Promise<void> => {
  console.log("Validating Israeli ID:", value);

  if (!value) {
    console.log("ID validation failed: Empty value");
    return Promise.reject("מספר זהות הוא שדה חובה");
  }

  // Check if ID is 9 digits
  if (!/^\d{9}$/.test(value)) {
    console.log("ID validation failed: Not 9 digits");
    return Promise.reject("מספר זהות חייב להכיל 9 ספרות");
  }

  // Israeli ID validation algorithm
  const id = value.trim();
  const idArray = id.split("").map(Number);

  let counter = 0;
  for (let i = 0; i < idArray.length; i++) {
    let digit = idArray[i];

    // Multiply digit by 1 or 2 based on position
    if (i % 2 === 0) {
      digit *= 1;
    } else {
      digit *= 2;
    }

    // If digit is greater than 9, subtract 9
    if (digit > 9) {
      digit -= 9;
    }

    counter += digit;
  }

  console.log("ID validation checksum:", counter);

  if (counter % 10 !== 0) {
    console.log("ID validation failed: Invalid checksum");
    return Promise.reject("מספר זהות לא תקין");
  }

  console.log("ID validation passed");
  return Promise.resolve();
};

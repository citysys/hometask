export default function validateId(id: string) {
    const cleanedId = id.replace(/\D/g, ''); // Remove non-digit characters

    if (cleanedId.length !== 9) {
        return false; // Ensure the ID has exactly 9 digits
    }

    const digits = cleanedId.split('').map(Number); // Convert to array of numbers
    let sum = 0;
    
    // Apply the Luhn algorithm
    for (let i = 0; i < 9; i++) {
        let digit = digits[i];
        // Double every second digit starting from the right
        if ((i + 1) % 2 === 0) {
            digit *= 2;
            if (digit > 9) digit -= 9; // Subtract 9 if the result is greater than 9
        }
        sum += digit;
    }

    return sum % 10 === 0; // Valid if sum modulo 10 is zero
}

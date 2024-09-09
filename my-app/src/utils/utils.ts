export const isValidIsraeliID = (id: string | number): boolean => {
    let idStr = String(id).padStart(9, "0"); 
  
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      let num = Number(idStr[i]) * ((i % 2) + 1); 
      sum += num > 9 ? num - 9 : num;
    }
  
    return sum % 10 === 0;
  };
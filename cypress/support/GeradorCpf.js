class CpfGenerator {
    generateCpf() {
        const num1 = this.#random();
        const num2 = this.#random();
        const num3 = this.#random();
        const dig1 = this.#dig(num1, num2, num3);
        const dig2 = this.#dig(num1, num2, num3, dig1);
        return `${num1}.${num2}.${num3}-${dig1}${dig2}`;
      }
      
      #dig(n1, n2, n3, n4) { 
        const nums = n1.split("").concat(n2.split(""), n3.split(""));
        if (n4 !== undefined){ 
          nums[9] = n4;
        }
        
        let x = 0;
        for (let i = (n4 !== undefined ? 11:10), j = 0; i >= 2; i--, j++) {
          x += parseInt(nums[j]) * i;
        }
        
        const y = x % 11;
        return y < 2 ? 0 : 11 - y; 
      }
      
      #random() {
        const aleat = Math.floor(Math.random() * 999);
        return ("" + aleat).padStart(3, '0'); 
      }
}

export default CpfGenerator
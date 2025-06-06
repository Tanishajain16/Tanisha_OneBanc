async function levenshteinMatrixWithAnimation(input, word, ci, cd, cs, container) {
    const m = input.length;
    const n = word.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  
    const table = document.createElement("table");
    table.className = "matrix";
  
    // Header
    const header = document.createElement("tr");
    header.innerHTML = `<th></th><th></th>` + [...word].map(c => `<th>${c}</th>`).join('');
    table.appendChild(header);
  
    for (let i = 0; i <= m; i++) {
      const row = document.createElement("tr");
      row.innerHTML = `<th>${i === 0 ? '' : input[i - 1]}</th>` + [...Array(n + 1)].map(() => `<td></td>`).join('');
      table.appendChild(row);
    }
  
    container.innerHTML = '';
    const caption = document.createElement("caption");
    caption.textContent = `"${input}" vs "${word}"`;
    table.prepend(caption);
    container.appendChild(table);
  
    const getCell = (i, j) => table.rows[i + 1].cells[j + 1];
  
    for (let i = 0; i <= m; i++) dp[i][0] = i * cd;
    for (let j = 0; j <= n; j++) dp[0][j] = j * ci;
  
    // Fill first row and column
    for (let i = 0; i <= m; i++) {
      const cell = getCell(i, 0);
      cell.textContent = dp[i][0];
      cell.classList.add("updated");
      await new Promise(r => setTimeout(r, 150));
    }
  
    for (let j = 1; j <= n; j++) {
      const cell = getCell(0, j);
      cell.textContent = dp[0][j];
      cell.classList.add("updated");
      await new Promise(r => setTimeout(r, 150));
    }
  
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (input[i - 1] === word[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j] + cd,
            dp[i][j - 1] + ci,
            dp[i - 1][j - 1] + cs
          );
        }
  
        const cell = getCell(i, j);
        cell.textContent = dp[i][j];
        cell.classList.add("updated");
        await new Promise(r => setTimeout(r, 200));
      }
    }
  
    return dp[m][n];
  }
  
  async function findSuggestions() {
    const dictionary = document.getElementById("dictionary").value.split(',').map(w => w.trim());
    const ci = parseInt(document.getElementById("ci").value);
    const cd = parseInt(document.getElementById("cd").value);
    const cs = parseInt(document.getElementById("cs").value);
    const inputWord = document.getElementById("inputWord").value.trim();
  
    if (!inputWord || dictionary.length === 0) {
      alert("Please fill in all fields.");
      return;
    }
  
    const suggestions = [];
    let minDist = Infinity;
    const matrixContainer = document.getElementById("matrixContainer");
    matrixContainer.innerHTML = "";
  
    for (const word of dictionary) {
      const dist = await levenshteinMatrixWithAnimation(inputWord, word, ci, cd, cs, matrixContainer);
      if (dist < minDist) {
        minDist = dist;
        suggestions.length = 0;
        suggestions.push(word);
      } else if (dist === minDist) {
        suggestions.push(word);
      }
  
      await new Promise(r => setTimeout(r, 1000)); // Pause before next word
    }
  
    const ul = document.getElementById("suggestions");
    ul.innerHTML = "";
    suggestions.forEach(w => {
      const li = document.createElement("li");
      li.textContent = w;
      ul.appendChild(li);
    });
  }
  
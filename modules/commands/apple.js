const dictionary = ['apple'];
let a = spellCheck('aple');
console.log(a);
function spellCheck(word) {
    // Simple spell check implementation using a predefined dictionary
    if (dictionary.includes(word)) {
        return word;
    } else {
        // Generate suggestions for the misspelled word
        const suggestions = [];
        for (let i = 0; i < dictionary.length; i++) {
            const suggestion = dictionary[i];
            let distance = isWithinEditDistance(suggestion, word, 5);
            if (distance <= 3) {
                suggestions.push({distance, suggestion});
            }
        }
        return suggestions.length > 0 ? suggestions : "No suggestions found";
    }
}

function isWithinEditDistance(suggestion, word, maxDistance) {
    if (Math.abs(suggestion.length - word.length) > maxDistance) {
        return false;
    }
    const dp = [];
    console.log("Creating Empty DP", dp);
    console.log("Starting i loop");
    for (let i = 0; i <= suggestion.length; i++) {
        console.log(` i loop ${i}`);
        dp[i] = [];
        console.log(`   dp[${i}]=[]; now dp is `);
        console.table(dp);
        console.log(`   startin j loop `);
        for (let j = 0; j <= word.length; j++) {
            console.log(`       j loop `, j);
            if (i === 0) {
            console.log(`       if (i === 0) `);
            dp[i][j] = j;
            console.log(`       dp[${i}][${j}] = ${j};  now dp is `);
            console.table(dp);
            } else if (j === 0) {
                console.log(`       else if (j === 0) `);
                dp[i][j] = i;
                console.log(`       dp[${i}][${j}] = ${i};  now dp is `);
                console.table(dp);
            } else {
                console.log(`       Else{ `);

                console.log(`Math.min( 
                    dp[${i - 1}][${j - 1}] + (${suggestion[i - 1]} !== ${word[j - 1]} ? 1 : 0),
                    dp[${i}][${j - 1}] + 1,
                    dp[${i - 1}][${j}] + 1
                );`);

                dp[i][j] = Math.min( 
                    dp[i - 1][j - 1] + (suggestion[i - 1] !== word[j - 1] ? 1 : 0),
                    dp[i][j - 1] + 1,
                    dp[i - 1][j] + 1
                );
                console.log(`           dp[i][j]=min(...)  dp[${i}][${j}] = ${dp[i][j]}`);
                console.log("now dp is ");
                console.log(dp);
            }
        }
    }
    return dp[suggestion.length][word.length];
}

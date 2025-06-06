#include <iostream>
#include <vector>
#include <string>
using namespace std;

int EditDistance(string s1, string s2, int Ci, int Cd, int Cs) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1));

    for (int i = 0; i <= m; ++i)
        dp[i][0] = i * Cd; 
    for (int j = 0; j <= n; ++j)
        dp[0][j] = j * Ci;  

    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (s1[i - 1] == s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];  
            } else {
                dp[i][j] = min(
                    min(dp[i - 1][j] + Cd, dp[i][j - 1] + Ci),
                    dp[i - 1][j - 1] + Cs
                );
            }
        }
    }

    return dp[m][n];
}

int main() {
    cout << "Edit Distance (kitten -> sitting), Ci=1 Cd=2 Cs=3: "
         << EditDistance("kitten", "sitting", 1, 2, 3) << endl;

    cout << "Edit Distance (flaw -> lawn), Ci=2 Cd=2 Cs=1: "
         << EditDistance("flaw", "lawn", 2, 2, 1) << endl;

    cout << "Edit Distance (algorithm -> logarithm), Ci=1 Cd=3 Cs=2: "
         << EditDistance("algorithm", "logarithm", 1, 3, 2) << endl;

    return 0;
}

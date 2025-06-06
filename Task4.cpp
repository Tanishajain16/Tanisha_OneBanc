#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int EditDistanceOptimized(string s1, string s2, int Ci, int Cd, int Cs) {
    int m = s1.length(), n = s2.length();
    if (n > m) {
        swap(s1, s2);
        swap(m, n);
    }

    vector<int> prev(n + 1), curr(n + 1);

    for (int j = 0; j <= n; ++j)
        prev[j] = j * Ci;

    // Build the DP row by row
    for (int i = 1; i <= m; ++i) {
        curr[0] = i * Cd; 
        for (int j = 1; j <= n; ++j) {
            if (s1[i - 1] == s2[j - 1]) {
                curr[j] = prev[j - 1]; 
            } else {
                curr[j] = min({
                    prev[j] + Cd,      
                    curr[j - 1] + Ci,  
                    prev[j - 1] + Cs   
                });
            }
        }
        prev = curr; 
    }

    return prev[n];
}

int main() {
    // Test Case 1
    string s1 = "kitten", s2 = "sitting";
    int Ci = 1, Cd = 2, Cs = 3;
    cout << "Edit Distance (kitten -> sitting), Ci=1 Cd=2 Cs=3: "
         << EditDistanceOptimized(s1, s2, Ci, Cd, Cs) << endl;

    // Test Case 2
    s1 = "flaw", s2 = "lawn";
    Ci = 2, Cd = 2, Cs = 1;
    cout << "Edit Distance (flaw -> lawn), Ci=2 Cd=2 Cs=1: "
         << EditDistanceOptimized(s1, s2, Ci, Cd, Cs) << endl;

    // Test Case 3
    s1 = "algorithm", s2 = "logarithm";
    Ci = 1, Cd = 3, Cs = 2;
    cout << "Edit Distance (algorithm -> logarithm), Ci=1 Cd=3 Cs=2: "
         << EditDistanceOptimized(s1, s2, Ci, Cd, Cs) << endl;

    return 0;
}

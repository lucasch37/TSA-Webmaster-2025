// Declare the counter in the global Node.js scope
declare global {
    var __totalDbRequests: number | undefined;
}

export const incrementDbRequests = (): number => {
    // Initialize the counter in global scope if it doesn't exist
    if (global.__totalDbRequests === undefined) {
        global.__totalDbRequests = 0;
    }

    global.__totalDbRequests++;
    return global.__totalDbRequests;
};

export const getTotalDbRequests = (): number | undefined => global.__totalDbRequests;

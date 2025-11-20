// export async function register(userData) {
//     try {
//         const response = await fetch("http://localhost:3000/user/registration", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(userData),
//         });
//         if (!response.ok) {
//             throw new Error(data.message);
//         }
//         const data = await response.json();

//         console.log("Success:", data);
//         return data;

//     } catch (error) {
//         console.error("Error:", error.message);

//     }
// }

// export async function login(userData) {
//     try {
//         const response = await fetch("http://Localhost:3000/user/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(userData),
//         })

//         const data = await response.json()
//         if (!response.ok) {
//             throw new Error(data.message);
//         }
//         console.log("Success:", data);

//     }
//     catch (error) {
//         console.error(error);
//     }
// }
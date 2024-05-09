// /fixtures/registrationData.js

// Function to generate a random alphanumeric string of a specified length
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Registration data for new users with unique email and username
const registrationData = {
    email: `janedoe${generateRandomString(7)}@gmail.com`,
    username: `JaneDoe${generateRandomString(7)}`,
    password: "IGamingPassword123!",
    firstName: "Jane",
    lastName: "Doe",
    dateOfBirth: "2002-12-12",
    postalCode: "12345",
    city: "Schenectady",
    state: "Illinois",
    address: "Wall Street",
    phone: "8888888888"
};

module.exports = { registrationData };


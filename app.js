const express = require("express");

const app = express();
const PORT = 3000;

// Read form data
app.use(express.urlencoded({ extended: true }));

// Serve HTML files from public folder
app.use(express.static("public"));

app.post("/calculate-age", (req, res) => {
    const birthDate = new Date(req.body.birthdate);
    const today = new Date();

    // Check whether the date is valid
    if (isNaN(birthDate.getTime())) {
        return res.send("Invalid birthdate.");
    }

    // Check if birthdate is in the future
    if (birthDate > today) {
        return res.send("Birthdate cannot be in the future.");
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // If days are negative, borrow days from previous month
    if (days < 0) {
        months--;

        const previousMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        );

        days += previousMonth.getDate();
    }

    // If months are negative, borrow 12 months
    if (months < 0) {
        years--;
        months += 12;
    }

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Age Result</title>
        </head>
        <body>

            <h1>Age Calculator Result</h1>

            <h2>
                You are ${years} years, ${months} months,
                and ${days} days old.
            </h2>

            <a href="/">Calculate Again</a>

        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
const fs = require('fs');
const readline = require('readline');
const { exec } = require('child_process');
const path = require('path');
const colors = require('colors');

const sensitiveFilePath = path.resolve(__dirname, '../../sensitive.json');

async function promptInput(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

async function validateSensitiveData() {
    let sensitive;

    try {
        const fileData = fs.readFileSync(sensitiveFilePath, 'utf-8');
        sensitive = JSON.parse(fileData);
    } catch (error) {
        console.error(colors.red('Error reading sensitive.json:'), error);
        return;
    }

    let isUpdated = false;

    // Only display the banner and prompts if there is missing data
    let missingData = false;

    if (!sensitive.Token) {
        missingData = true;
    }
    if (!sensitive.ID) {
        missingData = true;
    }
    if (!sensitive.MongoDB || !sensitive.MongoDB.URI) {
        missingData = true;
    }

    if (missingData) {
        // Display the banner only when there is missing data
        console.log(colors.bold.red('########################'));
        console.log(colors.bold.red('# Kry\'s Bot Base Setup #'));
        console.log(colors.bold.red('########################'));
        console.log(colors.cyan('\nPlease provide the required information:\n'));

        // Prompt for input with style
        if (!sensitive.Token) {
            sensitive.Token = await promptInput(colors.cyan('Enter Bot Token: ').bold);
            isUpdated = true;
        }
        if (!sensitive.ID) {
            sensitive.ID = await promptInput(colors.cyan('Enter Bot ID: ').bold);
            isUpdated = true;
        }
        if (!sensitive.MongoDB || !sensitive.MongoDB.URI) {
            sensitive.MongoDB = sensitive.MongoDB || {};
            sensitive.MongoDB.URI = await promptInput(colors.cyan('Enter MongoDB URI: ').bold);
            isUpdated = true;
        }
    } else {
        // console.log(colors.green('All sensitive data is already provided.'));
    }

    // If any values were updated, write them to the file and execute the script
    if (isUpdated) {
        try {
            fs.writeFileSync(sensitiveFilePath, JSON.stringify(sensitive, null, 4), 'utf-8');
            console.log(colors.green('\nSensitive data updated successfully!'));
            console.clear()

            exec('node src/shard.js', (error, stdout, stderr) => {
                if (error) {
                    console.error(colors.red(`Error executing shard.js: ${error.message}`));
                    return;
                }
                if (stderr) {
                    console.error(colors.yellow(`stderr: ${stderr}`));
                    return;
                }
                console.log(colors.green('Shard.js executed successfully!'));
            });
        } catch (error) {
            console.error(colors.red('Error updating sensitive.json:'), error);
        }
    } else {
        // console.log(colors.yellow("\nNo updates needed."));
    }
}

module.exports = {
    validateSensitiveData
};

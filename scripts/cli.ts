/**
 * DO NOT TOUCH THIS FILE DIRECTLY
 */

import { Command } from 'commander';
import fs from 'node:fs';
import path from 'node:path/posix';
import { cwd } from 'node:process';

const LOCK_FILE = path.join(cwd(), '.bundle-quest.lock');
const NEXT_EXERCISE_NOTICE = `To proceed to the next exercise when you are ready, run the command: bundle-quest next`;
const BUNDLE_CONTENTS = fs.readFileSync(path.join(cwd(), 'static', 'bundle.js'));

const program = new Command();

program
    .name('bundle-quest')
    .description("To teach you the ways of bundling")
    .version("YOLO")

program.command('start')
    .description('Start the exercises')
    .action(async () => {

        // We will nuke the `LOCK_FILE` as this saves progress.
        // We will then make the LOCK_FILE from scratch.
        fs.rmSync(LOCK_FILE, { force: true });
        fs.writeFileSync(LOCK_FILE, JSON.stringify({ currentExercise: 0 }));
        await READ_EXERCISE_INTO_BUNDLE(1)
        console.log();
        console.log(NEXT_EXERCISE_NOTICE);
        console.log();
    })

program.command('next')
    .description('Starts the next exercise')
    .action(async () => {

        // Checking there is a LOCK_FILE, if there isn't throw an error telling
        // them to start the exercises first.

        if (!fs.existsSync(LOCK_FILE)) {
            console.error('Please run `bundle-quest start` to begin the exercises');
            return;
        }

        // Read the LOCK_FILE and parse it.
        const lockFile = fs.readFileSync(LOCK_FILE, 'utf-8');
        let { currentExercise } = JSON.parse(lockFile);
        // We will now increment the currentExercise by 1.
        currentExercise++;
        // We will now write the new currentExercise back to the LOCK_FILE.
        fs.writeFileSync(LOCK_FILE, JSON.stringify({ currentExercise }));

        // We will now update the internal scripting to append the contents of the exercise to the bottom of the bundle
        // and load it into the browser.
        await READ_EXERCISE_INTO_BUNDLE(currentExercise);
        console.log()
        console.log("Moved to the next exercise")
        console.log(`You are now working on exerceise: ${currentExercise}`)
        console.log("RUN THE COMMAND: bundle-quest refresh to see the changes when you have attempted the exercise")
        console.log()
    })

program.command('back')
    .description('Starts the previous exercise')
    .action(async () => {

        // Checking there is a LOCK_FILE, if there isn't throw an error telling
        // them to start the exercises first.

        if (!fs.existsSync(LOCK_FILE)) {
            console.error('Please run `bundle-quest start` to begin the exercises');
            return;
        }

        // Read the LOCK_FILE and parse it.
        const lockFile = fs.readFileSync(LOCK_FILE, 'utf-8');
        let { currentExercise } = JSON.parse(lockFile);
        // We will now increment the currentExercise by 1.
        currentExercise--;
        // We will now write the new currentExercise back to the LOCK_FILE.
        fs.writeFileSync(LOCK_FILE, JSON.stringify({ currentExercise }));

        // We will now update the internal scripting to append the contents of the exercise to the bottom of the bundle
        // and load it into the browser.
        await READ_EXERCISE_INTO_BUNDLE(currentExercise);
        console.log()
        console.log("Moved to the previous exercise")
        console.log(`You are now working on exerceise: ${currentExercise}`)
        console.log("RUN THE COMMAND: bundle-quest refresh to see the changes when you have attempted the exercise")
        console.log()

    })

program.command('refresh')
.description('Refreshes the current exercise output bundle')
.action(async () => {

    // Checking there is a LOCK_FILE, if there isn't throw an error telling
    // them to start the exercises first.

    if (!fs.existsSync(LOCK_FILE)) {
        console.error('Please run `bundle-quest start` to begin the exercises');
        return;
    }

    // Read the LOCK_FILE and parse it.
    const lockFile = fs.readFileSync(LOCK_FILE, 'utf-8');
    let { currentExercise } = JSON.parse(lockFile);

    // We will now update the internal scripting to append the contents of the exercise to the bottom of the bundle
    // and load it into the browser.
    await READ_EXERCISE_INTO_BUNDLE(currentExercise);
    console.log()
    console.log("Website refreshed")
    console.log()
    console.log(NEXT_EXERCISE_NOTICE);
    console.log()
})


const READ_EXERCISE_INTO_BUNDLE = async (exercise: number) => {
    const exerciseFiles = fs.readdirSync(path.join(cwd(), 'exercises'));
    // Find the file starting with `0{number}`, execute the typescript file and return the result.
    // We will then append the resulting string to the bottom of the bundle contents.
    // We will then update the file @: `./playground/src/main.js` with the contents and an auto-generated header.

    const exerciseFile = exerciseFiles.find((file) => file.startsWith(`${exercise.toString().padStart(2, '0')}_`));
    const exerciseModule = fs.readFileSync(`./exercises/${exerciseFile}`, 'utf8');
    const exerciseContent = execute(exerciseModule).default(BUNDLE_CONTENTS);
    const newBundleContents = `/**
 * DO NOT TOUCH THIS FILE DIRECTLY.
 * THIS IS AN AUTOMATICALLY GENERATED FILE.
 */
` + BUNDLE_CONTENTS + exerciseContent;
    fs.writeFileSync(path.join(cwd(), 'src', 'main.js'), newBundleContents, 'utf8');
}

const execute = (code: string): Record<string, any> => {
    const module = { exports: {} };
    const exports = module.exports;
    const fn = Function('module', 'exports', code);
    fn(module, exports);
    return module.exports;
}

program.parse();

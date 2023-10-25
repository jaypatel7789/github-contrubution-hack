// Other imports remain the same
import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';

const FILE_PATH = './data.json';

// This function is asynchronous because we're using dynamic import (which returns a promise)
async function makeCommit(n) {
    if (n === 0) return simpleGit().push();
    
    // 'random' is a module object, you need to access the 'default' or the actual export you're looking for
    const randomModule = await import('random');
    const random = randomModule.default; // accessing the default export, if 'int' is a named export you might need to adjust this line

    const x = random.int(0, 54); // now 'random' should be the correct object
    const y = random.int(0, 6);
    const DATE = moment().subtract(1, 'y').add(1, 'd').add(x, 'w').add(y, 'd').format();
    const data = {
        date: DATE
    };
    console.log(DATE);
    jsonfile.writeFile(FILE_PATH, data, () => {
        simpleGit().add(FILE_PATH).commit(DATE, {'--date': DATE}, 
        makeCommit.bind(this, --n));
    });
}

makeCommit(100);

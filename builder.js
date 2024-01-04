const builder = {
    title: {
        describe: 'Note title',
        demandOption: true, // mandatory or not
        type: 'string',
        validate: (value) => {
            if (value.trim() === '') {
                throw new Error('Title cannot be empty.');
            }
            return true;
        },
    },
    body: {
        describe: 'Note body',
        demandOption: true,
        type: 'string',
        validate: (value) => {
            if (value.trim() === '') {
                throw new Error('Body cannot be empty.');
            }
            return true;
        },
    }
}

module.exports = builder;
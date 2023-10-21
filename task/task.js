class Task {

    #id;

    #name;

    #description;

    #date;

    #completionStatus;

    constructor(name, description) {
        console.log(name, description);
        if (!(typeof name === 'string' && name)) {
            throw new Error("Invalid name was entered");
        }

        if (!(typeof description === 'string' && description)) {
            throw new Error("Invalid description was entered");
        }

        this.#id = self.crypto.randomUUID();

        this.#name = name;

        this.#description = description;

        this.#date = (new Date(Date.now())).toString().split('G')[0];

        this.#completionStatus = false;
    }

    invertcompletionStatus() {
        this.#completionStatus != this.#completionStatus;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    get date() {
        return this.#date;
    }

    get completionStatus() {
        return this.#completionStatus;
    }
}
export default Task;
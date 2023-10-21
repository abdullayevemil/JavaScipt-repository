class Task {

    #id;

    #name;

    #description;

    #date;

    #isDone;

    constructor(name, description) {

        if (!(typeof name === 'string' && name)) {
            throw new Error("Invalid name was entered");
        }

        if (!(typeof description === 'string' && description)) {
            throw new Error("Invalid description was entered");
        }

        this.#id = self.crypto.randomUUID();

        this.#name = name;

        this.#description = description;

        this.#date = new Date().getDate();

        this.#isDone = false;
    }

    invertIsDone() {
        this.#isDone != this.#isDone;
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

    get isDone() {
        return this.#isDone;
    }
}
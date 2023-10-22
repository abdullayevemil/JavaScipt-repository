class Task {

    #id;

    #name;

    #description;

    #date;

    #completionStatus;

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

        this.#date = (new Date(Date.now())).toString().split('G')[0];

        this.#completionStatus = false;
    }

    invertcompletionStatus() {
        this.#completionStatus = !this.#completionStatus;
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

    set id(id) {
        if (!(typeof id === 'string' && id)) {
            throw new Error("Invalid id was entered");
        }
        this.#id = id;
    }

    set name(name) {
        if (!(typeof name === 'string' && name)) {
            throw new Error("Invalid name was entered");
        }
        this.#name = name;
    }

    set description(description) {
        if (!(typeof description === 'string' && description)) {
            throw new Error("Invalid description was entered");
        }
        this.#description = description;
    }

    set date(date) {
        if (!(typeof date === 'string' && date)) {
            throw new Error("Invalid date was entered");
        }
        this.#date = date;
    }

    set completionStatus(completionStatus) {
        if (!(typeof completionStatus === 'boolean' && completionStatus !== null && completionStatus !== undefined)) {
            throw new Error("Invalid completion status was entered");
        }
        this.#completionStatus = completionStatus;
    }
}
export default Task;
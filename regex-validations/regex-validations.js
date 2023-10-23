export function isNameValid(name) {

    const nameRegexp = /^[a-zA-Zа-яА-Я0-9\s]{0,16} [a-zA-Zа-яА-Я0-9\s]{0,16}(?!\d+$)(?:\S+\s?)/g;
    return nameRegexp.test(name);

}


export function isDescriptionValid(description) {

    const descriptionRegexp = /^[a-zA-Zа-яА-Я0-9\s]{0,16}(?!\d+$)(?:\S+\s?)/g;
    return descriptionRegexp.test(description);

}
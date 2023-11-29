function skillsMember(
    name = '',
    age = 0,
    address = '',
    hobbies = [],
    is_married = false,
    list_school = [],
    skills = [],
    interest_in_coding = true
) {
    let data = {
        name: name,
        age: age,
        address: address,
        hobbies: hobbies,
        is_married: is_married,
        list_school: list_school,
        skills: skills,
        interest_in_coding: interest_in_coding
    }
    return JSON.stringify(data)
}
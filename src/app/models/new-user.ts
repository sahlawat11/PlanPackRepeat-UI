export interface User {
    firstName: string;
    lastName: string;
    email: string;
    biography?: string;
    mobileNumber?: string;
    profileImageUrl?: string;
    id?: string;

    // constructor(firstName: string, lastName: string, email: string) {
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //     this.email = email;
    // }

    // getNewUserJSONObj() {
    //     return {
    //         "firstName": this.firstName,
    //         "lastName": this.lastName,
    //         "email": this.email
    //     }
    // }
}
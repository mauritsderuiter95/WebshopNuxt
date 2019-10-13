export default class User {
                 id: String;

                 company: String;

                 firstName: String;

                 lastName: String;

                 username: String;

                 password: String;

                 token: String;

                 resetKey: String;

                 role: String;

                 expires: Date;

                 street: String;

                 street2: String;

                 zipcode: String;

                 city: String;

                 phone: String;

                 active: Boolean;

                 constructor(
                   id: string = '',
                   company: string = '',
                   firstName: string = '',
                   lastName: string = '',
                   username: string = '',
                   password: string = '',
                   token: string = '',
                   resetKey: string = '',
                   role: string = '',
                   expires: Date = new Date(),
                   street: string = '',
                   street2: string = '',
                   zipcode: string = '',
                   city: string = '',
                   phone: string = '',
                   active: Boolean = false,
                 ) {
                   this.id = id;
                   this.company = company;
                   this.firstName = firstName;
                   this.lastName = lastName;
                   this.username = username;
                   this.password = password;
                   this.token = token;
                   this.resetKey = resetKey;
                   this.role = role;
                   this.expires = expires;
                   this.street = street;
                   this.street2 = street2;
                   this.zipcode = zipcode;
                   this.city = city;
                   this.phone = phone;
                   this.active = active;
                 }
}

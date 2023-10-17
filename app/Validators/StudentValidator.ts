import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class StudentValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({   
    GivenName: schema.string({}, [rules.maxLength(64)]),
    LastName: schema.string({}, [rules.maxLength(64)]),
    EmailAddress: schema.string({}, [rules.maxLength(64)]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   * 
   * Below is the code that I implement to personalize the error message displayed. Modification inthe above code required also:
   * eg..: GivenName: schema.string({}, [rules.required()]) >> '.required()' targets the specfied field.
   */
/**public messages: CustomMessages = required.GivenName': 'The given name is mandatory.',
  'required.LastName': 'The last name is mandatory.',
  'required.EmailAddress': 'The email address is mandatory.',
   'email.EmailAddress': 'Please provide a valid email address.'*/
  }
import { JSONSchemaType } from 'ajv'

import ajv from '../utils/ajv'

type SignUpData = {
  email: string
  firstName: string
  lastName: string
  password: string
}

const schema: JSONSchemaType<SignUpData, true> = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email', nullable: true },
    firstName: { type: 'string', nullable: true },
    lastName: { type: 'string', nullable: true },
    password: { type: 'string', nullable: true },
  },
  required: ['email', 'firstName', 'lastName', 'password'],
  additionalProperties: false,
}

const signUpValidator = ajv.compile(schema)

export default signUpValidator

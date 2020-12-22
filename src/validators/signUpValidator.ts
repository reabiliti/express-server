import { JSONSchemaType } from 'ajv'

import ajv from '../utils/ajv'

type SignUpData = {
  email: string
  name: string
  password: string
}

const schema: JSONSchemaType<SignUpData, true> = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email', nullable: true },
    name: { type: 'string', nullable: true },
    password: { type: 'string', nullable: true },
  },
  required: ['email', 'name', 'password'],
  additionalProperties: false,
}

const signUpValidator = ajv.compile(schema)

export default signUpValidator

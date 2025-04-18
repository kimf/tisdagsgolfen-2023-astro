import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import type { HTMLAttributes } from 'astro/types';
import { ZodAny, z, type ZodIssue } from 'zod';

// ---
// USAGE
//
// import { createForm } from 'form.ts'
// const schema = z.object({
//   name: z.string().optional(),
//   email: z.string().email(),
//   age: z.number()
// })
// const { data, isValid, fields, errors } = await createForm(schema, Astro.request)
// if(isValid) {
//   // do something with data
//   // await db.users.create({ name: data.name, email: data.email, age: data.age })
// }
// ---
//   <form method="post">
//     <label>Name</label>
//     <input {...fields.name }>
//     {errors.name && <span>{errors.name.message}</span>}

//     <label>Email</label>
//     <input {...fields.email }>
//     {errors.email && <span>{errors.email.message}</span>}

//     <label>Age</label>
//     <input {...fields.age }>
//     {errors.age && <span>{errors.age.message}</span>}

//     <button type="submit">Save</button>
//   </form>

export type Constraint = ReturnType<typeof getZodConstraint>[0];
export type FieldAttributes = {
  name: string;
  value: string;
  type: NonNullable<HTMLAttributes<'input'>['type']>;
} & Partial<Record<Lowercase<keyof Constraint>, any>>;
export type FormattedError = { message: string; issues?: ZodIssue[] };

export async function createForm<
  Schema extends z.AnyZodObject,
  Data extends z.output<Schema>,
  Keys extends keyof z.infer<Schema> | `data_${string}`,
  Errors extends Record<Keys, FormattedError | null>
>(
  schema: Schema,
  request: Request,
  initial: z.input<Schema> = {} as z.input<Schema>
): Promise<{
  isValid: boolean;
  fields: Record<Keys, FieldAttributes>;
  data: z.output<Schema>;
  errors: Errors;
  form: null | Awaited<ReturnType<typeof parseWithZod<Schema, FormattedError>>>;
}> {
  function getDefaultData() {
    const parsed = schema.safeParse(initial);
    if (parsed.success) return parsed.data as Data;
    else return initial as Data;
  }

  function createFields(values: Data) {
    const constraints = getZodConstraint(schema) as Record<Keys, Constraint>;
    return Object.keys(constraints).reduce(
      (fields, key) => {
        if (key.includes('[]')) return fields;
        const validationAttrs = lowercaseKeys(constraints[key as Keys]);
        const type = resolveType(schema.shape[key]);
        const field = {
          name: key,
          ...mapFieldAttributes(values[key], type),
          ...validationAttrs
        };
        return { ...fields, [key]: field };
      },
      {} as Record<Keys, FieldAttributes>
    );
  }

  if (request.method === 'POST') {
    const formData = await request.clone().formData();
    const form = parseWithZod<Schema, any>(formData, {
      schema,
      errorMap: customZodErrorMap,
      formatError: (issues: ZodIssue[]) => ({
        message: issues.map((issue) => issue.message).join('\n'),
        issues
      })
    });
    const fields = createFields(form.payload as Data);
    if (form.status === 'success') {
      const data = form.value;
      return { fields, isValid: true, errors: {} as Errors, data, form };
    } else {
      const fields = createFields(form.payload as Data);
      return {
        fields,
        isValid: false,
        errors: form.error as Errors,
        data: {},
        form
      };
    }
  }

  return {
    fields: createFields(getDefaultData()),
    isValid: false,
    errors: {} as Errors,
    data: getDefaultData(),
    form: null
  };
}

export type ParsedFormErrors<T extends z.ZodTypeAny> = Partial<
  Record<keyof z.infer<T>, string[] | null>
>;
export const customZodErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.received === 'undefined') {
      return { message: 'This is required' };
    }
  }
  return { message: ctx.defaultError };
};

function resolveType(type: ZodAny) {
  if (type instanceof z.ZodString) {
    if (type.isEmail) return 'email';
    if (type.isURL) return 'url';
    return 'text';
  }
  if (type instanceof z.ZodNumber) return 'number';
  if (type instanceof z.ZodBoolean) return 'checkbox';
  if (type instanceof z.ZodArray) return 'select';
  if (type instanceof z.ZodObject) return 'object';
  if (type instanceof z.ZodDate) return 'date';
  if (type instanceof z.ZodOptional) return resolveType(type.unwrap());
  if (type instanceof z.ZodDefault) return resolveType((type._def as any).innerType);
  return 'text';
}

function mapFieldAttributes(value: any, type: string) {
  if (type === 'checkbox') return { type, checked: !!value, value: !!value ? 'on' : undefined };
  return { type, value: value?.toString() ?? '' };
}

function lowercaseKeys(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key.toLowerCase(), value]));
}

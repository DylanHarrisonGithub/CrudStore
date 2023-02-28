import React, { ReactElement } from 'react';

import { ServicePromise } from '../../services/services';
import ValidationService, { Schema, Model } from '../../services/validation.service';

type Props<T=Model> = {
  schema: Schema,
  onInput: (errors: string[], model: T) => void
};

const QuickForm = <T=Model>({schema, onInput}: Props<T>): ReactElement => {

  const [model, setModel] = React.useState<Model>(ValidationService.instantiateSchema(schema));
  const [errors, setErrors] = React.useState<string[]>([]);

  return (
    <span>
      {
        Object.keys(schema).map((key: string): React.ReactNode => {
          if (typeof schema[key].type === 'object' && !(schema[key].type instanceof RegExp || Array.isArray(schema[key].type))) {
            return (<QuickForm<Model> schema={schema[key].type as Schema} onInput={(v, m) => { setModel({...model, [key]: m}); setErrors([...errors, ...v])} } />)
          }
          return <></>
        })
      }
    </span>
  )
};

export default QuickForm;

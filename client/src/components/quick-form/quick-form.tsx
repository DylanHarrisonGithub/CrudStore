import React, { ReactElement } from 'react';

import ValidationService, { Schema, Model } from '../../services/validation.service';

type Props<T=Model> = {
  schema: Schema,
  onInput: (errors: string[], model: T) => void,
  _parentKey?: string
};

const QuickForm = <T=Model>({schema, onInput, _parentKey}: Props<T>): ReactElement => {

  const [model, setModel] = React.useState<Model>(ValidationService.instantiateSchema(schema));
  const [errors, setErrors] = React.useState<string[]>([]);

  React.useEffect(() => {
    (async () => {
      onInput((await ValidationService.validate(model, schema)).body!, model as T);
    })();
  }, [model])

  return (
    <span>
      {
        Object.keys(model).map((key: string): React.ReactNode => {
          if (Array.isArray(model[key])) {
            if (typeof (model[key] as Array<any>)[0] === 'object') {
              return (
                <ul key={(_parentKey || "") + key} className={"border-solid border-2 rounded"}>
                  <li key={(_parentKey || "") + key + "label"}><label>{key}</label></li>
                  {
                    (model[key] as Array<any>).map((f, i) => (
                      <li key={(_parentKey || "") + key + i} className="ml-3">
                        <QuickForm<Model>
                          schema={schema[key].type as Schema} 
                          onInput={(v, m) => setModel({...model, [key]: (model[key] as Array<any>).map((e,j) => j === i ? m : e)}) }
                          _parentKey={(_parentKey || "") + key + i + "."} 
                        />
                      </li>
                    ))
                  }
                  {
                    (
                      (schema[key].attributes?.array?.maxLength === undefined) ||
                      ((model[key] as Array<any>).length < schema[key].attributes!.array!.maxLength!)
                    ) &&
                      (<li 
                        key={(_parentKey || "") + key + "push"}
                        className={"btn btn-primary btn-block"}
                        onClick={() => setModel(m => ({
                          ...m, 
                          [key]: [
                            ...(model[key] as Array<any>), 
                            schema[key].attributes?.default ? 
                                schema[key].attributes?.default! 
                              : 
                                ValidationService.instantiateSchema(schema[key].type as Schema)
                          ]
                        }))}
                      >+</li>)
                  }
                </ul>
              );
            } else {
              return (
                <ul key={(_parentKey || "") + key} className={"border-solid border-2 rounded"}>
                  <li key={(_parentKey || "") + key + "label"}><label>{key}</label></li>
                  {
                    (model[key] as Array<any>).map((f, i) => (
                      <li key={(_parentKey || "") + key + i.toString()} className="ml-3">
                        <label>{i}</label>
                        <input
                          className={"ml-3 input input-bordered"}
                          type="text"
                          name={key+i}
                          value={f.toString()}
                          onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setModel(m => ({...m, [key]: (model[key] as Array<any>).map((element,j) => j === i ? e.target.value : element)})) }
                        />
                      </li>
                    ))
                  }
                  {
                    ((schema[key].attributes?.array?.maxLength === undefined) ||
                    ((model[key] as Array<any>).length < schema[key].attributes!.array!.maxLength!)) &&
                      <li 
                        key={(_parentKey || "") + key + "push"}
                        className={"btn btn-primary btn-block"}
                        onClick={() => setModel(m => ({...m, [key]: [...(model[key] as Array<any>), schema[key].attributes?.default ? schema[key].attributes?.default! : ""]}))}
                      >+</li>
                  }
                </ul>
              );
            }
          } else {
            if (typeof model[key] === 'object') {
              return (
                <QuickForm<Model>
                  key={(_parentKey || "") + key}
                  schema={schema[key].type as Schema} 
                  onInput={ (v, m) => setModel({...model, [key]: m}) }
                  _parentKey={(_parentKey || "") + key + "."}
                />
              );
            } else {
              return (
                <div key={(_parentKey || "") + key}>
                  <label>{key}</label>
                  <input
                    className={"ml-3 input input-bordered"}
                    type="text"
                    name={key}
                    value={model[key].toString()}
                    onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setModel(m => ({...m, [key]: e.target.value})) }
                  />
                </div>
              );
            }
          }
        })
      }
    </span>
  )
};

export default QuickForm;

import React from "react";
import Form from "../../components/common/form";

const ProductForm = ({ defaultValues, menuSections, onSubmit, children }) => (
  <Form defaultValues={defaultValues} onSubmit={onSubmit}>
    {children ? children : <ProductFormFields menuSections={menuSections} />}
  </Form>
);

const ProductFormFields = ({ menuSections }) => {
  const sorted = [...menuSections].sort((a, b) => a.position - b.position);

  return (
    <>
      <Form.Input name="_key" type="hidden" />
      <Form.Input name="position" type="hidden" defaultValue={0} />
      <Form.FloatingLabelField className="mb-2" label="Titolo" name="title">
        <Form.Input
          type="text"
          placeholder="Bruschette"
          options={{ required: "Inserisci un titolo." }}
        />
      </Form.FloatingLabelField>
      <Form.FloatingLabelField
        className="mb-2"
        label="Descrizione"
        name="description"
      >
        <Form.Input type="text" placeholder="Per stuzzicare l'appetito." />
      </Form.FloatingLabelField>
      <Form.FloatingLabelField label="Sezione" name="section" className="mb-2">
        <Form.Select options={{ required: "Seleziona una sezione." }}>
          {sorted.map(({ _key, title }) => (
            <option key={_key} value={_key}>
              {title}
            </option>
          ))}
        </Form.Select>
      </Form.FloatingLabelField>
      <Form.FloatingLabelField label="Prezzo" name="price">
        <Form.Input type="number" step=".01" />
      </Form.FloatingLabelField>
    </>
  );
};

ProductForm.Fields = ProductFormFields;

export default ProductForm;

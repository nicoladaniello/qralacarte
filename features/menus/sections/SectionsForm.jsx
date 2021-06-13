import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropTypes } from "prop-types";
import React from "react";
import Form from "../../../components/common/form/index.jsx";
import generateId from "../../../utils/generateId.js";

/**
 * Form to insert new menu sections.
 */
const SectionsForm = ({ sections, onChange }) => {
  // Handle insertion
  const handleInsert = ({ _key, ...data }) => {
    if (sections[_key]) {
      _key = generateId();
      if (sections[_key]) return;
    }
    onChange({ ...sections, [_key]: data });
  };

  return (
    <Form onSubmit={handleInsert}>
      <div className="row g-1">
        <div className="col-12 col-lg">
          <Form.Input name="_key" type="hidden" defaultValue={generateId()} />
          <Form.Input
            name="position"
            type="hidden"
            defaultValue={Object.keys(sections).length || 0}
          />
          <Form.FloatingLabelField label="Titolo" name="title">
            <Form.Input
              type="text"
              placeholder="Antipasti"
              options={{ required: "Inserisci un titolo." }}
            />
          </Form.FloatingLabelField>
        </div>
        <div className="col-12 col-lg">
          <Form.FloatingLabelField label="Descrizione" name="description">
            <Form.Input type="text" placeholder="Per stuzzicare l'appetito." />
          </Form.FloatingLabelField>
        </div>
        <div className="col-12 col-lg-auto">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ height: "calc(3.5rem + 2px)" }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </Form>
  );
};

SectionsForm.propTypes = {
  sections: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

SectionsForm.defaultProps = {
  sections: {},
};

export default SectionsForm;

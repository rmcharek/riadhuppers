import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Pflichtfeld, bitte einen Wert eingeben',
    notType: 'Bitte nur Zahlen eingeben',
  },
  number: {
    moreThan: 'Bitte nur Zahlen größer als 0 eingeben',
  },
});

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  
});

export default validationSchema;

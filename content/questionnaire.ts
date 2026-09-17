/**
 * Medical questionnaire for the prescription route (plan §7.7, D5, D8).
 *
 * Four steps and a review screen. Answers marked `stop` end the flow with an
 * explanation rather than carrying on, because they rule out supply. Only the
 * fields the prescriber needs are collected, and the answers go nowhere until
 * the patient chooses a channel and ticks consent (R2).
 */
export const questionnaireSteps = [
  {
    id: 'skin',
    title: 'Your skin',
    fields: [
      {
        name: 'concern',
        type: 'radio',
        label: 'What would you like to treat?',
        required: true,
        options: [
          { value: 'acne', label: 'Acne or breakouts' },
          { value: 'texture', label: 'Texture and fine lines' },
          { value: 'pigmentation', label: 'Uneven tone or sun damage' },
          { value: 'other', label: 'Something else' },
        ],
      },
      {
        name: 'skinType',
        type: 'radio',
        label: 'How would you describe your skin?',
        required: true,
        options: [
          { value: 'dry', label: 'Dry' },
          { value: 'normal', label: 'Normal' },
          { value: 'combination', label: 'Combination' },
          { value: 'oily', label: 'Oily' },
          { value: 'sensitive', label: 'Sensitive' },
        ],
      },
      {
        name: 'retinoidHistory',
        type: 'radio',
        label: 'Have you used a retinoid before?',
        required: true,
        options: [
          { value: 'never', label: 'Never' },
          { value: 'otc', label: 'An over-the-counter retinol' },
          { value: 'prescription', label: 'A prescription retinoid' },
        ],
      },
    ],
  },
  {
    id: 'screening',
    title: 'Medical screening',
    intro: 'These questions decide whether this medicine can be supplied to you at all.',
    fields: [
      {
        name: 'pregnancy',
        type: 'radio',
        label: 'Are you pregnant, breastfeeding, or planning a pregnancy?',
        required: true,
        options: [
          { value: 'no', label: 'No' },
          {
            value: 'yes',
            label: 'Yes, or I might be',
            stop: 'Topical retinoids are not prescribed during pregnancy, while breastfeeding, or when a pregnancy is planned. We cannot continue with this request, but we can talk through alternatives that are suitable.',
          },
        ],
      },
      {
        name: 'retinoidAllergy',
        type: 'radio',
        label: 'Have you ever reacted badly to a retinoid?',
        required: true,
        options: [
          { value: 'no', label: 'No' },
          {
            value: 'yes',
            label: 'Yes',
            stop: 'A previous reaction to a retinoid rules this out without a clinical assessment in person. Please get in touch so we can look at what would suit you instead.',
          },
        ],
      },
      {
        name: 'skinConditions',
        type: 'textarea',
        label: 'Do you have any skin conditions we should know about?',
        help: 'Eczema, psoriasis, rosacea, current infection, or anything else affecting the area. Write "none" if there are none.',
        required: true,
      },
      {
        name: 'medications',
        type: 'textarea',
        label: 'What medicines are you taking?',
        help: 'Include anything prescribed, anything bought over the counter and any supplements. Write "none" if there are none.',
        required: true,
      },
      {
        name: 'allergies',
        type: 'textarea',
        label: 'Do you have any allergies?',
        help: 'Medicines, ingredients or anything else. Write "none" if there are none.',
        required: true,
      },
    ],
  },
  {
    id: 'preferences',
    title: 'Preferences',
    fields: [
      {
        name: 'strength',
        type: 'radio',
        label: 'Is there a strength you have in mind?',
        help: 'The prescriber decides what is appropriate; this is only to know what you were expecting.',
        required: true,
        options: [
          { value: 'guide', label: 'I would rather be guided' },
          { value: '0.025', label: '0.025%' },
          { value: '0.1', label: '0.1%' },
        ],
      },
      {
        name: 'notes',
        type: 'textarea',
        label: 'Anything else you would like the prescriber to know?',
        required: false,
      },
    ],
  },
  {
    id: 'details',
    title: 'Your details',
    fields: [
      { name: 'name', type: 'text', label: 'Full name', required: true, autoComplete: 'name' },
      { name: 'dob', type: 'date', label: 'Date of birth', required: true, autoComplete: 'bday' },
      { name: 'phone', type: 'tel', label: 'Phone number', required: true, autoComplete: 'tel' },
      { name: 'email', type: 'email', label: 'Email address', required: true, autoComplete: 'email' },
    ],
  },
];

/** The question text used when the answers are written out for the prescriber. */
export const questionLabels = Object.fromEntries(
  questionnaireSteps.flatMap((step) => step.fields.map((field) => [field.name, field.label])),
);

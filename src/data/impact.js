/**
 * The four hero proof points — one per dimension (people, growth, AI,
 * change). Copy lives in the `home` namespace under `impact.<id>.*`;
 * the English here is the `defaultValue` fallback. People leads: six
 * years managing PMs is the fact a reader should leave with.
 */
export const proofPoints = [
  {
    id: 'people',
    label: 'People',
    stat: '6 yrs',
    description: 'managing product managers',
  },
  {
    id: 'growth',
    label: 'Growth',
    stat: '+127%',
    description: '26K → 59K monthly active users across ~20 countries',
  },
  {
    id: 'ai',
    label: 'AI',
    stat: '~95%',
    description: 'measured answer accuracy after the Mira AI turnaround',
  },
  {
    id: 'change',
    label: 'Change',
    stat: '88K',
    description: 'users moved off legacy systems, rollback never needed',
  },
];

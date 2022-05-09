export const subHeaderMenuList = [
  {
    label: 'HOME',
    items: [{ menu: 'notMenu', link: '/' }],
  },
  {
    label: 'DATA',
    items: [
      { menu: 'Data Home', link: '/data' },
      { menu: 'Custom Data Download', link: '/data/custom-data-download' },
      { menu: 'Bulk Data Files', link: '/data/bulk-data-files' },
      { menu: 'APIs', link: { pathname: "https://www.epa.gov/airmarkets/cam-api-portal" } },
    ],
  },  
  {
    label: 'MAPS & GRAPHS',
    items: [{ menu: 'notMenu', link: '/maps-graphs' }],
  },
];

export const subHeaderUtilityList = [
  {
    label: 'Resources',
    items: [
      { menu: 'Glossary', link: '/resources/glossary' },
      { menu: 'Related Resources', link: '/resources/related-resources' },
    ],
  },
  {
    label: 'Help/Support',
    items: [
      { menu: 'About CAMPD', link: '/help-support/about' },
      { menu: 'Tutorials', link: '/help-support/tutorials' },
      { menu: 'FAQs', link: '/help-support/faqs' },
      { menu: 'Contact Us', link: {pathname: 'https://www.epa.gov/airmarkets/forms/campd-contact-us'} },
    ],
  },
  {
    label: 'Regulatory Partners',
    items: [
      {
        menu: 'Coming Soon - Information and resources for Regulatory Partners',
        link: '#',
      },
    ],
  },
];

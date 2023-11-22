export const SEARCH_CONFIG = {
    index: 'fud_demko_doctyp2,fud_demko_doctyp3,fud_demko_doctyp4,fud_demko_doctyp5',
    specificFields: [
      { fieldName: 'pre_person', uiTitle: 'Personen', facet: 'facet_person' },
      { fieldName: 'pre_location', uiTitle: 'Ort', facet: 'facet_location' },
      // Add more fields as necessary
    ], 
    range: {
      gte: 'range_geburt',
      lte: 'range_geburt'
    },
    sort: [
      { sortName: 'Titel absteigend', sortField: 'sort_title', sortMethod: 'ASC'},
      { sortName: 'Titel aufsteigend', sortField: 'sort_title', sortMethod: 'DESC'}
    ]
  };
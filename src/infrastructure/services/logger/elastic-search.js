const mockElasticSearch = (query) => {
    console.log('Searching in Elasticsearch for:', query);
    return [
      { id: 1, name: 'John Doe', department: 'IT' },
      { id: 2, name: 'Jane Smith', department: 'HR' },
    ]
  };
  
  export default mockElasticSearch
const express = require('express');
const path = require('path');
const app = express();
const { Client } = require('@elastic/elasticsearch')


app.use(express.static('public'));

app.set('view engine', 'ejs');

app.set('view', path.join(__dirname, '/views'))


const client = new Client({
  node: 'http://10.10.20.107:9200'
})


async function checkClusterHealth (){
  try {
    const health = await client.cluster.health();
    console.log('Cluster Health:', health);
  } catch (err) {
    console.error('Elasticsearch cluster is down!', err)
  }
}

async function indexDocument () {
  try {
    const response = await client.index ({
      index: 'notes',
      document: {
        title: 'Elasticsearch in Node.js',
        content: 'Learning how to use Elasticsearch with Node.js',
        tags: ['nodejs', 'elasticsearch', 'search'],
      },
    });
    console.log('Document indexed:', response);
  } catch (err) {
    console.error('Error Indexing document:', err);
  }
}

indexDocument();

app.listen(3000, () => {
  console.log('Running on port 3000')
})
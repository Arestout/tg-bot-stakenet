const nodeHtmlToImage = require('node-html-to-image');
const Handlebars = require('handlebars');

Handlebars.registerHelper('print_data', function () {
  return Number(this[0]).toFixed(4) + ' : ' + this[1];
});

const convertToImage = async (data) => {
  const image = await nodeHtmlToImage({
    html: `<html>
      <head>
      <style>
      * {
        margin: 0;
      }
      
      .wrapper {
        display: flex;
        width: 600px;
        margin: 10px auto;
        font-family: Arial, sans-serif;
      }
      
      .asks {
        margin-right: 20px;
        background-color: rgba(200,49,62,.2);
        padding: 10px;
      }
      
      .bids {
        background-color: rgba(74,166,87,.1);
        padding: 10px;
      }
      
      .price {
        margin: 0;
      }
      
      .title {
        text-align: center;
        margin-bottom: 10px;
      }
      
      .subtitle {
        margin-bottom: 10px;
      }
      </style>
    </head>
      <body>
      <div class="wrapper">
    <div class="asks">
      <p class="title"><strong>Asks</strong></p>
      <p class="subtitle">Price : Amount</p>
      {{#each asks}}
        <p class="price">{{print_data}}</p>
      {{/each}}
        
    </div>
    <div class="bids">
      <p class="title"><strong>Bids</strong></p>
      <p class="subtitle">Price : Amount</p>
      {{#each bids}}
        <p class="price">{{print_data}}</p>
      {{/each}}
    </div>
</div>
      </body></html>`,
    content: { asks: data.asks, bids: data.bids },
    puppeteerArgs: { args: ['--no-sandbox'] },
  });

  return image;
};

module.exports = convertToImage;

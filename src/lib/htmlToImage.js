const nodeHtmlToImage = require('node-html-to-image');
const fs = require('fs').promises;
const path = require('path');
const Handlebars = require('handlebars');

Handlebars.registerHelper('print_person', function () {
  return Number(this[0]).toFixed(4) + ' : ' + this[1];
});

const saveImage = async (image) => {
  const filename = Date.now() + '.jpg';
  const imagePath = path.resolve(__dirname, `../../tmp/${filename}`);

  try {
    await fs.writeFile(imagePath, image);
    console.log('The file was saved!');

    return imagePath;
  } catch (error) {
    return console.log(error);
  }
};

const convertToImage = async (data) => {
  console.log(data);
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
        <p class="price">{{print_person}}</p>
      {{/each}}
        
    </div>
    <div class="bids">
      <p class="title"><strong>Bids</strong></p>
      <p class="subtitle">Price : Amount</p>
      {{#each bids}}
        <p class="price">{{print_person}}</p>
      {{/each}}
    </div>
</div>
      </body></html>`,
    content: { asks: data.asks, bids: data.bids },
    puppeteerArgs: { args: ['--no-sandbox'] },
  });

  // const imagePath = await saveImage(image);

  return image;
};

module.exports = convertToImage;

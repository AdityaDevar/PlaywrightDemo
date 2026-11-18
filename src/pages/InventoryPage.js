const BasePage = require('./BasePage');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.sortProducts = page.getByRole('combobox', { name: 'Sort products' });
  }
}

module.exports = { InventoryPage };
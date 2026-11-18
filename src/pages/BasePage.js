class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    throw new Error('goto() must be implemented by the subclass');
  }

  async waitForReady() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = BasePage;
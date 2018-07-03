const path = require('path');
const fs = require('fs-extra');

const TwigRenderer = require('../../src');

// @todo Make this work and remove `.skip`
describe.skip('Namespaces', () => {
  const twigRenderer = new TwigRenderer({
    root: path.join(__dirname, 'src'),
    autoescape: false,
    verbose: true,
  });

  beforeAll(() => twigRenderer.init());

  test('Namespaces1', async () => {
    await fs.emptyDir(path.join(__dirname, 'dist'));
    const results = await twigRenderer.render('@molecules/water.twig');

    if (results.ok) {
      await fs.writeFile(path.join(__dirname, 'dist', 'result.html'), results.html);
    } else {
      console.error('Error: ', results.message);
    }

    const expected = await fs.readFile(path.join(__dirname, 'expected', 'result.html'), 'utf8');
    const actual = await fs.readFile(path.join(__dirname, 'dist', 'result.html'), 'utf8');

    expect(expected.trim()).toEqual(actual.trim());
  });

  afterAll(() => twigRenderer.closeServer());
});

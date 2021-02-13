const detox = require("detox")
const config = require("../package.json").detox

beforeAll(async () => {
      // launch mock server and other stuff
      await device.launchApp({ permissions: {
        notifications:'YES',
        camera:'YES',
        medialibrary:'YES',
        photos:'YES',
    }, launchArgs: { e2eTest : 'YES' } });
})

afterAll(async () => {
  await detox.cleanup()
})

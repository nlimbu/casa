// For more info on how to write Detox tests, see the official docs:
// https://github.com/wix/Detox/blob/master/docs/README.md

describe("Example", () => {
  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it("should have signup screen", async () => {
    await expect(element(by.id("loginScreen"))).toBeVisible()
    await expect(element(by.id("joinButton"))).toBeVisible()
    await element(by.id("joinButton")).tap()
  })

})

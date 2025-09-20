import { reactExtension, Banner, useApi, useCartLines, Status } from "@shopify/ui-extensions-react/checkout"

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
))

function Extension() {
  const { settings } = useApi()
  const { banner_text, banner_status } = settings.current
  const lines = useCartLines()

  if(lines.some(line => line.attributes?.some(attr => attr.key === '_pairedProduct'))) {
    let bannerStatus: Status = `${banner_status}` as Status

    return (
      <Banner status={`${bannerStatus}`} title={`${banner_text}`} />
    )
  }
}
import sanityClient from "@sanity/client";
import  imageUrlBuilder  from "@sanity/image-url";

export const client = sanityClient({
    projectId:"7yrva9b4",
    dataset: "production",
    apiVersion:"2022-03-10",
    useCDN: true,
    token: "skWDpXzzsp3kAPpljuHRgH8L8h3iEP7vJYnOM1a6htYbBpFYpJmnclH706VlGuNGNnGx6kEyzIW7VFQyDOlTumQ9FzCbRtG9hL3yBjaThjTVnRQuaEMsiQ5OHoIJvClYkWu7UsolHZRStVNp9wpNPTbnTceEOnB6XsG3CIkX0OuLqqLHAtll",
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)
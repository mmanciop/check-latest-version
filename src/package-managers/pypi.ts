import * as core from '@actions/core'
import {getUrl} from './common'
import Parser from 'rss-parser'

export async function getLatestPypiPackageVersion(
  packageName: string
): Promise<string> {
  const rssFeedUrl = `https://pypi.org/rss/project/${packageName}/releases.xml`

  core.debug(`Fetching the PIP RSS feed at: ${rssFeedUrl}`)

  const response = await getUrl(rssFeedUrl)

  const feed = await new Parser().parseString(response.toString())

  core.debug(`Found ${feed.items.length} items`)

  const latestItem = feed.items[0]
  core.debug(`Latest item: ${latestItem}`)

  return latestItem.title || ''
}

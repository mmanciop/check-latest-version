import * as core from '@actions/core'
import {getUrl} from './common'

interface GitHubRelease {
  tag_name: string
}

export async function getLatestGitHubRelease(
  repositoryName: string
): Promise<string> {
  const response = await getUrl(
    `https://api.github.com/repos/${repositoryName}/releases`
  )
  const githubReleases = (JSON.parse(response) as GitHubRelease[]) || []

  if (githubReleases.length) {
    const githubRelease = githubReleases[0]
    core.debug(`Latest release: ${githubRelease.tag_name}`)
    return githubRelease.tag_name || ''
  }

  return ''
}

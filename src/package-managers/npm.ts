import {getUrl} from './common'
/* eslint-disable import/no-unresolved */
import {Packument} from '@npm/types'

export async function getLatestNpmPackageVersion(
  packageName: string
): Promise<string> {
  const response = await getUrl(`https://registry.npmjs.org/${packageName}`)
  const data = JSON.parse(response) as Packument

  return data['dist-tags'].latest || ''
}

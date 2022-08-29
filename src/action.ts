import * as core from '@actions/core'
import {getLatestNpmPackageVersion} from './package-managers/npm'
import {getLatestPypiPackageVersion} from './package-managers/pypi'

type FetchLatestPackageVersionFunction = (
  packageName: string
) => Promise<string>

function getLatestPackageVersionFunction(
  packageManager: string
): FetchLatestPackageVersionFunction {
  switch (packageManager) {
    case 'npm':
      return getLatestNpmPackageVersion
    case 'pypi':
      return getLatestPypiPackageVersion
    default:
      throw new Error(`Invalid 'package-manager' value: '${packageManager}'`)
  }
}

export default async function run(): Promise<void> {
  const packageManager = core.getInput('package-manager', {
    required: true,
    trimWhitespace: true
  })

  const packageName = core.getInput('package-name', {
    required: true,
    trimWhitespace: true
  })

  const latestPackageVersionFunction =
    getLatestPackageVersionFunction(packageManager)

  core.setOutput('package-manager', packageManager)
  core.setOutput('package-name', packageName)

  return latestPackageVersionFunction(packageName)
    .then(version => {
      core.debug(`Latest version found: ${version}`)
      core.setOutput('version', version)
    })
    .catch(err => {
      core.setFailed(err)
    })
}
